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
  ApiChannelDescription,
  ApiChannelMessageHeader,
  ApiCreateEventRequest,
  ApiGiveCoffeeEvent,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageReaction,
  ApiMessageRef,
  ApiNotification,
  ApiNotificationUserChannel,
  ApiPermissionUpdate,
  ApiRole,
  ApiRpc,
  ApiTokenSentEvent,
  ApiUserActivity,
  ApiWebhook,
} from "./api.gen";
import { Session } from "./session";
import { ChannelMessage } from "./client";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";
import { safeJSONParse } from "./utils";

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}
/** An object which represents a connected user in the server. */
export interface Presence {
  /** The id of the user. */
  user_id: string;
  /** The session id of the user. */
  session_id: string;
  /** The username of the user. */
  username: string;
  /** The node the user is connected to. */
  node: string;
  /** The status of the user */
  status: string;
  // User Mobile
  is_mobile: boolean;
  // Metadata
  metadata: string;
}

export interface NotificationInfo {
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
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  channel?: ApiChannelDescription;
}

/** A response from a channel join operation. */
export interface Channel {
  /** The server-assigned channel id. */
  id: string;
  // label
  chanel_label: string;
  /** The presences visible on the chat channel. */
  presences: Presence[];
  /** The presence of the current user, i.e. yourself. */
  self: Presence;
  // The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clan_logo: string;
  // The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  category_name: string;
}

export interface ClanJoin {
  clan_join: {
    clan_id: string;
  };
}

/** Join a realtime chat channel. */
interface ChannelJoin {
  channel_join: {
    /** The id of the channel to join. */
    channel_id: string;
    /** The name of the channel to join. */
    channel_label: string;
    /** The channel type: 1 = Channel, 2 = Direct Message, 3 = Group. */
    type: number;
    /** Whether channel messages are persisted in the database. */
    persistence: boolean;
    /** Whether the user's channel presence is hidden when joining. */
    hidden: boolean;
    // is public
    is_public: boolean;
  };
}

/** Leave a realtime chat channel. */
interface ChannelLeave {
  channel_leave: {
    /** The id of the channel to leave. */
    channel_id: string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    // Is public
    is_public: boolean;
  };
}

export interface AddClanUserEvent {
  //the clan id
  clan_id: string;
  // the user
  user: UserProfileRedis;
}

export interface UserProfileRedis {
  /** User IDs to follow. */
  user_id: string;
  /** Username to follow. */
  username: string;
  /** Avatar to follow. */
  avatar: string;
  /** Display name */
  display_name: string;
  /** about me */
  about_me: string;
  /** custom status */
  custom_status: string;
  /** create time */
  create_time_second: number;
  /** online */
  online: boolean;
}

/** UserChannelAddedEvent */
export interface UserChannelAddedEvent {
  // the channel id
  channel_desc: ChannelDescription;
  // the user
  users: UserProfileRedis[];
  // the custom status
  status: string;
  // the clan id
  clan_id: string;
  //
  caller: UserProfileRedis;
  //
  create_time_second: number;
  //
  active: number;
}

export interface UserChannelRemovedEvent {
  // the channel id
  channel_id: string;
  // the user_id
  user_ids: string[];
  // the channel type
  channel_type: number;
  // the clan id
  clan_id: string;
}

export interface UserClanRemovedEvent {
  // the clan id
  clan_id: string;
  // the user_id
  user_ids: string[];
}

/** Last seen message by user */
export interface LastPinMessageEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The unique ID of this message. */
  message_id: string;
  /** user id */
  user_id: string;
  /** operation */
  operation: number;
  // Is public
  is_public: boolean;
  // clan Id
  clan_id: string;
}

export interface UnmuteEvent {
  // channel id
  channel_id: string;
  // category_id
  category_id: string;
  // clan_id
  clan_id: string;
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  // The clan id
  clan_id: string;
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The unique ID of this message. */
  message_id: string;
}

/** User is typing */
export interface MessageTypingEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  // Is public
  is_public: boolean;
}

// user profile updated event
export interface UserProfileUpdatedEvent {
  // the user id
  user_id: string;
  // the display_name
  display_name: string;
  // the avatar
  avatar: string;
  // the about_me
  about_me: string;
  // the channel_id
  channel_id: string;
  // the clan_id
  clan_id: string;
  // the encrypt_private_key
  encrypt_private_key: string;
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  /** The server-assigned channel ID. */
  channel_id: string;
  // The mode
  mode: number;
  /** A unique ID for the chat message. */
  message_id: string;
  /** A user-defined code for the chat message. */
  code: number;
  /** The username of the sender of the message. */
  username: string;
  /** The UNIX time when the message was created. */
  create_time: string;
  /** The UNIX time when the message was updated. */
  update_time: string;
  /** True if the chat message has been stored in history. */
  persistence: boolean;
}

/** Send a message to a realtime chat channel. */
interface ChannelMessageSend {
  channel_message_send: {
    /** Clan Id */
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id: string;
    // The mode
    mode: number;
    // channel label
    channel_label: string;
    /** The content payload. */
    content: any;
    //
    mentions?: Array<ApiMessageMention>;
    //
    attachments?: Array<ApiMessageAttachment>;
    //
    anonymous_message?: boolean;
    //
    mention_everyone?: boolean;
    //
    avatar: string;
    // Is public
    is_public: boolean;
    // code
    code: number;
    //
    topic_id?: string;
  };
}

/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
  channel_message_update: {
    /** The server-assigned channel ID. */
    channel_id: string;
    /** A unique ID for the chat message to be updated. */
    message_id: string;
    /** The content payload. */
    content: any;
    /** mentions */
    mentions?: Array<ApiMessageMention>;
    /** attachments */
    attachments?: Array<ApiMessageAttachment>;
    /** The mode payload. */
    mode: number;
    // Is public
    is_public: boolean;
    //
    topic_id?: string;
    //
    is_update_msg_topic?: boolean;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
  channel_message_remove: {
    /** The clan id */
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id: string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    /** A unique ID for the chat message to be removed. */
    message_id: string;
    // Is public
    is_public: boolean;
    /** attachments */
    has_attachment?: boolean;
    //
    topic_id?: string;
  };
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  /** The unique identifier of the chat channel. */
  channel_id: string;
  // The channel name
  channel_label: string;
  // The mode
  mode: number;
  /** Presences of the users who joined the channel. */
  joins: Presence[];
  /** Presences of users who left the channel. */
  leaves: Presence[];
}

export interface VoiceEndedEvent {
  // id voice
  id: string;
  // The unique identifier of the chat clan.
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
}

export interface VoiceStartedEvent {
  // id voice
  id: string;
  // The unique identifier of the chat clan.
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
}

export interface VoiceLeavedEvent {
  // event id
  id: string;
  // clan id
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
  // voice user id
  voice_user_id: string;
}

export interface VoiceJoinedEvent {
  /** The unique identifier of the chat channel. */
  clan_id: string;
  // The channel name
  clan_name: string;
  // id voice
  id: string;
  // voice participant
  participant: string;
  // user id
  user_id: string;
  // voice channel label
  voice_channel_label: string;
  // voice channel id
  voice_channel_id: string;
  // last screenshot
  last_screenshot: string;
}

export interface CustomStatusEvent {
  // the clan id
  clan_id: string;
  // the user id
  user_id: string;
  // username
  username: string;
  // the status
  status: string;
  /** time reset */
  time_reset: number;
  /** no clear */
  no_clear: boolean;
}

export interface ChannelUpdatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parrent_id
  parrent_id: string;
  // channel id
  channel_id: string;
  // channel label
  channel_label: string;
  // channel type
  channel_type: number;
  // status
  status: number;
  // meeting code
  meeting_code: string;
  // is error
  is_error: boolean;
  // app url
  app_url: string;
  // e2ee
  e2ee: number;
  //
  topic: string;
  //
  age_restricted: number;
  //
  is_active_thread: boolean;
}

export interface ChannelCreatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parrent_id
  parrent_id: string;
  // channel id
  channel_id: string;
  // channel label
  channel_label: string;
  // channel private
  channel_private: number;
  // channel type
  channel_type: number;
  // status
  status: number;
  // app url
  app_url: string;
}

export interface ChannelDeletedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // channel id
  channel_id: string;
  // deletor
  deletor: string;
}

export interface StickerCreateEvent {
  // clan id
  clan_id: string;
  // source
  source: string;
  // shortname
  shortname: string;
  // category
  category: string;
  // creator_id
  creator_id: string;
  // sticker id
  sticker_id: string;
  // logo
  logo: string;
  // clan name
  clan_name: string;
}

export interface StickerUpdateEvent {
  // shortname
  shortname: string;
  // sticker id
  sticker_id: string;
  // user id update
  user_id: string;
}

export interface StickerDeleteEvent {
  // sticker id
  sticker_id: string;
  // user id delete
  user_id: string;
}

export interface ClanDeletedEvent {
  // clan id
  clan_id: string;
  // deletor
  deletor: string;
}

// clan updated event
export interface ClanUpdatedEvent {
  // clan id
  clan_id: string;
  // clan name
  clan_name: string;
  // logo
  logo: string;
  // banner
  banner: string;
  // status
  status: number;
  // is onboarding
  is_onboarding: boolean;
  // welcome channel id
  welcome_channel_id: string;
}

export interface ClanProfileUpdatedEvent {
  // the user id
  user_id: string;
  // the clan_nick
  clan_nick: string;
  // the avatar
  clan_avatar: string;
  // the clan_id
  clan_id: string;
}

/** Stream identifier */
export interface StreamId {
  /** The type of stream (e.g. chat). */
  mode: number;
  /** The primary stream subject, usually a user id. */
  subject: string;
  /** A secondary stream subject, for example for a direct chat. */
  descriptor: string;
  /** Meta-information (e.g. chat room name). */
  label: string;
}

/** Stream data. */
export interface StreamData {
  /** The stream identifier. */
  stream: StreamId;
  /** A reference to the user presence that sent this data, if any. */
  sender?: Presence;
  /** Arbitrary contents of the data message. */
  data: string;
  /** True if this data was delivered reliably. */
  reliable?: boolean;
}

/** Presence updates. */
export interface StreamPresenceEvent {
  /** The stream identifier. */
  stream: StreamId;
  /** Presences of users who joined the stream. */
  joins: Presence[];
  /** Presences of users who left the stream. */
  leaves: Presence[];
}

/** Execute an Lua function on the server. */
interface Rpc {
  rpc: ApiRpc;
}

/** Application-level heartbeat ping. */
interface Ping {}

/** A snapshot of statuses for some set of users. */
export interface Status {
  /** The user presences to view statuses of. */
  presences: Presence[];
}

/** Start receiving status updates for some set of users. */
interface StatusFollow {
  /** The IDs of the users to follow. */
  status_follow: { user_ids: string[] };
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  /** This join information is in response to a subscription made to be notified when a user comes online. */
  joins: Presence[];
  /** This join information is in response to a subscription made to be notified when a user goes offline. */
  leaves: Presence[];
}

/** Stop receiving status updates for some set of users. */
interface StatusUnfollow {
  /** The IDs of user to unfollow. */
  status_unfollow: { user_ids: string[] };
}

/** Set the user's own status. */
interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status_update: { status?: string };
}
export interface CheckNameExistedEvent {
  clan_name: string;
  exist: boolean;
  condition_id: string;
  type: number;
}

/**  */
export interface ClanSticker {
  //
  category?: string;
  //
  clan_id?: string;
  //
  create_time?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  logo?: string;
  //
  clan_name?: string;
}

export interface RoleEvent {
  role: ApiRole;
  status: number;
  user_id: string;
  user_add_ids: Array<string>;
  user_remove_ids: Array<string>;
  active_permission_ids: Array<string>;
  remove_permission_ids: Array<string>;
}

export interface EventEmoji {
  id: string;
  clan_id: string;
  short_name: string;
  source: string;
  category: string;
  action: number;
  user_id: string;
  logo: string;
  clan_name: string;
}

/**  */
export interface ClanEmoji {
  //
  category?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  src?: string;
  //
  logo?: string;
  //
  clan_name?: string;
  //
  clan_id?: string;
}

/**  */
export interface ChannelDescription {
  // The clan of this channel
  clan_id?: string;
  // The channel this message belongs to.
  channel_id?: string;
  // The channel type.
  type?: number;
  // The channel lable
  channel_label?: string;
  // The app url
  app_url?: string;
  // The channel private
  channel_private?: number;
  // meeting code
  meeting_code?: string;
  //
  clan_name?: string;
  //
  parrent_id?: string;
  //
  last_sent_message?: ApiChannelMessageHeader;
}

// hashtagDM
export interface HashtagDm {
  // The channel id.
  channel_id?: string;
  // The channel lable
  channel_label?: string;
  // The clan of this channel
  clan_id?: string;
  // The clan name
  clan_name?: string;
  //
  meeting_code?: string;
  //
  type?: number;
  //
  channel_private?: number;
  //
  parrent_id?: string;
}

export interface NotificationSetting {
  //
  id?: string;
  //
  notification_setting_type?: number;
}

export interface NotificationChannelCategorySetting {
  // Notification id
  id: string;
  //
  channel_category_label: string;
  // Notification title
  notification_setting_type: number;
  //
  channel_category_title: string;
  //
  action: number;
}

export interface UserEmojiUsage {
  user_id: string;
  emoji_id: string;
  clan_id: string;
  create_time: string;
}
export interface RemoveFriend {
  //
  user_id: string;
}

export interface AddUserEmojiUsageEvent {
  emoji_id: string;
  clan_id: string;
}

/** Response cho ListUserEmojiUsage */
export interface GetUserEmojiUsageEvent {
  clanId: string;
  user_emoji_usage: Array<UserEmojiUsage>;
}

/** On role assign */
export interface RoleAssignedEvent {
  /** The clan of this role */
  ClanId: string;
  /** Role ID */
  role_id: string;
  /** UserIds Assigned */
  user_ids_assigned: string[];
  /** UserIds Removed */
  user_ids_removed: string[];
}

/** Streaming Joined event */
export interface StreamingLeavedEvent {
  /** id */
  id: string;
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** streaming channel name */
  streaming_channel_id: string;
  /** streaming user_id */
  streaming_user_id: string;
}

/** Streaming Joined event */
export interface StreamingJoinedEvent {
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** The channel name */
  clan_name: string;
  /** id streaming */
  id: string;
  /** streaming participant */
  participant: string;
  /** user id */
  user_id: string;
  /** streaming channel label */
  streaming_channel_label: string;
  /** streaming channel id */
  streaming_channel_id: string;
}

/** Streaming start event */
export interface StreamingStartedEvent {
  /** clan id */
  clan_id: string;
  /** channel id */
  channel_id: string;
  /** stream url */
  streaming_url: string;
  /** status */
  is_streaming: boolean;
}

/** Streaming start event */
export interface StreamingEndedEvent {
  /** clan id */
  clan_id: string;
  /** channel id */
  channel_id: string;
}

export interface ChannelAppEvent {
  user_id: string;
  username: string;
  clan_id: string;
  channel_id: string;
  action: number;
}

export interface PermissionSet {
  /** Role ID */
  role_id: string;
  /** User ID */
  user_id: string;
  /** Channel ID */
  channel_id: string;
  /** List permission update */
  permission_updates: ApiPermissionUpdate[];
  /**  */
  caller: string;
}

export interface PermissionChangedEvent {
  user_id: string;
  channel_id: string;
  add_permissions: ApiPermissionUpdate[];
  remove_permissions: ApiPermissionUpdate[];
  default_permissions: ApiPermissionUpdate[];
}

export interface DropdownBoxSelected {
  message_id: string;
  channel_id: string;
  selectbox_id: string;
  sender_id: string;
  user_id: string;
  value: Array<string>;
}

export interface MessageButtonClicked {
  message_id: string;
  channel_id: string;
  button_id: string;
  sender_id: string;
  user_id: string;
  extra_data: string;
}

export interface IncomingCallPush {
  receiver_id: string;
  json_data: string;
  channel_id: string;
  caller_id: string;
}

export interface WebrtcSignalingFwd {
  receiver_id: string;
  data_type: number;
  json_data: string;
  channel_id: string;
  caller_id: string;
}

export interface SFUSignalingFwd {
  data_type: number;
  json_data: string;
  channel_id: string;
  clan_id: string;
  user_id: string;
}

export interface ListActivity {
  acts: ApiUserActivity[];
}

export interface SdTopicEvent {
  id: string;
  clan_id: string;
  channel_id: string;
  message_id: string;
}

export interface UserStatusEvent {
  user_id: string;
  custom_status: string;
}

/** A socket connection to Mezon server. */
export interface Socket {
  /** Connection is Open */
  isOpen(): boolean;

  /** Connect to the server. */
  connect(
    session: Session,
    createStatus: boolean,
    platform: string,
    connectTimeoutMs?: number,
    signal?: AbortSignal
  ): Promise<Session>;

  /** Disconnect from the server. */
  disconnect(fireDisconnectEvent: boolean): void;

  /** Subscribe to one or more users for their status updates. */
  followUsers(user_ids: string[]): Promise<Status>;

  /** Join clan chat */
  joinClanChat(clan_id: string): Promise<ClanJoin>;

  follower(): Promise<void>;

  /** Join a chat channel on the server. */
  joinChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean
  ): Promise<Channel>;

  /** Leave a chat channel on the server. */
  leaveChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean
  ): Promise<void>;

  /** Remove a chat message from a chat channel on the server. */
  removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string
  ): Promise<ChannelMessageAck>;

  /** Execute an RPC function to the server. */
  rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;

  /** Unfollow one or more users from their status updates. */
  unfollowUsers(user_ids: string[]): Promise<void>;

  /** Update a chat message on a chat channel in the server. */
  updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean
  ): Promise<ChannelMessageAck>;

  /** Update the status for the current user online. */
  updateStatus(status?: string): Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content?: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string
  ): Promise<ChannelMessageAck>;

  /** Send message typing */
  writeMessageTyping(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean
  ): Promise<MessageTypingEvent>;

  /** Send message reaction */
  writeMessageReaction(
    id: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean,
    topic_id?: string
  ): Promise<ApiMessageReaction>;

  /** Send last seen message */
  writeLastSeenMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number
  ): Promise<LastSeenMessageEvent>;

  /** Send last pin message */
  writeLastPinMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number
  ): Promise<LastPinMessageEvent>;

  /** Send custom user status */
  writeCustomStatus(
    clan_id: string,
    status: string,
    time_reset: number,
    no_clear: boolean
  ): Promise<CustomStatusEvent>;

  /** send voice joined */
  writeVoiceJoined(
    id: string,
    clanId: string,
    clanName: string,
    voiceChannelId: string,
    voiceChannelLabel: string,
    participant: string,
    lastScreenshot: string
  ): Promise<VoiceJoinedEvent>;

  /** send voice leaved */
  writeVoiceLeaved(
    id: string,
    clanId: string,
    voiceChannelId: string,
    voiceUserId: string
  ): Promise<VoiceLeavedEvent>;

  /* Set the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  setHeartbeatTimeoutMs(ms: number): void;

  /* Get the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  getHeartbeatTimeoutMs(): number;

  checkDuplicateName(
    name: string,
    condition_id: string,
    type: number
  ): Promise<CheckNameExistedEvent>;

  handleMessageButtonClick: (
    message_id: string,
    channel_id: string,
    button_id: string,
    sender_id: string,
    user_id: string,
    extra_data: string
  ) => Promise<MessageButtonClicked>;

  handleDropdownBoxSelected: (
    message_id: string,
    channel_id: string,
    selectbox_id: string,
    sender_id: string,
    user_id: string,
    value: Array<string>
  ) => Promise<DropdownBoxSelected>;

  forwardWebrtcSignaling: (
    receiverId: string,
    dataType: number,
    jsonData: string,
    channelId: string,
    caller_id: string
  ) => Promise<WebrtcSignalingFwd>;

  forwardSFUSignaling: (
    user_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    clan_id: string
  ) => Promise<SFUSignalingFwd>;

  makeCallPush: (
    receiverId: string,
    jsonData: string,
    channelId: string,
    caller_id: string
  ) => Promise<IncomingCallPush>;

  writeChannelAppEvent: (
    clan_id: string,
    channel_id: string,
    action: number
  ) => Promise<ChannelAppEvent>;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: Event) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: Event) => void;

  /** Receive notifications from the socket. */
  onnotification: (notification: NotificationInfo) => void;

  /** Receive status presence updates. */
  onstatuspresence: (statusPresence: StatusPresenceEvent) => void;

  /** Receive stream presence updates. */
  onstreampresence: (streamPresence: StreamPresenceEvent) => void;

  /** Receive stream data. */
  onstreamdata: (streamData: StreamData) => void;

  /**
   * An application-level heartbeat timeout that fires after the client does not receive a pong from the server after the heartbeat interval.
   * Most browsers maintain an internal heartbeat, in which case its unlikely you'll need to use this callback. However, Chrome does not implement an internal heartbeat.
   * We fire this separately from `onclose` because heartbeats fail when there's no connectivity, and many browsers don't fire `onclose` until the closing handshake either succeeds or fails.
   * In any case, be aware that `onclose` will still fire if there is a heartbeat timeout in a potentially delayed manner.
   */
  onheartbeattimeout: () => void;

  oncustomstatus: (statusEvent: CustomStatusEvent) => void;

  /** Receive channel message. */
  onchannelmessage: (channelMessage: ChannelMessage) => void;

  /** Receive typing event */
  onmessagetyping: (messageTypingEvent: MessageTypingEvent) => void;

  /** Receive reaction event */
  onmessagereaction: (messageReactionEvent: ApiMessageReaction) => void;

  /** Receive channel presence updates. */
  onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;

  /** pin message event */
  onpinmessage: (pin: LastPinMessageEvent) => void;

  /** Receive added user event */
  onuserchanneladded: (user: UserChannelAddedEvent) => void;

  /** Receive added user clan event */
  onuserclanadded: (user: AddClanUserEvent) => void;

  /** Receive update user event */
  onuserprofileupdate: (user: UserProfileUpdatedEvent) => void;

  /** Receive channel removed user event */
  onuserchannelremoved: (user: UserChannelRemovedEvent) => void;

  onremovefriend: (user: RemoveFriend) => void;

  /** Receive clan removed user event */
  onuserclanremoved: (user: UserClanRemovedEvent) => void;

  // when someone start the voice room
  onvoicestarted: (voice: VoiceStartedEvent) => void;

  // when someone end the voice room
  onvoiceended: (voice: VoiceEndedEvent) => void;

  // when someone join to voice room
  onvoicejoined: (voiceParticipant: VoiceJoinedEvent) => void;

  // when someone join to voice room
  onvoiceleaved: (voiceParticipant: VoiceLeavedEvent) => void;

  // when channel is created
  onchannelcreated: (channelCreated: ChannelCreatedEvent) => void;

  onroleevent: (roleEvent: RoleEvent) => void;

  // when channel is deleted
  onchanneldeleted: (channelDeleted: ChannelDeletedEvent) => void;

  // when sticker is created
  onstickercreated: (stickerCreated: StickerCreateEvent) => void;

  // when sticker is updated
  onstickerupdated: (stickerUpdated: StickerUpdateEvent) => void;

  // when sticker is deleted
  onstickerdeleted: (stickerDeleted: StickerDeleteEvent) => void;

  // when clan is deleted
  onclandeleted: (clanDeleted: ClanDeletedEvent) => void;

  // when channel is updated
  onchannelupdated: (channelUpdated: ChannelUpdatedEvent) => void;

  // when clan profile is updated
  onclanprofileupdated: (clanprofile: ClanProfileUpdatedEvent) => void;

  // when clan is updated
  onclanupdated: (clan: ClanUpdatedEvent) => void;

  // when user update last seen message
  onlastseenupdated: (event: LastSeenMessageEvent) => void;

  onmessagebuttonclicked: (event: MessageButtonClicked) => void;

  onmessagedropdownboxselected: (event: DropdownBoxSelected) => void;

  onwebrtcsignalingfwd: (event: WebrtcSignalingFwd) => void;

  onsfusignalingfwd: (event: SFUSignalingFwd) => void;

  oneventcreated: (clan_event_created: ApiCreateEventRequest) => void;

  oncoffeegiven: (give_coffee_event: ApiGiveCoffeeEvent) => void;

  oneventemoji: (event_emoji: EventEmoji) => void;

  oneventnotiuserchannel: (noti_user_channel: ApiNotificationUserChannel) => void;

  oneventwebhook: (webhook_event: ApiWebhook) => void;

  onroleassign: (role_assign_event: RoleAssignedEvent) => void;

  onstreamingchannelstarted: (
    streaming_started_event: StreamingStartedEvent
  ) => void;

  onstreamingchannelended: (streaming_ended_event: StreamingEndedEvent) => void;

  onstreamingchanneljoined: (
    streaming_joined_event: StreamingJoinedEvent
  ) => void;

  onstreamingchannelleaved: (
    streaming_leaved_event: StreamingLeavedEvent
  ) => void;

  onpermissionset: (permission_set_event: PermissionSet) => void;

  onpermissionchanged: (
    permission_changed_event: PermissionChangedEvent
  ) => void;

  onunmuteevent: (unmute_event: UnmuteEvent) => void;

  ontokensent: (token: ApiTokenSentEvent) => void;

  onactivityupdated: (list_activity: ListActivity) => void;

  onsdtopicevent: (sd_topic_event: SdTopicEvent) => void;

  onchannelappevent: (event: ChannelAppEvent) => void;

  onuserstatusevent: (user_status_event: UserStatusEvent) => void;
}

/** Reports an error received from a socket message. */
export interface SocketError {
  /** The error code. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
}

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;

  constructor(
    readonly host: string,
    readonly port: string,
    readonly useSSL: boolean = false,
    public verbose: boolean = false,
    readonly adapter: WebSocketAdapter = new WebSocketAdapterText(),
    readonly sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs
  ) {
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = DefaultSocket.DefaultHeartbeatTimeoutMs;
  }

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  isOpen(): boolean {
    return this.adapter.isOpen();
  }

  connect(
    session: Session,
    createStatus: boolean = false,
    platform: string = "",
    connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs,
    signal?: AbortSignal
  ): Promise<Session> {
    if (this.adapter.isOpen()) {
      return Promise.resolve(session);
    }

    const scheme = this.useSSL ? "wss://" : "ws://";
    this.adapter.connect(
      scheme,
      this.host,
      this.port,
      createStatus,
      session.token,
      platform,
      signal
    );

    this.adapter.onClose = (evt: Event) => {
      this.ondisconnect(evt);
    };

    this.adapter.onError = (evt: Event) => {
      this.onerror(evt);
    };

    this.adapter.onMessage = async (message: any) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", JSON.stringify(message));
      }
      /** Inbound message from server. */
      if (!message.cid) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: ApiNotification) => {
            n.content = n.content ? safeJSONParse(n.content) : undefined;
            this.onnotification(n);
          });
        } else if (message.voice_started_event) {
          this.onvoicestarted(message.voice_started_event);
        } else if (message.voice_ended_event) {
          this.onvoiceended(message.voice_ended_event);
        } else if (message.voice_joined_event) {
          this.onvoicejoined(message.voice_joined_event);
        } else if (message.voice_leaved_event) {
          this.onvoiceleaved(message.voice_leaved_event);
        } else if (message.channel_created_event) {
          this.onchannelcreated(message.channel_created_event);
        } else if (message.role_event) {
          this.onroleevent(message.role_event);
        } else if (message.event_emoji) {
          this.oneventemoji(message.event_emoji);
        } else if (message.noti_user_channel) {
          this.oneventnotiuserchannel(message.noti_user_channel);
        } else if (message.webhook_event) {
          this.oneventwebhook(message.webhook_event);
        } else if (message.channel_deleted_event) {
          this.onchanneldeleted(message.channel_deleted_event);
        } else if (message.clan_deleted_event) {
          this.onclandeleted(message.clan_deleted_event);
        } else if (message.sticker_create_event) {
          this.onstickercreated(message.sticker_create_event);
        } else if (message.sticker_update_event) {
          this.onstickerupdated(message.sticker_update_event);
        } else if (message.sticker_delete_event) {
          this.onstickerdeleted(message.sticker_delete_event);
        } else if (message.channel_updated_event) {
          this.onchannelupdated(message.channel_updated_event);
        } else if (message.clan_profile_updated_event) {
          this.onclanprofileupdated(message.clan_profile_updated_event);
        } else if (message.clan_updated_event) {
          this.onclanupdated(message.clan_updated_event);
        } else if (message.last_seen_message_event) {
          this.onlastseenupdated(message.last_seen_message_event);
        } else if (message.status_presence_event) {
          this.onstatuspresence(
            <StatusPresenceEvent>message.status_presence_event
          );
        } else if (message.stream_presence_event) {
          this.onstreampresence(
            <StreamPresenceEvent>message.stream_presence_event
          );
        } else if (message.stream_data) {
          this.onstreamdata(<StreamData>message.stream_data);
        } else if (message.channel_message) {
          var content, reactions, mentions, attachments, references;
          try {
            content = safeJSONParse(message.channel_message.content);
          } catch (e) {
            console.log("content is invalid", e);
          }
          try {
            reactions = safeJSONParse(message.channel_message.reactions);
          } catch (e) {
            console.log("reactions is invalid", e);
          }
          try {
            mentions = safeJSONParse(message.channel_message.mentions);
          } catch (e) {
            console.log("mentions is invalid", e);
          }
          try {
            attachments = safeJSONParse(message.channel_message.attachments);
          } catch (e) {
            console.log("attachments is invalid", e);
          }
          try {
            references = safeJSONParse(message.channel_message.references);
          } catch (e) {
            console.log("references is invalid", e);
          }
          var e: ChannelMessage = {
            id: message.id || message.channel_message.message_id,
            avatar: message.channel_message.avatar,
            channel_id: message.channel_message.channel_id,
            mode: message.channel_message.mode,
            channel_label: message.channel_message.channel_label,
            clan_id: message.channel_message.clan_id,
            code: message.channel_message.code,
            create_time: message.channel_message.create_time,
            message_id: message.channel_message.message_id,
            sender_id: message.channel_message.sender_id,
            update_time: message.channel_message.update_time,
            clan_logo: message.channel_message.clan_logo,
            category_name: message.channel_message.category_name,
            username: message.channel_message.username,
            clan_nick: message.channel_message.clan_nick,
            clan_avatar: message.channel_message.clan_avatar,
            display_name: message.channel_message.display_name,
            content: content,
            reactions: reactions,
            mentions: mentions,
            attachments: attachments,
            references: references,
            hide_editted: message.channel_message.hide_editted,
            is_public: message.channel_message.is_public,
            create_time_seconds: message.channel_message.create_time_seconds,
            update_time_seconds: message.channel_message.update_time_seconds,
            topic_id: message.channel_message.topic_id,
          };
          this.onchannelmessage(e);
        } else if (message.message_typing_event) {
          this.onmessagetyping(
            <MessageTypingEvent>message.message_typing_event
          );
        } else if (message.message_reaction_event) {
          this.onmessagereaction(
            <ApiMessageReaction>message.message_reaction_event
          );
        } else if (message.channel_presence_event) {
          this.onchannelpresence(
            <ChannelPresenceEvent>message.channel_presence_event
          );
        } else if (message.last_pin_message_event) {
          this.onpinmessage(
            <LastPinMessageEvent>message.last_pin_message_event
          );
        } else if (message.custom_status_event) {
          this.oncustomstatus(<CustomStatusEvent>message.custom_status_event);
        } else if (message.user_channel_added_event) {
          this.onuserchanneladded(
            <UserChannelAddedEvent>message.user_channel_added_event
          );
        } else if (message.add_clan_user_event) {
          this.onuserclanadded(<AddClanUserEvent>message.add_clan_user_event);
        } else if (message.user_profile_updated_event) {
          this.onuserprofileupdate(
            <UserProfileUpdatedEvent>message.user_profile_updated_event
          );
        } else if (message.user_channel_removed_event) {
          this.onuserchannelremoved(
            <UserChannelRemovedEvent>message.user_channel_removed_event
          );
        } else if (message.remove_friend) {
          this.onremovefriend(<RemoveFriend>message.remove_friend);
        } else if (message.user_clan_removed_event) {
          this.onuserclanremoved(
            <UserClanRemovedEvent>message.user_clan_removed_event
          );
        } else if (message.clan_event_created) {
          this.oneventcreated(message.clan_event_created);
        } else if (message.give_coffee_event) {
          this.oncoffeegiven(<ApiGiveCoffeeEvent>message.give_coffee_event);
        } else if (message.role_assign_event) {
          this.onroleassign(<RoleAssignedEvent>message.role_assign_event);
        } else if (message.streaming_started_event) {
          this.onstreamingchannelstarted(
            <StreamingStartedEvent>message.streaming_started_event
          );
        } else if (message.streaming_ended_event) {
          this.onstreamingchannelended(
            <StreamingEndedEvent>message.streaming_ended_event
          );
        } else if (message.streaming_joined_event) {
          this.onstreamingchanneljoined(
            <StreamingJoinedEvent>message.streaming_joined_event
          );
        } else if (message.streaming_leaved_event) {
          this.onstreamingchannelleaved(
            <StreamingLeavedEvent>message.streaming_leaved_event
          );
        } else if (message.permission_set_event) {
          this.onpermissionset(<PermissionSet>message.permission_set_event);
        } else if (message.permission_changed_event) {
          this.onpermissionchanged(
            <PermissionChangedEvent>message.permission_changed_event
          );
        } else if (message.unmute_event) {
          this.onunmuteevent(<UnmuteEvent>message.unmute_event);
        } else if (message.token_sent_event) {
          this.ontokensent(<ApiTokenSentEvent>message.token_sent_event);
        } else if (message.message_button_clicked) {
          this.onmessagebuttonclicked(
            <MessageButtonClicked>message.message_button_clicked
          );
        } else if (message.dropdown_box_selected) {
          this.onmessagedropdownboxselected(
            <DropdownBoxSelected>message.dropdown_box_selected
          );
        } else if (message.webrtc_signaling_fwd) {
          this.onwebrtcsignalingfwd(
            <WebrtcSignalingFwd>message.webrtc_signaling_fwd
          );
        } else if (message.sfu_signaling_fwd) {
          this.onsfusignalingfwd(<SFUSignalingFwd>message.sfu_signaling_fwd);
        } else if (message.list_activity) {
          this.onactivityupdated(<ListActivity>message.list_activity);
        } else if (message.sd_topic_event) {
          this.onsdtopicevent(<SdTopicEvent>message.sd_topic_event);
        } else if (message.channel_app_event) {
          this.onchannelappevent(<ChannelAppEvent>message.channel_app_event);
        } else if (message.user_status_event) {
          this.onuserstatusevent(<UserStatusEvent>message.user_status_event);
        } else {
          if (this.verbose && window && window.console) {
            console.log("Unrecognized message received: %o", message);
          }
        }
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose && window && window.console) {
            console.error("No promise executor for message: %o", message);
          }
          return;
        }
        delete this.cIds[message.cid];

        if (message.error) {
          executor.reject(<SocketError>message.error);
        } else {
          executor.resolve(message);
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.adapter.onOpen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }

        this.pingPong();
        resolve(session);
      };
      this.adapter.onError = (evt: Event) => {
        reject(evt);
        this.adapter.close();
      };

      setTimeout(() => {
        // if promise has resolved by now, the reject() is a no-op
        reject("The socket timed out when trying to connect.");
      }, connectTimeoutMs);
    });
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    if (this.adapter.isOpen()) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect(<Event>{});
    }
  }

  setHeartbeatTimeoutMs(ms: number) {
    this._heartbeatTimeoutMs = ms;
  }

  getHeartbeatTimeoutMs(): number {
    return this._heartbeatTimeoutMs;
  }

  ondisconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onerror(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onmessagetyping(messagetyping: MessageTypingEvent) {
    if (this.verbose && window && window.console) {
      console.log(messagetyping);
    }
  }

  onmessagereaction(messagereaction: ApiMessageReaction) {
    if (this.verbose && window && window.console) {
      console.log(messagereaction);
    }
  }

  onchannelmessage(channelMessage: ChannelMessage) {
    if (this.verbose && window && window.console) {
      console.log(channelMessage);
    }
  }

  onchannelpresence(channelPresence: ChannelPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelPresence);
    }
  }

  onuserchanneladded(user: UserChannelAddedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserclanadded(user: AddClanUserEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserprofileupdate(user: UserProfileUpdatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserchannelremoved(user: UserChannelRemovedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onremovefriend(user: RemoveFriend) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserclanremoved(user: UserClanRemovedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onnotification(notification: NotificationInfo) {
    if (this.verbose && window && window.console) {
      console.log(notification);
    }
  }

  onstatuspresence(statusPresence: StatusPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(statusPresence);
    }
  }

  onpinmessage(pin: LastPinMessageEvent) {
    if (this.verbose && window && window.console) {
      console.log(pin);
    }
  }

  onvoiceended(voice: VoiceEndedEvent) {
    if (this.verbose && window && window.console) {
      console.log(voice);
    }
  }

  onvoicestarted(voice: VoiceStartedEvent) {
    if (this.verbose && window && window.console) {
      console.log(voice);
    }
  }

  onvoicejoined(voiceParticipant: VoiceJoinedEvent) {
    if (this.verbose && window && window.console) {
      console.log(voiceParticipant);
    }
  }

  onvoiceleaved(voiceParticipant: VoiceLeavedEvent) {
    if (this.verbose && window && window.console) {
      console.log(voiceParticipant);
    }
  }

  onchannelcreated(channelCreated: ChannelCreatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelCreated);
    }
  }

  onroleevent(roleEvent: RoleEvent) {
    if (this.verbose && window && window.console) {
      console.log(roleEvent);
    }
  }

  oneventemoji(eventEmoji: EventEmoji) {
    if (this.verbose && window && window.console) {
      console.log(eventEmoji);
    }
  }

  oneventnotiuserchannel(notiUserChannel: ApiNotificationUserChannel) {
    if (this.verbose && window && window.console) {
      console.log(notiUserChannel);
    }
  }

  oneventwebhook(webhook_event: ApiWebhook) {
    if (this.verbose && window && window.console) {
      console.log(webhook_event);
    }
  }

  onchanneldeleted(channelDeleted: ChannelDeletedEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelDeleted);
    }
  }

  onclandeleted(clanDeleted: ClanDeletedEvent) {
    if (this.verbose && window && window.console) {
      console.log(clanDeleted);
    }
  }

  onstickercreated(stickerCreated: StickerCreateEvent) {
    if (this.verbose && window && window.console) {
      console.log(stickerCreated);
    }
  }

  onstickerdeleted(stickerDeleted: StickerDeleteEvent) {
    if (this.verbose && window && window.console) {
      console.log(stickerDeleted);
    }
  }

  onstickerupdated(stickerUpdated: StickerUpdateEvent) {
    if (this.verbose && window && window.console) {
      console.log(stickerUpdated);
    }
  }

  onchannelupdated(channelUpdated: ChannelUpdatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelUpdated);
    }
  }

  onclanprofileupdated(clanprofile: ClanProfileUpdatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(clanprofile);
    }
  }

  onclanupdated(clan: ClanUpdatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(clan);
    }
  }

  onlastseenupdated(event: LastSeenMessageEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onstreampresence(streamPresence: StreamPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(streamPresence);
    }
  }

  onstreamdata(streamData: StreamData) {
    if (this.verbose && window && window.console) {
      console.log(streamData);
    }
  }

  onheartbeattimeout() {
    if (this.verbose && window && window.console) {
      console.log("Heartbeat timeout.");
    }
  }

  oncustomstatus(statusEvent: CustomStatusEvent) {
    if (this.verbose && window && window.console) {
      console.log(statusEvent);
    }
  }

  oneventcreated(clan_event_created: ApiCreateEventRequest) {
    if (this.verbose && window && window.console) {
      console.log(clan_event_created);
    }
  }

  oncoffeegiven(give_coffee_event: ApiGiveCoffeeEvent) {
    if (this.verbose && window && window.console) {
      console.log(give_coffee_event);
    }
  }

  onroleassign(role_assign_event: RoleAssignedEvent) {
    if (this.verbose && window && window.console) {
      console.log(role_assign_event);
    }
  }

  onstreamingchannelstarted(streaming_started_event: StreamingStartedEvent) {
    if (this.verbose && window && window.console) {
      console.log(streaming_started_event);
    }
  }

  onstreamingchannelended(streaming_ended_event: StreamingEndedEvent) {
    if (this.verbose && window && window.console) {
      console.log(streaming_ended_event);
    }
  }

  onstreamingchanneljoined(streaming_joined_event: StreamingJoinedEvent) {
    if (this.verbose && window && window.console) {
      console.log(streaming_joined_event);
    }
  }

  onstreamingchannelleaved(streaming_leaved_event: StreamingLeavedEvent) {
    if (this.verbose && window && window.console) {
      console.log(streaming_leaved_event);
    }
  }

  onpermissionset(permission_set_event: PermissionSet) {
    if (this.verbose && window && window.console) {
      console.log(permission_set_event);
    }
  }

  onpermissionchanged(permission_changed_event: PermissionChangedEvent) {
    if (this.verbose && window && window.console) {
      console.log(permission_changed_event);
    }
  }

  onunmuteevent(unmute_event: UnmuteEvent) {
    if (this.verbose && window && window.console) {
      console.log(unmute_event);
    }
  }

  ontokensent(tokenSentEvent: ApiTokenSentEvent) {
    if (this.verbose && window && window.console) {
      console.log(tokenSentEvent);
    }
  }

  onmessagebuttonclicked(messageButtonClicked: MessageButtonClicked) {
    if (this.verbose && window && window.console) {
      console.log(messageButtonClicked);
    }
  }

  onmessagedropdownboxselected(msg: DropdownBoxSelected) {
    if (this.verbose && window && window.console) {
      console.log(msg);
    }
  }

  onwebrtcsignalingfwd(event: WebrtcSignalingFwd) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onsfusignalingfwd(event: SFUSignalingFwd) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onactivityupdated(list_activity: ListActivity) {
    if (this.verbose && window && window.console) {
      console.log(list_activity);
    }
  }

  onsdtopicevent(sd_topic_event: SdTopicEvent) {
    if (this.verbose && window && window.console) {
      console.log(sd_topic_event);
    }
  }

  onchannelappevent(event: ChannelAppEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onuserstatusevent(user_status_event: UserStatusEvent) {
    if (this.verbose && window && window.console) {
      console.log(user_status_event);
    }
  }

  send(
    message:
      | ChannelJoin
      | ChannelLeave
      | ChannelMessageSend
      | ChannelMessageUpdate
      | CustomStatusEvent
      | ChannelMessageRemove
      | MessageTypingEvent
      | LastSeenMessageEvent
      | Rpc
      | StatusFollow
      | StatusUnfollow
      | StatusUpdate
      | Ping
      | WebrtcSignalingFwd
      | IncomingCallPush
      | MessageButtonClicked
      | DropdownBoxSelected
      | ChannelAppEvent,
    sendTimeout = DefaultSocket.DefaultSendTimeoutMs
  ): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(
            untypedMessage.channel_message_send.content
          );
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(
            untypedMessage.channel_message_update.content
          );
        }

        const cid = this.generatecid();
        this.cIds[cid] = { resolve, reject };
        setTimeout(() => {
          reject("The socket timed out while waiting for a response.");
        }, sendTimeout);

        /** Add id for promise executor. */
        untypedMessage.cid = cid;
        this.adapter.send(untypedMessage);
      }
    });
  }

  async followUsers(userIds: string[]): Promise<Status> {
    const response = await this.send({ status_follow: { user_ids: userIds } });
    return response.status;
  }

  async joinClanChat(clan_id: string): Promise<ClanJoin> {
    const response = await this.send({
      clan_join: {
        clan_id: clan_id,
      },
    });

    return response.clan_join;
  }

  async follower(): Promise<void> {
    const response = await this.send({
      follow_event: {},
    });

    return response.follow_event;
  }

  async joinChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean
  ): Promise<Channel> {
    const response = await this.send({
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    });

    return response.channel;
  }

  leaveChat(
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean
  ): Promise<void> {
    return this.send({
      channel_leave: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    });
  }

  async removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      channel_message_remove: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        is_public: is_public,
        has_attachment: has_attachment,
        topic_id: topic_id,
      },
    });

    return response.channel_message_ack;
  }

  async rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc> {
    const response = await this.send({
      rpc: {
        id: id,
        payload: payload,
        http_key: http_key,
      },
    });

    return response.rpc;
  }

  unfollowUsers(user_ids: string[]): Promise<void> {
    return this.send({ status_unfollow: { user_ids: user_ids } });
  }

  async updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      channel_message_update: {
        clan_id: clan_id,
        channel_id: channel_id,
        message_id: message_id,
        content: content,
        mentions: mentions,
        attachments: attachments,
        mode: mode,
        is_public: is_public,
        hide_editted: hideEditted,
        topic_id: topic_id,
        is_update_msg_topic: is_update_msg_topic,
      },
    });
    return response.channel_message_ack;
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({ status_update: { status: status } });
  }

  async writeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: Boolean,
    avatar?: string,
    code?: number,
    topic_id?: string
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      channel_message_send: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        content: content,
        mentions: mentions,
        attachments: attachments,
        references: references,
        anonymous_message: anonymous_message,
        mention_everyone: mention_everyone,
        avatar: avatar,
        code: code,
        topic_id: topic_id,
      },
    });
    return response.channel_message_ack;
  }

  async writeMessageReaction(
    id: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean,
    topic_id?: string
  ): Promise<ApiMessageReaction> {
    const response = await this.send({
      message_reaction_event: {
        id: id,
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        emoji_id: emoji_id,
        emoji: emoji,
        count: count,
        message_sender_id: message_sender_id,
        action: action_delete,
        topic_id: topic_id,
      },
    });
    return response.message_reaction_event;
  }

  async writeMessageTyping(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean
  ): Promise<MessageTypingEvent> {
    const response = await this.send({
      message_typing_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
      },
    });
    return response.message_typing_event;
  }

  async writeLastSeenMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number
  ): Promise<LastSeenMessageEvent> {
    const response = await this.send({
      last_seen_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
      },
    });
    return response.last_seen_message_event;
  }

  async writeLastPinMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number
  ): Promise<LastPinMessageEvent> {
    const response = await this.send({
      last_pin_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        operation: operation,
      },
    });
    return response.last_pin_message_event;
  }

  async writeVoiceJoined(
    id: string,
    clanId: string,
    clanName: string,
    voiceChannelId: string,
    voiceChannelLabel: string,
    participant: string,
    lastScreenshot: string
  ): Promise<VoiceJoinedEvent> {
    const response = await this.send({
      voice_joined_event: {
        clan_id: clanId,
        clan_name: clanName,
        id: id,
        participant: participant,
        voice_channel_id: voiceChannelId,
        voice_channel_label: voiceChannelLabel,
        last_screenshot: lastScreenshot,
      },
    });
    return response.voice_joined_event;
  }

  async writeVoiceLeaved(
    id: string,
    clanId: string,
    voiceChannelId: string,
    voiceUserId: string
  ): Promise<VoiceLeavedEvent> {
    const response = await this.send({
      voice_leaved_event: {
        id: id,
        clan_id: clanId,
        voice_channel_id: voiceChannelId,
        voice_user_id: voiceUserId,
      },
    });
    return response.voice_leaved_event;
  }

  async writeCustomStatus(
    clan_id: string,
    status: string,
    time_reset: number,
    no_clear: boolean
  ): Promise<CustomStatusEvent> {
    const response = await this.send({
      custom_status_event: {
        clan_id: clan_id,
        status: status,
        time_reset: time_reset,
        no_clear: no_clear,
      },
    });
    return response.custom_status_event;
  }

  async checkDuplicateName(
    name: string,
    condition_id: string,
    type: number
  ): Promise<CheckNameExistedEvent> {
    const response = await this.send({
      check_name_existed_event: {
        name: name,
        condition_id: condition_id,
        type: type,
      },
    });
    return response.check_name_existed_event;
  }

  async forwardWebrtcSignaling(
    receiver_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    caller_id: string
  ): Promise<WebrtcSignalingFwd> {
    const response = await this.send({
      webrtc_signaling_fwd: {
        receiver_id: receiver_id,
        data_type: data_type,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    });
    return response.webrtc_signaling_fwd;
  }

  async forwardSFUSignaling(
    user_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    clan_id: string
  ): Promise<SFUSignalingFwd> {
    const response = await this.send({
      sfu_signaling_fwd: {
        user_id: user_id,
        data_type: data_type,
        json_data: json_data,
        channel_id: channel_id,
        clan_id: clan_id,
      },
    });
    return response.sfu_signaling_fwd;
  }

  async makeCallPush(
    receiver_id: string,
    json_data: string,
    channel_id: string,
    caller_id: string
  ): Promise<IncomingCallPush> {
    const response = await this.send({
      incoming_call_push: {
        receiver_id: receiver_id,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    });
    return response.incoming_call_push;
  }

  async handleDropdownBoxSelected(
    message_id: string,
    channel_id: string,
    selectbox_id: string,
    sender_id: string,
    user_id: string,
    value: Array<string>
  ): Promise<DropdownBoxSelected> {
    const response = await this.send({
      dropdown_box_selected: {
        message_id: message_id,
        channel_id: channel_id,
        selectbox_id: selectbox_id,
        sender_id: sender_id,
        user_id: user_id,
        value: value,
      },
    });
    return response.dropdown_box_selected;
  }

  async handleMessageButtonClick(
    message_id: string,
    channel_id: string,
    button_id: string,
    sender_id: string,
    user_id: string,
    extra_data: string
  ): Promise<MessageButtonClicked> {
    const response = await this.send({
      message_button_clicked: {
        message_id: message_id,
        channel_id: channel_id,
        button_id: button_id,
        sender_id: sender_id,
        user_id: user_id,
        extra_data: extra_data,
      },
    });
    return response.webrtc_signaling_fwd;
  }

  async writeChannelAppEvent(
    clan_id: string,
    channel_id: string,
    action: number
  ): Promise<ChannelAppEvent> {
    const response = await this.send({
      channel_app_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        action: action,
      },
    });
    return response.channel_app_event;
  }

  private async pingPong(): Promise<void> {
    if (!this.adapter.isOpen()) {
      return;
    }

    try {
      await this.send({ ping: {} }, this._heartbeatTimeoutMs);
    } catch {
      if (this.adapter.isOpen()) {
        if (window && window.console) {
          console.error("Server unreachable from heartbeat.");
        }
        this.onheartbeattimeout();
        this.adapter.close();
      }

      return;
    }

    // reuse the timeout as the interval for now.
    // we can separate them out into separate values if needed later.
    setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
  }
}
