import { MezonApi } from "../api";
// import { Session } from "./session";
// import { DefaultSocket } from "./socket";
// import { WebSocketAdapter } from "./web_socket_adapter";
import { WebSocketAdapterPb } from "../web_socket_adapter_pb";
import { Events } from "../constants/enum";
import {
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageRef,
  ChannelMessageContent,
  Client,
  Socket,
  TokenSentEvent,
} from "../interfaces";
import { SocketManager } from "./socket_manager";
import { MessageManager } from "./message_manager";
import { ChannelManager } from "./channel_manager";
import { SessionManager } from "./session_manager";
import { CloseEvent, ErrorEvent } from "ws";
import { EventManager } from "./event_manager";

const DEFAULT_HOST = "api.mezon.vn";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;

export class MezonClient implements Client {
  private socket!: Socket;
  private readonly apiClient: MezonApi;
  private socketManager: SocketManager;
  private messageManager: MessageManager;
  private channelManager: ChannelManager;
  private sessionManager: SessionManager;
  private eventManager: EventManager;
  private isHardDisconnect: boolean | undefined;

  constructor(
    readonly apiKey = DEFAULT_API_KEY,
    readonly host = DEFAULT_HOST,
    readonly port = DEFAULT_PORT,
    readonly useSSL = DEFAULT_SSL,
    readonly timeout = DEFAULT_TIMEOUT_MS
  ) {
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new MezonApi(apiKey, basePath, timeout);
    this.sessionManager = new SessionManager(this.apiClient);
    this.socketManager = new SocketManager(
      this.host,
      this.port,
      this.useSSL,
      new WebSocketAdapterPb(),
      this.sessionManager
    );
    this.messageManager = new MessageManager(this.socketManager);
    this.channelManager = new ChannelManager(
      this.apiClient,
      this.socketManager,
      this.sessionManager
    );
    this.eventManager = new EventManager();
  }

  async authenticate() {
    const sockSession = await this.sessionManager.authenticate(this.apiKey);
    const sessionConnected = await this.socketManager.connect(sockSession);
    if (sessionConnected?.token) {
      this.socket = this.socketManager.getSocket();
      await this.connectSocket(sessionConnected.token);
    }
    this.isHardDisconnect = false;
    return "Authenticate success!";
  }

  on(event: Events, func: Function, context: any = null) {
    this.eventManager.on(event, func, context);
  }

  remove(event: string, func: Function) {
    this.eventManager.remove(event, func);
  }

  async onerror(evt: ErrorEvent) {
    console.log(evt);
    if (this.isHardDisconnect) return;
    if (this.socket.isOpen()) {
      await this.socketManager.retriesConnect();
    }
  }

  onheartbeattimeout() {
    console.log("Heartbeat timeout.");
  }

  ondisconnect(e: CloseEvent) {
    console.log("Disconnected!", e?.reason);
    if (this.isHardDisconnect) return;
    this.socketManager.retriesConnect();
  }

  private async connectSocket(sessionToken: string) {
    const clans = await this.apiClient.listClanDescs(sessionToken);
    clans.clandesc?.forEach(async (clan) => {
      await this.socket.joinClanChat(clan.clan_id || "");
    });

    // join direct message
    await this.socket.joinClanChat("0");
    ["ondisconnect", "onerror", "onheartbeattimeout"].forEach((event) => {
      this.socket[event] = (this[event as keyof this] as Function).bind(this);
    });

    for (const event in Events) {
      const key = Events[event as keyof typeof Events].toString();
      this.socket.socketEvents.on(key, (...args: any[]) => {
        this.eventManager.emit(key, ...args);
      });
    }
  }

  closeSocket() {
    this.socketManager.closeSocket();
    this.isHardDisconnect = true;
    this.eventManager = new EventManager(); // Reset event manager
  }

  async logout() {
    return this.sessionManager.logout();
  }

  async sendMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    msg: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    ref?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string
  ) {
    return await this.messageManager.sendMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      msg,
      mentions,
      attachments,
      ref,
      anonymous_message,
      mention_everyone,
      avatar,
      code,
      topic_id
    );
  }

  async sendDMChannelMessage(
    channelDmId: string,
    msg: string,
    messOptions: { [x: string]: any } = {},
    attachments: Array<any> = [],
    refs: Array<any> = []
  ) {
    return await this.messageManager.sendDMChannelMessage(
      channelDmId,
      msg,
      messOptions,
      attachments,
      refs
    );
  }

  async updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean
  ) {
    return await this.messageManager.updateChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      content,
      mentions,
      attachments,
      hideEditted
    );
  }

  async createDMchannel(userId: string) {
    return this.channelManager.createDMchannel(userId);
  }

  async listChannelVoiceUsers(
    clanId: string,
    channelId: string,
    channelType: number,
    limit: number = 500,
    state?: number,
    cursor?: string
  ) {
    return await this.channelManager.listChannelVoiceUsers(
      clanId,
      channelId,
      channelType,
      limit,
      state,
      cursor
    );
  }

  /** Send token to user */
  async sendToken(sendTokenData: TokenSentEvent) {
    const session = this.sessionManager.getSession()!;
    return this.apiClient.sendToken(session.token, sendTokenData);
  }

  async reactionMessage(
    id: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean
  ) {
    return await this.messageManager.reactionMessage(
      id,
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      emoji_id,
      emoji,
      count,
      message_sender_id,
      action_delete
    );
  }
}
