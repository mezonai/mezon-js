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

import { CloseEvent, ErrorEvent } from "ws";
import { MezonNetworkAdapter } from "./transport/abridged_tcp_adapter";
import { trimAbridgedPadding, decodeEnvelopePayload } from "./transport/protobuf_decode";
import { TransportAdapter } from "./transport/transport_adapter";
import {
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageReaction,
  ApiMessageRef,
  Channel,
  ChannelDescListEvent,
  ChannelMessageAck,
  ClanJoin,
  ClanNameExistedEvent,
  CustomStatusEvent,
  EmojiListedEvent,
  HashtagDmListEvent,
  LastPinMessageEvent,
  LastSeenMessageEvent,
  MessageTypingEvent,
  NotificationCategorySettingEvent,
  NotificationChannelSettingEvent,
  NotificationClanSettingEvent,
  NotifiReactMessageEvent,
  Socket,
  SocketError,
  StrickerListedEvent,
  TokenSentEvent,
  VoiceJoinedEvent,
  VoiceLeavedEvent,
} from "./interfaces";
import { Session } from "./session";
import { InternalEventsSocket } from "./constants";
import { getApiFromPath } from "./constants/api_name_enum";
import { EventEmitter } from "stream";
import HandleEvent from "./message-socket-events";
import * as rtproto from "./rtapi/realtime";
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
  awaitingUpdate?: { message_id: string; channel_id: string };
}

function CreateChannelMessageFromEvent(message: any) {
  var content, reactions, mentions, attachments, references, referencedMessags;
  try {
    content = safeJSONParse(message.channel_message.content);
  } catch (e) {
    console.log("[mezon-sdk] Content is invalid", e);
  }
  try {
    reactions = decodeReactions(message.channel_message.reactions);
  } catch (e) {
    console.log("[mezon-sdk] Reactions is invalid", e);
  }
  try {
    mentions = decodeMentions(message.channel_message.mentions);
  } catch (e) {
    console.log("[mezon-sdk] Mentions is invalid", e);
  }
  try {
    attachments = decodeAttachments(message.channel_message.attachments);
  } catch (e) {
    console.log("[mezon-sdk] Attachments is invalid", e);
  }
  try {
    references = decodeRefs(message.channel_message.references);
  } catch (e) {
    console.log("[mezon-sdk] References is invalid", e);
  }
  try {
    referencedMessags = message.channel_message.referenced_message;
  } catch (e) {
    console.log("[mezon-sdk] Referenced messages is invalid", e);
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

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export class MezonTransport implements Socket {
  [key: string]: any;

  public static readonly DefaultHeartbeatTimeoutMs = 15000;
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

  public socketEvents: EventEmitter = new EventEmitter();

  public session: Session | undefined;

  constructor(
    readonly host: string,
    readonly port: string,
    public verbose: boolean = false,
    readonly adapter: TransportAdapter = new MezonNetworkAdapter(),
    readonly sendTimeoutMs: number = MezonTransport.DefaultSendTimeoutMs,
  ) {
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = MezonTransport.DefaultHeartbeatTimeoutMs;
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

  private normalizeInboundMessage(message: unknown): Record<string, unknown> | null {
    if (
      message &&
      typeof message === "object" &&
      !Buffer.isBuffer(message) &&
      !(message instanceof Uint8Array)
    ) {
      return message as Record<string, unknown>;
    }

    if (Buffer.isBuffer(message) || message instanceof Uint8Array) {
      try {
        return decodeEnvelopePayload(message) as unknown as Record<string, unknown>;
      } catch {
        return null;
      }
    }

    return null;
  }

  private getAwaitingUpdateMeta(untypedMessage: any): PromiseExecutor["awaitingUpdate"] {
    if (untypedMessage.channel_message_update) {
      return {
        message_id: String(untypedMessage.channel_message_update.message_id ?? ""),
        channel_id: String(untypedMessage.channel_message_update.channel_id ?? ""),
      };
    }

    const apiEvent = untypedMessage.api_request_event;
    if (apiEvent?.api_name === "UpdateChannelMessage" && apiEvent.body) {
      try {
        const body =
          apiEvent.body instanceof Uint8Array
            ? apiEvent.body
            : Uint8Array.from(apiEvent.body);
        const update = rtproto.ChannelMessageUpdate.decode(body);
        if (update.message_id) {
          return {
            message_id: String(update.message_id),
            channel_id: String(update.channel_id ?? ""),
          };
        }
      } catch {
        // ignore malformed update body
      }
    }

    return undefined;
  }

  private ackFromUpdateResponse(
    responseMessage: unknown,
    channel_id: string,
    message_id: string,
    mode: number,
  ): ChannelMessageAck {
    if (Buffer.isBuffer(responseMessage) || responseMessage instanceof Uint8Array) {
      const updated = rtproto.ChannelMessageUpdate.decode(
        trimAbridgedPadding(responseMessage),
      );
      return this.toChannelMessageAck(
        rtproto.ChannelMessageAck.fromPartial({
          channel_id: channel_id || updated.channel_id,
          message_id: message_id || updated.message_id,
          create_time_seconds: updated.create_time_seconds,
          code: 1,
        }),
        mode,
      );
    }

    const envelope = responseMessage as rtproto.Envelope | undefined;
    if (envelope?.channel_message_ack) {
      return this.toChannelMessageAck(envelope.channel_message_ack, mode);
    }

    const pushed = envelope?.channel_message;
    if (pushed) {
      return this.toChannelMessageAck(
        rtproto.ChannelMessageAck.fromPartial({
          channel_id: pushed.channel_id || channel_id,
          message_id: pushed.message_id || message_id,
          create_time_seconds: pushed.create_time_seconds,
          update_time_seconds: pushed.update_time_seconds,
          code: pushed.code ?? 1,
        }),
        mode,
      );
    }

    return this.toChannelMessageAck(
      rtproto.ChannelMessageAck.fromPartial({ message_id, channel_id, code: 1 }),
      mode,
    );
  }

  private normalizeAwaitingId(id: string | number | undefined | null): string | undefined {
    if (id == null) {
      return undefined;
    }
    const normalized = String(id);
    if (normalized === "" || normalized === "0") {
      return undefined;
    }
    return normalized;
  }

  private collectPendingUpdates(): Array<{ cid: number; executor: PromiseExecutor }> {
    const pendingUpdates: Array<{ cid: number; executor: PromiseExecutor }> = [];
    for (const cidKey of Object.keys(this.cIds)) {
      const cid = Number(cidKey);
      const executor = this.cIds[cid];
      if (executor?.awaitingUpdate) {
        pendingUpdates.push({ cid, executor });
      }
    }
    return pendingUpdates;
  }

  private tryResolvePendingUpdateForMessageId(
    pushMessageId: string,
    pushChannelId: string | undefined,
    message: Record<string, unknown>,
  ): boolean {
    const pendingUpdates = this.collectPendingUpdates();
    if (pendingUpdates.length === 0) {
      return false;
    }

    const normalizedPushMessageId = this.normalizeAwaitingId(pushMessageId);
    if (!normalizedPushMessageId) {
      return false;
    }

    const normalizedPushChannelId = this.normalizeAwaitingId(pushChannelId);

    for (const { cid, executor } of pendingUpdates) {
      const { message_id, channel_id } = executor.awaitingUpdate!;
      const normalizedPendingMessageId = this.normalizeAwaitingId(message_id);
      if (normalizedPendingMessageId !== normalizedPushMessageId) {
        continue;
      }

      const normalizedPendingChannelId = this.normalizeAwaitingId(channel_id);
      if (
        normalizedPendingChannelId != null &&
        normalizedPushChannelId != null &&
        normalizedPendingChannelId !== normalizedPushChannelId
      ) {
        continue;
      }

      delete this.cIds[cid];
      executor.resolve({ code: 0, message });
      return true;
    }

    if (pendingUpdates.length === 1) {
      const { cid, executor } = pendingUpdates[0];
      const normalizedPendingMessageId = this.normalizeAwaitingId(
        executor.awaitingUpdate!.message_id,
      );
      if (normalizedPendingMessageId === normalizedPushMessageId) {
        delete this.cIds[cid];
        executor.resolve({ code: 0, message });
        return true;
      }
    }

    return false;
  }

  private extractChannelMessageId(
    channelMessage: Record<string, unknown> | undefined,
  ): string | undefined {
    if (!channelMessage) {
      return undefined;
    }
    return this.normalizeAwaitingId(
      (channelMessage.message_id as string | number | undefined) ??
        (channelMessage.id as string | number | undefined),
    );
  }

  private tryResolvePendingUpdate(message: Record<string, unknown>): boolean {
    type UpdateMatchFields = Record<string, unknown>;

    const channelMessage = message.channel_message as UpdateMatchFields | undefined;
    const channelMessageId = this.extractChannelMessageId(channelMessage);
    if (channelMessageId) {
      const pushChannelId =
        channelMessage?.channel_id != null ? String(channelMessage.channel_id) : undefined;
      if (
        this.tryResolvePendingUpdateForMessageId(
          channelMessageId,
          pushChannelId,
          message,
        )
      ) {
        return true;
      }
    }

    const channelMessageAck = message.channel_message_ack as UpdateMatchFields | undefined;
    const ackMessageId = this.normalizeAwaitingId(
      channelMessageAck?.message_id as string | number | undefined,
    );
    if (ackMessageId) {
      const ackChannelId =
        channelMessageAck?.channel_id != null
          ? String(channelMessageAck.channel_id)
          : undefined;
      if (
        this.tryResolvePendingUpdateForMessageId(ackMessageId, ackChannelId, message)
      ) {
        return true;
      }
    }

    return false;
  }

  private dispatchInboundEvents(message: Record<string, unknown>): void {
    for (const event in InternalEventsSocket) {
      const fieldName = InternalEventsSocket[event as keyof typeof InternalEventsSocket];
      if (
        Object.prototype.toString.call(message) === "[object Object]" &&
        Object.prototype.hasOwnProperty.call(message, fieldName) &&
        message[fieldName]
      ) {
        const input = this.formatFunction[fieldName]
          ? this.formatFunction[fieldName]!(message)
          : message[fieldName];

        this.socketEvents.emit(fieldName, input);
      }
    }
  }

  isOpen(): boolean {
    return this._connectionState === ConnectionState.CONNECTED && this.adapter.isOpen();
  }

  close() {
    this.markDisconnected(<CloseEvent>{}, false);
    this.adapter.close();
  }

  private formatFunction: Partial<Record<InternalEventsSocket, (msg: any) => any>> = {
    [InternalEventsSocket.ChannelMessage]: (message: any) => {
      return CreateChannelMessageFromEvent(message);
    },
  };

  connect(
    session: Session,
    createStatus: boolean = false,
    connectTimeoutMs: number = MezonTransport.DefaultConnectTimeoutMs,
    signal?: AbortSignal,
  ): Promise<Session> {
    this.session = session;

    if (this._connectionState === ConnectionState.CONNECTED && this.adapter.isOpen()) {
      return Promise.resolve(session);
    }

    if (this._connectionState === ConnectionState.CONNECTING && this._connectPromise) {
      return this._connectPromise;
    }

    this.clearConnectTimeout();
    this._connectionState = ConnectionState.CONNECTING;

    this.adapter.onClose = (evt: CloseEvent) => {
      this.markDisconnected(evt);
    };

    this.adapter.onError = (evt: Event) => {
      this.onerror(evt as unknown as ErrorEvent);
    };

    HandleEvent.forEach((cl) => {
      const instance = new cl(this);
      instance.excute();
    });

    this.adapter.onMessage = (cid: number, code: number, message: any) => {
      if (this.verbose) {
        console.log("[mezon-sdk] Response cid=%o code=%o message=%o", cid, code, message);
      }

      if (message?.pong) {
        const pingExecutor = this.cIds[cid];
        if (pingExecutor) {
          delete this.cIds[cid];
          pingExecutor.resolve({ code: 0, message });
        }
        return;
      }

      const executor = cid !== 0 ? this.cIds[cid] : undefined;

      const inbound = this.normalizeInboundMessage(message);
      if (inbound && this.tryResolvePendingUpdate(inbound)) {
        this.dispatchInboundEvents(inbound);
        return;
      }

      if (executor) {
        delete this.cIds[cid];

        if (message?.error) {
          executor.reject({ code, error: message.error });
        } else {
          executor.resolve({ code, message });
        }
        return;
      }

      if (inbound) {
        this.dispatchInboundEvents(inbound);
        return;
      }

    };

    const connectPromise = new Promise<Session>((resolve, reject) => {
      this.adapter.onOpen = (evt: Event) => {
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
      const baseOnErrorHandler = this.adapter.onError;
      this.adapter.onError = (evt: Event) => {
        baseOnErrorHandler?.(evt);
        if (this._connectionState === ConnectionState.CONNECTING) {
          this.markDisconnected(<CloseEvent>{}, false);
          reject(evt);
          this.adapter.close();
        }
      };

      this._connectTimeoutTimer = setTimeout(() => {
        this.markDisconnected(<CloseEvent>{}, false);
        this.adapter.close();
        reject("The socket timed out when trying to connect.");
        this._connectTimeoutTimer = undefined;
      }, connectTimeoutMs);

      this.adapter.connect(this.host, this.port, createStatus, session.token, signal);
    });

    this._connectPromise = connectPromise;
    return this._connectPromise;
  }

  disconnect(fireDisconnectEvent: boolean = true) {
    this.markDisconnected(<CloseEvent>{}, false);
    this.adapter.close();
    if (fireDisconnectEvent) {
      this.ondisconnect(<CloseEvent>{});
    }
  }

  setHeartbeatTimeoutMs(ms: number) {
    this._heartbeatTimeoutMs = ms;
  }

  getHeartbeatTimeoutMs(): number {
    return this._heartbeatTimeoutMs;
  }

  ondisconnect(evt: CloseEvent) {
    if (this.verbose) {
      console.log(evt);
    }
  }

  onreconnect(evt: Event) {
    if (this.verbose) {
      console.log("[mezon-sdk] Socket reconnected.", evt);
    }
  }

  onerror(evt: ErrorEvent) {
    if (this.verbose) {
      console.log(evt);
    }
  }

  onheartbeattimeout() {
    if (this.verbose) {
      console.log("[mezon-sdk] Heartbeat timeout.");
    }
  }

  send(data: any, sendTimeout = MezonTransport.DefaultSendTimeoutMs): Promise<any> {
    const { urlPath, fetchOptions } = data;
    let untypedMessage: any;

    if (urlPath?.includes("/mezon.api.Mezon/")) {
      const apiName = urlPath.substring(17);
      const apiIndex = getApiFromPath(apiName);
      if (apiIndex === undefined) {
        return Promise.reject(new Error(`Unknown API: ${apiName}`));
      }
      untypedMessage = {
        api_request_event: {
          api_index: apiIndex,
          api_name: apiName,
          body: fetchOptions.body,
        },
      };
    } else if (fetchOptions !== undefined) {
      untypedMessage = fetchOptions;
    } else {
      untypedMessage = data;
    }

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      } else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(
            untypedMessage.channel_message_send.content,
          );
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(
            untypedMessage.channel_message_update.content,
          );
        } else if (untypedMessage.ephemeral_message_send) {
          untypedMessage.ephemeral_message_send.message.content = JSON.stringify(
            untypedMessage.ephemeral_message_send.message?.content,
          );
        } else if (untypedMessage.quick_menu_event) {
          untypedMessage.quick_menu_event.message.content = JSON.stringify(
            untypedMessage.quick_menu_event.message?.content,
          );
        }

        const cid = this.generatecid();
        const awaitingUpdate = this.getAwaitingUpdateMeta(untypedMessage);
        this.cIds[cid] = { resolve, reject, awaitingUpdate };
        if (sendTimeout !== Infinity && sendTimeout > 0) {
          setTimeout(() => {
            if (this.cIds[cid]) {
              delete this.cIds[cid];
              reject("The socket timed out while waiting for a response.");
            }
          }, sendTimeout);
        }

        untypedMessage.cid = cid;
        try {
          this.adapter.send(untypedMessage);
        } catch (error) {
          delete this.cIds[cid];
          reject(error);
        }
      }
    });
  }

  private async sendEvent(data: any, sendTimeout?: number): Promise<any> {
    const response = await this.send(data, sendTimeout);
    if (response.code != 0) {
      throw response;
    }
    const message = response.message;
    if (message?.error) {
      throw message.error as SocketError;
    }
    return message;
  }

  private async sendMezonApi(urlPath: string, encodedBody: Uint8Array): Promise<Uint8Array> {
    const apiName = urlPath.substring("/mezon.api.Mezon/".length);
    return this.sendApiRequest(apiName, encodedBody);
  }

  private async sendApiRequest(
    apiName: string,
    body: Uint8Array,
  ): Promise<Uint8Array> {
    const apiIndex = getApiFromPath(apiName);
    if (apiIndex === undefined) {
      throw new Error(`Unknown API: ${apiName}`);
    }

    const response = await this.send({
      api_request_event: {
        api_index: apiIndex,
        api_name: apiName,
        body,
      },
    });

    if (response.code != 0) {
      throw response;
    }

    return trimAbridgedPadding(response.message);
  }

  private toChannelMessageAck(ack: rtproto.ChannelMessageAck, mode: number): ChannelMessageAck {
    return {
      channel_id: ack.channel_id,
      mode,
      message_id: ack.message_id,
      code: ack.code,
      username: ack.username,
      create_time: String(ack.create_time_seconds ?? ""),
      update_time: String(ack.update_time_seconds ?? ""),
      persistence: ack.persistent ?? false,
    };
  }

  async joinClanChat(clan_id: string, is_last_field: boolean = false): Promise<ClanJoin> {
    const response = await this.sendEvent({
      clan_join: {
        clan_id: clan_id,
        is_last_field: is_last_field,
      },
    });

    return response.clan_join;
  }

  async joinChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<Channel> {
    const response = await this.sendEvent({
      channel_join: {
        clan_id: clan_id,
        channel_id: channel_id,
        channel_type: channel_type,
        is_public: is_public,
      },
    });

    return response.channel;
  }

  leaveChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<void> {
    return this.sendEvent({
      channel_leave: { clan_id: clan_id, channel_id: channel_id, channel_type: channel_type, is_public: is_public },
    });
  }

  async removeChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    topic_id?: string,
  ): Promise<ChannelMessageAck> {
    const response = await this.sendEvent({
      channel_message_remove: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        is_public: is_public,
        topic_id: topic_id,
      },
    });

    return (
      response.channel_message_ack ??
      this.toChannelMessageAck(
        rtproto.ChannelMessageAck.fromPartial({ message_id, channel_id }),
        mode,
      )
    );
  }

  async updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    create_time_seconds?: number,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean,
  ): Promise<ChannelMessageAck> {
    const response = await this.sendEvent({
      channel_message_update: {
        clan_id: clan_id,
        channel_id: channel_id,
        message_id: message_id,
        content: content,
        mentions: mentions,
        attachments: attachments,
        create_time_seconds: create_time_seconds,
        mode: mode,
        is_public: is_public,
        hide_editted: hideEditted,
        topic_id: topic_id,
        is_update_msg_topic: is_update_msg_topic,
      },
    });

    return this.ackFromUpdateResponse(response, channel_id, message_id, mode);
  }

  private stringifyMessageContent(content: unknown): string {
    if (typeof content === "string") {
      return content;
    }
    return JSON.stringify(content ?? {});
  }

  async sendChannelMessage(
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
    const encodedBody = rtproto.ChannelMessageSend.encode(
      rtproto.ChannelMessageSend.fromPartial({
        clan_id,
        channel_id,
        mode,
        is_public,
        content: this.stringifyMessageContent(content),
        mentions,
        attachments,
        references,
        anonymous_message,
        mention_everyone,
        avatar,
        code,
        topic_id,
      }),
    ).finish();

    const responseBody = await this.sendMezonApi(
      "/mezon.api.Mezon/SendChannelMessage",
      encodedBody,
    );
    const ack = rtproto.ChannelMessageAck.decode(trimAbridgedPadding(responseBody));
    return this.toChannelMessageAck(ack, mode);
  }

  async updateChannelMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    create_time_seconds?: number,
    hideEditted?: boolean,
    topic_id?: string,
    is_update_msg_topic?: boolean,
  ): Promise<ChannelMessageAck> {
    const encodedBody = rtproto.ChannelMessageUpdate.encode(
      rtproto.ChannelMessageUpdate.fromPartial({
        clan_id,
        channel_id,
        message_id,
        mode,
        is_public,
        content: this.stringifyMessageContent(content),
        mentions,
        attachments,
        create_time_seconds,
        hide_editted: hideEditted,
        topic_id,
        is_update_msg_topic,
      }),
    ).finish();

    const apiIndex = getApiFromPath("UpdateChannelMessage");
    if (apiIndex === undefined) {
      throw new Error("Unknown API: UpdateChannelMessage");
    }

    const sendTimeout =
      encodedBody.length > 1500 ? 30000 : MezonTransport.DefaultSendTimeoutMs;

    const response = await this.send(
      {
        api_request_event: {
          api_index: apiIndex,
          api_name: "UpdateChannelMessage",
          body: encodedBody,
        },
      },
      sendTimeout,
    );

    if (response.code != 0) {
      throw response;
    }

    return this.ackFromUpdateResponse(
      response.message,
      channel_id,
      message_id,
      mode,
    );
  }

  async deleteChannelMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    has_attachment?: boolean,
    topic_id?: string,
  ): Promise<ChannelMessageAck> {
    const encodedBody = rtproto.ChannelMessageRemove.encode(
      rtproto.ChannelMessageRemove.fromPartial({
        clan_id,
        channel_id,
        message_id,
        mode,
        is_public,
        has_attachment,
        topic_id,
      }),
    ).finish();

    const responseBody = await this.sendApiRequest(
      "DeleteChannelMessage",
      encodedBody,
    );
    const removed = rtproto.ChannelMessageRemove.decode(responseBody);

    return {
      channel_id: channel_id || removed.channel_id,
      mode,
      message_id: message_id || removed.message_id,
      code: 2,
      username: "",
      create_time: "",
      update_time: "",
      persistence: false,
    };
  }

  updateStatus(status?: string): Promise<void> {
    return this.sendEvent({ status_update: { status: status } });
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
    message_id?: string,
  ): Promise<ChannelMessageAck> {
    try {
      const receiverIds = Array.isArray(receiver_id) ? receiver_id : [receiver_id];
      const response = await this.sendEvent({
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
            id: message_id,
          },
        },
      });
      return (
        this.toChannelMessageAck(
          response.channel_message_ack ??
            rtproto.ChannelMessageAck.fromPartial({
              channel_id: channel_id,
            }),
          mode,
        )
      );
    } catch (error) {
      console.log("[mezon-sdk] writeEphemeralMessage", error);
      throw error;
    }
  }

  async writeChatMessage(
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
    const response = await this.sendEvent({
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
        code,
        topic_id,
      },
    });
    return this.toChannelMessageAck(response.channel_message_ack, mode);
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
  ): Promise<ApiMessageReaction> {
    const response = await this.sendEvent({
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
      },
    });
    return response.message_reaction_event;
  }

  async writeMessageTyping(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
  ): Promise<MessageTypingEvent> {
    const response = await this.sendEvent({
      message_typing_event: { clan_id: clan_id, channel_id: channel_id, mode: mode, is_public: is_public },
    });
    return response.message_typing_event;
  }

  async writeLastSeenMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    message_id: string,
    timestamp_seconds: number,
  ): Promise<LastSeenMessageEvent> {
    const response = await this.sendEvent({
      last_seen_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
      },
    });
    return response.last_seen_message_event;
  }

  async writeLastPinMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    timestamp_seconds: number,
    operation: number,
  ): Promise<LastPinMessageEvent> {
    const response = await this.sendEvent({
      last_pin_message_event: {
        clan_id: clan_id,
        channel_id: channel_id,
        mode: mode,
        is_public: is_public,
        message_id: message_id,
        timestamp_seconds: timestamp_seconds,
        operation: operation,
      },
    });
    return response.last_pin_message_event;
  }

  async writeVoiceJoined(
    id: string,
    clanId: string,
    clanName: string,
    voiceChannelId: string,
    voiceChannelLabel: string,
    participant: string,
    lastScreenshot: string,
  ): Promise<VoiceJoinedEvent> {
    const response = await this.sendEvent({
      voice_joined_event: {
        clan_id: clanId,
        clan_name: clanName,
        id: id,
        participant: participant,
        voice_channel_id: voiceChannelId,
        voice_channel_label: voiceChannelLabel,
        last_screenshot: lastScreenshot,
      },
    });
    return response.voice_joined_event;
  }

  async writeVoiceLeaved(
    id: string,
    clanId: string,
    voiceChannelId: string,
    voiceUserId: string,
  ): Promise<VoiceLeavedEvent> {
    const response = await this.sendEvent({
      voice_leaved_event: { id: id, clan_id: clanId, voice_channel_id: voiceChannelId, voice_user_id: voiceUserId },
    });
    return response.voice_leaved_event;
  }

  async writeCustomStatus(clan_id: string, status: string): Promise<CustomStatusEvent> {
    const response = await this.sendEvent({ custom_status_event: { clan_id: clan_id, status: status } });
    return response.custom_status_event;
  }

  async checkDuplicateClanName(clan_name: string): Promise<ClanNameExistedEvent> {
    const response = await this.sendEvent({ clan_name_existed_event: { clan_name: clan_name } });
    return response.clan_name_existed_event;
  }

  async listClanEmojiByClanId(clan_id: string): Promise<EmojiListedEvent> {
    const response = await this.sendEvent({ emojis_listed_event: { clan_id: clan_id } });
    return response.emojis_listed_event;
  }

  async ListChannelByUserId(): Promise<ChannelDescListEvent> {
    const response = await this.sendEvent({ channel_desc_list_event: {} });
    return response.channel_desc_list_event;
  }

  async hashtagDMList(user_id: Array<string>, limit: number): Promise<HashtagDmListEvent> {
    const response = await this.sendEvent({ hashtag_dm_list_event: { user_id: user_id, limit: limit } });
    return response.hashtag_dm_list_event;
  }

  async listClanStickersByClanId(clan_id: string): Promise<StrickerListedEvent> {
    const response = await this.sendEvent({ sticker_listed_event: { clan_id: clan_id } });
    return response.sticker_listed_event;
  }

  async getNotificationChannelSetting(channel_id: string): Promise<NotificationChannelSettingEvent> {
    const response = await this.sendEvent({ notification_channel_setting_event: { channel_id: channel_id } });
    return response.notification_channel_setting_event;
  }

  async getNotificationCategorySetting(category_id: string): Promise<NotificationCategorySettingEvent> {
    const response = await this.sendEvent({ notification_category_setting_event: { category_id: category_id } });
    return response.notification_category_setting_event;
  }

  async getNotificationClanSetting(clan_id: string): Promise<NotificationClanSettingEvent> {
    const response = await this.sendEvent({ notification_clan_setting_event: { clan_id: clan_id } });
    return response.notification_clan_setting_event;
  }

  async getNotificationReactMessage(channel_id: string): Promise<NotifiReactMessageEvent> {
    const response = await this.sendEvent({ notifi_react_message_event: { channel_id: channel_id } });
    return response.notifi_react_message_event;
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

  private markDisconnected(evt: CloseEvent = <CloseEvent>{}, fireDisconnectEvent: boolean = true): boolean {
    const wasAlreadyDisconnected = this._connectionState === ConnectionState.DISCONNECTED;
    this._connectionState = ConnectionState.DISCONNECTED;
    this.stopHeartbeatLoop();
    this.clearConnectTimeout();
    this._connectPromise = undefined;

    if (!wasAlreadyDisconnected) {
      for (const cidKey of Object.keys(this.cIds)) {
        const cid = Number(cidKey);
        const executor = this.cIds[cid];
        delete this.cIds[cid];
        executor?.reject("The socket disconnected before receiving a response.");
      }
    }

    if (fireDisconnectEvent && !wasAlreadyDisconnected) {
      this.ondisconnect(evt);
    }

    return !wasAlreadyDisconnected;
  }

  private async pingPong(): Promise<void> {
    if (!this.adapter.isOpen()) {
      return;
    }
    try {
      await this.sendEvent({ ping: {} }, this._heartbeatTimeoutMs);
    } catch {
      if (!this.adapter.isOpen()) {
        this.markDisconnected();
        return;
      }

      if (this.verbose) {
        console.error("Server unreachable from heartbeat.");
      }
      this.onheartbeattimeout();

      if (this.adapter.isOpen()) {
        this.adapter.close();
      } else {
        this.markDisconnected();
      }

      return;
    }
    this._heartbeatTimer = setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
  }

  async sendToken(receiver_id: string, amount: number): Promise<TokenSentEvent> {
    const response = await this.sendEvent({ token_sent_event: { receiver_id: receiver_id, amount: amount } });
    return response.token_sent_event;
  }
}
