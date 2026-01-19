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
  ApiAccount,
  ApiAccountEmail,
  ApiChannelMessageList,
  ApiChannelDescList,
  ApiChannelDescription,
  ApiCreateChannelDescRequest,
  ApiDeleteRoleRequest,
  ApiClanDescList,
  ApiCreateClanDescRequest,
  ApiClanDesc,
  ApiCategoryDesc,
  ApiCategoryDescList,
  ApiPermissionList,
  ApiRoleUserList,
  ApiRole,
  ApiCreateRoleRequest,
  ApiAddRoleChannelDescRequest,
  ApiCreateCategoryDescRequest,
  ApiUpdateCategoryDescRequest,
  ApiEvent,
  ApiFriendList,
  ApiNotificationList,
  ApiUpdateAccountRequest,
  MezonApi,
  ApiSession,
  ApiClanProfile,
  ApiChannelUserList,
  ApiClanUserList,
  ApiLinkInviteUserRequest,
  ApiLinkInviteUser,
  ApiInviteUserRes,
  ApiUploadAttachmentRequest,
  ApiUploadAttachment,
  ApiChannelMessageHeader,
  ApiVoiceChannelUserList,
  ApiChannelAttachmentList,
  ApiCreateEventRequest,
  ApiEventManagement,
  ApiEventList,
  ApiDeleteEventRequest,
  ApiSetDefaultNotificationRequest,
  ApiSetNotificationRequest,
  ApiSetMuteRequest,
  ApiSearchMessageRequest,
  ApiSearchMessageResponse,
  ApiPinMessageRequest,
  ApiPinMessagesList,
  ApiDeleteChannelDescRequest,
  ApiChangeChannelPrivateRequest,
  ApiClanEmojiCreateRequest,
  MezonUpdateClanEmojiByIdBody,
  ApiWebhookCreateRequest,
  ApiWebhookListResponse,
  MezonUpdateWebhookByIdBody,
  ApiWebhookGenerateResponse,
  ApiClanStickerAddRequest,
  MezonUpdateClanStickerByIdBody,
  MezonChangeChannelCategoryBody,
  ApiUpdateRoleChannelRequest,
  ApiAddAppRequest,
  ApiAppList,
  ApiApp,
  MezonUpdateAppBody,
  ApiSystemMessagesList,
  ApiSystemMessage,
  ApiSystemMessageRequest,
  MezonUpdateSystemMessageBody,
  ApiUpdateCategoryOrderRequest,
  ApiStreamingChannelUserList,
  ApiRegisterStreamingChannelRequest,
  ApiRegisterStreamingChannelResponse,
  ApiRoleList,
  ApiListChannelAppsResponse,
  ApiNotificationChannelCategorySettingList,
  ApiNotificationUserChannel,
  ApiNotificationSetting,
  ApiNotifiReactMessage,
  ApiEmojiListedResponse,
  ApiStickerListedResponse,
  ApiAllUsersAddChannelResponse,
  ApiRoleListEventResponse,
  ApiAllUserClans,
  ApiUserPermissionInChannelListResponse,
  ApiPermissionRoleChannelListEventResponse,
  ApiMarkAsReadRequest,
  ApiChannelCanvasListResponse,
  ApiEditChannelCanvasRequest,
  ApiChannelSettingListResponse,
  ApiAddFavoriteChannelResponse,
  ApiRegistFcmDeviceTokenResponse,
  ApiListUserActivity,
  ApiCreateActivityRequest,
  ApiLoginIDResponse,
  ApiLoginRequest,
  ApiConfirmLoginRequest,
  ApiUserActivity,
  ApiChanEncryptionMethod,
  ApiGetPubKeysResponse,
  ApiPubKey,
  ApiGetKeyServerResp,
  MezonapiListAuditLog,
  MezonDeleteWebhookByIdBody,
  ApiListOnboardingResponse,
  ApiCreateOnboardingRequest,
  MezonUpdateOnboardingBody,
  ApiOnboardingItem,
  ApiGenerateClanWebhookRequest,
  ApiGenerateClanWebhookResponse,
  ApiListClanWebhookResponse,
  MezonUpdateClanWebhookByIdBody,
  MezonUpdateClanDescBody,
  ApiUserStatusUpdate,
  ApiUserStatus,
  ApiListOnboardingStepResponse,
  MezonUpdateOnboardingStepByClanIdBody,
  ApiSdTopicList,
  ApiSdTopicRequest,
  ApiSdTopic,
  MezonUpdateEventBody,
  MezonapiCreateRoomChannelApps,
  ApiGenerateMeetTokenRequest,
  ApiGenerateMeetTokenResponse,
  ApiMezonOauthClientList,
  ApiMezonOauthClient,
  ApiCreateHashChannelAppsResponse,
  ApiEmojiRecentList,
  ApiUserEventRequest,
  ApiUpdateRoleOrderRequest,
  ApiGenerateMezonMeetResponse,
  ApiGenerateMeetTokenExternalResponse,
  ApiUpdateClanOrderRequest,
  ApiMessage2InboxRequest,
  ApiListClanDiscover,
  ApiClanDiscoverRequest,
  ApiQuickMenuAccessList,
  ApiQuickMenuAccessRequest,
  ApiForSaleItemList,
  ApiIsFollowerResponse,
  ApiIsFollowerRequest,
  ApiTransferOwnershipRequest,
  ApiMeetParticipantRequest,
  ApiLinkAccountConfirmRequest,
  ApiLinkAccountMezon,
  ApiUser,
  ApiFriend,
  ApiListClanUnreadMsgIndicatorResponse,
  ApiAddFriendsResponse,
  ApiUpdateUsernameRequest,
  ApiBannedUserList,
  ApiIsBannedResponse,
  ApiLogedDeviceList,
  ChannelMessage,
  ApiMessageReaction,
  ApiMessageMention,
  ApiMessageAttachment,
  ApiMessageRef,
  ApiChannelCanvasDetailResponse,
  ApiListFavoriteChannelResponse,
} from "./api.gen";
import { PinMessagesList } from "./api/api";

import { Session } from "./session";
import { DefaultSocket, Socket } from "./socket";
import {
  decodeAttachments,
  decodeMentions,
  decodeNotificationFcm,
  decodeReactions,
  decodeRefs,
  safeJSONParse,
} from "./utils";
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

/** A list of channel messages, usually a result of a list operation. */
export interface ChannelMessageList {
  /** Cacheable cursor to list newer messages. Durable and designed to be stored, unlike next/prev cursors. */
  cacheable_cursor?: string;
  /**last seen message from user on channel */
  last_seen_message?: ApiChannelMessageHeader;
  /**last sent message from channel */
  last_sent_message?: ApiChannelMessageHeader;
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
  users?: Array<ApiUser>;
}

/** A collection of zero or more friends of the user. */
export interface Friends {
  /** The Friend objects. */
  friends?: Array<ApiFriend>;
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
export interface ApiUpdateChannelDescRequest {
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
export interface ApiAddChannelUsersRequest {
  /** The channel to add users to. */
  channel_id: string;
  /** The users to add. */
  user_ids: string[];
}

/** Kick a set of users from a channel. */
export interface ApiKickChannelUsersRequest {
  /** The channel ID to kick from. */
  channel_id: string;
  /** The users to kick. */
  user_ids: string[];
}

/** Leave a channel. */
export interface ApiLeaveChannelRequest {
  /** The channel ID to leave. */
  channel_id: string;
}

/** Update Clan profile information */
export interface ApiUpdateClanDescProfileRequest {
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

export interface ApiUpdateClanProfileRequest {
  /** Clan id*/
  clan_id: string;
  /** Clan nick name */
  nick_name: string;
  /** Clan profile avatar */
  avatar: string;
}

/** Update fields in a given role. */
export interface ApiUpdateRoleRequest {
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
  private readonly apiClient: MezonApi;

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
    readonly autoRefreshSession = true,
  ) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this.apiClient = new MezonApi(serverkey, timeout, basePath);
  }

  /**
   * Called when a token refresh is initiated.
   * This is a placeholder method that subclasses or instances can override
   * to perform actions before or after the refresh logic.
   */
  onRefreshSession(session: ApiSession): void {
    console.log(`Token refresh occurred. Token: ${session.token}`);
  }

  /** check session isexpired */
  isexpired(session: Session): boolean {
    return session.isexpired(Date.now() / 1000);
  }

  /** Authenticate a user with a custom id against the server. */
  authenticateMezon(
    token: string,
    create?: boolean,
    username?: string,
    isRemember?: boolean,
    vars: Record<string, string> = {},
    options: any = {},
  ): Promise<Session> {
    const request = {
      token: token,
      vars: vars,
    };
    return this.apiClient
      .authenticateMezon(
        this.serverkey,
        "",
        request,
        create,
        username,
        isRemember,
        options,
      )
      .then((apiSession: ApiSession) => {
        return new Session(
          apiSession.token || "",
          apiSession.refresh_token || "",
          apiSession.created || false,
          apiSession.api_url || "",
          apiSession.id_token || "",
          apiSession.is_remember || false,
        );
      });
  }

  /** Authenticate a user with an email+otp against the server. */
  authenticateSMSOTPRequest(
    phoneno: string,
    username?: string,
    vars?: Record<string, string>,
  ): Promise<ApiLinkAccountConfirmRequest> {
    const request = {
      username: username,
      account: {
        phoneno: phoneno,
        vars: vars,
      },
    };

    return this.apiClient
      .AuthenticateSMSOTPRequest(this.serverkey, "", request, username)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  /** Authenticate a user with an email+otp against the server. */
  authenticateEmailOTPRequest(
    email: string,
    username?: string,
    vars?: Record<string, string>,
  ): Promise<ApiLinkAccountConfirmRequest> {
    const request = {
      username: username,
      account: {
        email: email,
        vars: vars,
      },
    };

    return this.apiClient
      .AuthenticateEmailOTPRequest(this.serverkey, "", request, username)
      .then((response: ApiLinkAccountConfirmRequest) => {
        var result = {
          ...response,
          req_id: String(response.req_id)
        }
        return Promise.resolve(result);
      });
  }

  async confirmAuthenticateOTP(
    request: ApiLinkAccountConfirmRequest,
  ): Promise<Session> {
    return this.apiClient
      .confirmAuthenticateOTP(this.serverkey, "", request)
      .then((apiSession: ApiSession) => {
        return new Session(
          apiSession.token || "",
          apiSession.refresh_token || "",
          apiSession.created || false,
          apiSession.api_url || "",
          apiSession.id_token || "",
          apiSession.is_remember || false,
        );
      });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(
    email: string,
    password: string,
    username?: string,
    vars?: Record<string, string>,
  ): Promise<Session> {
    const request = {
      username: username,
      account: {
        email: email,
        password: password,
        vars: vars,
      },
    };

    return this.apiClient
      .authenticateEmail(this.serverkey, "", request, username)
      .then((apiSession: ApiSession) => {
        return new Session(
          apiSession.token || "",
          apiSession.refresh_token || "",
          apiSession.created || false,
          apiSession.api_url || "",
          apiSession.id_token || "",
          apiSession.is_remember || false,
        );
      });
  }

  /** set base path */
  setBasePath(host: string, port: string, useSSL: boolean) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;

    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;
    return this.apiClient.setBasePath(basePath);
  }

  /** Add users to a channel, or accept their join requests. */
  async addChannelUsers(
    session: Session,
    channelId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addChannelUsers(session.token, channelId, ids)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Add friends by ID or username to a user's account. */
  async addFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<ApiAddFriendsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.addFriends(session.token, ids, usernames);
  }

  /** Block one or more users by ID or username. */
  async blockFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .blockFriends(session.token, ids, usernames)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Block one or more users by ID or username. */
  async unblockFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .unblockFriends(session.token, ids, usernames)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadOauthFile(
    session: Session,
    request: ApiUploadAttachmentRequest,
  ): Promise<ApiUploadAttachment> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.uploadOauthFile(session.token, request);
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadAttachmentFile(
    session: Session,
    request: ApiUploadAttachmentRequest,
  ): Promise<ApiUploadAttachment> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.uploadAttachmentFile(session.token, request);
  }

  /** Create a channel within clan */
  async createChannelDesc(
    session: Session,
    request: ApiCreateChannelDescRequest,
  ): Promise<ApiChannelDescription> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createChannelDesc(session.token, request)
      .then((response: ApiChannelDescription) => {
        return Promise.resolve(response);
      });
  }

  /** Create a clan */
  async createClanDesc(
    session: Session,
    request: ApiCreateClanDescRequest,
  ): Promise<ApiClanDesc> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createClanDesc(session.token, request)
      .then((response: ApiClanDesc) => {
        return Promise.resolve(response);
      });
  }

  /**  */
  async createCategoryDesc(
    session: Session,
    request: ApiCreateCategoryDescRequest,
  ): Promise<ApiCategoryDesc> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createCategoryDesc(session.token, request)
      .then((response: ApiCategoryDesc) => {
        return Promise.resolve(response);
      });
  }

  /** Create a new role for clan. */
  async createRole(
    session: Session,
    request: ApiCreateRoleRequest,
  ): Promise<ApiRole> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createRole(session.token, request)
      .then((response: ApiRole) => {
        return Promise.resolve(response);
      });
  }

  /** Create a new event for clan. */
  async createEvent(
    session: Session,
    request: ApiCreateEventRequest,
  ): Promise<ApiEventManagement> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createEvent(session.token, request)
      .then((response: ApiEventManagement) => {
        return Promise.resolve(response);
      });
  }

  /** add role for channel. */
  async addRolesChannelDesc(
    session: Session,
    request: ApiAddRoleChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addRolesChannelDesc(session.token, request)
      .then((response: ApiRole) => {
        return response !== undefined;
      });
  }

  /** Update action role when delete role */
  async deleteRoleChannelDesc(
    session: Session,
    request: ApiDeleteRoleRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteRoleChannelDesc(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteApp(session: Session, appId: string): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteApp(session.token, appId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** A socket created with the client's configuration. */
  createSocket(
    useSSL = false,
    verbose: boolean = false,
    adapter: WebSocketAdapter = new WebSocketAdapterText(),
    sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs,
  ): Socket {
    return new DefaultSocket(
      this.host,
      this.port,
      useSSL,
      verbose,
      adapter,
      sendTimeoutMs,
    );
  }

  /** Delete one or more users by ID or username. */
  async deleteFriends(
    session: Session,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteFriends(session.token, ids, usernames)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a channel by ID. */
  async deleteChannelDesc(
    session: Session,
    clanId: string,
    channelId: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteChannelDesc(session.token, clanId, channelId)
      .then((response: any) => {
        return response !== undefined;
      });
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

    return this.apiClient
      .deleteClanDesc(session.token, clanDescId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a category by ID. */
  async deleteCategoryDesc(
    session: Session,
    categoryId: string,
    clanId: string,
    categoryLabel?: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteCategoryDesc(session.token, categoryId, clanId, categoryLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete one or more notifications */
  async deleteNotifications(
    session: Session,
    ids?: Array<string>,
    category?: number,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteNotifications(session.token, ids, category)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Delete a role by ID. */
  async deleteRole(
    session: Session,
    roleId: string,
    clanId: string,
    roleLabel?: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteRole(session.token, roleId, "", clanId, roleLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a event by ID. */
  async deleteEvent(
    session: Session,
    eventId: string,
    clanId: string,
    creatorId: string,
    eventLabel?: string,
    channelId?: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteEvent(
        session.token,
        eventId,
        clanId,
        creatorId,
        eventLabel,
        channelId,
      )
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** update user a event by ID. */
  async updateEventUser(
    session: Session,
    request: ApiDeleteEventRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateEventUser(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  async emitEvent(session: Session, request: ApiEvent): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .event(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Fetch the current user's account. */
  async getAccount(session: Session): Promise<ApiAccount> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.getAccount(session.token);
  }

  /** Kick a set of users from a clan. */
  async removeClanUsers(
    session: Session,
    clanId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .removeClanUsers(session.token, clanId, ids)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  async listBannedUsers(
    session: Session,
    clanId?: string,
    channelId?: string,
  ): Promise<ApiBannedUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listBannedUsers(session.token, clanId, channelId)
      .then((response: ApiBannedUserList) => {
        const result: ApiBannedUserList = {
          banned_users: [],
        };

        if (response.banned_users == null) {
          return Promise.resolve(result);
        }

        response.banned_users!.forEach((b) => {
          b.channel_id = String(b.channel_id || "");
          b.banned_id = String(b.banned_id || "");
          b.banner_id = String(b.banner_id || "");
        });

        result.banned_users = response.banned_users;
        return Promise.resolve(result);
      });
  }

  /** Ban a set of users from a clan. */
  async unbanClanUsers(
    session: Session,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .unbanClanUsers(session.token, clanId, channelId, userIds)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Ban a set of users from a clan. */
  async banClanUsers(
    session: Session,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
    banTime?: number,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .banClanUsers(session.token, clanId, channelId, userIds, banTime)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Kick users from a channel, or decline their join requests. */
  async removeChannelUsers(
    session: Session,
    channelId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .removeChannelUsers(session.token, channelId, ids)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** List a channel's message history. */
  async listChannelMessages(
    session: Session,
    clanId: string,
    channelId: string,
    messageId?: string,
    direction?: number,
    limit?: number,
    topicId?: string,
  ): Promise<ChannelMessageList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelMessages(
        session.token,
        clanId,
        channelId,
        messageId,
        direction,
        limit,
        topicId,
      )
      .then((response: ApiChannelMessageList) => {
        var result: ChannelMessageList = {
          messages: [],
          last_seen_message: response.last_seen_message,
          last_sent_message: response.last_sent_message,
        };

        if (response.messages == null) {
          return Promise.resolve(result);
        }

        if (result.last_seen_message) {
          result.last_seen_message.id = String(
            response.last_seen_message?.id || "",
          );
          result.last_seen_message.sender_id = String(
            response.last_seen_message?.sender_id || "",
          );
        }

        if (result.last_sent_message) {
          result.last_sent_message.id = String(
            response.last_sent_message?.id || "",
          );
          result.last_sent_message.sender_id = String(
            response.last_sent_message?.sender_id || "",
          );
        }

        response.messages!.forEach((m) => {
          var content, reactions, mentions, attachments, references;
          try {
            content = safeJSONParse(m.content);
          } catch (e) {
            console.log("error parse content", e);
          }
          try {
            reactions = decodeReactions(m.reactions || "");
            if (reactions && reactions.reactions?.length > 0) {
              reactions.reactions.forEach((r: ApiMessageReaction) => {
                r.id = String(r.id || "");
                r.emoji_id = String(r.emoji_id || "");
                r.channel_id = String(r.channel_id || "");
                r.message_id = String(r.message_id || "");
                r.sender_id = String(r.sender_id || "");
                r.topic_id = String(r.topic_id || "");
                r.emoji_recent_id = String(r.emoji_recent_id || "");
              });
            }
          } catch (e) {
            console.log("error parse reactions", e);
          }
          try {
            mentions = decodeMentions(m.mentions || "");
            if (mentions && mentions.mentions?.length > 0) {
              mentions.mentions.forEach((m: ApiMessageMention) => {
                m.id = String(m.id || "");
                m.channel_id = String(m.channel_id || "");
                m.message_id = String(m.message_id || "");
                m.sender_id = String(m.sender_id || "");
                m.role_id = String(m.role_id || "");
                m.user_id = String(m.user_id || "");
              });
            }
          } catch (e) {
            console.log("error parse mentions", e);
          }
          try {
            attachments = decodeAttachments(m.attachments || "");
            if (attachments && attachments.attachments?.length > 0) {
              attachments.attachments.forEach((a: ApiMessageAttachment) => {
                a.channel_id = String(a.channel_id || "");
                a.message_id = String(a.message_id || "");
                a.sender_id = String(a.sender_id || "");
              });
            }
          } catch (e) {
            console.log("error parse attachments", e);
          }
          try {
            references = decodeRefs(m.references || "");
            if (references && references.refs?.length > 0) {
              references.refs.forEach((r: ApiMessageRef) => {
                r.channel_id = String(r.channel_id || "");
                r.message_id = String(r.message_id || "");
                r.message_ref_id = String(r.message_ref_id || "");
                r.message_sender_id = String(r.message_sender_id || "");
              });
            }
          } catch (e) {
            console.log("error parse references", e);
          }
          result.messages!.push({
            channel_id: String(m.channel_id || ""),
            code: m.code ? Number(m.code) : 0,
            id: String(m.message_id || ""),
            sender_id: String(m.sender_id || ""),
            username: m.username,
            display_name: m.display_name,
            avatar: m.avatar,
            content: content,
            channel_label: m.channel_label || "",
            clan_logo: m.clan_logo,
            category_name: m.category_name,
            clan_nick: m.clan_nick,
            clan_avatar: m.clan_avatar,
            attachments: attachments?.attachments,
            mentions: mentions?.mentions,
            reactions: reactions?.reactions,
            references: references?.refs,
            clan_id: String(m.clan_id || ""),
            create_time_seconds: m.create_time_seconds,
            update_time_seconds: m.update_time_seconds,
            hide_editted: m.hide_editted,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's users. */
  async listChannelVoiceUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<ApiVoiceChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelVoiceUsers(
        session.token,
        clanId,
        channelId,
        channelType,
        limit,
        state,
        cursor,
      )
      .then((response: ApiVoiceChannelUserList) => {
        var result: ApiVoiceChannelUserList = {
          voice_channel_users: [],
        };

        if (response.voice_channel_users == null) {
          return Promise.resolve(result);
        }

        response.voice_channel_users!.forEach((gu) => {
          result.voice_channel_users!.push({
            id: String(gu.id || ""),
            channel_id: String(gu.channel_id || ""),
            user_id: String(gu.user_id || ""),
            participant: String(gu.participant || ""),
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's users. */
  async listChannelUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<ApiChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelUsers(
        session.token,
        clanId,
        channelId,
        channelType,
        limit,
        state,
        cursor,
      )
      .then((response: ApiChannelUserList) => {
        var result: ApiChannelUserList = {
          channel_users: [],
          cursor: response.cursor,
          channel_id: response.channel_id,
        };

        if (response.channel_users == null) {
          return Promise.resolve(result);
        }

        response.channel_users!.forEach((gu) => {
          result.channel_users!.push({
            user_id: String(gu.user_id || ""),
            role_id: gu.role_id?.map((id) => String(id || "")) || [],
            thread_id: String(gu.thread_id || ""),
            clan_avatar: gu.clan_avatar,
            clan_nick: gu.clan_nick,
            id: String(gu.id || ""),
            clan_id: String(gu.clan_id || ""),
            added_by: String(gu.added_by || ""),
            is_banned: gu.is_banned,
            expired_ban_time: gu.expired_ban_time,
          });
        });
        return Promise.resolve(result);
      });
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
    after?: number,
  ): Promise<ApiChannelAttachmentList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelAttachment(
        session.token,
        channelId,
        clanId,
        fileType,
        limit,
        state,
        before,
        after,
      )
      .then((response: ApiChannelAttachmentList) => {
        var result: ApiChannelAttachmentList = {
          attachments: [],
        };

        if (response.attachments == null) {
          return Promise.resolve(result);
        }

        response.attachments!.forEach((at) => {
          result.attachments!.push({
            filename: at.filename,
            filesize: at.filesize,
            filetype: at.filetype,
            id: String(at.id || ""),
            uploader: String(at.uploader || ""),
            url: String(at.url || ""),
            message_id: String(at.message_id || ""),
            create_time: at.create_time,
            width: at.width,
            height: at.height,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's users. */
  async listClanUsers(
    session: Session,
    clanId: string,
  ): Promise<ApiClanUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listClanUsers(session.token, clanId)
      .then((response: ApiClanUserList) => {
        var result: ApiClanUserList = {
          clan_users: [],
          cursor: response.cursor,
          clan_id: String(response.clan_id || ""),
        };

        if (response.clan_users == null) {
          return Promise.resolve(result);
        }

        response.clan_users!.forEach((gu) => {
          result.clan_users!.push({
            user: {
              avatar_url: gu.user!.avatar_url,
              create_time: gu.user!.create_time,
              display_name: gu.user!.display_name,
              edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count) : 0,
              id: String(gu.user!.id || ""),
              lang_tag: gu.user!.lang_tag,
              location: gu.user!.location,
              online: gu.user!.online,
              is_mobile: gu.user?.is_mobile,
              timezone: gu.user!.timezone,
              update_time: gu.user!.update_time,
              username: gu.user!.username,
              user_status: gu.user!.user_status,
              status: gu.user!.status,
              about_me: gu.user!.about_me,
              mezon_id: String(gu.user!.mezon_id || ""),
              list_nick_names: gu.user!.list_nick_names,
              phone_number: gu.user!.phone_number,
            },
            role_id: gu!.role_id?.map((id) => String(id || "")) || [],
            clan_nick: gu!.clan_nick,
            clan_avatar: gu!.clan_avatar,
          });
        });
        return Promise.resolve(result);
      });
  }

  async listChannelDetail(
    session: Session,
    channelId: string,
  ): Promise<ApiChannelDescription> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelDetail(session.token, channelId)
      .then((response: ApiChannelDescription) => {
        if (response) {
          response.app_id = String(response.app_id || "");
          response.clan_id = String(response.clan_id || "");
          response.user_ids = response.user_ids?.map((id) => String(id) || "");
          response.parent_id = String(response.parent_id || "");
          response.channel_id = String(response.channel_id || "");
          response.creator_id = String(response.creator_id || "");
          response.category_id = String(response.category_id || "");
          response.last_sent_message = response.last_sent_message
            ? {
                ...response.last_sent_message,
                id: String(response.last_sent_message?.id || ""),
                sender_id: String(response.last_sent_message?.sender_id || ""),
              }
            : undefined;
          response.last_seen_message = response.last_seen_message
            ? {
                ...response.last_seen_message,
                id: String(response.last_seen_message?.id || ""),
                sender_id: String(response.last_seen_message?.sender_id || ""),
              }
            : undefined;
        }
        return Promise.resolve(response);
      });
  }

  /** List channels. */
  async listChannelDescs(
    session: Session,
    limit?: number,
    state?: number,
    cursor?: string,
    clanId?: string,
    channelType?: number,
    isMobile?: boolean,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelDescs(
        session.token,
        limit,
        state,
        cursor,
        clanId,
        channelType,
        isMobile,
      )
      .then((response: ApiChannelDescList) => {
        var result: ApiChannelDescList = {
          channeldesc: [],
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          cacheable_cursor: response.cacheable_cursor,
        };

        if (response.channeldesc == null) {
          return Promise.resolve(result);
        }

        response.channeldesc!.forEach((c) => {
          c.app_id = String(c.app_id || "");
          c.clan_id = String(c.clan_id || "");
          c.user_ids = c.user_ids?.map((id) => String(id) || "");
          c.parent_id = String(c.parent_id || "");
          c.channel_id = String(c.channel_id || "");
          c.creator_id = String(c.creator_id || "");
          c.category_id = String(c.category_id || "");
          c.last_sent_message = c.last_sent_message
            ? {
                ...c.last_sent_message,
                id: String(c.last_sent_message?.id || ""),
                sender_id: String(c.last_sent_message?.sender_id || ""),
              }
            : undefined;
          c.last_seen_message = c.last_seen_message
            ? {
                ...c.last_seen_message,
                id: String(c.last_seen_message?.id || ""),
                sender_id: String(c.last_seen_message?.sender_id || ""),
              }
            : undefined;
        });
        result.channeldesc = response.channeldesc;
        return Promise.resolve(result);
      });
  }

  /** List clans */
  async listClanUnreadMsgIndicator(
    session: Session,
    clanId: string,
  ): Promise<ApiListClanUnreadMsgIndicatorResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listClanUnreadMsgIndicator(session.token, clanId)
      .then((response: ApiListClanUnreadMsgIndicatorResponse) => {
        return Promise.resolve(response);
      });
  }

  /** List clans */
  async listClanDescs(
    session: Session,
    limit?: number,
    state?: number,
    cursor?: string,
  ): Promise<ApiClanDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listClanDescs(session.token, limit, state, cursor)
      .then((response: ApiClanDescList) => {
        var result: ApiClanDescList = {
          clandesc: [],
        };

        if (response.clandesc == null) {
          return Promise.resolve(result);
        }

        response.clandesc.forEach((c) => {
          result.clandesc!.push({
            about: c.about,
            badge_count: c.badge_count ? Number(c.badge_count) : 0,
            banner: c.banner,
            clan_id: String(c.clan_id || ""),
            clan_name: c.clan_name,
            community_banner: c.community_banner,
            creator_id: String(c.creator_id || ""),
            description: c.description,
            has_unread_message: c.has_unread_message,
            is_community: c.is_community,
            is_onboarding: c.is_onboarding,
            logo: c.logo,
            onboarding_banner: c.onboarding_banner,
            prevent_anonymous: c.prevent_anonymous,
            short_url: c.short_url,
            status: c.status,
            welcome_channel_id: String(c.welcome_channel_id || ""),
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List categories. */
  async listCategoryDescs(
    session: Session,
    clanId: string,
    creatorId?: string,
    categoryName?: string,
  ): Promise<ApiCategoryDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listCategoryDescs(session.token, clanId, creatorId, categoryName)
      .then((response: ApiCategoryDescList) => {
        var result: ApiCategoryDescList = {
          categorydesc: [],
        };

        if (response.categorydesc == null) {
          return Promise.resolve(result);
        }

        response.categorydesc.forEach((c) => {
          result.categorydesc!.push({
            category_id: String(c.category_id),
            category_name: c.category_name,
            category_order: c.category_order,
            clan_id: String(c.clan_id),
            creator_id: String(c.creator_id),
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List event */
  async listEvents(session: Session, clanId?: string): Promise<ApiEventList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listEvents(session.token, clanId)
      .then((response: ApiEventList) => {
        response.events?.map((e) => {
          return {
            ...e,
            id: String(e.id),
            clan_id: String(e.clan_id),
            channel_id: String(e.channel_id),
            channel_voice_id: String(e.channel_voice_id),
            creator_id: String(e.creator_id),
            user_ids: e.user_ids?.map((u) => String(u)),
            meet_room: {
              ...e.meet_room,
              creator_id: String(e.meet_room?.creator_id),
              event_id: String(e.meet_room?.event_id),
              meet_id: String(e.meet_room?.meet_id),
            },
          };
        });
        return Promise.resolve(response);
      });
  }

  /** List permission */
  async getListPermission(session: Session): Promise<ApiPermissionList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getListPermission(session.token)
      .then((response: ApiPermissionList) => {
        response.permissions?.map((p) => {
          return {
            ...p,
            id: String(p.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  /** List user roles */
  async listRolePermissions(
    session: Session,
    roleId: string,
  ): Promise<ApiPermissionList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listRolePermissions(session.token, roleId)
      .then((response: ApiPermissionList) => {
        response.permissions?.map((p) => {
          return {
            ...p,
            id: String(p.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  /** List user roles */
  async listRoleUsers(
    session: Session,
    roleId: string,
    limit?: number,
    cursor?: string,
  ): Promise<ApiRoleUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listRoleUsers(session.token, roleId, limit, cursor)
      .then((response: ApiRoleUserList) => {
        response.role_users?.map((r) => {
          return {
            ...r,
            id: String(r.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async registFCMDeviceToken(
    session: Session,
    tokenId: string,
    deviceId: string,
    platform: string,
    voipToken?: string,
  ): Promise<ApiRegistFcmDeviceTokenResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .registFCMDeviceToken(
        session.token,
        tokenId,
        deviceId,
        platform,
        voipToken,
      )
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getUserProfileOnClan(
    session: Session,
    clanId: string,
  ): Promise<ApiClanProfile> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getUserProfileOnClan(session.token, clanId)
      .then((response: ApiClanProfile) => {
        var result = {
          ...response,
          clan_id: String(response.clan_id),
          user_id: String(response.user_id),
        };
        return Promise.resolve(result);
      });
  }

  //
  async closeDirectMess(
    session: Session,
    request: ApiDeleteChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .closeDirectMess(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }
  //
  async openDirectMess(
    session: Session,
    request: ApiDeleteChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .openDirectMess(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async confirmLinkMezonOTP(
    session: Session,
    request: ApiLinkAccountConfirmRequest,
  ): Promise<ApiSession> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.confirmLinkMezonOTP(session.token, request);
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  async linkSMS(
    session: Session,
    request: ApiLinkAccountMezon,
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .linkSMS(session.token, request)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  async linkEmail(
    session: Session,
    request: ApiAccountEmail,
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .linkEmail(session.token, request)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  /** List all friends for the current user. */
  async listFriends(
    session: Session,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<Friends> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listFriends(session.token, limit, state, cursor)
      .then((response: ApiFriendList) => {
        var result: Friends = {
          friends: [],
          cursor: response.cursor,
        };

        if (response.friends == null) {
          return Promise.resolve(result);
        }

        response.friends!.forEach((f) => {
          result.friends!.push({
            user: {
              avatar_url: f.user!.avatar_url,
              create_time: f.user!.create_time,
              display_name: f.user!.display_name,
              edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
              id: String(f.user!.id),
              lang_tag: f.user!.lang_tag,
              location: f.user!.location,
              online: f.user!.online,
              timezone: f.user!.timezone,
              update_time: f.user!.update_time,
              username: f.user!.username,
              is_mobile: f.user?.is_mobile,
              user_status: f.user!.user_status,
              status: f.user!.status,
              mezon_id: f.user!.mezon_id,
              list_nick_names: f.user!.list_nick_names,
              phone_number: f.user!.phone_number,
              about_me: f.user!.about_me,
            },
            state: f.state,
            source_id: f.source_id,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** Fetch list of notifications. */
  async listNotifications(
    session: Session,
    clanId: string,
    limit?: number,
    notificationId?: string,
    category?: number,
    direction?: number,
  ): Promise<ApiNotificationList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listNotifications(
        session.token,
        limit,
        clanId,
        notificationId,
        category,
        direction,
      )
      .then((response: ApiNotificationList) => {
        var result: ApiNotificationList = {
          cacheable_cursor: response.cacheable_cursor,
          notifications: [],
        };

        if (response.notifications == null) {
          return Promise.resolve(result);
        }

        response.notifications!.forEach((n) => {
          result.notifications!.push({
            id: String(n.id),
            subject: n.subject,
            content: n.content ? decodeNotificationFcm(n.content) : undefined,
            code: n.code ? Number(n.code) : 0,
            sender_id: String(n.sender_id),
            create_time: n.create_time,
            persistent: n.persistent,
            category: n.category,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async sessionLogout(
    session: Session,
    token: string,
    refreshToken: string,
    deviceId: string,
    platform: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .sessionLogout(session.token, {
        refresh_token: refreshToken,
        token: token,
        device_id: deviceId,
        platform: platform,
      })
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Refresh a user's session using a refresh token retrieved from a previous authentication request. */
  async sessionRefresh(
    session: Session,
    vars: Record<string, string> = {},
  ): Promise<Session> {
    if (!session) {
      console.error("Cannot refresh a null session.");
      return session;
    }

    if (session.created && session.expires_at! - session.created_at < 70) {
      console.warn(
        "Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session",
      );
    }

    if (
      session.created &&
      session.refresh_expires_at! - session.created_at < 3700
    ) {
      console.warn(
        "Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session",
      );
    }

    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise; // Reuse existing promise
    }

    this.refreshTokenPromise = new Promise<Session>(async (resolve, reject) => {
      try {
        const apiSession = await this.apiClient.sessionRefresh(
          this.serverkey,
          "",
          {
            token: session.refresh_token,
            vars: vars,
            is_remember: session.is_remember,
          },
        );
        session.update(
          apiSession.token!,
          apiSession.refresh_token!,
          apiSession.is_remember || false,
        );
        this.onRefreshSession(apiSession);
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

  /** Remove an email+password from the social profiles on the current user's account. */
  async unlinkEmail(
    session: Session,
    request: ApiAccountEmail,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .unlinkEmail(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in the current user's account. */
  async updateUsername(
    session: Session,
    request: ApiUpdateUsernameRequest,
  ): Promise<ApiSession> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateUsername(session.token, request)
      .then((response: ApiSession) => {
        return Promise.resolve(response);
      });
  }

  /** Update fields in the current user's account. */
  async updateAccount(
    session: Session,
    request: ApiUpdateAccountRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateAccount(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given channel */
  async updateChannelDesc(
    session: Session,
    channelId: string,
    request: ApiUpdateChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateChannelDesc(session.token, channelId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given clan. */
  async updateClanDesc(
    session: Session,
    clanId: string,
    request: MezonUpdateClanDescBody,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateClanDesc(session.token, clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given category. */
  async updateCategory(
    session: Session,
    clanId: string,
    request: ApiUpdateCategoryDescRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateCategory(session.token, clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateUserProfileByClan(
    session: Session,
    clanId: string,
    request: ApiUpdateClanProfileRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateUserProfileByClan(session.token, clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given role. */
  async updateRole(
    session: Session,
    roleId: string,
    request: ApiUpdateRoleRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateRole(session.token, roleId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given event. */
  async updateEvent(
    session: Session,
    roleId: string,
    request: MezonUpdateEventBody,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateEvent(session.token, roleId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given event. */
  async updateApp(
    session: Session,
    roleId: string,
    request: MezonUpdateAppBody,
  ): Promise<ApiApp> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateApp(session.token, roleId, request)
      .then((response: ApiApp) => {
        var result = {
          ...response,
          id: String(response.id),
          creator_id: String(response.creator_id),
        };
        return Promise.resolve(result);
      });
  }

  /** Update fields in a given clan profile. */
  async createLinkInviteUser(
    session: Session,
    request: ApiLinkInviteUserRequest,
  ): Promise<ApiLinkInviteUser> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createLinkInviteUser(session.token, request)
      .then((response: ApiLinkInviteUser) => {
        var result = {
          ...response,
          id: String(response.id),
          creator_id: String(response.creator_id),
          clan_id: String(response.clan_id),
          channel_id: String(response.channel_id),
        };
        return Promise.resolve(result);
      });
  }

  /** Get link invite user */
  async getLinkInvite(inviteId: string): Promise<ApiInviteUserRes> {
    return this.apiClient
      .getLinkInvite(this.serverkey, "", inviteId)
      .then((response: ApiInviteUserRes) => {
        return Promise.resolve(response);
      });
  }

  /** Get permission of user in the clan */
  async GetRoleOfUserInTheClan(
    session: Session,
    clanId: string,
  ): Promise<ApiRoleList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getRoleOfUserInTheClan(session.token, clanId)
      .then((response: ApiRoleList) => {
        response.roles?.map((r) => {
          return {
            ...r,
            id: String(r.id),
            creator_id: String(r.creator_id),
            clan_id: String(r.clan_id),
            channel_ids: r.channel_ids?.map((c) => String(c)),
          };
        });
        return Promise.resolve(response);
      });
  }

  /** invite user */
  async inviteUser(
    session: Session,
    inviteId: string,
  ): Promise<ApiInviteUserRes> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .inviteUser(session.token, inviteId)
      .then((response: ApiInviteUserRes) => {
        var result = {
          ...response,
          channel_desc: {
            ...response.channel_desc,
            clan_id: String(response.channel_desc?.clan_id),
            channel_id: String(response.channel_desc?.channel_id),
            category_id: String(response.channel_desc?.category_id),
            creator_id: String(response.channel_desc?.creator_id),
          },
          clan_id: String(response.clan_id),
          channel_id: String(response.channel_id),
        };
        return Promise.resolve(result);
      });
  }

  /** Set default notification clan*/
  async setNotificationClan(
    session: Session,
    request: ApiSetDefaultNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setNotificationClanSetting(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set notification channel*/
  async setNotificationChannel(
    session: Session,
    request: ApiSetNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setNotificationChannelSetting(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set notification category*/
  async setMuteCategory(
    session: Session,
    request: ApiSetMuteRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setMuteCategory(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set notification channel*/
  async setMuteChannel(
    session: Session,
    request: ApiSetMuteRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setMuteChannel(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** update channel private*/
  async updateChannelPrivate(
    session: Session,
    request: ApiChangeChannelPrivateRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateChannelPrivate(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set default notification category*/
  async setNotificationCategory(
    session: Session,
    request: ApiSetNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setNotificationCategorySetting(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteNotificationCategory(
    session: Session,
    category_id: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteNotificationCategorySetting(session.token, category_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteNotificationChannel(
    session: Session,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteNotificationChannel(session.token, channel_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** */
  async setNotificationReactMessage(
    session: Session,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setNotificationReactMessage(session.token, { channel_id })
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //** */
  async deleteNotiReactMessage(
    session: Session,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteNotiReactMessage(session.token, channel_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** query message in elasticsearch */
  async searchMessage(
    session: Session,
    request: ApiSearchMessageRequest,
  ): Promise<ApiSearchMessageResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .searchMessage(session.token, request)
      .then((response: ApiSearchMessageResponse) => {
        response.messages?.map((m) => {
          return {
            ...m,
            message_id: String(m.message_id),
            clan_id: String(m.clan_id),
            channel_id: String(m.channel_id),
            sender_id: String(m.sender_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  /** */
  async createMessage2Inbox(
    session: Session,
    request: ApiMessage2InboxRequest,
  ): Promise<ApiChannelMessageHeader> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createMessage2Inbox(session.token, request)
      .then((response: ApiChannelMessageHeader) => {
        return Promise.resolve(response);
      });
  }

  /** */
  async createPinMessage(
    session: Session,
    request: ApiPinMessageRequest,
  ): Promise<ApiChannelMessageHeader> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createPinMessage(session.token, request)
      .then((response: ApiChannelMessageHeader) => {
        return Promise.resolve(response);
      });
  }

  async pinMessagesList(
    session: Session,
    messageId: string,
    channelId: string,
    clanId: string,
  ): Promise<ApiPinMessagesList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getPinMessagesList(session.token, messageId, channelId, clanId)
      .then((response: PinMessagesList) => {
        var result: ApiPinMessagesList = {
          pin_messages_list: [],
        };

        if (response.pin_messages_list == null) {
          return Promise.resolve(result);
        }

        response.pin_messages_list!.forEach((p) => {
          result.pin_messages_list!.push({
            id: String(p.id),
            avatar: p.avatar,
            channel_id: String(p.channel_id),
            content: p.content,
            create_time_seconds: p.create_time_seconds,
            message_id: String(p.message_id),
            sender_id: String(p.sender_id),
            username: p.username,
            attachment: p.attachment,
          });
        });
        return Promise.resolve(result);
      });
  }

  //** */
  async deletePinMessage(
    session: Session,
    id?: string,
    messageId?: string,
    channelId?: string,
    clanId?: string,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deletePinMessage(session.token, id, messageId, channelId, clanId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** create clan emoji */
  async createClanEmoji(session: Session, request: ApiClanEmojiCreateRequest) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createClanEmoji(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**update clan emoji by id */
  async updateClanEmojiById(
    session: Session,
    id: string,
    request: MezonUpdateClanEmojiByIdBody,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateClanEmojiById(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**delete clan emoji by id */
  async deleteByIdClanEmoji(
    session: Session,
    id: string,
    clan_id: string,
    emojiLabel?: string,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteClanEmojiById(session.token, id, clan_id, emojiLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**create webhook for chaneel */
  async generateWebhookLink(
    session: Session,
    request: ApiWebhookCreateRequest,
  ): Promise<ApiWebhookGenerateResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .generateWebhook(session.token, request)
      .then((response: any) => {
        var result = {
          ...response,
          channel_id: String(response.channel_id),
        };
        return Promise.resolve(result);
      });
  }

  //**list webhook belong to the channel */
  async listWebhookByChannelId(
    session: Session,
    channel_id: string,
    clan_id: string,
  ): Promise<ApiWebhookListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listWebhookByChannelId(session.token, channel_id, clan_id)
      .then((response: ApiWebhookListResponse) => {
        response.webhooks?.map((w) => {
          return {
            ...w,
            id: String(w.id),
            channel_id: String(w.channel_id),
            clan_id: String(w.clan_id),
            creator_id: String(w.creator_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  //**update webhook name by id */
  async updateWebhookById(
    session: Session,
    id: string,
    request: MezonUpdateWebhookByIdBody,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateWebhookById(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**disabled webhook by id */
  async deleteWebhookById(
    session: Session,
    id: string,
    request: MezonDeleteWebhookByIdBody,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteWebhookById(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**Add a new sticker */
  async addClanSticker(
    session: Session,
    request: ApiClanStickerAddRequest,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addClanSticker(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**Delete a sticker by ID*/
  async deleteClanStickerById(
    session: Session,
    id: string,
    clan_id: string,
    stickerLabel?: string,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteClanStickerById(session.token, id, clan_id, stickerLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**Update a sticker by ID*/
  async updateClanStickerById(
    session: Session,
    id: string,
    request: MezonUpdateClanStickerByIdBody,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateClanStickerById(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //** update the category of a channel */
  async changeChannelCategory(
    session: Session,
    id: string,
    request: MezonChangeChannelCategoryBody,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .changeChannelCategory(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** */
  async setRoleChannelPermission(
    session: Session,
    request: ApiUpdateRoleChannelRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setRoleChannelPermission(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addApp(session: Session, request: ApiAddAppRequest): Promise<ApiApp> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addApp(session.token, request)
      .then((response: ApiApp) => {
        var result = {
          ...response,
          id: String(response.id),
          creator_id: String(response.creator_id),
        };
        return Promise.resolve(result);
      });
  }

  async getApp(session: Session, id: string): Promise<ApiApp> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.getApp(session.token, id).then((response: ApiApp) => {
      var result = {
        ...response,
        id: String(response.id),
        creator_id: String(response.creator_id),
      };
      return Promise.resolve(result);
    });
  }

  async listApps(session: Session): Promise<ApiAppList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listApps(session.token)
      .then((response: ApiAppList) => {
        response.apps?.map((a) => {
          return {
            ...a,
            id: String(a.id),
            creator_id: String(a.creator_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async addAppToClan(
    session: Session,
    appId: string,
    clanId: string,
  ): Promise<Boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addAppToClan(session.token, appId, clanId)
      .then((response: ApiAppList) => {
        return response !== undefined;
      });
  }

  async getSystemMessagesList(
    session: Session,
  ): Promise<ApiSystemMessagesList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getSystemMessagesList(session.token)
      .then((response: ApiSystemMessagesList) => {
        response.system_messages_list?.map((s) => {
          return {
            ...s,
            id: String(s.id),
            channel_id: String(s.channel_id),
            clan_id: String(s.clan_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async getSystemMessageByClanId(
    session: Session,
    clanId: string,
  ): Promise<ApiSystemMessage> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getSystemMessageByClanId(session.token, clanId)
      .then((response: ApiSystemMessage) => {
        var result = {
          ...response,
          id: String(response.id),
          channel_id: String(response.channel_id),
          clan_id: String(response.clan_id),
        };
        return Promise.resolve(result);
      });
  }

  async createSystemMessage(
    session: Session,
    request: ApiSystemMessageRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createSystemMessage(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async updateSystemMessage(
    session: Session,
    clanId: string,
    request: MezonUpdateSystemMessageBody,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateSystemMessage(session.token, clanId, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async deleteSystemMessage(session: Session, clanId: string): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteSystemMessage(session.token, clanId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async updateCategoryOrder(
    session: Session,
    request: ApiUpdateCategoryOrderRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateCategoryOrder(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** List a channel's users. */
  async listStreamingChannelUsers(
    session: Session,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<ApiStreamingChannelUserList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listStreamingChannelUsers(
        session.token,
        clanId,
        channelId,
        channelType,
        limit,
        state,
        cursor,
      )
      .then((response: ApiStreamingChannelUserList) => {
        var result: ApiStreamingChannelUserList = {
          streaming_channel_users: [],
        };

        if (response.streaming_channel_users == null) {
          return Promise.resolve(result);
        }

        response.streaming_channel_users!.forEach((gu) => {
          result.streaming_channel_users!.push({
            id: String(gu.id),
            channel_id: String(gu.channel_id),
            user_id: String(gu.user_id),
            participant: gu.participant,
          });
        });
        return Promise.resolve(result);
      });
  }

  async registerStreamingChannel(
    session: Session,
    request: ApiRegisterStreamingChannelRequest,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .registerStreamingChannel(session.token, request)
      .then((response: ApiRegisterStreamingChannelResponse) => {
        return response !== undefined;
      });
  }

  /** List a channel's users. */
  async listChannelApps(
    session: Session,
    clanId: string,
  ): Promise<ApiListChannelAppsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelApps(session.token, clanId)
      .then((response: ApiListChannelAppsResponse) => {
        var result: ApiListChannelAppsResponse = {
          channel_apps: [],
        };

        if (response.channel_apps == null) {
          return Promise.resolve(result);
        }

        response.channel_apps!.forEach((gu) => {
          result.channel_apps!.push({
            id: String(gu.id),
            channel_id: String(gu.channel_id),
            app_id: String(gu.app_id),
            clan_id: String(gu.clan_id),
            app_url: gu.app_url,
            app_name: gu.app_name,
            app_logo: gu.app_logo,
          });
        });
        return Promise.resolve(result);
      });
  }

  async getChannelCategoryNotiSettingsList(
    session: Session,
    clanId: string,
  ): Promise<ApiNotificationChannelCategorySettingList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getChannelCategoryNotiSettingsList(session.token, clanId)
      .then((response: ApiNotificationChannelCategorySettingList) => {
        response.notification_channel_category_settings_list?.map((n) => {
          return {
            ...n,
            id: String(n.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async getNotificationCategory(
    session: Session,
    categoryId: string,
  ): Promise<ApiNotificationUserChannel> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getNotificationCategory(session.token, categoryId)
      .then((response: ApiNotificationUserChannel) => {
        var result = {
          ...response,
          id: String(response.id),
          channel_id: String(response.channel_id),
        };
        return Promise.resolve(result);
      });
  }

  async getNotificationChannel(
    session: Session,
    channelId: string,
  ): Promise<ApiNotificationUserChannel> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getNotificationChannel(session.token, channelId)
      .then((response: ApiNotificationUserChannel) => {
        var result = {
          ...response,
          id: String(response.id),
          channel_id: String(response.channel_id),
        };
        return Promise.resolve(result);
      });
  }

  async getNotificationClan(
    session: Session,
    clanId: string,
  ): Promise<ApiNotificationSetting> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getNotificationClan(session.token, clanId)
      .then((response: ApiNotificationSetting) => {
        var result = {
          ...response,
          id: String(response.id),
        };
        return Promise.resolve(result);
      });
  }

  async getNotificationReactMessage(
    session: Session,
    channelId: string,
  ): Promise<ApiNotifiReactMessage> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getNotificationReactMessage(session.token, channelId)
      .then((response: ApiNotifiReactMessage) => {
        var result = {
          ...response,
          id: String(response.id),
          channel_id: String(response.channel_id),
          user_id: String(response.user_id),
        };
        return Promise.resolve(result);
      });
  }

  async listChannelByUserId(session: Session): Promise<ApiChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelByUserId(session.token)
      .then((response: ApiChannelDescList) => {
        response.channeldesc?.map((c) => {
          return {
            ...c,
            clan_id: String(c.clan_id),
            channel_id: String(c.channel_id),
            creator_id: String(c.creator_id),
            category_id: String(c.category_id),
            parent_id: String(c.parent_id),
            app_id: String(c.app_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async listChannelUsersUC(
    session: Session,
    channel_id: string,
    limit: number,
  ): Promise<ApiAllUsersAddChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelUsersUC(session.token, channel_id, limit)
      .then((response: ApiAllUsersAddChannelResponse) => {
        var result = {
          ...response,
          channel_id: String(response.channel_id),
          user_ids: response.user_ids?.map((u) => String(u)),
        };
        return Promise.resolve(result);
      });
  }

  async getListEmojisByUserId(
    session: Session,
  ): Promise<ApiEmojiListedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getListEmojisByUserId(session.token)
      .then((response: ApiEmojiListedResponse) => {
        response.emoji_list?.map((e) => {
          return {
            ...e,
            clan_id: String(e.clan_id),
            creator_id: String(e.creator_id),
            id: String(e.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async emojiRecentList(session: Session): Promise<ApiEmojiRecentList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .emojiRecentList(session.token)
      .then((response: ApiEmojiRecentList) => {
        response.emoji_recents?.map((e) => {
          return {
            ...e,
            emoji_id: String(e.emoji_id),
            emoji_recents_id: String(e.emoji_recents_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async getListStickersByUserId(
    session: Session,
  ): Promise<ApiStickerListedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getListStickersByUserId(session.token)
      .then((response: ApiStickerListedResponse) => {
        response.stickers?.map((s) => {
          return {
            ...s,
            clan_id: String(s.clan_id),
            creator_id: String(s.creator_id),
            id: String(s.id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async listUserClansByUserId(session: Session): Promise<ApiAllUserClans> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listUserClansByUserId(session.token)
      .then((response: ApiAllUserClans) => {
        return Promise.resolve(response);
      });
  }

  async listRoles(
    session: Session,
    clanId?: string,
    limit?: number,
    state?: number,
    cursor?: string,
  ): Promise<ApiRoleListEventResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listRoles(session.token, clanId, limit, state, cursor)
      .then((response: ApiRoleListEventResponse) => {
        var result: ApiRoleListEventResponse = {
          ...response,
          clan_id: String(clanId),
          roles: {
            ...response.roles,
            roles: response.roles?.roles?.map((r) => {
              return {
                ...r,
                id: String(r.id),
                clan_id: String(r.clan_id),
                creator_id: String(r.creator_id),
                channel_ids: r.channel_ids?.map((c) => String(c)),
              };
            }),
          },
        };

        return Promise.resolve(result);
      });
  }

  async listUserPermissionInChannel(
    session: Session,
    clanId?: string,
    channelId?: string,
  ): Promise<ApiUserPermissionInChannelListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listUserPermissionInChannel(session.token, clanId, channelId)
      .then((response: ApiUserPermissionInChannelListResponse) => {
        var result: ApiUserPermissionInChannelListResponse = {
          clan_id: String(clanId),
          channel_id: String(channelId),
          permissions: {
            ...response.permissions,
            permissions: response.permissions?.permissions?.map((p) => {
              return {
                id: String(p.id),
              };
            }),
          },
        };

        return Promise.resolve(result);
      });
  }

  async getPermissionByRoleIdChannelId(
    session: Session,
    roleId?: string,
    channelId?: string,
    userId?: string,
  ): Promise<ApiPermissionRoleChannelListEventResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getPermissionByRoleIdChannelId(session.token, roleId, channelId, userId)
      .then((response: ApiPermissionRoleChannelListEventResponse) => {
        var result: ApiPermissionRoleChannelListEventResponse = {
          role_id: roleId,
          channel_id: channelId,
          permission_role_channel: response.permission_role_channel?.map(
            (p) => {
              return {
                ...p,
                permission_id: String(p.permission_id),
              };
            },
          ),
          user_id: userId,
        };

        return Promise.resolve(result);
      });
  }

  async markAsRead(
    session: Session,
    request: ApiMarkAsReadRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .markAsRead(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** List Threads. */
  async listThreadDescs(
    session: Session,
    channelId: string,
    limit?: number,
    state?: number,
    clanId?: string,
    threadId?: string,
    page?: number,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listThreadDescs(
        session.token,
        channelId,
        limit,
        state,
        clanId,
        threadId,
        page,
      )
      .then((response: ApiChannelDescList) => {
        var result: ApiChannelDescList = {
          channeldesc: [],
        };

        if (response.channeldesc == null) {
          return Promise.resolve(result);
        }

        result.channeldesc = response.channeldesc?.map((c) => {
          return {
            ...c,
            clan_id: String(c.clan_id),
            channel_id: String(c.channel_id),
            category_id: String(c.category_id),
            creator_id: String(c.creator_id),
            parent_id: String(c.parent_id),
          };
        });
        return Promise.resolve(result);
      });
  }

  async leaveThread(
    session: Session,
    clanId: string,
    channelId: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .leaveThread(session.token, clanId, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
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
    channelLabel?: string,
  ): Promise<ApiChannelSettingListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listChannelSetting(
        session.token,
        clanId,
        parentId,
        categoryId,
        privateChannel,
        active,
        status,
        type,
        limit,
        page,
        channelLabel,
      )
      .then((response: ApiChannelSettingListResponse) => {
        var result = {
          ...response,
          clan_id: clanId,
          channel_setting_list: response.channel_setting_list?.map((c) => {
            return {
              ...c,
              category_id: String(c.category_id),
              parent_id: String(c.parent_id),
              creator_id: String(c.creator_id),
              id: String(c.id),
              user_ids: c.user_ids?.map((u) => String(u)),
            };
          }),
        };
        return Promise.resolve(result);
      });
  }

  async getChannelCanvasList(
    session: Session,
    channelId: string,
    clanId?: string,
    limit?: number,
    page?: number,
  ): Promise<ApiChannelCanvasListResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getChannelCanvasList(session.token, channelId, clanId, limit, page)
      .then((response: ApiChannelCanvasListResponse) => {
        response.channel_id = channelId;
        response.clan_id = clanId;
        response.channel_canvases?.map((c) => {
          return {
            ...c,
            id: String(c.id),
            creator_id: String(c.creator_id),
          };
        });
        return Promise.resolve(response);
      });
  }

  async getChannelCanvasDetail(
    session: Session,
    id: string,
    clanId?: string,
    channelId?: string,
  ): Promise<ApiChannelCanvasDetailResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getChannelCanvasDetail(session.token, id, clanId, channelId)
      .then((response: ApiChannelCanvasDetailResponse) => {
        var result = {
          ...response,
          id: String(response.id),
          creator_id: String(response.creator_id),
          editor_id: String(response.editor_id),
        };
        return Promise.resolve(result);
      });
  }

  async editChannelCanvases(
    session: Session,
    request: ApiEditChannelCanvasRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .editChannelCanvases(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  //** */
  async deleteChannelCanvas(
    session: Session,
    canvasId: string,
    clanId?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteChannelCanvas(session.token, canvasId, clanId, channelId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addFavoriteChannel(
    session: Session,
    channelId: string,
    clanId: string,
  ): Promise<ApiAddFavoriteChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addChannelFavorite(session.token, {
        channel_id: channelId,
        clan_id: clanId,
      })
      .then((response: ApiAddFavoriteChannelResponse) => {
        return response;
      });
  }

  async removeFavoriteChannel(
    session: Session,
    clanId: string,
    channelId: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .removeChannelFavorite(session.token, clanId, channelId)
      .then((response: any) => {
        return response;
      });
  }

  async getListFavoriteChannel(
    session: Session,
    clanId: string,
  ): Promise<ApiListFavoriteChannelResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getListFavoriteChannel(session.token, clanId)
      .then((response: ApiListFavoriteChannelResponse) => {
        response.channel_ids?.map((c) => String(c));
        return response;
      });
  }

  /** List activity */
  async listActivity(session: Session): Promise<ApiListUserActivity> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listActivity(session.token)
      .then((response: ApiListUserActivity) => {
        response.activities?.map((a) => {
          return {
            ...a,
            user_id: String(a.user_id),
            application_id: String(a.application_id),
          };
        });
        return response;
      });
  }

  async createActiviy(
    session: Session,
    request: ApiCreateActivityRequest,
  ): Promise<ApiUserActivity> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createActiviy(session.token, request)
      .then((response: any) => {
        return response;
      });
  }

  async createQRLogin(requet: ApiLoginRequest): Promise<ApiLoginIDResponse> {
    const apiSession = await this.apiClient.createQRLogin(
      this.serverkey,
      "",
      requet,
    );
    const response = {
      login_id: apiSession.login_id,
      create_time_second: apiSession.create_time_second,
    };
    return response;
  }

  async checkLoginRequest(
    requet: ApiConfirmLoginRequest,
  ): Promise<Session | null> {
    const apiSession = await this.apiClient.checkLoginRequest(
      this.serverkey,
      "",
      requet,
    );
    if (!apiSession?.token) {
      return null;
    }
    return new Session(
      apiSession.token || "",
      apiSession.refresh_token || "",
      apiSession.created || false,
      apiSession.api_url || "",
      apiSession.id_token || "",
      apiSession.is_remember || false,
    );
  }

  async confirmLogin(
    session: Session,
    basePath: string,
    body: ApiConfirmLoginRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .confirmLogin(session.token, basePath, body)
      .then((response: any) => {
        return response;
      });
  }

  async getChanEncryptionMethod(
    session: Session,
    channelId: string,
  ): Promise<ApiChanEncryptionMethod> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getChanEncryptionMethod(session.token, channelId)
      .then((response: ApiChanEncryptionMethod) => {
        return response;
      });
  }

  async setChanEncryptionMethod(
    session: Session,
    channelId: string,
    method: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .setChanEncryptionMethod(session.token, channelId, { method: method })
      .then((response: any) => {
        return response;
      });
  }

  async getPubKeys(
    session: Session,
    userIds: Array<string>,
  ): Promise<ApiGetPubKeysResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getPubKeys(session.token, userIds)
      .then((response: ApiGetPubKeysResponse) => {
        return response;
      });
  }

  async pushPubKey(
    session: Session,
    PK: ApiPubKey,
  ): Promise<ApiGetPubKeysResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .pushPubKey(session.token, { PK: PK })
      .then((response: ApiGetPubKeysResponse) => {
        return response;
      });
  }

  async getKeyServer(session: Session): Promise<ApiGetKeyServerResp> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getKeyServer(session.token)
      .then((response: ApiGetKeyServerResp) => {
        return response;
      });
  }

  async listAuditLog(
    session: Session,
    actionLog?: string,
    userId?: string,
    clanId?: string,
    date_log?: string,
  ): Promise<MezonapiListAuditLog> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listAuditLog(session.token, actionLog, userId, clanId, date_log)
      .then((response: MezonapiListAuditLog) => {
        return response;
      });
  }

  async listOnboarding(
    session: Session,
    clanId?: string,
    guideType?: number,
    limit?: number,
    page?: number,
  ): Promise<ApiListOnboardingResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listOnboarding(session.token, clanId, guideType, limit, page)
      .then((response: ApiListOnboardingResponse) => {
        return response;
      });
  }

  async getOnboardingDetail(
    session: Session,
    id: string,
    clanId?: string,
  ): Promise<ApiOnboardingItem> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getOnboardingDetail(session.token, id, clanId)
      .then((response: ApiOnboardingItem) => {
        return Promise.resolve(response);
      });
  }

  async createOnboarding(
    session: Session,
    request: ApiCreateOnboardingRequest,
  ): Promise<ApiListOnboardingResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createOnboarding(session.token, request)
      .then((response: ApiListOnboardingResponse) => {
        return response;
      });
  }

  async updateOnboarding(
    session: Session,
    id: string,
    request: MezonUpdateOnboardingBody,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateOnboarding(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteOnboarding(
    session: Session,
    id: string,
    clanId?: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteOnboarding(session.token, id, clanId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**create webhook for clan */
  async generateClanWebhook(
    session: Session,
    request: ApiGenerateClanWebhookRequest,
  ): Promise<ApiGenerateClanWebhookResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .generateClanWebhook(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  //**list webhook belong to the clan */
  async listClanWebhook(
    session: Session,
    clan_id: string,
  ): Promise<ApiListClanWebhookResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listClanWebhook(session.token, clan_id)
      .then((response: ApiListClanWebhookResponse) => {
        return Promise.resolve(response);
      });
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

    return this.apiClient
      .deleteClanWebhookById(session.token, id, clan_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**update webhook name by id */
  async updateClanWebhookById(
    session: Session,
    id: string,
    request: MezonUpdateClanWebhookByIdBody,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateClanWebhookById(session.token, id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**list onboarding step */
  async listOnboardingStep(
    session: Session,
    clan_id?: string,
    limit?: number,
    page?: number,
  ): Promise<ApiListOnboardingStepResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listOnboardingStep(session.token, clan_id, limit, page)
      .then((response: ApiListOnboardingStepResponse) => {
        return Promise.resolve(response);
      });
  }

  //**update onboarding step by id */
  async updateOnboardingStepByClanId(
    session: Session,
    clan_id: string,
    request: MezonUpdateOnboardingStepByClanIdBody,
  ) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateOnboardingStepByClanId(session.token, clan_id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**update status */
  async updateUserStatus(session: Session, request: ApiUserStatusUpdate) {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateUserStatus(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**get user status */
  async getUserStatus(session: Session): Promise<ApiUserStatus> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getUserStatus(session.token)
      .then((response: ApiUserStatus) => {
        return Promise.resolve(response);
      });
  }

  //**list sd topic */
  async listSdTopic(
    session: Session,
    clanId?: string,
    limit?: number,
  ): Promise<ApiSdTopicList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listSdTopic(session.token, clanId, limit)
      .then((response: ApiSdTopicList) => {
        return Promise.resolve(response);
      });
  }

  //**post sd topic */
  async createSdTopic(
    session: Session,
    request: ApiSdTopicRequest,
  ): Promise<ApiSdTopic> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createSdTopic(session.token, request)
      .then((response: ApiSdTopic) => {
        return response;
      });
  }

  //**list sd topic */
  async getTopicDetail(
    session: Session,
    topicId?: string,
  ): Promise<ApiSdTopic> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getTopicDetail(session.token, topicId)
      .then((response: ApiSdTopic) => {
        return Promise.resolve(response);
      });
  }

  //**create room channel apps */
  async createRoomChannelApps(
    session: Session,
    body: MezonapiCreateRoomChannelApps,
  ): Promise<MezonapiCreateRoomChannelApps> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createRoomChannelApps(session.token, body)
      .then((response: MezonapiCreateRoomChannelApps) => {
        return Promise.resolve(response);
      });
  }

  /** Generate Meet Token */
  async generateMeetToken(
    session: Session,
    body: ApiGenerateMeetTokenRequest,
  ): Promise<ApiGenerateMeetTokenResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .generateMeetToken(session.token, body)
      .then((response: ApiGenerateMeetTokenResponse) => {
        return Promise.resolve(response);
      });
  }

  //**list webhook belong to the clan */
  async listMezonOauthClient(
    session: Session,
  ): Promise<ApiMezonOauthClientList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listMezonOauthClient(session.token)
      .then((response: ApiMezonOauthClientList) => {
        return Promise.resolve(response);
      });
  }

  async getMezonOauthClient(
    session: Session,
    clientId?: string,
    clientName?: string,
  ): Promise<ApiMezonOauthClient> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .getMezonOauthClient(session.token, clientId, clientName)
      .then((response: ApiMezonOauthClient) => {
        return Promise.resolve(response);
      });
  }

  async updateMezonOauthClient(
    session: Session,
    body: ApiMezonOauthClient,
  ): Promise<ApiMezonOauthClient> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateMezonOauthClient(session.token, body)
      .then((response: ApiMezonOauthClient) => {
        return Promise.resolve(response);
      });
  }

  //**search thread */
  async searchThread(
    session: Session,
    clanId?: string,
    channelId?: string,
    label?: string,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .searchThread(session.token, clanId, channelId, label)
      .then((response: ApiChannelDescList) => {
        return Promise.resolve(response);
      });
  }

  //**Generate Hash */
  async generateHashChannelApps(
    session: Session,
    appId?: string,
  ): Promise<ApiCreateHashChannelAppsResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .generateHashChannelApps(session.token, appId)
      .then((response: ApiCreateHashChannelAppsResponse) => {
        return Promise.resolve(response);
      });
  }

  async registrationPassword(
    session: Session,
    email?: string,
    password?: string,
    oldPassword?: string,
  ): Promise<ApiSession> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .registrationEmail(session.token, {
        email: email,
        password: password,
        old_password: oldPassword,
      })
      .then((response: ApiSession) => {
        return Promise.resolve(response);
      });
  }

  /** Add user event */
  async addUserEvent(
    session: Session,
    request: ApiUserEventRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addUserEvent(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete user event */
  async deleteUserEvent(
    session: Session,
    clanId?: string,
    eventId?: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteUserEvent(session.token, clanId, eventId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateRoleOrder(
    session: Session,
    request: ApiUpdateRoleOrderRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateRoleOrder(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async deleteAccount(session: Session): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient.deleteAccount(session.token).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async createExternalMezonMeet(
    session: Session,
  ): Promise<ApiGenerateMezonMeetResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .createExternalMezonMeet(session.token)
      .then((response: ApiGenerateMezonMeetResponse) => {
        return Promise.resolve(response);
      });
  }

  async generateMeetTokenExternal(
    basePath: string,
    token: string,
    displayName?: string,
    isGuest?: boolean,
  ): Promise<ApiGenerateMeetTokenExternalResponse> {
    return this.apiClient
      .generateMeetTokenExternal("", basePath, token, displayName, isGuest)
      .then((response: ApiGenerateMeetTokenExternalResponse) => {
        return Promise.resolve(response);
      });
  }

  async removeMezonMeetParticipant(
    session: Session,
    request: ApiMeetParticipantRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .removeParticipantMezonMeet(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async muteMezonMeetParticipant(
    session: Session,
    request: ApiMeetParticipantRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .muteParticipantMezonMeet(session.token, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** Update clan order to view. */
  async updateClanOrder(
    session: Session,
    request: ApiUpdateClanOrderRequest,
  ): Promise<boolean> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateClanOrder(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** list clan discover. */
  async listClanDiscover(
    basePath: string,
    request: ApiClanDiscoverRequest,
  ): Promise<ApiListClanDiscover> {
    return this.apiClient
      .clanDiscover(this.serverkey, "", basePath, request)
      .then((response: ApiListClanDiscover) => {
        return Promise.resolve(response);
      });
  }

  async listQuickMenuAccess(
    session: Session,
    botId: string,
    channelId: string,
    menuType: number,
  ): Promise<ApiQuickMenuAccessList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listQuickMenuAccess(session.token, botId, channelId, menuType)
      .then((response: ApiQuickMenuAccessList) => {
        return Promise.resolve(response);
      });
  }

  async deleteQuickMenuAccess(
    session: Session,
    id: string,
    clanId: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .deleteQuickMenuAccess(session.token, id, clanId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addQuickMenuAccess(
    session: Session,
    request: ApiQuickMenuAccessRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .addQuickMenuAccess(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateQuickMenuAccess(
    session: Session,
    request: ApiQuickMenuAccessRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .updateQuickMenuAccess(session.token, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async listForSaleItems(
    session: Session,
    page?: number,
  ): Promise<ApiForSaleItemList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listForSaleItems(session.token, page)
      .then((response: ApiForSaleItemList) => {
        return Promise.resolve(response);
      });
  }

  async isFollower(
    session: Session,
    req: ApiIsFollowerRequest,
  ): Promise<ApiIsFollowerResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .isFollower(session.token, req)
      .then((response: ApiIsFollowerResponse) => {
        return Promise.resolve(response);
      });
  }

  async transferOwnership(
    session: Session,
    req: ApiTransferOwnershipRequest,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .transferOwnership(session.token, req)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async isBanned(
    session: Session,
    channelId: string,
  ): Promise<ApiIsBannedResponse> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .isBanned(session.token, channelId)
      .then((response: ApiIsBannedResponse) => {
        return Promise.resolve(response);
      });
  }

  async reportMessageAbuse(
    session: Session,
    messageId?: string,
    abuseType?: string,
  ): Promise<any> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .reportMessageAbuse(session.token, messageId, abuseType)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async listLogedDevice(session: Session): Promise<ApiLogedDeviceList> {
    if (
      this.autoRefreshSession &&
      session.refresh_token &&
      session.isexpired(Date.now() / 1000)
    ) {
      await this.sessionRefresh(session);
    }

    return this.apiClient
      .listLogedDevice(session.token)
      .then((response: ApiLogedDeviceList) => {
        return Promise.resolve(response);
      });
  }
}
