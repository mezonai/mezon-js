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
import {
  ApiAuthenticateLogoutRequest,
  ApiRegisterStreamingChannelRequest,
  ApiSession,
  ApiVoiceChannelUserList,
  Socket,
} from "./interfaces";
import { MezonApi } from './api';
import { Session } from "./session";
import { DefaultSocket } from "./socket";
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
import { convertChanneltypeToChannelMode } from "./utils/helper";
import { replyMessageGenerate } from "./utils/generate_reply_message";
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

  private _DMchannels : {[x: string] : ApiChannelDescription} = {};

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
          const key = Events[event as keyof typeof Events].toString();
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
    return msgACK;
  }

  /** Authenticate a user with an ID against the server. */
  async authenticate() {
    return this.apiClient.mezonAuthenticate(this.apiKey, "", {
      account: {
        token: this.apiKey,
      }
    }).then(async (apiSession : ApiSession) => {
      const sockSession = new Session(apiSession);
      this.session = await this.socket.connect(sockSession, true);

      if (!this.session) {
        return Promise.resolve("error authenticate");
      }

      await this.connectSocket();
      
      return Promise.resolve("connect successful");
    });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh() {

    return this.apiClient.mezonAuthenticate(this.apiKey, "", {
      account: {
        token: this.apiKey,
      }
    }).then((apiSession : ApiSession) => {
      const newSession = new Session(apiSession);
      this.session = newSession;
      return Promise.resolve(newSession);
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
  	const key = event;
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
  	const key = event;
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
  		const key = Events[event as keyof typeof Events].toString();
  		this.socket.socketEvents.on(key, (...args: any[]) => {
        const handleFunctions = this[key];
        if (Array.isArray(handleFunctions)) {
          handleFunctions.forEach((func) => {
            if (typeof func == "function") {
              Promise.resolve(func(...args)).catch((err) => {
                if (func.toString().includes(" this.")) {
                  console.log(
                    `Please using arrow function for function ${func.name} or add event with context with sync like .on('event', callback, this) pass 'this variable' in to get context`
                  );
                }
                console.log(err);
              });
            }
          });
        }
      });
  	}
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
      await this.sessionRefresh();
    }
  
    return this.apiClient
      .createChannelDesc(session.token, request);
  }


  async getDMchannel(userId: string) : Promise<null | ApiChannelDescription> {
    try{
      if (!userId) return null;

      const request : ApiCreateChannelDescRequest = {
        clan_id: "0",
        channel_id: "0",
        category_id: "0",
        type: 3,
        user_ids: [userId],
        channel_private: 1,
      }
      if (!(userId in this._DMchannels)) {
        const channelDM = await this.createChannelDesc(request);

        if (channelDM) {
          this._DMchannels[userId] = channelDM;
          await this.socket.joinChat(
            channelDM.clan_id!,
            channelDM.parent_id!,
            channelDM.channel_id!,
            channelDM.type!,
            false,
            false
          );
          return channelDM;
        }

        return null;
      } else {
        return this._DMchannels[userId];
      }
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async sendMessageUser(
    userId: string,
    msg: string,
    messOptions: {[x: string]: any} = {},
    attachments: Array<ApiMessageAttachment> = []
  ) {
      const channelDM = await this.getDMchannel(userId);

      if (!channelDM) throw Error(`can't get channel DM`);
      
      const message = {
        clan_id: channelDM.clan_id!,
        channel_id: channelDM.channel_id!,
        is_public: false,
        is_parent_public: false,
        parent_id: channelDM.parent_id!,
        mode: convertChanneltypeToChannelMode(channelDM.type!),
        mentions: [],
        attachments: attachments,
        ref: [],
      };
      const mess = replyMessageGenerate(
        { messageContent: msg, ...messOptions },
        message
      );
      return this.sendMessage(
        mess.clan_id,
        mess.parent_id,
        mess.channel_id,
        mess.mode,
        mess.is_public,
        mess.is_parent_public,
        mess.msg,
        [],
        mess.attachments,
        []
      );
  }

    /** List a channel's users. */
  async listChannelVoiceUsers(
      clanId: string,
      channelId: string,
      channelType: number,
      limit: number = 500,
      state?: number,
      cursor?: string
    ): Promise<ApiVoiceChannelUserList> {
      if (limit <= 0 || limit > 500) {
        console.log("0 < limit <= 500");
        throw Error("0 < limit <= 500");
      }
      const session = this.session!;
      if (
        this.autoRefreshSession &&
        session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs) / 1000)
      ) {
        await this.sessionRefresh();
      }

      return this.apiClient
        .listChannelVoiceUsers(
          session.token,
          clanId,
          channelId,
          channelType,
          limit,
          state,
          cursor
        )
        .then((response: ApiVoiceChannelUserList) => {
          var result: ApiVoiceChannelUserList = {
            voice_channel_users: [],
          };

          if (response.voice_channel_users == null) {
            return Promise.resolve(result);
          }

          response.voice_channel_users!.forEach((gu) => {
            result.voice_channel_users!.push({
              id: gu.id,
              channel_id: gu.channel_id,
              user_id: gu.user_id,
              participant: gu.participant,
            });
          });
          return Promise.resolve(result);
        });
    }

  async registerStreamingChannel(request: ApiRegisterStreamingChannelRequest) {
      const session = this.session!;
      if (
        this.autoRefreshSession &&
        session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs) / 1000)
      ) {
        await this.sessionRefresh();
      }
  
      return this.apiClient
        .registerStreamingChannel(session.token, request);
    }
};
