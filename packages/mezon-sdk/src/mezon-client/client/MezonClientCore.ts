import { EventEmitter } from "events";
import { CacheManager } from "../utils/CacheManager";
import { Clan } from "../structures/Clan";
import { TextChannel } from "../structures/TextChannel";
import { Message, MessageInitData } from "../structures/Message";
import { MezonApi } from "../../api";
import { SocketManager } from "../manager/socket_manager";
import { SessionManager } from "../manager/session_manager";
import { EventManager } from "../manager/event_manager";
import { WebSocketAdapterPb } from "../../web_socket_adapter_pb";
import {
  ApiGetZkProofRequest,
  ApiQuickMenuAccessPayload,
  ApiQuickMenuAccessRequest,
  APISentTokenRequest,
  ChannelMessage,
  ClientConfigDto,
  MMNExtraInfo,
} from "../../interfaces";
import {
  generateSnowflakeId,
  parseUrlToHostAndSSL,
  waitFor2nTimeout,
} from "../../utils/helper";
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

const MAX_TIME_RETRY = 10;
const DEFAULT_HOST = "gw.mezon.ai";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_MMN_API = "https://dong.mezon.ai/mmn-api/";
const DEFAULT_ZK_API = "https://dong.mezon.ai/zk-api/";

export class MezonClientCore extends EventEmitter {
  public token: string;
  public clientId: string;
  public host: string;
  public useSSL: boolean;
  public port: string;
  protected readonly timeout: number;
  public loginBasePath: string | undefined;
  public mmnApiUrl: string | undefined;
  public zkApiUrl: string | undefined;
  public keyGen!: IEphemeralKeyPair;
  public addressMMN!: string;
  public zkProofs!: IZkProof;
  private _mmnInitPromise?: Promise<void>;

  protected apiClient!: MezonApi;
  protected _mmnClient!: MmnClient;
  protected _zkClient!: ZkClient;
  protected socketManager!: SocketManager;
  protected channelManager!: ChannelManager;
  protected sessionManager!: SessionManager;
  protected eventManager!: EventManager;
  protected messageQueue = new AsyncThrottleQueue();

  public clans!: CacheManager<string, Clan>;
  public channels!: CacheManager<string, TextChannel>;
  public users!: CacheManager<string, User>;
  protected messageDB: MessageDatabase;

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

  // cho phép subclass override nếu cần
  public initManager(basePath: string, sessionApi?: Session) {
    this.eventManager = new EventManager();
    this.clans = new CacheManager(this._fetchClanFromAPI.bind(this));
    this.channels = new CacheManager(this._fetchChannelFromAPI.bind(this));
    this.users = new CacheManager(this._fetchUserFromAPI.bind(this));

    this.apiClient = new MezonApi(this.token, basePath, this.timeout);
    this.sessionManager = new SessionManager(this.apiClient, sessionApi);
    this.socketManager = new SocketManager(
      this.host,
      this.port,
      this.useSSL,
      new WebSocketAdapterPb(),
      this.apiClient,
      this.messageQueue,
      this,
      this.messageDB,
    );
    this.channelManager = new ChannelManager(
      this.apiClient,
      this.socketManager,
      this.sessionManager,
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

  async handleClientLogin() {
    const tempApiClient = new MezonApi(
      this.token,
      this.loginBasePath!,
      this.timeout,
    );
    const tempSessionManager = new SessionManager(tempApiClient);
    let sessionApi = null;
    try {
      sessionApi = await tempSessionManager.authenticate(
        this.clientId,
        this.token,
      );
    } catch (error) {
      this.socketManager?.closeSocket();
      throw error;
    }
    console.log("sessionApi", sessionApi);
    if (sessionApi?.api_url) {
      const { host, port, useSSL } = parseUrlToHostAndSSL(sessionApi.api_url);
      this.host = host;
      this.port = port || (useSSL ? "443" : "80");
      this.useSSL = useSSL;

      const scheme = this.useSSL ? "https://" : "http://";
      const basePath = `${scheme}${this.host}:${this.port}`;
      this.initManager(basePath, sessionApi);
    }

    if (sessionApi?.id_token) {
      try {
        await this.mmnInitialized(sessionApi.id_token);
      } catch (error) {
        console.error("Failed to init MMN:", error);
      }
    }
    let sessionConnected;
    try {
      sessionConnected = await this.socketManager.connect(sessionApi!);
    } catch (error) {
      console.log("error socketManager.connect", error);
    }
    console.log("sessionConnected", sessionConnected);
    if (sessionApi?.token) {
      try {
        await this.socketManager.connectSocket(sessionApi.token);
      } catch (error) {}
      await this.channelManager.initAllDmChannels(sessionApi.token);
    }
    this.emit("ready");
    return JSON.stringify(sessionApi ?? {});
  }

  async login(): Promise<string> {
    try {
      return await waitFor2nTimeout(
        () => this.handleClientLogin(),
        MAX_TIME_RETRY,
      );
    } catch (error) {
      this.socketManager?.closeSocket();
      throw new Error(JSON.stringify(error ?? {}));
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

  private async mmnInitialized(id_token: string) {
    if (!this._mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    if (this.keyGen && this.addressMMN && this.zkProofs) return;

    if (this._mmnInitPromise) {
      return this._mmnInitPromise;
    }

    this._mmnInitPromise = (async () => {
      if (!this.keyGen) {
        this.keyGen = await this.getEphemeralKeyPair();
        console.log("this.keyGen", this.keyGen);
      }

      if (!this.addressMMN) {
        console.log("this.clientId", this.clientId);
        this.addressMMN = await this.getAddress(this.clientId);
        console.log("this.addressMMN", this.addressMMN);
      }
      console.log("id_token", id_token);
      if (!this.zkProofs) {
        this.zkProofs = await this.getZkProofs({
          user_id: this.clientId,
          jwt: id_token,
          address: this.addressMMN,
          ephemeral_public_key: this.keyGen.publicKey,
        });
        console.log("this.zkProofs", this.zkProofs);
      }
    })();

    try {
      await this._mmnInitPromise;
    } catch (error) {
      throw error;
    } finally {
      if (!this.keyGen || !this.addressMMN || !this.zkProofs) {
        this._mmnInitPromise = undefined;
      }
    }
  }

  async sendToken(tokenEvent: APISentTokenRequest) {
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

    const result = await this._mmnClient.sendTransaction({
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

    if (!result.ok) {
      let errorMsg = result.error;
      try {
        const parsed = JSON.parse(result.error);
        errorMsg = parsed.message || result.error;
      } catch (_) {}

      throw new Error(`Transaction failed: ${errorMsg}`);
    }

    return result;
  }

  async addQuickMenuAccess(body: ApiQuickMenuAccessPayload) {
    const id = generateSnowflakeId();
    const sessionToken = this.sessionManager.getSession();
    if (!sessionToken) return;
    const bot_id = this.clientId;
    const payload: ApiQuickMenuAccessRequest = {
      channel_id: "0",
      clan_id: body?.clan_id ?? "0",
      menu_type: body?.menu_type ?? 1,
      action_msg: body.action_msg,
      background: body?.background ?? "",
      menu_name: body.menu_name,
      id,
      bot_id,
    };
    try {
      return await this.apiClient.addQuickMenuAccess(
        sessionToken.token,
        payload,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteQuickMenuAccess(botId?: string) {
    const sessionToken = this.sessionManager.getSession();
    if (!sessionToken) return;
    const botIdPayload = botId ?? this.clientId;
    try {
      return await this.apiClient.deleteQuickMenuAccess(
        sessionToken.token,
        botIdPayload,
      );
    } catch (error) {
      throw error;
    }
  }

  public closeSocket() {
    this.socketManager.closeSocket();
    this.eventManager = new EventManager();
  }

  public async listTransactionDetail(transactionId: string): Promise<any> {
    console.log("listTransactionDetail transactionId", transactionId);
  }

  protected async _fetchClanFromAPI(id: string): Promise<Clan> {
    throw Error(`Can not find clan ${id}!`);
  }

  protected async _fetchChannelFromAPI(id: string): Promise<TextChannel> {
    try {
      const session = this.sessionManager.getSession()!;
      const channelDetail = await this.apiClient.listChannelDetail(
        session.token,
        id,
      );
      const clanId = channelDetail?.clan_id ?? "0";

      const clan = this.clans.get(clanId)!;
      const channel = new TextChannel(
        channelDetail,
        clan,
        this.socketManager,
        this.messageQueue,
        this.messageDB,
      );
      this.channels.set(channel.id!, channel);
      clan?.channels.set(channel.id!, channel);
      return channel;
    } catch (error) {
      throw Error(`Can not find channel ${id}!`);
    }
  }

  protected async _fetchUserFromAPI(id: string): Promise<User> {
    const session = this.sessionManager.getSession();
    if (!session) {
      throw new Error("Session not initialized when fetching user");
    }
    const dmChannel = await this.channelManager.createDMchannel(id);
    if (!dmChannel || !dmChannel.channel_id) {
      throw Error(`User ${id} not found or can not create DM channel!`);
    }

    const userRaw: UserInitData = {
      id,
      dmChannelId: dmChannel.channel_id,
    };

    const user = new User(userRaw, {
      socketManager: this.socketManager,
      messageQueue: this.messageQueue,
      channelManager: this.channelManager,
    });

    this.users.set(id, user);
    return user;
  }

  protected async _initChannelMessageCache(e: ChannelMessage) {
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
      topic_id,
    } = e;
    try {
      try {
        this.messageDB.saveMessage(e);
      } catch (err) {
        console.warn("Failed to save message", err);
      }

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
        topic_id,
      };
      const message = new Message(
        messageRaw,
        channel,
        this.socketManager,
        this.messageQueue,
      );
      channel.messages.set(message_id, message);
    } catch (error) {
      console.log("Error initChannelMessageCache");
    }
  }

  protected async _initUserClanCache(e: ChannelMessage) {
    const {
      sender_id,
      username,
      clan_nick,
      clan_avatar,
      avatar,
      display_name,
    } = e;
    const allDmChannels = this.channelManager.getAllDmChannels();
    const userCache = this.users.get(sender_id!);
    if (!userCache && allDmChannels) {
      const userIds = Object.keys(allDmChannels ?? {}) || [];

      userIds.forEach((id) => {
        if (!id) return;
        if (this.users.get(id)) return;

        const user = new User(
          { id, dmChannelId: allDmChannels?.[id] ?? "" },
          {
            socketManager: this.socketManager,
            messageQueue: this.messageQueue,
            channelManager: this.channelManager,
          },
        );

        this.users.set(id, user);
      });
    }

    const userRaw: UserInitData = {
      id: sender_id,
      username,
      clan_nick,
      clan_avatar,
      avartar: avatar,
      display_name,
      dmChannelId: allDmChannels?.[sender_id] ?? "",
    };

    let user = this.users.get(sender_id!);

    if (!user) {
      user = new User(userRaw, {
        socketManager: this.socketManager,
        messageQueue: this.messageQueue,
        channelManager: this.channelManager,
      });
      this.users.set(sender_id!, user);
    } else {
      user.username = userRaw.username ?? user.username;
      user.clan_nick = userRaw.clan_nick ?? user.clan_nick;
      user.clan_avatar = userRaw.clan_avatar ?? user.clan_avatar;
      user.display_name = userRaw.display_name ?? user.display_name;
      user.avartar = userRaw.avartar ?? user.avartar;
      if (userRaw.dmChannelId) {
        user.dmChannelId = userRaw.dmChannelId;
      }
    }
  }

  protected _updateCacheChannel(e: any) {
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
      this.messageDB,
    );
    this.channels.set(e.channel_id!, channelObj);
    clan.channels.set(e.channel_id!, channelObj);
  }
}
