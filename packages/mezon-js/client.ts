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
  Transport,
  type Client as RPCClient,
} from "@connectrpc/connect";
import { Mezon as MezonService } from "./proto/gen/apigrpc_pb";
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
  ListChannelDescsRequestSchema,
  ListClanUnreadMsgIndicatorRequestSchema,
  ListClanUnreadMsgIndicatorResponse,
  ListClanDescRequestSchema,
  ClanDescList,
  CategoryDescSchema,
  CategoryDescList,
  ListEventsRequestSchema,
  EventList,
  LinkAccountConfirmRequest,
  LinkAccountConfirmRequestSchema,
  ListFriendsRequestSchema,
  ListNotificationsRequestSchema,
  ListPermissionsRequestSchema,
  ListRoleUsersRequestSchema,
  PermissionList,
  RegistFcmDeviceTokenRequestSchema,
  RegistFcmDeviceTokenResponse,
  RoleUserList,
  ClanProfileRequestSchema,
  ClanProfile,
  ListChannelDetailRequestSchema,
  ListClanUsersRequestSchema,
  ClanUserList,
  ListChannelAttachmentRequestSchema,
  ChannelAttachmentList,
  ChannelUserList,
  VoiceChannelUserList,
  ListChannelMessagesRequestSchema,
  FriendList,
  UpdateChannelDescRequest,
  UpdateClanProfileRequest,
  UpdateRoleRequest,
  DeleteChannelDescRequest,
  ClanEmojiDeleteRequestSchema,
  ChannelDescListNoPool,
  ChannelMessage,
} from "./proto/gen/api/api_pb";
import { DefaultSocket, Socket } from "./socket";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";
import {
  ChannelMessageList,
  ApiClanDiscoverRequest,
  ApiConfirmLoginRequest,
  ApiGenerateMeetTokenExternalResponse,
  ApiInviteUserRes,
  ApiLinkAccountConfirmRequest,
  ApiListClanDiscover,
  ApiLoginIDResponse,
  ApiLoginRequest,
  ApiMessageRef,
  ApiMessageReaction,
  NotificationList,
} from "./types";
import { GatewayMezonApi } from "./gateway.api";
import { safeJSONParse } from "./utils";
import { EmptySchema } from "./proto/gen/google/protobuf/empty_pb";
import {
  decodeMentions,
  decodeAttachments,
  decodeRefs,
  decodeReactions,
  decodeNotificationFcm,
} from "mezon-js-protobuf";

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

/** A client for Mezon server. */
export class Client {
  /** The low level API client for Mezon server. */
  private readonly gatewayClient: GatewayMezonApi;
  private grpcTransport: Transport;
  private mezonClient: RPCClient<typeof MezonService>;

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

    this.gatewayClient = new GatewayMezonApi(
      DEFAULT_SERVER_KEY,
      DEFAULT_TIMEOUT_MS,
      basePath
    );

    this.grpcTransport = createGrpcWebTransport({
      baseUrl: basePath,
      useBinaryFormat: true,
    });
    this.mezonClient = createClient(MezonService, this.grpcTransport);
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

  /** set base path */
  setBasePath(host: string, port: string, useSSL: boolean) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;

    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    
    this.gatewayClient.setBasePath(basePath);
    this.grpcTransport = createGrpcWebTransport({
      baseUrl: basePath,
      useBinaryFormat: true,
    });
    this.mezonClient = createClient(MezonService, this.grpcTransport);
  }

  //#region Mezon Gateway APIs

  /** Authenticate a user with a custom id against the server. */
  async authenticateMezon(
    token: string,
    create?: boolean,
    username?: string,
    isRemember?: boolean,
    vars: Record<string, string> = {},
    options: any = {}
  ): Promise<Session> {
    const request = {
      token: token,
      vars: vars,
    };

    const apiSession = await this.gatewayClient.authenticateMezon(
      this.serverkey,
      "",
      request,
      create,
      username,
      isRemember,
      options
    );
    return new Session(
      apiSession.token || "",
      apiSession.refreshToken || "",
      apiSession.created || false,
      apiSession.apiUrl || "",
      apiSession.idToken || "",
      apiSession.isRemember || false
    );
  }

  /** Authenticate a user with an email+otp against the server. */
  async authenticateSMSOTPRequest(
    phoneno: string,
    username?: string,
    vars?: Record<string, string>
  ): Promise<ApiLinkAccountConfirmRequest> {
    const request = {
      username: username,
      account: {
        phoneno: phoneno,
        vars: vars,
      },
    };

    return await this.gatewayClient.AuthenticateSMSOTPRequest(
      this.serverkey,
      "",
      request,
      username
    );
  }

  /** Authenticate a user with an email+otp against the server. */
  async authenticateEmailOTPRequest(
    email: string,
    username?: string,
    vars?: Record<string, string>
  ): Promise<ApiLinkAccountConfirmRequest> {
    const request = {
      username: username,
      account: {
        email: email,
        vars: vars,
      },
    };

    return await this.gatewayClient.AuthenticateEmailOTPRequest(
      this.serverkey,
      "",
      request,
      username
    );
  }

  async confirmAuthenticateOTP(
    request: LinkAccountConfirmRequest
  ): Promise<Session> {
    const apiSession = await this.gatewayClient.confirmAuthenticateOTP(
      this.serverkey,
      "",
      request
    );
    return new Session(
      apiSession.token || "",
      apiSession.refreshToken || "",
      apiSession.created || false,
      apiSession.apiUrl || "",
      apiSession.idToken || "",
      apiSession.isRemember || false
    );
  }

  /** Authenticate a user with an email+password against the server. */
  async authenticateEmail(
    email: string,
    password: string,
    username?: string,
    vars?: Record<string, string>
  ): Promise<Session> {
    const request = {
      username: username,
      account: {
        email: email,
        password: password,
        vars: vars,
      },
    };

    const apiSession = await this.gatewayClient.authenticateEmail(
      this.serverkey,
      "",
      request,
      username
    );
    return new Session(
      apiSession.token || "",
      apiSession.refreshToken || "",
      apiSession.created || false,
      apiSession.apiUrl || "",
      apiSession.idToken || "",
      apiSession.isRemember || false
    );
  }

  /** Get link invite user */
  async getLinkInvite(inviteId: string): Promise<ApiInviteUserRes> {
    return await this.gatewayClient.getLinkInvite(this.serverkey, "", inviteId);
  }

  async createQRLogin(requet: ApiLoginRequest): Promise<ApiLoginIDResponse> {
    const apiSession = await this.gatewayClient.createQRLogin(
      this.serverkey,
      "",
      requet
    );
    return {
      loginId: apiSession.loginId,
      createTimeSecond: apiSession.createTimeSecond,
    };
  }

  async checkLoginRequest(
    requet: ApiConfirmLoginRequest
  ): Promise<Session | null> {
    const apiSession = await this.gatewayClient.checkLoginRequest(
      this.serverkey,
      "",
      requet
    );
    if (!apiSession?.token) {
      return null;
    }
    return new Session(
      apiSession.token || "",
      apiSession.refreshToken || "",
      apiSession.created || false,
      apiSession.apiUrl || "",
      apiSession.idToken || "",
      apiSession.isRemember || false
    );
  }

  async confirmLogin(
    session: Session,
    basePath: string,
    body: ApiConfirmLoginRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return await this.gatewayClient.confirmLogin(session.token, basePath, body);
  }

  async generateMeetTokenExternal(
    basePath: string,
    token: string,
    displayName?: string,
    isGuest?: boolean
  ): Promise<ApiGenerateMeetTokenExternalResponse> {
    return await this.gatewayClient.generateMeetTokenExternal(
      "",
      basePath,
      token,
      displayName,
      isGuest
    );
  }

  /** list clan discover. */
  async listClanDiscover(
    basePath: string,
    request: ApiClanDiscoverRequest
  ): Promise<ApiListClanDiscover> {
    return await this.gatewayClient.clanDiscover(
      this.serverkey,
      "",
      basePath,
      request
    );
  }

  //#endregion

  /** Add users to a channel, or accept their join requests. */
  async addChannelUsers(
    session: Session,
    channelId: string,
    ids?: Array<string>
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  /** Fetch the current user's account. */
  async getAccount(session: Session): Promise<Account> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  /** List a channel's message history. */
  async listChannelMessages(
    session: Session,
    clanId: string,
    channelId: string,
    messageId?: string,
    direction?: number,
    limit?: number,
    topicId?: string
  ): Promise<ChannelMessageList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelMessagesRequest = create(
      ListChannelMessagesRequestSchema,
      {
        clanId: clanId,
        channelId: channelId,
        messageId: messageId,
        direction: direction,
        limit: limit,
        topicId: topicId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const channelMessageList = await this.mezonClient.listChannelMessages(
      listChannelMessagesRequest,
      options
    );

    var response: ChannelMessageList = {
      messages: [],
      lastSeenMessage: channelMessageList.lastSeenMessage,
      lastSentMessage: channelMessageList.lastSentMessage,
    };

    if (channelMessageList.messages == null) {
      return response;
    }

    channelMessageList.messages!.forEach((m) => {
      var content, reactions, mentions, attachments, references;
      try {
        content = safeJSONParse(m.content);
      } catch (e) {
        console.log("error parse content", e);
      }
      try {
        reactions =
          (decodeReactions(m.reactions)
            ?.reactions as unknown as ApiMessageReaction[]) ||
          safeJSONParse((m.reactions as unknown as string) || "[]");
      } catch (e) {
        console.log("error parse reactions", e);
      }
      try {
        mentions =
          decodeMentions(m.mentions)?.mentions ||
          safeJSONParse((m.mentions as unknown as string) || "[]");
      } catch (e) {
        console.log("error parse mentions", e);
      }
      try {
        attachments =
          decodeAttachments(m.attachments)?.attachments ||
          safeJSONParse((m.attachments as unknown as string) || "[]");
      } catch (e) {
        console.log("error parse attachments", e);
      }
      try {
        references =
          (decodeRefs(m.references)?.refs as unknown as ApiMessageRef[]) ||
          safeJSONParse((m.references as unknown as string) || "[]");
      } catch (e) {
        console.log("error parse references", e);
      }

      response.messages!.push({
        channelId: m.channelId,
        code: m.code ? Number(m.code) : 0,
        id: m.messageId,
        senderId: m.senderId,
        username: m.username,
        displayName: m.displayName,
        avatar: m.avatar,
        content: content,
        channelLabel: m.channelLabel,
        clanLogo: m.clanLogo,
        categoryName: m.categoryName,
        clanNick: m.clanNick,
        clanAvatar: m.clanAvatar,
        attachments: attachments,
        mentions: mentions,
        reactions: reactions,
        references: references,
        clanId: m.clanId,
        createTimeSeconds: m.createTimeSeconds,
        updateTimeSeconds: m.updateTimeSeconds,
        hideEditted: m.hideEditted,
      });
    });

    return response;
  }

  /** List a channel's users. */
  async listChannelVoiceUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string
  ): Promise<VoiceChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelVoiceUsersRequest = create(ListChannelUsersRequestSchema, {
      clanId: clanId,
      channelId: channelId,
      channelType: channelType,
      limit: limit,
      state: state,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listChannelVoiceUsers(
      listChannelVoiceUsersRequest,
      options
    );

    if (response.voiceChannelUsers == null) {
      response.voiceChannelUsers = [];
    }

    return response;
  }

  /** List a channel's users. */
  async listChannelUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string
  ): Promise<ChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelUsersRequest = create(ListChannelUsersRequestSchema, {
      clanId: clanId,
      channelId: channelId,
      channelType: channelType,
      limit: limit,
      state: state,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listChannelUsers(
      listChannelUsersRequest,
      options
    );

    if (response.channelUsers == null) {
      response.channelUsers = [];
    }

    return response;
  }

  /** List a channel's attachment. */
  async listChannelAttachments(
    session: Session,
    clanId: string,
    channelId: string,
    fileType: string,
    state?: number,
    limit?: number,
    before?: number,
    after?: number
  ): Promise<ChannelAttachmentList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelAttachmentRequest = create(
      ListChannelAttachmentRequestSchema,
      {
        channelId: channelId,
        clanId: clanId,
        fileType: fileType,
        limit: limit,
        state: state,
        before: before,
        after: after,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listChannelAttachment(
      listChannelAttachmentRequest,
      options
    );

    if (response.attachments == null) {
      response.attachments = [];
    }

    return response;
  }

  /** List a channel's users. */
  async listClanUsers(session: Session, clanId: string): Promise<ClanUserList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listClanUsersRequest = create(ListClanUsersRequestSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listClanUsers(
      listClanUsersRequest,
      options
    );
    if (response.clanUsers == null) {
      response.clanUsers = [];
    }

    return response;
  }

  async listChannelDetail(
    session: Session,
    channelId: string
  ): Promise<ChannelDescription> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelDetailRequest = create(ListChannelDetailRequestSchema, {
      channelId: channelId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listChannelDetail(
      listChannelDetailRequest,
      options
    );
  }

  // /** List channels. */
  async listChannelDescs(
    session: Session,
    limit?: number,
    state?: number,
    cursor?: string,
    clanId?: string,
    channelType?: number,
    isMobile?: boolean
  ): Promise<ChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelDescsRequest = create(ListChannelDescsRequestSchema, {
      limit: limit,
      state: state,
      cursor: cursor,
      clanId: clanId,
      channelType: channelType,
      isMobile: isMobile,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listChannelDescs(
      listChannelDescsRequest,
      options
    );

    if (response.channeldesc == null) {
      response.channeldesc = [];
    }

    return response;
  }

  // /** List clans */
  async listClanUnreadMsgIndicator(
    session: Session,
    clanId: string
  ): Promise<ListClanUnreadMsgIndicatorResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listClanUnreadMsgIndicatorRequest = create(
      ListClanUnreadMsgIndicatorRequestSchema,
      {
        clanId: clanId,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listClanUnreadMsgIndicator(
      listClanUnreadMsgIndicatorRequest,
      options
    );
  }

  // /** List clans */
  async listClanDescs(
    session: Session,
    limit?: number,
    state?: number,
    cursor?: string
  ): Promise<ClanDescList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listClanDescsRequest = create(ListClanDescRequestSchema, {
      limit: limit,
      state: state,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listClanDescs(
      listClanDescsRequest,
      options
    );

    if (response.clandesc == null) {
      response.clandesc = [];
    }

    return response;
  }

  /** List categories. */
  async listCategoryDescs(
    session: Session,
    clanId: string,
    creatorId?: string,
    categoryName?: string
  ): Promise<CategoryDescList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listCategoryDescsRequest = create(CategoryDescSchema, {
      clanId: clanId,
      creatorId: creatorId,
      categoryName: categoryName,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listCategoryDescs(
      listCategoryDescsRequest,
      options
    );

    if (response.categorydesc == null) {
      response.categorydesc = [];
    }

    return response;
  }

  /** List event */
  async listEvents(session: Session, clanId?: string): Promise<EventList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listEventsRequest = create(ListEventsRequestSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listEvents(listEventsRequest, options);
  }

  /** List permission */
  async getListPermission(session: Session): Promise<PermissionList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getListPermission(
      create(EmptySchema, {}),
      options
    );
  }

  /** List user roles */
  async listRolePermissions(
    session: Session,
    roleId: string
  ): Promise<PermissionList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listPermissionsRequest = create(ListPermissionsRequestSchema, {
      roleId: roleId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listRolePermissions(
      listPermissionsRequest,
      options
    );
  }

  /** List user roles */
  async listRoleUsers(
    session: Session,
    roleId: string,
    limit?: number,
    cursor?: string
  ): Promise<RoleUserList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listRoleUsersRequest = create(ListRoleUsersRequestSchema, {
      roleId: roleId,
      limit: limit,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.listRoleUsers(listRoleUsersRequest, options);
  }

  async registFCMDeviceToken(
    session: Session,
    tokenId: string,
    deviceId: string,
    platform: string,
    voipToken?: string
  ): Promise<RegistFcmDeviceTokenResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const registFCMDeviceTokenRequest = create(
      RegistFcmDeviceTokenRequestSchema,
      {
        token: tokenId,
        deviceId: deviceId,
        platform: platform,
        voipToken: voipToken,
      }
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.registFCMDeviceToken(
      registFCMDeviceTokenRequest,
      options
    );
  }

  async getUserProfileOnClan(
    session: Session,
    clanId: string
  ): Promise<ClanProfile> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const getUserProfileOnClanRequest = create(ClanProfileRequestSchema, {
      clanId: clanId,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.getUserProfileOnClan(
      getUserProfileOnClanRequest,
      options
    );
  }

  //
  async closeDirectMess(
    session: Session,
    request: DeleteChannelDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const closeDirectMessRequest = create(
      DeleteChannelDescRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.closeDMByChannelId(
      closeDirectMessRequest,
      options
    );

    return response !== undefined;
  }
  //
  async openDirectMess(
    session: Session,
    request: DeleteChannelDescRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const openDirectMessRequest = create(
      DeleteChannelDescRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.closeDMByChannelId(
      openDirectMessRequest,
      options
    );

    return response !== undefined;
  }

  async confirmLinkMezonOTP(
    session: Session,
    request: LinkAccountConfirmRequest
  ): Promise<void> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const confirmLinkMezonOTPRequest = create(
      LinkAccountConfirmRequestSchema,
      request
    );

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    await this.mezonClient.confirmLinkMezonOTP(
      confirmLinkMezonOTPRequest,
      options
    );
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  async linkSMS(
    session: Session,
    request: AccountMezon
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const linkSMSRequest = create(AccountMezonSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.linkSMS(linkSMSRequest, options);
  }

  /** Add an email+password to the social profiles on the current user's account. */
  async linkEmail(
    session: Session,
    request: AccountEmail
  ): Promise<LinkAccountConfirmRequest> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const linkEmailRequest = create(AccountEmailSchema, request);

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    return await this.mezonClient.linkEmail(linkEmailRequest, options);
  }

  /** List all friends for the current user. */
  async listFriends(
    session: Session,
    state?: number,
    limit?: number,
    cursor?: string
  ): Promise<FriendList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listFriendsRequest = create(ListFriendsRequestSchema, {
      limit: limit,
      state: state,
      cursor: cursor,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.listFriends(
      listFriendsRequest,
      options
    );

    if (response.friends == null) {
      response.friends = [];
    }

    return response;
  }

  /** Fetch list of notifications. */
  async listNotifications(
    session: Session,
    clanId: string,
    limit?: number,
    notificationId?: string,
    category?: number,
    direction?: number
  ): Promise<NotificationList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listNotificationsRequest = create(ListNotificationsRequestSchema, {
      limit: limit,
      clanId: clanId,
      notificationId: notificationId,
      category: category,
      direction: direction,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const notificationList = await this.mezonClient.listNotifications(
      listNotificationsRequest,
      options
    );

    const response: NotificationList = {
      notifications: [],
      cacheableCursor: notificationList.cacheableCursor,
    };

    if (notificationList.notifications == null) {
      notificationList.notifications = [];
    }

    notificationList.notifications!.forEach((n) => {
      var content;
      try {
        content =
          decodeNotificationFcm(n.content) ||
          safeJSONParse((n.content as unknown as string) || "{}");
      } catch (e) {
        console.log("error parse content", e);
      }

      response.notifications!.push({
        id: n.id,
        clanId: n.clanId,
        category: n.category,
        content: content,
        createTimeSeconds: n.createTimeSeconds,
        channelId: n.channelId,
        channelType: n.channelType,
        avatarUrl: n.avatarUrl,
        topicId: n.topicId,
      });
    });

    return response;
  }

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
      session.refreshToken &&
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

    if (session.created && session.expires_at! - session.createdAt < 70) {
      console.warn(
        "Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session"
      );
    }

    if (
      session.created &&
      session.refresh_expires_at! - session.createdAt < 3700
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
          //token: session.refreshToken,
          vars: vars,
          isRemember: session.isRemember,
        });

        const options: CallOptions = {
          headers: [["Authorization", session.refreshToken]],
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateChannelDescRequest = create(UpdateChannelDescRequestSchema, {
      ...request,
      channelId: channelId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateClanProfileRequest = create(UpdateClanProfileRequestSchema, {
      ...request,
      clanId: clanId,
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
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateRoleRequest = create(UpdateRoleRequestSchema, {
      ...request,
      roleId: roleId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  /** Get permission of user in the clan */
  async GetRoleOfUserInTheClan(
    session: Session,
    clanId: string
  ): Promise<RoleList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
    categoryId: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const channelIdRequest = create(DefaultNotificationCategorySchema, {
      categoryId: categoryId,
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
    channelId: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const channelIdRequest = create(NotificationChannelSchema, {
      channelId: channelId,
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

  /** query message in elasticsearch */
  async searchMessage(
    session: Session,
    request: SearchMessageRequest
  ): Promise<SearchMessageResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
  ): Promise<ChannelMessage> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
  ): Promise<ChannelMessage> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
  async deleteByIdClanEmoji(
    session: Session,
    id: string,
    clanId: string,
    emojiLabel?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanEmojiDeleteRequest = create(ClanEmojiDeleteRequestSchema, {
      id: id,
      clanId: clanId,
      emojiLabel: emojiLabel,
    });

    const options: CallOptions = {
      headers: [["Authorization", "Bearer " + session.token]],
    };

    const response = await this.mezonClient.deleteByIdClanEmoji(
      clanEmojiDeleteRequest,
      options
    );

    return response !== undefined;
  }

  //**create webhook for chaneel */
  async generateWebhookLink(
    session: Session,
    request: WebhookCreateRequest
  ): Promise<WebhookGenerateResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
    channelId: string,
    clanId: string
  ): Promise<WebhookListResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const webhookListRequest = create(WebhookListRequestSchema, {
      channelId: channelId,
      clanId: clanId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  //**Add a new sticker */
  async addClanSticker(
    session: Session,
    request: ClanStickerAddRequest
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
    clanId: string,
    stickerLabel?: string
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const clanStickerDeleteRequest = create(ClanStickerDeleteRequestSchema, {
      id: id,
      clanId: clanId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async getSystemMessageByClanId(
    session: Session,
    clanId: string
  ): Promise<SystemMessage> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  /** List a channel's users. */
  async listChannelApps(
    session: Session,
    clanId: string
  ): Promise<ListChannelAppsResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async listChannelByUserId(session: Session): Promise<ChannelDescListNoPool> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
    channelId: string,
    limit: number
  ): Promise<AllUsersAddChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listChannelUsersUCRequest = create(AllUsersAddChannelRequestSchema, {
      channelId: channelId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
  ): Promise<ChannelDescListNoPool> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async getChanEncryptionMethod(
    session: Session,
    channelId: string
  ): Promise<ChanEncryptionMethod> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
    dateLog?: string
  ): Promise<ListAuditLog> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listAuditLogRequest = create(ListAuditLogRequestSchema, {
      actionLog: actionLog,
      userId: userId,
      clanId: clanId,
      dateLog: dateLog,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
    clanId: string
  ): Promise<ListClanWebhookResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listClanWebhookRequest = create(ListClanWebhookRequestSchema, {
      clanId: clanId,
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
  async deleteClanWebhookById(session: Session, id: string, clanId: string) {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const deleteClanWebhookByIdRequest = create(ClanWebhookRequestSchema, {
      id: id,
      clanId: clanId,
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
      session.refreshToken &&
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
    clanId?: string,
    limit?: number,
    page?: number
  ): Promise<ListOnboardingStepResponse> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const listOnboardingStepRequest = create(ListOnboardingStepRequestSchema, {
      clanId: clanId,
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
    clanId: string,
    request: UpdateOnboardingStepRequest
  ) {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    const updateOnboardingStepByClanIdRequest = create(
      UpdateOnboardingStepRequestSchema,
      {
        ...request,
        clanId: clanId,
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

    const response = this.mezonClient.listSdTopic(listSdTopicRequest, options);
    console.log("listSdTopicresponse", response);
    return response;
  }

  //**post sd topic */
  async createSdTopic(
    session: Session,
    request: SdTopicRequest
  ): Promise<SdTopic> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async getMezonOauthClient(
    session: Session,
    clientId?: string,
    clientName?: string
  ): Promise<MezonOauthClient> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
  ): Promise<ChannelDescListNoPool> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async removeMezonMeetParticipant(
    session: Session,
    request: MeetParticipantRequest
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async listQuickMenuAccess(
    session: Session,
    botId: string,
    channelId: string,
    menuType: number
  ): Promise<QuickMenuAccessList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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

  async listForSaleItems(
    session: Session,
    page?: number
  ): Promise<ForSaleItemList> {
    if (
      this.autoRefreshSession &&
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
      session.refreshToken &&
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
