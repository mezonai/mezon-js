/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ChannelMessage, Notification, Rpc } from "../api/api";
import { Timestamp } from "../google/protobuf/timestamp";
import { BoolValue, Int32Value, StringValue } from "../google/protobuf/wrappers";

export const protobufPackage = "mezon.realtime";

/** The realtime protocol for Mezon server. */

/** An envelope for a realtime message. */
export interface Envelope {
  cid: string;
  /** A response from a channel join operation. */
  channel?:
    | Channel
    | undefined;
  /** Join a realtime chat clan */
  clan_join?:
    | ClanJoin
    | undefined;
  /** Join a realtime chat channel. */
  channel_join?:
    | ChannelJoin
    | undefined;
  /** Leave a realtime chat channel. */
  channel_leave?:
    | ChannelLeave
    | undefined;
  /** An incoming message on a realtime chat channel. */
  channel_message?:
    | ChannelMessage
    | undefined;
  /** An acknowledgement received in response to sending a message on a chat channel. */
  channel_message_ack?:
    | ChannelMessageAck
    | undefined;
  /** Send a message to a realtime chat channel. */
  channel_message_send?:
    | ChannelMessageSend
    | undefined;
  /** Update a message previously sent to a realtime chat channel. */
  channel_message_update?:
    | ChannelMessageUpdate
    | undefined;
  /** Remove a message previously sent to a realtime chat channel. */
  channel_message_remove?:
    | ChannelMessageRemove
    | undefined;
  /** Presence update for a particular realtime chat channel. */
  channel_presence_event?:
    | ChannelPresenceEvent
    | undefined;
  /** Describes an error which occurred on the server. */
  error?:
    | Error
    | undefined;
  /** Notifications send by the server. */
  notifications?:
    | Notifications
    | undefined;
  /** RPC call or response. */
  rpc?:
    | Rpc
    | undefined;
  /** An incoming status snapshot for some set of users. */
  status?:
    | Status
    | undefined;
  /** Start following some set of users to receive their status updates. */
  status_follow?:
    | StatusFollow
    | undefined;
  /** An incoming status update. */
  status_presence_event?:
    | StatusPresenceEvent
    | undefined;
  /** Stop following some set of users to no longer receive their status updates. */
  status_unfollow?:
    | StatusUnfollow
    | undefined;
  /** Set the user's own status. */
  status_update?:
    | StatusUpdate
    | undefined;
  /** A data message delivered over a stream. */
  stream_data?:
    | StreamData
    | undefined;
  /** Presence update for a particular stream. */
  stream_presence_event?:
    | StreamPresenceEvent
    | undefined;
  /** Application-level heartbeat and connection check. */
  ping?:
    | Ping
    | undefined;
  /** Application-level heartbeat and connection check response. */
  pong?:
    | Pong
    | undefined;
  /** User typing event */
  message_typing_event?:
    | MessageTypingEvent
    | undefined;
  /** Last seen message event */
  last_seen_message_event?:
    | LastSeenMessageEvent
    | undefined;
  /** User send reactoin event */
  message_reaction_event?:
    | MessageReactionEvent
    | undefined;
  /** user join voice channel */
  voice_joined_event?:
    | VoiceJoinedEvent
    | undefined;
  /** user leave voice channel */
  voice_leaved_event?:
    | VoiceLeavedEvent
    | undefined;
  /** voice channel start */
  voice_started_event?:
    | VoiceStartedEvent
    | undefined;
  /** voice channel end */
  voice_ended_event?:
    | VoiceEndedEvent
    | undefined;
  /** channel created event */
  channel_created_event?:
    | ChannelCreatedEvent
    | undefined;
  /** channel deleted event */
  channel_deleted_event?:
    | ChannelDeletedEvent
    | undefined;
  /** channel deleted event */
  channel_updated_event?:
    | ChannelUpdatedEvent
    | undefined;
  /** Last pin message event */
  last_pin_message_event?: LastPinMessageEvent | undefined;
}

/** A realtime chat channel. */
export interface Channel {
  /** The ID of the channel. */
  id: string;
  /** The users currently in the channel. */
  presences: UserPresence[];
  /** A reference to the current user's presence in the channel. */
  self:
    | UserPresence
    | undefined;
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  chanel_label: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
}

/** Join operation for a realtime chat channel. */
export interface ClanJoin {
  /** The id of channel or group */
  clan_id: string;
}

/** Join operation for a realtime chat channel. */
export interface ChannelJoin {
  /** The clan id */
  clan_id: string;
  /** The id of channel or group */
  channel_id: string;
  /** The type of the chat channel. */
  type: number;
  /** Whether messages sent on this channel should be persistent. */
  persistence:
    | boolean
    | undefined;
  /** Whether the user should appear in the channel's presence list and events. */
  hidden:
    | boolean
    | undefined;
  /** mode */
  mode: number;
}

/** Leave a realtime channel. */
export interface ChannelLeave {
  /** The clan id */
  clan_id: string;
  /** The ID of the channel to leave. */
  channel_id: string;
  /** mode */
  mode: number;
}

/** A receipt reply from a channel message send operation. */
export interface ChannelMessageAck {
  /** The channel the message was sent to. */
  channel_id: string;
  /** The unique ID assigned to the message. */
  message_id: string;
  /** The code representing a message type or category. */
  code:
    | number
    | undefined;
  /** Username of the message sender. */
  username: string;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
  create_time:
    | Date
    | undefined;
  /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated. */
  update_time:
    | Date
    | undefined;
  /** True if the message was persisted to the channel's history, false otherwise. */
  persistent:
    | boolean
    | undefined;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
}

/** Mention to message */
export interface MessageMention {
  /** mention user id */
  user_id: string;
  /** mention username */
  username: string;
}

/** Message attachment */
export interface MessageAttachment {
  /** Attachment file name */
  filename: string;
  /** Attachment file size */
  size: number;
  /** Attachment url */
  url: string;
  /** Attachment file type */
  filetype: string;
  /** Attachment width */
  width: number;
  /** Attachment width */
  height: number;
}

/** Message reference */
export interface MessageRef {
  /** A message source */
  message_id: string;
  /** A message reference to */
  message_ref_id: string;
  /** original message sender */
  message_sender_id: string;
  /** content reference */
  content: string;
  /** has attachment */
  has_attachment: boolean;
  /** Reference type. 0: reply */
  ref_type: number;
}

/** Send a message to a realtime channel. */
export interface ChannelMessageSend {
  /** The clan that channel belong to. */
  clan_id: string;
  /** The channel to sent to. */
  channel_id: string;
  /** Message content. */
  content: string;
  /** Message mention */
  mentions: MessageMention[];
  /** Message attachment */
  attachments: MessageAttachment[];
  /** Message reference */
  references: MessageRef[];
  /** Mode */
  mode: number;
  /** anonymous message */
  anonymous_message: boolean;
  /** mention everyone */
  mention_everyone: boolean;
}

/** Update a message previously sent to a realtime channel. */
export interface ChannelMessageUpdate {
  /** The clan that channel belong to. */
  clan_id: string;
  /** The channel the message was sent to. */
  channel_id: string;
  /** The ID assigned to the message to update. */
  message_id: string;
  /** New message content. */
  content: string;
  /** The mode */
  mode: number;
}

/** Remove a message previously sent to a realtime channel. */
export interface ChannelMessageRemove {
  /** The clan that channel belong to. */
  clan_id: string;
  /** The channel the message was sent to. */
  channel_id: string;
  /** The ID assigned to the message to update. */
  message_id: string;
  /** The mode */
  mode: number;
}

/** A set of joins and leaves on a particular channel. */
export interface ChannelPresenceEvent {
  /** The channel identifier this event is for. */
  channel_id: string;
  /** Presences joining the channel as part of this event, if any. */
  joins: UserPresence[];
  /** Presences leaving the channel as part of this event, if any. */
  leaves: UserPresence[];
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
  /** The mode */
  mode: number;
}

/** A logical error which may occur on the server. */
export interface Error {
  /** The error code which should be one of "Error.Code" enums. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
  /** Additional error details which may be different for each response. */
  context: { [key: string]: string };
}

/** The selection of possible error codes. */
export enum Error_Code {
  /** RUNTIME_EXCEPTION - An unexpected result from the server. */
  RUNTIME_EXCEPTION = 0,
  /** UNRECOGNIZED_PAYLOAD - The server received a message which is not recognised. */
  UNRECOGNIZED_PAYLOAD = 1,
  /** MISSING_PAYLOAD - A message was expected but contains no content. */
  MISSING_PAYLOAD = 2,
  /** BAD_INPUT - Fields in the message have an invalid format. */
  BAD_INPUT = 3,
  /** MATCH_NOT_FOUND - The match id was not found. */
  MATCH_NOT_FOUND = 4,
  /** MATCH_JOIN_REJECTED - The match join was rejected. */
  MATCH_JOIN_REJECTED = 5,
  /** RUNTIME_FUNCTION_NOT_FOUND - The runtime function does not exist on the server. */
  RUNTIME_FUNCTION_NOT_FOUND = 6,
  /** RUNTIME_FUNCTION_EXCEPTION - The runtime function executed with an error. */
  RUNTIME_FUNCTION_EXCEPTION = 7,
  UNRECOGNIZED = -1,
}

export function error_CodeFromJSON(object: any): Error_Code {
  switch (object) {
    case 0:
    case "RUNTIME_EXCEPTION":
      return Error_Code.RUNTIME_EXCEPTION;
    case 1:
    case "UNRECOGNIZED_PAYLOAD":
      return Error_Code.UNRECOGNIZED_PAYLOAD;
    case 2:
    case "MISSING_PAYLOAD":
      return Error_Code.MISSING_PAYLOAD;
    case 3:
    case "BAD_INPUT":
      return Error_Code.BAD_INPUT;
    case 4:
    case "MATCH_NOT_FOUND":
      return Error_Code.MATCH_NOT_FOUND;
    case 5:
    case "MATCH_JOIN_REJECTED":
      return Error_Code.MATCH_JOIN_REJECTED;
    case 6:
    case "RUNTIME_FUNCTION_NOT_FOUND":
      return Error_Code.RUNTIME_FUNCTION_NOT_FOUND;
    case 7:
    case "RUNTIME_FUNCTION_EXCEPTION":
      return Error_Code.RUNTIME_FUNCTION_EXCEPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Error_Code.UNRECOGNIZED;
  }
}

export function error_CodeToJSON(object: Error_Code): string {
  switch (object) {
    case Error_Code.RUNTIME_EXCEPTION:
      return "RUNTIME_EXCEPTION";
    case Error_Code.UNRECOGNIZED_PAYLOAD:
      return "UNRECOGNIZED_PAYLOAD";
    case Error_Code.MISSING_PAYLOAD:
      return "MISSING_PAYLOAD";
    case Error_Code.BAD_INPUT:
      return "BAD_INPUT";
    case Error_Code.MATCH_NOT_FOUND:
      return "MATCH_NOT_FOUND";
    case Error_Code.MATCH_JOIN_REJECTED:
      return "MATCH_JOIN_REJECTED";
    case Error_Code.RUNTIME_FUNCTION_NOT_FOUND:
      return "RUNTIME_FUNCTION_NOT_FOUND";
    case Error_Code.RUNTIME_FUNCTION_EXCEPTION:
      return "RUNTIME_FUNCTION_EXCEPTION";
    case Error_Code.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Error_ContextEntry {
  key: string;
  value: string;
}

/** A collection of zero or more notifications. */
export interface Notifications {
  /** Collection of notifications. */
  notifications: Notification[];
}

/** Application-level heartbeat and connection check. */
export interface Ping {
}

/** Application-level heartbeat and connection check response. */
export interface Pong {
}

/** A snapshot of statuses for some set of users. */
export interface Status {
  /** User statuses. */
  presences: UserPresence[];
}

/** Start receiving status updates for some set of users. */
export interface StatusFollow {
  /** User IDs to follow. */
  user_ids: string[];
  /** Usernames to follow. */
  usernames: string[];
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  /** New statuses for the user. */
  joins: UserPresence[];
  /** Previous statuses for the user. */
  leaves: UserPresence[];
}

/** Last pin message by user */
export interface LastPinMessageEvent {
  /** The clan id */
  clan_id: string;
  /** The unique ID of this channel. */
  channel_id: string;
  /** The unique ID of this message. */
  message_id: string;
  /** The stream mode */
  mode: number;
  /** The UserID */
  user_id: string;
  /** The timestamp */
  timestamp: string;
  /** operation */
  operation: number;
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  /** The unique ID of this channel. */
  channel_id: string;
  /** The unique ID of this message. */
  message_id: string;
  /** The stream mode */
  mode: number;
  /** The timestamp */
  timestamp: string;
}

/** Message typing event data */
export interface MessageTypingEvent {
  /** The clan id */
  clan_id: string;
  /** The channel this message belongs to. */
  channel_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  /** mode */
  mode: number;
}

/** Mention to message */
export interface MessageMentionEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  /** React to message */
  message_id: string;
  /** mention user id */
  user_id: string;
  /** mention username */
  username: string;
  /** sender id */
  sender_id: string;
  /** mode */
  mode: number;
}

/** Message reacton event data */
export interface MessageReactionEvent {
  /** reaction id */
  id: string;
  /** the clan id */
  clan_id: string;
  /** The channel this message belongs to. */
  channel_id: string;
  /** React to message */
  message_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  /** Sender name */
  sender_name: string;
  /** avatar */
  sender_avatar: string;
  /** emoji text */
  emoji: string;
  /** action (add, delete) */
  action: boolean;
  /** sender original message */
  message_sender_id: string;
  /** count */
  count: number;
  /** mode */
  mode: number;
}

/** Message attachment */
export interface MessageAttachmentEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  /** React to message */
  message_id: string;
  /** Attachment file name */
  filename: string;
  /** Attachment file size */
  size: number;
  /** Attachment url */
  url: string;
  /** Attachment file type */
  filetype: string;
  /** Attachment width */
  width: number;
  /** Attachment width */
  height: number;
  /** sender id */
  sender_id: string;
  /** mode */
  mode: number;
}

/** Voice Joined event */
export interface VoiceLeavedEvent {
  /** id voice */
  id: string;
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** voice channel name */
  voice_channel_id: string;
  /** voice user_id */
  voice_user_id: string;
}

/** Voice Joined event */
export interface VoiceJoinedEvent {
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** The channel name */
  clan_name: string;
  /** id voice */
  id: string;
  /** voice participant */
  participant: string;
  /** user id */
  user_id: string;
  /** voice channel label */
  voice_channel_label: string;
  /** voice channel id */
  voice_channel_id: string;
  /** last screenshot */
  last_screenshot: string;
}

/** Voice start event */
export interface VoiceStartedEvent {
  /** id voice */
  id: string;
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** voice channel name */
  voice_channel_id: string;
}

/** Voice start event */
export interface VoiceEndedEvent {
  /** id voice */
  id: string;
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** voice channel name */
  voice_channel_id: string;
}

export interface ChannelCreatedEvent {
  /** clan id */
  clan_id: string;
  /** category */
  category_id: string;
  /** creator */
  creator_id: string;
  /** parrent id */
  parrent_id: string;
  /** channel id */
  channel_id: string;
  /** channel label */
  channel_label: string;
  /** channel private */
  channel_private: number;
  /** channel type */
  channel_type:
    | number
    | undefined;
  /** status */
  status: number;
}

export interface ChannelDeletedEvent {
  /** clan id */
  clan_id: string;
  /** category */
  category_id: string;
  /** parrent id */
  parrent_id: string;
  /** channel id */
  channel_id: string;
  /** deletor */
  deletor: string;
}

export interface ChannelUpdatedEvent {
  /** clan id */
  clan_id: string;
  /** category */
  category_id: string;
  /** creator */
  creator_id: string;
  /** parrent id */
  parrent_id: string;
  /** channel id */
  channel_id: string;
  /** channel label */
  channel_label: string;
  /** channel type */
  channel_type:
    | number
    | undefined;
  /** status */
  status: number;
}

/** Stop receiving status updates for some set of users. */
export interface StatusUnfollow {
  /** Users to unfollow. */
  user_ids: string[];
}

/** Set the user's own status. */
export interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status: string | undefined;
}

/** Represents identifying information for a stream. */
export interface Stream {
  /** Mode identifies the type of stream. */
  mode: number;
  /** Subject is the primary identifier, if any. */
  channel_id: string;
  /** Subcontext is a secondary identifier, if any. */
  clan_id: string;
  /** The label is an arbitrary identifying string, if the stream has one. */
  label: string;
}

/** A data message delivered over a stream. */
export interface StreamData {
  /** The stream this data message relates to. */
  stream:
    | Stream
    | undefined;
  /** The sender, if any. */
  sender:
    | UserPresence
    | undefined;
  /** Arbitrary contents of the data message. */
  data: string;
  /** True if this data was delivered reliably, false otherwise. */
  reliable: boolean;
}

/** A set of joins and leaves on a particular stream. */
export interface StreamPresenceEvent {
  /** The stream this event relates to. */
  stream:
    | Stream
    | undefined;
  /** Presences joining the stream as part of this event, if any. */
  joins: UserPresence[];
  /** Presences leaving the stream as part of this event, if any. */
  leaves: UserPresence[];
}

/** A user session associated to a stream, usually through a list operation or a join/leave event. */
export interface UserPresence {
  /** The user this presence belongs to. */
  user_id: string;
  /** A unique session ID identifying the particular connection, because the user may have many. */
  session_id: string;
  /** The username for display purposes. */
  username: string;
  /** Whether this presence generates persistent data/messages, if applicable for the stream type. */
  persistence: boolean;
  /** A user-set status message for this stream, if applicable. */
  status: string | undefined;
}

function createBaseEnvelope(): Envelope {
  return {
    cid: "",
    channel: undefined,
    clan_join: undefined,
    channel_join: undefined,
    channel_leave: undefined,
    channel_message: undefined,
    channel_message_ack: undefined,
    channel_message_send: undefined,
    channel_message_update: undefined,
    channel_message_remove: undefined,
    channel_presence_event: undefined,
    error: undefined,
    notifications: undefined,
    rpc: undefined,
    status: undefined,
    status_follow: undefined,
    status_presence_event: undefined,
    status_unfollow: undefined,
    status_update: undefined,
    stream_data: undefined,
    stream_presence_event: undefined,
    ping: undefined,
    pong: undefined,
    message_typing_event: undefined,
    last_seen_message_event: undefined,
    message_reaction_event: undefined,
    voice_joined_event: undefined,
    voice_leaved_event: undefined,
    voice_started_event: undefined,
    voice_ended_event: undefined,
    channel_created_event: undefined,
    channel_deleted_event: undefined,
    channel_updated_event: undefined,
    last_pin_message_event: undefined,
  };
}

export const Envelope = {
  encode(message: Envelope, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.clan_join !== undefined) {
      ClanJoin.encode(message.clan_join, writer.uint32(26).fork()).ldelim();
    }
    if (message.channel_join !== undefined) {
      ChannelJoin.encode(message.channel_join, writer.uint32(34).fork()).ldelim();
    }
    if (message.channel_leave !== undefined) {
      ChannelLeave.encode(message.channel_leave, writer.uint32(42).fork()).ldelim();
    }
    if (message.channel_message !== undefined) {
      ChannelMessage.encode(message.channel_message, writer.uint32(50).fork()).ldelim();
    }
    if (message.channel_message_ack !== undefined) {
      ChannelMessageAck.encode(message.channel_message_ack, writer.uint32(58).fork()).ldelim();
    }
    if (message.channel_message_send !== undefined) {
      ChannelMessageSend.encode(message.channel_message_send, writer.uint32(66).fork()).ldelim();
    }
    if (message.channel_message_update !== undefined) {
      ChannelMessageUpdate.encode(message.channel_message_update, writer.uint32(74).fork()).ldelim();
    }
    if (message.channel_message_remove !== undefined) {
      ChannelMessageRemove.encode(message.channel_message_remove, writer.uint32(82).fork()).ldelim();
    }
    if (message.channel_presence_event !== undefined) {
      ChannelPresenceEvent.encode(message.channel_presence_event, writer.uint32(90).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(98).fork()).ldelim();
    }
    if (message.notifications !== undefined) {
      Notifications.encode(message.notifications, writer.uint32(106).fork()).ldelim();
    }
    if (message.rpc !== undefined) {
      Rpc.encode(message.rpc, writer.uint32(114).fork()).ldelim();
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(122).fork()).ldelim();
    }
    if (message.status_follow !== undefined) {
      StatusFollow.encode(message.status_follow, writer.uint32(130).fork()).ldelim();
    }
    if (message.status_presence_event !== undefined) {
      StatusPresenceEvent.encode(message.status_presence_event, writer.uint32(138).fork()).ldelim();
    }
    if (message.status_unfollow !== undefined) {
      StatusUnfollow.encode(message.status_unfollow, writer.uint32(146).fork()).ldelim();
    }
    if (message.status_update !== undefined) {
      StatusUpdate.encode(message.status_update, writer.uint32(154).fork()).ldelim();
    }
    if (message.stream_data !== undefined) {
      StreamData.encode(message.stream_data, writer.uint32(162).fork()).ldelim();
    }
    if (message.stream_presence_event !== undefined) {
      StreamPresenceEvent.encode(message.stream_presence_event, writer.uint32(170).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      Ping.encode(message.ping, writer.uint32(178).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      Pong.encode(message.pong, writer.uint32(186).fork()).ldelim();
    }
    if (message.message_typing_event !== undefined) {
      MessageTypingEvent.encode(message.message_typing_event, writer.uint32(194).fork()).ldelim();
    }
    if (message.last_seen_message_event !== undefined) {
      LastSeenMessageEvent.encode(message.last_seen_message_event, writer.uint32(202).fork()).ldelim();
    }
    if (message.message_reaction_event !== undefined) {
      MessageReactionEvent.encode(message.message_reaction_event, writer.uint32(210).fork()).ldelim();
    }
    if (message.voice_joined_event !== undefined) {
      VoiceJoinedEvent.encode(message.voice_joined_event, writer.uint32(218).fork()).ldelim();
    }
    if (message.voice_leaved_event !== undefined) {
      VoiceLeavedEvent.encode(message.voice_leaved_event, writer.uint32(226).fork()).ldelim();
    }
    if (message.voice_started_event !== undefined) {
      VoiceStartedEvent.encode(message.voice_started_event, writer.uint32(234).fork()).ldelim();
    }
    if (message.voice_ended_event !== undefined) {
      VoiceEndedEvent.encode(message.voice_ended_event, writer.uint32(242).fork()).ldelim();
    }
    if (message.channel_created_event !== undefined) {
      ChannelCreatedEvent.encode(message.channel_created_event, writer.uint32(250).fork()).ldelim();
    }
    if (message.channel_deleted_event !== undefined) {
      ChannelDeletedEvent.encode(message.channel_deleted_event, writer.uint32(258).fork()).ldelim();
    }
    if (message.channel_updated_event !== undefined) {
      ChannelUpdatedEvent.encode(message.channel_updated_event, writer.uint32(266).fork()).ldelim();
    }
    if (message.last_pin_message_event !== undefined) {
      LastPinMessageEvent.encode(message.last_pin_message_event, writer.uint32(274).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Envelope {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnvelope();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.clan_join = ClanJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 6:
          message.channel_message = ChannelMessage.decode(reader, reader.uint32());
          break;
        case 7:
          message.channel_message_ack = ChannelMessageAck.decode(reader, reader.uint32());
          break;
        case 8:
          message.channel_message_send = ChannelMessageSend.decode(reader, reader.uint32());
          break;
        case 9:
          message.channel_message_update = ChannelMessageUpdate.decode(reader, reader.uint32());
          break;
        case 10:
          message.channel_message_remove = ChannelMessageRemove.decode(reader, reader.uint32());
          break;
        case 11:
          message.channel_presence_event = ChannelPresenceEvent.decode(reader, reader.uint32());
          break;
        case 12:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 13:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 14:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 15:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 16:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 17:
          message.status_presence_event = StatusPresenceEvent.decode(reader, reader.uint32());
          break;
        case 18:
          message.status_unfollow = StatusUnfollow.decode(reader, reader.uint32());
          break;
        case 19:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 20:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 21:
          message.stream_presence_event = StreamPresenceEvent.decode(reader, reader.uint32());
          break;
        case 22:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 23:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 24:
          message.message_typing_event = MessageTypingEvent.decode(reader, reader.uint32());
          break;
        case 25:
          message.last_seen_message_event = LastSeenMessageEvent.decode(reader, reader.uint32());
          break;
        case 26:
          message.message_reaction_event = MessageReactionEvent.decode(reader, reader.uint32());
          break;
        case 27:
          message.voice_joined_event = VoiceJoinedEvent.decode(reader, reader.uint32());
          break;
        case 28:
          message.voice_leaved_event = VoiceLeavedEvent.decode(reader, reader.uint32());
          break;
        case 29:
          message.voice_started_event = VoiceStartedEvent.decode(reader, reader.uint32());
          break;
        case 30:
          message.voice_ended_event = VoiceEndedEvent.decode(reader, reader.uint32());
          break;
        case 31:
          message.channel_created_event = ChannelCreatedEvent.decode(reader, reader.uint32());
          break;
        case 32:
          message.channel_deleted_event = ChannelDeletedEvent.decode(reader, reader.uint32());
          break;
        case 33:
          message.channel_updated_event = ChannelUpdatedEvent.decode(reader, reader.uint32());
          break;
        case 34:
          message.last_pin_message_event = LastPinMessageEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Envelope {
    return {
      cid: isSet(object.cid) ? String(object.cid) : "",
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      clan_join: isSet(object.clan_join) ? ClanJoin.fromJSON(object.clan_join) : undefined,
      channel_join: isSet(object.channel_join) ? ChannelJoin.fromJSON(object.channel_join) : undefined,
      channel_leave: isSet(object.channel_leave) ? ChannelLeave.fromJSON(object.channel_leave) : undefined,
      channel_message: isSet(object.channel_message) ? ChannelMessage.fromJSON(object.channel_message) : undefined,
      channel_message_ack: isSet(object.channel_message_ack)
        ? ChannelMessageAck.fromJSON(object.channel_message_ack)
        : undefined,
      channel_message_send: isSet(object.channel_message_send)
        ? ChannelMessageSend.fromJSON(object.channel_message_send)
        : undefined,
      channel_message_update: isSet(object.channel_message_update)
        ? ChannelMessageUpdate.fromJSON(object.channel_message_update)
        : undefined,
      channel_message_remove: isSet(object.channel_message_remove)
        ? ChannelMessageRemove.fromJSON(object.channel_message_remove)
        : undefined,
      channel_presence_event: isSet(object.channel_presence_event)
        ? ChannelPresenceEvent.fromJSON(object.channel_presence_event)
        : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      notifications: isSet(object.notifications) ? Notifications.fromJSON(object.notifications) : undefined,
      rpc: isSet(object.rpc) ? Rpc.fromJSON(object.rpc) : undefined,
      status: isSet(object.status) ? Status.fromJSON(object.status) : undefined,
      status_follow: isSet(object.status_follow) ? StatusFollow.fromJSON(object.status_follow) : undefined,
      status_presence_event: isSet(object.status_presence_event)
        ? StatusPresenceEvent.fromJSON(object.status_presence_event)
        : undefined,
      status_unfollow: isSet(object.status_unfollow) ? StatusUnfollow.fromJSON(object.status_unfollow) : undefined,
      status_update: isSet(object.status_update) ? StatusUpdate.fromJSON(object.status_update) : undefined,
      stream_data: isSet(object.stream_data) ? StreamData.fromJSON(object.stream_data) : undefined,
      stream_presence_event: isSet(object.stream_presence_event)
        ? StreamPresenceEvent.fromJSON(object.stream_presence_event)
        : undefined,
      ping: isSet(object.ping) ? Ping.fromJSON(object.ping) : undefined,
      pong: isSet(object.pong) ? Pong.fromJSON(object.pong) : undefined,
      message_typing_event: isSet(object.message_typing_event)
        ? MessageTypingEvent.fromJSON(object.message_typing_event)
        : undefined,
      last_seen_message_event: isSet(object.last_seen_message_event)
        ? LastSeenMessageEvent.fromJSON(object.last_seen_message_event)
        : undefined,
      message_reaction_event: isSet(object.message_reaction_event)
        ? MessageReactionEvent.fromJSON(object.message_reaction_event)
        : undefined,
      voice_joined_event: isSet(object.voice_joined_event)
        ? VoiceJoinedEvent.fromJSON(object.voice_joined_event)
        : undefined,
      voice_leaved_event: isSet(object.voice_leaved_event)
        ? VoiceLeavedEvent.fromJSON(object.voice_leaved_event)
        : undefined,
      voice_started_event: isSet(object.voice_started_event)
        ? VoiceStartedEvent.fromJSON(object.voice_started_event)
        : undefined,
      voice_ended_event: isSet(object.voice_ended_event)
        ? VoiceEndedEvent.fromJSON(object.voice_ended_event)
        : undefined,
      channel_created_event: isSet(object.channel_created_event)
        ? ChannelCreatedEvent.fromJSON(object.channel_created_event)
        : undefined,
      channel_deleted_event: isSet(object.channel_deleted_event)
        ? ChannelDeletedEvent.fromJSON(object.channel_deleted_event)
        : undefined,
      channel_updated_event: isSet(object.channel_updated_event)
        ? ChannelUpdatedEvent.fromJSON(object.channel_updated_event)
        : undefined,
      last_pin_message_event: isSet(object.last_pin_message_event)
        ? LastPinMessageEvent.fromJSON(object.last_pin_message_event)
        : undefined,
    };
  },

  toJSON(message: Envelope): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    message.clan_join !== undefined &&
      (obj.clan_join = message.clan_join ? ClanJoin.toJSON(message.clan_join) : undefined);
    message.channel_join !== undefined &&
      (obj.channel_join = message.channel_join ? ChannelJoin.toJSON(message.channel_join) : undefined);
    message.channel_leave !== undefined &&
      (obj.channel_leave = message.channel_leave ? ChannelLeave.toJSON(message.channel_leave) : undefined);
    message.channel_message !== undefined &&
      (obj.channel_message = message.channel_message ? ChannelMessage.toJSON(message.channel_message) : undefined);
    message.channel_message_ack !== undefined && (obj.channel_message_ack = message.channel_message_ack
      ? ChannelMessageAck.toJSON(message.channel_message_ack)
      : undefined);
    message.channel_message_send !== undefined && (obj.channel_message_send = message.channel_message_send
      ? ChannelMessageSend.toJSON(message.channel_message_send)
      : undefined);
    message.channel_message_update !== undefined && (obj.channel_message_update = message.channel_message_update
      ? ChannelMessageUpdate.toJSON(message.channel_message_update)
      : undefined);
    message.channel_message_remove !== undefined && (obj.channel_message_remove = message.channel_message_remove
      ? ChannelMessageRemove.toJSON(message.channel_message_remove)
      : undefined);
    message.channel_presence_event !== undefined && (obj.channel_presence_event = message.channel_presence_event
      ? ChannelPresenceEvent.toJSON(message.channel_presence_event)
      : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.notifications !== undefined &&
      (obj.notifications = message.notifications ? Notifications.toJSON(message.notifications) : undefined);
    message.rpc !== undefined && (obj.rpc = message.rpc ? Rpc.toJSON(message.rpc) : undefined);
    message.status !== undefined && (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    message.status_follow !== undefined &&
      (obj.status_follow = message.status_follow ? StatusFollow.toJSON(message.status_follow) : undefined);
    message.status_presence_event !== undefined && (obj.status_presence_event = message.status_presence_event
      ? StatusPresenceEvent.toJSON(message.status_presence_event)
      : undefined);
    message.status_unfollow !== undefined &&
      (obj.status_unfollow = message.status_unfollow ? StatusUnfollow.toJSON(message.status_unfollow) : undefined);
    message.status_update !== undefined &&
      (obj.status_update = message.status_update ? StatusUpdate.toJSON(message.status_update) : undefined);
    message.stream_data !== undefined &&
      (obj.stream_data = message.stream_data ? StreamData.toJSON(message.stream_data) : undefined);
    message.stream_presence_event !== undefined && (obj.stream_presence_event = message.stream_presence_event
      ? StreamPresenceEvent.toJSON(message.stream_presence_event)
      : undefined);
    message.ping !== undefined && (obj.ping = message.ping ? Ping.toJSON(message.ping) : undefined);
    message.pong !== undefined && (obj.pong = message.pong ? Pong.toJSON(message.pong) : undefined);
    message.message_typing_event !== undefined && (obj.message_typing_event = message.message_typing_event
      ? MessageTypingEvent.toJSON(message.message_typing_event)
      : undefined);
    message.last_seen_message_event !== undefined && (obj.last_seen_message_event = message.last_seen_message_event
      ? LastSeenMessageEvent.toJSON(message.last_seen_message_event)
      : undefined);
    message.message_reaction_event !== undefined && (obj.message_reaction_event = message.message_reaction_event
      ? MessageReactionEvent.toJSON(message.message_reaction_event)
      : undefined);
    message.voice_joined_event !== undefined && (obj.voice_joined_event = message.voice_joined_event
      ? VoiceJoinedEvent.toJSON(message.voice_joined_event)
      : undefined);
    message.voice_leaved_event !== undefined && (obj.voice_leaved_event = message.voice_leaved_event
      ? VoiceLeavedEvent.toJSON(message.voice_leaved_event)
      : undefined);
    message.voice_started_event !== undefined && (obj.voice_started_event = message.voice_started_event
      ? VoiceStartedEvent.toJSON(message.voice_started_event)
      : undefined);
    message.voice_ended_event !== undefined &&
      (obj.voice_ended_event = message.voice_ended_event
        ? VoiceEndedEvent.toJSON(message.voice_ended_event)
        : undefined);
    message.channel_created_event !== undefined && (obj.channel_created_event = message.channel_created_event
      ? ChannelCreatedEvent.toJSON(message.channel_created_event)
      : undefined);
    message.channel_deleted_event !== undefined && (obj.channel_deleted_event = message.channel_deleted_event
      ? ChannelDeletedEvent.toJSON(message.channel_deleted_event)
      : undefined);
    message.channel_updated_event !== undefined && (obj.channel_updated_event = message.channel_updated_event
      ? ChannelUpdatedEvent.toJSON(message.channel_updated_event)
      : undefined);
    message.last_pin_message_event !== undefined && (obj.last_pin_message_event = message.last_pin_message_event
      ? LastPinMessageEvent.toJSON(message.last_pin_message_event)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Envelope>, I>>(base?: I): Envelope {
    return Envelope.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Envelope>, I>>(object: I): Envelope {
    const message = createBaseEnvelope();
    message.cid = object.cid ?? "";
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    message.clan_join = (object.clan_join !== undefined && object.clan_join !== null)
      ? ClanJoin.fromPartial(object.clan_join)
      : undefined;
    message.channel_join = (object.channel_join !== undefined && object.channel_join !== null)
      ? ChannelJoin.fromPartial(object.channel_join)
      : undefined;
    message.channel_leave = (object.channel_leave !== undefined && object.channel_leave !== null)
      ? ChannelLeave.fromPartial(object.channel_leave)
      : undefined;
    message.channel_message = (object.channel_message !== undefined && object.channel_message !== null)
      ? ChannelMessage.fromPartial(object.channel_message)
      : undefined;
    message.channel_message_ack = (object.channel_message_ack !== undefined && object.channel_message_ack !== null)
      ? ChannelMessageAck.fromPartial(object.channel_message_ack)
      : undefined;
    message.channel_message_send = (object.channel_message_send !== undefined && object.channel_message_send !== null)
      ? ChannelMessageSend.fromPartial(object.channel_message_send)
      : undefined;
    message.channel_message_update =
      (object.channel_message_update !== undefined && object.channel_message_update !== null)
        ? ChannelMessageUpdate.fromPartial(object.channel_message_update)
        : undefined;
    message.channel_message_remove =
      (object.channel_message_remove !== undefined && object.channel_message_remove !== null)
        ? ChannelMessageRemove.fromPartial(object.channel_message_remove)
        : undefined;
    message.channel_presence_event =
      (object.channel_presence_event !== undefined && object.channel_presence_event !== null)
        ? ChannelPresenceEvent.fromPartial(object.channel_presence_event)
        : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.notifications = (object.notifications !== undefined && object.notifications !== null)
      ? Notifications.fromPartial(object.notifications)
      : undefined;
    message.rpc = (object.rpc !== undefined && object.rpc !== null) ? Rpc.fromPartial(object.rpc) : undefined;
    message.status = (object.status !== undefined && object.status !== null)
      ? Status.fromPartial(object.status)
      : undefined;
    message.status_follow = (object.status_follow !== undefined && object.status_follow !== null)
      ? StatusFollow.fromPartial(object.status_follow)
      : undefined;
    message.status_presence_event =
      (object.status_presence_event !== undefined && object.status_presence_event !== null)
        ? StatusPresenceEvent.fromPartial(object.status_presence_event)
        : undefined;
    message.status_unfollow = (object.status_unfollow !== undefined && object.status_unfollow !== null)
      ? StatusUnfollow.fromPartial(object.status_unfollow)
      : undefined;
    message.status_update = (object.status_update !== undefined && object.status_update !== null)
      ? StatusUpdate.fromPartial(object.status_update)
      : undefined;
    message.stream_data = (object.stream_data !== undefined && object.stream_data !== null)
      ? StreamData.fromPartial(object.stream_data)
      : undefined;
    message.stream_presence_event =
      (object.stream_presence_event !== undefined && object.stream_presence_event !== null)
        ? StreamPresenceEvent.fromPartial(object.stream_presence_event)
        : undefined;
    message.ping = (object.ping !== undefined && object.ping !== null) ? Ping.fromPartial(object.ping) : undefined;
    message.pong = (object.pong !== undefined && object.pong !== null) ? Pong.fromPartial(object.pong) : undefined;
    message.message_typing_event = (object.message_typing_event !== undefined && object.message_typing_event !== null)
      ? MessageTypingEvent.fromPartial(object.message_typing_event)
      : undefined;
    message.last_seen_message_event =
      (object.last_seen_message_event !== undefined && object.last_seen_message_event !== null)
        ? LastSeenMessageEvent.fromPartial(object.last_seen_message_event)
        : undefined;
    message.message_reaction_event =
      (object.message_reaction_event !== undefined && object.message_reaction_event !== null)
        ? MessageReactionEvent.fromPartial(object.message_reaction_event)
        : undefined;
    message.voice_joined_event = (object.voice_joined_event !== undefined && object.voice_joined_event !== null)
      ? VoiceJoinedEvent.fromPartial(object.voice_joined_event)
      : undefined;
    message.voice_leaved_event = (object.voice_leaved_event !== undefined && object.voice_leaved_event !== null)
      ? VoiceLeavedEvent.fromPartial(object.voice_leaved_event)
      : undefined;
    message.voice_started_event = (object.voice_started_event !== undefined && object.voice_started_event !== null)
      ? VoiceStartedEvent.fromPartial(object.voice_started_event)
      : undefined;
    message.voice_ended_event = (object.voice_ended_event !== undefined && object.voice_ended_event !== null)
      ? VoiceEndedEvent.fromPartial(object.voice_ended_event)
      : undefined;
    message.channel_created_event =
      (object.channel_created_event !== undefined && object.channel_created_event !== null)
        ? ChannelCreatedEvent.fromPartial(object.channel_created_event)
        : undefined;
    message.channel_deleted_event =
      (object.channel_deleted_event !== undefined && object.channel_deleted_event !== null)
        ? ChannelDeletedEvent.fromPartial(object.channel_deleted_event)
        : undefined;
    message.channel_updated_event =
      (object.channel_updated_event !== undefined && object.channel_updated_event !== null)
        ? ChannelUpdatedEvent.fromPartial(object.channel_updated_event)
        : undefined;
    message.last_pin_message_event =
      (object.last_pin_message_event !== undefined && object.last_pin_message_event !== null)
        ? LastPinMessageEvent.fromPartial(object.last_pin_message_event)
        : undefined;
    return message;
  },
};

function createBaseChannel(): Channel {
  return { id: "", presences: [], self: undefined, chanel_label: "", user_id_one: "", user_id_two: "" };
}

export const Channel = {
  encode(message: Channel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(26).fork()).ldelim();
    }
    if (message.chanel_label !== "") {
      writer.uint32(34).string(message.chanel_label);
    }
    if (message.user_id_one !== "") {
      writer.uint32(42).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(50).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Channel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 4:
          message.chanel_label = reader.string();
          break;
        case 5:
          message.user_id_one = reader.string();
          break;
        case 6:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Channel {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
      self: isSet(object.self) ? UserPresence.fromJSON(object.self) : undefined,
      chanel_label: isSet(object.chanel_label) ? String(object.chanel_label) : "",
      user_id_one: isSet(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? String(object.user_id_two) : "",
    };
  },

  toJSON(message: Channel): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    message.self !== undefined && (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    message.chanel_label !== undefined && (obj.chanel_label = message.chanel_label);
    message.user_id_one !== undefined && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined && (obj.user_id_two = message.user_id_two);
    return obj;
  },

  create<I extends Exact<DeepPartial<Channel>, I>>(base?: I): Channel {
    return Channel.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Channel>, I>>(object: I): Channel {
    const message = createBaseChannel();
    message.id = object.id ?? "";
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    message.self = (object.self !== undefined && object.self !== null)
      ? UserPresence.fromPartial(object.self)
      : undefined;
    message.chanel_label = object.chanel_label ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    return message;
  },
};

function createBaseClanJoin(): ClanJoin {
  return { clan_id: "" };
}

export const ClanJoin = {
  encode(message: ClanJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClanJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClanJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClanJoin {
    return { clan_id: isSet(object.clan_id) ? String(object.clan_id) : "" };
  },

  toJSON(message: ClanJoin): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClanJoin>, I>>(base?: I): ClanJoin {
    return ClanJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClanJoin>, I>>(object: I): ClanJoin {
    const message = createBaseClanJoin();
    message.clan_id = object.clan_id ?? "";
    return message;
  },
};

function createBaseChannelJoin(): ChannelJoin {
  return { clan_id: "", channel_id: "", type: 0, persistence: undefined, hidden: undefined, mode: 0 };
}

export const ChannelJoin = {
  encode(message: ChannelJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.persistence !== undefined) {
      BoolValue.encode({ value: message.persistence! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.hidden !== undefined) {
      BoolValue.encode({ value: message.hidden! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.type = reader.int32();
          break;
        case 4:
          message.persistence = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.hidden = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelJoin {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      type: isSet(object.type) ? Number(object.type) : 0,
      persistence: isSet(object.persistence) ? Boolean(object.persistence) : undefined,
      hidden: isSet(object.hidden) ? Boolean(object.hidden) : undefined,
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: ChannelJoin): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.type !== undefined && (obj.type = Math.round(message.type));
    message.persistence !== undefined && (obj.persistence = message.persistence);
    message.hidden !== undefined && (obj.hidden = message.hidden);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelJoin>, I>>(base?: I): ChannelJoin {
    return ChannelJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelJoin>, I>>(object: I): ChannelJoin {
    const message = createBaseChannelJoin();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.type = object.type ?? 0;
    message.persistence = object.persistence ?? undefined;
    message.hidden = object.hidden ?? undefined;
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseChannelLeave(): ChannelLeave {
  return { clan_id: "", channel_id: "", mode: 0 };
}

export const ChannelLeave = {
  encode(message: ChannelLeave, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelLeave();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelLeave {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: ChannelLeave): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelLeave>, I>>(base?: I): ChannelLeave {
    return ChannelLeave.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelLeave>, I>>(object: I): ChannelLeave {
    const message = createBaseChannelLeave();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseChannelMessageAck(): ChannelMessageAck {
  return {
    channel_id: "",
    message_id: "",
    code: undefined,
    username: "",
    create_time: undefined,
    update_time: undefined,
    persistent: undefined,
    user_id_one: "",
    user_id_two: "",
  };
}

export const ChannelMessageAck = {
  encode(message: ChannelMessageAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.code !== undefined) {
      Int32Value.encode({ value: message.code! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.create_time !== undefined) {
      Timestamp.encode(toTimestamp(message.create_time), writer.uint32(42).fork()).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(toTimestamp(message.update_time), writer.uint32(50).fork()).ldelim();
    }
    if (message.persistent !== undefined) {
      BoolValue.encode({ value: message.persistent! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.user_id_one !== "") {
      writer.uint32(66).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(74).string(message.user_id_two);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.code = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.create_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.update_time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.persistent = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.user_id_one = reader.string();
          break;
        case 9:
          message.user_id_two = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageAck {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      code: isSet(object.code) ? Number(object.code) : undefined,
      username: isSet(object.username) ? String(object.username) : "",
      create_time: isSet(object.create_time) ? fromJsonTimestamp(object.create_time) : undefined,
      update_time: isSet(object.update_time) ? fromJsonTimestamp(object.update_time) : undefined,
      persistent: isSet(object.persistent) ? Boolean(object.persistent) : undefined,
      user_id_one: isSet(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? String(object.user_id_two) : "",
    };
  },

  toJSON(message: ChannelMessageAck): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.code !== undefined && (obj.code = message.code);
    message.username !== undefined && (obj.username = message.username);
    message.create_time !== undefined && (obj.create_time = message.create_time.toISOString());
    message.update_time !== undefined && (obj.update_time = message.update_time.toISOString());
    message.persistent !== undefined && (obj.persistent = message.persistent);
    message.user_id_one !== undefined && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined && (obj.user_id_two = message.user_id_two);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageAck>, I>>(base?: I): ChannelMessageAck {
    return ChannelMessageAck.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageAck>, I>>(object: I): ChannelMessageAck {
    const message = createBaseChannelMessageAck();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.code = object.code ?? undefined;
    message.username = object.username ?? "";
    message.create_time = object.create_time ?? undefined;
    message.update_time = object.update_time ?? undefined;
    message.persistent = object.persistent ?? undefined;
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    return message;
  },
};

function createBaseMessageMention(): MessageMention {
  return { user_id: "", username: "" };
}

export const MessageMention = {
  encode(message: MessageMention, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageMention {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageMention {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      username: isSet(object.username) ? String(object.username) : "",
    };
  },

  toJSON(message: MessageMention): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageMention>, I>>(base?: I): MessageMention {
    return MessageMention.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageMention>, I>>(object: I): MessageMention {
    const message = createBaseMessageMention();
    message.user_id = object.user_id ?? "";
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseMessageAttachment(): MessageAttachment {
  return { filename: "", size: 0, url: "", filetype: "", width: 0, height: 0 };
}

export const MessageAttachment = {
  encode(message: MessageAttachment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filename !== "") {
      writer.uint32(10).string(message.filename);
    }
    if (message.size !== 0) {
      writer.uint32(16).int64(message.size);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.filetype !== "") {
      writer.uint32(34).string(message.filetype);
    }
    if (message.width !== 0) {
      writer.uint32(40).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(48).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filename = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.filetype = reader.string();
          break;
        case 5:
          message.width = reader.int32();
          break;
        case 6:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageAttachment {
    return {
      filename: isSet(object.filename) ? String(object.filename) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      filetype: isSet(object.filetype) ? String(object.filetype) : "",
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: MessageAttachment): unknown {
    const obj: any = {};
    message.filename !== undefined && (obj.filename = message.filename);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.url !== undefined && (obj.url = message.url);
    message.filetype !== undefined && (obj.filetype = message.filetype);
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageAttachment>, I>>(base?: I): MessageAttachment {
    return MessageAttachment.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageAttachment>, I>>(object: I): MessageAttachment {
    const message = createBaseMessageAttachment();
    message.filename = object.filename ?? "";
    message.size = object.size ?? 0;
    message.url = object.url ?? "";
    message.filetype = object.filetype ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseMessageRef(): MessageRef {
  return { message_id: "", message_ref_id: "", message_sender_id: "", content: "", has_attachment: false, ref_type: 0 };
}

export const MessageRef = {
  encode(message: MessageRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message_id !== "") {
      writer.uint32(10).string(message.message_id);
    }
    if (message.message_ref_id !== "") {
      writer.uint32(18).string(message.message_ref_id);
    }
    if (message.message_sender_id !== "") {
      writer.uint32(26).string(message.message_sender_id);
    }
    if (message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.has_attachment === true) {
      writer.uint32(40).bool(message.has_attachment);
    }
    if (message.ref_type !== 0) {
      writer.uint32(48).int32(message.ref_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageRef {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message_id = reader.string();
          break;
        case 2:
          message.message_ref_id = reader.string();
          break;
        case 3:
          message.message_sender_id = reader.string();
          break;
        case 4:
          message.content = reader.string();
          break;
        case 5:
          message.has_attachment = reader.bool();
          break;
        case 6:
          message.ref_type = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageRef {
    return {
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      message_ref_id: isSet(object.message_ref_id) ? String(object.message_ref_id) : "",
      message_sender_id: isSet(object.message_sender_id) ? String(object.message_sender_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
      has_attachment: isSet(object.has_attachment) ? Boolean(object.has_attachment) : false,
      ref_type: isSet(object.ref_type) ? Number(object.ref_type) : 0,
    };
  },

  toJSON(message: MessageRef): unknown {
    const obj: any = {};
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.message_ref_id !== undefined && (obj.message_ref_id = message.message_ref_id);
    message.message_sender_id !== undefined && (obj.message_sender_id = message.message_sender_id);
    message.content !== undefined && (obj.content = message.content);
    message.has_attachment !== undefined && (obj.has_attachment = message.has_attachment);
    message.ref_type !== undefined && (obj.ref_type = Math.round(message.ref_type));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageRef>, I>>(base?: I): MessageRef {
    return MessageRef.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageRef>, I>>(object: I): MessageRef {
    const message = createBaseMessageRef();
    message.message_id = object.message_id ?? "";
    message.message_ref_id = object.message_ref_id ?? "";
    message.message_sender_id = object.message_sender_id ?? "";
    message.content = object.content ?? "";
    message.has_attachment = object.has_attachment ?? false;
    message.ref_type = object.ref_type ?? 0;
    return message;
  },
};

function createBaseChannelMessageSend(): ChannelMessageSend {
  return {
    clan_id: "",
    channel_id: "",
    content: "",
    mentions: [],
    attachments: [],
    references: [],
    mode: 0,
    anonymous_message: false,
    mention_everyone: false,
  };
}

export const ChannelMessageSend = {
  encode(message: ChannelMessageSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    for (const v of message.mentions) {
      MessageMention.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.attachments) {
      MessageAttachment.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.references) {
      MessageRef.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(56).int32(message.mode);
    }
    if (message.anonymous_message === true) {
      writer.uint32(64).bool(message.anonymous_message);
    }
    if (message.mention_everyone === true) {
      writer.uint32(72).bool(message.mention_everyone);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.mentions.push(MessageMention.decode(reader, reader.uint32()));
          break;
        case 5:
          message.attachments.push(MessageAttachment.decode(reader, reader.uint32()));
          break;
        case 6:
          message.references.push(MessageRef.decode(reader, reader.uint32()));
          break;
        case 7:
          message.mode = reader.int32();
          break;
        case 8:
          message.anonymous_message = reader.bool();
          break;
        case 9:
          message.mention_everyone = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageSend {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
      mentions: Array.isArray(object?.mentions) ? object.mentions.map((e: any) => MessageMention.fromJSON(e)) : [],
      attachments: Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => MessageAttachment.fromJSON(e))
        : [],
      references: Array.isArray(object?.references) ? object.references.map((e: any) => MessageRef.fromJSON(e)) : [],
      mode: isSet(object.mode) ? Number(object.mode) : 0,
      anonymous_message: isSet(object.anonymous_message) ? Boolean(object.anonymous_message) : false,
      mention_everyone: isSet(object.mention_everyone) ? Boolean(object.mention_everyone) : false,
    };
  },

  toJSON(message: ChannelMessageSend): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.content !== undefined && (obj.content = message.content);
    if (message.mentions) {
      obj.mentions = message.mentions.map((e) => e ? MessageMention.toJSON(e) : undefined);
    } else {
      obj.mentions = [];
    }
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) => e ? MessageAttachment.toJSON(e) : undefined);
    } else {
      obj.attachments = [];
    }
    if (message.references) {
      obj.references = message.references.map((e) => e ? MessageRef.toJSON(e) : undefined);
    } else {
      obj.references = [];
    }
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.anonymous_message !== undefined && (obj.anonymous_message = message.anonymous_message);
    message.mention_everyone !== undefined && (obj.mention_everyone = message.mention_everyone);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageSend>, I>>(base?: I): ChannelMessageSend {
    return ChannelMessageSend.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageSend>, I>>(object: I): ChannelMessageSend {
    const message = createBaseChannelMessageSend();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.content = object.content ?? "";
    message.mentions = object.mentions?.map((e) => MessageMention.fromPartial(e)) || [];
    message.attachments = object.attachments?.map((e) => MessageAttachment.fromPartial(e)) || [];
    message.references = object.references?.map((e) => MessageRef.fromPartial(e)) || [];
    message.mode = object.mode ?? 0;
    message.anonymous_message = object.anonymous_message ?? false;
    message.mention_everyone = object.mention_everyone ?? false;
    return message;
  },
};

function createBaseChannelMessageUpdate(): ChannelMessageUpdate {
  return { clan_id: "", channel_id: "", message_id: "", content: "", mode: 0 };
}

export const ChannelMessageUpdate = {
  encode(message: ChannelMessageUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.mode !== 0) {
      writer.uint32(40).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.content = reader.string();
          break;
        case 5:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageUpdate {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: ChannelMessageUpdate): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.content !== undefined && (obj.content = message.content);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageUpdate>, I>>(base?: I): ChannelMessageUpdate {
    return ChannelMessageUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageUpdate>, I>>(object: I): ChannelMessageUpdate {
    const message = createBaseChannelMessageUpdate();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.content = object.content ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseChannelMessageRemove(): ChannelMessageRemove {
  return { clan_id: "", channel_id: "", message_id: "", mode: 0 };
}

export const ChannelMessageRemove = {
  encode(message: ChannelMessageRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(32).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelMessageRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelMessageRemove {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: ChannelMessageRemove): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageRemove>, I>>(base?: I): ChannelMessageRemove {
    return ChannelMessageRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageRemove>, I>>(object: I): ChannelMessageRemove {
    const message = createBaseChannelMessageRemove();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseChannelPresenceEvent(): ChannelPresenceEvent {
  return { channel_id: "", joins: [], leaves: [], user_id_one: "", user_id_two: "", mode: 0 };
}

export const ChannelPresenceEvent = {
  encode(message: ChannelPresenceEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.user_id_one !== "") {
      writer.uint32(34).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(42).string(message.user_id_two);
    }
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 4:
          message.user_id_one = reader.string();
          break;
        case 5:
          message.user_id_two = reader.string();
          break;
        case 6:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelPresenceEvent {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
      user_id_one: isSet(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? String(object.user_id_two) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: ChannelPresenceEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    message.user_id_one !== undefined && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined && (obj.user_id_two = message.user_id_two);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelPresenceEvent>, I>>(base?: I): ChannelPresenceEvent {
    return ChannelPresenceEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelPresenceEvent>, I>>(object: I): ChannelPresenceEvent {
    const message = createBaseChannelPresenceEvent();
    message.channel_id = object.channel_id ?? "";
    message.joins = object.joins?.map((e) => UserPresence.fromPartial(e)) || [];
    message.leaves = object.leaves?.map((e) => UserPresence.fromPartial(e)) || [];
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseError(): Error {
  return { code: 0, message: "", context: {} };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    Object.entries(message.context).forEach(([key, value]) => {
      Error_ContextEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          const entry3 = Error_ContextEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.context[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      context: isObject(object.context)
        ? Object.entries(object.context).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.message !== undefined && (obj.message = message.message);
    obj.context = {};
    if (message.context) {
      Object.entries(message.context).forEach(([k, v]) => {
        obj.context[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.context = Object.entries(object.context ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseError_ContextEntry(): Error_ContextEntry {
  return { key: "", value: "" };
}

export const Error_ContextEntry = {
  encode(message: Error_ContextEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error_ContextEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError_ContextEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error_ContextEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Error_ContextEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Error_ContextEntry>, I>>(base?: I): Error_ContextEntry {
    return Error_ContextEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Error_ContextEntry>, I>>(object: I): Error_ContextEntry {
    const message = createBaseError_ContextEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNotifications(): Notifications {
  return { notifications: [] };
}

export const Notifications = {
  encode(message: Notifications, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notifications {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotifications();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notifications {
    return {
      notifications: Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => Notification.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Notifications): unknown {
    const obj: any = {};
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) => e ? Notification.toJSON(e) : undefined);
    } else {
      obj.notifications = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Notifications>, I>>(base?: I): Notifications {
    return Notifications.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Notifications>, I>>(object: I): Notifications {
    const message = createBaseNotifications();
    message.notifications = object.notifications?.map((e) => Notification.fromPartial(e)) || [];
    return message;
  },
};

function createBasePing(): Ping {
  return {};
}

export const Ping = {
  encode(_: Ping, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ping {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Ping {
    return {};
  },

  toJSON(_: Ping): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Ping>, I>>(base?: I): Ping {
    return Ping.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Ping>, I>>(_: I): Ping {
    const message = createBasePing();
    return message;
  },
};

function createBasePong(): Pong {
  return {};
}

export const Pong = {
  encode(_: Pong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Pong {
    return {};
  },

  toJSON(_: Pong): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Pong>, I>>(base?: I): Pong {
    return Pong.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Pong>, I>>(_: I): Pong {
    const message = createBasePong();
    return message;
  },
};

function createBaseStatus(): Status {
  return { presences: [] };
}

export const Status = {
  encode(message: Status, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Status>, I>>(base?: I): Status {
    return Status.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Status>, I>>(object: I): Status {
    const message = createBaseStatus();
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStatusFollow(): StatusFollow {
  return { user_ids: [], usernames: [] };
}

export const StatusFollow = {
  encode(message: StatusFollow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.usernames) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusFollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusFollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        case 2:
          message.usernames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusFollow {
    return {
      user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [],
      usernames: Array.isArray(object?.usernames) ? object.usernames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: StatusFollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    if (message.usernames) {
      obj.usernames = message.usernames.map((e) => e);
    } else {
      obj.usernames = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusFollow>, I>>(base?: I): StatusFollow {
    return StatusFollow.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusFollow>, I>>(object: I): StatusFollow {
    const message = createBaseStatusFollow();
    message.user_ids = object.user_ids?.map((e) => e) || [];
    message.usernames = object.usernames?.map((e) => e) || [];
    return message;
  },
};

function createBaseStatusPresenceEvent(): StatusPresenceEvent {
  return { joins: [], leaves: [] };
}

export const StatusPresenceEvent = {
  encode(message: StatusPresenceEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusPresenceEvent {
    return {
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: StatusPresenceEvent): unknown {
    const obj: any = {};
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusPresenceEvent>, I>>(base?: I): StatusPresenceEvent {
    return StatusPresenceEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusPresenceEvent>, I>>(object: I): StatusPresenceEvent {
    const message = createBaseStatusPresenceEvent();
    message.joins = object.joins?.map((e) => UserPresence.fromPartial(e)) || [];
    message.leaves = object.leaves?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLastPinMessageEvent(): LastPinMessageEvent {
  return { clan_id: "", channel_id: "", message_id: "", mode: 0, user_id: "", timestamp: "", operation: 0 };
}

export const LastPinMessageEvent = {
  encode(message: LastPinMessageEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(26).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(32).int32(message.mode);
    }
    if (message.user_id !== "") {
      writer.uint32(42).string(message.user_id);
    }
    if (message.timestamp !== "") {
      writer.uint32(50).string(message.timestamp);
    }
    if (message.operation !== 0) {
      writer.uint32(56).int32(message.operation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastPinMessageEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastPinMessageEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.message_id = reader.string();
          break;
        case 4:
          message.mode = reader.int32();
          break;
        case 5:
          message.user_id = reader.string();
          break;
        case 6:
          message.timestamp = reader.string();
          break;
        case 7:
          message.operation = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LastPinMessageEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
      operation: isSet(object.operation) ? Number(object.operation) : 0,
    };
  },

  toJSON(message: LastPinMessageEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.operation !== undefined && (obj.operation = Math.round(message.operation));
    return obj;
  },

  create<I extends Exact<DeepPartial<LastPinMessageEvent>, I>>(base?: I): LastPinMessageEvent {
    return LastPinMessageEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LastPinMessageEvent>, I>>(object: I): LastPinMessageEvent {
    const message = createBaseLastPinMessageEvent();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.mode = object.mode ?? 0;
    message.user_id = object.user_id ?? "";
    message.timestamp = object.timestamp ?? "";
    message.operation = object.operation ?? 0;
    return message;
  },
};

function createBaseLastSeenMessageEvent(): LastSeenMessageEvent {
  return { channel_id: "", message_id: "", mode: 0, timestamp: "" };
}

export const LastSeenMessageEvent = {
  encode(message: LastSeenMessageEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.timestamp !== "") {
      writer.uint32(34).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastSeenMessageEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastSeenMessageEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.mode = reader.int32();
          break;
        case 4:
          message.timestamp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LastSeenMessageEvent {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
    };
  },

  toJSON(message: LastSeenMessageEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  create<I extends Exact<DeepPartial<LastSeenMessageEvent>, I>>(base?: I): LastSeenMessageEvent {
    return LastSeenMessageEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LastSeenMessageEvent>, I>>(object: I): LastSeenMessageEvent {
    const message = createBaseLastSeenMessageEvent();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.mode = object.mode ?? 0;
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseMessageTypingEvent(): MessageTypingEvent {
  return { clan_id: "", channel_id: "", sender_id: "", mode: 0 };
}

export const MessageTypingEvent = {
  encode(message: MessageTypingEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(26).string(message.sender_id);
    }
    if (message.mode !== 0) {
      writer.uint32(32).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageTypingEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageTypingEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.sender_id = reader.string();
          break;
        case 4:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageTypingEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: MessageTypingEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageTypingEvent>, I>>(base?: I): MessageTypingEvent {
    return MessageTypingEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageTypingEvent>, I>>(object: I): MessageTypingEvent {
    const message = createBaseMessageTypingEvent();
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.sender_id = object.sender_id ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseMessageMentionEvent(): MessageMentionEvent {
  return { channel_id: "", message_id: "", user_id: "", username: "", sender_id: "", mode: 0 };
}

export const MessageMentionEvent = {
  encode(message: MessageMentionEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.user_id !== "") {
      writer.uint32(26).string(message.user_id);
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.mode !== 0) {
      writer.uint32(48).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageMentionEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMentionEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.user_id = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageMentionEvent {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: MessageMentionEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.username !== undefined && (obj.username = message.username);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageMentionEvent>, I>>(base?: I): MessageMentionEvent {
    return MessageMentionEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageMentionEvent>, I>>(object: I): MessageMentionEvent {
    const message = createBaseMessageMentionEvent();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.user_id = object.user_id ?? "";
    message.username = object.username ?? "";
    message.sender_id = object.sender_id ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseMessageReactionEvent(): MessageReactionEvent {
  return {
    id: "",
    clan_id: "",
    channel_id: "",
    message_id: "",
    sender_id: "",
    sender_name: "",
    sender_avatar: "",
    emoji: "",
    action: false,
    message_sender_id: "",
    count: 0,
    mode: 0,
  };
}

export const MessageReactionEvent = {
  encode(message: MessageReactionEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(34).string(message.message_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(42).string(message.sender_id);
    }
    if (message.sender_name !== "") {
      writer.uint32(50).string(message.sender_name);
    }
    if (message.sender_avatar !== "") {
      writer.uint32(58).string(message.sender_avatar);
    }
    if (message.emoji !== "") {
      writer.uint32(66).string(message.emoji);
    }
    if (message.action === true) {
      writer.uint32(72).bool(message.action);
    }
    if (message.message_sender_id !== "") {
      writer.uint32(82).string(message.message_sender_id);
    }
    if (message.count !== 0) {
      writer.uint32(88).int32(message.count);
    }
    if (message.mode !== 0) {
      writer.uint32(96).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageReactionEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageReactionEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        case 4:
          message.message_id = reader.string();
          break;
        case 5:
          message.sender_id = reader.string();
          break;
        case 6:
          message.sender_name = reader.string();
          break;
        case 7:
          message.sender_avatar = reader.string();
          break;
        case 8:
          message.emoji = reader.string();
          break;
        case 9:
          message.action = reader.bool();
          break;
        case 10:
          message.message_sender_id = reader.string();
          break;
        case 11:
          message.count = reader.int32();
          break;
        case 12:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageReactionEvent {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      sender_name: isSet(object.sender_name) ? String(object.sender_name) : "",
      sender_avatar: isSet(object.sender_avatar) ? String(object.sender_avatar) : "",
      emoji: isSet(object.emoji) ? String(object.emoji) : "",
      action: isSet(object.action) ? Boolean(object.action) : false,
      message_sender_id: isSet(object.message_sender_id) ? String(object.message_sender_id) : "",
      count: isSet(object.count) ? Number(object.count) : 0,
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: MessageReactionEvent): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.sender_name !== undefined && (obj.sender_name = message.sender_name);
    message.sender_avatar !== undefined && (obj.sender_avatar = message.sender_avatar);
    message.emoji !== undefined && (obj.emoji = message.emoji);
    message.action !== undefined && (obj.action = message.action);
    message.message_sender_id !== undefined && (obj.message_sender_id = message.message_sender_id);
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageReactionEvent>, I>>(base?: I): MessageReactionEvent {
    return MessageReactionEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageReactionEvent>, I>>(object: I): MessageReactionEvent {
    const message = createBaseMessageReactionEvent();
    message.id = object.id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.sender_id = object.sender_id ?? "";
    message.sender_name = object.sender_name ?? "";
    message.sender_avatar = object.sender_avatar ?? "";
    message.emoji = object.emoji ?? "";
    message.action = object.action ?? false;
    message.message_sender_id = object.message_sender_id ?? "";
    message.count = object.count ?? 0;
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseMessageAttachmentEvent(): MessageAttachmentEvent {
  return {
    channel_id: "",
    message_id: "",
    filename: "",
    size: 0,
    url: "",
    filetype: "",
    width: 0,
    height: 0,
    sender_id: "",
    mode: 0,
  };
}

export const MessageAttachmentEvent = {
  encode(message: MessageAttachmentEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.filename !== "") {
      writer.uint32(26).string(message.filename);
    }
    if (message.size !== 0) {
      writer.uint32(32).int64(message.size);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.filetype !== "") {
      writer.uint32(50).string(message.filetype);
    }
    if (message.width !== 0) {
      writer.uint32(56).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(64).int32(message.height);
    }
    if (message.sender_id !== "") {
      writer.uint32(74).string(message.sender_id);
    }
    if (message.mode !== 0) {
      writer.uint32(80).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachmentEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageAttachmentEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.filename = reader.string();
          break;
        case 4:
          message.size = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.url = reader.string();
          break;
        case 6:
          message.filetype = reader.string();
          break;
        case 7:
          message.width = reader.int32();
          break;
        case 8:
          message.height = reader.int32();
          break;
        case 9:
          message.sender_id = reader.string();
          break;
        case 10:
          message.mode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageAttachmentEvent {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      filename: isSet(object.filename) ? String(object.filename) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      filetype: isSet(object.filetype) ? String(object.filetype) : "",
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
      mode: isSet(object.mode) ? Number(object.mode) : 0,
    };
  },

  toJSON(message: MessageAttachmentEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.filename !== undefined && (obj.filename = message.filename);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.url !== undefined && (obj.url = message.url);
    message.filetype !== undefined && (obj.filetype = message.filetype);
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageAttachmentEvent>, I>>(base?: I): MessageAttachmentEvent {
    return MessageAttachmentEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageAttachmentEvent>, I>>(object: I): MessageAttachmentEvent {
    const message = createBaseMessageAttachmentEvent();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.filename = object.filename ?? "";
    message.size = object.size ?? 0;
    message.url = object.url ?? "";
    message.filetype = object.filetype ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.sender_id = object.sender_id ?? "";
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseVoiceLeavedEvent(): VoiceLeavedEvent {
  return { id: "", clan_id: "", voice_channel_id: "", voice_user_id: "" };
}

export const VoiceLeavedEvent = {
  encode(message: VoiceLeavedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    if (message.voice_user_id !== "") {
      writer.uint32(34).string(message.voice_user_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceLeavedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceLeavedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
          break;
        case 4:
          message.voice_user_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceLeavedEvent {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet(object.voice_channel_id) ? String(object.voice_channel_id) : "",
      voice_user_id: isSet(object.voice_user_id) ? String(object.voice_user_id) : "",
    };
  },

  toJSON(message: VoiceLeavedEvent): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== undefined && (obj.voice_channel_id = message.voice_channel_id);
    message.voice_user_id !== undefined && (obj.voice_user_id = message.voice_user_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceLeavedEvent>, I>>(base?: I): VoiceLeavedEvent {
    return VoiceLeavedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceLeavedEvent>, I>>(object: I): VoiceLeavedEvent {
    const message = createBaseVoiceLeavedEvent();
    message.id = object.id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.voice_channel_id = object.voice_channel_id ?? "";
    message.voice_user_id = object.voice_user_id ?? "";
    return message;
  },
};

function createBaseVoiceJoinedEvent(): VoiceJoinedEvent {
  return {
    clan_id: "",
    clan_name: "",
    id: "",
    participant: "",
    user_id: "",
    voice_channel_label: "",
    voice_channel_id: "",
    last_screenshot: "",
  };
}

export const VoiceJoinedEvent = {
  encode(message: VoiceJoinedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.clan_name !== "") {
      writer.uint32(18).string(message.clan_name);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.participant !== "") {
      writer.uint32(34).string(message.participant);
    }
    if (message.user_id !== "") {
      writer.uint32(42).string(message.user_id);
    }
    if (message.voice_channel_label !== "") {
      writer.uint32(50).string(message.voice_channel_label);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(58).string(message.voice_channel_id);
    }
    if (message.last_screenshot !== "") {
      writer.uint32(66).string(message.last_screenshot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceJoinedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceJoinedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.clan_name = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.participant = reader.string();
          break;
        case 5:
          message.user_id = reader.string();
          break;
        case 6:
          message.voice_channel_label = reader.string();
          break;
        case 7:
          message.voice_channel_id = reader.string();
          break;
        case 8:
          message.last_screenshot = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceJoinedEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      clan_name: isSet(object.clan_name) ? String(object.clan_name) : "",
      id: isSet(object.id) ? String(object.id) : "",
      participant: isSet(object.participant) ? String(object.participant) : "",
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      voice_channel_label: isSet(object.voice_channel_label) ? String(object.voice_channel_label) : "",
      voice_channel_id: isSet(object.voice_channel_id) ? String(object.voice_channel_id) : "",
      last_screenshot: isSet(object.last_screenshot) ? String(object.last_screenshot) : "",
    };
  },

  toJSON(message: VoiceJoinedEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.clan_name !== undefined && (obj.clan_name = message.clan_name);
    message.id !== undefined && (obj.id = message.id);
    message.participant !== undefined && (obj.participant = message.participant);
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.voice_channel_label !== undefined && (obj.voice_channel_label = message.voice_channel_label);
    message.voice_channel_id !== undefined && (obj.voice_channel_id = message.voice_channel_id);
    message.last_screenshot !== undefined && (obj.last_screenshot = message.last_screenshot);
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceJoinedEvent>, I>>(base?: I): VoiceJoinedEvent {
    return VoiceJoinedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceJoinedEvent>, I>>(object: I): VoiceJoinedEvent {
    const message = createBaseVoiceJoinedEvent();
    message.clan_id = object.clan_id ?? "";
    message.clan_name = object.clan_name ?? "";
    message.id = object.id ?? "";
    message.participant = object.participant ?? "";
    message.user_id = object.user_id ?? "";
    message.voice_channel_label = object.voice_channel_label ?? "";
    message.voice_channel_id = object.voice_channel_id ?? "";
    message.last_screenshot = object.last_screenshot ?? "";
    return message;
  },
};

function createBaseVoiceStartedEvent(): VoiceStartedEvent {
  return { id: "", clan_id: "", voice_channel_id: "" };
}

export const VoiceStartedEvent = {
  encode(message: VoiceStartedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceStartedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceStartedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceStartedEvent {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet(object.voice_channel_id) ? String(object.voice_channel_id) : "",
    };
  },

  toJSON(message: VoiceStartedEvent): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== undefined && (obj.voice_channel_id = message.voice_channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceStartedEvent>, I>>(base?: I): VoiceStartedEvent {
    return VoiceStartedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceStartedEvent>, I>>(object: I): VoiceStartedEvent {
    const message = createBaseVoiceStartedEvent();
    message.id = object.id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.voice_channel_id = object.voice_channel_id ?? "";
    return message;
  },
};

function createBaseVoiceEndedEvent(): VoiceEndedEvent {
  return { id: "", clan_id: "", voice_channel_id: "" };
}

export const VoiceEndedEvent = {
  encode(message: VoiceEndedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.clan_id !== "") {
      writer.uint32(18).string(message.clan_id);
    }
    if (message.voice_channel_id !== "") {
      writer.uint32(26).string(message.voice_channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoiceEndedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoiceEndedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clan_id = reader.string();
          break;
        case 3:
          message.voice_channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoiceEndedEvent {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      voice_channel_id: isSet(object.voice_channel_id) ? String(object.voice_channel_id) : "",
    };
  },

  toJSON(message: VoiceEndedEvent): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.voice_channel_id !== undefined && (obj.voice_channel_id = message.voice_channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<VoiceEndedEvent>, I>>(base?: I): VoiceEndedEvent {
    return VoiceEndedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VoiceEndedEvent>, I>>(object: I): VoiceEndedEvent {
    const message = createBaseVoiceEndedEvent();
    message.id = object.id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.voice_channel_id = object.voice_channel_id ?? "";
    return message;
  },
};

function createBaseChannelCreatedEvent(): ChannelCreatedEvent {
  return {
    clan_id: "",
    category_id: "",
    creator_id: "",
    parrent_id: "",
    channel_id: "",
    channel_label: "",
    channel_private: 0,
    channel_type: undefined,
    status: 0,
  };
}

export const ChannelCreatedEvent = {
  encode(message: ChannelCreatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(26).string(message.creator_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(34).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(42).string(message.channel_id);
    }
    if (message.channel_label !== "") {
      writer.uint32(50).string(message.channel_label);
    }
    if (message.channel_private !== 0) {
      writer.uint32(56).int32(message.channel_private);
    }
    if (message.channel_type !== undefined) {
      Int32Value.encode({ value: message.channel_type! }, writer.uint32(66).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(72).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelCreatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.creator_id = reader.string();
          break;
        case 4:
          message.parrent_id = reader.string();
          break;
        case 5:
          message.channel_id = reader.string();
          break;
        case 6:
          message.channel_label = reader.string();
          break;
        case 7:
          message.channel_private = reader.int32();
          break;
        case 8:
          message.channel_type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.status = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelCreatedEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      parrent_id: isSet(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      channel_private: isSet(object.channel_private) ? Number(object.channel_private) : 0,
      channel_type: isSet(object.channel_type) ? Number(object.channel_type) : undefined,
      status: isSet(object.status) ? Number(object.status) : 0,
    };
  },

  toJSON(message: ChannelCreatedEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.parrent_id !== undefined && (obj.parrent_id = message.parrent_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.channel_private !== undefined && (obj.channel_private = Math.round(message.channel_private));
    message.channel_type !== undefined && (obj.channel_type = message.channel_type);
    message.status !== undefined && (obj.status = Math.round(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelCreatedEvent>, I>>(base?: I): ChannelCreatedEvent {
    return ChannelCreatedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelCreatedEvent>, I>>(object: I): ChannelCreatedEvent {
    const message = createBaseChannelCreatedEvent();
    message.clan_id = object.clan_id ?? "";
    message.category_id = object.category_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.channel_label = object.channel_label ?? "";
    message.channel_private = object.channel_private ?? 0;
    message.channel_type = object.channel_type ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseChannelDeletedEvent(): ChannelDeletedEvent {
  return { clan_id: "", category_id: "", parrent_id: "", channel_id: "", deletor: "" };
}

export const ChannelDeletedEvent = {
  encode(message: ChannelDeletedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(26).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(34).string(message.channel_id);
    }
    if (message.deletor !== "") {
      writer.uint32(42).string(message.deletor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDeletedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelDeletedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.parrent_id = reader.string();
          break;
        case 4:
          message.channel_id = reader.string();
          break;
        case 5:
          message.deletor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelDeletedEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      parrent_id: isSet(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      deletor: isSet(object.deletor) ? String(object.deletor) : "",
    };
  },

  toJSON(message: ChannelDeletedEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.parrent_id !== undefined && (obj.parrent_id = message.parrent_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.deletor !== undefined && (obj.deletor = message.deletor);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelDeletedEvent>, I>>(base?: I): ChannelDeletedEvent {
    return ChannelDeletedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelDeletedEvent>, I>>(object: I): ChannelDeletedEvent {
    const message = createBaseChannelDeletedEvent();
    message.clan_id = object.clan_id ?? "";
    message.category_id = object.category_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.deletor = object.deletor ?? "";
    return message;
  },
};

function createBaseChannelUpdatedEvent(): ChannelUpdatedEvent {
  return {
    clan_id: "",
    category_id: "",
    creator_id: "",
    parrent_id: "",
    channel_id: "",
    channel_label: "",
    channel_type: undefined,
    status: 0,
  };
}

export const ChannelUpdatedEvent = {
  encode(message: ChannelUpdatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clan_id !== "") {
      writer.uint32(10).string(message.clan_id);
    }
    if (message.category_id !== "") {
      writer.uint32(18).string(message.category_id);
    }
    if (message.creator_id !== "") {
      writer.uint32(26).string(message.creator_id);
    }
    if (message.parrent_id !== "") {
      writer.uint32(34).string(message.parrent_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(42).string(message.channel_id);
    }
    if (message.channel_label !== "") {
      writer.uint32(50).string(message.channel_label);
    }
    if (message.channel_type !== undefined) {
      Int32Value.encode({ value: message.channel_type! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelUpdatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelUpdatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clan_id = reader.string();
          break;
        case 2:
          message.category_id = reader.string();
          break;
        case 3:
          message.creator_id = reader.string();
          break;
        case 4:
          message.parrent_id = reader.string();
          break;
        case 5:
          message.channel_id = reader.string();
          break;
        case 6:
          message.channel_label = reader.string();
          break;
        case 7:
          message.channel_type = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.status = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelUpdatedEvent {
    return {
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      category_id: isSet(object.category_id) ? String(object.category_id) : "",
      creator_id: isSet(object.creator_id) ? String(object.creator_id) : "",
      parrent_id: isSet(object.parrent_id) ? String(object.parrent_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      channel_label: isSet(object.channel_label) ? String(object.channel_label) : "",
      channel_type: isSet(object.channel_type) ? Number(object.channel_type) : undefined,
      status: isSet(object.status) ? Number(object.status) : 0,
    };
  },

  toJSON(message: ChannelUpdatedEvent): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.category_id !== undefined && (obj.category_id = message.category_id);
    message.creator_id !== undefined && (obj.creator_id = message.creator_id);
    message.parrent_id !== undefined && (obj.parrent_id = message.parrent_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.channel_label !== undefined && (obj.channel_label = message.channel_label);
    message.channel_type !== undefined && (obj.channel_type = message.channel_type);
    message.status !== undefined && (obj.status = Math.round(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelUpdatedEvent>, I>>(base?: I): ChannelUpdatedEvent {
    return ChannelUpdatedEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelUpdatedEvent>, I>>(object: I): ChannelUpdatedEvent {
    const message = createBaseChannelUpdatedEvent();
    message.clan_id = object.clan_id ?? "";
    message.category_id = object.category_id ?? "";
    message.creator_id = object.creator_id ?? "";
    message.parrent_id = object.parrent_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.channel_label = object.channel_label ?? "";
    message.channel_type = object.channel_type ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseStatusUnfollow(): StatusUnfollow {
  return { user_ids: [] };
}

export const StatusUnfollow = {
  encode(message: StatusUnfollow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.user_ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusUnfollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusUnfollow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusUnfollow {
    return { user_ids: Array.isArray(object?.user_ids) ? object.user_ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: StatusUnfollow): unknown {
    const obj: any = {};
    if (message.user_ids) {
      obj.user_ids = message.user_ids.map((e) => e);
    } else {
      obj.user_ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusUnfollow>, I>>(base?: I): StatusUnfollow {
    return StatusUnfollow.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusUnfollow>, I>>(object: I): StatusUnfollow {
    const message = createBaseStatusUnfollow();
    message.user_ids = object.user_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseStatusUpdate(): StatusUpdate {
  return { status: undefined };
}

export const StatusUpdate = {
  encode(message: StatusUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== undefined) {
      StringValue.encode({ value: message.status! }, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusUpdate {
    return { status: isSet(object.status) ? String(object.status) : undefined };
  },

  toJSON(message: StatusUpdate): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  create<I extends Exact<DeepPartial<StatusUpdate>, I>>(base?: I): StatusUpdate {
    return StatusUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatusUpdate>, I>>(object: I): StatusUpdate {
    const message = createBaseStatusUpdate();
    message.status = object.status ?? undefined;
    return message;
  },
};

function createBaseStream(): Stream {
  return { mode: 0, channel_id: "", clan_id: "", label: "" };
}

export const Stream = {
  encode(message: Stream, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.clan_id !== "") {
      writer.uint32(26).string(message.clan_id);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stream {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStream();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.clan_id = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stream {
    return {
      mode: isSet(object.mode) ? Number(object.mode) : 0,
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      clan_id: isSet(object.clan_id) ? String(object.clan_id) : "",
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: Stream): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  create<I extends Exact<DeepPartial<Stream>, I>>(base?: I): Stream {
    return Stream.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Stream>, I>>(object: I): Stream {
    const message = createBaseStream();
    message.mode = object.mode ?? 0;
    message.channel_id = object.channel_id ?? "";
    message.clan_id = object.clan_id ?? "";
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseStreamData(): StreamData {
  return { stream: undefined, sender: undefined, data: "", reliable: false };
}

export const StreamData = {
  encode(message: StreamData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== undefined) {
      UserPresence.encode(message.sender, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(32).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.sender = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = reader.string();
          break;
        case 4:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamData {
    return {
      stream: isSet(object.stream) ? Stream.fromJSON(object.stream) : undefined,
      sender: isSet(object.sender) ? UserPresence.fromJSON(object.sender) : undefined,
      data: isSet(object.data) ? String(object.data) : "",
      reliable: isSet(object.reliable) ? Boolean(object.reliable) : false,
    };
  },

  toJSON(message: StreamData): unknown {
    const obj: any = {};
    message.stream !== undefined && (obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined);
    message.sender !== undefined && (obj.sender = message.sender ? UserPresence.toJSON(message.sender) : undefined);
    message.data !== undefined && (obj.data = message.data);
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamData>, I>>(base?: I): StreamData {
    return StreamData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamData>, I>>(object: I): StreamData {
    const message = createBaseStreamData();
    message.stream = (object.stream !== undefined && object.stream !== null)
      ? Stream.fromPartial(object.stream)
      : undefined;
    message.sender = (object.sender !== undefined && object.sender !== null)
      ? UserPresence.fromPartial(object.sender)
      : undefined;
    message.data = object.data ?? "";
    message.reliable = object.reliable ?? false;
    return message;
  },
};

function createBaseStreamPresenceEvent(): StreamPresenceEvent {
  return { stream: undefined, joins: [], leaves: [] };
}

export const StreamPresenceEvent = {
  encode(message: StreamPresenceEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stream = Stream.decode(reader, reader.uint32());
          break;
        case 2:
          message.joins.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 3:
          message.leaves.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamPresenceEvent {
    return {
      stream: isSet(object.stream) ? Stream.fromJSON(object.stream) : undefined,
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: StreamPresenceEvent): unknown {
    const obj: any = {};
    message.stream !== undefined && (obj.stream = message.stream ? Stream.toJSON(message.stream) : undefined);
    if (message.joins) {
      obj.joins = message.joins.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.joins = [];
    }
    if (message.leaves) {
      obj.leaves = message.leaves.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.leaves = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamPresenceEvent>, I>>(base?: I): StreamPresenceEvent {
    return StreamPresenceEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamPresenceEvent>, I>>(object: I): StreamPresenceEvent {
    const message = createBaseStreamPresenceEvent();
    message.stream = (object.stream !== undefined && object.stream !== null)
      ? Stream.fromPartial(object.stream)
      : undefined;
    message.joins = object.joins?.map((e) => UserPresence.fromPartial(e)) || [];
    message.leaves = object.leaves?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserPresence(): UserPresence {
  return { user_id: "", session_id: "", username: "", persistence: false, status: undefined };
}

export const UserPresence = {
  encode(message: UserPresence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user_id !== "") {
      writer.uint32(10).string(message.user_id);
    }
    if (message.session_id !== "") {
      writer.uint32(18).string(message.session_id);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.persistence === true) {
      writer.uint32(32).bool(message.persistence);
    }
    if (message.status !== undefined) {
      StringValue.encode({ value: message.status! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPresence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPresence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user_id = reader.string();
          break;
        case 2:
          message.session_id = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.persistence = reader.bool();
          break;
        case 5:
          message.status = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserPresence {
    return {
      user_id: isSet(object.user_id) ? String(object.user_id) : "",
      session_id: isSet(object.session_id) ? String(object.session_id) : "",
      username: isSet(object.username) ? String(object.username) : "",
      persistence: isSet(object.persistence) ? Boolean(object.persistence) : false,
      status: isSet(object.status) ? String(object.status) : undefined,
    };
  },

  toJSON(message: UserPresence): unknown {
    const obj: any = {};
    message.user_id !== undefined && (obj.user_id = message.user_id);
    message.session_id !== undefined && (obj.session_id = message.session_id);
    message.username !== undefined && (obj.username = message.username);
    message.persistence !== undefined && (obj.persistence = message.persistence);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserPresence>, I>>(base?: I): UserPresence {
    return UserPresence.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserPresence>, I>>(object: I): UserPresence {
    const message = createBaseUserPresence();
    message.user_id = object.user_id ?? "";
    message.session_id = object.session_id ?? "";
    message.username = object.username ?? "";
    message.persistence = object.persistence ?? false;
    message.status = object.status ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
