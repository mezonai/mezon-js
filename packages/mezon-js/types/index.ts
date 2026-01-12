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

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheableCursor?: string;
  /**last seen message from user on channel */
  lastSeenMessage?: ApiChannelMessageHeader;
  /**last sent message from channel */
  lastSentMessage?: ApiChannelMessageHeader;
  /** A list of messages. */
  messages?: Array<ChannelMessage>;
  /** The cursor to send when retireving the next page, if any. */
  nextCursor?: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prevCursor?: string;
}

/** A collection of zero or more users. */
export interface Users {
  /** The User objects. */
  users?: Array<ApiUser>;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  /** The Friend objects. */
  friends?: Array<ApiFriend>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

export interface NotificationFcmContent {
  title?: string;
  link?: string;
  content?: string;
  channelId?: string;
  senderId?: string;
  avatar?: string;
  clanId?: string;
  attachmentLink?: string;
  displayName?: string;
  createTimeSeconds?: number;
  updateTimeSeconds?: number;
  username?: string;
  mentionIds?: string[];
  positionS?: number[];
  positionE?: number[];
  isMentionRole?: boolean[];
  attachmentType?: string;
  hasMoreAttachment?: boolean;
  /** The unique ID of the message related to this notification, if any. */
  messageId?: string;
}

/** A notification in the server. */
export interface Notification {
  /** Category code for this notification. */
  code?: number;
  /** Content of the notification in string. */
  content?: NotificationFcmContent;
  /** The UNIX time when the notification was created. */
  createTimeSeconds?: number;
  /** ID of the Notification. */
  id?: string;
  /** True if this notification was persisted to the database. */
  persistent?: boolean;
  /** ID of the sender, if a user. Otherwise 'null'. */
  senderId?: string;
  /** Subject of the notification. */
  subject?: string;
  /** The clan ID related to this notification, if any. */
  clanId: string;
  /** The channel ID related to this notification, if any. */
  channelId: string;
  /** The type of channel related to this notification, if any. */
  channelType: number;
  /** URL of the avatar related to this notification, if any. */
  avatarUrl: string;
  /** The topic ID related to this notification, if any. */
  topicId: string;
  /** The category of this notification. */
  category: number;
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
  cacheableCursor?: string;
  /** Collection of notifications. */
  notifications?: Array<Notification>;
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
export interface GetPubKeysResponseUserPubKey {
  //
  PK?: ApiPubKey;
  //
  userId?: string;
}

/**  */
export interface CountClanBadgeResponseBadge {
  //
  clanId?: string;
  //
  count?: number;
}

/**  */
export interface MezonChangeChannelCategoryBody {
  //
  channelId?: string;
  //
  clanId?:string;
}

/**  */
export interface MezonSetChanEncryptionMethodBody {
  //
  method?: string;
}

/**  */
export interface MezonDeleteWebhookByIdBody {
  //
  channelId?: string;
  //
  clanId?: string;
}

/** Update app information. */
export interface MezonUpdateAppBody {
  //about the app.
  about?: string;
  //App url.
  appUrl?: string;
  //Avatar URL.
  applogo?: string;
  //Username.
  appname?: string;
  //Metadata.
  metadata?: string;
  //Token.
  token?: string;
  //Shadow true|false
  isShadow?:string;
}

/**  */
export interface MezonUpdateCategoryBody {
  //The ID of the group to update.
  categoryId?: string;
  //
  categoryName?: string;
}

/**  */
export interface ApiAddAppRequest {
  //
  aboutMe?: string;
  //
  appLogo?: string;
  //App url.
  appUrl?: string;
  //The appname.
  appname?: string;
  //Creator of the app.
  creatorId?: string;
  //Is shadow.
  isShadow?: boolean;
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
  ageRestricted?: number;
  //
  appUrl?: string;
  //
  categoryId?: string;
  //
  channelLabel?: string;
  //
  e2ee?: number;
  //
  topic?: string;
}


/**  */
export interface ApiLogedDevice {
  //
  deviceId?: string;
  //
  deviceName?: string;
  //
  ip?: string;
  //
  lastActive?: string;
  //
  loginAt?: string;
  //
  platform?: string;
  //
  status?: number;
  //
  location?: string;
  //
  isCurrent?: boolean;
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
  clanName?: string;
  //
  creatorId?: string;
  //
  logo?: string;
  //
  status?: number;
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
}

/**  */
export interface MezonUpdateClanEmojiByIdBody {
  //
  category?: string;
  //
  clanId?: string;
  //
  shortname?: string;
  //
  source?: string;
}

/**  */
export interface MezonUpdateClanStickerByIdBody {
  //
  category?: string;
  //
  clanId?: string;
  //
  shortname?: string;
  //
  source?: string;
}

/** update a event within clan. */
export interface MezonUpdateEventBody {
  //
  eventId?: string;
  //
  address?: string;
  //
  channelId?: string;
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
  logo?: string;
  //
  startTime?: string;
  //
  title?: string;
  //
  channelIdOld?: string;
  //
  repeatType?: number;
}

/** Request to get system message by clan and channel IDs. */
export interface MezonUpdateSystemMessageBody {
  //
  boostMessage?: string;
  //
  channelId?: string;
  //
  hideAuditLog?: string;
  //
  setupTips?: string;
  //
  welcomeRandom?: string;
  //
  welcomeSticker?: string;
}

/**  */
export interface MezonUpdateWebhookByIdBody {
  //
  avatar?: string;
  //
  channelId?: string;
  //
  channelIdUpdate?: string;
  //
  clanId?: string;
  //
  webhookName?: string;
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

/** A user with additional account details. Always the current user. */
export interface ApiAccount {
  //The custom id in the user's account.
  customId?: string;
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
  prevEmail?: string;
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
  phoneNumber?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}


/**  */
export interface ApiAddFavoriteChannelRequest {
  //
  channelId?: string;
  //
  clanId?: string;
}

/**  */
export interface ApiAddFavoriteChannelResponse {
  //
  channelId?: string;
}

/** Add a role for channel. */
export interface ApiAddRoleChannelDescRequest {
  //
  channelId?: string;
  //
  roleIds?: Array<string>;
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
export interface ApiAllUserClans {
  //
  users?: Array<ApiUser>;
}

/** App information. */
export interface ApiApp {
  //
  about?: string;
  //
  appUrl?: string;
  //
  applogo?: string;
  //
  appname?: string;
  //
  creatorId?: string;
  //The UNIX time when the app was disabled.
  disableTime?: string;
  //The UNIX time when the app was created.
  createTime?: string;
  //
  id?: string;
  //
  isShadow?: boolean;
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
  nextCursor?: string;
  //Approximate total number of apps.
  totalCount?: number;
}

/**  */
export interface ApiAuditLog {
  //
  actionLog?: string;
  //
  channelId?: string;
  //
  channelLabel?: string;
  //
  clanId?: string;
  //
  details?: string;
  //
  entityId?: string;
  //
  entityName?: string;
  //
  id?: string;
  //
  timeLog?: string;
  //
  userId?: string;
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
  categoryId?: string;
  //
  order?: number;
}

/**  */
export interface ApiChanEncryptionMethod {
  //
  channelId?: string;
  //
  method?: string;
}

export interface ApiListChannelAppsResponse {
  //
  channelApps?: Array<ApiChannelAppResponse>;
}

/** Update fields in a given channel. */
export interface ApiChangeChannelPrivateRequest {
  //The clan id
  clanId?: string;
  //The ID of the channel to update.
  channelId?: string;
  //
  channelPrivate?: number;
  //
  roleIds?: Array<string>;
  //The users to add.
  userIds?: Array<string>;
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

/**  */
export interface ApiChannelCanvasDetailResponse {
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
}

/**  */
export interface ApiChannelCanvasItem {
  //
  content?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  isDefault?: boolean;
  //
  title?: string;
  // update time
  updateTime?: string;
  // create time
  createTime?: string;
}

/**  */
export interface ApiChannelCanvasListResponse {
  //
  channelCanvases?: Array<ApiChannelCanvasItem>;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  count?: number;
}

/**  */
export interface ApiEditChannelCanvasRequest {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  content?: string;
  //
  id?: string;
  //
  isDefault?: boolean;
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

/**  */
export interface ApiAddChannelAppRequest {
  //App url.
  appUrl?: string;
  //The appname.
  appname?: string;
  //Creator of the app.
  creatorId?: string;
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
  ageRestricted?: number;
  //
  categoryId?: string;
  //
  categoryName?: string;
  //The channel this message belongs to.
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
  countMessUnread?: number;
  //
  createTimeSeconds?: number;
  //creator ID.
  creatorId?: string;
  //
  creatorName?: string;
  //
  e2ee?: number;
  //
  isMute?: boolean;
  //
  lastPinMessage?: string;
  //
  lastSeenMessage?: ApiChannelMessageHeader;
  //
  lastSentMessage?: ApiChannelMessageHeader;
  //
  meetingCode?: string;
  //
  channelAvatar?: string;
  //The parent channel this message belongs to.
  parentId?: string;
  //The channel type.
  type?: number;
  //
  updateTimeSeconds?: number;
  //
  appId?: string;
  //
  topic?: string;
  //
  userIds?: Array<string>;
  //
  usernames?: Array<string>;
  //
  displayNames?: Array<string>;
  //
  onlines?: Array<boolean>;
  // DM status
  avatars?: Array<string>;
  // member count
  memberCount?: number;
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

/**  */
export interface ApiChannelMessageHeader {
  //
  attachment?: string;
  //
  content?: string;
  //
  id?: string;
  //
  mention?: string;
  //
  reaction?: string;
  //
  reference?: string;
  //
  repliers?: Array<string>;
  //
  senderId?: string;
  //
  timestampSeconds?: number;
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
export interface ApiCheckDuplicateClanNameResponse {
  //
  isDuplicate?: boolean;
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

/**  */
export interface ApiClanEmojiCreateRequest {
  //
  category?: string;
  //
  clanId?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  isForSale?: boolean;
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
export interface ApiClanStickerAddRequest {
  //
  category?: string;
  //
  clanId?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
  //
  mediaType?: number;
  //
  isForSale?: boolean;
}

/** A list of users belonging to a clan, along with their role. */
export interface ApiClanUserList {
  //
  clanId?: string;
  //User-role pairs for a clan.
  clanUsers?: Array<ClanUserListClanUser>;
  //Cursor for the next page of results, if any.
  cursor?: string;
}

/**  */
export interface ApiConfirmLoginRequest {
  //Whether to enable "Remember Me" for extended session duration.
  isRemember?: boolean;
  //
  loginId?: string;
}

/**  */
export interface ApiCreateActivityRequest {
  //
  activityDescription?: string;
  //
  activityName?: string;
  //
  activityType?: number;
  //
  applicationId?: string;
  //
  startTime?: string;
  //
  status?: number;
}

/**  */
export interface ApiCreateCategoryDescRequest {
  //
  categoryName?: string;
  //
  clanId?: string;
}

/** Create a channel within clan. */
export interface ApiCreateChannelDescRequest {
  //
  appId?: string;
  //
  categoryId?: string;
  //The channel this message belongs to.
  channelId?: string;
  //
  channelLabel?: string;
  //
  channelPrivate?: number;
  //
  clanId?: string;
  //The parent channel this message belongs to.
  parentId?: string;
  //The channel type.
  type?: number;
  //The users to add.
  userIds?: Array<string>;
}

/**  */
export interface ApiCreateClanDescRequest {
  //
  banner?: string;
  //
  clanName?: string;
  //
  creatorId?: string;
  //
  logo?: string;
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

/** Create a event within clan. */
export interface ApiUpdateEventRequest {
  //
  address?: string;
  //
  channelId?: string;
  //
  eventId?: string;
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
  clanId?: string;
}

/** Create a role within clan. */
export interface ApiCreateRoleRequest {
  //The permissions to add.
  activePermissionIds?: Array<string>;
  //The users to add.
  addUserIds?: Array<string>;
  //
  allowMention?: number;
  //
  clanId?: string;
  //
  color?: string;
  //
  description?: string;
  //
  displayOnline?: number;
  //
  maxPermissionId: string;
  //
  roleIcon?: string;
  //
  title?: string;
  //
  orderRole?: number;
}

/** Delete a channel the user has access to. */
export interface ApiDeleteChannelDescRequest {
  //The clan id
  clanId?: string;
  //The id of a channel.
  channelId?: string;
}

/**  */
export interface ApiDeleteEventRequest {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  creatorId?: string;
  //The id of a event.
  eventId?: string;
  //
  eventLabel?: string;
}

/** Delete a role the user has access to. */
export interface ApiDeleteRoleRequest {
  //
  channelId?: string;
  //
  clanId?: string;
  //The id of a role.
  roleId?: string;
  //
  roleLabel?: string;
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
  objectIds?: Array<ApiDeleteStorageObjectId>;
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
  channelId?: string;
  //
  clanId?: string;
}

/**  */
export interface ApiRegisterStreamingChannelResponse {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  streamingUrl?: string;
}

/**  */
export interface ApiListStreamingChannelsResponse {
  //
  streamingChannels?: Array<ApiStreamingChannelResponse>;
}

export interface ApiEmojiListedResponse {
  //
  emojiList?: Array<ApiClanEmoji>;
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
  maxPermission?: number;
  //
  startEvent?: number;
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
  startTimeSeconds?: number;
  //
  endTimeSeconds?: number;
  //
  createTimeSeconds?: number;
  //
  meetRoom?: ApiGenerateMezonMeetResponse;
}

/**  */
export interface ApiListFavoriteChannelResponse {
  //
  channelIds?: Array<string>;
}

/**  */
export interface ApiFilterParam {
  //
  fieldName?: string;
  //
  fieldValue?: string;
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
export interface ApiGetKeyServerResp {
  //
  url?: string;
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

/**  */
export interface ApiGenerateMeetTokenExternalResponse {
  //
  guestUserId?: string;
  //
  token?: string;
  //
  guestAccessToken?: string;
}

/**  */
export interface ApiMeetParticipantRequest {
  //
  roomName?: string;
  //
  username?: string;
  //
  channelId?: string;
  //
  clanId?: string;
}

/**  */
export interface ApiGetPubKeysResponse {
  //
  pubKeys?: Array<GetPubKeysResponseUserPubKey>;
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

/** Add link invite users to. */
export interface ApiInviteUserRes {
  //
  channelDesc?: ApiChannelDescription;
  //id channel to add link to.
  channelId?: string;
  //
  channelLabel?: string;
  //id clan to add link to .
  clanId?: string;
  //
  clanName?: string;
  //
  userJoined?: boolean;
  //
  expiryTime?: string;
  //
  clanLogo: string;
  //
  memberCount: number;
}

/** Add link invite users to. */
export interface ApiLinkInviteUser {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  createTime?: string;
  //The user to add.
  creatorId?: string;
  //
  expiryTime?: string;
  //
  id?: string;
  //
  inviteLink?: string;
}

/** Add link invite users to. */
export interface ApiLinkInviteUserRequest {
  //id channel to add link to.
  channelId?: string;
  //id clan to add link to .
  clanId?: string;
  //
  expiryTime?: number;
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
export interface ApiMessage2InboxRequest {
  //
  attachments?: string;
  //
  avatar?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  content?: string;
  //
  mentions?: string;
  //
  messageId?: string;
  //
  reactions?: string;
  //
  references?: string;
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
export interface ApiMessageDeleted {
  //
  deletor?: string;
  //
  messageId?: string;
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
  createTimeSecond?: string;
  //
  loginId?: string;
  //
  platform?: string;
  //
  status?: number;
  //
  userId?: string;
  //
  username?: string;
}

/**  */
export interface ApiMarkAsReadRequest {
  //
  categoryId?: string;
  //
  channelId?: string;
  //
  clanId?: string;
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
  channel_label: string;
  /** The message that user react */
  message_id: string;
  //
  topic_id?: string;
  //
  emoji_recent_id?: string;
}

/**  */
export interface ApiMezonOauthClientList {
  //
  listMezonOauthClient?: Array<ApiMezonOauthClient>;
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
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
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
  createTimeSeconds?: number;
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

/**  */
export interface ApiStreamHttpCallbackRequest {
  //
  action?: string;
  //
  app?: string;
  //
  clientId?: string;
  //
  ip?: string;
  //
  pageUrl?: string;
  //
  param?: string;
  //
  serverId?: string;
  //
  serviceId?: string;
  //
  stream?: string;
  //
  streamId?: string;
  //
  streamUrl?: string;
  //
  tcUrl?: string;
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
export interface ApiPinMessageRequest {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  messageId?: string;
}

/**  */
export interface ApiPinMessagesList {
  //
  pinMessagesList?: Array<ApiPinMessage>;
}

/**  */
export interface ApiPubKey {
  //
  encr?: string;
  //
  sign?: string;
}

/**  */
export interface ApiPushPubKeyRequest {
  //
  PK?: ApiPubKey;
}

/**  */
export interface ApiRegistFcmDeviceTokenResponse {
  //
  deviceId?: string;
  //
  platform?: string;
  //
  token?: string;
}

/**  */
export interface ApiRegisterStreamingChannelRequest {
  //
  channelId?: string;
  //
  clanId?: string;
}

/**  */
export interface ApiRegisterStreamingChannelResponse {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  streamingUrl?: string;
}

/** Storage objects to get. */
export interface ApiReadStorageObjectId {
  //The collection which stores the object.
  collection?: string;
  //The key of the object within the collection.
  key?: string;
  //The user owner of the object.
  userId?: string;
}

/** Batch get storage objects. */
export interface ApiReadStorageObjectsRequest {
  //Batch of storage objects.
  objectIds?: Array<ApiReadStorageObjectId>;
}

/**  */
export interface ApiRegistrationEmailRequest {
  //
  avatarUrl?: string;
  //
  displayName?: string;
  //
  dob?: string;
  //A valid RFC-5322 email address.
  email?: string;
  //A password for the user account.
  password?: string;
  //A old password for the user account.
  oldPassword?: string;
  //Set the username on the account at register. Must be unique.
  username?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
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

/** Execute an Lua function on the server. */
export interface ApiRpc {
  //The authentication key used when executed as a non-client HTTP request.
  httpKey?: string;
  //The identifier of the function.
  id?: string;
  //The payload of the function which must be a JSON object.
  payload?: string;
}

/**  */
export interface ApiSdTopic {
  //
  channelId?: string;
  //
  clanId?: string;
  //
  createTime?: string;
  //
  creatorId?: string;
  //
  id?: string;
  //
  lastSentMessage?: ApiChannelMessageHeader;
  //
  messageId?: string;
  //
  status?: number;
  //
  updateTime?: string;
  //
  message?: ApiChannelMessage;
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
  channelId?: string;
  //
  clanId?: string;
  //
  messageId?: string;
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
  refreshToken?: string;
  //Authentication credentials.
  token?: string;
  // Whether to enable "Remember Me" for extended session duration.
  isRemember?: boolean;
  // endpoint url that belong to user
  apiUrl?: string;
  // id token for zklogin
  idToken?: string;
}

/** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
export interface ApiSessionLogoutRequest {
  //Refresh token to invalidate.
  refreshToken?: string;
  //Session token to log out.
  token?: string;
  // deviceId to log out.
  deviceId?: string;
  // platform 
  platform?: string;
}

/** Authenticate against the server with a refresh token. */
export interface ApiSessionRefreshRequest {
  //Whether to enable "Remember Me" for extended session duration.
  isRemember?: boolean;
  //Refresh token.
  token?: string;
  //Extra information that will be bundled in the session token.
  vars?: Record<string, string>;
}

/**  */
export interface ApiSetDefaultNotificationRequest {
  //
  categoryId?: string;
  //
  clanId?: string;
  //
  notificationType?: number;
}

/**  */
export interface ApiSetMuteRequest {
  //
  active?: number;
  //
  id?: string;
  //
  muteTime?: number;
  //
  clanId?: string;
}

/**  */
export interface ApiSetNotificationRequest {
  //
  channelCategoryId?: string;
  //
  notificationType?: number;
  // clanId
  clanId?: string;
}

/**  */
export interface ApiSortParam {
  //
  fieldName?: string;
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
  channelId?: string;
  //
  clanId?: string;
  //
  isStreaming?: boolean;
  //
  streamingUrl?: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiStreamingChannelUser {
  //
  channelId?: string;
  //
  id?: string;
  //
  participant?: string;
  //user for a channel.
  userId?: string;
}

/** A list of users belonging to a channel, along with their role. */
export interface ApiStreamingChannelUserList {
  //
  streamingChannelUsers?: Array<ApiStreamingChannelUser>;
}

/** System message details. */
export interface ApiSystemMessage {
  //
  boostMessage?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  hideAuditLog?: string;
  //
  id?: string;
  //
  setupTips?: string;
  //
  welcomeRandom?: string;
  //
  welcomeSticker?: string;
}

/** Request to get system message by clan and channel IDs. */
export interface ApiSystemMessageRequest {
  //
  boostMessage?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  hideAuditLog?: string;
  //
  setupTips?: string;
  //
  welcomeRandom?: string;
  //
  welcomeSticker?: string;
}

/** List of system message. */
export interface ApiSystemMessagesList {
  //
  systemMessagesList?: Array<ApiSystemMessage>;
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
export interface ApiTransactionDetail {
  //
  amount?: number;
  //
  createTime?: string;
  //
  updateTime?: string;
  //
  receiverId?: string;
  //
  receiverUsername?: string;
  //
  senderId?: string;
  //
  senderUsername?: string;
  //
  metadata?: string;
  //
  transId?: string;
}

/** Update a user's account details. */
export interface ApiUpdateAccountRequest {
  //
  aboutMe?: string;
  //A URL for an avatar image.
  avatarUrl?: string;
  //The display name of the user.
  displayName?: string;
  //
  dob?: string;
  //The email of the user's account.
  email?: string;
  //
  encryptPrivateKey?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  langTag?: string;
  //The location set by the user.
  location?: string;
  //
  logo?: string;
  //
  splashScreen?: string;
  //The timezone set by the user.
  timezone?: string;
}

/**  */
export interface ApiUpdateCategoryDescRequest {
  //The ID of the group to update.
  categoryId?: string;
  //
  categoryName?: string;
  // clan ID
  ClanId: string;
}
/**  */
export interface ApiUpdateCategoryOrderRequest {
  //
  categories?: Array<ApiCategoryOrderUpdate>;
  //
  clanId?: string;
}

/**  */
export interface ApiUpdateRoleChannelRequest {
  //
  channelId: string;
  //
  maxPermissionId: string;
  //The permissions to add.
  permissionUpdate?: Array<ApiPermissionUpdate>;
  //The ID of the role to update.
  roleId?: string;
  //
  roleLabel?: string;
  //The ID of the role to update.
  userId?: string;
}

/** Fetch a batch of zero or more users from the server. */
export interface ApiUpdateUsersRequest {
  //The avarar_url of a user.
  avatarUrl?: string;
  //The account username of a user.
  displayName?: string;
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
export interface ApiQuickMenuAccess {
  //
  actionMsg?: string;
  //
  background?: string;
  //
  botId?: string;
  //
  channelId?: string;
  //
  clanId?:string;
  //
  id?: string;
  //
  menuName?: string;
  //
  menuType?: number;
}

/**  */
export interface ApiQuickMenuAccessList {
  //
  listMenus?: Array<ApiQuickMenuAccess>;
}

/**  */
export interface ApiQuickMenuAccessRequest {
  //
  actionMsg?: string;
  //
  background?: string;
  //
  botId?: string;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  id?: string;
  //
  menuName?: string;
  //
  menuType?:number;
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

/**  */
export interface ApiUserStatus {
  //
  status?: string;
  //
  userId?: string;
}

/**  */
export interface ApiUserStatusUpdate {
  //
  minutes?: number;
  //
  status?: string;
  //
  untilTurnOn?: boolean;
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

/**  */
export interface ApiWebhookGenerateResponse {
  //
  avatar?: string;
  //
  channelId?: string;
  //
  hookName?: string;
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
  emojiRecents?: Array<ApiEmojiRecent>;
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
  dateLog?: string;
  //
  logs?: Array<ApiAuditLog>;
  //
  totalCount?: number;
}

/**  */
export interface ProtobufAny {
  //
  typeUrl?: string;
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
  listOnboarding?: Array<ApiOnboardingItem>;
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
  imageUrl?: string;
}

/**  */
export interface ApiOnboardingContent {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channelId?: string;
  //
  content?: string;
  //
  guideType?: number;
  //
  taskType?: number;
  //
  title?: string;
  //
  imageUrl?: string;
}

/**  */
export interface MezonUpdateOnboardingBody {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  content?: string;
  //
  taskType?: number;
  //
  title?: string;
  //
  imageUrl?: string;
}

/**  */
export interface ApiCreateOnboardingRequest {
  //
  clanId?: string;
  //
  contents?: Array<ApiOnboardingContent>;
}

/**  */
export interface ApiOnboardingItem {
  //
  answers?: Array<OnboardingAnswer>;
  //
  channelId?: string;
  //
  clanId?: string;
  //
  content?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  createTime?: string;
  //
  guideType?: number;
  //
  id?: string;
  //
  taskType?: number;
  //
  title?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  updateTime?: string;
  //
  imageUrl?: string;
}

/**  */
export interface MezonUpdateClanWebhookByIdBody {
  //avatar.
  avatar?: string;
  //clan id.
  clanId?: string;
  //reset token.
  resetToken?: boolean;
  //webhook name.
  webhookName?: string;
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
export interface ApiGenerateClanWebhookRequest {
  //avatar.
  avatar?: string;
  //clan id.
  clanId?: string;
  //webhook name.
  webhookName?: string;
}

/**  */
export interface ApiGenerateClanWebhookResponse {
  //avatar.
  avatar?: string;
  //clan id.
  clanId?: string;
  //url.
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
export interface MezonUpdateOnboardingStepByClanIdBody {
  //onboarding step.
  onboardingStep?: number;
}

/**  */
export interface ApiListOnboardingStepResponse {
  //list onboarding steps.
  listOnboardingStep?: Array<ApiOnboardingSteps>;
}

/**  */
export interface ApiOnboardingSteps {
  //clan id.
  clanId?: string;
  //id.
  id?: string;
  //onboarding step.
  onboardingStep?: number;
  //user id.
  userId?: string;
}

/**  */
export interface MezonapiCreateRoomChannelApps {
  //
  channelId?: string;
  //
  roomName?: string;
}

/**  */
export interface ApiGenerateMeetTokenRequest {
  //
  channelId?: string;
  //
  roomName?: string;
}

/**  */
export interface ApiGenerateMeetTokenResponse {
  //
  token?: string;
}

/**  */
export interface ApiUnlockedItemRequest {
  //
  itemId?: string;
  //
  itemType?: number;
}

/**  */
export interface ApiUnlockedItemResponse {
  //
  source?: string;
}

/**  */
export interface ApiMezonOauthClient {
  //
  accessTokenStrategy?: string;
  //
  allowedCorsOrigins?: Array<string>;
  //
  audience?: Array<string>;
  //
  authorizationCodeGrantAccessTokenLifespan?: string;
  //
  authorizationCodeGrantIdTokenLifespan?: string;
  //
  authorizationCodeGrantRefreshTokenLifespan?: string;
  //
  backchannelLogoutSessionRequired?: boolean;
  //
  backchannelLogoutUri?: string;
  //
  clientCredentialsGrantAccessTokenLifespan?: string;
  //
  clientId?: string;
  //
  clientName?: string;
  //
  clientSecret?: string;
  //
  clientSecretExpiresAt?: number;
  //
  clientUri?: string;
  //
  contacts?: Array<string>;
  //
  createdAt?: string;
  //
  frontchannelLogoutSessionRequired?: boolean;
  //
  frontchannelLogoutUri?: string;
  //
  grantTypes?: Array<string>;
  //
  implicitGrantAccessTokenLifespan?: string;
  //
  implicitGrantIdTokenLifespan?: string;
  //
  jwks?: Array<string>;
  //
  jwksUri?: string;
  //
  jwtBearerGrantAccessTokenLifespan?: string;
  //
  logoUri?: string;
  //
  owner?: string;
  //
  policyUri?: string;
  //
  postLogoutRedirectUris?: Array<string>;
  //
  redirectUris?: Array<string>;
  //
  refreshTokenGrantAccessTokenLifespan?: string;
  //
  refreshTokenGrantIdTokenLifespan?: string;
  //
  refreshTokenGrantRefreshTokenLifespan?: string;
  //
  registrationAccessToken?: string;
  //
  registrationClientUri?: string;
  //
  requestObjectSigningAlg?: string;
  //
  requestUris?: Array<string>;
  //
  responseTypes?: Array<string>;
  //
  scope?: string;
  //
  sectorIdentifierUri?: string;
  //
  skipConsent?: boolean;
  //
  skipLogoutConsent?: boolean;
  //
  subjectType?: string;
  //
  tokenEndpointAuthMethod?: string;
  //
  tokenEndpointAuthSigningAlg?: string;
  //
  tosUri?: string;
  //
  updatedAt?: string;
  //
  userinfoSignedResponseAlg?: string;
}

/**  */
export interface ApiCreateHashChannelAppsResponse {
  //
  webAppData?: string;
}

/**  */
export interface ApiUserEventRequest {
  // The ID of the clan to be updated.
  clanId?: string;
  //The ID of the event to be updated.
  eventId?: string;
}

/**  */
export interface ApiClanDiscover {
  //
  about?: string;
  //
  banner?: string;
  //
  clanId?: string;
  //
  clanLogo?: string;
  //
  clanName?: string;
  //
  description?: string;
  //
  inviteId?: string;
  //
  onlineMembers?: number;
  //
  totalMembers?: number;
  //
  verified?: boolean;
  //
  shortUrl?: string;
  //
  createTime?: string;
}

/**  */
export interface ApiListForSaleItemsRequest {
  //
  page?: number;
}

/**  */
export interface ApiForSaleItem {
  //
  previewUrl?: string;
  //
  type?: number;
}

/**  */
export interface ApiForSaleItemList {
  //
  forSaleItems?: Array<ApiForSaleItem>;
}

/**  */
export interface ApiListClanDiscover {
  //
  clanDiscover?: Array<ApiClanDiscover>;
  //
  page?: number;
  //
  pageCount?: number;
}

/**  */
export interface ApiListClanUnreadMsgIndicatorResponse {
  //
  hasUnreadMessage?: boolean;
}

export interface ApiListClanBadgeCountResponse {
  //
  badgeCount?: number;
}

/**  */
export interface ApiClanDiscoverRequest {
  //
  clanId?: string;
  //
  itemPerPage?: number;
  //
  pageNumber?: number;
}

/**  */
export interface ApiIsFollowerRequest {
  //
  followId?: string;
}

/**  */
export interface ApiLinkAccountConfirmRequest {
  //
  otpCode?: string;
  //
  reqId?: string;
  //
  status?: number;
}

/**  */
export interface ApiIsFollowerResponse {
  //
  isFollower?: boolean;
  //
  followId?: string;
}

/**  */
export interface ApiTransferOwnershipRequest {
  //
  clanId?: string;
  //
  newOwnerId?: string;
}

/** Update fields in a given channel. */
export interface ApiUpdateChannelDescRequest {
  /** The ID of the channel to update. */
  channelId: string;
  /** The channel lable */
  channelLabel: string | undefined;
  /** The category of channel */
  categoryId: string | undefined;
  /** The app url of channel */
  appId: string | undefined;
  //
  e2ee?: number;
  //
  topic?: string;
  //
  ageRestricted?: number;
  //
  channelAvatar?: string;
}

/** Add users to a channel. */
export interface ApiAddChannelUsersRequest {
  /** The channel to add users to. */
  channelId: string;
  /** The users to add. */
  userIds: string[];
}

/** Kick a set of users from a channel. */
export interface ApiKickChannelUsersRequest {
  /** The channel ID to kick from. */
  channelId: string;
  /** The users to kick. */
  userIds: string[];
}

/** Leave a channel. */
export interface ApiLeaveChannelRequest {
  /** The channel ID to leave. */
  channelId: string;
}

/** Update Clan profile information */
export interface ApiUpdateClanDescProfileRequest {
  /** Clan id */
  clanId: string;
  /** Clan nick name */
  nickName: string;
  /** Clan profile banner */
  profileBanner: string;
  /** Clan profile theme */
  profileTheme: string;
  /** Clan profile avatar */
  avatarUrl: string;
}

export interface ApiUpdateClanProfileRequest {
  /** Clan id*/
  clanId: string;
  /** Clan nick name */
  nickName: string;
  /** Clan profile avatar */
  avatar: string;
}

/** Update fields in a given role. */
export interface ApiUpdateRoleRequest {
  /** The ID of the role to update. */
  roleId: string;
  /** The users to add. */
  addUserIds: string[];
  /** The permissions to add. */
  activePermissionIds: string[];
  /** The users to remove. */
  removeUserIds: string[];
  /** The permissions to remove. */
  removePermissionIds: string[];
  //
  clanId: string;
  maxPermissionId: string;
  title?: string | undefined;
  color?: string | undefined;
  roleIcon?: string | undefined;
  description?: string | undefined;
  displayOnline?: number | undefined;
  allowMention?: number | undefined;
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
