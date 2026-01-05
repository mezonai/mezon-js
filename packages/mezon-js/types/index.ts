import _m0 from "protobufjs/minimal";

/** A user's session used to authenticate messages. */
export interface Session {
  /** True if the corresponding account was just created, false otherwise. */
  created: boolean;
  /** Authentication credentials. */
  token: string;
  /** Refresh token that can be used for session token renewal. */
  refresh_token: string;
  /** User id */
  user_id: string;
  /** Whether to enable "Remember Me" for extended session duration. */
  is_remember: boolean;
  /** api url */
  api_url: string;
  /** id token for zklogin */
  id_token: string;
}

/** Send a Mezon token to the server. Used with authenticate/link/unlink. */
export interface ApiAccountMezon {
  /** The authentication token. */
  token?: string;
  /** Extra information that will be bundled in the session token. */
  vars?: Record<string, string>;
}

/** A user's session used to authenticate messages. */
export interface ApiSession {
  /** True if the corresponding account was just created, false otherwise. */
  created?: boolean;
  /** Refresh token that can be used for session token renewal. */
  refresh_token?: string;
  /** Authentication credentials. */
  token?: string;
  /** Whether to enable "Remember Me" for extended session duration. */
  is_remember?: boolean;
  /** Endpoint URL that belongs to the user. */
  api_url?: string;
  /** ID token for zklogin. */
  id_token?: string;
}

/** Response for generating an external meeting token. */
export interface ApiGenerateMeetTokenExternalResponse {
  /** Guest user ID. */
  guest_user_id?: string;
  /** Meeting token. */
  token?: string;
  /** Guest access token. */
  guest_access_token?: string;
}

/** Authenticate against the server with email+password. */
export interface ApiAuthenticateEmailRequest {
  /** The email account details. */
  account?: ApiAccountEmail;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username?: string;
}

/** Send an email with password to the server. Used with authenticate/link/unlink. */
export interface ApiAccountEmail {
  /** A valid RFC-5322 email address. */
  email?: string;
  /** A password for the user account. Ignored with unlink operations. */
  password?: string;
  /** Previous email address. */
  prev_email?: string;
  /** Extra information that will be bundled in the session token. */
  vars?: Record<string, string>;
}

/** Authenticate against the server with SMS. */
export interface ApiAuthenticateSMSRequest {
  /** The SMS account details. */
  account?: ApiAccountSMS;
  /** Register the account if the user does not already exist. */
  create?: boolean;
  /** Set the username on the account at register. Must be unique. */
  username?: string;
}

/** SMS account authentication details. */
export interface ApiAccountSMS {
  /** Phone number. */
  phoneno: string;
  /** Extra information that will be bundled in the session token. */
  vars?: Record<string, string>;
}

/** Request to confirm account linking. */
export interface ApiLinkAccountConfirmRequest {
  /** One-time password code. */
  otp_code?: string;
  /** Request ID. */
  req_id?: string;
  /** Status code. */
  status?: number;
}

/** Invite user response. */
export interface ApiInviteUserRes {
  /** Channel description. */
  channel_desc?: ApiChannelDescription;
  /** Channel ID to add link to. */
  channel_id?: string;
  /** Channel label. */
  channel_label?: string;
  /** Clan ID to add link to. */
  clan_id?: string;
  /** Clan name. */
  clan_name?: string;
  /** Whether the user has joined. */
  user_joined?: boolean;
  /** Expiry time. */
  expiry_time?: string;
  /** Clan logo URL. */
  clan_logo: string;
  /** Member count. */
  member_count: number;
}

/** Channel description with detailed metadata. */
export interface ApiChannelDescription {
  /** Active status indicator. */
  active?: number;
  /** Age restriction flag. */
  age_restricted?: number;
  /** Category ID. */
  category_id?: string;
  /** Category name. */
  category_name?: string;
  /** The channel ID. */
  channel_id?: string;
  /** Channel label. */
  channel_label?: string;
  /** Private channel indicator. */
  channel_private?: number;
  /** Clan ID. */
  clan_id?: string;
  /** Clan name. */
  clan_name?: string;
  /** Count of unread messages. */
  count_mess_unread?: number;
  /** Creation time in seconds. */
  create_time_seconds?: number;
  /** Creator ID. */
  creator_id?: string;
  /** Creator name. */
  creator_name?: string;
  /** End-to-end encryption flag. */
  e2ee?: number;
  /** Whether the channel is muted. */
  is_mute?: boolean;
  /** Last pinned message. */
  last_pin_message?: string;
  /** Last seen message. */
  last_seen_message?: ApiChannelMessageHeader;
  /** Last sent message. */
  last_sent_message?: ApiChannelMessageHeader;
  /** Meeting code. */
  meeting_code?: string;
  /** Channel avatar URL. */
  channel_avatar?: string;
  /** Parent channel ID. */
  parent_id?: string;
  /** Channel type. */
  type?: number;
  /** Update time in seconds. */
  update_time_seconds?: number;
  /** Application ID. */
  app_id?: string;
  /** Channel topic. */
  topic?: string;
  /** User IDs. */
  user_ids?: Array<string>;
  /** Usernames. */
  usernames?: Array<string>;
  /** Display names. */
  display_names?: Array<string>;
  /** Online status indicators. */
  onlines?: Array<boolean>;
  /** Avatar URLs. */
  avatars?: Array<string>;
  /** Member count. */
  member_count?: number;
}

/** Channel message header information. */
export interface ApiChannelMessageHeader {
  /** Message attachment. */
  attachment?: string;
  /** Message content. */
  content?: string;
  /** Message ID. */
  id?: string;
  /** Mentioned users. */
  mention?: string;
  /** Message reaction. */
  reaction?: string;
  /** Referenced message. */
  reference?: string;
  /** Replier user IDs. */
  repliers?: Array<string>;
  /** Sender ID. */
  sender_id?: string;
  /** Timestamp in seconds. */
  timestamp_seconds?: number;
}

/** Login request. */
export interface ApiLoginRequest {
  /** User address. */
  address?: string;
  /** Platform identifier. */
  platform?: string;
}

/** Login ID response. */
export interface ApiLoginIDResponse {
  /** User address. */
  address?: string;
  /** Creation time in seconds. */
  create_time_second?: string;
  /** Login ID. */
  login_id?: string;
  /** Platform identifier. */
  platform?: string;
  /** Status code. */
  status?: number;
  /** User ID. */
  user_id?: string;
  /** Username. */
  username?: string;
}

/** Clan discovery request. */
export interface ApiClanDiscoverRequest {
  /** Clan ID. */
  clan_id?: string;
  /** Items per page. */
  item_per_page?: number;
  /** Page number. */
  page_number?: number;
}

/** Confirm login request. */
export interface ApiConfirmLoginRequest {
  /** Whether to enable "Remember Me" for extended session duration. */
  is_remember?: boolean;
  /** Login ID. */
  login_id?: string;
}

/** List of discoverable clans. */
export interface ApiListClanDiscover {
  /** Array of clan discovery results. */
  clan_discover?: Array<ApiClanDiscover>;
  /** Current page number. */
  page?: number;
  /** Total page count. */
  page_count?: number;
}

/** Discoverable clan information. */
export interface ApiClanDiscover {
  /** About the clan. */
  about?: string;
  /** Banner image URL. */
  banner?: string;
  /** Clan ID. */
  clan_id?: string;
  /** Clan logo URL. */
  clan_logo?: string;
  /** Clan name. */
  clan_name?: string;
  /** Clan description. */
  description?: string;
  /** Invite ID. */
  invite_id?: string;
  /** Number of online members. */
  online_members?: number;
  /** Total number of members. */
  total_members?: number;
  /** Whether the clan is verified. */
  verified?: boolean;
  /** Short URL. */
  short_url?: string;
  /** Creation time. */
  create_time?: string;
}

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
export interface ApiChannelAttachment {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was created.
  create_time?: string;
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

/** A message sent on a channel. */
export interface ApiChannelMessage {
  // id
  id: string;
  //
  attachments?: string;
  //
  avatar?: string;
  //
  category_name?: string;
  //The channel this message belongs to.
  channel_id: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channel_label: string;
  //The clan this message belong to.
  clan_id?: string;
  //
  clan_logo?: string;
  //
  clan_nick?: string;
  //
  clan_avatar?: string;
  //The code representing a message type or category.
  code: number;
  //The content payload.
  content: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time?: string;
  //
  create_time_seconds?: number;
  //
  display_name?: string;
  //
  mentions?: string;
  //The unique ID of this message.
  message_id: string;
  //
  reactions?: string;
  //
  referenced_message?: string;
  //
  references?: string;
  //Message sender, usually a user ID.
  sender_id: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time?: string;
  //
  update_time_seconds?: number;
  //The username of the message sender, if any.
  username?: string;
  // channel mode
  mode?: number;
  // hide editted
  hide_editted?: boolean;
  //
  topic_id?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
  //
  last_seen_message?: ApiChannelMessageHeader;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //A list of messages.
  messages?: Array<ApiChannelMessage>;
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
  end_time?: string;
  //
  logo?: string;
  //
  start_time?: string;
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
  creator_id?: number;
  //
  user_id?: string;
  //
  is_private?: boolean;
  //
  meet_room?: ApiGenerateMezonMeetResponse;
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

export interface ApiEmojiListedResponse {
  //
  emoji_list?: Array<ApiClanEmoji>;
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

/**  */
export interface ApiClanWebhook {
  //active.
  active?: number;
  //
  avatar?: string;
  //clan id.
  clan_id?: string;
  //create time.
  create_time?: string;
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
export interface ApiListClanWebhookResponse {
  //list clan webhook.
  list_clan_webhooks?: Array<ApiClanWebhook>;
}

/**  */
export interface ApiListFavoriteChannelResponse {
  //
  channel_ids?: Array<string>;
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
}

/**  */
export interface ApiMessageMention {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time?: string;
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
  channel_label: string;
  /** The message that user react */
  message_id: string;
  //
  topic_id?: string;
  //
  emoji_recent_id?: string;
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
  mesages_sender_avatar?: string;
  // original sender clan nick name
  message_sender_clan_nick?: string;
  // original sender display name
  message_sender_display_name?: string;
  //
  content?: string;
  //
  has_attachment: boolean;
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
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
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the notification was created.
  create_time?: string;
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
  time_mute?: string;
  //
  channel_id?: string;
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
  state?: string;
}

/**  */
export interface ApiRoleUserList {
  //Cursor for the next page of results, if any.
  cursor?: string;
  //role_users pairs for a clan.
  role_users?: Array<RoleUserListRoleUser>;
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

export interface ApiRpc {
  //The authentication key used when executed as a non-client HTTP request.
  http_key?: string;
  //The identifier of the function.
  id?: string;
  //The payload of the function which must be a JSON object.
  payload?: string;
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
  create_time?: string;
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
export interface ApiStickerListedResponse {
  //
  stickers?: Array<ApiClanSticker>;
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
  end_time?: string;
  //
  start_time?: string;
  //
  status?: number;
  //
  user_id?: string;
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

/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUser {
  //Cursor for the next page of results, if any.
  id?: string;
  //
  channel_id?: string;
  //
  participant?: string;
  //User for a channel.
  user_id?: string;
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
  create_time?: string;
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
export interface ApiWebhookListResponse {
  //
  webhooks?: Array<ApiWebhook>;
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

/** A collection of zero or more notifications. */
export interface ApiEmojiRecentList {
  //Collection of emojiRecents.
  emoji_recents?: Array<ApiEmojiRecent>;
}

/** A user in the server. */
export interface ApiUser {
  //
  about_me?: string;
  //A URL for an avatar image.
  avatar_url?: string;
  //
  dob?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created.
  create_time?: string;
  //The display name of the user.
  display_name?: string;
  //Number of related edges to this user.
  edge_count?: number;
  //The id of the user's account.
  id?: string;
  //
  is_mobile?: boolean;
  //
  join_time?: string;
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
export interface ApiListChannelAppsResponse {
  //
  channel_apps?: Array<ApiChannelAppResponse>;
}

/**  */
export interface ApiListUserActivity {
  //
  activities?: Array<ApiUserActivity>;
}

/**  */
export interface ApiListClanUnreadMsgIndicatorResponse {
  //
  has_unread_message?: boolean;
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
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time: string;
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

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

const createBaseSession = (): Session => {
  return {
    created: false,
    token: "",
    refresh_token: "",
    user_id: "",
    is_remember: false,
    api_url: "",
    id_token: "",
  };
};

const isSet = (value: any): boolean => {
  return value !== null && value !== undefined;
};

export const Session = {
  encode(
    message: Session,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.created !== false) {
      writer.uint32(8).bool(message.created);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.refresh_token !== "") {
      writer.uint32(26).string(message.refresh_token);
    }
    if (message.user_id !== "") {
      writer.uint32(34).string(message.user_id);
    }
    if (message.is_remember !== false) {
      writer.uint32(40).bool(message.is_remember);
    }
    if (message.api_url !== "") {
      writer.uint32(50).string(message.api_url);
    }
    if (message.id_token !== "") {
      writer.uint32(58).string(message.id_token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.user_id = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.is_remember = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.api_url = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.id_token = reader.string();
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
      created: isSet(object.created)
        ? globalThis.Boolean(object.created)
        : false,
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      refresh_token: isSet(object.refresh_token)
        ? globalThis.String(object.refresh_token)
        : "",
      user_id: isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      is_remember: isSet(object.is_remember)
        ? globalThis.Boolean(object.is_remember)
        : false,
      api_url: isSet(object.api_url) ? globalThis.String(object.api_url) : "",
      id_token: isSet(object.id_token)
        ? globalThis.String(object.id_token)
        : "",
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    if (message.created !== false) {
      obj.created = message.created;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.refresh_token !== "") {
      obj.refresh_token = message.refresh_token;
    }
    if (message.user_id !== "") {
      obj.user_id = message.user_id;
    }
    if (message.is_remember !== false) {
      obj.is_remember = message.is_remember;
    }
    if (message.api_url !== "") {
      obj.api_url = message.api_url;
    }
    if (message.id_token !== "") {
      obj.id_token = message.id_token;
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
    message.user_id = object.user_id ?? "";
    message.is_remember = object.is_remember ?? false;
    message.api_url = object.api_url ?? "";
    message.id_token = object.id_token ?? "";
    return message;
  },
};
