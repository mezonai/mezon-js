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
import { ApiMessageAttachment, ApiMessageMention, ApiMessageReaction, ApiMessageRef, Channel, ChannelDescListEvent, ChannelJoin, ChannelLeave, ChannelMessageAck, ChannelMessageRemove, ChannelMessageSend, ChannelMessageUpdate, ClanJoin, ClanNameExistedEvent, CustomStatusEvent, DropdownBoxSelected, EmojiListedEvent, HashtagDmListEvent, LastPinMessageEvent, LastSeenMessageEvent, MessageTypingEvent, NotificationCategorySettingEvent, NotificationChannelSettingEvent, NotificationClanSettingEvent, NotifiReactMessageEvent, Ping, Rpc, Socket, SocketError, StatusFollow, StatusUnfollow, StatusUpdate, StrickerListedEvent, TokenSentEvent, VoiceJoinedEvent, VoiceLeavedEvent } from "./interfaces";
import {Session} from "./session";
import { WebSocketAdapter, WebSocketAdapterText } from "./web_socket_adapter";
import { InternalEventsSocket } from "./constants";
import { EventEmitter } from "stream";
import { formatFunction } from "./utils/format_message_input";
import HandleEvent from './message-socket-events';
import { WebrtcSignalingFwd, IncomingCallPush, MessageButtonClicked, ChannelAppEvent, EphemeralMessageSend } from "./rtapi/realtime";

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}


/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;

  public socketEvents : EventEmitter = new EventEmitter();
  
  public session: Session | undefined;

  constructor(
      readonly host: string,
      readonly port: string,
      readonly useSSL: boolean = false,
      public verbose: boolean = false,
      readonly adapter : WebSocketAdapter = new WebSocketAdapterText(),
      readonly sendTimeoutMs : number = DefaultSocket.DefaultSendTimeoutMs
      ) {
    this.cIds = {};
    this.nextCid = 1;
    this._heartbeatTimeoutMs = DefaultSocket.DefaultHeartbeatTimeoutMs;
  }

  generatecid(): string {
    const cid = this.nextCid.toString();
    ++this.nextCid;
    return cid;
  }

  isOpen(): boolean {
    return this.adapter.isOpen();
  }

  close() {
    this.adapter.close();
  }

  connect(session: Session, createStatus: boolean = false, connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs): Promise<Session> {
    this.session = session;
    if (this.adapter.isOpen()) {
      return Promise.resolve(session);
    }

    const scheme = (this.useSSL) ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);

    this.adapter.onClose = (evt: CloseEvent) => {
      this.ondisconnect(evt);
    }

    this.adapter.onError = (evt: ErrorEvent) => {
      this.onerror(evt);
    }

    HandleEvent.forEach(cl => {
      const instance = new cl(this);
      instance.excute();
    });

    this.adapter.onMessage = (message: any) => {
      if (this.verbose) {
        console.log("Response: %o", JSON.stringify(message));
      }

      /** Inbound message from server. */
      if (!message.cid) {
        for (const event in InternalEventsSocket) {
          const fieldName = InternalEventsSocket[event as keyof typeof InternalEventsSocket];
          if (Object.prototype.toString.call(message) === '[object Object]' && message.hasOwnProperty(fieldName) && message[fieldName]){
            const input = formatFunction.hasOwnProperty(fieldName) ? formatFunction[fieldName](message) : message[fieldName]
            this.socketEvents.emit(fieldName,input)
          }
        }
    
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose) {
            console.error("No promise executor for message: %o", message);
          }
          return;
        }
        delete this.cIds[message.cid];

        if (message.error) {
          executor.reject(<SocketError>message.error);
        } else {
          executor.resolve(message);
        }
      }
    }

    return new Promise((resolve, reject) => {
      this.adapter.onOpen = (evt: WebSocket.Event) => {
        if (this.verbose) {
          console.log(evt);
        }

        this.pingPong();
        resolve(session);
      }
      this.adapter.onError = (evt: WebSocket.Event) => {
        reject(evt);
        this.adapter.close();
      }

      setTimeout(() => {
        // if promise has resolved by now, the reject() is a no-op
        reject("The socket timed out when trying to connect.");
      }, connectTimeoutMs);
    });
  }

  disconnect(fireDisconnectEvent: boolean = true) {
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


  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | CustomStatusEvent |
    ChannelMessageRemove | MessageTypingEvent | LastSeenMessageEvent | Rpc | StatusFollow | StatusUnfollow | StatusUpdate | Ping |
    WebrtcSignalingFwd | IncomingCallPush | MessageButtonClicked | DropdownBoxSelected | ChannelAppEvent | EphemeralMessageSend, sendTimeout = DefaultSocket.DefaultSendTimeoutMs): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      }
      else {
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
        }

        const cid = this.generatecid();
        this.cIds[cid] = {resolve, reject};
        setTimeout(() => {
          reject("The socket timed out while waiting for a response.")
        }, sendTimeout);

        /** Add id for promise executor. */
        untypedMessage.cid = cid;
        this.adapter.send(untypedMessage);
      }
    });
  }

  
  async joinClanChat(clan_id: string): Promise<ClanJoin> {
    
    const response = await this.send({
      clan_join: {
          clan_id: clan_id,          
      }
    });

    return response.clan_join;
  }

  async joinChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<Channel> {

    const response = await this.send({
        channel_join: {
            clan_id: clan_id,
            channel_id: channel_id,
            channel_type: channel_type,
            is_public: is_public          
        }
      }
    );

    return response.channel;
  }

  leaveChat(clan_id: string, channel_id: string, channel_type: number, is_public: boolean): Promise<void> {
    return this.send({channel_leave: {clan_id: clan_id, channel_id: channel_id, channel_type: channel_type, is_public: is_public}});
  }

  async removeChatMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, message_id: string): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_remove: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          message_id: message_id,
          is_public: is_public
        }
      }
    );

    return response.channel_message_ack;
  }

  async updateChatMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, message_id: string, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, hideEditted?: boolean): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_update: {clan_id: clan_id, channel_id: channel_id, message_id: message_id, content: content, mentions: mentions, attachments: attachments, mode: mode, is_public: is_public, hide_editted: hideEditted}});
    return response.channel_message_ack;
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({status_update: {status: status}});
  }

  async writeEphemeralMessage(
    receiver_id: string,
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
    topic_id?: string
  ): Promise<ChannelMessageAck> {
    try {
      const response = await this.send({
      ephemeral_message_send: {
        receiver_id: receiver_id,
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
        }
      }
    });
    return response.channel_message;
    } catch (error) {
      console.log('writeEphemeralMessage', error)
      throw error
    }
    
  }

  async writeChatMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?: boolean, avatar?: string, code?: number, topic_id?: string): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_send: {clan_id: clan_id, channel_id: channel_id, mode: mode, is_public: is_public, content: content, mentions: mentions, attachments: attachments, references: references, anonymous_message: anonymous_message, mention_everyone: mention_everyone, avatar: avatar, code, topic_id}});
    return response.channel_message_ack;
  }

  async writeMessageReaction(id: string, clan_id: string, channel_id: string, mode: number, is_public: boolean, message_id: string, emoji_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean): Promise<ApiMessageReaction> {
    const response = await this.send({message_reaction_event: {id: id, clan_id: clan_id, channel_id: channel_id, mode: mode, is_public: is_public, message_id: message_id, emoji_id: emoji_id, emoji: emoji, count: count, message_sender_id: message_sender_id, action: action_delete}});
    return response.message_reaction_event
  }

  async writeMessageTyping(clan_id: string, channel_id: string, mode: number, is_public: boolean): Promise<MessageTypingEvent> {
    const response = await this.send({message_typing_event: {clan_id: clan_id, channel_id: channel_id, mode:mode, is_public: is_public}});
    return response.message_typing_event
  }

  async writeLastSeenMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp_seconds: number): Promise<LastSeenMessageEvent> {
    const response = await this.send({last_seen_message_event: {clan_id: clan_id, channel_id: channel_id, mode: mode, message_id: message_id, timestamp_seconds: timestamp_seconds}});
    return response.last_seen_message_event
  }

  async writeLastPinMessage(clan_id: string, channel_id: string, mode: number, is_public: boolean, message_id: string, timestamp_seconds: number, operation: number): Promise<LastPinMessageEvent> {
    const response = await this.send({last_pin_message_event: {clan_id: clan_id, channel_id: channel_id, mode: mode, is_public: is_public, message_id: message_id, timestamp_seconds: timestamp_seconds, operation: operation}});
    return response.last_pin_message_event
  }

  async writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent> {
    const response = await this.send({voice_joined_event: {clan_id: clanId, clan_name: clanName, id: id, participant: participant, voice_channel_id: voiceChannelId, voice_channel_label: voiceChannelLabel, last_screenshot: lastScreenshot}});
    return response.voice_joined_event
  }

  async writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string): Promise<VoiceLeavedEvent> {
    const response = await this.send({voice_leaved_event: {id: id, clan_id: clanId, voice_channel_id: voiceChannelId, voice_user_id: voiceUserId}});
    return response.voice_leaved_event
  }

  async writeCustomStatus(clan_id: string, status: string): Promise<CustomStatusEvent> {
    const response = await this.send({custom_status_event: {clan_id: clan_id, status: status}});
    return response.custom_status_event
  }
  
  async checkDuplicateClanName(clan_name: string): Promise<ClanNameExistedEvent> {
    const response = await this.send({clan_name_existed_event: {clan_name: clan_name}});
    return response.clan_name_existed_event
  }

  async listClanEmojiByClanId(clan_id: string): Promise<EmojiListedEvent> {
    const response = await this.send({emojis_listed_event: {clan_id: clan_id}});
    return response.emojis_listed_event
  }

  async ListChannelByUserId(): Promise<ChannelDescListEvent> {
    const response = await this.send({channel_desc_list_event: {}});
    return response.channel_desc_list_event
  }

  async hashtagDMList(user_id: Array<string>, limit: number): Promise<HashtagDmListEvent> {
    const response = await this.send({hashtag_dm_list_event: {user_id: user_id, limit: limit }});
    return response.hashtag_dm_list_event
  }

  async listClanStickersByClanId(clan_id: string): Promise<StrickerListedEvent> {
    const response = await this.send({sticker_listed_event: {clan_id: clan_id}});
    return response.sticker_listed_event
  }

  async  getNotificationChannelSetting(channel_id: string): Promise<NotificationChannelSettingEvent> {
    const response = await this.send({notification_channel_setting_event: {channel_id: channel_id}})
    return response.notification_channel_setting_event
  }

  async getNotificationCategorySetting(category_id: string): Promise<NotificationCategorySettingEvent> {
    const response = await this.send({notification_category_setting_event: {category_id: category_id}})
    return response.notification_category_setting_event
  }

  async getNotificationClanSetting(clan_id: string): Promise<NotificationClanSettingEvent> {
    const response = await this.send({notification_clan_setting_event: {clan_id: clan_id}})
    return response.notification_clan_setting_event
  }

  async getNotificationReactMessage(channel_id: string): Promise<NotifiReactMessageEvent> {
    const response = await this.send({notifi_react_message_event: {channel_id: channel_id}})
    return response.notifi_react_message_event
  }

  private async pingPong(): Promise<void> {
    if (!this.adapter.isOpen()) {
        return;
    }

    try {
        await this.send({ping: {}}, this._heartbeatTimeoutMs);
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

    // reuse the timeout as the interval for now.
    // we can separate them out into separate values if needed later.
    setTimeout(() => this.pingPong(), this._heartbeatTimeoutMs);
  }

  async sendToken(receiver_id: string, amount: number) : Promise<TokenSentEvent> {
    const response = await this.send({token_sent_event: {receiver_id: receiver_id, amount: amount}});
    return response.token_sent_event;
  }
};
