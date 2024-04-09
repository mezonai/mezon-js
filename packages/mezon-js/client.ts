/**
 * Copyright 2020 The Mezon Authors
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

import {
  ApiAccount,
  ApiAccountCustom,
  ApiAccountDevice,
  ApiAccountEmail,
  ApiAccountFacebook,
  ApiAccountFacebookInstantGame,
  ApiAccountGoogle,
  ApiAccountGameCenter,
  ApiAccountSteam,
  ApiChannelMessageList,
  ApiChannelDescList,
  ApiChannelDescription,
  ApiCreateChannelDescRequest,
  ApiClanDescList,
  ApiCreateClanDescRequest,
  ApiClanDesc,
  ApiCategoryDesc,
  ApiCategoryDescList,
  ApiRoleList,
  ApiPermissionList,
  ApiRoleUserList,
  ApiRole,
  ApiCreateRoleRequest,
  ApiAddRoleChannelDescRequest,
  ApiCreateCategoryDescRequest,
  ApiUpdateCategoryDescRequest,
  ApiDeleteStorageObjectsRequest,
  ApiEvent,
  ApiFriendList,
  ApiNotificationList,
  ApiReadStorageObjectsRequest,
  ApiRpc,
  ApiStorageObjectAcks,
  ApiStorageObjectList,
  ApiStorageObjects,
  ApiUpdateAccountRequest,
  ApiUsers,
  ApiWriteStorageObjectsRequest,
  MezonApi,
  ApiSession,
  ApiAccountApple,
  ApiLinkSteamRequest,
  ApiClanDescProfile,
  ApiClanProfile,
  ApiChannelUserList,
  ApiClanUserList,
  ApiLinkInviteUserRequest,
  ApiLinkInviteUser,
  ApiInviteUserRes,
  ApiUploadAttachmentRequest,
  ApiUploadAttachment,
  ApiMessageReaction,
  ApiMessageMention,
  ApiMessageAttachment,
  ApiMessageRef,
  ApiChannelMessageHeader,
  ApiVoiceChannelUserList,
} from "./api.gen";

import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 7000;
const DEFAULT_EXPIRED_TIMESPAN_MS = 5 * 60 * 1000;

export enum ChannelType {
  CHANNEL_TYPE_TEXT = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_VOICE = 4,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_ANNOUNCEMENT = 6,
}
export enum ChannelStreamMode {  
  STREAM_MODE_CHANNEL = 2,
  STREAM_MODE_GROUP = 3,
  STREAM_MODE_DM = 4,
}

/** Response for an RPC function executed on the server. */
export interface RpcResponse {
  /** The identifier of the function. */
  id?: string;
  /** The payload of the function which must be a JSON object. */
  payload?: object;
}

/** The object to store. */
export interface WriteStorageObject {
  /** The collection to store the object. */
  collection?: string;
  /** The key for the object within the collection. */
  key?: string;
  /** The read access permissions for the object. */
  permission_read?: number;
  /** The write access permissions for the object. */
  permission_write?: number;
  /** The value of the object. */
  value?: object;
  /** The version hash of the object to check. Possible values are: ["", "*", "#hash#"]. */
  version?: string;
}

/** An object within the storage engine. */
export interface StorageObject {
  /** The collection which stores the object. */
  collection?: string;
  /** The UNIX time when the object was created. */
  create_time?: string;
  /** The key of the object within the collection. */
  key?: string;
  /** The read access permissions for the object. */
  permission_read?: number;
  /** The write access permissions for the object. */
  permission_write?: number;
  /** The UNIX time when the object was last updated. */
  update_time?: string;
  /** The user owner of the object. */
  user_id?: string;
  /** The value of the object. */
  value?: object;
  /** The version hash of the object. */
  version?: string;
}

/** List of storage objects. */
export interface StorageObjectList {
  /** The cursor associated with the query a page of results. */
  cursor?: string;
  /** The list of storage objects. */
  objects: Array<StorageObject>;
}

/** Batch of storage objects. */
export interface StorageObjects {
  /** The batch of storage objects. */
  objects: Array<StorageObject>;
}

/** A message sent on a channel. */
export interface ChannelMessage {
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

  //The unique ID of this message.
  id: string;
  //True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  //Message sender, usually a user ID.
  sender_id: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time?: string;
  //The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  user_id_one?: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  user_id_two?: string;
  //The username of the message sender, if any.
  username?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheable_cursor?: string;
  /**last seen message from user on channel */
  last_seen_message?: ApiChannelMessageHeader;
  /** A list of messages. */
  messages?: Array<ChannelMessage>;
  /** The cursor to send when retireving the next page, if any. */
  next_cursor?: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor?: string;
}

/** A user in the system. */
export interface User {
  /** A URL for an avatar image. */
  avatar_url?: string;
  /** The UNIX time when the user was created. */
  create_time?: string;
  /** The display name of the user. */
  display_name?: string;
  /** Number of related edges to this user. */
  edge_count?: number;
  /** The Facebook id in the user's account. */
  facebook_id?: string;
  /** The Facebook Instant Game ID in the user's account. */
  facebook_instant_game_id?: string;
  /** The Apple Game Center in of the user's account. */
  gamecenter_id?: string;
  /** The Google id in the user's account. */
  google_id?: string;
  /** The id of the user's account. */
  id?: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag?: string;
  /** The location set by the user. */
  location?: string;
  /** Additional information stored as a JSON object. */
  metadata?: {};
  /** Indicates whether the user is currently online. */
  online?: boolean;
  /** The Steam id in the user's account. */
  steam_id?: string;
  /** The timezone set by the user. */
  timezone?: string;
  /** The UNIX time when the user was last updated. */
  update_time?: string;
  /** The username of the user's account. */
  username?: string;
}

/** A collection of zero or more users. */
export interface Users {
  /** The User objects. */
  users?: Array<User>;
}

/** A friend of a user. */
export interface Friend {
  /** The friend status. */
  state?: number;
  /** The user object. */
  user?: User;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  /** The Friend objects. */
  friends?: Array<Friend>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A user-role pair representing the user's role in a group. */
export interface GroupUser {
  /** The user. */
  user?: User;
  /** Their role within the group. */
  state?: number;
}

/** A list of users belonging to a group along with their role in it. */
export interface GroupUserList {
  /** The user-role pairs. */
  group_users?: Array<GroupUser>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A group in the server. */
export interface Group {
  /** A URL for an avatar image. */
  avatar_url?: string;
  /** The UNIX time when the group was created. */
  create_time?: string;
  /** The id of the user who created the group. */
  creator_id?: string;
  /** A description for the group. */
  description?: string;
  /** The current count of all members in the group. */
  edge_count?: number;
  /** The id of a group. */
  id?: string;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag?: string;
  /** The maximum number of members allowed. */
  max_count?: number;
  /** Additional information stored as a JSON object. */
  metadata?: {};
  /** The unique name of the group. */
  name?: string;
  /** Anyone can join open groups, otherwise only admins can accept members. */
  open?: boolean;
  /** The UNIX time when the group was last updated. */
  update_time?: string;
}

/** One or more groups returned from a listing operation. */
export interface GroupList {
  /** A cursor used to get the next page. */
  cursor?: string;
  /** One or more groups. */
  groups?: Array<Group>;
}

/** A group-role pair representing the user's groups and their role in each. */
export interface UserGroup {
  /** The group. */
  group?: Group;
  /** The user's role within the group. */
  state?: number;
}

/** A list of groups belonging to a user along with their role in it. */
export interface UserGroupList {
  /** The group-role pairs. */
  user_groups?: Array<UserGroup>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A notification in the server. */
export interface Notification {
  /** Category code for this notification. */
  code?: number;
  /** Content of the notification in JSON. */
  content?: {};
  /** The UNIX time when the notification was created. */
  create_time?: string;
  /** ID of the Notification. */
  id?: string;
  /** True if this notification was persisted to the database. */
  persistent?: boolean;
  /** ID of the sender, if a user. Otherwise 'null'. */
  sender_id?: string;
  /** Subject of the notification. */
  subject?: string;
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
  cacheable_cursor?: string;
  /** Collection of notifications. */
  notifications?: Array<Notification>;
}

/** Update fields in a given channel. */
export interface ApiUpdateChannelDescRequest {
  /** The ID of the channel to update. */
  channel_id: string;
  /** The channel lable */
  channel_lable:
    | string
    | undefined;
  /** The category of channel */
  category_id: string | undefined;
}

/** Add users to a channel. */
export interface ApiAddChannelUsersRequest {
  /** The channel to add users to. */
  channel_id: string;
  /** The users to add. */
  user_ids: string[];
}

/** Kick a set of users from a channel. */
export interface ApiKickChannelUsersRequest {
  /** The channel ID to kick from. */
  channel_id: string;
  /** The users to kick. */
  user_ids: string[];
}

/** Leave a channel. */
export interface ApiLeaveChannelRequest {
  /** The channel ID to leave. */
  channel_id: string;
}

/** Update Clan information */
export interface ApiUpdateClanDescRequest {
  clan_id: string;
  /** Clan creator */
  creator_id: string;
  /** Clan name */
  clan_name: string;
  /** Clan logo */
  logo: string;
  /** Clan banner */
  banner: string;
}

/** Update Clan profile information */
export interface ApiUpdateClanDescProfileRequest {
  /** Clan id */
  clan_id: string;
  /** Clan nick name */
  nick_name: string;
  /** Clan profile banner */
  profile_banner: string;
  /** Clan profile theme */
  profile_theme: string;
  /** Clan profile avatar */
  avatar_url: string;
}

export interface ApiUpdateClanProfileRequest {
  /** Clan id*/
  clan_id: string;
  /** Clan nick name */
  nick_name: string;
  /** Clan profile avatar */
  avatar: string;
}

/** Update fields in a given role. */
export interface ApiUpdateRoleRequest {
  /** The ID of the role to update. */
  role_id: string;
  title: string | undefined;
  color: string | undefined;
  role_icon: string | undefined;
  description: string | undefined;
  display_online: number | undefined;
  allow_mention:
    | number
    | undefined;
  /** The users to add. */
  add_user_ids: string[];
  /** The permissions to add. */
  active_permission_ids: string[];
  /** The users to remove. */
  remove_user_ids: string[];
  /** The permissions to remove. */
  remove_permission_ids: string[];
}

/** A client for Mezon server. */
export class Client {

  /** The expired timespan used to check session lifetime. */
  public expiredTimespanMs = DEFAULT_EXPIRED_TIMESPAN_MS;

  /** The low level API client for Mezon server. */
  private readonly apiClient: MezonApi;

  constructor(
      readonly serverkey = DEFAULT_SERVER_KEY,
      readonly host = DEFAULT_HOST,
      readonly port = DEFAULT_PORT,
      readonly useSSL = false,
      readonly timeout = DEFAULT_TIMEOUT_MS,
      readonly autoRefreshSession = true) {
    const scheme = (useSSL) ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new MezonApi(serverkey, basePath, timeout);
  }

  /** Add users to a channel, or accept their join requests. */
  async addChannelUsers(session: Session, channelId: string, ids?: Array<string>): Promise<boolean> {

    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.addChannelUsers(session.token, channelId, ids).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add friends by ID or username to a user's account. */
  async addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {

    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.addFriends(session.token, ids, usernames).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Authenticate a user with an Apple ID against the server. */
  async authenticateApple(token: string, create?: boolean, username?: string, vars: Record<string, string> = {}, options: any = {}) {

    const request = {
      "token": token,
      "vars": vars
    };

    return this.apiClient.authenticateApple(this.serverkey, "", request, create, username, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a custom id against the server. */
  authenticateCustom(id: string, create?: boolean, username?: string, vars: Record<string, string> = {}, options: any = {}): Promise<Session> {
    const request = {
      "id": id,
      "vars": vars
    };
    return this.apiClient.authenticateCustom(this.serverkey, "", request, create, username, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a device id against the server. */
  authenticateDevice(id : string, create?: boolean, username?: string, vars? : Record<string, string>): Promise<Session> {
    const request = {
      "id": id,
      "vars": vars
    };

    return this.apiClient.authenticateDevice(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(email: string, password: string, create?: boolean, username?: string, vars?: Record<string,string>): Promise<Session> {
    const request = {
      "email": email,
      "password": password,
      "vars": vars
    };

    return this.apiClient.authenticateEmail(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with a Facebook Instant Game token against the server. */
  authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Record<string, string>, options: any = {}): Promise<Session> {
    const request = {
      "signed_player_info": signedPlayerInfo,
      "vars": vars
    };

    return this.apiClient.authenticateFacebookInstantGame(this.serverkey, "",
      {signed_player_info: request.signed_player_info, vars: request.vars}, create, username, options).then((apiSession : ApiSession) => {
        return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
      });
  }

  /** Authenticate a user with a Facebook OAuth token against the server. */
  authenticateFacebook(token : string, create?: boolean, username?: string, sync?: boolean, vars? : Record<string, string>, options: any = {}): Promise<Session> {
    const request = {
      "token": token,
      "vars": vars
    };

    return this.apiClient.authenticateFacebook(this.serverkey, "", request, create, username, sync, options).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Authenticate a user with Google against the server. */
  async authenticateGoogle(
    token: string,
    create?: boolean,
    username?: string,
    vars?: Record<string, string>,
    options: any = {}
  ): Promise<Session> {
    const request: ApiAccountGoogle = {
      token,
      vars,
    };

    const apiSession = await this.apiClient.authenticateGoogle(
      this.serverkey,
      "",
      request,
      create,
      username,
      options
    );

    return new Session(
      apiSession.token || "",
      apiSession.refresh_token || "",
      apiSession.created || false
    );
  }

  /** Authenticate a user with GameCenter against the server. */
  async authenticateGameCenter(
    bundleId: string,
    playerId: string,
    publicKeyUrl: string,
    salt: string,
    signature: string,
    timestamp: string,
    username?: string,
    create?: boolean,
    vars?: Record<string, string>,
    options: any = {},
  ): Promise<Session> {
    const request: ApiAccountGameCenter = {
      bundle_id: bundleId,
      player_id: playerId,
      public_key_url: publicKeyUrl,
      salt,
      signature,
      timestamp_seconds: timestamp,
      vars,
    };

    const apiSession = await this.apiClient.authenticateGameCenter(
      this.serverkey,
      "",
      request,
      create,
      username,
      options
    );

    return new Session(
      apiSession.token || "",
      apiSession.refresh_token || "",
      apiSession.created || false
    );
  }

  /** Authenticate a user with Steam against the server. */
  async authenticateSteam(token : string, create?: boolean, username?: string, sync?: boolean, vars? : Record<string, string>) : Promise<Session> {
    const request = {
      "token": token,
      "vars": vars,
      "sync": sync
    };

    return this.apiClient.authenticateSteam(this.serverkey, "", request, create, username).then((apiSession : ApiSession) => {
      return new Session(apiSession.token || "", apiSession.refresh_token || "", apiSession.created || false);
    });
  }

  /** Block one or more users by ID or username. */
  async blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.blockFriends(session.token, ids, usernames).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadAttachmentFile(session: Session, request: ApiUploadAttachmentRequest): Promise<ApiUploadAttachment> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.uploadAttachmentFile(session.token, request);
  }

  /** Create a channel within clan */
  async createChannelDesc(session: Session, request: ApiCreateChannelDescRequest): Promise<ApiChannelDescription> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createChannelDesc(session.token, request).then((response: ApiChannelDescription) => {
      return Promise.resolve(response);
    });
  }

  /** Create a clan */
  async createClanDesc(session: Session, request: ApiCreateClanDescRequest): Promise<ApiClanDesc> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createClanDesc(session.token, request).then((response: ApiClanDesc) => {
      return Promise.resolve(response);
    });
  }

  /**  */
  async createCategoryDesc(session: Session, request: ApiCreateCategoryDescRequest): Promise<ApiCategoryDesc> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createCategoryDesc(session.token, request).then((response: ApiCategoryDesc) => {
      return Promise.resolve(response);
    });
  }

  /** Create a new role for clan. */
  async createRole(session: Session, request: ApiCreateRoleRequest): Promise<ApiRole> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createRole(session.token, request).then((response: ApiRole) => {
      return Promise.resolve(response);
    });
  }

  /** add role for channel. */
  async addRolesChannelDesc(session: Session, request: ApiAddRoleChannelDescRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.addRolesChannelDesc(session.token, request).then((response: ApiRole) => {
      return response !== undefined;
    });
  }

   /** Update action role when delete role */
   async deleteRoleChannelDesc(session: Session, roleId:string, request:{}): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteRoleChannelDesc(session.token, roleId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** A socket created with the client's configuration. */
  createSocket(useSSL = false, verbose: boolean = false, adapter : WebSocketAdapter = new WebSocketAdapterText(), sendTimeoutMs : number = DefaultSocket.DefaultSendTimeoutMs): Socket {
    return new DefaultSocket(this.host, this.port, useSSL, verbose, adapter, sendTimeoutMs);
  }

  /** Delete one or more users by ID or username. */
  async deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteFriends(session.token, ids, usernames).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete a channel by ID. */
  async deleteChannelDesc(session: Session, channelId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteChannelDesc(session.token, channelId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete a clan desc by ID. */
  async deleteClanDesc(session: Session, clanDescId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteClanDesc(session.token, clanDescId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete a category by ID. */
  async deleteCategoryDesc(session: Session, creatorId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteCategoryDesc(session.token, creatorId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete one or more notifications */
  async deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteNotifications(session.token, ids).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Delete one or more storage objects */
  async deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteStorageObjects(session.token, request).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Delete a role by ID. */
  async deleteRole(session: Session, roleId: string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.deleteRole(session.token, roleId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  async emitEvent(session: Session, request: ApiEvent): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.event(session.token, request).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Fetch the current user's account. */
  async getAccount(session: Session): Promise<ApiAccount> {

    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getAccount(session.token);
  }

  /** Import Facebook friends and add them to a user's account. */
  async importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.importFacebookFriends(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

    /** Import Steam friends and add them to a user's account. */
  async importSteamFriends(session: Session, request: ApiAccountSteam, reset: boolean): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.importSteamFriends(session.token, request, reset).then((response: any) => {
        return response !== undefined;
    });
  }

  /** Fetch zero or more users by ID and/or username. */
  async getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getUsers(session.token, ids, usernames, facebookIds).then((response: ApiUsers) => {
      var result: Users = {
        users: []
      };

      if (response.users == null) {
        return Promise.resolve(result);
      }

      response.users!.forEach(u => {
        result.users!.push({
          avatar_url: u.avatar_url,
          create_time: u.create_time,
          display_name: u.display_name,
          edge_count: u.edge_count ? Number(u.edge_count) : 0,
          facebook_id: u.facebook_id,
          gamecenter_id: u.gamecenter_id,
          google_id: u.google_id,
          id: u.id,
          lang_tag: u.lang_tag,
          location: u.location,
          online: u.online,
          steam_id: u.steam_id,
          timezone: u.timezone,
          update_time: u.update_time,
          username: u.username,
          metadata: u.metadata ? JSON.parse(u.metadata) : undefined
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Kick users from a channel, or decline their join requests. */
  async removeChannelUsers(session: Session, channelId: string, ids?: Array<string>): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.removeChannelUsers(session.token, channelId, ids).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** List a channel's message history. */
  async listChannelMessages(session: Session, channelId: string, messageId?: string, direction?: number, limit?: number): Promise<ChannelMessageList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listChannelMessages(session.token, channelId, messageId, direction, limit).then((response: ApiChannelMessageList) => {
      var result: ChannelMessageList = {
        messages: [],
        last_seen_message: response.last_seen_message
      };

      if (response.messages == null) {
        return Promise.resolve(result);
      }

      response.messages!.forEach(m => {        
        result.messages!.push({
          channel_id: m.channel_id,
          code: m.code ? Number(m.code) : 0,
          create_time: m.create_time || '',
          id: m.message_id,
          sender_id: m.sender_id,
          update_time: m.update_time,
          username: m.username,
          avatar: m.avatar,
          content: m.content ? JSON.parse(m.content) : undefined,
          channel_label: m.channel_label,
          user_id_one: m.user_id_one,
          user_id_two: m.user_id_two,
          attachments: m.attachments ? JSON.parse(m.attachments) : [],
          mentions: m.mentions ? JSON.parse(m.mentions) : [],
          reactions: m.reactions ? JSON.parse(m.reactions) : [],
          references: m.references ? JSON.parse(m.references) : [],
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a channel's users. */
  async listChannelVoiceUsers(session: Session, clanId: string, channelId: string, channelType: number, state?: number, limit?: number, cursor?: string): Promise<ApiVoiceChannelUserList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listChannelVoiceUsers(session.token, clanId, channelId, channelType, limit, state, cursor).then((response: ApiVoiceChannelUserList) => {
      var result: ApiVoiceChannelUserList = {
        voice_channel_users: []
      };

      if (response.voice_channel_users == null) {
        return Promise.resolve(result);
      }

      response.voice_channel_users!.forEach(gu => {        
        result.voice_channel_users!.push({
          jid: gu.jid,
          channel_id: gu.channel_id,
          user_id: gu.user_id
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a channel's users. */
  async listChannelUsers(session: Session, clanId: string, channelId: string, channelType: number, state?: number, limit?: number, cursor?: string): Promise<ApiChannelUserList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listChannelUsers(session.token, clanId, channelId, channelType, limit, state, cursor).then((response: ApiChannelUserList) => {
      var result: ApiChannelUserList = {
        channel_users: [],
        cursor: response.cursor,
        channel_id: response.channel_id
      };

      if (response.channel_users == null) {
        return Promise.resolve(result);
      }

      response.channel_users!.forEach(gu => {
        result.channel_users!.push({
          user: {
            avatar_url: gu.user!.avatar_url,
            create_time: gu.user!.create_time,
            display_name: gu.user!.display_name,
            edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count): 0,
            facebook_id: gu.user!.facebook_id,
            gamecenter_id: gu.user!.gamecenter_id,
            google_id: gu.user!.google_id,
            id: gu.user!.id,
            lang_tag: gu.user!.lang_tag,
            location: gu.user!.location,
            online: gu.user!.online,
            steam_id: gu.user!.steam_id,
            timezone: gu.user!.timezone,
            update_time: gu.user!.update_time,
            username: gu.user!.username,
            metadata: gu.user!.metadata ? JSON.parse(gu.user!.metadata!) : undefined
          },
          role_id: gu!.role_id,
          thread_id: gu.thread_id,
          id: gu.id,
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List a channel's users. */
  async listClanUsers(session: Session, clanId: string): Promise<ApiClanUserList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listClanUsers(session.token, clanId).then((response: ApiClanUserList) => {
      var result: ApiClanUserList = {
        clan_users: [],
        cursor: response.cursor,
        clan_id: response.clan_id
      };

      if (response.clan_users == null) {
        return Promise.resolve(result);
      }

      response.clan_users!.forEach(gu => {
        result.clan_users!.push({
          user: {
            avatar_url: gu.user!.avatar_url,
            create_time: gu.user!.create_time,
            display_name: gu.user!.display_name,
            edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count): 0,
            facebook_id: gu.user!.facebook_id,
            gamecenter_id: gu.user!.gamecenter_id,
            google_id: gu.user!.google_id,
            id: gu.user!.id,
            lang_tag: gu.user!.lang_tag,
            location: gu.user!.location,
            online: gu.user!.online,
            steam_id: gu.user!.steam_id,
            timezone: gu.user!.timezone,
            update_time: gu.user!.update_time,
            username: gu.user!.username,
            metadata: gu.user!.metadata ? JSON.parse(gu.user!.metadata!) : undefined
          },
          role_id: gu!.role_id 
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List channels. */
  async listChannelDescs(session: Session, limit?: number, state?:number, cursor?: string, clanId?: string, channelType?:number): Promise<ApiChannelDescList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listChannelDescs(session.token, limit, state, cursor, clanId, channelType).then((response: ApiChannelDescList) => {
      var result: ApiChannelDescList = {
        channeldesc: [],
        next_cursor: response.next_cursor,
        prev_cursor: response.prev_cursor,
        cacheable_cursor: response.cacheable_cursor
      };

      if (response.channeldesc == null) {
        return Promise.resolve(result);
      }
      
      result.channeldesc = response.channeldesc;
      return Promise.resolve(result);
    });
  }

  /** List clans */
  async listClanDescs(session: Session, limit?: number, state?:number, cursor?: string): Promise<ApiClanDescList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listClanDescs(session.token, limit, state, cursor).then((response: ApiClanDescList) => {
      var result: ApiClanDescList = {
        clandesc: [],
      };

      if (response.clandesc == null) {
        return Promise.resolve(result);
      }
      
      result.clandesc = response.clandesc;
      return Promise.resolve(result);
    });
  }

  /** List categories. */
  async listCategoryDescs(session: Session, clanId:string, creatorId?:string, categoryName?:string): Promise<ApiCategoryDescList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listCategoryDescs(session.token, clanId, creatorId, categoryName).then((response: ApiCategoryDescList) => {
      var result: ApiCategoryDescList = {
        categorydesc: [],
      };

      if (response.categorydesc == null) {
        return Promise.resolve(result);
      }
      
      result.categorydesc = response.categorydesc;
      return Promise.resolve(result);
    });
  }

  /** List user roles */
  async listRoles(session: Session, limit?:number, state?:number, cursor?:string, clanId?:string): Promise<ApiRoleList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listRoles(session.token, limit, state, cursor, clanId).then((response: ApiRoleList) => {
      return Promise.resolve(response);
    });
  }

  /** List permission */
  async getListPermission(session: Session): Promise<ApiPermissionList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getListPermission(session.token).then((response: ApiPermissionList) => {
      return Promise.resolve(response);
    });
  }

  /** Update action role when delete role */
  async updateRoleDelete(session: Session, roleId:string, request:{}): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateRoleDelete(session.token, roleId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** List user roles */
  async listRolePermissions(session: Session, roleId:string): Promise<ApiPermissionList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listRolePermissions(session.token, roleId).then((response: ApiPermissionList) => {
      return Promise.resolve(response);
    });
  }

  /** List user roles */
  async listRoleUsers(session: Session, roleId:string, limit?:number, cursor?:string): Promise<ApiRoleUserList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listRoleUsers(session.token, roleId, limit, cursor).then((response: ApiRoleUserList) => {
      return Promise.resolve(response);
    });
  }

  async registFCMDeviceToken(session: Session, tokenId:string): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.registFCMDeviceToken(session.token, tokenId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Get a clan desc profile */
  async getClanDescProfile(session: Session, clanId:string): Promise<ApiClanDescProfile> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getClanDescProfile(session.token, clanId).then((response: ApiClanDescProfile) => {
      return Promise.resolve(response);
    });
  }

  async getUserProfileOnClan(session: Session, clanId:string): Promise<ApiClanProfile> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.getUserProfileOnClan(session.token, clanId).then((response: ApiClanProfile) => {
      return Promise.resolve(response);
    });
  }

  /** Add an Apple ID to the social profiles on the current user's account. */
  async linkApple(session: Session, request: ApiAccountApple): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkApple(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  async linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkCustom(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add a device ID to the social profiles on the current user's account. */
  async linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkDevice(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  async linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkEmail(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Facebook to the social profiles on the current user's account. */
  async linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkFacebook(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Facebook Instant to the social profiles on the current user's account. */
  async linkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkFacebookInstantGame(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Google to the social profiles on the current user's account. */
  async linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkGoogle(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add GameCenter to the social profiles on the current user's account. */
  async linkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkGameCenter(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Add Steam to the social profiles on the current user's account. */
  async linkSteam(session: Session, request: ApiLinkSteamRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.linkSteam(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** List all friends for the current user. */
  async listFriends(session: Session, state?: number, limit?: number, cursor?: string): Promise<Friends> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listFriends(session.token, limit, state, cursor).then((response: ApiFriendList) => {

      var result: Friends = {
        friends: [],
        cursor: response.cursor
      };

      if (response.friends == null) {
        return Promise.resolve(result);
      }

      response.friends!.forEach(f => {
        result.friends!.push({
          user: {
            avatar_url: f.user!.avatar_url,
            create_time: f.user!.create_time,
            display_name: f.user!.display_name,
            edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
            facebook_id: f.user!.facebook_id,
            gamecenter_id: f.user!.gamecenter_id,
            google_id: f.user!.google_id,
            id: f.user!.id,
            lang_tag: f.user!.lang_tag,
            location: f.user!.location,
            online: f.user!.online,
            steam_id: f.user!.steam_id,
            timezone: f.user!.timezone,
            update_time: f.user!.update_time,
            username: f.user!.username,
            metadata: f.user!.metadata ? JSON.parse(f.user!.metadata!) : undefined,
          },
          state: f.state
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Fetch list of notifications. */
  async listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listNotifications(session.token, limit, cacheableCursor).then((response: ApiNotificationList) => {
      var result: NotificationList = {
        cacheable_cursor: response.cacheable_cursor,
        notifications: [],
      };

      if (response.notifications == null) {
        return Promise.resolve(result);
      }

      response.notifications!.forEach(n => {
        result.notifications!.push({
          code: n.code ? Number(n.code) : 0,
          create_time: n.create_time,
          id: n.id,
          persistent: n.persistent,
          sender_id: n.sender_id,
          subject: n.subject,
          content: n.content ? JSON.parse(n.content) : undefined
        })
      });
      return Promise.resolve(result);
    });
  }

  /** List storage objects. */
  async listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.listStorageObjects(session.token, collection, userId, limit, cursor).then((response: ApiStorageObjectList) => {
      var result: StorageObjectList = {
        objects: [],
        cursor: response.cursor
      };

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read ? Number(o.permission_read) : 0,
          permission_write: o.permission_write ? Number(o.permission_write) : 0,
          value: o.value ? JSON.parse(o.value) : undefined,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Fetch storage objects. */
  async readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.readStorageObjects(session.token, request).then((response: ApiStorageObjects) => {
      var result: StorageObjects = {objects: []};

      if (response.objects == null) {
        return Promise.resolve(result);
      }

      response.objects!.forEach(o => {
        result.objects.push({
          collection: o.collection,
          key: o.key,
          permission_read: o.permission_read ? Number(o.permission_read) : 0,
          permission_write: o.permission_write ? Number(o.permission_write) : 0,
          value: o.value ? JSON.parse(o.value) : undefined,
          version: o.version,
          user_id: o.user_id,
          create_time: o.create_time,
          update_time: o.update_time
        })
      });
      return Promise.resolve(result);
    });
  }

  /** Execute an RPC function on the server. */
  async rpc(session: Session, basicAuthUsername: string,
		basicAuthPassword: string, id: string, input: object): Promise<RpcResponse> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.rpcFunc(session.token, basicAuthUsername, basicAuthPassword, id, JSON.stringify(input)).then((response: ApiRpc) => {
      return Promise.resolve({
        id: response.id,
        payload: (!response.payload) ? undefined : JSON.parse(response.payload)
      });
    });
  }

  /** Execute an RPC function on the server. */
  async rpcHttpKey(httpKey: string, id: string, input?: object): Promise<RpcResponse> {
    return this.apiClient.rpcFunc2("", id, input && JSON.stringify(input) || "", httpKey)
      .then((response: ApiRpc) => {
        return Promise.resolve({
          id: response.id,
          payload: (!response.payload) ? undefined : JSON.parse(response.payload)
        });
      }).catch((err: any) => {
        throw err;
      });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async sessionLogout(session: Session, token: string, refreshToken: string, ) : Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.sessionLogout(session.token, {refresh_token: refreshToken, token: token}).then((response: any) => {
        return response !== undefined;
    });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(session: Session, vars: Record<string, string> = {}) : Promise<Session> {

    if (!session) {
        console.error("Cannot refresh a null session.");
        return session;
    }

    if (session.created && session.expires_at! - session.created_at < 70) {
        console.warn("Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/mezon/getting-started/configuration/#session");
    }

    if (session.created && session.refresh_expires_at! - session.created_at < 3700) {
        console.warn("Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://heroiclabs.com/docs/mezon/getting-started/configuration/#session");
    }

    const apiSession = await this.apiClient.sessionRefresh(this.serverkey, "", {token: session.refresh_token, vars: vars});
    session.update(apiSession.token!, apiSession.refresh_token!);
    return session;
  }

  /** Remove the Apple ID from the social profiles on the current user's account. */
  async unlinkApple(session: Session, request: ApiAccountApple): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkApple(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }


  /** Remove custom ID from the social profiles on the current user's account. */
  async unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkCustom(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove a device ID from the social profiles on the current user's account. */
  async unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkDevice(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  async unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkEmail(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Facebook from the social profiles on the current user's account. */
  async unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkFacebook(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Facebook Instant social profiles from the current user's account. */
  async unlinkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkFacebookInstantGame(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Google from the social profiles on the current user's account. */
  async unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkGoogle(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove GameCenter from the social profiles on the current user's account. */
  async unlinkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.unlinkGameCenter(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Remove Steam from the social profiles on the current user's account. */
  async unlinkSteam(session: Session, request: ApiAccountSteam): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }
    return this.apiClient.unlinkSteam(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in the current user's account. */
  async updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateAccount(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given channel */
  async updateChannelDesc(session: Session, channelId: string, request: ApiUpdateChannelDescRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateChannelDesc(session.token, channelId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given clan. */
  async updateClanDesc(session: Session, clanId: string, request: ApiUpdateClanDescRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateClanDesc(session.token, clanId, request?.creator_id, request?.clan_name, request?.logo, request?.banner).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given category. */
  async updateCategory(session: Session, request: ApiUpdateCategoryDescRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateCategory(session.token, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given clan profile. */
  async updateClanDescProfile(session: Session, clanId: string, request: ApiUpdateClanDescProfileRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateClanDescProfile(session.token, clanId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  async updateUserProfileByClan(session: Session, clanId: string, request: ApiUpdateClanProfileRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateUserProfileByClan(session.token, clanId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given role. */
  async updateRole(session: Session, roleId: string, request: ApiUpdateRoleRequest): Promise<boolean> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.updateRole(session.token, roleId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given clan profile. */
  async createLinkInviteUser(session: Session, request: ApiLinkInviteUserRequest): Promise<ApiLinkInviteUser> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    return this.apiClient.createLinkInviteUser(session.token, request).then((response: ApiLinkInviteUser) => {
      return Promise.resolve(response);
      
    });
  }

  /** Get link invite user */
  async getLinkInvite(session: Session, inviteId:string): Promise<ApiInviteUserRes> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }
    
    return this.apiClient.getLinkInvite(session.token, inviteId).then((response: ApiInviteUserRes) => {
      return Promise.resolve(response);
      
    });
  }
  
  /** Get permission of user in the clan */
  async GetPermissionOfUserInTheClan(session: Session, clanId:string): Promise<ApiPermissionList> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }
    
    return this.apiClient.GetPermissionOfUserInTheClan(session.token, clanId).then((response: ApiPermissionList) => {
      return Promise.resolve(response);
      
    });
  }

  /** invite user */
  async inviteUser(session: Session, inviteId:string): Promise<ApiInviteUserRes> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }
    
    return this.apiClient.inviteUser(session.token, inviteId).then((response: ApiInviteUserRes) => {
      return Promise.resolve(response);
      
    });
  }

  /** Write storage objects. */
  async writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks> {
    if (this.autoRefreshSession && session.refresh_token &&
        session.isexpired((Date.now() + this.expiredTimespanMs)/1000)) {
        await this.sessionRefresh(session);
    }

    var request: ApiWriteStorageObjectsRequest = {objects: []};
    objects.forEach(o => {
      request.objects!.push({
        collection: o.collection,
        key: o.key,
        permission_read: o.permission_read,
        permission_write: o.permission_write,
        value: JSON.stringify(o.value),
        version: o.version
      })
    })

    return this.apiClient.writeStorageObjects(session.token, request);
  }
};


