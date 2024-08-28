/**
 * Copyright 2020 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CloseEvent} from "ws";
import { MezonApi, ApiAuthenticateLogoutRequest, ApiAuthenticateRefreshRequest, ApiSession } from "./api";
import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
import { WebSocketAdapterPb } from './web_socket_adapter_pb';
import { Events } from "./constants/method";

const DEFAULT_HOST = "mezon.vn";
const DEFAULT_PORT = "7305";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

export { Events } from "./constants/method";
/**  */
export interface ClanDesc {
  //
  banner?: string;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  logo?: string;
  //
  status?: number;
}

/**  */
export interface ChannelDescription {
  // The clan of this channel
  clan_id?: string;
  // The channel this message belongs to.
  channel_id?: string;
  // The channel type.
  type?: number;
  // The channel lable
  channel_label?: string;
  // The channel private
  channel_private?: number;
  // meeting code
  meeting_code?: string;
  //
  clan_name?: string;
  //
  parrent_id?: string;
}

/**  */
export interface ApiMessageAttachment {
  //
  filename?: string;
  //
  filetype?: string;
  //
  height?: number;
  //
  size?: number;
  //
  url?: string;
  //
  width?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
}

/**  */
export interface ApiMessageDeleted {
  //
  deletor?: string;
  //
  message_id?: string;
}

/**  */
export interface ApiMessageMention {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time?: string;
  //
  id?: string;
  //
  user_id?: string;
  //
  username?: string;
  // role id
  role_id?: string;
  // role name
  rolename?: string;
  // start position
  s?: number;
  // end position
  e?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
}

/**  */
export interface ApiMessageReaction {
  //
  action?: boolean;
  //
  emoji_id?: string;
  //
  emoji?: string;
  //
  id?: string;
  //
  sender_id?: string;
  //
  sender_name?: string;
  //
  sender_avatar?: string;
  // count of emoji
  count?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
}

/**  */
export interface ApiMessageRef {
  //
  message_id?: string;
  //
  message_ref_id?: string;
  //
  ref_type?: number;
  //
  message_sender_id?: string;
  // original message sendre username
  message_sender_username?: string;
  // original message sender avatar
  mesages_sender_avatar?: string;
  // original sender clan nick name
  message_sender_clan_nick?: string;
  // original sender display name
  message_sender_display_name?:string;
  //
  content?:string;
  //
  has_attachment?: boolean;
  /** The channel this message belongs to. */
  channel_id?: string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  //The unique ID of this message.
  id?: string;
  //
  avatar?: string;
  //The channel this message belongs to.
  channel_id?: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channel_label?: string;
  //The clan this message belong to.
  clan_id?: string;
  //The code representing a message type or category.
  code?: number;
  //The content payload.
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time?: string;
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
  //
  referenced_message?: ChannelMessage;
  //True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  //Message sender, usually a user ID.
  sender_id?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time?: string;
  //The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clan_logo?: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  category_name?: string;
  //The username of the message sender, if any.
  username?: string;
  // The clan nick name
  clan_nick?: string;
  // The clan avatar
  clan_avatar?: string;
  //
  display_name?: string;
  //
  create_time_ms?: number;
  //
  update_time_ms?: number;
  //
  mode?: number;
  //
  message_id?: string;
}

/** A user in the server. */
export interface ApiUser {
  //
  about_me?: string;
  //The Apple Sign In ID in the user's account.
  apple_id?: string;
  //A URL for an avatar image.
  avatar_url?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created.
  create_time?: string;
  //The display name of the user.
  display_name?: string;
  //Number of related edges to this user.
  edge_count?: number;
  //The Facebook id in the user's account.
  facebook_id?: string;
  //The Apple Game Center in of the user's account.
  gamecenter_id?: string;
  //The Google id in the user's account.
  google_id?: string;
  //The id of the user's account.
  id?: string;
  //
  join_time?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  //The location set by the user.
  location?: string;
  //Additional information stored as a JSON object.
  metadata?: string;
  //Indicates whether the user is currently online.
  online?: boolean;
  //The Steam id in the user's account.
  steam_id?: string;
  //The timezone set by the user.
  timezone?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated.
  update_time?: string;
  //The username of the user's account.
  username?: string;
}

export interface Client {
  authenticate: () => Promise<string>;
  sendMessage: (clan_id: string, channel_id: string, mode: number, msg: string, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, ref?: Array<ApiMessageRef>) => Promise<boolean>;

  createSocket: (
    useSSL: boolean,
    verbose: boolean,
    adapter: WebSocketAdapter,
    sendTimeoutMs: number
  ) => Socket;

  on: (event: string, func: Function) => void;
  remove: (event: string, func: Function) => void;

}

/** A client for Mezon server. */
export class MezonClient implements Client {

  /** The expired timespan used to check session lifetime. */
  public expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;

  /** The low level API client for Nakama server. */
  private readonly apiClient: MezonApi;

  /** the socket */
  private socket: Socket;

  /** the session */
  private session: Session | undefined;

  [key: string]: any;

  constructor(
      readonly apiKey = DEFAULT_API_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      readonly useSSL = DEFAULT_SSL,
      readonly timeout = DEFAULT_TIMEOUT_MS,
      readonly autoRefreshSession = true) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new MezonApi(apiKey, basePath, timeout);

    /**init event to connect socket*/
    for (const event in Events) {
      const key = this.generateKey(
        Events[event as keyof typeof Events]
      );
      if (!(key in this)) {
        this[key] = [];
      }else{
        this[key] = [this[key]];
      }
    }

    this.socket = this.createSocket(this.useSSL, false, new WebSocketAdapterPb());
  }

  async sendMessage(clan_id: string, channel_id: string, mode: number, msg: string, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, ref?: Array<ApiMessageRef>) {
    const msgACK = await this.socket.writeChatMessage(clan_id, channel_id, mode, msg, mentions, attachments, ref);
    return Promise.resolve(msgACK.channel_id === channel_id);
  }

  /** Authenticate a user with an ID against the server. */
  async authenticate() {
    return this.apiClient.mezonAuthenticate(this.apiKey, "", {
      account: {
        token: this.apiKey,
      }
    }).then(async (apiSession : ApiSession) => {
      const sockSession = new Session(apiSession.token || "", apiSession.refresh_token || "");
      this.session = await this.socket.connect(sockSession, true);

      if (!this.session) {
        return Promise.resolve("error authenticate");
      }
      
      const clans = await this.apiClient.listClanDescs(this.session.token);
      clans.clandesc?.forEach(async clan => {
        await this.socket.joinClanChat(clan.clan_id || '');
      })

      // join direct message
      await this.socket.joinClanChat("0");

      this.connectSocket();
      
      return Promise.resolve("connect successful");
    });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(session: Session) {

    const request : ApiAuthenticateRefreshRequest = {
      "refresh_token": session.refresh_token,
    };

    return this.apiClient.mezonAuthenticateRefresh(this.apiKey, "", request).then((apiSession : ApiSession) => {
      return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
    });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async logout(session: Session) {

    const request : ApiAuthenticateLogoutRequest = {
      "token": session.token,
      "refresh_token": session.refresh_token
    };

    return this.apiClient.mezonAuthenticateLogout(session.token, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose: boolean = false, adapter : WebSocketAdapter = new WebSocketAdapterPb(), sendTimeoutMs : number = DefaultSocket.DefaultSendTimeoutMs): Socket {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }

   /**Add handle function to event socket */
   on(method: string, func: Function) {
    const key = this.generateKey(method);
    if (!(key in this)) {
      throw new Error("Mezon SDK not support this method");
    }

    if (typeof func != "function"){
      throw new Error("Please add function to event");
    }

    const handleFunctions: Function[] = this[key];
    if (Array.isArray(handleFunctions)) {
      handleFunctions.push(func);
    } 
  }

  /**remove handle function to event socket */
  remove(method: string, func: Function) {
    const key = this.generateKey(method);
    if (!(key in this)) {
      throw new Error("Mezon SDK not support this method");
    }
    const handleFunctions: Function[] = this[key];
    if (Array.isArray(handleFunctions)) {
      this[key] = handleFunctions.filter((f) => f != func);
    } 
  }

  /**Create connect to event socket */
  connectSocket() {
    for (const event in Events) {
      const key =  this.generateKey(Events[event as keyof typeof Events]);
      this.socket[key] = (...args: any[]) => {
        const handleFunctions = this[key];
        if (Array.isArray(handleFunctions)) {
          handleFunctions.forEach((func) => {
            if (typeof func == "function") {
              func.apply(this, args);
            }
          });
        };
      }
    }
  }

  /**generate key of event from name */
  generateKey(event: string) {
    return `on${event}`;
  }

  ondisconnect(e: CloseEvent) {
    console.log("disconnected", e, "reconnecting...");
    const interval = setInterval(async () => {
      this.socket = this.createSocket(this.useSSL, false, new WebSocketAdapterPb());
      this.session = await this.socket.connect(this.session as Session, true);

      if (!this.session) {
        console.log("session is null");
        return;
      }
      
      const clans = await this.apiClient.listClanDescs(this.session.token);
      clans.clandesc?.forEach(async clan => {
        await this.socket.joinClanChat(clan.clan_id || '');
      })

      // join direct message
      await this.socket.joinClanChat("0");

      this.connectSocket();

      clearInterval(interval);
    }, 5000);
  }
};
