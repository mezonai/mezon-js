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
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import {
  CallOptions,
  createClient,
  type Client as RPCClient,
} from "@connectrpc/connect";
import { Mezon as MezonService } from "../webrpc/frontend/src/gen/apigrpc_pb";
import { Session } from "./session";
import {
  Account,
  AccountEmail,
  AccountMezon,
  AddAppRequest,
  AddAppRequestSchema,
  AddChannelUsersRequestSchema,
  AllUsersAddChannelRequestSchema,
  AllUsersAddChannelResponse,
  AllUserClans,
  AppList,
  AddFriendsRequestSchema,
  AddFriendsResponse,
  AddRoleChannelDescRequest,
  AddRoleChannelDescRequestSchema,
  App,
  BanClanUsersRequestSchema,
  BannedUserList,
  BlockFriendsRequestSchema,
  CategoryDesc,
  ChangeChannelCategoryRequestSchema,
  ChangeChannelPrivateRequest,
  ChangeChannelPrivateRequestSchema,
  ChannelDescription,
  ChannelDescList,
  ChannelMessageHeader,
  ClanDesc,
  ClanEmojiCreateRequest,
  ClanEmojiCreateRequestSchema,
  ClanEmojiUpdateRequestSchema,
  ClanStickerAddRequest,
  ClanStickerAddRequestSchema,
  ClanStickerDeleteRequestSchema,
  ClanStickerUpdateByIdRequestSchema,
  CreateCategoryDescRequest,
  CreateCategoryDescRequestSchema,
  CreateChannelDescRequest,
  CreateChannelDescRequestSchema,
  CreateClanDescRequest,
  CreateClanDescRequestSchema,
  CreateEventRequest,
  CreateEventRequestSchema,
  CreateRoleRequest,
  CreateRoleRequestSchema,
  DeleteCategoryDescRequestSchema,
  DeleteChannelDescRequestSchema,
  DeleteClanDescRequestSchema,
  DeleteEventRequestSchema,
  DeleteFriendsRequestSchema,
  DeleteNotificationsRequestSchema,
  DeleteRoleRequestSchema,
  DeleteSystemMessageSchema,
  EventManagement,
  Friend,
  InviteUserRequestSchema,
  InviteUserRes,
  IsBannedRequestSchema,
  IsBannedResponse,
  IsFollowerRequest,
  IsFollowerRequestSchema,
  IsFollowerResponse,
  LinkInviteUser,
  LinkInviteUserRequest,
  LinkInviteUserRequestSchema,
  ListAppsRequestSchema,
  ListChannelAppsRequestSchema,
  ListChannelUsersRequestSchema,
  ListThreadRequestSchema,
  LeaveThreadRequestSchema,
  DeleteChannelCanvasRequestSchema,
  GetKeyServerResp,
  ListAuditLogRequestSchema,
  ListOnboardingRequestSchema,
  ListOnboardingResponse,
  OnboardingItem,
  CreateOnboardingRequestSchema,
  CreateOnboardingRequest,
  UpdateOnboardingRequestSchema,
  GenerateClanWebhookRequestSchema,
  GenerateClanWebhookRequest,
  GenerateClanWebhookResponse,
  ListClanWebhookRequestSchema,
  ListClanWebhookResponse,
  ListOnboardingStepRequestSchema,
  ListOnboardingStepResponse,
  UserStatusUpdate,
  UserStatus,
  ListSdTopicRequestSchema,
  SdTopicList,
  SdTopicRequest,
  SdTopic,
  GenerateMeetTokenRequestSchema,
  GenerateMeetTokenRequest,
  GenerateMeetTokenResponse,
  GetMezonOauthClientRequestSchema,
  MezonOauthClient,
  SearchThreadRequestSchema,
  GenerateHashChannelAppsRequestSchema,
  RegistrationEmailRequestSchema,
  UserEventRequest,
  UpdateRoleOrderRequestSchema,
  UpdateRoleOrderRequest,
  GenerateMezonMeetResponse,
  MeetParticipantRequest,
  UpdateClanOrderRequestSchema,
  UpdateClanOrderRequest,
  ListQuickMenuAccessRequestSchema,
  QuickMenuAccessList,
  ListForSaleItemsRequestSchema,
  ForSaleItemList,
  UserPermissionInChannelListRequestSchema,
  CreateActivityRequestSchema,
  CreateActivityRequest,
  ListUserActivity,
  UserActivity,
  ChanEncryptionMethod,
  GetPubKeysRequestSchema,
  GetPubKeysResponse,
  PubKey,
  PushPubKeyRequestSchema,
  AddFavoriteChannelResponse,
  ChannelSettingListResponse,
  ChannelCanvasListResponse,
  EditChannelCanvasRequest,
  LogedDeviceList,
  MarkAsReadRequest,
  MarkAsReadRequestSchema,
  Message2InboxRequest,
  Message2InboxRequestSchema,
  MessageAttachment,
  MessageMention,
  MessageReaction,
  MessageRef,
  PermissionRoleChannelListEventResponse,
  PinMessageRequest,
  PinMessageRequestSchema,
  PinMessagesList,
  RemoveChannelUsersRequestSchema,
  RemoveClanUsersRequestSchema,
  ReportMessageAbuseReqestSchema,
  Role,
  RoleList,
  SearchMessageRequest,
  SearchMessageRequestSchema,
  SearchMessageResponse,
  SessionLogoutRequestSchema,
  SessionRefreshRequestSchema,
  SetDefaultNotificationRequest,
  SetDefaultNotificationRequestSchema,
  SetMuteRequest,
  SetMuteRequestSchema,
  SetNotificationRequest,
  SetNotificationRequestSchema,
  SystemMessageRequestSchema,
  TransferOwnershipRequest,
  TransferOwnershipRequestSchema,
  UpdateAccountRequest,
  UpdateAccountRequestSchema,
  UpdateAppRequestSchema,
  UpdateCategoryDescRequest,
  UpdateCategoryDescRequestSchema,
  UpdateCategoryOrderRequestSchema,
  UpdateChannelDescRequestSchema,
  UpdateClanDescRequestSchema,
  UpdateClanProfileRequestSchema,
  UpdateEventRequest,
  UpdateEventRequestSchema,
  UpdateRoleRequestSchema,
  UpdateUsernameRequest,
  UpdateUsernameRequestSchema,
  UploadAttachment,
  UploadAttachmentRequest,
  UploadAttachmentRequestSchema,
  User,
  UserPermissionInChannelListResponse,
  WebhookDeleteRequestByIdSchema,
  WebhookUpdateRequestByIdSchema,
  DeleteRoleRequest,
  EmojiListedResponse,
  EmojiRecentList,
  ListChannelAppsResponse,
  NotificationChannelCategorySettingList,
  NotificationSetting,
  NotificationUserChannel,
  RoleListEventResponse,
  StickerListedResponse,
  StreamingChannelUserList,
  SystemMessage,
  SystemMessageRequest,
  UpdateCategoryOrderRequest,
  UpdateRoleChannelRequest,
  WebhookCreateRequest,
  WebhookGenerateResponse,
  WebhookListResponse,
  AppDeleteRequestSchema,
  BannedUserListRequestSchema,
  QuickMenuAccessSchema,
  QuickMenuAccess,
  MeetParticipantRequestSchema,
  UserEventRequestSchema,
  GenerateHashChannelAppsResponse,
  MezonOauthClientSchema,
  CreateRoomChannelAppsSchema,
  CreateRoomChannelApps,
  SdTopicDetailRequestSchema,
  SdTopicRequestSchema,
  UserStatusUpdateSchema,
  UpdateOnboardingStepRequestSchema,
  UpdateOnboardingStepRequest,
  UpdateClanWebhookRequestSchema,
  UpdateClanWebhookRequest,
  ClanWebhookRequestSchema,
  OnboardingRequestSchema,
  UpdateOnboardingRequest,
  ListAuditLog,
  ChanEncryptionMethodSchema,
  ListFavoriteChannelRequestSchema,
  ListFavoriteChannelResponse,
  RemoveFavoriteChannelRequestSchema,
  AddFavoriteChannelRequestSchema,
  EditChannelCanvasRequestSchema,
  EditChannelCanvasResponse,
  ChannelCanvasDetailRequestSchema,
  ChannelCanvasDetailResponse,
  ChannelCanvasListRequestSchema,
  ChannelSettingListRequestSchema,
  PermissionRoleChannelListEventRequestSchema,
  RoleListEventRequestSchema,
  NotificationClanSchema,
  NotificationChannelSchema,
  DefaultNotificationCategorySchema,
  GetSystemMessageSchema,
  AppClanSchema,
  AppIdSchema,
  UpdateRoleChannelRequestSchema,
  WebhookListRequestSchema,
  WebhookCreateRequestSchema,
  DeletePinMessageSchema,
  ListPermissionOfUsersRequestSchema,
  UpdateAppRequest,
  UpdateClanDescRequest,
  AccountEmailSchema,
  AccountMezonSchema,
  WebhookUpdateRequestById,
  WebhookDeleteRequestById,
  ClanStickerUpdateByIdRequest,
  ChangeChannelCategoryRequest,
  ClanEmojiUpdateRequest,
} from "packages/webrpc/frontend/src/gen/api/api_pb";
import { EmptySchema } from "@bufbuild/protobuf/wkt";
import { encode } from "js-base64";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";

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

  // private readonly gatewayClient: MezonApi;

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

    const transport = createGrpcWebTransport({
      baseUrl: basePath,
      useBinaryFormat: true,
    });

    // this.gatewayClient = new MezonApi(
    //   DEFAULT_SERVER_KEY,
    //   DEFAULT_TIMEOUT_MS,
    //   basePath
    // );
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

  /** Authenticate a user with a custom id against the server. */
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

  //   return this.gatewayClient
  //     .authenticateMezon(
  //       this.serverkey,
  //       "",
  //       request,
  //       create,
  //       username,
  //       isRemember,
  //       options
  //     )
  //     .then((apiSession: ApiSession) => {
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

  /** Add users to a channel, or accept their join requests. */
  async addChannelUsers(
    session: Session,
    channelId: string,
    ids?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addChannelUsersRequest = create(AddChannelUsersRequestSchema, {
      channelId: channelId,
      userIds: ids,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addChannelUsers(
      addChannelUsersRequest,
      options
    );

    return response !== undefined;
  }

  /** Add friends by ID or username to a user's account. */
  async addFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>
  ): Promise<AddFriendsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addFriendsRequest = create(AddFriendsRequestSchema, {
      ids: ids,
      usernames: usernames,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.addFriends(addFriendsRequest, options);
  }

  /** Block one or more users by ID or username. */
  async blockFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const blockFriendsRequest = create(BlockFriendsRequestSchema, {
      ids: ids,
      usernames: usernames,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.blockFriends(
      blockFriendsRequest,
      options
    );

    return response !== undefined;
  }

  /** Block one or more users by ID or username. */
  async unblockFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const unblockFriendsRequest = create(BlockFriendsRequestSchema, {
      ids: ids,
      usernames: usernames,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.unblockFriends(
      unblockFriendsRequest,
      options
    );

    return response !== undefined;
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadOauthFile(
    session: Session,
    request: UploadAttachmentRequest
  ): Promise<UploadAttachment> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const uploadRequest = create(UploadAttachmentRequestSchema, {
      filename: request.filename,
      filetype: request.filetype,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.uploadOauthFile(uploadRequest, options);
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadAttachmentFile(
    session: Session,
    request: UploadAttachmentRequest
  ): Promise<UploadAttachment> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const uploadRequest = create(UploadAttachmentRequestSchema, {
      filename: request.filename,
      filetype: request.filetype,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.uploadAttachmentFile(uploadRequest, options);
  }

  /** Create a channel within clan */
  async createChannelDesc(
    session: Session,
    request: CreateChannelDescRequest
  ): Promise<ChannelDescription> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createChannelRequest = create(
      CreateChannelDescRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createChannelDesc(
      createChannelRequest,
      options
    );
  }

  /** Create a clan */
  async createClanDesc(
    session: Session,
    request: CreateClanDescRequest
  ): Promise<ClanDesc> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createClanRequest = create(CreateClanDescRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createClanDesc(createClanRequest, options);
  }

  /**  */
  async createCategoryDesc(
    session: Session,
    request: CreateCategoryDescRequest
  ): Promise<CategoryDesc> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createCategoryRequest = create(
      CreateCategoryDescRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createCategoryDesc(
      createCategoryRequest,
      options
    );
  }

  /** Create a new role for clan. */
  async createRole(
    session: Session,
    request: CreateRoleRequest
  ): Promise<Role> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createRoleRequest = create(CreateRoleRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createRole(createRoleRequest, options);
  }

  /** Create a new event for clan. */
  async createEvent(
    session: Session,
    request: CreateEventRequest
  ): Promise<EventManagement> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createEventRequest = create(CreateEventRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createEvent(createEventRequest, options);
  }

  /** add role for channel. */
  async addRolesChannelDesc(
    session: Session,
    request: AddRoleChannelDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addRoleRequest = create(AddRoleChannelDescRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addRolesChannelDesc(
      addRoleRequest,
      options
    );

    return response !== undefined;
  }

  /** Update action role when delete role */
  async deleteRoleChannelDesc(
    session: Session,
    request: DeleteRoleRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteRoleRequest = create(DeleteRoleRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteRoleChannelDesc(
      deleteRoleRequest,
      options
    );

    return response !== undefined;
  }

  async deleteApp(session: Session, appId: string): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteAppRequest = create(AppDeleteRequestSchema, {
      id: appId,
      recordDeletion: true,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteApp(
      deleteAppRequest,
      options
    );

    return response !== undefined;
  }

  /** A socket created with the client's configuration. */
  createSocket(
    useSSL = false,
    verbose: boolean = false,
    adapter: WebSocketAdapter = new WebSocketAdapterText(),
    sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs
  ): Socket {
    return new DefaultSocket(
      this.host,
      this.port,
      useSSL,
      verbose,
      adapter,
      sendTimeoutMs
    );
  }

  /** Delete one or more users by ID or username. */
  async deleteFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteFriendsRequest = create(DeleteFriendsRequestSchema, {
      ids: ids,
      usernames: usernames,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteFriends(
      deleteFriendsRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete a channel by ID. */
  async deleteChannelDesc(
    session: Session,
    clanId: string,
    channelId: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteChannelRequest = create(DeleteChannelDescRequestSchema, {
      clanId: clanId,
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteChannelDesc(
      deleteChannelRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete a clan desc by ID. */
  async deleteClanDesc(session: Session, clanDescId: string): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteClanRequest = create(DeleteClanDescRequestSchema, {
      clanDescId: clanDescId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteClanDesc(
      deleteClanRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete a category by ID. */
  async deleteCategoryDesc(
    session: Session,
    categoryId: string,
    clanId: string,
    categoryLabel?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteCategoryRequest = create(DeleteCategoryDescRequestSchema, {
      categoryId: categoryId,
      clanId: clanId,
      categoryLabel: categoryLabel,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteCategoryDesc(
      deleteCategoryRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete one or more notifications */
  async deleteNotifications(
    session: Session,
    ids?: Array<string>,
    category?: number
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteNotificationsRequest = create(
      DeleteNotificationsRequestSchema,
      {
        ids: ids,
        category: category,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteNotifications(
      deleteNotificationsRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete a role by ID. */
  async deleteRole(
    session: Session,
    roleId: string,
    clanId: string,
    roleLabel?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteRoleRequest = create(DeleteRoleRequestSchema, {
      roleId: roleId,
      clanId: clanId,
      roleLabel: roleLabel,
      channelId: "",
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteRole(
      deleteRoleRequest,
      options
    );

    return response !== undefined;
  }

  /** Delete a event by ID. */
  async deleteEvent(
    session: Session,
    eventId: string,
    clanId: string,
    creatorId: string,
    eventLabel?: string,
    channelId?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteEventRequest = create(DeleteEventRequestSchema, {
      eventId: eventId,
      clanId: clanId,
      creatorId: creatorId,
      eventLabel: eventLabel,
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteEvent(
      deleteEventRequest,
      options
    );

    return response !== undefined;
  }

  /** update user a event by ID. */
  // async updateEventUser(
  //   session: Session,
  //   request: UpdateEventRequest
  // ): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const updateEventRequest = create(UpdateEventRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.updateEventUser(
  //     updateEventRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  // async emitEvent(session: Session, request: Event): Promise<boolean> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const eventRequest = create(EventSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.event(eventRequest, options);

  //   return response !== undefined;
  // }

  /** Fetch the current user's account. */
  async getAccount(session: Session): Promise<Account> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getAccount(create(EmptySchema, {}), options);
  }

  /** Kick a set of users from a clan. */
  async removeClanUsers(
    session: Session,
    clanId: string,
    ids?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const removeClanUsersRequest = create(RemoveClanUsersRequestSchema, {
      clanId: clanId,
      userIds: ids,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.removeClanUsers(
      removeClanUsersRequest,
      options
    );

    return response !== undefined;
  }

  async listBannedUsers(
    session: Session,
    clanId?: string,
    channelId?: string
  ): Promise<BannedUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listBannedUsersRequest = create(BannedUserListRequestSchema, {
      clanId: clanId,
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listBannedUsers(
      listBannedUsersRequest,
      options
    );
  }

  /** Ban a set of users from a clan. */
  async unbanClanUsers(
    session: Session,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const unbanClanUsersRequest = create(BanClanUsersRequestSchema, {
      clanId: clanId,
      channelId: channelId,
      userIds: userIds,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.unbanClanUsers(
      unbanClanUsersRequest,
      options
    );

    return response !== undefined;
  }

  /** Ban a set of users from a clan. */
  async banClanUsers(
    session: Session,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
    banTime?: number
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const banClanUsersRequest = create(BanClanUsersRequestSchema, {
      clanId: clanId,
      channelId: channelId,
      userIds: userIds,
      banTime: banTime,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.banClanUsers(
      banClanUsersRequest,
      options
    );

    return response !== undefined;
  }

  /** Kick users from a channel, or decline their join requests. */
  async removeChannelUsers(
    session: Session,
    channelId: string,
    ids?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const removeChannelUsersRequest = create(RemoveChannelUsersRequestSchema, {
      channelId: channelId,
      userIds: ids,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.removeChannelUsers(
      removeChannelUsersRequest,
      options
    );

    return response !== undefined;
  }

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

  //   const listChannelMessagesRequest = create(
  //     ListChannelMessagesRequestSchema,
  //     {
  //       clanId: clanId,
  //       channelId: channelId,
  //       messageId: messageId,
  //       direction: direction,
  //       limit: limit,
  //       topicId: topicId,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listChannelMessages(
  //     listChannelMessagesRequest,
  //     options
  //   );

  //   var result: ChannelMessageList = {
  //     messages: [],
  //     last_seen_message: response.lastSeenMessage,
  //     last_sent_message: response.lastSentMessage,
  //   };

  //   if (response.messages == null) {
  //     return result;
  //   }
  //   response.messages!.forEach((m) => {
  //     var content, reactions, mentions, attachments, references;
  //     try {
  //       content = safeJSONParse(m.content);
  //     } catch (e) {
  //       console.log("error parse content", e);
  //     }
  //     try {
  //       reactions = safeJSONParse(m.reactions || "[]");
  //     } catch (e) {
  //       console.log("error parse reactions", e);
  //     }
  //     try {
  //       mentions = safeJSONParse(m.mentions || "[]");
  //     } catch (e) {
  //       console.log("error parse mentions", e);
  //     }
  //     try {
  //       attachments = safeJSONParse(m.attachments || "[]");
  //     } catch (e) {
  //       console.log("error parse attachments", e);
  //     }
  //     try {
  //       references = safeJSONParse(m.references || "[]");
  //     } catch (e) {
  //       console.log("error parse references", e);
  //     }
  //     result.messages!.push({
  //       channel_id: m.channelId || "",
  //       code: m.code ? Number(m.code) : 0,
  //       create_time: m.createTime?.seconds.toString() || "",
  //       id: m.messageId,
  //       sender_id: m.senderId,
  //       update_time: m.updateTime?.seconds.toString() || "",
  //       username: m.username,
  //       display_name: m.displayName,
  //       avatar: m.avatar,
  //       content: content,
  //       channel_label: m.channelLabel,
  //       clan_logo: m.clanLogo,
  //       category_name: m.categoryName,
  //       clan_nick: m.clanNick,
  //       clan_avatar: m.clanAvatar,
  //       attachments: attachments,
  //       mentions: mentions,
  //       reactions: reactions,
  //       references: references,
  //       clan_id: m.clanId,
  //       create_time_seconds: m.createTimeSeconds,
  //       update_time_seconds: m.updateTimeSeconds,
  //       hide_editted: m.hideEditted,
  //     });
  //   });
  //   return result;
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

  //   const listChannelVoiceUsersRequest = create(ListChannelUsersRequestSchema, {
  //     clanId: clanId,
  //     channelId: channelId,
  //     channelType: channelType,
  //     limit: limit,
  //     state: state,
  //     cursor: cursor,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listChannelVoiceUsers(
  //     listChannelVoiceUsersRequest,
  //     options
  //   );

  //   var result: VoiceChannelUserList = {
  //     voiceChannelUsers: [],
  //   };

  //   if (response.voiceChannelUsers == null) {
  //     return result;
  //   }

  //   response.voiceChannelUsers!.forEach((gu) => {
  //     result.voiceChannelUsers!.push({
  //       id: gu.id,
  //       channelId: gu.channelId,
  //       userId: gu.userId,
  //       participant: gu.participant,
  //     });
  //   });
  //   return result;
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

  //   const listChannelUsersRequest = create(ListChannelUsersRequestSchema, {
  //     clanId: clanId,
  //     channelId: channelId,
  //     channelType: channelType,
  //     limit: limit,
  //     state: state,
  //     cursor: cursor,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listChannelUsers(
  //     listChannelUsersRequest,
  //     options
  //   );

  //   var result: ChannelUserList = {
  //     channel_users: [],
  //     cursor: response.cursor,
  //     channel_id: response.channel_id,
  //   };

  //   if (response.channel_users == null) {
  //     return result;
  //   }

  //   response.channel_users!.forEach((gu) => {
  //     result.channel_users!.push({
  //       user_id: gu.user_id,
  //       role_id: gu!.role_id,
  //       thread_id: gu.thread_id,
  //       clan_avatar: gu.clan_avatar,
  //       clan_nick: gu.clan_nick,
  //       id: gu.id,
  //       clan_id: gu.clan_id,
  //       added_by: gu.added_by,
  //       is_banned: gu.is_banned,
  //     });
  //   });
  //   return result;
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

  //   const listChannelAttachmentRequest = create(
  //     ListChannelAttachmentRequestSchema,
  //     {
  //       channelId: channelId,
  //       clanId: clanId,
  //       filetype: fileType,
  //       limit: limit,
  //       state: state,
  //       before: before,
  //       after: after,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listChannelAttachment(
  //     listChannelAttachmentRequest,
  //     options
  //   );

  //   var result: ChannelAttachmentList = {
  //     attachments: [],
  //   };

  //   if (response.attachments == null) {
  //     return result;
  //   }

  //   response.attachments!.forEach((at) => {
  //     result.attachments!.push({
  //       filename: at.filename,
  //       filesize: at.filesize,
  //       filetype: at.filetype,
  //       id: at.id,
  //       uploader: at.uploader,
  //       url: at.url,
  //       message_id: at.message_id,
  //       create_time: at.create_time,
  //       width: at.width,
  //       height: at.height,
  //     });
  //   });
  //   return result;
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

  //   const listClanUsersRequest = create(ListClanUsersRequestSchema, {
  //     clanId: clanId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listClanUsers(
  //     listClanUsersRequest,
  //     options
  //   );

  //   var result: ClanUserList = {
  //     clan_users: [],
  //     cursor: response.cursor,
  //     clan_id: response.clan_id,
  //   };

  //   if (response.clan_users == null) {
  //     return result;
  //   }

  //   response.clan_users!.forEach((gu) => {
  //     result.clan_users!.push({
  //       user: {
  //         avatar_url: gu.user!.avatar_url,
  //         create_time: gu.user!.create_time,
  //         display_name: gu.user!.display_name,
  //         edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count) : 0,
  //         id: gu.user!.id,
  //         lang_tag: gu.user!.lang_tag,
  //         location: gu.user!.location,
  //         online: gu.user!.online,
  //         is_mobile: gu.user?.is_mobile,
  //         timezone: gu.user!.timezone,
  //         update_time: gu.user!.update_time,
  //         username: gu.user!.username,
  //         user_status: gu.user!.user_status,
  //         status: gu.user!.status,
  //         about_me: gu.user!.about_me,
  //         mezon_id: gu.user!.mezon_id,
  //         list_nick_names: gu.user!.list_nick_names,
  //         phone_number: gu.user!.phone_number,
  //       },
  //       role_id: gu!.role_id,
  //       clan_nick: gu!.clan_nick,
  //       clan_avatar: gu!.clan_avatar,
  //     });
  //   });
  //   return result;
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

  //   const listChannelDetailRequest = create(ListChannelDetailRequestSchema, {
  //     channelId: channelId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listChannelDetail(
  //     listChannelDetailRequest,
  //     options
  //   );
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

  //   const listChannelDescsRequest = create(ListChannelDescsRequestSchema, {
  //     limit: limit,
  //     state: state,
  //     cursor: cursor,
  //     clanId: clanId,
  //     channelType: channelType,
  //     isMobile: isMobile,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listChannelDescs(
  //     listChannelDescsRequest,
  //     options
  //   );

  //   var result: ChannelDescList = {
  //     channeldesc: [],
  //     next_cursor: response.next_cursor,
  //     prev_cursor: response.prev_cursor,
  //     cacheable_cursor: response.cacheable_cursor,
  //   };

  //   if (response.channeldesc == null) {
  //     return result;
  //   }

  //   result.channeldesc = response.channeldesc;
  //   return result;
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

  //   const listClanUnreadMsgIndicatorRequest = create(
  //     ListClanUnreadMsgIndicatorRequestSchema,
  //     {
  //       clanId: clanId,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listClanUnreadMsgIndicator(
  //     listClanUnreadMsgIndicatorRequest,
  //     options
  //   );
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

  //   const listClanDescsRequest = create(ListClanDescsRequestSchema, {
  //     limit: limit,
  //     state: state,
  //     cursor: cursor,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listClanDescs(
  //     listClanDescsRequest,
  //     options
  //   );

  //   var result: ClanDescList = {
  //     clandesc: [],
  //   };

  //   if (response.clandesc == null) {
  //     return result;
  //   }

  //   result.clandesc = response.clandesc;
  //   return result;
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

  //   const listCategoryDescsRequest = create(ListCategoryDescsRequestSchema, {
  //     clanId: clanId,
  //     creatorId: creatorId,
  //     categoryName: categoryName,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listCategoryDescs(
  //     listCategoryDescsRequest,
  //     options
  //   );

  //   var result: CategoryDescList = {
  //     categorydesc: [],
  //   };

  //   if (response.categorydesc == null) {
  //     return result;
  //   }

  //   result.categorydesc = response.categorydesc;
  //   return result;
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

  //   const listEventsRequest = create(ListEventsRequestSchema, {
  //     clanId: clanId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listEvents(listEventsRequest, options);
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

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.getListPermission(
  //     create(EmptySchema, {}),
  //     options
  //   );
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

  //   const listPermissionsRequest = create(ListPermissionsRequestSchema, {
  //     roleId: roleId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listRolePermissions(
  //     listPermissionsRequest,
  //     options
  //   );
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

  //   const listRoleUsersRequest = create(ListRoleUsersRequestSchema, {
  //     roleId: roleId,
  //     limit: limit,
  //     cursor: cursor,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listRoleUsers(listRoleUsersRequest, options);
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

  //   const registFCMDeviceTokenRequest = create(
  //     RegistFcmDeviceTokenRequestSchema,
  //     {
  //       tokenId: tokenId,
  //       deviceId: deviceId,
  //       platform: platform,
  //       voipToken: voipToken,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.registFCMDeviceToken(
  //     registFCMDeviceTokenRequest,
  //     options
  //   );
  // }

  // async getUserProfileOnClan(
  //   session: Session,
  //   clanId: string
  // ): Promise<ClanDescProfile> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const getUserProfileOnClanRequest = create(ClanDescProfileRequestSchema, {
  //     clanId: clanId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.getUserProfileOnClan(
  //     getUserProfileOnClanRequest,
  //     options
  //   );
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

  //   const closeDirectMessRequest = create(
  //     CloseDirectMessRequestSchema,
  //     request
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.closeDirectMess(
  //     closeDirectMessRequest,
  //     options
  //   );

  //   return response !== undefined;
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

  //   const openDirectMessRequest = create(OpenDirectMessRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.openDirectMess(
  //     openDirectMessRequest,
  //     options
  //   );

  //   return response !== undefined;
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

  //   const confirmLinkMezonOTPRequest = create(
  //     LinkAccountConfirmRequestSchema,
  //     request
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.confirmLinkMezonOTP(
  //     confirmLinkMezonOTPRequest,
  //     options
  //   );
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

  //   const linkMezonRequest = create(LinkInviteUserRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.linkMezon(linkMezonRequest, options);
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

  //   const linkEmailRequest = create(LinkInviteUserRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.linkEmail(linkEmailRequest, options);
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

  //   const listFriendsRequest = create(ListFriendsRequestSchema, {
  //     limit: limit,
  //     state: state,
  //     cursor: cursor,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listFriends(
  //     listFriendsRequest,
  //     options
  //   );

  //   var result: Friends = {
  //     friends: [],
  //     cursor: response.cursor,
  //   };

  //   if (response.friends == null) {
  //     return result;
  //   }

  //   response.friends!.forEach((f) => {
  //     result.friends!.push({
  //       user: {
  //         avatar_url: f.user!.avatar_url,
  //         create_time: f.user!.create_time,
  //         display_name: f.user!.display_name,
  //         edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
  //         id: f.user!.id,
  //         lang_tag: f.user!.lang_tag,
  //         location: f.user!.location,
  //         online: f.user!.online,
  //         timezone: f.user!.timezone,
  //         update_time: f.user!.update_time,
  //         username: f.user!.username,
  //         is_mobile: f.user?.is_mobile,
  //         user_status: f.user!.user_status,
  //         status: f.user!.status,
  //         mezon_id: f.user!.mezon_id,
  //         list_nick_names: f.user!.list_nick_names,
  //         phone_number: f.user!.phone_number,
  //         about_me: f.user!.about_me,
  //       },
  //       state: f.state,
  //       source_id: f.source_id,
  //     });
  //   });
  //   return result;
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

  //   const listNotificationsRequest = create(ListNotificationsRequestSchema, {
  //     limit: limit,
  //     clanId: clanId,
  //     notificationId: notificationId,
  //     category: category,
  //     direction: direction,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.listNotifications(
  //     listNotificationsRequest,
  //     options
  //   );

  //   var result: NotificationList = {
  //     cacheable_cursor: response.cacheable_cursor,
  //     notifications: [],
  //   };

  //   if (response.notifications == null) {
  //     return result;
  //   }

  //   response.notifications!.forEach((n) => {
  //     result.notifications!.push({
  //       id: n.id,
  //       subject: n.subject,
  //       content: n.content ? safeJSONParse(n.content) : undefined,
  //       code: n.code ? Number(n.code) : 0,
  //       sender_id: n.sender_id,
  //       create_time: n.create_time,
  //       persistent: n.persistent,
  //       category: n.category,
  //     });
  //   });
  //   return result;
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

  //   const rpcRequest = create(RpcSchema, {
  //     id: id,
  //     payload: JSON.stringify(input),
  //   });

  //   const options: CallOptions = {
  //     headers: [
  //       ["Authorization", "Bearer " + session.token],
  //       [
  //         "Authorization",
  //         "Basic " + encode(basicAuthUsername + ":" + basicAuthPassword),
  //       ],
  //     ],
  //   };

  //   const response = await this.mezonClient.rpcFunc(rpcRequest, options);

  //   return {
  //     id: response.id,
  //     payload: !response.payload ? undefined : safeJSONParse(response.payload),
  //   };
  // }

  // /** Execute an RPC function on the server. */
  // async rpcHttpKey(
  //   httpKey: string,
  //   id: string,
  //   input?: object
  // ): Promise<RpcResponse> {
  //   const rpcRequest = create(RpcSchema, {
  //     id: id,
  //     payload: input ? JSON.stringify(input) : "",
  //   });

  //   const options: CallOptions = {
  //     headers: [["X-HTTP-KEY", httpKey]],
  //   };

  //   const response = await this.mezonClient.rpcFunc(rpcRequest, options);

  //   return {
  //     id: response.id,
  //     payload: !response.payload ? undefined : safeJSONParse(response.payload),
  //   };
  // }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async sessionLogout(
    session: Session,
    token: string,
    refreshToken: string,
    deviceId: string,
    platform: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const sessionLogoutRequest = create(SessionLogoutRequestSchema, {
      refreshToken: refreshToken,
      token: token,
      deviceId: deviceId,
      platform: platform,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.sessionLogout(
      sessionLogoutRequest,
      options
    );

    return response !== undefined;
  }

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

  /** Remove custom ID from the social profiles on the current user's account. */
  async unlinkCustom(
    session: Session,
    request: AccountMezon
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const unlinkMezonRequest = create(AccountMezonSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.unlinkMezon(
      unlinkMezonRequest,
      options
    );

    return response !== undefined;
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  async unlinkEmail(session: Session, request: AccountEmail): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const unlinkEmailRequest = create(AccountEmailSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.unlinkEmail(
      unlinkEmailRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in the current user's account. */
  async updateUsername(
    session: Session,
    request: UpdateUsernameRequest
  ): Promise<Session> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateUsernameRequest = create(UpdateUsernameRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateUsername(
      updateUsernameRequest,
      options
    );

    return new Session(
      response.token || "",
      response.refreshToken || "",
      response.created || false,
      response.apiUrl || "",
      response.idToken || "",
      response.isRemember || false
    );
  }

  /** Update fields in the current user's account. */
  async updateAccount(
    session: Session,
    request: UpdateAccountRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateAccountRequest = create(UpdateAccountRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateAccount(
      updateAccountRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given channel */
  async updateChannelDesc(
    session: Session,
    channelId: string,
    request: UpdateChannelDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateChannelDescRequest = create(UpdateChannelDescRequestSchema, {
      channelId: channelId,
      ...request,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateChannelDesc(
      updateChannelDescRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given clan. */
  async updateClanDesc(
    session: Session,
    clanId: string,
    request: UpdateClanDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateClanDescRequest = create(UpdateClanDescRequestSchema, {
      ...request,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateClanDesc(
      updateClanDescRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given category. */
  async updateCategory(
    session: Session,
    clanId: string,
    request: UpdateCategoryDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateCategoryDescRequest = create(UpdateCategoryDescRequestSchema, {
      ...request,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateCategory(
      updateCategoryDescRequest,
      options
    );

    return response !== undefined;
  }

  async updateUserProfileByClan(
    session: Session,
    clanId: string,
    request: UpdateClanProfileRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateClanProfileRequest = create(UpdateClanProfileRequestSchema, {
      clanId: clanId,
      ...request,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateUserProfileByClan(
      updateClanProfileRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given role. */
  async updateRole(
    session: Session,
    roleId: string,
    request: UpdateRoleRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateRoleRequest = create(UpdateRoleRequestSchema, {
      roleId: roleId,
      ...request,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateRole(
      updateRoleRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given event. */
  async updateEvent(
    session: Session,
    eventId: string,
    request: UpdateEventRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateEventRequest = create(UpdateEventRequestSchema, {
      ...request,
      eventId: eventId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateEvent(
      updateEventRequest,
      options
    );

    return response !== undefined;
  }

  /** Update fields in a given event. */
  async updateApp(
    session: Session,
    roleId: string,
    request: UpdateAppRequest
  ): Promise<App> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateAppRequest = create(UpdateAppRequestSchema, {
      ...request,
      id: roleId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.updateApp(updateAppRequest, options);
  }

  /** Update fields in a given clan profile. */
  async createLinkInviteUser(
    session: Session,
    request: LinkInviteUserRequest
  ): Promise<LinkInviteUser> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const linkInviteUserRequest = create(LinkInviteUserRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createLinkInviteUser(
      linkInviteUserRequest,
      options
    );
  }

  /** Get link invite user */
  // async getLinkInvite(inviteId: string): Promise<InviteUserRes> {
  //   const inviteUserRequest = create(InviteUserRequestSchema, {
  //     inviteId: inviteId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Basic " + encode(this.serverkey + ":")]],
  //   };

  //   return await this.mezonClient.getLinkInvite(inviteUserRequest, options);
  // }

  /** Get permission of user in the clan */
  async GetRoleOfUserInTheClan(
    session: Session,
    clanId: string
  ): Promise<RoleList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanIdRequest = create(ListPermissionOfUsersRequestSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getRoleOfUserInTheClan(
      clanIdRequest,
      options
    );
  }

  /** invite user */
  async inviteUser(session: Session, inviteId: string): Promise<InviteUserRes> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const inviteUserRequest = create(InviteUserRequestSchema, {
      inviteId: inviteId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.inviteUser(inviteUserRequest, options);
  }

  /** Set default notification clan*/
  async setNotificationClan(
    session: Session,
    request: SetDefaultNotificationRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setNotificationClanRequest = create(
      SetDefaultNotificationRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setNotificationClanSetting(
      setNotificationClanRequest,
      options
    );

    return response !== undefined;
  }

  /** Set notification channel*/
  async setNotificationChannel(
    session: Session,
    request: SetNotificationRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setNotificationRequest = create(
      SetNotificationRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setNotificationChannelSetting(
      setNotificationRequest,
      options
    );

    return response !== undefined;
  }

  /** Set notification category*/
  async setMuteCategory(
    session: Session,
    request: SetMuteRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setMuteRequest = create(SetMuteRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setMuteCategory(
      setMuteRequest,
      options
    );

    return response !== undefined;
  }

  /** Set notification channel*/
  async setMuteChannel(
    session: Session,
    request: SetMuteRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setMuteRequest = create(SetMuteRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setMuteChannel(
      setMuteRequest,
      options
    );

    return response !== undefined;
  }

  /** update channel private*/
  async updateChannelPrivate(
    session: Session,
    request: ChangeChannelPrivateRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const changeChannelPrivateRequest = create(
      ChangeChannelPrivateRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateChannelPrivate(
      changeChannelPrivateRequest,
      options
    );

    return response !== undefined;
  }

  /** Set default notification category*/
  async setNotificationCategory(
    session: Session,
    request: SetNotificationRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setNotificationRequest = create(
      SetNotificationRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setNotificationCategorySetting(
      setNotificationRequest,
      options
    );

    return response !== undefined;
  }

  async deleteNotificationCategory(
    session: Session,
    category_id: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const channelIdRequest = create(DefaultNotificationCategorySchema, {
      categoryId: category_id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteNotificationCategorySetting(
      channelIdRequest,
      options
    );

    return response !== undefined;
  }

  async deleteNotificationChannel(
    session: Session,
    channel_id: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const channelIdRequest = create(NotificationChannelSchema, {
      channelId: channel_id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteNotificationChannel(
      channelIdRequest,
      options
    );

    return response !== undefined;
  }

  /** */
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

  //   const setNotificationReactMessageRequest = create(
  //     SetNotificationReactMessageRequestSchema,
  //     { channelId: channel_id }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.setNotificationReactMessage(
  //     setNotificationReactMessageRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  //** */
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

  //   const channelIdRequest = create(ChannelIdRequestSchema, {
  //     channelId: channel_id,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.deleteNotiReactMessage(
  //     channelIdRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  /** query message in elasticsearch */
  async searchMessage(
    session: Session,
    request: SearchMessageRequest
  ): Promise<SearchMessageResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const searchMessageRequest = create(SearchMessageRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.searchMessage(searchMessageRequest, options);
  }

  /** */
  async createMessage2Inbox(
    session: Session,
    request: Message2InboxRequest
  ): Promise<ChannelMessageHeader> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const message2InboxRequest = create(Message2InboxRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createMessage2Inbox(
      message2InboxRequest,
      options
    );
  }

  /** */
  async createPinMessage(
    session: Session,
    request: PinMessageRequest
  ): Promise<ChannelMessageHeader> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const pinMessageRequest = create(PinMessageRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createPinMessage(pinMessageRequest, options);
  }

  async pinMessagesList(
    session: Session,
    messageId: string,
    channelId: string,
    clanId: string
  ): Promise<PinMessagesList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getPinMessagesListRequest = create(PinMessageRequestSchema, {
      messageId: messageId,
      channelId: channelId,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getPinMessagesList(
      getPinMessagesListRequest,
      options
    );
  }

  //** */
  async deletePinMessage(
    session: Session,
    id?: string,
    messageId?: string,
    channelId?: string,
    clanId?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deletePinMessageRequest = create(DeletePinMessageSchema, {
      id: id,
      messageId: messageId,
      channelId: channelId,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deletePinMessage(
      deletePinMessageRequest,
      options
    );

    return response !== undefined;
  }

  /** create clan emoji */
  async createClanEmoji(session: Session, request: ClanEmojiCreateRequest) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanEmojiCreateRequest = create(
      ClanEmojiCreateRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.createClanEmoji(
      clanEmojiCreateRequest,
      options
    );

    return response !== undefined;
  }

  //**update clan emoji by id */
  async updateClanEmojiById(
    session: Session,
    id: string,
    request: ClanEmojiUpdateRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanEmojiUpdateRequest = create(ClanEmojiUpdateRequestSchema, {
      ...request,
      id: id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateClanEmojiById(
      clanEmojiUpdateRequest,
      options
    );

    return response !== undefined;
  }

  //**delete clan emoji by id */
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

  //   const clanEmojiDeleteRequest = create(ClanEmojiDeleteRequestSchema, {
  //     id: id,
  //     clanId: clan_id,
  //     shortname: emojiLabel,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.deleteClanEmojiById(
  //     clanEmojiDeleteRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  //**create webhook for chaneel */
  async generateWebhookLink(
    session: Session,
    request: WebhookCreateRequest
  ): Promise<WebhookGenerateResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const webhookCreateRequest = create(WebhookCreateRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.generateWebhook(
      webhookCreateRequest,
      options
    );
  }

  //**list webhook belong to the channel */
  async listWebhookByChannelId(
    session: Session,
    channel_id: string,
    clan_id: string
  ): Promise<WebhookListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const webhookListRequest = create(WebhookListRequestSchema, {
      channelId: channel_id,
      clanId: clan_id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listWebhookByChannelId(
      webhookListRequest,
      options
    );
  }

  //**update webhook name by id */
  async updateWebhookById(
    session: Session,
    id: string,
    request: WebhookUpdateRequestById
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const webhookUpdateRequest = create(WebhookUpdateRequestByIdSchema, {
      ...request,
      id: id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateWebhookById(
      webhookUpdateRequest,
      options
    );

    return response !== undefined;
  }

  //**disabled webhook by id */
  async deleteWebhookById(
    session: Session,
    id: string,
    request: WebhookDeleteRequestById
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const webhookDeleteRequest = create(WebhookDeleteRequestByIdSchema, {
      ...request,
      id: id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteWebhookById(
      webhookDeleteRequest,
      options
    );

    return response !== undefined;
  }

  //**check duplicate clan name */
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

  //   const checkDuplicateClanNameRequest = create(
  //     CheckDuplicateClanNameRequestSchema,
  //     {
  //       clanName: clan_name,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.checkDuplicateClanName(
  //     checkDuplicateClanNameRequest,
  //     options
  //   );
  // }

  //**Add a new sticker */
  async addClanSticker(session: Session, request: ClanStickerAddRequest) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanStickerAddRequest = create(ClanStickerAddRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addClanSticker(
      clanStickerAddRequest,
      options
    );

    return response !== undefined;
  }

  //**Delete a sticker by ID*/
  async deleteClanStickerById(
    session: Session,
    id: string,
    clan_id: string,
    stickerLabel?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanStickerDeleteRequest = create(ClanStickerDeleteRequestSchema, {
      id: id,
      clanId: clan_id,
      stickerLabel: stickerLabel,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteClanStickerById(
      clanStickerDeleteRequest,
      options
    );

    return response !== undefined;
  }

  //**Update a sticker by ID*/
  async updateClanStickerById(
    session: Session,
    id: string,
    request: ClanStickerUpdateByIdRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanStickerUpdateRequest = create(
      ClanStickerUpdateByIdRequestSchema,
      {
        ...request,
        id: id,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateClanStickerById(
      clanStickerUpdateRequest,
      options
    );

    return response !== undefined;
  }

  //** update the category of a channel */
  async changeChannelCategory(
    session: Session,
    id: string,
    request: ChangeChannelCategoryRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const changeChannelCategoryRequest = create(
      ChangeChannelCategoryRequestSchema,
      {
        ...request,
        channelId: id,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.changeChannelCategory(
      changeChannelCategoryRequest,
      options
    );

    return response !== undefined;
  }

  /** */
  async setRoleChannelPermission(
    session: Session,
    request: UpdateRoleChannelRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setRoleChannelPermissionRequest = create(
      UpdateRoleChannelRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.setRoleChannelPermission(
      setRoleChannelPermissionRequest,
      options
    );

    return response !== undefined;
  }

  async addApp(session: Session, request: AddAppRequest): Promise<App> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addAppRequest = create(AddAppRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.addApp(addAppRequest, options);
  }

  async getApp(session: Session, id: string): Promise<App> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const appIdRequest = create(AppIdSchema, {
      id: id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getApp(appIdRequest, options);
  }

  async listApps(session: Session): Promise<AppList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listApps(
      create(ListAppsRequestSchema, {}),
      options
    );
  }

  async addAppToClan(session: Session, appId: string, clanId: string) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addAppToClanRequest = create(AppClanSchema, {
      appId: appId,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addAppToClan(
      addAppToClanRequest,
      options
    );

    return response !== undefined;
  }

  // async getSystemMessagesList(session: Session): Promise<SystemMessagesList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.getSystemMessagesList(
  //     create(EmptySchema, {}),
  //     options
  //   );
  // }

  async getSystemMessageByClanId(
    session: Session,
    clanId: string
  ): Promise<SystemMessage> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanIdRequest = create(GetSystemMessageSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getSystemMessageByClanId(
      clanIdRequest,
      options
    );
  }

  async createSystemMessage(
    session: Session,
    request: SystemMessageRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const systemMessageRequest = create(SystemMessageRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createSystemMessage(
      systemMessageRequest,
      options
    );
  }

  async updateSystemMessage(
    session: Session,
    clanId: string,
    request: SystemMessageRequest
  ): Promise<void> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateSystemMessageRequest = create(SystemMessageRequestSchema, {
      ...request,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    await this.mezonClient.updateSystemMessage(
      updateSystemMessageRequest,
      options
    );
  }

  async deleteSystemMessage(session: Session, clanId: string): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteSystemMessageRequest = create(DeleteSystemMessageSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.deleteSystemMessage(
      deleteSystemMessageRequest,
      options
    );
  }

  async updateCategoryOrder(
    session: Session,
    request: UpdateCategoryOrderRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateCategoryOrderRequest = create(
      UpdateCategoryOrderRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.updateCategoryOrder(
      updateCategoryOrderRequest,
      options
    );
  }

  // async deleteCategoryOrder(session: Session, clanId: string): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const deleteCategoryOrderRequest = create(
  //     DeleteCategoryOrderRequestSchema,
  //     {
  //       clanId: clanId,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.deleteCategoryOrder(
  //     deleteCategoryOrderRequest,
  //     options
  //   );
  // }

  // async givecoffee(session: Session, request: GiveCoffeeEvent): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const giveCoffeeRequest = create(GiveCoffeeEventSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.giveMeACoffee(
  //     giveCoffeeRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  // async sendToken(session: Session, request: TokenSentEvent): Promise<any> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const tokenSentRequest = create(TokenSentEventSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.sendToken(
  //     tokenSentRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  /** List a channel's users. */
  async listStreamingChannelUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string
  ): Promise<StreamingChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listStreamingChannelUsersRequest = create(
      ListChannelUsersRequestSchema,
      {
        clanId: clanId,
        channelId: channelId,
        channelType: channelType,
        limit: limit,
        state: state,
        cursor: cursor,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listStreamingChannelUsers(
      listStreamingChannelUsersRequest,
      options
    );

    if (response.streamingChannelUsers == null) {
      response.streamingChannelUsers = [];
    }

    return response;
  }

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

  //   const registerStreamingChannelRequest = create(
  //     RegisterStreamingChannelRequestSchema,
  //     request
  //   );

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   const response = await this.mezonClient.registerStreamingChannel(
  //     registerStreamingChannelRequest,
  //     options
  //   );

  //   return response !== undefined;
  // }

  /** List a channel's users. */
  async listChannelApps(
    session: Session,
    clanId: string
  ): Promise<ListChannelAppsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelAppsRequest = create(ListChannelAppsRequestSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listChannelApps(
      listChannelAppsRequest,
      options
    );

    if (response.channelApps == null) {
      response.channelApps = [];
    }

    return response;
  }

  async getChannelCategoryNotiSettingsList(
    session: Session,
    clanId: string
  ): Promise<NotificationChannelCategorySettingList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const notificationSettingRequest = create(NotificationClanSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getChannelCategoryNotiSettingsList(
      notificationSettingRequest,
      options
    );
  }

  async getNotificationCategory(
    session: Session,
    categoryId: string
  ): Promise<NotificationUserChannel> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const notificationCategoryRequest = create(
      DefaultNotificationCategorySchema,
      {
        categoryId: categoryId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getNotificationCategory(
      notificationCategoryRequest,
      options
    );
  }

  async getNotificationChannel(
    session: Session,
    channelId: string
  ): Promise<NotificationUserChannel> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const notificationChannelRequest = create(NotificationChannelSchema, {
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getNotificationChannel(
      notificationChannelRequest,
      options
    );
  }

  async getNotificationClan(
    session: Session,
    clanId: string
  ): Promise<NotificationSetting> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const notificationClanRequest = create(NotificationClanSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getNotificationClan(
      notificationClanRequest,
      options
    );
  }

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

  //   const channelIdRequest = create(ChannelIdRequestSchema, {
  //     channelId: channelId,
  //   });

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.getNotificationReactMessage(
  //     channelIdRequest,
  //     options
  //   );
  // }

  async listChannelByUserId(session: Session): Promise<ChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listChannelByUserId(
      create(EmptySchema, {}),
      options
    );
  }

  async listChannelUsersUC(
    session: Session,
    channel_id: string,
    limit: number
  ): Promise<AllUsersAddChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelUsersUCRequest = create(AllUsersAddChannelRequestSchema, {
      channelId: channel_id,
      limit: limit,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listChannelUsersUC(
      listChannelUsersUCRequest,
      options
    );
  }

  async getListEmojisByUserId(session: Session): Promise<EmojiListedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getListEmojisByUserId(
      create(EmptySchema, {}),
      options
    );
  }

  async emojiRecentList(session: Session): Promise<EmojiRecentList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.emojiRecentList(
      create(EmptySchema, {}),
      options
    );
  }

  async getListStickersByUserId(
    session: Session
  ): Promise<StickerListedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getListStickersByUserId(
      create(EmptySchema, {}),
      options
    );
  }

  async listUserClansByUserId(session: Session): Promise<AllUserClans> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listUserClansByUserId(
      create(EmptySchema, {}),
      options
    );
  }

  async listRoles(
    session: Session,
    clanId?: string,
    limit?: number,
    state?: number,
    cursor?: string
  ): Promise<RoleListEventResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listRolesRequest = create(RoleListEventRequestSchema, {
      clanId: clanId,
      limit: limit,
      state: state,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listRoles(
      listRolesRequest,
      options
    );

    return response;
  }

  async listUserPermissionInChannel(
    session: Session,
    clanId?: string,
    channelId?: string
  ): Promise<UserPermissionInChannelListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listUserPermissionInChannelRequest = create(
      UserPermissionInChannelListRequestSchema,
      {
        clanId: clanId,
        channelId: channelId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listUserPermissionInChannel(
      listUserPermissionInChannelRequest,
      options
    );

    return response;
  }

  async getPermissionByRoleIdChannelId(
    session: Session,
    roleId?: string,
    channelId?: string,
    userId?: string
  ): Promise<PermissionRoleChannelListEventResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getPermissionByRoleIdChannelIdRequest = create(
      PermissionRoleChannelListEventRequestSchema,
      {
        roleId: roleId,
        channelId: channelId,
        userId: userId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.getPermissionByRoleIdChannelId(
      getPermissionByRoleIdChannelIdRequest,
      options
    );

    return response;
  }

  async markAsRead(session: Session, request: MarkAsReadRequest): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const markAsReadRequest = create(MarkAsReadRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.markAsRead(markAsReadRequest, options);
  }

  /** List Threads. */
  async listThreadDescs(
    session: Session,
    channelId: string,
    limit?: number,
    state?: number,
    clanId?: string,
    threadId?: string,
    page?: number
  ): Promise<ChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listThreadDescsRequest = create(ListThreadRequestSchema, {
      channelId: channelId,
      limit: limit,
      state: state,
      clanId: clanId,
      threadId: threadId,
      page: page,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listThreadDescs(
      listThreadDescsRequest,
      options
    );

    if (response.channeldesc == null) {
      response.channeldesc = [];
    }

    return response;
  }

  async leaveThread(
    session: Session,
    clanId: string,
    channelId: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const leaveThreadRequest = create(LeaveThreadRequestSchema, {
      clanId: clanId,
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.leaveThread(leaveThreadRequest, options);
  }

  async getChannelSettingInClan(
    session: Session,
    clanId: string,
    parentId?: string,
    categoryId?: string,
    privateChannel?: number,
    active?: number,
    status?: number,
    type?: number,
    limit?: number,
    page?: number,
    channelLabel?: string
  ): Promise<ChannelSettingListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelSettingRequest = create(ChannelSettingListRequestSchema, {
      clanId: clanId,
      parentId: parentId,
      categoryId: categoryId,
      privateChannel: privateChannel,
      active: active,
      status: status,
      type: type,
      limit: limit,
      page: page,
      channelLabel: channelLabel,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listChannelSetting(
      listChannelSettingRequest,
      options
    );
  }

  async getChannelCanvasList(
    session: Session,
    channelId: string,
    clanId?: string,
    limit?: number,
    page?: number
  ): Promise<ChannelCanvasListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getChannelCanvasListRequest = create(ChannelCanvasListRequestSchema, {
      channelId: channelId,
      clanId: clanId,
      limit: limit,
      page: page,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.getChannelCanvasList(
      getChannelCanvasListRequest,
      options
    );

    if (response.channelCanvases == null) {
      response.channelCanvases = [];
    }

    return response;
  }

  async getChannelCanvasDetail(
    session: Session,
    id: string,
    clanId?: string,
    channelId?: string
  ): Promise<ChannelCanvasDetailResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getChannelCanvasDetailRequest = create(
      ChannelCanvasDetailRequestSchema,
      {
        id: id,
        clanId: clanId,
        channelId: channelId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getChannelCanvasDetail(
      getChannelCanvasDetailRequest,
      options
    );
  }

  async editChannelCanvases(
    session: Session,
    request: EditChannelCanvasRequest
  ): Promise<EditChannelCanvasResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const editChannelCanvasesRequest = create(
      EditChannelCanvasRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.editChannelCanvases(
      editChannelCanvasesRequest,
      options
    );
  }

  //** */
  async deleteChannelCanvas(
    session: Session,
    canvasId: string,
    clanId?: string,
    channelId?: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteChannelCanvasRequest = create(
      DeleteChannelCanvasRequestSchema,
      {
        canvasId: canvasId,
        clanId: clanId,
        channelId: channelId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteChannelCanvas(
      deleteChannelCanvasRequest,
      options
    );
    return response !== undefined;
  }

  async addFavoriteChannel(
    session: Session,
    channelId: string,
    clanId: string
  ): Promise<AddFavoriteChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addChannelFavoriteRequest = create(AddFavoriteChannelRequestSchema, {
      channelId: channelId,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.addChannelFavorite(
      addChannelFavoriteRequest,
      options
    );
  }

  async removeFavoriteChannel(
    session: Session,
    clanId: string,
    channelId: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const removeChannelFavoriteRequest = create(
      RemoveFavoriteChannelRequestSchema,
      {
        clanId: clanId,
        channelId: channelId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    await this.mezonClient.removeChannelFavorite(
      removeChannelFavoriteRequest,
      options
    );
  }

  async getListFavoriteChannel(
    session: Session,
    clanId: string
  ): Promise<ListFavoriteChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getListFavoriteChannelRequest = create(
      ListFavoriteChannelRequestSchema,
      {
        clanId: clanId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getListFavoriteChannel(
      getListFavoriteChannelRequest,
      options
    );
  }
  /** List activity */
  async listActivity(session: Session): Promise<ListUserActivity> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listActivity(
      create(EmptySchema, {}),
      options
    );
  }

  async createActiviy(
    session: Session,
    request: CreateActivityRequest
  ): Promise<UserActivity> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createActiviyRequest = create(CreateActivityRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createActiviy(createActiviyRequest, options);
  }

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

  //   const confirmLoginRequest = create(ConfirmLoginRequestSchema, body);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.confirmLogin(confirmLoginRequest, options);
  // }

  async getChanEncryptionMethod(
    session: Session,
    channelId: string
  ): Promise<ChanEncryptionMethod> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getChanEncryptionMethodRequest = create(ChanEncryptionMethodSchema, {
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getChanEncryptionMethod(
      getChanEncryptionMethodRequest,
      options
    );
  }

  async setChanEncryptionMethod(
    session: Session,
    channelId: string,
    method: string
  ): Promise<void> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const setChanEncryptionMethodRequest = create(ChanEncryptionMethodSchema, {
      channelId: channelId,
      method: method,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    await this.mezonClient.setChanEncryptionMethod(
      setChanEncryptionMethodRequest,
      options
    );
  }

  async getPubKeys(
    session: Session,
    userIds: Array<string>
  ): Promise<GetPubKeysResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getPubKeysRequest = create(GetPubKeysRequestSchema, {
      userIds: userIds,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getPubKeys(getPubKeysRequest, options);
  }

  async pushPubKey(session: Session, PK: PubKey): Promise<void> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const pushPubKeyRequest = create(PushPubKeyRequestSchema, {
      PK: PK,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    await this.mezonClient.pushPubKey(pushPubKeyRequest, options);
  }

  async getKeyServer(session: Session): Promise<GetKeyServerResp> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getKeyServer(
      create(EmptySchema, {}),
      options
    );
  }

  async listAuditLog(
    session: Session,
    actionLog?: string,
    userId?: string,
    clanId?: string,
    date_log?: string
  ): Promise<ListAuditLog> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listAuditLogRequest = create(ListAuditLogRequestSchema, {
      actionLog: actionLog,
      userId: userId,
      clanId: clanId,
      dateLog: date_log,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listAuditLog(listAuditLogRequest, options);
  }

  async listOnboarding(
    session: Session,
    clanId?: string,
    guideType?: number,
    limit?: number,
    page?: number
  ): Promise<ListOnboardingResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listOnboardingRequest = create(ListOnboardingRequestSchema, {
      clanId: clanId,
      guideType: guideType,
      limit: limit,
      page: page,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listOnboarding(
      listOnboardingRequest,
      options
    );
  }

  async getOnboardingDetail(
    session: Session,
    id: string,
    clanId?: string
  ): Promise<OnboardingItem> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getOnboardingDetailRequest = create(OnboardingRequestSchema, {
      id: id,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getOnboardingDetail(
      getOnboardingDetailRequest,
      options
    );
  }

  async createOnboarding(
    session: Session,
    request: CreateOnboardingRequest
  ): Promise<ListOnboardingResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createOnboardingRequest = create(
      CreateOnboardingRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createOnboarding(
      createOnboardingRequest,
      options
    );
  }

  async updateOnboarding(
    session: Session,
    id: string,
    request: UpdateOnboardingRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateOnboardingRequest = create(UpdateOnboardingRequestSchema, {
      ...request,
      id: id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateOnboarding(
      updateOnboardingRequest,
      options
    );
    return response !== undefined;
  }

  async deleteOnboarding(
    session: Session,
    id: string,
    clanId?: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteOnboardingRequest = create(OnboardingRequestSchema, {
      id: id,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteOnboarding(
      deleteOnboardingRequest,
      options
    );
    return response !== undefined;
  }

  //**create webhook for clan */
  async generateClanWebhook(
    session: Session,
    request: GenerateClanWebhookRequest
  ): Promise<GenerateClanWebhookResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const generateClanWebhookRequest = create(
      GenerateClanWebhookRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.generateClanWebhook(
      generateClanWebhookRequest,
      options
    );
  }

  //**list webhook belong to the clan */
  async listClanWebhook(
    session: Session,
    clan_id: string
  ): Promise<ListClanWebhookResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listClanWebhookRequest = create(ListClanWebhookRequestSchema, {
      clanId: clan_id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listClanWebhook(
      listClanWebhookRequest,
      options
    );
  }

  //**disabled webhook by id */
  async deleteClanWebhookById(session: Session, id: string, clan_id: string) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteClanWebhookByIdRequest = create(ClanWebhookRequestSchema, {
      id: id,
      clanId: clan_id,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteClanWebhookById(
      deleteClanWebhookByIdRequest,
      options
    );
    return response !== undefined;
  }

  //**update webhook name by id */
  async updateClanWebhookById(
    session: Session,
    id: string,
    request: UpdateClanWebhookRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateClanWebhookByIdRequest = create(
      UpdateClanWebhookRequestSchema,
      {
        ...request,
        id: id,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateClanWebhookById(
      updateClanWebhookByIdRequest,
      options
    );
    return response !== undefined;
  }

  //**list onboarding step */
  async listOnboardingStep(
    session: Session,
    clan_id?: string,
    limit?: number,
    page?: number
  ): Promise<ListOnboardingStepResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listOnboardingStepRequest = create(ListOnboardingStepRequestSchema, {
      clanId: clan_id,
      limit: limit,
      page: page,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listOnboardingStep(
      listOnboardingStepRequest,
      options
    );
  }

  //**update onboarding step by id */
  async updateOnboardingStepByClanId(
    session: Session,
    clan_id: string,
    request: UpdateOnboardingStepRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateOnboardingStepByClanIdRequest = create(
      UpdateOnboardingStepRequestSchema,
      {
        ...request,
        clanId: clan_id,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateOnboardingStep(
      updateOnboardingStepByClanIdRequest,
      options
    );
    return response !== undefined;
  }

  //**update status */
  async updateUserStatus(session: Session, request: UserStatusUpdate) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateUserStatusRequest = create(UserStatusUpdateSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateUserStatus(
      updateUserStatusRequest,
      options
    );
    return response !== undefined;
  }

  //**get user status */
  async getUserStatus(session: Session): Promise<UserStatus> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getUserStatus(
      create(EmptySchema, {}),
      options
    );
  }

  //**list sd topic */
  async listSdTopic(
    session: Session,
    clanId?: string,
    limit?: number
  ): Promise<SdTopicList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listSdTopicRequest = create(ListSdTopicRequestSchema, {
      clanId: clanId,
      limit: limit,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listSdTopic(listSdTopicRequest, options);
  }

  //**post sd topic */
  async createSdTopic(
    session: Session,
    request: SdTopicRequest
  ): Promise<SdTopic> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createSdTopicRequest = create(SdTopicRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createSdTopic(createSdTopicRequest, options);
  }

  //**list sd topic */
  async getTopicDetail(session: Session, topicId?: string): Promise<SdTopic> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getTopicDetailRequest = create(SdTopicDetailRequestSchema, {
      topicId: topicId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getTopicDetail(
      getTopicDetailRequest,
      options
    );
  }

  //**create room channel apps */
  async createRoomChannelApps(
    session: Session,
    body: CreateRoomChannelApps
  ): Promise<CreateRoomChannelApps> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const createRoomChannelAppsRequest = create(
      CreateRoomChannelAppsSchema,
      body
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createRoomChannelApps(
      createRoomChannelAppsRequest,
      options
    );
  }

  /** Generate Meet Token */
  async generateMeetToken(
    session: Session,
    body: GenerateMeetTokenRequest
  ): Promise<GenerateMeetTokenResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const generateMeetTokenRequest = create(
      GenerateMeetTokenRequestSchema,
      body
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.generateMeetToken(
      generateMeetTokenRequest,
      options
    );
  }

  //**list webhook belong to the clan */
  // async listMezonOauthClient(session: Session): Promise<MezonOauthClientList> {
  //   if (
  //     this.autoRefreshSession &&
  //     session.refresh_token &&
  //     session.isexpired(Date.now() / 1000)
  //   ) {
  //     await this.sessionRefresh(session);
  //   }

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.listMezonOauthClient(
  //     create(EmptySchema, {}),
  //     options
  //   );
  // }

  async getMezonOauthClient(
    session: Session,
    clientId?: string,
    clientName?: string
  ): Promise<MezonOauthClient> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getMezonOauthClientRequest = create(
      GetMezonOauthClientRequestSchema,
      {
        clientId: clientId,
        clientName: clientName,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getMezonOauthClient(
      getMezonOauthClientRequest,
      options
    );
  }

  async updateMezonOauthClient(
    session: Session,
    body: MezonOauthClient
  ): Promise<MezonOauthClient> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateMezonOauthClientRequest = create(MezonOauthClientSchema, body);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.updateMezonOauthClient(
      updateMezonOauthClientRequest,
      options
    );
  }

  //**search thread */
  async searchThread(
    session: Session,
    clanId?: string,
    channelId?: string,
    label?: string
  ): Promise<ChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const searchThreadRequest = create(SearchThreadRequestSchema, {
      clanId: clanId,
      channelId: channelId,
      label: label,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.searchThread(searchThreadRequest, options);
  }

  //**Generate Hash */
  async generateHashChannelApps(
    session: Session,
    appId?: string
  ): Promise<GenerateHashChannelAppsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const generateHashChannelAppsRequest = create(
      GenerateHashChannelAppsRequestSchema,
      {
        appId: appId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.generateHashChannelApps(
      generateHashChannelAppsRequest,
      options
    );
  }

  async registrationPassword(
    session: Session,
    email?: string,
    password?: string,
    oldPassword?: string
  ): Promise<Session> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const registrationEmailRequest = create(RegistrationEmailRequestSchema, {
      email: email,
      password: password,
      oldPassword: oldPassword,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.registrationEmail(
      registrationEmailRequest,
      options
    );

    return new Session(
      response.token || "",
      response.refreshToken || "",
      response.created || false,
      response.apiUrl || "",
      response.idToken || "",
      response.isRemember || false
    );
  }

  /** Add user event */
  async addUserEvent(
    session: Session,
    request: UserEventRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addUserEventRequest = create(UserEventRequestSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addUserEvent(
      addUserEventRequest,
      options
    );
    return response !== undefined;
  }

  /** Delete user event */
  async deleteUserEvent(
    session: Session,
    clanId?: string,
    eventId?: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteUserEventRequest = create(UserEventRequestSchema, {
      clanId: clanId,
      eventId: eventId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteUserEvent(
      deleteUserEventRequest,
      options
    );
    return response !== undefined;
  }

  async updateRoleOrder(
    session: Session,
    request: UpdateRoleOrderRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateRoleOrderRequest = create(
      UpdateRoleOrderRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.updateRoleOrder(
      updateRoleOrderRequest,
      options
    );
  }

  async deleteAccount(session: Session): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.deleteAccount(
      create(EmptySchema, {}),
      options
    );
  }

  async createExternalMezonMeet(
    session: Session
  ): Promise<GenerateMezonMeetResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.createExternalMezonMeet(
      create(EmptySchema, {}),
      options
    );
  }

  // async generateMeetTokenExternal(
  //   basePath: string,
  //   token: string,
  //   displayName?: string,
  //   isGuest?: boolean
  // ): Promise<GenerateMeetTokenExternalResponse> {
  //   const generateMeetTokenExternalRequest = create(
  //     GenerateMeetTokenExternalRequestSchema,
  //     {
  //       basePath: basePath,
  //       token: token,
  //       displayName: displayName,
  //       isGuest: isGuest,
  //     }
  //   );

  //   const options: CallOptions = {
  //     headers: [["", ""]],
  //   };

  //   return await this.mezonClient.generateMeetTokenExternal(
  //     generateMeetTokenExternalRequest,
  //     options
  //   );
  // }

  async removeMezonMeetParticipant(
    session: Session,
    request: MeetParticipantRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const removeParticipantMezonMeetRequest = create(
      MeetParticipantRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.removeParticipantMezonMeet(
      removeParticipantMezonMeetRequest,
      options
    );
  }

  async muteMezonMeetParticipant(
    session: Session,
    request: MeetParticipantRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const muteParticipantMezonMeetRequest = create(
      MeetParticipantRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.muteParticipantMezonMeet(
      muteParticipantMezonMeetRequest,
      options
    );
  }

  /** Update clan order to view. */
  async updateClanOrder(
    session: Session,
    request: UpdateClanOrderRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateClanOrderRequest = create(
      UpdateClanOrderRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateClanOrder(
      updateClanOrderRequest,
      options
    );
    return response !== undefined;
  }

  /** list clan discover. */
  // async listClanDiscover(
  //   basePath: string,
  //   request: ClanDiscoverRequest
  // ): Promise<ListClanDiscover> {
  //   const clanDiscoverRequest = create(ClanDiscoverRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", this.serverkey]],
  //   };

  //   return await this.mezonClient.clanDiscover(clanDiscoverRequest, options);
  // }

  async listQuickMenuAccess(
    session: Session,
    botId: string,
    channelId: string,
    menuType: number
  ): Promise<QuickMenuAccessList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listQuickMenuAccessRequest = create(
      ListQuickMenuAccessRequestSchema,
      {
        botId: botId,
        channelId: channelId,
        menuType: menuType,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listQuickMenuAccess(
      listQuickMenuAccessRequest,
      options
    );
  }

  async deleteQuickMenuAccess(
    session: Session,
    id: string,
    clanId: string
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteQuickMenuAccessRequest = create(QuickMenuAccessSchema, {
      id: id,
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteQuickMenuAccess(
      deleteQuickMenuAccessRequest,
      options
    );
    return response !== undefined;
  }

  async addQuickMenuAccess(
    session: Session,
    request: QuickMenuAccess
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const addQuickMenuAccessRequest = create(QuickMenuAccessSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.addQuickMenuAccess(
      addQuickMenuAccessRequest,
      options
    );
    return response !== undefined;
  }

  async updateQuickMenuAccess(
    session: Session,
    request: QuickMenuAccess
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateQuickMenuAccessRequest = create(QuickMenuAccessSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.updateQuickMenuAccess(
      updateQuickMenuAccessRequest,
      options
    );
    return response !== undefined;
  }

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

  //   const unlockItemRequest = create(UnlockItemRequestSchema, request);

  //   const options: CallOptions = {
  //     headers: [["Authorization", "Bearer " + session.token]],
  //   };

  //   return await this.mezonClient.unlockItem(unlockItemRequest, options);
  // }

  async listForSaleItems(
    session: Session,
    page?: number
  ): Promise<ForSaleItemList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listForSaleItemsRequest = create(ListForSaleItemsRequestSchema, {
      page: page,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listForSaleItems(
      listForSaleItemsRequest,
      options
    );
  }

  async isFollower(
    session: Session,
    req: IsFollowerRequest
  ): Promise<IsFollowerResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const isFollowerRequest = create(IsFollowerRequestSchema, {
      followId: req.followId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.isFollower(isFollowerRequest, options);
  }

  async transferOwnership(
    session: Session,
    req: TransferOwnershipRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const transferOwnershipRequest = create(TransferOwnershipRequestSchema, {
      newOwnerId: req.newOwnerId,
      clanId: req.clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.transferOwnership(
      transferOwnershipRequest,
      options
    );

    return response !== undefined;
  }

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

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.isBanned(isBannedRequest, options);
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
      headers: [["Authorization", "Bearer " + session.token]],
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
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listLogedDevice(
      create(EmptySchema, {}),
      options
    );

    return response;
  }
}
