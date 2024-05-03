/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { BoolValue, Int32Value, StringValue } from "../google/protobuf/wrappers";

export const protobufPackage = "mezon.api";

/** The Mezon server RPC protocol for games and apps. */

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
  /** The OAuth token received from a Facebook Instant Game that may be decoded with the Application Secret (must be available with the mezon configuration) */
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
  /** The avatar of user who send message */
  avatar: string;
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
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  channel_label: string;
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
  /** Sender name */
  sender_name: string;
  /** avatar */
  sender_avatar: string;
  /** Action reaction delete or add */
  action: boolean;
  /** count of emoji */
  count: number;
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
  /** content reference */
  content: string;
  /** has attachment */
  has_attachment: boolean;
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
  last_seen_message: ChannelMessageHeader | undefined;
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
  /** channel id */
  channel_id: string;
}

/** A single user-role pair. */
export interface ChannelUserList_ChannelUser {
  /** User. */
  user:
    | User
    | undefined;
  /** Their relationship to the role. */
  role_id: string[];
  /** Id */
  id: string;
  /** thread id */
  thread_id: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface VoiceChannelUser {
  /** User for a channel. */
  user_id: string;
  /** Cursor for the next page of results, if any. */
  jid: string;
  /** channel id */
  channel_id: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface VoiceChannelUserList {
  /** list of voice channel user */
  voice_channel_users: VoiceChannelUser[];
}

/** channel attachment */
export interface ChannelAttachment {
  /** url attachment */
  id: string;
  /** file name */
  filename: string;
  /** filetype */
  filetype: string;
  /** size */
  filesize: string;
  /** url */
  url: string;
  /** uploader */
  uploader: string;
}

/** channel attachment list */
export interface ChannelAttachmentList {
  /** list attachment */
  attachments: ChannelAttachment[];
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
export interface RegistFcmDeviceTokenRequest {
  /** The token */
  token: string;
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
  /** The current message ID. */
  message_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
  /** True if listing should be older messages to newer, false if reverse. */
  direction: number | undefined;
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
  /** The clan id */
  clan_id: string;
  /** The channel ID to list from. */
  channel_id: string;
  /** The channel type */
  channel_type: number;
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

/** List all attachments that are part of a channel. */
export interface ListChannelAttachmentRequest {
  /** The clan id */
  clan_id: string;
  /** The channel ID to list from. */
  channel_id: string;
  /** The channel type */
  file_type: string;
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

/** List all users that are part of a clan. */
export interface ListClanUsersRequest {
  /** The clan ID to list from. */
  clan_id: string;
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
  /** ID of clan */
  clan_id: string;
  /** ID of channel */
  channel_id: string;
  /** mode of */
  channel_mode: string;
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
  timezone:
    | string
    | undefined;
  /** update about me */
  about_me: string;
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
  /** The Apple Sign In ID in the user's account. */
  apple_id: string;
  /**  */
  about_me: string;
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
  /** clan name */
  clan_name: string;
  /** channel name */
  channel_label: string;
  /** check user exist */
  user_joined: boolean;
  /** expiry_time */
  expiry_time: Date | undefined;
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

export interface ChannelMessageHeader {
  /** the message id */
  id: string;
  /** the time stamp */
  timestamp: string;
  /** the sender id */
  sender_id: string;
  /** the content */
  content: string;
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
  channel_label: string;
  /** The channel private */
  channel_private: number;
  /** The channel avatar */
  channel_avatar: string[];
  /** The user id */
  user_id: string[];
  /** last message id */
  last_sent_message:
    | ChannelMessageHeader
    | undefined;
  /** last seen message id */
  last_seen_message: ChannelMessageHeader | undefined;
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
  /** channel type */
  channel_type: number;
}

/** Add a role for channel. */
export interface AddRoleChannelDescRequest {
  /** This is the role that needs to be added to the channel */
  role_ids: string[];
  /** This is a channel that needs more roles */
  channel_id: string;
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
  /** The channel lable */
  channel_label: string;
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
  channel_label:
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
  role_user_list: RoleUserList | undefined;
  permission_list: PermissionList | undefined;
  role_channel_active: number;
  channel_ids: string[];
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
  role_id: string;
}

/** List (and optionally filter) role-users. */
export interface ListRoleUsersRequest {
  role_id: string;
  /** Max number of records to return. Between 1 and 100. */
  limit:
    | number
    | undefined;
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
  /** The id of a channel */
  channel_id: string;
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

export interface UploadAttachment {
  /** The name of file that need to upload */
  filename: string;
  /** The url */
  url: string;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.wallet = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.devices.push(AccountDevice.decode(reader, reader.uint32()));
          break;
        case 5:
          message.custom_id = reader.string();
          break;
        case 6:
          message.verify_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.disable_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      wallet: isSet(object.wallet) ? String(object.wallet) : "",
      email: isSet(object.email) ? String(object.email) : "",
      devices: Array.isArray(object?.devices) ? object.devices.map((e: any) => AccountDevice.fromJSON(e)) : [],
      custom_id: isSet(object.custom_id) ? String(object.custom_id) : "",
      verify_time: isSet(object.verify_time) ? fromJsonTimestamp(object.verify_time) : undefined,
      disable_time: isSet(object.disable_time) ? fromJsonTimestamp(object.disable_time) : undefined,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.wallet !== undefined && (obj.wallet = message.wallet);
    message.email !== undefined && (obj.email = message.email);
    if (message.devices) {
      obj.devices = message.devices.map((e) => e ? AccountDevice.toJSON(e) : undefined);
    } else {
      obj.devices = [];
    }
    message.custom_id !== undefined && (obj.custom_id = message.custom_id);
    message.verify_time !== undefined && (obj.verify_time = message.verify_time.toISOString());
    message.disable_time !== undefined && (obj.disable_time = message.disable_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
    return Account.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRefresh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountRefresh_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountRefresh {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountRefresh>, I>>(base?: I): AccountRefresh {
    return AccountRefresh.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountRefresh>, I>>(object: I): AccountRefresh {
    const message = createBaseAccountRefresh();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRefresh_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountRefresh_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountRefresh_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountRefresh_VarsEntry>, I>>(base?: I): AccountRefresh_VarsEntry {
    return AccountRefresh_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountApple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountApple_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountApple {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountApple>, I>>(base?: I): AccountApple {
    return AccountApple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountApple>, I>>(object: I): AccountApple {
    const message = createBaseAccountApple();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountApple_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountApple_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountApple_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountApple_VarsEntry>, I>>(base?: I): AccountApple_VarsEntry {
    return AccountApple_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountCustom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          const entry2 = AccountCustom_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountCustom {
    return {
      id: isSet(object.id) ? String(object.id) : "",
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
    message.id !== undefined && (obj.id = message.id);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountCustom>, I>>(base?: I): AccountCustom {
    return AccountCustom.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountCustom>, I>>(object: I): AccountCustom {
    const message = createBaseAccountCustom();
    message.id = object.id ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountCustom_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountCustom_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountCustom_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountCustom_VarsEntry>, I>>(base?: I): AccountCustom_VarsEntry {
    return AccountCustom_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountDevice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          const entry2 = AccountDevice_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountDevice {
    return {
      id: isSet(object.id) ? String(object.id) : "",
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
    message.id !== undefined && (obj.id = message.id);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountDevice>, I>>(base?: I): AccountDevice {
    return AccountDevice.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountDevice>, I>>(object: I): AccountDevice {
    const message = createBaseAccountDevice();
    message.id = object.id ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountDevice_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountDevice_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountDevice_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountDevice_VarsEntry>, I>>(base?: I): AccountDevice_VarsEntry {
    return AccountDevice_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountEmail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          const entry3 = AccountEmail_VarsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.vars[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountEmail {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
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
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountEmail>, I>>(base?: I): AccountEmail {
    return AccountEmail.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountEmail>, I>>(object: I): AccountEmail {
    const message = createBaseAccountEmail();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountEmail_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountEmail_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountEmail_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountEmail_VarsEntry>, I>>(base?: I): AccountEmail_VarsEntry {
    return AccountEmail_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountFacebook_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebook {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebook>, I>>(base?: I): AccountFacebook {
    return AccountFacebook.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountFacebook>, I>>(object: I): AccountFacebook {
    const message = createBaseAccountFacebook();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebook_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebook_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountFacebook_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebook_VarsEntry>, I>>(base?: I): AccountFacebook_VarsEntry {
    return AccountFacebook_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebookInstantGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signed_player_info = reader.string();
          break;
        case 2:
          const entry2 = AccountFacebookInstantGame_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebookInstantGame {
    return {
      signed_player_info: isSet(object.signed_player_info) ? String(object.signed_player_info) : "",
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
    message.signed_player_info !== undefined && (obj.signed_player_info = message.signed_player_info);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebookInstantGame>, I>>(base?: I): AccountFacebookInstantGame {
    return AccountFacebookInstantGame.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountFacebookInstantGame>, I>>(object: I): AccountFacebookInstantGame {
    const message = createBaseAccountFacebookInstantGame();
    message.signed_player_info = object.signed_player_info ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFacebookInstantGame_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountFacebookInstantGame_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountFacebookInstantGame_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFacebookInstantGame_VarsEntry>, I>>(
    base?: I,
  ): AccountFacebookInstantGame_VarsEntry {
    return AccountFacebookInstantGame_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGameCenter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.player_id = reader.string();
          break;
        case 2:
          message.bundle_id = reader.string();
          break;
        case 3:
          message.timestamp_seconds = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.salt = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        case 6:
          message.public_key_url = reader.string();
          break;
        case 7:
          const entry7 = AccountGameCenter_VarsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.vars[entry7.key] = entry7.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGameCenter {
    return {
      player_id: isSet(object.player_id) ? String(object.player_id) : "",
      bundle_id: isSet(object.bundle_id) ? String(object.bundle_id) : "",
      timestamp_seconds: isSet(object.timestamp_seconds) ? Number(object.timestamp_seconds) : 0,
      salt: isSet(object.salt) ? String(object.salt) : "",
      signature: isSet(object.signature) ? String(object.signature) : "",
      public_key_url: isSet(object.public_key_url) ? String(object.public_key_url) : "",
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
    message.player_id !== undefined && (obj.player_id = message.player_id);
    message.bundle_id !== undefined && (obj.bundle_id = message.bundle_id);
    message.timestamp_seconds !== undefined && (obj.timestamp_seconds = Math.round(message.timestamp_seconds));
    message.salt !== undefined && (obj.salt = message.salt);
    message.signature !== undefined && (obj.signature = message.signature);
    message.public_key_url !== undefined && (obj.public_key_url = message.public_key_url);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGameCenter>, I>>(base?: I): AccountGameCenter {
    return AccountGameCenter.fromPartial(base ?? {});
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
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGameCenter_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGameCenter_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountGameCenter_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGameCenter_VarsEntry>, I>>(base?: I): AccountGameCenter_VarsEntry {
    return AccountGameCenter_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGoogle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountGoogle_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGoogle {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGoogle>, I>>(base?: I): AccountGoogle {
    return AccountGoogle.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountGoogle>, I>>(object: I): AccountGoogle {
    const message = createBaseAccountGoogle();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountGoogle_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountGoogle_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountGoogle_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountGoogle_VarsEntry>, I>>(base?: I): AccountGoogle_VarsEntry {
    return AccountGoogle_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountSteam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = AccountSteam_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountSteam {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountSteam>, I>>(base?: I): AccountSteam {
    return AccountSteam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AccountSteam>, I>>(object: I): AccountSteam {
    const message = createBaseAccountSteam();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountSteam_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountSteam_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountSteam_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountSteam_VarsEntry>, I>>(base?: I): AccountSteam_VarsEntry {
    return AccountSteam_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddFriendsRequest {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      usernames: Array.isArray(object?.usernames) ? object.usernames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: AddFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddFriendsRequest>, I>>(base?: I): AddFriendsRequest {
    return AddFriendsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: AddGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddGroupUsersRequest>, I>>(base?: I): AddGroupUsersRequest {
    return AddGroupUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          const entry2 = SessionRefreshRequest_VarsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.vars[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionRefreshRequest {
    return {
      token: isSet(object.token) ? String(object.token) : "",
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
    message.token !== undefined && (obj.token = message.token);
    obj.vars = {};
    if (message.vars) {
      Object.entries(message.vars).forEach(([k, v]) => {
        obj.vars[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionRefreshRequest>, I>>(base?: I): SessionRefreshRequest {
    return SessionRefreshRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SessionRefreshRequest>, I>>(object: I): SessionRefreshRequest {
    const message = createBaseSessionRefreshRequest();
    message.token = object.token ?? "";
    message.vars = Object.entries(object.vars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionRefreshRequest_VarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionRefreshRequest_VarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: SessionRefreshRequest_VarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionRefreshRequest_VarsEntry>, I>>(base?: I): SessionRefreshRequest_VarsEntry {
    return SessionRefreshRequest_VarsEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionLogoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.refresh_token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionLogoutRequest {
    return {
      token: isSet(object.token) ? String(object.token) : "",
      refresh_token: isSet(object.refresh_token) ? String(object.refresh_token) : "",
    };
  },

  toJSON(message: SessionLogoutRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.refresh_token !== undefined && (obj.refresh_token = message.refresh_token);
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionLogoutRequest>, I>>(base?: I): SessionLogoutRequest {
    return SessionLogoutRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateAppleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountApple.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateAppleRequest {
    return {
      account: isSet(object.account) ? AccountApple.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateAppleRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account ? AccountApple.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateAppleRequest>, I>>(base?: I): AuthenticateAppleRequest {
    return AuthenticateAppleRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateCustomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountCustom.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateCustomRequest {
    return {
      account: isSet(object.account) ? AccountCustom.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateCustomRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountCustom.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateCustomRequest>, I>>(base?: I): AuthenticateCustomRequest {
    return AuthenticateCustomRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateDeviceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountDevice.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateDeviceRequest {
    return {
      account: isSet(object.account) ? AccountDevice.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateDeviceRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountDevice.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateDeviceRequest>, I>>(base?: I): AuthenticateDeviceRequest {
    return AuthenticateDeviceRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountEmail.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateEmailRequest {
    return {
      account: isSet(object.account) ? AccountEmail.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateEmailRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account ? AccountEmail.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateEmailRequest>, I>>(base?: I): AuthenticateEmailRequest {
    return AuthenticateEmailRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateFacebookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookRequest {
    return {
      account: isSet(object.account) ? AccountFacebook.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: AuthenticateFacebookRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountFacebook.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateFacebookRequest>, I>>(base?: I): AuthenticateFacebookRequest {
    return AuthenticateFacebookRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateFacebookInstantGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebookInstantGame.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateFacebookInstantGameRequest {
    return {
      account: isSet(object.account) ? AccountFacebookInstantGame.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateFacebookInstantGameRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountFacebookInstantGame.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateFacebookInstantGameRequest>, I>>(
    base?: I,
  ): AuthenticateFacebookInstantGameRequest {
    return AuthenticateFacebookInstantGameRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateGameCenterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountGameCenter.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGameCenterRequest {
    return {
      account: isSet(object.account) ? AccountGameCenter.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateGameCenterRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountGameCenter.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateGameCenterRequest>, I>>(base?: I): AuthenticateGameCenterRequest {
    return AuthenticateGameCenterRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateGoogleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountGoogle.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateGoogleRequest {
    return {
      account: isSet(object.account) ? AccountGoogle.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: AuthenticateGoogleRequest): unknown {
    const obj: any = {};
    message.account !== undefined &&
      (obj.account = message.account ? AccountGoogle.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateGoogleRequest>, I>>(base?: I): AuthenticateGoogleRequest {
    return AuthenticateGoogleRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateSteamRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.create = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateSteamRequest {
    return {
      account: isSet(object.account) ? AccountSteam.fromJSON(object.account) : undefined,
      create: isSet(object.create) ? Boolean(object.create) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
      sync: isSet(object.sync) ? Boolean(object.sync) : undefined,
    };
  },

  toJSON(message: AuthenticateSteamRequest): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account ? AccountSteam.toJSON(message.account) : undefined);
    message.create !== undefined && (obj.create = message.create);
    message.username !== undefined && (obj.username = message.username);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateSteamRequest>, I>>(base?: I): AuthenticateSteamRequest {
    return AuthenticateSteamRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BanGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BanGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BanGroupUsersRequest>, I>>(base?: I): BanGroupUsersRequest {
    return BanGroupUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockFriendsRequest {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      usernames: Array.isArray(object?.usernames) ? object.usernames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BlockFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockFriendsRequest>, I>>(base?: I): BlockFriendsRequest {
    return BlockFriendsRequest.fromPartial(base ?? {});
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
    avatar: "",
    content: "",
    create_time: undefined,
    update_time: undefined,
    channel_label: "",
    user_id_one: "",
    user_id_two: "",
    reactions: "",
    mentions: "",
    attachments: "",
    references: "",
    referenced_message: "",
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
    if (message.avatar !== "") {
      writer.uint32(58).string(message.avatar);
    }
    if (message.content !== "") {
      writer.uint32(66).string(message.content);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(74).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(82).fork()).ldelim();
    }
    if (message.channel_label !== "") {
      writer.uint32(90).string(message.channel_label);
    }
    if (message.user_id_one !== "") {
      writer.uint32(98).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(106).string(message.user_id_two);
    }
    if (message.reactions !== "") {
      writer.uint32(114).string(message.reactions);
    }
    if (message.mentions !== "") {
      writer.uint32(122).string(message.mentions);
    }
    if (message.attachments !== "") {
      writer.uint32(130).string(message.attachments);
    }
    if (message.references !== "") {
      writer.uint32(138).string(message.references);
    }
    if (message.referenced_message !== "") {
      writer.uint32(146).string(message.referenced_message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.username = reader.string();
          break;
        case 7:
          message.avatar = reader.string();
          break;
        case 8:
          message.content = reader.string();
          break;
        case 9:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 11:
          message.channel_label = reader.string();
          break;
        case 12:
          message.user_id_one = reader.string();
          break;
        case 13:
          message.user_id_two = reader.string();
          break;
        case 14:
          message.reactions = reader.string();
          break;
        case 15:
          message.mentions = reader.string();
          break;
        case 16:
          message.attachments = reader.string();
          break;
        case 17:
          message.references = reader.string();
          break;
        case 18:
          message.referenced_message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessage {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      code: isSet(object.code) ? Number(object.code) : undefined,
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      avatar: isSet(object.avatar) ? String(object.avatar) : "",
      content: isSet(object.content) ? String(object.content) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      user_id_one: isSet(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? String(object.user_id_two) : "",
      reactions: isSet(object.reactions) ? String(object.reactions) : "",
      mentions: isSet(object.mentions) ? String(object.mentions) : "",
      attachments: isSet(object.attachments) ? String(object.attachments) : "",
      references: isSet(object.references) ? String(object.references) : "",
      referenced_message: isSet(object.referenced_message) ? String(object.referenced_message) : "",
    };
  },

  toJSON(message: ChannelMessage): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.code !== undefined && (obj.code = message.code);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.content !== undefined && (obj.content = message.content);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.user_id_one !== undefined && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined && (obj.user_id_two = message.user_id_two);
    message.reactions !== undefined && (obj.reactions = message.reactions);
    message.mentions !== undefined && (obj.mentions = message.mentions);
    message.attachments !== undefined && (obj.attachments = message.attachments);
    message.references !== undefined && (obj.references = message.references);
    message.referenced_message !== undefined && (obj.referenced_message = message.referenced_message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessage>, I>>(base?: I): ChannelMessage {
    return ChannelMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessage>, I>>(object: I): ChannelMessage {
    const message = createBaseChannelMessage();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.code = object.code ?? undefined;
    message.sender_id = object.sender_id ?? "";
    message.username = object.username ?? "";
    message.avatar = object.avatar ?? "";
    message.content = object.content ?? "";
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.channel_label = object.channel_label ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    message.reactions = object.reactions ?? "";
    message.mentions = object.mentions ?? "";
    message.attachments = object.attachments ?? "";
    message.references = object.references ?? "";
    message.referenced_message = object.referenced_message ?? "";
    return message;
  },
};

function createBaseMessageMention(): MessageMention {
  return { id: "", user_id: "", username: "", create_time: undefined };
}

export const MessageMention = {
  encode(message: MessageMention, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.user_id !== "") {
      writer.uint32(18).string(message.user_id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageMention {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.user_id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageMention {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
    };
  },

  toJSON(message: MessageMention): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.username !== undefined && (obj.username = message.username);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageMention>, I>>(base?: I): MessageMention {
    return MessageMention.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageMention>, I>>(object: I): MessageMention {
    const message = createBaseMessageMention();
    message.id = object.id ?? "";
    message.user_id = object.user_id ?? "";
    message.username = object.username ?? "";
    message.create_time = object.create_time ?? undefined;
    return message;
  },
};

function createBaseMessageReaction(): MessageReaction {
  return { id: "", emoji: "", sender_id: "", sender_name: "", sender_avatar: "", action: false, count: 0 };
}

export const MessageReaction = {
  encode(message: MessageReaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.emoji !== "") {
      writer.uint32(18).string(message.emoji);
    }
    if (message.sender_id !== "") {
      writer.uint32(26).string(message.sender_id);
    }
    if (message.sender_name !== "") {
      writer.uint32(34).string(message.sender_name);
    }
    if (message.sender_avatar !== "") {
      writer.uint32(42).string(message.sender_avatar);
    }
    if (message.action === true) {
      writer.uint32(48).bool(message.action);
    }
    if (message.count !== 0) {
      writer.uint32(56).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageReaction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageReaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.emoji = reader.string();
          break;
        case 3:
          message.sender_id = reader.string();
          break;
        case 4:
          message.sender_name = reader.string();
          break;
        case 5:
          message.sender_avatar = reader.string();
          break;
        case 6:
          message.action = reader.bool();
          break;
        case 7:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageReaction {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      emoji: isSet(object.emoji) ? String(object.emoji) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      sender_name: isSet(object.sender_name) ? String(object.sender_name) : "",
      sender_avatar: isSet(object.sender_avatar) ? String(object.sender_avatar) : "",
      action: isSet(object.action) ? Boolean(object.action) : false,
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: MessageReaction): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.emoji !== undefined && (obj.emoji = message.emoji);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.sender_name !== undefined && (obj.sender_name = message.sender_name);
    message.sender_avatar !== undefined && (obj.sender_avatar = message.sender_avatar);
    message.action !== undefined && (obj.action = message.action);
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageReaction>, I>>(base?: I): MessageReaction {
    return MessageReaction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageReaction>, I>>(object: I): MessageReaction {
    const message = createBaseMessageReaction();
    message.id = object.id ?? "";
    message.emoji = object.emoji ?? "";
    message.sender_id = object.sender_id ?? "";
    message.sender_name = object.sender_name ?? "";
    message.sender_avatar = object.sender_avatar ?? "";
    message.action = object.action ?? false;
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseMessageAttachment(): MessageAttachment {
  return { filename: "", size: 0, url: "", filetype: "", width: 0, height: 0 };
}

export const MessageAttachment = {
  encode(message: MessageAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.size !== 0) {
      writer.uint32(16).int64(message.size);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.filetype !== "") {
      writer.uint32(34).string(message.filetype);
    }
    if (message.width !== 0) {
      writer.uint32(40).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(48).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filename = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.filetype = reader.string();
          break;
        case 5:
          message.width = reader.int32();
          break;
        case 6:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageAttachment {
    return {
      filename: isSet(object.filename) ? String(object.filename) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      filetype: isSet(object.filetype) ? String(object.filetype) : "",
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: MessageAttachment): unknown {
    const obj: any = {};
    message.filename !== undefined && (obj.filename = message.filename);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.url !== undefined && (obj.url = message.url);
    message.filetype !== undefined && (obj.filetype = message.filetype);
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageAttachment>, I>>(base?: I): MessageAttachment {
    return MessageAttachment.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageAttachment>, I>>(object: I): MessageAttachment {
    const message = createBaseMessageAttachment();
    message.filename = object.filename ?? "";
    message.size = object.size ?? 0;
    message.url = object.url ?? "";
    message.filetype = object.filetype ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseMessageRef(): MessageRef {
  return { message_id: "", message_ref_id: "", content: "", has_attachment: false, ref_type: 0 };
}

export const MessageRef = {
  encode(message: MessageRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message_id !== "") {
      writer.uint32(10).string(message.message_id);
    }
    if (message.message_ref_id !== "") {
      writer.uint32(18).string(message.message_ref_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.has_attachment === true) {
      writer.uint32(32).bool(message.has_attachment);
    }
    if (message.ref_type !== 0) {
      writer.uint32(40).int32(message.ref_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageRef {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message_id = reader.string();
          break;
        case 2:
          message.message_ref_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.has_attachment = reader.bool();
          break;
        case 5:
          message.ref_type = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageRef {
    return {
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      message_ref_id: isSet(object.message_ref_id) ? String(object.message_ref_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
      has_attachment: isSet(object.has_attachment) ? Boolean(object.has_attachment) : false,
      ref_type: isSet(object.ref_type) ? Number(object.ref_type) : 0,
    };
  },

  toJSON(message: MessageRef): unknown {
    const obj: any = {};
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.message_ref_id !== undefined && (obj.message_ref_id = message.message_ref_id);
    message.content !== undefined && (obj.content = message.content);
    message.has_attachment !== undefined && (obj.has_attachment = message.has_attachment);
    message.ref_type !== undefined && (obj.ref_type = Math.round(message.ref_type));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageRef>, I>>(base?: I): MessageRef {
    return MessageRef.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageRef>, I>>(object: I): MessageRef {
    const message = createBaseMessageRef();
    message.message_id = object.message_id ?? "";
    message.message_ref_id = object.message_ref_id ?? "";
    message.content = object.content ?? "";
    message.has_attachment = object.has_attachment ?? false;
    message.ref_type = object.ref_type ?? 0;
    return message;
  },
};

function createBaseMessageDeleted(): MessageDeleted {
  return { message_id: "", deletor: "" };
}

export const MessageDeleted = {
  encode(message: MessageDeleted, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message_id !== "") {
      writer.uint32(10).string(message.message_id);
    }
    if (message.deletor !== "") {
      writer.uint32(18).string(message.deletor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message_id = reader.string();
          break;
        case 2:
          message.deletor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageDeleted {
    return {
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      deletor: isSet(object.deletor) ? String(object.deletor) : "",
    };
  },

  toJSON(message: MessageDeleted): unknown {
    const obj: any = {};
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.deletor !== undefined && (obj.deletor = message.deletor);
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageDeleted>, I>>(base?: I): MessageDeleted {
    return MessageDeleted.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageDeleted>, I>>(object: I): MessageDeleted {
    const message = createBaseMessageDeleted();
    message.message_id = object.message_id ?? "";
    message.deletor = object.deletor ?? "";
    return message;
  },
};

function createBaseChannelMessageList(): ChannelMessageList {
  return { messages: [], last_seen_message: undefined };
}

export const ChannelMessageList = {
  encode(message: ChannelMessageList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      ChannelMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.last_seen_message !== undefined) {
      ChannelMessageHeader.encode(message.last_seen_message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ChannelMessage.decode(reader, reader.uint32()));
          break;
        case 2:
          message.last_seen_message = ChannelMessageHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageList {
    return {
      messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => ChannelMessage.fromJSON(e)) : [],
      last_seen_message: isSet(object.last_seen_message)
        ? ChannelMessageHeader.fromJSON(object.last_seen_message)
        : undefined,
    };
  },

  toJSON(message: ChannelMessageList): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) => e ? ChannelMessage.toJSON(e) : undefined);
    } else {
      obj.messages = [];
    }
    message.last_seen_message !== undefined && (obj.last_seen_message = message.last_seen_message
      ? ChannelMessageHeader.toJSON(message.last_seen_message)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageList>, I>>(base?: I): ChannelMessageList {
    return ChannelMessageList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageList>, I>>(object: I): ChannelMessageList {
    const message = createBaseChannelMessageList();
    message.messages = object.messages?.map((e) => ChannelMessage.fromPartial(e)) || [];
    message.last_seen_message = (object.last_seen_message !== undefined && object.last_seen_message !== null)
      ? ChannelMessageHeader.fromPartial(object.last_seen_message)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.lang_tag = reader.string();
          break;
        case 4:
          message.avatar_url = reader.string();
          break;
        case 5:
          message.open = reader.bool();
          break;
        case 6:
          message.max_count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateGroupRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
      open: isSet(object.open) ? Boolean(object.open) : false,
      max_count: isSet(object.max_count) ? Number(object.max_count) : 0,
    };
  },

  toJSON(message: CreateGroupRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    message.max_count !== undefined && (obj.max_count = Math.round(message.max_count));
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateGroupRequest>, I>>(base?: I): CreateGroupRequest {
    return CreateGroupRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteFriendsRequest {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      usernames: Array.isArray(object?.usernames) ? object.usernames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: DeleteFriendsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteFriendsRequest>, I>>(base?: I): DeleteFriendsRequest {
    return DeleteFriendsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteGroupRequest {
    return { group_id: isSet(object.group_id) ? String(object.group_id) : "" };
  },

  toJSON(message: DeleteGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteGroupRequest>, I>>(base?: I): DeleteGroupRequest {
    return DeleteGroupRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteGroupRequest>, I>>(object: I): DeleteGroupRequest {
    const message = createBaseDeleteGroupRequest();
    message.group_id = object.group_id ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNotificationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationsRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: DeleteNotificationsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteNotificationsRequest>, I>>(base?: I): DeleteNotificationsRequest {
    return DeleteNotificationsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteNotificationsRequest>, I>>(object: I): DeleteNotificationsRequest {
    const message = createBaseDeleteNotificationsRequest();
    message.ids = object.ids?.map((e) => e) || [];
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteStorageObjectId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectId {
    return {
      collection: isSet(object.collection) ? String(object.collection) : "",
      key: isSet(object.key) ? String(object.key) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: DeleteStorageObjectId): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteStorageObjectId>, I>>(base?: I): DeleteStorageObjectId {
    return DeleteStorageObjectId.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.object_ids.push(DeleteStorageObjectId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteStorageObjectsRequest {
    return {
      object_ids: Array.isArray(object?.object_ids)
        ? object.object_ids.map((e: any) => DeleteStorageObjectId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids) {
      obj.object_ids = message.object_ids.map((e) => e ? DeleteStorageObjectId.toJSON(e) : undefined);
    } else {
      obj.object_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteStorageObjectsRequest>, I>>(base?: I): DeleteStorageObjectsRequest {
    return DeleteStorageObjectsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          const entry2 = Event_PropertiesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.properties[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.external = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      properties: isObject(object.properties)
        ? Object.entries(object.properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      external: isSet(object.external) ? Boolean(object.external) : false,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    obj.properties = {};
    if (message.properties) {
      Object.entries(message.properties).forEach(([k, v]) => {
        obj.properties[k] = v;
      });
    }
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    message.external !== undefined && (obj.external = message.external);
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.name = object.name ?? "";
    message.properties = Object.entries(object.properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_PropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_PropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Event_PropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Event_PropertiesEntry>, I>>(base?: I): Event_PropertiesEntry {
    return Event_PropertiesEntry.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFriend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.state !== undefined && (obj.state = message.state);
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<Friend>, I>>(base?: I): Friend {
    return Friend.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFriendList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.friends.push(Friend.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FriendList {
    return {
      friends: Array.isArray(object?.friends) ? object.friends.map((e: any) => Friend.fromJSON(e)) : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: FriendList): unknown {
    const obj: any = {};
    if (message.friends) {
      obj.friends = message.friends.map((e) => e ? Friend.toJSON(e) : undefined);
    } else {
      obj.friends = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<FriendList>, I>>(base?: I): FriendList {
    return FriendList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        case 3:
          message.facebook_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUsersRequest {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      usernames: Array.isArray(object?.usernames) ? object.usernames.map((e: any) => String(e)) : [],
      facebook_ids: Array.isArray(object?.facebook_ids) ? object.facebook_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: GetUsersRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    if (message.facebook_ids) {
      obj.facebook_ids = message.facebook_ids.map((e) => e);
    } else {
      obj.facebook_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUsersRequest>, I>>(base?: I): GetUsersRequest {
    return GetUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.display_name = reader.string();
          break;
        case 3:
          message.avatar_url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateUsersRequest {
    return {
      display_name: isSet(object.display_name) ? String(object.display_name) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
    };
  },

  toJSON(message: UpdateUsersRequest): unknown {
    const obj: any = {};
    message.display_name !== undefined && (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUsersRequest>, I>>(base?: I): UpdateUsersRequest {
    return UpdateUsersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateUsersRequest>, I>>(object: I): UpdateUsersRequest {
    const message = createBaseUpdateUsersRequest();
    message.display_name = object.display_name ?? "";
    message.avatar_url = object.avatar_url ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.creator_id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.lang_tag = reader.string();
          break;
        case 6:
          message.metadata = reader.string();
          break;
        case 7:
          message.avatar_url = reader.string();
          break;
        case 8:
          message.open = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.edge_count = reader.int32();
          break;
        case 10:
          message.max_count = reader.int32();
          break;
        case 11:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 12:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Group {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
      open: isSet(object.open) ? Boolean(object.open) : undefined,
      edge_count: isSet(object.edge_count) ? Number(object.edge_count) : 0,
      max_count: isSet(object.max_count) ? Number(object.max_count) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: Group): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    message.edge_count !== undefined && (obj.edge_count = Math.round(message.edge_count));
    message.max_count !== undefined && (obj.max_count = Math.round(message.max_count));
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<Group>, I>>(base?: I): Group {
    return Group.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groups.push(Group.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupList {
    return {
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => Group.fromJSON(e)) : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: GroupList): unknown {
    const obj: any = {};
    if (message.groups) {
      obj.groups = message.groups.map((e) => e ? Group.toJSON(e) : undefined);
    } else {
      obj.groups = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupList>, I>>(base?: I): GroupList {
    return GroupList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_users.push(GroupUserList_GroupUser.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupUserList {
    return {
      group_users: Array.isArray(object?.group_users)
        ? object.group_users.map((e: any) => GroupUserList_GroupUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: GroupUserList): unknown {
    const obj: any = {};
    if (message.group_users) {
      obj.group_users = message.group_users.map((e) => e ? GroupUserList_GroupUser.toJSON(e) : undefined);
    } else {
      obj.group_users = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupUserList>, I>>(base?: I): GroupUserList {
    return GroupUserList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupUserList_GroupUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupUserList_GroupUser>, I>>(base?: I): GroupUserList_GroupUser {
    return GroupUserList_GroupUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GroupUserList_GroupUser>, I>>(object: I): GroupUserList_GroupUser {
    const message = createBaseGroupUserList_GroupUser();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.state = object.state ?? undefined;
    return message;
  },
};

function createBaseChannelUserList(): ChannelUserList {
  return { channel_users: [], cursor: "", channel_id: "" };
}

export const ChannelUserList = {
  encode(message: ChannelUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channel_users) {
      ChannelUserList_ChannelUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_users.push(ChannelUserList_ChannelUser.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelUserList {
    return {
      channel_users: Array.isArray(object?.channel_users)
        ? object.channel_users.map((e: any) => ChannelUserList_ChannelUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: ChannelUserList): unknown {
    const obj: any = {};
    if (message.channel_users) {
      obj.channel_users = message.channel_users.map((e) => e ? ChannelUserList_ChannelUser.toJSON(e) : undefined);
    } else {
      obj.channel_users = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelUserList>, I>>(base?: I): ChannelUserList {
    return ChannelUserList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelUserList>, I>>(object: I): ChannelUserList {
    const message = createBaseChannelUserList();
    message.channel_users = object.channel_users?.map((e) => ChannelUserList_ChannelUser.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseChannelUserList_ChannelUser(): ChannelUserList_ChannelUser {
  return { user: undefined, role_id: [], id: "", thread_id: "" };
}

export const ChannelUserList_ChannelUser = {
  encode(message: ChannelUserList_ChannelUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.role_id) {
      writer.uint32(18).string(v!);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.thread_id !== "") {
      writer.uint32(34).string(message.thread_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUserList_ChannelUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelUserList_ChannelUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.role_id.push(reader.string());
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.thread_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelUserList_ChannelUser {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      role_id: Array.isArray(object?.role_id) ? object.role_id.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? String(object.id) : "",
      thread_id: isSet(object.thread_id) ? String(object.thread_id) : "",
    };
  },

  toJSON(message: ChannelUserList_ChannelUser): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    if (message.role_id) {
      obj.role_id = message.role_id.map((e) => e);
    } else {
      obj.role_id = [];
    }
    message.id !== undefined && (obj.id = message.id);
    message.thread_id !== undefined && (obj.thread_id = message.thread_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelUserList_ChannelUser>, I>>(base?: I): ChannelUserList_ChannelUser {
    return ChannelUserList_ChannelUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelUserList_ChannelUser>, I>>(object: I): ChannelUserList_ChannelUser {
    const message = createBaseChannelUserList_ChannelUser();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.role_id = object.role_id?.map((e) => e) || [];
    message.id = object.id ?? "";
    message.thread_id = object.thread_id ?? "";
    return message;
  },
};

function createBaseVoiceChannelUser(): VoiceChannelUser {
  return { user_id: "", jid: "", channel_id: "" };
}

export const VoiceChannelUser = {
  encode(message: VoiceChannelUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.jid !== "") {
      writer.uint32(18).string(message.jid);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceChannelUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceChannelUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.jid = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceChannelUser {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      jid: isSet(object.jid) ? String(object.jid) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: VoiceChannelUser): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.jid !== undefined && (obj.jid = message.jid);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceChannelUser>, I>>(base?: I): VoiceChannelUser {
    return VoiceChannelUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceChannelUser>, I>>(object: I): VoiceChannelUser {
    const message = createBaseVoiceChannelUser();
    message.user_id = object.user_id ?? "";
    message.jid = object.jid ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseVoiceChannelUserList(): VoiceChannelUserList {
  return { voice_channel_users: [] };
}

export const VoiceChannelUserList = {
  encode(message: VoiceChannelUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.voice_channel_users) {
      VoiceChannelUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceChannelUserList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceChannelUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.voice_channel_users.push(VoiceChannelUser.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceChannelUserList {
    return {
      voice_channel_users: Array.isArray(object?.voice_channel_users)
        ? object.voice_channel_users.map((e: any) => VoiceChannelUser.fromJSON(e))
        : [],
    };
  },

  toJSON(message: VoiceChannelUserList): unknown {
    const obj: any = {};
    if (message.voice_channel_users) {
      obj.voice_channel_users = message.voice_channel_users.map((e) => e ? VoiceChannelUser.toJSON(e) : undefined);
    } else {
      obj.voice_channel_users = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceChannelUserList>, I>>(base?: I): VoiceChannelUserList {
    return VoiceChannelUserList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceChannelUserList>, I>>(object: I): VoiceChannelUserList {
    const message = createBaseVoiceChannelUserList();
    message.voice_channel_users = object.voice_channel_users?.map((e) => VoiceChannelUser.fromPartial(e)) || [];
    return message;
  },
};

function createBaseChannelAttachment(): ChannelAttachment {
  return { id: "", filename: "", filetype: "", filesize: "", url: "", uploader: "" };
}

export const ChannelAttachment = {
  encode(message: ChannelAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.filename !== "") {
      writer.uint32(18).string(message.filename);
    }
    if (message.filetype !== "") {
      writer.uint32(26).string(message.filetype);
    }
    if (message.filesize !== "") {
      writer.uint32(34).string(message.filesize);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.uploader !== "") {
      writer.uint32(50).string(message.uploader);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelAttachment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.filename = reader.string();
          break;
        case 3:
          message.filetype = reader.string();
          break;
        case 4:
          message.filesize = reader.string();
          break;
        case 5:
          message.url = reader.string();
          break;
        case 6:
          message.uploader = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelAttachment {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      filename: isSet(object.filename) ? String(object.filename) : "",
      filetype: isSet(object.filetype) ? String(object.filetype) : "",
      filesize: isSet(object.filesize) ? String(object.filesize) : "",
      url: isSet(object.url) ? String(object.url) : "",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
    };
  },

  toJSON(message: ChannelAttachment): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.filename !== undefined && (obj.filename = message.filename);
    message.filetype !== undefined && (obj.filetype = message.filetype);
    message.filesize !== undefined && (obj.filesize = message.filesize);
    message.url !== undefined && (obj.url = message.url);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelAttachment>, I>>(base?: I): ChannelAttachment {
    return ChannelAttachment.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelAttachment>, I>>(object: I): ChannelAttachment {
    const message = createBaseChannelAttachment();
    message.id = object.id ?? "";
    message.filename = object.filename ?? "";
    message.filetype = object.filetype ?? "";
    message.filesize = object.filesize ?? "";
    message.url = object.url ?? "";
    message.uploader = object.uploader ?? "";
    return message;
  },
};

function createBaseChannelAttachmentList(): ChannelAttachmentList {
  return { attachments: [] };
}

export const ChannelAttachmentList = {
  encode(message: ChannelAttachmentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.attachments) {
      ChannelAttachment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelAttachmentList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelAttachmentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attachments.push(ChannelAttachment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelAttachmentList {
    return {
      attachments: Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => ChannelAttachment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ChannelAttachmentList): unknown {
    const obj: any = {};
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? ChannelAttachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelAttachmentList>, I>>(base?: I): ChannelAttachmentList {
    return ChannelAttachmentList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelAttachmentList>, I>>(object: I): ChannelAttachmentList {
    const message = createBaseChannelAttachmentList();
    message.attachments = object.attachments?.map((e) => ChannelAttachment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseClanUserList(): ClanUserList {
  return { clan_users: [], cursor: "", clan_id: "" };
}

export const ClanUserList = {
  encode(message: ClanUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.clan_users) {
      ClanUserList_ClanUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    if (message.clan_id !== "") {
      writer.uint32(26).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanUserList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_users.push(ClanUserList_ClanUser.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        case 3:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanUserList {
    return {
      clan_users: Array.isArray(object?.clan_users)
        ? object.clan_users.map((e: any) => ClanUserList_ClanUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
    };
  },

  toJSON(message: ClanUserList): unknown {
    const obj: any = {};
    if (message.clan_users) {
      obj.clan_users = message.clan_users.map((e) => e ? ClanUserList_ClanUser.toJSON(e) : undefined);
    } else {
      obj.clan_users = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanUserList>, I>>(base?: I): ClanUserList {
    return ClanUserList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClanUserList>, I>>(object: I): ClanUserList {
    const message = createBaseClanUserList();
    message.clan_users = object.clan_users?.map((e) => ClanUserList_ClanUser.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseClanUserList_ClanUser(): ClanUserList_ClanUser {
  return { user: undefined, role_id: undefined };
}

export const ClanUserList_ClanUser = {
  encode(message: ClanUserList_ClanUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.role_id !== undefined) {
      StringValue.encode({ value: message.role_id! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanUserList_ClanUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanUserList_ClanUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.role_id = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanUserList_ClanUser {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      role_id: isSet(object.role_id) ? String(object.role_id) : undefined,
    };
  },

  toJSON(message: ClanUserList_ClanUser): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.role_id !== undefined && (obj.role_id = message.role_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanUserList_ClanUser>, I>>(base?: I): ClanUserList_ClanUser {
    return ClanUserList_ClanUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClanUserList_ClanUser>, I>>(object: I): ClanUserList_ClanUser {
    const message = createBaseClanUserList_ClanUser();
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportFacebookFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.account !== undefined &&
      (obj.account = message.account ? AccountFacebook.toJSON(message.account) : undefined);
    message.reset !== undefined && (obj.reset = message.reset);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportFacebookFriendsRequest>, I>>(base?: I): ImportFacebookFriendsRequest {
    return ImportFacebookFriendsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportSteamFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.reset = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.account !== undefined && (obj.account = message.account ? AccountSteam.toJSON(message.account) : undefined);
    message.reset !== undefined && (obj.reset = message.reset);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportSteamFriendsRequest>, I>>(base?: I): ImportSteamFriendsRequest {
    return ImportSteamFriendsRequest.fromPartial(base ?? {});
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

function createBaseRegistFcmDeviceTokenRequest(): RegistFcmDeviceTokenRequest {
  return { token: "" };
}

export const RegistFcmDeviceTokenRequest = {
  encode(message: RegistFcmDeviceTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegistFcmDeviceTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistFcmDeviceTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistFcmDeviceTokenRequest {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: RegistFcmDeviceTokenRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegistFcmDeviceTokenRequest>, I>>(base?: I): RegistFcmDeviceTokenRequest {
    return RegistFcmDeviceTokenRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegistFcmDeviceTokenRequest>, I>>(object: I): RegistFcmDeviceTokenRequest {
    const message = createBaseRegistFcmDeviceTokenRequest();
    message.token = object.token ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkFacebookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountFacebook.decode(reader, reader.uint32());
          break;
        case 2:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.account !== undefined &&
      (obj.account = message.account ? AccountFacebook.toJSON(message.account) : undefined);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkFacebookRequest>, I>>(base?: I): LinkFacebookRequest {
    return LinkFacebookRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkSteamRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = AccountSteam.decode(reader, reader.uint32());
          break;
        case 2:
          message.sync = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.account !== undefined && (obj.account = message.account ? AccountSteam.toJSON(message.account) : undefined);
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkSteamRequest>, I>>(base?: I): LinkSteamRequest {
    return LinkSteamRequest.fromPartial(base ?? {});
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
  return { channel_id: "", message_id: "", limit: undefined, direction: undefined };
}

export const ListChannelMessagesRequest = {
  encode(message: ListChannelMessagesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.direction !== undefined) {
      Int32Value.encode({ value: message.direction! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.direction = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListChannelMessagesRequest {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      direction: isSet(object.direction) ? Number(object.direction) : undefined,
    };
  },

  toJSON(message: ListChannelMessagesRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.direction !== undefined && (obj.direction = message.direction);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelMessagesRequest>, I>>(base?: I): ListChannelMessagesRequest {
    return ListChannelMessagesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListChannelMessagesRequest>, I>>(object: I): ListChannelMessagesRequest {
    const message = createBaseListChannelMessagesRequest();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.limit = object.limit ?? undefined;
    message.direction = object.direction ?? undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFriendsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFriendsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListFriendsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListFriendsRequest>, I>>(base?: I): ListFriendsRequest {
    return ListFriendsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListGroupsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.cursor = reader.string();
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.lang_tag = reader.string();
          break;
        case 5:
          message.members = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.open = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListGroupsRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : "",
      members: isSet(object.members) ? Number(object.members) : undefined,
      open: isSet(object.open) ? Boolean(object.open) : undefined,
    };
  },

  toJSON(message: ListGroupsRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.limit !== undefined && (obj.limit = message.limit);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.members !== undefined && (obj.members = message.members);
    message.open !== undefined && (obj.open = message.open);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListGroupsRequest>, I>>(base?: I): ListGroupsRequest {
    return ListGroupsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListGroupUsersRequest>, I>>(base?: I): ListGroupUsersRequest {
    return ListGroupUsersRequest.fromPartial(base ?? {});
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
  return { clan_id: "", channel_id: "", channel_type: 0, limit: undefined, state: undefined, cursor: "" };
}

export const ListChannelUsersRequest = {
  encode(message: ListChannelUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.channel_type !== 0) {
      writer.uint32(24).int32(message.channel_type);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(50).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.channel_type = reader.int32();
          break;
        case 4:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListChannelUsersRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      channel_type: isSet(object.channel_type) ? Number(object.channel_type) : 0,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListChannelUsersRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.channel_type !== undefined && (obj.channel_type = Math.round(message.channel_type));
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelUsersRequest>, I>>(base?: I): ListChannelUsersRequest {
    return ListChannelUsersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListChannelUsersRequest>, I>>(object: I): ListChannelUsersRequest {
    const message = createBaseListChannelUsersRequest();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.channel_type = object.channel_type ?? 0;
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListChannelAttachmentRequest(): ListChannelAttachmentRequest {
  return { clan_id: "", channel_id: "", file_type: "", limit: undefined, state: undefined, cursor: "" };
}

export const ListChannelAttachmentRequest = {
  encode(message: ListChannelAttachmentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.file_type !== "") {
      writer.uint32(26).string(message.file_type);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Int32Value.encode({ value: message.state! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(50).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelAttachmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelAttachmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.file_type = reader.string();
          break;
        case 4:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListChannelAttachmentRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      file_type: isSet(object.file_type) ? String(object.file_type) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListChannelAttachmentRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.file_type !== undefined && (obj.file_type = message.file_type);
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelAttachmentRequest>, I>>(base?: I): ListChannelAttachmentRequest {
    return ListChannelAttachmentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListChannelAttachmentRequest>, I>>(object: I): ListChannelAttachmentRequest {
    const message = createBaseListChannelAttachmentRequest();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.file_type = object.file_type ?? "";
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListClanUsersRequest(): ListClanUsersRequest {
  return { clan_id: "" };
}

export const ListClanUsersRequest = {
  encode(message: ListClanUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListClanUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListClanUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListClanUsersRequest {
    return { clan_id: isSet(object.clan_id) ? String(object.clan_id) : "" };
  },

  toJSON(message: ListClanUsersRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListClanUsersRequest>, I>>(base?: I): ListClanUsersRequest {
    return ListClanUsersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListClanUsersRequest>, I>>(object: I): ListClanUsersRequest {
    const message = createBaseListClanUsersRequest();
    message.clan_id = object.clan_id ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cacheable_cursor: isSet(object.cacheable_cursor) ? String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: ListNotificationsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.cacheable_cursor !== undefined && (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListNotificationsRequest>, I>>(base?: I): ListNotificationsRequest {
    return ListNotificationsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.collection = reader.string();
          break;
        case 3:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStorageObjectsRequest {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      collection: isSet(object.collection) ? String(object.collection) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListStorageObjectsRequest): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.collection !== undefined && (obj.collection = message.collection);
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListStorageObjectsRequest>, I>>(base?: I): ListStorageObjectsRequest {
    return ListStorageObjectsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserGroupsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserGroupsRequest {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListUserGroupsRequest): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListUserGroupsRequest>, I>>(base?: I): ListUserGroupsRequest {
    return ListUserGroupsRequest.fromPartial(base ?? {});
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

function createBaseNotification(): Notification {
  return {
    id: "",
    subject: "",
    content: "",
    code: 0,
    sender_id: "",
    create_time: undefined,
    persistent: false,
    clan_id: "",
    channel_id: "",
    channel_mode: "",
  };
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
    if (message.clan_id !== "") {
      writer.uint32(66).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(74).string(message.channel_id);
    }
    if (message.channel_mode !== "") {
      writer.uint32(82).string(message.channel_mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.code = reader.int32();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = reader.bool();
          break;
        case 8:
          message.clan_id = reader.string();
          break;
        case 9:
          message.channel_id = reader.string();
          break;
        case 10:
          message.channel_mode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notification {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      content: isSet(object.content) ? String(object.content) : "",
      code: isSet(object.code) ? Number(object.code) : 0,
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      persistent: isSet(object.persistent) ? Boolean(object.persistent) : false,
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      channel_mode: isSet(object.channel_mode) ? String(object.channel_mode) : "",
    };
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.subject !== undefined && (obj.subject = message.subject);
    message.content !== undefined && (obj.content = message.content);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.persistent !== undefined && (obj.persistent = message.persistent);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.channel_mode !== undefined && (obj.channel_mode = message.channel_mode);
    return obj;
  },

  create<I extends Exact<DeepPartial<Notification>, I>>(base?: I): Notification {
    return Notification.fromPartial(base ?? {});
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
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.channel_mode = object.channel_mode ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotificationList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NotificationList {
    return {
      notifications: Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => Notification.fromJSON(e))
        : [],
      cacheable_cursor: isSet(object.cacheable_cursor) ? String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: NotificationList): unknown {
    const obj: any = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) => e ? Notification.toJSON(e) : undefined);
    } else {
      obj.notifications = [];
    }
    message.cacheable_cursor !== undefined && (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<NotificationList>, I>>(base?: I): NotificationList {
    return NotificationList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePromoteGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PromoteGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: PromoteGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PromoteGroupUsersRequest>, I>>(base?: I): PromoteGroupUsersRequest {
    return PromoteGroupUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDemoteGroupUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DemoteGroupUsersRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: DemoteGroupUsersRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DemoteGroupUsersRequest>, I>>(base?: I): DemoteGroupUsersRequest {
    return DemoteGroupUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadStorageObjectId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.user_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectId {
    return {
      collection: isSet(object.collection) ? String(object.collection) : "",
      key: isSet(object.key) ? String(object.key) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
    };
  },

  toJSON(message: ReadStorageObjectId): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadStorageObjectId>, I>>(base?: I): ReadStorageObjectId {
    return ReadStorageObjectId.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.object_ids.push(ReadStorageObjectId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReadStorageObjectsRequest {
    return {
      object_ids: Array.isArray(object?.object_ids)
        ? object.object_ids.map((e: any) => ReadStorageObjectId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReadStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.object_ids) {
      obj.object_ids = message.object_ids.map((e) => e ? ReadStorageObjectId.toJSON(e) : undefined);
    } else {
      obj.object_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadStorageObjectsRequest>, I>>(base?: I): ReadStorageObjectsRequest {
    return ReadStorageObjectsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRpc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.payload = reader.string();
          break;
        case 3:
          message.http_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Rpc {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      payload: isSet(object.payload) ? String(object.payload) : "",
      http_key: isSet(object.http_key) ? String(object.http_key) : "",
    };
  },

  toJSON(message: Rpc): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.payload !== undefined && (obj.payload = message.payload);
    message.http_key !== undefined && (obj.http_key = message.http_key);
    return obj;
  },

  create<I extends Exact<DeepPartial<Rpc>, I>>(base?: I): Rpc {
    return Rpc.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created = reader.bool();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.refresh_token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      created: isSet(object.created) ? Boolean(object.created) : false,
      token: isSet(object.token) ? String(object.token) : "",
      refresh_token: isSet(object.refresh_token) ? String(object.refresh_token) : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.created !== undefined && (obj.created = message.created);
    message.token !== undefined && (obj.token = message.token);
    message.refresh_token !== undefined && (obj.refresh_token = message.refresh_token);
    return obj;
  },

  create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
    return Session.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.user_id = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        case 5:
          message.version = reader.string();
          break;
        case 6:
          message.permission_read = reader.int32();
          break;
        case 7:
          message.permission_write = reader.int32();
          break;
        case 8:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObject {
    return {
      collection: isSet(object.collection) ? String(object.collection) : "",
      key: isSet(object.key) ? String(object.key) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      value: isSet(object.value) ? String(object.value) : "",
      version: isSet(object.version) ? String(object.version) : "",
      permission_read: isSet(object.permission_read) ? Number(object.permission_read) : 0,
      permission_write: isSet(object.permission_write) ? Number(object.permission_write) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: StorageObject): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.value !== undefined && (obj.value = message.value);
    message.version !== undefined && (obj.version = message.version);
    message.permission_read !== undefined && (obj.permission_read = Math.round(message.permission_read));
    message.permission_write !== undefined && (obj.permission_write = Math.round(message.permission_write));
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObject>, I>>(base?: I): StorageObject {
    return StorageObject.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.user_id = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAck {
    return {
      collection: isSet(object.collection) ? String(object.collection) : "",
      key: isSet(object.key) ? String(object.key) : "",
      version: isSet(object.version) ? String(object.version) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
    };
  },

  toJSON(message: StorageObjectAck): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.version !== undefined && (obj.version = message.version);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectAck>, I>>(base?: I): StorageObjectAck {
    return StorageObjectAck.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectAcks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.acks.push(StorageObjectAck.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectAcks {
    return { acks: Array.isArray(object?.acks) ? object.acks.map((e: any) => StorageObjectAck.fromJSON(e)) : [] };
  },

  toJSON(message: StorageObjectAcks): unknown {
    const obj: any = {};
    if (message.acks) {
      obj.acks = message.acks.map((e) => e ? StorageObjectAck.toJSON(e) : undefined);
    } else {
      obj.acks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectAcks>, I>>(base?: I): StorageObjectAcks {
    return StorageObjectAcks.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjects();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjects {
    return { objects: Array.isArray(object?.objects) ? object.objects.map((e: any) => StorageObject.fromJSON(e)) : [] };
  },

  toJSON(message: StorageObjects): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) => e ? StorageObject.toJSON(e) : undefined);
    } else {
      obj.objects = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjects>, I>>(base?: I): StorageObjects {
    return StorageObjects.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageObjectList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(StorageObject.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StorageObjectList {
    return {
      objects: Array.isArray(object?.objects) ? object.objects.map((e: any) => StorageObject.fromJSON(e)) : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: StorageObjectList): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) => e ? StorageObject.toJSON(e) : undefined);
    } else {
      obj.objects = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageObjectList>, I>>(base?: I): StorageObjectList {
    return StorageObjectList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StorageObjectList>, I>>(object: I): StorageObjectList {
    const message = createBaseStorageObjectList();
    message.objects = object.objects?.map((e) => StorageObject.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
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
    about_me: "",
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
    if (message.about_me !== "") {
      writer.uint32(58).string(message.about_me);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.display_name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.avatar_url = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.location = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.timezone = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.about_me = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
      about_me: isSet(object.about_me) ? String(object.about_me) : "",
    };
  },

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.display_name !== undefined && (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.location !== undefined && (obj.location = message.location);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.about_me !== undefined && (obj.about_me = message.about_me);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(base?: I): UpdateAccountRequest {
    return UpdateAccountRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateAccountRequest>, I>>(object: I): UpdateAccountRequest {
    const message = createBaseUpdateAccountRequest();
    message.username = object.username ?? undefined;
    message.display_name = object.display_name ?? undefined;
    message.avatar_url = object.avatar_url ?? undefined;
    message.lang_tag = object.lang_tag ?? undefined;
    message.location = object.location ?? undefined;
    message.timezone = object.timezone ?? undefined;
    message.about_me = object.about_me ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = reader.string();
          break;
        case 2:
          message.name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.description = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.lang_tag = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.avatar_url = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.open = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateGroupRequest {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "",
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : undefined,
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : undefined,
      open: isSet(object.open) ? Boolean(object.open) : undefined,
    };
  },

  toJSON(message: UpdateGroupRequest): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.open !== undefined && (obj.open = message.open);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateGroupRequest>, I>>(base?: I): UpdateGroupRequest {
    return UpdateGroupRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.category_id = reader.string();
          break;
        case 2:
          message.category_name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCategoryDescRequest {
    return {
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      category_name: isSet(object.category_name) ? String(object.category_name) : "",
    };
  },

  toJSON(message: UpdateCategoryDescRequest): unknown {
    const obj: any = {};
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.category_name !== undefined && (obj.category_name = message.category_name);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCategoryDescRequest>, I>>(base?: I): UpdateCategoryDescRequest {
    return UpdateCategoryDescRequest.fromPartial(base ?? {});
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
    apple_id: "",
    about_me: "",
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
    if (message.apple_id !== "") {
      writer.uint32(138).string(message.apple_id);
    }
    if (message.about_me !== "") {
      writer.uint32(146).string(message.about_me);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.display_name = reader.string();
          break;
        case 4:
          message.avatar_url = reader.string();
          break;
        case 5:
          message.lang_tag = reader.string();
          break;
        case 6:
          message.location = reader.string();
          break;
        case 7:
          message.timezone = reader.string();
          break;
        case 8:
          message.metadata = reader.string();
          break;
        case 9:
          message.facebook_id = reader.string();
          break;
        case 10:
          message.google_id = reader.string();
          break;
        case 11:
          message.gamecenter_id = reader.string();
          break;
        case 12:
          message.steam_id = reader.string();
          break;
        case 13:
          message.online = reader.bool();
          break;
        case 14:
          message.edge_count = reader.int32();
          break;
        case 15:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 16:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 17:
          message.apple_id = reader.string();
          break;
        case 18:
          message.about_me = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      display_name: isSet(object.display_name) ? String(object.display_name) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : "",
      location: isSet(object.location) ? String(object.location) : "",
      timezone: isSet(object.timezone) ? String(object.timezone) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      facebook_id: isSet(object.facebook_id) ? String(object.facebook_id) : "",
      google_id: isSet(object.google_id) ? String(object.google_id) : "",
      gamecenter_id: isSet(object.gamecenter_id) ? String(object.gamecenter_id) : "",
      steam_id: isSet(object.steam_id) ? String(object.steam_id) : "",
      online: isSet(object.online) ? Boolean(object.online) : false,
      edge_count: isSet(object.edge_count) ? Number(object.edge_count) : 0,
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      apple_id: isSet(object.apple_id) ? String(object.apple_id) : "",
      about_me: isSet(object.about_me) ? String(object.about_me) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.username !== undefined && (obj.username = message.username);
    message.display_name !== undefined && (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.location !== undefined && (obj.location = message.location);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.facebook_id !== undefined && (obj.facebook_id = message.facebook_id);
    message.google_id !== undefined && (obj.google_id = message.google_id);
    message.gamecenter_id !== undefined && (obj.gamecenter_id = message.gamecenter_id);
    message.steam_id !== undefined && (obj.steam_id = message.steam_id);
    message.online !== undefined && (obj.online = message.online);
    message.edge_count !== undefined && (obj.edge_count = Math.round(message.edge_count));
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    message.apple_id !== undefined && (obj.apple_id = message.apple_id);
    message.about_me !== undefined && (obj.about_me = message.about_me);
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? {});
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
    message.apple_id = object.apple_id ?? "";
    message.about_me = object.about_me ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGroupList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_groups.push(UserGroupList_UserGroup.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserGroupList {
    return {
      user_groups: Array.isArray(object?.user_groups)
        ? object.user_groups.map((e: any) => UserGroupList_UserGroup.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: UserGroupList): unknown {
    const obj: any = {};
    if (message.user_groups) {
      obj.user_groups = message.user_groups.map((e) => e ? UserGroupList_UserGroup.toJSON(e) : undefined);
    } else {
      obj.user_groups = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGroupList>, I>>(base?: I): UserGroupList {
    return UserGroupList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserGroupList_UserGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = Group.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.group !== undefined && (obj.group = message.group ? Group.toJSON(message.group) : undefined);
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserGroupList_UserGroup>, I>>(base?: I): UserGroupList_UserGroup {
    return UserGroupList_UserGroup.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Users {
    return { users: Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Users>, I>>(base?: I): Users {
    return Users.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Users>, I>>(object: I): Users {
    const message = createBaseUsers();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteStorageObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.value = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.permission_read = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.permission_write = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObject {
    return {
      collection: isSet(object.collection) ? String(object.collection) : "",
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      version: isSet(object.version) ? String(object.version) : "",
      permission_read: isSet(object.permission_read) ? Number(object.permission_read) : undefined,
      permission_write: isSet(object.permission_write) ? Number(object.permission_write) : undefined,
    };
  },

  toJSON(message: WriteStorageObject): unknown {
    const obj: any = {};
    message.collection !== undefined && (obj.collection = message.collection);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.version !== undefined && (obj.version = message.version);
    message.permission_read !== undefined && (obj.permission_read = message.permission_read);
    message.permission_write !== undefined && (obj.permission_write = message.permission_write);
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteStorageObject>, I>>(base?: I): WriteStorageObject {
    return WriteStorageObject.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteStorageObjectsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objects.push(WriteStorageObject.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteStorageObjectsRequest {
    return {
      objects: Array.isArray(object?.objects) ? object.objects.map((e: any) => WriteStorageObject.fromJSON(e)) : [],
    };
  },

  toJSON(message: WriteStorageObjectsRequest): unknown {
    const obj: any = {};
    if (message.objects) {
      obj.objects = message.objects.map((e) => e ? WriteStorageObject.toJSON(e) : undefined);
    } else {
      obj.objects = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteStorageObjectsRequest>, I>>(base?: I): WriteStorageObjectsRequest {
    return WriteStorageObjectsRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteTournamentRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tournament_id = reader.string();
          break;
        case 2:
          message.record = WriteTournamentRecordRequest_TournamentRecordWrite.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteTournamentRecordRequest {
    return {
      tournament_id: isSet(object.tournament_id) ? String(object.tournament_id) : "",
      record: isSet(object.record)
        ? WriteTournamentRecordRequest_TournamentRecordWrite.fromJSON(object.record)
        : undefined,
    };
  },

  toJSON(message: WriteTournamentRecordRequest): unknown {
    const obj: any = {};
    message.tournament_id !== undefined && (obj.tournament_id = message.tournament_id);
    message.record !== undefined && (obj.record = message.record
      ? WriteTournamentRecordRequest_TournamentRecordWrite.toJSON(message.record)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteTournamentRecordRequest>, I>>(base?: I): WriteTournamentRecordRequest {
    return WriteTournamentRecordRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteTournamentRecordRequest_TournamentRecordWrite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.score = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.subscore = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.operator = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WriteTournamentRecordRequest_TournamentRecordWrite {
    return {
      score: isSet(object.score) ? Number(object.score) : 0,
      subscore: isSet(object.subscore) ? Number(object.subscore) : 0,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
    };
  },

  toJSON(message: WriteTournamentRecordRequest_TournamentRecordWrite): unknown {
    const obj: any = {};
    message.score !== undefined && (obj.score = Math.round(message.score));
    message.subscore !== undefined && (obj.subscore = Math.round(message.subscore));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.operator !== undefined && (obj.operator = operatorToJSON(message.operator));
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteTournamentRecordRequest_TournamentRecordWrite>, I>>(
    base?: I,
  ): WriteTournamentRecordRequest_TournamentRecordWrite {
    return WriteTournamentRecordRequest_TournamentRecordWrite.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.creator_id = reader.string();
          break;
        case 3:
          message.nick_name = reader.string();
          break;
        case 4:
          message.profile_banner = reader.string();
          break;
        case 5:
          message.profile_theme = reader.string();
          break;
        case 6:
          message.avatar_url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanDescProfile {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      nick_name: isSet(object.nick_name) ? String(object.nick_name) : "",
      profile_banner: isSet(object.profile_banner) ? String(object.profile_banner) : "",
      profile_theme: isSet(object.profile_theme) ? String(object.profile_theme) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
    };
  },

  toJSON(message: ClanDescProfile): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.nick_name !== undefined && (obj.nick_name = message.nick_name);
    message.profile_banner !== undefined && (obj.profile_banner = message.profile_banner);
    message.profile_theme !== undefined && (obj.profile_theme = message.profile_theme);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescProfile>, I>>(base?: I): ClanDescProfile {
    return ClanDescProfile.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateClanDescProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.nick_name = reader.string();
          break;
        case 3:
          message.profile_banner = reader.string();
          break;
        case 4:
          message.profile_theme = reader.string();
          break;
        case 5:
          message.avatar_url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateClanDescProfileRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      nick_name: isSet(object.nick_name) ? String(object.nick_name) : "",
      profile_banner: isSet(object.profile_banner) ? String(object.profile_banner) : "",
      profile_theme: isSet(object.profile_theme) ? String(object.profile_theme) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
    };
  },

  toJSON(message: UpdateClanDescProfileRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.nick_name !== undefined && (obj.nick_name = message.nick_name);
    message.profile_banner !== undefined && (obj.profile_banner = message.profile_banner);
    message.profile_theme !== undefined && (obj.profile_theme = message.profile_theme);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateClanDescProfileRequest>, I>>(base?: I): UpdateClanDescProfileRequest {
    return UpdateClanDescProfileRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanDescProfileRequest {
    return { clan_id: isSet(object.clan_id) ? String(object.clan_id) : "" };
  },

  toJSON(message: ClanDescProfileRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescProfileRequest>, I>>(base?: I): ClanDescProfileRequest {
    return ClanDescProfileRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDesc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator_id = reader.string();
          break;
        case 2:
          message.clan_name = reader.string();
          break;
        case 3:
          message.logo = reader.string();
          break;
        case 4:
          message.banner = reader.string();
          break;
        case 5:
          message.clan_id = reader.string();
          break;
        case 6:
          message.status = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanDesc {
    return {
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? String(object.clan_name) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      banner: isSet(object.banner) ? String(object.banner) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      status: isSet(object.status) ? Number(object.status) : 0,
    };
  },

  toJSON(message: ClanDesc): unknown {
    const obj: any = {};
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.clan_name !== undefined && (obj.clan_name = message.clan_name);
    message.logo !== undefined && (obj.logo = message.logo);
    message.banner !== undefined && (obj.banner = message.banner);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.status !== undefined && (obj.status = Math.round(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDesc>, I>>(base?: I): ClanDesc {
    return ClanDesc.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator_id = reader.string();
          break;
        case 2:
          message.clan_name = reader.string();
          break;
        case 3:
          message.logo = reader.string();
          break;
        case 4:
          message.banner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateClanDescRequest {
    return {
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? String(object.clan_name) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      banner: isSet(object.banner) ? String(object.banner) : "",
    };
  },

  toJSON(message: CreateClanDescRequest): unknown {
    const obj: any = {};
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.clan_name !== undefined && (obj.clan_name = message.clan_name);
    message.logo !== undefined && (obj.logo = message.logo);
    message.banner !== undefined && (obj.banner = message.banner);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateClanDescRequest>, I>>(base?: I): CreateClanDescRequest {
    return CreateClanDescRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.creator_id = reader.string();
          break;
        case 3:
          message.clan_name = reader.string();
          break;
        case 4:
          message.logo = reader.string();
          break;
        case 5:
          message.banner = reader.string();
          break;
        case 6:
          message.status = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateClanDescRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      clan_name: isSet(object.clan_name) ? String(object.clan_name) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      banner: isSet(object.banner) ? String(object.banner) : "",
      status: isSet(object.status) ? Number(object.status) : 0,
    };
  },

  toJSON(message: UpdateClanDescRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.clan_name !== undefined && (obj.clan_name = message.clan_name);
    message.logo !== undefined && (obj.logo = message.logo);
    message.banner !== undefined && (obj.banner = message.banner);
    message.status !== undefined && (obj.status = Math.round(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateClanDescRequest>, I>>(base?: I): UpdateClanDescRequest {
    return UpdateClanDescRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_desc_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteClanDescRequest {
    return { clan_desc_id: isSet(object.clan_desc_id) ? String(object.clan_desc_id) : "" };
  },

  toJSON(message: DeleteClanDescRequest): unknown {
    const obj: any = {};
    message.clan_desc_id !== undefined && (obj.clan_desc_id = message.clan_desc_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteClanDescRequest>, I>>(base?: I): DeleteClanDescRequest {
    return DeleteClanDescRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListClanDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListClanDescRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListClanDescRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListClanDescRequest>, I>>(base?: I): ListClanDescRequest {
    return ListClanDescRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clandesc.push(ClanDesc.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanDescList {
    return { clandesc: Array.isArray(object?.clandesc) ? object.clandesc.map((e: any) => ClanDesc.fromJSON(e)) : [] };
  },

  toJSON(message: ClanDescList): unknown {
    const obj: any = {};
    if (message.clandesc) {
      obj.clandesc = message.clandesc.map((e) => e ? ClanDesc.toJSON(e) : undefined);
    } else {
      obj.clandesc = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanDescList>, I>>(base?: I): ClanDescList {
    return ClanDescList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkInviteUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.expiry_time = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LinkInviteUserRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      expiry_time: isSet(object.expiry_time) ? Number(object.expiry_time) : 0,
    };
  },

  toJSON(message: LinkInviteUserRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.expiry_time !== undefined && (obj.expiry_time = Math.round(message.expiry_time));
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkInviteUserRequest>, I>>(base?: I): LinkInviteUserRequest {
    return LinkInviteUserRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.invite_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InviteUserRequest {
    return { invite_id: isSet(object.invite_id) ? String(object.invite_id) : "" };
  },

  toJSON(message: InviteUserRequest): unknown {
    const obj: any = {};
    message.invite_id !== undefined && (obj.invite_id = message.invite_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<InviteUserRequest>, I>>(base?: I): InviteUserRequest {
    return InviteUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InviteUserRequest>, I>>(object: I): InviteUserRequest {
    const message = createBaseInviteUserRequest();
    message.invite_id = object.invite_id ?? "";
    return message;
  },
};

function createBaseInviteUserRes(): InviteUserRes {
  return { clan_id: "", channel_id: "", clan_name: "", channel_label: "", user_joined: false, expiry_time: undefined };
}

export const InviteUserRes = {
  encode(message: InviteUserRes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(26).string(message.clan_name);
    }
    if (message.channel_label !== "") {
      writer.uint32(34).string(message.channel_label);
    }
    if (message.user_joined === true) {
      writer.uint32(40).bool(message.user_joined);
    }
    if (message.expiry_time !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry_time), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteUserRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.clan_name = reader.string();
          break;
        case 4:
          message.channel_label = reader.string();
          break;
        case 5:
          message.user_joined = reader.bool();
          break;
        case 6:
          message.expiry_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InviteUserRes {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      clan_name: isSet(object.clan_name) ? String(object.clan_name) : "",
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      user_joined: isSet(object.user_joined) ? Boolean(object.user_joined) : false,
      expiry_time: isSet(object.expiry_time) ? fromJsonTimestamp(object.expiry_time) : undefined,
    };
  },

  toJSON(message: InviteUserRes): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.clan_name !== undefined && (obj.clan_name = message.clan_name);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.user_joined !== undefined && (obj.user_joined = message.user_joined);
    message.expiry_time !== undefined && (obj.expiry_time = message.expiry_time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<InviteUserRes>, I>>(base?: I): InviteUserRes {
    return InviteUserRes.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InviteUserRes>, I>>(object: I): InviteUserRes {
    const message = createBaseInviteUserRes();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.clan_name = object.clan_name ?? "";
    message.channel_label = object.channel_label ?? "";
    message.user_joined = object.user_joined ?? false;
    message.expiry_time = object.expiry_time ?? undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinClanChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinClanChannelRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: JoinClanChannelRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinClanChannelRequest>, I>>(base?: I): JoinClanChannelRequest {
    return JoinClanChannelRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLinkInviteUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.creator_id = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        case 4:
          message.invite_link = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.expiry_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LinkInviteUser {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      invite_link: isSet(object.invite_link) ? String(object.invite_link) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      expiry_time: isSet(object.expiry_time) ? fromJsonTimestamp(object.expiry_time) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: LinkInviteUser): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.invite_link !== undefined && (obj.invite_link = message.invite_link);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.expiry_time !== undefined && (obj.expiry_time = message.expiry_time.toISOString());
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<LinkInviteUser>, I>>(base?: I): LinkInviteUser {
    return LinkInviteUser.fromPartial(base ?? {});
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

function createBaseClanProfile(): ClanProfile {
  return { user_id: "", nick_name: "", avartar: "", clan_id: "" };
}

export const ClanProfile = {
  encode(message: ClanProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.nick_name !== "") {
      writer.uint32(18).string(message.nick_name);
    }
    if (message.avartar !== "") {
      writer.uint32(26).string(message.avartar);
    }
    if (message.clan_id !== "") {
      writer.uint32(34).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanProfile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.nick_name = reader.string();
          break;
        case 3:
          message.avartar = reader.string();
          break;
        case 4:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanProfile {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      nick_name: isSet(object.nick_name) ? String(object.nick_name) : "",
      avartar: isSet(object.avartar) ? String(object.avartar) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
    };
  },

  toJSON(message: ClanProfile): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.nick_name !== undefined && (obj.nick_name = message.nick_name);
    message.avartar !== undefined && (obj.avartar = message.avartar);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanProfile>, I>>(base?: I): ClanProfile {
    return ClanProfile.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClanProfile>, I>>(object: I): ClanProfile {
    const message = createBaseClanProfile();
    message.user_id = object.user_id ?? "";
    message.nick_name = object.nick_name ?? "";
    message.avartar = object.avartar ?? "";
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseClanProfileRequest(): ClanProfileRequest {
  return { clan_id: "" };
}

export const ClanProfileRequest = {
  encode(message: ClanProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanProfileRequest {
    return { clan_id: isSet(object.clan_id) ? String(object.clan_id) : "" };
  },

  toJSON(message: ClanProfileRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanProfileRequest>, I>>(base?: I): ClanProfileRequest {
    return ClanProfileRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClanProfileRequest>, I>>(object: I): ClanProfileRequest {
    const message = createBaseClanProfileRequest();
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseUpdateClanProfileRequest(): UpdateClanProfileRequest {
  return { clan_id: "", nick_name: "", avatar: "" };
}

export const UpdateClanProfileRequest = {
  encode(message: UpdateClanProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.nick_name !== "") {
      writer.uint32(18).string(message.nick_name);
    }
    if (message.avatar !== "") {
      writer.uint32(26).string(message.avatar);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateClanProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateClanProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.nick_name = reader.string();
          break;
        case 3:
          message.avatar = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateClanProfileRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      nick_name: isSet(object.nick_name) ? String(object.nick_name) : "",
      avatar: isSet(object.avatar) ? String(object.avatar) : "",
    };
  },

  toJSON(message: UpdateClanProfileRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.nick_name !== undefined && (obj.nick_name = message.nick_name);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateClanProfileRequest>, I>>(base?: I): UpdateClanProfileRequest {
    return UpdateClanProfileRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateClanProfileRequest>, I>>(object: I): UpdateClanProfileRequest {
    const message = createBaseUpdateClanProfileRequest();
    message.clan_id = object.clan_id ?? "";
    message.nick_name = object.nick_name ?? "";
    message.avatar = object.avatar ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryDesc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator_id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.category_name = reader.string();
          break;
        case 4:
          message.category_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CategoryDesc {
    return {
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      category_name: isSet(object.category_name) ? String(object.category_name) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
    };
  },

  toJSON(message: CategoryDesc): unknown {
    const obj: any = {};
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.category_name !== undefined && (obj.category_name = message.category_name);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryDesc>, I>>(base?: I): CategoryDesc {
    return CategoryDesc.fromPartial(base ?? {});
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
  return { category_name: "", clan_id: "" };
}

export const CreateCategoryDescRequest = {
  encode(message: CreateCategoryDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.category_name !== "") {
      writer.uint32(10).string(message.category_name);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCategoryDescRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.category_name = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCategoryDescRequest {
    return {
      category_name: isSet(object.category_name) ? String(object.category_name) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
    };
  },

  toJSON(message: CreateCategoryDescRequest): unknown {
    const obj: any = {};
    message.category_name !== undefined && (obj.category_name = message.category_name);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCategoryDescRequest>, I>>(base?: I): CreateCategoryDescRequest {
    return CreateCategoryDescRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateCategoryDescRequest>, I>>(object: I): CreateCategoryDescRequest {
    const message = createBaseCreateCategoryDescRequest();
    message.category_name = object.category_name ?? "";
    message.clan_id = object.clan_id ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCategoryDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteCategoryDescRequest {
    return { creator_id: isSet(object.creator_id) ? String(object.creator_id) : "" };
  },

  toJSON(message: DeleteCategoryDescRequest): unknown {
    const obj: any = {};
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCategoryDescRequest>, I>>(base?: I): DeleteCategoryDescRequest {
    return DeleteCategoryDescRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.categorydesc.push(CategoryDesc.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CategoryDescList {
    return {
      categorydesc: Array.isArray(object?.categorydesc)
        ? object.categorydesc.map((e: any) => CategoryDesc.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CategoryDescList): unknown {
    const obj: any = {};
    if (message.categorydesc) {
      obj.categorydesc = message.categorydesc.map((e) => e ? CategoryDesc.toJSON(e) : undefined);
    } else {
      obj.categorydesc = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryDescList>, I>>(base?: I): CategoryDescList {
    return CategoryDescList.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCategoryDescsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCategoryDescsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListCategoryDescsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCategoryDescsRequest>, I>>(base?: I): ListCategoryDescsRequest {
    return ListCategoryDescsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListCategoryDescsRequest>, I>>(object: I): ListCategoryDescsRequest {
    const message = createBaseListCategoryDescsRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseChannelMessageHeader(): ChannelMessageHeader {
  return { id: "", timestamp: "", sender_id: "", content: "" };
}

export const ChannelMessageHeader = {
  encode(message: ChannelMessageHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.timestamp !== "") {
      writer.uint32(18).string(message.timestamp);
    }
    if (message.sender_id !== "") {
      writer.uint32(26).string(message.sender_id);
    }
    if (message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.timestamp = reader.string();
          break;
        case 3:
          message.sender_id = reader.string();
          break;
        case 4:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageHeader {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
    };
  },

  toJSON(message: ChannelMessageHeader): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageHeader>, I>>(base?: I): ChannelMessageHeader {
    return ChannelMessageHeader.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageHeader>, I>>(object: I): ChannelMessageHeader {
    const message = createBaseChannelMessageHeader();
    message.id = object.id ?? "";
    message.timestamp = object.timestamp ?? "";
    message.sender_id = object.sender_id ?? "";
    message.content = object.content ?? "";
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
    channel_label: "",
    channel_private: 0,
    channel_avatar: [],
    user_id: [],
    last_sent_message: undefined,
    last_seen_message: undefined,
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
    if (message.channel_label !== "") {
      writer.uint32(66).string(message.channel_label);
    }
    if (message.channel_private !== 0) {
      writer.uint32(72).int32(message.channel_private);
    }
    for (const v of message.channel_avatar) {
      writer.uint32(82).string(v!);
    }
    for (const v of message.user_id) {
      writer.uint32(90).string(v!);
    }
    if (message.last_sent_message !== undefined) {
      ChannelMessageHeader.encode(message.last_sent_message, writer.uint32(98).fork()).ldelim();
    }
    if (message.last_seen_message !== undefined) {
      ChannelMessageHeader.encode(message.last_seen_message, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.parrent_id = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        case 4:
          message.category_id = reader.string();
          break;
        case 5:
          message.category_name = reader.string();
          break;
        case 6:
          message.type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.creator_id = reader.string();
          break;
        case 8:
          message.channel_label = reader.string();
          break;
        case 9:
          message.channel_private = reader.int32();
          break;
        case 10:
          message.channel_avatar.push(reader.string());
          break;
        case 11:
          message.user_id.push(reader.string());
          break;
        case 12:
          message.last_sent_message = ChannelMessageHeader.decode(reader, reader.uint32());
          break;
        case 13:
          message.last_seen_message = ChannelMessageHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelDescription {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      parrent_id: isSet(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      category_name: isSet(object.category_name) ? String(object.category_name) : "",
      type: isSet(object.type) ? Number(object.type) : undefined,
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      channel_private: isSet(object.channel_private) ? Number(object.channel_private) : 0,
      channel_avatar: Array.isArray(object?.channel_avatar) ? object.channel_avatar.map((e: any) => String(e)) : [],
      user_id: Array.isArray(object?.user_id) ? object.user_id.map((e: any) => String(e)) : [],
      last_sent_message: isSet(object.last_sent_message)
        ? ChannelMessageHeader.fromJSON(object.last_sent_message)
        : undefined,
      last_seen_message: isSet(object.last_seen_message)
        ? ChannelMessageHeader.fromJSON(object.last_seen_message)
        : undefined,
    };
  },

  toJSON(message: ChannelDescription): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.parrent_id !== undefined && (obj.parrent_id = message.parrent_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.category_name !== undefined && (obj.category_name = message.category_name);
    message.type !== undefined && (obj.type = message.type);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.channel_private !== undefined && (obj.channel_private = Math.round(message.channel_private));
    if (message.channel_avatar) {
      obj.channel_avatar = message.channel_avatar.map((e) => e);
    } else {
      obj.channel_avatar = [];
    }
    if (message.user_id) {
      obj.user_id = message.user_id.map((e) => e);
    } else {
      obj.user_id = [];
    }
    message.last_sent_message !== undefined && (obj.last_sent_message = message.last_sent_message
      ? ChannelMessageHeader.toJSON(message.last_sent_message)
      : undefined);
    message.last_seen_message !== undefined && (obj.last_seen_message = message.last_seen_message
      ? ChannelMessageHeader.toJSON(message.last_seen_message)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelDescription>, I>>(base?: I): ChannelDescription {
    return ChannelDescription.fromPartial(base ?? {});
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
    message.channel_label = object.channel_label ?? "";
    message.channel_private = object.channel_private ?? 0;
    message.channel_avatar = object.channel_avatar?.map((e) => e) || [];
    message.user_id = object.user_id?.map((e) => e) || [];
    message.last_sent_message = (object.last_sent_message !== undefined && object.last_sent_message !== null)
      ? ChannelMessageHeader.fromPartial(object.last_sent_message)
      : undefined;
    message.last_seen_message = (object.last_seen_message !== undefined && object.last_seen_message !== null)
      ? ChannelMessageHeader.fromPartial(object.last_seen_message)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelDescList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channeldesc.push(ChannelDescription.decode(reader, reader.uint32()));
          break;
        case 2:
          message.next_cursor = reader.string();
          break;
        case 3:
          message.prev_cursor = reader.string();
          break;
        case 4:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelDescList {
    return {
      channeldesc: Array.isArray(object?.channeldesc)
        ? object.channeldesc.map((e: any) => ChannelDescription.fromJSON(e))
        : [],
      next_cursor: isSet(object.next_cursor) ? String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? String(object.prev_cursor) : "",
      cacheable_cursor: isSet(object.cacheable_cursor) ? String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: ChannelDescList): unknown {
    const obj: any = {};
    if (message.channeldesc) {
      obj.channeldesc = message.channeldesc.map((e) => e ? ChannelDescription.toJSON(e) : undefined);
    } else {
      obj.channeldesc = [];
    }
    message.next_cursor !== undefined && (obj.next_cursor = message.next_cursor);
    message.prev_cursor !== undefined && (obj.prev_cursor = message.prev_cursor);
    message.cacheable_cursor !== undefined && (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelDescList>, I>>(base?: I): ChannelDescList {
    return ChannelDescList.fromPartial(base ?? {});
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
  return { limit: undefined, state: undefined, cursor: "", clan_id: "", channel_type: 0 };
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
    if (message.channel_type !== 0) {
      writer.uint32(40).int32(message.channel_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListChannelDescsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListChannelDescsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        case 4:
          message.clan_id = reader.string();
          break;
        case 5:
          message.channel_type = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListChannelDescsRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_type: isSet(object.channel_type) ? Number(object.channel_type) : 0,
    };
  },

  toJSON(message: ListChannelDescsRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_type !== undefined && (obj.channel_type = Math.round(message.channel_type));
    return obj;
  },

  create<I extends Exact<DeepPartial<ListChannelDescsRequest>, I>>(base?: I): ListChannelDescsRequest {
    return ListChannelDescsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListChannelDescsRequest>, I>>(object: I): ListChannelDescsRequest {
    const message = createBaseListChannelDescsRequest();
    message.limit = object.limit ?? undefined;
    message.state = object.state ?? undefined;
    message.cursor = object.cursor ?? "";
    message.clan_id = object.clan_id ?? "";
    message.channel_type = object.channel_type ?? 0;
    return message;
  },
};

function createBaseAddRoleChannelDescRequest(): AddRoleChannelDescRequest {
  return { role_ids: [], channel_id: "" };
}

export const AddRoleChannelDescRequest = {
  encode(message: AddRoleChannelDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.role_ids) {
      writer.uint32(10).string(v!);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddRoleChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddRoleChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_ids.push(reader.string());
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddRoleChannelDescRequest {
    return {
      role_ids: Array.isArray(object?.role_ids) ? object.role_ids.map((e: any) => String(e)) : [],
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: AddRoleChannelDescRequest): unknown {
    const obj: any = {};
    if (message.role_ids) {
      obj.role_ids = message.role_ids.map((e) => e);
    } else {
      obj.role_ids = [];
    }
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<AddRoleChannelDescRequest>, I>>(base?: I): AddRoleChannelDescRequest {
    return AddRoleChannelDescRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddRoleChannelDescRequest>, I>>(object: I): AddRoleChannelDescRequest {
    const message = createBaseAddRoleChannelDescRequest();
    message.role_ids = object.role_ids?.map((e) => e) || [];
    message.channel_id = object.channel_id ?? "";
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
    channel_label: "",
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
    if (message.channel_label !== "") {
      writer.uint32(50).string(message.channel_label);
    }
    if (message.channel_private !== 0) {
      writer.uint32(56).int32(message.channel_private);
    }
    for (const v of message.user_ids) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.parrent_id = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        case 4:
          message.category_id = reader.string();
          break;
        case 5:
          message.type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.channel_label = reader.string();
          break;
        case 7:
          message.channel_private = reader.int32();
          break;
        case 8:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChannelDescRequest {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      parrent_id: isSet(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      type: isSet(object.type) ? Number(object.type) : undefined,
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      channel_private: isSet(object.channel_private) ? Number(object.channel_private) : 0,
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: CreateChannelDescRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.parrent_id !== undefined && (obj.parrent_id = message.parrent_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.type !== undefined && (obj.type = message.type);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.channel_private !== undefined && (obj.channel_private = Math.round(message.channel_private));
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateChannelDescRequest>, I>>(base?: I): CreateChannelDescRequest {
    return CreateChannelDescRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelDescRequest>, I>>(object: I): CreateChannelDescRequest {
    const message = createBaseCreateChannelDescRequest();
    message.clan_id = object.clan_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.category_id = object.category_id ?? "";
    message.type = object.type ?? undefined;
    message.channel_label = object.channel_label ?? "";
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteChannelDescRequest {
    return { channel_id: isSet(object.channel_id) ? String(object.channel_id) : "" };
  },

  toJSON(message: DeleteChannelDescRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteChannelDescRequest>, I>>(base?: I): DeleteChannelDescRequest {
    return DeleteChannelDescRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteChannelDescRequest>, I>>(object: I): DeleteChannelDescRequest {
    const message = createBaseDeleteChannelDescRequest();
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseUpdateChannelDescRequest(): UpdateChannelDescRequest {
  return { channel_id: "", channel_label: undefined, category_id: undefined };
}

export const UpdateChannelDescRequest = {
  encode(message: UpdateChannelDescRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.channel_label !== undefined) {
      StringValue.encode({ value: message.channel_label! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.category_id !== undefined) {
      StringValue.encode({ value: message.category_id! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateChannelDescRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelDescRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.channel_label = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.category_id = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateChannelDescRequest {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : undefined,
      category_id: isSet(object.category_id) ? String(object.category_id) : undefined,
    };
  },

  toJSON(message: UpdateChannelDescRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateChannelDescRequest>, I>>(base?: I): UpdateChannelDescRequest {
    return UpdateChannelDescRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChannelDescRequest>, I>>(object: I): UpdateChannelDescRequest {
    const message = createBaseUpdateChannelDescRequest();
    message.channel_id = object.channel_id ?? "";
    message.channel_label = object.channel_label ?? undefined;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddChannelUsersRequest {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: AddChannelUsersRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddChannelUsersRequest>, I>>(base?: I): AddChannelUsersRequest {
    return AddChannelUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveChannelUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveChannelUsersRequest {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: RemoveChannelUsersRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveChannelUsersRequest>, I>>(base?: I): RemoveChannelUsersRequest {
    return RemoveChannelUsersRequest.fromPartial(base ?? {});
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaveChannelRequest {
    return { channel_id: isSet(object.channel_id) ? String(object.channel_id) : "" };
  },

  toJSON(message: LeaveChannelRequest): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<LeaveChannelRequest>, I>>(base?: I): LeaveChannelRequest {
    return LeaveChannelRequest.fromPartial(base ?? {});
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
    role_user_list: undefined,
    permission_list: undefined,
    role_channel_active: 0,
    channel_ids: [],
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
    if (message.role_user_list !== undefined) {
      RoleUserList.encode(message.role_user_list, writer.uint32(98).fork()).ldelim();
    }
    if (message.permission_list !== undefined) {
      PermissionList.encode(message.permission_list, writer.uint32(106).fork()).ldelim();
    }
    if (message.role_channel_active !== 0) {
      writer.uint32(112).int32(message.role_channel_active);
    }
    for (const v of message.channel_ids) {
      writer.uint32(122).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Role {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.color = reader.string();
          break;
        case 4:
          message.role_icon = reader.string();
          break;
        case 5:
          message.slug = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.creator_id = reader.string();
          break;
        case 8:
          message.clan_id = reader.string();
          break;
        case 9:
          message.active = reader.int32();
          break;
        case 10:
          message.display_online = reader.int32();
          break;
        case 11:
          message.allow_mention = reader.int32();
          break;
        case 12:
          message.role_user_list = RoleUserList.decode(reader, reader.uint32());
          break;
        case 13:
          message.permission_list = PermissionList.decode(reader, reader.uint32());
          break;
        case 14:
          message.role_channel_active = reader.int32();
          break;
        case 15:
          message.channel_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Role {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      color: isSet(object.color) ? String(object.color) : "",
      role_icon: isSet(object.role_icon) ? String(object.role_icon) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      active: isSet(object.active) ? Number(object.active) : 0,
      display_online: isSet(object.display_online) ? Number(object.display_online) : 0,
      allow_mention: isSet(object.allow_mention) ? Number(object.allow_mention) : 0,
      role_user_list: isSet(object.role_user_list) ? RoleUserList.fromJSON(object.role_user_list) : undefined,
      permission_list: isSet(object.permission_list) ? PermissionList.fromJSON(object.permission_list) : undefined,
      role_channel_active: isSet(object.role_channel_active) ? Number(object.role_channel_active) : 0,
      channel_ids: Array.isArray(object?.channel_ids) ? object.channel_ids.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Role): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.color !== undefined && (obj.color = message.color);
    message.role_icon !== undefined && (obj.role_icon = message.role_icon);
    message.slug !== undefined && (obj.slug = message.slug);
    message.description !== undefined && (obj.description = message.description);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.active !== undefined && (obj.active = Math.round(message.active));
    message.display_online !== undefined && (obj.display_online = Math.round(message.display_online));
    message.allow_mention !== undefined && (obj.allow_mention = Math.round(message.allow_mention));
    message.role_user_list !== undefined &&
      (obj.role_user_list = message.role_user_list ? RoleUserList.toJSON(message.role_user_list) : undefined);
    message.permission_list !== undefined &&
      (obj.permission_list = message.permission_list ? PermissionList.toJSON(message.permission_list) : undefined);
    message.role_channel_active !== undefined && (obj.role_channel_active = Math.round(message.role_channel_active));
    if (message.channel_ids) {
      obj.channel_ids = message.channel_ids.map((e) => e);
    } else {
      obj.channel_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Role>, I>>(base?: I): Role {
    return Role.fromPartial(base ?? {});
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
    message.role_user_list = (object.role_user_list !== undefined && object.role_user_list !== null)
      ? RoleUserList.fromPartial(object.role_user_list)
      : undefined;
    message.permission_list = (object.permission_list !== undefined && object.permission_list !== null)
      ? PermissionList.fromPartial(object.permission_list)
      : undefined;
    message.role_channel_active = object.role_channel_active ?? 0;
    message.channel_ids = object.channel_ids?.map((e) => e) || [];
    return message;
  },
};

function createBasePermission(): Permission {
  return { id: "", title: "", slug: "", description: "", active: 0 };
}

export const Permission = {
  encode(message: Permission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.active !== 0) {
      writer.uint32(40).int32(message.active);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Permission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.slug = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.active = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Permission {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      slug: isSet(object.slug) ? String(object.slug) : "",
      description: isSet(object.description) ? String(object.description) : "",
      active: isSet(object.active) ? Number(object.active) : 0,
    };
  },

  toJSON(message: Permission): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.slug !== undefined && (obj.slug = message.slug);
    message.description !== undefined && (obj.description = message.description);
    message.active !== undefined && (obj.active = Math.round(message.active));
    return obj;
  },

  create<I extends Exact<DeepPartial<Permission>, I>>(base?: I): Permission {
    return Permission.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Permission>, I>>(object: I): Permission {
    const message = createBasePermission();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.slug = object.slug ?? "";
    message.description = object.description ?? "";
    message.active = object.active ?? 0;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roles.push(Role.decode(reader, reader.uint32()));
          break;
        case 2:
          message.next_cursor = reader.string();
          break;
        case 3:
          message.prev_cursor = reader.string();
          break;
        case 4:
          message.cacheable_cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoleList {
    return {
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => Role.fromJSON(e)) : [],
      next_cursor: isSet(object.next_cursor) ? String(object.next_cursor) : "",
      prev_cursor: isSet(object.prev_cursor) ? String(object.prev_cursor) : "",
      cacheable_cursor: isSet(object.cacheable_cursor) ? String(object.cacheable_cursor) : "",
    };
  },

  toJSON(message: RoleList): unknown {
    const obj: any = {};
    if (message.roles) {
      obj.roles = message.roles.map((e) => e ? Role.toJSON(e) : undefined);
    } else {
      obj.roles = [];
    }
    message.next_cursor !== undefined && (obj.next_cursor = message.next_cursor);
    message.prev_cursor !== undefined && (obj.prev_cursor = message.prev_cursor);
    message.cacheable_cursor !== undefined && (obj.cacheable_cursor = message.cacheable_cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<RoleList>, I>>(base?: I): RoleList {
    return RoleList.fromPartial(base ?? {});
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

function createBasePermissionList(): PermissionList {
  return { permissions: [] };
}

export const PermissionList = {
  encode(message: PermissionList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.permissions) {
      Permission.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PermissionList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermissionList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permissions.push(Permission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PermissionList {
    return {
      permissions: Array.isArray(object?.permissions) ? object.permissions.map((e: any) => Permission.fromJSON(e)) : [],
    };
  },

  toJSON(message: PermissionList): unknown {
    const obj: any = {};
    if (message.permissions) {
      obj.permissions = message.permissions.map((e) => e ? Permission.toJSON(e) : undefined);
    } else {
      obj.permissions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PermissionList>, I>>(base?: I): PermissionList {
    return PermissionList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PermissionList>, I>>(object: I): PermissionList {
    const message = createBasePermissionList();
    message.permissions = object.permissions?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListPermissionsRequest(): ListPermissionsRequest {
  return { role_id: "" };
}

export const ListPermissionsRequest = {
  encode(message: ListPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role_id !== "") {
      writer.uint32(10).string(message.role_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListPermissionsRequest {
    return { role_id: isSet(object.role_id) ? String(object.role_id) : "" };
  },

  toJSON(message: ListPermissionsRequest): unknown {
    const obj: any = {};
    message.role_id !== undefined && (obj.role_id = message.role_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPermissionsRequest>, I>>(base?: I): ListPermissionsRequest {
    return ListPermissionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListPermissionsRequest>, I>>(object: I): ListPermissionsRequest {
    const message = createBaseListPermissionsRequest();
    message.role_id = object.role_id ?? "";
    return message;
  },
};

function createBaseListRoleUsersRequest(): ListRoleUsersRequest {
  return { role_id: "", limit: undefined, cursor: "" };
}

export const ListRoleUsersRequest = {
  encode(message: ListRoleUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role_id !== "") {
      writer.uint32(10).string(message.role_id);
    }
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRoleUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRoleUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_id = reader.string();
          break;
        case 2:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRoleUsersRequest {
    return {
      role_id: isSet(object.role_id) ? String(object.role_id) : "",
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListRoleUsersRequest): unknown {
    const obj: any = {};
    message.role_id !== undefined && (obj.role_id = message.role_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRoleUsersRequest>, I>>(base?: I): ListRoleUsersRequest {
    return ListRoleUsersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListRoleUsersRequest>, I>>(object: I): ListRoleUsersRequest {
    const message = createBaseListRoleUsersRequest();
    message.role_id = object.role_id ?? "";
    message.limit = object.limit ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseListPermissionOfUsersRequest(): ListPermissionOfUsersRequest {
  return { clan_id: "" };
}

export const ListPermissionOfUsersRequest = {
  encode(message: ListPermissionOfUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPermissionOfUsersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPermissionOfUsersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListPermissionOfUsersRequest {
    return { clan_id: isSet(object.clan_id) ? String(object.clan_id) : "" };
  },

  toJSON(message: ListPermissionOfUsersRequest): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPermissionOfUsersRequest>, I>>(base?: I): ListPermissionOfUsersRequest {
    return ListPermissionOfUsersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListPermissionOfUsersRequest>, I>>(object: I): ListPermissionOfUsersRequest {
    const message = createBaseListPermissionOfUsersRequest();
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseRoleUserList(): RoleUserList {
  return { role_users: [], cursor: "" };
}

export const RoleUserList = {
  encode(message: RoleUserList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.role_users) {
      RoleUserList_RoleUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoleUserList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleUserList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_users.push(RoleUserList_RoleUser.decode(reader, reader.uint32()));
          break;
        case 2:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoleUserList {
    return {
      role_users: Array.isArray(object?.role_users)
        ? object.role_users.map((e: any) => RoleUserList_RoleUser.fromJSON(e))
        : [],
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: RoleUserList): unknown {
    const obj: any = {};
    if (message.role_users) {
      obj.role_users = message.role_users.map((e) => e ? RoleUserList_RoleUser.toJSON(e) : undefined);
    } else {
      obj.role_users = [];
    }
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<RoleUserList>, I>>(base?: I): RoleUserList {
    return RoleUserList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RoleUserList>, I>>(object: I): RoleUserList {
    const message = createBaseRoleUserList();
    message.role_users = object.role_users?.map((e) => RoleUserList_RoleUser.fromPartial(e)) || [];
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseRoleUserList_RoleUser(): RoleUserList_RoleUser {
  return { id: "", username: "", display_name: "", avatar_url: "", lang_tag: "", location: "", online: false };
}

export const RoleUserList_RoleUser = {
  encode(message: RoleUserList_RoleUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.online === true) {
      writer.uint32(56).bool(message.online);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoleUserList_RoleUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleUserList_RoleUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.display_name = reader.string();
          break;
        case 4:
          message.avatar_url = reader.string();
          break;
        case 5:
          message.lang_tag = reader.string();
          break;
        case 6:
          message.location = reader.string();
          break;
        case 7:
          message.online = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoleUserList_RoleUser {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      display_name: isSet(object.display_name) ? String(object.display_name) : "",
      avatar_url: isSet(object.avatar_url) ? String(object.avatar_url) : "",
      lang_tag: isSet(object.lang_tag) ? String(object.lang_tag) : "",
      location: isSet(object.location) ? String(object.location) : "",
      online: isSet(object.online) ? Boolean(object.online) : false,
    };
  },

  toJSON(message: RoleUserList_RoleUser): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.username !== undefined && (obj.username = message.username);
    message.display_name !== undefined && (obj.display_name = message.display_name);
    message.avatar_url !== undefined && (obj.avatar_url = message.avatar_url);
    message.lang_tag !== undefined && (obj.lang_tag = message.lang_tag);
    message.location !== undefined && (obj.location = message.location);
    message.online !== undefined && (obj.online = message.online);
    return obj;
  },

  create<I extends Exact<DeepPartial<RoleUserList_RoleUser>, I>>(base?: I): RoleUserList_RoleUser {
    return RoleUserList_RoleUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RoleUserList_RoleUser>, I>>(object: I): RoleUserList_RoleUser {
    const message = createBaseRoleUserList_RoleUser();
    message.id = object.id ?? "";
    message.username = object.username ?? "";
    message.display_name = object.display_name ?? "";
    message.avatar_url = object.avatar_url ?? "";
    message.lang_tag = object.lang_tag ?? "";
    message.location = object.location ?? "";
    message.online = object.online ?? false;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.state = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        case 4:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRolesRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      state: isSet(object.state) ? Number(object.state) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
    };
  },

  toJSON(message: ListRolesRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.state !== undefined && (obj.state = message.state);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesRequest>, I>>(base?: I): ListRolesRequest {
    return ListRolesRequest.fromPartial(base ?? {});
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
    description: "",
    clan_id: "",
    display_online: 0,
    allow_mention: 0,
    add_user_ids: [],
    active_permission_ids: [],
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
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.clan_id !== "") {
      writer.uint32(42).string(message.clan_id);
    }
    if (message.display_online !== 0) {
      writer.uint32(48).int32(message.display_online);
    }
    if (message.allow_mention !== 0) {
      writer.uint32(56).int32(message.allow_mention);
    }
    for (const v of message.add_user_ids) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.active_permission_ids) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.color = reader.string();
          break;
        case 3:
          message.role_icon = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.clan_id = reader.string();
          break;
        case 6:
          message.display_online = reader.int32();
          break;
        case 7:
          message.allow_mention = reader.int32();
          break;
        case 8:
          message.add_user_ids.push(reader.string());
          break;
        case 9:
          message.active_permission_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRoleRequest {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      color: isSet(object.color) ? String(object.color) : "",
      role_icon: isSet(object.role_icon) ? String(object.role_icon) : "",
      description: isSet(object.description) ? String(object.description) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      display_online: isSet(object.display_online) ? Number(object.display_online) : 0,
      allow_mention: isSet(object.allow_mention) ? Number(object.allow_mention) : 0,
      add_user_ids: Array.isArray(object?.add_user_ids) ? object.add_user_ids.map((e: any) => String(e)) : [],
      active_permission_ids: Array.isArray(object?.active_permission_ids)
        ? object.active_permission_ids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CreateRoleRequest): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.color !== undefined && (obj.color = message.color);
    message.role_icon !== undefined && (obj.role_icon = message.role_icon);
    message.description !== undefined && (obj.description = message.description);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.display_online !== undefined && (obj.display_online = Math.round(message.display_online));
    message.allow_mention !== undefined && (obj.allow_mention = Math.round(message.allow_mention));
    if (message.add_user_ids) {
      obj.add_user_ids = message.add_user_ids.map((e) => e);
    } else {
      obj.add_user_ids = [];
    }
    if (message.active_permission_ids) {
      obj.active_permission_ids = message.active_permission_ids.map((e) => e);
    } else {
      obj.active_permission_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(base?: I): CreateRoleRequest {
    return CreateRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateRoleRequest>, I>>(object: I): CreateRoleRequest {
    const message = createBaseCreateRoleRequest();
    message.title = object.title ?? "";
    message.color = object.color ?? "";
    message.role_icon = object.role_icon ?? "";
    message.description = object.description ?? "";
    message.clan_id = object.clan_id ?? "";
    message.display_online = object.display_online ?? 0;
    message.allow_mention = object.allow_mention ?? 0;
    message.add_user_ids = object.add_user_ids?.map((e) => e) || [];
    message.active_permission_ids = object.active_permission_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteRoleRequest(): DeleteRoleRequest {
  return { role_id: "", channel_id: "" };
}

export const DeleteRoleRequest = {
  encode(message: DeleteRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role_id !== "") {
      writer.uint32(10).string(message.role_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRoleRequest {
    return {
      role_id: isSet(object.role_id) ? String(object.role_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: DeleteRoleRequest): unknown {
    const obj: any = {};
    message.role_id !== undefined && (obj.role_id = message.role_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(base?: I): DeleteRoleRequest {
    return DeleteRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(object: I): DeleteRoleRequest {
    const message = createBaseDeleteRoleRequest();
    message.role_id = object.role_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseUpdateRoleRequest(): UpdateRoleRequest {
  return {
    role_id: "",
    title: undefined,
    color: undefined,
    role_icon: undefined,
    description: undefined,
    display_online: undefined,
    allow_mention: undefined,
    add_user_ids: [],
    active_permission_ids: [],
    remove_user_ids: [],
    remove_permission_ids: [],
  };
}

export const UpdateRoleRequest = {
  encode(message: UpdateRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role_id !== "") {
      writer.uint32(10).string(message.role_id);
    }
    if (message.title !== undefined) {
      StringValue.encode({ value: message.title! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.color !== undefined) {
      StringValue.encode({ value: message.color! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.role_icon !== undefined) {
      StringValue.encode({ value: message.role_icon! }, writer.uint32(34).fork()).ldelim();
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
    for (const v of message.add_user_ids) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.active_permission_ids) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.remove_user_ids) {
      writer.uint32(82).string(v!);
    }
    for (const v of message.remove_permission_ids) {
      writer.uint32(90).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role_id = reader.string();
          break;
        case 2:
          message.title = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.color = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.role_icon = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.description = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.display_online = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.allow_mention = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.add_user_ids.push(reader.string());
          break;
        case 9:
          message.active_permission_ids.push(reader.string());
          break;
        case 10:
          message.remove_user_ids.push(reader.string());
          break;
        case 11:
          message.remove_permission_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRoleRequest {
    return {
      role_id: isSet(object.role_id) ? String(object.role_id) : "",
      title: isSet(object.title) ? String(object.title) : undefined,
      color: isSet(object.color) ? String(object.color) : undefined,
      role_icon: isSet(object.role_icon) ? String(object.role_icon) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      display_online: isSet(object.display_online) ? Number(object.display_online) : undefined,
      allow_mention: isSet(object.allow_mention) ? Number(object.allow_mention) : undefined,
      add_user_ids: Array.isArray(object?.add_user_ids) ? object.add_user_ids.map((e: any) => String(e)) : [],
      active_permission_ids: Array.isArray(object?.active_permission_ids)
        ? object.active_permission_ids.map((e: any) => String(e))
        : [],
      remove_user_ids: Array.isArray(object?.remove_user_ids) ? object.remove_user_ids.map((e: any) => String(e)) : [],
      remove_permission_ids: Array.isArray(object?.remove_permission_ids)
        ? object.remove_permission_ids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: UpdateRoleRequest): unknown {
    const obj: any = {};
    message.role_id !== undefined && (obj.role_id = message.role_id);
    message.title !== undefined && (obj.title = message.title);
    message.color !== undefined && (obj.color = message.color);
    message.role_icon !== undefined && (obj.role_icon = message.role_icon);
    message.description !== undefined && (obj.description = message.description);
    message.display_online !== undefined && (obj.display_online = message.display_online);
    message.allow_mention !== undefined && (obj.allow_mention = message.allow_mention);
    if (message.add_user_ids) {
      obj.add_user_ids = message.add_user_ids.map((e) => e);
    } else {
      obj.add_user_ids = [];
    }
    if (message.active_permission_ids) {
      obj.active_permission_ids = message.active_permission_ids.map((e) => e);
    } else {
      obj.active_permission_ids = [];
    }
    if (message.remove_user_ids) {
      obj.remove_user_ids = message.remove_user_ids.map((e) => e);
    } else {
      obj.remove_user_ids = [];
    }
    if (message.remove_permission_ids) {
      obj.remove_permission_ids = message.remove_permission_ids.map((e) => e);
    } else {
      obj.remove_permission_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(base?: I): UpdateRoleRequest {
    return UpdateRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateRoleRequest>, I>>(object: I): UpdateRoleRequest {
    const message = createBaseUpdateRoleRequest();
    message.role_id = object.role_id ?? "";
    message.title = object.title ?? undefined;
    message.color = object.color ?? undefined;
    message.role_icon = object.role_icon ?? undefined;
    message.description = object.description ?? undefined;
    message.display_online = object.display_online ?? undefined;
    message.allow_mention = object.allow_mention ?? undefined;
    message.add_user_ids = object.add_user_ids?.map((e) => e) || [];
    message.active_permission_ids = object.active_permission_ids?.map((e) => e) || [];
    message.remove_user_ids = object.remove_user_ids?.map((e) => e) || [];
    message.remove_permission_ids = object.remove_permission_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseUploadAttachmentRequest(): UploadAttachmentRequest {
  return { filename: "", filetype: "", size: 0, width: 0, height: 0 };
}

export const UploadAttachmentRequest = {
  encode(message: UploadAttachmentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.filetype !== "") {
      writer.uint32(18).string(message.filetype);
    }
    if (message.size !== 0) {
      writer.uint32(24).int32(message.size);
    }
    if (message.width !== 0) {
      writer.uint32(32).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(40).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadAttachmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadAttachmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filename = reader.string();
          break;
        case 2:
          message.filetype = reader.string();
          break;
        case 3:
          message.size = reader.int32();
          break;
        case 4:
          message.width = reader.int32();
          break;
        case 5:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadAttachmentRequest {
    return {
      filename: isSet(object.filename) ? String(object.filename) : "",
      filetype: isSet(object.filetype) ? String(object.filetype) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: UploadAttachmentRequest): unknown {
    const obj: any = {};
    message.filename !== undefined && (obj.filename = message.filename);
    message.filetype !== undefined && (obj.filetype = message.filetype);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadAttachmentRequest>, I>>(base?: I): UploadAttachmentRequest {
    return UploadAttachmentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UploadAttachmentRequest>, I>>(object: I): UploadAttachmentRequest {
    const message = createBaseUploadAttachmentRequest();
    message.filename = object.filename ?? "";
    message.filetype = object.filetype ?? "";
    message.size = object.size ?? 0;
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseListMessageMentionRequest(): ListMessageMentionRequest {
  return { limit: undefined, forward: undefined, cursor: "" };
}

export const ListMessageMentionRequest = {
  encode(message: ListMessageMentionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== undefined) {
      Int32Value.encode({ value: message.limit! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.forward !== undefined) {
      BoolValue.encode({ value: message.forward! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.cursor !== "") {
      writer.uint32(26).string(message.cursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMessageMentionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMessageMentionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.forward = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.cursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListMessageMentionRequest {
    return {
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      forward: isSet(object.forward) ? Boolean(object.forward) : undefined,
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
    };
  },

  toJSON(message: ListMessageMentionRequest): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.forward !== undefined && (obj.forward = message.forward);
    message.cursor !== undefined && (obj.cursor = message.cursor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMessageMentionRequest>, I>>(base?: I): ListMessageMentionRequest {
    return ListMessageMentionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListMessageMentionRequest>, I>>(object: I): ListMessageMentionRequest {
    const message = createBaseListMessageMentionRequest();
    message.limit = object.limit ?? undefined;
    message.forward = object.forward ?? undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseUploadAttachment(): UploadAttachment {
  return { filename: "", url: "" };
}

export const UploadAttachment = {
  encode(message: UploadAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadAttachment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filename = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadAttachment {
    return {
      filename: isSet(object.filename) ? String(object.filename) : "",
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: UploadAttachment): unknown {
    const obj: any = {};
    message.filename !== undefined && (obj.filename = message.filename);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadAttachment>, I>>(base?: I): UploadAttachment {
    return UploadAttachment.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UploadAttachment>, I>>(object: I): UploadAttachment {
    const message = createBaseUploadAttachment();
    message.filename = object.filename ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
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
