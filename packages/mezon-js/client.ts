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

import { create } from "@bufbuild/protobuf";
import { createConnectTransport } from "@connectrpc/connect-web";
import {
  CallOptions,
  createClient,
  type Client as RPCClient,
} from "@connectrpc/connect";
import { Mezon as MezonService } from "../webrpc/frontend/src/gen/apigrpc_pb";
import { Session } from "./session";
import {
  ChannelDescription,
  DefaultSocket,
  NotificationSetting,
  Socket,
} from "./socket";
import { safeJSONParse } from "./utils";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";
import {
  Account,
  AccountEmail,
  AccountMezon,
  AddAppRequest,
  AddFavoriteChannelResponse,
  AddFriendsResponse,
  AddRoleChannelDescRequest,
  AllUserClans,
  AllUsersAddChannelResponse,
  App,
  AppList,
  BannedUserList,
  CategoryDesc,
  CategoryDescList,
  ChanEncryptionMethod,
  ChangeChannelPrivateRequest,
  ChannelAttachmentList,
  ChannelCanvasListResponse,
  ChannelDescList,
  ChannelMessageHeader,
  ChannelSettingListResponse,
  ChannelUserList,
  CheckDuplicateClanNameResponse,
  ClanDesc,
  ClanDescList,
  ClanEmojiCreateRequest,
  ClanProfile,
  ClanStickerAddRequest,
  ClanUserList,
  ConfirmLoginRequest,
  CreateActivityRequest,
  CreateCategoryDescRequest,
  CreateChannelDescRequest,
  CreateClanDescRequest,
  CreateEventRequest,
  CreateOnboardingRequest,
  CreateRoleRequest,
  DeleteChannelDescRequest,
  DeleteEventRequest,
  DeleteRoleRequest,
  EditChannelCanvasRequest,
  EmojiListedResponse,
  EmojiRecentList,
  EventList,
  EventManagement,
  ForSaleItemList,
  Friend,
  FriendList,
  GenerateClanWebhookRequest,
  GenerateClanWebhookResponse,
  GenerateMeetTokenRequest,
  GenerateMeetTokenResponse,
  GenerateMezonMeetResponse,
  GetKeyServerResp,
  GetPubKeysResponse,
  GiveCoffeeEvent,
  InviteUserRes,
  IsBannedRequestSchema,
  IsBannedResponse,
  IsFollowerRequest,
  IsFollowerResponse,
  LinkAccountConfirmRequest,
  LinkInviteUser,
  LinkInviteUserRequest,
  ListChannelAppsResponse,
  ListClanUnreadMsgIndicatorResponse,
  ListClanWebhookResponse,
  ListOnboardingResponse,
  ListOnboardingStepResponse,
  ListUserActivity,
  LogedDevice,
  LogedDeviceList,
  LoginIDResponse,
  LoginRequest,
  MarkAsReadRequest,
  MeetParticipantRequest,
  Message2InboxRequest,
  MessageAttachment,
  MessageMention,
  MessageReaction,
  MessageRef,
  MezonOauthClient,
  MezonOauthClientList,
  NotificationChannelCategorySettingList,
  NotificationUserChannel,
  NotifiReactMessage,
  OnboardingItem,
  PermissionList,
  PermissionRoleChannelListEventResponse,
  PinMessageRequest,
  PinMessagesList,
  PubKey,
  QuickMenuAccessList,
  RegisterStreamingChannelRequest,
  RegisterStreamingChannelResponse,
  RegistFcmDeviceTokenResponse,
  ReportMessageAbuseReqestSchema,
  Role,
  RoleList,
  RoleListEventResponse,
  RoleUserList,
  Rpc,
  SdTopic,
  SdTopicList,
  SdTopicRequest,
  SearchMessageRequest,
  SearchMessageResponse,
  SessionRefreshRequestSchema,
  SetDefaultNotificationRequest,
  SetMuteRequest,
  SetNotificationRequest,
  StickerListedResponse,
  StreamingChannelUserList,
  SystemMessage,
  SystemMessageRequest,
  SystemMessagesList,
  TokenSentEvent,
  TransferOwnershipRequest,
  UnlockedItemResponse,
  UpdateAccountRequest,
  UpdateCategoryDescRequest,
  UpdateCategoryOrderRequest,
  UpdateClanOrderRequest,
  UpdateRoleChannelRequest,
  UpdateRoleOrderRequest,
  UpdateUsernameRequest,
  UploadAttachment,
  UploadAttachmentRequest,
  User,
  UserActivity,
  UserEventRequest,
  UserPermissionInChannelListResponse,
  UserStatus,
  UserStatusUpdate,
  VoiceChannelUserList,
  WebhookCreateRequest,
  WebhookGenerateResponse,
  WebhookListResponse,
} from "packages/webrpc/frontend/src/gen/api/api_pb";
import { EmptySchema } from "@bufbuild/protobuf/wkt";
import { encode } from "js-base64";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 30000;

export enum ChannelType {
  CHANNEL_TYPE_CHANNEL = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_STREAMING = 6,
  CHANNEL_TYPE_THREAD = 7,
  CHANNEL_TYPE_APP = 8,
  CHANNEL_TYPE_ANNOUNCEMENT = 9,
  CHANNEL_TYPE_MEZON_VOICE = 10,
}
export enum ChannelStreamMode {
  STREAM_MODE_CHANNEL = 2,
  STREAM_MODE_GROUP = 3,
  STREAM_MODE_DM = 4,
  STREAM_MODE_CLAN = 5,
  STREAM_MODE_THREAD = 6,
}

export enum NotificationType {
  ALL_MESSAGE = 1,
  MENTION_MESSAGE = 2,
  NOTHING_MESSAGE = 3,
}

export enum WebrtcSignalingType {
  WEBRTC_SDP_INIT = 0,
  WEBRTC_SDP_OFFER = 1,
  WEBRTC_SDP_ANSWER = 2,
  WEBRTC_ICE_CANDIDATE = 3,
  WEBRTC_SDP_QUIT = 4,
  WEBRTC_SDP_TIMEOUT = 5,
  WEBRTC_SDP_NOT_AVAILABLE = 6,
  WEBRTC_SDP_JOINED_OTHER_CALL = 7,
  WEBRTC_SDP_STATUS_REMOTE_MEDIA = 8,
}

/** Response for an RPC function executed on the server. */
export interface RpcResponse {
  /** The identifier of the function. */
  id?: string;
  /** The payload of the function which must be a JSON object. */
  payload?: object;
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
  reactions?: Array<MessageReaction>;
  //
  mentions?: Array<MessageMention>;
  //
  attachments?: Array<MessageAttachment>;
  //
  references?: Array<MessageRef>;
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

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheable_cursor?: string;
  /**last seen message from user on channel */
  last_seen_message?: ChannelMessageHeader;
  /**last sent message from channel */
  last_sent_message?: ChannelMessageHeader;
  /** A list of messages. */
  messages?: Array<ChannelMessage>;
  /** The cursor to send when retireving the next page, if any. */
  next_cursor?: string;
  /** The cursor to send when retrieving the previous page, if any. */
  prev_cursor?: string;
}

/** A collection of zero or more users. */
export interface Users {
  /** The User objects. */
  users?: Array<User>;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  /** The Friend objects. */
  friends?: Array<Friend>;
  /** Cursor for the next page of results, if any. */
  cursor?: string;
}

/** A notification in the server. */
export interface Notification {
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
}

/** A collection of zero or more notifications. */
export interface NotificationList {
  /** Use this cursor to paginate notifications. Cache this to catch up to new notifications. */
  cacheable_cursor?: string;
  /** Collection of notifications. */
  notifications?: Array<Notification>;
}

/** Update fields in a given channel. */
export interface UpdateChannelDescRequest {
  /** The ID of the channel to update. */
  channel_id: string;
  /** The channel lable */
  channel_label: string | undefined;
  /** The category of channel */
  category_id: string | undefined;
  /** The app url of channel */
  app_id: string | undefined;
  //
  e2ee?: number;
  //
  topic?: string;
  //
  age_restricted?: number;
  //
  channel_avatar?: string;
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

export interface UpdateClanProfileRequest {
  /** Clan id*/
  clan_id: string;
  /** Clan nick name */
  nick_name: string;
  /** Clan profile avatar */
  avatar: string;
}

/** Update fields in a given role. */
export interface UpdateRoleRequest {
  /** The ID of the role to update. */
  role_id: string;
  /** The users to add. */
  add_user_ids: string[];
  /** The permissions to add. */
  active_permission_ids: string[];
  /** The users to remove. */
  remove_user_ids: string[];
  /** The permissions to remove. */
  remove_permission_ids: string[];
  //
  clan_id: string;
  max_permission_id: string;
  title?: string | undefined;
  color?: string | undefined;
  role_icon?: string | undefined;
  description?: string | undefined;
  display_online?: number | undefined;
  allow_mention?: number | undefined;
}

/** A client for Mezon server. */
export class Client {
  /** The low level API client for Mezon server. */
  private readonly mezonClient: RPCClient<typeof MezonService>;

  /** thre refreshTokenPromise */
  private refreshTokenPromise: Promise<Session> | null = null;
  host: string;
  port: string;
  useSSL: boolean;

  constructor(
    readonly serverkey = DEFAULT_SERVER_KEY,
    host = DEFAULT_HOST,
    port = DEFAULT_PORT,
    useSSL = false,
    readonly timeout = DEFAULT_TIMEOUT_MS,
    readonly autoRefreshSession = true
  ) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    const transport = createConnectTransport({
      baseUrl: basePath,
    });

    this.mezonClient = createClient(MezonService, transport);
  }

  /**
   * Called when a token refresh is initiated.
   * This is a placeholder method that subclasses or instances can override
   * to perform actions before or after the refresh logic.
   */
  onRefreshSession(session: Session): void {
    console.log(`Token refresh occurred. Token: ${session.token}`);
  }

  /** check session isexpired */
  isexpired(session: Session): boolean {
    return session.isexpired(Date.now() / 1000);
  }

  // /** Authenticate a user with a custom id against the server. */
  // authenticateMezon(
  //   token: string,
  //   create?: boolean,
  //   username?: string,
  //   isRemember?: boolean,
  //   vars: Record<string, string> = {},
  //   options: any = {}
  // ): Promise<Session> {
  //   const request = {
  //     token: token,
  //     vars: vars,
  //   };

  //   return this.mezonClient
  //     .authenticateMezon(
  //       this.serverkey,
  //       "",
  //       request,
  //       create,
  //       username,
  //       isRemember,
  //       options
  //     )
  //     .then((apiSession: Session) => {
  //       return new Session(
  //         apiSession.token || "",
  //         apiSession.refresh_token || "",
  //         apiSession.created || false,
  //         apiSession.api_url || "",
  //         apiSession.id_token || "",
  //         apiSession.is_remember || false
  //       );
  //     });
  // }

  // /** Authenticate a user with an email+otp against the server. */
  // authenticateSMSOTPRequest(
  //   phoneno: string,
  //   username?: string,
  //   vars?: Record<string, string>
  // ): Promise<LinkAccountConfirmRequest> {
  //   const request = {
  //     username: username,
  //     account: {
  //       phoneno: phoneno,
  //       vars: vars,
  //     },
  //   };

  //   return this.mezonClient
  //     .AuthenticateSMSOTPRequest(this.serverkey, "", request, username)
  //     .then((response: LinkAccountConfirmRequest) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Authenticate a user with an email+otp against the server. */
  // authenticateEmailOTPRequest(
  //   email: string,
  //   username?: string,
  //   vars?: Record<string, string>
  // ): Promise<LinkAccountConfirmRequest> {
  //   const request = {
  //     username: username,
  //     account: {
  //       email: email,
  //       vars: vars,
  //     },
  //   };

  //   return this.mezonClient
  //     .AuthenticateEmailOTPRequest(this.serverkey, "", request, username)
  //     .then((response: LinkAccountConfirmRequest) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async confirmAuthenticateOTP(
  //   request: LinkAccountConfirmRequest
  // ): Promise<Session> {
  //   return this.mezonClient
  //     .confirmAuthenticateOTP(this.serverkey, "", request)
  //     .then((apiSession: Session) => {
  //       return new Session(
  //         apiSession.token || "",
  //         apiSession.refresh_token || "",
  //         apiSession.created || false,
  //         apiSession.api_url || "",
  //         apiSession.id_token || "",
  //         apiSession.is_remember || false
  //       );
  //     });
  // }

  // /** Authenticate a user with an email+password against the server. */
  // authenticateEmail(
  //   email: string,
  //   password: string,
  //   username?: string,
  //   vars?: Record<string, string>
  // ): Promise<Session> {
  //   const request = {
  //     username: username,
  //     account: {
  //       email: email,
  //       password: password,
  //       vars: vars,
  //     },
  //   };

  //   return this.mezonClient
  //     .authenticateEmail(this.serverkey, "", request, username)
  //     .then((apiSession: Session) => {
  //       return new Session(
  //         apiSession.token || "",
  //         apiSession.refresh_token || "",
  //         apiSession.created || false,
  //         apiSession.api_url || "",
  //         apiSession.id_token || "",
  //         apiSession.is_remember || false
  //       );
  //     });
  // }

  // /** set base path */
  // // setBasePath(host: string, port: string, useSSL: boolean) {
  // //   this.host = host;
  // //   this.port = port;
  // //   this.useSSL = useSSL;

  // //   const scheme = useSSL ? "https://" : "http://";
  // //   const basePath = `${scheme}${host}:${port}`;
  // //   const transport = createConnectTransport({
  // //     baseUrl: basePath,
  // //   });
  // //   this.apiClient = createClient(MezonService, transport);
  // // }

  // /** Add users to a channel, or accept their join requests. */
  // async addChannelUsers(
  //   session: Session,
  //   channelId: string,
  //   ids?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.addChannelUsers().then((response: any) => {
  //     return response !== undefined;
  //   });
  // }

  // /** Add friends by ID or username to a user's account. */
  // async addFriends(
  //   session: Session,
  //   ids?: Array<string>,
  //   usernames?: Array<string>
  // ): Promise<AddFriendsResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.addFriends(session.token, ids, usernames);
  // }

  // /** Block one or more users by ID or username. */
  // async blockFriends(
  //   session: Session,
  //   ids?: Array<string>,
  //   usernames?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .blockFriends(session.token, ids, usernames)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Block one or more users by ID or username. */
  // async unblockFriends(
  //   session: Session,
  //   ids?: Array<string>,
  //   usernames?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .unblockFriends(session.token, ids, usernames)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Create a new group with the current user as the creator and superadmin. */
  // async uploadOauthFile(
  //   session: Session,
  //   request: UploadAttachmentRequest
  // ): Promise<UploadAttachment> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.uploadOauthFile(session.token, request);
  // }

  // /** Create a new group with the current user as the creator and superadmin. */
  // async uploadAttachmentFile(
  //   session: Session,
  //   request: UploadAttachmentRequest
  // ): Promise<UploadAttachment> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.uploadAttachmentFile(session.token, request);
  // }

  // /** Create a channel within clan */
  // async createChannelDesc(
  //   session: Session,
  //   request: CreateChannelDescRequest
  // ): Promise<ChannelDescription> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createChannelDesc(session.token, request)
  //     .then((response: ChannelDescription) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Create a clan */
  // async createClanDesc(
  //   session: Session,
  //   request: CreateClanDescRequest
  // ): Promise<ClanDesc> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createClanDesc(session.token, request)
  //     .then((response: ClanDesc) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /**  */
  // async createCategoryDesc(
  //   session: Session,
  //   request: CreateCategoryDescRequest
  // ): Promise<CategoryDesc> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createCategoryDesc(session.token, request)
  //     .then((response: CategoryDesc) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Create a new role for clan. */
  // async createRole(
  //   session: Session,
  //   request: CreateRoleRequest
  // ): Promise<Role> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createRole(session.token, request)
  //     .then((response: Role) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Create a new event for clan. */
  // async createEvent(
  //   session: Session,
  //   request: CreateEventRequest
  // ): Promise<EventManagement> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createEvent(session.token, request)
  //     .then((response: EventManagement) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** add role for channel. */
  // async addRolesChannelDesc(
  //   session: Session,
  //   request: AddRoleChannelDescRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addRolesChannelDesc(session.token, request)
  //     .then((response: Role) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update action role when delete role */
  // async deleteRoleChannelDesc(
  //   session: Session,
  //   request: DeleteRoleRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteRoleChannelDesc(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async deleteApp(session: Session, appId: string): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteApp(session.token, appId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** A socket created with the client's configuration. */
  // createSocket(
  //   useSSL = false,
  //   verbose: boolean = false,
  //   adapter: WebSocketAdapter = new WebSocketAdapterText(),
  //   sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs
  // ): Socket {
  //   return new DefaultSocket(
  //     this.host,
  //     this.port,
  //     useSSL,
  //     verbose,
  //     adapter,
  //     sendTimeoutMs
  //   );
  // }

  // /** Delete one or more users by ID or username. */
  // async deleteFriends(
  //   session: Session,
  //   ids?: Array<string>,
  //   usernames?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteFriends(session.token, ids, usernames)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete a channel by ID. */
  // async deleteChannelDesc(
  //   session: Session,
  //   clanId: string,
  //   channelId: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteChannelDesc(session.token, clanId, channelId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete a clan desc by ID. */
  // async deleteClanDesc(session: Session, clanDescId: string): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteClanDesc(session.token, clanDescId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete a category by ID. */
  // async deleteCategoryDesc(
  //   session: Session,
  //   categoryId: string,
  //   clanId: string,
  //   categoryLabel?: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteCategoryDesc(session.token, categoryId, clanId, categoryLabel)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete one or more notifications */
  // async deleteNotifications(
  //   session: Session,
  //   ids?: Array<string>,
  //   category?: number
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteNotifications(session.token, ids, category)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Delete a role by ID. */
  // async deleteRole(
  //   session: Session,
  //   roleId: string,
  //   clanId: string,
  //   roleLabel?: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteRole(session.token, roleId, "", clanId, roleLabel)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete a event by ID. */
  // async deleteEvent(
  //   session: Session,
  //   eventId: string,
  //   clanId: string,
  //   creatorId: string,
  //   eventLabel?: string,
  //   channelId?: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteEvent(
  //       session.token,
  //       eventId,
  //       clanId,
  //       creatorId,
  //       eventLabel,
  //       channelId
  //     )
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** update user a event by ID. */
  // async updateEventUser(
  //   session: Session,
  //   request: DeleteEventRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateEventUser(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Submit an event for processing in the server's registered runtime custom events handler. */
  // async emitEvent(session: Session, request: Event): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .event(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Fetch the current user's account. */
  // async getAccount(session: Session): Promise<Account> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.getAccount(session.token);
  // }

  // /** Kick a set of users from a clan. */
  // async removeClanUsers(
  //   session: Session,
  //   clanId: string,
  //   ids?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .removeClanUsers(session.token, clanId, ids)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // async listBannedUsers(
  //   session: Session,
  //   clanId?: string,
  //   channelId?: string
  // ): Promise<BannedUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listBannedUsers(session.token, clanId, channelId)
  //     .then((response: BannedUserList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Ban a set of users from a clan. */
  // async unbanClanUsers(
  //   session: Session,
  //   clanId: string,
  //   channelId?: string,
  //   userIds?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .unbanClanUsers(session.token, clanId, channelId, userIds)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Ban a set of users from a clan. */
  // async banClanUsers(
  //   session: Session,
  //   clanId: string,
  //   channelId?: string,
  //   userIds?: Array<string>,
  //   banTime?: number
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .banClanUsers(session.token, clanId, channelId, userIds, banTime)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** Kick users from a channel, or decline their join requests. */
  // async removeChannelUsers(
  //   session: Session,
  //   channelId: string,
  //   ids?: Array<string>
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .removeChannelUsers(session.token, channelId, ids)
  //     .then((response: any) => {
  //       return Promise.resolve(response != undefined);
  //     });
  // }

  // /** List a channel's message history. */
  // async listChannelMessages(
  //   session: Session,
  //   clanId: string,
  //   channelId: string,
  //   messageId?: string,
  //   direction?: number,
  //   limit?: number,
  //   topicId?: string
  // ): Promise<ChannelMessageList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelMessages(
  //       session.token,
  //       clanId,
  //       channelId,
  //       messageId,
  //       direction,
  //       limit,
  //       topicId
  //     )
  //     .then((response: ChannelMessageList) => {
  //       var result: ChannelMessageList = {
  //         messages: [],
  //         last_seen_message: response.last_seen_message,
  //         last_sent_message: response.last_sent_message,
  //       };

  //       if (response.messages == null) {
  //         return Promise.resolve(result);
  //       }
  //       response.messages!.forEach((m) => {
  //         var content, reactions, mentions, attachments, references;
  //         try {
  //           content = safeJSONParse(m.content);
  //         } catch (e) {
  //           console.log("error parse content", e);
  //         }
  //         try {
  //           reactions = safeJSONParse(m.reactions || "[]");
  //         } catch (e) {
  //           console.log("error parse reactions", e);
  //         }
  //         try {
  //           mentions = safeJSONParse(m.mentions || "[]");
  //         } catch (e) {
  //           console.log("error parse mentions", e);
  //         }
  //         try {
  //           attachments = safeJSONParse(m.attachments || "[]");
  //         } catch (e) {
  //           console.log("error parse attachments", e);
  //         }
  //         try {
  //           references = safeJSONParse(m.references || "[]");
  //         } catch (e) {
  //           console.log("error parse references", e);
  //         }
  //         result.messages!.push({
  //           channel_id: m.channel_id,
  //           code: m.code ? Number(m.code) : 0,
  //           create_time: m.create_time || "",
  //           id: m.message_id,
  //           sender_id: m.sender_id,
  //           update_time: m.update_time,
  //           username: m.username,
  //           display_name: m.display_name,
  //           avatar: m.avatar,
  //           content: content,
  //           channel_label: m.channel_label,
  //           clan_logo: m.clan_logo,
  //           category_name: m.category_name,
  //           clan_nick: m.clan_nick,
  //           clan_avatar: m.clan_avatar,
  //           attachments: attachments,
  //           mentions: mentions,
  //           reactions: reactions,
  //           references: references,
  //           clan_id: m.clan_id,
  //           create_time_seconds: m.create_time_seconds,
  //           update_time_seconds: m.update_time_seconds,
  //           hide_editted: m.hide_editted,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List a channel's users. */
  // async listChannelVoiceUsers(
  //   session: Session,
  //   clanId: string,
  //   channelId: string,
  //   channelType: number,
  //   state?: number,
  //   limit?: number,
  //   cursor?: string
  // ): Promise<VoiceChannelUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelVoiceUsers(
  //       session.token,
  //       clanId,
  //       channelId,
  //       channelType,
  //       limit,
  //       state,
  //       cursor
  //     )
  //     .then((response: VoiceChannelUserList) => {
  //       var result: VoiceChannelUserList = {
  //         voice_channel_users: [],
  //       };

  //       if (response.voice_channel_users == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.voice_channel_users!.forEach((gu) => {
  //         result.voice_channel_users!.push({
  //           id: gu.id,
  //           channel_id: gu.channel_id,
  //           user_id: gu.user_id,
  //           participant: gu.participant,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List a channel's users. */
  // async listChannelUsers(
  //   session: Session,
  //   clanId: string,
  //   channelId: string,
  //   channelType: number,
  //   state?: number,
  //   limit?: number,
  //   cursor?: string
  // ): Promise<ChannelUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelUsers(
  //       session.token,
  //       clanId,
  //       channelId,
  //       channelType,
  //       limit,
  //       state,
  //       cursor
  //     )
  //     .then((response: ChannelUserList) => {
  //       var result: ChannelUserList = {
  //         channel_users: [],
  //         cursor: response.cursor,
  //         channel_id: response.channel_id,
  //       };

  //       if (response.channel_users == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.channel_users!.forEach((gu) => {
  //         result.channel_users!.push({
  //           user_id: gu.user_id,
  //           role_id: gu!.role_id,
  //           thread_id: gu.thread_id,
  //           clan_avatar: gu.clan_avatar,
  //           clan_nick: gu.clan_nick,
  //           id: gu.id,
  //           clan_id: gu.clan_id,
  //           added_by: gu.added_by,
  //           is_banned: gu.is_banned,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List a channel's attachment. */
  // async listChannelAttachments(
  //   session: Session,
  //   clanId: string,
  //   channelId: string,
  //   fileType: string,
  //   state?: number,
  //   limit?: number,
  //   before?: number,
  //   after?: number
  // ): Promise<ChannelAttachmentList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelAttachment(
  //       session.token,
  //       channelId,
  //       clanId,
  //       fileType,
  //       limit,
  //       state,
  //       before,
  //       after
  //     )
  //     .then((response: ChannelAttachmentList) => {
  //       var result: ChannelAttachmentList = {
  //         attachments: [],
  //       };

  //       if (response.attachments == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.attachments!.forEach((at) => {
  //         result.attachments!.push({
  //           filename: at.filename,
  //           filesize: at.filesize,
  //           filetype: at.filetype,
  //           id: at.id,
  //           uploader: at.uploader,
  //           url: at.url,
  //           message_id: at.message_id,
  //           create_time: at.create_time,
  //           width: at.width,
  //           height: at.height,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List a channel's users. */
  // async listClanUsers(session: Session, clanId: string): Promise<ClanUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listClanUsers(session.token, clanId)
  //     .then((response: ClanUserList) => {
  //       var result: ClanUserList = {
  //         clan_users: [],
  //         cursor: response.cursor,
  //         clan_id: response.clan_id,
  //       };

  //       if (response.clan_users == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.clan_users!.forEach((gu) => {
  //         result.clan_users!.push({
  //           user: {
  //             avatar_url: gu.user!.avatar_url,
  //             create_time: gu.user!.create_time,
  //             display_name: gu.user!.display_name,
  //             edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count) : 0,
  //             id: gu.user!.id,
  //             lang_tag: gu.user!.lang_tag,
  //             location: gu.user!.location,
  //             online: gu.user!.online,
  //             is_mobile: gu.user?.is_mobile,
  //             timezone: gu.user!.timezone,
  //             update_time: gu.user!.update_time,
  //             username: gu.user!.username,
  //             user_status: gu.user!.user_status,
  //             status: gu.user!.status,
  //             about_me: gu.user!.about_me,
  //             mezon_id: gu.user!.mezon_id,
  //             list_nick_names: gu.user!.list_nick_names,
  //             phone_number: gu.user!.phone_number,
  //           },
  //           role_id: gu!.role_id,
  //           clan_nick: gu!.clan_nick,
  //           clan_avatar: gu!.clan_avatar,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // async listChannelDetail(
  //   session: Session,
  //   channelId: string
  // ): Promise<ChannelDescription> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelDetail(session.token, channelId)
  //     .then((response: ChannelDescription) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List channels. */
  // async listChannelDescs(
  //   session: Session,
  //   limit?: number,
  //   state?: number,
  //   cursor?: string,
  //   clanId?: string,
  //   channelType?: number,
  //   isMobile?: boolean
  // ): Promise<ChannelDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelDescs(
  //       session.token,
  //       limit,
  //       state,
  //       cursor,
  //       clanId,
  //       channelType,
  //       isMobile
  //     )
  //     .then((response: ChannelDescList) => {
  //       var result: ChannelDescList = {
  //         channeldesc: [],
  //         next_cursor: response.next_cursor,
  //         prev_cursor: response.prev_cursor,
  //         cacheable_cursor: response.cacheable_cursor,
  //       };

  //       if (response.channeldesc == null) {
  //         return Promise.resolve(result);
  //       }

  //       result.channeldesc = response.channeldesc;
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List clans */
  // async listClanUnreadMsgIndicator(
  //   session: Session,
  //   clanId: string
  // ): Promise<ListClanUnreadMsgIndicatorResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listClanUnreadMsgIndicator(session.token, clanId)
  //     .then((response: ListClanUnreadMsgIndicatorResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List clans */
  // async listClanDescs(
  //   session: Session,
  //   limit?: number,
  //   state?: number,
  //   cursor?: string
  // ): Promise<ClanDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listClanDescs(session.token, limit, state, cursor)
  //     .then((response: ClanDescList) => {
  //       var result: ClanDescList = {
  //         clandesc: [],
  //       };

  //       if (response.clandesc == null) {
  //         return Promise.resolve(result);
  //       }

  //       result.clandesc = response.clandesc;
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List categories. */
  // async listCategoryDescs(
  //   session: Session,
  //   clanId: string,
  //   creatorId?: string,
  //   categoryName?: string
  // ): Promise<CategoryDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listCategoryDescs(session.token, clanId, creatorId, categoryName)
  //     .then((response: CategoryDescList) => {
  //       var result: CategoryDescList = {
  //         categorydesc: [],
  //       };

  //       if (response.categorydesc == null) {
  //         return Promise.resolve(result);
  //       }

  //       result.categorydesc = response.categorydesc;
  //       return Promise.resolve(result);
  //     });
  // }

  // /** List event */
  // async listEvents(session: Session, clanId?: string): Promise<EventList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listEvents(session.token, clanId)
  //     .then((response: EventList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List permission */
  // async getListPermission(session: Session): Promise<PermissionList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getListPermission(session.token)
  //     .then((response: PermissionList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List user roles */
  // async listRolePermissions(
  //   session: Session,
  //   roleId: string
  // ): Promise<PermissionList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listRolePermissions(session.token, roleId)
  //     .then((response: PermissionList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List user roles */
  // async listRoleUsers(
  //   session: Session,
  //   roleId: string,
  //   limit?: number,
  //   cursor?: string
  // ): Promise<RoleUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listRoleUsers(session.token, roleId, limit, cursor)
  //     .then((response: RoleUserList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async registFCMDeviceToken(
  //   session: Session,
  //   tokenId: string,
  //   deviceId: string,
  //   platform: string,
  //   voipToken?: string
  // ): Promise<RegistFcmDeviceTokenResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .registFCMDeviceToken(
  //       session.token,
  //       tokenId,
  //       deviceId,
  //       platform,
  //       voipToken
  //     )
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getUserProfileOnClan(
  //   session: Session,
  //   clanId: string
  // ): Promise<ClanProfile> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getUserProfileOnClan(session.token, clanId)
  //     .then((response: ClanProfile) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //
  // async closeDirectMess(
  //   session: Session,
  //   request: DeleteChannelDescRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .closeDirectMess(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }
  // //
  // async openDirectMess(
  //   session: Session,
  //   request: DeleteChannelDescRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .openDirectMess(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async confirmLinkMezonOTP(
  //   session: Session,
  //   request: LinkAccountConfirmRequest
  // ): Promise<Session> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.confirmLinkMezonOTP(session.token, request);
  // }

  // /** Add a custom ID to the social profiles on the current user's account. */
  // async linkMezon(
  //   session: Session,
  //   request: LinkAccountMezon
  // ): Promise<LinkAccountConfirmRequest> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .linkMezon(session.token, request)
  //     .then((response: LinkAccountConfirmRequest) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Add an email+password to the social profiles on the current user's account. */
  // async linkEmail(
  //   session: Session,
  //   request: AccountEmail
  // ): Promise<LinkAccountConfirmRequest> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .linkEmail(session.token, request)
  //     .then((response: LinkAccountConfirmRequest) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List all friends for the current user. */
  // async listFriends(
  //   session: Session,
  //   state?: number,
  //   limit?: number,
  //   cursor?: string
  // ): Promise<Friends> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listFriends(session.token, limit, state, cursor)
  //     .then((response: FriendList) => {
  //       var result: Friends = {
  //         friends: [],
  //         cursor: response.cursor,
  //       };

  //       if (response.friends == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.friends!.forEach((f) => {
  //         result.friends!.push({
  //           user: {
  //             avatar_url: f.user!.avatar_url,
  //             create_time: f.user!.create_time,
  //             display_name: f.user!.display_name,
  //             edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
  //             id: f.user!.id,
  //             lang_tag: f.user!.lang_tag,
  //             location: f.user!.location,
  //             online: f.user!.online,
  //             timezone: f.user!.timezone,
  //             update_time: f.user!.update_time,
  //             username: f.user!.username,
  //             is_mobile: f.user?.is_mobile,
  //             user_status: f.user!.user_status,
  //             status: f.user!.status,
  //             mezon_id: f.user!.mezon_id,
  //             list_nick_names: f.user!.list_nick_names,
  //             phone_number: f.user!.phone_number,
  //             about_me: f.user!.about_me,
  //           },
  //           state: f.state,
  //           source_id: f.source_id,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** Fetch list of notifications. */
  // async listNotifications(
  //   session: Session,
  //   clanId: string,
  //   limit?: number,
  //   notificationId?: string,
  //   category?: number,
  //   direction?: number
  // ): Promise<NotificationList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listNotifications(
  //       session.token,
  //       limit,
  //       clanId,
  //       notificationId,
  //       category,
  //       direction
  //     )
  //     .then((response: NotificationList) => {
  //       var result: NotificationList = {
  //         cacheable_cursor: response.cacheable_cursor,
  //         notifications: [],
  //       };

  //       if (response.notifications == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.notifications!.forEach((n) => {
  //         result.notifications!.push({
  //           id: n.id,
  //           subject: n.subject,
  //           content: n.content ? safeJSONParse(n.content) : undefined,
  //           code: n.code ? Number(n.code) : 0,
  //           sender_id: n.sender_id,
  //           create_time: n.create_time,
  //           persistent: n.persistent,
  //           category: n.category,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // /** Execute an RPC function on the server. */
  // async rpc(
  //   session: Session,
  //   basicAuthUsername: string,
  //   basicAuthPassword: string,
  //   id: string,
  //   input: object
  // ): Promise<RpcResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .rpcFunc(
  //       session.token,
  //       basicAuthUsername,
  //       basicAuthPassword,
  //       id,
  //       JSON.stringify(input)
  //     )
  //     .then((response: Rpc) => {
  //       return Promise.resolve({
  //         id: response.id,
  //         payload: !response.payload
  //           ? undefined
  //           : safeJSONParse(response.payload),
  //       });
  //     });
  // }

  // /** Execute an RPC function on the server. */
  // async rpcHttpKey(
  //   httpKey: string,
  //   id: string,
  //   input?: object
  // ): Promise<RpcResponse> {
  //   return this.mezonClient
  //     .rpcFunc("", id, (input && JSON.stringify(input)) || "", httpKey)
  //     .then((response: Rpc) => {
  //       return Promise.resolve({
  //         id: response.id,
  //         payload: !response.payload
  //           ? undefined
  //           : safeJSONParse(response.payload),
  //       });
  //     })
  //     .catch((err: any) => {
  //       throw err;
  //     });
  // }

  // /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  // async sessionLogout(
  //   session: Session,
  //   token: string,
  //   refreshToken: string,
  //   deviceId: string,
  //   platform: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .sessionLogout(session.token, {
  //       refresh_token: refreshToken,
  //       token: token,
  //       device_id: deviceId,
  //       platform: platform,
  //     })
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(
    session: Session,
    vars: Record<string, string> = {}
  ): Promise<Session> {
    if (!session) {
      console.error("Cannot refresh a null session.");
      return session;
    }

    if (session.created && session.expires_at! - session.created_at < 70) {
      console.warn(
        "Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session"
      );
    }

    if (
      session.created &&
      session.refresh_expires_at! - session.created_at < 3700
    ) {
      console.warn(
        "Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session"
      );
    }

    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise; // Reuse existing promise
    }

    this.refreshTokenPromise = new Promise<Session>(async (resolve, reject) => {
      try {
        const sessionRefreshRequest = create(SessionRefreshRequestSchema, {
          token: session.refresh_token,
          vars: vars,
          isRemember: session.is_remember,
        });

        const options: CallOptions = {
          headers: {
            "Content-Type": "application/x-protobuf",
            Accept: "application/x-protobuf",
            Authorization: "Basic " + encode(this.serverkey + ":" + ""),
          },
        };

        const apiSession = await this.mezonClient.sessionRefresh(
          sessionRefreshRequest,
          options
        );

        session.update(
          apiSession.token!,
          apiSession.refreshToken!,
          apiSession.isRemember || false
        );

        this.onRefreshSession(session);
        resolve(session);
      } catch (error) {
        console.error("Session refresh failed:", error);
        reject(error);
      } finally {
        this.refreshTokenPromise = null;
      }
    });

    return this.refreshTokenPromise;
  }

  // /** Remove custom ID from the social profiles on the current user's account. */
  // async unlinkCustom(
  //   session: Session,
  //   request: AccountMezon
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .unlinkMezon(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Remove an email+password from the social profiles on the current user's account. */
  // async unlinkEmail(session: Session, request: AccountEmail): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .unlinkEmail(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in the current user's account. */
  // async updateUsername(
  //   session: Session,
  //   request: UpdateUsernameRequest
  // ): Promise<Session> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateUsername(session.token, request)
  //     .then((response: Session) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Update fields in the current user's account. */
  // async updateAccount(
  //   session: Session,
  //   request: UpdateAccountRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateAccount(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given channel */
  // async updateChannelDesc(
  //   session: Session,
  //   channelId: string,
  //   request: UpdateChannelDescRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateChannelDesc(session.token, channelId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given clan. */
  // async updateClanDesc(
  //   session: Session,
  //   clanId: string,
  //   request: MezonUpdateClanDescBody
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateClanDesc(session.token, clanId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given category. */
  // async updateCategory(
  //   session: Session,
  //   clanId: string,
  //   request: UpdateCategoryDescRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateCategory(session.token, clanId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async updateUserProfileByClan(
  //   session: Session,
  //   clanId: string,
  //   request: UpdateClanProfileRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateUserProfileByClan(session.token, clanId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given role. */
  // async updateRole(
  //   session: Session,
  //   roleId: string,
  //   request: UpdateRoleRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateRole(session.token, roleId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given event. */
  // async updateEvent(
  //   session: Session,
  //   roleId: string,
  //   request: MezonUpdateEventBody
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateEvent(session.token, roleId, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Update fields in a given event. */
  // async updateApp(
  //   session: Session,
  //   roleId: string,
  //   request: MezonUpdateAppBody
  // ): Promise<App> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateApp(session.token, roleId, request)
  //     .then((response: App) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Update fields in a given clan profile. */
  // async createLinkInviteUser(
  //   session: Session,
  //   request: LinkInviteUserRequest
  // ): Promise<LinkInviteUser> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createLinkInviteUser(session.token, request)
  //     .then((response: LinkInviteUser) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Get link invite user */
  // async getLinkInvite(inviteId: string): Promise<InviteUserRes> {
  //   return this.mezonClient
  //     .getLinkInvite(this.serverkey, "", inviteId)
  //     .then((response: InviteUserRes) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Get permission of user in the clan */
  // async GetRoleOfUserInTheClan(
  //   session: Session,
  //   clanId: string
  // ): Promise<RoleList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getRoleOfUserInTheClan(session.token, clanId)
  //     .then((response: RoleList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** invite user */
  // async inviteUser(session: Session, inviteId: string): Promise<InviteUserRes> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .inviteUser(session.token, inviteId)
  //     .then((response: InviteUserRes) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Set default notification clan*/
  // async setNotificationClan(
  //   session: Session,
  //   request: SetDefaultNotificationRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setNotificationClanSetting(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Set notification channel*/
  // async setNotificationChannel(
  //   session: Session,
  //   request: SetNotificationRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setNotificationChannelSetting(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Set notification category*/
  // async setMuteCategory(
  //   session: Session,
  //   request: SetMuteRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setMuteCategory(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Set notification channel*/
  // async setMuteChannel(
  //   session: Session,
  //   request: SetMuteRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setMuteChannel(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** update channel private*/
  // async updateChannelPrivate(
  //   session: Session,
  //   request: ChangeChannelPrivateRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateChannelPrivate(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Set default notification category*/
  // async setNotificationCategory(
  //   session: Session,
  //   request: SetNotificationRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setNotificationCategorySetting(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async deleteNotificationCategory(
  //   session: Session,
  //   category_id: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteNotificationCategorySetting(session.token, category_id)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async deleteNotificationChannel(
  //   session: Session,
  //   channel_id: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteNotificationChannel(session.token, channel_id)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** */
  // async setNotificationReactMessage(
  //   session: Session,
  //   channel_id: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setNotificationReactMessage(session.token, { channel_id })
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //** */
  // async deleteNotiReactMessage(
  //   session: Session,
  //   channel_id: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteNotiReactMessage(session.token, channel_id)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** query message in elasticsearch */
  // async searchMessage(
  //   session: Session,
  //   request: SearchMessageRequest
  // ): Promise<SearchMessageResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .searchMessage(session.token, request)
  //     .then((response: SearchMessageResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** */
  // async createMessage2Inbox(
  //   session: Session,
  //   request: Message2InboxRequest
  // ): Promise<ChannelMessageHeader> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createMessage2Inbox(session.token, request)
  //     .then((response: ChannelMessageHeader) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** */
  // async createPinMessage(
  //   session: Session,
  //   request: PinMessageRequest
  // ): Promise<ChannelMessageHeader> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createPinMessage(session.token, request)
  //     .then((response: ChannelMessageHeader) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async pinMessagesList(
  //   session: Session,
  //   messageId: string,
  //   channelId: string,
  //   clanId: string
  // ): Promise<PinMessagesList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getPinMessagesList(session.token, messageId, channelId, clanId)
  //     .then((response: PinMessagesList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //** */
  // async deletePinMessage(
  //   session: Session,
  //   id?: string,
  //   messageId?: string,
  //   channelId?: string,
  //   clanId?: string
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deletePinMessage(session.token, id, messageId, channelId, clanId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** create clan emoji */
  // async createClanEmoji(session: Session, request: ClanEmojiCreateRequest) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createClanEmoji(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**update clan emoji by id */
  // async updateClanEmojiById(
  //   session: Session,
  //   id: string,
  //   request: MezonUpdateClanEmojiByIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateClanEmojiById(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**delete clan emoji by id */
  // async deleteByIdClanEmoji(
  //   session: Session,
  //   id: string,
  //   clan_id: string,
  //   emojiLabel?: string
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteClanEmojiById(session.token, id, clan_id, emojiLabel)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**create webhook for chaneel */
  // async generateWebhookLink(
  //   session: Session,
  //   request: WebhookCreateRequest
  // ): Promise<WebhookGenerateResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .generateWebhook(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**list webhook belong to the channel */
  // async listWebhookByChannelId(
  //   session: Session,
  //   channel_id: string,
  //   clan_id: string
  // ): Promise<WebhookListResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listWebhookByChannelId(session.token, channel_id, clan_id)
  //     .then((response: WebhookListResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**update webhook name by id */
  // async updateWebhookById(
  //   session: Session,
  //   id: string,
  //   request: MezonUpdateWebhookByIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateWebhookById(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**disabled webhook by id */
  // async deleteWebhookById(
  //   session: Session,
  //   id: string,
  //   request: MezonDeleteWebhookByIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteWebhookById(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**check duplicate clan name */
  // async checkDuplicateClanName(
  //   session: Session,
  //   clan_name: string
  // ): Promise<CheckDuplicateClanNameResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .checkDuplicateClanName(session.token, clan_name)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**Add a new sticker */
  // async addClanSticker(session: Session, request: ClanStickerAddRequest) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addClanSticker(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**Delete a sticker by ID*/
  // async deleteClanStickerById(
  //   session: Session,
  //   id: string,
  //   clan_id: string,
  //   stickerLabel?: string
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteClanStickerById(session.token, id, clan_id, stickerLabel)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**Update a sticker by ID*/
  // async updateClanStickerById(
  //   session: Session,
  //   id: string,
  //   request: MezonUpdateClanStickerByIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateClanStickerById(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //** update the category of a channel */
  // async changeChannelCategory(
  //   session: Session,
  //   id: string,
  //   request: MezonChangeChannelCategoryBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .changeChannelCategory(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** */
  // async setRoleChannelPermission(
  //   session: Session,
  //   request: UpdateRoleChannelRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setRoleChannelPermission(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async addApp(session: Session, request: AddAppRequest): Promise<App> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addApp(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getApp(session: Session, id: string): Promise<App> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient.getApp(session.token, id).then((response: App) => {
  //     return Promise.resolve(response);
  //   });
  // }

  // async listApps(session: Session): Promise<AppList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listApps(session.token)
  //     .then((response: AppList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async addAppToClan(session: Session, appId: string, clanId: string) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addAppToClan(session.token, appId, clanId)
  //     .then((response: AppList) => {
  //       return response !== undefined;
  //     });
  // }

  // async getSystemMessagesList(session: Session): Promise<SystemMessagesList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getSystemMessagesList(session.token)
  //     .then((response: SystemMessagesList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getSystemMessageByClanId(
  //   session: Session,
  //   clanId: string
  // ): Promise<SystemMessage> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getSystemMessageByClanId(session.token, clanId)
  //     .then((response: SystemMessage) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async createSystemMessage(
  //   session: Session,
  //   request: SystemMessageRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createSystemMessage(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async updateSystemMessage(
  //   session: Session,
  //   clanId: string,
  //   request: MezonUpdateSystemMessageBody
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateSystemMessage(session.token, clanId, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async deleteSystemMessage(session: Session, clanId: string): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteSystemMessage(session.token, clanId)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async updateCategoryOrder(
  //   session: Session,
  //   request: UpdateCategoryOrderRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateCategoryOrder(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async deleteCategoryOrder(session: Session, clanId: string): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteCategoryOrder(session.token, clanId)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async givecoffee(session: Session, request: GiveCoffeeEvent): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .giveMeACoffee(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async sendToken(session: Session, request: TokenSentEvent): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .sendToken(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** List a channel's users. */
  // async listStreamingChannelUsers(
  //   session: Session,
  //   clanId: string,
  //   channelId: string,
  //   channelType: number,
  //   state?: number,
  //   limit?: number,
  //   cursor?: string
  // ): Promise<StreamingChannelUserList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listStreamingChannelUsers(
  //       session.token,
  //       clanId,
  //       channelId,
  //       channelType,
  //       limit,
  //       state,
  //       cursor
  //     )
  //     .then((response: StreamingChannelUserList) => {
  //       var result: StreamingChannelUserList = {
  //         streaming_channel_users: [],
  //       };

  //       if (response.streaming_channel_users == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.streaming_channel_users!.forEach((gu) => {
  //         result.streaming_channel_users!.push({
  //           id: gu.id,
  //           channel_id: gu.channel_id,
  //           user_id: gu.user_id,
  //           participant: gu.participant,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // async registerStreamingChannel(
  //   session: Session,
  //   request: RegisterStreamingChannelRequest
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .registerStreamingChannel(session.token, request)
  //     .then((response: RegisterStreamingChannelResponse) => {
  //       return response !== undefined;
  //     });
  // }

  // /** List a channel's users. */
  // async listChannelApps(
  //   session: Session,
  //   clanId: string
  // ): Promise<ListChannelAppsResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelApps(session.token, clanId)
  //     .then((response: ListChannelAppsResponse) => {
  //       var result: ListChannelAppsResponse = {
  //         channel_apps: [],
  //       };

  //       if (response.channel_apps == null) {
  //         return Promise.resolve(result);
  //       }

  //       response.channel_apps!.forEach((gu) => {
  //         result.channel_apps!.push({
  //           id: gu.id,
  //           channel_id: gu.channel_id,
  //           app_id: gu.app_id,
  //           clan_id: gu.clan_id,
  //           app_url: gu.app_url,
  //           app_name: gu.app_name,
  //           app_logo: gu.app_logo,
  //         });
  //       });
  //       return Promise.resolve(result);
  //     });
  // }

  // async getChannelCategoryNotiSettingsList(
  //   session: Session,
  //   clanId: string
  // ): Promise<NotificationChannelCategorySettingList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getChannelCategoryNotiSettingsList(session.token, clanId)
  //     .then((response: NotificationChannelCategorySettingList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getNotificationCategory(
  //   session: Session,
  //   categoryId: string
  // ): Promise<NotificationUserChannel> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getNotificationCategory(session.token, categoryId)
  //     .then((response: NotificationUserChannel) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getNotificationChannel(
  //   session: Session,
  //   channelId: string
  // ): Promise<NotificationUserChannel> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getNotificationChannel(session.token, channelId)
  //     .then((response: NotificationUserChannel) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getNotificationClan(
  //   session: Session,
  //   clanId: string
  // ): Promise<NotificationSetting> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getNotificationClan(session.token, clanId)
  //     .then((response: NotificationSetting) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getNotificationReactMessage(
  //   session: Session,
  //   channelId: string
  // ): Promise<NotifiReactMessage> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getNotificationReactMessage(session.token, channelId)
  //     .then((response: NotifiReactMessage) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listChannelByUserId(session: Session): Promise<ChannelDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelByUserId(session.token)
  //     .then((response: ChannelDescList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listChannelUsersUC(
  //   session: Session,
  //   channel_id: string,
  //   limit: number
  // ): Promise<AllUsersAddChannelResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelUsersUC(session.token, channel_id, limit)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getListEmojisByUserId(session: Session): Promise<EmojiListedResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getListEmojisByUserId(session.token)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async emojiRecentList(session: Session): Promise<EmojiRecentList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .emojiRecentList(session.token)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getListStickersByUserId(
  //   session: Session
  // ): Promise<StickerListedResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getListStickersByUserId(session.token)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listUserClansByUserId(session: Session): Promise<AllUserClans> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listUserClansByUserId(session.token)
  //     .then((response: AllUserClans) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listRoles(
  //   session: Session,
  //   clanId?: string,
  //   limit?: number,
  //   state?: number,
  //   cursor?: string
  // ): Promise<RoleListEventResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listRoles(session.token, clanId, limit, state, cursor)
  //     .then((response: RoleListEventResponse) => {
  //       var result: RoleListEventResponse = {
  //         clan_id: clanId,
  //         roles: response.roles,
  //       };

  //       return Promise.resolve(result);
  //     });
  // }

  // async listUserPermissionInChannel(
  //   session: Session,
  //   clanId?: string,
  //   channelId?: string
  // ): Promise<UserPermissionInChannelListResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listUserPermissionInChannel(session.token, clanId, channelId)
  //     .then((response: UserPermissionInChannelListResponse) => {
  //       var result: UserPermissionInChannelListResponse = {
  //         clan_id: clanId,
  //         channel_id: channelId,
  //         permissions: response.permissions,
  //       };

  //       return Promise.resolve(result);
  //     });
  // }

  // async getPermissionByRoleIdChannelId(
  //   session: Session,
  //   roleId?: string,
  //   channelId?: string,
  //   userId?: string
  // ): Promise<PermissionRoleChannelListEventResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getPermissionByRoleIdChannelId(session.token, roleId, channelId, userId)
  //     .then((response: PermissionRoleChannelListEventResponse) => {
  //       var result: PermissionRoleChannelListEventResponse = {
  //         role_id: roleId,
  //         channel_id: channelId,
  //         permission_role_channel: response.permission_role_channel,
  //         user_id: userId,
  //       };

  //       return Promise.resolve(result);
  //     });
  // }

  // async markAsRead(session: Session, request: MarkAsReadRequest): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .markAsRead(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** List Threads. */
  // async listThreadDescs(
  //   session: Session,
  //   channelId: string,
  //   limit?: number,
  //   state?: number,
  //   clanId?: string,
  //   threadId?: string,
  //   page?: number
  // ): Promise<ChannelDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listThreadDescs(
  //       session.token,
  //       channelId,
  //       limit,
  //       state,
  //       clanId,
  //       threadId,
  //       page
  //     )
  //     .then((response: ChannelDescList) => {
  //       var result: ChannelDescList = {
  //         channeldesc: [],
  //       };

  //       if (response.channeldesc == null) {
  //         return Promise.resolve(result);
  //       }

  //       result.channeldesc = response.channeldesc;
  //       return Promise.resolve(result);
  //     });
  // }

  // async leaveThread(
  //   session: Session,
  //   clanId: string,
  //   channelId: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .leaveThread(session.token, clanId, channelId)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getChannelSettingInClan(
  //   session: Session,
  //   clanId: string,
  //   parentId?: string,
  //   categoryId?: string,
  //   privateChannel?: number,
  //   active?: number,
  //   status?: number,
  //   type?: number,
  //   limit?: number,
  //   page?: number,
  //   channelLabel?: string
  // ): Promise<ChannelSettingListResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listChannelSetting(
  //       session.token,
  //       clanId,
  //       parentId,
  //       categoryId,
  //       privateChannel,
  //       active,
  //       status,
  //       type,
  //       limit,
  //       page,
  //       channelLabel
  //     )
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getChannelCanvasList(
  //   session: Session,
  //   channelId: string,
  //   clanId?: string,
  //   limit?: number,
  //   page?: number
  // ): Promise<ChannelCanvasListResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getChannelCanvasList(session.token, channelId, clanId, limit, page)
  //     .then((response: ChannelCanvasListResponse) => {
  //       var result: ChannelCanvasListResponse = {
  //         channel_canvases: [],
  //       };

  //       if (response.channel_canvases == null) {
  //         return Promise.resolve(result);
  //       }

  //       result.clan_id = response.clan_id;
  //       result.channel_id = response.channel_id;
  //       result.channel_canvases = response.channel_canvases;
  //       result.count = response.count;
  //       return Promise.resolve(result);
  //     });
  // }

  // async getChannelCanvasDetail(
  //   session: Session,
  //   id: string,
  //   clanId?: string,
  //   channelId?: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getChannelCanvasDetail(session.token, id, clanId, channelId)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async editChannelCanvases(
  //   session: Session,
  //   request: EditChannelCanvasRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .editChannelCanvases(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //** */
  // async deleteChannelCanvas(
  //   session: Session,
  //   canvasId: string,
  //   clanId?: string,
  //   channelId?: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteChannelCanvas(session.token, canvasId, clanId, channelId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async addFavoriteChannel(
  //   session: Session,
  //   channelId: string,
  //   clanId: string
  // ): Promise<AddFavoriteChannelResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addChannelFavorite(session.token, {
  //       channel_id: channelId,
  //       clan_id: clanId,
  //     })
  //     .then((response: AddFavoriteChannelResponse) => {
  //       return response;
  //     });
  // }

  // async removeFavoriteChannel(
  //   session: Session,
  //   clanId: string,
  //   channelId: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .removeChannelFavorite(session.token, clanId, channelId)
  //     .then((response: any) => {
  //       return response;
  //     });
  // }

  // async getListFavoriteChannel(session: Session, clanId: string): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getListFavoriteChannel(session.token, clanId)
  //     .then((response: any) => {
  //       return response;
  //     });
  // }
  // /** List activity */
  // async listActivity(session: Session): Promise<ListUserActivity> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listActivity(session.token)
  //     .then((response: any) => {
  //       return response;
  //     });
  // }

  // async createActiviy(
  //   session: Session,
  //   request: CreateActivityRequest
  // ): Promise<UserActivity> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createActiviy(session.token, request)
  //     .then((response: any) => {
  //       return response;
  //     });
  // }

  // async createQRLogin(requet: LoginRequest): Promise<LoginIDResponse> {
  //   const apiSession = await this.mezonClient.createQRLogin(
  //     this.serverkey,
  //     "",
  //     requet
  //   );
  //   const response = {
  //     login_id: apiSession.login_id,
  //     create_time_second: apiSession.create_time_second,
  //   };
  //   return response;
  // }

  // async checkLoginRequest(
  //   requet: ConfirmLoginRequest
  // ): Promise<Session | null> {
  //   const apiSession = await this.mezonClient.checkLoginRequest(
  //     this.serverkey,
  //     "",
  //     requet
  //   );
  //   if (!apiSession?.token) {
  //     return null;
  //   }
  //   return new Session(
  //     apiSession.token || "",
  //     apiSession.refresh_token || "",
  //     apiSession.created || false,
  //     apiSession.api_url || "",
  //     apiSession.id_token || "",
  //     apiSession.is_remember || false
  //   );
  // }

  // async confirmLogin(
  //   session: Session,
  //   basePath: string,
  //   body: ConfirmLoginRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .confirmLogin(session.token, basePath, body)
  //     .then((response: any) => {
  //       return response;
  //     });
  // }

  // async getChanEncryptionMethod(
  //   session: Session,
  //   channelId: string
  // ): Promise<ChanEncryptionMethod> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getChanEncryptionMethod(session.token, channelId)
  //     .then((response: ChanEncryptionMethod) => {
  //       return response;
  //     });
  // }

  // async setChanEncryptionMethod(
  //   session: Session,
  //   channelId: string,
  //   method: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .setChanEncryptionMethod(session.token, channelId, { method: method })
  //     .then((response: any) => {
  //       return response;
  //     });
  // }

  // async getPubKeys(
  //   session: Session,
  //   userIds: Array<string>
  // ): Promise<GetPubKeysResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getPubKeys(session.token, userIds)
  //     .then((response: GetPubKeysResponse) => {
  //       return response;
  //     });
  // }

  // async pushPubKey(session: Session, PK: PubKey): Promise<GetPubKeysResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .pushPubKey(session.token, { PK: PK })
  //     .then((response: GetPubKeysResponse) => {
  //       return response;
  //     });
  // }

  // async getKeyServer(session: Session): Promise<GetKeyServerResp> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getKeyServer(session.token)
  //     .then((response: GetKeyServerResp) => {
  //       return response;
  //     });
  // }

  // async listAuditLog(
  //   session: Session,
  //   actionLog?: string,
  //   userId?: string,
  //   clanId?: string,
  //   date_log?: string
  // ): Promise<MezonapiListAuditLog> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listAuditLog(session.token, actionLog, userId, clanId, date_log)
  //     .then((response: MezonapiListAuditLog) => {
  //       return response;
  //     });
  // }

  // async listOnboarding(
  //   session: Session,
  //   clanId?: string,
  //   guideType?: number,
  //   limit?: number,
  //   page?: number
  // ): Promise<ListOnboardingResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listOnboarding(session.token, clanId, guideType, limit, page)
  //     .then((response: ListOnboardingResponse) => {
  //       return response;
  //     });
  // }

  // async getOnboardingDetail(
  //   session: Session,
  //   id: string,
  //   clanId?: string
  // ): Promise<OnboardingItem> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getOnboardingDetail(session.token, id, clanId)
  //     .then((response: OnboardingItem) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async createOnboarding(
  //   session: Session,
  //   request: CreateOnboardingRequest
  // ): Promise<ListOnboardingResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createOnboarding(session.token, request)
  //     .then((response: ListOnboardingResponse) => {
  //       return response;
  //     });
  // }

  // async updateOnboarding(
  //   session: Session,
  //   id: string,
  //   request: MezonUpdateOnboardingBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateOnboarding(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async deleteOnboarding(
  //   session: Session,
  //   id: string,
  //   clanId?: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteOnboarding(session.token, id, clanId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**create webhook for clan */
  // async generateClanWebhook(
  //   session: Session,
  //   request: GenerateClanWebhookRequest
  // ): Promise<GenerateClanWebhookResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .generateClanWebhook(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**list webhook belong to the clan */
  // async listClanWebhook(
  //   session: Session,
  //   clan_id: string
  // ): Promise<ListClanWebhookResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listClanWebhook(session.token, clan_id)
  //     .then((response: ListClanWebhookResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**disabled webhook by id */
  // async deleteClanWebhookById(session: Session, id: string, clan_id: string) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteClanWebhookById(session.token, id, clan_id)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**update webhook name by id */
  // async updateClanWebhookById(
  //   session: Session,
  //   id: string,
  //   request: MezonUpdateClanWebhookByIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateClanWebhookById(session.token, id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**list onboarding step */
  // async listOnboardingStep(
  //   session: Session,
  //   clan_id?: string,
  //   limit?: number,
  //   page?: number
  // ): Promise<ListOnboardingStepResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listOnboardingStep(session.token, clan_id, limit, page)
  //     .then((response: ListOnboardingStepResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**update onboarding step by id */
  // async updateOnboardingStepByClanId(
  //   session: Session,
  //   clan_id: string,
  //   request: MezonUpdateOnboardingStepByClanIdBody
  // ) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateOnboardingStepByClanId(session.token, clan_id, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**update status */
  // async updateUserStatus(session: Session, request: UserStatusUpdate) {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateUserStatus(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // //**get user status */
  // async getUserStatus(session: Session): Promise<UserStatus> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getUserStatus(session.token)
  //     .then((response: UserStatus) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**list sd topic */
  // async listSdTopic(
  //   session: Session,
  //   clanId?: string,
  //   limit?: number
  // ): Promise<SdTopicList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listSdTopic(session.token, clanId, limit)
  //     .then((response: SdTopicList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**post sd topic */
  // async createSdTopic(
  //   session: Session,
  //   request: SdTopicRequest
  // ): Promise<SdTopic> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createSdTopic(session.token, request)
  //     .then((response: SdTopic) => {
  //       return response;
  //     });
  // }

  // //**list sd topic */
  // async getTopicDetail(session: Session, topicId?: string): Promise<SdTopic> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getTopicDetail(session.token, topicId)
  //     .then((response: SdTopic) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**create room channel apps */
  // async createRoomChannelApps(
  //   session: Session,
  //   body: MezonapiCreateRoomChannelApps
  // ): Promise<MezonapiCreateRoomChannelApps> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createRoomChannelApps(session.token, body)
  //     .then((response: MezonapiCreateRoomChannelApps) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Generate Meet Token */
  // async generateMeetToken(
  //   session: Session,
  //   body: GenerateMeetTokenRequest
  // ): Promise<GenerateMeetTokenResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .generateMeetToken(session.token, body)
  //     .then((response: GenerateMeetTokenResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**list webhook belong to the clan */
  // async listMezonOauthClient(session: Session): Promise<MezonOauthClientList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listMezonOauthClient(session.token)
  //     .then((response: MezonOauthClientList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async getMezonOauthClient(
  //   session: Session,
  //   clientId?: string,
  //   clientName?: string
  // ): Promise<MezonOauthClient> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .getMezonOauthClient(session.token, clientId, clientName)
  //     .then((response: MezonOauthClient) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async updateMezonOauthClient(
  //   session: Session,
  //   body: MezonOauthClient
  // ): Promise<MezonOauthClient> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateMezonOauthClient(session.token, body)
  //     .then((response: MezonOauthClient) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**search thread */
  // async searchThread(
  //   session: Session,
  //   clanId?: string,
  //   channelId?: string,
  //   label?: string
  // ): Promise<ChannelDescList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .searchThread(session.token, clanId, channelId, label)
  //     .then((response: ChannelDescList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // //**Generate Hash */
  // async generateHashChannelApps(
  //   session: Session,
  //   appId?: string
  // ): Promise<CreateHashChannelAppsResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .generateHashChannelApps(session.token, appId)
  //     .then((response: CreateHashChannelAppsResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async registrationPassword(
  //   session: Session,
  //   email?: string,
  //   password?: string,
  //   oldPassword?: string
  // ): Promise<Session> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .registrationEmail(session.token, {
  //       email: email,
  //       password: password,
  //       old_password: oldPassword,
  //     })
  //     .then((response: Session) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Add user event */
  // async addUserEvent(
  //   session: Session,
  //   request: UserEventRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addUserEvent(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** Delete user event */
  // async deleteUserEvent(
  //   session: Session,
  //   clanId?: string,
  //   eventId?: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteUserEvent(session.token, clanId, eventId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async updateRoleOrder(
  //   session: Session,
  //   request: UpdateRoleOrderRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateRoleOrder(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async deleteAccount(session: Session): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteAccount(session.token)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async createExternalMezonMeet(
  //   session: Session
  // ): Promise<GenerateMezonMeetResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .createExternalMezonMeet(session.token)
  //     .then((response: GenerateMezonMeetResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async generateMeetTokenExternal(
  //   basePath: string,
  //   token: string,
  //   displayName?: string,
  //   isGuest?: boolean
  // ): Promise<GenerateMeetTokenExternalResponse> {
  //   return this.mezonClient
  //     .generateMeetTokenExternal("", basePath, token, displayName, isGuest)
  //     .then((response: GenerateMeetTokenExternalResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async removeMezonMeetParticipant(
  //   session: Session,
  //   request: MeetParticipantRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .removeParticipantMezonMeet(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async muteMezonMeetParticipant(
  //   session: Session,
  //   request: MeetParticipantRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .muteParticipantMezonMeet(session.token, request)
  //     .then((response: any) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // /** Update clan order to view. */
  // async updateClanOrder(
  //   session: Session,
  //   request: UpdateClanOrderRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateClanOrder(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // /** list clan discover. */
  // async listClanDiscover(
  //   basePath: string,
  //   request: ClanDiscoverRequest
  // ): Promise<ListClanDiscover> {
  //   return this.mezonClient
  //     .clanDiscover(this.serverkey, "", basePath, request)
  //     .then((response: ListClanDiscover) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listQuickMenuAccess(
  //   session: Session,
  //   botId: string,
  //   channelId: string,
  //   menuType: number
  // ): Promise<QuickMenuAccessList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listQuickMenuAccess(session.token, botId, channelId, menuType)
  //     .then((response: QuickMenuAccessList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async deleteQuickMenuAccess(
  //   session: Session,
  //   id: string,
  //   clanId: string
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .deleteQuickMenuAccess(session.token, id, clanId)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async addQuickMenuAccess(
  //   session: Session,
  //   request: QuickMenuAccessRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .addQuickMenuAccess(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async updateQuickMenuAccess(
  //   session: Session,
  //   request: QuickMenuAccessRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .updateQuickMenuAccess(session.token, request)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  // async unlockItem(
  //   session: Session,
  //   request: UnlockedItemRequest
  // ): Promise<UnlockedItemResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .unlockItem(session.token, request)
  //     .then((response: UnlockedItemResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async listForSaleItems(
  //   session: Session,
  //   page?: number
  // ): Promise<ForSaleItemList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .listForSaleItems(session.token, page)
  //     .then((response: ForSaleItemList) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async isFollower(
  //   session: Session,
  //   req: IsFollowerRequest
  // ): Promise<IsFollowerResponse> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .isFollower(session.token, req)
  //     .then((response: IsFollowerResponse) => {
  //       return Promise.resolve(response);
  //     });
  // }

  // async transferOwnership(
  //   session: Session,
  //   req: TransferOwnershipRequest
  // ): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   return this.mezonClient
  //     .transferOwnership(session.token, req)
  //     .then((response: any) => {
  //       return response !== undefined;
  //     });
  // }

  async isBanned(
    session: Session,
    channelId: string
  ): Promise<IsBannedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const isBannedRequest = create(IsBannedRequestSchema, {
      channelId: channelId,
    });

    return this.mezonClient.isBanned(isBannedRequest);
  }

  async reportMessageAbuse(
    session: Session,
    messageId?: string,
    abuseType?: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const reportMessageAbuseRequest = create(ReportMessageAbuseReqestSchema, {
      messageId: messageId,
      abuseType: abuseType,
    });

    const options: CallOptions = {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };

    const response = await this.mezonClient.reportMessageAbuse(
      reportMessageAbuseRequest,
      options
    );

    return response !== undefined;
  }

  async listLogedDevice(session: Session): Promise<LogedDeviceList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };

    const response = await this.mezonClient.listLogedDevice(
      create(EmptySchema, {}),
      options
    );

    return response;
  }
}
