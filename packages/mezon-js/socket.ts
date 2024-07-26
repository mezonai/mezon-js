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

import {ApiMessageAttachment, ApiMessageMention, ApiMessageReaction, ApiMessageRef, ApiNotification, ApiRpc} from "./api.gen";
import {Session} from "./session";
import {Notification} from "./client";
import {WebSocketAdapter, WebSocketAdapterText} from "./web_socket_adapter"

/** Stores function references for resolve/reject with a DOM Promise. */
interface PromiseExecutor {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}
/** An object which represents a connected user in the server. */
export interface Presence {
  /** The id of the user. */
  user_id: string;
  /** The session id of the user. */
  session_id: string;
  /** The username of the user. */
  username: string;
  /** The node the user is connected to. */
  node: string;
  /** The status of the user */
  status: string;
}

/** A response from a channel join operation. */
export interface Channel {
  /** The server-assigned channel id. */
  id: string;
  // label
  chanel_label: string;
  /** The presences visible on the chat channel. */
  presences: Presence[];
  /** The presence of the current user, i.e. yourself. */
  self: Presence;
  // The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clan_logo: string;
  // The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  category_name: string;
}

export interface ClanJoin {
  clan_join: {
    clan_id: string;
  }
}

/** Join a realtime chat channel. */
interface ChannelJoin {
  channel_join: {
    /** The id of the channel to join. */
    channel_id: string;
    /** The name of the channel to join. */
    channel_label: string;
    /** The channel type: 1 = Channel, 2 = Direct Message, 3 = Group. */
    type: number;
    /** Whether channel messages are persisted in the database. */
    persistence: boolean;
    /** Whether the user's channel presence is hidden when joining. */
    hidden: boolean;
  };
}

/** Leave a realtime chat channel. */
interface ChannelLeave {
  channel_leave: {
    /** The id of the channel to leave. */
    channel_id:string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
  };
}

/** UserChannelAddedEvent */
export interface UserChannelAddedEvent {
  // the channel id
  channel_id: string;
  // the user
  users: AddUsers[];
  // the custom status
  status: string;
  // the clan id
  clan_id: string;
  // the channel type
  channel_type: number;
}

export interface AddUsers {
  // User IDs to follow.
  user_id: string;
  // Avatar to follow.
  avatar: string;
  // Username to follow.
  username: string;
}

export interface UserChannelRemovedEvent {
  // the channel id
  channel_id: string;
  // the user_id
  user_ids: string[];
}

export interface UserClanRemovedEvent {
  // the clan id
  clan_id: string;
  // the user_id
  user_ids: string[];
}

/** Last seen message by user */
export interface LastPinMessageEvent {
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The unique ID of this message. */
  message_id: string;
  /** user id */
  user_id: string;
  /** operation */
  operation: number;
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The unique ID of this message. */
  message_id: string;
}

/** User is react to message */
export interface MessageReactionEvent {
  // id of reaction message
  id: string;
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The message that user react */
  message_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  //
  sender_name?: string;
  //
  sender_avatar?: string;
  /** Emoji list. */
  emoji: string;
  // count of emoji
  count: number;
  // action
  action: boolean;
}

/** User is react to message */
export interface MessageMentionEvent {
  /** The channel this message belongs to. */
  channel_id:string;
// The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The message that user react */
  message_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;  
  // mention user id
  user_id: string;
  // mention username
  username: string;
}

/** User is react to message */
export interface MessageAttachmentEvent {
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The message that user react */
  message_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string; 
  // Attachment file name
  filename: string;
  // Attachment file size
  size: number;
  // Attachment url
  url: string;
  // Attachment file type
  filetype: string;
  // Attachment width
  width?: number;
  // Attachment width
  height?: number;
}

/** User is delete to message */
export interface MessageRefEvent {
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The message that user react */
  message_id: string;
  /** Message reference ID. */
  message_ref_id: string;
  /** reference type */
  ref_type: number;
}

/** User is typing */
export interface MessageTypingEvent {
  /** The channel this message belongs to. */
  channel_id:string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
}

/** An incoming message on a realtime chat channel. */
export interface ChannelMessageEvent {
  avatar?: string;
  //The channel this message belongs to.
  channel_id:string;
  // The mode
  mode: number;
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
  //The unique ID of this message.
  id: string;
  //True if the message was persisted to the channel's history, false otherwise.
  persistent?: boolean;
  //Message sender, usually a user ID.
  sender_id: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated.
  update_time: string;
  //The ID of the first DM user, or an empty string if this message was not sent through a DM chat.
  clan_logo: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  category_name: string;
  //The username of the message sender, if any.
  username: string;
  // The clan nick name
  clan_nick: string;
  // The clan avatar
  clan_avatar: string;
  // The display name
  display_name: string;
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
  //
  referenced_message?: ChannelMessageEvent;
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  /** The server-assigned channel ID. */
  channel_id:string;
  // The mode
  mode: number;
  /** A unique ID for the chat message. */
  message_id: string;
  /** A user-defined code for the chat message. */
  code: number;
  /** The username of the sender of the message. */
  username: string;
  /** The UNIX time when the message was created. */
  create_time: string;
  /** The UNIX time when the message was updated. */
  update_time: string;
  /** True if the chat message has been stored in history. */
  persistence: boolean;
}

/** Send a message to a realtime chat channel. */
interface ChannelMessageSend {
  channel_message_send: {
    /** Clan Id */
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id:string;
    // The mode
    mode: number;
    // channel label
    channel_label: string;
    /** The content payload. */
    content: any;
    //
    mentions?: Array<MessageMentionEvent>;
    //
    attachments?: Array<MessageAttachmentEvent>;
    //
    anonymous_message?: boolean;
    //
    mention_everyone?: boolean;
    //
    notifi_content: any;
  };
}

/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
  channel_message_update: {
    /** The server-assigned channel ID. */
    channel_id: string,
     /** The server-assigned channel label. */
   
    /** A unique ID for the chat message to be updated. */
    message_id: string,
    /** The content payload. */
    content: any,
    /** The mode payload. */
    mode: number;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
  channel_message_remove: {
    /** The server-assigned channel ID. */
    channel_id:string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    /** A unique ID for the chat message to be removed. */
    message_id: string;
  };
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  /** The unique identifier of the chat channel. */
  channel_id: string;
  // The channel name
  channel_label: string;
  // The mode
  mode: number;
  /** Presences of the users who joined the channel. */
  joins: Presence[];
  /** Presences of users who left the channel. */
  leaves: Presence[];
}

export interface VoiceEndedEvent {
  // id voice
  id: string;
  // The unique identifier of the chat clan.
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
}

export interface VoiceStartedEvent {
  // id voice
  id: string;
  // The unique identifier of the chat clan.
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
}

export interface VoiceLeavedEvent {
  // event id
  id: string;
  // clan id
  clan_id: string;
  // voice channel name
  voice_channel_id: string;
  // voice user id
  voice_user_id: string;
}

export interface VoiceJoinedEvent {
  /** The unique identifier of the chat channel. */
  clan_id: string;
  // The channel name
  clan_name: string;
  // id voice
  id: string;
  // voice participant
  participant: string;
  // user id
  user_id: string;
  // voice channel label
  voice_channel_label: string;
  // voice channel id
  voice_channel_id: string;
  // last screenshot
  last_screenshot: string;  
}

export interface CustomStatusEvent {
  // the clan id
  clan_id: string;
  // the user id
  user_id: string;
  // username
  username: string;
  // the status
  status: string;
}

export interface ChannelUpdatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parrent_id
  parrent_id: string;
  // channel id
  channel_id: string;
  // channel label
  channel_label: string;
  // channel type
  channel_type: number;
  // status
  status: number;
}

export interface ChannelCreatedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // creator
  creator_id: string;
  // parrent_id
  parrent_id: string;
  // channel id
  channel_id: string;
  // channel label
  channel_label: string;
  // channel private
  channel_private: number;
  // channel type
  channel_type: number;
  // status
  status: number;
}

export interface ChannelDeletedEvent {
  // clan id
  clan_id: string;
  // category
  category_id: string;
  // channel id
  channel_id: string;
  // deletor
  deletor: string;
}


/** Stream identifier */
export interface StreamId {
  /** The type of stream (e.g. chat). */
  mode: number;
  /** The primary stream subject, usually a user id. */
  subject: string;
  /** A secondary stream subject, for example for a direct chat. */
  descriptor: string;
  /** Meta-information (e.g. chat room name). */
  label: string;
}

/** Stream data. */
export interface StreamData {
  /** The stream identifier. */
  stream: StreamId;
  /** A reference to the user presence that sent this data, if any. */
  sender?: Presence;
  /** Arbitrary contents of the data message. */
  data: string;
  /** True if this data was delivered reliably. */
  reliable?: boolean;
}

/** Presence updates. */
export interface StreamPresenceEvent {
  /** The stream identifier. */
  stream: StreamId;
  /** Presences of users who joined the stream. */
  joins: Presence[];
  /** Presences of users who left the stream. */
  leaves: Presence[];
}

/** Execute an Lua function on the server. */
interface Rpc {
  rpc: ApiRpc;
}

/** Application-level heartbeat ping. */
interface Ping {

}

/** A snapshot of statuses for some set of users. */
export interface Status {
  /** The user presences to view statuses of. */
  presences: Presence[];
}

/** Start receiving status updates for some set of users. */
interface StatusFollow {
  /** The IDs of the users to follow. */
  status_follow: {user_ids: string[];}
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  /** This join information is in response to a subscription made to be notified when a user comes online. */
  joins: Presence[];
  /** This join information is in response to a subscription made to be notified when a user goes offline. */
  leaves: Presence[];
}

/** Stop receiving status updates for some set of users. */
interface StatusUnfollow {
  /** The IDs of user to unfollow. */
  status_unfollow: {user_ids: string[];};
}

/** Set the user's own status. */
interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status_update: {status?: string;};
}

/** A socket connection to Mezon server. */
export interface Socket {
  /** Connection is Open */
  isOpen(): boolean;

  /** Connect to the server. */
  connect(session: Session, createStatus: boolean): Promise<Session>;

  /** Disconnect from the server. */
  disconnect(fireDisconnectEvent: boolean): void;

  /** Subscribe to one or more users for their status updates. */
  followUsers(user_ids: string[]) : Promise<Status>;

  /** Join clan chat */
  joinClanChat(clan_id: string) : Promise<ClanJoin>;

  /** Join a chat channel on the server. */
  joinChat(clan_id: string, channel_id: string, channel_type: number) : Promise<Channel>;

  /** Leave a chat channel on the server. */
  leaveChat(clan_id: string, channel_id: string, channel_type: number) : Promise<void>;

  /** Remove a chat message from a chat channel on the server. */
  removeChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string) : Promise<ChannelMessageAck>;

  /** Execute an RPC function to the server. */
  rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc>

  /** Unfollow one or more users from their status updates. */
  unfollowUsers(user_ids : string[]) : Promise<void>;

  /** Update a chat message on a chat channel in the server. */
  updateChatMessage(clan_id: string, channel_id: string, mode: number, message_id : string, content: any) : Promise<ChannelMessageAck>;

  /** Update the status for the current user online. */
  updateStatus(status? : string) : Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(clan_id: string, channel_id: string, mode: number, content?: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?:boolean, notifi_content?: any) : Promise<ChannelMessageAck>;

  /** Send message typing */
  writeMessageTyping(clan_id: string, channel_id: string, mode: number) : Promise<MessageTypingEvent>;  

  /** Send message reaction */
  writeMessageReaction(id: string, clan_id: string, channel_id: string, mode: number, message_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean) : Promise<MessageReactionEvent>;

  /** Send last seen message */
  writeLastSeenMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp: string) : Promise<LastSeenMessageEvent>;

  /** Send last pin message */
  writeLastPinMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp: string, operation: number) : Promise<LastPinMessageEvent>;

  /** Send custom user status */
  writeCustomStatus(clan_id: string, status: string) : Promise<CustomStatusEvent>;

  /** send voice joined */
  writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string) : Promise<VoiceJoinedEvent>;

  /** send voice leaved */
  writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string) : Promise<VoiceLeavedEvent>;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: Event) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: Event) => void;

  /** Receive notifications from the socket. */
  onnotification: (notification: Notification) => void;

  /** Receive status presence updates. */
  onstatuspresence: (statusPresence: StatusPresenceEvent) => void;

  /** Receive stream presence updates. */
  onstreampresence: (streamPresence: StreamPresenceEvent) => void;

  /** Receive stream data. */
  onstreamdata: (streamData: StreamData) => void;

  /**
   * An application-level heartbeat timeout that fires after the client does not receive a pong from the server after the heartbeat interval.
   * Most browsers maintain an internal heartbeat, in which case its unlikely you'll need to use this callback. However, Chrome does not implement an internal heartbeat.
   * We fire this separately from `onclose` because heartbeats fail when there's no connectivity, and many browsers don't fire `onclose` until the closing handshake either succeeds or fails.
   * In any case, be aware that `onclose` will still fire if there is a heartbeat timeout in a potentially delayed manner.
   */
  onheartbeattimeout: () => void;

  oncustomstatus: (statusEvent: CustomStatusEvent) => void;

  /** Receive channel message. */
  onchannelmessage: (channelMessage: ChannelMessageEvent) => void;

  /** Receive typing event */
  onmessagetyping: (messageTypingEvent: MessageTypingEvent) => void;

  /** Receive reaction event */
  onmessagereaction: (messageReactionEvent: MessageReactionEvent) => void;

  /** Receive channel presence updates. */
  onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;

  /** pin message event */
  onpinmessage: (pin: LastPinMessageEvent) => void;
  
  /** Receive added user event */
  onuserchanneladded: (user: UserChannelAddedEvent) => void;

  /** Receive channel removed user event */
  onuserchannelremoved: (user: UserChannelRemovedEvent) => void;

  /** Receive clan removed user event */
  onuserclanremoved: (user: UserClanRemovedEvent) => void;

  // when someone start the voice room
  onvoicestarted: (voice: VoiceStartedEvent) => void;
  
  // when someone end the voice room
  onvoiceended: (voice: VoiceEndedEvent) => void;

  // when someone join to voice room
  onvoicejoined: (voiceParticipant: VoiceJoinedEvent) => void;
  
  // when someone join to voice room
  onvoiceleaved: (voiceParticipant: VoiceLeavedEvent) => void;

  // when channel is created
  onchannelcreated: (channelCreated: ChannelCreatedEvent) => void;

  // when channel is created
  onchanneldeleted: (channelDeleted: ChannelDeletedEvent) => void;

  // when channel is created
  onchannelupdated: (channelUpdated: ChannelUpdatedEvent) => void;

  /* Set the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  setHeartbeatTimeoutMs(ms : number) : void;

  /* Get the heartbeat timeout used by the socket to detect if it has lost connectivity to the server. */
  getHeartbeatTimeoutMs() :  number;
}

/** Reports an error received from a socket message. */
export interface SocketError {
  /** The error code. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
}

/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export class DefaultSocket implements Socket {
  public static readonly DefaultHeartbeatTimeoutMs = 10000;
  public static readonly DefaultSendTimeoutMs = 10000;
  public static readonly DefaultConnectTimeoutMs = 30000;

  private readonly cIds: { [key: string]: PromiseExecutor };
  private nextCid: number;
  private _heartbeatTimeoutMs: number;

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

  connect(session: Session, createStatus: boolean = false, connectTimeoutMs: number = DefaultSocket.DefaultConnectTimeoutMs): Promise<Session> {
    if (this.adapter.isOpen()) {
      return Promise.resolve(session);
    }

    const scheme = (this.useSSL) ? "wss://" : "ws://";
    this.adapter.connect(scheme, this.host, this.port, createStatus, session.token);

    this.adapter.onClose = (evt: Event) => {
      this.ondisconnect(evt);
    }

    this.adapter.onError = (evt: Event) => {
      this.onerror(evt);
    }

    this.adapter.onMessage = (message: any) => {
      if (this.verbose && window && window.console) {
        console.log("Response: %o", JSON.stringify(message));
      }

      /** Inbound message from server. */
      if (!message.cid) {
        if (message.notifications) {
          message.notifications.notifications.forEach((n: ApiNotification) => {
              n.content = n.content ? JSON.parse(n.content) : undefined;
              this.onnotification(n);
          });
        } else if (message.voice_started_event) {
          this.onvoicestarted(message.voice_started_event)
        } else if (message.voice_ended_event) {
          this.onvoiceended(message.voice_ended_event)
        } else if (message.voice_joined_event) {
          this.onvoicejoined(message.voice_joined_event)
        } else if (message.voice_leaved_event) {
          this.onvoiceleaved(message.voice_leaved_event) 
        } else if (message.channel_created_event) {
          this.onchannelcreated(message.channel_created_event) 
        } else if (message.channel_deleted_event) {
          this.onchanneldeleted(message.channel_deleted_event) 
        } else if (message.channel_updated_event) {
          this.onchannelupdated(message.channel_updated_event) 
        } else if (message.status_presence_event) {
          this.onstatuspresence(<StatusPresenceEvent>message.status_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(<StreamPresenceEvent>message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(<StreamData>message.stream_data);
        } else if (message.channel_message) {
          var content, reactions, mentions, attachments, references;
          try {                        
            content = JSON.parse(message.channel_message.content);
            reactions = JSON.parse(message.channel_message.reactions);
            mentions = JSON.parse(message.channel_message.mentions);
            attachments = JSON.parse(message.channel_message.attachments);
            references = JSON.parse(message.channel_message.references);
          } catch(e) {
            //console.log("error parse data", e);
          }
          var e: ChannelMessageEvent = {
            avatar: message.channel_message.avatar,
            channel_id: message.channel_message.channel_id,
            mode: message.channel_message.mode,
            channel_label: message.channel_message.channel_label,
            clan_id: message.channel_message.clan_id,
            code: message.channel_message.code,              
            create_time: message.channel_message.create_time,
            id: message.channel_message.message_id,
            sender_id: message.channel_message.sender_id,
            update_time: message.channel_message.update_time,
            clan_logo: message.channel_message.clan_logo,
            category_name: message.channel_message.category_name,
            username: message.channel_message.username,
            clan_nick: message.channel_message.clan_nick,
            clan_avatar: message.channel_message.clan_avatar,
            display_name: message.channel_message.display_name,
            content: content,
            reactions: reactions,
            mentions: mentions,
            attachments: attachments,
            references: references,
          };
          this.onchannelmessage(e);                  
        } else if (message.message_typing_event) {
          this.onmessagetyping(<MessageTypingEvent>message.message_typing_event);
        } else if (message.message_reaction_event) {
          this.onmessagereaction(<MessageReactionEvent>message.message_reaction_event);
        } else if (message.channel_presence_event) {
          this.onchannelpresence(<ChannelPresenceEvent>message.channel_presence_event);
        } else if (message.last_pin_message_event) {
          this.onpinmessage(<LastPinMessageEvent>message.last_pin_message_event);
        } else if (message.custom_status_event) {
          this.oncustomstatus(<CustomStatusEvent>message.custom_status_event);
        } else if (message.user_channel_added_event) {
          this.onuserchanneladded(<UserChannelAddedEvent>message.user_channel_added_event);
        } else if (message.user_channel_removed_event) {
          this.onuserchannelremoved(<UserChannelRemovedEvent>message.user_channel_removed_event);
        } else if (message.user_clan_removed_event) {
          this.onuserclanremoved(<UserClanRemovedEvent>message.user_clan_removed_event);
        } else {
          if (this.verbose && window && window.console) {
            console.log("Unrecognized message received: %o", message);
          }
        }
      } else {
        const executor = this.cIds[message.cid];
        if (!executor) {
          if (this.verbose && window && window.console) {
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
      this.adapter.onOpen = (evt: Event) => {
        if (this.verbose && window && window.console) {
          console.log(evt);
        }

        this.pingPong();
        resolve(session);
      }
      this.adapter.onError = (evt: Event) => {
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
      this.ondisconnect(<Event>{});
    }
  }

  setHeartbeatTimeoutMs(ms : number) {
    this._heartbeatTimeoutMs = ms;
  }

  getHeartbeatTimeoutMs() :  number {
    return this._heartbeatTimeoutMs;
  }

  ondisconnect(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onerror(evt: Event) {
    if (this.verbose && window && window.console) {
      console.log(evt);
    }
  }

  onmessagetyping(messagetyping: MessageTypingEvent) {
    if (this.verbose && window && window.console) {
      console.log(messagetyping);
    }
  }

  onmessagereaction(messagereaction: MessageReactionEvent) {
    if (this.verbose && window && window.console) {
      console.log(messagereaction);
    }
  }

  onchannelmessage(channelMessage: ChannelMessageEvent) {
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

  onuserchannelremoved(user: UserChannelRemovedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onuserclanremoved(user: UserClanRemovedEvent) {
    if (this.verbose && window && window.console) {
      console.log(user);
    }
  }

  onnotification(notification: Notification) {
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

  onchanneldeleted(channelDeleted: ChannelDeletedEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelDeleted);
    }
  }

  onchannelupdated(channelUpdated: ChannelUpdatedEvent) {
    if (this.verbose && window && window.console) {
      console.log(channelUpdated);
    }
  }

  onstreampresence(streamPresence: StreamPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(streamPresence);
    }
  }

  onstreamdata(streamData: StreamData) {
    if (this.verbose && window && window.console) {
      console.log(streamData);
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

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | CustomStatusEvent |
    ChannelMessageRemove | MessageTypingEvent | LastSeenMessageEvent | Rpc | StatusFollow | StatusUnfollow | StatusUpdate | Ping, sendTimeout = DefaultSocket.DefaultSendTimeoutMs): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      }
      else {
        if (untypedMessage.channel_message_send) {
          untypedMessage.channel_message_send.content = JSON.stringify(untypedMessage.channel_message_send.content);
        } else if (untypedMessage.channel_message_update) {
          untypedMessage.channel_message_update.content = JSON.stringify(untypedMessage.channel_message_update.content);
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

  async followUsers(userIds : string[]): Promise<Status> {
    const response = await this.send({status_follow: {user_ids: userIds}});
    return response.status;
  }

  async joinClanChat(clan_id: string): Promise<ClanJoin> {
    
    const response = await this.send({
      clan_join: {
          clan_id: clan_id,          
      }
    });

    return response.clan_join;
  }

  async joinChat(clan_id: string, channel_id: string, channel_type: number): Promise<Channel> {

    const response = await this.send({
        channel_join: {
            clan_id: clan_id,
            channel_id: channel_id,
            channel_type: channel_type,
        }
      }
    );

    return response.channel;
  }

  leaveChat(clan_id: string, channel_id: string, channel_type: number): Promise<void> {
    return this.send({channel_leave: {clan_id: clan_id, channel_id: channel_id, channel_type: channel_type}});
  }

  async removeChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_remove: {
          clan_id: clan_id,
          channel_id: channel_id,
          mode: mode,
          message_id: message_id
        }
      }
    );

    return response.channel_message_ack;
  }

  async removePartyMember(party_id: string, member: Presence): Promise<void> {
    return this.send({party_remove: {
      party_id: party_id,
      presence: member
    }});
  }

  async rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc> {
    const response = await this.send(
      {
        rpc: {
          id: id,
          payload: payload,
          http_key: http_key,
        }
      });

      return response.rpc;
  }

  sendPartyData(party_id: string, op_code: number, data: string | Uint8Array): Promise<void> {
    return this.send({party_data_send: {party_id: party_id, op_code: op_code, data: data}})
  }

  unfollowUsers(user_ids : string[]): Promise<void> {
    return this.send({status_unfollow: {user_ids: user_ids}});
  }

  async updateChatMessage(clan_id: string, channel_id: string, mode: number, message_id : string, content: any): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_update: {clan_id: clan_id, channel_id: channel_id, message_id: message_id, content: content, mode: mode}});
    return response.channel_message_ack;
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({status_update: {status: status}});
  }

  async writeChatMessage(clan_id: string, channel_id: string, mode: number, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?:Boolean, notifi_content?: any ): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_send: {clan_id: clan_id, channel_id: channel_id, mode:mode, content: content, mentions: mentions, attachments: attachments, references: references, anonymous_message: anonymous_message, mention_everyone:mention_everyone, notifi_content:notifi_content}});
    return response.channel_message_ack;
  }

  async writeMessageReaction(id: string, clan_id: string, channel_id: string, mode: number, message_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean) : Promise<MessageReactionEvent> {
    const response = await this.send({message_reaction_event: {id: id, clan_id: clan_id, channel_id: channel_id, mode: mode, message_id: message_id, emoji: emoji, count: count, message_sender_id: message_sender_id, action: action_delete}});
    return response.message_reaction_event
  }

  async writeMessageTyping(clan_id: string, channel_id: string, mode: number) : Promise<MessageTypingEvent> {
    const response = await this.send({message_typing_event: {clan_id: clan_id, channel_id: channel_id, mode:mode}});
    return response.message_typing_event
  }

  async writeLastSeenMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp: string) : Promise<LastSeenMessageEvent> {
    const response = await this.send({last_seen_message_event: {clan_id: clan_id, channel_id: channel_id, mode: mode, message_id: message_id, timestamp: timestamp}});
    return response.last_seen_message_event
  }

  async writeLastPinMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp: string, operation: number) : Promise<LastPinMessageEvent> {
    const response = await this.send({last_pin_message_event: {clan_id: clan_id, channel_id: channel_id, mode: mode, message_id: message_id, timestamp: timestamp, operation: operation}});
    return response.last_pin_message_event
  }

  async writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string) : Promise<VoiceJoinedEvent> {
    const response = await this.send({voice_joined_event: {clan_id: clanId, clan_name: clanName, id: id, participant: participant, voice_channel_id: voiceChannelId, voice_channel_label: voiceChannelLabel, last_screenshot: lastScreenshot}});
    return response.voice_joined_event
  }

  async writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string) : Promise<VoiceLeavedEvent> {
    const response = await this.send({voice_leaved_event: {id: id, clan_id: clanId, voice_channel_id: voiceChannelId, voice_user_id: voiceUserId}});
    return response.voice_leaved_event
  }

  async writeCustomStatus(clan_id: string, status: string) : Promise<CustomStatusEvent> {
    const response = await this.send({custom_status_event: {clan_id: clan_id, status: status}});
    return response.custom_status_event
  }

  private async pingPong() : Promise<void> {
    if (!this.adapter.isOpen()) {
        return;
    }

    try {
        await this.send({ping: {}}, this._heartbeatTimeoutMs);
    } catch {
        if (this.adapter.isOpen()) {
            if (window && window.console) {
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
};
