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
  TokenSentEvent,
} from "../interfaces";
import { SocketManager } from "./socket_manager";
import { MessageManager } from "./message_manager";
import { ChannelManager } from "./channel_manager";
import { SessionManager } from "./session_manager";
import { EventManager } from "./event_manager";

const DEFAULT_HOST = "api.mezon.vn";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;

export class MezonClient implements Client {
  private readonly apiClient: MezonApi;
  private socketManager: SocketManager;
  private messageManager: MessageManager;
  private channelManager: ChannelManager;
  private sessionManager: SessionManager;
  private eventManager: EventManager;

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
    this.eventManager = new EventManager();
    this.socketManager = new SocketManager(
      this.host,
      this.port,
      this.useSSL,
      new WebSocketAdapterPb(),
      this.sessionManager,
      this.apiClient,
      this.apiKey,
      this.eventManager
    );
    this.messageManager = new MessageManager(this.socketManager);
    this.channelManager = new ChannelManager(
      this.apiClient,
      this.socketManager,
      this.sessionManager
    );
  }

  async authenticate() {
    const sockSession = await this.sessionManager.authenticate(this.apiKey);
    const sessionConnected = await this.socketManager.connect(sockSession);
    if (sessionConnected?.token) {
      await this.socketManager.connectSocket(sessionConnected.token);
    }
    return "Authenticate success!";
  }

  on(event: Events, func: Function, context: any = null) {
    this.eventManager.on(event, func, context);
  }

  remove(event: string, func: Function) {
    this.eventManager.remove(event, func);
  }

  closeSocket() {
    this.socketManager.closeSocket();
    this.eventManager = new EventManager(); // Reset event manager
  }

  async logout() {
    return this.sessionManager.logout();
  }

  /** Send message in channel/thread */
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

  /** Send DM message */
  async sendDMChannelMessage(
    channelDmId: string,
    msg: string,
    messOptions: { [x: string]: any } = {},
    attachments: Array<any> = [],
    refs: Array<any> = [],
    code?: number
  ) {
    return await this.messageManager.sendDMChannelMessage(
      channelDmId,
      msg,
      messOptions,
      attachments,
      refs,
      code
    );
  }

  /** Update message */
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

  /** Create DM channel */
  async createDMchannel(userId: string) {
    return this.channelManager.createDMchannel(userId);
  }

  /** List current user in channel voice */
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

  /** React message */
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
