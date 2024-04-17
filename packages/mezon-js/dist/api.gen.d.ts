/** A single user-role pair. */
export interface ChannelUserListChannelUser {
    id?: string;
    role_id?: Array<string>;
    thread_id?: string;
    user?: ApiUser;
}
/** A single user-role pair. */
export interface ClanUserListClanUser {
    role_id?: string;
    user?: ApiUser;
}
/** A single user-role pair. */
export interface RoleUserListRoleUser {
    avatar_url?: string;
    display_name?: string;
    id?: string;
    lang_tag?: string;
    location?: string;
    online?: boolean;
    username?: string;
}
/** A user with additional account details. Always the current user. */
export interface ApiAccount {
    custom_id?: string;
    devices?: Array<ApiAccountDevice>;
    disable_time?: string;
    email?: string;
    user?: ApiUser;
    verify_time?: string;
    wallet?: string;
}
/** Send a Apple Sign In token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountApple {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a custom ID to the server. Used with authenticate/link/unlink. */
export interface ApiAccountCustom {
    id?: string;
    vars?: Record<string, string>;
}
/** Send a device to the server. Used with authenticate/link/unlink and user. */
export interface ApiAccountDevice {
    id?: string;
    vars?: Record<string, string>;
}
/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface ApiAccountEmail {
    email?: string;
    password?: string;
    vars?: Record<string, string>;
}
/** Send a Facebook token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountFacebook {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a Facebook Instant Game token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountFacebookInstantGame {
    signed_player_info?: string;
    vars?: Record<string, string>;
}
/** Send Apple's Game Center account credentials to the server. Used with authenticate/link/unlink.

https://developer.apple.com/documentation/gamekit/gklocalplayer/1515407-generateidentityverificationsign */
export interface ApiAccountGameCenter {
    bundle_id?: string;
    player_id?: string;
    public_key_url?: string;
    salt?: string;
    signature?: string;
    timestamp_seconds?: string;
    vars?: Record<string, string>;
}
/** Send a Google token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountGoogle {
    token?: string;
    vars?: Record<string, string>;
}
/** Send a Steam token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountSteam {
    token?: string;
    vars?: Record<string, string>;
}
/** Add a role for channel. */
export interface ApiAddRoleChannelDescRequest {
    channel_id?: string;
    role_ids?: Array<string>;
}
/**  */
export interface ApiCategoryDesc {
    category_id?: string;
    category_name?: string;
    clan_id?: string;
    creator_id?: string;
}
/**  */
export interface ApiCategoryDescList {
    categorydesc?: Array<ApiCategoryDesc>;
}
/** A list of channel description, usually a result of a list operation. */
export interface ApiChannelDescList {
    cacheable_cursor?: string;
    channeldesc?: Array<ApiChannelDescription>;
    next_cursor?: string;
    prev_cursor?: string;
}
/**  */
export interface ApiChannelDescription {
    category_id?: string;
    category_name?: string;
    channel_avatar?: string;
    channel_id?: string;
    channel_label?: string;
    channel_private?: number;
    clan_id?: string;
    creator_id?: string;
    last_seen_message?: ApiChannelMessageHeader;
    last_sent_message?: ApiChannelMessageHeader;
    parrent_id?: string;
    type?: number;
    user_id?: string;
}
/** A message sent on a channel. */
export interface ApiChannelMessage {
    attachments?: string;
    avatar?: string;
    channel_id: string;
    channel_label: string;
    clan_id?: string;
    code: number;
    content: string;
    create_time?: string;
    mentions?: string;
    message_id: string;
    reactions?: string;
    referenced_message?: string;
    references?: string;
    sender_id: string;
    update_time?: string;
    user_id_one?: string;
    user_id_two?: string;
    username?: string;
}
/**  */
export interface ApiChannelMessageHeader {
    id?: string;
    timestamp?: string;
    sender_id: string;
    content: string;
}
/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
    last_seen_message?: ApiChannelMessageHeader;
    messages?: Array<ApiChannelMessage>;
}
/** A list of users belonging to a channel, along with their role. */
export interface ApiChannelUserList {
    channel_id?: string;
    channel_users?: Array<ChannelUserListChannelUser>;
    cursor?: string;
}
/**  */
export interface ApiClanDesc {
    banner?: string;
    clan_id?: string;
    clan_name?: string;
    creator_id?: string;
    logo?: string;
    status?: number;
}
/**  */
export interface ApiClanDescList {
    clandesc?: Array<ApiClanDesc>;
}
/**  */
export interface ApiClanDescProfile {
    avatar_url?: string;
    clan_id?: string;
    creator_id?: string;
    nick_name?: string;
    profile_banner?: string;
    profile_theme?: string;
}
/** Get clan profile. */
export interface ApiClanProfile {
    avartar?: string;
    clan_id?: string;
    nick_name?: string;
    user_id?: string;
}
/** A list of users belonging to a clan, along with their role. */
export interface ApiClanUserList {
    clan_id?: string;
    clan_users?: Array<ClanUserListClanUser>;
    cursor?: string;
}
/**  */
export interface ApiCreateCategoryDescRequest {
    category_name?: string;
    clan_id?: string;
}
/** Create a channel within clan. */
export interface ApiCreateChannelDescRequest {
    category_id?: string;
    channel_id?: string;
    channel_label?: string;
    channel_private?: number;
    clan_id?: string;
    parrent_id?: string;
    type?: number;
    user_ids?: Array<string>;
}
/**  */
export interface ApiCreateClanDescRequest {
    banner?: string;
    clan_name?: string;
    creator_id?: string;
    logo?: string;
}
/** Create a role within clan. */
export interface ApiCreateRoleRequest {
    active_permission_ids?: Array<string>;
    add_user_ids?: Array<string>;
    allow_mention?: number;
    clan_id?: string;
    color?: string;
    description?: string;
    display_online?: number;
    role_icon?: string;
    title?: string;
}
/** Delete a role the user has access to. */
export interface ApiDeleteRoleRequest {
    channel_id?: string;
    role_id?: string;
}
/** Storage objects to delete. */
export interface ApiDeleteStorageObjectId {
    collection?: string;
    key?: string;
    version?: string;
}
/** Batch delete storage objects. */
export interface ApiDeleteStorageObjectsRequest {
    object_ids?: Array<ApiDeleteStorageObjectId>;
}
/** Represents an event to be passed through the server to registered event handlers. */
export interface ApiEvent {
    external?: boolean;
    name?: string;
    properties?: Record<string, string>;
    timestamp?: string;
}
/** A friend of a user. */
export interface ApiFriend {
    state?: number;
    update_time?: string;
    user?: ApiUser;
}
/** A collection of zero or more friends of the user. */
export interface ApiFriendList {
    cursor?: string;
    friends?: Array<ApiFriend>;
}
/** Add link invite users to. */
export interface ApiInviteUserRes {
    channel_id?: string;
    channel_label?: string;
    clan_id?: string;
    clan_name?: string;
    user_joined?: boolean;
}
/** Add link invite users to. */
export interface ApiLinkInviteUser {
    channel_id?: string;
    clan_id?: string;
    create_time?: string;
    creator_id?: string;
    expiry_time?: string;
    id?: string;
    invite_link?: string;
}
/** Add link invite users to. */
export interface ApiLinkInviteUserRequest {
    channel_id?: string;
    clan_id?: string;
    expiry_time?: number;
}
/** Link Steam to the current user's account. */
export interface ApiLinkSteamRequest {
    account?: ApiAccountSteam;
    sync?: boolean;
}
/**  */
export interface ApiMessageAttachment {
    filename?: string;
    filetype?: string;
    height?: number;
    size?: number;
    url?: string;
    width?: number;
}
/**  */
export interface ApiMessageDeleted {
    deletor?: string;
    message_id?: string;
}
/**  */
export interface ApiMessageMention {
    create_time?: string;
    id?: string;
    user_id?: string;
    username?: string;
}
/**  */
export interface ApiMessageReaction {
    action?: boolean;
    emoji?: string;
    id?: string;
    sender_id?: string;
    sender_name?: string;
    sender_avatar?: string;
    count: number;
}
/**  */
export interface ApiMessageRef {
    message_id?: string;
    message_ref_id?: string;
    ref_type?: number;
    message_sender_id?: string;
    content?: string;
    has_attachment: boolean;
}
/** A notification in the server. */
export interface ApiNotification {
    code?: number;
    content?: string;
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
/** A collection of zero or more notifications. */
export interface ApiNotificationList {
    cacheable_cursor?: string;
    notifications?: Array<ApiNotification>;
}
/**  */
export interface ApiPermission {
    active?: number;
    description?: string;
    id?: string;
    slug?: string;
    title?: string;
}
/** A list of permission description, usually a result of a list operation. */
export interface ApiPermissionList {
    permissions?: Array<ApiPermission>;
}
/** Storage objects to get. */
export interface ApiReadStorageObjectId {
    collection?: string;
    key?: string;
    user_id?: string;
}
/** Batch get storage objects. */
export interface ApiReadStorageObjectsRequest {
    object_ids?: Array<ApiReadStorageObjectId>;
}
/**  */
export interface ApiRole {
    active?: number;
    allow_mention?: number;
    clan_id?: string;
    color?: string;
    creator_id?: string;
    description?: string;
    display_online?: number;
    id?: string;
    permission_list?: ApiPermissionList;
    role_icon?: string;
    role_user_list?: ApiRoleUserList;
    slug?: string;
    title?: string;
    role_channel_active?: string;
    channel_ids?: Array<string>;
}
/** A list of role description, usually a result of a list operation. */
export interface ApiRoleList {
    cacheable_cursor?: string;
    next_cursor?: string;
    prev_cursor?: string;
    roles?: Array<ApiRole>;
}
/**  */
export interface ApiRoleUserList {
    cursor?: string;
    role_users?: Array<RoleUserListRoleUser>;
}
/** Execute an Lua function on the server. */
export interface ApiRpc {
    http_key?: string;
    id?: string;
    payload?: string;
}
/** A user's session used to authenticate messages. */
export interface ApiSession {
    created?: boolean;
    refresh_token?: string;
    token?: string;
}
/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiSessionLogoutRequest {
    refresh_token?: string;
    token?: string;
}
/** Authenticate against the server with a refresh token. */
export interface ApiSessionRefreshRequest {
    token?: string;
    vars?: Record<string, string>;
}
/** An object within the storage engine. */
export interface ApiStorageObject {
    collection?: string;
    create_time?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    update_time?: string;
    user_id?: string;
    value?: string;
    version?: string;
}
/** A storage acknowledgement. */
export interface ApiStorageObjectAck {
    collection?: string;
    create_time?: string;
    key?: string;
    update_time?: string;
    user_id?: string;
    version?: string;
}
/** Batch of acknowledgements for the storage object write. */
export interface ApiStorageObjectAcks {
    acks?: Array<ApiStorageObjectAck>;
}
/** List of storage objects. */
export interface ApiStorageObjectList {
    cursor?: string;
    objects?: Array<ApiStorageObject>;
}
/** Batch of storage objects. */
export interface ApiStorageObjects {
    objects?: Array<ApiStorageObject>;
}
/** Update a user's account details. */
export interface ApiUpdateAccountRequest {
    avatar_url?: string;
    display_name?: string;
    lang_tag?: string;
    location?: string;
    timezone?: string;
    username?: string;
}
/**  */
export interface ApiUpdateCategoryDescRequest {
    category_id?: string;
    category_name?: string;
}
/** Fetch a batch of zero or more users from the server. */
export interface ApiUpdateUsersRequest {
    avatar_url?: string;
    display_name?: string;
}
/**  */
export interface ApiUploadAttachment {
    filename?: string;
    url?: string;
}
/**  */
export interface ApiUploadAttachmentRequest {
    filename?: string;
    filetype?: string;
    height?: number;
    size?: number;
    width?: number;
}
/** A user in the server. */
export interface ApiUser {
    apple_id?: string;
    avatar_url?: string;
    create_time?: string;
    display_name?: string;
    edge_count?: number;
    facebook_id?: string;
    gamecenter_id?: string;
    google_id?: string;
    id?: string;
    lang_tag?: string;
    location?: string;
    metadata?: string;
    online?: boolean;
    steam_id?: string;
    timezone?: string;
    update_time?: string;
    username?: string;
}
/** A collection of zero or more users. */
export interface ApiUsers {
    users?: Array<ApiUser>;
}
/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUser {
    channel_id?: string;
    jid?: string;
    user_id?: string;
}
/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUserList {
    voice_channel_users?: Array<ApiVoiceChannelUser>;
}
/** The object to store. */
export interface ApiWriteStorageObject {
    collection?: string;
    key?: string;
    permission_read?: number;
    permission_write?: number;
    value?: string;
    version?: string;
}
/** Write objects to the storage engine. */
export interface ApiWriteStorageObjectsRequest {
    objects?: Array<ApiWriteStorageObject>;
}
/**  */
export interface ProtobufAny {
    type_url?: string;
    value?: string;
}
/**  */
export interface RpcStatus {
    code?: number;
    details?: Array<ProtobufAny>;
    message?: string;
}
export declare class MezonApi {
    readonly serverKey: string;
    readonly basePath: string;
    readonly timeoutMs: number;
    constructor(serverKey: string, basePath: string, timeoutMs: number);
    /** A healthcheck which load balancers can use to check the service. */
    healthcheck(bearerToken: string, options?: any): Promise<any>;
    /** Delete the current user's account. */
    deleteAccount(bearerToken: string, options?: any): Promise<any>;
    /** Fetch the current user's account. */
    getAccount(bearerToken: string, options?: any): Promise<ApiAccount>;
    /** Update fields in the current user's account. */
    updateAccount(bearerToken: string, body: ApiUpdateAccountRequest, options?: any): Promise<any>;
    /** Authenticate a user with an Apple ID against the server. */
    authenticateApple(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountApple, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a custom id against the server. */
    authenticateCustom(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountCustom, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a device id against the server. */
    authenticateDevice(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountDevice, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with an email+password against the server. */
    authenticateEmail(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountEmail, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a Facebook OAuth token against the server. */
    authenticateFacebook(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountFacebook, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    /** Authenticate a user with a Facebook Instant Game token against the server. */
    authenticateFacebookInstantGame(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountFacebookInstantGame, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Apple's GameCenter against the server. */
    authenticateGameCenter(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountGameCenter, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Google against the server. */
    authenticateGoogle(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountGoogle, create?: boolean, username?: string, options?: any): Promise<ApiSession>;
    /** Authenticate a user with Steam against the server. */
    authenticateSteam(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountSteam, create?: boolean, username?: string, sync?: boolean, options?: any): Promise<ApiSession>;
    /** Add an Apple ID to the social profiles on the current user's account. */
    linkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    /** Add a custom ID to the social profiles on the current user's account. */
    linkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    /** Add a device ID to the social profiles on the current user's account. */
    linkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    /** Add an email+password to the social profiles on the current user's account. */
    linkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    /** Add Facebook to the social profiles on the current user's account. */
    linkFacebook(bearerToken: string, account: ApiAccountFacebook, sync?: boolean, options?: any): Promise<any>;
    /** Add Facebook Instant Game to the social profiles on the current user's account. */
    linkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    /** Add Apple's GameCenter to the social profiles on the current user's account. */
    linkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    /** Add Google to the social profiles on the current user's account. */
    linkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    /** Add Steam to the social profiles on the current user's account. */
    linkSteam(bearerToken: string, body: ApiLinkSteamRequest, options?: any): Promise<any>;
    /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
    sessionRefresh(basicAuthUsername: string, basicAuthPassword: string, body: ApiSessionRefreshRequest, options?: any): Promise<ApiSession>;
    /** Remove the Apple ID from the social profiles on the current user's account. */
    unlinkApple(bearerToken: string, body: ApiAccountApple, options?: any): Promise<any>;
    /** Remove the custom ID from the social profiles on the current user's account. */
    unlinkCustom(bearerToken: string, body: ApiAccountCustom, options?: any): Promise<any>;
    /** Remove the device ID from the social profiles on the current user's account. */
    unlinkDevice(bearerToken: string, body: ApiAccountDevice, options?: any): Promise<any>;
    /** Remove the email+password from the social profiles on the current user's account. */
    unlinkEmail(bearerToken: string, body: ApiAccountEmail, options?: any): Promise<any>;
    /** Remove Facebook from the social profiles on the current user's account. */
    unlinkFacebook(bearerToken: string, body: ApiAccountFacebook, options?: any): Promise<any>;
    /** Remove Facebook Instant Game profile from the social profiles on the current user's account. */
    unlinkFacebookInstantGame(bearerToken: string, body: ApiAccountFacebookInstantGame, options?: any): Promise<any>;
    /** Remove Apple's GameCenter from the social profiles on the current user's account. */
    unlinkGameCenter(bearerToken: string, body: ApiAccountGameCenter, options?: any): Promise<any>;
    /** Remove Google from the social profiles on the current user's account. */
    unlinkGoogle(bearerToken: string, body: ApiAccountGoogle, options?: any): Promise<any>;
    /** Remove Steam from the social profiles on the current user's account. */
    unlinkSteam(bearerToken: string, body: ApiAccountSteam, options?: any): Promise<any>;
    /**  */
    listCategoryDescs(bearerToken: string, clanId: string, creatorId?: string, categoryName?: string, categoryId?: string, options?: any): Promise<ApiCategoryDescList>;
    /** List a channel's message history. */
    listChannelMessages(bearerToken: string, channelId: string, messageId?: string, direction?: number, limit?: number, options?: any): Promise<ApiChannelMessageList>;
    /** List user channels */
    listChannelDescs(bearerToken: string, limit?: number, state?: number, cursor?: string, clanId?: string, channelType?: number, options?: any): Promise<ApiChannelDescList>;
    /** Create a new channel with the current user as the owner. */
    createChannelDesc(bearerToken: string, body: ApiCreateChannelDescRequest, options?: any): Promise<ApiChannelDescription>;
    /** Delete a channel by ID. */
    deleteChannelDesc(bearerToken: string, channelId: string, options?: any): Promise<any>;
    /** Update fields in a given channel. */
    updateChannelDesc(bearerToken: string, channelId: string, body: {}, options?: any): Promise<any>;
    /** Add users to a channel. */
    addChannelUsers(bearerToken: string, channelId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** Leave a channel the user is a member of. */
    leaveChannel(bearerToken: string, channelId: string, options?: any): Promise<any>;
    /** Kick a set of users from a channel. */
    removeChannelUsers(bearerToken: string, channelId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** List all users that are part of a channel. */
    listChannelUsers(bearerToken: string, clanId: string, channelId: string, channelType?: number, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiChannelUserList>;
    /** List all users that are part of a channel. */
    listChannelVoiceUsers(bearerToken: string, clanId?: string, channelId?: string, channelType?: number, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiVoiceChannelUserList>;
    /** List clans */
    listClanDescs(bearerToken: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiClanDescList>;
    /** Create a clan */
    createClanDesc(bearerToken: string, body: ApiCreateClanDescRequest, options?: any): Promise<ApiClanDesc>;
    /** Delete a clan desc by ID. */
    deleteClanDesc(bearerToken: string, clanDescId: string, options?: any): Promise<any>;
    /** Update fields in a given clan. */
    updateClanDesc(bearerToken: string, clanId: string, creatorId?: string, clanName?: string, logo?: string, banner?: string, options?: any): Promise<any>;
    /** List all users that are part of a clan. */
    listClanUsers(bearerToken: string, clanId: string, options?: any): Promise<ApiClanUserList>;
    /** Get a clan desc profile */
    getClanDescProfile(bearerToken: string, clanId: string, options?: any): Promise<ApiClanDescProfile>;
    /** Update fields in a given clan profile. */
    updateClanDescProfile(bearerToken: string, clanId: string, body: {}, options?: any): Promise<any>;
    /**  */
    createCategoryDesc(bearerToken: string, body: ApiCreateCategoryDescRequest, options?: any): Promise<ApiCategoryDesc>;
    /**  */
    deleteCategoryDesc(bearerToken: string, creatorId: string, options?: any): Promise<any>;
    /** Immediately join an open group, or request to join a closed one. */
    registFCMDeviceToken(bearerToken: string, token?: string, options?: any): Promise<any>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    event(bearerToken: string, body: ApiEvent, options?: any): Promise<any>;
    /** Delete one or more users by ID or username. */
    deleteFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** List all friends for the current user. */
    listFriends(bearerToken: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiFriendList>;
    /** Add friends by ID or username to a user's account. */
    addFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** Block one or more users by ID or username. */
    blockFriends(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, options?: any): Promise<any>;
    /** Import Facebook friends and add them to a user's account. */
    importFacebookFriends(bearerToken: string, account: ApiAccountFacebook, reset?: boolean, options?: any): Promise<any>;
    /** Import Steam friends and add them to a user's account. */
    importSteamFriends(bearerToken: string, account: ApiAccountSteam, reset?: boolean, options?: any): Promise<any>;
    /**  */
    getUserProfileOnClan(bearerToken: string, clanId: string, options?: any): Promise<ApiClanProfile>;
    /** Add users to a channel. */
    createLinkInviteUser(bearerToken: string, body: ApiLinkInviteUserRequest, options?: any): Promise<ApiLinkInviteUser>;
    /** Add users to a channel. */
    getLinkInvite(bearerToken: string, inviteId: string, options?: any): Promise<ApiInviteUserRes>;
    /** Add users to a channel. */
    inviteUser(bearerToken: string, inviteId: string, options?: any): Promise<ApiInviteUserRes>;
    /**  */
    getListPermission(bearerToken: string, options?: any): Promise<ApiPermissionList>;
    /** Delete one or more notifications for the current user. */
    deleteNotifications(bearerToken: string, ids?: Array<string>, options?: any): Promise<any>;
    /** Fetch list of notifications. */
    listNotifications(bearerToken: string, limit?: number, cacheableCursor?: string, options?: any): Promise<ApiNotificationList>;
    /**  */
    GetPermissionOfUserInTheClan(bearerToken: string, clanId: string, options?: any): Promise<ApiPermissionList>;
    /**  */
    addRolesChannelDesc(bearerToken: string, body: ApiAddRoleChannelDescRequest, options?: any): Promise<any>;
    /** Update a role when Delete a role by ID. */
    deleteRoleChannelDesc(bearerToken: string, body: ApiDeleteRoleRequest, options?: any): Promise<any>;
    /** List user roles */
    listRoles(bearerToken: string, limit?: number, state?: number, cursor?: string, clanId?: string, options?: any): Promise<ApiRoleList>;
    /** Create a new role for clan. */
    createRole(bearerToken: string, body: ApiCreateRoleRequest, options?: any): Promise<ApiRole>;
    /** Update a role when Delete a role by ID. */
    updateRoleDelete(bearerToken: string, roleId: string, body: {}, options?: any): Promise<any>;
    /** Delete a role by ID. */
    deleteRole(bearerToken: string, roleId: string, options?: any): Promise<any>;
    /** Update fields in a given role. */
    updateRole(bearerToken: string, roleId: string, body: {}, options?: any): Promise<any>;
    /** List role permissions */
    listRolePermissions(bearerToken: string, roleId: string, options?: any): Promise<ApiPermissionList>;
    /** List role permissions */
    listRoleUsers(bearerToken: string, roleId: string, limit?: number, cursor?: string, options?: any): Promise<ApiRoleUserList>;
    /** Execute a Lua function on the server. */
    rpcFunc2(bearerToken: string, basicAuthUsername: string, basicAuthPassword: string, id: string, payload?: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    /** Execute a Lua function on the server. */
    rpcFunc(bearerToken: string, basicAuthUsername: string, basicAuthPassword: string, id: string, payload: string, httpKey?: string, options?: any): Promise<ApiRpc>;
    /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
    sessionLogout(bearerToken: string, body: ApiSessionLogoutRequest, options?: any): Promise<any>;
    /** Get storage objects. */
    readStorageObjects(bearerToken: string, body: ApiReadStorageObjectsRequest, options?: any): Promise<ApiStorageObjects>;
    /** Write objects into the storage engine. */
    writeStorageObjects(bearerToken: string, body: ApiWriteStorageObjectsRequest, options?: any): Promise<ApiStorageObjectAcks>;
    /** Delete one or more objects by ID or username. */
    deleteStorageObjects(bearerToken: string, body: ApiDeleteStorageObjectsRequest, options?: any): Promise<any>;
    /** List publicly readable storage objects in a given collection. */
    listStorageObjects(bearerToken: string, collection: string, userId?: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    /** List publicly readable storage objects in a given collection. */
    listStorageObjects2(bearerToken: string, collection: string, userId: string, limit?: number, cursor?: string, options?: any): Promise<ApiStorageObjectList>;
    /** Update fields in a given category. */
    updateCategory(bearerToken: string, body: ApiUpdateCategoryDescRequest, options?: any): Promise<any>;
    /**  */
    updateUserProfileByClan(bearerToken: string, clanId: string, body: {}, options?: any): Promise<any>;
    /** Create a new group with the current user as the owner. */
    uploadAttachmentFile(bearerToken: string, body: ApiUploadAttachmentRequest, options?: any): Promise<any>;
    /** Fetch zero or more users by ID and/or username. */
    getUsers(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, options?: any): Promise<ApiUsers>;
    /**  */
    updateUser(bearerToken: string, body: ApiUpdateUsersRequest, options?: any): Promise<any>;
    buildFullUrl(basePath: string, fragment: string, queryParams: Map<string, any>): string;
}
