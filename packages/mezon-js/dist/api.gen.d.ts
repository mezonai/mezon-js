/** A single user-role pair. */
export interface ChannelUserListChannelUser {
    clan_avatar?: string;
    clan_id?: string;
    clan_nick?: string;
    id?: string;
    role_id?: Array<string>;
    thread_id?: string;
    user?: ApiUser;
}
/** A single user-role pair. */
export interface ClanUserListClanUser {
    clan_avatar?: string;
    clan_id?: string;
    clan_nick?: string;
    role_id?: string;
    user?: ApiUser;
}
/**  */
export interface MezonChangeChannelCategoryBody {
    channel_id?: string;
}
/** Update app information. */
export interface MezonUpdateAppBody {
    about?: string;
    applogo?: string;
    appname?: string;
    metadata?: string;
    token?: string;
}
/**  */
export interface ApiAddAppRequest {
    appname?: string;
    creator_id?: string;
    role?: ApiAppRole;
    token?: string;
}
/**
* - USER_ROLE_ADMIN: All access
 - USER_ROLE_DEVELOPER: Best for developers, also enables APIs and API explorer
 - USER_ROLE_MAINTAINER: Best for users who regularly update player information.
 - USER_ROLE_READONLY: Read-only role for those only need to view data
*/
export declare enum ApiAppRole {
    USER_ROLE_UNKNOWN = 0,
    USER_ROLE_ADMIN = 1,
    USER_ROLE_DEVELOPER = 2,
    USER_ROLE_MAINTAINER = 3,
    USER_ROLE_READONLY = 4
}
/** Update fields in a given channel. */
export interface MezonUpdateChannelDescBody {
    category_id?: string;
    channel_label?: string;
}
/**  */
export interface MezonUpdateClanDescBody {
    banner?: string;
    clan_name?: string;
    creator_id?: string;
    logo?: string;
    status?: number;
}
/**  */
export interface MezonUpdateClanDescProfileBody {
    avatar_url?: string;
    nick_name?: string;
    profile_banner?: string;
    profile_theme?: string;
}
/**  */
export interface MezonUpdateClanEmojiByIdBody {
    category?: string;
    clan_id?: string;
    shortname?: string;
    source?: string;
}
/**  */
export interface MezonUpdateClanStickerByIdBody {
    category?: string;
    shortname?: string;
    source?: string;
}
/** update a event within clan. */
export interface MezonUpdateEventBody {
    address?: string;
    channel_id?: string;
    clan_id?: string;
    description?: string;
    end_time?: string;
    logo?: string;
    start_time?: string;
    title?: string;
}
/** Update fields in a given role. */
export interface MezonUpdateRoleBody {
    active_permission_ids?: Array<string>;
    add_user_ids?: Array<string>;
    allow_mention?: number;
    clan_id?: string;
    color?: string;
    description?: string;
    display_online?: number;
    remove_permission_ids?: Array<string>;
    remove_user_ids?: Array<string>;
    role_icon?: string;
    title?: string;
}
/** Delete a role the user has access to. */
export interface MezonUpdateRoleDeleteBody {
    clan_id?: string;
}
/** Request to get system message by clan and channel IDs. */
export interface MezonUpdateSystemMessageBody {
    channel_id?: string;
}
/**  */
export interface MezonUpdateUserProfileByClanBody {
    avatar?: string;
    nick_name?: string;
}
/**  */
export interface MezonUpdateWebhookByIdBody {
    avatar?: string;
    channel_id?: string;
    webhook_name?: string;
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
    timestamp_seconds?: number;
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
/** App information. */
export interface ApiApp {
    id: string;
    applogo?: string;
    appname?: string;
    creator_id?: string;
    disable_time?: string;
    is_shadow?: boolean;
    role?: number;
    token?: string;
}
/** A list of apps. */
export interface ApiAppList {
    apps?: Array<ApiApp>;
    next_cursor?: string;
    total_count?: number;
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
/** Update fields in a given channel. */
export interface ApiChangeChannelPrivateRequest {
    channel_id?: string;
    channel_private?: number;
    role_ids?: Array<string>;
    user_ids?: Array<string>;
}
/**  */
export interface ApiChannelAttachment {
    create_time?: string;
    filename?: string;
    filesize?: string;
    filetype?: string;
    id?: string;
    uploader?: string;
    url?: string;
}
/**  */
export interface ApiChannelAttachmentList {
    attachments?: Array<ApiChannelAttachment>;
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
    active?: number;
    category_id?: string;
    category_name?: string;
    channel_avatar?: Array<string>;
    channel_id?: string;
    channel_label?: string;
    channel_private?: number;
    clan_id?: string;
    count_mess_unread?: number;
    create_time_seconds?: number;
    creator_id?: string;
    creator_name?: string;
    last_pin_message?: string;
    last_seen_message?: ApiChannelMessageHeader;
    last_sent_message?: ApiChannelMessageHeader;
    meeting_code?: string;
    meeting_uri?: string;
    parrent_id?: string;
    status?: number;
    type?: number;
    update_time_seconds?: number;
    user_id?: Array<string>;
    usernames?: string;
}
/** A message sent on a channel. */
export interface ApiChannelMessage {
    id: string;
    attachments?: string;
    avatar?: string;
    category_name?: string;
    channel_id: string;
    channel_label: string;
    clan_id?: string;
    clan_logo?: string;
    clan_nick?: string;
    clan_avatar?: string;
    code: number;
    content: string;
    create_time?: string;
    create_time_seconds?: number;
    display_name?: string;
    mentions?: string;
    message_id: string;
    reactions?: string;
    referenced_message?: string;
    references?: string;
    sender_id: string;
    update_time?: string;
    update_time_seconds?: number;
    username?: string;
    mode?: number;
    hideEditted?: boolean;
}
/**  */
export interface ApiChannelMessageHeader {
    attachment?: string;
    content?: string;
    id?: string;
    mention?: string;
    reaction?: string;
    referece?: string;
    sender_id?: string;
    timestamp_seconds?: number;
}
/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
    last_seen_message?: ApiChannelMessageHeader;
    last_sent_message?: ApiChannelMessageHeader;
    messages?: Array<ApiChannelMessage>;
}
/** A list of users belonging to a channel, along with their role. */
export interface ApiChannelUserList {
    channel_id?: string;
    channel_users?: Array<ChannelUserListChannelUser>;
    cursor?: string;
}
/**  */
export interface ApiCheckDuplicateClanNameResponse {
    is_duplicate?: boolean;
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
/**  */
export interface ApiClanEmojiCreateRequest {
    category?: string;
    clan_id?: string;
    id?: string;
    shortname?: string;
    source?: string;
}
/** Get clan profile. */
export interface ApiClanProfile {
    avartar?: string;
    clan_id?: string;
    nick_name?: string;
    user_id?: string;
}
/**  */
export interface ApiClanStickerAddRequest {
    category?: string;
    clan_id?: string;
    id?: string;
    shortname?: string;
    source?: string;
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
/** Create a event within clan. */
export interface ApiCreateEventRequest {
    address?: string;
    channel_id?: string;
    clan_id?: string;
    description?: string;
    end_time?: string;
    logo?: string;
    start_time?: string;
    title?: string;
}
/** Create a event within clan. */
export interface ApiUpdateEventRequest {
    address?: string;
    channel_id?: string;
    event_id?: string;
    description?: string;
    end_time?: string;
    logo?: string;
    start_time?: string;
    title?: string;
    clan_id?: string;
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
/** Delete a channel the user has access to. */
export interface ApiDeleteChannelDescRequest {
    channel_id?: string;
}
/**  */
export interface ApiDeleteEventRequest {
    clan_id?: string;
    event_id?: string;
}
/** Delete a role the user has access to. */
export interface ApiDeleteRoleRequest {
    channel_id?: string;
    clan_id?: string;
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
/**  */
export interface ApiEventList {
    events?: Array<ApiEventManagement>;
}
/**  */
export interface ApiEventManagement {
    active?: number;
    address?: string;
    channel_id?: string;
    clan_id?: string;
    creator_id?: string;
    description?: string;
    end_time?: string;
    id?: string;
    logo?: string;
    start_event?: number;
    start_time?: string;
    title?: string;
    user_ids?: Array<string>;
    create_time?: string;
}
/**  */
export interface ApiFilterParam {
    field_name?: string;
    field_value?: string;
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
    expiry_time?: string;
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
export interface ApiNotifiReactMessage {
    channel_id?: string;
    id?: string;
    user_id?: string;
}
/**  */
export interface ApiMessageAttachment {
    filename?: string;
    filetype?: string;
    height?: number;
    size?: number;
    url?: string;
    width?: number;
    /** The channel this message belongs to. */
    channel_id?: string;
    mode?: number;
    channel_label?: string;
    /** The message that user react */
    message_id?: string;
    /** Message sender, usually a user ID. */
    sender_id?: string;
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
    role_id?: string;
    rolename?: string;
    s?: number;
    e?: number;
    /** The channel this message belongs to. */
    channel_id?: string;
    mode?: number;
    channel_label?: string;
    /** The message that user react */
    message_id?: string;
    /** Message sender, usually a user ID. */
    sender_id?: string;
}
/**  */
export interface ApiMessageReaction {
    action?: boolean;
    emoji_id: string;
    emoji: string;
    id?: string;
    sender_id?: string;
    sender_name?: string;
    sender_avatar?: string;
    count: number;
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The message that user react */
    message_id: string;
}
/**  */
export interface ApiMessageRef {
    message_id?: string;
    message_ref_id?: string;
    ref_type?: number;
    message_sender_id?: string;
    message_sender_username?: string;
    mesages_sender_avatar?: string;
    message_sender_clan_nick?: string;
    message_sender_display_name?: string;
    content?: string;
    has_attachment: boolean;
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
}
/** A notification in the server. */
export interface ApiNotification {
    avatar_url?: string;
    channel_id?: string;
    channel_type?: string;
    clan_id?: string;
    code?: number;
    content?: string;
    create_time?: string;
    id?: string;
    persistent?: boolean;
    sender_id?: string;
    subject?: string;
}
/**  */
export interface ApiNotificationChannel {
    channel_id?: string;
}
/** A collection of zero or more notifications. */
export interface ApiNotificationList {
    cacheable_cursor?: string;
    notifications?: Array<ApiNotification>;
}
/**  */
export interface ApiNotificationSetting {
    id?: string;
    notification_setting_type?: number;
}
/**  */
export interface ApiNotificationUserChannel {
    active?: number;
    id?: string;
    notification_setting_type?: number;
    time_mute?: string;
}
/**  */
export interface ApiPermission {
    active?: number;
    description?: string;
    id?: string;
    scope?: number;
    slug?: string;
    title?: string;
}
/** A list of permission description, usually a result of a list operation. */
export interface ApiPermissionList {
    permissions?: Array<ApiPermission>;
}
/**  */
export interface ApiPermissionUpdate {
    permission_id?: string;
    type?: number;
}
/**  */
export interface ApiPinMessage {
    avatar?: string;
    channel_id?: string;
    content?: string;
    id?: string;
    message_id?: string;
    sender_id?: string;
    username?: string;
}
/**  */
export interface ApiPinMessageRequest {
    channel_id?: string;
    message_id?: string;
}
/**  */
export interface ApiPinMessagesList {
    pin_messages_list?: Array<ApiPinMessage>;
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
export interface ApiRegistrationEmailRequest {
    avatar_url?: string;
    display_name?: string;
    dob?: string;
    email?: string;
    password?: string;
    username?: string;
    vars?: Record<string, string>;
}
/**  */
export interface ApiRole {
    active?: number;
    allow_mention?: number;
    channel_ids?: Array<string>;
    clan_id?: string;
    color?: string;
    creator_id?: string;
    description?: string;
    display_online?: number;
    id?: string;
    permission_list?: ApiPermissionList;
    role_channel_active?: number;
    role_icon?: string;
    role_user_list?: ApiRoleUserList;
    slug?: string;
    title?: string;
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
/**  */
export interface ApiSearchMessageDocument {
    attachment?: string;
    avatar_url?: string;
    channel_id?: string;
    channel_label?: string;
    channel_type?: number;
    clan_id?: string;
    clan_name?: string;
    content?: string;
    create_time?: string;
    display_name?: string;
    mention?: string;
    message_id?: string;
    reaction?: string;
    reference?: string;
    sender_id?: string;
    update_time?: string;
    username?: string;
}
/**  */
export interface ApiSearchMessageRequest {
    filters?: Array<ApiFilterParam>;
    from?: number;
    size?: number;
    sorts?: Array<ApiSortParam>;
}
/**  */
export interface ApiSearchMessageResponse {
    messages?: Array<ApiSearchMessageDocument>;
    total?: number;
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
/**  */
export interface ApiSetDefaultNotificationRequest {
    category_id?: string;
    clan_id?: string;
    notification_type?: number;
}
/**  */
export interface ApiSetMuteNotificationRequest {
    active?: number;
    id?: string;
    notification_type?: number;
}
/**  */
export interface ApiSetNotificationRequest {
    channel_category_id?: string;
    notification_type?: number;
    time_mute?: string;
}
/**  */
export interface ApiSortParam {
    field_name?: string;
    order?: string;
}
/** System message details. */
export interface ApiSystemMessage {
    channel_id?: string;
    clan_id?: string;
    id?: string;
}
/** Request to get system message by clan and channel IDs. */
export interface ApiSystemMessageRequest {
    channel_id?: string;
    clan_id?: string;
}
/** List of system message. */
export interface ApiSystemMessagesList {
    system_messages_list?: Array<ApiSystemMessage>;
}
/** Update a user's account details. */
export interface ApiUpdateAccountRequest {
    about_me?: string;
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
/**  */
export interface ApiUpdateRoleChannelRequest {
    channel_id?: string;
    permission_update?: Array<ApiPermissionUpdate>;
    role_id?: string;
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
    about_me?: string;
    apple_id?: string;
    avatar_url?: string;
    create_time?: string;
    display_name?: string;
    edge_count?: number;
    facebook_id?: string;
    gamecenter_id?: string;
    google_id?: string;
    id?: string;
    join_time?: string;
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
    id?: string;
    channel_id?: string;
    participant?: string;
    user_id?: string;
}
/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUserList {
    voice_channel_users?: Array<ApiVoiceChannelUser>;
}
/**  */
export interface ApiWebhook {
    active?: number;
    avatar?: string;
    channel_id?: string;
    create_time?: string;
    creator_id?: string;
    id?: string;
    update_time?: string;
    url?: string;
    webhook_name?: string;
}
/**  */
export interface ApiWebhookCreateRequest {
    avatar?: string;
    channel_id?: string;
    webhook_name?: string;
}
/**  */
export interface ApiWebhookGenerateResponse {
    avatar?: string;
    channel_id?: string;
    hook_name?: string;
    url?: string;
}
/**  */
export interface ApiWebhookListResponse {
    webhooks?: Array<ApiWebhook>;
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
    authenticateEmail(basicAuthUsername: string, basicAuthPassword: string, account: ApiAccountEmail, username?: string, options?: any): Promise<ApiSession>;
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
    /** Authenticate a user with an email+password against the server. */
    registrationEmail(bearerToken: string, body: ApiRegistrationEmailRequest, options?: any): Promise<ApiSession>;
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
    /** Add a new apps. */
    addApp(bearerToken: string, body: ApiAddAppRequest, options?: any): Promise<any>;
    /** List (and optionally filter) accounts. */
    listApps(bearerToken: string, filter?: string, tombstones?: boolean, cursor?: string, options?: any): Promise<ApiAppList>;
    /** Add an app to clan. */
    addAppToClan(bearerToken: string, appId: string, clanId: string, options?: any): Promise<any>;
    /** Delete all information stored for an app. */
    deleteApp(bearerToken: string, id: string, recordDeletion?: boolean, options?: any): Promise<any>;
    /** Get detailed app information. */
    getApp(bearerToken: string, id: string, options?: any): Promise<ApiApp>;
    /** Update one or more fields on a app. */
    updateApp(bearerToken: string, id: string, body: MezonUpdateAppBody, options?: any): Promise<any>;
    /** Ban a app. */
    banApp(bearerToken: string, id: string, options?: any): Promise<any>;
    /** Unban an app. */
    unbanApp(bearerToken: string, id: string, options?: any): Promise<any>;
    /**  */
    listCategoryDescs(bearerToken: string, clanId: string, creatorId?: string, categoryName?: string, categoryId?: string, options?: any): Promise<ApiCategoryDescList>;
    /** List a channel's message history. */
    listChannelMessages(bearerToken: string, channelId: string, messageId?: string, direction?: number, limit?: number, options?: any): Promise<ApiChannelMessageList>;
    /** Add users to a channel. */
    addChannelUsers(bearerToken: string, channelId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** List all attachment that are part of a channel. */
    listChannelAttachment(bearerToken: string, channelId: string, clanId?: string, fileType?: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiChannelAttachmentList>;
    /** Leave a channel the user is a member of. */
    leaveChannel(bearerToken: string, channelId: string, options?: any): Promise<any>;
    /** Kick a set of users from a channel. */
    removeChannelUsers(bearerToken: string, channelId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** List all users that are part of a channel. */
    listChannelUsers(bearerToken: string, clanId: string, channelId: string, channelType?: number, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiChannelUserList>;
    /** List user channels */
    listChannelDescs(bearerToken: string, limit?: number, state?: number, cursor?: string, clanId?: string, channelType?: number, options?: any): Promise<ApiChannelDescList>;
    /** Create a new channel with the current user as the owner. */
    createChannelDesc(bearerToken: string, body: ApiCreateChannelDescRequest, options?: any): Promise<ApiChannelDescription>;
    /** Delete a channel by ID. */
    deleteChannelDesc(bearerToken: string, channelId: string, options?: any): Promise<any>;
    /** Update fields in a given channel. */
    updateChannelDesc(bearerToken: string, channelId: string, body: {}, options?: any): Promise<any>;
    /** List all users that are part of a channel. */
    listChannelVoiceUsers(bearerToken: string, clanId?: string, channelId?: string, channelType?: number, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiVoiceChannelUserList>;
    /** List clans */
    listClanDescs(bearerToken: string, limit?: number, state?: number, cursor?: string, options?: any): Promise<ApiClanDescList>;
    /** Create a clan */
    createClanDesc(bearerToken: string, body: ApiCreateClanDescRequest, options?: any): Promise<ApiClanDesc>;
    /** Delete a clan desc by ID. */
    deleteClanDesc(bearerToken: string, clanDescId: string, options?: any): Promise<any>;
    /** Update fields in a given clan. */
    updateClanDesc(bearerToken: string, clanId: string, body: {}, options?: any): Promise<any>;
    /** Kick a set of users from a clan. */
    removeClanUsers(bearerToken: string, clanId: string, userIds?: Array<string>, options?: any): Promise<any>;
    /** List all users that are part of a clan. */
    listClanUsers(bearerToken: string, clanId: string, options?: any): Promise<ApiClanUserList>;
    /** check duplicate clan name */
    checkDuplicateClanName(bearerToken: string, clanName: string, options?: any): Promise<ApiCheckDuplicateClanNameResponse>;
    /** Get a clan desc profile */
    getClanDescProfile(bearerToken: string, clanId: string, options?: any): Promise<ApiClanDescProfile>;
    /** Update fields in a given clan profile. */
    updateClanDescProfile(bearerToken: string, clanId: string, body: {}, options?: any): Promise<any>;
    /**  */
    createCategoryDesc(bearerToken: string, body: ApiCreateCategoryDescRequest, options?: any): Promise<ApiCategoryDesc>;
    /**  */
    deleteCategoryDesc(bearerToken: string, creatorId: string, options?: any): Promise<any>;
    /** regist fcm device token */
    registFCMDeviceToken(bearerToken: string, token?: string, deviceId?: string, platform?: string, options?: any): Promise<any>;
    /** close direct message. */
    closeDirectMess(bearerToken: string, body: ApiDeleteChannelDescRequest, options?: any): Promise<any>;
    /** open direct message. */
    openDirectMess(bearerToken: string, body: ApiDeleteChannelDescRequest, options?: any): Promise<any>;
    /** Post clan Emoji  /v2/emoji/create */
    createClanEmoji(bearerToken: string, body: ApiClanEmojiCreateRequest, options?: any): Promise<any>;
    /** Delete a emoji by ID. */
    deleteClanEmojiById(bearerToken: string, id: string, clanId?: string, options?: any): Promise<any>;
    /** Update ClanEmoj By id */
    updateClanEmojiById(bearerToken: string, id: string, body: MezonUpdateClanEmojiByIdBody, options?: any): Promise<any>;
    /** Search message from elasticsearch service. */
    searchMessage(bearerToken: string, body: ApiSearchMessageRequest, options?: any): Promise<ApiSearchMessageResponse>;
    /** Submit an event for processing in the server's registered runtime custom events handler. */
    event(bearerToken: string, body: ApiEvent, options?: any): Promise<any>;
    /** List user events */
    listEvents(bearerToken: string, clanId?: string, options?: any): Promise<ApiEventList>;
    /** Create a new event for clan. */
    createEvent(bearerToken: string, body: ApiCreateEventRequest, options?: any): Promise<ApiEventManagement>;
    /** Update fields in a given event. */
    updateEventUser(bearerToken: string, body: ApiDeleteEventRequest, options?: any): Promise<any>;
    /** Delete a event by ID. */
    deleteEvent(bearerToken: string, eventId: string, clanId?: string, options?: any): Promise<any>;
    /** Update fields in a given event. */
    updateEvent(bearerToken: string, eventId: string, body: MezonUpdateEventBody, options?: any): Promise<any>;
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
    /** set mute notification user channel. */
    setMuteNotificationCategory(bearerToken: string, body: ApiSetMuteNotificationRequest, options?: any): Promise<any>;
    /** set mute notification user channel. */
    setMuteNotificationChannel(bearerToken: string, body: ApiSetMuteNotificationRequest, options?: any): Promise<any>;
    /** Delete one or more notifications for the current user. */
    deleteNotifications(bearerToken: string, ids?: Array<string>, options?: any): Promise<any>;
    /** Fetch list of notifications. */
    listNotifications(bearerToken: string, clanId: string, limit?: number, cacheableCursor?: string, options?: any): Promise<ApiNotificationList>;
    /** set notification user channel. */
    setNotificationChannelSetting(bearerToken: string, body: ApiSetNotificationRequest, options?: any): Promise<any>;
    /** set notification user channel. */
    setNotificationClanSetting(bearerToken: string, body: ApiSetDefaultNotificationRequest, options?: any): Promise<any>;
    /** set notification user channel. */
    setNotificationCategorySetting(bearerToken: string, body: ApiSetNotificationRequest, options?: any): Promise<any>;
    /**  */
    deleteNotificationCategorySetting(bearerToken: string, categoryId?: string, options?: any): Promise<any>;
    /**  */
    deleteNotificationChannel(bearerToken: string, channelId?: string, options?: any): Promise<any>;
    /**  */
    deleteNotiReactMessage(bearerToken: string, channelId?: string, options?: any): Promise<any>;
    /**  */
    setNotificationReactMessage(bearerToken: string, body: ApiNotificationChannel, options?: any): Promise<any>;
    /** set permission role channel. */
    setRoleChannelPermission(bearerToken: string, body: ApiUpdateRoleChannelRequest, options?: any): Promise<any>;
    /** Get permission list */
    getListPermission(bearerToken: string, options?: any): Promise<ApiPermissionList>;
    /**  */
    getPermissionOfUserInTheClan(bearerToken: string, clanId: string, options?: any): Promise<ApiPermissionList>;
    /**  */
    deletePinMessage(bearerToken: string, messageId?: string, options?: any): Promise<any>;
    /**  */
    getPinMessagesList(bearerToken: string, channelId?: string, options?: any): Promise<ApiPinMessagesList>;
    /** set notification user channel. */
    createPinMessage(bearerToken: string, body: ApiPinMessageRequest, options?: any): Promise<any>;
    /**  */
    addRolesChannelDesc(bearerToken: string, body: ApiAddRoleChannelDescRequest, options?: any): Promise<any>;
    /** update the category of a channel */
    changeChannelCategory(bearerToken: string, newCategoryId: string, body: MezonChangeChannelCategoryBody, options?: any): Promise<any>;
    /** Update a role when Delete a role by ID. */
    deleteRoleChannelDesc(bearerToken: string, body: ApiDeleteRoleRequest, options?: any): Promise<any>;
    /** List user roles */
    listRoles(bearerToken: string, limit?: number, state?: number, cursor?: string, clanId?: string, options?: any): Promise<ApiRoleList>;
    /** Create a new role for clan. */
    createRole(bearerToken: string, body: ApiCreateRoleRequest, options?: any): Promise<ApiRole>;
    /** Update a role when Delete a role by ID. */
    updateRoleDelete(bearerToken: string, roleId: string, body: MezonUpdateRoleDeleteBody, options?: any): Promise<any>;
    /** Delete a role by ID. */
    deleteRole(bearerToken: string, roleId: string, channelId?: string, options?: any): Promise<any>;
    /** Update fields in a given role. */
    updateRole(bearerToken: string, roleId: string, body: MezonUpdateRoleBody, options?: any): Promise<any>;
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
    /** Add a new sticker */
    addClanSticker(bearerToken: string, body: ApiClanStickerAddRequest, options?: any): Promise<any>;
    /** Delete a sticker by ID */
    deleteClanStickerById(bearerToken: string, id: string, clanId?: string, options?: any): Promise<any>;
    /** Update a sticker by ID */
    updateClanStickerById(bearerToken: string, id: string, body: MezonUpdateClanStickerByIdBody, options?: any): Promise<any>;
    /** Get the list of system messages. */
    getSystemMessagesList(bearerToken: string, options?: any): Promise<ApiSystemMessagesList>;
    /** Create a system messages. */
    createSystemMessage(bearerToken: string, body: ApiSystemMessageRequest, options?: any): Promise<any>;
    /** Delete a specific system messages. */
    deleteSystemMessage(bearerToken: string, clanId: string, options?: any): Promise<any>;
    /** Get details of a specific system messages. */
    getSystemMessageByClanId(bearerToken: string, clanId: string, options?: any): Promise<ApiSystemMessage>;
    /** Update a system messages. */
    updateSystemMessage(bearerToken: string, clanId: string, body: MezonUpdateSystemMessageBody, options?: any): Promise<any>;
    /** Update fields in a given category. */
    updateCategory(bearerToken: string, body: ApiUpdateCategoryDescRequest, options?: any): Promise<any>;
    /** Update channel private. */
    updateChannelPrivate(bearerToken: string, body: ApiChangeChannelPrivateRequest, options?: any): Promise<any>;
    /**  */
    updateUserProfileByClan(bearerToken: string, clanId: string, body: MezonUpdateUserProfileByClanBody, options?: any): Promise<any>;
    /** Upload attachment */
    uploadAttachmentFile(bearerToken: string, body: ApiUploadAttachmentRequest, options?: any): Promise<ApiUploadAttachment>;
    /** Fetch zero or more users by ID and/or username. */
    getUsers(bearerToken: string, ids?: Array<string>, usernames?: Array<string>, facebookIds?: Array<string>, options?: any): Promise<ApiUsers>;
    /**  */
    updateUser(bearerToken: string, body: ApiUpdateUsersRequest, options?: any): Promise<any>;
    /** create webhook */
    generateWebhook(bearerToken: string, body: ApiWebhookCreateRequest, options?: any): Promise<any>;
    /** update webhook name by id */
    updateWebhookById(bearerToken: string, id: string, body: MezonUpdateWebhookByIdBody, options?: any): Promise<any>;
    /** list webhook belong to the channel */
    listWebhookByChannelId(bearerToken: string, channelId: string, clanId?: string, options?: any): Promise<ApiWebhookListResponse>;
    /** disabled webhook */
    deleteWebhookById(bearerToken: string, id: string, options?: any): Promise<any>;
    buildFullUrl(basePath: string, fragment: string, queryParams: Map<string, any>): string;
}
