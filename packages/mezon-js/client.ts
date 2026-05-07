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
  ApiListChannelBadgeCountResponse,
  ApiListUserOnlineResponse,
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
  ApiSession,
  ApiClanProfile,
  ApiChannelUserList,
  ApiClanUserList,
  ApiClanUserStatusList,
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
  ApiCheckDuplicateNameRequest,
  ApiCheckDuplicateNameResponse,
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
  ApiGiveCoffeeEvent,
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
  ApiCreatePollRequest,
  ApiCreatePollResponse,
  ApiGetPollRequest,
  ApiGetPollResponse,
  ApiVotePollRequest,
  ApiVotePollResponse,
  ApiClosePollRequest,
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
  ApiTokenSentEvent,
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
  ApiAddFriendsResponse,
  ApiUpdateUsernameRequest,
  ApiBannedUserList,
  ApiIsBannedResponse,
  ChannelMessage,
  ApiMessageMention,
  ApiMessageAttachment,
  ApiMessageRef,
  ApiListChannelTimelineRequest,
  ApiListChannelTimelineResponse,
  ApiCreateChannelTimelineRequest,
  ApiCreateChannelTimelineResponse,
  ApiUpdateChannelTimelineRequest,
  ApiUpdateChannelTimelineResponse,
  ApiDetailChannelTimelineRequest,
  ApiDetailChannelTimelineResponse,
  ApiMutedChannelList,
  AddClanUserEvent,
  AddFriend,
  AiAgentEnabledEvent,
  AllowAnonymousEvent,
  ApiMessageReaction,
  ApiNotification,
  ApiWebhook,
  BannedUserEvent,
  BlockFriend,
  CategoryEvent,
  ChannelAppEvent,
  ChannelCanvas,
  ChannelCreatedEvent,
  ChannelDeletedEvent,
  ChannelPresenceEvent,
  ChannelUpdatedEvent,
  ClanDeletedEvent,
  ClanProfileUpdatedEvent,
  ClanUpdatedEvent,
  CustomStatusEvent,
  DeleteAccountEvent,
  EventEmoji,
  JoinChannelAppData,
  LastPinMessageEvent,
  LastSeenMessageEvent,
  ListActivity,
  ListChannelUsersBannedEvent,
  MarkAsRead,
  MeetParticipantEvent,
  MessageTypingEvent,
  PermissionChangedEvent,
  PermissionSet,
  QuickMenuEvent,
  RemoveFriend,
  RoleAssignedEvent,
  RoleEvent,
  SdTopicEvent,
  StatusPresenceEvent,
  StickerCreateEvent,
  StickerDeleteEvent,
  StickerUpdateEvent,
  StreamingEndedEvent,
  StreamingJoinedEvent,
  StreamingLeavedEvent,
  StreamingStartedEvent,
  TransferOwnershipEvent,
  UnblockFriend,
  UnmuteEvent,
  UnpinMessageEvent,
  UserChannelAddedEvent,
  UserChannelRemovedEvent,
  UserClanRemovedEvent,
  UserProfileUpdatedEvent,
  UserStatusEvent,
  VoiceEndedEvent,
  VoiceJoinedEvent,
  VoiceLeavedEvent,
  VoiceReactionSend,
  VoiceStartedEvent,
  WebrtcSignalingFwd,
  CreateChannelMessageFromEvent,
  ChannelMessageList,
  Friends,
  ApiUpdateChannelDescRequest,
  ApiUpdateClanProfileRequest,
  ApiUpdateRoleRequest,
  IncomingCallPush,
  Channel,
  ClanJoin,
  Status,
  ApiListClanBadgeCountResponse,
} from "./types";

import {
  decodeAttachments,
  decodeMentions,
  decodeNotificationFcm,
  decodeReactions,
  decodeRefs,
  safeJSONParse,
  decodeChannelTimelineAttachments,
} from "./utils";
import {
  ChannelMessageAck,
  DropdownBoxSelected,
  LogedDeviceList,
  MessageButtonClicked,
  MultipartUploadAttachment,
  MultipartUploadAttachmentFinishRequest,
} from "mezon-js-protobuf";
import { MezonTransport } from "./transport";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "7350";
const DEFAULT_SERVER_KEY = "defaultkey";
const DEFAULT_TIMEOUT_MS = 30000;

export const ConnectionState = {
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
} as const;

export type ConnectionStateType =
  (typeof ConnectionState)[keyof typeof ConnectionState];


function createEvent(type: string): Event {
  if (typeof Event === "function") {
    return new Event(type);
  }
  return {
    type,
    target: null,
    currentTarget: null,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    timeStamp: Date.now(),
    preventDefault: () => {},
    stopPropagation: () => {},
    stopImmediatePropagation: () => {},
  } as unknown as Event;
}

export interface AutoReconnectOptions {
  enabled?: boolean;
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

interface LastConnectArgs {
  session_id: string;
  url: string;
  createStatus: boolean;
  verbose: boolean;
  connectTimeoutMs: number;
}

/** A client for Mezon server. */
export class Client {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  public verbose: boolean = false;
  private _heartbeatTimeoutMs: number;
  private _connectionState: ConnectionStateType;
  private _heartbeatTimer?: ReturnType<typeof setTimeout>;
  private _connectTimeoutTimer?: ReturnType<typeof setTimeout>;
  private _connectPromise?: Promise<void>;
  private _connectReject?: (reason?: any) => void;
  private _hasConnectedOnce: boolean = false;
  private readonly transport: MezonTransport;

  private _lastConnectArgs?: LastConnectArgs;

  host: string;
  port: string;
  useSSL: boolean;

  constructor(
    readonly serverkey = DEFAULT_SERVER_KEY,
    host = DEFAULT_HOST,
    port = DEFAULT_PORT,
    useSSL = false,
    readonly timeout = DEFAULT_TIMEOUT_MS,
    readonly autoFallbackHttp = true,
  ) {
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    const scheme = useSSL ? "https://" : "http://";
    const basePath = `${scheme}${host}:${port}`;

    this._heartbeatTimeoutMs = Client.DefaultHeartbeatTimeoutMs;
    this._connectionState = ConnectionState.DISCONNECTED;

    this.transport = new MezonTransport(serverkey, timeout, basePath);
  }

  isOpen(): boolean {
    return this._connectionState === ConnectionState.CONNECTED;
  }

  connect(
    session_id: string,
    url: string,
    createStatus = false,
    verbose = false,
    connectTimeoutMs: number = Client.DefaultConnectTimeoutMs,
  ): Promise<void> {
    this.verbose = verbose;

    const sameTarget =
      this._lastConnectArgs?.session_id === session_id &&
      this._lastConnectArgs?.url === url;

    // Idempotent: already connected to the same target with a live socket.
    if (
      this._connectionState === ConnectionState.CONNECTED &&
      this.transport.adapter.isOpen() &&
      sameTarget
    ) {
      return Promise.resolve();
    }

    // Currently connecting to the same target -> share the in-flight promise.
    if (
      this._connectionState === ConnectionState.CONNECTING &&
      this._connectPromise &&
      sameTarget
    ) {
      return this._connectPromise;
    }

    // Connected/connecting to a DIFFERENT target (e.g. session refreshed,
    // url changed) OR connection state is stale (state says CONNECTED but
    if (
      this._connectionState === ConnectionState.CONNECTED ||
      this._connectionState === ConnectionState.CONNECTING
    ) {
      this.transport.close();
      this.markDisconnected(createEvent("close"), false);
    }

    this.clearConnectTimeout();
    this._connectionState = ConnectionState.CONNECTING;
    this._lastConnectArgs = {
      session_id,
      url,
      createStatus,
      verbose,
      connectTimeoutMs,
    };

    try {
      this.transport.connect(
      session_id,
      url,
      createStatus,
      verbose,
      async (_cid: number, _code: number, message: any) => {
        if (!message.cid) {
          if (message.notifications) {
            message.notifications.notifications.forEach(
              (n: ApiNotification) => {
                n.content = n.content
                  ? decodeNotificationFcm(n.content)
                  : undefined;
                this.onnotification(n);
              },
            );
          } else if (message.voice_started_event) {
            this.onvoicestarted(message.voice_started_event);
          } else if (message.voice_ended_event) {
            this.onvoiceended(message.voice_ended_event);
          } else if (message.voice_joined_event) {
            this.onvoicejoined(message.voice_joined_event);
          } else if (message.voice_leaved_event) {
            this.onvoiceleaved(message.voice_leaved_event);
          } else if (message.channel_created_event) {
            this.onchannelcreated(message.channel_created_event);
          } else if (message.category_event) {
            this.oncategoryevent(message.category_event);
          } else if (message.role_event) {
            this.onroleevent(message.role_event);
          } else if (message.event_emoji) {
            this.oneventemoji(message.event_emoji);
          } else if (message.noti_user_channel) {
            this.oneventnotiuserchannel(message.noti_user_channel);
          } else if (message.webhook_event) {
            this.oneventwebhook(message.webhook_event);
          } else if (message.channel_deleted_event) {
            this.onchanneldeleted(message.channel_deleted_event);
          } else if (message.clan_deleted_event) {
            this.onclandeleted(message.clan_deleted_event);
          } else if (message.sticker_create_event) {
            this.onstickercreated(message.sticker_create_event);
          } else if (message.sticker_update_event) {
            this.onstickerupdated(message.sticker_update_event);
          } else if (message.sticker_delete_event) {
            this.onstickerdeleted(message.sticker_delete_event);
          } else if (message.channel_updated_event) {
            this.onchannelupdated(message.channel_updated_event);
          } else if (message.delete_account_event) {
            this.ondeleteaccount(message.delete_account_event);
          } else if (message.clan_profile_updated_event) {
            this.onclanprofileupdated(message.clan_profile_updated_event);
          } else if (message.clan_updated_event) {
            this.onclanupdated(message.clan_updated_event);
          } else if (message.last_seen_message_event) {
            this.onlastseenupdated(message.last_seen_message_event);
          } else if (message.status_presence_event) {
            this.onstatuspresence(
              <StatusPresenceEvent>message.status_presence_event,
            );
          } else if (message.channel_message) {
            const channelMessage = CreateChannelMessageFromEvent(message);
            this.onchannelmessage(channelMessage);
          } else if (message.message_typing_event) {
            this.onmessagetyping(
              <MessageTypingEvent>message.message_typing_event,
            );
          } else if (message.message_reaction_event) {
            this.onmessagereaction(
              <ApiMessageReaction>message.message_reaction_event,
            );
          } else if (message.channel_presence_event) {
            this.onchannelpresence(
              <ChannelPresenceEvent>message.channel_presence_event,
            );
          } else if (message.last_pin_message_event) {
            this.onpinmessage(
              <LastPinMessageEvent>message.last_pin_message_event,
            );
          } else if (message.custom_status_event) {
            this.oncustomstatus(<CustomStatusEvent>message.custom_status_event);
          } else if (message.canvas_event) {
            this.oncanvasevent(<ChannelCanvas>message.canvas_event);
          } else if (message.user_channel_added_event) {
            this.onuserchanneladded(
              <UserChannelAddedEvent>message.user_channel_added_event,
            );
          } else if (message.add_clan_user_event) {
            this.onuserclanadded(<AddClanUserEvent>message.add_clan_user_event);
          } else if (message.user_profile_updated_event) {
            this.onuserprofileupdate(
              <UserProfileUpdatedEvent>message.user_profile_updated_event,
            );
          } else if (message.user_channel_removed_event) {
            this.onuserchannelremoved(
              <UserChannelRemovedEvent>message.user_channel_removed_event,
            );
          } else if (message.block_friend) {
            this.onblockfriend(<BlockFriend>message.block_friend);
          } else if (message.un_block_friend) {
            this.onunblockfriend(<UnblockFriend>message.un_block_friend);
          } else if (message.add_friend) {
            this.onaddfriend(<AddFriend>message.add_friend);
          } else if (message.remove_friend) {
            this.onremovefriend(<RemoveFriend>message.remove_friend);
          } else if (message.user_clan_removed_event) {
            this.onuserclanremoved(
              <UserClanRemovedEvent>message.user_clan_removed_event,
            );
          } else if (message.clan_event_created) {
            this.oneventcreated(message.clan_event_created);
          } else if (message.give_coffee_event) {
            this.oncoffeegiven(<ApiGiveCoffeeEvent>message.give_coffee_event);
          } else if (message.role_assign_event) {
            this.onroleassign(<RoleAssignedEvent>message.role_assign_event);
          } else if (message.streaming_started_event) {
            this.onstreamingchannelstarted(
              <StreamingStartedEvent>message.streaming_started_event,
            );
          } else if (message.streaming_ended_event) {
            this.onstreamingchannelended(
              <StreamingEndedEvent>message.streaming_ended_event,
            );
          } else if (message.streaming_joined_event) {
            this.onstreamingchanneljoined(
              <StreamingJoinedEvent>message.streaming_joined_event,
            );
          } else if (message.streaming_leaved_event) {
            this.onstreamingchannelleaved(
              <StreamingLeavedEvent>message.streaming_leaved_event,
            );
          } else if (message.permission_set_event) {
            this.onpermissionset(<PermissionSet>message.permission_set_event);
          } else if (message.permission_changed_event) {
            this.onpermissionchanged(
              <PermissionChangedEvent>message.permission_changed_event,
            );
          } else if (message.unmute_event) {
            this.onunmuteevent(<UnmuteEvent>message.unmute_event);
          } else if (message.token_sent_event) {
            this.ontokensent(<ApiTokenSentEvent>message.token_sent_event);
          } else if (message.message_button_clicked) {
            this.onmessagebuttonclicked(
              <MessageButtonClicked>message.message_button_clicked,
            );
          } else if (message.dropdown_box_selected) {
            this.onmessagedropdownboxselected(
              <DropdownBoxSelected>message.dropdown_box_selected,
            );
          } else if (message.mark_as_read) {
            this.onmarkasread(<MarkAsRead>message.mark_as_read);
          } else if (message.voice_reaction_send) {
            this.onvoicereactionmessage(
              <VoiceReactionSend>message.voice_reaction_send,
            );
          } else if (message.webrtc_signaling_fwd) {
            this.onwebrtcsignalingfwd(
              <WebrtcSignalingFwd>message.webrtc_signaling_fwd,
            );
          } else if (message.list_activity) {
            this.onactivityupdated(<ListActivity>message.list_activity);
          } else if (message.sd_topic_event) {
            this.onsdtopicevent(<SdTopicEvent>message.sd_topic_event);
          } else if (message.channel_app_event) {
            this.onchannelappevent(<ChannelAppEvent>message.channel_app_event);
          } else if (message.user_status_event) {
            this.onuserstatusevent(<UserStatusEvent>message.user_status_event);
          } else if (message.join_channel_app_data) {
            this.onjoinchannelappevent(
              <JoinChannelAppData>message.join_channel_app_data,
            );
          } else if (message.unpin_message_event) {
            this.onunpinmessageevent(
              <UnpinMessageEvent>message.unpin_message_event,
            );
          } else if (message.quick_menu_event) {
            this.onquickmenuevent(<QuickMenuEvent>message.quick_menu_event);
          } else if (message.meet_participant_event) {
            this.onmeetparticipantevent(
              <MeetParticipantEvent>message.meet_participant_event,
            );
          } else if (message.transfer_ownership_event) {
            this.ontransferownership(
              <TransferOwnershipEvent>message.transfer_ownership_event,
            );
          } else if (message.ban_user_event) {
            this.onbanneduser(<BannedUserEvent>message.ban_user_event);
          } else if (message.list_channel_users_banned_event) {
            this.onlistchannelusersbanned(
              <ListChannelUsersBannedEvent>(
                message.list_channel_users_banned_event
              ),
            );
          } else if (message.allow_anonymous_event) {
            this.onallowanonymousevent(
              <AllowAnonymousEvent>message.allow_anonymous_event,
            );
          } else if (message.aiagent_enabled_event) {
            this.onaiagentenabled(
              <AiAgentEnabledEvent>message.aiagent_enabled_event,
            );
          } else if (message.refresh_session_event) {
            this.onrefreshsession(<ApiSession>message.refresh_session_event);
          } else if (message.pong) {
            if (this.verbose && window && window.console) {
              console.log("Pong message received: %o", message);
            }
          } else {
            if (this.verbose && window && window.console) {
              console.log("Unrecognized message received: %o", message);
            }
          }
        }
      },
      async (evt: Event) => {
        const wasConnecting =
          this._connectionState === ConnectionState.CONNECTING;
        this.markDisconnected(evt);
        if (wasConnecting && this._connectReject) {
          const reject = this._connectReject;
          this._connectReject = undefined;
          reject(
            new Error("Socket closed before connection was established."),
          );
        }
      },
    );
    } catch (err) {
      console.log(err, 'err socket');
      const errEvent = createEvent("error");
      this.onerror(errEvent);
      this.markDisconnected(errEvent);
      return Promise.reject(
        err instanceof Error ? err : new Error(String(err)),
      );
    }

    const connectPromise = new Promise<void>((resolve, reject) => {
      this._connectReject = reject;

      this.transport.setOnOpen((evt: Event) => {
        if (this.verbose && typeof console !== "undefined") {
          console.log(evt);
        }

        const isReconnect = this._hasConnectedOnce;
        this._hasConnectedOnce = true;

        this.clearConnectTimeout();
        this._connectionState = ConnectionState.CONNECTED;
        this.startHeartbeatLoop();
        this._connectPromise = undefined;
        this._connectReject = undefined;
        resolve();
        if (isReconnect) {
          this.onreconnect(evt);
        }
        else {
          this.onconnect(evt);
        }
      });
      this.transport.setOnError((evt: Event) => {
        this.onerror(evt);
        this.markDisconnected(createEvent("error"));
        this._connectReject = undefined;
        reject(evt);
        this.transport.close();
      });

      this._connectTimeoutTimer = setTimeout(() => {
        // if promise has resolved by now, the reject() is a no-op
        this.markDisconnected(createEvent("timeout"));
        this.transport.close();
        this._connectReject = undefined;
        reject(new Error("The socket timed out when trying to connect."));
        this._connectTimeoutTimer = undefined;
      }, connectTimeoutMs);
    });

    this._connectPromise = connectPromise;
    return this._connectPromise;
  }

  /**
   * Kept for API compatibility. Automatic reconnect is not implemented.
   */
  setAutoReconnect(options: AutoReconnectOptions): void {
    void options;
  }

  disconnect(fireDisconnectEvent: boolean = true): void {
    this._lastConnectArgs = undefined;
    this.markDisconnected(createEvent("close"), fireDisconnectEvent);
    this.transport.close();
  }

  private async pingPong(): Promise<void> {
    if (!this.isOpen()) {
      return;
    }

    try {
      const urlPath = "";
      const fetchOptions = { ping: {} };
      await this.transport.send(
        { urlPath, fetchOptions },
        this._heartbeatTimeoutMs,
      );
    } catch {
      if (this.verbose && typeof console !== "undefined") {
        console.error("Server unreachable from heartbeat.");
      }
      this.onheartbeattimeout();

      if (this.transport.adapter.isOpen()) {
        this.transport.close();
      } else {
        this.markDisconnected(createEvent("close"));
      }

      return;
    }

    this.startHeartbeatLoop();
  }

  private startHeartbeatLoop() {
    this.stopHeartbeatLoop();
    this._heartbeatTimer = setTimeout(
      () => this.pingPong(),
      this._heartbeatTimeoutMs,
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

  private markDisconnected(
    evt: Event = createEvent("close"),
    fireDisconnectEvent = true,
  ): void {
    const wasAlreadyDisconnected =
      this._connectionState === ConnectionState.DISCONNECTED;
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    this._connectPromise = undefined;
    this._connectReject = undefined;

    if (fireDisconnectEvent && !wasAlreadyDisconnected) {
      this.ondisconnect(evt);
    }
  }

  onconnect(evt: Event) {
    if (this.verbose && typeof console !== "undefined") {
      console.log(evt);
    }
  }


  onreconnect(evt: Event) {
    if (this.verbose && typeof console !== "undefined") {
      console.log(evt);
    }
  }

  ondisconnect(evt: Event) {
    if (this.verbose && typeof console !== "undefined") {
      console.log(evt);
    }
  }

  onerror(evt: Event) {
    if (this.verbose && typeof console !== "undefined") {
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

  onlistchannelusersbanned(event: ListChannelUsersBannedEvent) {
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

  onaiagentenabled(event: AiAgentEnabledEvent) {
    if (this.verbose && window && window.console) {
      console.log(event);
    }
  }

  /**
   * Called when a token refresh is initiated.
   * This is a placeholder method that subclasses or instances can override
   * to perform actions before or after the refresh logic.
   */
  onrefreshsession(session: ApiSession): void {
    console.log(`Token refresh occurred. Token: ${session.token}`);
  }

  /** Authenticate a user with a custom id against the server. */
  authenticateMezon(
    token: string,
    create?: boolean,
    username?: string,
    isRemember?: boolean,
    vars: Record<string, string> = {},
    options: any = {},
  ): Promise<ApiSession> {
    const request = {
      token: token,
      vars: vars,
    };
    return this.transport
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
        return {
          token: apiSession.token || "",
          refresh_token: apiSession.refresh_token || "",
          created: apiSession.created || false,
          api_url: apiSession.api_url || "",
          ws_url: apiSession.ws_url || "",
          id_token: apiSession.id_token || "",
          is_remember: apiSession.is_remember || false,
          session_id: apiSession.session_id || "",
        };
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

    return this.transport
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

    return this.transport
      .AuthenticateEmailOTPRequest(this.serverkey, "", request, username)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  async confirmAuthenticateOTP(
    request: ApiLinkAccountConfirmRequest,
  ): Promise<ApiSession> {
    return this.transport
      .confirmAuthenticateOTP(this.serverkey, "", request)
      .then((apiSession: ApiSession) => {
        return {
          token: apiSession.token || "",
          refresh_token: apiSession.refresh_token || "",
          created: apiSession.created || false,
          api_url: apiSession.api_url || "",
          ws_url: apiSession.ws_url || "",
          id_token: apiSession.id_token || "",
          is_remember: apiSession.is_remember || false,
          session_id: apiSession.session_id || "",
        };
      });
  }

  /** Authenticate a user with an email+password against the server. */
  authenticateEmail(
    email: string,
    password: string,
    username?: string,
    vars?: Record<string, string>,
  ): Promise<ApiSession> {
    const request = {
      username: username,
      account: {
        email: email,
        password: password,
        vars: vars,
      },
    };

    return this.transport
      .authenticateEmail(this.serverkey, "", request, username)
      .then((apiSession: ApiSession) => {
        return {
          token: apiSession.token || "",
          refresh_token: apiSession.refresh_token || "",
          created: apiSession.created || false,
          api_url: apiSession.api_url || "",
          ws_url: apiSession.ws_url || "",
          id_token: apiSession.id_token || "",
          is_remember: apiSession.is_remember || false,
          session_id: apiSession.session_id || "",
        };
      });
  }

  /** Add users to a channel, or accept their join requests. */
  async addChannelUsers(
    session: ApiSession,
    channelId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .addChannelUsers(channelId, ids)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Add friends by ID or username to a user's account. */
  async addFriends(
    session: ApiSession,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<ApiAddFriendsResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.addFriends(ids, usernames);
  }

  /** Block one or more users by ID or username. */
  async blockFriends(
    session: ApiSession,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.blockFriends(ids, usernames).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Block one or more users by ID or username. */
  async unblockFriends(
    session: ApiSession,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .unblockFriends(ids, usernames)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadOauthFile(
    session: ApiSession,
    request: ApiUploadAttachmentRequest,
  ): Promise<ApiUploadAttachment> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.uploadOauthFile(request);
  }

  /** Create a new group with the current user as the creator and superadmin. */
  async uploadAttachmentFile(
    session: ApiSession,
    request: ApiUploadAttachmentRequest,
  ): Promise<ApiUploadAttachment> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.uploadAttachmentFile(request);
  }

  async multipartUploadAttachmentFile(
    session: ApiSession,
    request: ApiUploadAttachmentRequest,
  ): Promise<MultipartUploadAttachment> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.multipartUploadAttachmentFile(request);
  }

  async multipartUploadAttachmentFileFinish(
    session: ApiSession,
    request: MultipartUploadAttachmentFinishRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.multipartUploadAttachmentFileFinsih(request);
  }

  /** Create a channel within clan */
  async createChannelDesc(
    session: ApiSession,
    request: ApiCreateChannelDescRequest,
  ): Promise<ApiChannelDescription> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createChannelDesc(request)
      .then((response: ApiChannelDescription) => {
        return Promise.resolve(response);
      });
  }

  /** Create a clan */
  async createClanDesc(
    session: ApiSession,
    request: ApiCreateClanDescRequest,
  ): Promise<ApiClanDesc> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createClanDesc(request)
      .then((response: ApiClanDesc) => {
        return Promise.resolve(response);
      });
  }

  /** Check duplicate name/label  */
  async checkDuplicateName(
    session: ApiSession,
    request: ApiCheckDuplicateNameRequest,
  ): Promise<ApiCheckDuplicateNameResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.checkDuplicateName(request);
  }

  /**  */
  async createCategoryDesc(
    session: ApiSession,
    request: ApiCreateCategoryDescRequest,
  ): Promise<ApiCategoryDesc> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createCategoryDesc(request)
      .then((response: ApiCategoryDesc) => {
        return Promise.resolve(response);
      });
  }

  /** Create a new role for clan. */
  async createRole(
    session: ApiSession,
    request: ApiCreateRoleRequest,
  ): Promise<ApiRole> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.createRole(request).then((response: ApiRole) => {
      return Promise.resolve(response);
    });
  }

  /** Create a new event for clan. */
  async createEvent(
    session: ApiSession,
    request: ApiCreateEventRequest,
  ): Promise<ApiEventManagement> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createEvent(request)
      .then((response: ApiEventManagement) => {
        return Promise.resolve(response);
      });
  }

  /** add role for channel. */
  async addRolesChannelDesc(
    session: ApiSession,
    request: ApiAddRoleChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .addRolesChannelDesc(request)
      .then((response: ApiRole) => {
        return response !== undefined;
      });
  }

  /** Update action role when delete role */
  async deleteRoleChannelDesc(
    session: ApiSession,
    request: ApiDeleteRoleRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteRoleChannelDesc(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteApp(session: ApiSession, appId: string): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.deleteApp(appId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete one or more users by ID or username. */
  async deleteFriends(
    session: ApiSession,
    ids?: Array<string>,
    usernames?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteFriends(ids, usernames)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a channel by ID. */
  async deleteChannelDesc(
    session: ApiSession,
    clanId: string,
    channelId: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteChannelDesc(clanId, channelId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a clan desc by ID. */
  async deleteClanDesc(
    session: ApiSession,
    clanDescId: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.deleteClanDesc(clanDescId).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete a category by ID. */
  async deleteCategoryDesc(
    session: ApiSession,
    categoryId: string,
    clanId: string,
    categoryLabel?: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteCategoryDesc(categoryId, clanId, categoryLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete one or more notifications */
  async deleteNotifications(
    session: ApiSession,
    ids?: Array<string>,
    category?: number,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteNotifications(ids, category)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Delete a role by ID. */
  async deleteRole(
    session: ApiSession,
    roleId: string,
    clanId: string,
    roleLabel?: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteRole(roleId, "0", clanId, roleLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Delete a event by ID. */
  async deleteEvent(
    session: ApiSession,
    eventId: string,
    clanId: string,
    creatorId: string,
    eventLabel?: string,
    channelId?: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteEvent(eventId, clanId, creatorId, eventLabel, channelId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** update user a event by ID. */
  async updateEventUser(
    session: ApiSession,
    request: ApiDeleteEventRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateEventUser(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Submit an event for processing in the server's registered runtime custom events handler. */
  async emitEvent(session: ApiSession, request: ApiEvent): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.event(request).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  /** Fetch the current user's account. */
  async getAccount(session: ApiSession): Promise<ApiAccount> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.getAccount(session.token);
  }

  /** Kick a set of users from a clan. */
  async removeClanUsers(
    session: ApiSession,
    clanId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.removeClanUsers(clanId, ids).then((response: any) => {
      return Promise.resolve(response != undefined);
    });
  }

  async listBannedUsers(
    session: ApiSession,
    clanId?: string,
    channelId?: string,
  ): Promise<ApiBannedUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listBannedUsers(clanId, channelId)
      .then((response: ApiBannedUserList) => {
        return Promise.resolve(response);
      });
  }

  /** Ban a set of users from a clan. */
  async unbanClanUsers(
    session: ApiSession,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .unbanClanUsers(clanId, channelId, userIds)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Ban a set of users from a clan. */
  async banClanUsers(
    session: ApiSession,
    clanId: string,
    channelId?: string,
    userIds?: Array<string>,
    banTime?: number,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .banClanUsers(clanId, channelId, userIds, banTime)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** Kick users from a channel, or decline their join requests. */
  async removeChannelUsers(
    session: ApiSession,
    channelId: string,
    ids?: Array<string>,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .removeChannelUsers(channelId, ids)
      .then((response: any) => {
        return Promise.resolve(response != undefined);
      });
  }

  /** List a channel's message history. */
  async listChannelMessages(
    session: ApiSession,
    clanId: string,
    channelId: string,
    messageId?: string,
    direction?: number,
    limit?: number,
    topicId?: string,
  ): Promise<ChannelMessageList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelMessages(
        clanId,
        channelId,
        messageId,
        direction,
        limit,
        topicId,
      )
      .then((response: ApiChannelMessageList) => {
        const result: ChannelMessageList = {
          messages: [],
          last_seen_message: response.last_seen_message,
          last_sent_message: response.last_sent_message,
        };

        if (response.messages == null) {
          return Promise.resolve(result);
        }
        response.messages!.forEach((m) => {
          let content, reactions, mentions, attachments, references;
          try {
            content = safeJSONParse(m.content);
          } catch (e) {
            console.log("error parse content", e);
          }
          try {
            const decodedReactions = decodeReactions(m.reactions);
            reactions =
              decodedReactions?.reactions ||
              decodedReactions ||
              safeJSONParse(m.reactions || "[]");
          } catch (e) {
            reactions = safeJSONParse(m.reactions || "[]");
          }

          try {
            const decodedMentions = decodeMentions(m.mentions);
            mentions =
              decodedMentions?.mentions ||
              decodedMentions ||
              safeJSONParse(m.mentions || "[]");
          } catch (e) {
            mentions = safeJSONParse(m.mentions || "[]");
          }

          try {
            const decodedAttachments = decodeAttachments(m.attachments);
            attachments =
              decodedAttachments?.attachments ||
              decodedAttachments ||
              safeJSONParse(m.attachments || "[]");
          } catch (e) {
            attachments = safeJSONParse(m.attachments || "[]");
          }

          try {
            const decodedReferences = decodeRefs(m.references);
            references =
              decodedReferences?.refs ||
              decodedReferences ||
              safeJSONParse(m.references || "[]");
          } catch (e) {
            references = safeJSONParse(m.references || "[]");
          }

          result.messages!.push({
            channel_id: m.channel_id,
            code: m.code ? Number(m.code) : 0,
            id: m.message_id || "",
            sender_id: m.sender_id,
            username: m.username,
            display_name: m.display_name,
            avatar: m.avatar,
            content: content,
            channel_label: m.channel_label,
            clan_logo: m.clan_logo,
            category_name: m.category_name,
            clan_nick: m.clan_nick,
            clan_avatar: m.clan_avatar,
            attachments: attachments,
            mentions: mentions,
            reactions: reactions,
            references: references,
            clan_id: m.clan_id,
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
    session: ApiSession,
    clanId: string,
    limit?: number,
  ): Promise<ApiVoiceChannelUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelVoiceUsers(clanId, limit)
      .then((response: ApiVoiceChannelUserList) => {
        const result: ApiVoiceChannelUserList = {
          voice_channel_users: [],
        };

        if (response.voice_channel_users == null) {
          return Promise.resolve(result);
        }

        response.voice_channel_users!.forEach((gu) => {
          result.voice_channel_users!.push({
            id: gu.id,
            channel_id: gu.channel_id,
            user_ids: gu.user_ids,
            participant: gu.participant,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's users. */
  async listChannelUsers(
    session: ApiSession,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<ApiChannelUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelUsers(clanId, channelId, channelType, limit, state, cursor)
      .then((response: ApiChannelUserList) => {
        const result: ApiChannelUserList = {
          channel_users: [],
          cursor: response.cursor,
          channel_id: response.channel_id,
        };

        if (response.channel_users == null) {
          return Promise.resolve(result);
        }

        response.channel_users!.forEach((gu) => {
          result.channel_users!.push({
            user_id: gu.user_id,
            role_id: gu!.role_id,
            thread_id: gu.thread_id,
            clan_avatar: gu.clan_avatar,
            clan_nick: gu.clan_nick,
            id: gu.id,
            clan_id: gu.clan_id,
            added_by: gu.added_by,
            is_banned: gu.is_banned,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's attachment. */
  async listChannelAttachments(
    session: ApiSession,
    clanId: string,
    channelId: string,
    fileType: string,
    state?: number,
    limit?: number,
    before?: number,
    after?: number,
  ): Promise<ApiChannelAttachmentList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelAttachment(
        channelId,
        clanId,
        fileType,
        limit,
        state,
        before,
        after,
      )
      .then((response: ApiChannelAttachmentList) => {
        const result: ApiChannelAttachmentList = {
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
            id: at.id,
            uploader: at.uploader,
            url: at.url,
            message_id: at.message_id,
            create_time_seconds: at.create_time_seconds,
            width: at.width,
            height: at.height,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List a channel's users. */
  async listClanUsers(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiClanUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listClanUsers(clanId)
      .then((response: ApiClanUserList) => {
        const result: ApiClanUserList = {
          clan_users: [],
          cursor: response.cursor,
          clan_id: response.clan_id,
        };

        if (response.clan_users == null) {
          return Promise.resolve(result);
        }

        response.clan_users!.forEach((gu) => {
          result.clan_users!.push({
            user: {
              avatar_url: gu.user!.avatar_url,
              create_time_seconds: gu.user!.create_time_seconds,
              display_name: gu.user!.display_name,
              edge_count: gu.user!.edge_count ? Number(gu.user!.edge_count) : 0,
              id: gu.user!.id,
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
              mezon_id: gu.user!.mezon_id,
              list_nick_names: gu.user!.list_nick_names,
              phone_number: gu.user!.phone_number,
              join_time_seconds: gu.user!.join_time_seconds,
            },
            role_id: gu!.role_id,
            clan_nick: gu!.clan_nick,
            clan_avatar: gu!.clan_avatar,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** List clan members' custom status strings (user_status). */
  async listClanUsersStatus(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiClanUserStatusList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listClanUsersStatus(clanId)
      .then((response: ApiClanUserStatusList) => {
        const result: ApiClanUserStatusList = {
          clan_user_statuses: [],
        };
        if (response.clan_user_statuses == null) {
          return Promise.resolve(result);
        }
        response.clan_user_statuses.forEach((e) => {
          result.clan_user_statuses!.push({
            user_id: e.user_id,
            user_status: e.user_status,
          });
        });
        return Promise.resolve(result);
      });
  }

  async listChannelDetail(
    session: ApiSession,
    channelId: string,
  ): Promise<ApiChannelDescription> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelDetail(channelId)
      .then((response: ApiChannelDescription) => {
        return Promise.resolve(response);
      });
  }

  /** List channels. */
  async listChannelDescs(
    session: ApiSession,
    limit?: number,
    state?: number,
    page?: number,
    clanId?: string,
    channelType?: number,
    isMobile?: boolean,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelDescs(limit, state, page, clanId, channelType, isMobile)
      .then((response: ApiChannelDescList) => {
        const result: ApiChannelDescList = {
          channeldesc: [],
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          cacheable_cursor: response.cacheable_cursor,
        };

        if (response.channeldesc == null) {
          return Promise.resolve(result);
        }

        result.channeldesc = response.channeldesc;
        return Promise.resolve(result);
      });
  }

  /** List clans */
  async listClanDescs(
    session: ApiSession,
    limit?: number,
    state?: number,
    cursor?: string,
  ): Promise<ApiClanDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listClanDescs(limit, state, cursor)
      .then((response: ApiClanDescList) => {
        const result: ApiClanDescList = {
          clandesc: [],
        };

        if (response.clandesc == null) {
          return Promise.resolve(result);
        }

        result.clandesc = response.clandesc;
        return Promise.resolve(result);
      });
  }

  async listClanBadgeCount(
    session: ApiSession
  ): Promise<ApiListClanBadgeCountResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listClanBadgeCount()
      .then((response: ApiListClanBadgeCountResponse) => ({
        list_badge: response.list_badge ?? [],
      }));
  }

  /** Paged channel badge/unread list (HTTP). */
  async listChannelBadgeCount(
    session: ApiSession,
    clanId: string,
    limit?: number,
    page?: number,
  ): Promise<ApiListChannelBadgeCountResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelBadgeCount(clanId, limit, page)
      .then((response: ApiListChannelBadgeCountResponse) => ({
        channeldesc: response.channeldesc ?? [],
        total_count: response.total_count,
      }));
  }

  /** Paged online users in a clan (HTTP). */
  async listUserOnline(
    session: ApiSession,
    clanId: string,
    limit?: number,
    page?: number,
  ): Promise<ApiListUserOnlineResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listUserOnline(clanId, limit, page)
      .then((response: ApiListUserOnlineResponse) => ({
        users: response.users ?? [],
        total_count: response.total_count,
      }));
  }

  /** List categories. */
  async listCategoryDescs(
    session: ApiSession,
    clanId: string,
    creatorId?: string,
    categoryName?: string,
  ): Promise<ApiCategoryDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listCategoryDescs(clanId, creatorId, categoryName)
      .then((response: ApiCategoryDescList) => {
        const result: ApiCategoryDescList = {
          categorydesc: [],
        };

        if (response.categorydesc == null) {
          return Promise.resolve(result);
        }

        result.categorydesc = response.categorydesc;
        return Promise.resolve(result);
      });
  }

  /** List event */
  async listEvents(
    session: ApiSession,
    clanId?: string,
  ): Promise<ApiEventList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.listEvents(clanId).then((response: ApiEventList) => {
      return Promise.resolve(response);
    });
  }

  /** List permission */
  async getListPermission(session: ApiSession): Promise<ApiPermissionList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getListPermission(session.token)
      .then((response: ApiPermissionList) => {
        return Promise.resolve(response);
      });
  }

  /** List user roles */
  async listRolePermissions(
    session: ApiSession,
    roleId: string,
  ): Promise<ApiPermissionList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listRolePermissions(roleId)
      .then((response: ApiPermissionList) => {
        return Promise.resolve(response);
      });
  }

  /** List user roles */
  async listRoleUsers(
    session: ApiSession,
    roleId: string,
    limit?: number,
    cursor?: string,
  ): Promise<ApiRoleUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listRoleUsers(roleId, limit, cursor)
      .then((response: ApiRoleUserList) => {
        return Promise.resolve(response);
      });
  }

  async registFCMDeviceToken(
    session: ApiSession,
    tokenId: string,
    deviceId: string,
    platform: string,
    voipToken?: string,
  ): Promise<ApiRegistFcmDeviceTokenResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .registFCMDeviceToken(tokenId, deviceId, platform, voipToken)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getUserProfileOnClan(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiClanProfile> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getUserProfileOnClan(clanId)
      .then((response: ApiClanProfile) => {
        return Promise.resolve(response);
      });
  }

  //
  async closeDirectMess(
    session: ApiSession,
    request: ApiDeleteChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.closeDirectMess(request).then((response: any) => {
      return response !== undefined;
    });
  }
  //
  async openDirectMess(
    session: ApiSession,
    request: ApiDeleteChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.openDirectMess(request).then((response: any) => {
      return response !== undefined;
    });
  }

  async confirmLinkMezonOTP(
    session: ApiSession,
    request: ApiLinkAccountConfirmRequest,
  ): Promise<ApiSession> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.confirmLinkMezonOTP(request);
  }

  /** Add a custom ID to the social profiles on the current user's account. */
  async linkSMS(
    session: ApiSession,
    request: ApiLinkAccountMezon,
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .linkSMS(request)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  /** Add an email+password to the social profiles on the current user's account. */
  async linkEmail(
    session: ApiSession,
    request: ApiAccountEmail,
  ): Promise<ApiLinkAccountConfirmRequest> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .linkEmail(request)
      .then((response: ApiLinkAccountConfirmRequest) => {
        return Promise.resolve(response);
      });
  }

  /** List all friends for the current user. */
  async listFriends(
    session: ApiSession,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<Friends> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listFriends(limit, state, cursor)
      .then((response: ApiFriendList) => {
        const result: Friends = {
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
              create_time_seconds: f.user!.create_time_seconds,
              display_name: f.user!.display_name,
              edge_count: f.user!.edge_count ? Number(f.user!.edge_count) : 0,
              id: f.user!.id,
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
    session: ApiSession,
    clanId: string,
    limit?: number,
    notificationId?: string,
    category?: number,
    direction?: number,
  ): Promise<ApiNotificationList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listNotifications(limit, clanId, notificationId, category, direction)
      .then((response: ApiNotificationList) => {
        const result: ApiNotificationList = {
          cacheable_cursor: response.cacheable_cursor,
          notifications: [],
        };

        if (response.notifications == null) {
          return Promise.resolve(result);
        }

        response.notifications!.forEach((n) => {
          result.notifications!.push({
            id: n.id,
            subject: n.subject,
            content: n.content ? decodeNotificationFcm(n.content) : undefined,
            code: n.code ? Number(n.code) : 0,
            sender_id: n.sender_id,
            create_time_seconds: n.create_time_seconds,
            persistent: n.persistent,
            category: n.category,
          });
        });
        return Promise.resolve(result);
      });
  }

  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  async sessionLogout(
    session: ApiSession,
    token: string,
    refreshToken: string,
    deviceId: string,
    platform: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .sessionLogout({
        refresh_token: refreshToken,
        token: token,
        device_id: deviceId,
        platform: platform,
      })
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Remove an email+password from the social profiles on the current user's account. */
  async unlinkEmail(
    session: ApiSession,
    request: ApiAccountEmail,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.unlinkEmail(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in the current user's account. */
  async updateUsername(
    session: ApiSession,
    request: ApiUpdateUsernameRequest,
  ): Promise<ApiSession> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateUsername(request)
      .then((response: ApiSession) => {
        return Promise.resolve(response);
      });
  }

  /** Update fields in the current user's account. */
  async updateAccount(
    session: ApiSession,
    request: ApiUpdateAccountRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateAccount(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given channel */
  async updateChannelDesc(
    session: ApiSession,
    channelId: string,
    request: ApiUpdateChannelDescRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateChannelDesc(channelId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given clan. */
  async updateClanDesc(
    session: ApiSession,
    clanId: string,
    request: MezonUpdateClanDescBody,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateClanDesc(clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given category. */
  async updateCategory(
    session: ApiSession,
    clanId: string,
    request: ApiUpdateCategoryDescRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateCategory(clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateUserProfileByClan(
    session: ApiSession,
    clanId: string,
    request: ApiUpdateClanProfileRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateUserProfileByClan(clanId, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Update fields in a given role. */
  async updateRole(
    session: ApiSession,
    roleId: string,
    request: ApiUpdateRoleRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateRole(roleId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given event. */
  async updateEvent(
    session: ApiSession,
    roleId: string,
    request: MezonUpdateEventBody,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateEvent(roleId, request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update fields in a given event. */
  async updateApp(
    session: ApiSession,
    roleId: string,
    request: MezonUpdateAppBody,
  ): Promise<ApiApp> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateApp(roleId, request)
      .then((response: ApiApp) => {
        return Promise.resolve(response);
      });
  }

  /** Update fields in a given clan profile. */
  async createLinkInviteUser(
    session: ApiSession,
    request: ApiLinkInviteUserRequest,
  ): Promise<ApiLinkInviteUser> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createLinkInviteUser(request)
      .then((response: ApiLinkInviteUser) => {
        return Promise.resolve(response);
      });
  }

  /** Get link invite user */
  async getLinkInvite(inviteId: string): Promise<ApiInviteUserRes> {
    return this.transport
      .getLinkInvite(this.serverkey, "", inviteId)
      .then((response: ApiInviteUserRes) => {
        return Promise.resolve(response);
      });
  }

  /** Get permission of user in the clan */
  async GetRoleOfUserInTheClan(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiRoleList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getRoleOfUserInTheClan(clanId)
      .then((response: ApiRoleList) => {
        return Promise.resolve(response);
      });
  }

  /** invite user */
  async inviteUser(
    session: ApiSession,
    inviteId: string,
  ): Promise<ApiInviteUserRes> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .inviteUser(inviteId)
      .then((response: ApiInviteUserRes) => {
        return Promise.resolve(response);
      });
  }

  /** Set default notification clan*/
  async setNotificationClan(
    session: ApiSession,
    request: ApiSetDefaultNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setNotificationClanSetting(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set notification channel*/
  async setNotificationChannel(
    session: ApiSession,
    request: ApiSetNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setNotificationChannelSetting(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set notification category*/
  async setMuteCategory(
    session: ApiSession,
    request: ApiSetMuteRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.setMuteCategory(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Set notification channel*/
  async setMuteChannel(
    session: ApiSession,
    request: ApiSetMuteRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.setMuteChannel(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** update channel private*/
  async updateChannelPrivate(
    session: ApiSession,
    request: ApiChangeChannelPrivateRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateChannelPrivate(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** Set default notification category*/
  async setNotificationCategory(
    session: ApiSession,
    request: ApiSetNotificationRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setNotificationCategorySetting(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteNotificationCategory(
    session: ApiSession,
    category_id: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteNotificationCategorySetting(category_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteNotificationChannel(
    session: ApiSession,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteNotificationChannel(channel_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** */
  async setNotificationReactMessage(
    session: ApiSession,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setNotificationReactMessage({ channel_id })
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //** */
  async deleteNotiReactMessage(
    session: ApiSession,
    channel_id: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteNotiReactMessage(channel_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** query message in elasticsearch */
  async searchMessage(
    session: ApiSession,
    request: ApiSearchMessageRequest,
  ): Promise<ApiSearchMessageResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .searchMessage(request)
      .then((response: ApiSearchMessageResponse) => {
        return Promise.resolve(response);
      });
  }

  /** */
  async createMessage2Inbox(
    session: ApiSession,
    request: ApiMessage2InboxRequest,
  ): Promise<ApiChannelMessageHeader> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createMessage2Inbox(request)
      .then((response: ApiChannelMessageHeader) => {
        return Promise.resolve(response);
      });
  }

  /** */
  async createPinMessage(
    session: ApiSession,
    request: ApiPinMessageRequest,
  ): Promise<ApiChannelMessageHeader> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createPinMessage(request)
      .then((response: ApiChannelMessageHeader) => {
        return Promise.resolve(response);
      });
  }

  async pinMessagesList(
    session: ApiSession,
    messageId: string,
    channelId: string,
    clanId: string,
  ): Promise<ApiPinMessagesList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getPinMessagesList(messageId, channelId, clanId)
      .then((response) => {
        const result: ApiPinMessagesList = {
          pin_messages_list: [],
        };

        if (response.pin_messages_list == null) {
          return Promise.resolve(result);
        }

        response.pin_messages_list!.forEach((p) => {
          result.pin_messages_list!.push({
            id: p.id,
            avatar: p.avatar,
            channel_id: p.channel_id,
            content: p.content,
            create_time_seconds: p.create_time_seconds,
            message_id: p.message_id,
            sender_id: p.sender_id,
            username: p.username,
            attachment: p.attachment,
          });
        });
        return Promise.resolve(result);
      });
  }

  //** */
  async deletePinMessage(
    session: ApiSession,
    id?: string,
    messageId?: string,
    channelId?: string,
    clanId?: string,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deletePinMessage(id, messageId, channelId, clanId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** create clan emoji */
  async createClanEmoji(
    session: ApiSession,
    request: ApiClanEmojiCreateRequest,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.createClanEmoji(request).then((response: any) => {
      return response !== undefined;
    });
  }

  //**update clan emoji by id */
  async updateClanEmojiById(
    session: ApiSession,
    id: string,
    request: MezonUpdateClanEmojiByIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateClanEmojiById(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**delete clan emoji by id */
  async deleteByIdClanEmoji(
    session: ApiSession,
    id: string,
    clan_id: string,
    emojiLabel?: string,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteClanEmojiById(id, clan_id, emojiLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**create webhook for chaneel */
  async generateWebhookLink(
    session: ApiSession,
    request: ApiWebhookCreateRequest,
  ): Promise<ApiWebhookGenerateResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.generateWebhook(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  //**list webhook belong to the channel */
  async listWebhookByChannelId(
    session: ApiSession,
    channel_id: string,
    clan_id: string,
  ): Promise<ApiWebhookListResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listWebhookByChannelId(channel_id, clan_id)
      .then((response: ApiWebhookListResponse) => {
        return Promise.resolve(response);
      });
  }

  //**update webhook name by id */
  async updateWebhookById(
    session: ApiSession,
    id: string,
    request: MezonUpdateWebhookByIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateWebhookById(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**disabled webhook by id */
  async deleteWebhookById(
    session: ApiSession,
    id: string,
    request: MezonDeleteWebhookByIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteWebhookById(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**Add a new sticker */
  async addClanSticker(session: ApiSession, request: ApiClanStickerAddRequest) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.addClanSticker(request).then((response: any) => {
      return response !== undefined;
    });
  }

  //**Delete a sticker by ID*/
  async deleteClanStickerById(
    session: ApiSession,
    id: string,
    clan_id: string,
    stickerLabel?: string,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteClanStickerById(id, clan_id, stickerLabel)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**Update a sticker by ID*/
  async updateClanStickerById(
    session: ApiSession,
    id: string,
    request: MezonUpdateClanStickerByIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateClanStickerById(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //** update the category of a channel */
  async changeChannelCategory(
    session: ApiSession,
    id: string,
    request: MezonChangeChannelCategoryBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .changeChannelCategory(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  /** */
  async setRoleChannelPermission(
    session: ApiSession,
    request: ApiUpdateRoleChannelRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setRoleChannelPermission(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addApp(
    session: ApiSession,
    request: ApiAddAppRequest,
  ): Promise<ApiApp> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.addApp(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async getApp(session: ApiSession, id: string): Promise<ApiApp> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.getApp(id).then((response: ApiApp) => {
      return Promise.resolve(response);
    });
  }

  async listApps(session: ApiSession): Promise<ApiAppList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listApps(session.token)
      .then((response: ApiAppList) => {
        return Promise.resolve(response);
      });
  }

  async addAppToClan(session: ApiSession, appId: string, clanId: string) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .addAppToClan(appId, clanId)
      .then((response: ApiAppList) => {
        return response !== undefined;
      });
  }

  async getSystemMessagesList(
    session: ApiSession,
  ): Promise<ApiSystemMessagesList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getSystemMessagesList(session.token)
      .then((response: ApiSystemMessagesList) => {
        return Promise.resolve(response);
      });
  }

  async getSystemMessageByClanId(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiSystemMessage> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getSystemMessageByClanId(clanId)
      .then((response: ApiSystemMessage) => {
        return Promise.resolve(response);
      });
  }

  async createSystemMessage(
    session: ApiSession,
    request: ApiSystemMessageRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.createSystemMessage(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async updateSystemMessage(
    session: ApiSession,
    clanId: string,
    request: MezonUpdateSystemMessageBody,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateSystemMessage(clanId, request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async deleteSystemMessage(session: ApiSession, clanId: string): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.deleteSystemMessage(clanId).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async updateCategoryOrder(
    session: ApiSession,
    request: ApiUpdateCategoryOrderRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateCategoryOrder(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async givecoffee(
    session: ApiSession,
    request: ApiGiveCoffeeEvent,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.giveMeACoffee(request).then((response: any) => {
      return response !== undefined;
    });
  }

  async sendToken(
    session: ApiSession,
    request: ApiTokenSentEvent,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.sendToken(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** List a channel's users. */
  async listStreamingChannelUsers(
    session: ApiSession,
    clanId: string,
    channelId: string,
    channelType: number,
    state?: number,
    limit?: number,
    cursor?: string,
  ): Promise<ApiStreamingChannelUserList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listStreamingChannelUsers(
        clanId,
        channelId,
        channelType,
        limit,
        state,
        cursor,
      )
      .then((response: ApiStreamingChannelUserList) => {
        const result: ApiStreamingChannelUserList = {
          streaming_channel_users: [],
        };

        if (response.streaming_channel_users == null) {
          return Promise.resolve(result);
        }

        response.streaming_channel_users!.forEach((gu) => {
          result.streaming_channel_users!.push({
            id: gu.id,
            channel_id: gu.channel_id,
            user_id: gu.user_id,
            participant: gu.participant,
          });
        });
        return Promise.resolve(result);
      });
  }

  async registerStreamingChannel(
    session: ApiSession,
    request: ApiRegisterStreamingChannelRequest,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .registerStreamingChannel(request)
      .then((response: ApiRegisterStreamingChannelResponse) => {
        return response !== undefined;
      });
  }

  /** List a channel's users. */
  async listChannelApps(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiListChannelAppsResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelApps(clanId)
      .then((response: ApiListChannelAppsResponse) => {
        const result: ApiListChannelAppsResponse = {
          channel_apps: [],
        };

        if (response.channel_apps == null) {
          return Promise.resolve(result);
        }

        response.channel_apps!.forEach((gu) => {
          result.channel_apps!.push({
            id: gu.id,
            channel_id: gu.channel_id,
            app_id: gu.app_id,
            clan_id: gu.clan_id,
            app_url: gu.app_url,
            app_name: gu.app_name,
            app_logo: gu.app_logo,
          });
        });
        return Promise.resolve(result);
      });
  }

  async getChannelCategoryNotiSettingsList(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiNotificationChannelCategorySettingList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getChannelCategoryNotiSettingsList(clanId)
      .then((response: ApiNotificationChannelCategorySettingList) => {
        return Promise.resolve(response);
      });
  }

  async getNotificationCategory(
    session: ApiSession,
    categoryId: string,
  ): Promise<ApiNotificationUserChannel> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getNotificationCategory(categoryId)
      .then((response: ApiNotificationUserChannel) => {
        return Promise.resolve(response);
      });
  }

  async getNotificationChannel(
    session: ApiSession,
    channelId: string,
  ): Promise<ApiNotificationUserChannel> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getNotificationChannel(channelId)
      .then((response: ApiNotificationUserChannel) => {
        return Promise.resolve(response);
      });
  }

  async getNotificationClan(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiNotificationSetting> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getNotificationClan(clanId)
      .then((response: ApiNotificationSetting) => {
        return Promise.resolve(response);
      });
  }

  async getNotificationReactMessage(
    session: ApiSession,
    channelId: string,
  ): Promise<ApiNotifiReactMessage> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getNotificationReactMessage(channelId)
      .then((response: ApiNotifiReactMessage) => {
        return Promise.resolve(response);
      });
  }

  async listChannelByUserId(session: ApiSession): Promise<ApiChannelDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelByUserId(session.token)
      .then((response: ApiChannelDescList) => {
        return Promise.resolve(response);
      });
  }

  async listChannelUsersUC(
    session: ApiSession,
    channel_id: string,
    limit: number,
  ): Promise<ApiAllUsersAddChannelResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelUsersUC(channel_id, limit)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getListEmojisByUserId(
    session: ApiSession,
  ): Promise<ApiEmojiListedResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getListEmojisByUserId(session.token)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async emojiRecentList(session: ApiSession): Promise<ApiEmojiRecentList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .emojiRecentList(session.token)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getListStickersByUserId(
    session: ApiSession,
  ): Promise<ApiStickerListedResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getListStickersByUserId(session.token)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async listUserClansByUserId(session: ApiSession): Promise<ApiAllUserClans> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listUserClansByUserId(session.token)
      .then((response: ApiAllUserClans) => {
        return Promise.resolve(response);
      });
  }

  async listRoles(
    session: ApiSession,
    clanId?: string,
    limit?: number,
    state?: number,
    cursor?: string,
  ): Promise<ApiRoleListEventResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listRoles(clanId, limit, state, cursor)
      .then((response: ApiRoleListEventResponse) => {
        const result: ApiRoleListEventResponse = {
          clan_id: clanId,
          roles: response.roles,
        };

        return Promise.resolve(result);
      });
  }

  async listUserPermissionInChannel(
    session: ApiSession,
    clanId?: string,
    channelId?: string,
  ): Promise<ApiUserPermissionInChannelListResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listUserPermissionInChannel(clanId, channelId)
      .then((response: ApiUserPermissionInChannelListResponse) => {
        const result: ApiUserPermissionInChannelListResponse = {
          clan_id: clanId,
          channel_id: channelId,
          permissions: response.permissions,
        };

        return Promise.resolve(result);
      });
  }

  async getPermissionByRoleIdChannelId(
    session: ApiSession,
    roleId?: string,
    channelId?: string,
    userId?: string,
  ): Promise<ApiPermissionRoleChannelListEventResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getPermissionByRoleIdChannelId(roleId, channelId, userId)
      .then((response: ApiPermissionRoleChannelListEventResponse) => {
        const result: ApiPermissionRoleChannelListEventResponse = {
          role_id: roleId,
          channel_id: channelId,
          permission_role_channel: response.permission_role_channel,
          user_id: userId,
        };

        return Promise.resolve(result);
      });
  }

  async markAsRead(
    session: ApiSession,
    request: ApiMarkAsReadRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.markAsRead(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  /** List Threads. */
  async listThreadDescs(
    session: ApiSession,
    channelId: string,
    limit?: number,
    state?: number,
    clanId?: string,
    threadId?: string,
    page?: number,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listThreadDescs(channelId, limit, state, clanId, threadId, page)
      .then((response: ApiChannelDescList) => {
        const result: ApiChannelDescList = {
          channeldesc: [],
        };

        if (response.channeldesc == null) {
          return Promise.resolve(result);
        }

        result.channeldesc = response.channeldesc;
        return Promise.resolve(result);
      });
  }

  async listChannelTimeline(
    session: ApiSession,
    request: ApiListChannelTimelineRequest,
  ): Promise<ApiListChannelTimelineResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelTimeline(request)
      .then((response: ApiListChannelTimelineResponse) => {
        response.events?.forEach((event) => {
          event.attachments = [];
          let previewImgs;
          try {
            const decodedAttachments = decodeChannelTimelineAttachments(
              event.preview_imgs,
            );
            previewImgs =
              decodedAttachments?.attachments ||
              decodedAttachments ||
              safeJSONParse(event.preview_imgs || "[]");
          } catch (e) {
            previewImgs = safeJSONParse(event.preview_imgs || "[]");
          }
          if (Array.isArray(previewImgs)) {
            event.preview_imgs = previewImgs;
          } else {
            event.preview_imgs = [];
          }
        });
        return Promise.resolve(response);
      });
  }

  async createChannelTimeline(
    session: ApiSession,
    request: ApiCreateChannelTimelineRequest,
  ): Promise<ApiCreateChannelTimelineResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createChannelTimeline(request)
      .then((response: ApiCreateChannelTimelineResponse) => {
        const event = response.event;
        if (event) {
          let attachments;
          let previewImgs;
          try {
            const decodedAttachments = decodeChannelTimelineAttachments(
              event.attachments,
            );
            const decodedPreviewImgs = decodeChannelTimelineAttachments(
              event.preview_imgs,
            );
            attachments =
              decodedAttachments?.attachments ||
              decodedAttachments ||
              safeJSONParse(event.attachments || "[]");
            previewImgs =
              decodedPreviewImgs?.attachments ||
              decodedPreviewImgs ||
              safeJSONParse(event.preview_imgs || "[]");
          } catch (e) {
            attachments = safeJSONParse(event.attachments || "[]");
            previewImgs = safeJSONParse(event.preview_imgs || "[]");
          }
          if (Array.isArray(attachments)) {
            event.attachments = attachments;
          } else {
            event.attachments = [];
          }
          if (Array.isArray(previewImgs)) {
            event.preview_imgs = previewImgs;
          } else {
            event.preview_imgs = [];
          }
        }
        return Promise.resolve(response);
      });
  }

  async updateChannelTimeline(
    session: ApiSession,
    request: ApiUpdateChannelTimelineRequest,
  ): Promise<ApiUpdateChannelTimelineResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateChannelTimeline(request)
      .then((response: ApiUpdateChannelTimelineResponse) => {
        const event = response.event;
        if (event) {
          let attachments;
          let previewImgs;
          try {
            const decodedAttachments = decodeChannelTimelineAttachments(
              event.attachments,
            );
            const decodedPreviewImgs = decodeChannelTimelineAttachments(
              event.preview_imgs,
            );
            attachments =
              decodedAttachments?.attachments ||
              decodedAttachments ||
              safeJSONParse(event.attachments || "[]");
            previewImgs =
              decodedPreviewImgs?.attachments ||
              decodedPreviewImgs ||
              safeJSONParse(event.preview_imgs || "[]");
          } catch (e) {
            attachments = safeJSONParse(event.attachments || "[]");
            previewImgs = safeJSONParse(event.preview_imgs || "[]");
          }
          if (Array.isArray(attachments)) {
            event.attachments = attachments;
          } else {
            event.attachments = [];
          }
          if (Array.isArray(previewImgs)) {
            event.preview_imgs = previewImgs;
          } else {
            event.preview_imgs = [];
          }
        }
        return Promise.resolve(response);
      });
  }

  async detailChannelTimeline(
    session: ApiSession,
    request: ApiDetailChannelTimelineRequest,
  ): Promise<ApiDetailChannelTimelineResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .detailChannelTimeline(request)
      .then((response: ApiDetailChannelTimelineResponse) => {
        const event = response.event;
        if (event) {
          let attachments;
          let previewImgs;
          try {
            const decodedAttachments = decodeChannelTimelineAttachments(
              event.attachments,
            );
            const decodedPreviewImgs = decodeChannelTimelineAttachments(
              event.preview_imgs,
            );
            attachments =
              decodedAttachments?.attachments ||
              decodedAttachments ||
              safeJSONParse(event.attachments || "[]");
            previewImgs =
              decodedPreviewImgs?.attachments ||
              decodedPreviewImgs ||
              safeJSONParse(event.preview_imgs || "[]");
          } catch (e) {
            attachments = safeJSONParse(event.attachments || "[]");
            previewImgs = safeJSONParse(event.preview_imgs || "[]");
          }
          if (Array.isArray(attachments)) {
            event.attachments = attachments;
          } else {
            event.attachments = [];
          }
          if (Array.isArray(previewImgs)) {
            event.preview_imgs = previewImgs;
          } else {
            event.preview_imgs = [];
          }
        }
        return Promise.resolve(response);
      });
  }

  async leaveThread(
    session: ApiSession,
    clanId: string,
    channelId: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .leaveThread(clanId, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** Archive a single channel/thread (active = 0). */
  async archiveChannel(
    session: ApiSession,
    clanId: string,
    channelId: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .archiveChannel(clanId, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** List archived top-level channels in a clan. */
  async listArchivedChannelDescs(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listArchivedChannelDescs(clanId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getChannelSettingInClan(
    session: ApiSession,
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
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listChannelSetting(
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
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async getChannelCanvasList(
    session: ApiSession,
    channelId: string,
    clanId?: string,
    limit?: number,
    page?: number,
  ): Promise<ApiChannelCanvasListResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getChannelCanvasList(channelId, clanId, limit, page)
      .then((response: ApiChannelCanvasListResponse) => {
        const result: ApiChannelCanvasListResponse = {
          channel_canvases: [],
        };

        if (response.channel_canvases == null) {
          return Promise.resolve(result);
        }

        result.clan_id = response.clan_id;
        result.channel_id = response.channel_id;
        result.channel_canvases = response.channel_canvases;
        result.count = response.count;
        return Promise.resolve(result);
      });
  }

  async getChannelCanvasDetail(
    session: ApiSession,
    id: string,
    clanId?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getChannelCanvasDetail(id, clanId, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async editChannelCanvases(
    session: ApiSession,
    request: ApiEditChannelCanvasRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.editChannelCanvases(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  //** */
  async deleteChannelCanvas(
    session: ApiSession,
    canvasId: string,
    clanId?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteChannelCanvas(canvasId, clanId, channelId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addFavoriteChannel(
    session: ApiSession,
    channelId: string,
    clanId: string,
  ): Promise<ApiAddFavoriteChannelResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .addChannelFavorite({
        channel_id: channelId,
        clan_id: clanId,
      })
      .then((response: ApiAddFavoriteChannelResponse) => {
        return response;
      });
  }

  async removeFavoriteChannel(
    session: ApiSession,
    clanId: string,
    channelId: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .removeChannelFavorite(clanId, channelId)
      .then((response: any) => {
        return response;
      });
  }

  async getListFavoriteChannel(
    session: ApiSession,
    clanId: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getListFavoriteChannel(clanId)
      .then((response: any) => {
        return response;
      });
  }
  /** List activity */
  async listActivity(session: ApiSession): Promise<ApiListUserActivity> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.listActivity(session.token).then((response: any) => {
      return response;
    });
  }

  async createActiviy(
    session: ApiSession,
    request: ApiCreateActivityRequest,
  ): Promise<ApiUserActivity> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.createActiviy(request).then((response: any) => {
      return response;
    });
  }

  async createQRLogin(requet: ApiLoginRequest): Promise<ApiLoginIDResponse> {
    const apiSession = await this.transport.createQRLogin(
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
  ): Promise<ApiSession | null> {
    const apiSession = await this.transport.checkLoginRequest(
      this.serverkey,
      "",
      requet,
    );
    if (!apiSession?.token) {
      return null;
    }
    return {
      token: apiSession.token || "",
      refresh_token: apiSession.refresh_token || "",
      created: apiSession.created || false,
      api_url: apiSession.api_url || "",
      ws_url: apiSession.ws_url || "",
      id_token: apiSession.id_token || "",
      is_remember: apiSession.is_remember || false,
      session_id: apiSession.session_id || "",
    };
  }

  async confirmLogin(
    session: ApiSession,
    body: ApiConfirmLoginRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.confirmLogin(body).then((response: any) => {
      return response;
    });
  }

  async getChanEncryptionMethod(
    session: ApiSession,
    channelId: string,
  ): Promise<ApiChanEncryptionMethod> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getChanEncryptionMethod(channelId)
      .then((response: ApiChanEncryptionMethod) => {
        return response;
      });
  }

  async setChanEncryptionMethod(
    session: ApiSession,
    channelId: string,
    method: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .setChanEncryptionMethod(channelId, { method: method })
      .then((response: any) => {
        return response;
      });
  }

  async getPubKeys(
    session: ApiSession,
    userIds: Array<string>,
  ): Promise<ApiGetPubKeysResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getPubKeys(userIds)
      .then((response: ApiGetPubKeysResponse) => {
        return response;
      });
  }

  async pushPubKey(
    session: ApiSession,
    PK: ApiPubKey,
  ): Promise<ApiGetPubKeysResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .pushPubKey({ PK: PK })
      .then((response: ApiGetPubKeysResponse) => {
        return response;
      });
  }

  async getKeyServer(session: ApiSession): Promise<ApiGetKeyServerResp> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getKeyServer(session.token)
      .then((response: ApiGetKeyServerResp) => {
        return response;
      });
  }

  async listAuditLog(
    session: ApiSession,
    actionLog?: string,
    userId?: string,
    clanId?: string,
    date_log?: string,
  ): Promise<MezonapiListAuditLog> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listAuditLog(actionLog, userId, clanId, date_log)
      .then((response: MezonapiListAuditLog) => {
        return response;
      });
  }

  async listOnboarding(
    session: ApiSession,
    clanId?: string,
    guideType?: number,
    limit?: number,
    page?: number,
  ): Promise<ApiListOnboardingResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listOnboarding(clanId, guideType, limit, page)
      .then((response: ApiListOnboardingResponse) => {
        return response;
      });
  }

  async getOnboardingDetail(
    session: ApiSession,
    id: string,
    clanId?: string,
  ): Promise<ApiOnboardingItem> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getOnboardingDetail(id, clanId)
      .then((response: ApiOnboardingItem) => {
        return Promise.resolve(response);
      });
  }

  async createOnboarding(
    session: ApiSession,
    request: ApiCreateOnboardingRequest,
  ): Promise<ApiListOnboardingResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createOnboarding(request)
      .then((response: ApiListOnboardingResponse) => {
        return response;
      });
  }

  async updateOnboarding(
    session: ApiSession,
    id: string,
    request: MezonUpdateOnboardingBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateOnboarding(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async deleteOnboarding(
    session: ApiSession,
    id: string,
    clanId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.deleteOnboarding(id, clanId).then((response: any) => {
      return response !== undefined;
    });
  }

  //**create webhook for clan */
  async generateClanWebhook(
    session: ApiSession,
    request: ApiGenerateClanWebhookRequest,
  ): Promise<ApiGenerateClanWebhookResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.generateClanWebhook(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  //**list webhook belong to the clan */
  async listClanWebhook(
    session: ApiSession,
    clan_id: string,
  ): Promise<ApiListClanWebhookResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listClanWebhook(clan_id)
      .then((response: ApiListClanWebhookResponse) => {
        return Promise.resolve(response);
      });
  }

  //**disabled webhook by id */
  async deleteClanWebhookById(
    session: ApiSession,
    id: string,
    clan_id: string,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteClanWebhookById(id, clan_id)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**update webhook name by id */
  async updateClanWebhookById(
    session: ApiSession,
    id: string,
    request: MezonUpdateClanWebhookByIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateClanWebhookById(id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**list onboarding step */
  async listOnboardingStep(
    session: ApiSession,
    clan_id?: string,
    limit?: number,
    page?: number,
  ): Promise<ApiListOnboardingStepResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listOnboardingStep(clan_id, limit, page)
      .then((response: ApiListOnboardingStepResponse) => {
        return Promise.resolve(response);
      });
  }

  //**update onboarding step by id */
  async updateOnboardingStepByClanId(
    session: ApiSession,
    clan_id: string,
    request: MezonUpdateOnboardingStepByClanIdBody,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateOnboardingStepByClanId(clan_id, request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**update status */
  async updateUserStatus(session: ApiSession, request: ApiUserStatusUpdate) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateUserStatus(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Update user custom status (user_status). */
  async updateUserCustomStatus(
    session: ApiSession,
    request: ApiUserStatusUpdate,
  ) {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateUserCustomStatus(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  //**get user status */
  async getUserStatus(session: ApiSession): Promise<ApiUserStatus> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getUserStatus(session.token)
      .then((response: ApiUserStatus) => {
        return Promise.resolve(response);
      });
  }

  //**list sd topic */
  async listSdTopic(
    session: ApiSession,
    clanId?: string,
    limit?: number,
  ): Promise<ApiSdTopicList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listSdTopic(clanId, limit)
      .then((response: ApiSdTopicList) => {
        return Promise.resolve(response);
      });
  }

  //**post sd topic */
  async createSdTopic(
    session: ApiSession,
    request: ApiSdTopicRequest,
  ): Promise<ApiSdTopic> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createSdTopic(request)
      .then((response: ApiSdTopic) => {
        return response;
      });
  }

  //**list sd topic */
  async getTopicDetail(
    session: ApiSession,
    topicId?: string,
  ): Promise<ApiSdTopic> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getTopicDetail(topicId)
      .then((response: ApiSdTopic) => {
        return Promise.resolve(response);
      });
  }

  //**create room channel apps */
  async createRoomChannelApps(
    session: ApiSession,
    body: MezonapiCreateRoomChannelApps,
  ): Promise<MezonapiCreateRoomChannelApps> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createRoomChannelApps(body)
      .then((response: MezonapiCreateRoomChannelApps) => {
        return Promise.resolve(response);
      });
  }

  /** Generate Meet Token */
  async generateMeetToken(
    session: ApiSession,
    body: ApiGenerateMeetTokenRequest,
  ): Promise<ApiGenerateMeetTokenResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .generateMeetToken(body)
      .then((response: ApiGenerateMeetTokenResponse) => {
        return Promise.resolve(response);
      });
  }

  //**list webhook belong to the clan */
  async listMezonOauthClient(
    session: ApiSession,
  ): Promise<ApiMezonOauthClientList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listMezonOauthClient(session.token)
      .then((response: ApiMezonOauthClientList) => {
        return Promise.resolve(response);
      });
  }

  async getMezonOauthClient(
    session: ApiSession,
    clientId?: string,
    clientName?: string,
  ): Promise<ApiMezonOauthClient> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .getMezonOauthClient(clientId, clientName)
      .then((response: ApiMezonOauthClient) => {
        return Promise.resolve(response);
      });
  }

  async updateMezonOauthClient(
    session: ApiSession,
    body: ApiMezonOauthClient,
  ): Promise<ApiMezonOauthClient> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateMezonOauthClient(body)
      .then((response: ApiMezonOauthClient) => {
        return Promise.resolve(response);
      });
  }

  //**search thread */
  async searchThread(
    session: ApiSession,
    clanId?: string,
    channelId?: string,
    label?: string,
  ): Promise<ApiChannelDescList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .searchThread(clanId, channelId, label)
      .then((response: ApiChannelDescList) => {
        return Promise.resolve(response);
      });
  }

  //**Generate Hash */
  async generateHashChannelApps(
    session: ApiSession,
    appId?: string,
  ): Promise<ApiCreateHashChannelAppsResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .generateHashChannelApps(appId)
      .then((response: ApiCreateHashChannelAppsResponse) => {
        return Promise.resolve(response);
      });
  }

  async registrationPassword(
    session: ApiSession,
    email?: string,
    password?: string,
    oldPassword?: string,
  ): Promise<ApiSession> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .registrationEmail({
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
    session: ApiSession,
    request: ApiUserEventRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.addUserEvent(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** Delete user event */
  async deleteUserEvent(
    session: ApiSession,
    clanId?: string,
    eventId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteUserEvent(clanId, eventId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateRoleOrder(
    session: ApiSession,
    request: ApiUpdateRoleOrderRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateRoleOrder(request).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async deleteAccount(session: ApiSession): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.deleteAccount(session.token).then((response: any) => {
      return Promise.resolve(response);
    });
  }

  async createExternalMezonMeet(
    session: ApiSession,
  ): Promise<ApiGenerateMezonMeetResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .createExternalMezonMeet(session.token)
      .then((response: ApiGenerateMezonMeetResponse) => {
        return Promise.resolve(response);
      });
  }

  async generateMeetTokenExternal(
    token: string,
    username?: string,
    metadata?: string,
    isGuest?: boolean,
  ): Promise<ApiGenerateMeetTokenExternalResponse> {
    return this.transport
      .generateMeetTokenExternal(token, username, metadata, isGuest)
      .then((response: ApiGenerateMeetTokenExternalResponse) => {
        return Promise.resolve(response);
      });
  }

  async removeMezonMeetParticipant(
    session: ApiSession,
    request: ApiMeetParticipantRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .removeParticipantMezonMeet(request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async muteMezonMeetParticipant(
    session: ApiSession,
    request: ApiMeetParticipantRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .muteParticipantMezonMeet(request)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  /** Update clan order to view. */
  async updateClanOrder(
    session: ApiSession,
    request: ApiUpdateClanOrderRequest,
  ): Promise<boolean> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.updateClanOrder(request).then((response: any) => {
      return response !== undefined;
    });
  }

  /** list clan discover. */
  async listClanDiscover(
    request: ApiClanDiscoverRequest,
  ): Promise<ApiListClanDiscover> {
    return this.transport
      .clanDiscover(this.serverkey, "", request)
      .then((response: ApiListClanDiscover) => {
        return Promise.resolve(response);
      });
  }

  async listQuickMenuAccess(
    session: ApiSession,
    botId: string,
    channelId: string,
    menuType: number,
  ): Promise<ApiQuickMenuAccessList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listQuickMenuAccess(botId, channelId, menuType)
      .then((response: ApiQuickMenuAccessList) => {
        return Promise.resolve(response);
      });
  }

  async deleteQuickMenuAccess(
    session: ApiSession,
    id: string,
    clanId: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteQuickMenuAccess(id, clanId)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async addQuickMenuAccess(
    session: ApiSession,
    request: ApiQuickMenuAccessRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.addQuickMenuAccess(request).then((response: any) => {
      return response !== undefined;
    });
  }

  async updateQuickMenuAccess(
    session: ApiSession,
    request: ApiQuickMenuAccessRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateQuickMenuAccess(request)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async listForSaleItems(
    session: ApiSession,
    page?: number,
  ): Promise<ApiForSaleItemList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listForSaleItems(page)
      .then((response: ApiForSaleItemList) => {
        return Promise.resolve(response);
      });
  }

  async isFollower(
    session: ApiSession,
    req: ApiIsFollowerRequest,
  ): Promise<ApiIsFollowerResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .isFollower(req)
      .then((response: ApiIsFollowerResponse) => {
        return Promise.resolve(response);
      });
  }

  async transferOwnership(
    session: ApiSession,
    req: ApiTransferOwnershipRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport.transferOwnership(req).then((response: any) => {
      return response !== undefined;
    });
  }

  async isBanned(
    session: ApiSession,
    channelId: string,
  ): Promise<ApiIsBannedResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .isBanned(channelId)
      .then((response: ApiIsBannedResponse) => {
        return Promise.resolve(response);
      });
  }

  async reportMessageAbuse(
    session: ApiSession,
    messageId?: string,
    abuseType?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .reportMessageAbuse(messageId, abuseType)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async updateMezonVoiceState(
    session: ApiSession,
    clanId?: string,
    channelId?: string,
    displayName?: string,
    roomName?: string,
    state?: number,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateMezonVoiceState(clanId, channelId, displayName, roomName, state)
      .then((response: any) => {
        return response !== undefined;
      });
  }

  async sendChannelMessage(
    session: ApiSession,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymousMessage?: boolean,
    mentionEveryone?: boolean,
    avatar?: string,
    code?: number,
    topicId?: string,
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .sendChannelMessage(
        clanId,
        channelId,
        mode,
        isPublic,
        content,
        mentions,
        attachments,
        references,
        anonymousMessage,
        mentionEveryone,
        avatar,
        code,
        topicId,
      )
      .then((response: ChannelMessageAck) => {
        return Promise.resolve(response);
      });
  }

  async updateChannelMessage(
    session: ApiSession,
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
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .updateChannelMessage(
        clanId,
        channelId,
        mode,
        isPublic,
        messageId,
        content,
        mentions,
        attachments,
        hideEditted,
        topicId,
        isUpdateMsgTopic,
      )
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async deleteChannelMessage(
    session: ApiSession,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    hasAttachment?: boolean,
    topicId?: string,
    mentions?: Uint8Array,
    references?: Uint8Array,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .deleteChannelMessage(
        clanId,
        channelId,
        mode,
        isPublic,
        messageId,
        hasAttachment,
        topicId,
        mentions,
        references,
      )
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async messageButtonClick(
    session: ApiSession,
    messageId?: string,
    channelId?: string,
    buttonId?: string,
    senderId?: string,
    userId?: string,
    extraData?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .messageButtonClick(
        messageId,
        channelId,
        buttonId,
        senderId,
        userId,
        extraData,
      )
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async dropdownBoxSelected(
    session: ApiSession,
    messageId?: string,
    channelId?: string,
    selectboxId?: string,
    senderId?: string,
    userId?: string,
    values?: string[],
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .dropdownBoxSelected(
        messageId,
        channelId,
        selectboxId,
        senderId,
        userId,
        values,
      )
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async activeArchivedThread(
    session: ApiSession,
    clanId?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .activeArchivedThread(clanId, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async addAgentToChannel(
    session: ApiSession,
    roomName?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .addAgentToChannel(roomName, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async disconnectAgent(
    session: ApiSession,
    roomName?: string,
    channelId?: string,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .disconnectAgent(roomName, channelId)
      .then((response: any) => {
        return Promise.resolve(response);
      });
  }

  async listMutedChannel(
    session: ApiSession,
    clanId: string,
  ): Promise<ApiMutedChannelList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .listMutedChannel(clanId)
      .then((response: ApiMutedChannelList) => {
        return Promise.resolve(response);
      });
  }

  async channelMessageReact(
    session: ApiSession,
    clanId: string,
    channelId: string,
    mode: number,
    isPublic: boolean,
    messageId: string,
    emojiId: string,
    emoji: string,
    count: number,
    messageSenderId: string,
    actionDelete: boolean,
    topicId?: string,
    emojiRecentId?: string,
    senderName?: string,
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }

    return this.transport
      .channelMessageReact(
        clanId,
        channelId,
        mode,
        isPublic,
        messageId,
        emojiId,
        emoji,
        count,
        messageSenderId,
        actionDelete,
        topicId,
        emojiRecentId,
        senderName,
      )
      .then((response: ChannelMessageAck) => {
        return Promise.resolve(response);
      });
  }

  /** Create a poll in a channel. */
  async createPoll(
    session: ApiSession,
    request: ApiCreatePollRequest,
  ): Promise<ApiCreatePollResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.createPoll(request);
  }

  /** Vote on a poll. */
  async votePoll(
    session: ApiSession,
    request: ApiVotePollRequest,
  ): Promise<ApiVotePollResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.votePoll(request);
  }

  /** Close a poll (creator only). */
  async closePoll(
    session: ApiSession,
    request: ApiClosePollRequest,
  ): Promise<any> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.closePoll(request);
  }

  /** Get poll details. */
  async getPoll(
    session: ApiSession,
    request: ApiGetPollRequest,
  ): Promise<ApiGetPollResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.getPoll(request);
  }

  async followUsers(session: ApiSession, userIds: string[]): Promise<Status> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.followUsers(userIds);
  }

  async joinClanChat(session: ApiSession, clan_id: string): Promise<ClanJoin> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.joinClanChat(clan_id);
  }

  async follower(session: ApiSession): Promise<void> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.follower();
  }

  async joinChat(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
  ): Promise<Channel> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.joinChat(
      clan_id,
      channel_id,
      channel_type,
      is_public,
    );
  }

  async leaveChat(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
  ): Promise<void> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.leaveChat(
      clan_id,
      channel_id,
      channel_type,
      is_public,
    );
  }

  async removeChatMessage(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
    mentions?: string,
    references?: string,
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.removeChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      has_attachment,
      topic_id,
      mentions,
      references,
    );
  }

  async unfollowUsers(session: ApiSession, user_ids: string[]): Promise<void> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.unfollowUsers(user_ids);
  }

  async updateChatMessage(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean,
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.updateChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      content,
      mentions,
      attachments,
      hideEditted,
      topic_id,
      is_update_msg_topic,
    );
  }

  async updateStatus(session: ApiSession, status?: string): Promise<void> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.updateStatus(status);
  }

  async writeQuickMenuEvent(
    session: ApiSession,
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
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeQuickMenuEvent(
      menu_name,
      clan_id,
      channel_id,
      mode,
      is_public,
      content,
      mentions,
      attachments,
      references,
      anonymous_message,
      mention_everyone,
      avatar,
      code,
      topic_id,
    );
  }

  async writeEphemeralMessage(
    session: ApiSession,
    receiver_ids: string[],
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
    id?: string,
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeEphemeralMessage(
      receiver_ids,
      clan_id,
      channel_id,
      mode,
      is_public,
      content,
      mentions,
      attachments,
      references,
      anonymous_message,
      mention_everyone,
      avatar,
      code,
      topic_id,
      id,
    );
  }

  async writeChatMessage(
    session: ApiSession,
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
  ): Promise<ChannelMessageAck> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      content,
      mentions,
      attachments,
      references,
      anonymous_message,
      mention_everyone,
      avatar,
      code,
      topic_id,
    );
  }

  async writeMessageReaction(
    session: ApiSession,
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
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeMessageReaction(
      id,
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      emoji_id,
      emoji,
      count,
      message_sender_id,
      action_delete,
      topic_id,
      emoji_recent_id,
      sender_name,
    );
  }

  async writeMessageTyping(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    sender_display_name: string,
    topic_id?: string,
  ): Promise<MessageTypingEvent> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeMessageTyping(
      clan_id,
      channel_id,
      mode,
      is_public,
      sender_display_name,
      topic_id,
    );
  }

  async writeLastSeenMessage(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number,
    badge_count: number,
  ): Promise<LastSeenMessageEvent> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeLastSeenMessage(
      clan_id,
      channel_id,
      mode,
      message_id,
      timestamp_seconds,
      badge_count,
    );
  }

  async writeLastPinMessage(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number,
    message_sender_avatar: string,
    message_sender_id: string,
    message_sender_username: string,
    message_content: string,
    message_attachment: string,
    message_created_time: string,
  ): Promise<ApiGetPollResponse> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeLastPinMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      timestamp_seconds,
      operation,
      message_sender_avatar,
      message_sender_id,
      message_sender_username,
      message_content,
      message_attachment,
      message_created_time,
    );
  }

  async writeCustomStatus(
    session: ApiSession,
    clan_id: string,
    status: string,
    time_reset: number,
    no_clear: boolean,
  ): Promise<CustomStatusEvent> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeCustomStatus(
      clan_id,
      status,
      time_reset,
      no_clear,
    );
  }

  async writeVoiceReaction(
    session: ApiSession,
    emojis: Array<string>,
    channel_id: string,
  ): Promise<VoiceReactionSend> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeVoiceReaction(emojis, channel_id);
  }

  async forwardWebrtcSignaling(
    session: ApiSession,
    receiver_id: string,
    data_type: number,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<WebrtcSignalingFwd> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.forwardWebrtcSignaling(
      receiver_id,
      data_type,
      json_data,
      channel_id,
      caller_id,
    );
  }

  async makeCallPush(
    session: ApiSession,
    receiver_id: string,
    json_data: string,
    channel_id: string,
    caller_id: string,
  ): Promise<IncomingCallPush> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.makeCallPush(
      receiver_id,
      json_data,
      channel_id,
      caller_id,
    );
  }

  async writeChannelAppEvent(
    session: ApiSession,
    clan_id: string,
    channel_id: string,
    action: number,
  ): Promise<ChannelAppEvent> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.writeChannelAppEvent(clan_id, channel_id, action);
  }

  async listLogedDevice(
    session: ApiSession
  ): Promise<LogedDeviceList> {
    if (
      this.autoFallbackHttp &&
      this._connectionState !== ConnectionState.CONNECTED
    ) {
      await this.transport.setFallbackSession(session);
    }
    return this.transport.listLogedDevice();
  }
}
