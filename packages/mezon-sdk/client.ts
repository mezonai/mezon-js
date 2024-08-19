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

import { MezonApi, ApiAuthenticateLogoutRequest, ApiAuthenticateRefreshRequest, ApiUpdateMessageRequest, ApiSession } from "./api";
import { Session } from "./session";
import { ChannelCreatedEvent, ChannelDeletedEvent, ChannelUpdatedEvent, DefaultSocket, Socket, UserChannelAddedEvent, UserChannelRemovedEvent, UserClanRemovedEvent, VoiceJoinedEvent } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
import { WebSocketAdapterPb } from 'mezon-js-protobuf';

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;


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
  emoji_id: string;
  //
  emoji: string;
  //
  id?: string;
  //
  sender_id?: string;
  //
  sender_name?: string;
  //
  sender_avatar?: string;
  // count of emoji
  count: number;
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The message that user react */
  message_id: string;
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
  has_attachment: boolean;
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  //The unique ID of this message.
  id: string;
  //
  avatar?: string;
  //The channel this message belongs to.
  channel_id: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channel_label: string;
  //The clan this message belong to.
  clan_id?: string;
  //The code representing a message type or category.
  code: number;
  //The content payload.
  content: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time: string;
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
  sender_id: string;
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

/** A client for Mezon server. */
export class Client {

  /** The expired timespan used to check session lifetime. */
  public expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;

  /** The low level API client for Nakama server. */
  private readonly apiClient: MezonApi;

  constructor(
      readonly apiKey = DEFAULT_API_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      readonly useSSL = false,
      readonly timeout = DEFAULT_TIMEOUT_MS,
      readonly autoRefreshSession = true) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new MezonApi(apiKey, basePath, timeout);
  }

  /** Authenticate a user with an ID against the server. */
  async authenticate() {
    return this.apiClient.mezonAuthenticate(this.apiKey, "", {
      account: {
        token: this.apiKey,
      }
    }).then(async (apiSession : ApiSession) => {
      const sockSession = new Session(apiSession.token || "", apiSession.refresh_token || "");
      const socket = this.createSocket(false, true, new WebSocketAdapterPb());
      const session = await socket.connect(sockSession, false);

      const clans = await this.apiClient.listClanDescs(session.token);
      clans.clandesc?.forEach(clan => {
        socket.joinClanChat(clan.clan_id || '');
      })

      if (!session) {
        console.log("error authenticate");
        return;
      }

      socket.onchannelmessage = this.onchannelmessage;
      socket.ondisconnect = this.ondisconnect;
      socket.onerror = this.onerror;
      socket.onmessagereaction = this.onmessagereaction;
      socket.onuserchannelremoved = this.onuserchannelremoved;
      socket.onuserclanremoved = this.onuserclanremoved;
      socket.onuserchanneladded = this.onuserchanneladded;        
      socket.onchannelcreated = this.onchannelcreated;
      socket.onchanneldeleted = this.onchanneldeleted;
      socket.onchannelupdated = this.onchannelupdated;
      socket.onheartbeattimeout = this.onheartbeattimeout;
      
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

  async deleteMessage(session : Session, id : string) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.mezonDeleteMessage(session.token, id).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  async updateMessage(session : Session, id : string, consume_time? : string, read_time? : string) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiUpdateMessageRequest = {
      id: id,
      consume_time: consume_time,
      read_time: read_time
    };

    return this.apiClient.mezonUpdateMessage(session.token, id, request).then((response) => {
      return Promise.resolve(response !== undefined);
    });
  }

  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose: boolean = false, adapter : WebSocketAdapter = new WebSocketAdapterPb(), sendTimeoutMs : number = DefaultSocket.DefaultSendTimeoutMs): Socket {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }

  onerror(evt: Event) {
    console.log(evt);
  }

  onmessagereaction(messagereaction: ApiMessageReaction) {
    console.log(messagereaction);
    if (messagereaction.action) {
      this.onMessageReactionRemove(messagereaction);
    } else {
      this.onMessageReactionAdd(messagereaction);
    }
  }

  onchannelmessage(channelMessage: ChannelMessage) {
    this.onMessage(channelMessage);
  }

  ondisconnect(e: Event) {
    console.log(e);
  }

  onuserchanneladded(user: UserChannelAddedEvent) {
      console.log(user);
  }

  onuserchannelremoved(user: UserChannelRemovedEvent) {
    console.log(user);
  }

  onuserclanremoved(user: UserClanRemovedEvent) {
    this.onClanMemberUpdate(user.user_ids, true);
  }

  onchannelcreated(channelCreated: ChannelCreatedEvent) {
    console.log(channelCreated);
  }

  onchanneldeleted(channelDeleted: ChannelDeletedEvent) {
    console.log(channelDeleted);
  }

  onchannelupdated(channelUpdated: ChannelUpdatedEvent) {
    console.log(channelUpdated);
  }

  onheartbeattimeout() {
    console.log("Heartbeat timeout.");
  }

  /** Receive clan evnet. */
  onMessage!: (channelMessage: ChannelMessage) => void;
  onClanMemberUpdate!: (member_id: Array<string>, leave: boolean) => void;
  onMessageDelete!: (channelMessage: ChannelMessage) => void;
  onMessageReactionAdd!: (messageReactionEvent: ApiMessageReaction) => void;
  onVoiceStateUpdate!: (voiceState: VoiceJoinedEvent) => void;
  onMessageReactionRemove!: (messageReactionEvent: ApiMessageReaction) => void;

};
