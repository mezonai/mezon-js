import {
  Channel,
  ChannelMessageAck,
} from "./proto/realtime";
import { decodeAttachments, safeJSONParse } from "./utils";
import { WebSocketAdapter, WebSocketAdapterPb } from "./web_socket_adapter_pb";
import { Session } from "./session";
import { ApiMessageAttachment, ChannelMessage } from "./api.gen";

/** A socket connection to Mezon server. */
export interface Socket {
  /** Connection is Open */
  isOpen(): boolean;

  /** Connect to the server. */
  connect(
    session: Session,
    createStatus: boolean,
    platform: string,
    connectTimeoutMs?: number,
    signal?: AbortSignal,
  ): Promise<Session>;

  /** Disconnect from the server. */
  disconnect(fireDisconnectEvent: boolean): void;

  /** Join a chat channel on the server. */
  joinChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<Channel>;

  /** Leave a chat channel on the server. */
  leaveChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content?: any,
    attachments?: Array<ApiMessageAttachment>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
    id?: string,
  ): Promise<ChannelMessageAck>;

  /* Set the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  setHeartbeatTimeoutMs(ms: number): void;

  /* Get the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  getHeartbeatTimeoutMs(): number;

  onreconnect: (evt: Event) => void;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: Event) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: Event) => void;

  /**
   * An application-level heartbeat timeout that fires after the client does not receive a pong from the server after the heartbeat interval.
   * Most browsers maintain an internal heartbeat, in which case its unlikely you'll need to use this callback. However, Chrome does not implement an internal heartbeat.
   * We fire this separately from `onclose` because heartbeats fail when there's no connectivity, and many browsers don't fire `onclose` until the closing handshake either succeeds or fails.
   * In any case, be aware that `onclose` will still fire if there is a heartbeat timeout in a potentially delayed manner.
   */
  onheartbeattimeout: () => void;

  /** Receive channel message. */
  onchannelmessage: (channelMessage: ChannelMessage) => void;
}

/** Represents an error returned from the socket. */
export interface SocketError {
  /** The error code. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
}

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
let __hasConnectedOnce = false;

export const ConnectionState = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
} as const;

export type ConnectionStateType = (typeof ConnectionState)[keyof typeof ConnectionState];

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

/** Application-level heartbeat ping. */
interface Ping {}

/** Send a message to a realtime chat channel. */
interface ChannelMessageSend {
  channel_message_send: {
    /** Clan Id */
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id: string;
    // The mode
    mode: number;
    // channel label
    channel_label: string;
    /** The content payload. */
    content: any;
    //
    attachments?: Array<ApiMessageAttachment>;
    //
    anonymous_message?: boolean;
    //
    mention_everyone?: boolean;
    //
    avatar: string;
    // Is public
    is_public: boolean;
    // code
    code: number;
    //
    topic_id?: string;
  };
}

/** Join a realtime chat channel. */
interface ChannelJoin {
  channel_join: {
    /** The id of the channel to join. */
    channel_id: string;
    /** The name of the channel to join. */
    channel_label: string;
    /** The channel type: 1 = Channel, 2 = Direct Message, 3 = Group. */
    type: number;
    /** Whether channel messages are persisted in the database. */
    persistence: boolean;
    /** Whether the user's channel presence is hidden when joining. */
    hidden: boolean;
    // is public
    is_public: boolean;
  };
}

/** Leave a realtime chat channel. */
interface ChannelLeave {
  channel_leave: {
    /** The id of the channel to leave. */
    channel_id: string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    // Is public
    is_public: boolean;
  };
}

export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;
  private _connectionState: ConnectionStateType;
  private _heartbeatTimer?: ReturnType<typeof setTimeout>;
  private _connectTimeoutTimer?: ReturnType<typeof setTimeout>;
  private _connectPromise?: Promise<Session>;

  constructor(
    readonly host: string,
    readonly port: string,
    readonly useSSL: boolean = false,
    public verbose: boolean = false,
    readonly adapter: WebSocketAdapter = new WebSocketAdapterPb(),
    readonly sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs,
  ) {
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = DefaultSocket.DefaultHeartbeatTimeoutMs;
    this._connectionState = ConnectionState.DISCONNECTED;
  }

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  isOpen(): boolean {
    return this._connectionState === ConnectionState.CONNECTED;
  }

  connect(
    session: Session,
    createStatus: boolean = false,
    platform: string = "",
    connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs,
    signal?: AbortSignal,
  ): Promise<Session> {
    if (this._connectionState === ConnectionState.CONNECTED) {
      return Promise.resolve(session);
    }

    if (this._connectionState === ConnectionState.CONNECTING && this._connectPromise) {
      return this._connectPromise;
    }

    this.clearConnectTimeout();
    this._connectionState = ConnectionState.CONNECTING;

    const scheme = this.useSSL ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token, platform, signal);

    this.adapter.onClose = (evt: Event) => {
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      this.clearConnectTimeout();
      this.ondisconnect(evt);
    };

    this.adapter.onMessage = async (message: any) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", JSON.stringify(message));
      }
      /** Inbound message from server. */
      if (!message.cid) {
        if (message.channel_message) {
          const channelMessage = createChannelMessageFromEvent(message);
          this.onchannelmessage(channelMessage);
        } else {
          if (this.verbose && window && window.console) {
            console.log("Unrecognized message received: %o", message);
          }
        }
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose && window && window.console) {
            console.error("No promise executor for message: %o", message);
          }
          return;
        }
        delete this.cIds[message.cid];

        if (message.error) {
          executor.reject(<SocketError>message.error);
        } else {
          executor.resolve(message);
        }
      }
    };

    const connectPromise = new Promise<Session>((resolve, reject) => {
      this.adapter.onOpen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }

        const isReconnect = __hasConnectedOnce;
        __hasConnectedOnce = true;

        this.clearConnectTimeout();
        this._connectionState = ConnectionState.CONNECTED;
        this.startHeartbeatLoop();
        this._connectPromise = undefined;

        resolve(session);

        if (isReconnect) {
          this.onreconnect(evt);
        }
      };
      this.adapter.onError = (evt: Event) => {
        this._connectionState = ConnectionState.DISCONNECTED;
        this.stopHeartbeatLoop();
        this.clearConnectTimeout();
        this.onerror(evt);
        this._connectPromise = undefined;
        this.adapter.close();
        reject(evt);
      };

      this._connectTimeoutTimer = setTimeout(() => {
        // if promise has resolved by now, the reject() is a no-op
        this._connectionState = ConnectionState.DISCONNECTED;
        this.stopHeartbeatLoop();
        this.adapter.close();
        this._connectPromise = undefined;
        reject("The socket timed out when trying to connect.");
        this._connectTimeoutTimer = undefined;
      }, connectTimeoutMs);
    });

    this._connectPromise = connectPromise;
    return this._connectPromise;
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    if (this.adapter.isOpen()) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect(<Event>{});
    }
  }

  setHeartbeatTimeoutMs(ms: number) {
    this._heartbeatTimeoutMs = ms;
  }

  getHeartbeatTimeoutMs(): number {
    return this._heartbeatTimeoutMs;
  }

  onreconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  ondisconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onerror(evt: Event) {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onheartbeattimeout() {
    if (this.verbose && window && window.console) {
      console.log("Heartbeat timeout.");
    }
  }

  onchannelmessage(channelMessage: ChannelMessage) {
    if (this.verbose && window && window.console) {
      console.log(channelMessage);
    }
  }

  // onuserchanneladded(user: UserChannelAddedEvent) {
  //   if (this.verbose && window && window.console) {
  //     console.log(user);
  //   }
  // }

  send(
    message: ChannelJoin | ChannelLeave | ChannelMessageSend | Ping,
    sendTimeout = DefaultSocket.DefaultSendTimeoutMs,
  ): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
        } else if (untypedMessage.ephemeral_message_send) {
          untypedMessage.ephemeral_message_send.message.content = JSON.stringify(
            untypedMessage.ephemeral_message_send.message?.content,
          );
        } else if (untypedMessage.quick_menu_event) {
          untypedMessage.quick_menu_event.message.content = JSON.stringify(
            untypedMessage.quick_menu_event.message?.content,
          );
        }

        const cid = this.generatecid();
        this.cIds[cid] = { resolve, reject };
        if (sendTimeout !== Infinity && sendTimeout > 0) {
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
        }

        untypedMessage.cid = cid;
        this.adapter.send(untypedMessage);
      }
    });
  }

  async joinChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<Channel> {
    const response = await this.send({
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    });

    return response.channel;
  }

  async leaveChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<void> {
    return this.send({
      channel_leave: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    });
  }

  async writeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    attachments?: Array<ApiMessageAttachment>,
    anonymous_message?: boolean,
    mention_everyone?: Boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
  ): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_send: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          is_public: is_public,
          content: content,
          reactions: [],
          mentions: [],
          attachments: attachments,
          references: [],
          anonymous_message: anonymous_message,
          mention_everyone: mention_everyone,
          avatar: avatar,
          code: code,
          topic_id: topic_id,
        },
      },
      Infinity,
    );
    return response.channel_message_ack;
  }

  private async pingPong(): Promise<void> {
    if (!this.isOpen()) {
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      return;
    }

    try {
      await this.send({ ping: {} }, this._heartbeatTimeoutMs);
    } catch {
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      if (this.adapter.isOpen()) {
        if (window && window.console) {
          console.error("Server unreachable from heartbeat.");
        }
        this.onheartbeattimeout();
        this.adapter.close();
      }

      return;
    }

    this.startHeartbeatLoop();
  }

  private startHeartbeatLoop() {
    this.stopHeartbeatLoop();
    this._heartbeatTimer = setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
  }

  private stopHeartbeatLoop() {
    if (this._heartbeatTimer !== undefined) {
      clearTimeout(this._heartbeatTimer);
      this._heartbeatTimer = undefined;
    }
  }

  private clearConnectTimeout() {
    if (this._connectTimeoutTimer !== undefined) {
      clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = undefined;
    }
  }
}

function createChannelMessageFromEvent(message: any) {
  var content, attachments;
  try {
    content = safeJSONParse(message.channel_message.content);
  } catch (e) {
    console.log("content is invalid", e);
  }

  try {
    attachments = decodeAttachments(message.channel_message.attachments);
  } catch (e) {
    console.log("attachments is invalid", e);
  }

  var e: ChannelMessage = {
    id: message.id || message.channel_message.message_id,
    avatar: message.channel_message.avatar,
    channel_id: message.channel_message.channel_id,
    mode: message.channel_message.mode,
    channel_label: message.channel_message.channel_label,
    clan_id: message.channel_message.clan_id,
    code: message.channel_message.code,
    message_id: message.channel_message.message_id,
    sender_id: message.channel_message.sender_id,
    update_time: message.channel_message.update_time,
    clan_logo: message.channel_message.clan_logo,
    category_name: message.channel_message.category_name,
    username: message.channel_message.username,
    clan_nick: message.channel_message.clan_nick,
    clan_avatar: message.channel_message.clan_avatar,
    display_name: message.channel_message.display_name,
    content: content,
    attachments: attachments?.attachments,
    hide_editted: message.channel_message.hide_editted,
    is_public: message.channel_message.is_public,
    create_time_seconds: message.channel_message.create_time_seconds,
    update_time_seconds: message.channel_message.update_time_seconds,
    topic_id: message.channel_message.topic_id,
  };

  return e;
}
