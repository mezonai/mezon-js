// src/client/MezonClient.ts
import { EventEmitter } from "events";
import { CacheManager } from "../utils/CacheManager";
import { Clan } from "../structures/Clan";
import { TextChannel } from "../structures/TextChannel";
// import { User } from "../structures/User";
import { Message } from "../structures/Message";
import { MezonApi } from "../../api";
import { SocketManager } from "../manager/socket_manager";
import { SessionManager } from "../manager/session_manager";
import { EventManager } from "../manager/event_manager";
import { WebSocketAdapterPb } from "../../web_socket_adapter_pb";
import {
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelMessage,
  ChannelUpdatedEvent,
  GiveCoffeeEvent,
  MessageReaction,
  TokenSentEvent,
  UserChannelAddedEvent,
  UserChannelRemoved,
  UserClanRemovedEvent,
} from "../../interfaces";
import { Events } from "../../constants";

const DEFAULT_HOST = "api.mezon.vn";
const DEFAULT_PORT = "443";
const DEFAULT_API_KEY = "";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;

export class MezonClient extends EventEmitter {
  public token: string;
  private readonly apiClient: MezonApi;
  private socketManager: SocketManager;
  private sessionManager: SessionManager;
  private eventManager: EventManager;

  // public users: CacheManager<string, User>; // TODO: add user
  public clans: CacheManager<string, Clan>;
  public channels: CacheManager<string, TextChannel>;
  public messages: CacheManager<string, Message>;

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
    this.messages = new CacheManager(this._fetchMessageFromAPI.bind(this));

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
      this
    );
  }

  public async login(token: string): Promise<string> {
    this.token = token;
    const sockSession = await this.sessionManager.authenticate(this.token);
    const sessionConnected = await this.socketManager.connect(sockSession);
    if (sessionConnected?.token) {
      await this.socketManager.connectSocket(sessionConnected.token);
    }
    this.emit("ready");
    return "Authenticate success!";
  }

  closeSocket() {
    this.socketManager.closeSocket();
    this.eventManager = new EventManager(); // Reset event manager
  }

  private async _fetchClanFromAPI(id: string): Promise<Clan> {
    // TODO: add logic fetch clan by id api
    return new Clan({ id, name: "KOMU" }, this);
  }

  private async _fetchChannelFromAPI(id: string): Promise<TextChannel> {
    const session = this.sessionManager.getSession()!;
    const channelDetail = await this.apiClient.listChannelDetail(
      session.token,
      id
    );
    console.log("Call api _fetchChannelFromAPI");
    console.log("channelDetail", channelDetail);
    const clanId = channelDetail.clan_id!;
    const clan = this.clans.get(clanId)!;
    const channel = new TextChannel(channelDetail, clan, this.socketManager);
    this.channels.set(channel.id!, channel);
    clan.channels.set(channel.id!, channel);
    return channel;
  }

  private async _fetchMessageFromAPI(id: string): Promise<Message> {
    // TODO: add logic fetch messsage by id api
    const channel =
      this.channels.first() ??
      new TextChannel(
        {},
        new Clan({ id: "1", name: "KOMU" }, this),
        this.socketManager
      );
    console.log("id", id, channel);
    return new Message({});
  }

  /** Listen to messages user sends on the  channel, thread */
  public async onChannelMessage(
    listener: (e: ChannelMessage) => void
  ): Promise<this> {
    this.on(Events.ChannelMessage.toString(), async (e: ChannelMessage) => {
      const channel = await this.channels.fetch(e.channel_id);
      console.log("channel", channel.id);
      listener(e);
    });

    return this;
  }

  /** Listen to channel created */
  public onChannelCreated(listener: (e: ChannelCreatedEvent) => void): this {
    this.on(Events.ChannelCreated.toString(), listener);
    return this;
  }

  /** Listen to channel updated */
  public onChannelUpdated(listener: (e: ChannelUpdatedEvent) => void): this {
    this.on(Events.ChannelUpdated.toString(), listener);
    return this;
  }

  /** Listen to channel deleted */
  public onChannelDeleted(listener: (e: ChannelDeletedEvent) => void): this {
    this.on(Events.ChannelDeleted.toString(), listener);
    return this;
  }

  /** Listen to user send token to each other */
  public onTokenSend(listener: (e: TokenSentEvent) => void): this {
    this.on(Events.TokenSend.toString(), listener);
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
    this.on(Events.UserClanRemoved.toString(), listener);
    return this;
  }

  /** Listen to user added in the channel */
  public onUserChannelAdded(
    listener: (e: UserChannelAddedEvent) => void
  ): this {
    this.on(Events.UserChannelAdded.toString(), listener);
    return this;
  }

  /** Listen to users give coffee to each other */
  public onGiveCoffee(listener: (e: GiveCoffeeEvent) => void): this {
    this.on(Events.GiveCoffee.toString(), listener);
    return this;
  }
}
