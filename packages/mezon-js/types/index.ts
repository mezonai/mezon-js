import _m0 from "protobufjs/minimal";

/** A user's session used to authenticate messages. */
export interface Session {
  /** True if the corresponding account was just created, false otherwise. */
  created: boolean;
  /** Authentication credentials. */
  token: string;
  /** Refresh token that can be used for session token renewal. */
  refreshToken: string;
  /** User id */
  userId: string;
  /** Whether to enable "Remember Me" for extended session duration. */
  isRemember: boolean;
  /** api url */
  apiUrl: string;
  /** id token for zklogin */
  idToken: string;
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
  refreshToken?: string;
  /** Authentication credentials. */
  token?: string;
  /** Whether to enable "Remember Me" for extended session duration. */
  isRemember?: boolean;
  /** Endpoint URL that belongs to the user. */
  apiUrl?: string;
  /** ID token for zklogin. */
  idToken?: string;
}

/** Response for generating an external meeting token. */
export interface ApiGenerateMeetTokenExternalResponse {
  /** Guest user ID. */
  guestUserId?: string;
  /** Meeting token. */
  token?: string;
  /** Guest access token. */
  guestAccessToken?: string;
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
  prevEmail?: string;
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
  otpCode?: string;
  /** Request ID. */
  reqId?: string;
  /** Status code. */
  status?: number;
}

/** Invite user response. */
export interface ApiInviteUserRes {
  /** Channel description. */
  channelDesc?: ApiChannelDescription;
  /** Channel ID to add link to. */
  channelId?: string;
  /** Channel label. */
  channelLabel?: string;
  /** Clan ID to add link to. */
  clanId?: string;
  /** Clan name. */
  clanName?: string;
  /** Whether the user has joined. */
  userJoined?: boolean;
  /** Expiry time. */
  expiryTime?: string;
  /** Clan logo URL. */
  clanLogo: string;
  /** Member count. */
  memberCount: number;
}

/** Channel description with detailed metadata. */
export interface ApiChannelDescription {
  /** Active status indicator. */
  active?: number;
  /** Age restriction flag. */
  ageRestricted?: number;
  /** Category ID. */
  categoryId?: string;
  /** Category name. */
  categoryName?: string;
  /** The channel ID. */
  channelId?: string;
  /** Channel label. */
  channelLabel?: string;
  /** Private channel indicator. */
  channelPrivate?: number;
  /** Clan ID. */
  clanId?: string;
  /** Clan name. */
  clanName?: string;
  /** Count of unread messages. */
  countMessUnread?: number;
  /** Creation time in seconds. */
  createTimeSeconds?: number;
  /** Creator ID. */
  creatorId?: string;
  /** Creator name. */
  creatorName?: string;
  /** End-to-end encryption flag. */
  e2ee?: number;
  /** Whether the channel is muted. */
  isMute?: boolean;
  /** Last pinned message. */
  lastPinMessage?: string;
  /** Last seen message. */
  lastSeenMessage?: ApiChannelMessageHeader;
  /** Last sent message. */
  lastSentMessage?: ApiChannelMessageHeader;
  /** Meeting code. */
  meetingCode?: string;
  /** Channel avatar URL. */
  channelAvatar?: string;
  /** Parent channel ID. */
  parentId?: string;
  /** Channel type. */
  type?: number;
  /** Update time in seconds. */
  updateTimeSeconds?: number;
  /** Application ID. */
  appId?: string;
  /** Channel topic. */
  topic?: string;
  /** User IDs. */
  userIds?: Array<string>;
  /** Usernames. */
  usernames?: Array<string>;
  /** Display names. */
  displayNames?: Array<string>;
  /** Online status indicators. */
  onlines?: Array<boolean>;
  /** Avatar URLs. */
  avatars?: Array<string>;
  /** Member count. */
  memberCount?: number;
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
  senderId?: string;
  /** Timestamp in seconds. */
  timestampSeconds?: number;
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
  createTimeSecond?: string;
  /** Login ID. */
  loginId?: string;
  /** Platform identifier. */
  platform?: string;
  /** Status code. */
  status?: number;
  /** User ID. */
  userId?: string;
  /** Username. */
  username?: string;
}

/** Clan discovery request. */
export interface ApiClanDiscoverRequest {
  /** Clan ID. */
  clanId?: string;
  /** Items per page. */
  itemPerPage?: number;
  /** Page number. */
  pageNumber?: number;
}

/** Confirm login request. */
export interface ApiConfirmLoginRequest {
  /** Whether to enable "Remember Me" for extended session duration. */
  isRemember?: boolean;
  /** Login ID. */
  loginId?: string;
}

/** List of discoverable clans. */
export interface ApiListClanDiscover {
  /** Array of clan discovery results. */
  clanDiscover?: Array<ApiClanDiscover>;
  /** Current page number. */
  page?: number;
  /** Total page count. */
  pageCount?: number;
}

/** Discoverable clan information. */
export interface ApiClanDiscover {
  /** About the clan. */
  about?: string;
  /** Banner image URL. */
  banner?: string;
  /** Clan ID. */
  clanId?: string;
  /** Clan logo URL. */
  clanLogo?: string;
  /** Clan name. */
  clanName?: string;
  /** Clan description. */
  description?: string;
  /** Invite ID. */
  inviteId?: string;
  /** Number of online members. */
  onlineMembers?: number;
  /** Total number of members. */
  totalMembers?: number;
  /** Whether the clan is verified. */
  verified?: boolean;
  /** Short URL. */
  shortUrl?: string;
  /** Creation time. */
  createTime?: string;
}

export interface ApiAllUsersAddChannelResponse {
  //
  channelId?: string;
  //
  limit?: number;
  //
  userIds?: Array<string>;
  //
  usernames?: Array<string>;
  //
  displayNames?: Array<string>;
  //
  avatars?: Array<string>;
  //
  onlines?: Array<boolean>;
}

/**  */
export interface ApiChannelAttachment {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the group was created.
  createTime?: string;
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
  messageId?: string;
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
  cacheableCursor?: string;
  //A list of channel.
  channeldesc?: Array<ApiChannelDescription>;
  //The cursor to send when retrieving the next page, if any.
  nextCursor?: string;
  //
  page?: number;
  //The cursor to send when retrieving the previous page, if any.
  prevCursor?: string;
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
  categoryName?: string;
  //The channel this message belongs to.
  channelId: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channelLabel: string;
  //The clan this message belong to.
  clanId?: string;
  //
  clanLogo?: string;
  //
  clanNick?: string;
  //
  clanAvatar?: string;
  //The code representing a message type or category.
  code: number;
  //The content payload.
  content: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  createTime?: string;
  //
  createTimeSeconds?: number;
  //
  displayName?: string;
  //
  mentions?: string;
  //The unique ID of this message.
  messageId: string;
  //
  reactions?: string;
  //
  referencedMessage?: string;
  //
  references?: string;
  //Message sender, usually a user ID.
  senderId: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  updateTime?: string;
  //
  updateTimeSeconds?: number;
  //The username of the message sender, if any.
  username?: string;
  // channel mode
  mode?: number;
  // hide editted
  hideEditted?: boolean;
  //
  topicId?: string;
}

/** A list of channel messages, usually a result of a list operation. */
export interface ApiChannelMessageList {
  //
  lastSeenMessage?: ApiChannelMessageHeader;
  //
  lastSentMessage?: ApiChannelMessageHeader;
  //A list of messages.
  messages?: Array<ApiChannelMessage>;
}

/**  */
export interface ApiChannelSettingItem {
  //
  active?: number;
  //
  categoryId?: string;
  //
  channelLabel?: string;
  //
  channelPrivate?: number;
  //
  channelType?: number;
  //
  creatorId?: string;
  //
  id?: string;
  //
  lastSentMessage?: ApiChannelMessageHeader;
  //
  meetingCode?: string;
  //
  messageCount?: string;
  //
  parentId?: string;
  //
  userIds?: Array<string>;
}

/**  */
export interface ApiChannelSettingListResponse {
  //
  channelCount?: number;
  //
  channelSettingList?: Array<ApiChannelSettingItem>;
  //
  clanId?: string;
  //
  threadCount?: number;
}

/** A single user-role pair. */
export interface ChannelUserListChannelUser {
  //
  clanAvatar?: string;
  //
  clanId?: string;
  //
  clanNick?: string;
  //
  id?: string;
  //Their relationship to the role.
  roleId?: Array<string>;
  //
  threadId?: string;
  //User.
  userId?: string;
  //Added by
  addedBy?: string;
  // is banned
  isBanned?: boolean;
  // expired time
  expiredBanTime?: number;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiChannelUserList {
  //
  channelId?: string;
  //User-role pairs for a channel.
  channelUsers?: Array<ChannelUserListChannelUser>;
  //Cursor for the next page of results, if any.
  cursor?: string;
}

/**  */
export interface ApiClanDesc {
  //
  banner?: string;
  //
  clanId?: string;
  //
  clanName?: string;
  //
  creatorId?: string;
  //
  logo?: string;
  //
  status?: number;
  //
  badgeCount?: number;
  // is onboarding.
  isOnboarding?: boolean;
  // welcome channel id.
  welcomeChannelId?: string;
  //Onboarding_banner.
  onboardingBanner?: string;
  // is community.
  isCommunity?: boolean;
  // community banner
  communityBanner?: string;
  // description
  description?: string;
  // about
  about?: string;
  // short url for community
  shortUrl?: string;
  // prevent anonymous
  preventAnonymous?: boolean;
  // has unread message
  hasUnreadMessage?: boolean;
}

/**  */
export interface ApiClanDescList {
  //A list of channel.
  clandesc?: Array<ApiClanDesc>;
}

/**  */
export interface ApiGenerateMezonMeetResponse {
  //
  meetId?: string;
  //
  roomName?: string;
  //
  externalLink?: string;
  //
  creatorId?: string;
  //
  eventId?: string;
}

/** Create a event within clan. */
export interface ApiCreateEventRequest {
  //
  address?: string;
  //
  channelVoiceId?: string;
  //
  clanId?: string;
  //
  description?: string;
  //
  endTime?: string;
  //
  logo?: string;
  //
  startTime?: string;
  //
  title?: string;
  //
  channelId?: string;
  //
  action?: number;
  //
  eventStatus?: number;
  //
  repeatType?: number;
  //
  creatorId?: number;
  //
  userId?: string;
  //
  isPrivate?: boolean;
  //
  meetRoom?: ApiGenerateMezonMeetResponse;
}

/**  */
export interface ApiClanEmoji {
  //
  category?: string;
  //
  clanId?: string;
  //
  clanName?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  logo?: string;
  //
  shortname?: string;
  //
  src?: string;
  //
  isForSale?: boolean;
}

export interface ApiEmojiListedResponse {
  //
  emojiList?: Array<ApiClanEmoji>;
}

/**  */
export interface ApiGiveCoffeeEvent {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  messageRefId?: string;
  //
  receiverId?: string;
  //
  senderId?: string;
  //
  tokenCount?: number;
}

/**  */
export interface ApiHashtagDm {
  //The channel id.
  channelId?: string;
  //
  channelLabel?: string;
  //
  channelPrivate?: number;
  //
  clanId?: string;
  //
  clanName?: string;
  //
  meetingCode?: string;
  //
  parentId?: string;
  //
  type?: number;
}

/**  */
export interface ApiHashtagDmList {
  //
  hashtagDm?: Array<ApiHashtagDm>;
}

/**  */
export interface ApiClanWebhook {
  //active.
  active?: number;
  //
  avatar?: string;
  //clan id.
  clanId?: string;
  //create time.
  createTime?: string;
  //creator id.
  creatorId?: string;
  //id.
  id?: string;
  //update time.
  updateTime?: string;
  //URL of the webhook, which is automatically generated and different from the avatar.
  url?: string;
  //webhook name.
  webhookName?: string;
}

/**  */
export interface ApiListClanWebhookResponse {
  //list clan webhook.
  listClanWebhooks?: Array<ApiClanWebhook>;
}

/**  */
export interface ApiListFavoriteChannelResponse {
  //
  channelIds?: Array<string>;
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
  channelId?: string;
  // The mode
  mode?: number;
  // The channel label
  channelLabel?: string;
  // The message that user react
  messageId?: string;
  // Message sender, usually a user ID.
  senderId?: string;
  // duration for video in seconds
  duration?: number;
}

/**  */
export interface ApiMessageMention {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  createTime?: string;
  //
  id?: string;
  //
  userId?: string;
  //
  username?: string;
  // role id
  roleId?: string;
  // role name
  rolename?: string;
  // start position
  s?: number;
  // end position
  e?: number;
  /** The channel this message belongs to. */
  channelId?: string;
  // The mode
  mode?: number;
  // The channel label
  channelLabel?: string;
  /** The message that user react */
  messageId?: string;
  /** Message sender, usually a user ID. */
  senderId?: string;
}

/**  */
export interface ApiMessageReaction {
  //
  action?: boolean;
  //
  emojiId: string;
  //
  emoji: string;
  //
  id?: string;
  //
  senderId?: string;
  //
  senderName?: string;
  //
  senderAvatar?: string;
  // count of emoji
  count: number;
  /** The channel this message belongs to. */
  channelId: string;
  // The mode
  mode: number;
  // Is public
  isPublic: boolean;
  // The channel label
  channelLabel: string;
  /** The message that user react */
  messageId: string;
  //
  topicId?: string;
  //
  emojiRecentId?: string;
}

/**  */
export interface ApiMessageRef {
  //
  messageId?: string;
  //
  messageRefId?: string;
  //
  refType?: number;
  //
  messageSenderId?: string;
  // original message sendre username
  messageSenderUsername?: string;
  // original message sender avatar
  mesagesSenderAvatar?: string;
  // original sender clan nick name
  messageSenderClanNick?: string;
  // original sender display name
  messageSenderDisplayName?: string;
  //
  content?: string;
  //
  hasAttachment: boolean;
  /** The channel this message belongs to. */
  channelId: string;
  // The mode
  mode: number;
  // The channel label
  channelLabel: string;
}

/** A notification in the server. */
export interface ApiNotification {
  //
  avatarUrl?: string;
  //
  channelId?: string;
  //
  channelType?: number;
  //
  clanId?: string;
  //Category code for this notification.
  code?: number;
  //Content of the notification in JSON.
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the notification was created.
  createTime?: string;
  //ID of the Notification.
  id?: string;
  //True if this notification was persisted to the database.
  persistent?: boolean;
  //ID of the sender, if a user. Otherwise 'null'.
  senderId?: string;
  //Subject of the notification.
  subject?: string;
  //category.
  category?: number;
  //
  topicId?: string;
  //
  channel?: ApiChannelDescription;
}

/**  */
export interface ApiNotificationChannel {
  //
  channelId?: string;
}

/**  */
export interface ApiNotificationChannelCategorySetting {
  //
  action?: number;
  //
  channelCategoryLabel?: string;
  //
  channelCategoryTitle?: string;
  //
  id?: string;
  //
  notificationSettingType?: number;
}

/**  */
export interface ApiNotificationChannelCategorySettingList {
  //
  notificationChannelCategorySettingsList?: Array<ApiNotificationChannelCategorySetting>;
}

/** A collection of zero or more notifications. */
export interface ApiNotificationList {
  //Use this cursor to paginate notifications. Cache this to catch up to new notifications.
  cacheableCursor?: string;
  //Collection of notifications.
  notifications?: Array<ApiNotification>;
}

/**  */
export interface ApiNotificationSetting {
  //
  id?: string;
  //
  notificationSettingType?: number;
}

/**  */
export interface ApiNotificationUserChannel {
  //
  active?: number;
  //
  id?: string;
  //
  notificationSettingType?: number;
  //
  timeMute?: string;
  //
  channelId?: string;
}

export interface ApiNotifiReactMessage {
  //
  channelId?: string;
  //
  id?: string;
  //
  userId?: string;
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
  maxLevelPermission?: number;
  //A list of permission.
  permissions?: Array<ApiPermission>;
}

/**  */
export interface ApiPermissionRoleChannel {
  //
  active?: boolean;
  //
  permissionId?: string;
}

/**  */
export interface ApiPermissionRoleChannelListEventResponse {
  //
  channelId?: string;
  //
  permissionRoleChannel?: Array<ApiPermissionRoleChannel>;
  //
  roleId?: string;
  //
  userId?: string;
}

/**  */
export interface ApiPermissionUpdate {
  //
  permissionId?: string;
  //
  slug?: string;
  //
  type?: number;
}

/**  */
export interface ApiUpdateRoleOrderRequest {
  //
  clanId?: string;
  //
  roles?: Array<ApiRoleOrderUpdate>;
}

/**  */
export interface ApiRoleOrderUpdate {
  //
  order?: number;
  //
  roleId?: string;
}

/**  */
export interface ApiRole {
  //
  active?: number;
  //
  allowMention?: number;
  //
  channelIds?: Array<string>;
  //
  clanId?: string;
  //
  color?: string;
  //
  creatorId?: string;
  //
  description?: string;
  //
  displayOnline?: number;
  //
  id?: string;
  //
  maxLevelPermission?: number;
  //
  permissionList?: ApiPermissionList;
  //
  roleChannelActive?: number;
  //
  roleIcon?: string;
  //
  roleUserList?: ApiRoleUserList;
  //
  slug?: string;
  //
  title?: string;
  //
  orderRole?: number;
}

/**  */
export interface ApiIsBannedResponse {
  //
  isBanned?: boolean;
  expiredBanTime?: number;
}

/** A list of role description, usually a result of a list operation. */
export interface ApiRoleList {
  maxLevelPermission?: number;
  //A list of role.
  roles?: Array<ApiRole>;
}

/**  */
export interface ApiRoleListEventResponse {
  //
  clanId?: string;
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
  //roleUsers pairs for a clan.
  roleUsers?: Array<RoleUserListRoleUser>;
}

/** A single user-role pair. */
export interface RoleUserListRoleUser {
  //A URL for an avatar image.
  avatarUrl?: string;
  //The display name of the user.
  displayName?: string;
  //The id of the user's account.
  id?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  langTag?: string;
  //The location set by the user.
  location?: string;
  //The timezone set by the user.
  online?: boolean;
  //The username of the user's account.
  username?: string;
}

export interface ApiRpc {
  //The authentication key used when executed as a non-client HTTP request.
  httpKey?: string;
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
  clanId?: string;
  //
  clanName?: string;
  //
  createTime?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  logo?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  mediaType?: number;
  //
  isForSale?: boolean;
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
  receiverId?: string;
  //
  senderId?: string;
  //
  senderName?: string;
  //
  extraAttribute?: string;
  //
  transactionId?: string;
}

/**  */
export interface ApiUserActivity {
  //
  activityDescription?: string;
  //
  activityName?: string;
  //
  activityType?: number;
  //
  applicationId?: string;
  //
  endTime?: string;
  //
  startTime?: string;
  //
  status?: number;
  //
  userId?: string;
}

/**  */
export interface ApiUserPermissionInChannelListResponse {
  //
  channelId?: string;
  //
  clanId?: string;
  //A list of permission.
  permissions?: ApiPermissionList;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUser {
  //Cursor for the next page of results, if any.
  id?: string;
  //
  channelId?: string;
  //
  participant?: string;
  //User for a channel.
  userId?: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiVoiceChannelUserList {
  //
  voiceChannelUsers?: Array<ApiVoiceChannelUser>;
}

/**  */
export interface ApiWebhook {
  //
  active?: number;
  //
  avatar?: string;
  //
  channelId?: string;
  //
  createTime?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  status?: number;
  //
  updateTime?: string;
  //
  url?: string;
  //
  webhookName?: string;
  //
  clanId?: string;
}

/**  */
export interface ApiWebhookListResponse {
  //
  webhooks?: Array<ApiWebhook>;
}

/**  */
export interface ApiEmojiRecent {
  //ID of the emoji.
  emojiRecentsId?: string;
  //
  emojiId?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the emoji was created.
  updateTime?: string;
}

/** A collection of zero or more notifications. */
export interface ApiEmojiRecentList {
  //Collection of emojiRecents.
  emojiRecents?: Array<ApiEmojiRecent>;
}

/** A user in the server. */
export interface ApiUser {
  //
  aboutMe?: string;
  //A URL for an avatar image.
  avatarUrl?: string;
  //
  dob?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created.
  createTime?: string;
  //The display name of the user.
  displayName?: string;
  //Number of related edges to this user.
  edgeCount?: number;
  //The id of the user's account.
  id?: string;
  //
  isMobile?: boolean;
  //
  joinTime?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  langTag?: string;
  //The location set by the user.
  location?: string;
  //Additional information stored as a JSON object.
  userStatus?: string;
  // online, offline, invisible, idle, do not disturb
  status?: string;
  //Indicates whether the user is currently online.
  online?: boolean;
  //The timezone set by the user.
  timezone?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated.
  updateTime?: string;
  //The username of the user's account.
  username?: string;
  // mezonId
  mezonId?: string;
  // list nick name
  listNickNames?: Array<string>;
  // phone number
  phoneNumber?: string;
}

/** A friend of a user. */
export interface ApiFriend {
  //The friend status.  one of "Friend.State".
  state?: number;
  //Time of the latest relationship update.
  updateTime?: string;
  //The user object.
  user?: ApiUser;
  //Source ID
  sourceId?: string;
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
  appId?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  id?: string;
  //
  appUrl?: string;
  //
  appName?: string;
  //
  appLogo?: string;
}

/**  */
export interface ApiListChannelAppsResponse {
  //
  channelApps?: Array<ApiChannelAppResponse>;
}

/**  */
export interface ApiListUserActivity {
  //
  activities?: Array<ApiUserActivity>;
}

/**  */
export interface ApiListClanUnreadMsgIndicatorResponse {
  //
  hasUnreadMessage?: boolean;
}

/** A message sent on a channel. */
export interface ChannelMessage {
  //The unique ID of this message.
  id: string;
  //
  avatar?: string;
  //The channel this message belongs to.
  channelId: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channelLabel: string;
  //The clan this message belong to.
  clanId?: string;
  //The code representing a message type or category.
  code: number;
  //The content payload.
  content: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  createTime: string;
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
  //
  referencedMessage?: string[];
  //True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  //Message sender, usually a user ID.
  senderId: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  updateTime?: string;
  //The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clanLogo?: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  categoryName?: string;
  //The username of the message sender, if any.
  username?: string;
  // The clan nick name
  clanNick?: string;
  // The clan avatar
  clanAvatar?: string;
  //
  displayName?: string;
  //
  createTimeSeconds?: number;
  //
  updateTimeSeconds?: number;
  //
  mode?: number;
  //
  messageId?: string;
  //
  hideEditted?: boolean;
  //
  isPublic?: boolean;
  //
  topicId?: string;
}

/** A user with additional account details. Always the current user. */
export interface ApiAccount {
  //The custom id in the user's account.
  custom_id?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's account was disabled/banned.
  disableTime?: string;
  //The email address of the user.
  email?: string;
  //
  encryptPrivateKey?: string;
  //
  logo?: string;
  //
  splashScreen?: string;
  //The user object.
  user?: ApiUser;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user's email was verified.
  verifyTime?: string;
  //The user's wallet data.
  wallet?: number;
  //Password is setted
  passwordSetted?: boolean;
}

/**  */
export interface ApiAllUsersAddChannelResponse {
  //
  channelId?: string;
  //
  limit?: number;
  //
  userIds?: Array<string>;
  //
  usernames?: Array<string>;
  //
  displayNames?: Array<string>;
  //
  avatars?: Array<string>;
  //
  onlines?: Array<boolean>;  
}

/**  */
export interface ApiCategoryDesc {
  //
  categoryId?: string;
  //
  categoryName?: string;
  //
  categoryOrder?: number;
  //
  clanId?: string;
  //
  creatorId?: string;
}

/** Get clan profile. */
export interface ApiClanProfile {
  //
  avatar?: string;
  //
  clanId?: string;
  //
  nickName?: string;
  //
  userId?: string;
  //
  about?: string;
}

/**  */
export interface ApiEventManagement {
  //
  active?: number;
  //
  address?: string;
  //
  channelVoiceId?: string;
  //
  clanId?: string;
  //
  creatorId?: string;
  //
  description?: string;
  //
  endTime?: string;
  //
  id?: string;
  //
  logo?: string;
  //
  max_permission?: number;
  //
  start_event?: number;
  //
  startTime?: string;
  //
  title?: string;
  //
  userIds?: Array<string>;
  //
  createTime?: string;
  //
  channelId?: string;
  //
  eventStatus?: number;
  //
  repeatType?: number;
  //
  isPrivate?: boolean;
  //
  meetRoom?: ApiGenerateMezonMeetResponse;
}

/**  */
export interface ApiPinMessage {
  //
  avatar?: string;
  //
  channelId?: string;
  //
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  createTime?: string;
  //
  createTimeSeconds?: number;
  //
  id?: string;
  //
  messageId?: string;
  //
  senderId?: string;
  //
  username?: string;
  //
  attachment?: string;
}

/**  */
export interface ApiRole {
  //
  active?: number;
  //
  allowMention?: number;
  //
  channelIds?: Array<string>;
  //
  clanId?: string;
  //
  color?: string;
  //
  creatorId?: string;
  //
  description?: string;
  //
  displayOnline?: number;
  //
  id?: string;
  //
  maxLevelPermission?: number;
  //
  permissionList?: ApiPermissionList;
  //
  roleChannelActive?: number;
  //
  roleIcon?: string;
  //
  roleUserList?: ApiRoleUserList;
  //
  slug?: string;
  //
  title?: string;
  //
  orderRole?: number;
}

/**  */
export interface ApiSearchMessageDocument {
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  avatarUrl?: string;
  //The channel ID.
  channelId?: string;
  //
  channelLabel?: string;
  //
  channelType?: number;
  //The clan ID.
  clanId?: string;
  //
  clanName?: string;
  //
  content?: string;
  //
  createTime?: string;
  //
  displayName?: string;
  //
  mentions?: string;
  //The message ID.
  messageId?: string;
  //
  reactions?: string;
  //
  references?: string;
  //The user ID of sender.
  senderId?: string;
  //
  updateTime?: string;
  //
  username?: string;
}

/** System message details. */
export interface ApiSystemMessage {
  //
  boost_message?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  hide_audit_log?: string;
  //
  id?: string;
  //
  setup_tips?: string;
  //
  welcome_random?: string;
  //
  welcome_sticker?: string;
}

/** A single user-role pair. */
export interface ClanUserListClanUser {
  //from the `avatarUrl` field in the `clan_desc_profile` table.
  clanAvatar?: string;
  //
  clanId?: string;
  //from the `nickName` field in the `clan_desc_profile` table.
  clanNick?: string;
  //Their relationship to the role.
  roleId?: Array<string>;
  //User.
  user?: ApiUser;
}

/**  */
export interface ApiWebhookCreateRequest {
  //
  avatar?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  webhookName?: string;
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
    refreshToken: "",
    userId: "",
    isRemember: false,
    apiUrl: "",
    idToken: "",
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
    if (message.refreshToken !== "") {
      writer.uint32(26).string(message.refreshToken);
    }
    if (message.userId !== "") {
      writer.uint32(34).string(message.userId);
    }
    if (message.isRemember !== false) {
      writer.uint32(40).bool(message.isRemember);
    }
    if (message.apiUrl !== "") {
      writer.uint32(50).string(message.apiUrl);
    }
    if (message.idToken !== "") {
      writer.uint32(58).string(message.idToken);
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

          message.refreshToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isRemember = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.apiUrl = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.idToken = reader.string();
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
      refreshToken: isSet(object.refreshToken)
        ? globalThis.String(object.refreshToken)
        : "",
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      isRemember: isSet(object.isRemember)
        ? globalThis.Boolean(object.isRemember)
        : false,
      apiUrl: isSet(object.apiUrl) ? globalThis.String(object.apiUrl) : "",
      idToken: isSet(object.idToken)
        ? globalThis.String(object.idToken)
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
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.isRemember !== false) {
      obj.isRemember = message.isRemember;
    }
    if (message.apiUrl !== "") {
      obj.apiUrl = message.apiUrl;
    }
    if (message.idToken !== "") {
      obj.idToken = message.idToken;
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
    message.refreshToken = object.refreshToken ?? "";
    message.userId = object.userId ?? "";
    message.isRemember = object.isRemember ?? false;
    message.apiUrl = object.apiUrl ?? "";
    message.idToken = object.idToken ?? "";
    return message;
  },
};
