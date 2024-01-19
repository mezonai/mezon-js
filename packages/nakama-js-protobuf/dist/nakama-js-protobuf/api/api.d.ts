import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "nakama.api";
/** The Nakama server RPC protocol for games and apps. */
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
    /** The OAuth token received from a Facebook Instant Game that may be decoded with the Application Secret (must be available with the nakama configuration) */
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
    /** The content payload. */
    content: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated. */
    update_time: Date | undefined;
    /** True if the message was persisted to the channel's history, false otherwise. */
    persistent: boolean | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    room_name: string;
    /** The ID of the group, or an empty string if this message was not sent through a group channel. */
    group_id: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
}
/** last seen message seen by users */
export interface LastSeenMessageRequest {
    /** The unique ID of this channel. */
    channel_id: string;
    /** The unique ID of this message. */
    message_id: string;
}
/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
    /** A list of messages. */
    messages: ChannelMessage[];
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
/** Delete a leaderboard record. */
export interface DeleteLeaderboardRecordRequest {
    /** The leaderboard ID to delete from. */
    leaderboard_id: string;
}
/** Delete one or more notifications for the current user. */
export interface DeleteNotificationsRequest {
    /** The id of notifications. */
    ids: string[];
}
/** Delete a leaderboard record. */
export interface DeleteTournamentRecordRequest {
    /** The tournament ID to delete from. */
    tournament_id: string;
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
/** Fetch a subscription by product id. */
export interface GetSubscriptionRequest {
    /** Product id of the subscription */
    product_id: string;
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
/** A leaderboard on the server. */
export interface Leaderboard {
    /** The ID of the leaderboard. */
    id: string;
    /** ASC(0) or DESC(1) sort mode of scores in the leaderboard. */
    sort_order: number;
    /** BEST, SET, INCREMENT or DECREMENT operator mode of the leaderboard. */
    operator: Operator;
    /** The UNIX time when the leaderboard was previously reset. A computed value. */
    prev_reset: number;
    /** The UNIX time when the leaderboard is next playable. A computed value. */
    next_reset: number;
    /** Additional information stored as a JSON object. */
    metadata: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard was created. */
    create_time: Date | undefined;
    /** Whether the leaderboard was created authoritatively or not. */
    authoritative: boolean;
}
/** A list of leaderboards */
export interface LeaderboardList {
    /** The list of leaderboards returned. */
    leaderboards: Leaderboard[];
    /** A pagination cursor (optional). */
    cursor: string;
}
/** Represents a complete leaderboard record with all scores and associated metadata. */
export interface LeaderboardRecord {
    /** The ID of the leaderboard this score belongs to. */
    leaderboard_id: string;
    /** The ID of the score owner, usually a user or group. */
    owner_id: string;
    /** The username of the score owner, if the owner is a user. */
    username: string | undefined;
    /** The score value. */
    score: number;
    /** An optional subscore value. */
    subscore: number;
    /** The number of submissions to this score record. */
    num_score: number;
    /** Metadata. */
    metadata: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record was updated. */
    update_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record expires. */
    expiry_time: Date | undefined;
    /** The rank of this record. */
    rank: number;
    /** The maximum number of score updates allowed by the owner. */
    max_num_score: number;
}
/** A set of leaderboard records, may be part of a leaderboard records page or a batch of individual records. */
export interface LeaderboardRecordList {
    /** A list of leaderboard records. */
    records: LeaderboardRecord[];
    /** A batched set of leaderboard records belonging to specified owners. */
    owner_records: LeaderboardRecord[];
    /** The cursor to send when retrieving the next page, if any. */
    next_cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
    /** The total number of ranks available. */
    rank_count: number;
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
/** List leaerboard records from a given leaderboard around the owner. */
export interface ListLeaderboardRecordsAroundOwnerRequest {
    /** The ID of the tournament to list for. */
    leaderboard_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The owner to retrieve records around. */
    owner_id: string;
    /** Expiry in seconds (since epoch) to begin fetching records from. */
    expiry: number | undefined;
    /** A next or previous page cursor. */
    cursor: string;
}
/** List leaderboard records from a given leaderboard. */
export interface ListLeaderboardRecordsRequest {
    /** The ID of the leaderboard to list for. */
    leaderboard_id: string;
    /** One or more owners to retrieve records for. */
    owner_ids: string[];
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** A next or previous page cursor. */
    cursor: string;
    /** Expiry in seconds (since epoch) to begin fetching records from. Optional. 0 means from current time. */
    expiry: number | undefined;
}
/** List realtime matches. */
export interface ListMatchesRequest {
    /** Limit the number of returned matches. */
    limit: number | undefined;
    /** Authoritative or relayed matches. */
    authoritative: boolean | undefined;
    /** Label filter. */
    label: string | undefined;
    /** Minimum user count. */
    min_size: number | undefined;
    /** Maximum user count. */
    max_size: number | undefined;
    /** Arbitrary label query. */
    query: string | undefined;
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
/** List user subscriptions. */
export interface ListSubscriptionsRequest {
    /** Max number of results per page */
    limit: number | undefined;
    /** Cursor to retrieve a page of records from */
    cursor: string;
}
/** List tournament records from a given tournament around the owner. */
export interface ListTournamentRecordsAroundOwnerRequest {
    /** The ID of the tournament to list for. */
    tournament_id: string;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** The owner to retrieve records around. */
    owner_id: string;
    /** Expiry in seconds (since epoch) to begin fetching records from. */
    expiry: number | undefined;
    /** A next or previous page cursor. */
    cursor: string;
}
/** List tournament records from a given tournament. */
export interface ListTournamentRecordsRequest {
    /** The ID of the tournament to list for. */
    tournament_id: string;
    /** One or more owners to retrieve records for. */
    owner_ids: string[];
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** A next or previous page cursor. */
    cursor: string;
    /** Expiry in seconds (since epoch) to begin fetching records from. */
    expiry: number | undefined;
}
/** List active/upcoming tournaments based on given filters. */
export interface ListTournamentsRequest {
    /** The start of the categories to include. Defaults to 0. */
    category_start: number | undefined;
    /** The end of the categories to include. Defaults to 128. */
    category_end: number | undefined;
    /** The start time for tournaments. Defaults to epoch. */
    start_time: number | undefined;
    /** The end time for tournaments. Defaults to +1 year from current Unix time. */
    end_time: number | undefined;
    /** Max number of records to return. Between 1 and 100. */
    limit: number | undefined;
    /** A next page cursor for listings (optional). */
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
/** Represents a realtime match. */
export interface Match {
    /** The ID of the match, can be used to join. */
    match_id: string;
    /** True if it's an server-managed authoritative match, false otherwise. */
    authoritative: boolean;
    /** Match label, if any. */
    label: string | undefined;
    /** Current number of users in the match. */
    size: number;
    /** Tick Rate */
    tick_rate: number;
    /** Handler name */
    handler_name: string;
}
/** A list of realtime matches. */
export interface MatchList {
    /** A number of matches corresponding to a list operation. */
    matches: Match[];
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
/** A tournament on the server. */
export interface Tournament {
    /** The ID of the tournament. */
    id: string;
    /** The title for the tournament. */
    title: string;
    /** The description of the tournament. May be blank. */
    description: string;
    /** The category of the tournament. e.g. "vip" could be category 1. */
    category: number;
    /** ASC (0) or DESC (1) sort mode of scores in the tournament. */
    sort_order: number;
    /** The current number of players in the tournament. */
    size: number;
    /** The maximum number of players for the tournament. */
    max_size: number;
    /** The maximum score updates allowed per player for the current tournament. */
    max_num_score: number;
    /** True if the tournament is active and can enter. A computed value. */
    can_enter: boolean;
    /** The UNIX time when the tournament stops being active until next reset. A computed value. */
    end_active: number;
    /** The UNIX time when the tournament is next playable. A computed value. */
    next_reset: number;
    /** Additional information stored as a JSON object. */
    metadata: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the tournament was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the tournament will start. */
    start_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the tournament will be stopped. */
    end_time: Date | undefined;
    /** Duration of the tournament in seconds. */
    duration: number;
    /** The UNIX time when the tournament start being active. A computed value. */
    start_active: number;
    /** The UNIX time when the tournament was last reset. A computed value. */
    prev_reset: number;
    /** Operator. */
    operator: Operator;
    /** Whether the leaderboard was created authoritatively or not. */
    authoritative: boolean;
}
/** A list of tournaments. */
export interface TournamentList {
    /** The list of tournaments returned. */
    tournaments: Tournament[];
    /** A pagination cursor (optional). */
    cursor: string;
}
/** A set of tournament records which may be part of a tournament records page or a batch of individual records. */
export interface TournamentRecordList {
    /** A list of tournament records. */
    records: LeaderboardRecord[];
    /** A batched set of tournament records belonging to specified owners. */
    owner_records: LeaderboardRecord[];
    /** The cursor to send when retireving the next page (optional). */
    next_cursor: string;
    /** The cursor to send when retrieving the previous page (optional). */
    prev_cursor: string;
    /** The total number of ranks available. */
    rank_count: number;
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
    /** The Facebook Instant Game ID in the user's account. */
    facebook_instant_game_id: string;
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
/** Apple IAP Purchases validation request */
export interface ValidatePurchaseAppleRequest {
    /** Base64 encoded Apple receipt data payload. */
    receipt: string;
    /** Persist the purchase */
    persist: boolean | undefined;
}
/** Apple Subscription validation request */
export interface ValidateSubscriptionAppleRequest {
    /** Base64 encoded Apple receipt data payload. */
    receipt: string;
    /** Persist the subscription. */
    persist: boolean | undefined;
}
/** Google IAP Purchase validation request */
export interface ValidatePurchaseGoogleRequest {
    /** JSON encoded Google purchase payload. */
    purchase: string;
    /** Persist the purchase */
    persist: boolean | undefined;
}
/** Google Subscription validation request */
export interface ValidateSubscriptionGoogleRequest {
    /** JSON encoded Google purchase payload. */
    receipt: string;
    /** Persist the subscription. */
    persist: boolean | undefined;
}
/** Huawei IAP Purchase validation request */
export interface ValidatePurchaseHuaweiRequest {
    /** JSON encoded Huawei InAppPurchaseData. */
    purchase: string;
    /** InAppPurchaseData signature. */
    signature: string;
    /** Persist the purchase */
    persist: boolean | undefined;
}
/** Facebook Instant IAP Purchase validation request */
export interface ValidatePurchaseFacebookInstantRequest {
    /** Base64 encoded Facebook Instant signedRequest receipt data payload. */
    signed_request: string;
    /** Persist the purchase */
    persist: boolean | undefined;
}
/** Validated Purchase stored by Nakama. */
export interface ValidatedPurchase {
    /** Purchase User ID. */
    user_id: string;
    /** Purchase Product ID. */
    product_id: string;
    /** Purchase Transaction ID. */
    transaction_id: string;
    /** Store identifier */
    store: StoreProvider;
    /** Timestamp when the purchase was done. */
    purchase_time: Date | undefined;
    /** Timestamp when the receipt validation was stored in DB. */
    create_time: Date | undefined;
    /** Timestamp when the receipt validation was updated in DB. */
    update_time: Date | undefined;
    /** Timestamp when the purchase was refunded. Set to UNIX */
    refund_time: Date | undefined;
    /** Raw provider validation response. */
    provider_response: string;
    /** Whether the purchase was done in production or sandbox environment. */
    environment: StoreEnvironment;
    /** Whether the purchase had already been validated by Nakama before. */
    seen_before: boolean;
}
/** Validate IAP response. */
export interface ValidatePurchaseResponse {
    /** Newly seen validated purchases. */
    validated_purchases: ValidatedPurchase[];
}
/** Validate Subscription response. */
export interface ValidateSubscriptionResponse {
    validated_subscription: ValidatedSubscription | undefined;
}
export interface ValidatedSubscription {
    /** Subscription User ID. */
    user_id: string;
    /** Purchase Product ID. */
    product_id: string;
    /** Purchase Original transaction ID (we only keep track of the original subscription, not subsequent renewals). */
    original_transaction_id: string;
    /** Store identifier */
    store: StoreProvider;
    /** UNIX Timestamp when the purchase was done. */
    purchase_time: Date | undefined;
    /** UNIX Timestamp when the receipt validation was stored in DB. */
    create_time: Date | undefined;
    /** UNIX Timestamp when the receipt validation was updated in DB. */
    update_time: Date | undefined;
    /** Whether the purchase was done in production or sandbox environment. */
    environment: StoreEnvironment;
    /** Subscription expiration time. The subscription can still be auto-renewed to extend the expiration time further. */
    expiry_time: Date | undefined;
    /** Subscription refund time. If this time is set, the subscription was refunded. */
    refund_time: Date | undefined;
    /** Raw provider validation response body. */
    provider_response: string;
    /** Raw provider notification body. */
    provider_notification: string;
    /** Whether the subscription is currently active or not. */
    active: boolean;
}
/** A list of validated purchases stored by Nakama. */
export interface PurchaseList {
    /** Stored validated purchases. */
    validated_purchases: ValidatedPurchase[];
    /** The cursor to send when retrieving the next page, if any. */
    cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
}
/** A list of validated subscriptions stored by Nakama. */
export interface SubscriptionList {
    /** Stored validated subscriptions. */
    validated_subscriptions: ValidatedSubscription[];
    /** The cursor to send when retrieving the next page, if any. */
    cursor: string;
    /** The cursor to send when retrieving the previous page, if any. */
    prev_cursor: string;
}
/** A request to submit a score to a leaderboard. */
export interface WriteLeaderboardRecordRequest {
    /** The ID of the leaderboard to write to. */
    leaderboard_id: string;
    /** Record input. */
    record: WriteLeaderboardRecordRequest_LeaderboardRecordWrite | undefined;
}
/** Record values to write. */
export interface WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    /** The score value to submit. */
    score: number;
    /** An optional secondary value. */
    subscore: number;
    /** Optional record metadata. */
    metadata: string;
    /** Operator override. */
    operator: Operator;
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
    creator_id: string;
    category_id: string;
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
    /** creator ID. */
    creator_id: string;
    /** The channel lable */
    channel_lable: string;
    /** The channel private */
    channel_private: number;
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
export interface KickChannelUsersRequest {
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        room_name?: string | undefined;
        group_id?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        room_name?: string | undefined;
        group_id?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelMessage>]: never; }>(base?: I | undefined): ChannelMessage;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        room_name?: string | undefined;
        group_id?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        sender_id?: string | undefined;
        username?: string | undefined;
        content?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        room_name?: string | undefined;
        group_id?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelMessage>]: never; }>(object: I_1): ChannelMessage;
};
export declare const LastSeenMessageRequest: {
    encode(message: LastSeenMessageRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LastSeenMessageRequest;
    fromJSON(object: any): LastSeenMessageRequest;
    toJSON(message: LastSeenMessageRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        message_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
        message_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof LastSeenMessageRequest>]: never; }>(base?: I | undefined): LastSeenMessageRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        message_id?: string | undefined;
    } & {
        channel_id?: string | undefined;
        message_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LastSeenMessageRequest>]: never; }>(object: I_1): LastSeenMessageRequest;
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
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[] | undefined;
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
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[] & ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K in Exclude<keyof I["messages"][number], keyof ChannelMessage>]: never; })[] & { [K_1 in Exclude<keyof I["messages"], keyof {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[]>]: never; }) | undefined;
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
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[] | undefined;
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
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[] & ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["messages"][number], keyof ChannelMessage>]: never; })[] & { [K_4 in Exclude<keyof I_1["messages"], keyof {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            room_name?: string | undefined;
            group_id?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        }[]>]: never; }) | undefined;
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
export declare const DeleteLeaderboardRecordRequest: {
    encode(message: DeleteLeaderboardRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteLeaderboardRecordRequest;
    fromJSON(object: any): DeleteLeaderboardRecordRequest;
    toJSON(message: DeleteLeaderboardRecordRequest): unknown;
    create<I extends {
        leaderboard_id?: string | undefined;
    } & {
        leaderboard_id?: string | undefined;
    } & { [K in Exclude<keyof I, "leaderboard_id">]: never; }>(base?: I | undefined): DeleteLeaderboardRecordRequest;
    fromPartial<I_1 extends {
        leaderboard_id?: string | undefined;
    } & {
        leaderboard_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "leaderboard_id">]: never; }>(object: I_1): DeleteLeaderboardRecordRequest;
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
export declare const DeleteTournamentRecordRequest: {
    encode(message: DeleteTournamentRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTournamentRecordRequest;
    fromJSON(object: any): DeleteTournamentRecordRequest;
    toJSON(message: DeleteTournamentRecordRequest): unknown;
    create<I extends {
        tournament_id?: string | undefined;
    } & {
        tournament_id?: string | undefined;
    } & { [K in Exclude<keyof I, "tournament_id">]: never; }>(base?: I | undefined): DeleteTournamentRecordRequest;
    fromPartial<I_1 extends {
        tournament_id?: string | undefined;
    } & {
        tournament_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "tournament_id">]: never; }>(object: I_1): DeleteTournamentRecordRequest;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
export declare const GetSubscriptionRequest: {
    encode(message: GetSubscriptionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetSubscriptionRequest;
    fromJSON(object: any): GetSubscriptionRequest;
    toJSON(message: GetSubscriptionRequest): unknown;
    create<I extends {
        product_id?: string | undefined;
    } & {
        product_id?: string | undefined;
    } & { [K in Exclude<keyof I, "product_id">]: never; }>(base?: I | undefined): GetSubscriptionRequest;
    fromPartial<I_1 extends {
        product_id?: string | undefined;
    } & {
        product_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "product_id">]: never; }>(object: I_1): GetSubscriptionRequest;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
                facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
            apple_id?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["user"], keyof User>]: never; }) | undefined;
        state?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof GroupUserList_GroupUser>]: never; }>(object: I_1): GroupUserList_GroupUser;
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
export declare const Leaderboard: {
    encode(message: Leaderboard, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Leaderboard;
    fromJSON(object: any): Leaderboard;
    toJSON(message: Leaderboard): unknown;
    create<I extends {
        id?: string | undefined;
        sort_order?: number | undefined;
        operator?: Operator | undefined;
        prev_reset?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        authoritative?: boolean | undefined;
    } & {
        id?: string | undefined;
        sort_order?: number | undefined;
        operator?: Operator | undefined;
        prev_reset?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        authoritative?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof Leaderboard>]: never; }>(base?: I | undefined): Leaderboard;
    fromPartial<I_1 extends {
        id?: string | undefined;
        sort_order?: number | undefined;
        operator?: Operator | undefined;
        prev_reset?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        authoritative?: boolean | undefined;
    } & {
        id?: string | undefined;
        sort_order?: number | undefined;
        operator?: Operator | undefined;
        prev_reset?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        authoritative?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Leaderboard>]: never; }>(object: I_1): Leaderboard;
};
export declare const LeaderboardList: {
    encode(message: LeaderboardList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardList;
    fromJSON(object: any): LeaderboardList;
    toJSON(message: LeaderboardList): unknown;
    create<I extends {
        leaderboards?: {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        leaderboards?: ({
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        } & {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        } & { [K in Exclude<keyof I["leaderboards"][number], keyof Leaderboard>]: never; })[] & { [K_1 in Exclude<keyof I["leaderboards"], keyof {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof LeaderboardList>]: never; }>(base?: I | undefined): LeaderboardList;
    fromPartial<I_1 extends {
        leaderboards?: {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        leaderboards?: ({
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        } & {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["leaderboards"][number], keyof Leaderboard>]: never; })[] & { [K_4 in Exclude<keyof I_1["leaderboards"], keyof {
            id?: string | undefined;
            sort_order?: number | undefined;
            operator?: Operator | undefined;
            prev_reset?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            authoritative?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof LeaderboardList>]: never; }>(object: I_1): LeaderboardList;
};
export declare const LeaderboardRecord: {
    encode(message: LeaderboardRecord, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRecord;
    fromJSON(object: any): LeaderboardRecord;
    toJSON(message: LeaderboardRecord): unknown;
    create<I extends {
        leaderboard_id?: string | undefined;
        owner_id?: string | undefined;
        username?: string | undefined;
        score?: number | undefined;
        subscore?: number | undefined;
        num_score?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        expiry_time?: Date | undefined;
        rank?: number | undefined;
        max_num_score?: number | undefined;
    } & {
        leaderboard_id?: string | undefined;
        owner_id?: string | undefined;
        username?: string | undefined;
        score?: number | undefined;
        subscore?: number | undefined;
        num_score?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        expiry_time?: Date | undefined;
        rank?: number | undefined;
        max_num_score?: number | undefined;
    } & { [K in Exclude<keyof I, keyof LeaderboardRecord>]: never; }>(base?: I | undefined): LeaderboardRecord;
    fromPartial<I_1 extends {
        leaderboard_id?: string | undefined;
        owner_id?: string | undefined;
        username?: string | undefined;
        score?: number | undefined;
        subscore?: number | undefined;
        num_score?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        expiry_time?: Date | undefined;
        rank?: number | undefined;
        max_num_score?: number | undefined;
    } & {
        leaderboard_id?: string | undefined;
        owner_id?: string | undefined;
        username?: string | undefined;
        score?: number | undefined;
        subscore?: number | undefined;
        num_score?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        expiry_time?: Date | undefined;
        rank?: number | undefined;
        max_num_score?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LeaderboardRecord>]: never; }>(object: I_1): LeaderboardRecord;
};
export declare const LeaderboardRecordList: {
    encode(message: LeaderboardRecordList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRecordList;
    fromJSON(object: any): LeaderboardRecordList;
    toJSON(message: LeaderboardRecordList): unknown;
    create<I extends {
        records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        owner_records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & {
        records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K in Exclude<keyof I["records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_1 in Exclude<keyof I["records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        owner_records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_2 in Exclude<keyof I["owner_records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_3 in Exclude<keyof I["owner_records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & { [K_4 in Exclude<keyof I, keyof LeaderboardRecordList>]: never; }>(base?: I | undefined): LeaderboardRecordList;
    fromPartial<I_1 extends {
        records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        owner_records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & {
        records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_6 in Exclude<keyof I_1["records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        owner_records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_7 in Exclude<keyof I_1["owner_records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_8 in Exclude<keyof I_1["owner_records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof LeaderboardRecordList>]: never; }>(object: I_1): LeaderboardRecordList;
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
export declare const ListLeaderboardRecordsAroundOwnerRequest: {
    encode(message: ListLeaderboardRecordsAroundOwnerRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListLeaderboardRecordsAroundOwnerRequest;
    fromJSON(object: any): ListLeaderboardRecordsAroundOwnerRequest;
    toJSON(message: ListLeaderboardRecordsAroundOwnerRequest): unknown;
    create<I extends {
        leaderboard_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & {
        leaderboard_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListLeaderboardRecordsAroundOwnerRequest>]: never; }>(base?: I | undefined): ListLeaderboardRecordsAroundOwnerRequest;
    fromPartial<I_1 extends {
        leaderboard_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & {
        leaderboard_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListLeaderboardRecordsAroundOwnerRequest>]: never; }>(object: I_1): ListLeaderboardRecordsAroundOwnerRequest;
};
export declare const ListLeaderboardRecordsRequest: {
    encode(message: ListLeaderboardRecordsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListLeaderboardRecordsRequest;
    fromJSON(object: any): ListLeaderboardRecordsRequest;
    toJSON(message: ListLeaderboardRecordsRequest): unknown;
    create<I extends {
        leaderboard_id?: string | undefined;
        owner_ids?: string[] | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & {
        leaderboard_id?: string | undefined;
        owner_ids?: (string[] & string[] & { [K in Exclude<keyof I["owner_ids"], keyof string[]>]: never; }) | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ListLeaderboardRecordsRequest>]: never; }>(base?: I | undefined): ListLeaderboardRecordsRequest;
    fromPartial<I_1 extends {
        leaderboard_id?: string | undefined;
        owner_ids?: string[] | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & {
        leaderboard_id?: string | undefined;
        owner_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["owner_ids"], keyof string[]>]: never; }) | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ListLeaderboardRecordsRequest>]: never; }>(object: I_1): ListLeaderboardRecordsRequest;
};
export declare const ListMatchesRequest: {
    encode(message: ListMatchesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListMatchesRequest;
    fromJSON(object: any): ListMatchesRequest;
    toJSON(message: ListMatchesRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        min_size?: number | undefined;
        max_size?: number | undefined;
        query?: string | undefined;
    } & {
        limit?: number | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        min_size?: number | undefined;
        max_size?: number | undefined;
        query?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListMatchesRequest>]: never; }>(base?: I | undefined): ListMatchesRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        min_size?: number | undefined;
        max_size?: number | undefined;
        query?: string | undefined;
    } & {
        limit?: number | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        min_size?: number | undefined;
        max_size?: number | undefined;
        query?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListMatchesRequest>]: never; }>(object: I_1): ListMatchesRequest;
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
export declare const ListSubscriptionsRequest: {
    encode(message: ListSubscriptionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsRequest;
    fromJSON(object: any): ListSubscriptionsRequest;
    toJSON(message: ListSubscriptionsRequest): unknown;
    create<I extends {
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListSubscriptionsRequest>]: never; }>(base?: I | undefined): ListSubscriptionsRequest;
    fromPartial<I_1 extends {
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListSubscriptionsRequest>]: never; }>(object: I_1): ListSubscriptionsRequest;
};
export declare const ListTournamentRecordsAroundOwnerRequest: {
    encode(message: ListTournamentRecordsAroundOwnerRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentRecordsAroundOwnerRequest;
    fromJSON(object: any): ListTournamentRecordsAroundOwnerRequest;
    toJSON(message: ListTournamentRecordsAroundOwnerRequest): unknown;
    create<I extends {
        tournament_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & {
        tournament_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListTournamentRecordsAroundOwnerRequest>]: never; }>(base?: I | undefined): ListTournamentRecordsAroundOwnerRequest;
    fromPartial<I_1 extends {
        tournament_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & {
        tournament_id?: string | undefined;
        limit?: number | undefined;
        owner_id?: string | undefined;
        expiry?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListTournamentRecordsAroundOwnerRequest>]: never; }>(object: I_1): ListTournamentRecordsAroundOwnerRequest;
};
export declare const ListTournamentRecordsRequest: {
    encode(message: ListTournamentRecordsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentRecordsRequest;
    fromJSON(object: any): ListTournamentRecordsRequest;
    toJSON(message: ListTournamentRecordsRequest): unknown;
    create<I extends {
        tournament_id?: string | undefined;
        owner_ids?: string[] | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & {
        tournament_id?: string | undefined;
        owner_ids?: (string[] & string[] & { [K in Exclude<keyof I["owner_ids"], keyof string[]>]: never; }) | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ListTournamentRecordsRequest>]: never; }>(base?: I | undefined): ListTournamentRecordsRequest;
    fromPartial<I_1 extends {
        tournament_id?: string | undefined;
        owner_ids?: string[] | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & {
        tournament_id?: string | undefined;
        owner_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["owner_ids"], keyof string[]>]: never; }) | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
        expiry?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ListTournamentRecordsRequest>]: never; }>(object: I_1): ListTournamentRecordsRequest;
};
export declare const ListTournamentsRequest: {
    encode(message: ListTournamentsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentsRequest;
    fromJSON(object: any): ListTournamentsRequest;
    toJSON(message: ListTournamentsRequest): unknown;
    create<I extends {
        category_start?: number | undefined;
        category_end?: number | undefined;
        start_time?: number | undefined;
        end_time?: number | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        category_start?: number | undefined;
        category_end?: number | undefined;
        start_time?: number | undefined;
        end_time?: number | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListTournamentsRequest>]: never; }>(base?: I | undefined): ListTournamentsRequest;
    fromPartial<I_1 extends {
        category_start?: number | undefined;
        category_end?: number | undefined;
        start_time?: number | undefined;
        end_time?: number | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & {
        category_start?: number | undefined;
        category_end?: number | undefined;
        start_time?: number | undefined;
        end_time?: number | undefined;
        limit?: number | undefined;
        cursor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ListTournamentsRequest>]: never; }>(object: I_1): ListTournamentsRequest;
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
export declare const Match: {
    encode(message: Match, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Match;
    fromJSON(object: any): Match;
    toJSON(message: Match): unknown;
    create<I extends {
        match_id?: string | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        size?: number | undefined;
        tick_rate?: number | undefined;
        handler_name?: string | undefined;
    } & {
        match_id?: string | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        size?: number | undefined;
        tick_rate?: number | undefined;
        handler_name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Match>]: never; }>(base?: I | undefined): Match;
    fromPartial<I_1 extends {
        match_id?: string | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        size?: number | undefined;
        tick_rate?: number | undefined;
        handler_name?: string | undefined;
    } & {
        match_id?: string | undefined;
        authoritative?: boolean | undefined;
        label?: string | undefined;
        size?: number | undefined;
        tick_rate?: number | undefined;
        handler_name?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Match>]: never; }>(object: I_1): Match;
};
export declare const MatchList: {
    encode(message: MatchList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MatchList;
    fromJSON(object: any): MatchList;
    toJSON(message: MatchList): unknown;
    create<I extends {
        matches?: {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[] | undefined;
    } & {
        matches?: ({
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[] & ({
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        } & {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        } & { [K in Exclude<keyof I["matches"][number], keyof Match>]: never; })[] & { [K_1 in Exclude<keyof I["matches"], keyof {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "matches">]: never; }>(base?: I | undefined): MatchList;
    fromPartial<I_1 extends {
        matches?: {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[] | undefined;
    } & {
        matches?: ({
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[] & ({
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        } & {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["matches"][number], keyof Match>]: never; })[] & { [K_4 in Exclude<keyof I_1["matches"], keyof {
            match_id?: string | undefined;
            authoritative?: boolean | undefined;
            label?: string | undefined;
            size?: number | undefined;
            tick_rate?: number | undefined;
            handler_name?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "matches">]: never; }>(object: I_1): MatchList;
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
export declare const Tournament: {
    encode(message: Tournament, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Tournament;
    fromJSON(object: any): Tournament;
    toJSON(message: Tournament): unknown;
    create<I extends {
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        category?: number | undefined;
        sort_order?: number | undefined;
        size?: number | undefined;
        max_size?: number | undefined;
        max_num_score?: number | undefined;
        can_enter?: boolean | undefined;
        end_active?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        start_time?: Date | undefined;
        end_time?: Date | undefined;
        duration?: number | undefined;
        start_active?: number | undefined;
        prev_reset?: number | undefined;
        operator?: Operator | undefined;
        authoritative?: boolean | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        category?: number | undefined;
        sort_order?: number | undefined;
        size?: number | undefined;
        max_size?: number | undefined;
        max_num_score?: number | undefined;
        can_enter?: boolean | undefined;
        end_active?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        start_time?: Date | undefined;
        end_time?: Date | undefined;
        duration?: number | undefined;
        start_active?: number | undefined;
        prev_reset?: number | undefined;
        operator?: Operator | undefined;
        authoritative?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof Tournament>]: never; }>(base?: I | undefined): Tournament;
    fromPartial<I_1 extends {
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        category?: number | undefined;
        sort_order?: number | undefined;
        size?: number | undefined;
        max_size?: number | undefined;
        max_num_score?: number | undefined;
        can_enter?: boolean | undefined;
        end_active?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        start_time?: Date | undefined;
        end_time?: Date | undefined;
        duration?: number | undefined;
        start_active?: number | undefined;
        prev_reset?: number | undefined;
        operator?: Operator | undefined;
        authoritative?: boolean | undefined;
    } & {
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        category?: number | undefined;
        sort_order?: number | undefined;
        size?: number | undefined;
        max_size?: number | undefined;
        max_num_score?: number | undefined;
        can_enter?: boolean | undefined;
        end_active?: number | undefined;
        next_reset?: number | undefined;
        metadata?: string | undefined;
        create_time?: Date | undefined;
        start_time?: Date | undefined;
        end_time?: Date | undefined;
        duration?: number | undefined;
        start_active?: number | undefined;
        prev_reset?: number | undefined;
        operator?: Operator | undefined;
        authoritative?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Tournament>]: never; }>(object: I_1): Tournament;
};
export declare const TournamentList: {
    encode(message: TournamentList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TournamentList;
    fromJSON(object: any): TournamentList;
    toJSON(message: TournamentList): unknown;
    create<I extends {
        tournaments?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        tournaments?: ({
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        } & { [K in Exclude<keyof I["tournaments"][number], keyof Tournament>]: never; })[] & { [K_1 in Exclude<keyof I["tournaments"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof TournamentList>]: never; }>(base?: I | undefined): TournamentList;
    fromPartial<I_1 extends {
        tournaments?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
    } & {
        tournaments?: ({
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[] & ({
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        } & {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["tournaments"][number], keyof Tournament>]: never; })[] & { [K_4 in Exclude<keyof I_1["tournaments"], keyof {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            category?: number | undefined;
            sort_order?: number | undefined;
            size?: number | undefined;
            max_size?: number | undefined;
            max_num_score?: number | undefined;
            can_enter?: boolean | undefined;
            end_active?: number | undefined;
            next_reset?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            start_time?: Date | undefined;
            end_time?: Date | undefined;
            duration?: number | undefined;
            start_active?: number | undefined;
            prev_reset?: number | undefined;
            operator?: Operator | undefined;
            authoritative?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof TournamentList>]: never; }>(object: I_1): TournamentList;
};
export declare const TournamentRecordList: {
    encode(message: TournamentRecordList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TournamentRecordList;
    fromJSON(object: any): TournamentRecordList;
    toJSON(message: TournamentRecordList): unknown;
    create<I extends {
        records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        owner_records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & {
        records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K in Exclude<keyof I["records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_1 in Exclude<keyof I["records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        owner_records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_2 in Exclude<keyof I["owner_records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_3 in Exclude<keyof I["owner_records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & { [K_4 in Exclude<keyof I, keyof TournamentRecordList>]: never; }>(base?: I | undefined): TournamentRecordList;
    fromPartial<I_1 extends {
        records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        owner_records?: {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & {
        records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_6 in Exclude<keyof I_1["records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        owner_records?: ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[] & ({
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        } & { [K_7 in Exclude<keyof I_1["owner_records"][number], keyof LeaderboardRecord>]: never; })[] & { [K_8 in Exclude<keyof I_1["owner_records"], keyof {
            leaderboard_id?: string | undefined;
            owner_id?: string | undefined;
            username?: string | undefined;
            score?: number | undefined;
            subscore?: number | undefined;
            num_score?: number | undefined;
            metadata?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            expiry_time?: Date | undefined;
            rank?: number | undefined;
            max_num_score?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        rank_count?: number | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof TournamentRecordList>]: never; }>(object: I_1): TournamentRecordList;
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
        facebook_instant_game_id?: string | undefined;
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
        facebook_instant_game_id?: string | undefined;
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
        facebook_instant_game_id?: string | undefined;
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
        facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
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
            facebook_instant_game_id?: string | undefined;
            apple_id?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "users">]: never; }>(object: I_1): Users;
};
export declare const ValidatePurchaseAppleRequest: {
    encode(message: ValidatePurchaseAppleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseAppleRequest;
    fromJSON(object: any): ValidatePurchaseAppleRequest;
    toJSON(message: ValidatePurchaseAppleRequest): unknown;
    create<I extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatePurchaseAppleRequest>]: never; }>(base?: I | undefined): ValidatePurchaseAppleRequest;
    fromPartial<I_1 extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatePurchaseAppleRequest>]: never; }>(object: I_1): ValidatePurchaseAppleRequest;
};
export declare const ValidateSubscriptionAppleRequest: {
    encode(message: ValidateSubscriptionAppleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionAppleRequest;
    fromJSON(object: any): ValidateSubscriptionAppleRequest;
    toJSON(message: ValidateSubscriptionAppleRequest): unknown;
    create<I extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidateSubscriptionAppleRequest>]: never; }>(base?: I | undefined): ValidateSubscriptionAppleRequest;
    fromPartial<I_1 extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidateSubscriptionAppleRequest>]: never; }>(object: I_1): ValidateSubscriptionAppleRequest;
};
export declare const ValidatePurchaseGoogleRequest: {
    encode(message: ValidatePurchaseGoogleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseGoogleRequest;
    fromJSON(object: any): ValidatePurchaseGoogleRequest;
    toJSON(message: ValidatePurchaseGoogleRequest): unknown;
    create<I extends {
        purchase?: string | undefined;
        persist?: boolean | undefined;
    } & {
        purchase?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatePurchaseGoogleRequest>]: never; }>(base?: I | undefined): ValidatePurchaseGoogleRequest;
    fromPartial<I_1 extends {
        purchase?: string | undefined;
        persist?: boolean | undefined;
    } & {
        purchase?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatePurchaseGoogleRequest>]: never; }>(object: I_1): ValidatePurchaseGoogleRequest;
};
export declare const ValidateSubscriptionGoogleRequest: {
    encode(message: ValidateSubscriptionGoogleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionGoogleRequest;
    fromJSON(object: any): ValidateSubscriptionGoogleRequest;
    toJSON(message: ValidateSubscriptionGoogleRequest): unknown;
    create<I extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidateSubscriptionGoogleRequest>]: never; }>(base?: I | undefined): ValidateSubscriptionGoogleRequest;
    fromPartial<I_1 extends {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & {
        receipt?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidateSubscriptionGoogleRequest>]: never; }>(object: I_1): ValidateSubscriptionGoogleRequest;
};
export declare const ValidatePurchaseHuaweiRequest: {
    encode(message: ValidatePurchaseHuaweiRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseHuaweiRequest;
    fromJSON(object: any): ValidatePurchaseHuaweiRequest;
    toJSON(message: ValidatePurchaseHuaweiRequest): unknown;
    create<I extends {
        purchase?: string | undefined;
        signature?: string | undefined;
        persist?: boolean | undefined;
    } & {
        purchase?: string | undefined;
        signature?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatePurchaseHuaweiRequest>]: never; }>(base?: I | undefined): ValidatePurchaseHuaweiRequest;
    fromPartial<I_1 extends {
        purchase?: string | undefined;
        signature?: string | undefined;
        persist?: boolean | undefined;
    } & {
        purchase?: string | undefined;
        signature?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatePurchaseHuaweiRequest>]: never; }>(object: I_1): ValidatePurchaseHuaweiRequest;
};
export declare const ValidatePurchaseFacebookInstantRequest: {
    encode(message: ValidatePurchaseFacebookInstantRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseFacebookInstantRequest;
    fromJSON(object: any): ValidatePurchaseFacebookInstantRequest;
    toJSON(message: ValidatePurchaseFacebookInstantRequest): unknown;
    create<I extends {
        signed_request?: string | undefined;
        persist?: boolean | undefined;
    } & {
        signed_request?: string | undefined;
        persist?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatePurchaseFacebookInstantRequest>]: never; }>(base?: I | undefined): ValidatePurchaseFacebookInstantRequest;
    fromPartial<I_1 extends {
        signed_request?: string | undefined;
        persist?: boolean | undefined;
    } & {
        signed_request?: string | undefined;
        persist?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatePurchaseFacebookInstantRequest>]: never; }>(object: I_1): ValidatePurchaseFacebookInstantRequest;
};
export declare const ValidatedPurchase: {
    encode(message: ValidatedPurchase, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatedPurchase;
    fromJSON(object: any): ValidatedPurchase;
    toJSON(message: ValidatedPurchase): unknown;
    create<I extends {
        user_id?: string | undefined;
        product_id?: string | undefined;
        transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        environment?: StoreEnvironment | undefined;
        seen_before?: boolean | undefined;
    } & {
        user_id?: string | undefined;
        product_id?: string | undefined;
        transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        environment?: StoreEnvironment | undefined;
        seen_before?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatedPurchase>]: never; }>(base?: I | undefined): ValidatedPurchase;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        product_id?: string | undefined;
        transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        environment?: StoreEnvironment | undefined;
        seen_before?: boolean | undefined;
    } & {
        user_id?: string | undefined;
        product_id?: string | undefined;
        transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        environment?: StoreEnvironment | undefined;
        seen_before?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatedPurchase>]: never; }>(object: I_1): ValidatedPurchase;
};
export declare const ValidatePurchaseResponse: {
    encode(message: ValidatePurchaseResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseResponse;
    fromJSON(object: any): ValidatePurchaseResponse;
    toJSON(message: ValidatePurchaseResponse): unknown;
    create<I extends {
        validated_purchases?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] | undefined;
    } & {
        validated_purchases?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & { [K in Exclude<keyof I["validated_purchases"][number], keyof ValidatedPurchase>]: never; })[] & { [K_1 in Exclude<keyof I["validated_purchases"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "validated_purchases">]: never; }>(base?: I | undefined): ValidatePurchaseResponse;
    fromPartial<I_1 extends {
        validated_purchases?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] | undefined;
    } & {
        validated_purchases?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["validated_purchases"][number], keyof ValidatedPurchase>]: never; })[] & { [K_4 in Exclude<keyof I_1["validated_purchases"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "validated_purchases">]: never; }>(object: I_1): ValidatePurchaseResponse;
};
export declare const ValidateSubscriptionResponse: {
    encode(message: ValidateSubscriptionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionResponse;
    fromJSON(object: any): ValidateSubscriptionResponse;
    toJSON(message: ValidateSubscriptionResponse): unknown;
    create<I extends {
        validated_subscription?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } | undefined;
    } & {
        validated_subscription?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & { [K in Exclude<keyof I["validated_subscription"], keyof ValidatedSubscription>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "validated_subscription">]: never; }>(base?: I | undefined): ValidateSubscriptionResponse;
    fromPartial<I_1 extends {
        validated_subscription?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } | undefined;
    } & {
        validated_subscription?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I_1["validated_subscription"], keyof ValidatedSubscription>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "validated_subscription">]: never; }>(object: I_1): ValidateSubscriptionResponse;
};
export declare const ValidatedSubscription: {
    encode(message: ValidatedSubscription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatedSubscription;
    fromJSON(object: any): ValidatedSubscription;
    toJSON(message: ValidatedSubscription): unknown;
    create<I extends {
        user_id?: string | undefined;
        product_id?: string | undefined;
        original_transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        environment?: StoreEnvironment | undefined;
        expiry_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        provider_notification?: string | undefined;
        active?: boolean | undefined;
    } & {
        user_id?: string | undefined;
        product_id?: string | undefined;
        original_transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        environment?: StoreEnvironment | undefined;
        expiry_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        provider_notification?: string | undefined;
        active?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof ValidatedSubscription>]: never; }>(base?: I | undefined): ValidatedSubscription;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        product_id?: string | undefined;
        original_transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        environment?: StoreEnvironment | undefined;
        expiry_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        provider_notification?: string | undefined;
        active?: boolean | undefined;
    } & {
        user_id?: string | undefined;
        product_id?: string | undefined;
        original_transaction_id?: string | undefined;
        store?: StoreProvider | undefined;
        purchase_time?: Date | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        environment?: StoreEnvironment | undefined;
        expiry_time?: Date | undefined;
        refund_time?: Date | undefined;
        provider_response?: string | undefined;
        provider_notification?: string | undefined;
        active?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ValidatedSubscription>]: never; }>(object: I_1): ValidatedSubscription;
};
export declare const PurchaseList: {
    encode(message: PurchaseList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PurchaseList;
    fromJSON(object: any): PurchaseList;
    toJSON(message: PurchaseList): unknown;
    create<I extends {
        validated_purchases?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & {
        validated_purchases?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & { [K in Exclude<keyof I["validated_purchases"][number], keyof ValidatedPurchase>]: never; })[] & { [K_1 in Exclude<keyof I["validated_purchases"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof PurchaseList>]: never; }>(base?: I | undefined): PurchaseList;
    fromPartial<I_1 extends {
        validated_purchases?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & {
        validated_purchases?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["validated_purchases"][number], keyof ValidatedPurchase>]: never; })[] & { [K_4 in Exclude<keyof I_1["validated_purchases"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            environment?: StoreEnvironment | undefined;
            seen_before?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof PurchaseList>]: never; }>(object: I_1): PurchaseList;
};
export declare const SubscriptionList: {
    encode(message: SubscriptionList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionList;
    fromJSON(object: any): SubscriptionList;
    toJSON(message: SubscriptionList): unknown;
    create<I extends {
        validated_subscriptions?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & {
        validated_subscriptions?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & { [K in Exclude<keyof I["validated_subscriptions"][number], keyof ValidatedSubscription>]: never; })[] & { [K_1 in Exclude<keyof I["validated_subscriptions"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SubscriptionList>]: never; }>(base?: I | undefined): SubscriptionList;
    fromPartial<I_1 extends {
        validated_subscriptions?: {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[] | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & {
        validated_subscriptions?: ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[] & ({
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["validated_subscriptions"][number], keyof ValidatedSubscription>]: never; })[] & { [K_4 in Exclude<keyof I_1["validated_subscriptions"], keyof {
            user_id?: string | undefined;
            product_id?: string | undefined;
            original_transaction_id?: string | undefined;
            store?: StoreProvider | undefined;
            purchase_time?: Date | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            environment?: StoreEnvironment | undefined;
            expiry_time?: Date | undefined;
            refund_time?: Date | undefined;
            provider_response?: string | undefined;
            provider_notification?: string | undefined;
            active?: boolean | undefined;
        }[]>]: never; }) | undefined;
        cursor?: string | undefined;
        prev_cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof SubscriptionList>]: never; }>(object: I_1): SubscriptionList;
};
export declare const WriteLeaderboardRecordRequest: {
    encode(message: WriteLeaderboardRecordRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteLeaderboardRecordRequest;
    fromJSON(object: any): WriteLeaderboardRecordRequest;
    toJSON(message: WriteLeaderboardRecordRequest): unknown;
    create<I extends {
        leaderboard_id?: string | undefined;
        record?: {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } | undefined;
    } & {
        leaderboard_id?: string | undefined;
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
        } & { [K in Exclude<keyof I["record"], keyof WriteLeaderboardRecordRequest_LeaderboardRecordWrite>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof WriteLeaderboardRecordRequest>]: never; }>(base?: I | undefined): WriteLeaderboardRecordRequest;
    fromPartial<I_1 extends {
        leaderboard_id?: string | undefined;
        record?: {
            score?: number | undefined;
            subscore?: number | undefined;
            metadata?: string | undefined;
            operator?: Operator | undefined;
        } | undefined;
    } & {
        leaderboard_id?: string | undefined;
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
        } & { [K_2 in Exclude<keyof I_1["record"], keyof WriteLeaderboardRecordRequest_LeaderboardRecordWrite>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof WriteLeaderboardRecordRequest>]: never; }>(object: I_1): WriteLeaderboardRecordRequest;
};
export declare const WriteLeaderboardRecordRequest_LeaderboardRecordWrite: {
    encode(message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    fromJSON(object: any): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
    toJSON(message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite): unknown;
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
    } & { [K in Exclude<keyof I, keyof WriteLeaderboardRecordRequest_LeaderboardRecordWrite>]: never; }>(base?: I | undefined): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
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
    } & { [K_1 in Exclude<keyof I_1, keyof WriteLeaderboardRecordRequest_LeaderboardRecordWrite>]: never; }>(object: I_1): WriteLeaderboardRecordRequest_LeaderboardRecordWrite;
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
        creator_id?: string | undefined;
        category_id?: string | undefined;
    } & {
        category_name?: string | undefined;
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        category_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CreateCategoryDescRequest>]: never; }>(base?: I | undefined): CreateCategoryDescRequest;
    fromPartial<I_1 extends {
        category_name?: string | undefined;
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        category_id?: string | undefined;
    } & {
        category_name?: string | undefined;
        clan_id?: string | undefined;
        creator_id?: string | undefined;
        category_id?: string | undefined;
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
    } & { [K in Exclude<keyof I, keyof ChannelDescription>]: never; }>(base?: I | undefined): ChannelDescription;
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
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelDescription>]: never; }>(object: I_1): ChannelDescription;
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
        } & { [K in Exclude<keyof I["channeldesc"][number], keyof ChannelDescription>]: never; })[] & { [K_1 in Exclude<keyof I["channeldesc"], keyof {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ChannelDescList>]: never; }>(base?: I | undefined): ChannelDescList;
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
        } & { [K_3 in Exclude<keyof I_1["channeldesc"][number], keyof ChannelDescription>]: never; })[] & { [K_4 in Exclude<keyof I_1["channeldesc"], keyof {
            clan_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            category_id?: string | undefined;
            category_name?: string | undefined;
            type?: number | undefined;
            creator_id?: string | undefined;
            channel_lable?: string | undefined;
            channel_private?: number | undefined;
        }[]>]: never; }) | undefined;
        next_cursor?: string | undefined;
        prev_cursor?: string | undefined;
        cacheable_cursor?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ChannelDescList>]: never; }>(object: I_1): ChannelDescList;
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
    } & {
        limit?: number | undefined;
        state?: number | undefined;
        cursor?: string | undefined;
        clan_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ListChannelDescsRequest>]: never; }>(base?: I | undefined): ListChannelDescsRequest;
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
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
    } & { [K in Exclude<keyof I, keyof CreateChannelDescRequest>]: never; }>(base?: I | undefined): CreateChannelDescRequest;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
    } & {
        clan_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        category_id?: string | undefined;
        type?: number | undefined;
        creator_id?: string | undefined;
        channel_lable?: string | undefined;
        channel_private?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CreateChannelDescRequest>]: never; }>(object: I_1): CreateChannelDescRequest;
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
export declare const KickChannelUsersRequest: {
    encode(message: KickChannelUsersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): KickChannelUsersRequest;
    fromJSON(object: any): KickChannelUsersRequest;
    toJSON(message: KickChannelUsersRequest): unknown;
    create<I extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof KickChannelUsersRequest>]: never; }>(base?: I | undefined): KickChannelUsersRequest;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        user_ids?: string[] | undefined;
    } & {
        channel_id?: string | undefined;
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof KickChannelUsersRequest>]: never; }>(object: I_1): KickChannelUsersRequest;
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
