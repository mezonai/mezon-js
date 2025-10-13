// src/client/MezonClient.ts
import { EventEmitter } from "events";
import { CacheManager } from "../utils/CacheManager";
import { Clan } from "../structures/Clan";
import { TextChannel } from "../structures/TextChannel";
// import { User } from "../structures/User";
import { Message, MessageInitData } from "../structures/Message";
import { MezonApi } from "../../api";
import { SocketManager } from "../manager/socket_manager";
import { SessionManager } from "../manager/session_manager";
import { EventManager } from "../manager/event_manager";
import { WebSocketAdapterPb } from "../../web_socket_adapter_pb";
import {
  AddClanUserEvent,
  ApiCreateChannelDescRequest,
  ApiGetZkProofRequest,
  APISentTokenRequest,
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelMessage,
  ChannelUpdatedEvent,
  ClientConfigDto,
  DropdownBoxSelected,
  GiveCoffeeEvent,
  MessageReaction,
  MMNExtraInfo,
  QuickMenuEvent,
  StreamingJoinedEvent,
  StreamingLeavedEvent,
  TokenSentEvent,
  UserChannelAddedEvent,
  UserChannelRemoved,
  UserClanRemovedEvent,
  VoiceEndedEvent,
  VoiceJoinedEvent,
  VoiceLeavedEvent,
  VoiceStartedEvent,
} from "../../interfaces";
import { ChannelType, Events, TypeMessage } from "../../constants";
import {
  MessageButtonClicked,
  Notifications,
  RoleAssignedEvent,
  RoleEvent,
  WebrtcSignalingFwd,
} from "../../rtapi/realtime";
import { CreateEventRequest } from "../../api/api";
import { isValidUserId, parseUrlToHostAndSSL, sleep } from "../../utils/helper";
import { ChannelManager } from "../manager/channel_manager";
import { User, UserInitData } from "../structures/User";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { Session } from "../../session";
import { MessageDatabase } from "../../sqlite/MessageDatabase";
import {
  ETransferType,
  IEphemeralKeyPair,
  IZkProof,
  MmnClient,
  ZkClient,
} from "mmn-client-js";

const DEFAULT_HOST = "gw.mezon.ai";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_MMN_API = "https://dong.mezon.ai/mmn-api/";
const DEFAULT_ZK_API = "https://dong.mezon.ai/zk-api/";

export class MezonClient extends EventEmitter {
  public token: string;
  public clientId: string;
  public host: string;
  public useSSL: boolean;
  public port: string;
  private readonly timeout: number;
  public loginBasePath: string | undefined;
  public mmnApiUrl: string | undefined;
  public zkApiUrl: string | undefined;
  public keyGen!: IEphemeralKeyPair;
  public addressMMN!: string;
  public zkProofs!: IZkProof;
  private apiClient!: MezonApi;
  private _mmnClient!: MmnClient;
  private _zkClient!: ZkClient;
  private socketManager!: SocketManager;
  private channelManager!: ChannelManager;
  private sessionManager!: SessionManager;
  private eventManager!: EventManager;
  private messageQueue = new AsyncThrottleQueue();

  public clans!: CacheManager<string, Clan>;
  public channels!: CacheManager<string, TextChannel>;
  private messageDB: MessageDatabase;

  constructor(config: ClientConfigDto) {
    super();
    const {
      botId,
      token = DEFAULT_API_KEY,
      host = DEFAULT_HOST,
      port = DEFAULT_PORT,
      useSSL = DEFAULT_SSL,
      timeout = DEFAULT_TIMEOUT_MS,
      mmnApiUrl = DEFAULT_MMN_API,
      zkApiUrl = DEFAULT_ZK_API,
    } = config;

    if (!botId) throw new Error("botId is required");
    if (!token) throw new Error("token is required");

    const scheme = useSSL ? "https://" : "http://";
    this.token = token;
    this.clientId = botId;
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.timeout = timeout;
    this.loginBasePath = `${scheme}${host}:${port}`;
    this.mmnApiUrl = mmnApiUrl;
    this.zkApiUrl = zkApiUrl;
    this.messageDB = new MessageDatabase();
  }

  public get mmnClient(): MmnClient {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }
    return this._mmnClient;
  }

  public get zkClient(): ZkClient {
    if (!this._zkClient) {
      throw new Error("ZkClient not initialized");
    }
    return this._zkClient;
  }

  initManager(basePath: string, sessionApi?: Session) {
    this.eventManager = new EventManager();
    this.clans = new CacheManager(this._fetchClanFromAPI.bind(this));
    this.channels = new CacheManager(this._fetchChannelFromAPI.bind(this));
    this.apiClient = new MezonApi(this.token, basePath, this.timeout);
    this.sessionManager = new SessionManager(this.apiClient, sessionApi);
    this.socketManager = new SocketManager(
      this.host,
      this.port,
      this.useSSL,
      new WebSocketAdapterPb(),
      this.apiClient,
      this.eventManager,
      this.messageQueue,
      this,
      this.messageDB
    );
    this.channelManager = new ChannelManager(
      this.apiClient,
      this.socketManager,
      this.sessionManager
    );
    if (this.mmnApiUrl) {
      this._mmnClient = new MmnClient({
        baseUrl: this.mmnApiUrl,
        timeout: this.timeout,
      });
    }
    if (this.zkApiUrl) {
      this._zkClient = new ZkClient({
        endpoint: this.zkApiUrl,
        timeout: this.timeout,
      });
    }
  }

  /** Login bot */
  public async login(): Promise<string> {
    try {
      const tempApiClient = new MezonApi(
        this.token,
        this.loginBasePath!,
        this.timeout
      );
      const tempSessionManager = new SessionManager(tempApiClient);
      let sessionApi = null;
      try {
        sessionApi = await tempSessionManager.authenticate(
          this.clientId,
          this.token
        );
      } catch (error) {
        this.socketManager?.closeSocket();
        throw new Error("Some thing went wrong, please reset bot!");
      }

      if (sessionApi?.api_url) {
        const { host, port, useSSL } = parseUrlToHostAndSSL(sessionApi.api_url);
        this.host = host;
        this.port = port || (useSSL ? "443" : "80");
        this.useSSL = useSSL;

        const scheme = this.useSSL ? "https://" : "http://";
        const basePath = `${scheme}${this.host}:${this.port}`;
        this.initManager(basePath, sessionApi);
      }

      // init for MMN
      if (sessionApi?.user_id) {
        this.keyGen = await this.getEphemeralKeyPair();

        this.addressMMN = await this.getAddress(sessionApi.user_id);

        this.zkProofs = await this.getZkProofs({
          user_id: sessionApi.user_id!,
          jwt: sessionApi?.token,
          address: this.addressMMN,
          ephemeral_public_key: this.keyGen.publicKey,
        });
      }

      const sessionConnected = await this.socketManager.connect(sessionApi!);
      if (sessionConnected?.token) {
        await this.socketManager.connectSocket(sessionConnected.token);
        await this.channelManager.initAllDmChannels(sessionConnected.token);
      }
      this.emit("ready");
      return JSON.stringify(sessionApi ?? {});
    } catch (error) {
      this.socketManager?.closeSocket();
      throw new Error("Some thing went wrong, please reset bot!");
    }
  }

  /** Create DM channel */
  async createDMchannel(userId: string) {
    try {
      if (!isValidUserId(userId)) return null;
      const socket = this.socketManager.getSocket();
      const request: ApiCreateChannelDescRequest = {
        clan_id: "",
        channel_id: "0",
        category_id: "0",
        type: ChannelType.CHANNEL_TYPE_DM,
        user_ids: [userId],
        channel_private: 1,
      };
      try {
        const channelDM = await this.apiClient.createChannelDesc(
          this.sessionManager.getSession()!.token,
          request
        );
        if (channelDM) {
          await sleep(100);
          await socket.joinChat(
            channelDM.clan_id!,
            channelDM.channel_id!,
            channelDM.type!,
            false
          );
          const clanDm = this.clans.get("0");
          if (clanDm) {
            const userRaw: UserInitData = {
              id: userId,
              dmChannelId: channelDM.channel_id,
            };
            const user = new User(
              userRaw,
              clanDm,
              this.messageQueue,
              this.socketManager,
              this.channelManager
            );
            clanDm.users.set(userId, user);
          }
          return channelDM;
        }
      } catch (error: any) {
        console.log("error createDMchannel", userId, error?.status);
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  async getEphemeralKeyPair() {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this._mmnClient.generateEphemeralKeyPair();
  }

  async getAddress(user_id: string) {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this._mmnClient.getAddressFromUserId(user_id);
  }

  async getZkProofs(data: ApiGetZkProofRequest) {
    if (!this._zkClient) {
      throw new Error("ZkClient not initialized");
    }
    const req = {
      userId: data.user_id,
      jwt: data.jwt,
      address: data.address,
      ephemeralPublicKey: data.ephemeral_public_key,
    };

    return this._zkClient.getZkProofs(req);
  }

  async getCurrentNonce(user_id: string, tag?: "latest" | "pending") {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this._mmnClient.getCurrentNonce(user_id, tag || "pending");
  }

  async sendToken(tokenEvent: APISentTokenRequest) {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    const sender_id = tokenEvent?.sender_id ?? this.clientId;
    const receiver_id = tokenEvent.receiver_id;
    const mmn_extra_info: MMNExtraInfo = {
      ExtraAttribute: tokenEvent?.extra_attribute ?? "",
      UserSenderUsername: tokenEvent?.sender_name ?? "",
      type: ETransferType.TransferToken,
      ...(tokenEvent?.mmn_extra_info ?? {}),
      UserSenderId: sender_id,
      UserReceiverId: receiver_id,
    };

    const nonce = await this.getCurrentNonce(this.clientId!, "pending");

    return this._mmnClient.sendTransaction({
      sender: sender_id,
      recipient: receiver_id,
      amount: this._mmnClient.scaleAmountToDecimals(tokenEvent.amount),
      nonce: nonce.nonce + 1,
      textData: tokenEvent?.note || "No note",
      extraInfo: mmn_extra_info,
      publicKey: this.keyGen.publicKey,
      privateKey: this.keyGen.privateKey,
      zkProof: this.zkProofs.proof,
      zkPub: this.zkProofs.public_input,
    });
  }

  /** Listen to messages user sends on the  channel, thread */
  public async onChannelMessage(
    listener: (e: ChannelMessage) => void
  ): Promise<this> {
    this.on(Events.ChannelMessage.toString(), async (e: ChannelMessage) => {
      // handle init cache channel, message, user
      await this._initChannelMessageCache(e);
      await this._initUserClanCache(e);
      listener(e);
    });

    return this;
  }

  /** Listen to channel created */
  public onChannelCreated(listener: (e: ChannelCreatedEvent) => void): this {
    this.on(
      Events.ChannelCreated.toString(),
      async (e: ChannelCreatedEvent) => {
        this._updateCacheChannel(e);
        listener(e);
      }
    );
    return this;
  }

  /** Listen to channel updated */
  public onChannelUpdated(listener: (e: ChannelUpdatedEvent) => void): this {
    this.on(
      Events.ChannelUpdated.toString(),
      async (e: ChannelUpdatedEvent) => {
        if (
          e.channel_type === ChannelType.CHANNEL_TYPE_THREAD &&
          e.status === 1
        ) {
          const socket = this.socketManager.getSocket();
          await socket.joinChat(e.clan_id, e.channel_id, e.channel_type, false);
        }
        this._updateCacheChannel(e);
        listener(e);
      }
    );
    return this;
  }

  /** Listen to channel deleted */
  public onChannelDeleted(listener: (e: ChannelDeletedEvent) => void): this {
    this.on(
      Events.ChannelDeleted.toString(),
      async (e: ChannelDeletedEvent) => {
        const clan = this.clans.get(e.clan_id);
        if (!clan) return;
        this.channels.delete(e.channel_id!);
        clan.channels.delete(e.channel_id!);
        listener(e);
      }
    );
    return this;
  }

  /** Listen to user send token to each other */
  public onTokenSend(listener: (e: TokenSentEvent) => void): this {
    this.on(Events.TokenSend.toString(), async (e: TokenSentEvent) => {
      if (e.sender_id === this.clientId) {
        const clan = this.clans.get("0");
        const receiver = await clan?.users.fetch(e.receiver_id);
        await receiver?.sendDM(
          {
            t: `Funds Transferred: ${(+e.amount).toLocaleString()}₫ | ${
              e.note
            }`,
          },
          TypeMessage.SendToken
        );
      }
      listener(e);
    });
    return this;
  }

  /** Listen to user react to messages on the channel, thread */
  public onMessageReaction(listener: (e: MessageReaction) => void): this {
    this.on(Events.MessageReaction.toString(), listener);
    return this;
  }

  /** Listen to user react to messages on the channel, thread */
  public onUserChannelRemoved(listener: (e: UserChannelRemoved) => void): this {
    this.on(Events.UserChannelRemoved.toString(), listener);
    return this;
  }

  /** Listen to user leaved/removed in the channel */
  public onUserClanRemoved(listener: (e: UserClanRemovedEvent) => void): this {
    this.on(
      Events.UserClanRemoved.toString(),
      async (e: UserClanRemovedEvent) => {
        const clan = this.clans.get(e.clan_id);
        if (!clan) return;
        e.user_ids.forEach((user_id: string) => {
          clan.users.delete(user_id);
        });

        listener(e);
      }
    );
    return this;
  }

  /** Listen to user added in the channel */
  public onUserChannelAdded(
    listener: (e: UserChannelAddedEvent) => void
  ): this {
    this.on(
      Events.UserChannelAdded.toString(),
      async (e: UserChannelAddedEvent) => {
        const socket = this.socketManager.getSocket();
        if (e?.users?.some((user) => user.user_id == this.clientId)) {
          await socket.joinChat(
            e.clan_id,
            e.channel_desc.channel_id!,
            e.channel_desc.type!,
            !e.channel_desc.channel_private
          );
        }
        listener(e);
      }
    );
    return this;
  }

  /** Listen to users give coffee to each other */
  public onGiveCoffee(listener: (e: GiveCoffeeEvent) => void): this {
    this.on(Events.GiveCoffee.toString(), listener);
    return this;
  }

  /** Listen to clan create new role */
  public onRoleEvent(listener: (e: RoleEvent) => void): this {
    this.on(Events.RoleEvent.toString(), listener);
    return this;
  }

  /** Listen to assigning a role to user */
  public onRoleAssign(listener: (e: RoleAssignedEvent) => void): this {
    this.on(Events.RoleAssign.toString(), listener);
    return this;
  }

  public onNotification(listener: (e: Notifications) => void): this {
    this.on(Events.Notifications.toString(), async (e: Notifications) => {
      const notifications = e.notifications;
      if (notifications && notifications.length) {
        notifications.forEach(async (noti) => {
          const content = JSON.parse(noti?.content ?? {});
          if (noti.code === -2) {
            const session = this.sessionManager.getSession()!;
            await this.apiClient.requestFriend(
              session.token,
              content.username,
              noti.sender_id
            );
          }
        });
      }

      listener(e);
    });
    return this;
  }

  /** Listen to user added in CLAN */
  public onAddClanUser(listener: (e: AddClanUserEvent) => void): this {
    this.on(Events.AddClanUser.toString(), async (e: AddClanUserEvent) => {
      if (e.user.user_id === this.clientId) {
        this.socketManager.getSocket().joinClanChat(e.clan_id);
        const clan = this.clans.get(e.clan_id);
        if (!clan) {
          const clanObj = new Clan(
            {
              id: e.clan_id!,
              name: "unknown",
              welcome_channel_id: "",
            },
            this,
            this.apiClient,
            this.socketManager,
            this.sessionManager.getSession()?.token!,
            this.messageQueue,
            this.messageDB
          );
          await clanObj.loadChannels();
          this.clans.set(e.clan_id, clanObj);
        }
      } else {
        const userRaw: UserInitData = {
          id: e.user.user_id!,
          username: e.user.username!,
          clan_nick: "",
          clan_avatar: "",
          avartar: e.user.avatar!,
          display_name: e.user.display_name,
          dmChannelId: "",
        };
        const clan = this.clans.get(e.clan_id);
        if (clan) {
          const user = new User(
            userRaw,
            clan,
            this.messageQueue,
            this.socketManager,
            this.channelManager
          );
          clan.users.set(e.user.user_id!, user);
        }
        const clanDm = this.clans.get("0");
        if (clanDm) {
          const user = new User(
            userRaw,
            clanDm,
            this.messageQueue,
            this.socketManager,
            this.channelManager
          );
          clanDm.users.set(e.user.user_id!, user);
        }
      }
      listener(e);
    });
    return this;
  }

  /** Listen to clan create a new event */
  public onClanEventCreated(listener: (e: CreateEventRequest) => void): this {
    this.on(Events.ClanEventCreated.toString(), listener);
    return this;
  }

  /** Listen to user lick a button on embed message */
  public onMessageButtonClicked(
    listener: (e: MessageButtonClicked) => void
  ): this {
    this.on(Events.MessageButtonClicked.toString(), listener);
    return this;
  }

  /** Listen to user joined a stream room */
  public onStreamingJoinedEvent(
    listener: (e: StreamingJoinedEvent) => void
  ): this {
    this.on(Events.StreamingJoinedEvent.toString(), listener);
    return this;
  }

  /** Listen to user leaved a stream room */
  public onStreamingLeavedEvent(
    listener: (e: StreamingLeavedEvent) => void
  ): this {
    this.on(Events.StreamingLeavedEvent.toString(), listener);
    return this;
  }

  /** Listen to user selected a input dropdown */
  public onDropdownBoxSelected(
    listener: (e: DropdownBoxSelected) => void
  ): this {
    this.on(Events.DropdownBoxSelected.toString(), listener);
    return this;
  }

  /** Listen to user accepted call 1-1 */
  public onWebrtcSignalingFwd(listener: (e: WebrtcSignalingFwd) => void): this {
    this.on(Events.WebrtcSignalingFwd.toString(), listener);
    return this;
  }

  public onVoiceStartedEvent(listener: (e: VoiceStartedEvent) => void): this {
    this.on(Events.VoiceStartedEvent.toString(), listener);
    return this;
  }

  public onVoiceEndedEvent(listener: (e: VoiceEndedEvent) => void): this {
    this.on(Events.VoiceEndedEvent.toString(), listener);
    return this;
  }

  public onVoiceJoinedEvent(listener: (e: VoiceJoinedEvent) => void): this {
    this.on(Events.VoiceJoinedEvent.toString(), listener);
    return this;
  }

  public onVoiceLeavedEvent(listener: (e: VoiceLeavedEvent) => void): this {
    this.on(Events.VoiceLeavedEvent.toString(), listener);
    return this;
  }

  public onQuickMenuEvent(listener: (e: QuickMenuEvent) => void): this {
    this.on(Events.QuickMenu.toString(), listener);
    return this;
  }

  public closeSocket() {
    this.socketManager.closeSocket();
    this.eventManager = new EventManager(); // Reset event manager
  }

  public getListFriends(limit?: number, state?: string, cursor?: string) {
    const session = this.sessionManager.getSession()!;
    return this.apiClient.getListFriends(session.token, limit, state, cursor);
  }

  public acceptFriend(userId: string, username: string) {
    const session = this.sessionManager.getSession()!;
    return this.apiClient.requestFriend(session.token, username, userId);
  }

  public addFriend(username: string) {
    const session = this.sessionManager.getSession()!;
    return this.apiClient.requestFriend(session.token, username);
  }

  private async _fetchClanFromAPI(id: string): Promise<Clan> {
    throw Error(`Can not find clan ${id}!`);
  }

  private async _fetchChannelFromAPI(id: string): Promise<TextChannel> {
    try {
      const session = this.sessionManager.getSession()!;
      const channelDetail = await this.apiClient.listChannelDetail(
        session.token,
        id
      );
      const clanId = channelDetail?.clan_id ?? "0";

      const clan = this.clans.get(clanId)!;
      const channel = new TextChannel(
        channelDetail,
        clan,
        this.socketManager,
        this.messageQueue,
        this.messageDB
      );
      this.channels.set(channel.id!, channel);
      clan?.channels.set(channel.id!, channel);
      return channel;
    } catch (error) {
      throw Error(`Can not find channel ${id}!`);
    }
  }

  private async _initChannelMessageCache(e: ChannelMessage) {
    const {
      clan_id,
      channel_id,
      sender_id,
      message_id,
      content,
      reactions,
      mentions,
      attachments,
      references,
      create_time_seconds,
    } = e;
    try {
      if (clan_id && clan_id !== "0") {
        const clan = this.clans.get(clan_id);
        if (clan) {
          try {
            await clan.loadChannels();
          } catch (err) {
            console.warn("Failed to load channels", err);
          }
        }
      }

      const channel = await this.channels.fetch(channel_id).catch((err) => {
        console.warn("Fetch channel failed", err);
        return null;
      });

      if (!message_id || !channel) return;
      const messageRaw: MessageInitData = {
        id: message_id!,
        clan_id: clan_id!,
        channel_id: channel_id!,
        sender_id: sender_id!,
        content,
        reactions,
        mentions,
        attachments,
        references,
        create_time_seconds,
      };
      const message = new Message(
        messageRaw,
        channel,
        this.socketManager,
        this.messageQueue
      );
      channel.messages.set(message_id, message);
      try {
        this.messageDB.saveMessage(e);
      } catch (err) {
        console.warn("Failed to save message", err);
      }
    } catch (error) {
      console.log("Error initChannelMessageCache");
    }
  }

  private async _initUserClanCache(e: ChannelMessage) {
    const {
      clan_id,
      sender_id,
      username,
      clan_nick,
      clan_avatar,
      avatar,
      display_name,
    } = e;
    const clan = this.clans.get(clan_id ?? "0");
    if (clan) {
      const userCache = clan.users.get(sender_id!);
      const clanDm = this.clans.get("0");
      const allDmChannels = this.channelManager.getAllDmChannels();

      if (!userCache && sender_id !== this.clientId && allDmChannels) {
        const userIds = Object.keys(allDmChannels ?? {}) || [];
        userIds.forEach((id) => {
          if (!id) return;
          const user = new User(
            { id, dmChannelId: allDmChannels?.[id] ?? "" },
            clan,
            this.messageQueue,
            this.socketManager,
            this.channelManager
          );
          const userDM = clanDm?.users?.get(id);
          if (!userDM) {
            clanDm?.users?.set(id, user);
          }
          const userClan = clan.users.get(id);
          if (!userClan) {
            clan.users.set(id, user);
          }
        });
      }

      const userRaw: UserInitData = {
        id: sender_id,
        username: username,
        clan_nick: clan_nick,
        clan_avatar: clan_avatar,
        avartar: avatar,
        display_name: display_name,
        dmChannelId: allDmChannels?.[sender_id] ?? "",
      };

      const user = new User(
        userRaw,
        clan,
        this.messageQueue,
        this.socketManager,
        this.channelManager
      );
      clan.users.set(sender_id, user);
      clanDm?.users.set(sender_id, user);
    }
  }

  _updateCacheChannel(e: ChannelCreatedEvent | ChannelUpdatedEvent) {
    const clan = this.clans.get(e.clan_id);
    if (!clan) return;
    const channelObj = new TextChannel(
      {
        ...e,
        type: e.channel_type,
        channel_private: e.channel_private ? 1 : 0,
      },
      clan,
      this.socketManager,
      this.messageQueue,
      this.messageDB
    );
    this.channels.set(e.channel_id!, channelObj);
    clan.channels.set(e.channel_id!, channelObj);
    this.socketManager.getSocket().joinChat;
  }
}
