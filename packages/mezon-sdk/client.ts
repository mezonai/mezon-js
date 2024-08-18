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
import { ApiMessageReaction, ChannelCreatedEvent, ChannelDeletedEvent, ChannelMessage, ChannelUpdatedEvent, DefaultSocket, Socket, UserChannelAddedEvent, UserChannelRemovedEvent, UserClanRemovedEvent, VoiceJoinedEvent } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
import { WebSocketAdapterPb } from 'mezon-js-protobuf';

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7450";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

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
  async authenticate(token: string) {
    return this.apiClient.mezonAuthenticate(token).then((apiSession : ApiSession) => {
      const sockSession = new Session(apiSession.token || "", apiSession.refresh_token || "");
      const socket = this.createSocket(true, false, new WebSocketAdapterPb());
      socket.connect(sockSession, true).then((session) => {
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
      });
      
      return Promise.resolve(new Session(apiSession.token || "", apiSession.refresh_token || ""));
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
  }

  onchannelmessage(channelMessage: ChannelMessage) {
    console.log(channelMessage);
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
    console.log(user);
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
  onClanMemberUpdate!: (oldMember: ApiUser, newMember: ApiUser) => void;
  onMessageDelete!: (channelMessage: ChannelMessage) => void;
  onMessageReactionAdd!: (messageReactionEvent: ApiMessageReaction) => void;
  onVoiceStateUpdate!: (voiceState: VoiceJoinedEvent) => void;
  onMessageReactionRemove!: (messageReactionEvent: ApiMessageReaction) => void;

};
