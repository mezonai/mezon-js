import { ClanBadgeCount, DirectFcmProto } from "mezon-js-protobuf";

export interface PromiseExecutor {
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
  // user status
  user_status: string;
}

export interface NotificationInfo {
  /** Category code for this notification. */
  code?: number;
  /** Content of the notification in JSON. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  content?: {};
  /** The UNIX time when the notification was created. */
  create_time_seconds?: number;
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
  //
  topic_id?: string;
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
export interface ChannelJoin {
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
export interface ChannelLeave {
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
  user: UserProfile;
  invitor: string;
}

export interface BannedUserEvent {
  user_ids: Array<string>;
  action: number;
  banner_id: string;
  channel_id: string;
  clan_id: string;
  ban_time: number;
}

export interface ListChannelUsersBannedEvent {
  banned_user_ids: Array<string>;
}

export interface AiAgentEnabledEvent {
  clan_id: string;
  channel_id: string;
  enabled: boolean;
}

export interface UserProfile {
  /** User IDs to follow. */
  user_id: string;
  /** Username to follow. */
  username: string;
  /** Avatar to follow. */
  avatar: string;
  /** Display name */
  display_name: string;
  /** custom status */
  custom_status: string;
  /** online */
  online: boolean;
  // create time
  create_time_second: number;
  /** clans */
  joined_clans: number[];
  // app url
  app_url: string;
  // is bot
  is_bot: boolean;
}

/** UserChannelAddedEvent */
export interface UserChannelAddedEvent {
  // the channel id
  channel_desc: ChannelDescription;
  // the user
  users: UserProfile[];
  // the custom status
  status: string;
  // the clan id
  clan_id: string;
  //
  caller: UserProfile;
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
  // badge_count
  badge_counts: number[];
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
  // avatar
  message_sender_avatar: string;
  // message sender id
  message_sender_id: string;
  // message sender username
  message_sender_username: string;
  // message content
  message_content: string;
  // attachment
  message_attachment: string;
  // create time
  message_created_time: string;
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
  //
  badge_count: number;
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
  // sender username
  sender_username: string;
  // sender display name
  sender_display_name: string;
  // topic id
  topic_id?: string;
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
export interface ChannelMessageSend {
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

export interface TransferOwnershipEvent {
  clan_id: string;
  prev_owner: string;
  curr_owner: string;
}

export interface QuickMenuEvent {
  quick_menu_event: {
    menu_name: string;
    message: {
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
  };
}

export interface EphemeralMessageSend {
  ephemeral_message_send: {
    receiver_ids: string[];
    message: {
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
  };
}

/** Update a message previously sent to a realtime chat channel. */
export interface ChannelMessageUpdate {
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
    //
    old_mentions?: string;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
export interface ChannelMessageRemove {
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
    // mentions
    mentions: string;
    // references
    references: string;
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

export interface UnpinMessageEvent {
  id: string;
  message_id: string;
  channel_id: string;
  clan_id: string;
}

export interface ChannelUpdatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parent_id
  parent_id: string;
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
  // channel private
  channel_private: number;
  // is error
  is_error: boolean;
  // app url
  app_id: string;
  // e2ee
  e2ee: number;
  //
  topic: string;
  //
  age_restricted: number;
  //
  is_active_thread: boolean;
  //
  active: number;
  //
  count_mess_unread: number;
  //
  role_ids?: Array<string>;
  // The users to add.
  user_ids?: Array<string>;
  // channel avatar
  channel_avatar: string;
}

export interface DeleteAccountEvent {
  // user id
  user_id: string;
}

export interface ChannelCreatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parent_id
  parent_id: string;
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
  app_id: string;
  // clan_name
  clan_name: string;
  // channel avatar
  channel_avatar: string;
}

export interface CategoryEvent {
  // clan id
  clan_id: string;
  // category
  id: string;
  // creator
  creator_id: string;
  // category_name
  category_name: string;
  // status
  status: number;
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
  // parent id
  parent_id: string;
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
  // onboarding_banner.
  onboarding_banner: string;
  // about
  about: string;
  // prevent anonymous
  prevent_anonymous: boolean;
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

export interface MeetParticipantEvent {
  username: string;
  room_name: string;
  channel_id: string;
  clan_id: string;
  action: number;
}

export interface AllowAnonymousEvent {
  clan_id: string;
  allow: boolean;
}

/** Application-level heartbeat ping. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Ping {}

/** A snapshot of statuses for some set of users. */
export interface Status {
  /** The user presences to view statuses of. */
  presences: Presence[];
}

/** Start receiving status updates for some set of users. */
export interface StatusFollow {
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
export interface StatusUnfollow {
  /** The IDs of user to unfollow. */
  status_unfollow: { user_ids: string[] };
}

/** Set the user's own status. */
export interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status_update: { status?: string };
}
export interface CheckNameExistedEvent {
  clan_name: string;
  exist: boolean;
  condition_id: string;
  type: number;
  clan_id: string;
}

/**  */
export interface ClanSticker {
  //
  category?: string;
  //
  clan_id?: string;
  //
  create_time_seconds?: number;
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
  //
  is_for_sale?: boolean;
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
  is_for_sale: boolean;
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
  //
  is_for_sale?: boolean;
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
  parent_id?: string;
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
  parent_id?: string;
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

export interface AddFriend {
  //
  user_id: string; // user id
  // username
  username: string;
  // display name
  display_name: string;
  // avatar
  avatar: string;
}
export interface RemoveFriend {
  //
  user_id: string;
}

export interface BlockFriend {
  //
  user_id: string;
}

export interface UnblockFriend {
  //
  user_id: string;
  //
  username: string;
  //
  avatar: string;
  //
  display_name: string;
  //
  status: string;
  //
  user_status: string;
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

export interface HandleParticipantMeetStateEvent {
  /** clan id */
  clan_id: string;
  /** channel id */
  channel_id: string;
  /** display name */
  display_name: string;
  /** state (0: join, 1: leave) */
  state: number;
  /** room name */
  room_name: string;
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

export interface VoiceReactionSend {
  // list emojis
  emojis: Array<string>;
  // channel_id
  channel_id: string;
  // sender id
  sender_id: string;
  // media type
  media_type: number;
}

export interface MarkAsRead {
  // channel id
  channel_id: string;
  // category_id
  category_id: string;
  // clan id
  clan_id: string;
}

export interface WebrtcSignalingFwd {
  receiver_id: string;
  data_type: number;
  json_data: string;
  channel_id: string;
  caller_id: string;
}

export interface ListActivity {
  acts: ApiUserActivity[];
}

export interface SdTopicEvent {
  id: string;
  clan_id: string;
  channel_id: string;
  message_id: string;
  user_id: string;
  last_sent_message?: ApiChannelMessageHeader;
  message?: ChannelMessage;
}

export interface UserStatusEvent {
  user_id: string;
  custom_status: string;
}

export interface JoinChannelAppData {
  user_id: string;
  username: string;
  hash: string;
}

/**  */
export interface ChannelCanvas {
  //
  content?: string;
  //
  creator_id?: string;
  //
  editor_id?: string;
  //
  id?: string;
  //
  is_default?: boolean;
  //
  title?: string;
  //
  channel_id?: string;
  //
  status?: number;
}

export interface ApiListChannelBadgeCountRequest {
  clan_id?: string;
}

export interface ApiListUserOnlineRequest {
  clan_id?: string;
}

export interface ApiLogedDevice {
  device_id?: string;
  device_name?: string;
  login_at_seconds?: number;
  status?: number;
  platform?: string;
  ip?: string;
  last_active_seconds?: string;
  location?: string;
  is_current?: boolean;
}

export interface ApiLogedDeviceList {
  devices?: Array<ApiLogedDevice>;
}

export interface ApiLogedDeviceList {}

export interface ApiListChannelBadgeCountResponse {
  channeldesc?: Array<ApiChannelDescription>;
}

export interface ApiListClanBadgeCountResponse {
  list_badge?: Array<ClanBadgeCount>;
}

export interface ListDataSocket {
  api_name?: string;
  list_channel_badge_count_req?: ApiListChannelBadgeCountRequest;
  channel_badge_count?: ApiListChannelBadgeCountResponse;
  clan_badge_count?: ApiListClanBadgeCountResponse;
  list_loged_device?: ApiLogedDeviceList;
  list_user_online_req?: ApiListUserOnlineRequest;
  user_online_list?: ApiListUserOnlineResponse;
}

export interface ApiListChannelTimelineRequest {
  clan_id: string;
  channel_id: string;
  year: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
}

export interface ApiCreateChannelTimelineRequest {
  clan_id: string;
  channel_id: string;
  title: string;
  description?: string;
  start_time_seconds: number;
  end_time_seconds: number;
  location?: string;
  type?: number;
  attachments?: Array<ChannelTimelineAttachment>;
}

export interface ApiCreateChannelTimelineResponse {
  event: ApiChannelTimeline;
}

export interface ApiUpdateChannelTimelineRequest {
  id: string;
  clan_id: string;
  channel_id: string;
  title?: string;
  description?: string;
  start_time_seconds: number;
  location?: string;
  type?: number;
  attachments?: Array<ChannelTimelineAttachment>;
}

export interface ApiUpdateChannelTimelineResponse {
  event: ApiChannelTimeline;
}

export interface ApiDetailChannelTimelineRequest {
  id: string;
  clan_id: string;
  channel_id: string;
  start_time_seconds: number;
}

export interface ApiDetailChannelTimelineResponse {
  event: ApiChannelTimeline;
}

export interface ChannelTimelineAttachment {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: string;
  width: number;
  height: number;
  thumbnail: string;
  duration: number;
  message_id: string;
}

export interface ApiChannelTimeline {
  id: string;
  clan_id: string;
  channel_id: string;
  start_time_seconds: number;
  title: string;
  description: string;
  end_time_seconds: number;
  location: string;
  status: number;
  creator_id: string;
  create_time_seconds: number;
  update_time_seconds: number;
  type: number;
  attachments: Array<ChannelTimelineAttachment>;
  preview_imgs: Array<ChannelTimelineAttachment>;
}

export interface ApiListChannelTimelineResponse {
  events?: Array<ApiChannelTimeline>;
}

export interface ApiCreatePollRequest {
  channel_id?: string;
  clan_id?: string;
  question?: string;
  answers?: string[];
  expire_hours?: number;
  type?: number;
}

export interface ApiPollAnswer {
  index?: number;
  label?: string;
}

export interface ApiPollVoterDetail {
  answer_index?: number;
  user_ids?: string[];
}

export interface ApiCreatePollResponse {
  poll_id?: string;
  message_id?: string;
  question?: string;
  answers?: ApiPollAnswer[];
  answer_counts?: number[];
  exp?: string;
  is_closed?: boolean;
  creator_id?: string;
  type?: number;
  total_votes?: number;
}

export interface ApiGetPollRequest {
  poll_id?: string;
  message_id?: string;
  channel_id?: string;
}

export interface ApiVotePollRequest {
  poll_id?: string;
  message_id?: string;
  channel_id?: string;
  answer_indices?: number[];
}

export interface ApiVotePollResponse {
  my_answer_indices?: number[];
}

export interface ApiClosePollRequest {
  poll_id?: string;
  message_id?: string;
  channel_id?: string;
}

export interface ApiGetPollResponse extends ApiCreatePollResponse {
  voter_details?: ApiPollVoterDetail[];
}

/** A single user-role pair. */
export interface ChannelUserListChannelUser {
  //
  clan_avatar?: string;
  //
  clan_id?: string;
  //
  clan_nick?: string;
  //
  id?: string;
  //Their relationship to the role.
  role_id?: Array<string>;
  //
  thread_id?: string;
  //User.
  user_id?: string;
  //Added by
  added_by?: string;
  // is banned
  is_banned?: boolean;
  // expired time
  expired_ban_time?: number;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  //The unique ID of this message.
  id: string;
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
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
  //
  referenced_message?: string[];
  //True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  //Message sender, usually a user ID.
  sender_id: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time?: string;
  //The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clan_logo?: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  category_name?: string;
  //The username of the message sender, if any.
  username?: string;
  // The clan nick name
  clan_nick?: string;
  // The clan avatar
  clan_avatar?: string;
  //
  display_name?: string;
  //
  create_time_seconds?: number;
  //
  update_time_seconds?: number;
  //
  mode?: number;
  //
  message_id?: string;
  //
  hide_editted?: boolean;
  //
  is_public?: boolean;
  //
  topic_id?: string;
}

/**  */
export interface ApiBannedUser {
  //
  ban_time?: number;
  //The banned user.
  banned_id?: string;
  //
  banner_id?: string;
  //
  channel_id?: string;
  //
  reason?: string;
}

/**  */
export interface ApiBannedUserList {
  //
  banned_users?: Array<ApiBannedUser>;
}

/** A single user-role pair. */
export interface ClanUserListClanUser {
  //from the `avatar_url` field in the `clan_desc_profile` table.
  clan_avatar?: string;
  //
  clan_id?: string;
  //from the `nick_name` field in the `clan_desc_profile` table.
  clan_nick?: string;
  //Their relationship to the role.
  role_id?: Array<string>;
  //User.
  user?: ApiUser;
}

/**  */
export interface GetPubKeysResponseUserPubKey {
  //
  PK?: ApiPubKey;
  //
  user_id?: string;
}

/**  */
export interface CountClanBadgeResponseBadge {
  //
  clan_id?: string;
  //
  count?: number;
}

/**  */
export interface MezonChangeChannelCategoryBody {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface MezonSetChanEncryptionMethodBody {
  //
  method?: string;
}

/**  */
export interface MezonDeleteWebhookByIdBody {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/** Update app information. */
export interface MezonUpdateAppBody {
  //about the app.
  about?: string;
  //App url.
  app_url?: string;
  //Avatar URL.
  applogo?: string;
  //Username.
  appname?: string;
  //Metadata.
  metadata?: string;
  //Token.
  token?: string;
  //Shadow true|false
  is_shadow?: string;
}

/**  */
export interface MezonUpdateCategoryBody {
  //The ID of the group to update.
  category_id?: string;
  //
  category_name?: string;
}

/**  */
export interface ApiAddAppRequest {
  //
  about_me?: string;
  //
  app_logo?: string;
  //App url.
  app_url?: string;
  //The appname.
  appname?: string;
  //Creator of the app.
  creator_id?: string;
  //Is shadow.
  is_shadow?: boolean;
  //Role of this app.
  role?: number;
  //The password.
  token?: string;
}

/**
* - USER_ROLE_ADMIN: All access
 - USER_ROLE_DEVELOPER: Best for developers, also enables APIs and API explorer
 - USER_ROLE_MAINTAINER: Best for users who regularly update player information.
 - USER_ROLE_READONLY: Read-only role for those only need to view data
*/
export enum ApiAppRole {
  /*  */
  USER_ROLE_UNKNOWN = 0,
  /* */
  USER_ROLE_ADMIN = 1, // All access
  USER_ROLE_DEVELOPER = 2, // Best for developers, also enables APIs and API explorer
  USER_ROLE_MAINTAINER = 3, // Best for users who regularly update player information.
  USER_ROLE_READONLY = 4, // Read-only role for those only need to view data
}

/** Update fields in a given channel. */
export interface MezonUpdateChannelDescBody {
  //
  age_restricted?: number;
  //
  category_id?: string;
  //
  channel_label?: string;
  //
  e2ee?: number;
  //
  topic?: string;
  /** The clan ID */
  clan_id: string;
  /** The ID of the channel to update. */
  channel_id: string;
  /** app url for channel type app */
  app_id: string;
  /** channel avatar */
  channel_avatar: string | undefined;
}

/**  */
export interface ApiLogedDevice {
  //
  device_id?: string;
  //
  device_name?: string;
  //
  ip?: string;
  //
  last_active?: string;
  //
  login_at?: string;
  //
  platform?: string;
  //
  status?: number;
  //
  location?: string;
  //
  is_current?: boolean;
}

/**  */
export interface ApiLogedDeviceList {
  //
  devices?: Array<ApiLogedDevice>;
}

/**  */
export interface MezonUpdateClanDescBody {
  //
  banner?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  logo?: string;
  //
  status?: number;
  // is onboarding.
  is_onboarding?: boolean;
  // welcome channel id.
  welcome_channel_id?: string;
  //Onboarding_banner.
  onboarding_banner?: string;
  // is community.
  is_community?: boolean;
  // community banner
  community_banner?: string;
  // description
  description?: string;
  // about
  about?: string;
  // short url for community
  short_url?: string;
  // prevent anonymous
  prevent_anonymous?: boolean;
}

/**  */
export interface MezonUpdateClanDescProfileBody {
  //
  avatar_url?: string;
  //
  nick_name?: string;
  //
  profile_banner?: string;
  //
  profile_theme?: string;
}

/**  */
export interface MezonUpdateClanEmojiByIdBody {
  id: string;
  shortname: string;
  clan_id: string;
  source: string;
}

/**  */
export interface MezonUpdateClanStickerByIdBody {
  //
  category?: string;
  //
  clan_id?: string;
  //
  shortname?: string;
  //
  source?: string;
}

/** update a event within clan. */
export interface MezonUpdateEventBody {
  //
  event_id?: string;
  //
  address?: string;
  //
  channel_id?: string;
  //
  channel_voice_id?: string;
  //
  clan_id?: string;
  //
  creator_id?: string;
  //
  description?: string;
  //
  end_time_seconds?: number;
  //
  logo?: string;
  //
  start_time_seconds?: number;
  //
  title?: string;
  //
  channel_id_old?: string;
  //
  repeat_type?: number;
}

/** Update fields in a given role. */
export interface MezonUpdateRoleBody {
  //The permissions to add.
  active_permission_ids?: Array<string>;
  //The users to add.
  add_user_ids?: Array<string>;
  //
  allow_mention?: number;
  //
  clan_id?: string;
  //
  color?: string;
  //
  description?: string;
  //
  display_online?: number;
  //
  max_permission_id: string;
  //The permissions to remove.
  remove_permission_ids?: Array<string>;
  //The users to remove.
  remove_user_ids?: Array<string>;
  //
  role_icon?: string;
  //
  title?: string;
}

/** Delete a role the user has access to. */
export interface MezonUpdateRoleDeleteBody {
  //
  clan_id?: string;
}

/** Request to get system message by clan and channel IDs. */
export interface MezonUpdateSystemMessageBody {
  //
  boost_message?: string;
  //
  channel_id?: string;
  //
  hide_audit_log?: boolean;
  //
  setup_tips?: string;
  //
  welcome_random?: string;
  //
  welcome_sticker?: string;
}

/**  */
export interface MezonUpdateUserProfileByClanBody {
  //
  avatar?: string;
  //
  nick_name?: string;
}

/**  */
export interface MezonUpdateWebhookByIdBody {
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  channel_id_update?: string;
  //
  clan_id?: string;
  //
  webhook_name?: string;
}

/** A single user-role pair. */
export interface RoleUserListRoleUser {
  //A URL for an avatar image.
  avatar_url?: string;
  //The display name of the user.
  display_name?: string;
  //The id of the user's account.
  id?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  //The location set by the user.
  location?: string;
  //The timezone set by the user.
  online?: boolean;
  //The username of the user's account.
  username?: string;
}

/**  */
export interface UpdateClanOrderRequestClanOrder {
  //
  clan_id?: string;
  //
  order?: number;
}

/**  */
export interface ApiUpdateClanOrderRequest {
  //
  clans_order?: Array<UpdateClanOrderRequestClanOrder>;
}

/** A user with additional account details. Always the current user. */
export interface ApiAccount {
  //The custom id in the user's account.
  custom_id?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's account was disabled/banned.
  disable_time?: string;
  //The email address of the user.
  email?: string;
  //
  encrypt_private_key?: string;
  //
  logo?: string;
  //
  splash_screen?: string;
  //The user object.
  user?: ApiUser;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's email was verified.
  verify_time?: string;
  //The user's wallet data.
  wallet?: number;
  //Password is setted
  password_setted?: boolean;
}

/** Send a app token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountApp {
  //
  appid?: string;
  //
  appname?: string;
  //The account token when create apps to access their profile API.
  token?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

export interface ApiAccountSMS {
  phoneno: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface ApiAccountEmail {
  //A valid RFC-5322 email address.
  email?: string;
  //A password for the user account.  Ignored with unlink operations.
  password?: string;
  // Old email
  prev_email?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/** Send a Mezon token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountMezon {
  //The phone number
  token?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/** Send a Mezon token to the server. Used with authenticate/link/unlink. */
export interface ApiLinkAccountMezon {
  //The phone number
  phone_number?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/**  */
export interface ApiAddFavoriteChannelRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiAddFavoriteChannelResponse {
  //
  channel_id?: string;
}

/** Add a role for channel. */
export interface ApiAddRoleChannelDescRequest {
  //
  channel_id?: string;
  //
  role_ids?: Array<string>;
}

/**  */
export interface ApiAllUsersAddChannelResponse {
  //
  channel_id?: string;
  //
  limit?: number;
  //
  user_ids?: Array<string>;
  //
  usernames?: Array<string>;
  //
  display_names?: Array<string>;
  //
  avatars?: Array<string>;
  //
  onlines?: Array<boolean>;
}

/**  */
export interface ApiAllUserClans {
  //
  users?: Array<ApiUser>;
}

/** App information. */
export interface ApiApp {
  //
  about?: string;
  //
  app_url?: string;
  //
  applogo?: string;
  //
  appname?: string;
  //
  creator_id?: string;
  //The UNIX time when the app was disabled.
  disable_time?: string;
  //The UNIX time when the app was created.
  create_time_seconds?: number;
  //
  id?: string;
  //
  is_shadow?: boolean;
  //
  role?: number;
  //
  token?: string;
}

/** A list of apps. */
export interface ApiAppList {
  //A list of apps.
  apps?: Array<ApiApp>;
  //Next cursor.
  next_cursor?: string;
  //Approximate total number of apps.
  total_count?: number;
}

/**  */
export interface ApiAuditLog {
  //
  action_log?: string;
  //
  channel_id?: string;
  //
  channel_label?: string;
  //
  clan_id?: string;
  //
  details?: string;
  //
  entity_id?: string;
  //
  entity_name?: string;
  //
  id?: string;
  //
  time_log?: string;
  //
  user_id?: string;
}

/** Authenticate against the server with email+password. */
export interface ApiAuthenticateSMSRequest {
  //The email account details.
  account?: ApiAccountSMS;
  //Register the account if the user does not already exist.
  create?: boolean;
  //Set the username on the account at register. Must be unique.
  username?: string;
}

/** Authenticate against the server with email+password. */
export interface ApiAuthenticateEmailRequest {
  //The email account details.
  account?: ApiAccountEmail;
  //Register the account if the user does not already exist.
  create?: boolean;
  //Set the username on the account at register. Must be unique.
  username?: string;
}

/**  */
export interface ApiCategoryDesc {
  //
  category_id?: string;
  //
  category_name?: string;
  //
  category_order?: number;
  //
  clan_id?: string;
  //
  creator_id?: string;
}

/**  */
export interface ApiCategoryDescList {
  //A list of channel.
  categorydesc?: Array<ApiCategoryDesc>;
}

/**  */
export interface ApiUpdateUsernameRequest {
  //
  username?: string;
}

/**  */
export interface ApiCategoryOrderUpdate {
  //
  category_id?: string;
  //
  order?: number;
}

/**  */
export interface ApiChanEncryptionMethod {
  //
  channel_id?: string;
  //
  method?: string;
}

export interface ApiListChannelAppsResponse {
  //
  channel_apps?: Array<ApiChannelAppResponse>;
}

/** Update fields in a given channel. */
export interface ApiChangeChannelPrivateRequest {
  //The clan id
  clan_id?: string;
  //The ID of the channel to update.
  channel_id?: string;
  //
  channel_private?: number;
  //
  role_ids?: Array<string>;
  //The users to add.
  user_ids?: Array<string>;
}

/**  */
export interface ApiChannelAppResponse {
  //
  app_id?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  id?: string;
  //
  app_url?: string;
  //
  app_name?: string;
  //
  app_logo?: string;
}

/**  */
export interface ApiChannelAttachment {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was created.
  create_time_seconds?: number;
  //
  filename?: string;
  //
  filesize?: string;
  //
  filetype?: string;
  //
  id?: string;
  //
  uploader?: string;
  //
  url?: string;
  //message id.
  message_id?: string;
  //width.
  width?: number;
  //height.
  height?: number;
}

/**  */
export interface ApiChannelAttachmentList {
  //
  attachments?: Array<ApiChannelAttachment>;
}

/**  */
export interface ApiChannelCanvasDetailResponse {
  //
  content?: string;
  //
  creator_id?: string;
  //
  editor_id?: string;
  //
  id?: string;
  //
  is_default?: boolean;
  //
  title?: string;
}

/**  */
export interface ApiChannelCanvasItem {
  //
  content?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  is_default?: boolean;
  //
  title?: string;
  // update time
  update_time?: string;
  // create time
  create_time_seconds?: number;
}

/**  */
export interface ApiChannelCanvasListResponse {
  //
  channel_canvases?: Array<ApiChannelCanvasItem>;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  count?: number;
}

/**  */
export interface ApiEditChannelCanvasRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  content?: string;
  //
  id?: string;
  //
  is_default?: boolean;
  //
  title?: string;
  //
  status?: number;
}

/**  */
export interface ApiEditChannelCanvasResponse {
  //
  id?: string;
}

/** A list of channel description, usually a result of a list operation. */
export interface ApiChannelDescList {
  //Cacheable cursor to list newer channel description. Durable and designed to be stored, unlike next/prev cursors.
  cacheable_cursor?: string;
  //A list of channel.
  channeldesc?: Array<ApiChannelDescription>;
  //The cursor to send when retrieving the next page, if any.
  next_cursor?: string;
  //
  page?: number;
  //The cursor to send when retrieving the previous page, if any.
  prev_cursor?: string;
}

/**  */
export interface ApiAddChannelAppRequest {
  //App url.
  app_url?: string;
  //The appname.
  appname?: string;
  //Creator of the app.
  creator_id?: string;
  //Role of this app.
  role?: number;
  //The password.
  token?: string;
}

/**  */
export interface ApiChannelDescription {
  //
  active?: number;
  //
  age_restricted?: number;
  //
  category_id?: string;
  //
  category_name?: string;
  //The channel this message belongs to.
  channel_id?: string;
  //
  channel_label?: string;
  //
  channel_private?: number;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  count_mess_unread?: number;
  //
  create_time_seconds?: number;
  //creator ID.
  creator_id?: string;
  //
  creator_name?: string;
  //
  e2ee?: number;
  //
  is_mute?: boolean;
  //
  last_pin_message?: string;
  //
  last_seen_message?: ApiChannelMessageHeader;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //
  channel_avatar?: string;
  //The parent channel this message belongs to.
  parent_id?: string;
  //The channel type.
  type?: number;
  //
  update_time_seconds?: number;
  //
  app_id?: string;
  //
  topic?: string;
  //
  user_ids?: Array<string>;
  //
  usernames?: Array<string>;
  //
  display_names?: Array<string>;
  //
  onlines?: Array<boolean>;
  // DM status
  avatars?: Array<string>;
  // member count
  member_count?: number;
}

/**  */
export interface ApiChannelMessageHeader {
  //
  id?: string;
  //
  sender_id?: string;
  //
  timestamp_seconds?: number;
  //
  content?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
  //
  last_seen_message?: ApiChannelMessageHeader;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //A list of messages.
  messages?: Array<ChannelMessage>;
}

export interface ApiMutedChannelList {
  //A list of channel id.
  muted_list?: Array<String>;
}

/**  */
export interface ApiChannelSettingItem {
  //
  active?: number;
  //
  category_id?: string;
  //
  channel_label?: string;
  //
  channel_private?: number;
  //
  channel_type?: number;
  //
  creator_id?: string;
  //
  id?: string;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //
  meeting_code?: string;
  //
  message_count?: string;
  //
  parent_id?: string;
  //
  user_ids?: Array<string>;
}

/**  */
export interface ApiChannelSettingListResponse {
  //
  channel_count?: number;
  //
  channel_setting_list?: Array<ApiChannelSettingItem>;
  //
  clan_id?: string;
  //
  thread_count?: number;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiChannelUserList {
  //
  channel_id?: string;
  //User-role pairs for a channel.
  channel_users?: Array<ChannelUserListChannelUser>;
  //Cursor for the next page of results, if any.
  cursor?: string;
}

/**  */
export interface ApiCheckDuplicateClanNameResponse {
  //
  is_duplicate?: boolean;
}

/** Request for CheckDuplicateName; type 0–5 matches server TypeCheck iota. */
export interface ApiCheckDuplicateNameRequest {
  name?: string;
  type?: number;
  condition_id?: string;
}

/** Response for CheckDuplicateName. */
export interface ApiCheckDuplicateNameResponse {
  is_duplicate?: boolean;
}

/**  */
export interface ApiClanDesc {
  //
  banner?: string;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  logo?: string;
  //
  status?: number;
  //
  badge_count?: number;
  // is onboarding.
  is_onboarding?: boolean;
  // welcome channel id.
  welcome_channel_id?: string;
  //Onboarding_banner.
  onboarding_banner?: string;
  // is community.
  is_community?: boolean;
  // community banner
  community_banner?: string;
  // description
  description?: string;
  // about
  about?: string;
  // short url for community
  short_url?: string;
  // prevent anonymous
  prevent_anonymous?: boolean;
  // has unread message
  has_unread_message?: boolean;
}

/**  */
export interface ApiClanDescList {
  //A list of channel.
  clandesc?: Array<ApiClanDesc>;
}

export interface ApiListChannelBadgeCountResponse {
  channeldesc?: Array<ApiChannelDescription>;
  total_count?: number;
}

export interface ApiListUserOnlineResponse {
  users?: Array<ApiUser>;
  total_count?: number;
}

/**  */
export interface ApiClanEmoji {
  //
  category?: string;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  logo?: string;
  //
  shortname?: string;
  //
  src?: string;
  //
  is_for_sale?: boolean;
}

/**  */
export interface ApiClanEmojiCreateRequest {
  //
  category?: string;
  //
  clan_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  is_for_sale?: boolean;
}

/** Get clan profile. */
export interface ApiClanProfile {
  //
  avatar?: string;
  //
  clan_id?: string;
  //
  nick_name?: string;
  //
  user_id?: string;
  //
  about?: string;
}

/**  */
export interface ApiClanSticker {
  //
  category?: string;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  create_time_seconds?: number;
  //
  creator_id?: string;
  //
  id?: string;
  //
  logo?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  media_type?: number;
  //
  is_for_sale?: boolean;
}

/**  */
export interface ApiClanStickerAddRequest {
  //
  category?: string;
  //
  clan_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  media_type?: number;
  //
  is_for_sale?: boolean;
}

/** A list of users belonging to a clan, along with their role. */
export interface ApiClanUserList {
  //
  clan_id?: string;
  //User-role pairs for a clan.
  clan_users?: Array<ClanUserListClanUser>;
  //Cursor for the next page of results, if any.
  cursor?: string;
}

/** One clan member's custom status (user_status) keyed by user id. */
export interface ApiClanUserStatusEntry {
  user_id?: string;
  user_status?: string;
}

/** List of clan members' custom statuses for a clan. */
export interface ApiClanUserStatusList {
  clan_user_statuses?: Array<ApiClanUserStatusEntry>;
}

/**  */
export interface ApiConfirmLoginRequest {
  //Whether to enable "Remember Me" for extended session duration.
  is_remember?: boolean;
  //
  login_id?: string;
}

/**  */
export interface ApiCreateActivityRequest {
  //
  activity_description?: string;
  //
  activity_name?: string;
  //
  activity_type?: number;
  //
  application_id?: string;
  //
  //start_time?: string;
  //
  status?: number;
}

/**  */
export interface ApiCreateCategoryDescRequest {
  //
  category_name?: string;
  //
  clan_id?: string;
}

/** Create a channel within clan. */
export interface ApiCreateChannelDescRequest {
  //
  app_id?: string;
  //
  category_id?: string;
  //The channel this message belongs to.
  channel_id?: string;
  //
  channel_label?: string;
  //
  channel_private?: number;
  //
  clan_id?: string;
  //The parent channel this message belongs to.
  parent_id?: string;
  //The channel type.
  type?: number;
  //The users to add.
  user_ids?: Array<string>;
}

/**  */
export interface ApiCreateClanDescRequest {
  //
  banner?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  logo?: string;
}

/** Create a event within clan. */
export interface ApiCreateEventRequest {
  //
  address?: string;
  //
  channel_voice_id?: string;
  //
  clan_id?: string;
  //
  description?: string;
  //
  end_time_seconds?: number;
  //
  logo?: string;
  //
  start_time_seconds?: number;
  //
  title?: string;
  //
  channel_id?: string;
  //
  action?: number;
  //
  event_status?: number;
  //
  repeat_type?: number;
  //
  creator_id?: string;
  //
  user_id?: string;
  //
  is_private?: boolean;
  //
  meet_room?: ApiGenerateMezonMeetResponse;
}

/** Create a event within clan. */
export interface ApiUpdateEventRequest {
  //
  address?: string;
  //
  channel_id?: string;
  //
  event_id?: string;
  //
  description?: string;
  //
  end_time?: string;
  //
  logo?: string;
  //
  start_time?: string;
  //
  title?: string;
  //
  clan_id?: string;
}

/** Create a role within clan. */
export interface ApiCreateRoleRequest {
  //The permissions to add.
  active_permission_ids?: Array<string>;
  //The users to add.
  add_user_ids?: Array<string>;
  //
  allow_mention?: number;
  //
  clan_id?: string;
  //
  color?: string;
  //
  description?: string;
  //
  display_online?: number;
  //
  max_permission_id: string;
  //
  role_icon?: string;
  //
  title?: string;
  //
  order_role?: number;
}

/** Delete a channel the user has access to. */
export interface ApiDeleteChannelDescRequest {
  //The clan id
  clan_id?: string;
  //The id of a channel.
  channel_id?: string;
}

/**  */
export interface ApiDeleteEventRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  creator_id?: string;
  //The id of a event.
  event_id?: string;
  //
  event_label?: string;
}

/** Delete a role the user has access to. */
export interface ApiDeleteRoleRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //The id of a role.
  role_id?: string;
  //
  role_label?: string;
}

/** Storage objects to delete. */
export interface ApiDeleteStorageObjectId {
  //The collection which stores the object.
  collection?: string;
  //The key of the object within the collection.
  key?: string;
  //The version hash of the object.
  version?: string;
}

/** Batch delete storage objects. */
export interface ApiDeleteStorageObjectsRequest {
  //Batch of storage objects.
  object_ids?: Array<ApiDeleteStorageObjectId>;
}

/** Represents an event to be passed through the server to registered event handlers. */
export interface ApiEvent {
  //True if the event came directly from a client call, false otherwise.
  external?: boolean;
  //An event name, type, category, or identifier.
  name?: string;
  //Arbitrary event property values.
  properties?: Record<string, string>;
  //The time when the event was triggered.
  timestamp?: string;
}

/**  */
export interface ApiRegisterStreamingChannelRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiRegisterStreamingChannelResponse {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  streaming_url?: string;
}

/**  */
export interface ApiListStreamingChannelsResponse {
  //
  streaming_channels?: Array<ApiStreamingChannelResponse>;
}

export interface ApiEmojiListedResponse {
  //
  emoji_list?: Array<ApiClanEmoji>;
}

/**  */
export interface ApiEmojiRecent {
  //ID of the emoji.
  emoji_recents_id?: string;
  //
  emoji_id?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the emoji was created.
  update_time?: string;
}

export interface ApiAddFriendsResponse {
  ids?: Array<string>;
  usernames?: Array<string>;
}

/**  */
export interface ApiEventList {
  //A list of event.
  events?: Array<ApiEventManagement>;
}

/**  */
export interface ApiEventManagement {
  //
  active?: number;
  //
  address?: string;
  //
  channel_voice_id?: string;
  //
  clan_id?: string;
  //
  creator_id?: string;
  //
  description?: string;
  //
  end_time_seconds?: number;
  //
  id?: string;
  //
  logo?: string;
  //
  max_permission?: number;
  //
  start_event?: number;
  //
  start_time_seconds?: number;
  //
  title?: string;
  //
  user_ids?: Array<string>;
  //
  create_time_seconds?: number;
  //
  channel_id?: string;
  //
  event_status?: number;
  //
  repeat_type?: number;
  //
  is_private?: boolean;
  //
  meet_room?: ApiGenerateMezonMeetResponse;
}

/**  */
export interface ApiListFavoriteChannelResponse {
  //
  channel_ids?: Array<string>;
}

/**  */
export interface ApiFilterParam {
  //
  field_name?: string;
  //
  field_value?: string;
}

/** A friend of a user. */
export interface ApiFriend {
  //The friend status.  one of "Friend.State".
  state?: number;
  //Time of the latest relationship update.
  update_time?: string;
  //The user object.
  user?: ApiUser;
  //Source ID
  source_id?: string;
}

/** A collection of zero or more friends of the user. */
export interface ApiFriendList {
  //Cursor for the next page of results, if any.
  cursor?: string;
  //The Friend objects.
  friends?: Array<ApiFriend>;
}

/**  */
export interface ApiGetKeyServerResp {
  //
  url?: string;
}

/**  */
export interface ApiGenerateMezonMeetResponse {
  //
  meet_id?: string;
  //
  room_name?: string;
  //
  external_link?: string;
  //
  creator_id?: string;
  //
  event_id?: string;
}

/**  */
export interface ApiGenerateMeetTokenExternalResponse {
  //
  guest_user_id?: string;
  //
  token?: string;
  //
  guest_access_token?: string;
}

/**  */
export interface ApiMeetParticipantRequest {
  //
  room_name?: string;
  //
  username?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiGetPubKeysResponse {
  //
  pub_keys?: Array<GetPubKeysResponseUserPubKey>;
}

/**  */
export interface ApiGiveCoffeeEvent {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  message_ref_id?: string;
  //
  receiver_id?: string;
  //
  sender_id?: string;
  //
  token_count?: number;
}

/**  */
export interface ApiHashtagDm {
  //The channel id.
  channel_id?: string;
  //
  channel_label?: string;
  //
  channel_private?: number;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  meeting_code?: string;
  //
  parent_id?: string;
  //
  type?: number;
}

/**  */
export interface ApiHashtagDmList {
  //
  hashtag_dm?: Array<ApiHashtagDm>;
}

/** Add link invite users to. */
export interface ApiInviteUserRes {
  //
  channel_desc?: ApiChannelDescription;
  //id channel to add link to.
  channel_id?: string;
  //
  channel_label?: string;
  //id clan to add link to .
  clan_id?: string;
  //
  clan_name?: string;
  //
  user_joined?: boolean;
  //
  expiry_time_seconds?: number;
  //
  clan_logo: string;
  //
  member_count: number;
  //
  banner: string;
  //
  community_banner: string;
  //
  is_community: boolean;
}

/** Add link invite users to. */
export interface ApiLinkInviteUser {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  create_time_seconds?: number;
  //The user to add.
  creator_id?: string;
  //
  expiry_time?: string;
  //
  id?: string;
  //
  invite_link?: string;
}

/** Add link invite users to. */
export interface ApiLinkInviteUserRequest {
  //id channel to add link to.
  channel_id?: string;
  //id clan to add link to .
  clan_id?: string;
  //
  expiry_time?: number;
}

export interface ApiNotifiReactMessage {
  //
  channel_id?: string;
  //
  id?: string;
  //
  user_id?: string;
}

/**  */
export interface ApiMessage2InboxRequest {
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  content?: string;
  //
  message_id?: string;
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
}

/**  */
export interface ApiMessageAttachment {
  //
  filename?: string;
  //
  filetype?: string;
  //
  height?: number;
  //
  size?: number;
  //
  url?: string;
  //
  width?: number;
  //
  thumbnail?: string;
  // The channel this message belongs to.
  channel_id?: string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  // The message that user react
  message_id?: string;
  // Message sender, usually a user ID.
  sender_id?: string;
  // duration for video in seconds
  duration?: number;
  // create_time_seconds
  create_time_seconds?: number;
}

/**  */
export interface ApiMessageDeleted {
  //
  deletor?: string;
  //
  message_id?: string;
}

/**  */
export interface ApiListUserActivity {
  //
  activities?: Array<ApiUserActivity>;
}
/**  */
export interface ApiLoginIDResponse {
  //
  address?: string;
  //
  create_time_second?: string;
  //
  login_id?: string;
  //
  platform?: string;
  //
  status?: number;
  //
  user_id?: string;
  //
  username?: string;
}

/**  */
export interface ApiMarkAsReadRequest {
  //
  category_id?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiMessageMention {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time_seconds?: number;
  //
  id?: string;
  //
  user_id?: string;
  //
  username?: string;
  // role id
  role_id?: string;
  // role name
  rolename?: string;
  // start position
  s?: number;
  // end position
  e?: number;
  /** The channel this message belongs to. */
  channel_id?: string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
}

/**  */
export interface ApiLoginRequest {
  //
  address?: string;
  //
  platform?: string;
}

/**  */
export interface ApiMessageReaction {
  //
  action?: boolean;
  //
  emoji_id: string;
  //
  emoji: string;
  //
  id?: string;
  //
  sender_id?: string;
  //
  sender_name?: string;
  //
  sender_avatar?: string;
  // count of emoji
  count: number;
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // Is public
  is_public: boolean;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id: string;
  //
  topic_id?: string;
  //
  emoji_recent_id?: string;
}

export interface ApiListChannelAppsResponse {
  //
  channel_apps?: Array<ApiChannelAppResponse>;
}

/**  */
export interface ApiListStreamingChannelsResponse {
  //
  streaming_channels?: Array<ApiStreamingChannelResponse>;
}

/**  */
export interface ApiMezonOauthClient {
  //
  access_token_strategy?: string;
  //
  allowed_cors_origins?: Array<string>;
  //
  audience?: Array<string>;
  //
  authorization_code_grant_access_token_lifespan?: string;
  //
  authorization_code_grant_id_token_lifespan?: string;
  //
  authorization_code_grant_refresh_token_lifespan?: string;
  //
  backchannel_logout_session_required?: boolean;
  //
  backchannel_logout_uri?: string;
  //
  client_credentials_grant_access_token_lifespan?: string;
  //
  client_id?: string;
  //
  client_name?: string;
  //
  client_secret?: string;
  //
  client_secret_expires_at?: number;
  //
  client_uri?: string;
  //
  contacts?: Array<string>;
  //
  //created_at?: Date;
  //
  frontchannel_logout_session_required?: boolean;
  //
  frontchannel_logout_uri?: string;
  //
  grant_types?: Array<string>;
  //
  implicit_grant_access_token_lifespan?: string;
  //
  implicit_grant_id_token_lifespan?: string;
  //
  jwks?: Array<string>;
  //
  jwks_uri?: string;
  //
  jwt_bearer_grant_access_token_lifespan?: string;
  //
  logo_uri?: string;
  //
  owner?: string;
  //
  policy_uri?: string;
  //
  post_logout_redirect_uris?: Array<string>;
  //
  redirect_uris?: Array<string>;
  //
  refresh_token_grant_access_token_lifespan?: string;
  //
  refresh_token_grant_id_token_lifespan?: string;
  //
  refresh_token_grant_refresh_token_lifespan?: string;
  //
  registration_access_token?: string;
  //
  registration_client_uri?: string;
  //
  request_object_signing_alg?: string;
  //
  request_uris?: Array<string>;
  //
  response_types?: Array<string>;
  //
  scope?: string;
  //
  sector_identifier_uri?: string;
  //
  skip_consent?: boolean;
  //
  skip_logout_consent?: boolean;
  //
  subject_type?: string;
  //
  token_endpoint_auth_method?: string;
  //
  token_endpoint_auth_signing_alg?: string;
  //
  tos_uri?: string;
  //
  //updated_at?: string;
  //
  userinfo_signed_response_alg?: string;
}

/**  */
export interface ApiMezonOauthClientList {
  //
  list_mezon_oauth_client?: Array<ApiMezonOauthClient>;
}

/**  */
export interface ApiMessageRef {
  //
  message_id?: string;
  //
  message_ref_id?: string;
  //
  ref_type?: number;
  //
  message_sender_id?: string;
  // original message sendre username
  message_sender_username?: string;
  // original message sender avatar
  message_sender_avatar?: string;
  // original sender clan nick name
  message_sender_clan_nick?: string;
  // original sender display name
  message_sender_display_name?: string;
  //
  content?: string;
  //
  has_attachment: boolean;
  /** The channel this message belongs to. */
  channel_id?: string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
}

/** A notification in the server. */
export interface ApiNotification {
  //
  avatar_url?: string;
  //
  channel_id?: string;
  //
  channel_type?: number;
  //
  clan_id?: string;
  //Category code for this notification.
  code?: number;
  //Content of the notification in JSON.
  content?: DirectFcmProto;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the notification was created.
  create_time_seconds?: number;
  //ID of the Notification.
  id?: string;
  //True if this notification was persisted to the database.
  persistent?: boolean;
  //ID of the sender, if a user. Otherwise 'null'.
  sender_id?: string;
  //Subject of the notification.
  subject?: string;
  //category.
  category?: number;
  //
  topic_id?: string;
  //
  channel?: ApiChannelDescription;
}

/**  */
export interface ApiNotificationChannel {
  //
  channel_id?: string;
}

/**  */
export interface ApiNotificationChannelCategorySetting {
  //
  action?: number;
  //
  channel_category_label?: string;
  //
  channel_category_title?: string;
  //
  id?: string;
  //
  notification_setting_type?: number;
}

/**  */
export interface ApiNotificationChannelCategorySettingList {
  //
  notification_channel_category_settings_list?: Array<ApiNotificationChannelCategorySetting>;
}

/** A collection of zero or more notifications. */
export interface ApiNotificationList {
  //Use this cursor to paginate notifications. Cache this to catch up to new notifications.
  cacheable_cursor?: string;
  //Collection of notifications.
  notifications?: Array<ApiNotification>;
}

/**  */
export interface ApiNotificationSetting {
  //
  id?: string;
  //
  notification_setting_type?: number;
}

/**  */
export interface ApiNotificationUserChannel {
  //
  active?: number;
  //
  id?: string;
  //
  notification_setting_type?: number;
  //
  time_mute_seconds?: number;
  //
  channel_id?: string;
}

/**  */
export interface ApiStreamHttpCallbackRequest {
  //
  action?: number;
  //
  app?: string;
  //
  client_id?: string;
  //
  ip?: string;
  //
  page_url?: string;
  //
  param?: string;
  //
  server_id?: string;
  //
  service_id?: string;
  //
  stream?: string;
  //
  stream_id?: string;
  //
  stream_url?: string;
  //
  tc_url?: string;
  //
  vhost?: string;
}

/**  */
export interface ApiStreamHttpCallbackResponse {
  //
  code?: number;
  //
  msg?: string;
}

/**  */
export interface ApiPermission {
  //
  active?: number;
  //
  description?: string;
  //
  id?: string;
  //
  level?: number;
  //
  scope?: number;
  //
  slug?: string;
  //
  title?: string;
}

/** A list of permission description, usually a result of a list operation. */
export interface ApiPermissionList {
  //
  max_level_permission?: number;
  //A list of permission.
  permissions?: Array<ApiPermission>;
}

/**  */
export interface ApiPermissionRoleChannel {
  //
  active?: boolean;
  //
  permission_id?: string;
}

/**  */
export interface ApiPermissionRoleChannelListEventResponse {
  //
  channel_id?: string;
  //
  permission_role_channel?: Array<ApiPermissionRoleChannel>;
  //
  role_id?: string;
  //
  user_id?: string;
}

/**  */
export interface ApiPermissionUpdate {
  //
  permission_id?: string;
  //
  slug?: string;
  //
  type?: number;
}

/**  */
export interface ApiPinMessage {
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  content?: string;
  //
  create_time_seconds?: number;
  //
  id?: string;
  //
  message_id?: string;
  //
  sender_id?: string;
  //
  username?: string;
  //
  attachment?: Uint8Array;
}

/**  */
export interface ApiPinMessageRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  message_id?: string;
}

/**  */
export interface ApiPinMessagesList {
  //
  pin_messages_list?: Array<ApiPinMessage>;
}

/**  */
export interface ApiPubKey {
  encr: Uint8Array;
  sign: Uint8Array;
}

/**  */
export interface ApiPushPubKeyRequest {
  //
  PK?: ApiPubKey;
}

/**  */
export interface ApiRegistFcmDeviceTokenResponse {
  //
  device_id?: string;
  //
  platform?: string;
  //
  token?: string;
}

/**  */
export interface ApiRegisterStreamingChannelRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiRegisterStreamingChannelResponse {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  streaming_url?: string;
}

/** Storage objects to get. */
export interface ApiReadStorageObjectId {
  //The collection which stores the object.
  collection?: string;
  //The key of the object within the collection.
  key?: string;
  //The user owner of the object.
  user_id?: string;
}

/** Batch get storage objects. */
export interface ApiReadStorageObjectsRequest {
  //Batch of storage objects.
  object_ids?: Array<ApiReadStorageObjectId>;
}

/**  */
export interface ApiRegistrationEmailRequest {
  //
  avatar_url?: string;
  //
  display_name?: string;
  //
  dob?: string;
  //A valid RFC-5322 email address.
  email?: string;
  //A password for the user account.
  password?: string;
  //A old password for the user account.
  old_password?: string;
  //Set the username on the account at register. Must be unique.
  username?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/**  */
export interface ApiUpdateRoleOrderRequest {
  //
  clan_id?: string;
  //
  roles?: Array<ApiRoleOrderUpdate>;
}

/**  */
export interface ApiRoleOrderUpdate {
  //
  order?: number;
  //
  role_id?: string;
}

/**  */
export interface ApiRole {
  //
  active?: number;
  //
  allow_mention?: number;
  //
  channel_ids?: Array<string>;
  //
  clan_id?: string;
  //
  color?: string;
  //
  creator_id?: string;
  //
  description?: string;
  //
  display_online?: number;
  //
  id?: string;
  //
  max_level_permission?: number;
  //
  permission_list?: ApiPermissionList;
  //
  role_channel_active?: number;
  //
  role_icon?: string;
  //
  role_user_list?: ApiRoleUserList;
  //
  slug?: string;
  //
  title?: string;
  //
  order_role?: number;
}

/**  */
export interface ApiIsBannedResponse {
  //
  is_banned?: boolean;
  expired_ban_time?: number;
}

/** A list of role description, usually a result of a list operation. */
export interface ApiRoleList {
  max_level_permission?: number;
  //A list of role.
  roles?: Array<ApiRole>;
}

/**  */
export interface ApiRoleListEventResponse {
  //
  clan_id?: string;
  //
  cursor?: string;
  //
  limit?: number;
  //
  roles?: ApiRoleList;
  //
  state?: number;
}

/**  */
export interface ApiRoleUserList {
  //Cursor for the next page of results, if any.
  cursor?: string;
  //role_users pairs for a clan.
  role_users?: Array<RoleUserListRoleUser>;
}

/** Execute an Lua function on the server. */
export interface ApiRpc {
  //The authentication key used when executed as a non-client HTTP request.
  http_key?: string;
  //The identifier of the function.
  id?: string;
  //The payload of the function which must be a JSON object.
  payload?: string;
}

/**  */
export interface ApiSdTopic {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  create_time_seconds?: number;
  //
  creator_id?: string;
  //
  id?: string;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //
  message_id?: string;
  //
  status?: number;
  //
  update_time?: string;
  //
  message?: ChannelMessage;
}

/**  */
export interface ApiSdTopicList {
  //
  count?: number;
  //
  topics?: Array<ApiSdTopic>;
}

/**  */
export interface ApiSdTopicRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  message_id?: string;
}

/**  */
export interface ApiSearchMessageDocument {
  //
  attachments?: string;
  //
  avatar_url?: string;
  //The channel ID.
  channel_id?: string;
  //
  channel_label?: string;
  //
  channel_type?: number;
  //The clan ID.
  clan_id?: string;
  //
  clan_name?: string;
  //
  content?: string;
  //
  create_time_seconds?: number;
  //
  display_name?: string;
  //
  mentions?: string;
  //The message ID.
  message_id?: string;
  //
  reactions?: string;
  //
  references?: string;
  //The user ID of sender.
  sender_id?: string;
  //
  update_time?: string;
  //
  username?: string;
}

/**  */
export interface ApiSearchMessageRequest {
  //
  filters?: Array<ApiFilterParam>;
  //
  from?: number;
  //
  size?: number;
  //
  sorts?: Array<ApiSortParam>;
}

/**  */
export interface ApiSearchMessageResponse {
  //List of paged messages.
  messages?: Array<ApiSearchMessageDocument>;
  //The total number of messages.
  total?: number;
}

/** A user's session used to authenticate messages. */
export interface ApiSession {
  //True if the corresponding account was just created, false otherwise.
  created?: boolean;
  //Refresh token that can be used for session token renewal.
  refresh_token?: string;
  //Authentication credentials.
  token?: string;
  // Whether to enable "Remember Me" for extended session duration.
  is_remember?: boolean;
  // endpoint url that belong to user
  api_url?: string;
  // socket url
  ws_url?: string;
  // id token for zklogin
  id_token?: string;
}

/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiSessionLogoutRequest {
  //Refresh token to invalidate.
  refresh_token?: string;
  //Session token to log out.
  token?: string;
  // device_id to log out.
  device_id?: string;
  // platform
  platform?: string;
}

/** Authenticate against the server with a refresh token. */
export interface ApiSessionRefreshRequest {
  //Whether to enable "Remember Me" for extended session duration.
  is_remember?: boolean;
  //Refresh token.
  token?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/**  */
export interface ApiSetDefaultNotificationRequest {
  //
  category_id?: string;
  //
  clan_id?: string;
  //
  notification_type?: number;
}

/**  */
export interface ApiSetMuteRequest {
  //
  active?: number;
  //
  id?: string;
  //
  mute_time?: number;
  //
  clan_id?: string;
}

/**  */
export interface ApiSetNotificationRequest {
  //
  channel_category_id?: string;
  //
  notification_type?: number;
  // clan_id
  clan_id?: string;
}

/**  */
export interface ApiSortParam {
  //
  field_name?: string;
  //
  order?: string;
}

/**  */
export interface ApiStickerListedResponse {
  //
  stickers?: Array<ApiClanSticker>;
}

/**  */
export interface ApiStreamingChannelResponse {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  is_streaming?: boolean;
  //
  streaming_url?: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiStreamingChannelUser {
  //
  channel_id?: string;
  //
  id?: string;
  //
  participant?: string;
  //user for a channel.
  user_id?: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiStreamingChannelUserList {
  //
  streaming_channel_users?: Array<ApiStreamingChannelUser>;
}

/** System message details. */
export interface ApiSystemMessage {
  //
  boost_message?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  hide_audit_log?: boolean;
  //
  id?: string;
  //
  setup_tips?: string;
  //
  welcome_random?: string;
  //
  welcome_sticker?: string;
}

/** Request to get system message by clan and channel IDs. */
export interface ApiSystemMessageRequest {
  //
  boost_message?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  hide_audit_log?: boolean;
  //
  setup_tips?: string;
  //
  welcome_random?: string;
  //
  welcome_sticker?: string;
}

/** List of system message. */
export interface ApiSystemMessagesList {
  //
  system_messages_list?: Array<ApiSystemMessage>;
}

/**  */
export interface ApiTokenSentEvent {
  //
  amount?: number;
  //
  note?: string;
  //
  receiver_id?: string;
  //
  sender_id?: string;
  //
  sender_name?: string;
  //
  extra_attribute?: string;
  //
  transaction_id?: string;
}

/**  */
export interface ApiTransactionDetail {
  //
  amount?: number;
  //
  create_time_seconds?: number;
  //
  update_time?: string;
  //
  receiver_id?: string;
  //
  receiver_username?: string;
  //
  sender_id?: string;
  //
  sender_username?: string;
  //
  metadata?: string;
  //
  trans_id?: string;
}

/** Update a user's account details. */
export interface ApiUpdateAccountRequest {
  //
  about_me?: string;
  //A URL for an avatar image.
  avatar_url?: string;
  //The display name of the user.
  display_name?: string;
  //
  dob_seconds?: number;
  //The email of the user's account.
  email?: string;
  //
  encrypt_private_key?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  //The location set by the user.
  location?: string;
  //
  logo?: string;
  //
  splash_screen?: string;
  //The timezone set by the user.
  timezone?: string;
}

/**  */
export interface ApiUpdateCategoryDescRequest {
  //The ID of the group to update.
  category_id?: string;
  //
  category_name?: string;
  // clan ID
  clan_id: string;
}
/**  */
export interface ApiUpdateCategoryOrderRequest {
  //
  categories?: Array<ApiCategoryOrderUpdate>;
  //
  clan_id?: string;
}

/**  */
export interface ApiUpdateRoleChannelRequest {
  //
  channel_id: string;
  //
  max_permission_id: string;
  //The permissions to add.
  permission_update?: Array<ApiPermissionUpdate>;
  //The ID of the role to update.
  role_id?: string;
  //
  role_label?: string;
  //The ID of the role to update.
  user_id?: string;
}

/** Fetch a batch of zero or more users from the server. */
export interface ApiUpdateUsersRequest {
  //The avarar_url of a user.
  avatar_url?: string;
  //The account username of a user.
  display_name?: string;
}

/**  */
export interface ApiUploadAttachment {
  //
  filename?: string;
  //
  url?: string;
}

/**  */
export interface ApiUploadAttachmentRequest {
  //
  filename?: string;
  //
  filetype?: string;
  //
  height?: number;
  //
  size?: number;
  //
  width?: number;
}

/** A user in the server. */
export interface ApiUser {
  //
  about_me?: string;
  //A URL for an avatar image.
  avatar_url?: string;
  //
  dob_seconds?: number;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created.
  create_time_seconds?: number;
  //The display name of the user.
  display_name?: string;
  //Number of related edges to this user.
  edge_count?: number;
  //The id of the user's account.
  id?: string;
  //
  is_mobile?: boolean;
  //
  join_time_seconds?: number;
  //The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  //The location set by the user.
  location?: string;
  //Additional information stored as a JSON object.
  user_status?: string;
  // online, offline, invisible, idle, do not disturb
  status?: string;
  //Indicates whether the user is currently online.
  online?: boolean;
  //The timezone set by the user.
  timezone?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated.
  update_time?: string;
  //The username of the user's account.
  username?: string;
  // mezon_id
  mezon_id?: string;
  // list nick name
  list_nick_names?: Array<string>;
  // phone number
  phone_number?: string;
}

/**  */
export interface ApiUserActivity {
  //
  activity_description?: string;
  //
  activity_name?: string;
  //
  activity_type?: number;
  //
  application_id?: string;
  //
  end_time_seconds?: number;
  //
  start_time_seconds?: number;
  //
  status?: number;
  //
  user_id?: string;
}

/**  */
export interface ApiQuickMenuAccess {
  //
  action_msg?: string;
  //
  background?: string;
  //
  bot_id?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  id?: string;
  //
  menu_name?: string;
  //
  menu_type?: number;
}

/**  */
export interface ApiQuickMenuAccessList {
  //
  list_menus?: Array<ApiQuickMenuAccess>;
}

/**  */
export interface ApiQuickMenuAccessRequest {
  //
  action_msg?: string;
  //
  background?: string;
  //
  bot_id?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  id?: string;
  //
  menu_name?: string;
  //
  menu_type?: number;
}

/**  */
export interface ApiUserPermissionInChannelListResponse {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //A list of permission.
  permissions?: ApiPermissionList;
}

/**  */
export interface ApiUserStatus {
  //
  status?: string;
  //
  user_id?: string;
}

/**  */
export interface ApiUserStatusUpdate {
  //
  minutes?: number;
  //
  status?: string;
  //
  until_turn_on?: boolean;
}

/** A collection of zero or more users. */
export interface ApiUsers {
  //The User objects.
  users?: Array<ApiUser>;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUser {
  //Cursor for the next page of results, if any.
  id?: string;
  //
  channel_id?: string;
  //
  participant?: string;
  //User for a channel.
  user_ids?: Array<string>;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUserList {
  //
  voice_channel_users?: Array<ApiVoiceChannelUser>;
}

/**  */
export interface ApiWebhook {
  //
  active?: number;
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  create_time_seconds?: number;
  //
  creator_id?: string;
  //
  id?: string;
  //
  status?: number;
  //
  update_time?: string;
  //
  url?: string;
  //
  webhook_name?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiWebhookCreateRequest {
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  webhook_name?: string;
}

/**  */
export interface ApiWebhookGenerateResponse {
  //
  avatar?: string;
  //
  channel_id?: string;
  //
  hook_name?: string;
  //
  url?: string;
}

/**  */
export interface ApiWebhookListResponse {
  //
  webhooks?: Array<ApiWebhook>;
}

/** A collection of zero or more notifications. */
export interface ApiEmojiRecentList {
  //Collection of emojiRecents.
  emoji_recents?: Array<ApiEmojiRecent>;
}

/** Represents an event to be passed through the server to registered event handlers. */
export interface MezonapiEvent {
  //True if the event came directly from a client call, false otherwise.
  external?: boolean;
  //An event name, type, category, or identifier.
  name?: string;
  //Arbitrary event property values.
  properties?: Record<string, string>;
  //The time when the event was triggered.
  timestamp?: string;
}

/**  */
export interface MezonapiListAuditLog {
  //
  date_log?: string;
  //
  logs?: Array<ApiAuditLog>;
  //
  total_count?: number;
}

/**  */
export interface ProtobufAny {
  //
  type_url?: string;
  //
  value?: string;
}

/**  */
export interface RpcStatus {
  //
  code?: number;
  //
  details?: Array<ProtobufAny>;
  //
  message?: string;
}

/**  */
export interface ApiListOnboardingResponse {
  //
  list_onboarding?: Array<ApiOnboardingItem>;
}

/**  */
export interface OnboardingAnswer {
  //
  emoji?: string;
  //
  description?: string;
  //
  title?: string;
  //
  image_url?: string;
}

/**  */
export interface ApiOnboardingContent {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channel_id?: string;
  //
  content?: string;
  //
  guide_type?: number;
  //
  task_type?: number;
  //
  title?: string;
  //
  image_url?: string;
}

/**  */
export interface MezonUpdateOnboardingBody {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  content?: string;
  //
  task_type?: number;
  //
  title?: string;
  //
  image_url?: string;
}

/**  */
export interface ApiCreateOnboardingRequest {
  //
  clan_id?: string;
  //
  contents?: Array<ApiOnboardingContent>;
}

/**  */
export interface ApiOnboardingItem {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time_seconds?: number;
  //
  guide_type?: number;
  //
  id?: string;
  //
  task_type?: number;
  //
  title?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time?: string;
  //
  image_url?: string;
}

/**  */
export interface MezonUpdateClanWebhookByIdBody {
  //avatar.
  avatar?: string;
  //clan id.
  clan_id?: string;
  //reset token.
  reset_token?: boolean;
  //webhook name.
  webhook_name?: string;
}

/**  */
export interface ApiClanWebhook {
  //active.
  active?: number;
  //
  avatar?: string;
  //clan id.
  clan_id?: string;
  //create time.
  create_time_seconds?: number;
  //creator id.
  creator_id?: string;
  //id.
  id?: string;
  //update time.
  update_time?: string;
  //URL of the webhook, which is automatically generated and different from the avatar.
  url?: string;
  //webhook name.
  webhook_name?: string;
}

/**  */
export interface ApiGenerateClanWebhookRequest {
  //avatar.
  avatar?: string;
  //clan id.
  clan_id?: string;
  //webhook name.
  webhook_name?: string;
}

/**  */
export interface ApiGenerateClanWebhookResponse {
  //avatar.
  avatar?: string;
  //clan id.
  clan_id?: string;
  //url.
  url?: string;
  //webhook name.
  webhook_name?: string;
}

/**  */
export interface ApiListClanWebhookResponse {
  //list clan webhook.
  list_clan_webhooks?: Array<ApiClanWebhook>;
}

/**  */
export interface MezonUpdateOnboardingStepByClanIdBody {
  //onboarding step.
  onboarding_step?: number;
}

/**  */
export interface ApiListOnboardingStepResponse {
  //list onboarding steps.
  list_onboarding_step?: Array<ApiOnboardingSteps>;
}

/**  */
export interface ApiOnboardingSteps {
  //clan id.
  clan_id?: string;
  //id.
  id?: string;
  //onboarding step.
  onboarding_step?: number;
  //user id.
  user_id?: string;
}

/**  */
export interface MezonapiCreateRoomChannelApps {
  //
  channel_id?: string;
  //
  room_name?: string;
}

/**  */
export interface ApiGenerateMeetTokenRequest {
  //
  channel_id?: string;
  //
  room_name?: string;
}

/**  */
export interface ApiGenerateMeetTokenResponse {
  //
  token?: string;
}

/**  */
export interface ApiUnlockedItemRequest {
  //
  item_id?: string;
  //
  item_type?: number;
}

/**  */
export interface ApiUnlockedItemResponse {
  //
  source?: string;
}

/**  */
export interface ApiMezonOauthClient {
  //
  access_token_strategy?: string;
  //
  allowed_cors_origins?: Array<string>;
  //
  audience?: Array<string>;
  //
  authorization_code_grant_access_token_lifespan?: string;
  //
  authorization_code_grant_id_token_lifespan?: string;
  //
  authorization_code_grant_refresh_token_lifespan?: string;
  //
  backchannel_logout_session_required?: boolean;
  //
  backchannel_logout_uri?: string;
  //
  client_credentials_grant_access_token_lifespan?: string;
  //
  client_id?: string;
  //
  client_name?: string;
  //
  client_secret?: string;
  //
  client_secret_expires_at?: number;
  //
  client_uri?: string;
  //
  contacts?: Array<string>;
  //
  //created_at?: Date;
  //
  frontchannel_logout_session_required?: boolean;
  //
  frontchannel_logout_uri?: string;
  //
  grant_types?: Array<string>;
  //
  implicit_grant_access_token_lifespan?: string;
  //
  implicit_grant_id_token_lifespan?: string;
  //
  jwks?: Array<string>;
  //
  jwks_uri?: string;
  //
  jwt_bearer_grant_access_token_lifespan?: string;
  //
  logo_uri?: string;
  //
  owner?: string;
  //
  policy_uri?: string;
  //
  post_logout_redirect_uris?: Array<string>;
  //
  redirect_uris?: Array<string>;
  //
  refresh_token_grant_access_token_lifespan?: string;
  //
  refresh_token_grant_id_token_lifespan?: string;
  //
  refresh_token_grant_refresh_token_lifespan?: string;
  //
  registration_access_token?: string;
  //
  registration_client_uri?: string;
  //
  request_object_signing_alg?: string;
  //
  request_uris?: Array<string>;
  //
  response_types?: Array<string>;
  //
  scope?: string;
  //
  sector_identifier_uri?: string;
  //
  skip_consent?: boolean;
  //
  skip_logout_consent?: boolean;
  //
  subject_type?: string;
  //
  token_endpoint_auth_method?: string;
  //
  token_endpoint_auth_signing_alg?: string;
  //
  tos_uri?: string;
  //
  //updated_at?: string;
  //
  userinfo_signed_response_alg?: string;
}

/**  */
export interface ApiCreateHashChannelAppsResponse {
  //
  web_app_data?: string;
}

/**  */
export interface ApiUserEventRequest {
  // The ID of the clan to be updated.
  clan_id?: string;
  //The ID of the event to be updated.
  event_id?: string;
}

/**  */
export interface ApiClanDiscover {
  //
  about?: string;
  //
  banner?: string;
  //
  clan_id?: string;
  //
  clan_logo?: string;
  //
  clan_name?: string;
  //
  description?: string;
  //
  invite_id?: string;
  //
  online_members?: number;
  //
  total_members?: number;
  //
  verified?: boolean;
  //
  short_url?: string;
  //
  create_time_seconds?: number;
}

/**  */
export interface ApiListForSaleItemsRequest {
  //
  page?: number;
}

/**  */
export interface ApiForSaleItem {
  //
  preview_url?: string;
  //
  type?: number;
}

/**  */
export interface ApiForSaleItemList {
  //
  for_sale_items?: Array<ApiForSaleItem>;
}

/**  */
export interface ApiListClanDiscover {
  //
  clan_discover?: Array<ApiClanDiscover>;
  //
  page?: number;
  //
  page_count?: number;
}

/**  */
export interface ApiClanDiscoverRequest {
  //
  clan_id?: string;
  //
  item_per_page?: number;
  //
  page_number?: number;
}

/**  */
export interface ApiIsFollowerRequest {
  //
  follow_id?: string;
}

/**  */
export interface ApiLinkAccountConfirmRequest {
  //
  otp_code?: string;
  //
  req_id?: string;
  //
  status?: number;
}

/**  */
export interface ApiIsFollowerResponse {
  //
  is_follower?: boolean;
  //
  follow_id?: string;
}

/**  */
export interface ApiTransferOwnershipRequest {
  //
  clan_id?: string;
  //
  new_owner_id?: string;
}

export interface ApiDirectFcmProto {
  title: string;
  link: string;
  content: string;
  channel_id: string;
  sender_id: string;
  avatar: string;
  clan_id: string;
  attachment_link: string;
  display_name: string;
  create_time_seconds: number;
  update_time_seconds: number;
  username: string;
  mention_ids: string[];
  position_s: number[];
  position_e: number[];
  attachment_type: string;
  has_more_attachment: boolean;
  is_mention_role: boolean[];
  message_id: string;
}
