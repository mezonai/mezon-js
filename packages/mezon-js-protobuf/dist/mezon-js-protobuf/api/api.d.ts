import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "mezon.api";
/** The Mezon server RPC protocol for games and apps. */
/** Validation Provider, */
export declare enum StoreProvider {
    /** APPLE_APP_STORE - Apple App Store */
    APPLE_APP_STORE = 0,
    /** GOOGLE_PLAY_STORE - Google Play Store */
    GOOGLE_PLAY_STORE = 1,
    /** HUAWEI_APP_GALLERY - Huawei App Gallery */
    HUAWEI_APP_GALLERY = 2,
    /** FACEBOOK_INSTANT_STORE - Facebook Instant Store */
    FACEBOOK_INSTANT_STORE = 3,
    UNRECOGNIZED = -1
}
export declare function storeProviderFromJSON(object: any): StoreProvider;
export declare function storeProviderToJSON(object: StoreProvider): string;
/** Environment where a purchase/subscription took place, */
export declare enum StoreEnvironment {
    /** UNKNOWN - Unknown environment. */
    UNKNOWN = 0,
    /** SANDBOX - Sandbox/test environment. */
    SANDBOX = 1,
    /** PRODUCTION - Production environment. */
    PRODUCTION = 2,
    UNRECOGNIZED = -1
}
export declare function storeEnvironmentFromJSON(object: any): StoreEnvironment;
export declare function storeEnvironmentToJSON(object: StoreEnvironment): string;
/** Operator that can be used to override the one set in the leaderboard. */
export declare enum Operator {
    /** NO_OVERRIDE - Do not override the leaderboard operator. */
    NO_OVERRIDE = 0,
    /** BEST - Override the leaderboard operator with BEST. */
    BEST = 1,
    /** SET - Override the leaderboard operator with SET. */
    SET = 2,
    /** INCREMENT - Override the leaderboard operator with INCREMENT. */
    INCREMENT = 3,
    /** DECREMENT - Override the leaderboard operator with DECREMENT. */
    DECREMENT = 4,
    UNRECOGNIZED = -1
}
export declare function operatorFromJSON(object: any): Operator;
export declare function operatorToJSON(object: Operator): string;
/** A user with additional account details. Always the current user. */
export interface Account {
    /** The user object. */
    user: User | undefined;
    /** The user's wallet data. */
    wallet: string;
    /** The email address of the user. */
    email: string;
    /** The devices which belong to the user's account. */
    devices: AccountDevice[];
    /** The custom id in the user's account. */
    custom_id: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's email was verified. */
    verify_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's account was disabled/banned. */
    disable_time: Date | undefined;
}
/** Obtain a new authentication token using a refresh token. */
export interface AccountRefresh {
    /** Refresh token. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountRefresh_VarsEntry {
    key: string;
    value: string;
}
/** Send a Apple Sign In token to the server. Used with authenticate/link/unlink. */
export interface AccountApple {
    /** The ID token received from Apple to validate. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountApple_VarsEntry {
    key: string;
    value: string;
}
/** Send a custom ID to the server. Used with authenticate/link/unlink. */
export interface AccountCustom {
    /** A custom identifier. */
    id: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountCustom_VarsEntry {
    key: string;
    value: string;
}
/** Send a device to the server. Used with authenticate/link/unlink and user. */
export interface AccountDevice {
    /** A device identifier. Should be obtained by a platform-specific device API. */
    id: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountDevice_VarsEntry {
    key: string;
    value: string;
}
/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface AccountEmail {
    /** A valid RFC-5322 email address. */
    email: string;
    /** A password for the user account. */
    password: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountEmail_VarsEntry {
    key: string;
    value: string;
}
/** Send a Facebook token to the server. Used with authenticate/link/unlink. */
export interface AccountFacebook {
    /** The OAuth token received from Facebook to access their profile API. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountFacebook_VarsEntry {
    key: string;
    value: string;
}
/** Send a Facebook Instant Game token to the server. Used with authenticate/link/unlink. */
export interface AccountFacebookInstantGame {
    /** The OAuth token received from a Facebook Instant Game that may be decoded with the Application Secret (must be available with the mezon configuration) */
    signed_player_info: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountFacebookInstantGame_VarsEntry {
    key: string;
    value: string;
}
/** Send Apple's Game Center account credentials to the server. Used with authenticate/link/unlink. */
export interface AccountGameCenter {
    /** Player ID (generated by GameCenter). */
    player_id: string;
    /** Bundle ID (generated by GameCenter). */
    bundle_id: string;
    /** Time since UNIX epoch when the signature was created. */
    timestamp_seconds: number;
    /** A random "NSString" used to compute the hash and keep it randomized. */
    salt: string;
    /** The verification signature data generated. */
    signature: string;
    /** The URL for the public encryption key. */
    public_key_url: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountGameCenter_VarsEntry {
    key: string;
    value: string;
}
/** Send a Google token to the server. Used with authenticate/link/unlink. */
export interface AccountGoogle {
    /** The OAuth token received from Google to access their profile API. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountGoogle_VarsEntry {
    key: string;
    value: string;
}
/** Send a Steam token to the server. Used with authenticate/link/unlink. */
export interface AccountSteam {
    /** The account token received from Steam to access their profile API. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface AccountSteam_VarsEntry {
    key: string;
    value: string;
}
/** Add one or more friends to the current user. */
export interface AddFriendsRequest {
    /** The account id of a user. */
    ids: string[];
    /** The account username of a user. */
    usernames: string[];
}
/** Add users to a group. */
export interface AddGroupUsersRequest {
    /** The group to add users to. */
    group_id: string;
    /** The users to add. */
    user_ids: string[];
}
/** Authenticate against the server with a refresh token. */
export interface SessionRefreshRequest {
    /** Refresh token. */
    token: string;
    /** Extra information that will be bundled in the session token. */
    vars: {
        [key: string]: string;
    };
}
export interface SessionRefreshRequest_VarsEntry {
    key: string;
    value: string;
}
/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface SessionLogoutRequest {
    /** Session token to log out. */
    token: string;
    /** Refresh token to invalidate. */
    refresh_token: string;
}
/** Authenticate against the server with Apple Sign In. */
export interface AuthenticateAppleRequest {
    /** The Apple account details. */
    account: AccountApple | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with a custom ID. */
export interface AuthenticateCustomRequest {
    /** The custom account details. */
    account: AccountCustom | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with a device ID. */
export interface AuthenticateDeviceRequest {
    /** The device account details. */
    account: AccountDevice | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with email+password. */
export interface AuthenticateEmailRequest {
    /** The email account details. */
    account: AccountEmail | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with Facebook. */
export interface AuthenticateFacebookRequest {
    /** The Facebook account details. */
    account: AccountFacebook | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
    /** Import Facebook friends for the user. */
    sync: boolean | undefined;
}
/** Authenticate against the server with Facebook Instant Game token. */
export interface AuthenticateFacebookInstantGameRequest {
    /** The Facebook Instant Game account details. */
    account: AccountFacebookInstantGame | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with Apple's Game Center. */
export interface AuthenticateGameCenterRequest {
    /** The Game Center account details. */
    account: AccountGameCenter | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with Google. */
export interface AuthenticateGoogleRequest {
    /** The Google account details. */
    account: AccountGoogle | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
}
/** Authenticate against the server with Steam. */
export interface AuthenticateSteamRequest {
    /** The Steam account details. */
    account: AccountSteam | undefined;
    /** Register the account if the user does not already exist. */
    create: boolean | undefined;
    /** Set the username on the account at register. Must be unique. */
    username: string;
    /** Import Steam friends for the user. */
    sync: boolean | undefined;
}
/** Ban users from a group. */
export interface BanGroupUsersRequest {
    /** The group to ban users from. */
    group_id: string;
    /** The users to ban. */
    user_ids: string[];
}
/** Block one or more friends for the current user. */
export interface BlockFriendsRequest {
    /** The account id of a user. */
    ids: string[];
    /** The account username of a user. */
    usernames: string[];
}
/** A message sent on a channel. */
export interface ChannelMessage {
    /** The clan this message belong to. */
    clan_id: string;
    /** The channel this message belongs to. */
    channel_id: string;
    /** The unique ID of this message. */
    message_id: string;
    /** The code representing a message type or category. */
    code: number | undefined;
    /** Message sender, usually a user ID. */
    sender_id: string;
    /** The username of the message sender, if any. */
    username: string;
    /** The avatar of user who send message */
    avatar: string;
    /** The content payload. */
    content: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated. */
    update_time: Date | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    channel_name: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
    /** Emoji reaction */
    reactions: string;
    /** Message mention */
    mentions: string;
    /** Message attachment */
    attachments: string;
    /** Message reference */
    references: string;
    /** referenced message */
    referenced_message: string;
}
/** Mention to message */
export interface MessageMention {
    /** Mention id */
    id: string;
    /** mention user id */
    user_id: string;
    /** mention username */
    username: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
    create_time: Date | undefined;
}
/** Emoji reaction by user */
export interface MessageReaction {
    /** Reaction id */
    id: string;
    /** A list emoji */
    emoji: string;
    /** User react to message */
    sender_id: string;
    /** Action reaction delete or add */
    action: boolean;
    /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
    cacheable_cursor: string;
}
/** Message attachment */
export interface MessageAttachment {
    /** Attachment file name */
    filename: string;
    /** Attachment file size */
    size: number;
    /** Attachment url */
    url: string;
    /** Attachment file type */
    filetype: string;
    /** Attachment width */
    width: number;
    /** Attachment width */
    height: number;
}
/** Message reference */
export interface MessageRef {
    /** A message source */
    message_id: string;
    /** A message reference to */
    message_ref_id: string;
    /** Reference type. 0: reply */
    ref_type: number;
}
/** Message reference */
export interface MessageDeleted {
    /** A deleted message source */
    message_id: string;
    /** Who delete it */
    deletor: string;
}
/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
    /** A list of messages. */
    messages: ChannelMessage[];
    /** last seen message id by user */
    last_seen_message_id: string;
    /** The cursor to send when retrieving the next page, if any. */
    next_cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
    /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
    cacheable_cursor: string;
}
/** Create a group with the current user as owner. */
export interface CreateGroupRequest {
    /** A unique name for the group. */
    name: string;
    /** A description for the group. */
    description: string;
    /** The language expected to be a tag which follows the BCP-47 spec. */
    lang_tag: string;
    /** A URL for an avatar image. */
    avatar_url: string;
    /** Mark a group as open or not where only admins can accept members. */
    open: boolean;
    /** Maximum number of group members. */
    max_count: number;
}
/** Delete one or more friends for the current user. */
export interface DeleteFriendsRequest {
    /** The account id of a user. */
    ids: string[];
    /** The account username of a user. */
    usernames: string[];
}
/** Delete a group the user has access to. */
export interface DeleteGroupRequest {
    /** The id of a group. */
    group_id: string;
}
/** Delete one or more notifications for the current user. */
export interface DeleteNotificationsRequest {
    /** The id of notifications. */
    ids: string[];
}
/** Storage objects to delete. */
export interface DeleteStorageObjectId {
    /** The collection which stores the object. */
    collection: string;
    /** The key of the object within the collection. */
    key: string;
    /** The version hash of the object. */
    version: string;
}
/** Batch delete storage objects. */
export interface DeleteStorageObjectsRequest {
    /** Batch of storage objects. */
    object_ids: DeleteStorageObjectId[];
}
/** Represents an event to be passed through the server to registered event handlers. */
export interface Event {
    /** An event name, type, category, or identifier. */
    name: string;
    /** Arbitrary event property values. */
    properties: {
        [key: string]: string;
    };
    /** The time when the event was triggered. */
    timestamp: Date | undefined;
    /** True if the event came directly from a client call, false otherwise. */
    external: boolean;
}
export interface Event_PropertiesEntry {
    key: string;
    value: string;
}
/** A friend of a user. */
export interface Friend {
    /** The user object. */
    user: User | undefined;
    /** The friend status. */
    state: number | undefined;
    /** Time of the latest relationship update. */
    update_time: Date | undefined;
}
/** The friendship status. */
export declare enum Friend_State {
    /** FRIEND - The user is a friend of the current user. */
    FRIEND = 0,
    /** INVITE_SENT - The current user has sent an invite to the user. */
    INVITE_SENT = 1,
    /** INVITE_RECEIVED - The current user has received an invite from this user. */
    INVITE_RECEIVED = 2,
    /** BLOCKED - The current user has blocked this user. */
    BLOCKED = 3,
    UNRECOGNIZED = -1
}
export declare function friend_StateFromJSON(object: any): Friend_State;
export declare function friend_StateToJSON(object: Friend_State): string;
/** A collection of zero or more friends of the user. */
export interface FriendList {
    /** The Friend objects. */
    friends: Friend[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
}
/** Fetch a batch of zero or more users from the server. */
export interface GetUsersRequest {
    /** The account id of a user. */
    ids: string[];
    /** The account username of a user. */
    usernames: string[];
    /** The Facebook ID of a user. */
    facebook_ids: string[];
}
/** Fetch a batch of zero or more users from the server. */
export interface UpdateUsersRequest {
    /** The account username of a user. */
    display_name: string;
    /** The avarar_url of a user. */
    avatar_url: string;
}
/** A group in the server. */
export interface Group {
    /** The id of a group. */
    id: string;
    /** The id of the user who created the group. */
    creator_id: string;
    /** The unique name of the group. */
    name: string;
    /** A description for the group. */
    description: string;
    /** The language expected to be a tag which follows the BCP-47 spec. */
    lang_tag: string;
    /** Additional information stored as a JSON object. */
    metadata: string;
    /** A URL for an avatar image. */
    avatar_url: string;
    /** Anyone can join open groups, otherwise only admins can accept members. */
    open: boolean | undefined;
    /** The current count of all members in the group. */
    edge_count: number;
    /** The maximum number of members allowed. */
    max_count: number;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was last updated. */
    update_time: Date | undefined;
}
/** One or more groups returned from a listing operation. */
export interface GroupList {
    /** One or more groups. */
    groups: Group[];
    /** A cursor used to get the next page. */
    cursor: string;
}
/** A list of users belonging to a group, along with their role. */
export interface GroupUserList {
    /** User-role pairs for a group. */
    group_users: GroupUserList_GroupUser[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
}
/** A single user-role pair. */
export interface GroupUserList_GroupUser {
    /** User. */
    user: User | undefined;
    /** Their relationship to the group. */
    state: number | undefined;
}
/** The group role status. */
export declare enum GroupUserList_GroupUser_State {
    /** SUPERADMIN - The user is a superadmin with full control of the group. */
    SUPERADMIN = 0,
    /** ADMIN - The user is an admin with additional privileges. */
    ADMIN = 1,
    /** MEMBER - The user is a regular member. */
    MEMBER = 2,
    /** JOIN_REQUEST - The user has requested to join the group */
    JOIN_REQUEST = 3,
    UNRECOGNIZED = -1
}
export declare function groupUserList_GroupUser_StateFromJSON(object: any): GroupUserList_GroupUser_State;
export declare function groupUserList_GroupUser_StateToJSON(object: GroupUserList_GroupUser_State): string;
/** A list of users belonging to a channel, along with their role. */
export interface ChannelUserList {
    /** User-role pairs for a channel. */
    channel_users: ChannelUserList_ChannelUser[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
    /** channel id */
    channel_id: string;
}
/** A single user-role pair. */
export interface ChannelUserList_ChannelUser {
    /** User. */
    user: User | undefined;
    /** Their relationship to the role. */
    role_id: string | undefined;
}
/** A list of users belonging to a clan, along with their role. */
export interface ClanUserList {
    /** User-role pairs for a clan. */
    clan_users: ClanUserList_ClanUser[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
    /** clan id */
    clan_id: string;
}
/** A single user-role pair. */
export interface ClanUserList_ClanUser {
    /** User. */
    user: User | undefined;
    /** Their relationship to the role. */
    role_id: string | undefined;
}
/** Import Facebook friends into the current user's account. */
export interface ImportFacebookFriendsRequest {
    /** The Facebook account details. */
    account: AccountFacebook | undefined;
    /** Reset the current user's friends list. */
    reset: boolean | undefined;
}
/** Import Facebook friends into the current user's account. */
export interface ImportSteamFriendsRequest {
    /** The Facebook account details. */
    account: AccountSteam | undefined;
    /** Reset the current user's friends list. */
    reset: boolean | undefined;
}
/** Immediately join an open group, or request to join a closed one. */
export interface JoinGroupRequest {
    /** The group ID to join. The group must already exist. */
    group_id: string;
}
/** The request to join a tournament. */
export interface JoinTournamentRequest {
    /** The ID of the tournament to join. The tournament must already exist. */
    tournament_id: string;
}
/** Kick a set of users from a group. */
export interface KickGroupUsersRequest {
    /** The group ID to kick from. */
    group_id: string;
    /** The users to kick. */
    user_ids: string[];
}
/** Leave a group. */
export interface LeaveGroupRequest {
    /** The group ID to leave. */
    group_id: string;
}
/** Link Facebook to the current user's account. */
export interface LinkFacebookRequest {
    /** The Facebook account details. */
    account: AccountFacebook | undefined;
    /** Import Facebook friends for the user. */
    sync: boolean | undefined;
}
/** Link Steam to the current user's account. */
export interface LinkSteamRequest {
    /** The Facebook account details. */
    account: AccountSteam | undefined;
    /** Import Steam friends for the user. */
    sync: boolean | undefined;
}
/** List a channel's message history. */
export interface ListChannelMessagesRequest {
    /** The channel ID to list from. */
    channel_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** True if listing should be older messages to newer, false if reverse. */
    forward: boolean | undefined;
    /** A pagination cursor, if any. */
    cursor: string;
}
/** List friends for a user. */
export interface ListFriendsRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The friend state to list. */
    state: number | undefined;
    /** An optional next page cursor. */
    cursor: string;
}
/** List groups based on given filters. */
export interface ListGroupsRequest {
    /** List groups that contain this value in their names. */
    name: string;
    /** Optional pagination cursor. */
    cursor: string;
    /** Max number of groups to return. Between 1 and 100. */
    limit: number | undefined;
    /** Language tag filter */
    lang_tag: string;
    /** Number of group members */
    members: number | undefined;
    /** Optional Open/Closed filter. */
    open: boolean | undefined;
}
/** List all users that are part of a group. */
export interface ListGroupUsersRequest {
    /** The group ID to list from. */
    group_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The group user state to list. */
    state: number | undefined;
    /** An optional next page cursor. */
    cursor: string;
}
/** List all users that are part of a channel. */
export interface ListChannelUsersRequest {
    /** The channel ID to list from. */
    channel_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The group user state to list. */
    state: number | undefined;
    /** An optional next page cursor. */
    cursor: string;
}
/** List all users that are part of a clan. */
export interface ListClanUsersRequest {
    /** The clan ID to list from. */
    clan_id: string;
}
/** Get a list of unexpired notifications. */
export interface ListNotificationsRequest {
    /** The number of notifications to get. Between 1 and 100. */
    limit: number | undefined;
    /** A cursor to page through notifications. May be cached by clients to get from point in time forwards. */
    cacheable_cursor: string;
}
/** List publicly readable storage objects in a given collection. */
export interface ListStorageObjectsRequest {
    /** ID of the user. */
    user_id: string;
    /** The collection which stores the object. */
    collection: string;
    /** The number of storage objects to list. Between 1 and 100. */
    limit: number | undefined;
    /** The cursor to page through results from. */
    cursor: string;
}
/** List the groups a user is part of, and their relationship to each. */
export interface ListUserGroupsRequest {
    /** ID of the user. */
    user_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The user group state to list. */
    state: number | undefined;
    /** An optional next page cursor. */
    cursor: string;
}
/** A notification in the server. */
export interface Notification {
    /** ID of the Notification. */
    id: string;
    /** Subject of the notification. */
    subject: string;
    /** Content of the notification in JSON. */
    content: string;
    /** Category code for this notification. */
    code: number;
    /** ID of the sender, if a user. Otherwise 'null'. */
    sender_id: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the notification was created. */
    create_time: Date | undefined;
    /** True if this notification was persisted to the database. */
    persistent: boolean;
}
/** A collection of zero or more notifications. */
export interface NotificationList {
    /** Collection of notifications. */
    notifications: Notification[];
    /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
    cacheable_cursor: string;
}
/** Promote a set of users in a group to the next role up. */
export interface PromoteGroupUsersRequest {
    /** The group ID to promote in. */
    group_id: string;
    /** The users to promote. */
    user_ids: string[];
}
/** Demote a set of users in a group to the next role down. */
export interface DemoteGroupUsersRequest {
    /** The group ID to demote in. */
    group_id: string;
    /** The users to demote. */
    user_ids: string[];
}
/** Storage objects to get. */
export interface ReadStorageObjectId {
    /** The collection which stores the object. */
    collection: string;
    /** The key of the object within the collection. */
    key: string;
    /** The user owner of the object. */
    user_id: string;
}
/** Batch get storage objects. */
export interface ReadStorageObjectsRequest {
    /** Batch of storage objects. */
    object_ids: ReadStorageObjectId[];
}
/** Execute an Lua function on the server. */
export interface Rpc {
    /** The identifier of the function. */
    id: string;
    /** The payload of the function which must be a JSON object. */
    payload: string;
    /** The authentication key used when executed as a non-client HTTP request. */
    http_key: string;
}
/** A user's session used to authenticate messages. */
export interface Session {
    /** True if the corresponding account was just created, false otherwise. */
    created: boolean;
    /** Authentication credentials. */
    token: string;
    /** Refresh token that can be used for session token renewal. */
    refresh_token: string;
}
/** An object within the storage engine. */
export interface StorageObject {
    /** The collection which stores the object. */
    collection: string;
    /** The key of the object within the collection. */
    key: string;
    /** The user owner of the object. */
    user_id: string;
    /** The value of the object. */
    value: string;
    /** The version hash of the object. */
    version: string;
    /** The read access permissions for the object. */
    permission_read: number;
    /** The write access permissions for the object. */
    permission_write: number;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the object was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the object was last updated. */
    update_time: Date | undefined;
}
/** A storage acknowledgement. */
export interface StorageObjectAck {
    /** The collection which stores the object. */
    collection: string;
    /** The key of the object within the collection. */
    key: string;
    /** The version hash of the object. */
    version: string;
    /** The owner of the object. */
    user_id: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the object was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the object was last updated. */
    update_time: Date | undefined;
}
/** Batch of acknowledgements for the storage object write. */
export interface StorageObjectAcks {
    /** Batch of storage write acknowledgements. */
    acks: StorageObjectAck[];
}
/** Batch of storage objects. */
export interface StorageObjects {
    /** The batch of storage objects. */
    objects: StorageObject[];
}
/** List of storage objects. */
export interface StorageObjectList {
    /** The list of storage objects. */
    objects: StorageObject[];
    /** The cursor for the next page of results, if any. */
    cursor: string;
}
/** Update a user's account details. */
export interface UpdateAccountRequest {
    /** The username of the user's account. */
    username: string | undefined;
    /** The display name of the user. */
    display_name: string | undefined;
    /** A URL for an avatar image. */
    avatar_url: string | undefined;
    /** The language expected to be a tag which follows the BCP-47 spec. */
    lang_tag: string | undefined;
    /** The location set by the user. */
    location: string | undefined;
    /** The timezone set by the user. */
    timezone: string | undefined;
}
/** Update fields in a given group. */
export interface UpdateGroupRequest {
    /** The ID of the group to update. */
    group_id: string;
    /** Name. */
    name: string | undefined;
    /** Description string. */
    description: string | undefined;
    /** Lang tag. */
    lang_tag: string | undefined;
    /** Avatar URL. */
    avatar_url: string | undefined;
    /** Open is true if anyone should be allowed to join, or false if joins must be approved by a group admin. */
    open: boolean | undefined;
}
export interface UpdateCategoryDescRequest {
    /** The ID of the group to update. */
    category_id: string;
    category_name: string;
}
/** A user in the server. */
export interface User {
    /** The id of the user's account. */
    id: string;
    /** The username of the user's account. */
    username: string;
    /** The display name of the user. */
    display_name: string;
    /** A URL for an avatar image. */
    avatar_url: string;
    /** The language expected to be a tag which follows the BCP-47 spec. */
    lang_tag: string;
    /** The location set by the user. */
    location: string;
    /** The timezone set by the user. */
    timezone: string;
    /** Additional information stored as a JSON object. */
    metadata: string;
    /** The Facebook id in the user's account. */
    facebook_id: string;
    /** The Google id in the user's account. */
    google_id: string;
    /** The Apple Game Center in of the user's account. */
    gamecenter_id: string;
    /** The Steam id in the user's account. */
    steam_id: string;
    /** Indicates whether the user is currently online. */
    online: boolean;
    /** Number of related edges to this user. */
    edge_count: number;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated. */
    update_time: Date | undefined;
    /** The Apple Sign In ID in the user's account. */
    apple_id: string;
}
/** A list of groups belonging to a user, along with the user's role in each group. */
export interface UserGroupList {
    /** Group-role pairs for a user. */
    user_groups: UserGroupList_UserGroup[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
}
/** A single group-role pair. */
export interface UserGroupList_UserGroup {
    /** Group. */
    group: Group | undefined;
    /** The user's relationship to the group. */
    state: number | undefined;
}
/** The group role status. */
export declare enum UserGroupList_UserGroup_State {
    /** SUPERADMIN - The user is a superadmin with full control of the group. */
    SUPERADMIN = 0,
    /** ADMIN - The user is an admin with additional privileges. */
    ADMIN = 1,
    /** MEMBER - The user is a regular member. */
    MEMBER = 2,
    /** JOIN_REQUEST - The user has requested to join the group */
    JOIN_REQUEST = 3,
    UNRECOGNIZED = -1
}
export declare function userGroupList_UserGroup_StateFromJSON(object: any): UserGroupList_UserGroup_State;
export declare function userGroupList_UserGroup_StateToJSON(object: UserGroupList_UserGroup_State): string;
/** A collection of zero or more users. */
export interface Users {
    /** The User objects. */
    users: User[];
}
/** The object to store. */
export interface WriteStorageObject {
    /** The collection to store the object. */
    collection: string;
    /** The key for the object within the collection. */
    key: string;
    /** The value of the object. */
    value: string;
    /** The version hash of the object to check. Possible values are: ["", "*", "#hash#"]. */
    version: string;
    /** The read access permissions for the object. */
    permission_read: number | undefined;
    /** The write access permissions for the object. */
    permission_write: number | undefined;
}
/** Write objects to the storage engine. */
export interface WriteStorageObjectsRequest {
    /** The objects to store on the server. */
    objects: WriteStorageObject[];
}
/** A request to submit a score to a tournament. */
export interface WriteTournamentRecordRequest {
    /** The tournament ID to write the record for. */
    tournament_id: string;
    /** Record input. */
    record: WriteTournamentRecordRequest_TournamentRecordWrite | undefined;
}
/** Record values to write. */
export interface WriteTournamentRecordRequest_TournamentRecordWrite {
    /** The score value to submit. */
    score: number;
    /** An optional secondary value. */
    subscore: number;
    /** A JSON object of additional properties (optional). */
    metadata: string;
    /** Operator override. */
    operator: Operator;
}
/** Clan profile information */
export interface ClanDescProfile {
    /** Clan id */
    clan_id: string;
    /** Clan creator */
    creator_id: string;
    /** Clan nick name */
    nick_name: string;
    /** Clan profile banner */
    profile_banner: string;
    /** Clan profile theme */
    profile_theme: string;
    /** Clan profile avatar */
    avatar_url: string;
}
/** Update Clan profile information */
export interface UpdateClanDescProfileRequest {
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
/** Clan profile information */
export interface ClanDescProfileRequest {
    /** Clan id */
    clan_id: string;
}
/** Clan information */
export interface ClanDesc {
    /** Clan creator */
    creator_id: string;
    /** Clan name */
    clan_name: string;
    /** Clan logo */
    logo: string;
    /** Clan banner */
    banner: string;
    /** Clan id */
    clan_id: string;
    /** Clan status */
    status: number;
}
/** Clan information */
export interface CreateClanDescRequest {
    /** Clan creator */
    creator_id: string;
    /** Clan name */
    clan_name: string;
    /** Clan logo */
    logo: string;
    /** Clan banner */
    banner: string;
}
/** Update Clan information */
export interface UpdateClanDescRequest {
    clan_id: string;
    /** Clan creator */
    creator_id: string;
    /** Clan name */
    clan_name: string;
    /** Clan logo */
    logo: string;
    /** Clan banner */
    banner: string;
    /** Clan status */
    status: number;
}
/** Delete a clan the user has access to. */
export interface DeleteClanDescRequest {
    /** The id of a group. */
    clan_desc_id: string;
}
/** List (and optionally filter) channels. */
export interface ListClanDescRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The friend state to list. */
    state: number | undefined;
    /** Cursor to start from */
    cursor: string;
}
/** A list of clan */
export interface ClanDescList {
    /** A list of channel. */
    clandesc: ClanDesc[];
}
/** Add link invite users to. */
export interface LinkInviteUserRequest {
    /** id clan to add link to . */
    clan_id: string;
    /** id channel to add link to. */
    channel_id: string;
    /** expiry time */
    expiry_time: number;
}
/** Add link invite users to. */
export interface InviteUserRequest {
    /** id clan to add link to . */
    invite_id: string;
}
/** Add link invite users to. */
export interface InviteUserRes {
    /** id clan to add link to . */
    clan_id: string;
    /** id channel to add link to. */
    channel_id: string;
    /** clan name */
    clan_name: string;
    /** channel name */
    channel_name: string;
}
/** Add link invite users to. */
export interface JoinClanChannelRequest {
    /** id clan to add link to . */
    clan_id: string;
    /** id channel to add link to. */
    channel_id: string;
}
/** Add link invite users to. */
export interface LinkInviteUser {
    /** id clan */
    clan_id: string;
    /** The user to add. */
    creator_id: string;
    /** is clan invite */
    channel_id: string;
    /** link invite */
    invite_link: string;
    /** create time */
    create_time: Date | undefined;
    /** expiry time */
    expiry_time: Date | undefined;
    id: string;
}
/** Get clan profile. */
export interface ClanProfile {
    /** id user to find user */
    user_id: string;
    /** name user */
    nick_name: string;
    /** id avartar */
    avartar: string;
    /** id clan */
    clan_id: string;
}
/** information user by clan requset */
export interface ClanProfileRequest {
    /** id clanc */
    clan_id: string;
}
/** update nickname user by clan requset */
export interface UpdateClanProfileRequest {
    /** id clanc */
    clan_id: string;
    /** nick_name new */
    nick_name: string;
    /** avatar */
    avatar: string;
}
/** Category to group the channel */
export interface CategoryDesc {
    /** Category creator */
    creator_id: string;
    /** the Clan that category belong to */
    clan_id: string;
    /** Category name */
    category_name: string;
    category_id: string;
}
export interface CreateCategoryDescRequest {
    category_name: string;
    clan_id: string;
}
export interface DeleteCategoryDescRequest {
    creator_id: string;
}
/** A list of clan */
export interface CategoryDescList {
    /** A list of channel. */
    categorydesc: CategoryDesc[];
}
/** List (and optionally filter) channels. */
export interface ListCategoryDescsRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The friend state to list. */
    state: number | undefined;
    /** Cursor to start from */
    cursor: string;
}
/** Channel description record */
export interface ChannelDescription {
    /** The clan of this channel */
    clan_id: string;
    /** The parrent channel this message belongs to. */
    parrent_id: string;
    /** The channel this message belongs to. */
    channel_id: string;
    /** The category of channel */
    category_id: string;
    /** The category name */
    category_name: string;
    /** The channel type. */
    type: number | undefined;
    /** creator ID. */
    creator_id: string;
    /** The channel lable */
    channel_lable: string;
    /** The channel private */
    channel_private: number;
    /** The channel avatar */
    channel_avatar: string[];
    /** The user id */
    user_id: string[];
}
/** A list of channel description, usually a result of a list operation. */
export interface ChannelDescList {
    /** A list of channel. */
    channeldesc: ChannelDescription[];
    /** The cursor to send when retrieving the next page, if any. */
    next_cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
    /** Cacheable cursor to list newer channel description. Durable and designed to be stored, unlike next/prev cursors. */
    cacheable_cursor: string;
}
/** List (and optionally filter) channels. */
export interface ListChannelDescsRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The channel state to list. */
    state: number | undefined;
    /** Cursor to start from */
    cursor: string;
    /** The clan of this channel */
    clan_id: string;
    /** channel type */
    channel_type: number;
}
/** Create a channel within clan. */
export interface CreateChannelDescRequest {
    /** The clan of this channel */
    clan_id: string;
    /** The parrent channel this message belongs to. */
    parrent_id: string;
    /** The channel this message belongs to. */
    channel_id: string;
    /** The category of channel */
    category_id: string;
    /** The channel type. */
    type: number | undefined;
    /** Group ID. */
    group_id: string;
    /** The channel lable */
    channel_lable: string;
    /** The channel private */
    channel_private: number;
    /** The users to add. */
    user_ids: string[];
}
/** Delete a channel the user has access to. */
export interface DeleteChannelDescRequest {
    /** The id of a channel. */
    channel_id: string;
}
/** Update fields in a given channel. */
export interface UpdateChannelDescRequest {
    /** The ID of the channel to update. */
    channel_id: string;
    /** The channel lable */
    channel_lable: string | undefined;
    /** The category of channel */
    category_id: string | undefined;
}
/** Add users to a channel. */
export interface AddChannelUsersRequest {
    /** The channel to add users to. */
    channel_id: string;
    /** The users to add. */
    user_ids: string[];
}
/** Kick a set of users from a channel. */
export interface RemoveChannelUsersRequest {
    /** The channel ID to kick from. */
    channel_id: string;
    /** The users to kick. */
    user_ids: string[];
}
/** Leave a channel. */
export interface LeaveChannelRequest {
    /** The channel ID to leave. */
    channel_id: string;
}
/** Role record */
export interface Role {
    /** Role id */
    id: string;
    title: string;
    color: string;
    role_icon: string;
    slug: string;
    description: string;
    creator_id: string;
    clan_id: string;
    active: number;
    display_online: number;
    allow_mention: number;
    role_user_list: RoleUserList | undefined;
    permission_list: PermissionList | undefined;
}
/** Permission record */
export interface Permission {
    /** Permission id */
    id: string;
    title: string;
    slug: string;
    description: string;
    active: number;
}
/** A list of role description, usually a result of a list operation. */
export interface RoleList {
    /** A list of role. */
    roles: Role[];
    /** The cursor to send when retrieving the next page, if any. */
    next_cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
    /** Cacheable cursor to list newer role description. Durable and designed to be stored, unlike next/prev cursors. */
    cacheable_cursor: string;
}
/** A list of permission description, usually a result of a list operation. */
export interface PermissionList {
    /** A list of permission. */
    permissions: Permission[];
}
/** List (and optionally filter) permissions. */
export interface ListPermissionsRequest {
    role_id: string | undefined;
}
/** List (and optionally filter) role-users. */
export interface ListRoleUsersRequest {
    role_id: string | undefined;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** An optional next page cursor. */
    cursor: string;
}
/** List Permission Of User In The Clan. */
export interface ListPermissionOfUsersRequest {
    /** clan_id. */
    clan_id: string;
}
export interface RoleUserList {
    /** role_users pairs for a clan. */
    role_users: RoleUserList_RoleUser[];
    /** Cursor for the next page of results, if any. */
    cursor: string;
}
/** A single user-role pair. */
export interface RoleUserList_RoleUser {
    /** The id of the user's account. */
    id: string;
    /** The username of the user's account. */
    username: string;
    /** The display name of the user. */
    display_name: string;
    /** A URL for an avatar image. */
    avatar_url: string;
    /** The language expected to be a tag which follows the BCP-47 spec. */
    lang_tag: string;
    /** The location set by the user. */
    location: string;
    /** The timezone set by the user. */
    online: boolean;
}
/** List (and optionally filter) roles. */
export interface ListRolesRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The role state to list. */
    state: number | undefined;
    /** Cursor to start from */
    cursor: string;
    /** The clan of this role */
    clan_id: string;
}
/** Create a role within clan. */
export interface CreateRoleRequest {
    title: string;
    color: string;
    role_icon: string;
    description: string;
    clan_id: string;
    display_online: number;
    allow_mention: number;
    /** The users to add. */
    add_user_ids: string[];
    /** The permissions to add. */
    active_permission_ids: string[];
}
/** Delete a role the user has access to. */
export interface DeleteRoleRequest {
    /** The id of a role. */
    role_id: string;
}
/** Update fields in a given role. */
export interface UpdateRoleRequest {
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
export interface UploadAttachmentRequest {
    /** The name of file that need to upload */
    filename: string;
    /** The type of file that need to upload */
    filetype: string;
    /** The size of file that need to upload */
    size: number;
    /** width */
    width: number;
    /** Height */
    height: number;
}
export interface ListMessageMentionRequest {
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** True if listing should be older messages to newer, false if reverse. */
    forward: boolean | undefined;
    /** A pagination cursor, if any. */
    cursor: string;
}
export interface UploadAttachment {
    /** The name of file that need to upload */
    filename: string;
    /** The url */
    url: string;
}
export declare const Account: {
    encode(message: Account, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Account;
    fromJSON(object: any): Account;
    toJSON(message: Account): unknown;
    create<I extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        wallet?: string | undefined;
        email?: string | undefined;
        devices?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] | undefined;
        custom_id?: string | undefined;
        verify_time?: Date | undefined;
        disable_time?: Date | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
        wallet?: string | undefined;
        email?: string | undefined;
        devices?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] & ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_1 in Exclude<keyof I["devices"][number]["vars"], string | number>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["devices"][number], keyof AccountDevice>]: never; })[] & { [K_3 in Exclude<keyof I["devices"], keyof {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        custom_id?: string | undefined;
        verify_time?: Date | undefined;
        disable_time?: Date | undefined;
    } & { [K_4 in Exclude<keyof I, keyof Account>]: never; }>(base?: I | undefined): Account;
    fromPartial<I_1 extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        wallet?: string | undefined;
        email?: string | undefined;
        devices?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] | undefined;
        custom_id?: string | undefined;
        verify_time?: Date | undefined;
        disable_time?: Date | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        wallet?: string | undefined;
        email?: string | undefined;
        devices?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] & ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_6 in Exclude<keyof I_1["devices"][number]["vars"], string | number>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["devices"][number], keyof AccountDevice>]: never; })[] & { [K_8 in Exclude<keyof I_1["devices"], keyof {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        custom_id?: string | undefined;
        verify_time?: Date | undefined;
        disable_time?: Date | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof Account>]: never; }>(object: I_1): Account;
};
export declare const AccountRefresh: {
    encode(message: AccountRefresh, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountRefresh;
    fromJSON(object: any): AccountRefresh;
    toJSON(message: AccountRefresh): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountRefresh>]: never; }>(base?: I | undefined): AccountRefresh;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountRefresh>]: never; }>(object: I_1): AccountRefresh;
};
export declare const AccountRefresh_VarsEntry: {
    encode(message: AccountRefresh_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountRefresh_VarsEntry;
    fromJSON(object: any): AccountRefresh_VarsEntry;
    toJSON(message: AccountRefresh_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountRefresh_VarsEntry>]: never; }>(base?: I | undefined): AccountRefresh_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountRefresh_VarsEntry>]: never; }>(object: I_1): AccountRefresh_VarsEntry;
};
export declare const AccountApple: {
    encode(message: AccountApple, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountApple;
    fromJSON(object: any): AccountApple;
    toJSON(message: AccountApple): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountApple>]: never; }>(base?: I | undefined): AccountApple;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountApple>]: never; }>(object: I_1): AccountApple;
};
export declare const AccountApple_VarsEntry: {
    encode(message: AccountApple_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountApple_VarsEntry;
    fromJSON(object: any): AccountApple_VarsEntry;
    toJSON(message: AccountApple_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountApple_VarsEntry>]: never; }>(base?: I | undefined): AccountApple_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountApple_VarsEntry>]: never; }>(object: I_1): AccountApple_VarsEntry;
};
export declare const AccountCustom: {
    encode(message: AccountCustom, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountCustom;
    fromJSON(object: any): AccountCustom;
    toJSON(message: AccountCustom): unknown;
    create<I extends {
        id?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountCustom>]: never; }>(base?: I | undefined): AccountCustom;
    fromPartial<I_1 extends {
        id?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountCustom>]: never; }>(object: I_1): AccountCustom;
};
export declare const AccountCustom_VarsEntry: {
    encode(message: AccountCustom_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountCustom_VarsEntry;
    fromJSON(object: any): AccountCustom_VarsEntry;
    toJSON(message: AccountCustom_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountCustom_VarsEntry>]: never; }>(base?: I | undefined): AccountCustom_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountCustom_VarsEntry>]: never; }>(object: I_1): AccountCustom_VarsEntry;
};
export declare const AccountDevice: {
    encode(message: AccountDevice, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountDevice;
    fromJSON(object: any): AccountDevice;
    toJSON(message: AccountDevice): unknown;
    create<I extends {
        id?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountDevice>]: never; }>(base?: I | undefined): AccountDevice;
    fromPartial<I_1 extends {
        id?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountDevice>]: never; }>(object: I_1): AccountDevice;
};
export declare const AccountDevice_VarsEntry: {
    encode(message: AccountDevice_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountDevice_VarsEntry;
    fromJSON(object: any): AccountDevice_VarsEntry;
    toJSON(message: AccountDevice_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountDevice_VarsEntry>]: never; }>(base?: I | undefined): AccountDevice_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountDevice_VarsEntry>]: never; }>(object: I_1): AccountDevice_VarsEntry;
};
export declare const AccountEmail: {
    encode(message: AccountEmail, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail;
    fromJSON(object: any): AccountEmail;
    toJSON(message: AccountEmail): unknown;
    create<I extends {
        email?: string | undefined;
        password?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        email?: string | undefined;
        password?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountEmail>]: never; }>(base?: I | undefined): AccountEmail;
    fromPartial<I_1 extends {
        email?: string | undefined;
        password?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        email?: string | undefined;
        password?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountEmail>]: never; }>(object: I_1): AccountEmail;
};
export declare const AccountEmail_VarsEntry: {
    encode(message: AccountEmail_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail_VarsEntry;
    fromJSON(object: any): AccountEmail_VarsEntry;
    toJSON(message: AccountEmail_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountEmail_VarsEntry>]: never; }>(base?: I | undefined): AccountEmail_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountEmail_VarsEntry>]: never; }>(object: I_1): AccountEmail_VarsEntry;
};
export declare const AccountFacebook: {
    encode(message: AccountFacebook, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebook;
    fromJSON(object: any): AccountFacebook;
    toJSON(message: AccountFacebook): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountFacebook>]: never; }>(base?: I | undefined): AccountFacebook;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountFacebook>]: never; }>(object: I_1): AccountFacebook;
};
export declare const AccountFacebook_VarsEntry: {
    encode(message: AccountFacebook_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebook_VarsEntry;
    fromJSON(object: any): AccountFacebook_VarsEntry;
    toJSON(message: AccountFacebook_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountFacebook_VarsEntry>]: never; }>(base?: I | undefined): AccountFacebook_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountFacebook_VarsEntry>]: never; }>(object: I_1): AccountFacebook_VarsEntry;
};
export declare const AccountFacebookInstantGame: {
    encode(message: AccountFacebookInstantGame, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebookInstantGame;
    fromJSON(object: any): AccountFacebookInstantGame;
    toJSON(message: AccountFacebookInstantGame): unknown;
    create<I extends {
        signed_player_info?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        signed_player_info?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountFacebookInstantGame>]: never; }>(base?: I | undefined): AccountFacebookInstantGame;
    fromPartial<I_1 extends {
        signed_player_info?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        signed_player_info?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountFacebookInstantGame>]: never; }>(object: I_1): AccountFacebookInstantGame;
};
export declare const AccountFacebookInstantGame_VarsEntry: {
    encode(message: AccountFacebookInstantGame_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebookInstantGame_VarsEntry;
    fromJSON(object: any): AccountFacebookInstantGame_VarsEntry;
    toJSON(message: AccountFacebookInstantGame_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountFacebookInstantGame_VarsEntry>]: never; }>(base?: I | undefined): AccountFacebookInstantGame_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountFacebookInstantGame_VarsEntry>]: never; }>(object: I_1): AccountFacebookInstantGame_VarsEntry;
};
export declare const AccountGameCenter: {
    encode(message: AccountGameCenter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountGameCenter;
    fromJSON(object: any): AccountGameCenter;
    toJSON(message: AccountGameCenter): unknown;
    create<I extends {
        player_id?: string | undefined;
        bundle_id?: string | undefined;
        timestamp_seconds?: number | undefined;
        salt?: string | undefined;
        signature?: string | undefined;
        public_key_url?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        player_id?: string | undefined;
        bundle_id?: string | undefined;
        timestamp_seconds?: number | undefined;
        salt?: string | undefined;
        signature?: string | undefined;
        public_key_url?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountGameCenter>]: never; }>(base?: I | undefined): AccountGameCenter;
    fromPartial<I_1 extends {
        player_id?: string | undefined;
        bundle_id?: string | undefined;
        timestamp_seconds?: number | undefined;
        salt?: string | undefined;
        signature?: string | undefined;
        public_key_url?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        player_id?: string | undefined;
        bundle_id?: string | undefined;
        timestamp_seconds?: number | undefined;
        salt?: string | undefined;
        signature?: string | undefined;
        public_key_url?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountGameCenter>]: never; }>(object: I_1): AccountGameCenter;
};
export declare const AccountGameCenter_VarsEntry: {
    encode(message: AccountGameCenter_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountGameCenter_VarsEntry;
    fromJSON(object: any): AccountGameCenter_VarsEntry;
    toJSON(message: AccountGameCenter_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountGameCenter_VarsEntry>]: never; }>(base?: I | undefined): AccountGameCenter_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountGameCenter_VarsEntry>]: never; }>(object: I_1): AccountGameCenter_VarsEntry;
};
export declare const AccountGoogle: {
    encode(message: AccountGoogle, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountGoogle;
    fromJSON(object: any): AccountGoogle;
    toJSON(message: AccountGoogle): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountGoogle>]: never; }>(base?: I | undefined): AccountGoogle;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountGoogle>]: never; }>(object: I_1): AccountGoogle;
};
export declare const AccountGoogle_VarsEntry: {
    encode(message: AccountGoogle_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountGoogle_VarsEntry;
    fromJSON(object: any): AccountGoogle_VarsEntry;
    toJSON(message: AccountGoogle_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountGoogle_VarsEntry>]: never; }>(base?: I | undefined): AccountGoogle_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountGoogle_VarsEntry>]: never; }>(object: I_1): AccountGoogle_VarsEntry;
};
export declare const AccountSteam: {
    encode(message: AccountSteam, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountSteam;
    fromJSON(object: any): AccountSteam;
    toJSON(message: AccountSteam): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AccountSteam>]: never; }>(base?: I | undefined): AccountSteam;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AccountSteam>]: never; }>(object: I_1): AccountSteam;
};
export declare const AccountSteam_VarsEntry: {
    encode(message: AccountSteam_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountSteam_VarsEntry;
    fromJSON(object: any): AccountSteam_VarsEntry;
    toJSON(message: AccountSteam_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof AccountSteam_VarsEntry>]: never; }>(base?: I | undefined): AccountSteam_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof AccountSteam_VarsEntry>]: never; }>(object: I_1): AccountSteam_VarsEntry;
};
export declare const AddFriendsRequest: {
    encode(message: AddFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddFriendsRequest;
    fromJSON(object: any): AddFriendsRequest;
    toJSON(message: AddFriendsRequest): unknown;
    create<I extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K in Exclude<keyof I["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_1 in Exclude<keyof I["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AddFriendsRequest>]: never; }>(base?: I | undefined): AddFriendsRequest;
    fromPartial<I_1 extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AddFriendsRequest>]: never; }>(object: I_1): AddFriendsRequest;
};
export declare const AddGroupUsersRequest: {
    encode(message: AddGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddGroupUsersRequest;
    fromJSON(object: any): AddGroupUsersRequest;
    toJSON(message: AddGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AddGroupUsersRequest>]: never; }>(base?: I | undefined): AddGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AddGroupUsersRequest>]: never; }>(object: I_1): AddGroupUsersRequest;
};
export declare const SessionRefreshRequest: {
    encode(message: SessionRefreshRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SessionRefreshRequest;
    fromJSON(object: any): SessionRefreshRequest;
    toJSON(message: SessionRefreshRequest): unknown;
    create<I extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["vars"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SessionRefreshRequest>]: never; }>(base?: I | undefined): SessionRefreshRequest;
    fromPartial<I_1 extends {
        token?: string | undefined;
        vars?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        token?: string | undefined;
        vars?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["vars"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof SessionRefreshRequest>]: never; }>(object: I_1): SessionRefreshRequest;
};
export declare const SessionRefreshRequest_VarsEntry: {
    encode(message: SessionRefreshRequest_VarsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SessionRefreshRequest_VarsEntry;
    fromJSON(object: any): SessionRefreshRequest_VarsEntry;
    toJSON(message: SessionRefreshRequest_VarsEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SessionRefreshRequest_VarsEntry>]: never; }>(base?: I | undefined): SessionRefreshRequest_VarsEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SessionRefreshRequest_VarsEntry>]: never; }>(object: I_1): SessionRefreshRequest_VarsEntry;
};
export declare const SessionLogoutRequest: {
    encode(message: SessionLogoutRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SessionLogoutRequest;
    fromJSON(object: any): SessionLogoutRequest;
    toJSON(message: SessionLogoutRequest): unknown;
    create<I extends {
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & {
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SessionLogoutRequest>]: never; }>(base?: I | undefined): SessionLogoutRequest;
    fromPartial<I_1 extends {
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & {
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SessionLogoutRequest>]: never; }>(object: I_1): SessionLogoutRequest;
};
export declare const AuthenticateAppleRequest: {
    encode(message: AuthenticateAppleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateAppleRequest;
    fromJSON(object: any): AuthenticateAppleRequest;
    toJSON(message: AuthenticateAppleRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountApple>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateAppleRequest>]: never; }>(base?: I | undefined): AuthenticateAppleRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountApple>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateAppleRequest>]: never; }>(object: I_1): AuthenticateAppleRequest;
};
export declare const AuthenticateCustomRequest: {
    encode(message: AuthenticateCustomRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateCustomRequest;
    fromJSON(object: any): AuthenticateCustomRequest;
    toJSON(message: AuthenticateCustomRequest): unknown;
    create<I extends {
        account?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountCustom>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateCustomRequest>]: never; }>(base?: I | undefined): AuthenticateCustomRequest;
    fromPartial<I_1 extends {
        account?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountCustom>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateCustomRequest>]: never; }>(object: I_1): AuthenticateCustomRequest;
};
export declare const AuthenticateDeviceRequest: {
    encode(message: AuthenticateDeviceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateDeviceRequest;
    fromJSON(object: any): AuthenticateDeviceRequest;
    toJSON(message: AuthenticateDeviceRequest): unknown;
    create<I extends {
        account?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountDevice>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateDeviceRequest>]: never; }>(base?: I | undefined): AuthenticateDeviceRequest;
    fromPartial<I_1 extends {
        account?: {
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            id?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountDevice>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateDeviceRequest>]: never; }>(object: I_1): AuthenticateDeviceRequest;
};
export declare const AuthenticateEmailRequest: {
    encode(message: AuthenticateEmailRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateEmailRequest;
    fromJSON(object: any): AuthenticateEmailRequest;
    toJSON(message: AuthenticateEmailRequest): unknown;
    create<I extends {
        account?: {
            email?: string | undefined;
            password?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            email?: string | undefined;
            password?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            email?: string | undefined;
            password?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountEmail>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateEmailRequest>]: never; }>(base?: I | undefined): AuthenticateEmailRequest;
    fromPartial<I_1 extends {
        account?: {
            email?: string | undefined;
            password?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            email?: string | undefined;
            password?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            email?: string | undefined;
            password?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountEmail>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateEmailRequest>]: never; }>(object: I_1): AuthenticateEmailRequest;
};
export declare const AuthenticateFacebookRequest: {
    encode(message: AuthenticateFacebookRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateFacebookRequest;
    fromJSON(object: any): AuthenticateFacebookRequest;
    toJSON(message: AuthenticateFacebookRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountFacebook>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateFacebookRequest>]: never; }>(base?: I | undefined): AuthenticateFacebookRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountFacebook>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateFacebookRequest>]: never; }>(object: I_1): AuthenticateFacebookRequest;
};
export declare const AuthenticateFacebookInstantGameRequest: {
    encode(message: AuthenticateFacebookInstantGameRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateFacebookInstantGameRequest;
    fromJSON(object: any): AuthenticateFacebookInstantGameRequest;
    toJSON(message: AuthenticateFacebookInstantGameRequest): unknown;
    create<I extends {
        account?: {
            signed_player_info?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            signed_player_info?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            signed_player_info?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountFacebookInstantGame>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateFacebookInstantGameRequest>]: never; }>(base?: I | undefined): AuthenticateFacebookInstantGameRequest;
    fromPartial<I_1 extends {
        account?: {
            signed_player_info?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            signed_player_info?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            signed_player_info?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountFacebookInstantGame>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateFacebookInstantGameRequest>]: never; }>(object: I_1): AuthenticateFacebookInstantGameRequest;
};
export declare const AuthenticateGameCenterRequest: {
    encode(message: AuthenticateGameCenterRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateGameCenterRequest;
    fromJSON(object: any): AuthenticateGameCenterRequest;
    toJSON(message: AuthenticateGameCenterRequest): unknown;
    create<I extends {
        account?: {
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountGameCenter>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateGameCenterRequest>]: never; }>(base?: I | undefined): AuthenticateGameCenterRequest;
    fromPartial<I_1 extends {
        account?: {
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            player_id?: string | undefined;
            bundle_id?: string | undefined;
            timestamp_seconds?: number | undefined;
            salt?: string | undefined;
            signature?: string | undefined;
            public_key_url?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountGameCenter>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateGameCenterRequest>]: never; }>(object: I_1): AuthenticateGameCenterRequest;
};
export declare const AuthenticateGoogleRequest: {
    encode(message: AuthenticateGoogleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateGoogleRequest;
    fromJSON(object: any): AuthenticateGoogleRequest;
    toJSON(message: AuthenticateGoogleRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountGoogle>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateGoogleRequest>]: never; }>(base?: I | undefined): AuthenticateGoogleRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountGoogle>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateGoogleRequest>]: never; }>(object: I_1): AuthenticateGoogleRequest;
};
export declare const AuthenticateSteamRequest: {
    encode(message: AuthenticateSteamRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateSteamRequest;
    fromJSON(object: any): AuthenticateSteamRequest;
    toJSON(message: AuthenticateSteamRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountSteam>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AuthenticateSteamRequest>]: never; }>(base?: I | undefined): AuthenticateSteamRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountSteam>]: never; }) | undefined;
        create?: boolean | undefined;
        username?: string | undefined;
        sync?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AuthenticateSteamRequest>]: never; }>(object: I_1): AuthenticateSteamRequest;
};
export declare const BanGroupUsersRequest: {
    encode(message: BanGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BanGroupUsersRequest;
    fromJSON(object: any): BanGroupUsersRequest;
    toJSON(message: BanGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof BanGroupUsersRequest>]: never; }>(base?: I | undefined): BanGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof BanGroupUsersRequest>]: never; }>(object: I_1): BanGroupUsersRequest;
};
export declare const BlockFriendsRequest: {
    encode(message: BlockFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BlockFriendsRequest;
    fromJSON(object: any): BlockFriendsRequest;
    toJSON(message: BlockFriendsRequest): unknown;
    create<I extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K in Exclude<keyof I["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_1 in Exclude<keyof I["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof BlockFriendsRequest>]: never; }>(base?: I | undefined): BlockFriendsRequest;
    fromPartial<I_1 extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof BlockFriendsRequest>]: never; }>(object: I_1): BlockFriendsRequest;
};
export declare const ChannelMessage: {
    encode(message: ChannelMessage, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessage;
    fromJSON(object: any): ChannelMessage;
    toJSON(message: ChannelMessage): unknown;
    create<I extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        channel_name?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        reactions?: string | undefined;
        mentions?: string | undefined;
        attachments?: string | undefined;
        references?: string | undefined;
        referenced_message?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        channel_name?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        reactions?: string | undefined;
        mentions?: string | undefined;
        attachments?: string | undefined;
        references?: string | undefined;
        referenced_message?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelMessage>]: never; }>(base?: I | undefined): ChannelMessage;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        channel_name?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        reactions?: string | undefined;
        mentions?: string | undefined;
        attachments?: string | undefined;
        references?: string | undefined;
        referenced_message?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        avatar?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        channel_name?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        reactions?: string | undefined;
        mentions?: string | undefined;
        attachments?: string | undefined;
        references?: string | undefined;
        referenced_message?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelMessage>]: never; }>(object: I_1): ChannelMessage;
};
export declare const MessageMention: {
    encode(message: MessageMention, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageMention;
    fromJSON(object: any): MessageMention;
    toJSON(message: MessageMention): unknown;
    create<I extends {
        id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
    } & {
        id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof MessageMention>]: never; }>(base?: I | undefined): MessageMention;
    fromPartial<I_1 extends {
        id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
    } & {
        id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageMention>]: never; }>(object: I_1): MessageMention;
};
export declare const MessageReaction: {
    encode(message: MessageReaction, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageReaction;
    fromJSON(object: any): MessageReaction;
    toJSON(message: MessageReaction): unknown;
    create<I extends {
        id?: string | undefined;
        emoji?: string | undefined;
        sender_id?: string | undefined;
        action?: boolean | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        id?: string | undefined;
        emoji?: string | undefined;
        sender_id?: string | undefined;
        action?: boolean | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MessageReaction>]: never; }>(base?: I | undefined): MessageReaction;
    fromPartial<I_1 extends {
        id?: string | undefined;
        emoji?: string | undefined;
        sender_id?: string | undefined;
        action?: boolean | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        id?: string | undefined;
        emoji?: string | undefined;
        sender_id?: string | undefined;
        action?: boolean | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageReaction>]: never; }>(object: I_1): MessageReaction;
};
export declare const MessageAttachment: {
    encode(message: MessageAttachment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachment;
    fromJSON(object: any): MessageAttachment;
    toJSON(message: MessageAttachment): unknown;
    create<I extends {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageAttachment>]: never; }>(base?: I | undefined): MessageAttachment;
    fromPartial<I_1 extends {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageAttachment>]: never; }>(object: I_1): MessageAttachment;
};
export declare const MessageRef: {
    encode(message: MessageRef, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageRef;
    fromJSON(object: any): MessageRef;
    toJSON(message: MessageRef): unknown;
    create<I extends {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        ref_type?: number | undefined;
    } & {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        ref_type?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageRef>]: never; }>(base?: I | undefined): MessageRef;
    fromPartial<I_1 extends {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        ref_type?: number | undefined;
    } & {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        ref_type?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageRef>]: never; }>(object: I_1): MessageRef;
};
export declare const MessageDeleted: {
    encode(message: MessageDeleted, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageDeleted;
    fromJSON(object: any): MessageDeleted;
    toJSON(message: MessageDeleted): unknown;
    create<I extends {
        message_id?: string | undefined;
        deletor?: string | undefined;
    } & {
        message_id?: string | undefined;
        deletor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MessageDeleted>]: never; }>(base?: I | undefined): MessageDeleted;
    fromPartial<I_1 extends {
        message_id?: string | undefined;
        deletor?: string | undefined;
    } & {
        message_id?: string | undefined;
        deletor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageDeleted>]: never; }>(object: I_1): MessageDeleted;
};
export declare const ChannelMessageList: {
    encode(message: ChannelMessageList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageList;
    fromJSON(object: any): ChannelMessageList;
    toJSON(message: ChannelMessageList): unknown;
    create<I extends {
        messages?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[] | undefined;
        last_seen_message_id?: string | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        messages?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[] & ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & { [K in Exclude<keyof I["messages"][number], keyof ChannelMessage>]: never; })[] & { [K_1 in Exclude<keyof I["messages"], keyof {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[]>]: never; }) | undefined;
        last_seen_message_id?: string | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ChannelMessageList>]: never; }>(base?: I | undefined): ChannelMessageList;
    fromPartial<I_1 extends {
        messages?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[] | undefined;
        last_seen_message_id?: string | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        messages?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[] & ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["messages"][number], keyof ChannelMessage>]: never; })[] & { [K_4 in Exclude<keyof I_1["messages"], keyof {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_name?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        }[]>]: never; }) | undefined;
        last_seen_message_id?: string | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ChannelMessageList>]: never; }>(object: I_1): ChannelMessageList;
};
export declare const CreateGroupRequest: {
    encode(message: CreateGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupRequest;
    fromJSON(object: any): CreateGroupRequest;
    toJSON(message: CreateGroupRequest): unknown;
    create<I extends {
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        max_count?: number | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        max_count?: number | undefined;
    } & { [K in Exclude<keyof I, keyof CreateGroupRequest>]: never; }>(base?: I | undefined): CreateGroupRequest;
    fromPartial<I_1 extends {
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        max_count?: number | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        max_count?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CreateGroupRequest>]: never; }>(object: I_1): CreateGroupRequest;
};
export declare const DeleteFriendsRequest: {
    encode(message: DeleteFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFriendsRequest;
    fromJSON(object: any): DeleteFriendsRequest;
    toJSON(message: DeleteFriendsRequest): unknown;
    create<I extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K in Exclude<keyof I["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_1 in Exclude<keyof I["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof DeleteFriendsRequest>]: never; }>(base?: I | undefined): DeleteFriendsRequest;
    fromPartial<I_1 extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof DeleteFriendsRequest>]: never; }>(object: I_1): DeleteFriendsRequest;
};
export declare const DeleteGroupRequest: {
    encode(message: DeleteGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteGroupRequest;
    fromJSON(object: any): DeleteGroupRequest;
    toJSON(message: DeleteGroupRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K in Exclude<keyof I, "group_id">]: never; }>(base?: I | undefined): DeleteGroupRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "group_id">]: never; }>(object: I_1): DeleteGroupRequest;
};
export declare const DeleteNotificationsRequest: {
    encode(message: DeleteNotificationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNotificationsRequest;
    fromJSON(object: any): DeleteNotificationsRequest;
    toJSON(message: DeleteNotificationsRequest): unknown;
    create<I extends {
        ids?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K in Exclude<keyof I["ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "ids">]: never; }>(base?: I | undefined): DeleteNotificationsRequest;
    fromPartial<I_1 extends {
        ids?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "ids">]: never; }>(object: I_1): DeleteNotificationsRequest;
};
export declare const DeleteStorageObjectId: {
    encode(message: DeleteStorageObjectId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteStorageObjectId;
    fromJSON(object: any): DeleteStorageObjectId;
    toJSON(message: DeleteStorageObjectId): unknown;
    create<I extends {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
    } & { [K in Exclude<keyof I, keyof DeleteStorageObjectId>]: never; }>(base?: I | undefined): DeleteStorageObjectId;
    fromPartial<I_1 extends {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof DeleteStorageObjectId>]: never; }>(object: I_1): DeleteStorageObjectId;
};
export declare const DeleteStorageObjectsRequest: {
    encode(message: DeleteStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteStorageObjectsRequest;
    fromJSON(object: any): DeleteStorageObjectsRequest;
    toJSON(message: DeleteStorageObjectsRequest): unknown;
    create<I extends {
        object_ids?: {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[] | undefined;
    } & {
        object_ids?: ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        } & { [K in Exclude<keyof I["object_ids"][number], keyof DeleteStorageObjectId>]: never; })[] & { [K_1 in Exclude<keyof I["object_ids"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "object_ids">]: never; }>(base?: I | undefined): DeleteStorageObjectsRequest;
    fromPartial<I_1 extends {
        object_ids?: {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[] | undefined;
    } & {
        object_ids?: ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["object_ids"][number], keyof DeleteStorageObjectId>]: never; })[] & { [K_4 in Exclude<keyof I_1["object_ids"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "object_ids">]: never; }>(object: I_1): DeleteStorageObjectsRequest;
};
export declare const Event: {
    encode(message: Event, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Event;
    fromJSON(object: any): Event;
    toJSON(message: Event): unknown;
    create<I extends {
        name?: string | undefined;
        properties?: {
            [x: string]: string | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        external?: boolean | undefined;
    } & {
        name?: string | undefined;
        properties?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["properties"], string | number>]: never; }) | undefined;
        timestamp?: Date | undefined;
        external?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Event>]: never; }>(base?: I | undefined): Event;
    fromPartial<I_1 extends {
        name?: string | undefined;
        properties?: {
            [x: string]: string | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        external?: boolean | undefined;
    } & {
        name?: string | undefined;
        properties?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["properties"], string | number>]: never; }) | undefined;
        timestamp?: Date | undefined;
        external?: boolean | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Event>]: never; }>(object: I_1): Event;
};
export declare const Event_PropertiesEntry: {
    encode(message: Event_PropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Event_PropertiesEntry;
    fromJSON(object: any): Event_PropertiesEntry;
    toJSON(message: Event_PropertiesEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Event_PropertiesEntry>]: never; }>(base?: I | undefined): Event_PropertiesEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Event_PropertiesEntry>]: never; }>(object: I_1): Event_PropertiesEntry;
};
export declare const Friend: {
    encode(message: Friend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Friend;
    fromJSON(object: any): Friend;
    toJSON(message: Friend): unknown;
    create<I extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        state?: number | undefined;
        update_time?: Date | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
        state?: number | undefined;
        update_time?: Date | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Friend>]: never; }>(base?: I | undefined): Friend;
    fromPartial<I_1 extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        state?: number | undefined;
        update_time?: Date | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        state?: number | undefined;
        update_time?: Date | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Friend>]: never; }>(object: I_1): Friend;
};
export declare const FriendList: {
    encode(message: FriendList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FriendList;
    fromJSON(object: any): FriendList;
    toJSON(message: FriendList): unknown;
    create<I extends {
        friends?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        friends?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K in Exclude<keyof I["friends"][number]["user"], keyof User>]: never; }) | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        } & { [K_1 in Exclude<keyof I["friends"][number], keyof Friend>]: never; })[] & { [K_2 in Exclude<keyof I["friends"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof FriendList>]: never; }>(base?: I | undefined): FriendList;
    fromPartial<I_1 extends {
        friends?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        friends?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["friends"][number]["user"], keyof User>]: never; }) | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        } & { [K_5 in Exclude<keyof I_1["friends"][number], keyof Friend>]: never; })[] & { [K_6 in Exclude<keyof I_1["friends"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof FriendList>]: never; }>(object: I_1): FriendList;
};
export declare const GetUsersRequest: {
    encode(message: GetUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetUsersRequest;
    fromJSON(object: any): GetUsersRequest;
    toJSON(message: GetUsersRequest): unknown;
    create<I extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
        facebook_ids?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K in Exclude<keyof I["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_1 in Exclude<keyof I["usernames"], keyof string[]>]: never; }) | undefined;
        facebook_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I["facebook_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof GetUsersRequest>]: never; }>(base?: I | undefined): GetUsersRequest;
    fromPartial<I_1 extends {
        ids?: string[] | undefined;
        usernames?: string[] | undefined;
        facebook_ids?: string[] | undefined;
    } & {
        ids?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["usernames"], keyof string[]>]: never; }) | undefined;
        facebook_ids?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["facebook_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof GetUsersRequest>]: never; }>(object: I_1): GetUsersRequest;
};
export declare const UpdateUsersRequest: {
    encode(message: UpdateUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUsersRequest;
    fromJSON(object: any): UpdateUsersRequest;
    toJSON(message: UpdateUsersRequest): unknown;
    create<I extends {
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateUsersRequest>]: never; }>(base?: I | undefined): UpdateUsersRequest;
    fromPartial<I_1 extends {
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateUsersRequest>]: never; }>(object: I_1): UpdateUsersRequest;
};
export declare const Group: {
    encode(message: Group, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Group;
    fromJSON(object: any): Group;
    toJSON(message: Group): unknown;
    create<I extends {
        id?: string | undefined;
        creator_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        metadata?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        edge_count?: number | undefined;
        max_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        id?: string | undefined;
        creator_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        metadata?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        edge_count?: number | undefined;
        max_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Group>]: never; }>(base?: I | undefined): Group;
    fromPartial<I_1 extends {
        id?: string | undefined;
        creator_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        metadata?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        edge_count?: number | undefined;
        max_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        id?: string | undefined;
        creator_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        metadata?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
        edge_count?: number | undefined;
        max_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Group>]: never; }>(object: I_1): Group;
};
export declare const GroupList: {
    encode(message: GroupList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupList;
    fromJSON(object: any): GroupList;
    toJSON(message: GroupList): unknown;
    create<I extends {
        groups?: {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        groups?: ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K in Exclude<keyof I["groups"][number], keyof Group>]: never; })[] & { [K_1 in Exclude<keyof I["groups"], keyof {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof GroupList>]: never; }>(base?: I | undefined): GroupList;
    fromPartial<I_1 extends {
        groups?: {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        groups?: ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K_3 in Exclude<keyof I_1["groups"][number], keyof Group>]: never; })[] & { [K_4 in Exclude<keyof I_1["groups"], keyof {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof GroupList>]: never; }>(object: I_1): GroupList;
};
export declare const GroupUserList: {
    encode(message: GroupUserList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupUserList;
    fromJSON(object: any): GroupUserList;
    toJSON(message: GroupUserList): unknown;
    create<I extends {
        group_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        group_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K in Exclude<keyof I["group_users"][number]["user"], keyof User>]: never; }) | undefined;
            state?: number | undefined;
        } & { [K_1 in Exclude<keyof I["group_users"][number], keyof GroupUserList_GroupUser>]: never; })[] & { [K_2 in Exclude<keyof I["group_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof GroupUserList>]: never; }>(base?: I | undefined): GroupUserList;
    fromPartial<I_1 extends {
        group_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        group_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["group_users"][number]["user"], keyof User>]: never; }) | undefined;
            state?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["group_users"][number], keyof GroupUserList_GroupUser>]: never; })[] & { [K_6 in Exclude<keyof I_1["group_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            state?: number | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof GroupUserList>]: never; }>(object: I_1): GroupUserList;
};
export declare const GroupUserList_GroupUser: {
    encode(message: GroupUserList_GroupUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupUserList_GroupUser;
    fromJSON(object: any): GroupUserList_GroupUser;
    toJSON(message: GroupUserList_GroupUser): unknown;
    create<I extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        state?: number | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
        state?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof GroupUserList_GroupUser>]: never; }>(base?: I | undefined): GroupUserList_GroupUser;
    fromPartial<I_1 extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        state?: number | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        state?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof GroupUserList_GroupUser>]: never; }>(object: I_1): GroupUserList_GroupUser;
};
export declare const ChannelUserList: {
    encode(message: ChannelUserList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList;
    fromJSON(object: any): ChannelUserList;
    toJSON(message: ChannelUserList): unknown;
    create<I extends {
        channel_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        channel_id?: string | undefined;
    } & {
        channel_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K in Exclude<keyof I["channel_users"][number]["user"], keyof User>]: never; }) | undefined;
            role_id?: string | undefined;
        } & { [K_1 in Exclude<keyof I["channel_users"][number], keyof ChannelUserList_ChannelUser>]: never; })[] & { [K_2 in Exclude<keyof I["channel_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        channel_id?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof ChannelUserList>]: never; }>(base?: I | undefined): ChannelUserList;
    fromPartial<I_1 extends {
        channel_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        channel_id?: string | undefined;
    } & {
        channel_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["channel_users"][number]["user"], keyof User>]: never; }) | undefined;
            role_id?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["channel_users"][number], keyof ChannelUserList_ChannelUser>]: never; })[] & { [K_6 in Exclude<keyof I_1["channel_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        channel_id?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof ChannelUserList>]: never; }>(object: I_1): ChannelUserList;
};
export declare const ChannelUserList_ChannelUser: {
    encode(message: ChannelUserList_ChannelUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList_ChannelUser;
    fromJSON(object: any): ChannelUserList_ChannelUser;
    toJSON(message: ChannelUserList_ChannelUser): unknown;
    create<I extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        role_id?: string | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
        role_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ChannelUserList_ChannelUser>]: never; }>(base?: I | undefined): ChannelUserList_ChannelUser;
    fromPartial<I_1 extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        role_id?: string | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        role_id?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ChannelUserList_ChannelUser>]: never; }>(object: I_1): ChannelUserList_ChannelUser;
};
export declare const ClanUserList: {
    encode(message: ClanUserList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanUserList;
    fromJSON(object: any): ClanUserList;
    toJSON(message: ClanUserList): unknown;
    create<I extends {
        clan_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & {
        clan_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K in Exclude<keyof I["clan_users"][number]["user"], keyof User>]: never; }) | undefined;
            role_id?: string | undefined;
        } & { [K_1 in Exclude<keyof I["clan_users"][number], keyof ClanUserList_ClanUser>]: never; })[] & { [K_2 in Exclude<keyof I["clan_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof ClanUserList>]: never; }>(base?: I | undefined): ClanUserList;
    fromPartial<I_1 extends {
        clan_users?: {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & {
        clan_users?: ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[] & ({
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        } & {
            user?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["clan_users"][number]["user"], keyof User>]: never; }) | undefined;
            role_id?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["clan_users"][number], keyof ClanUserList_ClanUser>]: never; })[] & { [K_6 in Exclude<keyof I_1["clan_users"], keyof {
            user?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                timezone?: string | undefined;
                metadata?: string | undefined;
                facebook_id?: string | undefined;
                google_id?: string | undefined;
                gamecenter_id?: string | undefined;
                steam_id?: string | undefined;
                online?: boolean | undefined;
                edge_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
                apple_id?: string | undefined;
            } | undefined;
            role_id?: string | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof ClanUserList>]: never; }>(object: I_1): ClanUserList;
};
export declare const ClanUserList_ClanUser: {
    encode(message: ClanUserList_ClanUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanUserList_ClanUser;
    fromJSON(object: any): ClanUserList_ClanUser;
    toJSON(message: ClanUserList_ClanUser): unknown;
    create<I extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        role_id?: string | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
        role_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ClanUserList_ClanUser>]: never; }>(base?: I | undefined): ClanUserList_ClanUser;
    fromPartial<I_1 extends {
        user?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } | undefined;
        role_id?: string | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        role_id?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ClanUserList_ClanUser>]: never; }>(object: I_1): ClanUserList_ClanUser;
};
export declare const ImportFacebookFriendsRequest: {
    encode(message: ImportFacebookFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ImportFacebookFriendsRequest;
    fromJSON(object: any): ImportFacebookFriendsRequest;
    toJSON(message: ImportFacebookFriendsRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        reset?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountFacebook>]: never; }) | undefined;
        reset?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ImportFacebookFriendsRequest>]: never; }>(base?: I | undefined): ImportFacebookFriendsRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        reset?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountFacebook>]: never; }) | undefined;
        reset?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ImportFacebookFriendsRequest>]: never; }>(object: I_1): ImportFacebookFriendsRequest;
};
export declare const ImportSteamFriendsRequest: {
    encode(message: ImportSteamFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ImportSteamFriendsRequest;
    fromJSON(object: any): ImportSteamFriendsRequest;
    toJSON(message: ImportSteamFriendsRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        reset?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountSteam>]: never; }) | undefined;
        reset?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ImportSteamFriendsRequest>]: never; }>(base?: I | undefined): ImportSteamFriendsRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        reset?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountSteam>]: never; }) | undefined;
        reset?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ImportSteamFriendsRequest>]: never; }>(object: I_1): ImportSteamFriendsRequest;
};
export declare const JoinGroupRequest: {
    encode(message: JoinGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JoinGroupRequest;
    fromJSON(object: any): JoinGroupRequest;
    toJSON(message: JoinGroupRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K in Exclude<keyof I, "group_id">]: never; }>(base?: I | undefined): JoinGroupRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "group_id">]: never; }>(object: I_1): JoinGroupRequest;
};
export declare const JoinTournamentRequest: {
    encode(message: JoinTournamentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JoinTournamentRequest;
    fromJSON(object: any): JoinTournamentRequest;
    toJSON(message: JoinTournamentRequest): unknown;
    create<I extends {
        tournament_id?: string | undefined;
    } & {
        tournament_id?: string | undefined;
    } & { [K in Exclude<keyof I, "tournament_id">]: never; }>(base?: I | undefined): JoinTournamentRequest;
    fromPartial<I_1 extends {
        tournament_id?: string | undefined;
    } & {
        tournament_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "tournament_id">]: never; }>(object: I_1): JoinTournamentRequest;
};
export declare const KickGroupUsersRequest: {
    encode(message: KickGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): KickGroupUsersRequest;
    fromJSON(object: any): KickGroupUsersRequest;
    toJSON(message: KickGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof KickGroupUsersRequest>]: never; }>(base?: I | undefined): KickGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof KickGroupUsersRequest>]: never; }>(object: I_1): KickGroupUsersRequest;
};
export declare const LeaveGroupRequest: {
    encode(message: LeaveGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaveGroupRequest;
    fromJSON(object: any): LeaveGroupRequest;
    toJSON(message: LeaveGroupRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K in Exclude<keyof I, "group_id">]: never; }>(base?: I | undefined): LeaveGroupRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
    } & {
        group_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "group_id">]: never; }>(object: I_1): LeaveGroupRequest;
};
export declare const LinkFacebookRequest: {
    encode(message: LinkFacebookRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LinkFacebookRequest;
    fromJSON(object: any): LinkFacebookRequest;
    toJSON(message: LinkFacebookRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountFacebook>]: never; }) | undefined;
        sync?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof LinkFacebookRequest>]: never; }>(base?: I | undefined): LinkFacebookRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountFacebook>]: never; }) | undefined;
        sync?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof LinkFacebookRequest>]: never; }>(object: I_1): LinkFacebookRequest;
};
export declare const LinkSteamRequest: {
    encode(message: LinkSteamRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LinkSteamRequest;
    fromJSON(object: any): LinkSteamRequest;
    toJSON(message: LinkSteamRequest): unknown;
    create<I extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["account"], keyof AccountSteam>]: never; }) | undefined;
        sync?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof LinkSteamRequest>]: never; }>(base?: I | undefined): LinkSteamRequest;
    fromPartial<I_1 extends {
        account?: {
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        sync?: boolean | undefined;
    } & {
        account?: ({
            token?: string | undefined;
            vars?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            token?: string | undefined;
            vars?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_3 in Exclude<keyof I_1["account"]["vars"], string | number>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["account"], keyof AccountSteam>]: never; }) | undefined;
        sync?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof LinkSteamRequest>]: never; }>(object: I_1): LinkSteamRequest;
};
export declare const ListChannelMessagesRequest: {
    encode(message: ListChannelMessagesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelMessagesRequest;
    fromJSON(object: any): ListChannelMessagesRequest;
    toJSON(message: ListChannelMessagesRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & {
        channel_id?: string | undefined;
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListChannelMessagesRequest>]: never; }>(base?: I | undefined): ListChannelMessagesRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & {
        channel_id?: string | undefined;
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListChannelMessagesRequest>]: never; }>(object: I_1): ListChannelMessagesRequest;
};
export declare const ListFriendsRequest: {
    encode(message: ListFriendsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListFriendsRequest;
    fromJSON(object: any): ListFriendsRequest;
    toJSON(message: ListFriendsRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListFriendsRequest>]: never; }>(base?: I | undefined): ListFriendsRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListFriendsRequest>]: never; }>(object: I_1): ListFriendsRequest;
};
export declare const ListGroupsRequest: {
    encode(message: ListGroupsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListGroupsRequest;
    fromJSON(object: any): ListGroupsRequest;
    toJSON(message: ListGroupsRequest): unknown;
    create<I extends {
        name?: string | undefined;
        cursor?: string | undefined;
        limit?: number | undefined;
        lang_tag?: string | undefined;
        members?: number | undefined;
        open?: boolean | undefined;
    } & {
        name?: string | undefined;
        cursor?: string | undefined;
        limit?: number | undefined;
        lang_tag?: string | undefined;
        members?: number | undefined;
        open?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ListGroupsRequest>]: never; }>(base?: I | undefined): ListGroupsRequest;
    fromPartial<I_1 extends {
        name?: string | undefined;
        cursor?: string | undefined;
        limit?: number | undefined;
        lang_tag?: string | undefined;
        members?: number | undefined;
        open?: boolean | undefined;
    } & {
        name?: string | undefined;
        cursor?: string | undefined;
        limit?: number | undefined;
        lang_tag?: string | undefined;
        members?: number | undefined;
        open?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListGroupsRequest>]: never; }>(object: I_1): ListGroupsRequest;
};
export declare const ListGroupUsersRequest: {
    encode(message: ListGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListGroupUsersRequest;
    fromJSON(object: any): ListGroupUsersRequest;
    toJSON(message: ListGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        group_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListGroupUsersRequest>]: never; }>(base?: I | undefined): ListGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        group_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListGroupUsersRequest>]: never; }>(object: I_1): ListGroupUsersRequest;
};
export declare const ListChannelUsersRequest: {
    encode(message: ListChannelUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelUsersRequest;
    fromJSON(object: any): ListChannelUsersRequest;
    toJSON(message: ListChannelUsersRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        channel_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListChannelUsersRequest>]: never; }>(base?: I | undefined): ListChannelUsersRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        channel_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListChannelUsersRequest>]: never; }>(object: I_1): ListChannelUsersRequest;
};
export declare const ListClanUsersRequest: {
    encode(message: ListClanUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListClanUsersRequest;
    fromJSON(object: any): ListClanUsersRequest;
    toJSON(message: ListClanUsersRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, "clan_id">]: never; }>(base?: I | undefined): ListClanUsersRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "clan_id">]: never; }>(object: I_1): ListClanUsersRequest;
};
export declare const ListNotificationsRequest: {
    encode(message: ListNotificationsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsRequest;
    fromJSON(object: any): ListNotificationsRequest;
    toJSON(message: ListNotificationsRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListNotificationsRequest>]: never; }>(base?: I | undefined): ListNotificationsRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListNotificationsRequest>]: never; }>(object: I_1): ListNotificationsRequest;
};
export declare const ListStorageObjectsRequest: {
    encode(message: ListStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListStorageObjectsRequest;
    fromJSON(object: any): ListStorageObjectsRequest;
    toJSON(message: ListStorageObjectsRequest): unknown;
    create<I extends {
        user_id?: string | undefined;
        collection?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        user_id?: string | undefined;
        collection?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListStorageObjectsRequest>]: never; }>(base?: I | undefined): ListStorageObjectsRequest;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        collection?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        user_id?: string | undefined;
        collection?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListStorageObjectsRequest>]: never; }>(object: I_1): ListStorageObjectsRequest;
};
export declare const ListUserGroupsRequest: {
    encode(message: ListUserGroupsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListUserGroupsRequest;
    fromJSON(object: any): ListUserGroupsRequest;
    toJSON(message: ListUserGroupsRequest): unknown;
    create<I extends {
        user_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        user_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListUserGroupsRequest>]: never; }>(base?: I | undefined): ListUserGroupsRequest;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        user_id?: string | undefined;
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListUserGroupsRequest>]: never; }>(object: I_1): ListUserGroupsRequest;
};
export declare const Notification: {
    encode(message: Notification, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Notification;
    fromJSON(object: any): Notification;
    toJSON(message: Notification): unknown;
    create<I extends {
        id?: string | undefined;
        subject?: string | undefined;
        content?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        create_time?: Date | undefined;
        persistent?: boolean | undefined;
    } & {
        id?: string | undefined;
        subject?: string | undefined;
        content?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        create_time?: Date | undefined;
        persistent?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof Notification>]: never; }>(base?: I | undefined): Notification;
    fromPartial<I_1 extends {
        id?: string | undefined;
        subject?: string | undefined;
        content?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        create_time?: Date | undefined;
        persistent?: boolean | undefined;
    } & {
        id?: string | undefined;
        subject?: string | undefined;
        content?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        create_time?: Date | undefined;
        persistent?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Notification>]: never; }>(object: I_1): Notification;
};
export declare const NotificationList: {
    encode(message: NotificationList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): NotificationList;
    fromJSON(object: any): NotificationList;
    toJSON(message: NotificationList): unknown;
    create<I extends {
        notifications?: {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[] | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        notifications?: ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        } & {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        } & { [K in Exclude<keyof I["notifications"][number], keyof Notification>]: never; })[] & { [K_1 in Exclude<keyof I["notifications"], keyof {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof NotificationList>]: never; }>(base?: I | undefined): NotificationList;
    fromPartial<I_1 extends {
        notifications?: {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[] | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        notifications?: ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        } & {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["notifications"][number], keyof Notification>]: never; })[] & { [K_4 in Exclude<keyof I_1["notifications"], keyof {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof NotificationList>]: never; }>(object: I_1): NotificationList;
};
export declare const PromoteGroupUsersRequest: {
    encode(message: PromoteGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PromoteGroupUsersRequest;
    fromJSON(object: any): PromoteGroupUsersRequest;
    toJSON(message: PromoteGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PromoteGroupUsersRequest>]: never; }>(base?: I | undefined): PromoteGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PromoteGroupUsersRequest>]: never; }>(object: I_1): PromoteGroupUsersRequest;
};
export declare const DemoteGroupUsersRequest: {
    encode(message: DemoteGroupUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DemoteGroupUsersRequest;
    fromJSON(object: any): DemoteGroupUsersRequest;
    toJSON(message: DemoteGroupUsersRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof DemoteGroupUsersRequest>]: never; }>(base?: I | undefined): DemoteGroupUsersRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        group_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof DemoteGroupUsersRequest>]: never; }>(object: I_1): DemoteGroupUsersRequest;
};
export declare const ReadStorageObjectId: {
    encode(message: ReadStorageObjectId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ReadStorageObjectId;
    fromJSON(object: any): ReadStorageObjectId;
    toJSON(message: ReadStorageObjectId): unknown;
    create<I extends {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ReadStorageObjectId>]: never; }>(base?: I | undefined): ReadStorageObjectId;
    fromPartial<I_1 extends {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ReadStorageObjectId>]: never; }>(object: I_1): ReadStorageObjectId;
};
export declare const ReadStorageObjectsRequest: {
    encode(message: ReadStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ReadStorageObjectsRequest;
    fromJSON(object: any): ReadStorageObjectsRequest;
    toJSON(message: ReadStorageObjectsRequest): unknown;
    create<I extends {
        object_ids?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[] | undefined;
    } & {
        object_ids?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        } & { [K in Exclude<keyof I["object_ids"][number], keyof ReadStorageObjectId>]: never; })[] & { [K_1 in Exclude<keyof I["object_ids"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "object_ids">]: never; }>(base?: I | undefined): ReadStorageObjectsRequest;
    fromPartial<I_1 extends {
        object_ids?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[] | undefined;
    } & {
        object_ids?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["object_ids"][number], keyof ReadStorageObjectId>]: never; })[] & { [K_4 in Exclude<keyof I_1["object_ids"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "object_ids">]: never; }>(object: I_1): ReadStorageObjectsRequest;
};
export declare const Rpc: {
    encode(message: Rpc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Rpc;
    fromJSON(object: any): Rpc;
    toJSON(message: Rpc): unknown;
    create<I extends {
        id?: string | undefined;
        payload?: string | undefined;
        http_key?: string | undefined;
    } & {
        id?: string | undefined;
        payload?: string | undefined;
        http_key?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Rpc>]: never; }>(base?: I | undefined): Rpc;
    fromPartial<I_1 extends {
        id?: string | undefined;
        payload?: string | undefined;
        http_key?: string | undefined;
    } & {
        id?: string | undefined;
        payload?: string | undefined;
        http_key?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Rpc>]: never; }>(object: I_1): Rpc;
};
export declare const Session: {
    encode(message: Session, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Session;
    fromJSON(object: any): Session;
    toJSON(message: Session): unknown;
    create<I extends {
        created?: boolean | undefined;
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & {
        created?: boolean | undefined;
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Session>]: never; }>(base?: I | undefined): Session;
    fromPartial<I_1 extends {
        created?: boolean | undefined;
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & {
        created?: boolean | undefined;
        token?: string | undefined;
        refresh_token?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Session>]: never; }>(object: I_1): Session;
};
export declare const StorageObject: {
    encode(message: StorageObject, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StorageObject;
    fromJSON(object: any): StorageObject;
    toJSON(message: StorageObject): unknown;
    create<I extends {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof StorageObject>]: never; }>(base?: I | undefined): StorageObject;
    fromPartial<I_1 extends {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        user_id?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof StorageObject>]: never; }>(object: I_1): StorageObject;
};
export declare const StorageObjectAck: {
    encode(message: StorageObjectAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAck;
    fromJSON(object: any): StorageObjectAck;
    toJSON(message: StorageObjectAck): unknown;
    create<I extends {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
        user_id?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
        user_id?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof StorageObjectAck>]: never; }>(base?: I | undefined): StorageObjectAck;
    fromPartial<I_1 extends {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
        user_id?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        version?: string | undefined;
        user_id?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof StorageObjectAck>]: never; }>(object: I_1): StorageObjectAck;
};
export declare const StorageObjectAcks: {
    encode(message: StorageObjectAcks, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAcks;
    fromJSON(object: any): StorageObjectAcks;
    toJSON(message: StorageObjectAcks): unknown;
    create<I extends {
        acks?: {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
    } & {
        acks?: ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K in Exclude<keyof I["acks"][number], keyof StorageObjectAck>]: never; })[] & { [K_1 in Exclude<keyof I["acks"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "acks">]: never; }>(base?: I | undefined): StorageObjectAcks;
    fromPartial<I_1 extends {
        acks?: {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
    } & {
        acks?: ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K_3 in Exclude<keyof I_1["acks"][number], keyof StorageObjectAck>]: never; })[] & { [K_4 in Exclude<keyof I_1["acks"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            version?: string | undefined;
            user_id?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "acks">]: never; }>(object: I_1): StorageObjectAcks;
};
export declare const StorageObjects: {
    encode(message: StorageObjects, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjects;
    fromJSON(object: any): StorageObjects;
    toJSON(message: StorageObjects): unknown;
    create<I extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K in Exclude<keyof I["objects"][number], keyof StorageObject>]: never; })[] & { [K_1 in Exclude<keyof I["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "objects">]: never; }>(base?: I | undefined): StorageObjects;
    fromPartial<I_1 extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K_3 in Exclude<keyof I_1["objects"][number], keyof StorageObject>]: never; })[] & { [K_4 in Exclude<keyof I_1["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "objects">]: never; }>(object: I_1): StorageObjects;
};
export declare const StorageObjectList: {
    encode(message: StorageObjectList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectList;
    fromJSON(object: any): StorageObjectList;
    toJSON(message: StorageObjectList): unknown;
    create<I extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K in Exclude<keyof I["objects"][number], keyof StorageObject>]: never; })[] & { [K_1 in Exclude<keyof I["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof StorageObjectList>]: never; }>(base?: I | undefined): StorageObjectList;
    fromPartial<I_1 extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K_3 in Exclude<keyof I_1["objects"][number], keyof StorageObject>]: never; })[] & { [K_4 in Exclude<keyof I_1["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            user_id?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof StorageObjectList>]: never; }>(object: I_1): StorageObjectList;
};
export declare const UpdateAccountRequest: {
    encode(message: UpdateAccountRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountRequest;
    fromJSON(object: any): UpdateAccountRequest;
    toJSON(message: UpdateAccountRequest): unknown;
    create<I extends {
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
    } & {
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateAccountRequest>]: never; }>(base?: I | undefined): UpdateAccountRequest;
    fromPartial<I_1 extends {
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
    } & {
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateAccountRequest>]: never; }>(object: I_1): UpdateAccountRequest;
};
export declare const UpdateGroupRequest: {
    encode(message: UpdateGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupRequest;
    fromJSON(object: any): UpdateGroupRequest;
    toJSON(message: UpdateGroupRequest): unknown;
    create<I extends {
        group_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
    } & {
        group_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateGroupRequest>]: never; }>(base?: I | undefined): UpdateGroupRequest;
    fromPartial<I_1 extends {
        group_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
    } & {
        group_id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        lang_tag?: string | undefined;
        avatar_url?: string | undefined;
        open?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateGroupRequest>]: never; }>(object: I_1): UpdateGroupRequest;
};
export declare const UpdateCategoryDescRequest: {
    encode(message: UpdateCategoryDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCategoryDescRequest;
    fromJSON(object: any): UpdateCategoryDescRequest;
    toJSON(message: UpdateCategoryDescRequest): unknown;
    create<I extends {
        category_id?: string | undefined;
        category_name?: string | undefined;
    } & {
        category_id?: string | undefined;
        category_name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateCategoryDescRequest>]: never; }>(base?: I | undefined): UpdateCategoryDescRequest;
    fromPartial<I_1 extends {
        category_id?: string | undefined;
        category_name?: string | undefined;
    } & {
        category_id?: string | undefined;
        category_name?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateCategoryDescRequest>]: never; }>(object: I_1): UpdateCategoryDescRequest;
};
export declare const User: {
    encode(message: User, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    create<I extends {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
        metadata?: string | undefined;
        facebook_id?: string | undefined;
        google_id?: string | undefined;
        gamecenter_id?: string | undefined;
        steam_id?: string | undefined;
        online?: boolean | undefined;
        edge_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        apple_id?: string | undefined;
    } & {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
        metadata?: string | undefined;
        facebook_id?: string | undefined;
        google_id?: string | undefined;
        gamecenter_id?: string | undefined;
        steam_id?: string | undefined;
        online?: boolean | undefined;
        edge_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        apple_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof User>]: never; }>(base?: I | undefined): User;
    fromPartial<I_1 extends {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
        metadata?: string | undefined;
        facebook_id?: string | undefined;
        google_id?: string | undefined;
        gamecenter_id?: string | undefined;
        steam_id?: string | undefined;
        online?: boolean | undefined;
        edge_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        apple_id?: string | undefined;
    } & {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        timezone?: string | undefined;
        metadata?: string | undefined;
        facebook_id?: string | undefined;
        google_id?: string | undefined;
        gamecenter_id?: string | undefined;
        steam_id?: string | undefined;
        online?: boolean | undefined;
        edge_count?: number | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        apple_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof User>]: never; }>(object: I_1): User;
};
export declare const UserGroupList: {
    encode(message: UserGroupList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UserGroupList;
    fromJSON(object: any): UserGroupList;
    toJSON(message: UserGroupList): unknown;
    create<I extends {
        user_groups?: {
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        user_groups?: ({
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[] & ({
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        } & {
            group?: ({
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } & {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } & { [K in Exclude<keyof I["user_groups"][number]["group"], keyof Group>]: never; }) | undefined;
            state?: number | undefined;
        } & { [K_1 in Exclude<keyof I["user_groups"][number], keyof UserGroupList_UserGroup>]: never; })[] & { [K_2 in Exclude<keyof I["user_groups"], keyof {
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof UserGroupList>]: never; }>(base?: I | undefined): UserGroupList;
    fromPartial<I_1 extends {
        user_groups?: {
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        user_groups?: ({
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[] & ({
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        } & {
            group?: ({
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } & {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } & { [K_4 in Exclude<keyof I_1["user_groups"][number]["group"], keyof Group>]: never; }) | undefined;
            state?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["user_groups"][number], keyof UserGroupList_UserGroup>]: never; })[] & { [K_6 in Exclude<keyof I_1["user_groups"], keyof {
            group?: {
                id?: string | undefined;
                creator_id?: string | undefined;
                name?: string | undefined;
                description?: string | undefined;
                lang_tag?: string | undefined;
                metadata?: string | undefined;
                avatar_url?: string | undefined;
                open?: boolean | undefined;
                edge_count?: number | undefined;
                max_count?: number | undefined;
                create_time?: Date | undefined;
                update_time?: Date | undefined;
            } | undefined;
            state?: number | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof UserGroupList>]: never; }>(object: I_1): UserGroupList;
};
export declare const UserGroupList_UserGroup: {
    encode(message: UserGroupList_UserGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UserGroupList_UserGroup;
    fromJSON(object: any): UserGroupList_UserGroup;
    toJSON(message: UserGroupList_UserGroup): unknown;
    create<I extends {
        group?: {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } | undefined;
        state?: number | undefined;
    } & {
        group?: ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K in Exclude<keyof I["group"], keyof Group>]: never; }) | undefined;
        state?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof UserGroupList_UserGroup>]: never; }>(base?: I | undefined): UserGroupList_UserGroup;
    fromPartial<I_1 extends {
        group?: {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } | undefined;
        state?: number | undefined;
    } & {
        group?: ({
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & {
            id?: string | undefined;
            creator_id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            lang_tag?: string | undefined;
            metadata?: string | undefined;
            avatar_url?: string | undefined;
            open?: boolean | undefined;
            edge_count?: number | undefined;
            max_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
        } & { [K_2 in Exclude<keyof I_1["group"], keyof Group>]: never; }) | undefined;
        state?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof UserGroupList_UserGroup>]: never; }>(object: I_1): UserGroupList_UserGroup;
};
export declare const Users: {
    encode(message: Users, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Users;
    fromJSON(object: any): Users;
    toJSON(message: Users): unknown;
    create<I extends {
        users?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[] | undefined;
    } & {
        users?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[] & ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K in Exclude<keyof I["users"][number], keyof User>]: never; })[] & { [K_1 in Exclude<keyof I["users"], keyof {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "users">]: never; }>(base?: I | undefined): Users;
    fromPartial<I_1 extends {
        users?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[] | undefined;
    } & {
        users?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[] & ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["users"][number], keyof User>]: never; })[] & { [K_4 in Exclude<keyof I_1["users"], keyof {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            timezone?: string | undefined;
            metadata?: string | undefined;
            facebook_id?: string | undefined;
            google_id?: string | undefined;
            gamecenter_id?: string | undefined;
            steam_id?: string | undefined;
            online?: boolean | undefined;
            edge_count?: number | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            apple_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "users">]: never; }>(object: I_1): Users;
};
export declare const WriteStorageObject: {
    encode(message: WriteStorageObject, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteStorageObject;
    fromJSON(object: any): WriteStorageObject;
    toJSON(message: WriteStorageObject): unknown;
    create<I extends {
        collection?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
    } & { [K in Exclude<keyof I, keyof WriteStorageObject>]: never; }>(base?: I | undefined): WriteStorageObject;
    fromPartial<I_1 extends {
        collection?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
    } & {
        collection?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        version?: string | undefined;
        permission_read?: number | undefined;
        permission_write?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof WriteStorageObject>]: never; }>(object: I_1): WriteStorageObject;
};
export declare const WriteStorageObjectsRequest: {
    encode(message: WriteStorageObjectsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteStorageObjectsRequest;
    fromJSON(object: any): WriteStorageObjectsRequest;
    toJSON(message: WriteStorageObjectsRequest): unknown;
    create<I extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[] | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        } & { [K in Exclude<keyof I["objects"][number], keyof WriteStorageObject>]: never; })[] & { [K_1 in Exclude<keyof I["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "objects">]: never; }>(base?: I | undefined): WriteStorageObjectsRequest;
    fromPartial<I_1 extends {
        objects?: {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[] | undefined;
    } & {
        objects?: ({
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[] & ({
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        } & {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["objects"][number], keyof WriteStorageObject>]: never; })[] & { [K_4 in Exclude<keyof I_1["objects"], keyof {
            collection?: string | undefined;
            key?: string | undefined;
            value?: string | undefined;
            version?: string | undefined;
            permission_read?: number | undefined;
            permission_write?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "objects">]: never; }>(object: I_1): WriteStorageObjectsRequest;
};
export declare const WriteTournamentRecordRequest: {
    encode(message: WriteTournamentRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteTournamentRecordRequest;
    fromJSON(object: any): WriteTournamentRecordRequest;
    toJSON(message: WriteTournamentRecordRequest): unknown;
    create<I extends {
        tournament_id?: string | undefined;
        record?: {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } | undefined;
    } & {
        tournament_id?: string | undefined;
        record?: ({
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } & {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } & { [K in Exclude<keyof I["record"], keyof WriteTournamentRecordRequest_TournamentRecordWrite>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof WriteTournamentRecordRequest>]: never; }>(base?: I | undefined): WriteTournamentRecordRequest;
    fromPartial<I_1 extends {
        tournament_id?: string | undefined;
        record?: {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } | undefined;
    } & {
        tournament_id?: string | undefined;
        record?: ({
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } & {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } & { [K_2 in Exclude<keyof I_1["record"], keyof WriteTournamentRecordRequest_TournamentRecordWrite>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof WriteTournamentRecordRequest>]: never; }>(object: I_1): WriteTournamentRecordRequest;
};
export declare const WriteTournamentRecordRequest_TournamentRecordWrite: {
    encode(message: WriteTournamentRecordRequest_TournamentRecordWrite, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteTournamentRecordRequest_TournamentRecordWrite;
    fromJSON(object: any): WriteTournamentRecordRequest_TournamentRecordWrite;
    toJSON(message: WriteTournamentRecordRequest_TournamentRecordWrite): unknown;
    create<I extends {
        score?: number | undefined;
        subscore?: number | undefined;
        metadata?: string | undefined;
        operator?: Operator | undefined;
    } & {
        score?: number | undefined;
        subscore?: number | undefined;
        metadata?: string | undefined;
        operator?: Operator | undefined;
    } & { [K in Exclude<keyof I, keyof WriteTournamentRecordRequest_TournamentRecordWrite>]: never; }>(base?: I | undefined): WriteTournamentRecordRequest_TournamentRecordWrite;
    fromPartial<I_1 extends {
        score?: number | undefined;
        subscore?: number | undefined;
        metadata?: string | undefined;
        operator?: Operator | undefined;
    } & {
        score?: number | undefined;
        subscore?: number | undefined;
        metadata?: string | undefined;
        operator?: Operator | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof WriteTournamentRecordRequest_TournamentRecordWrite>]: never; }>(object: I_1): WriteTournamentRecordRequest_TournamentRecordWrite;
};
export declare const ClanDescProfile: {
    encode(message: ClanDescProfile, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescProfile;
    fromJSON(object: any): ClanDescProfile;
    toJSON(message: ClanDescProfile): unknown;
    create<I extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ClanDescProfile>]: never; }>(base?: I | undefined): ClanDescProfile;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ClanDescProfile>]: never; }>(object: I_1): ClanDescProfile;
};
export declare const UpdateClanDescProfileRequest: {
    encode(message: UpdateClanDescProfileRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanDescProfileRequest;
    fromJSON(object: any): UpdateClanDescProfileRequest;
    toJSON(message: UpdateClanDescProfileRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateClanDescProfileRequest>]: never; }>(base?: I | undefined): UpdateClanDescProfileRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        profile_banner?: string | undefined;
        profile_theme?: string | undefined;
        avatar_url?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateClanDescProfileRequest>]: never; }>(object: I_1): UpdateClanDescProfileRequest;
};
export declare const ClanDescProfileRequest: {
    encode(message: ClanDescProfileRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescProfileRequest;
    fromJSON(object: any): ClanDescProfileRequest;
    toJSON(message: ClanDescProfileRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, "clan_id">]: never; }>(base?: I | undefined): ClanDescProfileRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "clan_id">]: never; }>(object: I_1): ClanDescProfileRequest;
};
export declare const ClanDesc: {
    encode(message: ClanDesc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanDesc;
    fromJSON(object: any): ClanDesc;
    toJSON(message: ClanDesc): unknown;
    create<I extends {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        clan_id?: string | undefined;
        status?: number | undefined;
    } & {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        clan_id?: string | undefined;
        status?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ClanDesc>]: never; }>(base?: I | undefined): ClanDesc;
    fromPartial<I_1 extends {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        clan_id?: string | undefined;
        status?: number | undefined;
    } & {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        clan_id?: string | undefined;
        status?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ClanDesc>]: never; }>(object: I_1): ClanDesc;
};
export declare const CreateClanDescRequest: {
    encode(message: CreateClanDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateClanDescRequest;
    fromJSON(object: any): CreateClanDescRequest;
    toJSON(message: CreateClanDescRequest): unknown;
    create<I extends {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
    } & {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CreateClanDescRequest>]: never; }>(base?: I | undefined): CreateClanDescRequest;
    fromPartial<I_1 extends {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
    } & {
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CreateClanDescRequest>]: never; }>(object: I_1): CreateClanDescRequest;
};
export declare const UpdateClanDescRequest: {
    encode(message: UpdateClanDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanDescRequest;
    fromJSON(object: any): UpdateClanDescRequest;
    toJSON(message: UpdateClanDescRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        status?: number | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        status?: number | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateClanDescRequest>]: never; }>(base?: I | undefined): UpdateClanDescRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        status?: number | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        clan_name?: string | undefined;
        logo?: string | undefined;
        banner?: string | undefined;
        status?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateClanDescRequest>]: never; }>(object: I_1): UpdateClanDescRequest;
};
export declare const DeleteClanDescRequest: {
    encode(message: DeleteClanDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteClanDescRequest;
    fromJSON(object: any): DeleteClanDescRequest;
    toJSON(message: DeleteClanDescRequest): unknown;
    create<I extends {
        clan_desc_id?: string | undefined;
    } & {
        clan_desc_id?: string | undefined;
    } & { [K in Exclude<keyof I, "clan_desc_id">]: never; }>(base?: I | undefined): DeleteClanDescRequest;
    fromPartial<I_1 extends {
        clan_desc_id?: string | undefined;
    } & {
        clan_desc_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "clan_desc_id">]: never; }>(object: I_1): DeleteClanDescRequest;
};
export declare const ListClanDescRequest: {
    encode(message: ListClanDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListClanDescRequest;
    fromJSON(object: any): ListClanDescRequest;
    toJSON(message: ListClanDescRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListClanDescRequest>]: never; }>(base?: I | undefined): ListClanDescRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListClanDescRequest>]: never; }>(object: I_1): ListClanDescRequest;
};
export declare const ClanDescList: {
    encode(message: ClanDescList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescList;
    fromJSON(object: any): ClanDescList;
    toJSON(message: ClanDescList): unknown;
    create<I extends {
        clandesc?: {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[] | undefined;
    } & {
        clandesc?: ({
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[] & ({
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        } & {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        } & { [K in Exclude<keyof I["clandesc"][number], keyof ClanDesc>]: never; })[] & { [K_1 in Exclude<keyof I["clandesc"], keyof {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "clandesc">]: never; }>(base?: I | undefined): ClanDescList;
    fromPartial<I_1 extends {
        clandesc?: {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[] | undefined;
    } & {
        clandesc?: ({
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[] & ({
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        } & {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["clandesc"][number], keyof ClanDesc>]: never; })[] & { [K_4 in Exclude<keyof I_1["clandesc"], keyof {
            creator_id?: string | undefined;
            clan_name?: string | undefined;
            logo?: string | undefined;
            banner?: string | undefined;
            clan_id?: string | undefined;
            status?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "clandesc">]: never; }>(object: I_1): ClanDescList;
};
export declare const LinkInviteUserRequest: {
    encode(message: LinkInviteUserRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LinkInviteUserRequest;
    fromJSON(object: any): LinkInviteUserRequest;
    toJSON(message: LinkInviteUserRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        expiry_time?: number | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        expiry_time?: number | undefined;
    } & { [K in Exclude<keyof I, keyof LinkInviteUserRequest>]: never; }>(base?: I | undefined): LinkInviteUserRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        expiry_time?: number | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        expiry_time?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LinkInviteUserRequest>]: never; }>(object: I_1): LinkInviteUserRequest;
};
export declare const InviteUserRequest: {
    encode(message: InviteUserRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InviteUserRequest;
    fromJSON(object: any): InviteUserRequest;
    toJSON(message: InviteUserRequest): unknown;
    create<I extends {
        invite_id?: string | undefined;
    } & {
        invite_id?: string | undefined;
    } & { [K in Exclude<keyof I, "invite_id">]: never; }>(base?: I | undefined): InviteUserRequest;
    fromPartial<I_1 extends {
        invite_id?: string | undefined;
    } & {
        invite_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "invite_id">]: never; }>(object: I_1): InviteUserRequest;
};
export declare const InviteUserRes: {
    encode(message: InviteUserRes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InviteUserRes;
    fromJSON(object: any): InviteUserRes;
    toJSON(message: InviteUserRes): unknown;
    create<I extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        clan_name?: string | undefined;
        channel_name?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        clan_name?: string | undefined;
        channel_name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof InviteUserRes>]: never; }>(base?: I | undefined): InviteUserRes;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        clan_name?: string | undefined;
        channel_name?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        clan_name?: string | undefined;
        channel_name?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof InviteUserRes>]: never; }>(object: I_1): InviteUserRes;
};
export declare const JoinClanChannelRequest: {
    encode(message: JoinClanChannelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JoinClanChannelRequest;
    fromJSON(object: any): JoinClanChannelRequest;
    toJSON(message: JoinClanChannelRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof JoinClanChannelRequest>]: never; }>(base?: I | undefined): JoinClanChannelRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof JoinClanChannelRequest>]: never; }>(object: I_1): JoinClanChannelRequest;
};
export declare const LinkInviteUser: {
    encode(message: LinkInviteUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LinkInviteUser;
    fromJSON(object: any): LinkInviteUser;
    toJSON(message: LinkInviteUser): unknown;
    create<I extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        channel_id?: string | undefined;
        invite_link?: string | undefined;
        create_time?: Date | undefined;
        expiry_time?: Date | undefined;
        id?: string | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        channel_id?: string | undefined;
        invite_link?: string | undefined;
        create_time?: Date | undefined;
        expiry_time?: Date | undefined;
        id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof LinkInviteUser>]: never; }>(base?: I | undefined): LinkInviteUser;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        channel_id?: string | undefined;
        invite_link?: string | undefined;
        create_time?: Date | undefined;
        expiry_time?: Date | undefined;
        id?: string | undefined;
    } & {
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        channel_id?: string | undefined;
        invite_link?: string | undefined;
        create_time?: Date | undefined;
        expiry_time?: Date | undefined;
        id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LinkInviteUser>]: never; }>(object: I_1): LinkInviteUser;
};
export declare const ClanProfile: {
    encode(message: ClanProfile, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanProfile;
    fromJSON(object: any): ClanProfile;
    toJSON(message: ClanProfile): unknown;
    create<I extends {
        user_id?: string | undefined;
        nick_name?: string | undefined;
        avartar?: string | undefined;
        clan_id?: string | undefined;
    } & {
        user_id?: string | undefined;
        nick_name?: string | undefined;
        avartar?: string | undefined;
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ClanProfile>]: never; }>(base?: I | undefined): ClanProfile;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        nick_name?: string | undefined;
        avartar?: string | undefined;
        clan_id?: string | undefined;
    } & {
        user_id?: string | undefined;
        nick_name?: string | undefined;
        avartar?: string | undefined;
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ClanProfile>]: never; }>(object: I_1): ClanProfile;
};
export declare const ClanProfileRequest: {
    encode(message: ClanProfileRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClanProfileRequest;
    fromJSON(object: any): ClanProfileRequest;
    toJSON(message: ClanProfileRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, "clan_id">]: never; }>(base?: I | undefined): ClanProfileRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "clan_id">]: never; }>(object: I_1): ClanProfileRequest;
};
export declare const UpdateClanProfileRequest: {
    encode(message: UpdateClanProfileRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanProfileRequest;
    fromJSON(object: any): UpdateClanProfileRequest;
    toJSON(message: UpdateClanProfileRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        avatar?: string | undefined;
    } & {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        avatar?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateClanProfileRequest>]: never; }>(base?: I | undefined): UpdateClanProfileRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        avatar?: string | undefined;
    } & {
        clan_id?: string | undefined;
        nick_name?: string | undefined;
        avatar?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateClanProfileRequest>]: never; }>(object: I_1): UpdateClanProfileRequest;
};
export declare const CategoryDesc: {
    encode(message: CategoryDesc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CategoryDesc;
    fromJSON(object: any): CategoryDesc;
    toJSON(message: CategoryDesc): unknown;
    create<I extends {
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        category_name?: string | undefined;
        category_id?: string | undefined;
    } & {
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        category_name?: string | undefined;
        category_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CategoryDesc>]: never; }>(base?: I | undefined): CategoryDesc;
    fromPartial<I_1 extends {
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        category_name?: string | undefined;
        category_id?: string | undefined;
    } & {
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        category_name?: string | undefined;
        category_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CategoryDesc>]: never; }>(object: I_1): CategoryDesc;
};
export declare const CreateCategoryDescRequest: {
    encode(message: CreateCategoryDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateCategoryDescRequest;
    fromJSON(object: any): CreateCategoryDescRequest;
    toJSON(message: CreateCategoryDescRequest): unknown;
    create<I extends {
        category_name?: string | undefined;
        clan_id?: string | undefined;
    } & {
        category_name?: string | undefined;
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CreateCategoryDescRequest>]: never; }>(base?: I | undefined): CreateCategoryDescRequest;
    fromPartial<I_1 extends {
        category_name?: string | undefined;
        clan_id?: string | undefined;
    } & {
        category_name?: string | undefined;
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CreateCategoryDescRequest>]: never; }>(object: I_1): CreateCategoryDescRequest;
};
export declare const DeleteCategoryDescRequest: {
    encode(message: DeleteCategoryDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCategoryDescRequest;
    fromJSON(object: any): DeleteCategoryDescRequest;
    toJSON(message: DeleteCategoryDescRequest): unknown;
    create<I extends {
        creator_id?: string | undefined;
    } & {
        creator_id?: string | undefined;
    } & { [K in Exclude<keyof I, "creator_id">]: never; }>(base?: I | undefined): DeleteCategoryDescRequest;
    fromPartial<I_1 extends {
        creator_id?: string | undefined;
    } & {
        creator_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "creator_id">]: never; }>(object: I_1): DeleteCategoryDescRequest;
};
export declare const CategoryDescList: {
    encode(message: CategoryDescList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CategoryDescList;
    fromJSON(object: any): CategoryDescList;
    toJSON(message: CategoryDescList): unknown;
    create<I extends {
        categorydesc?: {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[] | undefined;
    } & {
        categorydesc?: ({
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[] & ({
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        } & {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        } & { [K in Exclude<keyof I["categorydesc"][number], keyof CategoryDesc>]: never; })[] & { [K_1 in Exclude<keyof I["categorydesc"], keyof {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "categorydesc">]: never; }>(base?: I | undefined): CategoryDescList;
    fromPartial<I_1 extends {
        categorydesc?: {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[] | undefined;
    } & {
        categorydesc?: ({
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[] & ({
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        } & {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["categorydesc"][number], keyof CategoryDesc>]: never; })[] & { [K_4 in Exclude<keyof I_1["categorydesc"], keyof {
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            category_name?: string | undefined;
            category_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "categorydesc">]: never; }>(object: I_1): CategoryDescList;
};
export declare const ListCategoryDescsRequest: {
    encode(message: ListCategoryDescsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListCategoryDescsRequest;
    fromJSON(object: any): ListCategoryDescsRequest;
    toJSON(message: ListCategoryDescsRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListCategoryDescsRequest>]: never; }>(base?: I | undefined): ListCategoryDescsRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListCategoryDescsRequest>]: never; }>(object: I_1): ListCategoryDescsRequest;
};
export declare const ChannelDescription: {
    encode(message: ChannelDescription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDescription;
    fromJSON(object: any): ChannelDescription;
    toJSON(message: ChannelDescription): unknown;
    create<I extends {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        category_name?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        channel_avatar?: string[] | undefined;
        user_id?: string[] | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        category_name?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        channel_avatar?: (string[] & string[] & { [K in Exclude<keyof I["channel_avatar"], keyof string[]>]: never; }) | undefined;
        user_id?: (string[] & string[] & { [K_1 in Exclude<keyof I["user_id"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ChannelDescription>]: never; }>(base?: I | undefined): ChannelDescription;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        category_name?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        channel_avatar?: string[] | undefined;
        user_id?: string[] | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        category_name?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        channel_avatar?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["channel_avatar"], keyof string[]>]: never; }) | undefined;
        user_id?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["user_id"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ChannelDescription>]: never; }>(object: I_1): ChannelDescription;
};
export declare const ChannelDescList: {
    encode(message: ChannelDescList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDescList;
    fromJSON(object: any): ChannelDescList;
    toJSON(message: ChannelDescList): unknown;
    create<I extends {
        channeldesc?: {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        channeldesc?: ({
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[] & ({
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        } & {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: (string[] & string[] & { [K in Exclude<keyof I["channeldesc"][number]["channel_avatar"], keyof string[]>]: never; }) | undefined;
            user_id?: (string[] & string[] & { [K_1 in Exclude<keyof I["channeldesc"][number]["user_id"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["channeldesc"][number], keyof ChannelDescription>]: never; })[] & { [K_3 in Exclude<keyof I["channeldesc"], keyof {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_4 in Exclude<keyof I, keyof ChannelDescList>]: never; }>(base?: I | undefined): ChannelDescList;
    fromPartial<I_1 extends {
        channeldesc?: {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        channeldesc?: ({
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[] & ({
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        } & {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["channeldesc"][number]["channel_avatar"], keyof string[]>]: never; }) | undefined;
            user_id?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["channeldesc"][number]["user_id"], keyof string[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["channeldesc"][number], keyof ChannelDescription>]: never; })[] & { [K_8 in Exclude<keyof I_1["channeldesc"], keyof {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
            channel_avatar?: string[] | undefined;
            user_id?: string[] | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof ChannelDescList>]: never; }>(object: I_1): ChannelDescList;
};
export declare const ListChannelDescsRequest: {
    encode(message: ListChannelDescsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelDescsRequest;
    fromJSON(object: any): ListChannelDescsRequest;
    toJSON(message: ListChannelDescsRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
        channel_type?: number | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
        channel_type?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ListChannelDescsRequest>]: never; }>(base?: I | undefined): ListChannelDescsRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
        channel_type?: number | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
        channel_type?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListChannelDescsRequest>]: never; }>(object: I_1): ListChannelDescsRequest;
};
export declare const CreateChannelDescRequest: {
    encode(message: CreateChannelDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateChannelDescRequest;
    fromJSON(object: any): CreateChannelDescRequest;
    toJSON(message: CreateChannelDescRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        group_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        user_ids?: string[] | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        group_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof CreateChannelDescRequest>]: never; }>(base?: I | undefined): CreateChannelDescRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        group_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        user_ids?: string[] | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        group_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof CreateChannelDescRequest>]: never; }>(object: I_1): CreateChannelDescRequest;
};
export declare const DeleteChannelDescRequest: {
    encode(message: DeleteChannelDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteChannelDescRequest;
    fromJSON(object: any): DeleteChannelDescRequest;
    toJSON(message: DeleteChannelDescRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
    } & { [K in Exclude<keyof I, "channel_id">]: never; }>(base?: I | undefined): DeleteChannelDescRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "channel_id">]: never; }>(object: I_1): DeleteChannelDescRequest;
};
export declare const UpdateChannelDescRequest: {
    encode(message: UpdateChannelDescRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChannelDescRequest;
    fromJSON(object: any): UpdateChannelDescRequest;
    toJSON(message: UpdateChannelDescRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_lable?: string | undefined;
        category_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
        channel_lable?: string | undefined;
        category_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateChannelDescRequest>]: never; }>(base?: I | undefined): UpdateChannelDescRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_lable?: string | undefined;
        category_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
        channel_lable?: string | undefined;
        category_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateChannelDescRequest>]: never; }>(object: I_1): UpdateChannelDescRequest;
};
export declare const AddChannelUsersRequest: {
    encode(message: AddChannelUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddChannelUsersRequest;
    fromJSON(object: any): AddChannelUsersRequest;
    toJSON(message: AddChannelUsersRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AddChannelUsersRequest>]: never; }>(base?: I | undefined): AddChannelUsersRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AddChannelUsersRequest>]: never; }>(object: I_1): AddChannelUsersRequest;
};
export declare const RemoveChannelUsersRequest: {
    encode(message: RemoveChannelUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RemoveChannelUsersRequest;
    fromJSON(object: any): RemoveChannelUsersRequest;
    toJSON(message: RemoveChannelUsersRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof RemoveChannelUsersRequest>]: never; }>(base?: I | undefined): RemoveChannelUsersRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof RemoveChannelUsersRequest>]: never; }>(object: I_1): RemoveChannelUsersRequest;
};
export declare const LeaveChannelRequest: {
    encode(message: LeaveChannelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaveChannelRequest;
    fromJSON(object: any): LeaveChannelRequest;
    toJSON(message: LeaveChannelRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
    } & { [K in Exclude<keyof I, "channel_id">]: never; }>(base?: I | undefined): LeaveChannelRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "channel_id">]: never; }>(object: I_1): LeaveChannelRequest;
};
export declare const Role: {
    encode(message: Role, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Role;
    fromJSON(object: any): Role;
    toJSON(message: Role): unknown;
    create<I extends {
        id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        active?: number | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        role_user_list?: {
            role_users?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] | undefined;
            cursor?: string | undefined;
        } | undefined;
        permission_list?: {
            permissions?: {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        active?: number | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        role_user_list?: ({
            role_users?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] | undefined;
            cursor?: string | undefined;
        } & {
            role_users?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] & ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            } & { [K in Exclude<keyof I["role_user_list"]["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_1 in Exclude<keyof I["role_user_list"]["role_users"], keyof {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[]>]: never; }) | undefined;
            cursor?: string | undefined;
        } & { [K_2 in Exclude<keyof I["role_user_list"], keyof RoleUserList>]: never; }) | undefined;
        permission_list?: ({
            permissions?: {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] | undefined;
        } & {
            permissions?: ({
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] & ({
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            } & {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            } & { [K_3 in Exclude<keyof I["permission_list"]["permissions"][number], keyof Permission>]: never; })[] & { [K_4 in Exclude<keyof I["permission_list"]["permissions"], keyof {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["permission_list"], "permissions">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof Role>]: never; }>(base?: I | undefined): Role;
    fromPartial<I_1 extends {
        id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        active?: number | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        role_user_list?: {
            role_users?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] | undefined;
            cursor?: string | undefined;
        } | undefined;
        permission_list?: {
            permissions?: {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        creator_id?: string | undefined;
        clan_id?: string | undefined;
        active?: number | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        role_user_list?: ({
            role_users?: {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] | undefined;
            cursor?: string | undefined;
        } & {
            role_users?: ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[] & ({
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            } & {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            } & { [K_7 in Exclude<keyof I_1["role_user_list"]["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_8 in Exclude<keyof I_1["role_user_list"]["role_users"], keyof {
                id?: string | undefined;
                username?: string | undefined;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                lang_tag?: string | undefined;
                location?: string | undefined;
                online?: boolean | undefined;
            }[]>]: never; }) | undefined;
            cursor?: string | undefined;
        } & { [K_9 in Exclude<keyof I_1["role_user_list"], keyof RoleUserList>]: never; }) | undefined;
        permission_list?: ({
            permissions?: {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] | undefined;
        } & {
            permissions?: ({
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[] & ({
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            } & {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            } & { [K_10 in Exclude<keyof I_1["permission_list"]["permissions"][number], keyof Permission>]: never; })[] & { [K_11 in Exclude<keyof I_1["permission_list"]["permissions"], keyof {
                id?: string | undefined;
                title?: string | undefined;
                slug?: string | undefined;
                description?: string | undefined;
                active?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I_1["permission_list"], "permissions">]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof Role>]: never; }>(object: I_1): Role;
};
export declare const Permission: {
    encode(message: Permission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Permission;
    fromJSON(object: any): Permission;
    toJSON(message: Permission): unknown;
    create<I extends {
        id?: string | undefined;
        title?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        active?: number | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        active?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Permission>]: never; }>(base?: I | undefined): Permission;
    fromPartial<I_1 extends {
        id?: string | undefined;
        title?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        active?: number | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        slug?: string | undefined;
        description?: string | undefined;
        active?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Permission>]: never; }>(object: I_1): Permission;
};
export declare const RoleList: {
    encode(message: RoleList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RoleList;
    fromJSON(object: any): RoleList;
    toJSON(message: RoleList): unknown;
    create<I extends {
        roles?: {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        roles?: ({
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: ({
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } & {
                role_users?: ({
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] & ({
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                } & {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                } & { [K in Exclude<keyof I["roles"][number]["role_user_list"]["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_1 in Exclude<keyof I["roles"][number]["role_user_list"]["role_users"], keyof {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[]>]: never; }) | undefined;
                cursor?: string | undefined;
            } & { [K_2 in Exclude<keyof I["roles"][number]["role_user_list"], keyof RoleUserList>]: never; }) | undefined;
            permission_list?: ({
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } & {
                permissions?: ({
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] & ({
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                } & {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                } & { [K_3 in Exclude<keyof I["roles"][number]["permission_list"]["permissions"][number], keyof Permission>]: never; })[] & { [K_4 in Exclude<keyof I["roles"][number]["permission_list"]["permissions"], keyof {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["roles"][number]["permission_list"], "permissions">]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["roles"][number], keyof Role>]: never; })[] & { [K_7 in Exclude<keyof I["roles"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_8 in Exclude<keyof I, keyof RoleList>]: never; }>(base?: I | undefined): RoleList;
    fromPartial<I_1 extends {
        roles?: {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & {
        roles?: ({
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: ({
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } & {
                role_users?: ({
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] & ({
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                } & {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                } & { [K_9 in Exclude<keyof I_1["roles"][number]["role_user_list"]["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_10 in Exclude<keyof I_1["roles"][number]["role_user_list"]["role_users"], keyof {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[]>]: never; }) | undefined;
                cursor?: string | undefined;
            } & { [K_11 in Exclude<keyof I_1["roles"][number]["role_user_list"], keyof RoleUserList>]: never; }) | undefined;
            permission_list?: ({
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } & {
                permissions?: ({
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] & ({
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                } & {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                } & { [K_12 in Exclude<keyof I_1["roles"][number]["permission_list"]["permissions"][number], keyof Permission>]: never; })[] & { [K_13 in Exclude<keyof I_1["roles"][number]["permission_list"]["permissions"], keyof {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_14 in Exclude<keyof I_1["roles"][number]["permission_list"], "permissions">]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I_1["roles"][number], keyof Role>]: never; })[] & { [K_16 in Exclude<keyof I_1["roles"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            color?: string | undefined;
            role_icon?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            creator_id?: string | undefined;
            clan_id?: string | undefined;
            active?: number | undefined;
            display_online?: number | undefined;
            allow_mention?: number | undefined;
            role_user_list?: {
                role_users?: {
                    id?: string | undefined;
                    username?: string | undefined;
                    display_name?: string | undefined;
                    avatar_url?: string | undefined;
                    lang_tag?: string | undefined;
                    location?: string | undefined;
                    online?: boolean | undefined;
                }[] | undefined;
                cursor?: string | undefined;
            } | undefined;
            permission_list?: {
                permissions?: {
                    id?: string | undefined;
                    title?: string | undefined;
                    slug?: string | undefined;
                    description?: string | undefined;
                    active?: number | undefined;
                }[] | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_17 in Exclude<keyof I_1, keyof RoleList>]: never; }>(object: I_1): RoleList;
};
export declare const PermissionList: {
    encode(message: PermissionList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PermissionList;
    fromJSON(object: any): PermissionList;
    toJSON(message: PermissionList): unknown;
    create<I extends {
        permissions?: {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[] | undefined;
    } & {
        permissions?: ({
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        } & { [K in Exclude<keyof I["permissions"][number], keyof Permission>]: never; })[] & { [K_1 in Exclude<keyof I["permissions"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "permissions">]: never; }>(base?: I | undefined): PermissionList;
    fromPartial<I_1 extends {
        permissions?: {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[] | undefined;
    } & {
        permissions?: ({
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["permissions"][number], keyof Permission>]: never; })[] & { [K_4 in Exclude<keyof I_1["permissions"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            slug?: string | undefined;
            description?: string | undefined;
            active?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "permissions">]: never; }>(object: I_1): PermissionList;
};
export declare const ListPermissionsRequest: {
    encode(message: ListPermissionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListPermissionsRequest;
    fromJSON(object: any): ListPermissionsRequest;
    toJSON(message: ListPermissionsRequest): unknown;
    create<I extends {
        role_id?: string | undefined;
    } & {
        role_id?: string | undefined;
    } & { [K in Exclude<keyof I, "role_id">]: never; }>(base?: I | undefined): ListPermissionsRequest;
    fromPartial<I_1 extends {
        role_id?: string | undefined;
    } & {
        role_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "role_id">]: never; }>(object: I_1): ListPermissionsRequest;
};
export declare const ListRoleUsersRequest: {
    encode(message: ListRoleUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListRoleUsersRequest;
    fromJSON(object: any): ListRoleUsersRequest;
    toJSON(message: ListRoleUsersRequest): unknown;
    create<I extends {
        role_id?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        role_id?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListRoleUsersRequest>]: never; }>(base?: I | undefined): ListRoleUsersRequest;
    fromPartial<I_1 extends {
        role_id?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        role_id?: string | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListRoleUsersRequest>]: never; }>(object: I_1): ListRoleUsersRequest;
};
export declare const ListPermissionOfUsersRequest: {
    encode(message: ListPermissionOfUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListPermissionOfUsersRequest;
    fromJSON(object: any): ListPermissionOfUsersRequest;
    toJSON(message: ListPermissionOfUsersRequest): unknown;
    create<I extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, "clan_id">]: never; }>(base?: I | undefined): ListPermissionOfUsersRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
    } & {
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "clan_id">]: never; }>(object: I_1): ListPermissionOfUsersRequest;
};
export declare const RoleUserList: {
    encode(message: RoleUserList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RoleUserList;
    fromJSON(object: any): RoleUserList;
    toJSON(message: RoleUserList): unknown;
    create<I extends {
        role_users?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        role_users?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        } & { [K in Exclude<keyof I["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_1 in Exclude<keyof I["role_users"], keyof {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof RoleUserList>]: never; }>(base?: I | undefined): RoleUserList;
    fromPartial<I_1 extends {
        role_users?: {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        role_users?: ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        } & {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["role_users"][number], keyof RoleUserList_RoleUser>]: never; })[] & { [K_4 in Exclude<keyof I_1["role_users"], keyof {
            id?: string | undefined;
            username?: string | undefined;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            lang_tag?: string | undefined;
            location?: string | undefined;
            online?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof RoleUserList>]: never; }>(object: I_1): RoleUserList;
};
export declare const RoleUserList_RoleUser: {
    encode(message: RoleUserList_RoleUser, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RoleUserList_RoleUser;
    fromJSON(object: any): RoleUserList_RoleUser;
    toJSON(message: RoleUserList_RoleUser): unknown;
    create<I extends {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        online?: boolean | undefined;
    } & {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        online?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof RoleUserList_RoleUser>]: never; }>(base?: I | undefined): RoleUserList_RoleUser;
    fromPartial<I_1 extends {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        online?: boolean | undefined;
    } & {
        id?: string | undefined;
        username?: string | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        lang_tag?: string | undefined;
        location?: string | undefined;
        online?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RoleUserList_RoleUser>]: never; }>(object: I_1): RoleUserList_RoleUser;
};
export declare const ListRolesRequest: {
    encode(message: ListRolesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesRequest;
    fromJSON(object: any): ListRolesRequest;
    toJSON(message: ListRolesRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListRolesRequest>]: never; }>(base?: I | undefined): ListRolesRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListRolesRequest>]: never; }>(object: I_1): ListRolesRequest;
};
export declare const CreateRoleRequest: {
    encode(message: CreateRoleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CreateRoleRequest;
    fromJSON(object: any): CreateRoleRequest;
    toJSON(message: CreateRoleRequest): unknown;
    create<I extends {
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        clan_id?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: string[] | undefined;
        active_permission_ids?: string[] | undefined;
    } & {
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        clan_id?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: (string[] & string[] & { [K in Exclude<keyof I["add_user_ids"], keyof string[]>]: never; }) | undefined;
        active_permission_ids?: (string[] & string[] & { [K_1 in Exclude<keyof I["active_permission_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof CreateRoleRequest>]: never; }>(base?: I | undefined): CreateRoleRequest;
    fromPartial<I_1 extends {
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        clan_id?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: string[] | undefined;
        active_permission_ids?: string[] | undefined;
    } & {
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        clan_id?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["add_user_ids"], keyof string[]>]: never; }) | undefined;
        active_permission_ids?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["active_permission_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof CreateRoleRequest>]: never; }>(object: I_1): CreateRoleRequest;
};
export declare const DeleteRoleRequest: {
    encode(message: DeleteRoleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleRequest;
    fromJSON(object: any): DeleteRoleRequest;
    toJSON(message: DeleteRoleRequest): unknown;
    create<I extends {
        role_id?: string | undefined;
    } & {
        role_id?: string | undefined;
    } & { [K in Exclude<keyof I, "role_id">]: never; }>(base?: I | undefined): DeleteRoleRequest;
    fromPartial<I_1 extends {
        role_id?: string | undefined;
    } & {
        role_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "role_id">]: never; }>(object: I_1): DeleteRoleRequest;
};
export declare const UpdateRoleRequest: {
    encode(message: UpdateRoleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRoleRequest;
    fromJSON(object: any): UpdateRoleRequest;
    toJSON(message: UpdateRoleRequest): unknown;
    create<I extends {
        role_id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: string[] | undefined;
        active_permission_ids?: string[] | undefined;
        remove_user_ids?: string[] | undefined;
        remove_permission_ids?: string[] | undefined;
    } & {
        role_id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: (string[] & string[] & { [K in Exclude<keyof I["add_user_ids"], keyof string[]>]: never; }) | undefined;
        active_permission_ids?: (string[] & string[] & { [K_1 in Exclude<keyof I["active_permission_ids"], keyof string[]>]: never; }) | undefined;
        remove_user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I["remove_user_ids"], keyof string[]>]: never; }) | undefined;
        remove_permission_ids?: (string[] & string[] & { [K_3 in Exclude<keyof I["remove_permission_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof UpdateRoleRequest>]: never; }>(base?: I | undefined): UpdateRoleRequest;
    fromPartial<I_1 extends {
        role_id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: string[] | undefined;
        active_permission_ids?: string[] | undefined;
        remove_user_ids?: string[] | undefined;
        remove_permission_ids?: string[] | undefined;
    } & {
        role_id?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        role_icon?: string | undefined;
        description?: string | undefined;
        display_online?: number | undefined;
        allow_mention?: number | undefined;
        add_user_ids?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["add_user_ids"], keyof string[]>]: never; }) | undefined;
        active_permission_ids?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["active_permission_ids"], keyof string[]>]: never; }) | undefined;
        remove_user_ids?: (string[] & string[] & { [K_7 in Exclude<keyof I_1["remove_user_ids"], keyof string[]>]: never; }) | undefined;
        remove_permission_ids?: (string[] & string[] & { [K_8 in Exclude<keyof I_1["remove_permission_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof UpdateRoleRequest>]: never; }>(object: I_1): UpdateRoleRequest;
};
export declare const UploadAttachmentRequest: {
    encode(message: UploadAttachmentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UploadAttachmentRequest;
    fromJSON(object: any): UploadAttachmentRequest;
    toJSON(message: UploadAttachmentRequest): unknown;
    create<I extends {
        filename?: string | undefined;
        filetype?: string | undefined;
        size?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        filetype?: string | undefined;
        size?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K in Exclude<keyof I, keyof UploadAttachmentRequest>]: never; }>(base?: I | undefined): UploadAttachmentRequest;
    fromPartial<I_1 extends {
        filename?: string | undefined;
        filetype?: string | undefined;
        size?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        filetype?: string | undefined;
        size?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UploadAttachmentRequest>]: never; }>(object: I_1): UploadAttachmentRequest;
};
export declare const ListMessageMentionRequest: {
    encode(message: ListMessageMentionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListMessageMentionRequest;
    fromJSON(object: any): ListMessageMentionRequest;
    toJSON(message: ListMessageMentionRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListMessageMentionRequest>]: never; }>(base?: I | undefined): ListMessageMentionRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        forward?: boolean | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListMessageMentionRequest>]: never; }>(object: I_1): ListMessageMentionRequest;
};
export declare const UploadAttachment: {
    encode(message: UploadAttachment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UploadAttachment;
    fromJSON(object: any): UploadAttachment;
    toJSON(message: UploadAttachment): unknown;
    create<I extends {
        filename?: string | undefined;
        url?: string | undefined;
    } & {
        filename?: string | undefined;
        url?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UploadAttachment>]: never; }>(base?: I | undefined): UploadAttachment;
    fromPartial<I_1 extends {
        filename?: string | undefined;
        url?: string | undefined;
    } & {
        filename?: string | undefined;
        url?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UploadAttachment>]: never; }>(object: I_1): UploadAttachment;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
