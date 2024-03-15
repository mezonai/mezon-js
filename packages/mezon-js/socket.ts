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

import { decode } from 'js-base64'

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
}

/** A response from a channel join operation. */
export interface Channel {
  /** The server-assigned channel id. */
  id: string;
  /** The presences visible on the chat channel. */
  presences: Presence[];
  /** The presence of the current user, i.e. yourself. */
  self: Presence;
}

/** Join a realtime chat channel. */
interface ChannelJoin {
  channel_join: {
    /** The id of the channel to join. */
    target_id: string;
    /** The name of the channel to join. */
    target: string;
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
    channel_id: string;
  };
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  /** The unique ID of this message. */
  message_id: string;
}

/** User is react to message */
export interface MessageReactionEvent {
  // id of reaction message
  id: string;
  /** The channel this message belongs to. */
  channel_id: string;
  /** The message that user react */
  message_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  //
  sender_name?: string;
  /** Emoji list. */
  emoji: string;
  // count of emoji
  count: number;
}

/** User is react to message */
export interface MessageMentionEvent {
  /** The channel this message belongs to. */
  channel_id: string;
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
  channel_id: string;
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
export interface MessageDeletedEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  /** The message that user react */
  message_id: string;
  /** Message sender, usually a user ID. */
  deletor: string;  
}


/** User is delete to message */
export interface MessageRefEvent {
  /** The channel this message belongs to. */
  channel_id: string;
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
  channel_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
}

/** An incoming message on a realtime chat channel. */
export interface ChannelMessageEvent {
  avatar?: string;
  //The channel this message belongs to.
  channel_id: string;
  //The name of the chat room, or an empty string if this message was not sent through a chat room.
  channel_name: string;
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
  user_id_one: string;
  //The ID of the second DM user, or an empty string if this message was not sent through a DM chat.
  user_id_two: string;
  //The username of the message sender, if any.
  username: string;
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
  channel_id: string;
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
    channel_id: string;
    /** The content payload. */
    content: any;
    //
    mentions?: Array<MessageMentionEvent>;
    //
    attachments?: Array<MessageAttachmentEvent>;
  };
}

/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
  channel_message_update: {
    /** The server-assigned channel ID. */
    channel_id: string,
    /** A unique ID for the chat message to be updated. */
    message_id: string,
    /** The content payload. */
    content: any;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
  channel_message_remove: {
    /** The server-assigned channel ID. */
    channel_id: string;
    /** A unique ID for the chat message to be removed. */
    message_id: string;
  };
}

/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
  /** The unique identifier of the chat channel. */
  channel_id: string;
  /** Presences of the users who joined the channel. */
  joins: Presence[];
  /** Presences of users who left the channel. */
  leaves: Presence[];
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

/** Incoming information about a party. */
export interface Party {
  /** The unique party identifier. */
  party_id : string;
  /** True, if the party is open to join. */
  open : boolean;
  /** The maximum number of party members. */
  max_size : number;
  /** The current user in this party, i.e. yourself. */
  self : Presence;
  /** The current party leader. */
  leader : Presence;
  /** All members currently in the party. */
  presences : Presence[];
}

/** Create a party. */
export interface PartyCreate {
  party_create: {
    /** True, if the party is open to join. */
    open : boolean;
    /** The maximum number of party members. */
    max_size : number;
  }
}

/** Join a party. */
interface PartyJoin {
  party_join: {
    /** The unique party identifier. */
    party_id : string;
  }
}

/** Leave a party. */
interface PartyLeave {
  party_leave: {
    /** The unique party identifier. */
    party_id : string;
  }
}

/** Promote a new party leader. */
interface PartyPromote {
  party_promote: {
    /** The unique party identifier. */
    party_id : string;
    /** The user presence being promoted to leader. */
    presence : Presence;
  }
}

/** Announcement of a new party leader. */
export interface PartyLeader {
  /** The unique party identifier. */
  party_id : string;
  /** The presence of the new party leader. */
  presence : Presence;
}

/** Accept a request to join. */
interface PartyAccept {
  party_accept: {
    /** The unique party identifier. */
    party_id : string;
    /** The presence being accepted to join the party. */
    presence : Presence;
  }
}

/** End a party, kicking all party members and closing it. */
interface PartyClose {
  party_close: {
    /** The unique party identifier. */
    party_id : string;
  }
}

/** Incoming party data delivered from the server. */
export interface PartyData {
  /** The unique party identifier. */
  party_id: string;
  /** A reference to the user presence that sent this data, if any. */
  presence: Presence;
  /** The operation code the message was sent with. */
  op_code: number;
  /** Data payload, if any. */
  data: Uint8Array;
}

/** A client to server request to send data to a party. */
interface PartyDataSend {
  party_data_send: {
    /** The unique party identifier. */
    party_id : string;
    /** The operation code the message was sent with. */
    op_code : number;
    /** Data payload, if any. */
    data : string | Uint8Array;
  }
}

/** Incoming notification for one or more new presences attempting to join the party. */
export interface PartyJoinRequest {
  /** The ID of the party to get a list of join requests for. */
  party_id : string;
  /** Presences attempting to join, or who have joined. */
  presences : Presence[];
}

/** Request a list of pending join requests for a party. */
export interface PartyJoinRequestList {
  party_join_request_list: {
    /** The ID of the party to get a list of join requests for. */
    party_id : string;
  }
}

/** Begin matchmaking as a party. */
interface PartyMatchmakerAdd {
  party_matchmaker_add: {
    /** The ID of the party to create a matchmaker ticket for. */
    party_id : string;
    /** Minimum total user count to match together. */
    min_count : number;
    /** Maximum total user count to match together. */
    max_count : number;
    /** Filter query used to identify suitable users. */
    query : string;
    /** String properties describing the party (e.g. region). */
    string_properties? : Record<string, string>;
    /** Numeric properties describing the party (e.g. rank). */
    numeric_properties? : Record<string, number>;
  }
}

/** Cancel a party matchmaking process using a ticket. */
interface PartyMatchmakerRemove {
  party_matchmaker_remove: {
    /** The ID of the party to cancel a matchmaker ticket for. */
    party_id : string;
    /** The ticket to remove. */
    ticket : string;
  }
}

/** A response from starting a new party matchmaking process. */
export interface PartyMatchmakerTicket {
  /** The ID of the party. */
  party_id: string;
  /** The matchmaker ticket created. */
  ticket: string;
}

/** Presence update for a particular party. */
export interface PartyPresenceEvent {
  /** The ID of the party. */
  party_id : string;
  /** The user presences that have just joined the party. */
  joins : Presence[];
  /** The user presences that have just left the party. */
  leaves : Presence[];
}

/** Kick a party member, or decline a request to join. */
interface PartyRemove {
  party_remove: {
    /** The ID of the party to remove/reject from. */
    party_id : string;
    /** The presence to remove/reject. */
    presence : Presence;
  }
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
  /** Connect to the server. */
  connect(session: Session, createStatus: boolean): Promise<Session>;

  /** Disconnect from the server. */
  disconnect(fireDisconnectEvent: boolean): void;

  /** Accept a request to join. */
  acceptPartyMember(party_id : string, presence : Presence) : Promise<void>;

  /** End a party, kicking all party members and closing it. */
  closeParty(party_id : string) : Promise<void>;

  /** Create a party. */
  createParty(open : boolean, max_size : number) : Promise<Party>;

  /** Subscribe to one or more users for their status updates. */
  followUsers(user_ids: string[]) : Promise<Status>;

  /** Join a chat channel on the server. */
  joinChat(target_id: string, target: string, type: number, persistence: boolean, hidden: boolean) : Promise<Channel>;

  /** Join a party. */
  joinParty(party_id: string) : Promise<void>;

  /** Leave a chat channel on the server. */
  leaveChat(channel_id: string) : Promise<void>;

  /** Leave a multiplayer match on the server. */
  leaveMatch(matchId : string) : Promise<void>;

  /** Leave a party. */
  leaveParty(party_id: string) : Promise<void>;

  /** Request a list of pending join requests for a party. */
  listPartyJoinRequests(party_id : string) : Promise<PartyJoinRequest>;

  /** Promote a new party leader. */
  promotePartyMember(party_id : string, party_member : Presence) : Promise<PartyLeader>;

  /** Remove a chat message from a chat channel on the server. */
  removeChatMessage(channel_id: string, message_id: string) : Promise<ChannelMessageAck>;

  /** Kick a party member, or decline a request to join. */
  removePartyMember(party_id : string, presence : Presence) : Promise<void>;

  /** Execute an RPC function to the server. */
  rpc(id?: string, payload?: string, http_key?: string) : Promise<ApiRpc>

  /** Send data to a party. */
  sendPartyData(party_id : string, opcode : number, data : string | Uint8Array) : Promise<void>;

  /** Unfollow one or more users from their status updates. */
  unfollowUsers(user_ids : string[]) : Promise<void>;

  /** Update a chat message on a chat channel in the server. */
  updateChatMessage(channel_id: string, message_id : string, content: any) : Promise<ChannelMessageAck>;

  /** Update the status for the current user online. */
  updateStatus(status? : string) : Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(clan_id: string, channel_id: string, content?: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>) : Promise<ChannelMessageAck>;

  /** Send message typing */
  writeMessageTyping(channel_id: string) : Promise<MessageTypingEvent>;  

  /** Send message reaction */
  writeMessageReaction(id: string, channel_id: string, message_id: string, emoji: string, message_sender_id: string, action_delete: boolean) : Promise<MessageReactionEvent>;

  /** Send message mention */
  writeMessageDeleted(channel_id: string, message_id: string, deletor: string) : Promise<MessageDeletedEvent>;

  /** Send last seen message */
  writeLastSeenMessage(channel_id: string, message_id: string) : Promise<LastSeenMessageEvent>;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: Event) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: Event) => void;

  /** Receive notifications from the socket. */
  onnotification: (notification: Notification) => void;

  /** Receive party events. */
  onparty: (party : Party) => void;

  /** Receive party close events. */
  onpartyclose: (partyClose : PartyClose) => void;

  /** Receive party data updates. */
  onpartydata: (partyData: PartyData) => void;

  /** Receive party join requests, if party leader. */
  onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;

  /** Receive announcements of a new party leader. */
  onpartyleader: (partyLeader : PartyLeader) => void;

  /** Receive a presence update for a party. */
  onpartypresence: (partyPresence : PartyPresenceEvent) => void;

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

  /** Receive channel message. */
  onchannelmessage: (channelMessage: ChannelMessageEvent) => void;

  /** Receive typing event */
  onmessagetyping: (messageTypingEvent: MessageTypingEvent) => void;

  /** Receive reaction event */
  onmessagereaction: (messageReactionEvent: MessageReactionEvent) => void;

  /** Receive deleted message */
  onmessagedeleted: (messageDeletedEvent: MessageDeletedEvent) => void;

  /** Receive channel presence updates. */
  onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;

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
        } else if (message.status_presence_event) {
          this.onstatuspresence(<StatusPresenceEvent>message.status_presence_event);
        } else if (message.stream_presence_event) {
          this.onstreampresence(<StreamPresenceEvent>message.stream_presence_event);
        } else if (message.stream_data) {
          this.onstreamdata(<StreamData>message.stream_data);
        } else if (message.channel_message) {                    
          try {
            var e: ChannelMessageEvent = {
              avatar: message.channel_message.avatar,
              channel_id: message.channel_message.channel_id,
              channel_name: message.channel_message.channel_name,
              clan_id: message.channel_message.clan_id,
              code: message.channel_message.code,
              content: JSON.parse(message.channel_message.content),
              create_time: message.channel_message.create_time,
              id: message.channel_message.message_id,
              sender_id: message.channel_message.sender_id,
              update_time: message.channel_message.update_time,
              user_id_one: message.channel_message.user_id_one,
              user_id_two: message.channel_message.user_id_two,
              username: message.channel_message.username,
              reactions: JSON.parse(message.channel_message.reactions),
              mentions: JSON.parse(message.channel_message.mentions),
              attachments: JSON.parse(message.channel_message.attachments),
              references: JSON.parse(message.channel_message.references)
            };
            this.onchannelmessage(e);
          } catch(e) {
            //console.log("error parse data", e);
          }          
        } else if (message.message_typing_event) {
          this.onmessagetyping(<MessageTypingEvent>message.message_typing_event);
        } else if (message.message_reaction_event) {
          this.onmessagereaction(<MessageReactionEvent>message.message_reaction_event);
        } else if (message.message_deleted_event) {
          this.onmessagedeleted(<MessageDeletedEvent>message.message_deleted_event);
        } else if (message.channel_presence_event) {
          this.onchannelpresence(<ChannelPresenceEvent>message.channel_presence_event);
        } else if (message.party_data) {
          message.party_data.op_code = parseInt(message.party_data.op_code);
          this.onpartydata(<PartyData>message.party_data);
        } else if (message.party_close) {
          this.onpartyclose(<PartyClose>message.party_close);
        } else if (message.party_join_request) {
          this.onpartyjoinrequest(message.party_join_request);
        } else if (message.party_leader) {
          this.onpartyleader(<PartyLeader> message.party_leader);
        } else if (message.party_presence_event) {
          this.onpartypresence(<PartyPresenceEvent> message.party_presence_event);
        } else if (message.party) {
          this.onparty(<Party> message.party);
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

  onmessagedeleted(messagedeleted: MessageDeletedEvent) {
    if (this.verbose && window && window.console) {
      console.log(messagedeleted);
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

  onnotification(notification: Notification) {
    if (this.verbose && window && window.console) {
      console.log(notification);
    }
  }

  onparty(party : Party) {
    if (this.verbose && window && window.console) {
      console.log(party);
    }
  }

  onpartyclose(close: PartyClose) {
    if (this.verbose && window && window.console) {
      console.log("Party closed: " + close);
    }
  }

  onpartyjoinrequest(partyJoinRequest : PartyJoinRequest) {
    if (this.verbose && window && window.console) {
      console.log(partyJoinRequest);
    }
  }

  onpartydata(partyData: PartyData) {
    if (this.verbose && window && window.console) {
      console.log(partyData);
    }
  }

  onpartyleader(partyLeader: PartyLeader) {
    if (this.verbose && window && window.console) {
      console.log(partyLeader);
    }
  }

  onpartymatchmakerticket(partyMatched: PartyMatchmakerTicket) {
    if (this.verbose && window && window.console) {
      console.log(partyMatched);
    }
  }


  onpartypresence(partyPresence: PartyPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(partyPresence);
    }
  }

  onstatuspresence(statusPresence: StatusPresenceEvent) {
    if (this.verbose && window && window.console) {
      console.log(statusPresence);
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

  send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate |
    ChannelMessageRemove | MessageTypingEvent | LastSeenMessageEvent | PartyAccept | PartyClose | PartyCreate | PartyDataSend | PartyJoin |
    PartyJoinRequestList | PartyLeave | PartyMatchmakerAdd | PartyMatchmakerRemove | PartyPromote |
    PartyRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate | Ping, sendTimeout = DefaultSocket.DefaultSendTimeoutMs): Promise<any> {
    const untypedMessage = message as any;

    return new Promise<void>((resolve, reject) => {
      if (!this.adapter.isOpen()) {
        reject("Socket connection has not been established yet.");
      }
      else {
        if (untypedMessage.party_data_send) {
            this.adapter.send(untypedMessage);
            resolve();
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
      }

      if (this.verbose && window && window.console) {
        const loggedMessage = { ...untypedMessage };

        if (loggedMessage.match_data_send && loggedMessage.match_data_send.data) {
          loggedMessage.match_data_send.data = decode(loggedMessage.match_data_send.data);
        } else if (loggedMessage.party_data_send && loggedMessage.party_data_send.data) {
          loggedMessage.party_data_send.data = decode(loggedMessage.party_data_send.data);
        }

        console.log("Sent message: %o", JSON.stringify(loggedMessage));
      }
    });
  }

  acceptPartyMember(party_id: string, presence: Presence): Promise<void> {
    return this.send({party_accept: {party_id: party_id, presence: presence}});
  }

  async closeParty(party_id: string): Promise<void> {
    return await this.send({party_close: {party_id: party_id}});
  }

  async createParty(open: boolean, max_size: number): Promise<Party> {
    const response = await this.send({party_create: {open: open, max_size: max_size}});
    return response.party;
  }

  async followUsers(userIds : string[]): Promise<Status> {
    const response = await this.send({status_follow: {user_ids: userIds}});
    return response.status;
  }

  async joinChat(target_id: string, target: string, type: number, persistence: boolean, hidden: boolean): Promise<Channel> {

    const response = await this.send({
        channel_join: {
            target_id: target_id,
            target: target,
            type: type,
            persistence: persistence,
            hidden: hidden
        }
      }
    );

    return response.channel;
  }

  async joinParty(party_id: string): Promise<void> {
    return await this.send({party_join: {party_id: party_id}});
  }

  leaveChat(channel_id: string): Promise<void> {
    return this.send({channel_leave: {channel_id: channel_id}});
  }

  leaveMatch(matchId: string): Promise<void> {
    return this.send({match_leave: {match_id: matchId}});
  }

  leaveParty(party_id: string): Promise<void> {
    return this.send({party_leave: {party_id: party_id}});
  }

  async listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest> {
    const response = await this.send({party_join_request_list: {party_id: party_id}});
    return response.party_join_request;
  }

  async promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader> {
    const response = await this.send({party_promote: {party_id: party_id, presence: party_member}});
    return response.party_leader;
  }

  async removeChatMessage(channel_id: string, message_id: string): Promise<ChannelMessageAck> {
    const response = await this.send(
      {
        channel_message_remove: {
          channel_id: channel_id,
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

  async updateChatMessage(channel_id: string, message_id : string, content: any): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_update: {channel_id: channel_id, message_id: message_id, content: content}});
    return response.channel_message_ack;
  }

  updateStatus(status?: string): Promise<void> {
    return this.send({status_update: {status: status}});
  }

  async writeChatMessage(clan_id: string, channel_id: string, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef> ): Promise<ChannelMessageAck> {
    const response = await this.send({channel_message_send: {clan_id: clan_id, channel_id: channel_id, content: content, mentions: mentions, attachments: attachments, references: references}});
    return response.channel_message_ack;
  }

  async writeMessageReaction(id: string, channel_id: string, message_id: string, emoji: string, message_sender_id: string, action_delete: boolean) : Promise<MessageReactionEvent> {
    const response = await this.send({message_reaction_event: {id: id, channel_id: channel_id, message_id: message_id, emoji: emoji, message_sender_id:message_sender_id, action: action_delete}});
    return response.message_reaction_event
  }

  async writeMessageDeleted(channel_id: string, message_id: string) : Promise<MessageDeletedEvent> {
    const response = await this.send({message_deleted_event: {channel_id: channel_id, message_id: message_id}});
    return response.message_deleted_event
  }

  async writeMessageTyping(channel_id: string) : Promise<MessageTypingEvent> {
    const response = await this.send({message_typing_event: {channel_id: channel_id}});
    return response.message_typing_event
  }

  async writeLastSeenMessage(channel_id: string, message_id: string) : Promise<LastSeenMessageEvent> {
    const response = await this.send({last_seen_message_event: {channel_id: channel_id, message_id: message_id}});
    return response.last_seen_message_event
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
