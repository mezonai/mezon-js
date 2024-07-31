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
import { ApiAccount, ApiAccountCustom, ApiAccountDevice, ApiAccountEmail, ApiAccountFacebook, ApiAccountFacebookInstantGame, ApiAccountGoogle, ApiAccountGameCenter, ApiAccountSteam, ApiChannelDescList, ApiChannelDescription, ApiCreateChannelDescRequest, ApiDeleteRoleRequest, ApiClanDescList, ApiCreateClanDescRequest, ApiClanDesc, ApiCategoryDesc, ApiCategoryDescList, ApiRoleList, ApiPermissionList, ApiRoleUserList, ApiRole, ApiCreateRoleRequest, ApiAddRoleChannelDescRequest, ApiCreateCategoryDescRequest, ApiUpdateCategoryDescRequest, ApiDeleteStorageObjectsRequest, ApiEvent, ApiReadStorageObjectsRequest, ApiStorageObjectAcks, ApiUpdateAccountRequest, ApiAccountApple, ApiLinkSteamRequest, ApiClanDescProfile, ApiClanProfile, ApiChannelUserList, ApiClanUserList, ApiLinkInviteUserRequest, ApiUpdateEventRequest, ApiLinkInviteUser, ApiInviteUserRes, ApiUploadAttachmentRequest, ApiUploadAttachment, ApiMessageReaction, ApiMessageMention, ApiMessageAttachment, ApiMessageRef, ApiChannelMessageHeader, ApiVoiceChannelUserList, ApiChannelAttachmentList, ApiCreateEventRequest, ApiEventManagement, ApiEventList, ApiDeleteEventRequest, ApiNotificationChannelCategoySettingsList, ApiNotificationSetting, ApiSetDefaultNotificationRequest, ApiNotificationUserChannel, ApiSetNotificationRequest, ApiNotifiReactMessage, ApiSetMuteNotificationRequest, ApiSearchMessageRequest, ApiSearchMessageResponse, ApiPinMessageRequest, ApiPinMessagesList, ApiCreateWebhookRequest, ApiWebhookResponse, ApiDeleteChannelDescRequest, ApiChangeChannelPrivateRequest, ApiClanEmojiList, ApiClanEmojiCreateRequest, ApiChannelVoiceList, MezonUpdateClanEmojiByIdBody, ApiWebhookCreateRequest, ApiWebhookListResponse, MezonUpdateWebhookByIdBody, ApiWebhookGenerateResponse, ApiCheckDuplicateClanNameResponse, ApiClanStickerAddRequest, ApiClanStickerListByClanIdResponse, MezonUpdateClanStickerByIdBody, MezonChangeChannelCategoryBody } from "./api.gen";
import { Session } from "./session";
import { Socket } from "./socket";
import { WebSocketAdapter } from "./web_socket_adapter";
export declare enum ChannelType {
    CHANNEL_TYPE_TEXT = 1,
    CHANNEL_TYPE_GROUP = 2,
    CHANNEL_TYPE_DM = 3,
    CHANNEL_TYPE_VOICE = 4,
    CHANNEL_TYPE_FORUM = 5,
    CHANNEL_TYPE_ANNOUNCEMENT = 6
}
export declare enum ChannelStreamMode {
    STREAM_MODE_CHANNEL = 2,
    STREAM_MODE_GROUP = 3,
    STREAM_MODE_DM = 4
}
export declare enum NotificationType {
    ALL_MESSAGE = 1,
    MENTION_MESSAGE = 2,
    NOTHING_MESSAGE = 3
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
    avatar?: string;
    channel_id: string;
    channel_label: string;
    clan_id?: string;
    code: number;
    content: string;
    create_time: string;
    reactions?: Array<ApiMessageReaction>;
    mentions?: Array<ApiMessageMention>;
    attachments?: Array<ApiMessageAttachment>;
    references?: Array<ApiMessageRef>;
    referenced_message?: ChannelMessage;
    id: string;
    persistent?: boolean;
    sender_id: string;
    update_time?: string;
    clan_logo?: string;
    category_name?: string;
    username?: string;
    clan_nick?: string;
    clan_avatar?: string;
    display_name?: string;
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
    channel_label: string | undefined;
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
    allow_mention: number | undefined;
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
export declare class Client {
    readonly serverkey: string;
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    readonly timeout: number;
    readonly autoRefreshSession: boolean;
    /** The expired timespan used to check session lifetime. */
    expiredTimespanMs: number;
    /** The low level API client for Mezon server. */
    private readonly apiClient;
    constructor(serverkey?: string, host?: string, port?: string, useSSL?: boolean, timeout?: number, autoRefreshSession?: boolean);
    /** Add users to a channel, or accept their join requests. */
    addChannelUsers(session: Session, channelId: string, ids?: Array<string>): Promise<boolean>;
    /** Add friends by ID or username to a user's account. */
    addFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Authenticate a user with an Apple ID against the server. */
    authenticateApple(token: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a custom id against the server. */
    authenticateCustom(id: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a device id against the server. */
    authenticateDevice(id: string, create?: boolean, username?: string, vars?: Record<string, string>): Promise<Session>;
    /** Authenticate a user with an email+password against the server. */
    authenticateEmail(email: string, password: string, username?: string, vars?: Record<string, string>): Promise<Session>;
    /** Authenticate a user with a Facebook Instant Game token against the server. */
    authenticateFacebookInstantGame(signedPlayerInfo: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with a Facebook OAuth token against the server. */
    authenticateFacebook(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with Google against the server. */
    authenticateGoogle(token: string, create?: boolean, username?: string, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with GameCenter against the server. */
    authenticateGameCenter(bundleId: string, playerId: string, publicKeyUrl: string, salt: string, signature: string, timestamp: string, username?: string, create?: boolean, vars?: Record<string, string>, options?: any): Promise<Session>;
    /** Authenticate a user with Steam against the server. */
    authenticateSteam(token: string, create?: boolean, username?: string, sync?: boolean, vars?: Record<string, string>): Promise<Session>;
    /** Block one or more users by ID or username. */
    blockFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Create a new group with the current user as the creator and superadmin. */
    uploadAttachmentFile(session: Session, request: ApiUploadAttachmentRequest): Promise<ApiUploadAttachment>;
    /** Create a channel within clan */
    createChannelDesc(session: Session, request: ApiCreateChannelDescRequest): Promise<ApiChannelDescription>;
    /** Create a clan */
    createClanDesc(session: Session, request: ApiCreateClanDescRequest): Promise<ApiClanDesc>;
    /**  */
    createCategoryDesc(session: Session, request: ApiCreateCategoryDescRequest): Promise<ApiCategoryDesc>;
    /** Create a new role for clan. */
    createRole(session: Session, request: ApiCreateRoleRequest): Promise<ApiRole>;
    /** Create a new event for clan. */
    createEvent(session: Session, request: ApiCreateEventRequest): Promise<ApiEventManagement>;
    /** Create a new event for clan. */
    createWebhook(session: Session, request: ApiCreateWebhookRequest): Promise<ApiWebhookResponse>;
    /** add role for channel. */
    addRolesChannelDesc(session: Session, request: ApiAddRoleChannelDescRequest): Promise<boolean>;
    /** Update action role when delete role */
    deleteRoleChannelDesc(session: Session, request: ApiDeleteRoleRequest): Promise<boolean>;
    /** A socket created with the client's configuration. */
    createSocket(useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter, sendTimeoutMs?: number): Socket;
    /** Delete one or more users by ID or username. */
    deleteFriends(session: Session, ids?: Array<string>, usernames?: Array<string>): Promise<boolean>;
    /** Delete a channel by ID. */
    deleteChannelDesc(session: Session, channelId: string): Promise<boolean>;
    /** Delete a clan desc by ID. */
    deleteClanDesc(session: Session, clanDescId: string): Promise<boolean>;
    /** Delete a category by ID. */
    deleteCategoryDesc(session: Session, creatorId: string): Promise<boolean>;
    /** Delete one or more notifications */
    deleteNotifications(session: Session, ids?: Array<string>): Promise<boolean>;
    /** Delete one or more storage objects */
    deleteStorageObjects(session: Session, request: ApiDeleteStorageObjectsRequest): Promise<boolean>;
    /** Delete a role by ID. */
    deleteRole(session: Session, roleId: string): Promise<boolean>;
    /** Delete a event by ID. */
    deleteEvent(session: Session, roleId: string): Promise<boolean>;
    /** update user a event by ID. */
    updateEventUser(session: Session, request: ApiDeleteEventRequest): Promise<boolean>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    emitEvent(session: Session, request: ApiEvent): Promise<boolean>;
    /** Fetch the current user's account. */
    getAccount(session: Session): Promise<ApiAccount>;
    /** Import Facebook friends and add them to a user's account. */
    importFacebookFriends(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Import Steam friends and add them to a user's account. */
    importSteamFriends(session: Session, request: ApiAccountSteam, reset: boolean): Promise<boolean>;
    /** Fetch zero or more users by ID and/or username. */
    getUsers(session: Session, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>): Promise<Users>;
    /** Kick a set of users from a clan. */
    removeClanUsers(session: Session, clanId: string, ids?: Array<string>): Promise<boolean>;
    /** Kick users from a channel, or decline their join requests. */
    removeChannelUsers(session: Session, channelId: string, ids?: Array<string>): Promise<boolean>;
    /** List a channel's message history. */
    listChannelMessages(session: Session, channelId: string, messageId?: string, direction?: number, limit?: number): Promise<ChannelMessageList>;
    /** List a channel's users. */
    listChannelVoiceUsers(session: Session, clanId: string, channelId: string, channelType: number, state?: number, limit?: number, cursor?: string): Promise<ApiVoiceChannelUserList>;
    /** List a channel's users. */
    listChannelUsers(session: Session, clanId: string, channelId: string, channelType: number, state?: number, limit?: number, cursor?: string): Promise<ApiChannelUserList>;
    /** List a channel's attachment. */
    listChannelAttachments(session: Session, clanId: string, channelId: string, fileType: string, state?: number, limit?: number, cursor?: string): Promise<ApiChannelAttachmentList>;
    /** List a channel's users. */
    listClanUsers(session: Session, clanId: string): Promise<ApiClanUserList>;
    /** List channels. */
    listChannelDescs(session: Session, limit?: number, state?: number, cursor?: string, clanId?: string, channelType?: number): Promise<ApiChannelDescList>;
    /** List clans */
    listClanDescs(session: Session, limit?: number, state?: number, cursor?: string): Promise<ApiClanDescList>;
    /** List categories. */
    listCategoryDescs(session: Session, clanId: string, creatorId?: string, categoryName?: string): Promise<ApiCategoryDescList>;
    /** List user roles */
    listRoles(session: Session, limit?: number, state?: number, cursor?: string, clanId?: string): Promise<ApiRoleList>;
    /** List event */
    listEvents(session: Session, clanId?: string): Promise<ApiEventList>;
    /** List permission */
    getListPermission(session: Session): Promise<ApiPermissionList>;
    /** Update action role when delete role */
    updateRoleDelete(session: Session, roleId: string, request: {}): Promise<boolean>;
    /** List user roles */
    listRolePermissions(session: Session, roleId: string): Promise<ApiPermissionList>;
    /** List user roles */
    listRoleUsers(session: Session, roleId: string, limit?: number, cursor?: string): Promise<ApiRoleUserList>;
    registFCMDeviceToken(session: Session, tokenId: string, deviceId: string, platform: string): Promise<boolean>;
    /** Get a clan desc profile */
    getClanDescProfile(session: Session, clanId: string): Promise<ApiClanDescProfile>;
    getUserProfileOnClan(session: Session, clanId: string): Promise<ApiClanProfile>;
    /** Add an Apple ID to the social profiles on the current user's account. */
    linkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    closeDirectMess(session: Session, request: ApiDeleteChannelDescRequest): Promise<boolean>;
    openDirectMess(session: Session, request: ApiDeleteChannelDescRequest): Promise<boolean>;
    /** Add a custom ID to the social profiles on the current user's account. */
    linkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    /** Add a device ID to the social profiles on the current user's account. */
    linkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    /** Add an email+password to the social profiles on the current user's account. */
    linkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    /** Add Facebook to the social profiles on the current user's account. */
    linkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Add Facebook Instant to the social profiles on the current user's account. */
    linkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    /** Add Google to the social profiles on the current user's account. */
    linkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    /** Add GameCenter to the social profiles on the current user's account. */
    linkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    /** Add Steam to the social profiles on the current user's account. */
    linkSteam(session: Session, request: ApiLinkSteamRequest): Promise<boolean>;
    /** List all friends for the current user. */
    listFriends(session: Session, state?: number, limit?: number, cursor?: string): Promise<Friends>;
    /** Fetch list of notifications. */
    listNotifications(session: Session, limit?: number, cacheableCursor?: string): Promise<NotificationList>;
    /** List storage objects. */
    listStorageObjects(session: Session, collection: string, userId?: string, limit?: number, cursor?: string): Promise<StorageObjectList>;
    /** Fetch storage objects. */
    readStorageObjects(session: Session, request: ApiReadStorageObjectsRequest): Promise<StorageObjects>;
    /** Execute an RPC function on the server. */
    rpc(session: Session, basicAuthUsername: string, basicAuthPassword: string, id: string, input: object): Promise<RpcResponse>;
    /** Execute an RPC function on the server. */
    rpcHttpKey(httpKey: string, id: string, input?: object): Promise<RpcResponse>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    sessionLogout(session: Session, token: string, refreshToken: string): Promise<boolean>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(session: Session, vars?: Record<string, string>): Promise<Session>;
    /** Remove the Apple ID from the social profiles on the current user's account. */
    unlinkApple(session: Session, request: ApiAccountApple): Promise<boolean>;
    /** Remove custom ID from the social profiles on the current user's account. */
    unlinkCustom(session: Session, request: ApiAccountCustom): Promise<boolean>;
    /** Remove a device ID from the social profiles on the current user's account. */
    unlinkDevice(session: Session, request: ApiAccountDevice): Promise<boolean>;
    /** Remove an email+password from the social profiles on the current user's account. */
    unlinkEmail(session: Session, request: ApiAccountEmail): Promise<boolean>;
    /** Remove Facebook from the social profiles on the current user's account. */
    unlinkFacebook(session: Session, request: ApiAccountFacebook): Promise<boolean>;
    /** Remove Facebook Instant social profiles from the current user's account. */
    unlinkFacebookInstantGame(session: Session, request: ApiAccountFacebookInstantGame): Promise<boolean>;
    /** Remove Google from the social profiles on the current user's account. */
    unlinkGoogle(session: Session, request: ApiAccountGoogle): Promise<boolean>;
    /** Remove GameCenter from the social profiles on the current user's account. */
    unlinkGameCenter(session: Session, request: ApiAccountGameCenter): Promise<boolean>;
    /** Remove Steam from the social profiles on the current user's account. */
    unlinkSteam(session: Session, request: ApiAccountSteam): Promise<boolean>;
    /** Update fields in the current user's account. */
    updateAccount(session: Session, request: ApiUpdateAccountRequest): Promise<boolean>;
    /** Update fields in a given channel */
    updateChannelDesc(session: Session, channelId: string, request: ApiUpdateChannelDescRequest): Promise<boolean>;
    /** Update fields in a given clan. */
    updateClanDesc(session: Session, clanId: string, request: ApiUpdateClanDescRequest): Promise<boolean>;
    /** Update fields in a given category. */
    updateCategory(session: Session, request: ApiUpdateCategoryDescRequest): Promise<boolean>;
    /** Update fields in a given clan profile. */
    updateClanDescProfile(session: Session, clanId: string, request: ApiUpdateClanDescProfileRequest): Promise<boolean>;
    updateUserProfileByClan(session: Session, clanId: string, request: ApiUpdateClanProfileRequest): Promise<boolean>;
    /** Update fields in a given role. */
    updateRole(session: Session, roleId: string, request: ApiUpdateRoleRequest): Promise<boolean>;
    /** Update fields in a given event. */
    updateEvent(session: Session, roleId: string, request: ApiUpdateEventRequest): Promise<boolean>;
    /** Update fields in a given clan profile. */
    createLinkInviteUser(session: Session, request: ApiLinkInviteUserRequest): Promise<ApiLinkInviteUser>;
    /** Get link invite user */
    getLinkInvite(session: Session, inviteId: string): Promise<ApiInviteUserRes>;
    /** Get permission of user in the clan */
    getPermissionOfUserInTheClan(session: Session, clanId: string): Promise<ApiPermissionList>;
    /** invite user */
    inviteUser(session: Session, inviteId: string): Promise<ApiInviteUserRes>;
    /** Write storage objects. */
    writeStorageObjects(session: Session, objects: Array<WriteStorageObject>): Promise<ApiStorageObjectAcks>;
    /** Set default notification clan*/
    setNotificationClan(session: Session, request: ApiSetDefaultNotificationRequest): Promise<boolean>;
    /** get default notification clan */
    getNotificationClanSetting(session: Session, clanId: string): Promise<ApiNotificationSetting>;
    /** Set notification channel*/
    setNotificationChannel(session: Session, request: ApiSetNotificationRequest): Promise<boolean>;
    /** Set notification channel*/
    setMuteNotificationChannel(session: Session, request: ApiSetMuteNotificationRequest): Promise<boolean>;
    /** update channel private*/
    updateChannelPrivate(session: Session, request: ApiChangeChannelPrivateRequest): Promise<boolean>;
    /** get default notification clan */
    getNotificationChannel(session: Session, channelId: string): Promise<ApiNotificationUserChannel>;
    /** Set default notification category*/
    setNotificationCategory(session: Session, request: ApiSetDefaultNotificationRequest): Promise<boolean>;
    /** get default notification category */
    getNotificationCategory(session: Session, category_id: string): Promise<ApiNotificationSetting>;
    deleteNotificationCategory(session: Session, category_id: string): Promise<boolean>;
    getChannelCategoryNotiSettingsList(session: Session, clan_id: string): Promise<ApiNotificationChannelCategoySettingsList>;
    deleteNotificationChannel(session: Session, channel_id: string): Promise<boolean>;
    /** */
    setNotificationReactMessage(session: Session, channel_id: string): Promise<boolean>;
    /** */
    getNotificationReactMessage(session: Session, channelId: string): Promise<ApiNotifiReactMessage>;
    deleteNotiReactMessage(session: Session, channel_id: string): Promise<boolean>;
    /** query message in elasticsearch */
    searchMessage(session: Session, request: ApiSearchMessageRequest): Promise<ApiSearchMessageResponse>;
    /** */
    createPinMessage(session: Session, request: ApiPinMessageRequest): Promise<boolean>;
    getPinMessagesList(session: Session, channelId: string): Promise<ApiPinMessagesList>;
    directChannelVoiceList(session: Session, userId: Array<string>, limit?: number): Promise<ApiChannelVoiceList>;
    deletePinMessage(session: Session, message_id: string): Promise<boolean>;
    /** List clan emoji. */
    listClanEmoji(session: Session, clan_id: string): Promise<ApiClanEmojiList>;
    /** create clan emoji */
    createClanEmoji(session: Session, request: ApiClanEmojiCreateRequest): Promise<boolean>;
    updateClanEmojiById(session: Session, id: string, request: MezonUpdateClanEmojiByIdBody): Promise<boolean>;
    deleteByIdClanEmoji(session: Session, id: string): Promise<boolean>;
    generateWebhookLink(session: Session, request: ApiWebhookCreateRequest): Promise<ApiWebhookGenerateResponse>;
    listWebhookByChannelId(session: Session, channel_id: string): Promise<ApiWebhookListResponse>;
    updateWebhookById(session: Session, id: string, request: MezonUpdateWebhookByIdBody): Promise<boolean>;
    deleteWebhookById(session: Session, id: string): Promise<boolean>;
    checkDuplicateClanName(session: Session, clan_name: string): Promise<ApiCheckDuplicateClanNameResponse>;
    addClanSticker(session: Session, request: ApiClanStickerAddRequest): Promise<boolean>;
    listClanStickersByClanId(session: Session, id: string): Promise<ApiClanStickerListByClanIdResponse>;
    deleteClanStickerById(session: Session, id: string): Promise<boolean>;
    updateClanStickerById(session: Session, id: string, request: MezonUpdateClanStickerByIdBody): Promise<boolean>;
    changeChannelCategory(session: Session, id: string, request: MezonChangeChannelCategoryBody): Promise<boolean>;
}
