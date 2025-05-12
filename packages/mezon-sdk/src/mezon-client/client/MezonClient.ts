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
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelMessage,
  ChannelUpdatedEvent,
  DropdownBoxSelected,
  GiveCoffeeEvent,
  MessageReaction,
  StreamingJoinedEvent,
  StreamingLeavedEvent,
  TokenSentEvent,
  UserChannelAddedEvent,
  UserChannelRemoved,
  UserClanRemovedEvent,
} from "../../interfaces";
import { ChannelType, Events, TypeMessage } from "../../constants";
import {
  MessageButtonClicked,
  RoleAssignedEvent,
  RoleEvent,
  WebrtcSignalingFwd,
} from "../../rtapi/realtime";
import { CreateEventRequest } from "../../api/api";
import { isValidUserId, sleep } from "../../utils/helper";
import { ChannelManager } from "../manager/channel_manager";
import { User, UserInitData } from "../structures/User";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";

const DEFAULT_HOST = "api.mezon.vn";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;

export class MezonClient extends EventEmitter {
  public token: string;
  public clientId: string | undefined;
  private readonly apiClient: MezonApi;
  private readonly socketManager: SocketManager;
  private readonly channelManager: ChannelManager;
  private readonly sessionManager: SessionManager;
  private eventManager: EventManager;
  private messageQueue = new AsyncThrottleQueue();

  public clans: CacheManager<string, Clan>;
  public channels: CacheManager<string, TextChannel>;

  constructor(
    token = DEFAULT_API_KEY,
    readonly host = DEFAULT_HOST,
    readonly port = DEFAULT_PORT,
    readonly useSSL = DEFAULT_SSL,
    readonly timeout = DEFAULT_TIMEOUT_MS
  ) {
    super();
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    this.token = token;

    this.apiClient = new MezonApi(token, basePath, timeout);

    // this.users = new CacheManager(this._fetchUserFromAPI.bind(this)); // TODO: add user
    this.clans = new CacheManager(this._fetchClanFromAPI.bind(this));
    this.channels = new CacheManager(this._fetchChannelFromAPI.bind(this));

    this.sessionManager = new SessionManager(this.apiClient);
    this.eventManager = new EventManager();
    this.socketManager = new SocketManager(
      this.host,
      this.port,
      this.useSSL,
      new WebSocketAdapterPb(),
      this.sessionManager,
      this.apiClient,
      this.token,
      this.eventManager,
      this.messageQueue,
      this
    );
    this.channelManager = new ChannelManager(
      this.apiClient,
      this.socketManager,
      this.sessionManager
    );
  }

  /** Login bot */
  public async login(): Promise<string> {
    const sockSession = await this.sessionManager.authenticate(this.token);
    this.clientId = sockSession?.user_id;
    const sessionConnected = await this.socketManager.connect(sockSession);
    if (sessionConnected?.token) {
      await this.socketManager.connectSocket(sessionConnected.token);
      await this.channelManager.initAllDmChannels(sessionConnected.token);
    }
    this.emit("ready");
    return "Authenticate success!";
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
        return channelDM;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async sendToken(sendTokenData: TokenSentEvent) {
    const session = this.sessionManager.getSession()!;
    return this.apiClient.sendToken(session.token, sendTokenData);
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
            t: `Funds Transferred: ${e.amount}₫ | ${e.note}`,
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

  /** Listen to user added in CLAN */
  public onAddClanUser(listener: (e: AddClanUserEvent) => void): this {
    this.on(Events.AddClanUser.toString(), async (e: AddClanUserEvent) => {
      const clanObj = new Clan(
        {
          id: e.clan_id!,
          name: "unknown",
        },
        this,
        this.apiClient,
        this.socketManager,
        this.sessionManager.getSession()?.token!,
        this.messageQueue
      );
      this.clans.set(e.clan_id!, clanObj);
      if (e.user.user_id === this.clientId) {
        this.socketManager.getSocket().joinClanChat(e.clan_id);
      }
      const userRaw: UserInitData = {
        id: e.user.user_id!,
        username: e.user.username!,
        clan_nick: "",
        clan_avatar: "",
        avartar: e.user.avatar!,
        display_name: e.user.display_name,
        dmChannelId: "",
      };
      const user = new User(
        userRaw,
        clanObj,
        this.channelManager,
        this.messageQueue,
        this.socketManager
      );
      const dmChannel = await user.createDmChannel();
      user.dmChannelId = dmChannel?.channel_id ?? "";
      clanObj.users.set(e.user.user_id!, user);
      const clanDm = this.clans.get("0");
      if (!clanDm) return;
      clanDm.users.set(e.user.user_id!, user);
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

  public closeSocket() {
    this.socketManager.closeSocket();
    this.eventManager = new EventManager(); // Reset event manager
  }

  private async _fetchClanFromAPI(id: string): Promise<Clan> {
    throw Error(`Can not find clan ${id}!`);
  }

  private async _fetchChannelFromAPI(id: string): Promise<TextChannel> {
    console.log("_fetchChannelFromAPI", id);
    const session = this.sessionManager.getSession()!;
    const channelDetail = await this.apiClient.listChannelDetail(
      session.token,
      id
    );
    console.log("channelDetail", channelDetail);
    const clanId = channelDetail.clan_id ?? "0";

    const clan = this.clans.get(clanId)!;
    const channel = new TextChannel(
      channelDetail,
      clan,
      this.socketManager,
      this.messageQueue
    );
    this.channels.set(channel.id!, channel);
    clan.channels.set(channel.id!, channel);
    return channel;
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
    console.log("clan_id", clan_id);
    if (clan_id && clan_id !== "0") {
      const clan = this.clans.get(clan_id);
      await clan?.loadChannels();
    }
    const channel = await this.channels.fetch(channel_id);
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
    channel.messages.set(message_id!, message);
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
      let userCache = clan.users.get(sender_id!);
      let dmChannelId = userCache?.dmChannelId ?? "";
      let clanDm;

      if (!userCache && sender_id !== this.clientId) {
        const allDmChannel = this.channelManager.getAllDmChannels();
        dmChannelId = allDmChannel?.[sender_id] ?? "";
        if (dmChannelId) {
          clanDm = this.clans.get("0");
        }
      }

      const userRaw: UserInitData = {
        id: sender_id!,
        username: username!,
        clan_nick: clan_nick!,
        clan_avatar: clan_avatar!,
        avartar: avatar!,
        display_name: display_name!,
        dmChannelId,
      };

      const user = new User(
        userRaw,
        clan,
        this.channelManager,
        this.messageQueue,
        this.socketManager
      );
      clan.users.set(sender_id!, user);
      clanDm?.users.set(sender_id!, user);
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
      this.messageQueue
    );
    this.channels.set(e.channel_id!, channelObj);
    clan.channels.set(e.channel_id!, channelObj);
    this.socketManager.getSocket().joinChat;
  }
}
