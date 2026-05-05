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

import WebSocket, { CloseEvent, ErrorEvent } from "ws";
import { ApiMessageAttachment, ApiMessageMention, ApiMessageReaction, ApiMessageRef, Channel, ChannelDescListEvent, ChannelMessageAck, ClanJoin, ClanNameExistedEvent, CustomStatusEvent, EmojiListedEvent, HashtagDmListEvent, LastPinMessageEvent, LastSeenMessageEvent, MessageTypingEvent, NotificationCategorySettingEvent, NotificationChannelSettingEvent, NotificationClanSettingEvent, NotifiReactMessageEvent, QuickMenuEvent, Socket, SocketError, Status, StrickerListedEvent, TokenSentEvent, VoiceJoinedEvent, VoiceLeavedEvent } from "./interfaces";
import {Session} from "./session";
import { WebSocketAdapterText } from "./web_socket_adapter";
import { TransportAdapter } from "./transport_adapter";
import { InternalEventsSocket } from "./constants";
import { EventEmitter } from "stream";
import HandleEvent from './message-socket-events';
import { WebrtcSignalingFwd, IncomingCallPush, ChannelAppEvent, ListDataSocket, VoiceReactionSend } from "./rtapi/realtime";
import { decodeAttachments, decodeMentions, decodeReactions, decodeRefs, safeJSONParse } from "./utils";

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

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  timeout?: ReturnType<typeof setTimeout>;
}

function CreateChannelMessageFromEvent(message: any) {
  var content, reactions, mentions, attachments, references, referencedMessags;
  try {
    content = safeJSONParse(message.channel_message.content);
  } catch (e) {
    console.log("content is invalid", e);
  }
  try {
    reactions = decodeReactions(message.channel_message.reactions);
  } catch (e) {
    console.log("reactions is invalid", e);
  }
  try {
    mentions = decodeMentions(message.channel_message.mentions);
  } catch (e) {
    console.log("mentions is invalid", e);
  }
  try {
    attachments = decodeAttachments(message.channel_message.attachments);
  } catch (e) {
    console.log("attachments is invalid", e);
  }
  try {
    references = decodeRefs(message.channel_message.references);
  } catch (e) {
    console.log("references is invalid", e);
  }
  try {
    referencedMessags = message.channel_message.referenced_message;
  } catch (e) {
    console.log("referenced messages is invalid", e);
  }
  var e: ChannelMessage = {
    id: message.id || message.channel_message.message_id,
    avatar: message.channel_message.avatar,
    channel_id: message.channel_message.channel_id,
    mode: message.channel_message.mode,
    channel_label: message.channel_message.channel_label,
    clan_id: message.channel_message.clan_id,
    code: message.channel_message.code,
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
    reactions: reactions?.reactions,
    mentions: mentions?.mentions,
    attachments: attachments?.attachments,
    referenced_message: referencedMessags,
    references: references?.refs,
    hide_editted: message.channel_message.hide_editted,
    is_public: message.channel_message.is_public,
    create_time_seconds: message.channel_message.create_time_seconds,
    update_time_seconds: message.channel_message.update_time_seconds,
    topic_id: message.channel_message.topic_id,
  };

  return e;
}

const ConnectionState = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
};

type ConnectionState = (typeof ConnectionState)[keyof typeof ConnectionState];

enum ApiNameEnum {
  // HOT PATH
  ListChannelDescs,
  GetAccount,
  ListClanDescs,
  ListClanUsers,
  ListRoles,
  ListEvents,
  GetRoleOfUserInTheClan,
  GetListPermission,
  ListUserPermissionInChannel,
  GetNotificationClan,
  ListMutedChannel,
  ListStreamingChannelUsers,
  ListQuickMenuAccess,
  GetNotificationChannel,
  ListFriends,
  EmojiRecentList,
  GetListEmojisByUserId,
  ListChannelBadgeCount,
  ListClanUsersStatus,
  ListChannelApps,
  GetListFavoriteChannel,
  ListCategoryDescs,
  ListOnboarding,
  GetListStickersByUserId,
  GetSystemMessageByClanId,
  GetPinMessagesList,
  GetChannelCanvasList,
  ListChannelTimeline,
  ListChannelMessages,
  ListActivity,
  ListChannelByUserId,
  ListUserClansByUserId,
  GetUserProfileOnClan,
  RegistFCMDeviceToken,
  IsBanned,
  ListThreadDescs,
  ListArchivedChannelDescs,
  ListChannelDetail,
  GetChannelCategoryNotiSettingsList,
  ListRoleUsers,
  ListChannelUsers,
  ListChannelAttachment,
  ListChannelVoiceUsers,
  ListUserOnline,
  ListNotifications,
  ListChannelUsersUC,
  ListWebhookByChannelId,
  GetPermissionByRoleIdChannelId,
  ListChannelSetting,
  ListApps,
  GetApp,
  ListForSaleItems,
  ListClanWebhook,
  GetUserStatus,
  ListSdTopic,
  // COLD PATH
  AddFriends,
  AddChannelUsers,
  RegistrationEmail,
  BlockFriends,
  UnblockFriends,
  UploadAttachmentFile,
  UploadOauthFile,
  AddRolesChannelDesc,
  CreateCategoryDesc,
  CreateChannelDesc,
  CreateRole,
  CreateEvent,
  DeleteRole,
  DeleteEvent,
  DeleteRoleChannelDesc,
  DeleteChannelDesc,
  CloseDMByChannelId,
  OpenDMByChannelId,
  DeleteAccount,
  DeleteFriends,
  DeleteCategoryDesc,
  DeleteNotifications,
  DeleteClanDesc,
  UpdateUser,
  UpdateUserProfileByClan,
  UpdateClanOrder,
  RemoveChannelUsers,
  LeaveThread,
  ArchiveChannel,
  LinkSMS,
  ConfirmLinkMezonOTP,
  LinkEmail,
  CreateClanDesc,
  RemoveClanUsers,
  BanClanUsers,
  CreateLinkInviteUser,
  InviteUser,
  SetRoleChannelPermission,
  SetNotificationChannelSetting,
  SetMuteChannel,
  SetMuteCategory,
  SetNotificationClanSetting,
  SetNotificationCategorySetting,
  DeleteNotificationCategorySetting,
  DeleteNotificationChannel,
  CreatePinMessage,
  CreateMessage2Inbox,
  UnlinkMezon,
  UnlinkEmail,
  UpdateAccount,
  UpdateUsername,
  UpdateCategory,
  UpdateCategoryOrder,
  UpdateRoleOrder,
  UpdateClanDesc,
  UpdateChannelDesc,
  UpdateChannelPrivate,
  UpdateRole,
  UpdateEvent,
  SearchMessage,
  CreateClanEmoji,
  DeleteByIdClanEmoji,
  UpdateClanEmojiById,
  GenerateWebhook,
  HandleWebhook,
  UpdateWebhookById,
  DeleteWebhookById,
  AddClanSticker,
  UpdateClanStickerById,
  DeleteClanStickerById,
  ChangeChannelCategory,
  CheckDuplicateName,
  AddApp,
  DeleteApp,
  UpdateApp,
  AddAppToClan,
  CreateSystemMessage,
  UpdateSystemMessage,
  DeleteSystemMessage,
  StreamingServerCallback,
  EditChannelCanvases,
  GetChannelCanvasDetail,
  DeleteChannelCanvas,
  AddChannelFavorite,
  RemoveChannelFavorite,
  CreateActiviy,
  GetPubKeys,
  PushPubKey,
  GetChanEncryptionMethod,
  SetChanEncryptionMethod,
  GetKeyServer,
  ListAuditLog,
  GetOnboardingDetail,
  CreateOnboarding,
  UpdateOnboarding,
  DeleteOnboarding,
  ListOnboardingStep,
  UpdateOnboardingStep,
  GenerateClanWebhook,
  UpdateClanWebhookById,
  DeleteClanWebhookById,
  HandleClanWebhook,
  UpdateUserStatus,
  UpdateUserCustomStatus,
  GetTopicDetail,
  CreateSdTopic,
  DeleteSdTopic,
  CreateExternalMezonMeet,
  GenerateMeetToken,
  RemoveParticipantMezonMeet,
  MuteParticipantMezonMeet,
  CreateRoomChannelApps,
  GetMezonOauthClient,
  DeleteMezonOauthClient,
  UpdateMezonOauthClient,
  SearchThread,
  GenerateHashChannelApps,
  DeleteUserEvent,
  AddUserEvent,
  DeleteQuickMenuAccess,
  AddQuickMenuAccess,
  UpdateQuickMenuAccess,
  TransferOwnership,
  SendChannelMessage,
  UpdateChannelMessage,
  DeleteChannelMessage,
  ReportMessageAbuse,
  MessageButtonClick,
  DropdownBoxSelected,
  ActiveArchivedThread,
  UpdateChannelTimeline,
  AddAgentToChannel,
  DisconnectAgent,
  CreateChannelTimeline,
  DetailChannelTimeline,
  CreatePoll,
  VotePoll,
  ClosePoll,
  GetPoll,
  ReactChannelMessage,
  MultipartUploadAttachmentFileStart,
  MultipartUploadAttachmentFileFinish,
}

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: number]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;
  private _connectionState: ConnectionState = ConnectionState.DISCONNECTED;
  private _connectTimeoutTimer?: ReturnType<typeof setTimeout>;
  private _connectPromise?: Promise<Session>;
  private _heartbeatTimer?: ReturnType<typeof setTimeout>;
  private _hasConnectedOnce: boolean = false;
  private _internalSocketEventsBound: boolean = false;

  public socketEvents : EventEmitter = new EventEmitter();
  
  public session: Session | undefined;

  constructor(
    readonly ws_url: string,
    readonly host: string,
    readonly port: string,
    readonly useSSL: boolean = false,
    public verbose: boolean = false,
    readonly adapter: TransportAdapter = new WebSocketAdapterText(),
    readonly sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs,
  ) {
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = DefaultSocket.DefaultHeartbeatTimeoutMs;
  }

  generatecid(): number {
    const cid = this.nextCid;

    if (this.nextCid >= 65535) {
      this.nextCid = 1;
    } else {
      ++this.nextCid;
    }

    return cid;
  }

  isOpen(): boolean {
    return this._connectionState === ConnectionState.CONNECTED && this.adapter.isOpen();
  }

  close() {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    this.adapter.close();
  }
  
  private formatFunction: Partial<Record<InternalEventsSocket, (msg: any) => any>> = {
    [InternalEventsSocket.ChannelMessage]: (message: any) => {
      return CreateChannelMessageFromEvent(message);
    },
  };

  connect(session: Session, createStatus: boolean = false, connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs, signal?: AbortSignal): Promise<Session> {
    this.session = session;

    if (this._connectionState === ConnectionState.CONNECTED && this.adapter.isOpen()) {
      return Promise.resolve(session);
    }

    if (this._connectionState === ConnectionState.CONNECTING && this._connectPromise) {
      return this._connectPromise;
    }

    this.clearConnectTimeout();
    this._connectionState = ConnectionState.CONNECTING;

    const { host, port } = this.resolveSocketAddress(session);
    this.adapter.connect(host, port, createStatus, session.token, signal);

    this.bindInternalSocketEvents();
    this.adapter.onMessage = (cid: number, code: number, message: any) =>
      this.handleSocketMessage(cid, code, message);

    const connectPromise = new Promise<Session>((resolve, reject) => {
      this.adapter.onClose = (evt: CloseEvent) => {
        const wasConnecting = this._connectionState === ConnectionState.CONNECTING;
        this.handleSocketClose(evt);
        if (wasConnecting) {
          reject(evt);
        }
      };

      this.adapter.onOpen = (evt: WebSocket.Event) => {
        if (this.verbose) {
          console.log(evt);
        }

        const isReconnect = this._hasConnectedOnce;
        this._hasConnectedOnce = true;

        this.clearConnectTimeout();
        this._connectionState = ConnectionState.CONNECTED;
        this.startHeartbeatLoop();
        this._connectPromise = undefined;

        resolve(session);

        if (isReconnect) {
          this.onreconnect(evt);
        }
      };

      this.adapter.onError = (evt: ErrorEvent) => {
        this.handleSocketError(evt);
        reject(evt);
        this.adapter.close();
      };

      this._connectTimeoutTimer = setTimeout(() => {
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

  private bindInternalSocketEvents(): void {
    if (this._internalSocketEventsBound) return;

    HandleEvent.forEach((cl) => {
      const instance = new cl(this);
      instance.excute();
    });

    this._internalSocketEventsBound = true;
  }

  private resolveSocketAddress(session: Session): { host: string; port: string } {
    const socketUrl = session.ws_url || this.ws_url || `${this.host}:${this.port}`;
    return this.parseSocketAddress(socketUrl);
  }

  private parseSocketAddress(socketUrl: string): { host: string; port: string } {
    const defaultPort = this.port || (this.useSSL ? "443" : "80");

    if (!socketUrl) {
      return { host: this.host, port: defaultPort };
    }

    try {
      const parsedUrl = new URL(socketUrl.includes("://") ? socketUrl : `tcp://${socketUrl}`);
      return {
        host: parsedUrl.hostname || this.host,
        port: parsedUrl.port || defaultPort,
      };
    } catch {
      const [host, port] = socketUrl.split(":");
      return {
        host: host || this.host,
        port: port || defaultPort,
      };
    }
  }

  private handleSocketClose(evt: CloseEvent): void {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    this._connectPromise = undefined;
    this.ondisconnect(evt);
  }

  private handleSocketError(evt: ErrorEvent): void {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    this._connectPromise = undefined;
    this.onerror(evt);
  }

  private handleSocketMessage(cid: number, code: number, message: any): void {
    if (this.verbose) {
      console.log("Response: %o", message);
    }

    if (cid !== 0) {
      this.resolveSocketResponse(cid, code, message);
      return;
    }

    this.emitSocketEvents(message);
  }

  private resolveSocketResponse(cid: number, code: number, message: any): void {
    const executor = this.cIds[cid];

    if (!executor) {
      if (this.verbose) {
        console.error("No promise executor for message: %o", message);
      }
      return;
    }

    delete this.cIds[cid];
    if (executor.timeout) {
      clearTimeout(executor.timeout);
    }

    if (message?.error) {
      executor.reject({
        code,
        error: <SocketError>message.error,
      });
      return;
    }

    executor.resolve({ code, message });
  }

  private emitSocketEvents(message: any): void {
    if (!message || Object.prototype.toString.call(message) !== "[object Object]") {
      return;
    }

    for (const fieldName of Object.values(InternalEventsSocket)) {
      if (!Object.prototype.hasOwnProperty.call(message, fieldName) || !message[fieldName]) {
        continue;
      }

      const input = this.formatFunction[fieldName]
        ? this.formatFunction[fieldName]!(message)
        : message[fieldName];

      this.socketEvents.emit(fieldName, input);
    }
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    if (this.adapter.isOpen()) {
      this.adapter.close();
    }
    if (fireDisconnectEvent) {
      this.ondisconnect(<CloseEvent>{});
    }
  }

  setHeartbeatTimeoutMs(ms : number) {
    this._heartbeatTimeoutMs = ms;
  }

  getHeartbeatTimeoutMs() :  number {
    return this._heartbeatTimeoutMs;
  }

  ondisconnect(evt: CloseEvent) {
    if (this.verbose) {
      console.log(evt);
    }
  }

  onreconnect(evt: WebSocket.Event) {
    if (this.verbose) {
      console.log("Socket reconnected.", evt);
    }
  }

  onerror(evt: ErrorEvent) {
    if (this.verbose) {
      console.log(evt);
    }
  }

  onheartbeattimeout() {
    if (this.verbose) {
      console.log("Heartbeat timeout.");
    }
  }


  getApiFromPath(apiPath: string) {
    if (apiPath in ApiNameEnum) {
      return ApiNameEnum[apiPath as keyof typeof ApiNameEnum];
    }

    return undefined;
  }

  send(data: any, sendTimeout = this.sendTimeoutMs): Promise<any> {
    const { urlPath, fetchOptions } = data;
    let untypedMessage = fetchOptions as any;

    if (urlPath?.includes("/mezon.api.Mezon/")) {
      const apiName = urlPath.substring(17);
      untypedMessage = {
        api_request_event: {
          api_index: this.getApiFromPath(apiName),
          api_name: apiName,
          body: fetchOptions.body,
        },
      };
    }

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
        return;
      }

      if (untypedMessage.channel_message_send) {
        untypedMessage.channel_message_send.content = JSON.stringify(
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
          untypedMessage.quick_menu_event.message?.content,
        );
      }

      const cid = this.generatecid();
      this.cIds[cid] = { resolve, reject };

      if (sendTimeout !== Infinity && sendTimeout > 0) {
        this.cIds[cid].timeout = setTimeout(() => {
          delete this.cIds[cid];
          reject("The socket timed out while waiting for a response.");
        }, sendTimeout);
      }

      untypedMessage.cid = cid;

      try {
        this.adapter.send(untypedMessage);
      } catch (error) {
        if (this.cIds[cid]?.timeout) {
          clearTimeout(this.cIds[cid].timeout);
        }
        delete this.cIds[cid];
        reject(error);
      }
    });
  }

  private sendRealtime<T>(fetchOptions: any, fallback: T): Promise<T> {
    const urlPath = "";

    return Promise.race([
      this.send({ urlPath, fetchOptions }).then(async (_response) => fallback),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.sendTimeoutMs,
        ),
      ),
    ]);
  }

  
  async followUsers(userIds: string[]): Promise<Status> {
    const fetchOptions = {
      status_follow: {
        user_ids: userIds,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as Status);
  }

  async joinClanChat(clan_id: string): Promise<ClanJoin> {
    const fetchOptions = {
      clan_join: {
        clan_id: clan_id,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as ClanJoin);
  }

  async follower(): Promise<void> {
    const fetchOptions = {
      follow_event: {},
    } as any;

    return this.sendRealtime(fetchOptions, {} as unknown as void);
  }

  async joinChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<Channel> {
    const fetchOptions = {
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as Channel);
  }

  leaveChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<void> {
    const fetchOptions = {
      channel_leave: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as unknown as void);
  }

  removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    topic_id?: string,
    has_attachment?: boolean,
    mentions?: string,
    references?: string,
  ): Promise<ChannelMessageAck>;
  removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
    mentions?: string,
    references?: string,
  ): Promise<ChannelMessageAck>;
  async removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    topicIdOrHasAttachment?: string | boolean,
    hasAttachmentOrTopicId?: boolean | string,
    mentions?: string,
    references?: string,
  ): Promise<ChannelMessageAck> {
    const has_attachment =
      typeof topicIdOrHasAttachment === "boolean"
        ? topicIdOrHasAttachment
        : typeof hasAttachmentOrTopicId === "boolean"
          ? hasAttachmentOrTopicId
          : undefined;
    const topic_id =
      typeof topicIdOrHasAttachment === "string"
        ? topicIdOrHasAttachment
        : typeof hasAttachmentOrTopicId === "string"
          ? hasAttachmentOrTopicId
          : undefined;

    const fetchOptions = {
      channel_message_remove: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        is_public: is_public,
        has_attachment: has_attachment,
        topic_id: topic_id,
        mentions: mentions,
        references: references,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as ChannelMessageAck);
  }

  unfollowUsers(user_ids: string[]): Promise<void> {
    const fetchOptions = {
      status_unfollow: {
        user_ids: user_ids,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as unknown as void);
  }

  async updateChatMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, message_id: string, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, hideEditted?: boolean, topic_id?: string, is_update_msg_topic?: boolean): Promise<ChannelMessageAck> {
    const fetchOptions = {
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
    } as any;

    return this.sendRealtime(fetchOptions, {} as ChannelMessageAck);
  }

  updateStatus(status?: string): Promise<void> {
    const fetchOptions = {
      status_update: {
        status: status,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as unknown as void);
  }

  async writeQuickMenuEvent(
    menu_name: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string,
  ): Promise<QuickMenuEvent> {
    const fetchOptions = {
      quick_menu_event: {
        menu_name: menu_name,
        message: {
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
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as QuickMenuEvent);
  }

  async writeEphemeralMessage(
    receiver_id: string | string[],
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
    topic_id?: string,
    message_id?: string
  ): Promise<ChannelMessageAck> {
    const receiverIds = Array.isArray(receiver_id) ? receiver_id : [receiver_id];
    const fetchOptions = {
      ephemeral_message_send: {
        receiver_ids: receiverIds,
        message: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          is_public: is_public,
          content: content,
          mentions: mentions ?? [],
          attachments: attachments ?? [],
          references: references ?? [],
          anonymous_message: anonymous_message,
          mention_everyone: mention_everyone,
          avatar: avatar,
          code: code,
          topic_id: topic_id,
          id: message_id
        }
      }
    } as any;

    return this.sendRealtime(fetchOptions, {} as ChannelMessageAck);
  }

  async writeChatMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?: boolean, avatar?: string, code?: number, topic_id?: string): Promise<ChannelMessageAck> {
    const fetchOptions = {
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
    } as any;

    return this.sendRealtime(fetchOptions, {} as ChannelMessageAck);
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
    topic_id?: string,
    emoji_recent_id?: string,
    sender_name?: string,
  ): Promise<ApiMessageReaction> {
    const fetchOptions = {
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
        emoji_recent_id: emoji_recent_id,
        sender_name: sender_name,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as ApiMessageReaction);
  }

  async writeMessageTyping(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    sender_display_name?: string,
    topic_id?: string,
  ): Promise<MessageTypingEvent> {
    const fetchOptions = {
      message_typing_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        sender_display_name: sender_display_name,
        topic_id: topic_id,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as MessageTypingEvent);
  }

  async writeLastSeenMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number,
    badge_count?: number,
  ): Promise<LastSeenMessageEvent> {
    const fetchOptions = {
      last_seen_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        badge_count: badge_count,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as LastSeenMessageEvent);
  }

  async writeLastPinMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number,
    message_sender_avatar?: string,
    message_sender_id?: string,
    message_sender_username?: string,
    message_content?: string,
    message_attachment?: string,
    message_created_time?: string,
  ): Promise<LastPinMessageEvent> {
    const fetchOptions = {
      last_pin_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        operation: operation,
        message_sender_avatar: message_sender_avatar,
        message_sender_id: message_sender_id,
        message_sender_username: message_sender_username,
        message_content: message_content,
        message_attachment: message_attachment,
        message_created_time: message_created_time,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as LastPinMessageEvent);
  }

  async writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent> {
    const fetchOptions = {
      voice_joined_event: {
        clan_id: clanId,
        clan_name: clanName,
        id: id,
        participant: participant,
        voice_channel_id: voiceChannelId,
        voice_channel_label: voiceChannelLabel,
        last_screenshot: lastScreenshot,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as VoiceJoinedEvent);
  }

  async writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string): Promise<VoiceLeavedEvent> {
    const fetchOptions = {
      voice_leaved_event: {
        id: id,
        clan_id: clanId,
        voice_channel_id: voiceChannelId,
        voice_user_id: voiceUserId,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as VoiceLeavedEvent);
  }

  async writeCustomStatus(
    clan_id: string,
    status: string,
    time_reset?: number,
    no_clear?: boolean,
  ): Promise<CustomStatusEvent> {
    const fetchOptions = {
      custom_status_event: {
        clan_id: clan_id,
        status: status,
        time_reset: time_reset,
        no_clear: no_clear,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as CustomStatusEvent);
  }
  
  async checkDuplicateClanName(clan_name: string): Promise<ClanNameExistedEvent> {
    const fetchOptions = { clan_name_existed_event: { clan_name: clan_name } } as any;
    return this.sendRealtime(fetchOptions, {} as ClanNameExistedEvent);
  }

  async listClanEmojiByClanId(clan_id: string): Promise<EmojiListedEvent> {
    const fetchOptions = { emojis_listed_event: { clan_id: clan_id } } as any;
    return this.sendRealtime(fetchOptions, {} as EmojiListedEvent);
  }

  async ListChannelByUserId(): Promise<ChannelDescListEvent> {
    const fetchOptions = { channel_desc_list_event: {} } as any;
    return this.sendRealtime(fetchOptions, {} as ChannelDescListEvent);
  }

  async hashtagDMList(user_id: Array<string>, limit: number): Promise<HashtagDmListEvent> {
    const fetchOptions = { hashtag_dm_list_event: { user_id: user_id, limit: limit } } as any;
    return this.sendRealtime(fetchOptions, {} as HashtagDmListEvent);
  }

  async listClanStickersByClanId(clan_id: string): Promise<StrickerListedEvent> {
    const fetchOptions = { sticker_listed_event: { clan_id: clan_id } } as any;
    return this.sendRealtime(fetchOptions, {} as StrickerListedEvent);
  }

  async  getNotificationChannelSetting(channel_id: string): Promise<NotificationChannelSettingEvent> {
    const fetchOptions = { notification_channel_setting_event: { channel_id: channel_id } } as any;
    return this.sendRealtime(fetchOptions, {} as NotificationChannelSettingEvent);
  }

  async getNotificationCategorySetting(category_id: string): Promise<NotificationCategorySettingEvent> {
    const fetchOptions = { notification_category_setting_event: { category_id: category_id } } as any;
    return this.sendRealtime(fetchOptions, {} as NotificationCategorySettingEvent);
  }

  async getNotificationClanSetting(clan_id: string): Promise<NotificationClanSettingEvent> {
    const fetchOptions = { notification_clan_setting_event: { clan_id: clan_id } } as any;
    return this.sendRealtime(fetchOptions, {} as NotificationClanSettingEvent);
  }

  async getNotificationReactMessage(channel_id: string): Promise<NotifiReactMessageEvent> {
    const fetchOptions = { notifi_react_message_event: { channel_id: channel_id } } as any;
    return this.sendRealtime(fetchOptions, {} as NotifiReactMessageEvent);
  }

  async writeVoiceReaction(
    emojis: Array<string>,
    channel_id: string,
  ): Promise<VoiceReactionSend> {
    const fetchOptions = {
      voice_reaction_send: {
        emojis: emojis,
        channel_id: channel_id,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as VoiceReactionSend);
  }

  async forwardWebrtcSignaling(
    receiver_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<WebrtcSignalingFwd> {
    const fetchOptions = {
      webrtc_signaling_fwd: {
        receiver_id: receiver_id,
        data_type: data_type,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as WebrtcSignalingFwd);
  }

  async makeCallPush(
    receiver_id: string,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<IncomingCallPush> {
    const fetchOptions = {
      incoming_call_push: {
        receiver_id: receiver_id,
        json_data: json_data,
        channel_id: channel_id,
        caller_id: caller_id,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as IncomingCallPush);
  }

  async writeChannelAppEvent(
    clan_id: string,
    channel_id: string,
    action: number,
  ): Promise<ChannelAppEvent> {
    const fetchOptions = {
      channel_app_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        action: action,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as ChannelAppEvent);
  }

  async listDataSocket(request: ListDataSocket): Promise<any> {
    const fetchOptions = {
      list_data_socket: request,
    } as any;

    return Promise.race([
      this.send({ urlPath: "", fetchOptions }).then(async (response) => response as any),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out.")),
          this.sendTimeoutMs,
        ),
      ),
    ]);
  }

  private startHeartbeatLoop(): void {
    this.stopHeartbeatLoop();
    void this.pingPong();
  }

  private stopHeartbeatLoop(): void {
    if (this._heartbeatTimer !== undefined) {
      clearTimeout(this._heartbeatTimer);
      this._heartbeatTimer = undefined;
    }
  }

  private clearConnectTimeout(): void {
    if (this._connectTimeoutTimer !== undefined) {
      clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = undefined;
    }
  }

  private async pingPong(): Promise<void> {
    if (!this.adapter.isOpen()) {
        return;
    }

    try {
        await this.send(
          {
            urlPath: "",
            fetchOptions: { ping: {} },
          },
          this._heartbeatTimeoutMs,
        );
    } catch {
        if (this.adapter.isOpen()) {
            if (this.verbose) {
                console.error("Server unreachable from heartbeat.");
            }
            this.onheartbeattimeout();
            this.adapter.close();
        }

        return;
    }
    this._heartbeatTimer = setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
  }

  async sendToken(receiver_id: string, amount: number) : Promise<TokenSentEvent> {
    const fetchOptions = {
      token_sent_event: {
        receiver_id: receiver_id,
        amount: amount,
      },
    } as any;

    return this.sendRealtime(fetchOptions, {} as TokenSentEvent);
  }
};
