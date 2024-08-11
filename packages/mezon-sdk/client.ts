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

import { MezonApi, ApiSession, ApiAuthenticateRequest, ApiAuthenticateLogoutRequest, ApiAuthenticateRefreshRequest, ApiUpdatePropertiesRequest, ApiUpdateMessageRequest } from "./api";

import { Session } from "./session";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7450";
const DEFAULT_API_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

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
  async authenticate(id: string, customProperties?: Record<string, string>, defaultProperties?: Record<string, string>) {

    const request : ApiAuthenticateRequest = {
      "id": id,
      custom: customProperties,
      default: defaultProperties
    };

    return this.apiClient.mezonAuthenticate(this.apiKey, "", request).then((apiSession : ApiSession) => {
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

  /** List properties associated with this identity. */
  async listProperties(session: Session) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.mezonListProperties(session.token);
  }

  /** Update identity properties. */
  async updateProperties(session: Session, defaultProperties?: Record<string, string>, customProperties?: Record<string, string>, recompute?: boolean) {
    if (this.autoRefreshSession && session.refresh_token &&
      session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
      await this.sessionRefresh(session);
    }

    const request : ApiUpdatePropertiesRequest = {
      default: defaultProperties,
      custom: customProperties,
      recompute: recompute,
    };

    return this.apiClient.mezonUpdateProperties(session.token, request).then((response) => {
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
};
