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

import { CloseEvent, ErrorEvent} from "ws";
import { ApiAuthenticateLogoutRequest, ApiAuthenticateRefreshRequest, ApiSession } from "./interfaces";
import { MezonApi } from './api';
import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
import { WebSocketAdapterPb } from './web_socket_adapter_pb';
import { Events } from "./constants/enum";
import {
  Client,
  ApiChannelDescription,
  ApiCreateChannelDescRequest,
  ChannelMessageContent,
  ApiMessageMention,
  ApiMessageAttachment,
  ApiMessageRef
} from "./interfaces";
const DEFAULT_HOST = "mezon.vn";
const DEFAULT_PORT = "7305";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_SSL = true;
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;


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
        const scheme = useSSL ? "https://" : "http://";
        const basePath = `${scheme}${host}:${port}`;

        this.apiClient = new MezonApi(apiKey, basePath, timeout);

        /**init event to connect socket*/
        for (const event in Events) {
          const key = this.generateKey(Events[event as keyof typeof Events]);
          if (!(key in this)) {
            this[key] = [];
          } 
        }

        this.socket = this.createSocket(
          this.useSSL,
          false,
          new WebSocketAdapterPb()
        );
      }

  async sendMessage(clan_id: string, parent_id: string, channel_id: string, mode: number, is_public: boolean, is_parent_public: boolean, msg: ChannelMessageContent, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, ref?: Array<ApiMessageRef>) {
    const msgACK = await this.socket.writeChatMessage(clan_id, parent_id, channel_id, mode, is_public, is_parent_public, msg, mentions, attachments, ref);
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

      await this.connectSocket();
      
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
  on(event: string, func: Function, context : any = null) {
  	const key = this.generateKey(event);
  	if (!(key in this)) {
  		throw new Error("Mezon SDK not support this event");
  	}

  	if (typeof func != "function") {
  		throw new Error("Please add function to event");
  	}

  	const handleFunctions: Function[] = this[key];
  	if (Array.isArray(handleFunctions)) {
  		handleFunctions.push(context ? func.bind(context) : func);
  	}
  }

  /**remove handle function to event socket */
  remove(event: string, func: Function) {
  	const key = this.generateKey(event);
  	if (!(key in this)) {
  		throw new Error("Mezon SDK not support this event");
  	}
  	const handleFunctions: Function[] = this[key];
  	if (Array.isArray(handleFunctions)) {
  		this[key] = handleFunctions.filter((f) => f != func);
  	}
  }

  /**Create connect to event socket */
  async connectSocket() {
    const clans = await this.apiClient.listClanDescs(this.session!.token);
    clans.clandesc?.forEach(async clan => {
      await this.socket.joinClanChat(clan.clan_id || '');
    })

    // join direct message
    await this.socket.joinClanChat("0");
    ["ondisconnect", "onerror", "onheartbeattimeout"].forEach((event) => {
      this.socket[event] = this[event].bind(this);
    });
  	for (const event in Events) {
  		const key = this.generateKey(Events[event as keyof typeof Events]);
  		this.socket[key] = (...args: any[]) => {
  			const handleFunctions = this[key];
  			if (Array.isArray(handleFunctions)) {
  				handleFunctions.forEach((func) => {
  					if (typeof func == "function") {
  						Promise.resolve(func(...args)).catch(err => {
                if (func.toString().includes(' this.')){
                  console.log(`Please using arrow function for function ${func.name} or add event with context with sync like .on('event', callback, this) pass 'this variable' in to get context`);
                }
                console.log(err);
              });
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

  
  onerror(evt: ErrorEvent) {
    console.log(evt);
    this.retriesConnect();
  }

  onheartbeattimeout() {
    console.log("Heartbeat timeout.");
  }

  ondisconnect(e: CloseEvent) {
    console.log("disconnected", e, "reconnecting...");
    this.retriesConnect();
  }

  retriesConnect() {
    const interval = setInterval(async () => {
      try {
        this.socket = this.createSocket(
          this.useSSL,
          false,
          new WebSocketAdapterPb()
        );
        const result = await this.authenticate();  
        console.log(result);
        clearInterval(interval);
      } catch (e) {
        console.log(e);
      }
    }, 5000);
  }

  async createChannelDesc(
    request: ApiCreateChannelDescRequest
  ): Promise<void | ApiChannelDescription> {
    if (!this.session) return;
    const session = this.session;
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs) / 1000)
    ) {
      await this.sessionRefresh(session);
    }
  
    return this.apiClient
      .createChannelDesc(session.token, request);
  }
};
