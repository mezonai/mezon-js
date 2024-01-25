/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { BoolValue, Int32Value, Int64Value, StringValue, UInt32Value } from "../google/protobuf/wrappers";

export const protobufPackage = "nakama.api";

/** The Nakama server RPC protocol for games and apps. */

/** Validation Provider, */
export enum StoreProvider {
  /** APPLE_APP_STORE - Apple App Store */
  APPLE_APP_STORE = 0,
  /** GOOGLE_PLAY_STORE - Google Play Store */
  GOOGLE_PLAY_STORE = 1,
  /** HUAWEI_APP_GALLERY - Huawei App Gallery */
  HUAWEI_APP_GALLERY = 2,
  /** FACEBOOK_INSTANT_STORE - Facebook Instant Store */
  FACEBOOK_INSTANT_STORE = 3,
  UNRECOGNIZED = -1,
}

export function storeProviderFromJSON(object: any): StoreProvider {
  switch (object) {
    case 0:
    case "APPLE_APP_STORE":
      return StoreProvider.APPLE_APP_STORE;
    case 1:
    case "GOOGLE_PLAY_STORE":
      return StoreProvider.GOOGLE_PLAY_STORE;
    case 2:
    case "HUAWEI_APP_GALLERY":
      return StoreProvider.HUAWEI_APP_GALLERY;
    case 3:
    case "FACEBOOK_INSTANT_STORE":
      return StoreProvider.FACEBOOK_INSTANT_STORE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StoreProvider.UNRECOGNIZED;
  }
}

export function storeProviderToJSON(object: StoreProvider): string {
  switch (object) {
    case StoreProvider.APPLE_APP_STORE:
      return "APPLE_APP_STORE";
    case StoreProvider.GOOGLE_PLAY_STORE:
      return "GOOGLE_PLAY_STORE";
    case StoreProvider.HUAWEI_APP_GALLERY:
      return "HUAWEI_APP_GALLERY";
    case StoreProvider.FACEBOOK_INSTANT_STORE:
      return "FACEBOOK_INSTANT_STORE";
    case StoreProvider.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Environment where a purchase/subscription took place, */
export enum StoreEnvironment {
  /** UNKNOWN - Unknown environment. */
  UNKNOWN = 0,
  /** SANDBOX - Sandbox/test environment. */
  SANDBOX = 1,
  /** PRODUCTION - Production environment. */
  PRODUCTION = 2,
  UNRECOGNIZED = -1,
}

export function storeEnvironmentFromJSON(object: any): StoreEnvironment {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return StoreEnvironment.UNKNOWN;
    case 1:
    case "SANDBOX":
      return StoreEnvironment.SANDBOX;
    case 2:
    case "PRODUCTION":
      return StoreEnvironment.PRODUCTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StoreEnvironment.UNRECOGNIZED;
  }
}

export function storeEnvironmentToJSON(object: StoreEnvironment): string {
  switch (object) {
    case StoreEnvironment.UNKNOWN:
      return "UNKNOWN";
    case StoreEnvironment.SANDBOX:
      return "SANDBOX";
    case StoreEnvironment.PRODUCTION:
      return "PRODUCTION";
    case StoreEnvironment.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Operator that can be used to override the one set in the leaderboard. */
export enum Operator {
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
  UNRECOGNIZED = -1,
}

export function operatorFromJSON(object: any): Operator {
  switch (object) {
    case 0:
    case "NO_OVERRIDE":
      return Operator.NO_OVERRIDE;
    case 1:
    case "BEST":
      return Operator.BEST;
    case 2:
    case "SET":
      return Operator.SET;
    case 3:
    case "INCREMENT":
      return Operator.INCREMENT;
    case 4:
    case "DECREMENT":
      return Operator.DECREMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Operator.UNRECOGNIZED;
  }
}

export function operatorToJSON(object: Operator): string {
  switch (object) {
    case Operator.NO_OVERRIDE:
      return "NO_OVERRIDE";
    case Operator.BEST:
      return "BEST";
    case Operator.SET:
      return "SET";
    case Operator.INCREMENT:
      return "INCREMENT";
    case Operator.DECREMENT:
      return "DECREMENT";
    case Operator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A user with additional account details. Always the current user. */
export interface Account {
  /** The user object. */
  user:
    | User
    | undefined;
  /** The user's wallet data. */
  wallet: string;
  /** The email address of the user. */
  email: string;
  /** The devices which belong to the user's account. */
  devices: AccountDevice[];
  /** The custom id in the user's account. */
  custom_id: string;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's email was verified. */
  verify_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's account was disabled/banned. */
  disable_time: Date | undefined;
}

/** Obtain a new authentication token using a refresh token. */
export interface AccountRefresh {
  /** Refresh token. */
  token: string;
  /** Extra information that will be bundled in the session token. */
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  vars: { [key: string]: string };
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
  account:
    | AccountApple
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with a custom ID. */
export interface AuthenticateCustomRequest {
  /** The custom account details. */
  account:
    | AccountCustom
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with a device ID. */
export interface AuthenticateDeviceRequest {
  /** The device account details. */
  account:
    | AccountDevice
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with email+password. */
export interface AuthenticateEmailRequest {
  /** The email account details. */
  account:
    | AccountEmail
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Facebook. */
export interface AuthenticateFacebookRequest {
  /** The Facebook account details. */
  account:
    | AccountFacebook
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
  /** Import Facebook friends for the user. */
  sync: boolean | undefined;
}

/** Authenticate against the server with Facebook Instant Game token. */
export interface AuthenticateFacebookInstantGameRequest {
  /** The Facebook Instant Game account details. */
  account:
    | AccountFacebookInstantGame
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Apple's Game Center. */
export interface AuthenticateGameCenterRequest {
  /** The Game Center account details. */
  account:
    | AccountGameCenter
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Google. */
export interface AuthenticateGoogleRequest {
  /** The Google account details. */
  account:
    | AccountGoogle
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
  /** Set the username on the account at register. Must be unique. */
  username: string;
}

/** Authenticate against the server with Steam. */
export interface AuthenticateSteamRequest {
  /** The Steam account details. */
  account:
    | AccountSteam
    | undefined;
  /** Register the account if the user does not already exist. */
  create:
    | boolean
    | undefined;
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
  code:
    | number
    | undefined;
  /** Message sender, usually a user ID. */
  sender_id: string;
  /** The username of the message sender, if any. */
  username: string;
  /** The content payload. */
  content: string;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
  create_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated. */
  update_time:
    | Date
    | undefined;
  /** True if the message was persisted to the channel's history, false otherwise. */
  persistent:
    | boolean
    | undefined;
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
  properties: { [key: string]: string };
  /** The time when the event was triggered. */
  timestamp:
    | Date
    | undefined;
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
  user:
    | User
    | undefined;
  /** The friend status. */
  state:
    | number
    | undefined;
  /** Time of the latest relationship update. */
  update_time: Date | undefined;
}

/** The friendship status. */
export enum Friend_State {
  /** FRIEND - The user is a friend of the current user. */
  FRIEND = 0,
  /** INVITE_SENT - The current user has sent an invite to the user. */
  INVITE_SENT = 1,
  /** INVITE_RECEIVED - The current user has received an invite from this user. */
  INVITE_RECEIVED = 2,
  /** BLOCKED - The current user has blocked this user. */
  BLOCKED = 3,
  UNRECOGNIZED = -1,
}

export function friend_StateFromJSON(object: any): Friend_State {
  switch (object) {
    case 0:
    case "FRIEND":
      return Friend_State.FRIEND;
    case 1:
    case "INVITE_SENT":
      return Friend_State.INVITE_SENT;
    case 2:
    case "INVITE_RECEIVED":
      return Friend_State.INVITE_RECEIVED;
    case 3:
    case "BLOCKED":
      return Friend_State.BLOCKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Friend_State.UNRECOGNIZED;
  }
}

export function friend_StateToJSON(object: Friend_State): string {
  switch (object) {
    case Friend_State.FRIEND:
      return "FRIEND";
    case Friend_State.INVITE_SENT:
      return "INVITE_SENT";
    case Friend_State.INVITE_RECEIVED:
      return "INVITE_RECEIVED";
    case Friend_State.BLOCKED:
      return "BLOCKED";
    case Friend_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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
  open:
    | boolean
    | undefined;
  /** The current count of all members in the group. */
  edge_count: number;
  /** The maximum number of members allowed. */
  max_count: number;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was created. */
  create_time:
    | Date
    | undefined;
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
  user:
    | User
    | undefined;
  /** Their relationship to the group. */
  state: number | undefined;
}

/** The group role status. */
export enum GroupUserList_GroupUser_State {
  /** SUPERADMIN - The user is a superadmin with full control of the group. */
  SUPERADMIN = 0,
  /** ADMIN - The user is an admin with additional privileges. */
  ADMIN = 1,
  /** MEMBER - The user is a regular member. */
  MEMBER = 2,
  /** JOIN_REQUEST - The user has requested to join the group */
  JOIN_REQUEST = 3,
  UNRECOGNIZED = -1,
}

export function groupUserList_GroupUser_StateFromJSON(object: any): GroupUserList_GroupUser_State {
  switch (object) {
    case 0:
    case "SUPERADMIN":
      return GroupUserList_GroupUser_State.SUPERADMIN;
    case 1:
    case "ADMIN":
      return GroupUserList_GroupUser_State.ADMIN;
    case 2:
    case "MEMBER":
      return GroupUserList_GroupUser_State.MEMBER;
    case 3:
    case "JOIN_REQUEST":
      return GroupUserList_GroupUser_State.JOIN_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GroupUserList_GroupUser_State.UNRECOGNIZED;
  }
}

export function groupUserList_GroupUser_StateToJSON(object: GroupUserList_GroupUser_State): string {
  switch (object) {
    case GroupUserList_GroupUser_State.SUPERADMIN:
      return "SUPERADMIN";
    case GroupUserList_GroupUser_State.ADMIN:
      return "ADMIN";
    case GroupUserList_GroupUser_State.MEMBER:
      return "MEMBER";
    case GroupUserList_GroupUser_State.JOIN_REQUEST:
      return "JOIN_REQUEST";
    case GroupUserList_GroupUser_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A list of users belonging to a channel, along with their role. */
export interface ChannelUserList {
  /** User-role pairs for a channel. */
  channel_users: ChannelUserList_ChannelUser[];
  /** Cursor for the next page of results, if any. */
  cursor: string;
}

/** A single user-role pair. */
export interface ChannelUserList_ChannelUser {
  /** User. */
  user:
    | User
    | undefined;
  /** Their relationship to the role. */
  role_id: string | undefined;
}

/** Import Facebook friends into the current user's account. */
export interface ImportFacebookFriendsRequest {
  /** The Facebook account details. */
  account:
    | AccountFacebook
    | undefined;
  /** Reset the current user's friends list. */
  reset: boolean | undefined;
}

/** Import Facebook friends into the current user's account. */
export interface ImportSteamFriendsRequest {
  /** The Facebook account details. */
  account:
    | AccountSteam
    | undefined;
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
  create_time:
    | Date
    | undefined;
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
  username:
    | string
    | undefined;
  /** The score value. */
  score: number;
  /** An optional subscore value. */
  subscore: number;
  /** The number of submissions to this score record. */
  num_score: number;
  /** Metadata. */
  metadata: string;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record was created. */
  create_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record was updated. */
  update_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the leaderboard record expires. */
  expiry_time:
    | Date
    | undefined;
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
  account:
    | AccountFacebook
    | undefined;
  /** Import Facebook friends for the user. */
  sync: boolean | undefined;
}

/** Link Steam to the current user's account. */
export interface LinkSteamRequest {
  /** The Facebook account details. */
  account:
    | AccountSteam
    | undefined;
  /** Import Steam friends for the user. */
  sync: boolean | undefined;
}

/** List a channel's message history. */
export interface ListChannelMessagesRequest {
  /** The channel ID to list from. */
  channel_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** True if listing should be older messages to newer, false if reverse. */
  forward:
    | boolean
    | undefined;
  /** A pagination cursor, if any. */
  cursor: string;
}

/** List friends for a user. */
export interface ListFriendsRequest {
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The friend state to list. */
  state:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** Language tag filter */
  lang_tag: string;
  /** Number of group members */
  members:
    | number
    | undefined;
  /** Optional Open/Closed filter. */
  open: boolean | undefined;
}

/** List all users that are part of a group. */
export interface ListGroupUsersRequest {
  /** The group ID to list from. */
  group_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The group user state to list. */
  state:
    | number
    | undefined;
  /** An optional next page cursor. */
  cursor: string;
}

/** List all users that are part of a channel. */
export interface ListChannelUsersRequest {
  /** The channel ID to list from. */
  channel_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The group user state to list. */
  state:
    | number
    | undefined;
  /** An optional next page cursor. */
  cursor: string;
}

/** List leaerboard records from a given leaderboard around the owner. */
export interface ListLeaderboardRecordsAroundOwnerRequest {
  /** The ID of the tournament to list for. */
  leaderboard_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The owner to retrieve records around. */
  owner_id: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** A next or previous page cursor. */
  cursor: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. Optional. 0 means from current time. */
  expiry: number | undefined;
}

/** List realtime matches. */
export interface ListMatchesRequest {
  /** Limit the number of returned matches. */
  limit:
    | number
    | undefined;
  /** Authoritative or relayed matches. */
  authoritative:
    | boolean
    | undefined;
  /** Label filter. */
  label:
    | string
    | undefined;
  /** Minimum user count. */
  min_size:
    | number
    | undefined;
  /** Maximum user count. */
  max_size:
    | number
    | undefined;
  /** Arbitrary label query. */
  query: string | undefined;
}

/** Get a list of unexpired notifications. */
export interface ListNotificationsRequest {
  /** The number of notifications to get. Between 1 and 100. */
  limit:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** The cursor to page through results from. */
  cursor: string;
}

/** List user subscriptions. */
export interface ListSubscriptionsRequest {
  /** Max number of results per page */
  limit:
    | number
    | undefined;
  /** Cursor to retrieve a page of records from */
  cursor: string;
}

/** List tournament records from a given tournament around the owner. */
export interface ListTournamentRecordsAroundOwnerRequest {
  /** The ID of the tournament to list for. */
  tournament_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The owner to retrieve records around. */
  owner_id: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** A next or previous page cursor. */
  cursor: string;
  /** Expiry in seconds (since epoch) to begin fetching records from. */
  expiry: number | undefined;
}

/** List active/upcoming tournaments based on given filters. */
export interface ListTournamentsRequest {
  /** The start of the categories to include. Defaults to 0. */
  category_start:
    | number
    | undefined;
  /** The end of the categories to include. Defaults to 128. */
  category_end:
    | number
    | undefined;
  /** The start time for tournaments. Defaults to epoch. */
  start_time:
    | number
    | undefined;
  /** The end time for tournaments. Defaults to +1 year from current Unix time. */
  end_time:
    | number
    | undefined;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** A next page cursor for listings (optional). */
  cursor: string;
}

/** List the groups a user is part of, and their relationship to each. */
export interface ListUserGroupsRequest {
  /** ID of the user. */
  user_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The user group state to list. */
  state:
    | number
    | undefined;
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
  label:
    | string
    | undefined;
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
  create_time:
    | Date
    | undefined;
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
  create_time:
    | Date
    | undefined;
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
  create_time:
    | Date
    | undefined;
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
  create_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the tournament will start. */
  start_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the tournament will be stopped. */
  end_time:
    | Date
    | undefined;
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
  username:
    | string
    | undefined;
  /** The display name of the user. */
  display_name:
    | string
    | undefined;
  /** A URL for an avatar image. */
  avatar_url:
    | string
    | undefined;
  /** The language expected to be a tag which follows the BCP-47 spec. */
  lang_tag:
    | string
    | undefined;
  /** The location set by the user. */
  location:
    | string
    | undefined;
  /** The timezone set by the user. */
  timezone: string | undefined;
}

/** Update fields in a given group. */
export interface UpdateGroupRequest {
  /** The ID of the group to update. */
  group_id: string;
  /** Name. */
  name:
    | string
    | undefined;
  /** Description string. */
  description:
    | string
    | undefined;
  /** Lang tag. */
  lang_tag:
    | string
    | undefined;
  /** Avatar URL. */
  avatar_url:
    | string
    | undefined;
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
  create_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated. */
  update_time:
    | Date
    | undefined;
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
  group:
    | Group
    | undefined;
  /** The user's relationship to the group. */
  state: number | undefined;
}

/** The group role status. */
export enum UserGroupList_UserGroup_State {
  /** SUPERADMIN - The user is a superadmin with full control of the group. */
  SUPERADMIN = 0,
  /** ADMIN - The user is an admin with additional privileges. */
  ADMIN = 1,
  /** MEMBER - The user is a regular member. */
  MEMBER = 2,
  /** JOIN_REQUEST - The user has requested to join the group */
  JOIN_REQUEST = 3,
  UNRECOGNIZED = -1,
}

export function userGroupList_UserGroup_StateFromJSON(object: any): UserGroupList_UserGroup_State {
  switch (object) {
    case 0:
    case "SUPERADMIN":
      return UserGroupList_UserGroup_State.SUPERADMIN;
    case 1:
    case "ADMIN":
      return UserGroupList_UserGroup_State.ADMIN;
    case 2:
    case "MEMBER":
      return UserGroupList_UserGroup_State.MEMBER;
    case 3:
    case "JOIN_REQUEST":
      return UserGroupList_UserGroup_State.JOIN_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserGroupList_UserGroup_State.UNRECOGNIZED;
  }
}

export function userGroupList_UserGroup_StateToJSON(object: UserGroupList_UserGroup_State): string {
  switch (object) {
    case UserGroupList_UserGroup_State.SUPERADMIN:
      return "SUPERADMIN";
    case UserGroupList_UserGroup_State.ADMIN:
      return "ADMIN";
    case UserGroupList_UserGroup_State.MEMBER:
      return "MEMBER";
    case UserGroupList_UserGroup_State.JOIN_REQUEST:
      return "JOIN_REQUEST";
    case UserGroupList_UserGroup_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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
  purchase_time:
    | Date
    | undefined;
  /** Timestamp when the receipt validation was stored in DB. */
  create_time:
    | Date
    | undefined;
  /** Timestamp when the receipt validation was updated in DB. */
  update_time:
    | Date
    | undefined;
  /** Timestamp when the purchase was refunded. Set to UNIX */
  refund_time:
    | Date
    | undefined;
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
  purchase_time:
    | Date
    | undefined;
  /** UNIX Timestamp when the receipt validation was stored in DB. */
  create_time:
    | Date
    | undefined;
  /** UNIX Timestamp when the receipt validation was updated in DB. */
  update_time:
    | Date
    | undefined;
  /** Whether the purchase was done in production or sandbox environment. */
  environment: StoreEnvironment;
  /** Subscription expiration time. The subscription can still be auto-renewed to extend the expiration time further. */
  expiry_time:
    | Date
    | undefined;
  /** Subscription refund time. If this time is set, the subscription was refunded. */
  refund_time:
    | Date
    | undefined;
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
  permission_read:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** The friend state to list. */
  state:
    | number
    | undefined;
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
  create_time:
    | Date
    | undefined;
  /** expiry time */
  expiry_time: Date | undefined;
  id: string;
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
  limit:
    | number
    | undefined;
  /** The friend state to list. */
  state:
    | number
    | undefined;
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
  type:
    | number
    | undefined;
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
  limit:
    | number
    | undefined;
  /** The channel state to list. */
  state:
    | number
    | undefined;
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
  type:
    | number
    | undefined;
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
  channel_lable:
    | string
    | undefined;
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

/** List (and optionally filter) roles. */
export interface ListRolesRequest {
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** The role state to list. */
  state:
    | number
    | undefined;
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
  slug: string;
  description: string;
  clan_id: string;
  display_online: number;
  allow_mention: number;
  /** The users to add. */
  user_ids: string[];
  /** The permissions to add. */
  permission_ids: string[];
}

/** Delete a role the user has access to. */
export interface DeleteRoleRequest {
  /** The id of a role. */
  role_id: string;
}

/** Update fields in a given role. */
export interface UpdateRoleRequest {
  title: string | undefined;
  color: string | undefined;
  role_icon: string | undefined;
  slug: string | undefined;
  description: string | undefined;
  display_online: number | undefined;
  allow_mention:
    | number
    | undefined;
  /** The users to add. */
  user_ids: string[];
  /** The permissions to add. */
  permission_ids: string[];
  role_id: string;
}

function createBaseAccount(): Account {
  return {
    user: undefined,
    wallet: "",
    email: "",
    devices: [],
    custom_id: "",
    verify_time: undefined,
    disable_time: undefined,
  };
}

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.wallet !== "") {
      writer.uint32(18).string(message.wallet);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    for (const v of message.devices) {
      AccountDevice.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.custom_id !== "") {
      writer.uint32(42).string(message.custom_id);
    }
    if (message.verify_time !== undefined) {
      Timestamp.encode(toTimestamp(message.verify_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.disable_time !== undefined) {
      Timestamp.encode(toTimestamp(message.disable_time), writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.wallet = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.devices.push(AccountDevice.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.custom_id = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.verify_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.disable_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      wallet: isSet(object.wallet) ? globalThis.String(object.wallet) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      devices: globalThis.Array.isArray(object?.devices)
        ? object.devices.map((e: any) => AccountDevice.fromJSON(e))
        : [],
      custom_id: isSet(object.custom_id) ? globalThis.String(object.custom_id) : "",
      verify_time: isSet(object.verify_time) ? fromJsonTimestamp(object.verify_time) : undefined,
      disable_time: isSet(object.disable_time) ? fromJsonTimestamp(object.disable_time) : undefined,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.wallet !== "") {
      obj.wallet = message.wallet;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.devices?.length) {
      obj.devices = message.devices.map((e) => AccountDevice.toJSON(e));
    }
    if (message.custom_id !== "") {
      obj.custom_id = message.custom_id;
    }
    if (message.verify_time !== undefined) {
      obj.verify_time = message.verify_time.toISOString();
    }
    if (message.disable_time !== undefined) {
      obj.disable_time = message.disable_time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
    return Account.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = createBaseAccount();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.wallet = object.wallet ?? "";
    message.email = object.email ?? "";
    message.devices = object.devices?.map((e) => AccountDevice.fromPartial(e)) || [];
    message.custom_id = object.custom_id ?? "";
    message.verify_time = object.verify_time ?? undefined;
    message.disable_time = object.disable_time ?? undefined;
    return message;
  },
};

function createBaseAccountRefresh(): AccountRefresh {
  return { token: "", vars: {} };
}

export const AccountRefresh = {
  encode(message: AccountRefresh, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountRefresh_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountRefresh {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRefresh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountRefresh_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountRefresh {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountRefresh): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountRefresh>, I>>(base?: I): AccountRefresh {
    return AccountRefresh.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountRefresh>, I>>(object: I): AccountRefresh {
    const message = createBaseAccountRefresh();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountRefresh_VarsEntry(): AccountRefresh_VarsEntry {
  return { key: "", value: "" };
}

export const AccountRefresh_VarsEntry = {
  encode(message: AccountRefresh_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountRefresh_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRefresh_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountRefresh_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountRefresh_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountRefresh_VarsEntry>, I>>(base?: I): AccountRefresh_VarsEntry {
    return AccountRefresh_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountRefresh_VarsEntry>, I>>(object: I): AccountRefresh_VarsEntry {
    const message = createBaseAccountRefresh_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountApple(): AccountApple {
  return { token: "", vars: {} };
}

export const AccountApple = {
  encode(message: AccountApple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountApple_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountApple {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountApple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountApple_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountApple {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountApple): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountApple>, I>>(base?: I): AccountApple {
    return AccountApple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountApple>, I>>(object: I): AccountApple {
    const message = createBaseAccountApple();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountApple_VarsEntry(): AccountApple_VarsEntry {
  return { key: "", value: "" };
}

export const AccountApple_VarsEntry = {
  encode(message: AccountApple_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountApple_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountApple_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountApple_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountApple_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountApple_VarsEntry>, I>>(base?: I): AccountApple_VarsEntry {
    return AccountApple_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountApple_VarsEntry>, I>>(object: I): AccountApple_VarsEntry {
    const message = createBaseAccountApple_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountCustom(): AccountCustom {
  return { id: "", vars: {} };
}

export const AccountCustom = {
  encode(message: AccountCustom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountCustom_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountCustom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountCustom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountCustom_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountCustom {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountCustom): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountCustom>, I>>(base?: I): AccountCustom {
    return AccountCustom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountCustom>, I>>(object: I): AccountCustom {
    const message = createBaseAccountCustom();
    message.id = object.id ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountCustom_VarsEntry(): AccountCustom_VarsEntry {
  return { key: "", value: "" };
}

export const AccountCustom_VarsEntry = {
  encode(message: AccountCustom_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountCustom_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountCustom_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountCustom_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountCustom_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountCustom_VarsEntry>, I>>(base?: I): AccountCustom_VarsEntry {
    return AccountCustom_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountCustom_VarsEntry>, I>>(object: I): AccountCustom_VarsEntry {
    const message = createBaseAccountCustom_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountDevice(): AccountDevice {
  return { id: "", vars: {} };
}

export const AccountDevice = {
  encode(message: AccountDevice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountDevice_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountDevice {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountDevice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountDevice_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountDevice {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountDevice): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountDevice>, I>>(base?: I): AccountDevice {
    return AccountDevice.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountDevice>, I>>(object: I): AccountDevice {
    const message = createBaseAccountDevice();
    message.id = object.id ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountDevice_VarsEntry(): AccountDevice_VarsEntry {
  return { key: "", value: "" };
}

export const AccountDevice_VarsEntry = {
  encode(message: AccountDevice_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountDevice_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountDevice_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountDevice_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountDevice_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountDevice_VarsEntry>, I>>(base?: I): AccountDevice_VarsEntry {
    return AccountDevice_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountDevice_VarsEntry>, I>>(object: I): AccountDevice_VarsEntry {
    const message = createBaseAccountDevice_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountEmail(): AccountEmail {
  return { email: "", password: "", vars: {} };
}

export const AccountEmail = {
  encode(message: AccountEmail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountEmail_VarsEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountEmail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = AccountEmail_VarsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.vars[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountEmail {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountEmail): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountEmail>, I>>(base?: I): AccountEmail {
    return AccountEmail.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountEmail>, I>>(object: I): AccountEmail {
    const message = createBaseAccountEmail();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountEmail_VarsEntry(): AccountEmail_VarsEntry {
  return { key: "", value: "" };
}

export const AccountEmail_VarsEntry = {
  encode(message: AccountEmail_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountEmail_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountEmail_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountEmail_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountEmail_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountEmail_VarsEntry>, I>>(base?: I): AccountEmail_VarsEntry {
    return AccountEmail_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountEmail_VarsEntry>, I>>(object: I): AccountEmail_VarsEntry {
    const message = createBaseAccountEmail_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountFacebook(): AccountFacebook {
  return { token: "", vars: {} };
}

export const AccountFacebook = {
  encode(message: AccountFacebook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountFacebook_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebook {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountFacebook_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountFacebook {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountFacebook): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebook>, I>>(base?: I): AccountFacebook {
    return AccountFacebook.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountFacebook>, I>>(object: I): AccountFacebook {
    const message = createBaseAccountFacebook();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountFacebook_VarsEntry(): AccountFacebook_VarsEntry {
  return { key: "", value: "" };
}

export const AccountFacebook_VarsEntry = {
  encode(message: AccountFacebook_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebook_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebook_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountFacebook_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountFacebook_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebook_VarsEntry>, I>>(base?: I): AccountFacebook_VarsEntry {
    return AccountFacebook_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountFacebook_VarsEntry>, I>>(object: I): AccountFacebook_VarsEntry {
    const message = createBaseAccountFacebook_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountFacebookInstantGame(): AccountFacebookInstantGame {
  return { signed_player_info: "", vars: {} };
}

export const AccountFacebookInstantGame = {
  encode(message: AccountFacebookInstantGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signed_player_info !== "") {
      writer.uint32(10).string(message.signed_player_info);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountFacebookInstantGame_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebookInstantGame {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebookInstantGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signed_player_info = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountFacebookInstantGame_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountFacebookInstantGame {
    return {
      signed_player_info: isSet(object.signed_player_info) ? globalThis.String(object.signed_player_info) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountFacebookInstantGame): unknown {
    const obj: any = {};
    if (message.signed_player_info !== "") {
      obj.signed_player_info = message.signed_player_info;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebookInstantGame>, I>>(base?: I): AccountFacebookInstantGame {
    return AccountFacebookInstantGame.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountFacebookInstantGame>, I>>(object: I): AccountFacebookInstantGame {
    const message = createBaseAccountFacebookInstantGame();
    message.signed_player_info = object.signed_player_info ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountFacebookInstantGame_VarsEntry(): AccountFacebookInstantGame_VarsEntry {
  return { key: "", value: "" };
}

export const AccountFacebookInstantGame_VarsEntry = {
  encode(message: AccountFacebookInstantGame_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFacebookInstantGame_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebookInstantGame_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountFacebookInstantGame_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountFacebookInstantGame_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebookInstantGame_VarsEntry>, I>>(
    base?: I,
  ): AccountFacebookInstantGame_VarsEntry {
    return AccountFacebookInstantGame_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountFacebookInstantGame_VarsEntry>, I>>(
    object: I,
  ): AccountFacebookInstantGame_VarsEntry {
    const message = createBaseAccountFacebookInstantGame_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountGameCenter(): AccountGameCenter {
  return { player_id: "", bundle_id: "", timestamp_seconds: 0, salt: "", signature: "", public_key_url: "", vars: {} };
}

export const AccountGameCenter = {
  encode(message: AccountGameCenter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.player_id !== "") {
      writer.uint32(10).string(message.player_id);
    }
    if (message.bundle_id !== "") {
      writer.uint32(18).string(message.bundle_id);
    }
    if (message.timestamp_seconds !== 0) {
      writer.uint32(24).int64(message.timestamp_seconds);
    }
    if (message.salt !== "") {
      writer.uint32(34).string(message.salt);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    if (message.public_key_url !== "") {
      writer.uint32(50).string(message.public_key_url);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountGameCenter_VarsEntry.encode({ key: key as any, value }, writer.uint32(58).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGameCenter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGameCenter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.player_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bundle_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.timestamp_seconds = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.salt = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.public_key_url = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          const entry7 = AccountGameCenter_VarsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.vars[entry7.key] = entry7.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountGameCenter {
    return {
      player_id: isSet(object.player_id) ? globalThis.String(object.player_id) : "",
      bundle_id: isSet(object.bundle_id) ? globalThis.String(object.bundle_id) : "",
      timestamp_seconds: isSet(object.timestamp_seconds) ? globalThis.Number(object.timestamp_seconds) : 0,
      salt: isSet(object.salt) ? globalThis.String(object.salt) : "",
      signature: isSet(object.signature) ? globalThis.String(object.signature) : "",
      public_key_url: isSet(object.public_key_url) ? globalThis.String(object.public_key_url) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountGameCenter): unknown {
    const obj: any = {};
    if (message.player_id !== "") {
      obj.player_id = message.player_id;
    }
    if (message.bundle_id !== "") {
      obj.bundle_id = message.bundle_id;
    }
    if (message.timestamp_seconds !== 0) {
      obj.timestamp_seconds = Math.round(message.timestamp_seconds);
    }
    if (message.salt !== "") {
      obj.salt = message.salt;
    }
    if (message.signature !== "") {
      obj.signature = message.signature;
    }
    if (message.public_key_url !== "") {
      obj.public_key_url = message.public_key_url;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGameCenter>, I>>(base?: I): AccountGameCenter {
    return AccountGameCenter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountGameCenter>, I>>(object: I): AccountGameCenter {
    const message = createBaseAccountGameCenter();
    message.player_id = object.player_id ?? "";
    message.bundle_id = object.bundle_id ?? "";
    message.timestamp_seconds = object.timestamp_seconds ?? 0;
    message.salt = object.salt ?? "";
    message.signature = object.signature ?? "";
    message.public_key_url = object.public_key_url ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountGameCenter_VarsEntry(): AccountGameCenter_VarsEntry {
  return { key: "", value: "" };
}

export const AccountGameCenter_VarsEntry = {
  encode(message: AccountGameCenter_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGameCenter_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGameCenter_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountGameCenter_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountGameCenter_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGameCenter_VarsEntry>, I>>(base?: I): AccountGameCenter_VarsEntry {
    return AccountGameCenter_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountGameCenter_VarsEntry>, I>>(object: I): AccountGameCenter_VarsEntry {
    const message = createBaseAccountGameCenter_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountGoogle(): AccountGoogle {
  return { token: "", vars: {} };
}

export const AccountGoogle = {
  encode(message: AccountGoogle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountGoogle_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGoogle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGoogle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountGoogle_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountGoogle {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountGoogle): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGoogle>, I>>(base?: I): AccountGoogle {
    return AccountGoogle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountGoogle>, I>>(object: I): AccountGoogle {
    const message = createBaseAccountGoogle();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountGoogle_VarsEntry(): AccountGoogle_VarsEntry {
  return { key: "", value: "" };
}

export const AccountGoogle_VarsEntry = {
  encode(message: AccountGoogle_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountGoogle_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGoogle_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountGoogle_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountGoogle_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGoogle_VarsEntry>, I>>(base?: I): AccountGoogle_VarsEntry {
    return AccountGoogle_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountGoogle_VarsEntry>, I>>(object: I): AccountGoogle_VarsEntry {
    const message = createBaseAccountGoogle_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountSteam(): AccountSteam {
  return { token: "", vars: {} };
}

export const AccountSteam = {
  encode(message: AccountSteam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      AccountSteam_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountSteam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountSteam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = AccountSteam_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountSteam {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountSteam): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountSteam>, I>>(base?: I): AccountSteam {
    return AccountSteam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountSteam>, I>>(object: I): AccountSteam {
    const message = createBaseAccountSteam();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountSteam_VarsEntry(): AccountSteam_VarsEntry {
  return { key: "", value: "" };
}

export const AccountSteam_VarsEntry = {
  encode(message: AccountSteam_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountSteam_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountSteam_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountSteam_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AccountSteam_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountSteam_VarsEntry>, I>>(base?: I): AccountSteam_VarsEntry {
    return AccountSteam_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountSteam_VarsEntry>, I>>(object: I): AccountSteam_VarsEntry {
    const message = createBaseAccountSteam_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAddFriendsRequest(): AddFriendsRequest {
  return { ids: [], usernames: [] };
}

export const AddFriendsRequest = {
  encode(message: AddFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.usernames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddFriendsRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      usernames: globalThis.Array.isArray(object?.usernames)
        ? object.usernames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: AddFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.usernames?.length) {
      obj.usernames = message.usernames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddFriendsRequest>, I>>(base?: I): AddFriendsRequest {
    return AddFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddFriendsRequest>, I>>(object: I): AddFriendsRequest {
    const message = createBaseAddFriendsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.usernames = object.usernames?.map((e) => e) || [];
    return message;
  },
};

function createBaseAddGroupUsersRequest(): AddGroupUsersRequest {
  return { group_id: "", user_ids: [] };
}

export const AddGroupUsersRequest = {
  encode(message: AddGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: AddGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddGroupUsersRequest>, I>>(base?: I): AddGroupUsersRequest {
    return AddGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddGroupUsersRequest>, I>>(object: I): AddGroupUsersRequest {
    const message = createBaseAddGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseSessionRefreshRequest(): SessionRefreshRequest {
  return { token: "", vars: {} };
}

export const SessionRefreshRequest = {
  encode(message: SessionRefreshRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    Object.entries(message.vars).forEach(([key, value]) => {
      SessionRefreshRequest_VarsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionRefreshRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = SessionRefreshRequest_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionRefreshRequest {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      vars: isObject(object.vars)
        ? Object.entries(object.vars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SessionRefreshRequest): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.vars) {
      const entries = Object.entries(message.vars);
      if (entries.length > 0) {
        obj.vars = {};
        entries.forEach(([k, v]) => {
          obj.vars[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionRefreshRequest>, I>>(base?: I): SessionRefreshRequest {
    return SessionRefreshRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionRefreshRequest>, I>>(object: I): SessionRefreshRequest {
    const message = createBaseSessionRefreshRequest();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseSessionRefreshRequest_VarsEntry(): SessionRefreshRequest_VarsEntry {
  return { key: "", value: "" };
}

export const SessionRefreshRequest_VarsEntry = {
  encode(message: SessionRefreshRequest_VarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionRefreshRequest_VarsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionRefreshRequest_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionRefreshRequest_VarsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: SessionRefreshRequest_VarsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionRefreshRequest_VarsEntry>, I>>(base?: I): SessionRefreshRequest_VarsEntry {
    return SessionRefreshRequest_VarsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionRefreshRequest_VarsEntry>, I>>(
    object: I,
  ): SessionRefreshRequest_VarsEntry {
    const message = createBaseSessionRefreshRequest_VarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseSessionLogoutRequest(): SessionLogoutRequest {
  return { token: "", refresh_token: "" };
}

export const SessionLogoutRequest = {
  encode(message: SessionLogoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh_token !== "") {
      writer.uint32(18).string(message.refresh_token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionLogoutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionLogoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refresh_token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionLogoutRequest {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      refresh_token: isSet(object.refresh_token) ? globalThis.String(object.refresh_token) : "",
    };
  },

  toJSON(message: SessionLogoutRequest): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.refresh_token !== "") {
      obj.refresh_token = message.refresh_token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionLogoutRequest>, I>>(base?: I): SessionLogoutRequest {
    return SessionLogoutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionLogoutRequest>, I>>(object: I): SessionLogoutRequest {
    const message = createBaseSessionLogoutRequest();
    message.token = object.token ?? "";
    message.refresh_token = object.refresh_token ?? "";
    return message;
  },
};

function createBaseAuthenticateAppleRequest(): AuthenticateAppleRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateAppleRequest = {
  encode(message: AuthenticateAppleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountApple.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateAppleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateAppleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountApple.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAppleRequest {
    return {
      account: isSet(object.account) ? AccountApple.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateAppleRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountApple.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateAppleRequest>, I>>(base?: I): AuthenticateAppleRequest {
    return AuthenticateAppleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateAppleRequest>, I>>(object: I): AuthenticateAppleRequest {
    const message = createBaseAuthenticateAppleRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountApple.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateCustomRequest(): AuthenticateCustomRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateCustomRequest = {
  encode(message: AuthenticateCustomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountCustom.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateCustomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateCustomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountCustom.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateCustomRequest {
    return {
      account: isSet(object.account) ? AccountCustom.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateCustomRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountCustom.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateCustomRequest>, I>>(base?: I): AuthenticateCustomRequest {
    return AuthenticateCustomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateCustomRequest>, I>>(object: I): AuthenticateCustomRequest {
    const message = createBaseAuthenticateCustomRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountCustom.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateDeviceRequest(): AuthenticateDeviceRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateDeviceRequest = {
  encode(message: AuthenticateDeviceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountDevice.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateDeviceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateDeviceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountDevice.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateDeviceRequest {
    return {
      account: isSet(object.account) ? AccountDevice.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateDeviceRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountDevice.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateDeviceRequest>, I>>(base?: I): AuthenticateDeviceRequest {
    return AuthenticateDeviceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateDeviceRequest>, I>>(object: I): AuthenticateDeviceRequest {
    const message = createBaseAuthenticateDeviceRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountDevice.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateEmailRequest(): AuthenticateEmailRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateEmailRequest = {
  encode(message: AuthenticateEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountEmail.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountEmail.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateEmailRequest {
    return {
      account: isSet(object.account) ? AccountEmail.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateEmailRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountEmail.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateEmailRequest>, I>>(base?: I): AuthenticateEmailRequest {
    return AuthenticateEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateEmailRequest>, I>>(object: I): AuthenticateEmailRequest {
    const message = createBaseAuthenticateEmailRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountEmail.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateFacebookRequest(): AuthenticateFacebookRequest {
  return { account: undefined, create: undefined, username: "", sync: undefined };
}

export const AuthenticateFacebookRequest = {
  encode(message: AuthenticateFacebookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.sync !== undefined) {
      BoolValue.encode({ value: message.sync! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateFacebookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateFacebookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountFacebook.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookRequest {
    return {
      account: isSet(object.account) ? AccountFacebook.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: AuthenticateFacebookRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountFacebook.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.sync !== undefined) {
      obj.sync = message.sync;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateFacebookRequest>, I>>(base?: I): AuthenticateFacebookRequest {
    return AuthenticateFacebookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateFacebookRequest>, I>>(object: I): AuthenticateFacebookRequest {
    const message = createBaseAuthenticateFacebookRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountFacebook.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    message.sync = object.sync ?? undefined;
    return message;
  },
};

function createBaseAuthenticateFacebookInstantGameRequest(): AuthenticateFacebookInstantGameRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateFacebookInstantGameRequest = {
  encode(message: AuthenticateFacebookInstantGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebookInstantGame.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateFacebookInstantGameRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateFacebookInstantGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountFacebookInstantGame.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookInstantGameRequest {
    return {
      account: isSet(object.account) ? AccountFacebookInstantGame.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateFacebookInstantGameRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountFacebookInstantGame.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateFacebookInstantGameRequest>, I>>(
    base?: I,
  ): AuthenticateFacebookInstantGameRequest {
    return AuthenticateFacebookInstantGameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateFacebookInstantGameRequest>, I>>(
    object: I,
  ): AuthenticateFacebookInstantGameRequest {
    const message = createBaseAuthenticateFacebookInstantGameRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountFacebookInstantGame.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateGameCenterRequest(): AuthenticateGameCenterRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateGameCenterRequest = {
  encode(message: AuthenticateGameCenterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountGameCenter.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateGameCenterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateGameCenterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountGameCenter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGameCenterRequest {
    return {
      account: isSet(object.account) ? AccountGameCenter.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateGameCenterRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountGameCenter.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateGameCenterRequest>, I>>(base?: I): AuthenticateGameCenterRequest {
    return AuthenticateGameCenterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateGameCenterRequest>, I>>(
    object: I,
  ): AuthenticateGameCenterRequest {
    const message = createBaseAuthenticateGameCenterRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountGameCenter.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateGoogleRequest(): AuthenticateGoogleRequest {
  return { account: undefined, create: undefined, username: "" };
}

export const AuthenticateGoogleRequest = {
  encode(message: AuthenticateGoogleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountGoogle.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateGoogleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateGoogleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountGoogle.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGoogleRequest {
    return {
      account: isSet(object.account) ? AccountGoogle.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateGoogleRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountGoogle.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateGoogleRequest>, I>>(base?: I): AuthenticateGoogleRequest {
    return AuthenticateGoogleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateGoogleRequest>, I>>(object: I): AuthenticateGoogleRequest {
    const message = createBaseAuthenticateGoogleRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountGoogle.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseAuthenticateSteamRequest(): AuthenticateSteamRequest {
  return { account: undefined, create: undefined, username: "", sync: undefined };
}

export const AuthenticateSteamRequest = {
  encode(message: AuthenticateSteamRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.create !== undefined) {
      BoolValue.encode({ value: message.create! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.sync !== undefined) {
      BoolValue.encode({ value: message.sync! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateSteamRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateSteamRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountSteam.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.create = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateSteamRequest {
    return {
      account: isSet(object.account) ? AccountSteam.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: AuthenticateSteamRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountSteam.toJSON(message.account);
    }
    if (message.create !== undefined) {
      obj.create = message.create;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.sync !== undefined) {
      obj.sync = message.sync;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateSteamRequest>, I>>(base?: I): AuthenticateSteamRequest {
    return AuthenticateSteamRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateSteamRequest>, I>>(object: I): AuthenticateSteamRequest {
    const message = createBaseAuthenticateSteamRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountSteam.fromPartial(object.account)
      : undefined;
    message.create = object.create ?? undefined;
    message.username = object.username ?? "";
    message.sync = object.sync ?? undefined;
    return message;
  },
};

function createBaseBanGroupUsersRequest(): BanGroupUsersRequest {
  return { group_id: "", user_ids: [] };
}

export const BanGroupUsersRequest = {
  encode(message: BanGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BanGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BanGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: BanGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BanGroupUsersRequest>, I>>(base?: I): BanGroupUsersRequest {
    return BanGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BanGroupUsersRequest>, I>>(object: I): BanGroupUsersRequest {
    const message = createBaseBanGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseBlockFriendsRequest(): BlockFriendsRequest {
  return { ids: [], usernames: [] };
}

export const BlockFriendsRequest = {
  encode(message: BlockFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.usernames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockFriendsRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      usernames: globalThis.Array.isArray(object?.usernames)
        ? object.usernames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: BlockFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.usernames?.length) {
      obj.usernames = message.usernames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockFriendsRequest>, I>>(base?: I): BlockFriendsRequest {
    return BlockFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockFriendsRequest>, I>>(object: I): BlockFriendsRequest {
    const message = createBaseBlockFriendsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.usernames = object.usernames?.map((e) => e) || [];
    return message;
  },
};

function createBaseChannelMessage(): ChannelMessage {
  return {
    clan_id: "",
    channel_id: "",
    message_id: "",
    code: undefined,
    sender_id: "",
    username: "",
    content: "",
    create_time: undefined,
    update_time: undefined,
    persistent: undefined,
    room_name: "",
    group_id: "",
    user_id_one: "",
    user_id_two: "",
  };
}

export const ChannelMessage = {
  encode(message: ChannelMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.code !== undefined) {
      Int32Value.encode({ value: message.code! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.username !== "") {
      writer.uint32(50).string(message.username);
    }
    if (message.content !== "") {
      writer.uint32(58).string(message.content);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(66).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(74).fork()).ldelim();
    }
    if (message.persistent !== undefined) {
      BoolValue.encode({ value: message.persistent! }, writer.uint32(82).fork()).ldelim();
    }
    if (message.room_name !== "") {
      writer.uint32(90).string(message.room_name);
    }
    if (message.group_id !== "") {
      writer.uint32(98).string(message.group_id);
    }
    if (message.user_id_one !== "") {
      writer.uint32(106).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(114).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.code = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sender_id = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.username = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.content = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.room_name = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.user_id_one = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.user_id_two = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelMessage {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? globalThis.String(object.message_id) : "",
      code: isSet(object.code) ? Number(object.code) : undefined,
      sender_id: isSet(object.sender_id) ? globalThis.String(object.sender_id) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      persistent: isSet(object.persistent) ? Boolean(object.persistent) : undefined,
      room_name: isSet(object.room_name) ? globalThis.String(object.room_name) : "",
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_id_one: isSet(object.user_id_one) ? globalThis.String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? globalThis.String(object.user_id_two) : "",
    };
  },

  toJSON(message: ChannelMessage): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.message_id !== "") {
      obj.message_id = message.message_id;
    }
    if (message.code !== undefined) {
      obj.code = message.code;
    }
    if (message.sender_id !== "") {
      obj.sender_id = message.sender_id;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    if (message.persistent !== undefined) {
      obj.persistent = message.persistent;
    }
    if (message.room_name !== "") {
      obj.room_name = message.room_name;
    }
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_id_one !== "") {
      obj.user_id_one = message.user_id_one;
    }
    if (message.user_id_two !== "") {
      obj.user_id_two = message.user_id_two;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessage>, I>>(base?: I): ChannelMessage {
    return ChannelMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelMessage>, I>>(object: I): ChannelMessage {
    const message = createBaseChannelMessage();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.code = object.code ?? undefined;
    message.sender_id = object.sender_id ?? "";
    message.username = object.username ?? "";
    message.content = object.content ?? "";
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.persistent = object.persistent ?? undefined;
    message.room_name = object.room_name ?? "";
    message.group_id = object.group_id ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    return message;
  },
};

function createBaseLastSeenMessageRequest(): LastSeenMessageRequest {
  return { channel_id: "", message_id: "" };
}

export const LastSeenMessageRequest = {
  encode(message: LastSeenMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastSeenMessageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastSeenMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LastSeenMessageRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? globalThis.String(object.message_id) : "",
    };
  },

  toJSON(message: LastSeenMessageRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.message_id !== "") {
      obj.message_id = message.message_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LastSeenMessageRequest>, I>>(base?: I): LastSeenMessageRequest {
    return LastSeenMessageRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LastSeenMessageRequest>, I>>(object: I): LastSeenMessageRequest {
    const message = createBaseLastSeenMessageRequest();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    return message;
  },
};

function createBaseChannelMessageList(): ChannelMessageList {
  return { messages: [], last_seen_message_id: "", next_cursor: "", prev_cursor: "", cacheable_cursor: "" };
}

export const ChannelMessageList = {
  encode(message: ChannelMessageList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      ChannelMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.last_seen_message_id !== "") {
      writer.uint32(18).string(message.last_seen_message_id);
    }
    if (message.next_cursor !== "") {
      writer.uint32(26).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(34).string(message.prev_cursor);
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(42).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(ChannelMessage.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.last_seen_message_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.next_cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cacheable_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageList {
    return {
      messages: globalThis.Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ChannelMessage.fromJSON(e))
        : [],
      last_seen_message_id: isSet(object.last_seen_message_id) ? globalThis.String(object.last_seen_message_id) : "",
      next_cursor: isSet(object.next_cursor) ? globalThis.String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
      cacheable_cursor: isSet(object.cacheable_cursor) ? globalThis.String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: ChannelMessageList): unknown {
    const obj: any = {};
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => ChannelMessage.toJSON(e));
    }
    if (message.last_seen_message_id !== "") {
      obj.last_seen_message_id = message.last_seen_message_id;
    }
    if (message.next_cursor !== "") {
      obj.next_cursor = message.next_cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    if (message.cacheable_cursor !== "") {
      obj.cacheable_cursor = message.cacheable_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageList>, I>>(base?: I): ChannelMessageList {
    return ChannelMessageList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelMessageList>, I>>(object: I): ChannelMessageList {
    const message = createBaseChannelMessageList();
    message.messages = object.messages?.map((e) => ChannelMessage.fromPartial(e)) || [];
    message.last_seen_message_id = object.last_seen_message_id ?? "";
    message.next_cursor = object.next_cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    message.cacheable_cursor = object.cacheable_cursor ?? "";
    return message;
  },
};

function createBaseCreateGroupRequest(): CreateGroupRequest {
  return { name: "", description: "", lang_tag: "", avatar_url: "", open: false, max_count: 0 };
}

export const CreateGroupRequest = {
  encode(message: CreateGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.lang_tag !== "") {
      writer.uint32(26).string(message.lang_tag);
    }
    if (message.avatar_url !== "") {
      writer.uint32(34).string(message.avatar_url);
    }
    if (message.open === true) {
      writer.uint32(40).bool(message.open);
    }
    if (message.max_count !== 0) {
      writer.uint32(48).int32(message.max_count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lang_tag = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.open = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.max_count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateGroupRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      lang_tag: isSet(object.lang_tag) ? globalThis.String(object.lang_tag) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      open: isSet(object.open) ? globalThis.Boolean(object.open) : false,
      max_count: isSet(object.max_count) ? globalThis.Number(object.max_count) : 0,
    };
  },

  toJSON(message: CreateGroupRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.lang_tag !== "") {
      obj.lang_tag = message.lang_tag;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    if (message.open === true) {
      obj.open = message.open;
    }
    if (message.max_count !== 0) {
      obj.max_count = Math.round(message.max_count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateGroupRequest>, I>>(base?: I): CreateGroupRequest {
    return CreateGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateGroupRequest>, I>>(object: I): CreateGroupRequest {
    const message = createBaseCreateGroupRequest();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.lang_tag = object.lang_tag ?? "";
    message.avatar_url = object.avatar_url ?? "";
    message.open = object.open ?? false;
    message.max_count = object.max_count ?? 0;
    return message;
  },
};

function createBaseDeleteFriendsRequest(): DeleteFriendsRequest {
  return { ids: [], usernames: [] };
}

export const DeleteFriendsRequest = {
  encode(message: DeleteFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.usernames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteFriendsRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      usernames: globalThis.Array.isArray(object?.usernames)
        ? object.usernames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: DeleteFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.usernames?.length) {
      obj.usernames = message.usernames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteFriendsRequest>, I>>(base?: I): DeleteFriendsRequest {
    return DeleteFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteFriendsRequest>, I>>(object: I): DeleteFriendsRequest {
    const message = createBaseDeleteFriendsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.usernames = object.usernames?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteGroupRequest(): DeleteGroupRequest {
  return { group_id: "" };
}

export const DeleteGroupRequest = {
  encode(message: DeleteGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteGroupRequest {
    return { group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "" };
  },

  toJSON(message: DeleteGroupRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteGroupRequest>, I>>(base?: I): DeleteGroupRequest {
    return DeleteGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteGroupRequest>, I>>(object: I): DeleteGroupRequest {
    const message = createBaseDeleteGroupRequest();
    message.group_id = object.group_id ?? "";
    return message;
  },
};

function createBaseDeleteLeaderboardRecordRequest(): DeleteLeaderboardRecordRequest {
  return { leaderboard_id: "" };
}

export const DeleteLeaderboardRecordRequest = {
  encode(message: DeleteLeaderboardRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteLeaderboardRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteLeaderboardRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboard_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteLeaderboardRecordRequest {
    return { leaderboard_id: isSet(object.leaderboard_id) ? globalThis.String(object.leaderboard_id) : "" };
  },

  toJSON(message: DeleteLeaderboardRecordRequest): unknown {
    const obj: any = {};
    if (message.leaderboard_id !== "") {
      obj.leaderboard_id = message.leaderboard_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteLeaderboardRecordRequest>, I>>(base?: I): DeleteLeaderboardRecordRequest {
    return DeleteLeaderboardRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteLeaderboardRecordRequest>, I>>(
    object: I,
  ): DeleteLeaderboardRecordRequest {
    const message = createBaseDeleteLeaderboardRecordRequest();
    message.leaderboard_id = object.leaderboard_id ?? "";
    return message;
  },
};

function createBaseDeleteNotificationsRequest(): DeleteNotificationsRequest {
  return { ids: [] };
}

export const DeleteNotificationsRequest = {
  encode(message: DeleteNotificationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNotificationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationsRequest {
    return { ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: DeleteNotificationsRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteNotificationsRequest>, I>>(base?: I): DeleteNotificationsRequest {
    return DeleteNotificationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteNotificationsRequest>, I>>(object: I): DeleteNotificationsRequest {
    const message = createBaseDeleteNotificationsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteTournamentRecordRequest(): DeleteTournamentRecordRequest {
  return { tournament_id: "" };
}

export const DeleteTournamentRecordRequest = {
  encode(message: DeleteTournamentRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTournamentRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTournamentRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournament_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteTournamentRecordRequest {
    return { tournament_id: isSet(object.tournament_id) ? globalThis.String(object.tournament_id) : "" };
  },

  toJSON(message: DeleteTournamentRecordRequest): unknown {
    const obj: any = {};
    if (message.tournament_id !== "") {
      obj.tournament_id = message.tournament_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteTournamentRecordRequest>, I>>(base?: I): DeleteTournamentRecordRequest {
    return DeleteTournamentRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteTournamentRecordRequest>, I>>(
    object: I,
  ): DeleteTournamentRecordRequest {
    const message = createBaseDeleteTournamentRecordRequest();
    message.tournament_id = object.tournament_id ?? "";
    return message;
  },
};

function createBaseDeleteStorageObjectId(): DeleteStorageObjectId {
  return { collection: "", key: "", version: "" };
}

export const DeleteStorageObjectId = {
  encode(message: DeleteStorageObjectId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteStorageObjectId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteStorageObjectId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectId {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
    };
  },

  toJSON(message: DeleteStorageObjectId): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteStorageObjectId>, I>>(base?: I): DeleteStorageObjectId {
    return DeleteStorageObjectId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteStorageObjectId>, I>>(object: I): DeleteStorageObjectId {
    const message = createBaseDeleteStorageObjectId();
    message.collection = object.collection ?? "";
    message.key = object.key ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseDeleteStorageObjectsRequest(): DeleteStorageObjectsRequest {
  return { object_ids: [] };
}

export const DeleteStorageObjectsRequest = {
  encode(message: DeleteStorageObjectsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.object_ids) {
      DeleteStorageObjectId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.object_ids.push(DeleteStorageObjectId.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectsRequest {
    return {
      object_ids: globalThis.Array.isArray(object?.object_ids)
        ? object.object_ids.map((e: any) => DeleteStorageObjectId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids?.length) {
      obj.object_ids = message.object_ids.map((e) => DeleteStorageObjectId.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteStorageObjectsRequest>, I>>(base?: I): DeleteStorageObjectsRequest {
    return DeleteStorageObjectsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteStorageObjectsRequest>, I>>(object: I): DeleteStorageObjectsRequest {
    const message = createBaseDeleteStorageObjectsRequest();
    message.object_ids = object.object_ids?.map((e) => DeleteStorageObjectId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEvent(): Event {
  return { name: "", properties: {}, timestamp: undefined, external: false };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.properties).forEach(([key, value]) => {
      Event_PropertiesEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    if (message.external === true) {
      writer.uint32(32).bool(message.external);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = Event_PropertiesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.properties[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.external = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      properties: isObject(object.properties)
        ? Object.entries(object.properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      external: isSet(object.external) ? globalThis.Boolean(object.external) : false,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.properties) {
      const entries = Object.entries(message.properties);
      if (entries.length > 0) {
        obj.properties = {};
        entries.forEach(([k, v]) => {
          obj.properties[k] = v;
        });
      }
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.external === true) {
      obj.external = message.external;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.name = object.name ?? "";
    message.properties = Object.entries(object.properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    message.timestamp = object.timestamp ?? undefined;
    message.external = object.external ?? false;
    return message;
  },
};

function createBaseEvent_PropertiesEntry(): Event_PropertiesEntry {
  return { key: "", value: "" };
}

export const Event_PropertiesEntry = {
  encode(message: Event_PropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_PropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_PropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event_PropertiesEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: Event_PropertiesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event_PropertiesEntry>, I>>(base?: I): Event_PropertiesEntry {
    return Event_PropertiesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event_PropertiesEntry>, I>>(object: I): Event_PropertiesEntry {
    const message = createBaseEvent_PropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseFriend(): Friend {
  return { user: undefined, state: undefined, update_time: undefined };
}

export const Friend = {
  encode(message: Friend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Friend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFriend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Friend {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: Friend): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Friend>, I>>(base?: I): Friend {
    return Friend.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Friend>, I>>(object: I): Friend {
    const message = createBaseFriend();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.state = object.state ?? undefined;
    message.update_time = object.update_time ?? undefined;
    return message;
  },
};

function createBaseFriendList(): FriendList {
  return { friends: [], cursor: "" };
}

export const FriendList = {
  encode(message: FriendList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.friends) {
      Friend.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FriendList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFriendList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.friends.push(Friend.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FriendList {
    return {
      friends: globalThis.Array.isArray(object?.friends) ? object.friends.map((e: any) => Friend.fromJSON(e)) : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: FriendList): unknown {
    const obj: any = {};
    if (message.friends?.length) {
      obj.friends = message.friends.map((e) => Friend.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FriendList>, I>>(base?: I): FriendList {
    return FriendList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FriendList>, I>>(object: I): FriendList {
    const message = createBaseFriendList();
    message.friends = object.friends?.map((e) => Friend.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseGetUsersRequest(): GetUsersRequest {
  return { ids: [], usernames: [], facebook_ids: [] };
}

export const GetUsersRequest = {
  encode(message: GetUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.facebook_ids) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.usernames.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.facebook_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUsersRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      usernames: globalThis.Array.isArray(object?.usernames)
        ? object.usernames.map((e: any) => globalThis.String(e))
        : [],
      facebook_ids: globalThis.Array.isArray(object?.facebook_ids)
        ? object.facebook_ids.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetUsersRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.usernames?.length) {
      obj.usernames = message.usernames;
    }
    if (message.facebook_ids?.length) {
      obj.facebook_ids = message.facebook_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUsersRequest>, I>>(base?: I): GetUsersRequest {
    return GetUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUsersRequest>, I>>(object: I): GetUsersRequest {
    const message = createBaseGetUsersRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.usernames = object.usernames?.map((e) => e) || [];
    message.facebook_ids = object.facebook_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateUsersRequest(): UpdateUsersRequest {
  return { display_name: "", avatar_url: "" };
}

export const UpdateUsersRequest = {
  encode(message: UpdateUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.display_name !== "") {
      writer.uint32(18).string(message.display_name);
    }
    if (message.avatar_url !== "") {
      writer.uint32(26).string(message.avatar_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.display_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUsersRequest {
    return {
      display_name: isSet(object.display_name) ? globalThis.String(object.display_name) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
    };
  },

  toJSON(message: UpdateUsersRequest): unknown {
    const obj: any = {};
    if (message.display_name !== "") {
      obj.display_name = message.display_name;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUsersRequest>, I>>(base?: I): UpdateUsersRequest {
    return UpdateUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUsersRequest>, I>>(object: I): UpdateUsersRequest {
    const message = createBaseUpdateUsersRequest();
    message.display_name = object.display_name ?? "";
    message.avatar_url = object.avatar_url ?? "";
    return message;
  },
};

function createBaseGetSubscriptionRequest(): GetSubscriptionRequest {
  return { product_id: "" };
}

export const GetSubscriptionRequest = {
  encode(message: GetSubscriptionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.product_id !== "") {
      writer.uint32(10).string(message.product_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSubscriptionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSubscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.product_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSubscriptionRequest {
    return { product_id: isSet(object.product_id) ? globalThis.String(object.product_id) : "" };
  },

  toJSON(message: GetSubscriptionRequest): unknown {
    const obj: any = {};
    if (message.product_id !== "") {
      obj.product_id = message.product_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSubscriptionRequest>, I>>(base?: I): GetSubscriptionRequest {
    return GetSubscriptionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSubscriptionRequest>, I>>(object: I): GetSubscriptionRequest {
    const message = createBaseGetSubscriptionRequest();
    message.product_id = object.product_id ?? "";
    return message;
  },
};

function createBaseGroup(): Group {
  return {
    id: "",
    creator_id: "",
    name: "",
    description: "",
    lang_tag: "",
    metadata: "",
    avatar_url: "",
    open: undefined,
    edge_count: 0,
    max_count: 0,
    create_time: undefined,
    update_time: undefined,
  };
}

export const Group = {
  encode(message: Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creator_id !== "") {
      writer.uint32(18).string(message.creator_id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.lang_tag !== "") {
      writer.uint32(42).string(message.lang_tag);
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    if (message.avatar_url !== "") {
      writer.uint32(58).string(message.avatar_url);
    }
    if (message.open !== undefined) {
      BoolValue.encode({ value: message.open! }, writer.uint32(66).fork()).ldelim();
    }
    if (message.edge_count !== 0) {
      writer.uint32(72).int32(message.edge_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(80).int32(message.max_count);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(90).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Group {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lang_tag = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.open = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.edge_count = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.max_count = reader.int32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Group {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      lang_tag: isSet(object.lang_tag) ? globalThis.String(object.lang_tag) : "",
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      open: isSet(object.open) ? Boolean(object.open) : undefined,
      edge_count: isSet(object.edge_count) ? globalThis.Number(object.edge_count) : 0,
      max_count: isSet(object.max_count) ? globalThis.Number(object.max_count) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: Group): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.lang_tag !== "") {
      obj.lang_tag = message.lang_tag;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    if (message.open !== undefined) {
      obj.open = message.open;
    }
    if (message.edge_count !== 0) {
      obj.edge_count = Math.round(message.edge_count);
    }
    if (message.max_count !== 0) {
      obj.max_count = Math.round(message.max_count);
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Group>, I>>(base?: I): Group {
    return Group.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Group>, I>>(object: I): Group {
    const message = createBaseGroup();
    message.id = object.id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.lang_tag = object.lang_tag ?? "";
    message.metadata = object.metadata ?? "";
    message.avatar_url = object.avatar_url ?? "";
    message.open = object.open ?? undefined;
    message.edge_count = object.edge_count ?? 0;
    message.max_count = object.max_count ?? 0;
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    return message;
  },
};

function createBaseGroupList(): GroupList {
  return { groups: [], cursor: "" };
}

export const GroupList = {
  encode(message: GroupList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groups) {
      Group.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groups.push(Group.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupList {
    return {
      groups: globalThis.Array.isArray(object?.groups) ? object.groups.map((e: any) => Group.fromJSON(e)) : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: GroupList): unknown {
    const obj: any = {};
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => Group.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupList>, I>>(base?: I): GroupList {
    return GroupList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GroupList>, I>>(object: I): GroupList {
    const message = createBaseGroupList();
    message.groups = object.groups?.map((e) => Group.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseGroupUserList(): GroupUserList {
  return { group_users: [], cursor: "" };
}

export const GroupUserList = {
  encode(message: GroupUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.group_users) {
      GroupUserList_GroupUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupUserList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_users.push(GroupUserList_GroupUser.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupUserList {
    return {
      group_users: globalThis.Array.isArray(object?.group_users)
        ? object.group_users.map((e: any) => GroupUserList_GroupUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: GroupUserList): unknown {
    const obj: any = {};
    if (message.group_users?.length) {
      obj.group_users = message.group_users.map((e) => GroupUserList_GroupUser.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupUserList>, I>>(base?: I): GroupUserList {
    return GroupUserList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GroupUserList>, I>>(object: I): GroupUserList {
    const message = createBaseGroupUserList();
    message.group_users = object.group_users?.map((e) => GroupUserList_GroupUser.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseGroupUserList_GroupUser(): GroupUserList_GroupUser {
  return { user: undefined, state: undefined };
}

export const GroupUserList_GroupUser = {
  encode(message: GroupUserList_GroupUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupUserList_GroupUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupUserList_GroupUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupUserList_GroupUser {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
    };
  },

  toJSON(message: GroupUserList_GroupUser): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupUserList_GroupUser>, I>>(base?: I): GroupUserList_GroupUser {
    return GroupUserList_GroupUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GroupUserList_GroupUser>, I>>(object: I): GroupUserList_GroupUser {
    const message = createBaseGroupUserList_GroupUser();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.state = object.state ?? undefined;
    return message;
  },
};

function createBaseChannelUserList(): ChannelUserList {
  return { channel_users: [], cursor: "" };
}

export const ChannelUserList = {
  encode(message: ChannelUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channel_users) {
      ChannelUserList_ChannelUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_users.push(ChannelUserList_ChannelUser.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelUserList {
    return {
      channel_users: globalThis.Array.isArray(object?.channel_users)
        ? object.channel_users.map((e: any) => ChannelUserList_ChannelUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ChannelUserList): unknown {
    const obj: any = {};
    if (message.channel_users?.length) {
      obj.channel_users = message.channel_users.map((e) => ChannelUserList_ChannelUser.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelUserList>, I>>(base?: I): ChannelUserList {
    return ChannelUserList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelUserList>, I>>(object: I): ChannelUserList {
    const message = createBaseChannelUserList();
    message.channel_users = object.channel_users?.map((e) => ChannelUserList_ChannelUser.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseChannelUserList_ChannelUser(): ChannelUserList_ChannelUser {
  return { user: undefined, role_id: undefined };
}

export const ChannelUserList_ChannelUser = {
  encode(message: ChannelUserList_ChannelUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.role_id !== undefined) {
      StringValue.encode({ value: message.role_id! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList_ChannelUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelUserList_ChannelUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.role_id = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelUserList_ChannelUser {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      role_id: isSet(object.role_id) ? String(object.role_id) : undefined,
    };
  },

  toJSON(message: ChannelUserList_ChannelUser): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.role_id !== undefined) {
      obj.role_id = message.role_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelUserList_ChannelUser>, I>>(base?: I): ChannelUserList_ChannelUser {
    return ChannelUserList_ChannelUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelUserList_ChannelUser>, I>>(object: I): ChannelUserList_ChannelUser {
    const message = createBaseChannelUserList_ChannelUser();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.role_id = object.role_id ?? undefined;
    return message;
  },
};

function createBaseImportFacebookFriendsRequest(): ImportFacebookFriendsRequest {
  return { account: undefined, reset: undefined };
}

export const ImportFacebookFriendsRequest = {
  encode(message: ImportFacebookFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.reset !== undefined) {
      BoolValue.encode({ value: message.reset! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportFacebookFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFacebookFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountFacebook.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportFacebookFriendsRequest {
    return {
      account: isSet(object.account) ? AccountFacebook.fromJSON(object.account) : undefined,
      reset: isSet(object.reset) ? Boolean(object.reset) : undefined,
    };
  },

  toJSON(message: ImportFacebookFriendsRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountFacebook.toJSON(message.account);
    }
    if (message.reset !== undefined) {
      obj.reset = message.reset;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFacebookFriendsRequest>, I>>(base?: I): ImportFacebookFriendsRequest {
    return ImportFacebookFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImportFacebookFriendsRequest>, I>>(object: I): ImportFacebookFriendsRequest {
    const message = createBaseImportFacebookFriendsRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountFacebook.fromPartial(object.account)
      : undefined;
    message.reset = object.reset ?? undefined;
    return message;
  },
};

function createBaseImportSteamFriendsRequest(): ImportSteamFriendsRequest {
  return { account: undefined, reset: undefined };
}

export const ImportSteamFriendsRequest = {
  encode(message: ImportSteamFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.reset !== undefined) {
      BoolValue.encode({ value: message.reset! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportSteamFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportSteamFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountSteam.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportSteamFriendsRequest {
    return {
      account: isSet(object.account) ? AccountSteam.fromJSON(object.account) : undefined,
      reset: isSet(object.reset) ? Boolean(object.reset) : undefined,
    };
  },

  toJSON(message: ImportSteamFriendsRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountSteam.toJSON(message.account);
    }
    if (message.reset !== undefined) {
      obj.reset = message.reset;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportSteamFriendsRequest>, I>>(base?: I): ImportSteamFriendsRequest {
    return ImportSteamFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImportSteamFriendsRequest>, I>>(object: I): ImportSteamFriendsRequest {
    const message = createBaseImportSteamFriendsRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountSteam.fromPartial(object.account)
      : undefined;
    message.reset = object.reset ?? undefined;
    return message;
  },
};

function createBaseJoinGroupRequest(): JoinGroupRequest {
  return { group_id: "" };
}

export const JoinGroupRequest = {
  encode(message: JoinGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JoinGroupRequest {
    return { group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "" };
  },

  toJSON(message: JoinGroupRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinGroupRequest>, I>>(base?: I): JoinGroupRequest {
    return JoinGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JoinGroupRequest>, I>>(object: I): JoinGroupRequest {
    const message = createBaseJoinGroupRequest();
    message.group_id = object.group_id ?? "";
    return message;
  },
};

function createBaseJoinTournamentRequest(): JoinTournamentRequest {
  return { tournament_id: "" };
}

export const JoinTournamentRequest = {
  encode(message: JoinTournamentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinTournamentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinTournamentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournament_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JoinTournamentRequest {
    return { tournament_id: isSet(object.tournament_id) ? globalThis.String(object.tournament_id) : "" };
  },

  toJSON(message: JoinTournamentRequest): unknown {
    const obj: any = {};
    if (message.tournament_id !== "") {
      obj.tournament_id = message.tournament_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinTournamentRequest>, I>>(base?: I): JoinTournamentRequest {
    return JoinTournamentRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JoinTournamentRequest>, I>>(object: I): JoinTournamentRequest {
    const message = createBaseJoinTournamentRequest();
    message.tournament_id = object.tournament_id ?? "";
    return message;
  },
};

function createBaseKickGroupUsersRequest(): KickGroupUsersRequest {
  return { group_id: "", user_ids: [] };
}

export const KickGroupUsersRequest = {
  encode(message: KickGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KickGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKickGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KickGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: KickGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KickGroupUsersRequest>, I>>(base?: I): KickGroupUsersRequest {
    return KickGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KickGroupUsersRequest>, I>>(object: I): KickGroupUsersRequest {
    const message = createBaseKickGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseLeaderboard(): Leaderboard {
  return {
    id: "",
    sort_order: 0,
    operator: 0,
    prev_reset: 0,
    next_reset: 0,
    metadata: "",
    create_time: undefined,
    authoritative: false,
  };
}

export const Leaderboard = {
  encode(message: Leaderboard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.sort_order !== 0) {
      writer.uint32(16).uint32(message.sort_order);
    }
    if (message.operator !== 0) {
      writer.uint32(24).int32(message.operator);
    }
    if (message.prev_reset !== 0) {
      writer.uint32(32).uint32(message.prev_reset);
    }
    if (message.next_reset !== 0) {
      writer.uint32(40).uint32(message.next_reset);
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(58).fork()).ldelim();
    }
    if (message.authoritative === true) {
      writer.uint32(64).bool(message.authoritative);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Leaderboard {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sort_order = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.prev_reset = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.next_reset = reader.uint32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.authoritative = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Leaderboard {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sort_order: isSet(object.sort_order) ? globalThis.Number(object.sort_order) : 0,
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
      prev_reset: isSet(object.prev_reset) ? globalThis.Number(object.prev_reset) : 0,
      next_reset: isSet(object.next_reset) ? globalThis.Number(object.next_reset) : 0,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      authoritative: isSet(object.authoritative) ? globalThis.Boolean(object.authoritative) : false,
    };
  },

  toJSON(message: Leaderboard): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sort_order !== 0) {
      obj.sort_order = Math.round(message.sort_order);
    }
    if (message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    if (message.prev_reset !== 0) {
      obj.prev_reset = Math.round(message.prev_reset);
    }
    if (message.next_reset !== 0) {
      obj.next_reset = Math.round(message.next_reset);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.authoritative === true) {
      obj.authoritative = message.authoritative;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Leaderboard>, I>>(base?: I): Leaderboard {
    return Leaderboard.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Leaderboard>, I>>(object: I): Leaderboard {
    const message = createBaseLeaderboard();
    message.id = object.id ?? "";
    message.sort_order = object.sort_order ?? 0;
    message.operator = object.operator ?? 0;
    message.prev_reset = object.prev_reset ?? 0;
    message.next_reset = object.next_reset ?? 0;
    message.metadata = object.metadata ?? "";
    message.create_time = object.create_time ?? undefined;
    message.authoritative = object.authoritative ?? false;
    return message;
  },
};

function createBaseLeaderboardList(): LeaderboardList {
  return { leaderboards: [], cursor: "" };
}

export const LeaderboardList = {
  encode(message: LeaderboardList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.leaderboards) {
      Leaderboard.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboards.push(Leaderboard.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaderboardList {
    return {
      leaderboards: globalThis.Array.isArray(object?.leaderboards)
        ? object.leaderboards.map((e: any) => Leaderboard.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: LeaderboardList): unknown {
    const obj: any = {};
    if (message.leaderboards?.length) {
      obj.leaderboards = message.leaderboards.map((e) => Leaderboard.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaderboardList>, I>>(base?: I): LeaderboardList {
    return LeaderboardList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LeaderboardList>, I>>(object: I): LeaderboardList {
    const message = createBaseLeaderboardList();
    message.leaderboards = object.leaderboards?.map((e) => Leaderboard.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseLeaderboardRecord(): LeaderboardRecord {
  return {
    leaderboard_id: "",
    owner_id: "",
    username: undefined,
    score: 0,
    subscore: 0,
    num_score: 0,
    metadata: "",
    create_time: undefined,
    update_time: undefined,
    expiry_time: undefined,
    rank: 0,
    max_num_score: 0,
  };
}

export const LeaderboardRecord = {
  encode(message: LeaderboardRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.owner_id !== "") {
      writer.uint32(18).string(message.owner_id);
    }
    if (message.username !== undefined) {
      StringValue.encode({ value: message.username! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.score !== 0) {
      writer.uint32(32).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(40).int64(message.subscore);
    }
    if (message.num_score !== 0) {
      writer.uint32(48).int32(message.num_score);
    }
    if (message.metadata !== "") {
      writer.uint32(58).string(message.metadata);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(66).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(74).fork()).ldelim();
    }
    if (message.expiry_time !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry_time), writer.uint32(82).fork()).ldelim();
    }
    if (message.rank !== 0) {
      writer.uint32(88).int64(message.rank);
    }
    if (message.max_num_score !== 0) {
      writer.uint32(96).uint32(message.max_num_score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboard_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.score = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.subscore = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.num_score = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.expiry_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.rank = longToNumber(reader.int64() as Long);
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.max_num_score = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaderboardRecord {
    return {
      leaderboard_id: isSet(object.leaderboard_id) ? globalThis.String(object.leaderboard_id) : "",
      owner_id: isSet(object.owner_id) ? globalThis.String(object.owner_id) : "",
      username: isSet(object.username) ? String(object.username) : undefined,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      subscore: isSet(object.subscore) ? globalThis.Number(object.subscore) : 0,
      num_score: isSet(object.num_score) ? globalThis.Number(object.num_score) : 0,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      expiry_time: isSet(object.expiry_time) ? fromJsonTimestamp(object.expiry_time) : undefined,
      rank: isSet(object.rank) ? globalThis.Number(object.rank) : 0,
      max_num_score: isSet(object.max_num_score) ? globalThis.Number(object.max_num_score) : 0,
    };
  },

  toJSON(message: LeaderboardRecord): unknown {
    const obj: any = {};
    if (message.leaderboard_id !== "") {
      obj.leaderboard_id = message.leaderboard_id;
    }
    if (message.owner_id !== "") {
      obj.owner_id = message.owner_id;
    }
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.subscore !== 0) {
      obj.subscore = Math.round(message.subscore);
    }
    if (message.num_score !== 0) {
      obj.num_score = Math.round(message.num_score);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    if (message.expiry_time !== undefined) {
      obj.expiry_time = message.expiry_time.toISOString();
    }
    if (message.rank !== 0) {
      obj.rank = Math.round(message.rank);
    }
    if (message.max_num_score !== 0) {
      obj.max_num_score = Math.round(message.max_num_score);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaderboardRecord>, I>>(base?: I): LeaderboardRecord {
    return LeaderboardRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LeaderboardRecord>, I>>(object: I): LeaderboardRecord {
    const message = createBaseLeaderboardRecord();
    message.leaderboard_id = object.leaderboard_id ?? "";
    message.owner_id = object.owner_id ?? "";
    message.username = object.username ?? undefined;
    message.score = object.score ?? 0;
    message.subscore = object.subscore ?? 0;
    message.num_score = object.num_score ?? 0;
    message.metadata = object.metadata ?? "";
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.expiry_time = object.expiry_time ?? undefined;
    message.rank = object.rank ?? 0;
    message.max_num_score = object.max_num_score ?? 0;
    return message;
  },
};

function createBaseLeaderboardRecordList(): LeaderboardRecordList {
  return { records: [], owner_records: [], next_cursor: "", prev_cursor: "", rank_count: 0 };
}

export const LeaderboardRecordList = {
  encode(message: LeaderboardRecordList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.records) {
      LeaderboardRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.owner_records) {
      LeaderboardRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(26).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(34).string(message.prev_cursor);
    }
    if (message.rank_count !== 0) {
      writer.uint32(40).int64(message.rank_count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRecordList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardRecordList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.records.push(LeaderboardRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner_records.push(LeaderboardRecord.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.next_cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.rank_count = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaderboardRecordList {
    return {
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => LeaderboardRecord.fromJSON(e))
        : [],
      owner_records: globalThis.Array.isArray(object?.owner_records)
        ? object.owner_records.map((e: any) => LeaderboardRecord.fromJSON(e))
        : [],
      next_cursor: isSet(object.next_cursor) ? globalThis.String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
      rank_count: isSet(object.rank_count) ? globalThis.Number(object.rank_count) : 0,
    };
  },

  toJSON(message: LeaderboardRecordList): unknown {
    const obj: any = {};
    if (message.records?.length) {
      obj.records = message.records.map((e) => LeaderboardRecord.toJSON(e));
    }
    if (message.owner_records?.length) {
      obj.owner_records = message.owner_records.map((e) => LeaderboardRecord.toJSON(e));
    }
    if (message.next_cursor !== "") {
      obj.next_cursor = message.next_cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    if (message.rank_count !== 0) {
      obj.rank_count = Math.round(message.rank_count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaderboardRecordList>, I>>(base?: I): LeaderboardRecordList {
    return LeaderboardRecordList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LeaderboardRecordList>, I>>(object: I): LeaderboardRecordList {
    const message = createBaseLeaderboardRecordList();
    message.records = object.records?.map((e) => LeaderboardRecord.fromPartial(e)) || [];
    message.owner_records = object.owner_records?.map((e) => LeaderboardRecord.fromPartial(e)) || [];
    message.next_cursor = object.next_cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    message.rank_count = object.rank_count ?? 0;
    return message;
  },
};

function createBaseLeaveGroupRequest(): LeaveGroupRequest {
  return { group_id: "" };
}

export const LeaveGroupRequest = {
  encode(message: LeaveGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaveGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaveGroupRequest {
    return { group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "" };
  },

  toJSON(message: LeaveGroupRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaveGroupRequest>, I>>(base?: I): LeaveGroupRequest {
    return LeaveGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LeaveGroupRequest>, I>>(object: I): LeaveGroupRequest {
    const message = createBaseLeaveGroupRequest();
    message.group_id = object.group_id ?? "";
    return message;
  },
};

function createBaseLinkFacebookRequest(): LinkFacebookRequest {
  return { account: undefined, sync: undefined };
}

export const LinkFacebookRequest = {
  encode(message: LinkFacebookRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountFacebook.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.sync !== undefined) {
      BoolValue.encode({ value: message.sync! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkFacebookRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkFacebookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountFacebook.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LinkFacebookRequest {
    return {
      account: isSet(object.account) ? AccountFacebook.fromJSON(object.account) : undefined,
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: LinkFacebookRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountFacebook.toJSON(message.account);
    }
    if (message.sync !== undefined) {
      obj.sync = message.sync;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkFacebookRequest>, I>>(base?: I): LinkFacebookRequest {
    return LinkFacebookRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LinkFacebookRequest>, I>>(object: I): LinkFacebookRequest {
    const message = createBaseLinkFacebookRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountFacebook.fromPartial(object.account)
      : undefined;
    message.sync = object.sync ?? undefined;
    return message;
  },
};

function createBaseLinkSteamRequest(): LinkSteamRequest {
  return { account: undefined, sync: undefined };
}

export const LinkSteamRequest = {
  encode(message: LinkSteamRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      AccountSteam.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    if (message.sync !== undefined) {
      BoolValue.encode({ value: message.sync! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkSteamRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkSteamRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = AccountSteam.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LinkSteamRequest {
    return {
      account: isSet(object.account) ? AccountSteam.fromJSON(object.account) : undefined,
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: LinkSteamRequest): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = AccountSteam.toJSON(message.account);
    }
    if (message.sync !== undefined) {
      obj.sync = message.sync;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkSteamRequest>, I>>(base?: I): LinkSteamRequest {
    return LinkSteamRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LinkSteamRequest>, I>>(object: I): LinkSteamRequest {
    const message = createBaseLinkSteamRequest();
    message.account = (object.account !== undefined && object.account !== null)
      ? AccountSteam.fromPartial(object.account)
      : undefined;
    message.sync = object.sync ?? undefined;
    return message;
  },
};

function createBaseListChannelMessagesRequest(): ListChannelMessagesRequest {
  return { channel_id: "", limit: undefined, forward: undefined, cursor: "" };
}

export const ListChannelMessagesRequest = {
  encode(message: ListChannelMessagesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.forward !== undefined) {
      BoolValue.encode({ value: message.forward! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.forward = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListChannelMessagesRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      forward: isSet(object.forward) ? Boolean(object.forward) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListChannelMessagesRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.forward !== undefined) {
      obj.forward = message.forward;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelMessagesRequest>, I>>(base?: I): ListChannelMessagesRequest {
    return ListChannelMessagesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListChannelMessagesRequest>, I>>(object: I): ListChannelMessagesRequest {
    const message = createBaseListChannelMessagesRequest();
    message.channel_id = object.channel_id ?? "";
    message.limit = object.limit ?? undefined;
    message.forward = object.forward ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListFriendsRequest(): ListFriendsRequest {
  return { limit: undefined, state: undefined, cursor: "" };
}

export const ListFriendsRequest = {
  encode(message: ListFriendsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFriendsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListFriendsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListFriendsRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFriendsRequest>, I>>(base?: I): ListFriendsRequest {
    return ListFriendsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListFriendsRequest>, I>>(object: I): ListFriendsRequest {
    const message = createBaseListFriendsRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListGroupsRequest(): ListGroupsRequest {
  return { name: "", cursor: "", limit: undefined, lang_tag: "", members: undefined, open: undefined };
}

export const ListGroupsRequest = {
  encode(message: ListGroupsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.lang_tag !== "") {
      writer.uint32(34).string(message.lang_tag);
    }
    if (message.members !== undefined) {
      Int32Value.encode({ value: message.members! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.open !== undefined) {
      BoolValue.encode({ value: message.open! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListGroupsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lang_tag = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.members = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.open = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListGroupsRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      lang_tag: isSet(object.lang_tag) ? globalThis.String(object.lang_tag) : "",
      members: isSet(object.members) ? Number(object.members) : undefined,
      open: isSet(object.open) ? Boolean(object.open) : undefined,
    };
  },

  toJSON(message: ListGroupsRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.lang_tag !== "") {
      obj.lang_tag = message.lang_tag;
    }
    if (message.members !== undefined) {
      obj.members = message.members;
    }
    if (message.open !== undefined) {
      obj.open = message.open;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListGroupsRequest>, I>>(base?: I): ListGroupsRequest {
    return ListGroupsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListGroupsRequest>, I>>(object: I): ListGroupsRequest {
    const message = createBaseListGroupsRequest();
    message.name = object.name ?? "";
    message.cursor = object.cursor ?? "";
    message.limit = object.limit ?? undefined;
    message.lang_tag = object.lang_tag ?? "";
    message.members = object.members ?? undefined;
    message.open = object.open ?? undefined;
    return message;
  },
};

function createBaseListGroupUsersRequest(): ListGroupUsersRequest {
  return { group_id: "", limit: undefined, state: undefined, cursor: "" };
}

export const ListGroupUsersRequest = {
  encode(message: ListGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListGroupUsersRequest>, I>>(base?: I): ListGroupUsersRequest {
    return ListGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListGroupUsersRequest>, I>>(object: I): ListGroupUsersRequest {
    const message = createBaseListGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListChannelUsersRequest(): ListChannelUsersRequest {
  return { channel_id: "", limit: undefined, state: undefined, cursor: "" };
}

export const ListChannelUsersRequest = {
  encode(message: ListChannelUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListChannelUsersRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListChannelUsersRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelUsersRequest>, I>>(base?: I): ListChannelUsersRequest {
    return ListChannelUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListChannelUsersRequest>, I>>(object: I): ListChannelUsersRequest {
    const message = createBaseListChannelUsersRequest();
    message.channel_id = object.channel_id ?? "";
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListLeaderboardRecordsAroundOwnerRequest(): ListLeaderboardRecordsAroundOwnerRequest {
  return { leaderboard_id: "", limit: undefined, owner_id: "", expiry: undefined, cursor: "" };
}

export const ListLeaderboardRecordsAroundOwnerRequest = {
  encode(message: ListLeaderboardRecordsAroundOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.limit !== undefined) {
      UInt32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.owner_id !== "") {
      writer.uint32(26).string(message.owner_id);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode({ value: message.expiry! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(42).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListLeaderboardRecordsAroundOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLeaderboardRecordsAroundOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboard_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListLeaderboardRecordsAroundOwnerRequest {
    return {
      leaderboard_id: isSet(object.leaderboard_id) ? globalThis.String(object.leaderboard_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      owner_id: isSet(object.owner_id) ? globalThis.String(object.owner_id) : "",
      expiry: isSet(object.expiry) ? Number(object.expiry) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListLeaderboardRecordsAroundOwnerRequest): unknown {
    const obj: any = {};
    if (message.leaderboard_id !== "") {
      obj.leaderboard_id = message.leaderboard_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.owner_id !== "") {
      obj.owner_id = message.owner_id;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListLeaderboardRecordsAroundOwnerRequest>, I>>(
    base?: I,
  ): ListLeaderboardRecordsAroundOwnerRequest {
    return ListLeaderboardRecordsAroundOwnerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListLeaderboardRecordsAroundOwnerRequest>, I>>(
    object: I,
  ): ListLeaderboardRecordsAroundOwnerRequest {
    const message = createBaseListLeaderboardRecordsAroundOwnerRequest();
    message.leaderboard_id = object.leaderboard_id ?? "";
    message.limit = object.limit ?? undefined;
    message.owner_id = object.owner_id ?? "";
    message.expiry = object.expiry ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListLeaderboardRecordsRequest(): ListLeaderboardRecordsRequest {
  return { leaderboard_id: "", owner_ids: [], limit: undefined, cursor: "", expiry: undefined };
}

export const ListLeaderboardRecordsRequest = {
  encode(message: ListLeaderboardRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    for (const v of message.owner_ids) {
      writer.uint32(18).string(v!);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode({ value: message.expiry! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListLeaderboardRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLeaderboardRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboard_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner_ids.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListLeaderboardRecordsRequest {
    return {
      leaderboard_id: isSet(object.leaderboard_id) ? globalThis.String(object.leaderboard_id) : "",
      owner_ids: globalThis.Array.isArray(object?.owner_ids)
        ? object.owner_ids.map((e: any) => globalThis.String(e))
        : [],
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      expiry: isSet(object.expiry) ? Number(object.expiry) : undefined,
    };
  },

  toJSON(message: ListLeaderboardRecordsRequest): unknown {
    const obj: any = {};
    if (message.leaderboard_id !== "") {
      obj.leaderboard_id = message.leaderboard_id;
    }
    if (message.owner_ids?.length) {
      obj.owner_ids = message.owner_ids;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListLeaderboardRecordsRequest>, I>>(base?: I): ListLeaderboardRecordsRequest {
    return ListLeaderboardRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListLeaderboardRecordsRequest>, I>>(
    object: I,
  ): ListLeaderboardRecordsRequest {
    const message = createBaseListLeaderboardRecordsRequest();
    message.leaderboard_id = object.leaderboard_id ?? "";
    message.owner_ids = object.owner_ids?.map((e) => e) || [];
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    message.expiry = object.expiry ?? undefined;
    return message;
  },
};

function createBaseListMatchesRequest(): ListMatchesRequest {
  return {
    limit: undefined,
    authoritative: undefined,
    label: undefined,
    min_size: undefined,
    max_size: undefined,
    query: undefined,
  };
}

export const ListMatchesRequest = {
  encode(message: ListMatchesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.authoritative !== undefined) {
      BoolValue.encode({ value: message.authoritative! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.label !== undefined) {
      StringValue.encode({ value: message.label! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.min_size !== undefined) {
      Int32Value.encode({ value: message.min_size! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.max_size !== undefined) {
      Int32Value.encode({ value: message.max_size! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.query !== undefined) {
      StringValue.encode({ value: message.query! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMatchesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMatchesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authoritative = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.label = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.min_size = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.max_size = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.query = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMatchesRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      authoritative: isSet(object.authoritative) ? Boolean(object.authoritative) : undefined,
      label: isSet(object.label) ? String(object.label) : undefined,
      min_size: isSet(object.min_size) ? Number(object.min_size) : undefined,
      max_size: isSet(object.max_size) ? Number(object.max_size) : undefined,
      query: isSet(object.query) ? String(object.query) : undefined,
    };
  },

  toJSON(message: ListMatchesRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.authoritative !== undefined) {
      obj.authoritative = message.authoritative;
    }
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.min_size !== undefined) {
      obj.min_size = message.min_size;
    }
    if (message.max_size !== undefined) {
      obj.max_size = message.max_size;
    }
    if (message.query !== undefined) {
      obj.query = message.query;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMatchesRequest>, I>>(base?: I): ListMatchesRequest {
    return ListMatchesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListMatchesRequest>, I>>(object: I): ListMatchesRequest {
    const message = createBaseListMatchesRequest();
    message.limit = object.limit ?? undefined;
    message.authoritative = object.authoritative ?? undefined;
    message.label = object.label ?? undefined;
    message.min_size = object.min_size ?? undefined;
    message.max_size = object.max_size ?? undefined;
    message.query = object.query ?? undefined;
    return message;
  },
};

function createBaseListNotificationsRequest(): ListNotificationsRequest {
  return { limit: undefined, cacheable_cursor: "" };
}

export const ListNotificationsRequest = {
  encode(message: ListNotificationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(18).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cacheable_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cacheable_cursor: isSet(object.cacheable_cursor) ? globalThis.String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: ListNotificationsRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cacheable_cursor !== "") {
      obj.cacheable_cursor = message.cacheable_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListNotificationsRequest>, I>>(base?: I): ListNotificationsRequest {
    return ListNotificationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListNotificationsRequest>, I>>(object: I): ListNotificationsRequest {
    const message = createBaseListNotificationsRequest();
    message.limit = object.limit ?? undefined;
    message.cacheable_cursor = object.cacheable_cursor ?? "";
    return message;
  },
};

function createBaseListStorageObjectsRequest(): ListStorageObjectsRequest {
  return { user_id: "", collection: "", limit: undefined, cursor: "" };
}

export const ListStorageObjectsRequest = {
  encode(message: ListStorageObjectsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.collection !== "") {
      writer.uint32(18).string(message.collection);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListStorageObjectsRequest {
    return {
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListStorageObjectsRequest>, I>>(base?: I): ListStorageObjectsRequest {
    return ListStorageObjectsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListStorageObjectsRequest>, I>>(object: I): ListStorageObjectsRequest {
    const message = createBaseListStorageObjectsRequest();
    message.user_id = object.user_id ?? "";
    message.collection = object.collection ?? "";
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListSubscriptionsRequest(): ListSubscriptionsRequest {
  return { limit: undefined, cursor: "" };
}

export const ListSubscriptionsRequest = {
  encode(message: ListSubscriptionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSubscriptionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSubscriptionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSubscriptionsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListSubscriptionsRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSubscriptionsRequest>, I>>(base?: I): ListSubscriptionsRequest {
    return ListSubscriptionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSubscriptionsRequest>, I>>(object: I): ListSubscriptionsRequest {
    const message = createBaseListSubscriptionsRequest();
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListTournamentRecordsAroundOwnerRequest(): ListTournamentRecordsAroundOwnerRequest {
  return { tournament_id: "", limit: undefined, owner_id: "", expiry: undefined, cursor: "" };
}

export const ListTournamentRecordsAroundOwnerRequest = {
  encode(message: ListTournamentRecordsAroundOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    if (message.limit !== undefined) {
      UInt32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.owner_id !== "") {
      writer.uint32(26).string(message.owner_id);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode({ value: message.expiry! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(42).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentRecordsAroundOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTournamentRecordsAroundOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournament_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListTournamentRecordsAroundOwnerRequest {
    return {
      tournament_id: isSet(object.tournament_id) ? globalThis.String(object.tournament_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      owner_id: isSet(object.owner_id) ? globalThis.String(object.owner_id) : "",
      expiry: isSet(object.expiry) ? Number(object.expiry) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListTournamentRecordsAroundOwnerRequest): unknown {
    const obj: any = {};
    if (message.tournament_id !== "") {
      obj.tournament_id = message.tournament_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.owner_id !== "") {
      obj.owner_id = message.owner_id;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTournamentRecordsAroundOwnerRequest>, I>>(
    base?: I,
  ): ListTournamentRecordsAroundOwnerRequest {
    return ListTournamentRecordsAroundOwnerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTournamentRecordsAroundOwnerRequest>, I>>(
    object: I,
  ): ListTournamentRecordsAroundOwnerRequest {
    const message = createBaseListTournamentRecordsAroundOwnerRequest();
    message.tournament_id = object.tournament_id ?? "";
    message.limit = object.limit ?? undefined;
    message.owner_id = object.owner_id ?? "";
    message.expiry = object.expiry ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListTournamentRecordsRequest(): ListTournamentRecordsRequest {
  return { tournament_id: "", owner_ids: [], limit: undefined, cursor: "", expiry: undefined };
}

export const ListTournamentRecordsRequest = {
  encode(message: ListTournamentRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    for (const v of message.owner_ids) {
      writer.uint32(18).string(v!);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    if (message.expiry !== undefined) {
      Int64Value.encode({ value: message.expiry! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTournamentRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournament_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner_ids.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.expiry = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListTournamentRecordsRequest {
    return {
      tournament_id: isSet(object.tournament_id) ? globalThis.String(object.tournament_id) : "",
      owner_ids: globalThis.Array.isArray(object?.owner_ids)
        ? object.owner_ids.map((e: any) => globalThis.String(e))
        : [],
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      expiry: isSet(object.expiry) ? Number(object.expiry) : undefined,
    };
  },

  toJSON(message: ListTournamentRecordsRequest): unknown {
    const obj: any = {};
    if (message.tournament_id !== "") {
      obj.tournament_id = message.tournament_id;
    }
    if (message.owner_ids?.length) {
      obj.owner_ids = message.owner_ids;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTournamentRecordsRequest>, I>>(base?: I): ListTournamentRecordsRequest {
    return ListTournamentRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTournamentRecordsRequest>, I>>(object: I): ListTournamentRecordsRequest {
    const message = createBaseListTournamentRecordsRequest();
    message.tournament_id = object.tournament_id ?? "";
    message.owner_ids = object.owner_ids?.map((e) => e) || [];
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    message.expiry = object.expiry ?? undefined;
    return message;
  },
};

function createBaseListTournamentsRequest(): ListTournamentsRequest {
  return {
    category_start: undefined,
    category_end: undefined,
    start_time: undefined,
    end_time: undefined,
    limit: undefined,
    cursor: "",
  };
}

export const ListTournamentsRequest = {
  encode(message: ListTournamentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category_start !== undefined) {
      UInt32Value.encode({ value: message.category_start! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.category_end !== undefined) {
      UInt32Value.encode({ value: message.category_end! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.start_time !== undefined) {
      UInt32Value.encode({ value: message.start_time! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.end_time !== undefined) {
      UInt32Value.encode({ value: message.end_time! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(66).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTournamentsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTournamentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.category_start = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category_end = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.start_time = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.end_time = UInt32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListTournamentsRequest {
    return {
      category_start: isSet(object.category_start) ? Number(object.category_start) : undefined,
      category_end: isSet(object.category_end) ? Number(object.category_end) : undefined,
      start_time: isSet(object.start_time) ? Number(object.start_time) : undefined,
      end_time: isSet(object.end_time) ? Number(object.end_time) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListTournamentsRequest): unknown {
    const obj: any = {};
    if (message.category_start !== undefined) {
      obj.category_start = message.category_start;
    }
    if (message.category_end !== undefined) {
      obj.category_end = message.category_end;
    }
    if (message.start_time !== undefined) {
      obj.start_time = message.start_time;
    }
    if (message.end_time !== undefined) {
      obj.end_time = message.end_time;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTournamentsRequest>, I>>(base?: I): ListTournamentsRequest {
    return ListTournamentsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListTournamentsRequest>, I>>(object: I): ListTournamentsRequest {
    const message = createBaseListTournamentsRequest();
    message.category_start = object.category_start ?? undefined;
    message.category_end = object.category_end ?? undefined;
    message.start_time = object.start_time ?? undefined;
    message.end_time = object.end_time ?? undefined;
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListUserGroupsRequest(): ListUserGroupsRequest {
  return { user_id: "", limit: undefined, state: undefined, cursor: "" };
}

export const ListUserGroupsRequest = {
  encode(message: ListUserGroupsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(34).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUserGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserGroupsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListUserGroupsRequest {
    return {
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListUserGroupsRequest): unknown {
    const obj: any = {};
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListUserGroupsRequest>, I>>(base?: I): ListUserGroupsRequest {
    return ListUserGroupsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListUserGroupsRequest>, I>>(object: I): ListUserGroupsRequest {
    const message = createBaseListUserGroupsRequest();
    message.user_id = object.user_id ?? "";
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseMatch(): Match {
  return { match_id: "", authoritative: false, label: undefined, size: 0, tick_rate: 0, handler_name: "" };
}

export const Match = {
  encode(message: Match, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.authoritative === true) {
      writer.uint32(16).bool(message.authoritative);
    }
    if (message.label !== undefined) {
      StringValue.encode({ value: message.label! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(32).int32(message.size);
    }
    if (message.tick_rate !== 0) {
      writer.uint32(40).int32(message.tick_rate);
    }
    if (message.handler_name !== "") {
      writer.uint32(50).string(message.handler_name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.match_id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.authoritative = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.label = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.size = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.tick_rate = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.handler_name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Match {
    return {
      match_id: isSet(object.match_id) ? globalThis.String(object.match_id) : "",
      authoritative: isSet(object.authoritative) ? globalThis.Boolean(object.authoritative) : false,
      label: isSet(object.label) ? String(object.label) : undefined,
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      tick_rate: isSet(object.tick_rate) ? globalThis.Number(object.tick_rate) : 0,
      handler_name: isSet(object.handler_name) ? globalThis.String(object.handler_name) : "",
    };
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    if (message.match_id !== "") {
      obj.match_id = message.match_id;
    }
    if (message.authoritative === true) {
      obj.authoritative = message.authoritative;
    }
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.tick_rate !== 0) {
      obj.tick_rate = Math.round(message.tick_rate);
    }
    if (message.handler_name !== "") {
      obj.handler_name = message.handler_name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Match>, I>>(base?: I): Match {
    return Match.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Match>, I>>(object: I): Match {
    const message = createBaseMatch();
    message.match_id = object.match_id ?? "";
    message.authoritative = object.authoritative ?? false;
    message.label = object.label ?? undefined;
    message.size = object.size ?? 0;
    message.tick_rate = object.tick_rate ?? 0;
    message.handler_name = object.handler_name ?? "";
    return message;
  },
};

function createBaseMatchList(): MatchList {
  return { matches: [] };
}

export const MatchList = {
  encode(message: MatchList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.matches) {
      Match.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.matches.push(Match.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MatchList {
    return {
      matches: globalThis.Array.isArray(object?.matches) ? object.matches.map((e: any) => Match.fromJSON(e)) : [],
    };
  },

  toJSON(message: MatchList): unknown {
    const obj: any = {};
    if (message.matches?.length) {
      obj.matches = message.matches.map((e) => Match.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchList>, I>>(base?: I): MatchList {
    return MatchList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MatchList>, I>>(object: I): MatchList {
    const message = createBaseMatchList();
    message.matches = object.matches?.map((e) => Match.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNotification(): Notification {
  return { id: "", subject: "", content: "", code: 0, sender_id: "", create_time: undefined, persistent: false };
}

export const Notification = {
  encode(message: Notification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent === true) {
      writer.uint32(56).bool(message.persistent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.code = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sender_id = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.persistent = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Notification {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      subject: isSet(object.subject) ? globalThis.String(object.subject) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      sender_id: isSet(object.sender_id) ? globalThis.String(object.sender_id) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      persistent: isSet(object.persistent) ? globalThis.Boolean(object.persistent) : false,
    };
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.sender_id !== "") {
      obj.sender_id = message.sender_id;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.persistent === true) {
      obj.persistent = message.persistent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Notification>, I>>(base?: I): Notification {
    return Notification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Notification>, I>>(object: I): Notification {
    const message = createBaseNotification();
    message.id = object.id ?? "";
    message.subject = object.subject ?? "";
    message.content = object.content ?? "";
    message.code = object.code ?? 0;
    message.sender_id = object.sender_id ?? "";
    message.create_time = object.create_time ?? undefined;
    message.persistent = object.persistent ?? false;
    return message;
  },
};

function createBaseNotificationList(): NotificationList {
  return { notifications: [], cacheable_cursor: "" };
}

export const NotificationList = {
  encode(message: NotificationList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(18).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NotificationList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotificationList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.notifications.push(Notification.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cacheable_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NotificationList {
    return {
      notifications: globalThis.Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => Notification.fromJSON(e))
        : [],
      cacheable_cursor: isSet(object.cacheable_cursor) ? globalThis.String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: NotificationList): unknown {
    const obj: any = {};
    if (message.notifications?.length) {
      obj.notifications = message.notifications.map((e) => Notification.toJSON(e));
    }
    if (message.cacheable_cursor !== "") {
      obj.cacheable_cursor = message.cacheable_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NotificationList>, I>>(base?: I): NotificationList {
    return NotificationList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NotificationList>, I>>(object: I): NotificationList {
    const message = createBaseNotificationList();
    message.notifications = object.notifications?.map((e) => Notification.fromPartial(e)) || [];
    message.cacheable_cursor = object.cacheable_cursor ?? "";
    return message;
  },
};

function createBasePromoteGroupUsersRequest(): PromoteGroupUsersRequest {
  return { group_id: "", user_ids: [] };
}

export const PromoteGroupUsersRequest = {
  encode(message: PromoteGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PromoteGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePromoteGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PromoteGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: PromoteGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PromoteGroupUsersRequest>, I>>(base?: I): PromoteGroupUsersRequest {
    return PromoteGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PromoteGroupUsersRequest>, I>>(object: I): PromoteGroupUsersRequest {
    const message = createBasePromoteGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseDemoteGroupUsersRequest(): DemoteGroupUsersRequest {
  return { group_id: "", user_ids: [] };
}

export const DemoteGroupUsersRequest = {
  encode(message: DemoteGroupUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DemoteGroupUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDemoteGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DemoteGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: DemoteGroupUsersRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DemoteGroupUsersRequest>, I>>(base?: I): DemoteGroupUsersRequest {
    return DemoteGroupUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DemoteGroupUsersRequest>, I>>(object: I): DemoteGroupUsersRequest {
    const message = createBaseDemoteGroupUsersRequest();
    message.group_id = object.group_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseReadStorageObjectId(): ReadStorageObjectId {
  return { collection: "", key: "", user_id: "" };
}

export const ReadStorageObjectId = {
  encode(message: ReadStorageObjectId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.user_id !== "") {
      writer.uint32(26).string(message.user_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadStorageObjectId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadStorageObjectId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.user_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectId {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
    };
  },

  toJSON(message: ReadStorageObjectId): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadStorageObjectId>, I>>(base?: I): ReadStorageObjectId {
    return ReadStorageObjectId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReadStorageObjectId>, I>>(object: I): ReadStorageObjectId {
    const message = createBaseReadStorageObjectId();
    message.collection = object.collection ?? "";
    message.key = object.key ?? "";
    message.user_id = object.user_id ?? "";
    return message;
  },
};

function createBaseReadStorageObjectsRequest(): ReadStorageObjectsRequest {
  return { object_ids: [] };
}

export const ReadStorageObjectsRequest = {
  encode(message: ReadStorageObjectsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.object_ids) {
      ReadStorageObjectId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.object_ids.push(ReadStorageObjectId.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectsRequest {
    return {
      object_ids: globalThis.Array.isArray(object?.object_ids)
        ? object.object_ids.map((e: any) => ReadStorageObjectId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReadStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids?.length) {
      obj.object_ids = message.object_ids.map((e) => ReadStorageObjectId.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadStorageObjectsRequest>, I>>(base?: I): ReadStorageObjectsRequest {
    return ReadStorageObjectsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReadStorageObjectsRequest>, I>>(object: I): ReadStorageObjectsRequest {
    const message = createBaseReadStorageObjectsRequest();
    message.object_ids = object.object_ids?.map((e) => ReadStorageObjectId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRpc(): Rpc {
  return { id: "", payload: "", http_key: "" };
}

export const Rpc = {
  encode(message: Rpc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(18).string(message.payload);
    }
    if (message.http_key !== "") {
      writer.uint32(26).string(message.http_key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rpc {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRpc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.payload = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.http_key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rpc {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      http_key: isSet(object.http_key) ? globalThis.String(object.http_key) : "",
    };
  },

  toJSON(message: Rpc): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.http_key !== "") {
      obj.http_key = message.http_key;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Rpc>, I>>(base?: I): Rpc {
    return Rpc.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Rpc>, I>>(object: I): Rpc {
    const message = createBaseRpc();
    message.id = object.id ?? "";
    message.payload = object.payload ?? "";
    message.http_key = object.http_key ?? "";
    return message;
  },
};

function createBaseSession(): Session {
  return { created: false, token: "", refresh_token: "" };
}

export const Session = {
  encode(message: Session, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created === true) {
      writer.uint32(8).bool(message.created);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.refresh_token !== "") {
      writer.uint32(26).string(message.refresh_token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.created = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.refresh_token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      created: isSet(object.created) ? globalThis.Boolean(object.created) : false,
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      refresh_token: isSet(object.refresh_token) ? globalThis.String(object.refresh_token) : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    if (message.created === true) {
      obj.created = message.created;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.refresh_token !== "") {
      obj.refresh_token = message.refresh_token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
    return Session.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.created = object.created ?? false;
    message.token = object.token ?? "";
    message.refresh_token = object.refresh_token ?? "";
    return message;
  },
};

function createBaseStorageObject(): StorageObject {
  return {
    collection: "",
    key: "",
    user_id: "",
    value: "",
    version: "",
    permission_read: 0,
    permission_write: 0,
    create_time: undefined,
    update_time: undefined,
  };
}

export const StorageObject = {
  encode(message: StorageObject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.user_id !== "") {
      writer.uint32(26).string(message.user_id);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    if (message.version !== "") {
      writer.uint32(42).string(message.version);
    }
    if (message.permission_read !== 0) {
      writer.uint32(48).int32(message.permission_read);
    }
    if (message.permission_write !== 0) {
      writer.uint32(56).int32(message.permission_write);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(66).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.value = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.version = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.permission_read = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.permission_write = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageObject {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      permission_read: isSet(object.permission_read) ? globalThis.Number(object.permission_read) : 0,
      permission_write: isSet(object.permission_write) ? globalThis.Number(object.permission_write) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: StorageObject): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.permission_read !== 0) {
      obj.permission_read = Math.round(message.permission_read);
    }
    if (message.permission_write !== 0) {
      obj.permission_write = Math.round(message.permission_write);
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObject>, I>>(base?: I): StorageObject {
    return StorageObject.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageObject>, I>>(object: I): StorageObject {
    const message = createBaseStorageObject();
    message.collection = object.collection ?? "";
    message.key = object.key ?? "";
    message.user_id = object.user_id ?? "";
    message.value = object.value ?? "";
    message.version = object.version ?? "";
    message.permission_read = object.permission_read ?? 0;
    message.permission_write = object.permission_write ?? 0;
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    return message;
  },
};

function createBaseStorageObjectAck(): StorageObjectAck {
  return { collection: "", key: "", version: "", user_id: "", create_time: undefined, update_time: undefined };
}

export const StorageObjectAck = {
  encode(message: StorageObjectAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.user_id !== "") {
      writer.uint32(34).string(message.user_id);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAck {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: StorageObjectAck): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectAck>, I>>(base?: I): StorageObjectAck {
    return StorageObjectAck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageObjectAck>, I>>(object: I): StorageObjectAck {
    const message = createBaseStorageObjectAck();
    message.collection = object.collection ?? "";
    message.key = object.key ?? "";
    message.version = object.version ?? "";
    message.user_id = object.user_id ?? "";
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    return message;
  },
};

function createBaseStorageObjectAcks(): StorageObjectAcks {
  return { acks: [] };
}

export const StorageObjectAcks = {
  encode(message: StorageObjectAcks, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.acks) {
      StorageObjectAck.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectAcks {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectAcks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acks.push(StorageObjectAck.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAcks {
    return {
      acks: globalThis.Array.isArray(object?.acks) ? object.acks.map((e: any) => StorageObjectAck.fromJSON(e)) : [],
    };
  },

  toJSON(message: StorageObjectAcks): unknown {
    const obj: any = {};
    if (message.acks?.length) {
      obj.acks = message.acks.map((e) => StorageObjectAck.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectAcks>, I>>(base?: I): StorageObjectAcks {
    return StorageObjectAcks.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageObjectAcks>, I>>(object: I): StorageObjectAcks {
    const message = createBaseStorageObjectAcks();
    message.acks = object.acks?.map((e) => StorageObjectAck.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageObjects(): StorageObjects {
  return { objects: [] };
}

export const StorageObjects = {
  encode(message: StorageObjects, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.objects) {
      StorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjects {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjects();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageObjects {
    return {
      objects: globalThis.Array.isArray(object?.objects)
        ? object.objects.map((e: any) => StorageObject.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StorageObjects): unknown {
    const obj: any = {};
    if (message.objects?.length) {
      obj.objects = message.objects.map((e) => StorageObject.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjects>, I>>(base?: I): StorageObjects {
    return StorageObjects.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageObjects>, I>>(object: I): StorageObjects {
    const message = createBaseStorageObjects();
    message.objects = object.objects?.map((e) => StorageObject.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageObjectList(): StorageObjectList {
  return { objects: [], cursor: "" };
}

export const StorageObjectList = {
  encode(message: StorageObjectList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.objects) {
      StorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageObjectList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageObjectList {
    return {
      objects: globalThis.Array.isArray(object?.objects)
        ? object.objects.map((e: any) => StorageObject.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: StorageObjectList): unknown {
    const obj: any = {};
    if (message.objects?.length) {
      obj.objects = message.objects.map((e) => StorageObject.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectList>, I>>(base?: I): StorageObjectList {
    return StorageObjectList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageObjectList>, I>>(object: I): StorageObjectList {
    const message = createBaseStorageObjectList();
    message.objects = object.objects?.map((e) => StorageObject.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseTournament(): Tournament {
  return {
    id: "",
    title: "",
    description: "",
    category: 0,
    sort_order: 0,
    size: 0,
    max_size: 0,
    max_num_score: 0,
    can_enter: false,
    end_active: 0,
    next_reset: 0,
    metadata: "",
    create_time: undefined,
    start_time: undefined,
    end_time: undefined,
    duration: 0,
    start_active: 0,
    prev_reset: 0,
    operator: 0,
    authoritative: false,
  };
}

export const Tournament = {
  encode(message: Tournament, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.category !== 0) {
      writer.uint32(32).uint32(message.category);
    }
    if (message.sort_order !== 0) {
      writer.uint32(40).uint32(message.sort_order);
    }
    if (message.size !== 0) {
      writer.uint32(48).uint32(message.size);
    }
    if (message.max_size !== 0) {
      writer.uint32(56).uint32(message.max_size);
    }
    if (message.max_num_score !== 0) {
      writer.uint32(64).uint32(message.max_num_score);
    }
    if (message.can_enter === true) {
      writer.uint32(72).bool(message.can_enter);
    }
    if (message.end_active !== 0) {
      writer.uint32(80).uint32(message.end_active);
    }
    if (message.next_reset !== 0) {
      writer.uint32(88).uint32(message.next_reset);
    }
    if (message.metadata !== "") {
      writer.uint32(98).string(message.metadata);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(106).fork()).ldelim();
    }
    if (message.start_time !== undefined) {
      Timestamp.encode(toTimestamp(message.start_time), writer.uint32(114).fork()).ldelim();
    }
    if (message.end_time !== undefined) {
      Timestamp.encode(toTimestamp(message.end_time), writer.uint32(122).fork()).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(128).uint32(message.duration);
    }
    if (message.start_active !== 0) {
      writer.uint32(136).uint32(message.start_active);
    }
    if (message.prev_reset !== 0) {
      writer.uint32(144).uint32(message.prev_reset);
    }
    if (message.operator !== 0) {
      writer.uint32(152).int32(message.operator);
    }
    if (message.authoritative === true) {
      writer.uint32(160).bool(message.authoritative);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tournament {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTournament();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.category = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.sort_order = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.size = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.max_size = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.max_num_score = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.can_enter = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.end_active = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.next_reset = reader.uint32();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.start_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.end_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.duration = reader.uint32();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.start_active = reader.uint32();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.prev_reset = reader.uint32();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.authoritative = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tournament {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      category: isSet(object.category) ? globalThis.Number(object.category) : 0,
      sort_order: isSet(object.sort_order) ? globalThis.Number(object.sort_order) : 0,
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      max_size: isSet(object.max_size) ? globalThis.Number(object.max_size) : 0,
      max_num_score: isSet(object.max_num_score) ? globalThis.Number(object.max_num_score) : 0,
      can_enter: isSet(object.can_enter) ? globalThis.Boolean(object.can_enter) : false,
      end_active: isSet(object.end_active) ? globalThis.Number(object.end_active) : 0,
      next_reset: isSet(object.next_reset) ? globalThis.Number(object.next_reset) : 0,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      start_time: isSet(object.start_time) ? fromJsonTimestamp(object.start_time) : undefined,
      end_time: isSet(object.end_time) ? fromJsonTimestamp(object.end_time) : undefined,
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : 0,
      start_active: isSet(object.start_active) ? globalThis.Number(object.start_active) : 0,
      prev_reset: isSet(object.prev_reset) ? globalThis.Number(object.prev_reset) : 0,
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
      authoritative: isSet(object.authoritative) ? globalThis.Boolean(object.authoritative) : false,
    };
  },

  toJSON(message: Tournament): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.category !== 0) {
      obj.category = Math.round(message.category);
    }
    if (message.sort_order !== 0) {
      obj.sort_order = Math.round(message.sort_order);
    }
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.max_size !== 0) {
      obj.max_size = Math.round(message.max_size);
    }
    if (message.max_num_score !== 0) {
      obj.max_num_score = Math.round(message.max_num_score);
    }
    if (message.can_enter === true) {
      obj.can_enter = message.can_enter;
    }
    if (message.end_active !== 0) {
      obj.end_active = Math.round(message.end_active);
    }
    if (message.next_reset !== 0) {
      obj.next_reset = Math.round(message.next_reset);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.start_time !== undefined) {
      obj.start_time = message.start_time.toISOString();
    }
    if (message.end_time !== undefined) {
      obj.end_time = message.end_time.toISOString();
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    if (message.start_active !== 0) {
      obj.start_active = Math.round(message.start_active);
    }
    if (message.prev_reset !== 0) {
      obj.prev_reset = Math.round(message.prev_reset);
    }
    if (message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    if (message.authoritative === true) {
      obj.authoritative = message.authoritative;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tournament>, I>>(base?: I): Tournament {
    return Tournament.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Tournament>, I>>(object: I): Tournament {
    const message = createBaseTournament();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.category = object.category ?? 0;
    message.sort_order = object.sort_order ?? 0;
    message.size = object.size ?? 0;
    message.max_size = object.max_size ?? 0;
    message.max_num_score = object.max_num_score ?? 0;
    message.can_enter = object.can_enter ?? false;
    message.end_active = object.end_active ?? 0;
    message.next_reset = object.next_reset ?? 0;
    message.metadata = object.metadata ?? "";
    message.create_time = object.create_time ?? undefined;
    message.start_time = object.start_time ?? undefined;
    message.end_time = object.end_time ?? undefined;
    message.duration = object.duration ?? 0;
    message.start_active = object.start_active ?? 0;
    message.prev_reset = object.prev_reset ?? 0;
    message.operator = object.operator ?? 0;
    message.authoritative = object.authoritative ?? false;
    return message;
  },
};

function createBaseTournamentList(): TournamentList {
  return { tournaments: [], cursor: "" };
}

export const TournamentList = {
  encode(message: TournamentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tournaments) {
      Tournament.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TournamentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTournamentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournaments.push(Tournament.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TournamentList {
    return {
      tournaments: globalThis.Array.isArray(object?.tournaments)
        ? object.tournaments.map((e: any) => Tournament.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: TournamentList): unknown {
    const obj: any = {};
    if (message.tournaments?.length) {
      obj.tournaments = message.tournaments.map((e) => Tournament.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TournamentList>, I>>(base?: I): TournamentList {
    return TournamentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TournamentList>, I>>(object: I): TournamentList {
    const message = createBaseTournamentList();
    message.tournaments = object.tournaments?.map((e) => Tournament.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseTournamentRecordList(): TournamentRecordList {
  return { records: [], owner_records: [], next_cursor: "", prev_cursor: "", rank_count: 0 };
}

export const TournamentRecordList = {
  encode(message: TournamentRecordList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.records) {
      LeaderboardRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.owner_records) {
      LeaderboardRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(26).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(34).string(message.prev_cursor);
    }
    if (message.rank_count !== 0) {
      writer.uint32(40).int64(message.rank_count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TournamentRecordList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTournamentRecordList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.records.push(LeaderboardRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner_records.push(LeaderboardRecord.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.next_cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.rank_count = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TournamentRecordList {
    return {
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => LeaderboardRecord.fromJSON(e))
        : [],
      owner_records: globalThis.Array.isArray(object?.owner_records)
        ? object.owner_records.map((e: any) => LeaderboardRecord.fromJSON(e))
        : [],
      next_cursor: isSet(object.next_cursor) ? globalThis.String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
      rank_count: isSet(object.rank_count) ? globalThis.Number(object.rank_count) : 0,
    };
  },

  toJSON(message: TournamentRecordList): unknown {
    const obj: any = {};
    if (message.records?.length) {
      obj.records = message.records.map((e) => LeaderboardRecord.toJSON(e));
    }
    if (message.owner_records?.length) {
      obj.owner_records = message.owner_records.map((e) => LeaderboardRecord.toJSON(e));
    }
    if (message.next_cursor !== "") {
      obj.next_cursor = message.next_cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    if (message.rank_count !== 0) {
      obj.rank_count = Math.round(message.rank_count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TournamentRecordList>, I>>(base?: I): TournamentRecordList {
    return TournamentRecordList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TournamentRecordList>, I>>(object: I): TournamentRecordList {
    const message = createBaseTournamentRecordList();
    message.records = object.records?.map((e) => LeaderboardRecord.fromPartial(e)) || [];
    message.owner_records = object.owner_records?.map((e) => LeaderboardRecord.fromPartial(e)) || [];
    message.next_cursor = object.next_cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    message.rank_count = object.rank_count ?? 0;
    return message;
  },
};

function createBaseUpdateAccountRequest(): UpdateAccountRequest {
  return {
    username: undefined,
    display_name: undefined,
    avatar_url: undefined,
    lang_tag: undefined,
    location: undefined,
    timezone: undefined,
  };
}

export const UpdateAccountRequest = {
  encode(message: UpdateAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== undefined) {
      StringValue.encode({ value: message.username! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.display_name !== undefined) {
      StringValue.encode({ value: message.display_name! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.avatar_url !== undefined) {
      StringValue.encode({ value: message.avatar_url! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.lang_tag !== undefined) {
      StringValue.encode({ value: message.lang_tag! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.location !== undefined) {
      StringValue.encode({ value: message.location! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.timezone !== undefined) {
      StringValue.encode({ value: message.timezone! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.display_name = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.avatar_url = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.location = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timezone = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateAccountRequest {
    return {
      username: isSet(object.username) ? String(object.username) : undefined,
      display_name: isSet(object.display_name) ? String(object.display_name) : undefined,
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : undefined,
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : undefined,
      location: isSet(object.location) ? String(object.location) : undefined,
      timezone: isSet(object.timezone) ? String(object.timezone) : undefined,
    };
  },

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    if (message.display_name !== undefined) {
      obj.display_name = message.display_name;
    }
    if (message.avatar_url !== undefined) {
      obj.avatar_url = message.avatar_url;
    }
    if (message.lang_tag !== undefined) {
      obj.lang_tag = message.lang_tag;
    }
    if (message.location !== undefined) {
      obj.location = message.location;
    }
    if (message.timezone !== undefined) {
      obj.timezone = message.timezone;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(base?: I): UpdateAccountRequest {
    return UpdateAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(object: I): UpdateAccountRequest {
    const message = createBaseUpdateAccountRequest();
    message.username = object.username ?? undefined;
    message.display_name = object.display_name ?? undefined;
    message.avatar_url = object.avatar_url ?? undefined;
    message.lang_tag = object.lang_tag ?? undefined;
    message.location = object.location ?? undefined;
    message.timezone = object.timezone ?? undefined;
    return message;
  },
};

function createBaseUpdateGroupRequest(): UpdateGroupRequest {
  return {
    group_id: "",
    name: undefined,
    description: undefined,
    lang_tag: undefined,
    avatar_url: undefined,
    open: undefined,
  };
}

export const UpdateGroupRequest = {
  encode(message: UpdateGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group_id !== "") {
      writer.uint32(10).string(message.group_id);
    }
    if (message.name !== undefined) {
      StringValue.encode({ value: message.name! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.lang_tag !== undefined) {
      StringValue.encode({ value: message.lang_tag! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.avatar_url !== undefined) {
      StringValue.encode({ value: message.avatar_url! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.open !== undefined) {
      BoolValue.encode({ value: message.open! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.avatar_url = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.open = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupRequest {
    return {
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : undefined,
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : undefined,
      open: isSet(object.open) ? Boolean(object.open) : undefined,
    };
  },

  toJSON(message: UpdateGroupRequest): unknown {
    const obj: any = {};
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.lang_tag !== undefined) {
      obj.lang_tag = message.lang_tag;
    }
    if (message.avatar_url !== undefined) {
      obj.avatar_url = message.avatar_url;
    }
    if (message.open !== undefined) {
      obj.open = message.open;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateGroupRequest>, I>>(base?: I): UpdateGroupRequest {
    return UpdateGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateGroupRequest>, I>>(object: I): UpdateGroupRequest {
    const message = createBaseUpdateGroupRequest();
    message.group_id = object.group_id ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.lang_tag = object.lang_tag ?? undefined;
    message.avatar_url = object.avatar_url ?? undefined;
    message.open = object.open ?? undefined;
    return message;
  },
};

function createBaseUpdateCategoryDescRequest(): UpdateCategoryDescRequest {
  return { category_id: "", category_name: "" };
}

export const UpdateCategoryDescRequest = {
  encode(message: UpdateCategoryDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category_id !== "") {
      writer.uint32(10).string(message.category_id);
    }
    if (message.category_name !== "") {
      writer.uint32(18).string(message.category_name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCategoryDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.category_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category_name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCategoryDescRequest {
    return {
      category_id: isSet(object.category_id) ? globalThis.String(object.category_id) : "",
      category_name: isSet(object.category_name) ? globalThis.String(object.category_name) : "",
    };
  },

  toJSON(message: UpdateCategoryDescRequest): unknown {
    const obj: any = {};
    if (message.category_id !== "") {
      obj.category_id = message.category_id;
    }
    if (message.category_name !== "") {
      obj.category_name = message.category_name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCategoryDescRequest>, I>>(base?: I): UpdateCategoryDescRequest {
    return UpdateCategoryDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCategoryDescRequest>, I>>(object: I): UpdateCategoryDescRequest {
    const message = createBaseUpdateCategoryDescRequest();
    message.category_id = object.category_id ?? "";
    message.category_name = object.category_name ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return {
    id: "",
    username: "",
    display_name: "",
    avatar_url: "",
    lang_tag: "",
    location: "",
    timezone: "",
    metadata: "",
    facebook_id: "",
    google_id: "",
    gamecenter_id: "",
    steam_id: "",
    online: false,
    edge_count: 0,
    create_time: undefined,
    update_time: undefined,
    facebook_instant_game_id: "",
    apple_id: "",
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.display_name !== "") {
      writer.uint32(26).string(message.display_name);
    }
    if (message.avatar_url !== "") {
      writer.uint32(34).string(message.avatar_url);
    }
    if (message.lang_tag !== "") {
      writer.uint32(42).string(message.lang_tag);
    }
    if (message.location !== "") {
      writer.uint32(50).string(message.location);
    }
    if (message.timezone !== "") {
      writer.uint32(58).string(message.timezone);
    }
    if (message.metadata !== "") {
      writer.uint32(66).string(message.metadata);
    }
    if (message.facebook_id !== "") {
      writer.uint32(74).string(message.facebook_id);
    }
    if (message.google_id !== "") {
      writer.uint32(82).string(message.google_id);
    }
    if (message.gamecenter_id !== "") {
      writer.uint32(90).string(message.gamecenter_id);
    }
    if (message.steam_id !== "") {
      writer.uint32(98).string(message.steam_id);
    }
    if (message.online === true) {
      writer.uint32(104).bool(message.online);
    }
    if (message.edge_count !== 0) {
      writer.uint32(112).int32(message.edge_count);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(122).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(130).fork()).ldelim();
    }
    if (message.facebook_instant_game_id !== "") {
      writer.uint32(138).string(message.facebook_instant_game_id);
    }
    if (message.apple_id !== "") {
      writer.uint32(146).string(message.apple_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.display_name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lang_tag = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.location = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.facebook_id = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.google_id = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.gamecenter_id = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.steam_id = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.online = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.edge_count = reader.int32();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.facebook_instant_game_id = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.apple_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      display_name: isSet(object.display_name) ? globalThis.String(object.display_name) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      lang_tag: isSet(object.lang_tag) ? globalThis.String(object.lang_tag) : "",
      location: isSet(object.location) ? globalThis.String(object.location) : "",
      timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : "",
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      facebook_id: isSet(object.facebook_id) ? globalThis.String(object.facebook_id) : "",
      google_id: isSet(object.google_id) ? globalThis.String(object.google_id) : "",
      gamecenter_id: isSet(object.gamecenter_id) ? globalThis.String(object.gamecenter_id) : "",
      steam_id: isSet(object.steam_id) ? globalThis.String(object.steam_id) : "",
      online: isSet(object.online) ? globalThis.Boolean(object.online) : false,
      edge_count: isSet(object.edge_count) ? globalThis.Number(object.edge_count) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      facebook_instant_game_id: isSet(object.facebook_instant_game_id)
        ? globalThis.String(object.facebook_instant_game_id)
        : "",
      apple_id: isSet(object.apple_id) ? globalThis.String(object.apple_id) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.display_name !== "") {
      obj.display_name = message.display_name;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    if (message.lang_tag !== "") {
      obj.lang_tag = message.lang_tag;
    }
    if (message.location !== "") {
      obj.location = message.location;
    }
    if (message.timezone !== "") {
      obj.timezone = message.timezone;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.facebook_id !== "") {
      obj.facebook_id = message.facebook_id;
    }
    if (message.google_id !== "") {
      obj.google_id = message.google_id;
    }
    if (message.gamecenter_id !== "") {
      obj.gamecenter_id = message.gamecenter_id;
    }
    if (message.steam_id !== "") {
      obj.steam_id = message.steam_id;
    }
    if (message.online === true) {
      obj.online = message.online;
    }
    if (message.edge_count !== 0) {
      obj.edge_count = Math.round(message.edge_count);
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    if (message.facebook_instant_game_id !== "") {
      obj.facebook_instant_game_id = message.facebook_instant_game_id;
    }
    if (message.apple_id !== "") {
      obj.apple_id = message.apple_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.username = object.username ?? "";
    message.display_name = object.display_name ?? "";
    message.avatar_url = object.avatar_url ?? "";
    message.lang_tag = object.lang_tag ?? "";
    message.location = object.location ?? "";
    message.timezone = object.timezone ?? "";
    message.metadata = object.metadata ?? "";
    message.facebook_id = object.facebook_id ?? "";
    message.google_id = object.google_id ?? "";
    message.gamecenter_id = object.gamecenter_id ?? "";
    message.steam_id = object.steam_id ?? "";
    message.online = object.online ?? false;
    message.edge_count = object.edge_count ?? 0;
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.facebook_instant_game_id = object.facebook_instant_game_id ?? "";
    message.apple_id = object.apple_id ?? "";
    return message;
  },
};

function createBaseUserGroupList(): UserGroupList {
  return { user_groups: [], cursor: "" };
}

export const UserGroupList = {
  encode(message: UserGroupList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.user_groups) {
      UserGroupList_UserGroup.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGroupList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGroupList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user_groups.push(UserGroupList_UserGroup.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGroupList {
    return {
      user_groups: globalThis.Array.isArray(object?.user_groups)
        ? object.user_groups.map((e: any) => UserGroupList_UserGroup.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: UserGroupList): unknown {
    const obj: any = {};
    if (message.user_groups?.length) {
      obj.user_groups = message.user_groups.map((e) => UserGroupList_UserGroup.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGroupList>, I>>(base?: I): UserGroupList {
    return UserGroupList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGroupList>, I>>(object: I): UserGroupList {
    const message = createBaseUserGroupList();
    message.user_groups = object.user_groups?.map((e) => UserGroupList_UserGroup.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseUserGroupList_UserGroup(): UserGroupList_UserGroup {
  return { group: undefined, state: undefined };
}

export const UserGroupList_UserGroup = {
  encode(message: UserGroupList_UserGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group !== undefined) {
      Group.encode(message.group, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserGroupList_UserGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGroupList_UserGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group = Group.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserGroupList_UserGroup {
    return {
      group: isSet(object.group) ? Group.fromJSON(object.group) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
    };
  },

  toJSON(message: UserGroupList_UserGroup): unknown {
    const obj: any = {};
    if (message.group !== undefined) {
      obj.group = Group.toJSON(message.group);
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGroupList_UserGroup>, I>>(base?: I): UserGroupList_UserGroup {
    return UserGroupList_UserGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserGroupList_UserGroup>, I>>(object: I): UserGroupList_UserGroup {
    const message = createBaseUserGroupList_UserGroup();
    message.group = (object.group !== undefined && object.group !== null) ? Group.fromPartial(object.group) : undefined;
    message.state = object.state ?? undefined;
    return message;
  },
};

function createBaseUsers(): Users {
  return { users: [] };
}

export const Users = {
  encode(message: Users, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Users {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Users {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Users>, I>>(base?: I): Users {
    return Users.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Users>, I>>(object: I): Users {
    const message = createBaseUsers();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

function createBaseValidatePurchaseAppleRequest(): ValidatePurchaseAppleRequest {
  return { receipt: "", persist: undefined };
}

export const ValidatePurchaseAppleRequest = {
  encode(message: ValidatePurchaseAppleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receipt !== "") {
      writer.uint32(10).string(message.receipt);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseAppleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePurchaseAppleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.receipt = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseAppleRequest {
    return {
      receipt: isSet(object.receipt) ? globalThis.String(object.receipt) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidatePurchaseAppleRequest): unknown {
    const obj: any = {};
    if (message.receipt !== "") {
      obj.receipt = message.receipt;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePurchaseAppleRequest>, I>>(base?: I): ValidatePurchaseAppleRequest {
    return ValidatePurchaseAppleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePurchaseAppleRequest>, I>>(object: I): ValidatePurchaseAppleRequest {
    const message = createBaseValidatePurchaseAppleRequest();
    message.receipt = object.receipt ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidateSubscriptionAppleRequest(): ValidateSubscriptionAppleRequest {
  return { receipt: "", persist: undefined };
}

export const ValidateSubscriptionAppleRequest = {
  encode(message: ValidateSubscriptionAppleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receipt !== "") {
      writer.uint32(10).string(message.receipt);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionAppleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateSubscriptionAppleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.receipt = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateSubscriptionAppleRequest {
    return {
      receipt: isSet(object.receipt) ? globalThis.String(object.receipt) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidateSubscriptionAppleRequest): unknown {
    const obj: any = {};
    if (message.receipt !== "") {
      obj.receipt = message.receipt;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateSubscriptionAppleRequest>, I>>(
    base?: I,
  ): ValidateSubscriptionAppleRequest {
    return ValidateSubscriptionAppleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateSubscriptionAppleRequest>, I>>(
    object: I,
  ): ValidateSubscriptionAppleRequest {
    const message = createBaseValidateSubscriptionAppleRequest();
    message.receipt = object.receipt ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidatePurchaseGoogleRequest(): ValidatePurchaseGoogleRequest {
  return { purchase: "", persist: undefined };
}

export const ValidatePurchaseGoogleRequest = {
  encode(message: ValidatePurchaseGoogleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.purchase !== "") {
      writer.uint32(10).string(message.purchase);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseGoogleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePurchaseGoogleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.purchase = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseGoogleRequest {
    return {
      purchase: isSet(object.purchase) ? globalThis.String(object.purchase) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidatePurchaseGoogleRequest): unknown {
    const obj: any = {};
    if (message.purchase !== "") {
      obj.purchase = message.purchase;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePurchaseGoogleRequest>, I>>(base?: I): ValidatePurchaseGoogleRequest {
    return ValidatePurchaseGoogleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePurchaseGoogleRequest>, I>>(
    object: I,
  ): ValidatePurchaseGoogleRequest {
    const message = createBaseValidatePurchaseGoogleRequest();
    message.purchase = object.purchase ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidateSubscriptionGoogleRequest(): ValidateSubscriptionGoogleRequest {
  return { receipt: "", persist: undefined };
}

export const ValidateSubscriptionGoogleRequest = {
  encode(message: ValidateSubscriptionGoogleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receipt !== "") {
      writer.uint32(10).string(message.receipt);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionGoogleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateSubscriptionGoogleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.receipt = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateSubscriptionGoogleRequest {
    return {
      receipt: isSet(object.receipt) ? globalThis.String(object.receipt) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidateSubscriptionGoogleRequest): unknown {
    const obj: any = {};
    if (message.receipt !== "") {
      obj.receipt = message.receipt;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateSubscriptionGoogleRequest>, I>>(
    base?: I,
  ): ValidateSubscriptionGoogleRequest {
    return ValidateSubscriptionGoogleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateSubscriptionGoogleRequest>, I>>(
    object: I,
  ): ValidateSubscriptionGoogleRequest {
    const message = createBaseValidateSubscriptionGoogleRequest();
    message.receipt = object.receipt ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidatePurchaseHuaweiRequest(): ValidatePurchaseHuaweiRequest {
  return { purchase: "", signature: "", persist: undefined };
}

export const ValidatePurchaseHuaweiRequest = {
  encode(message: ValidatePurchaseHuaweiRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.purchase !== "") {
      writer.uint32(10).string(message.purchase);
    }
    if (message.signature !== "") {
      writer.uint32(18).string(message.signature);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseHuaweiRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePurchaseHuaweiRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.purchase = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseHuaweiRequest {
    return {
      purchase: isSet(object.purchase) ? globalThis.String(object.purchase) : "",
      signature: isSet(object.signature) ? globalThis.String(object.signature) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidatePurchaseHuaweiRequest): unknown {
    const obj: any = {};
    if (message.purchase !== "") {
      obj.purchase = message.purchase;
    }
    if (message.signature !== "") {
      obj.signature = message.signature;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePurchaseHuaweiRequest>, I>>(base?: I): ValidatePurchaseHuaweiRequest {
    return ValidatePurchaseHuaweiRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePurchaseHuaweiRequest>, I>>(
    object: I,
  ): ValidatePurchaseHuaweiRequest {
    const message = createBaseValidatePurchaseHuaweiRequest();
    message.purchase = object.purchase ?? "";
    message.signature = object.signature ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidatePurchaseFacebookInstantRequest(): ValidatePurchaseFacebookInstantRequest {
  return { signed_request: "", persist: undefined };
}

export const ValidatePurchaseFacebookInstantRequest = {
  encode(message: ValidatePurchaseFacebookInstantRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signed_request !== "") {
      writer.uint32(10).string(message.signed_request);
    }
    if (message.persist !== undefined) {
      BoolValue.encode({ value: message.persist! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseFacebookInstantRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePurchaseFacebookInstantRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signed_request = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.persist = BoolValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseFacebookInstantRequest {
    return {
      signed_request: isSet(object.signed_request) ? globalThis.String(object.signed_request) : "",
      persist: isSet(object.persist) ? Boolean(object.persist) : undefined,
    };
  },

  toJSON(message: ValidatePurchaseFacebookInstantRequest): unknown {
    const obj: any = {};
    if (message.signed_request !== "") {
      obj.signed_request = message.signed_request;
    }
    if (message.persist !== undefined) {
      obj.persist = message.persist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePurchaseFacebookInstantRequest>, I>>(
    base?: I,
  ): ValidatePurchaseFacebookInstantRequest {
    return ValidatePurchaseFacebookInstantRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePurchaseFacebookInstantRequest>, I>>(
    object: I,
  ): ValidatePurchaseFacebookInstantRequest {
    const message = createBaseValidatePurchaseFacebookInstantRequest();
    message.signed_request = object.signed_request ?? "";
    message.persist = object.persist ?? undefined;
    return message;
  },
};

function createBaseValidatedPurchase(): ValidatedPurchase {
  return {
    user_id: "",
    product_id: "",
    transaction_id: "",
    store: 0,
    purchase_time: undefined,
    create_time: undefined,
    update_time: undefined,
    refund_time: undefined,
    provider_response: "",
    environment: 0,
    seen_before: false,
  };
}

export const ValidatedPurchase = {
  encode(message: ValidatedPurchase, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.product_id !== "") {
      writer.uint32(18).string(message.product_id);
    }
    if (message.transaction_id !== "") {
      writer.uint32(26).string(message.transaction_id);
    }
    if (message.store !== 0) {
      writer.uint32(32).int32(message.store);
    }
    if (message.purchase_time !== undefined) {
      Timestamp.encode(toTimestamp(message.purchase_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(58).fork()).ldelim();
    }
    if (message.refund_time !== undefined) {
      Timestamp.encode(toTimestamp(message.refund_time), writer.uint32(66).fork()).ldelim();
    }
    if (message.provider_response !== "") {
      writer.uint32(74).string(message.provider_response);
    }
    if (message.environment !== 0) {
      writer.uint32(80).int32(message.environment);
    }
    if (message.seen_before === true) {
      writer.uint32(88).bool(message.seen_before);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatedPurchase {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatedPurchase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.product_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transaction_id = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.store = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.purchase_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.refund_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.provider_response = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.environment = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.seen_before = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatedPurchase {
    return {
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      product_id: isSet(object.product_id) ? globalThis.String(object.product_id) : "",
      transaction_id: isSet(object.transaction_id) ? globalThis.String(object.transaction_id) : "",
      store: isSet(object.store) ? storeProviderFromJSON(object.store) : 0,
      purchase_time: isSet(object.purchase_time) ? fromJsonTimestamp(object.purchase_time) : undefined,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      refund_time: isSet(object.refund_time) ? fromJsonTimestamp(object.refund_time) : undefined,
      provider_response: isSet(object.provider_response) ? globalThis.String(object.provider_response) : "",
      environment: isSet(object.environment) ? storeEnvironmentFromJSON(object.environment) : 0,
      seen_before: isSet(object.seen_before) ? globalThis.Boolean(object.seen_before) : false,
    };
  },

  toJSON(message: ValidatedPurchase): unknown {
    const obj: any = {};
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.product_id !== "") {
      obj.product_id = message.product_id;
    }
    if (message.transaction_id !== "") {
      obj.transaction_id = message.transaction_id;
    }
    if (message.store !== 0) {
      obj.store = storeProviderToJSON(message.store);
    }
    if (message.purchase_time !== undefined) {
      obj.purchase_time = message.purchase_time.toISOString();
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    if (message.refund_time !== undefined) {
      obj.refund_time = message.refund_time.toISOString();
    }
    if (message.provider_response !== "") {
      obj.provider_response = message.provider_response;
    }
    if (message.environment !== 0) {
      obj.environment = storeEnvironmentToJSON(message.environment);
    }
    if (message.seen_before === true) {
      obj.seen_before = message.seen_before;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatedPurchase>, I>>(base?: I): ValidatedPurchase {
    return ValidatedPurchase.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatedPurchase>, I>>(object: I): ValidatedPurchase {
    const message = createBaseValidatedPurchase();
    message.user_id = object.user_id ?? "";
    message.product_id = object.product_id ?? "";
    message.transaction_id = object.transaction_id ?? "";
    message.store = object.store ?? 0;
    message.purchase_time = object.purchase_time ?? undefined;
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.refund_time = object.refund_time ?? undefined;
    message.provider_response = object.provider_response ?? "";
    message.environment = object.environment ?? 0;
    message.seen_before = object.seen_before ?? false;
    return message;
  },
};

function createBaseValidatePurchaseResponse(): ValidatePurchaseResponse {
  return { validated_purchases: [] };
}

export const ValidatePurchaseResponse = {
  encode(message: ValidatePurchaseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validated_purchases) {
      ValidatedPurchase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatePurchaseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatePurchaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validated_purchases.push(ValidatedPurchase.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatePurchaseResponse {
    return {
      validated_purchases: globalThis.Array.isArray(object?.validated_purchases)
        ? object.validated_purchases.map((e: any) => ValidatedPurchase.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ValidatePurchaseResponse): unknown {
    const obj: any = {};
    if (message.validated_purchases?.length) {
      obj.validated_purchases = message.validated_purchases.map((e) => ValidatedPurchase.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatePurchaseResponse>, I>>(base?: I): ValidatePurchaseResponse {
    return ValidatePurchaseResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatePurchaseResponse>, I>>(object: I): ValidatePurchaseResponse {
    const message = createBaseValidatePurchaseResponse();
    message.validated_purchases = object.validated_purchases?.map((e) => ValidatedPurchase.fromPartial(e)) || [];
    return message;
  },
};

function createBaseValidateSubscriptionResponse(): ValidateSubscriptionResponse {
  return { validated_subscription: undefined };
}

export const ValidateSubscriptionResponse = {
  encode(message: ValidateSubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validated_subscription !== undefined) {
      ValidatedSubscription.encode(message.validated_subscription, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateSubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validated_subscription = ValidatedSubscription.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidateSubscriptionResponse {
    return {
      validated_subscription: isSet(object.validated_subscription)
        ? ValidatedSubscription.fromJSON(object.validated_subscription)
        : undefined,
    };
  },

  toJSON(message: ValidateSubscriptionResponse): unknown {
    const obj: any = {};
    if (message.validated_subscription !== undefined) {
      obj.validated_subscription = ValidatedSubscription.toJSON(message.validated_subscription);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidateSubscriptionResponse>, I>>(base?: I): ValidateSubscriptionResponse {
    return ValidateSubscriptionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidateSubscriptionResponse>, I>>(object: I): ValidateSubscriptionResponse {
    const message = createBaseValidateSubscriptionResponse();
    message.validated_subscription =
      (object.validated_subscription !== undefined && object.validated_subscription !== null)
        ? ValidatedSubscription.fromPartial(object.validated_subscription)
        : undefined;
    return message;
  },
};

function createBaseValidatedSubscription(): ValidatedSubscription {
  return {
    user_id: "",
    product_id: "",
    original_transaction_id: "",
    store: 0,
    purchase_time: undefined,
    create_time: undefined,
    update_time: undefined,
    environment: 0,
    expiry_time: undefined,
    refund_time: undefined,
    provider_response: "",
    provider_notification: "",
    active: false,
  };
}

export const ValidatedSubscription = {
  encode(message: ValidatedSubscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.product_id !== "") {
      writer.uint32(18).string(message.product_id);
    }
    if (message.original_transaction_id !== "") {
      writer.uint32(26).string(message.original_transaction_id);
    }
    if (message.store !== 0) {
      writer.uint32(32).int32(message.store);
    }
    if (message.purchase_time !== undefined) {
      Timestamp.encode(toTimestamp(message.purchase_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(58).fork()).ldelim();
    }
    if (message.environment !== 0) {
      writer.uint32(64).int32(message.environment);
    }
    if (message.expiry_time !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry_time), writer.uint32(74).fork()).ldelim();
    }
    if (message.refund_time !== undefined) {
      Timestamp.encode(toTimestamp(message.refund_time), writer.uint32(82).fork()).ldelim();
    }
    if (message.provider_response !== "") {
      writer.uint32(90).string(message.provider_response);
    }
    if (message.provider_notification !== "") {
      writer.uint32(98).string(message.provider_notification);
    }
    if (message.active === true) {
      writer.uint32(104).bool(message.active);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatedSubscription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatedSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.product_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.original_transaction_id = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.store = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.purchase_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.environment = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.expiry_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.refund_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.provider_response = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.provider_notification = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.active = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatedSubscription {
    return {
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      product_id: isSet(object.product_id) ? globalThis.String(object.product_id) : "",
      original_transaction_id: isSet(object.original_transaction_id)
        ? globalThis.String(object.original_transaction_id)
        : "",
      store: isSet(object.store) ? storeProviderFromJSON(object.store) : 0,
      purchase_time: isSet(object.purchase_time) ? fromJsonTimestamp(object.purchase_time) : undefined,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      environment: isSet(object.environment) ? storeEnvironmentFromJSON(object.environment) : 0,
      expiry_time: isSet(object.expiry_time) ? fromJsonTimestamp(object.expiry_time) : undefined,
      refund_time: isSet(object.refund_time) ? fromJsonTimestamp(object.refund_time) : undefined,
      provider_response: isSet(object.provider_response) ? globalThis.String(object.provider_response) : "",
      provider_notification: isSet(object.provider_notification) ? globalThis.String(object.provider_notification) : "",
      active: isSet(object.active) ? globalThis.Boolean(object.active) : false,
    };
  },

  toJSON(message: ValidatedSubscription): unknown {
    const obj: any = {};
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.product_id !== "") {
      obj.product_id = message.product_id;
    }
    if (message.original_transaction_id !== "") {
      obj.original_transaction_id = message.original_transaction_id;
    }
    if (message.store !== 0) {
      obj.store = storeProviderToJSON(message.store);
    }
    if (message.purchase_time !== undefined) {
      obj.purchase_time = message.purchase_time.toISOString();
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.update_time !== undefined) {
      obj.update_time = message.update_time.toISOString();
    }
    if (message.environment !== 0) {
      obj.environment = storeEnvironmentToJSON(message.environment);
    }
    if (message.expiry_time !== undefined) {
      obj.expiry_time = message.expiry_time.toISOString();
    }
    if (message.refund_time !== undefined) {
      obj.refund_time = message.refund_time.toISOString();
    }
    if (message.provider_response !== "") {
      obj.provider_response = message.provider_response;
    }
    if (message.provider_notification !== "") {
      obj.provider_notification = message.provider_notification;
    }
    if (message.active === true) {
      obj.active = message.active;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatedSubscription>, I>>(base?: I): ValidatedSubscription {
    return ValidatedSubscription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatedSubscription>, I>>(object: I): ValidatedSubscription {
    const message = createBaseValidatedSubscription();
    message.user_id = object.user_id ?? "";
    message.product_id = object.product_id ?? "";
    message.original_transaction_id = object.original_transaction_id ?? "";
    message.store = object.store ?? 0;
    message.purchase_time = object.purchase_time ?? undefined;
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.environment = object.environment ?? 0;
    message.expiry_time = object.expiry_time ?? undefined;
    message.refund_time = object.refund_time ?? undefined;
    message.provider_response = object.provider_response ?? "";
    message.provider_notification = object.provider_notification ?? "";
    message.active = object.active ?? false;
    return message;
  },
};

function createBasePurchaseList(): PurchaseList {
  return { validated_purchases: [], cursor: "", prev_cursor: "" };
}

export const PurchaseList = {
  encode(message: PurchaseList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validated_purchases) {
      ValidatedPurchase.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(26).string(message.prev_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PurchaseList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePurchaseList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validated_purchases.push(ValidatedPurchase.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PurchaseList {
    return {
      validated_purchases: globalThis.Array.isArray(object?.validated_purchases)
        ? object.validated_purchases.map((e: any) => ValidatedPurchase.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
    };
  },

  toJSON(message: PurchaseList): unknown {
    const obj: any = {};
    if (message.validated_purchases?.length) {
      obj.validated_purchases = message.validated_purchases.map((e) => ValidatedPurchase.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PurchaseList>, I>>(base?: I): PurchaseList {
    return PurchaseList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PurchaseList>, I>>(object: I): PurchaseList {
    const message = createBasePurchaseList();
    message.validated_purchases = object.validated_purchases?.map((e) => ValidatedPurchase.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    return message;
  },
};

function createBaseSubscriptionList(): SubscriptionList {
  return { validated_subscriptions: [], cursor: "", prev_cursor: "" };
}

export const SubscriptionList = {
  encode(message: SubscriptionList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validated_subscriptions) {
      ValidatedSubscription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(26).string(message.prev_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validated_subscriptions.push(ValidatedSubscription.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscriptionList {
    return {
      validated_subscriptions: globalThis.Array.isArray(object?.validated_subscriptions)
        ? object.validated_subscriptions.map((e: any) => ValidatedSubscription.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
    };
  },

  toJSON(message: SubscriptionList): unknown {
    const obj: any = {};
    if (message.validated_subscriptions?.length) {
      obj.validated_subscriptions = message.validated_subscriptions.map((e) => ValidatedSubscription.toJSON(e));
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscriptionList>, I>>(base?: I): SubscriptionList {
    return SubscriptionList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscriptionList>, I>>(object: I): SubscriptionList {
    const message = createBaseSubscriptionList();
    message.validated_subscriptions =
      object.validated_subscriptions?.map((e) => ValidatedSubscription.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    return message;
  },
};

function createBaseWriteLeaderboardRecordRequest(): WriteLeaderboardRecordRequest {
  return { leaderboard_id: "", record: undefined };
}

export const WriteLeaderboardRecordRequest = {
  encode(message: WriteLeaderboardRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboard_id !== "") {
      writer.uint32(10).string(message.leaderboard_id);
    }
    if (message.record !== undefined) {
      WriteLeaderboardRecordRequest_LeaderboardRecordWrite.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteLeaderboardRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteLeaderboardRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaderboard_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.record = WriteLeaderboardRecordRequest_LeaderboardRecordWrite.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteLeaderboardRecordRequest {
    return {
      leaderboard_id: isSet(object.leaderboard_id) ? globalThis.String(object.leaderboard_id) : "",
      record: isSet(object.record)
        ? WriteLeaderboardRecordRequest_LeaderboardRecordWrite.fromJSON(object.record)
        : undefined,
    };
  },

  toJSON(message: WriteLeaderboardRecordRequest): unknown {
    const obj: any = {};
    if (message.leaderboard_id !== "") {
      obj.leaderboard_id = message.leaderboard_id;
    }
    if (message.record !== undefined) {
      obj.record = WriteLeaderboardRecordRequest_LeaderboardRecordWrite.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteLeaderboardRecordRequest>, I>>(base?: I): WriteLeaderboardRecordRequest {
    return WriteLeaderboardRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteLeaderboardRecordRequest>, I>>(
    object: I,
  ): WriteLeaderboardRecordRequest {
    const message = createBaseWriteLeaderboardRecordRequest();
    message.leaderboard_id = object.leaderboard_id ?? "";
    message.record = (object.record !== undefined && object.record !== null)
      ? WriteLeaderboardRecordRequest_LeaderboardRecordWrite.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseWriteLeaderboardRecordRequest_LeaderboardRecordWrite(): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
  return { score: 0, subscore: 0, metadata: "", operator: 0 };
}

export const WriteLeaderboardRecordRequest_LeaderboardRecordWrite = {
  encode(
    message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(8).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(16).int64(message.subscore);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.operator !== 0) {
      writer.uint32(32).int32(message.operator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteLeaderboardRecordRequest_LeaderboardRecordWrite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.score = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.subscore = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    return {
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      subscore: isSet(object.subscore) ? globalThis.Number(object.subscore) : 0,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
    };
  },

  toJSON(message: WriteLeaderboardRecordRequest_LeaderboardRecordWrite): unknown {
    const obj: any = {};
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.subscore !== 0) {
      obj.subscore = Math.round(message.subscore);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteLeaderboardRecordRequest_LeaderboardRecordWrite>, I>>(
    base?: I,
  ): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    return WriteLeaderboardRecordRequest_LeaderboardRecordWrite.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteLeaderboardRecordRequest_LeaderboardRecordWrite>, I>>(
    object: I,
  ): WriteLeaderboardRecordRequest_LeaderboardRecordWrite {
    const message = createBaseWriteLeaderboardRecordRequest_LeaderboardRecordWrite();
    message.score = object.score ?? 0;
    message.subscore = object.subscore ?? 0;
    message.metadata = object.metadata ?? "";
    message.operator = object.operator ?? 0;
    return message;
  },
};

function createBaseWriteStorageObject(): WriteStorageObject {
  return { collection: "", key: "", value: "", version: "", permission_read: undefined, permission_write: undefined };
}

export const WriteStorageObject = {
  encode(message: WriteStorageObject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.permission_read !== undefined) {
      Int32Value.encode({ value: message.permission_read! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.permission_write !== undefined) {
      Int32Value.encode({ value: message.permission_write! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteStorageObject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteStorageObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.permission_read = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.permission_write = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObject {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      permission_read: isSet(object.permission_read) ? Number(object.permission_read) : undefined,
      permission_write: isSet(object.permission_write) ? Number(object.permission_write) : undefined,
    };
  },

  toJSON(message: WriteStorageObject): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.permission_read !== undefined) {
      obj.permission_read = message.permission_read;
    }
    if (message.permission_write !== undefined) {
      obj.permission_write = message.permission_write;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteStorageObject>, I>>(base?: I): WriteStorageObject {
    return WriteStorageObject.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteStorageObject>, I>>(object: I): WriteStorageObject {
    const message = createBaseWriteStorageObject();
    message.collection = object.collection ?? "";
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.version = object.version ?? "";
    message.permission_read = object.permission_read ?? undefined;
    message.permission_write = object.permission_write ?? undefined;
    return message;
  },
};

function createBaseWriteStorageObjectsRequest(): WriteStorageObjectsRequest {
  return { objects: [] };
}

export const WriteStorageObjectsRequest = {
  encode(message: WriteStorageObjectsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.objects) {
      WriteStorageObject.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteStorageObjectsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.objects.push(WriteStorageObject.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObjectsRequest {
    return {
      objects: globalThis.Array.isArray(object?.objects)
        ? object.objects.map((e: any) => WriteStorageObject.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WriteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.objects?.length) {
      obj.objects = message.objects.map((e) => WriteStorageObject.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteStorageObjectsRequest>, I>>(base?: I): WriteStorageObjectsRequest {
    return WriteStorageObjectsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteStorageObjectsRequest>, I>>(object: I): WriteStorageObjectsRequest {
    const message = createBaseWriteStorageObjectsRequest();
    message.objects = object.objects?.map((e) => WriteStorageObject.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWriteTournamentRecordRequest(): WriteTournamentRecordRequest {
  return { tournament_id: "", record: undefined };
}

export const WriteTournamentRecordRequest = {
  encode(message: WriteTournamentRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tournament_id !== "") {
      writer.uint32(10).string(message.tournament_id);
    }
    if (message.record !== undefined) {
      WriteTournamentRecordRequest_TournamentRecordWrite.encode(message.record, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteTournamentRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteTournamentRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tournament_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.record = WriteTournamentRecordRequest_TournamentRecordWrite.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteTournamentRecordRequest {
    return {
      tournament_id: isSet(object.tournament_id) ? globalThis.String(object.tournament_id) : "",
      record: isSet(object.record)
        ? WriteTournamentRecordRequest_TournamentRecordWrite.fromJSON(object.record)
        : undefined,
    };
  },

  toJSON(message: WriteTournamentRecordRequest): unknown {
    const obj: any = {};
    if (message.tournament_id !== "") {
      obj.tournament_id = message.tournament_id;
    }
    if (message.record !== undefined) {
      obj.record = WriteTournamentRecordRequest_TournamentRecordWrite.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteTournamentRecordRequest>, I>>(base?: I): WriteTournamentRecordRequest {
    return WriteTournamentRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteTournamentRecordRequest>, I>>(object: I): WriteTournamentRecordRequest {
    const message = createBaseWriteTournamentRecordRequest();
    message.tournament_id = object.tournament_id ?? "";
    message.record = (object.record !== undefined && object.record !== null)
      ? WriteTournamentRecordRequest_TournamentRecordWrite.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseWriteTournamentRecordRequest_TournamentRecordWrite(): WriteTournamentRecordRequest_TournamentRecordWrite {
  return { score: 0, subscore: 0, metadata: "", operator: 0 };
}

export const WriteTournamentRecordRequest_TournamentRecordWrite = {
  encode(
    message: WriteTournamentRecordRequest_TournamentRecordWrite,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(8).int64(message.score);
    }
    if (message.subscore !== 0) {
      writer.uint32(16).int64(message.subscore);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.operator !== 0) {
      writer.uint32(32).int32(message.operator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteTournamentRecordRequest_TournamentRecordWrite {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteTournamentRecordRequest_TournamentRecordWrite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.score = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.subscore = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteTournamentRecordRequest_TournamentRecordWrite {
    return {
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      subscore: isSet(object.subscore) ? globalThis.Number(object.subscore) : 0,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
    };
  },

  toJSON(message: WriteTournamentRecordRequest_TournamentRecordWrite): unknown {
    const obj: any = {};
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.subscore !== 0) {
      obj.subscore = Math.round(message.subscore);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteTournamentRecordRequest_TournamentRecordWrite>, I>>(
    base?: I,
  ): WriteTournamentRecordRequest_TournamentRecordWrite {
    return WriteTournamentRecordRequest_TournamentRecordWrite.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteTournamentRecordRequest_TournamentRecordWrite>, I>>(
    object: I,
  ): WriteTournamentRecordRequest_TournamentRecordWrite {
    const message = createBaseWriteTournamentRecordRequest_TournamentRecordWrite();
    message.score = object.score ?? 0;
    message.subscore = object.subscore ?? 0;
    message.metadata = object.metadata ?? "";
    message.operator = object.operator ?? 0;
    return message;
  },
};

function createBaseClanDescProfile(): ClanDescProfile {
  return { clan_id: "", creator_id: "", nick_name: "", profile_banner: "", profile_theme: "", avatar_url: "" };
}

export const ClanDescProfile = {
  encode(message: ClanDescProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(18).string(message.creator_id);
    }
    if (message.nick_name !== "") {
      writer.uint32(26).string(message.nick_name);
    }
    if (message.profile_banner !== "") {
      writer.uint32(34).string(message.profile_banner);
    }
    if (message.profile_theme !== "") {
      writer.uint32(42).string(message.profile_theme);
    }
    if (message.avatar_url !== "") {
      writer.uint32(50).string(message.avatar_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nick_name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.profile_banner = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.profile_theme = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClanDescProfile {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      nick_name: isSet(object.nick_name) ? globalThis.String(object.nick_name) : "",
      profile_banner: isSet(object.profile_banner) ? globalThis.String(object.profile_banner) : "",
      profile_theme: isSet(object.profile_theme) ? globalThis.String(object.profile_theme) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
    };
  },

  toJSON(message: ClanDescProfile): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.nick_name !== "") {
      obj.nick_name = message.nick_name;
    }
    if (message.profile_banner !== "") {
      obj.profile_banner = message.profile_banner;
    }
    if (message.profile_theme !== "") {
      obj.profile_theme = message.profile_theme;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescProfile>, I>>(base?: I): ClanDescProfile {
    return ClanDescProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClanDescProfile>, I>>(object: I): ClanDescProfile {
    const message = createBaseClanDescProfile();
    message.clan_id = object.clan_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.nick_name = object.nick_name ?? "";
    message.profile_banner = object.profile_banner ?? "";
    message.profile_theme = object.profile_theme ?? "";
    message.avatar_url = object.avatar_url ?? "";
    return message;
  },
};

function createBaseUpdateClanDescProfileRequest(): UpdateClanDescProfileRequest {
  return { clan_id: "", nick_name: "", profile_banner: "", profile_theme: "", avatar_url: "" };
}

export const UpdateClanDescProfileRequest = {
  encode(message: UpdateClanDescProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.nick_name !== "") {
      writer.uint32(18).string(message.nick_name);
    }
    if (message.profile_banner !== "") {
      writer.uint32(26).string(message.profile_banner);
    }
    if (message.profile_theme !== "") {
      writer.uint32(34).string(message.profile_theme);
    }
    if (message.avatar_url !== "") {
      writer.uint32(42).string(message.avatar_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanDescProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateClanDescProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nick_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.profile_banner = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.profile_theme = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.avatar_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateClanDescProfileRequest {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      nick_name: isSet(object.nick_name) ? globalThis.String(object.nick_name) : "",
      profile_banner: isSet(object.profile_banner) ? globalThis.String(object.profile_banner) : "",
      profile_theme: isSet(object.profile_theme) ? globalThis.String(object.profile_theme) : "",
      avatar_url: isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
    };
  },

  toJSON(message: UpdateClanDescProfileRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.nick_name !== "") {
      obj.nick_name = message.nick_name;
    }
    if (message.profile_banner !== "") {
      obj.profile_banner = message.profile_banner;
    }
    if (message.profile_theme !== "") {
      obj.profile_theme = message.profile_theme;
    }
    if (message.avatar_url !== "") {
      obj.avatar_url = message.avatar_url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateClanDescProfileRequest>, I>>(base?: I): UpdateClanDescProfileRequest {
    return UpdateClanDescProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateClanDescProfileRequest>, I>>(object: I): UpdateClanDescProfileRequest {
    const message = createBaseUpdateClanDescProfileRequest();
    message.clan_id = object.clan_id ?? "";
    message.nick_name = object.nick_name ?? "";
    message.profile_banner = object.profile_banner ?? "";
    message.profile_theme = object.profile_theme ?? "";
    message.avatar_url = object.avatar_url ?? "";
    return message;
  },
};

function createBaseClanDescProfileRequest(): ClanDescProfileRequest {
  return { clan_id: "" };
}

export const ClanDescProfileRequest = {
  encode(message: ClanDescProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClanDescProfileRequest {
    return { clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "" };
  },

  toJSON(message: ClanDescProfileRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescProfileRequest>, I>>(base?: I): ClanDescProfileRequest {
    return ClanDescProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClanDescProfileRequest>, I>>(object: I): ClanDescProfileRequest {
    const message = createBaseClanDescProfileRequest();
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseClanDesc(): ClanDesc {
  return { creator_id: "", clan_name: "", logo: "", banner: "", clan_id: "", status: 0 };
}

export const ClanDesc = {
  encode(message: ClanDesc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator_id !== "") {
      writer.uint32(10).string(message.creator_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(18).string(message.clan_name);
    }
    if (message.logo !== "") {
      writer.uint32(26).string(message.logo);
    }
    if (message.banner !== "") {
      writer.uint32(34).string(message.banner);
    }
    if (message.clan_id !== "") {
      writer.uint32(42).string(message.clan_id);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanDesc {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDesc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clan_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.logo = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.banner = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClanDesc {
    return {
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? globalThis.String(object.clan_name) : "",
      logo: isSet(object.logo) ? globalThis.String(object.logo) : "",
      banner: isSet(object.banner) ? globalThis.String(object.banner) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
    };
  },

  toJSON(message: ClanDesc): unknown {
    const obj: any = {};
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.clan_name !== "") {
      obj.clan_name = message.clan_name;
    }
    if (message.logo !== "") {
      obj.logo = message.logo;
    }
    if (message.banner !== "") {
      obj.banner = message.banner;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDesc>, I>>(base?: I): ClanDesc {
    return ClanDesc.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClanDesc>, I>>(object: I): ClanDesc {
    const message = createBaseClanDesc();
    message.creator_id = object.creator_id ?? "";
    message.clan_name = object.clan_name ?? "";
    message.logo = object.logo ?? "";
    message.banner = object.banner ?? "";
    message.clan_id = object.clan_id ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseCreateClanDescRequest(): CreateClanDescRequest {
  return { creator_id: "", clan_name: "", logo: "", banner: "" };
}

export const CreateClanDescRequest = {
  encode(message: CreateClanDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator_id !== "") {
      writer.uint32(10).string(message.creator_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(18).string(message.clan_name);
    }
    if (message.logo !== "") {
      writer.uint32(26).string(message.logo);
    }
    if (message.banner !== "") {
      writer.uint32(34).string(message.banner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateClanDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clan_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.logo = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.banner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateClanDescRequest {
    return {
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? globalThis.String(object.clan_name) : "",
      logo: isSet(object.logo) ? globalThis.String(object.logo) : "",
      banner: isSet(object.banner) ? globalThis.String(object.banner) : "",
    };
  },

  toJSON(message: CreateClanDescRequest): unknown {
    const obj: any = {};
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.clan_name !== "") {
      obj.clan_name = message.clan_name;
    }
    if (message.logo !== "") {
      obj.logo = message.logo;
    }
    if (message.banner !== "") {
      obj.banner = message.banner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateClanDescRequest>, I>>(base?: I): CreateClanDescRequest {
    return CreateClanDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateClanDescRequest>, I>>(object: I): CreateClanDescRequest {
    const message = createBaseCreateClanDescRequest();
    message.creator_id = object.creator_id ?? "";
    message.clan_name = object.clan_name ?? "";
    message.logo = object.logo ?? "";
    message.banner = object.banner ?? "";
    return message;
  },
};

function createBaseUpdateClanDescRequest(): UpdateClanDescRequest {
  return { clan_id: "", creator_id: "", clan_name: "", logo: "", banner: "", status: 0 };
}

export const UpdateClanDescRequest = {
  encode(message: UpdateClanDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(18).string(message.creator_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(26).string(message.clan_name);
    }
    if (message.logo !== "") {
      writer.uint32(34).string(message.logo);
    }
    if (message.banner !== "") {
      writer.uint32(42).string(message.banner);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.clan_name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.logo = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.banner = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateClanDescRequest {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? globalThis.String(object.clan_name) : "",
      logo: isSet(object.logo) ? globalThis.String(object.logo) : "",
      banner: isSet(object.banner) ? globalThis.String(object.banner) : "",
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
    };
  },

  toJSON(message: UpdateClanDescRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.clan_name !== "") {
      obj.clan_name = message.clan_name;
    }
    if (message.logo !== "") {
      obj.logo = message.logo;
    }
    if (message.banner !== "") {
      obj.banner = message.banner;
    }
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateClanDescRequest>, I>>(base?: I): UpdateClanDescRequest {
    return UpdateClanDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateClanDescRequest>, I>>(object: I): UpdateClanDescRequest {
    const message = createBaseUpdateClanDescRequest();
    message.clan_id = object.clan_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.clan_name = object.clan_name ?? "";
    message.logo = object.logo ?? "";
    message.banner = object.banner ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseDeleteClanDescRequest(): DeleteClanDescRequest {
  return { clan_desc_id: "" };
}

export const DeleteClanDescRequest = {
  encode(message: DeleteClanDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_desc_id !== "") {
      writer.uint32(10).string(message.clan_desc_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteClanDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_desc_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteClanDescRequest {
    return { clan_desc_id: isSet(object.clan_desc_id) ? globalThis.String(object.clan_desc_id) : "" };
  },

  toJSON(message: DeleteClanDescRequest): unknown {
    const obj: any = {};
    if (message.clan_desc_id !== "") {
      obj.clan_desc_id = message.clan_desc_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteClanDescRequest>, I>>(base?: I): DeleteClanDescRequest {
    return DeleteClanDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteClanDescRequest>, I>>(object: I): DeleteClanDescRequest {
    const message = createBaseDeleteClanDescRequest();
    message.clan_desc_id = object.clan_desc_id ?? "";
    return message;
  },
};

function createBaseListClanDescRequest(): ListClanDescRequest {
  return { limit: undefined, state: undefined, cursor: "" };
}

export const ListClanDescRequest = {
  encode(message: ListClanDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListClanDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListClanDescRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListClanDescRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListClanDescRequest>, I>>(base?: I): ListClanDescRequest {
    return ListClanDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListClanDescRequest>, I>>(object: I): ListClanDescRequest {
    const message = createBaseListClanDescRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseClanDescList(): ClanDescList {
  return { clandesc: [] };
}

export const ClanDescList = {
  encode(message: ClanDescList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.clandesc) {
      ClanDesc.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanDescList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clandesc.push(ClanDesc.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClanDescList {
    return {
      clandesc: globalThis.Array.isArray(object?.clandesc) ? object.clandesc.map((e: any) => ClanDesc.fromJSON(e)) : [],
    };
  },

  toJSON(message: ClanDescList): unknown {
    const obj: any = {};
    if (message.clandesc?.length) {
      obj.clandesc = message.clandesc.map((e) => ClanDesc.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescList>, I>>(base?: I): ClanDescList {
    return ClanDescList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClanDescList>, I>>(object: I): ClanDescList {
    const message = createBaseClanDescList();
    message.clandesc = object.clandesc?.map((e) => ClanDesc.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLinkInviteUserRequest(): LinkInviteUserRequest {
  return { clan_id: "", channel_id: "", expiry_time: 0 };
}

export const LinkInviteUserRequest = {
  encode(message: LinkInviteUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.expiry_time !== 0) {
      writer.uint32(24).int32(message.expiry_time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkInviteUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkInviteUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expiry_time = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LinkInviteUserRequest {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      expiry_time: isSet(object.expiry_time) ? globalThis.Number(object.expiry_time) : 0,
    };
  },

  toJSON(message: LinkInviteUserRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.expiry_time !== 0) {
      obj.expiry_time = Math.round(message.expiry_time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkInviteUserRequest>, I>>(base?: I): LinkInviteUserRequest {
    return LinkInviteUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LinkInviteUserRequest>, I>>(object: I): LinkInviteUserRequest {
    const message = createBaseLinkInviteUserRequest();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.expiry_time = object.expiry_time ?? 0;
    return message;
  },
};

function createBaseInviteUserRequest(): InviteUserRequest {
  return { invite_id: "" };
}

export const InviteUserRequest = {
  encode(message: InviteUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invite_id !== "") {
      writer.uint32(10).string(message.invite_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invite_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InviteUserRequest {
    return { invite_id: isSet(object.invite_id) ? globalThis.String(object.invite_id) : "" };
  },

  toJSON(message: InviteUserRequest): unknown {
    const obj: any = {};
    if (message.invite_id !== "") {
      obj.invite_id = message.invite_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InviteUserRequest>, I>>(base?: I): InviteUserRequest {
    return InviteUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InviteUserRequest>, I>>(object: I): InviteUserRequest {
    const message = createBaseInviteUserRequest();
    message.invite_id = object.invite_id ?? "";
    return message;
  },
};

function createBaseInviteUserRes(): InviteUserRes {
  return { clan_id: "", channel_id: "" };
}

export const InviteUserRes = {
  encode(message: InviteUserRes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteUserRes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InviteUserRes {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: InviteUserRes): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InviteUserRes>, I>>(base?: I): InviteUserRes {
    return InviteUserRes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InviteUserRes>, I>>(object: I): InviteUserRes {
    const message = createBaseInviteUserRes();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseJoinClanChannelRequest(): JoinClanChannelRequest {
  return { clan_id: "", channel_id: "" };
}

export const JoinClanChannelRequest = {
  encode(message: JoinClanChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinClanChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinClanChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JoinClanChannelRequest {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: JoinClanChannelRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinClanChannelRequest>, I>>(base?: I): JoinClanChannelRequest {
    return JoinClanChannelRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JoinClanChannelRequest>, I>>(object: I): JoinClanChannelRequest {
    const message = createBaseJoinClanChannelRequest();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseLinkInviteUser(): LinkInviteUser {
  return {
    clan_id: "",
    creator_id: "",
    channel_id: "",
    invite_link: "",
    create_time: undefined,
    expiry_time: undefined,
    id: "",
  };
}

export const LinkInviteUser = {
  encode(message: LinkInviteUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(18).string(message.creator_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.invite_link !== "") {
      writer.uint32(34).string(message.invite_link);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.expiry_time !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(58).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LinkInviteUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkInviteUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.invite_link = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.expiry_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LinkInviteUser {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      invite_link: isSet(object.invite_link) ? globalThis.String(object.invite_link) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      expiry_time: isSet(object.expiry_time) ? fromJsonTimestamp(object.expiry_time) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: LinkInviteUser): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.invite_link !== "") {
      obj.invite_link = message.invite_link;
    }
    if (message.create_time !== undefined) {
      obj.create_time = message.create_time.toISOString();
    }
    if (message.expiry_time !== undefined) {
      obj.expiry_time = message.expiry_time.toISOString();
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkInviteUser>, I>>(base?: I): LinkInviteUser {
    return LinkInviteUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LinkInviteUser>, I>>(object: I): LinkInviteUser {
    const message = createBaseLinkInviteUser();
    message.clan_id = object.clan_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.invite_link = object.invite_link ?? "";
    message.create_time = object.create_time ?? undefined;
    message.expiry_time = object.expiry_time ?? undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCategoryDesc(): CategoryDesc {
  return { creator_id: "", clan_id: "", category_name: "", category_id: "" };
}

export const CategoryDesc = {
  encode(message: CategoryDesc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator_id !== "") {
      writer.uint32(10).string(message.creator_id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.category_name !== "") {
      writer.uint32(26).string(message.category_name);
    }
    if (message.category_id !== "") {
      writer.uint32(34).string(message.category_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryDesc {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryDesc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.category_name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.category_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CategoryDesc {
    return {
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      category_name: isSet(object.category_name) ? globalThis.String(object.category_name) : "",
      category_id: isSet(object.category_id) ? globalThis.String(object.category_id) : "",
    };
  },

  toJSON(message: CategoryDesc): unknown {
    const obj: any = {};
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.category_name !== "") {
      obj.category_name = message.category_name;
    }
    if (message.category_id !== "") {
      obj.category_id = message.category_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryDesc>, I>>(base?: I): CategoryDesc {
    return CategoryDesc.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoryDesc>, I>>(object: I): CategoryDesc {
    const message = createBaseCategoryDesc();
    message.creator_id = object.creator_id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.category_name = object.category_name ?? "";
    message.category_id = object.category_id ?? "";
    return message;
  },
};

function createBaseCreateCategoryDescRequest(): CreateCategoryDescRequest {
  return { category_name: "", clan_id: "", creator_id: "", category_id: "" };
}

export const CreateCategoryDescRequest = {
  encode(message: CreateCategoryDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category_name !== "") {
      writer.uint32(10).string(message.category_name);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(26).string(message.creator_id);
    }
    if (message.category_id !== "") {
      writer.uint32(34).string(message.category_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCategoryDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.category_name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.category_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCategoryDescRequest {
    return {
      category_name: isSet(object.category_name) ? globalThis.String(object.category_name) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      category_id: isSet(object.category_id) ? globalThis.String(object.category_id) : "",
    };
  },

  toJSON(message: CreateCategoryDescRequest): unknown {
    const obj: any = {};
    if (message.category_name !== "") {
      obj.category_name = message.category_name;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.category_id !== "") {
      obj.category_id = message.category_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCategoryDescRequest>, I>>(base?: I): CreateCategoryDescRequest {
    return CreateCategoryDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCategoryDescRequest>, I>>(object: I): CreateCategoryDescRequest {
    const message = createBaseCreateCategoryDescRequest();
    message.category_name = object.category_name ?? "";
    message.clan_id = object.clan_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.category_id = object.category_id ?? "";
    return message;
  },
};

function createBaseDeleteCategoryDescRequest(): DeleteCategoryDescRequest {
  return { creator_id: "" };
}

export const DeleteCategoryDescRequest = {
  encode(message: DeleteCategoryDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator_id !== "") {
      writer.uint32(10).string(message.creator_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCategoryDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteCategoryDescRequest {
    return { creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "" };
  },

  toJSON(message: DeleteCategoryDescRequest): unknown {
    const obj: any = {};
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCategoryDescRequest>, I>>(base?: I): DeleteCategoryDescRequest {
    return DeleteCategoryDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCategoryDescRequest>, I>>(object: I): DeleteCategoryDescRequest {
    const message = createBaseDeleteCategoryDescRequest();
    message.creator_id = object.creator_id ?? "";
    return message;
  },
};

function createBaseCategoryDescList(): CategoryDescList {
  return { categorydesc: [] };
}

export const CategoryDescList = {
  encode(message: CategoryDescList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.categorydesc) {
      CategoryDesc.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryDescList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categorydesc.push(CategoryDesc.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CategoryDescList {
    return {
      categorydesc: globalThis.Array.isArray(object?.categorydesc)
        ? object.categorydesc.map((e: any) => CategoryDesc.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CategoryDescList): unknown {
    const obj: any = {};
    if (message.categorydesc?.length) {
      obj.categorydesc = message.categorydesc.map((e) => CategoryDesc.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryDescList>, I>>(base?: I): CategoryDescList {
    return CategoryDescList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoryDescList>, I>>(object: I): CategoryDescList {
    const message = createBaseCategoryDescList();
    message.categorydesc = object.categorydesc?.map((e) => CategoryDesc.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListCategoryDescsRequest(): ListCategoryDescsRequest {
  return { limit: undefined, state: undefined, cursor: "" };
}

export const ListCategoryDescsRequest = {
  encode(message: ListCategoryDescsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCategoryDescsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCategoryDescsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListCategoryDescsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ListCategoryDescsRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCategoryDescsRequest>, I>>(base?: I): ListCategoryDescsRequest {
    return ListCategoryDescsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListCategoryDescsRequest>, I>>(object: I): ListCategoryDescsRequest {
    const message = createBaseListCategoryDescsRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseChannelDescription(): ChannelDescription {
  return {
    clan_id: "",
    parrent_id: "",
    channel_id: "",
    category_id: "",
    category_name: "",
    type: undefined,
    creator_id: "",
    channel_lable: "",
    channel_private: 0,
  };
}

export const ChannelDescription = {
  encode(message: ChannelDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(18).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.category_id !== "") {
      writer.uint32(34).string(message.category_id);
    }
    if (message.category_name !== "") {
      writer.uint32(42).string(message.category_name);
    }
    if (message.type !== undefined) {
      Int32Value.encode({ value: message.type! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.creator_id !== "") {
      writer.uint32(58).string(message.creator_id);
    }
    if (message.channel_lable !== "") {
      writer.uint32(66).string(message.channel_lable);
    }
    if (message.channel_private !== 0) {
      writer.uint32(72).int32(message.channel_private);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.parrent_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.category_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.category_name = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.type = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.channel_lable = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.channel_private = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelDescription {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      parrent_id: isSet(object.parrent_id) ? globalThis.String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      category_id: isSet(object.category_id) ? globalThis.String(object.category_id) : "",
      category_name: isSet(object.category_name) ? globalThis.String(object.category_name) : "",
      type: isSet(object.type) ? Number(object.type) : undefined,
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      channel_lable: isSet(object.channel_lable) ? globalThis.String(object.channel_lable) : "",
      channel_private: isSet(object.channel_private) ? globalThis.Number(object.channel_private) : 0,
    };
  },

  toJSON(message: ChannelDescription): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.parrent_id !== "") {
      obj.parrent_id = message.parrent_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.category_id !== "") {
      obj.category_id = message.category_id;
    }
    if (message.category_name !== "") {
      obj.category_name = message.category_name;
    }
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.channel_lable !== "") {
      obj.channel_lable = message.channel_lable;
    }
    if (message.channel_private !== 0) {
      obj.channel_private = Math.round(message.channel_private);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelDescription>, I>>(base?: I): ChannelDescription {
    return ChannelDescription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelDescription>, I>>(object: I): ChannelDescription {
    const message = createBaseChannelDescription();
    message.clan_id = object.clan_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.category_id = object.category_id ?? "";
    message.category_name = object.category_name ?? "";
    message.type = object.type ?? undefined;
    message.creator_id = object.creator_id ?? "";
    message.channel_lable = object.channel_lable ?? "";
    message.channel_private = object.channel_private ?? 0;
    return message;
  },
};

function createBaseChannelDescList(): ChannelDescList {
  return { channeldesc: [], next_cursor: "", prev_cursor: "", cacheable_cursor: "" };
}

export const ChannelDescList = {
  encode(message: ChannelDescList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channeldesc) {
      ChannelDescription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(18).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(26).string(message.prev_cursor);
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(34).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDescList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channeldesc.push(ChannelDescription.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.next_cursor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cacheable_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelDescList {
    return {
      channeldesc: globalThis.Array.isArray(object?.channeldesc)
        ? object.channeldesc.map((e: any) => ChannelDescription.fromJSON(e))
        : [],
      next_cursor: isSet(object.next_cursor) ? globalThis.String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
      cacheable_cursor: isSet(object.cacheable_cursor) ? globalThis.String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: ChannelDescList): unknown {
    const obj: any = {};
    if (message.channeldesc?.length) {
      obj.channeldesc = message.channeldesc.map((e) => ChannelDescription.toJSON(e));
    }
    if (message.next_cursor !== "") {
      obj.next_cursor = message.next_cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    if (message.cacheable_cursor !== "") {
      obj.cacheable_cursor = message.cacheable_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelDescList>, I>>(base?: I): ChannelDescList {
    return ChannelDescList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelDescList>, I>>(object: I): ChannelDescList {
    const message = createBaseChannelDescList();
    message.channeldesc = object.channeldesc?.map((e) => ChannelDescription.fromPartial(e)) || [];
    message.next_cursor = object.next_cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    message.cacheable_cursor = object.cacheable_cursor ?? "";
    return message;
  },
};

function createBaseListChannelDescsRequest(): ListChannelDescsRequest {
  return { limit: undefined, state: undefined, cursor: "", clan_id: "" };
}

export const ListChannelDescsRequest = {
  encode(message: ListChannelDescsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    if (message.clan_id !== "") {
      writer.uint32(34).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelDescsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelDescsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.clan_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListChannelDescsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
    };
  },

  toJSON(message: ListChannelDescsRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelDescsRequest>, I>>(base?: I): ListChannelDescsRequest {
    return ListChannelDescsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListChannelDescsRequest>, I>>(object: I): ListChannelDescsRequest {
    const message = createBaseListChannelDescsRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseCreateChannelDescRequest(): CreateChannelDescRequest {
  return {
    clan_id: "",
    parrent_id: "",
    channel_id: "",
    category_id: "",
    type: undefined,
    group_id: "",
    channel_lable: "",
    channel_private: 0,
    user_ids: [],
  };
}

export const CreateChannelDescRequest = {
  encode(message: CreateChannelDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(18).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.category_id !== "") {
      writer.uint32(34).string(message.category_id);
    }
    if (message.type !== undefined) {
      Int32Value.encode({ value: message.type! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.group_id !== "") {
      writer.uint32(50).string(message.group_id);
    }
    if (message.channel_lable !== "") {
      writer.uint32(58).string(message.channel_lable);
    }
    if (message.channel_private !== 0) {
      writer.uint32(64).int32(message.channel_private);
    }
    for (const v of message.user_ids) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.parrent_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.category_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.type = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.group_id = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.channel_lable = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.channel_private = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateChannelDescRequest {
    return {
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      parrent_id: isSet(object.parrent_id) ? globalThis.String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      category_id: isSet(object.category_id) ? globalThis.String(object.category_id) : "",
      type: isSet(object.type) ? Number(object.type) : undefined,
      group_id: isSet(object.group_id) ? globalThis.String(object.group_id) : "",
      channel_lable: isSet(object.channel_lable) ? globalThis.String(object.channel_lable) : "",
      channel_private: isSet(object.channel_private) ? globalThis.Number(object.channel_private) : 0,
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: CreateChannelDescRequest): unknown {
    const obj: any = {};
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.parrent_id !== "") {
      obj.parrent_id = message.parrent_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.category_id !== "") {
      obj.category_id = message.category_id;
    }
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    if (message.group_id !== "") {
      obj.group_id = message.group_id;
    }
    if (message.channel_lable !== "") {
      obj.channel_lable = message.channel_lable;
    }
    if (message.channel_private !== 0) {
      obj.channel_private = Math.round(message.channel_private);
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChannelDescRequest>, I>>(base?: I): CreateChannelDescRequest {
    return CreateChannelDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateChannelDescRequest>, I>>(object: I): CreateChannelDescRequest {
    const message = createBaseCreateChannelDescRequest();
    message.clan_id = object.clan_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.category_id = object.category_id ?? "";
    message.type = object.type ?? undefined;
    message.group_id = object.group_id ?? "";
    message.channel_lable = object.channel_lable ?? "";
    message.channel_private = object.channel_private ?? 0;
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteChannelDescRequest(): DeleteChannelDescRequest {
  return { channel_id: "" };
}

export const DeleteChannelDescRequest = {
  encode(message: DeleteChannelDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteChannelDescRequest {
    return { channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "" };
  },

  toJSON(message: DeleteChannelDescRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteChannelDescRequest>, I>>(base?: I): DeleteChannelDescRequest {
    return DeleteChannelDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteChannelDescRequest>, I>>(object: I): DeleteChannelDescRequest {
    const message = createBaseDeleteChannelDescRequest();
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseUpdateChannelDescRequest(): UpdateChannelDescRequest {
  return { channel_id: "", channel_lable: undefined, category_id: undefined };
}

export const UpdateChannelDescRequest = {
  encode(message: UpdateChannelDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.channel_lable !== undefined) {
      StringValue.encode({ value: message.channel_lable! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.category_id !== undefined) {
      StringValue.encode({ value: message.category_id! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_lable = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.category_id = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateChannelDescRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      channel_lable: isSet(object.channel_lable) ? String(object.channel_lable) : undefined,
      category_id: isSet(object.category_id) ? String(object.category_id) : undefined,
    };
  },

  toJSON(message: UpdateChannelDescRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.channel_lable !== undefined) {
      obj.channel_lable = message.channel_lable;
    }
    if (message.category_id !== undefined) {
      obj.category_id = message.category_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChannelDescRequest>, I>>(base?: I): UpdateChannelDescRequest {
    return UpdateChannelDescRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateChannelDescRequest>, I>>(object: I): UpdateChannelDescRequest {
    const message = createBaseUpdateChannelDescRequest();
    message.channel_id = object.channel_id ?? "";
    message.channel_lable = object.channel_lable ?? undefined;
    message.category_id = object.category_id ?? undefined;
    return message;
  },
};

function createBaseAddChannelUsersRequest(): AddChannelUsersRequest {
  return { channel_id: "", user_ids: [] };
}

export const AddChannelUsersRequest = {
  encode(message: AddChannelUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddChannelUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddChannelUsersRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: AddChannelUsersRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddChannelUsersRequest>, I>>(base?: I): AddChannelUsersRequest {
    return AddChannelUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddChannelUsersRequest>, I>>(object: I): AddChannelUsersRequest {
    const message = createBaseAddChannelUsersRequest();
    message.channel_id = object.channel_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseRemoveChannelUsersRequest(): RemoveChannelUsersRequest {
  return { channel_id: "", user_ids: [] };
}

export const RemoveChannelUsersRequest = {
  encode(message: RemoveChannelUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.user_ids) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveChannelUsersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveChannelUsersRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: RemoveChannelUsersRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveChannelUsersRequest>, I>>(base?: I): RemoveChannelUsersRequest {
    return RemoveChannelUsersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveChannelUsersRequest>, I>>(object: I): RemoveChannelUsersRequest {
    const message = createBaseRemoveChannelUsersRequest();
    message.channel_id = object.channel_id ?? "";
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseLeaveChannelRequest(): LeaveChannelRequest {
  return { channel_id: "" };
}

export const LeaveChannelRequest = {
  encode(message: LeaveChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaveChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaveChannelRequest {
    return { channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "" };
  },

  toJSON(message: LeaveChannelRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaveChannelRequest>, I>>(base?: I): LeaveChannelRequest {
    return LeaveChannelRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LeaveChannelRequest>, I>>(object: I): LeaveChannelRequest {
    const message = createBaseLeaveChannelRequest();
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseRole(): Role {
  return {
    id: "",
    title: "",
    color: "",
    role_icon: "",
    slug: "",
    description: "",
    creator_id: "",
    clan_id: "",
    active: 0,
    display_online: 0,
    allow_mention: 0,
  };
}

export const Role = {
  encode(message: Role, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.color !== "") {
      writer.uint32(26).string(message.color);
    }
    if (message.role_icon !== "") {
      writer.uint32(34).string(message.role_icon);
    }
    if (message.slug !== "") {
      writer.uint32(42).string(message.slug);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.creator_id !== "") {
      writer.uint32(58).string(message.creator_id);
    }
    if (message.clan_id !== "") {
      writer.uint32(66).string(message.clan_id);
    }
    if (message.active !== 0) {
      writer.uint32(72).int32(message.active);
    }
    if (message.display_online !== 0) {
      writer.uint32(80).int32(message.display_online);
    }
    if (message.allow_mention !== 0) {
      writer.uint32(88).int32(message.allow_mention);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Role {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.color = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.role_icon = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.creator_id = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.active = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.display_online = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.allow_mention = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Role {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      color: isSet(object.color) ? globalThis.String(object.color) : "",
      role_icon: isSet(object.role_icon) ? globalThis.String(object.role_icon) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      creator_id: isSet(object.creator_id) ? globalThis.String(object.creator_id) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      active: isSet(object.active) ? globalThis.Number(object.active) : 0,
      display_online: isSet(object.display_online) ? globalThis.Number(object.display_online) : 0,
      allow_mention: isSet(object.allow_mention) ? globalThis.Number(object.allow_mention) : 0,
    };
  },

  toJSON(message: Role): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.color !== "") {
      obj.color = message.color;
    }
    if (message.role_icon !== "") {
      obj.role_icon = message.role_icon;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.creator_id !== "") {
      obj.creator_id = message.creator_id;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.active !== 0) {
      obj.active = Math.round(message.active);
    }
    if (message.display_online !== 0) {
      obj.display_online = Math.round(message.display_online);
    }
    if (message.allow_mention !== 0) {
      obj.allow_mention = Math.round(message.allow_mention);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Role>, I>>(base?: I): Role {
    return Role.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Role>, I>>(object: I): Role {
    const message = createBaseRole();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.color = object.color ?? "";
    message.role_icon = object.role_icon ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? "";
    message.creator_id = object.creator_id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.active = object.active ?? 0;
    message.display_online = object.display_online ?? 0;
    message.allow_mention = object.allow_mention ?? 0;
    return message;
  },
};

function createBaseRoleList(): RoleList {
  return { roles: [], next_cursor: "", prev_cursor: "", cacheable_cursor: "" };
}

export const RoleList = {
  encode(message: RoleList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.roles) {
      Role.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.next_cursor !== "") {
      writer.uint32(18).string(message.next_cursor);
    }
    if (message.prev_cursor !== "") {
      writer.uint32(26).string(message.prev_cursor);
    }
    if (message.cacheable_cursor !== "") {
      writer.uint32(34).string(message.cacheable_cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoleList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.roles.push(Role.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.next_cursor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.prev_cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cacheable_cursor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RoleList {
    return {
      roles: globalThis.Array.isArray(object?.roles) ? object.roles.map((e: any) => Role.fromJSON(e)) : [],
      next_cursor: isSet(object.next_cursor) ? globalThis.String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? globalThis.String(object.prev_cursor) : "",
      cacheable_cursor: isSet(object.cacheable_cursor) ? globalThis.String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: RoleList): unknown {
    const obj: any = {};
    if (message.roles?.length) {
      obj.roles = message.roles.map((e) => Role.toJSON(e));
    }
    if (message.next_cursor !== "") {
      obj.next_cursor = message.next_cursor;
    }
    if (message.prev_cursor !== "") {
      obj.prev_cursor = message.prev_cursor;
    }
    if (message.cacheable_cursor !== "") {
      obj.cacheable_cursor = message.cacheable_cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RoleList>, I>>(base?: I): RoleList {
    return RoleList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RoleList>, I>>(object: I): RoleList {
    const message = createBaseRoleList();
    message.roles = object.roles?.map((e) => Role.fromPartial(e)) || [];
    message.next_cursor = object.next_cursor ?? "";
    message.prev_cursor = object.prev_cursor ?? "";
    message.cacheable_cursor = object.cacheable_cursor ?? "";
    return message;
  },
};

function createBaseListRolesRequest(): ListRolesRequest {
  return { limit: undefined, state: undefined, cursor: "", clan_id: "" };
}

export const ListRolesRequest = {
  encode(message: ListRolesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    if (message.clan_id !== "") {
      writer.uint32(34).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.clan_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListRolesRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
    };
  },

  toJSON(message: ListRolesRequest): unknown {
    const obj: any = {};
    if (message.limit !== undefined) {
      obj.limit = message.limit;
    }
    if (message.state !== undefined) {
      obj.state = message.state;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesRequest>, I>>(base?: I): ListRolesRequest {
    return ListRolesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListRolesRequest>, I>>(object: I): ListRolesRequest {
    const message = createBaseListRolesRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseCreateRoleRequest(): CreateRoleRequest {
  return {
    title: "",
    color: "",
    role_icon: "",
    slug: "",
    description: "",
    clan_id: "",
    display_online: 0,
    allow_mention: 0,
    user_ids: [],
    permission_ids: [],
  };
}

export const CreateRoleRequest = {
  encode(message: CreateRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.color !== "") {
      writer.uint32(18).string(message.color);
    }
    if (message.role_icon !== "") {
      writer.uint32(26).string(message.role_icon);
    }
    if (message.slug !== "") {
      writer.uint32(34).string(message.slug);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.clan_id !== "") {
      writer.uint32(50).string(message.clan_id);
    }
    if (message.display_online !== 0) {
      writer.uint32(56).int32(message.display_online);
    }
    if (message.allow_mention !== 0) {
      writer.uint32(64).int32(message.allow_mention);
    }
    for (const v of message.user_ids) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.permission_ids) {
      writer.uint32(82).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.color = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.role_icon = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.clan_id = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.display_online = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.allow_mention = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.permission_ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateRoleRequest {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      color: isSet(object.color) ? globalThis.String(object.color) : "",
      role_icon: isSet(object.role_icon) ? globalThis.String(object.role_icon) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      clan_id: isSet(object.clan_id) ? globalThis.String(object.clan_id) : "",
      display_online: isSet(object.display_online) ? globalThis.Number(object.display_online) : 0,
      allow_mention: isSet(object.allow_mention) ? globalThis.Number(object.allow_mention) : 0,
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
      permission_ids: globalThis.Array.isArray(object?.permission_ids)
        ? object.permission_ids.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: CreateRoleRequest): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.color !== "") {
      obj.color = message.color;
    }
    if (message.role_icon !== "") {
      obj.role_icon = message.role_icon;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.clan_id !== "") {
      obj.clan_id = message.clan_id;
    }
    if (message.display_online !== 0) {
      obj.display_online = Math.round(message.display_online);
    }
    if (message.allow_mention !== 0) {
      obj.allow_mention = Math.round(message.allow_mention);
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    if (message.permission_ids?.length) {
      obj.permission_ids = message.permission_ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(base?: I): CreateRoleRequest {
    return CreateRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(object: I): CreateRoleRequest {
    const message = createBaseCreateRoleRequest();
    message.title = object.title ?? "";
    message.color = object.color ?? "";
    message.role_icon = object.role_icon ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? "";
    message.clan_id = object.clan_id ?? "";
    message.display_online = object.display_online ?? 0;
    message.allow_mention = object.allow_mention ?? 0;
    message.user_ids = object.user_ids?.map((e) => e) || [];
    message.permission_ids = object.permission_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteRoleRequest(): DeleteRoleRequest {
  return { role_id: "" };
}

export const DeleteRoleRequest = {
  encode(message: DeleteRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role_id !== "") {
      writer.uint32(10).string(message.role_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.role_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteRoleRequest {
    return { role_id: isSet(object.role_id) ? globalThis.String(object.role_id) : "" };
  },

  toJSON(message: DeleteRoleRequest): unknown {
    const obj: any = {};
    if (message.role_id !== "") {
      obj.role_id = message.role_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(base?: I): DeleteRoleRequest {
    return DeleteRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(object: I): DeleteRoleRequest {
    const message = createBaseDeleteRoleRequest();
    message.role_id = object.role_id ?? "";
    return message;
  },
};

function createBaseUpdateRoleRequest(): UpdateRoleRequest {
  return {
    title: undefined,
    color: undefined,
    role_icon: undefined,
    slug: undefined,
    description: undefined,
    display_online: undefined,
    allow_mention: undefined,
    user_ids: [],
    permission_ids: [],
    role_id: "",
  };
}

export const UpdateRoleRequest = {
  encode(message: UpdateRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.color !== undefined) {
      StringValue.encode({ value: message.color! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.role_icon !== undefined) {
      StringValue.encode({ value: message.role_icon! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.slug !== undefined) {
      StringValue.encode({ value: message.slug! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== undefined) {
      StringValue.encode({ value: message.description! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.display_online !== undefined) {
      Int32Value.encode({ value: message.display_online! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.allow_mention !== undefined) {
      Int32Value.encode({ value: message.allow_mention! }, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.user_ids) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.permission_ids) {
      writer.uint32(74).string(v!);
    }
    if (message.role_id !== "") {
      writer.uint32(82).string(message.role_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.color = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.role_icon = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.display_online = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.allow_mention = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.user_ids.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.permission_ids.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.role_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateRoleRequest {
    return {
      title: isSet(object.title) ? String(object.title) : undefined,
      color: isSet(object.color) ? String(object.color) : undefined,
      role_icon: isSet(object.role_icon) ? String(object.role_icon) : undefined,
      slug: isSet(object.slug) ? String(object.slug) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      display_online: isSet(object.display_online) ? Number(object.display_online) : undefined,
      allow_mention: isSet(object.allow_mention) ? Number(object.allow_mention) : undefined,
      user_ids: globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => globalThis.String(e)) : [],
      permission_ids: globalThis.Array.isArray(object?.permission_ids)
        ? object.permission_ids.map((e: any) => globalThis.String(e))
        : [],
      role_id: isSet(object.role_id) ? globalThis.String(object.role_id) : "",
    };
  },

  toJSON(message: UpdateRoleRequest): unknown {
    const obj: any = {};
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.color !== undefined) {
      obj.color = message.color;
    }
    if (message.role_icon !== undefined) {
      obj.role_icon = message.role_icon;
    }
    if (message.slug !== undefined) {
      obj.slug = message.slug;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.display_online !== undefined) {
      obj.display_online = message.display_online;
    }
    if (message.allow_mention !== undefined) {
      obj.allow_mention = message.allow_mention;
    }
    if (message.user_ids?.length) {
      obj.user_ids = message.user_ids;
    }
    if (message.permission_ids?.length) {
      obj.permission_ids = message.permission_ids;
    }
    if (message.role_id !== "") {
      obj.role_id = message.role_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(base?: I): UpdateRoleRequest {
    return UpdateRoleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(object: I): UpdateRoleRequest {
    const message = createBaseUpdateRoleRequest();
    message.title = object.title ?? undefined;
    message.color = object.color ?? undefined;
    message.role_icon = object.role_icon ?? undefined;
    message.slug = object.slug ?? undefined;
    message.description = object.description ?? undefined;
    message.display_online = object.display_online ?? undefined;
    message.allow_mention = object.allow_mention ?? undefined;
    message.user_ids = object.user_ids?.map((e) => e) || [];
    message.permission_ids = object.permission_ids?.map((e) => e) || [];
    message.role_id = object.role_id ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
