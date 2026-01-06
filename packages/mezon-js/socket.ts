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
  ApiAllUsersAddChannelResponse,
  ApiChannelAttachmentList,
  ApiChannelDescList,
  ApiChannelDescription,
  ApiChannelMessage,
  ApiChannelMessageHeader,
  ApiChannelMessageList,
  ApiChannelSettingListResponse,
  ApiChannelUserList,
  ApiClanDescList,
  ApiCreateEventRequest,
  ApiEmojiListedResponse,
  ApiGiveCoffeeEvent,
  ApiHashtagDmList,
  ApiListClanWebhookResponse,
  ApiListFavoriteChannelResponse,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageReaction,
  ApiMessageRef,
  ApiNotification,
  ApiNotificationChannel,
  ApiNotificationChannelCategorySettingList,
  ApiNotificationList,
  ApiNotificationSetting,
  ApiNotificationUserChannel,
  ApiNotifiReactMessage,
  ApiPermissionList,
  ApiPermissionRoleChannelListEventResponse,
  ApiPermissionUpdate,
  ApiRole,
  ApiRoleList,
  ApiRoleListEventResponse,
  ApiRoleUserList,
  ApiRpc,
  ApiStickerListedResponse,
  ApiTokenSentEvent,
  ApiUserActivity,
  ApiUserPermissionInChannelListResponse,
  ApiVoiceChannelUserList,
  ApiWebhook,
  ApiWebhookListResponse,
  ApiEmojiRecentList,
  ApiFriendList,
  ApiListChannelAppsResponse,
  ApiListUserActivity,
  ApiListClanUnreadMsgIndicatorResponse,
  ChannelMessage,
} from "./types";
import { Session } from "./session";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";
import { mapToCamelCase, mapToSnakeCase, safeJSONParse } from "./utils";

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}
/** An object which represents a connected user in the server. */
export interface Presence {
  /** The id of the user. */
  userId: string;
  /** The session id of the user. */
  sessionId: string;
  /** The username of the user. */
  username: string;
  /** The node the user is connected to. */
  node: string;
  /** The status of the user */
  status: string;
  // User Mobile
  isMobile: boolean;
  // user status
  userStatus: string;
}

export interface NotificationInfo {
  /** Category code for this notification. */
  code?: number;
  /** Content of the notification in JSON. */
  content?: {};
  /** The UNIX time when the notification was created. */
  createTime?: string;
  /** ID of the Notification. */
  id?: string;
  /** True if this notification was persisted to the database. */
  persistent?: boolean;
  /** ID of the sender, if a user. Otherwise 'null'. */
  senderId?: string;
  /** Subject of the notification. */
  subject?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  channel?: ApiChannelDescription;
  //
  topicId?: string;
}

/** A response from a channel join operation. */
export interface Channel {
  /** The server-assigned channel id. */
  id: string;
  // label
  channelLabel: string;
  /** The presences visible on the chat channel. */
  presences: Presence[];
  /** The presence of the current user, i.e. yourself. */
  self: Presence;
  // The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clanLogo: string;
  // The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  categoryName: string;
}

export interface ClanJoin {
  clanJoin: {
    clanId: string;
  };
}

/** Join a realtime chat channel. */
interface ChannelJoin {
  channelJoin: {
    /** The id of the channel to join. */
    channelId: string;
    /** The name of the channel to join. */
    channelLabel: string;
    /** The channel type: 1 = Channel, 2 = Direct Message, 3 = Group. */
    type: number;
    /** Whether channel messages are persisted in the database. */
    persistence: boolean;
    /** Whether the user's channel presence is hidden when joining. */
    hidden: boolean;
    // is public
    isPublic: boolean;
  };
}

/** Leave a realtime chat channel. */
interface ChannelLeave {
  channelLeave: {
    /** The id of the channel to leave. */
    channelId: string;
    // The mode
    mode: number;
    // The channel label
    channelLabel: string;
    // Is public
    isPublic: boolean;
  };
}

export interface AddClanUserEvent {
  //the clan id
  clanId: string;
  // the user
  user: UserProfileRedis;
  invitor: string;
}

export interface BannedUserEvent {
  userIds: Array<string>;
  action: number;
  bannerId: string;
  channelId: string;
  clanId: string;
  banTime: number;
}

export interface UserProfileRedis {
  /** User IDs to follow. */
  userId: string;
  /** Username to follow. */
  username: string;
  /** Avatar to follow. */
  avatar: string;
  /** Display name */
  displayName: string;
  /** custom status */
  customStatus: string;
  /** online */
  online: boolean;
  // create time
  createTimeSecond: number;
  /** clans */
  joinedClans: number[];
  // app url
  appUrl: string;
  // is bot
  isBot: boolean;
}

/** UserChannelAddedEvent */
export interface UserChannelAddedEvent {
  // the channel id
  channelDesc: ChannelDescription;
  // the user
  users: UserProfileRedis[];
  // the custom status
  status: string;
  // the clan id
  clanId: string;
  //
  caller: UserProfileRedis;
  //
  createTimeSecond: number;
  //
  active: number;
}

export interface UserChannelRemovedEvent {
  // the channel id
  channelId: string;
  // the userId
  userIds: string[];
  // the channel type
  channelType: number;
  // the clan id
  clanId: string;
  // badgeCount
  badgeCounts: number[];
}

export interface UserClanRemovedEvent {
  // the clan id
  clanId: string;
  // the userId
  userIds: string[];
}

/** Last seen message by user */
export interface LastPinMessageEvent {
  /** The channel this message belongs to. */
  channelId: string;
  // The mode
  mode: number;
  // The channel label
  channelLabel: string;
  /** The unique ID of this message. */
  messageId: string;
  /** user id */
  userId: string;
  /** operation */
  operation: number;
  // Is public
  isPublic: boolean;
  // clan Id
  clanId: string;
  // avatar
  messageSenderAvatar: string;
  // message sender id
  messageSenderId: string;
  // message sender username
  messageSenderUsername: string;
  // message content
  messageContent: string;
  // attachment
  messageAttachment: string;
  // create time
  messageCreatedTime: string;
}

export interface UnmuteEvent {
  // channel id
  channelId: string;
  // categoryId
  categoryId: string;
  // clanId
  clanId: string;
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  // The clan id
  clanId: string;
  /** The channel this message belongs to. */
  channelId: string;
  // The mode
  mode: number;
  // The channel label
  channelLabel: string;
  /** The unique ID of this message. */
  messageId: string;
  //
  badgeCount: number;
}

/** User is typing */
export interface MessageTypingEvent {
  /** The channel this message belongs to. */
  channelId: string;
  // The mode
  mode: number;
  // The channel label
  channelLabel: string;
  /** Message sender, usually a user ID. */
  senderId: string;
  // Is public
  isPublic: boolean;
  // sender username
  senderUsername: string;
  // sender display name
  senderDisplayName: string;
  // topic id
  topicId?: string;
}

// user profile updated event
export interface UserProfileUpdatedEvent {
  // the user id
  userId: string;
  // the displayName
  displayName: string;
  // the avatar
  avatar: string;
  // the aboutMe
  aboutMe: string;
  // the channelId
  channelId: string;
  // the clanId
  clanId: string;
  // the encryptPrivateKey
  encryptPrivateKey: string;
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  /** The server-assigned channel ID. */
  channelId: string;
  // The mode
  mode: number;
  /** A unique ID for the chat message. */
  messageId: string;
  /** A user-defined code for the chat message. */
  code: number;
  /** The username of the sender of the message. */
  username: string;
  /** The UNIX time when the message was created. */
  createTime: string;
  /** The UNIX time when the message was updated. */
  updateTime: string;
  /** True if the chat message has been stored in history. */
  persistence: boolean;
}

/** Send a message to a realtime chat channel. */
interface ChannelMessageSend {
  channel_message_send: {
    /** Clan Id */
    clanId: string;
    /** The server-assigned channel ID. */
    channelId: string;
    // The mode
    mode: number;
    // channel label
    channelLabel: string;
    /** The content payload. */
    content: any;
    //
    mentions?: Array<ApiMessageMention>;
    //
    attachments?: Array<ApiMessageAttachment>;
    //
    anonymousMessage?: boolean;
    //
    mentionEveryone?: boolean;
    //
    avatar: string;
    // Is public
    isPublic: boolean;
    // code
    code: number;
    //
    topicId?: string;
  };
}

interface TransferOwnershipEvent {
  clanId: string;
  prevOwner: string;
  currOwner: string;
}

interface QuickMenuEvent {
  quick_menu_event: {
    menuName: string;
    message: {
      /** Clan Id */
      clanId: string;
      /** The server-assigned channel ID. */
      channelId: string;
      // The mode
      mode: number;
      // channel label
      channelLabel: string;
      /** The content payload. */
      content: any;
      //
      mentions?: Array<ApiMessageMention>;
      //
      attachments?: Array<ApiMessageAttachment>;
      //
      anonymousMessage?: boolean;
      //
      mentionEveryone?: boolean;
      //
      avatar: string;
      // Is public
      isPublic: boolean;
      // code
      code: number;
      //
      topicId?: string;
    };
  };
}

interface EphemeralMessageSend {
  ephemeral_message_send: {
    receiverId: string;
    message: {
      /** Clan Id */
      clanId: string;
      /** The server-assigned channel ID. */
      channelId: string;
      // The mode
      mode: number;
      // channel label
      channelLabel: string;
      /** The content payload. */
      content: any;
      //
      mentions?: Array<ApiMessageMention>;
      //
      attachments?: Array<ApiMessageAttachment>;
      //
      anonymousMessage?: boolean;
      //
      mentionEveryone?: boolean;
      //
      avatar: string;
      // Is public
      isPublic: boolean;
      // code
      code: number;
      //
      topicId?: string;
    };
  };
}

/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
  channel_message_update: {
    /** The server-assigned channel ID. */
    channelId: string;
    /** A unique ID for the chat message to be updated. */
    messageId: string;
    /** The content payload. */
    content: any;
    /** mentions */
    mentions?: Array<ApiMessageMention>;
    /** attachments */
    attachments?: Array<ApiMessageAttachment>;
    /** The mode payload. */
    mode: number;
    // Is public
    isPublic: boolean;
    //
    topicId?: string;
    //
    isUpdateMsgTopic?: boolean;
    //
    oldMentions?: string;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
  channel_message_remove: {
    /** The clan id */
    clanId: string;
    /** The server-assigned channel ID. */
    channelId: string;
    // The mode
    mode: number;
    // The channel label
    channelLabel: string;
    /** A unique ID for the chat message to be removed. */
    messageId: string;
    // Is public
    isPublic: boolean;
    /** attachments */
    hasAttachment?: boolean;
    //
    topicId?: string;
    // mentions
    mentions: string;
    // references
    references: string;
  };
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  /** The unique identifier of the chat channel. */
  channelId: string;
  // The channel name
  channelLabel: string;
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
  clanId: string;
  // voice channel name
  voiceChannelId: string;
}

export interface VoiceStartedEvent {
  // id voice
  id: string;
  // The unique identifier of the chat clan.
  clanId: string;
  // voice channel name
  voiceChannelId: string;
}

export interface VoiceLeavedEvent {
  // event id
  id: string;
  // clan id
  clanId: string;
  // voice channel name
  voiceChannelId: string;
  // voice user id
  voiceUserId: string;
}

export interface VoiceJoinedEvent {
  /** The unique identifier of the chat channel. */
  clanId: string;
  // The channel name
  clanName: string;
  // id voice
  id: string;
  // voice participant
  participant: string;
  // user id
  userId: string;
  // voice channel label
  voiceChannelLabel: string;
  // voice channel id
  voiceChannelId: string;
  // last screenshot
  lastScreenshot: string;
}

export interface CustomStatusEvent {
  // the clan id
  clanId: string;
  // the user id
  userId: string;
  // username
  username: string;
  // the status
  status: string;
  /** time reset */
  timeReset: number;
  /** no clear */
  noClear: boolean;
}

export interface UnpinMessageEvent {
  id: string;
  messageId: string;
  channelId: string;
  clanId: string;
}

export interface ChannelUpdatedEvent {
  // clan id
  clanId: string;
  // category
  categoryId: string;
  // creator
  creatorId: string;
  // parentId
  parentId: string;
  // channel id
  channelId: string;
  // channel label
  channelLabel: string;
  // channel type
  channelType: number;
  // status
  status: number;
  // meeting code
  meetingCode: string;
  // channel private
  channelPrivate: number;
  // is error
  isError: boolean;
  // app url
  appId: string;
  // e2ee
  e2ee: number;
  //
  topic: string;
  //
  ageRestricted: number;
  //
  isActiveThread: boolean;
  //
  active: number;
  //
  countMessUnread: number;
  //
  roleIds?: Array<string>;
  // The users to add.
  userIds?: Array<string>;
  // channel avatar
  channelAvatar: string;
}

export interface DeleteAccountEvent {
  // user id
  userId: string;
}

export interface ChannelCreatedEvent {
  // clan id
  clanId: string;
  // category
  categoryId: string;
  // creator
  creatorId: string;
  // parentId
  parentId: string;
  // channel id
  channelId: string;
  // channel label
  channelLabel: string;
  // channel private
  channelPrivate: number;
  // channel type
  channelType: number;
  // status
  status: number;
  // app url
  appId: string;
  // clanName
  clanName: string;
  // channel avatar
  channelAvatar: string;
}

export interface CategoryEvent {
  // clan id
  clanId: string;
  // category
  id: string;
  // creator
  creatorId: string;
  // categoryName
  categoryName: string;
  // status
  status: number;
}

export interface ChannelDeletedEvent {
  // clan id
  clanId: string;
  // category
  categoryId: string;
  // channel id
  channelId: string;
  // deletor
  deletor: string;
  // parent id
  parentId: string;
}

export interface StickerCreateEvent {
  // clan id
  clanId: string;
  // source
  source: string;
  // shortname
  shortname: string;
  // category
  category: string;
  // creatorId
  creatorId: string;
  // sticker id
  sticker_id: string;
  // logo
  logo: string;
  // clan name
  clanName: string;
}

export interface StickerUpdateEvent {
  // shortname
  shortname: string;
  // sticker id
  sticker_id: string;
  // user id update
  userId: string;
}

export interface StickerDeleteEvent {
  // sticker id
  sticker_id: string;
  // user id delete
  userId: string;
}

export interface ClanDeletedEvent {
  // clan id
  clanId: string;
  // deletor
  deletor: string;
}

// clan updated event
export interface ClanUpdatedEvent {
  // clan id
  clanId: string;
  // clan name
  clanName: string;
  // logo
  logo: string;
  // banner
  banner: string;
  // status
  status: number;
  // is onboarding
  isOnboarding: boolean;
  // welcome channel id
  welcomeChannelId: string;
  // onboardingBanner.
  onboardingBanner: string;
  // about
  about: string;
  // prevent anonymous
  preventAnonymous: boolean;
}

export interface ClanProfileUpdatedEvent {
  // the user id
  userId: string;
  // the clanNick
  clanNick: string;
  // the avatar
  clanAvatar: string;
  // the clanId
  clanId: string;
}

export interface MeetParticipantEvent {
  username: string;
  roomName: string;
  channelId: string;
  clanId: string;
  action: number;
}

export interface AllowAnonymousEvent {
  clanId: string;
  allow: boolean;
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
  status_follow: { userIds: string[] };
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
  statusUnfollow: { userIds: string[] };
}

/** Set the user's own status. */
interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status_update: { status?: string };
}
export interface CheckNameExistedEvent {
  clanName: string;
  exist: boolean;
  condition_id: string;
  type: number;
  clanId: string;
}

/**  */
export interface ClanSticker {
  //
  category?: string;
  //
  clanId?: string;
  //
  createTime?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  logo?: string;
  //
  clanName?: string;
  //
  isForSale?: boolean;
}

export interface RoleEvent {
  role: ApiRole;
  status: number;
  userId: string;
  userAddIds: Array<string>;
  userRemoveIds: Array<string>;
  activePermissionIds: Array<string>;
  removePermissionIds: Array<string>;
}

export interface EventEmoji {
  id: string;
  clanId: string;
  shortName: string;
  source: string;
  category: string;
  action: number;
  userId: string;
  logo: string;
  clanName: string;
  isForSale: boolean;
}

/**  */
export interface ClanEmoji {
  //
  category?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  src?: string;
  //
  logo?: string;
  //
  clanName?: string;
  //
  clanId?: string;
  //
  isForSale?: boolean;
}

/**  */
export interface ChannelDescription {
  // The clan of this channel
  clanId?: string;
  // The channel this message belongs to.
  channelId?: string;
  // The channel type.
  type?: number;
  // The channel lable
  channelLabel?: string;
  // The app url
  appUrl?: string;
  // The channel private
  channelPrivate?: number;
  // meeting code
  meetingCode?: string;
  //
  clanName?: string;
  //
  parentId?: string;
  //
  lastSentMessage?: ApiChannelMessageHeader;
}

// hashtagDM
export interface HashtagDm {
  // The channel id.
  channelId?: string;
  // The channel lable
  channelLabel?: string;
  // The clan of this channel
  clanId?: string;
  // The clan name
  clanName?: string;
  //
  meetingCode?: string;
  //
  type?: number;
  //
  channelPrivate?: number;
  //
  parentId?: string;
}

export interface NotificationSetting {
  //
  id?: string;
  //
  notificationSettingType?: number;
}

export interface NotificationChannelCategorySetting {
  // Notification id
  id: string;
  //
  channelCategoryLabel: string;
  // Notification title
  notificationSettingType: number;
  //
  channelCategoryTitle: string;
  //
  action: number;
}

export interface UserEmojiUsage {
  userId: string;
  emojiId: string;
  clanId: string;
  createTime: string;
}

export interface AddFriend {
  //
  userId: string; // user id
  // username
  username: string;
  // display name
  displayName: string;
  // avatar
  avatar: string;
}
export interface RemoveFriend {
  //
  userId: string;
}

export interface BlockFriend {
  //
  userId: string;
}

export interface UnblockFriend {
  //
  userId: string;
  //
  username: string;
  //
  avatar: string;
  //
  displayName: string;
  //
  status: string;
  //
  userStatus: string;
}

export interface AddUserEmojiUsageEvent {
  emojiId: string;
  clanId: string;
}

/** Response cho ListUserEmojiUsage */
export interface GetUserEmojiUsageEvent {
  clanId: string;
  userEmojiUsage: Array<UserEmojiUsage>;
}

/** On role assign */
export interface RoleAssignedEvent {
  /** The clan of this role */
  ClanId: string;
  /** Role ID */
  roleId: string;
  /** UserIds Assigned */
  userIdsAssigned: string[];
  /** UserIds Removed */
  userIdsRemoved: string[];
}

/** Streaming Joined event */
export interface StreamingLeavedEvent {
  /** id */
  id: string;
  /** The unique identifier of the chat clan. */
  clanId: string;
  /** streaming channel name */
  streamingChannelId: string;
  /** streaming userId */
  streamingUserId: string;
}

/** Streaming Joined event */
export interface StreamingJoinedEvent {
  /** The unique identifier of the chat clan. */
  clanId: string;
  /** The channel name */
  clanName: string;
  /** id streaming */
  id: string;
  /** streaming participant */
  participant: string;
  /** user id */
  userId: string;
  /** streaming channel label */
  streamingChannelLabel: string;
  /** streaming channel id */
  streamingChannelId: string;
}

/** Streaming start event */
export interface StreamingStartedEvent {
  /** clan id */
  clanId: string;
  /** channel id */
  channelId: string;
  /** stream url */
  streamingUrl: string;
  /** status */
  isStreaming: boolean;
}

/** Streaming start event */
export interface StreamingEndedEvent {
  /** clan id */
  clanId: string;
  /** channel id */
  channelId: string;
}

export interface ChannelAppEvent {
  userId: string;
  username: string;
  clanId: string;
  channelId: string;
  action: number;
}

export interface HandleParticipantMeetStateEvent {
  /** clan id */
  clanId: string;
  /** channel id */
  channelId: string;
  /** display name */
  displayName: string;
  /** state (0: join, 1: leave) */
  state: number;
  /** room name */
  roomName: string;
}

export interface PermissionSet {
  /** Role ID */
  roleId: string;
  /** User ID */
  userId: string;
  /** Channel ID */
  channelId: string;
  /** List permission update */
  permissionUpdates: ApiPermissionUpdate[];
  /**  */
  caller: string;
}

export interface PermissionChangedEvent {
  userId: string;
  channelId: string;
  addPermissions: ApiPermissionUpdate[];
  removePermissions: ApiPermissionUpdate[];
  defaultPermissions: ApiPermissionUpdate[];
}

export interface DropdownBoxSelected {
  messageId: string;
  channelId: string;
  selectboxId: string;
  senderId: string;
  userId: string;
  value: Array<string>;
}

export interface MessageButtonClicked {
  messageId: string;
  channelId: string;
  buttonId: string;
  senderId: string;
  userId: string;
  extraData: string;
}

export interface IncomingCallPush {
  receiverId: string;
  jsonData: string;
  channelId: string;
  callerId: string;
}

export interface VoiceReactionSend {
  // list emojis
  emojis: Array<string>;
  // channelId
  channelId: string;
  // sender id
  senderId: string;
  // media type
  mediaType: number;
}

export interface MarkAsRead {
  // channel id
  channelId: string;
  // categoryId
  categoryId: string;
  // clan id
  clanId: string;
}

export interface WebrtcSignalingFwd {
  receiverId: string;
  dataType: number;
  jsonData: string;
  channelId: string;
  callerId: string;
}

export interface ListActivity {
  acts: ApiUserActivity[];
}

export interface SdTopicEvent {
  id: string;
  clanId: string;
  channelId: string;
  messageId: string;
  userId: string;
  lastSentMessage?: ApiChannelMessageHeader;
  message?: ApiChannelMessage;
}

export interface UserStatusEvent {
  userId: string;
  customStatus: string;
}

export interface JoinChannelAppData {
  userId: string;
  username: string;
  hash: string;
}

/**  */
export interface ChannelCanvas {
  //
  content?: string;
  //
  creatorId?: string;
  //
  editorId?: string;
  //
  id?: string;
  //
  isDefault?: boolean;
  //
  title?: string;
  //
  channelId?: string;
  //
  status?: number;
}

export interface ListDataSocket {
  api_name?: string;
  list_unread_msg_indicator_req?: any;
  unread_msg_indicator?: ApiListClanUnreadMsgIndicatorResponse;
  list_clan_req?: any;
  clan_desc_list?: ApiClanDescList;
  list_thread_req?: any;
  channel_desc_list?: ApiChannelDescList;
  list_channel_users_uc_req?: any;
  channel_users_uc_list?: ApiAllUsersAddChannelResponse;
  list_channel_detail_req?: any;
  channelDesc?: ApiChannelDescription;
  list_channel_req?: any;
  list_channel_message_req?: any;
  channel_message_list?: ApiChannelMessageList;
  list_channel_users_req?: any;
  voice_user_list?: ApiVoiceChannelUserList;
  channel_user_list?: ApiChannelUserList;
  list_channel_attachment_req?: any;
  channel_attachment_list?: ApiChannelAttachmentList;
  hashtag_dm_req?: any;
  hashtag_dm_list?: ApiHashtagDmList;
  channel_setting_req?: any;
  channelSettingList?: ApiChannelSettingListResponse;
  favorite_channel_req?: any;
  favorite_channel_list?: ApiListFavoriteChannelResponse;
  search_thread_req?: any;
  notification_channel?: ApiNotificationChannel;
  notificaion_user_channel?: ApiNotificationUserChannel;
  notification_category?: any;
  notification_clan?: any;
  notification_setting?: ApiNotificationSetting;
  notification_message?: ApiNotifiReactMessage;
  noti_channel_cat_setting_list?: ApiNotificationChannelCategorySettingList;
  list_notification_req?: any;
  notification_list?: ApiNotificationList;
  sticker_list?: ApiStickerListedResponse;
  emoji_recent_list?: ApiEmojiRecentList;
  clan_webhook_req?: any;
  clan_webhook_list?: ApiListClanWebhookResponse;
  webhook_list_req?: any;
  webhook_list?: ApiWebhookListResponse;
  permission_list_req?: any;
  permissionList?: ApiPermissionList;
  role_user_req?: any;
  roleUserList?: ApiRoleUserList;
  permission_user_req?: any;
  role_list?: ApiRoleList;
  role_list_event_req?: any;
  role_event_list?: ApiRoleListEventResponse;
  user_permission_req?: any;
  user_permission_list?: ApiUserPermissionInChannelListResponse;
  permission_role_req?: any;
  permission_role_list?: ApiPermissionRoleChannelListEventResponse;
  emojiList?: ApiEmojiListedResponse;
  list_friend_req?: any;
  friend_list?: ApiFriendList;
  list_apps_req?: any;
  channel_apps_list?: ApiListChannelAppsResponse;
  user_activity_list?: ApiListUserActivity;
}

function createChannelMessageFromEvent(message: any) {
  var content, reactions, mentions, attachments, references, referencedMessage;
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
  try {
    referencedMessage = safeJSONParse(
      message.channel_message.referenced_message
    );
  } catch (e) {
    console.log("referenced messages is invalid", e);
  }
  var channelMessage: ChannelMessage = {
    id: message.id || message.channel_message.message_id,
    avatar: message.channel_message.avatar,
    channelId: message.channel_message.channel_id,
    mode: message.channel_message.mode,
    channelLabel: message.channel_message.channel_label,
    clanId: message.channel_message.clan_id,
    code: message.channel_message.code,
    messageId: message.channel_message.message_id,
    senderId: message.channel_message.sender_id,
    clanLogo: message.channel_message.clan_logo,
    categoryName: message.channel_message.category_name,
    username: message.channel_message.username,
    clanNick: message.channel_message.clan_nick,
    clanAvatar: message.channel_message.clan_avatar,
    displayName: message.channel_message.display_name,
    content: content,
    reactions: reactions,
    mentions: mentions,
    attachments: attachments,
    referencedMessage: referencedMessage,
    references: references,
    hideEditted: message.channel_message.hide_editted,
    isPublic: message.channel_message.is_public,
    createTime: message.channel_message.create_time,
    updateTime: message.channel_message.update_time,
    createTimeSeconds: message.channel_message.create_time_seconds,
    updateTimeSeconds: message.channel_message.update_time_seconds,
    topicId: message.channel_message.topic_id,
  };

  return channelMessage;
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
  followUsers(userIds: string[]): Promise<Status>;

  /** Join clan chat */
  joinClanChat(clanId: string): Promise<ClanJoin>;

  follower(): Promise<void>;

  /** Join a chat channel on the server. */
  joinChat(
    clanId: string,
    channelId: string,
    channelType: number,
    isPublic: boolean
  ): Promise<Channel>;

  /** Leave a chat channel on the server. */
  leaveChat(
    clanId: string,
    channelId: string,
    channelType: number,
    isPublic: boolean
  ): Promise<void>;

  /** handle user join/leave channel voice on the server. */
  handleParticipantMeetState(
    clanId: string,
    channelId: string,
    displayName: string,
    state: number,
    roomName: string
  ): Promise<void>;

  /** Remove a chat message from a chat channel on the server. */
  removeChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    hasAttachment?: boolean,
    topicId?: string,
    mentions?: string,
    references?: string
  ): Promise<ChannelMessageAck>;

  /** Execute an RPC function to the server. */
  rpc(id?: string, payload?: string, httpKey?: string): Promise<ApiRpc>;

  /** Unfollow one or more users from their status updates. */
  unfollowUsers(userIds: string[]): Promise<void>;

  /** Update a chat message on a chat channel in the server. */
  updateChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topicId?: string,
    isUpdateMsgTopic?: boolean,
    oldMentions?: string
  ): Promise<ChannelMessageAck>;

  /** Update the status for the current user online. */
  updateStatus(status?: string): Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content?: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: boolean,
    avatar?: string,
    code?: number,
    topicId?: string,
    id?: string
  ): Promise<ChannelMessageAck>;

  /** Send a chat message to a chat channel on the server. */
  writeEphemeralMessage(
    receiverId: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content?: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: boolean,
    avatar?: string,
    code?: number,
    topicId?: string
  ): Promise<ChannelMessageAck>;

  /** Send a quick menu event to a chat channel on the server. */
  writeQuickMenuEvent(
    menuName: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content?: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: boolean,
    avatar?: string,
    code?: number,
    topicId?: string,
    id?: string
  ): Promise<QuickMenuEvent>;

  /** Send message typing */
  writeMessageTyping(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    senderDisplayName: string,
    topicId?: string
  ): Promise<MessageTypingEvent>;

  /** Send message reaction */
  writeMessageReaction(
    id: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    emojiId: string,
    emoji: string,
    count: number,
    messageSenderId: string,
    action_delete: boolean,
    topicId?: string,
    emojiRecentId?: string,
    senderName?: string
  ): Promise<ApiMessageReaction>;

  /** Send last seen message */
  writeLastSeenMessage(
    clanId: string,
    channelId: string,
    mode: number,
    messageId: string,
    timestampSeconds: number,
    badgeCount: number
  ): Promise<LastSeenMessageEvent>;

  /** Send last pin message */
  writeLastPinMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    timestampSeconds: number,
    operation: number,
    messageSenderAvatar: string,
    messageSenderId: string,
    messageSenderUsername: string,
    messageContent: string,
    messageAttachment: string,
    messageCreatedTime: string
  ): Promise<LastPinMessageEvent>;

  /** Send custom user status */
  writeCustomStatus(
    clanId: string,
    status: string,
    timeReset: number,
    noClear: boolean
  ): Promise<CustomStatusEvent>;

  writeActiveArchivedThread(clanId: string, channelId: string): Promise<void>;

  /* Set the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  setHeartbeatTimeoutMs(ms: number): void;

  /* Get the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  getHeartbeatTimeoutMs(): number;

  onreconnect: (evt: Event) => void;

  checkDuplicateName(
    name: string,
    condition_id: string,
    type: number,
    clanId: string
  ): Promise<CheckNameExistedEvent>;

  handleMessageButtonClick: (
    messageId: string,
    channelId: string,
    buttonId: string,
    senderId: string,
    userId: string,
    extraData: string
  ) => Promise<MessageButtonClicked>;

  handleDropdownBoxSelected: (
    messageId: string,
    channelId: string,
    selectboxId: string,
    senderId: string,
    userId: string,
    value: Array<string>
  ) => Promise<DropdownBoxSelected>;

  writeVoiceReaction: (
    emojis: Array<string>,
    channelId: string
  ) => Promise<VoiceReactionSend>;

  forwardWebrtcSignaling: (
    receiverId: string,
    dataType: number,
    jsonData: string,
    channelId: string,
    callerId: string
  ) => Promise<WebrtcSignalingFwd>;

  makeCallPush: (
    receiverId: string,
    jsonData: string,
    channelId: string,
    callerId: string
  ) => Promise<IncomingCallPush>;

  writeChannelAppEvent: (
    clanId: string,
    channelId: string,
    action: number
  ) => Promise<ChannelAppEvent>;

  listDataSocket(request: ListDataSocket): Promise<any>;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: Event) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: Event) => void;

  /** Receive notifications from the socket. */
  onnotification: (notification: ApiNotification) => void;

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

  oncanvasevent: (canvasEvent: ChannelCanvas) => void;

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

  onaddfriend: (user: AddFriend) => void;

  onremovefriend: (user: RemoveFriend) => void;

  onblockfriend: (user: BlockFriend) => void;

  onunblockfriend: (user: UnblockFriend) => void;

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

  oncategoryevent: (categoryEvent: CategoryEvent) => void;

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

  onvoicereactionmessage: (event: VoiceReactionSend) => void;

  onmarkasread: (event: MarkAsRead) => void;

  oneventcreated: (clan_event_created: ApiCreateEventRequest) => void;

  oncoffeegiven: (give_coffee_event: ApiGiveCoffeeEvent) => void;

  oneventemoji: (event_emoji: EventEmoji) => void;

  oneventnotiuserchannel: (
    noti_user_channel: ApiNotificationUserChannel
  ) => void;

  oneventwebhook: (webhook_event: ApiWebhook) => void;

  onroleassign: (role_assign_event: RoleAssignedEvent) => void;

  ondeleteaccount: (delete_account_event: DeleteAccountEvent) => void;

  onmeetparticipantevent: (event: MeetParticipantEvent) => void;

  onallowanonymousevent: (event: AllowAnonymousEvent) => void;

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

  onjoinchannelappevent: (join_channel_app_data: JoinChannelAppData) => void;

  onunpinmessageevent: (unpin_message_event: UnpinMessageEvent) => void;

  onquickmenuevent: (event: QuickMenuEvent) => void;

  ontransferownership: (event: TransferOwnershipEvent) => void;

  onbanneduser: (event: BannedUserEvent) => void;
}

/** Reports an error received from a socket message. */
export interface SocketError {
  /** The error code. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
}

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
let __hasConnectedOnce = false;

export const ConnectionState = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
} as const;

export type ConnectionStateType =
  (typeof ConnectionState)[keyof typeof ConnectionState];

export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;
  private _connectionState: ConnectionStateType;
  private _heartbeatTimer?: ReturnType<typeof setTimeout>;
  private _connectTimeoutTimer?: ReturnType<typeof setTimeout>;
  private _connectPromise?: Promise<Session>;

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
    this._connectionState = ConnectionState.DISCONNECTED;
  }

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  isOpen(): boolean {
    return this._connectionState === ConnectionState.CONNECTED;
  }

  connect(
    session: Session,
    createStatus: boolean = false,
    platform: string = "",
    connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs,
    signal?: AbortSignal
  ): Promise<Session> {
    if (this._connectionState === ConnectionState.CONNECTED) {
      return Promise.resolve(session);
    }

    if (
      this._connectionState === ConnectionState.CONNECTING &&
      this._connectPromise
    ) {
      return this._connectPromise;
    }

    this.clearConnectTimeout();
    this._connectionState = ConnectionState.CONNECTING;

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
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      this.clearConnectTimeout();
      this.ondisconnect(evt);
    };

    this.adapter.onMessage = async (message: any) => {
      console.log("message:", message);

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
          this.onvoicestarted(mapToCamelCase(message.voice_started_event));
        } else if (message.voice_ended_event) {
          this.onvoiceended(mapToCamelCase(message.voice_ended_event));
        } else if (message.voice_joined_event) {
          this.onvoicejoined(mapToCamelCase(message.voice_joined_event));
        } else if (message.voice_leaved_event) {
          this.onvoiceleaved(mapToCamelCase(message.voice_leaved_event));
        } else if (message.channel_created_event) {
          this.onchannelcreated(mapToCamelCase(message.channel_created_event));
        } else if (message.category_event) {
          this.oncategoryevent(mapToCamelCase(message.category_event));
        } else if (message.role_event) {
          this.onroleevent(mapToCamelCase(message.role_event));
        } else if (message.event_emoji) {
          this.oneventemoji(mapToCamelCase(message.event_emoji));
        } else if (message.noti_user_channel) {
          this.oneventnotiuserchannel(
            mapToCamelCase(message.noti_user_channel)
          );
        } else if (message.webhook_event) {
          this.oneventwebhook(mapToCamelCase(message.webhook_event));
        } else if (message.channel_deleted_event) {
          this.onchanneldeleted(mapToCamelCase(message.channel_deleted_event));
        } else if (message.clan_deleted_event) {
          this.onclandeleted(mapToCamelCase(message.clan_deleted_event));
        } else if (message.sticker_create_event) {
          this.onstickercreated(mapToCamelCase(message.sticker_create_event));
        } else if (message.sticker_update_event) {
          this.onstickerupdated(mapToCamelCase(message.sticker_update_event));
        } else if (message.sticker_delete_event) {
          this.onstickerdeleted(mapToCamelCase(message.sticker_delete_event));
        } else if (message.channel_updated_event) {
          this.onchannelupdated(mapToCamelCase(message.channel_updated_event));
        } else if (message.delete_account_event) {
          this.ondeleteaccount(mapToCamelCase(message.delete_account_event));
        } else if (message.clan_profile_updated_event) {
          this.onclanprofileupdated(
            mapToCamelCase(message.clan_profile_updated_event)
          );
        } else if (message.clan_updated_event) {
          this.onclanupdated(mapToCamelCase(message.clan_updated_event));
        } else if (message.last_seen_message_event) {
          this.onlastseenupdated(
            mapToCamelCase(message.last_seen_message_event)
          );
        } else if (message.status_presence_event) {
          this.onstatuspresence(
            mapToCamelCase(<StatusPresenceEvent>message.status_presence_event)
          );
        } else if (message.stream_presence_event) {
          this.onstreampresence(
            mapToCamelCase(<StreamPresenceEvent>message.stream_presence_event)
          );
        } else if (message.stream_data) {
          this.onstreamdata(mapToCamelCase(<StreamData>message.stream_data));
        } else if (message.channel_message) {
          console.log("message.channel_message:", message.channel_message);
          const channelMessage = createChannelMessageFromEvent(message);
          this.onchannelmessage(mapToCamelCase(channelMessage));
        } else if (message.message_typing_event) {
          this.onmessagetyping(
            mapToCamelCase(<MessageTypingEvent>message.message_typing_event)
          );
        } else if (message.message_reaction_event) {
          this.onmessagereaction(
            mapToCamelCase(<ApiMessageReaction>message.message_reaction_event)
          );
        } else if (message.channel_presence_event) {
          this.onchannelpresence(
            mapToCamelCase(<ChannelPresenceEvent>message.channel_presence_event)
          );
        } else if (message.last_pin_message_event) {
          this.onpinmessage(
            mapToCamelCase(<LastPinMessageEvent>message.last_pin_message_event)
          );
        } else if (message.custom_status_event) {
          this.oncustomstatus(
            mapToCamelCase(<CustomStatusEvent>message.custom_status_event)
          );
        } else if (message.canvas_event) {
          this.oncanvasevent(
            mapToCamelCase(<ChannelCanvas>message.canvas_event)
          );
        } else if (message.user_channel_added_event) {
          this.onuserchanneladded(
            mapToCamelCase(
              <UserChannelAddedEvent>message.user_channel_added_event
            )
          );
        } else if (message.add_clan_user_event) {
          this.onuserclanadded(
            mapToCamelCase(<AddClanUserEvent>message.add_clan_user_event)
          );
        } else if (message.user_profile_updated_event) {
          this.onuserprofileupdate(
            mapToCamelCase(
              <UserProfileUpdatedEvent>message.user_profile_updated_event
            )
          );
        } else if (message.user_channel_removed_event) {
          this.onuserchannelremoved(
            mapToCamelCase(
              <UserChannelRemovedEvent>message.user_channel_removed_event
            )
          );
        } else if (message.block_friend) {
          this.onblockfriend(mapToCamelCase(<BlockFriend>message.block_friend));
        } else if (message.un_block_friend) {
          this.onunblockfriend(
            mapToCamelCase(<UnblockFriend>message.un_block_friend)
          );
        } else if (message.add_friend) {
          this.onaddfriend(mapToCamelCase(<AddFriend>message.add_friend));
        } else if (message.remove_friend) {
          this.onremovefriend(
            mapToCamelCase(<RemoveFriend>message.remove_friend)
          );
        } else if (message.user_clan_removed_event) {
          this.onuserclanremoved(
            mapToCamelCase(
              <UserClanRemovedEvent>message.user_clan_removed_event
            )
          );
        } else if (message.clan_event_created) {
          this.oneventcreated(mapToCamelCase(message.clan_event_created));
        } else if (message.give_coffee_event) {
          this.oncoffeegiven(
            mapToCamelCase(<ApiGiveCoffeeEvent>message.give_coffee_event)
          );
        } else if (message.role_assign_event) {
          this.onroleassign(
            mapToCamelCase(<RoleAssignedEvent>message.role_assign_event)
          );
        } else if (message.streaming_started_event) {
          this.onstreamingchannelstarted(
            mapToCamelCase(
              <StreamingStartedEvent>message.streaming_started_event
            )
          );
        } else if (message.streaming_ended_event) {
          this.onstreamingchannelended(
            mapToCamelCase(<StreamingEndedEvent>message.streaming_ended_event)
          );
        } else if (message.streaming_joined_event) {
          this.onstreamingchanneljoined(
            mapToCamelCase(<StreamingJoinedEvent>message.streaming_joined_event)
          );
        } else if (message.streaming_leaved_event) {
          this.onstreamingchannelleaved(
            mapToCamelCase(<StreamingLeavedEvent>message.streaming_leaved_event)
          );
        } else if (message.permission_set_event) {
          this.onpermissionset(
            mapToCamelCase(<PermissionSet>message.permission_set_event)
          );
        } else if (message.permission_changed_event) {
          this.onpermissionchanged(
            mapToCamelCase(
              <PermissionChangedEvent>message.permission_changed_event
            )
          );
        } else if (message.unmute_event) {
          this.onunmuteevent(mapToCamelCase(<UnmuteEvent>message.unmute_event));
        } else if (message.token_sent_event) {
          this.ontokensent(
            mapToCamelCase(<ApiTokenSentEvent>message.token_sent_event)
          );
        } else if (message.message_button_clicked) {
          this.onmessagebuttonclicked(
            mapToCamelCase(<MessageButtonClicked>message.message_button_clicked)
          );
        } else if (message.dropdown_box_selected) {
          this.onmessagedropdownboxselected(
            mapToCamelCase(<DropdownBoxSelected>message.dropdown_box_selected)
          );
        } else if (message.mark_as_read) {
          this.onmarkasread(mapToCamelCase(<MarkAsRead>message.mark_as_read));
        } else if (message.voice_reaction_send) {
          this.onvoicereactionmessage(
            mapToCamelCase(<VoiceReactionSend>message.voice_reaction_send)
          );
        } else if (message.webrtc_signaling_fwd) {
          this.onwebrtcsignalingfwd(
            mapToCamelCase(<WebrtcSignalingFwd>message.webrtc_signaling_fwd)
          );
        } else if (message.list_activity) {
          this.onactivityupdated(
            mapToCamelCase(<ListActivity>message.list_activity)
          );
        } else if (message.sd_topic_event) {
          this.onsdtopicevent(
            mapToCamelCase(<SdTopicEvent>message.sd_topic_event)
          );
        } else if (message.channel_app_event) {
          this.onchannelappevent(
            mapToCamelCase(<ChannelAppEvent>message.channel_app_event)
          );
        } else if (message.user_status_event) {
          this.onuserstatusevent(
            mapToCamelCase(<UserStatusEvent>message.user_status_event)
          );
        } else if (message.join_channel_app_data) {
          this.onjoinchannelappevent(
            mapToCamelCase(<JoinChannelAppData>message.join_channel_app_data)
          );
        } else if (message.unpin_message_event) {
          this.onunpinmessageevent(
            mapToCamelCase(<UnpinMessageEvent>message.unpin_message_event)
          );
        } else if (message.quick_menu_event) {
          this.onquickmenuevent(
            mapToCamelCase(<QuickMenuEvent>message.quick_menu_event)
          );
        } else if (message.meet_participant_event) {
          this.onmeetparticipantevent(
            mapToCamelCase(<MeetParticipantEvent>message.meet_participant_event)
          );
        } else if (message.transfer_ownership_event) {
          this.ontransferownership(
            mapToCamelCase(
              <TransferOwnershipEvent>message.transfer_ownership_event
            )
          );
        } else if (message.ban_user_event) {
          this.onbanneduser(
            mapToCamelCase(<BannedUserEvent>message.ban_user_event)
          );
        } else if (message.allow_anonymous_event) {
          this.onallowanonymousevent(
            mapToCamelCase(<AllowAnonymousEvent>message.allow_anonymous_event)
          );
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

    const connectPromise = new Promise<Session>((resolve, reject) => {
      this.adapter.onOpen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }

        const isReconnect = __hasConnectedOnce;
        __hasConnectedOnce = true;

        this.clearConnectTimeout();
        this._connectionState = ConnectionState.CONNECTED;
        this.startHeartbeatLoop();
        this._connectPromise = undefined;

        resolve(session);

        if (isReconnect) {
          this.onreconnect(evt);
        }
      };
      this.adapter.onError = (evt: Event) => {
        this._connectionState = ConnectionState.DISCONNECTED;
        this.stopHeartbeatLoop();
        this.clearConnectTimeout();
        this.onerror(evt);
        this._connectPromise = undefined;
        this.adapter.close();
        reject(evt);
      };

      this._connectTimeoutTimer = setTimeout(() => {
        // if promise has resolved by now, the reject() is a no-op
        this._connectionState = ConnectionState.DISCONNECTED;
        this.stopHeartbeatLoop();
        this.adapter.close();
        this._connectPromise = undefined;
        reject("The socket timed out when trying to connect.");
        this._connectTimeoutTimer = undefined;
      }, connectTimeoutMs);
    });

    this._connectPromise = connectPromise;
    return this._connectPromise;
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
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

  onreconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  ondisconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onerror(evt: Event) {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
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

  onaddfriend(user: AddFriend) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onremovefriend(user: RemoveFriend) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onblockfriend(user: BlockFriend) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onunblockfriend(user: UnblockFriend) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserclanremoved(user: UserClanRemovedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onnotification(notification: ApiNotification) {
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

  oncategoryevent(categoryEvent: CategoryEvent) {
    if (this.verbose && window && window.console) {
      console.log(categoryEvent);
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

  ondeleteaccount(deleteAccountEvent: DeleteAccountEvent) {
    if (this.verbose && window && window.console) {
      console.log(deleteAccountEvent);
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

  oncanvasevent(canvasEvent: ChannelCanvas) {
    if (this.verbose && window && window.console) {
      console.log(canvasEvent);
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

  onmarkasread(event: MarkAsRead) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onvoicereactionmessage(event: VoiceReactionSend) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onwebrtcsignalingfwd(event: WebrtcSignalingFwd) {
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

  onjoinchannelappevent(join_channel_app_data: JoinChannelAppData) {
    if (this.verbose && window && window.console) {
      console.log(join_channel_app_data);
    }
  }

  onunpinmessageevent(unpin_message_event: UnpinMessageEvent) {
    if (this.verbose && window && window.console) {
      console.log(unpin_message_event);
    }
  }

  onquickmenuevent(event: QuickMenuEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  ontransferownership(event: TransferOwnershipEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onbanneduser(event: BannedUserEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onmeetparticipantevent(event: MeetParticipantEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  onallowanonymousevent(event: AllowAnonymousEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
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
      | ChannelAppEvent
      | EphemeralMessageSend
      | VoiceReactionSend
      | ListDataSocket
      | QuickMenuEvent,
    sendTimeout = DefaultSocket.DefaultSendTimeoutMs
  ): Promise<any> {
    console.log("Sending message:", message);
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          console.log(
            "untypedMessage.channel_message_send:",
            untypedMessage.channel_message_send
          );
          untypedMessage.channel_message_send.content = JSON.stringify(
            untypedMessage.channel_message_send.content
          );
          console.log(
            "untypedMessage.channel_message_send.content:",
            untypedMessage.channel_message_send.content
          );
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(
            untypedMessage.channel_message_update.content
          );
        } else if (untypedMessage.ephemeral_message_send) {
          untypedMessage.ephemeral_message_send.message.content =
            JSON.stringify(
              untypedMessage.ephemeral_message_send.message?.content
            );
        } else if (untypedMessage.quick_menu_event) {
          untypedMessage.quick_menu_event.message.content = JSON.stringify(
            untypedMessage.quick_menu_event.message?.content
          );
        }

        const cid = this.generatecid();
        this.cIds[cid] = { resolve, reject };
        if (sendTimeout !== Infinity && sendTimeout > 0) {
          setTimeout(() => {
            reject("The socket timed out while waiting for a response.");
          }, sendTimeout);
        }

        untypedMessage.cid = cid;
        console.log("untypedMessage:", untypedMessage);
        this.adapter.send(untypedMessage);
      }
    });
  }

  async followUsers(userIds: string[]): Promise<Status> {
    const response = await this.send({ status_follow: { user_ids: userIds } });
    return mapToCamelCase(response.status);
  }

  async joinClanChat(clanId: string): Promise<ClanJoin> {
    const response = await this.send({
      clan_join: {
        clan_id: clanId,
      },
    });

    return mapToCamelCase(response.clanJoin);
  }

  async follower(): Promise<void> {
    const response = await this.send({
      follow_event: {},
    });

    return mapToCamelCase(response.followEvent);
  }

  async joinChat(
    clanId: string,
    channelId: string,
    channelType: number,
    isPublic: boolean
  ): Promise<Channel> {
    const response = await this.send({
      channel_join: {
        clan_id: clanId,
        channel_id: channelId,
        channel_type: channelType,
        is_public: isPublic,
      },
    });

    return mapToCamelCase(response.channel);
  }

  async handleParticipantMeetState(
    clanId: string,
    channelId: string,
    displayName: string,
    state: number,
    roomName: string
  ): Promise<void> {
    const response = await this.send({
      handle_participant_meet_state_event: {
        clan_id: clanId,
        channel_id: channelId,
        display_name: displayName,
        state: state,
        room_name: roomName,
      },
    });

    return mapToCamelCase(response.handleParticipantMeetStateEvent);
  }

  leaveChat(
    clanId: string,
    channelId: string,
    channelType: number,
    isPublic: boolean
  ): Promise<void> {
    return this.send({
      channel_leave: {
        clan_id: clanId,
        channel_id: channelId,
        channel_type: channelType,
        is_public: isPublic,
      },
    });
  }

  async removeChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    hasAttachment?: boolean,
    topicId?: string,
    mentions?: string,
    references?: string
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      channel_message_remove: {
        clan_id: clanId,
        channel_id: channelId,
        mode: mode,
        message_id: messageId,
        is_public: isPublic,
        has_attachment: hasAttachment,
        topic_id: topicId,
        mentions: mentions,
        references: references,
      },
    });

    return mapToCamelCase(response.channel_message_ack);
  }

  async rpc(id?: string, payload?: string, httpKey?: string): Promise<ApiRpc> {
    const response = await this.send({
      rpc: {
        id: id,
        payload: payload,
        http_key: httpKey,
      },
    });

    return mapToCamelCase(response.rpc);
  }

  unfollowUsers(userIds: string[]): Promise<void> {
    return this.send({ status_unfollow: { user_ids: userIds } });
  }

  async updateChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topicId?: string,
    isUpdateMsgTopic?: boolean,
    oldMentions?: string
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      channel_message_update: {
        clanId: clanId,
        channelId: channelId,
        messageId: messageId,
        content: content,
        mentions: mapToSnakeCase(mentions),
        attachments: mapToSnakeCase(attachments),
        mode: mode,
        isPublic: isPublic,
        hideEditted: hideEditted,
        topicId: topicId,
        isUpdateMsgTopic: isUpdateMsgTopic,
        oldMentions: oldMentions,
      },
    });
    return mapToCamelCase(response.channel_message_ack);
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({ status_update: { status: status } });
  }

  async writeQuickMenuEvent(
    menuName: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: Boolean,
    avatar?: string,
    code?: number,
    topicId?: string
  ): Promise<QuickMenuEvent> {
    const response = await this.send({
      quick_menu_event: {
        menuName: menuName,
        message: {
          clan_id: clanId,
          channel_id: channelId,
          mode: mode,
          is_public: isPublic,
          content: content,
          mentions: mapToSnakeCase(mentions),
          attachments: mapToSnakeCase(attachments),
          references: mapToSnakeCase(references),
          anonymous_message: anonymousMessage,
          mention_everyone: mentionEveryone,
          avatar: avatar,
          code: code,
          topic_id: topicId,
        },
      },
    });
    return mapToCamelCase(response.quick_menu_event);
  }

  async writeEphemeralMessage(
    receiverId: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: Boolean,
    avatar?: string,
    code?: number,
    topicId?: string,
    id?: string
  ): Promise<ChannelMessageAck> {
    const response = await this.send({
      ephemeral_message_send: {
        receiver_id: receiverId,
        message: {
          clan_id: clanId,
          channel_id: channelId,
          mode: mode,
          is_public: isPublic,
          content: content,
          mentions: mapToSnakeCase(mentions),
          attachments: mapToSnakeCase(attachments),
          references: mapToSnakeCase(references),
          anonymous_message: anonymousMessage,
          mention_everyone: mentionEveryone,
          avatar: avatar,
          code: code,
          topic_id: topicId,
          id: id,
        },
      },
    });
    return mapToCamelCase(response.ephemeral_message_send);
  }

  async writeChatMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: Boolean,
    avatar?: string,
    code?: number,
    topicId?: string
  ): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_send: {
          clan_id: clanId,
          channel_id: channelId,
          mode: mode,
          is_public: isPublic,
          content: content,
          mentions: mapToSnakeCase(mentions),
          attachments: mapToSnakeCase(attachments),
          references: mapToSnakeCase(references),
          anonymous_message: anonymousMessage,
          mention_everyone: mentionEveryone,
          avatar: avatar,
          code: code,
          topic_id: topicId,
        },
      },
      Infinity
    );
    return mapToCamelCase(response.channel_message_ack);
  }

  async writeMessageReaction(
    id: string,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    emojiId: string,
    emoji: string,
    count: number,
    messageSenderId: string,
    action_delete: boolean,
    topicId?: string,
    emojiRecentId?: string,
    senderName?: string
  ): Promise<ApiMessageReaction> {
    const response = await this.send({
      message_reaction_event: {
        id: id,
        clanId: clanId,
        channelId: channelId,
        mode: mode,
        isPublic: isPublic,
        messageId: messageId,
        emojiId: emojiId,
        emoji: emoji,
        count: count,
        messageSenderId: messageSenderId,
        action: action_delete,
        topicId: topicId,
        emojiRecentId: emojiRecentId,
        senderName: senderName,
      },
    });
    return mapToCamelCase(response.message_reaction_event);
  }

  async writeMessageTyping(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    senderDisplayName: string,
    topicId?: string
  ): Promise<MessageTypingEvent> {
    const response = await this.send({
      message_typing_event: {
        clan_id: clanId,
        channel_id: channelId,
        mode: mode,
        is_public: isPublic,
        sender_display_name: senderDisplayName,
        topic_id: topicId,
      },
    });
    return mapToCamelCase(response.message_typing_event);
  }

  async writeLastSeenMessage(
    clanId: string,
    channelId: string,
    mode: number,
    messageId: string,
    timestampSeconds: number,
    badgeCount: number
  ): Promise<LastSeenMessageEvent> {
    const response = await this.send({
      last_seen_message_event: {
        clan_id: clanId,
        channel_id: channelId,
        mode: mode,
        message_id: messageId,
        timestamp_seconds: timestampSeconds,
        badge_count: badgeCount,
      },
    });
    return mapToCamelCase(response.last_seen_message_event);
  }

  async writeLastPinMessage(
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    timestampSeconds: number,
    operation: number,
    messageSenderAvatar: string,
    messageSenderId: string,
    messageSenderUsername: string,
    messageContent: string,
    messageAttachment: string,
    messageCreatedTime: string
  ): Promise<LastPinMessageEvent> {
    const response = await this.send({
      last_pin_message_event: {
        clan_id: clanId,
        channel_id: channelId,
        mode: mode,
        is_public: isPublic,
        message_id: messageId,
        timestamp_seconds: timestampSeconds,
        operation: operation,
        message_sender_avatar: messageSenderAvatar,
        message_sender_id: messageSenderId,
        message_sender_username: messageSenderUsername,
        message_content: messageContent,
        message_attachment: messageAttachment,
        message_created_time: messageCreatedTime,
      },
    });
    return mapToCamelCase(response.last_pin_message_event);
  }

  async writeCustomStatus(
    clanId: string,
    status: string,
    timeReset: number,
    noClear: boolean
  ): Promise<CustomStatusEvent> {
    const response = await this.send({
      custom_status_event: {
        clan_id: clanId,
        status: status,
        time_reset: timeReset,
        no_clear: noClear,
      },
    });
    return mapToCamelCase(response.custom_status_event);
  }

  async writeActiveArchivedThread(
    clanId: string,
    channelId: string
  ): Promise<void> {
    const response = await this.send({
      active_archived_thread: {
        clan_id: clanId,
        channel_id: channelId,
      },
    });
    return response.active_archived_thread;
  }

  async checkDuplicateName(
    name: string,
    condition_id: string,
    type: number,
    clanId: string
  ): Promise<CheckNameExistedEvent> {
    const response = await this.send({
      check_name_existed_event: {
        name: name,
        condition_id: condition_id,
        type: type,
        clan_id: clanId,
      },
    });
    return mapToCamelCase(response.check_name_existed_event);
  }

  async writeVoiceReaction(
    emojis: Array<string>,
    channelId: string
  ): Promise<VoiceReactionSend> {
    const response = await this.send({
      voice_reaction_send: {
        emojis: emojis,
        channel_id: channelId,
      },
    });
    return mapToCamelCase(response.voice_reaction_send);
  }

  async forwardWebrtcSignaling(
    receiverId: string,
    dataType: number,
    jsonData: string,
    channelId: string,
    callerId: string
  ): Promise<WebrtcSignalingFwd> {
    const response = await this.send({
      webrtc_signaling_fwd: {
        receiver_id: receiverId,
        data_type: dataType,
        json_data: jsonData,
        channel_id: channelId,
        caller_id: callerId,
      },
    });
    return mapToCamelCase(response.webrtc_signaling_fwd);
  }

  async makeCallPush(
    receiverId: string,
    jsonData: string,
    channelId: string,
    callerId: string
  ): Promise<IncomingCallPush> {
    const response = await this.send({
      incoming_call_push: {
        receiver_id: receiverId,
        json_data: jsonData,
        channel_id: channelId,
        caller_id: callerId,
      },
    });
    return mapToCamelCase(response.incoming_call_push);
  }

  async handleDropdownBoxSelected(
    messageId: string,
    channelId: string,
    selectboxId: string,
    senderId: string,
    userId: string,
    value: Array<string>
  ): Promise<DropdownBoxSelected> {
    const response = await this.send({
      dropdown_box_selected: {
        message_id: messageId,
        channel_id: channelId,
        selectbox_id: selectboxId,
        sender_id: senderId,
        user_id: userId,
        value: value,
      },
    });
    return mapToCamelCase(response.dropdown_box_selected);
  }

  async handleMessageButtonClick(
    messageId: string,
    channelId: string,
    buttonId: string,
    senderId: string,
    userId: string,
    extraData: string
  ): Promise<MessageButtonClicked> {
    const response = await this.send({
      message_button_clicked: {
        message_id: messageId,
        channel_id: channelId,
        button_id: buttonId,
        sender_id: senderId,
        user_id: userId,
        extra_data: extraData,
      },
    });
    return mapToCamelCase(response.webrtc_signaling_fwd);
  }

  async writeChannelAppEvent(
    clanId: string,
    channelId: string,
    action: number
  ): Promise<ChannelAppEvent> {
    const response = await this.send({
      channel_app_event: {
        clan_id: clanId,
        channel_id: channelId,
        action: action,
      },
    });
    return mapToCamelCase(response.channel_app_event);
  }

  async listDataSocket(request: ListDataSocket): Promise<any> {
    const response = await this.send({
      list_data_socket: mapToSnakeCase(request),
    });
    return mapToCamelCase(response.list_data_socket);
  }

  private async pingPong(): Promise<void> {
    if (!this.isOpen()) {
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      return;
    }

    try {
      await this.send({ ping: {} }, this._heartbeatTimeoutMs);
    } catch {
      this._connectionState = ConnectionState.DISCONNECTED;
      this.stopHeartbeatLoop();
      if (this.adapter.isOpen()) {
        if (window && window.console) {
          console.error("Server unreachable from heartbeat.");
        }
        this.onheartbeattimeout();
        this.adapter.close();
      }

      return;
    }

    this.startHeartbeatLoop();
  }

  private startHeartbeatLoop() {
    this.stopHeartbeatLoop();
    this._heartbeatTimer = setTimeout(
      () => this.pingPong(),
      this._heartbeatTimeoutMs
    );
  }

  private stopHeartbeatLoop() {
    if (this._heartbeatTimer !== undefined) {
      clearTimeout(this._heartbeatTimer);
      this._heartbeatTimer = undefined;
    }
  }

  private clearConnectTimeout() {
    if (this._connectTimeoutTimer !== undefined) {
      clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = undefined;
    }
  }
}
