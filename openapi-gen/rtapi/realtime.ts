/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ChannelMessage, Notification, Rpc } from "../api/api";
import { Timestamp } from "../google/protobuf/timestamp";
import { BoolValue, Int32Value, StringValue } from "../google/protobuf/wrappers";

export const protobufPackage = "nakama.realtime";

/** The realtime protocol for Nakama server. */

/** An envelope for a realtime message. */
export interface Envelope {
  cid: string;
  /** A response from a channel join operation. */
  channel?:
    | Channel
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
  /** Incoming information about a party. */
  party?:
    | Party
    | undefined;
  /** Create a party. */
  party_create?:
    | PartyCreate
    | undefined;
  /** Join a party, or request to join if the party is not open. */
  party_join?:
    | PartyJoin
    | undefined;
  /** Leave a party. */
  party_leave?:
    | PartyLeave
    | undefined;
  /** Promote a new party leader. */
  party_promote?:
    | PartyPromote
    | undefined;
  /** Announcement of a new party leader. */
  party_leader?:
    | PartyLeader
    | undefined;
  /** Accept a request to join. */
  party_accept?:
    | PartyAccept
    | undefined;
  /** Kick a party member, or decline a request to join. */
  party_remove?:
    | PartyRemove
    | undefined;
  /** End a party, kicking all party members and closing it. */
  party_close?:
    | PartyClose
    | undefined;
  /** Request a list of pending join requests for a party. */
  party_join_request_list?:
    | PartyJoinRequestList
    | undefined;
  /** Incoming notification for one or more new presences attempting to join the party. */
  party_join_request?:
    | PartyJoinRequest
    | undefined;
  /** Incoming party data delivered from the server. */
  party_data?:
    | PartyData
    | undefined;
  /** A client to server request to send data to a party. */
  party_data_send?:
    | PartyDataSend
    | undefined;
  /** Presence update for a particular party. */
  party_presence_event?:
    | PartyPresenceEvent
    | undefined;
  /** User typing event */
  message_typing_event?:
    | MessageTypingEvent
    | undefined;
  /** Last seen message event */
  last_seen_message_event?: LastSeenMessageEvent | undefined;
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
  chanel_name: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
}

/** Join operation for a realtime chat channel. */
export interface ChannelJoin {
  /** The id of channel or group */
  target_id: string;
  /** The user ID to DM with, group ID to chat with, or channel id to join. */
  target: string;
  /** The type of the chat channel. */
  type: number;
  /** Whether messages sent on this channel should be persistent. */
  persistence:
    | boolean
    | undefined;
  /** Whether the user should appear in the channel's presence list and events. */
  hidden: boolean | undefined;
}

/** The type of chat channel. */
export enum ChannelJoin_Type {
  /** TYPE_UNSPECIFIED - Default case. Assumed as CHANNEL type. */
  TYPE_UNSPECIFIED = 0,
  /** CHANNEL - A room which anyone can join to chat. */
  CHANNEL = 1,
  /** DIRECT_MESSAGE - A private channel for 1-on-1 chat. */
  DIRECT_MESSAGE = 2,
  /** GROUP - A channel for group chat. */
  GROUP = 3,
  UNRECOGNIZED = -1,
}

export function channelJoin_TypeFromJSON(object: any): ChannelJoin_Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return ChannelJoin_Type.TYPE_UNSPECIFIED;
    case 1:
    case "CHANNEL":
      return ChannelJoin_Type.CHANNEL;
    case 2:
    case "DIRECT_MESSAGE":
      return ChannelJoin_Type.DIRECT_MESSAGE;
    case 3:
    case "GROUP":
      return ChannelJoin_Type.GROUP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChannelJoin_Type.UNRECOGNIZED;
  }
}

export function channelJoin_TypeToJSON(object: ChannelJoin_Type): string {
  switch (object) {
    case ChannelJoin_Type.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case ChannelJoin_Type.CHANNEL:
      return "CHANNEL";
    case ChannelJoin_Type.DIRECT_MESSAGE:
      return "DIRECT_MESSAGE";
    case ChannelJoin_Type.GROUP:
      return "GROUP";
    case ChannelJoin_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Leave a realtime channel. */
export interface ChannelLeave {
  /** The ID of the channel to leave. */
  channel_id: string;
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
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  channel_name: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
}

/** Send a message to a realtime channel. */
export interface ChannelMessageSend {
  /** The clan that channel belong to. */
  clan_id: string;
  /** The channel to sent to. */
  channel_id: string;
  /** Message content. */
  content: string;
}

/** Update a message previously sent to a realtime channel. */
export interface ChannelMessageUpdate {
  /** The channel the message was sent to. */
  channel_id: string;
  /** The ID assigned to the message to update. */
  message_id: string;
  /** New message content. */
  content: string;
}

/** Remove a message previously sent to a realtime channel. */
export interface ChannelMessageRemove {
  /** The channel the message was sent to. */
  channel_id: string;
  /** The ID assigned to the message to update. */
  message_id: string;
}

/** A set of joins and leaves on a particular channel. */
export interface ChannelPresenceEvent {
  /** The channel identifier this event is for. */
  channel_id: string;
  /** Presences joining the channel as part of this event, if any. */
  joins: UserPresence[];
  /** Presences leaving the channel as part of this event, if any. */
  leaves: UserPresence[];
  /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
  channel_name: string;
  /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_one: string;
  /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
  user_id_two: string;
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

/** A realtime match. */
export interface Match {
  /** The match unique ID. */
  match_id: string;
  /** True if it's an server-managed authoritative match, false otherwise. */
  authoritative: boolean;
  /** Match label, if any. */
  label:
    | string
    | undefined;
  /** The number of users currently in the match. */
  size: number;
  /** The users currently in the match. */
  presences: UserPresence[];
  /** A reference to the current user's presence in the match. */
  self: UserPresence | undefined;
}

/** Create a new realtime match. */
export interface MatchCreate {
  /** Optional name to use when creating the match. */
  name: string;
}

/** Realtime match data received from the server. */
export interface MatchData {
  /** The match unique ID. */
  match_id: string;
  /** A reference to the user presence that sent this data, if any. */
  presence:
    | UserPresence
    | undefined;
  /** Op code value. */
  op_code: number;
  /** Data payload, if any. */
  data: Uint8Array;
  /** True if this data was delivered reliably, false otherwise. */
  reliable: boolean;
}

/** Send realtime match data to the server. */
export interface MatchDataSend {
  /** The match unique ID. */
  match_id: string;
  /** Op code value. */
  op_code: number;
  /** Data payload, if any. */
  data: Uint8Array;
  /** List of presences in the match to deliver to, if filtering is required. Otherwise deliver to everyone in the match. */
  presences: UserPresence[];
  /** True if the data should be sent reliably, false otherwise. */
  reliable: boolean;
}

/** Join an existing realtime match. */
export interface MatchJoin {
  /** The match unique ID. */
  match_id?:
    | string
    | undefined;
  /** A matchmaking result token. */
  token?:
    | string
    | undefined;
  /** An optional set of key-value metadata pairs to be passed to the match handler, if any. */
  metadata: { [key: string]: string };
}

export interface MatchJoin_MetadataEntry {
  key: string;
  value: string;
}

/** Leave a realtime match. */
export interface MatchLeave {
  /** The match unique ID. */
  match_id: string;
}

/** A set of joins and leaves on a particular realtime match. */
export interface MatchPresenceEvent {
  /** The match unique ID. */
  match_id: string;
  /** User presences that have just joined the match. */
  joins: UserPresence[];
  /** User presences that have just left the match. */
  leaves: UserPresence[];
}

/** Start a new matchmaking process. */
export interface MatchmakerAdd {
  /** Minimum total user count to match together. */
  min_count: number;
  /** Maximum total user count to match together. */
  max_count: number;
  /** Filter query used to identify suitable users. */
  query: string;
  /** String properties. */
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
  /** Optional multiple of the count that must be satisfied. */
  count_multiple: number | undefined;
}

export interface MatchmakerAdd_StringPropertiesEntry {
  key: string;
  value: string;
}

export interface MatchmakerAdd_NumericPropertiesEntry {
  key: string;
  value: number;
}

/** A successful matchmaking result. */
export interface MatchmakerMatched {
  /** The matchmaking ticket that has completed. */
  ticket: string;
  /** Match ID. */
  match_id?:
    | string
    | undefined;
  /** Match join token. */
  token?:
    | string
    | undefined;
  /** The users that have been matched together, and information about their matchmaking data. */
  users: MatchmakerMatched_MatchmakerUser[];
  /** A reference to the current user and their properties. */
  self: MatchmakerMatched_MatchmakerUser | undefined;
}

export interface MatchmakerMatched_MatchmakerUser {
  /** User info. */
  presence:
    | UserPresence
    | undefined;
  /** Party identifier, if this user was matched as a party member. */
  party_id: string;
  /** String properties. */
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
}

export interface MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
  key: string;
  value: string;
}

export interface MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
  key: string;
  value: number;
}

/** Cancel an existing ongoing matchmaking process. */
export interface MatchmakerRemove {
  /** The ticket to cancel. */
  ticket: string;
}

/** A ticket representing a new matchmaking process. */
export interface MatchmakerTicket {
  /** The ticket that can be used to cancel matchmaking. */
  ticket: string;
}

/** A collection of zero or more notifications. */
export interface Notifications {
  /** Collection of notifications. */
  notifications: Notification[];
}

/** Incoming information about a party. */
export interface Party {
  /** Unique party identifier. */
  party_id: string;
  /** Open flag. */
  open: boolean;
  /** Maximum number of party members. */
  max_size: number;
  /** Self. */
  self:
    | UserPresence
    | undefined;
  /** Leader. */
  leader:
    | UserPresence
    | undefined;
  /** All current party members. */
  presences: UserPresence[];
}

/** Create a party. */
export interface PartyCreate {
  /** Whether or not the party will require join requests to be approved by the party leader. */
  open: boolean;
  /** Maximum number of party members. */
  max_size: number;
}

/** Join a party, or request to join if the party is not open. */
export interface PartyJoin {
  /** Party ID to join. */
  party_id: string;
}

/** Leave a party. */
export interface PartyLeave {
  /** Party ID to leave. */
  party_id: string;
}

/** Promote a new party leader. */
export interface PartyPromote {
  /** Party ID to promote a new leader for. */
  party_id: string;
  /** The presence of an existing party member to promote as the new leader. */
  presence: UserPresence | undefined;
}

/** Announcement of a new party leader. */
export interface PartyLeader {
  /** Party ID to announce the new leader for. */
  party_id: string;
  /** The presence of the new party leader. */
  presence: UserPresence | undefined;
}

/** Accept a request to join. */
export interface PartyAccept {
  /** Party ID to accept a join request for. */
  party_id: string;
  /** The presence to accept as a party member. */
  presence: UserPresence | undefined;
}

/** Kick a party member, or decline a request to join. */
export interface PartyRemove {
  /** Party ID to remove/reject from. */
  party_id: string;
  /** The presence to remove or reject. */
  presence: UserPresence | undefined;
}

/** End a party, kicking all party members and closing it. */
export interface PartyClose {
  /** Party ID to close. */
  party_id: string;
}

/** Request a list of pending join requests for a party. */
export interface PartyJoinRequestList {
  /** Party ID to get a list of join requests for. */
  party_id: string;
}

/** Incoming notification for one or more new presences attempting to join the party. */
export interface PartyJoinRequest {
  /** Party ID these presences are attempting to join. */
  party_id: string;
  /** Presences attempting to join. */
  presences: UserPresence[];
}

/** Begin matchmaking as a party. */
export interface PartyMatchmakerAdd {
  /** Party ID. */
  party_id: string;
  /** Minimum total user count to match together. */
  min_count: number;
  /** Maximum total user count to match together. */
  max_count: number;
  /** Filter query used to identify suitable users. */
  query: string;
  /** String properties. */
  string_properties: { [key: string]: string };
  /** Numeric properties. */
  numeric_properties: { [key: string]: number };
  /** Optional multiple of the count that must be satisfied. */
  count_multiple: number | undefined;
}

export interface PartyMatchmakerAdd_StringPropertiesEntry {
  key: string;
  value: string;
}

export interface PartyMatchmakerAdd_NumericPropertiesEntry {
  key: string;
  value: number;
}

/** Cancel a party matchmaking process using a ticket. */
export interface PartyMatchmakerRemove {
  /** Party ID. */
  party_id: string;
  /** The ticket to cancel. */
  ticket: string;
}

/** A response from starting a new party matchmaking process. */
export interface PartyMatchmakerTicket {
  /** Party ID. */
  party_id: string;
  /** The ticket that can be used to cancel matchmaking. */
  ticket: string;
}

/** Incoming party data delivered from the server. */
export interface PartyData {
  /** The party ID. */
  party_id: string;
  /** A reference to the user presence that sent this data, if any. */
  presence:
    | UserPresence
    | undefined;
  /** Op code value. */
  op_code: number;
  /** Data payload, if any. */
  data: Uint8Array;
}

/** Send data to a party. */
export interface PartyDataSend {
  /** Party ID to send to. */
  party_id: string;
  /** Op code value. */
  op_code: number;
  /** Data payload, if any. */
  data: Uint8Array;
}

/** Presence update for a particular party. */
export interface PartyPresenceEvent {
  /** The party ID. */
  party_id: string;
  /** User presences that have just joined the party. */
  joins: UserPresence[];
  /** User presences that have just left the party. */
  leaves: UserPresence[];
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

/** Last seen message by user */
export interface LastSeenMessageEvent {
  /** The unique ID of this channel. */
  channel_id: string;
  /** The unique ID of this message. */
  message_id: string;
}

/** Message typing event data */
export interface MessageTypingEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
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
  subject: string;
  /** Subcontext is a secondary identifier, if any. */
  subcontext: string;
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
    party: undefined,
    party_create: undefined,
    party_join: undefined,
    party_leave: undefined,
    party_promote: undefined,
    party_leader: undefined,
    party_accept: undefined,
    party_remove: undefined,
    party_close: undefined,
    party_join_request_list: undefined,
    party_join_request: undefined,
    party_data: undefined,
    party_data_send: undefined,
    party_presence_event: undefined,
    message_typing_event: undefined,
    last_seen_message_event: undefined,
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
    if (message.channel_join !== undefined) {
      ChannelJoin.encode(message.channel_join, writer.uint32(26).fork()).ldelim();
    }
    if (message.channel_leave !== undefined) {
      ChannelLeave.encode(message.channel_leave, writer.uint32(34).fork()).ldelim();
    }
    if (message.channel_message !== undefined) {
      ChannelMessage.encode(message.channel_message, writer.uint32(42).fork()).ldelim();
    }
    if (message.channel_message_ack !== undefined) {
      ChannelMessageAck.encode(message.channel_message_ack, writer.uint32(50).fork()).ldelim();
    }
    if (message.channel_message_send !== undefined) {
      ChannelMessageSend.encode(message.channel_message_send, writer.uint32(58).fork()).ldelim();
    }
    if (message.channel_message_update !== undefined) {
      ChannelMessageUpdate.encode(message.channel_message_update, writer.uint32(66).fork()).ldelim();
    }
    if (message.channel_message_remove !== undefined) {
      ChannelMessageRemove.encode(message.channel_message_remove, writer.uint32(74).fork()).ldelim();
    }
    if (message.channel_presence_event !== undefined) {
      ChannelPresenceEvent.encode(message.channel_presence_event, writer.uint32(82).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(90).fork()).ldelim();
    }
    if (message.notifications !== undefined) {
      Notifications.encode(message.notifications, writer.uint32(98).fork()).ldelim();
    }
    if (message.rpc !== undefined) {
      Rpc.encode(message.rpc, writer.uint32(106).fork()).ldelim();
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(114).fork()).ldelim();
    }
    if (message.status_follow !== undefined) {
      StatusFollow.encode(message.status_follow, writer.uint32(122).fork()).ldelim();
    }
    if (message.status_presence_event !== undefined) {
      StatusPresenceEvent.encode(message.status_presence_event, writer.uint32(130).fork()).ldelim();
    }
    if (message.status_unfollow !== undefined) {
      StatusUnfollow.encode(message.status_unfollow, writer.uint32(138).fork()).ldelim();
    }
    if (message.status_update !== undefined) {
      StatusUpdate.encode(message.status_update, writer.uint32(146).fork()).ldelim();
    }
    if (message.stream_data !== undefined) {
      StreamData.encode(message.stream_data, writer.uint32(154).fork()).ldelim();
    }
    if (message.stream_presence_event !== undefined) {
      StreamPresenceEvent.encode(message.stream_presence_event, writer.uint32(162).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      Ping.encode(message.ping, writer.uint32(170).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      Pong.encode(message.pong, writer.uint32(178).fork()).ldelim();
    }
    if (message.party !== undefined) {
      Party.encode(message.party, writer.uint32(186).fork()).ldelim();
    }
    if (message.party_create !== undefined) {
      PartyCreate.encode(message.party_create, writer.uint32(194).fork()).ldelim();
    }
    if (message.party_join !== undefined) {
      PartyJoin.encode(message.party_join, writer.uint32(202).fork()).ldelim();
    }
    if (message.party_leave !== undefined) {
      PartyLeave.encode(message.party_leave, writer.uint32(210).fork()).ldelim();
    }
    if (message.party_promote !== undefined) {
      PartyPromote.encode(message.party_promote, writer.uint32(218).fork()).ldelim();
    }
    if (message.party_leader !== undefined) {
      PartyLeader.encode(message.party_leader, writer.uint32(226).fork()).ldelim();
    }
    if (message.party_accept !== undefined) {
      PartyAccept.encode(message.party_accept, writer.uint32(234).fork()).ldelim();
    }
    if (message.party_remove !== undefined) {
      PartyRemove.encode(message.party_remove, writer.uint32(242).fork()).ldelim();
    }
    if (message.party_close !== undefined) {
      PartyClose.encode(message.party_close, writer.uint32(250).fork()).ldelim();
    }
    if (message.party_join_request_list !== undefined) {
      PartyJoinRequestList.encode(message.party_join_request_list, writer.uint32(258).fork()).ldelim();
    }
    if (message.party_join_request !== undefined) {
      PartyJoinRequest.encode(message.party_join_request, writer.uint32(266).fork()).ldelim();
    }
    if (message.party_data !== undefined) {
      PartyData.encode(message.party_data, writer.uint32(274).fork()).ldelim();
    }
    if (message.party_data_send !== undefined) {
      PartyDataSend.encode(message.party_data_send, writer.uint32(282).fork()).ldelim();
    }
    if (message.party_presence_event !== undefined) {
      PartyPresenceEvent.encode(message.party_presence_event, writer.uint32(290).fork()).ldelim();
    }
    if (message.message_typing_event !== undefined) {
      MessageTypingEvent.encode(message.message_typing_event, writer.uint32(298).fork()).ldelim();
    }
    if (message.last_seen_message_event !== undefined) {
      LastSeenMessageEvent.encode(message.last_seen_message_event, writer.uint32(306).fork()).ldelim();
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
          message.channel_join = ChannelJoin.decode(reader, reader.uint32());
          break;
        case 4:
          message.channel_leave = ChannelLeave.decode(reader, reader.uint32());
          break;
        case 5:
          message.channel_message = ChannelMessage.decode(reader, reader.uint32());
          break;
        case 6:
          message.channel_message_ack = ChannelMessageAck.decode(reader, reader.uint32());
          break;
        case 7:
          message.channel_message_send = ChannelMessageSend.decode(reader, reader.uint32());
          break;
        case 8:
          message.channel_message_update = ChannelMessageUpdate.decode(reader, reader.uint32());
          break;
        case 9:
          message.channel_message_remove = ChannelMessageRemove.decode(reader, reader.uint32());
          break;
        case 10:
          message.channel_presence_event = ChannelPresenceEvent.decode(reader, reader.uint32());
          break;
        case 11:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 12:
          message.notifications = Notifications.decode(reader, reader.uint32());
          break;
        case 13:
          message.rpc = Rpc.decode(reader, reader.uint32());
          break;
        case 14:
          message.status = Status.decode(reader, reader.uint32());
          break;
        case 15:
          message.status_follow = StatusFollow.decode(reader, reader.uint32());
          break;
        case 16:
          message.status_presence_event = StatusPresenceEvent.decode(reader, reader.uint32());
          break;
        case 17:
          message.status_unfollow = StatusUnfollow.decode(reader, reader.uint32());
          break;
        case 18:
          message.status_update = StatusUpdate.decode(reader, reader.uint32());
          break;
        case 19:
          message.stream_data = StreamData.decode(reader, reader.uint32());
          break;
        case 20:
          message.stream_presence_event = StreamPresenceEvent.decode(reader, reader.uint32());
          break;
        case 21:
          message.ping = Ping.decode(reader, reader.uint32());
          break;
        case 22:
          message.pong = Pong.decode(reader, reader.uint32());
          break;
        case 23:
          message.party = Party.decode(reader, reader.uint32());
          break;
        case 24:
          message.party_create = PartyCreate.decode(reader, reader.uint32());
          break;
        case 25:
          message.party_join = PartyJoin.decode(reader, reader.uint32());
          break;
        case 26:
          message.party_leave = PartyLeave.decode(reader, reader.uint32());
          break;
        case 27:
          message.party_promote = PartyPromote.decode(reader, reader.uint32());
          break;
        case 28:
          message.party_leader = PartyLeader.decode(reader, reader.uint32());
          break;
        case 29:
          message.party_accept = PartyAccept.decode(reader, reader.uint32());
          break;
        case 30:
          message.party_remove = PartyRemove.decode(reader, reader.uint32());
          break;
        case 31:
          message.party_close = PartyClose.decode(reader, reader.uint32());
          break;
        case 32:
          message.party_join_request_list = PartyJoinRequestList.decode(reader, reader.uint32());
          break;
        case 33:
          message.party_join_request = PartyJoinRequest.decode(reader, reader.uint32());
          break;
        case 34:
          message.party_data = PartyData.decode(reader, reader.uint32());
          break;
        case 35:
          message.party_data_send = PartyDataSend.decode(reader, reader.uint32());
          break;
        case 36:
          message.party_presence_event = PartyPresenceEvent.decode(reader, reader.uint32());
          break;
        case 37:
          message.message_typing_event = MessageTypingEvent.decode(reader, reader.uint32());
          break;
        case 38:
          message.last_seen_message_event = LastSeenMessageEvent.decode(reader, reader.uint32());
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
      party: isSet(object.party) ? Party.fromJSON(object.party) : undefined,
      party_create: isSet(object.party_create) ? PartyCreate.fromJSON(object.party_create) : undefined,
      party_join: isSet(object.party_join) ? PartyJoin.fromJSON(object.party_join) : undefined,
      party_leave: isSet(object.party_leave) ? PartyLeave.fromJSON(object.party_leave) : undefined,
      party_promote: isSet(object.party_promote) ? PartyPromote.fromJSON(object.party_promote) : undefined,
      party_leader: isSet(object.party_leader) ? PartyLeader.fromJSON(object.party_leader) : undefined,
      party_accept: isSet(object.party_accept) ? PartyAccept.fromJSON(object.party_accept) : undefined,
      party_remove: isSet(object.party_remove) ? PartyRemove.fromJSON(object.party_remove) : undefined,
      party_close: isSet(object.party_close) ? PartyClose.fromJSON(object.party_close) : undefined,
      party_join_request_list: isSet(object.party_join_request_list)
        ? PartyJoinRequestList.fromJSON(object.party_join_request_list)
        : undefined,
      party_join_request: isSet(object.party_join_request)
        ? PartyJoinRequest.fromJSON(object.party_join_request)
        : undefined,
      party_data: isSet(object.party_data) ? PartyData.fromJSON(object.party_data) : undefined,
      party_data_send: isSet(object.party_data_send) ? PartyDataSend.fromJSON(object.party_data_send) : undefined,
      party_presence_event: isSet(object.party_presence_event)
        ? PartyPresenceEvent.fromJSON(object.party_presence_event)
        : undefined,
      message_typing_event: isSet(object.message_typing_event)
        ? MessageTypingEvent.fromJSON(object.message_typing_event)
        : undefined,
      last_seen_message_event: isSet(object.last_seen_message_event)
        ? LastSeenMessageEvent.fromJSON(object.last_seen_message_event)
        : undefined,
    };
  },

  toJSON(message: Envelope): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
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
    message.party !== undefined && (obj.party = message.party ? Party.toJSON(message.party) : undefined);
    message.party_create !== undefined &&
      (obj.party_create = message.party_create ? PartyCreate.toJSON(message.party_create) : undefined);
    message.party_join !== undefined &&
      (obj.party_join = message.party_join ? PartyJoin.toJSON(message.party_join) : undefined);
    message.party_leave !== undefined &&
      (obj.party_leave = message.party_leave ? PartyLeave.toJSON(message.party_leave) : undefined);
    message.party_promote !== undefined &&
      (obj.party_promote = message.party_promote ? PartyPromote.toJSON(message.party_promote) : undefined);
    message.party_leader !== undefined &&
      (obj.party_leader = message.party_leader ? PartyLeader.toJSON(message.party_leader) : undefined);
    message.party_accept !== undefined &&
      (obj.party_accept = message.party_accept ? PartyAccept.toJSON(message.party_accept) : undefined);
    message.party_remove !== undefined &&
      (obj.party_remove = message.party_remove ? PartyRemove.toJSON(message.party_remove) : undefined);
    message.party_close !== undefined &&
      (obj.party_close = message.party_close ? PartyClose.toJSON(message.party_close) : undefined);
    message.party_join_request_list !== undefined && (obj.party_join_request_list = message.party_join_request_list
      ? PartyJoinRequestList.toJSON(message.party_join_request_list)
      : undefined);
    message.party_join_request !== undefined && (obj.party_join_request = message.party_join_request
      ? PartyJoinRequest.toJSON(message.party_join_request)
      : undefined);
    message.party_data !== undefined &&
      (obj.party_data = message.party_data ? PartyData.toJSON(message.party_data) : undefined);
    message.party_data_send !== undefined &&
      (obj.party_data_send = message.party_data_send ? PartyDataSend.toJSON(message.party_data_send) : undefined);
    message.party_presence_event !== undefined && (obj.party_presence_event = message.party_presence_event
      ? PartyPresenceEvent.toJSON(message.party_presence_event)
      : undefined);
    message.message_typing_event !== undefined && (obj.message_typing_event = message.message_typing_event
      ? MessageTypingEvent.toJSON(message.message_typing_event)
      : undefined);
    message.last_seen_message_event !== undefined && (obj.last_seen_message_event = message.last_seen_message_event
      ? LastSeenMessageEvent.toJSON(message.last_seen_message_event)
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
    message.party = (object.party !== undefined && object.party !== null) ? Party.fromPartial(object.party) : undefined;
    message.party_create = (object.party_create !== undefined && object.party_create !== null)
      ? PartyCreate.fromPartial(object.party_create)
      : undefined;
    message.party_join = (object.party_join !== undefined && object.party_join !== null)
      ? PartyJoin.fromPartial(object.party_join)
      : undefined;
    message.party_leave = (object.party_leave !== undefined && object.party_leave !== null)
      ? PartyLeave.fromPartial(object.party_leave)
      : undefined;
    message.party_promote = (object.party_promote !== undefined && object.party_promote !== null)
      ? PartyPromote.fromPartial(object.party_promote)
      : undefined;
    message.party_leader = (object.party_leader !== undefined && object.party_leader !== null)
      ? PartyLeader.fromPartial(object.party_leader)
      : undefined;
    message.party_accept = (object.party_accept !== undefined && object.party_accept !== null)
      ? PartyAccept.fromPartial(object.party_accept)
      : undefined;
    message.party_remove = (object.party_remove !== undefined && object.party_remove !== null)
      ? PartyRemove.fromPartial(object.party_remove)
      : undefined;
    message.party_close = (object.party_close !== undefined && object.party_close !== null)
      ? PartyClose.fromPartial(object.party_close)
      : undefined;
    message.party_join_request_list =
      (object.party_join_request_list !== undefined && object.party_join_request_list !== null)
        ? PartyJoinRequestList.fromPartial(object.party_join_request_list)
        : undefined;
    message.party_join_request = (object.party_join_request !== undefined && object.party_join_request !== null)
      ? PartyJoinRequest.fromPartial(object.party_join_request)
      : undefined;
    message.party_data = (object.party_data !== undefined && object.party_data !== null)
      ? PartyData.fromPartial(object.party_data)
      : undefined;
    message.party_data_send = (object.party_data_send !== undefined && object.party_data_send !== null)
      ? PartyDataSend.fromPartial(object.party_data_send)
      : undefined;
    message.party_presence_event = (object.party_presence_event !== undefined && object.party_presence_event !== null)
      ? PartyPresenceEvent.fromPartial(object.party_presence_event)
      : undefined;
    message.message_typing_event = (object.message_typing_event !== undefined && object.message_typing_event !== null)
      ? MessageTypingEvent.fromPartial(object.message_typing_event)
      : undefined;
    message.last_seen_message_event =
      (object.last_seen_message_event !== undefined && object.last_seen_message_event !== null)
        ? LastSeenMessageEvent.fromPartial(object.last_seen_message_event)
        : undefined;
    return message;
  },
};

function createBaseChannel(): Channel {
  return { id: "", presences: [], self: undefined, chanel_name: "", user_id_one: "", user_id_two: "" };
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
    if (message.chanel_name !== "") {
      writer.uint32(34).string(message.chanel_name);
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
          message.chanel_name = reader.string();
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
      chanel_name: isSet(object.chanel_name) ? String(object.chanel_name) : "",
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
    message.chanel_name !== undefined && (obj.chanel_name = message.chanel_name);
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
    message.chanel_name = object.chanel_name ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    return message;
  },
};

function createBaseChannelJoin(): ChannelJoin {
  return { target_id: "", target: "", type: 0, persistence: undefined, hidden: undefined };
}

export const ChannelJoin = {
  encode(message: ChannelJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.target_id !== "") {
      writer.uint32(10).string(message.target_id);
    }
    if (message.target !== "") {
      writer.uint32(18).string(message.target);
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
          message.target_id = reader.string();
          break;
        case 2:
          message.target = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelJoin {
    return {
      target_id: isSet(object.target_id) ? String(object.target_id) : "",
      target: isSet(object.target) ? String(object.target) : "",
      type: isSet(object.type) ? Number(object.type) : 0,
      persistence: isSet(object.persistence) ? Boolean(object.persistence) : undefined,
      hidden: isSet(object.hidden) ? Boolean(object.hidden) : undefined,
    };
  },

  toJSON(message: ChannelJoin): unknown {
    const obj: any = {};
    message.target_id !== undefined && (obj.target_id = message.target_id);
    message.target !== undefined && (obj.target = message.target);
    message.type !== undefined && (obj.type = Math.round(message.type));
    message.persistence !== undefined && (obj.persistence = message.persistence);
    message.hidden !== undefined && (obj.hidden = message.hidden);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelJoin>, I>>(base?: I): ChannelJoin {
    return ChannelJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelJoin>, I>>(object: I): ChannelJoin {
    const message = createBaseChannelJoin();
    message.target_id = object.target_id ?? "";
    message.target = object.target ?? "";
    message.type = object.type ?? 0;
    message.persistence = object.persistence ?? undefined;
    message.hidden = object.hidden ?? undefined;
    return message;
  },
};

function createBaseChannelLeave(): ChannelLeave {
  return { channel_id: "" };
}

export const ChannelLeave = {
  encode(message: ChannelLeave, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
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
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelLeave {
    return { channel_id: isSet(object.channel_id) ? String(object.channel_id) : "" };
  },

  toJSON(message: ChannelLeave): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelLeave>, I>>(base?: I): ChannelLeave {
    return ChannelLeave.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelLeave>, I>>(object: I): ChannelLeave {
    const message = createBaseChannelLeave();
    message.channel_id = object.channel_id ?? "";
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
    channel_name: "",
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
    if (message.channel_name !== "") {
      writer.uint32(66).string(message.channel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(74).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(82).string(message.user_id_two);
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
          message.channel_name = reader.string();
          break;
        case 9:
          message.user_id_one = reader.string();
          break;
        case 10:
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
      channel_name: isSet(object.channel_name) ? String(object.channel_name) : "",
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
    message.channel_name !== undefined && (obj.channel_name = message.channel_name);
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
    message.channel_name = object.channel_name ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
    return message;
  },
};

function createBaseChannelMessageSend(): ChannelMessageSend {
  return { clan_id: "", channel_id: "", content: "" };
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
    };
  },

  toJSON(message: ChannelMessageSend): unknown {
    const obj: any = {};
    message.clan_id !== undefined && (obj.clan_id = message.clan_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.content !== undefined && (obj.content = message.content);
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
    return message;
  },
};

function createBaseChannelMessageUpdate(): ChannelMessageUpdate {
  return { channel_id: "", message_id: "", content: "" };
}

export const ChannelMessageUpdate = {
  encode(message: ChannelMessageUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
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
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
          break;
        case 3:
          message.content = reader.string();
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
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
      content: isSet(object.content) ? String(object.content) : "",
    };
  },

  toJSON(message: ChannelMessageUpdate): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageUpdate>, I>>(base?: I): ChannelMessageUpdate {
    return ChannelMessageUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageUpdate>, I>>(object: I): ChannelMessageUpdate {
    const message = createBaseChannelMessageUpdate();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    message.content = object.content ?? "";
    return message;
  },
};

function createBaseChannelMessageRemove(): ChannelMessageRemove {
  return { channel_id: "", message_id: "" };
}

export const ChannelMessageRemove = {
  encode(message: ChannelMessageRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
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
          message.channel_id = reader.string();
          break;
        case 2:
          message.message_id = reader.string();
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
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      message_id: isSet(object.message_id) ? String(object.message_id) : "",
    };
  },

  toJSON(message: ChannelMessageRemove): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelMessageRemove>, I>>(base?: I): ChannelMessageRemove {
    return ChannelMessageRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ChannelMessageRemove>, I>>(object: I): ChannelMessageRemove {
    const message = createBaseChannelMessageRemove();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    return message;
  },
};

function createBaseChannelPresenceEvent(): ChannelPresenceEvent {
  return { channel_id: "", joins: [], leaves: [], channel_name: "", user_id_one: "", user_id_two: "" };
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
    if (message.channel_name !== "") {
      writer.uint32(34).string(message.channel_name);
    }
    if (message.user_id_one !== "") {
      writer.uint32(42).string(message.user_id_one);
    }
    if (message.user_id_two !== "") {
      writer.uint32(50).string(message.user_id_two);
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
          message.channel_name = reader.string();
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

  fromJSON(object: any): ChannelPresenceEvent {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
      channel_name: isSet(object.channel_name) ? String(object.channel_name) : "",
      user_id_one: isSet(object.user_id_one) ? String(object.user_id_one) : "",
      user_id_two: isSet(object.user_id_two) ? String(object.user_id_two) : "",
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
    message.channel_name !== undefined && (obj.channel_name = message.channel_name);
    message.user_id_one !== undefined && (obj.user_id_one = message.user_id_one);
    message.user_id_two !== undefined && (obj.user_id_two = message.user_id_two);
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
    message.channel_name = object.channel_name ?? "";
    message.user_id_one = object.user_id_one ?? "";
    message.user_id_two = object.user_id_two ?? "";
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

function createBaseMatch(): Match {
  return { match_id: "", authoritative: false, label: undefined, size: 0, presences: [], self: undefined };
}

export const Match = {
  encode(message: Match, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.authoritative === true) {
      writer.uint32(16).bool(message.authoritative);
    }
    if (message.label !== undefined) {
      StringValue.encode({ value: message.label! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(32).int32(message.size);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.authoritative = reader.bool();
          break;
        case 3:
          message.label = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.size = reader.int32();
          break;
        case 5:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 6:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Match {
    return {
      match_id: isSet(object.match_id) ? String(object.match_id) : "",
      authoritative: isSet(object.authoritative) ? Boolean(object.authoritative) : false,
      label: isSet(object.label) ? String(object.label) : undefined,
      size: isSet(object.size) ? Number(object.size) : 0,
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
      self: isSet(object.self) ? UserPresence.fromJSON(object.self) : undefined,
    };
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.authoritative !== undefined && (obj.authoritative = message.authoritative);
    message.label !== undefined && (obj.label = message.label);
    message.size !== undefined && (obj.size = Math.round(message.size));
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    message.self !== undefined && (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Match>, I>>(base?: I): Match {
    return Match.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Match>, I>>(object: I): Match {
    const message = createBaseMatch();
    message.match_id = object.match_id ?? "";
    message.authoritative = object.authoritative ?? false;
    message.label = object.label ?? undefined;
    message.size = object.size ?? 0;
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    message.self = (object.self !== undefined && object.self !== null)
      ? UserPresence.fromPartial(object.self)
      : undefined;
    return message;
  },
};

function createBaseMatchCreate(): MatchCreate {
  return { name: "" };
}

export const MatchCreate = {
  encode(message: MatchCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchCreate {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: MatchCreate): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchCreate>, I>>(base?: I): MatchCreate {
    return MatchCreate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchCreate>, I>>(object: I): MatchCreate {
    const message = createBaseMatchCreate();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMatchData(): MatchData {
  return { match_id: "", presence: undefined, op_code: 0, data: new Uint8Array(), reliable: false };
}

export const MatchData = {
  encode(message: MatchData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchData {
    return {
      match_id: isSet(object.match_id) ? String(object.match_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
      op_code: isSet(object.op_code) ? Number(object.op_code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      reliable: isSet(object.reliable) ? Boolean(object.reliable) : false,
    };
  },

  toJSON(message: MatchData): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    message.op_code !== undefined && (obj.op_code = Math.round(message.op_code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchData>, I>>(base?: I): MatchData {
    return MatchData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchData>, I>>(object: I): MatchData {
    const message = createBaseMatchData();
    message.match_id = object.match_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    message.op_code = object.op_code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.reliable = object.reliable ?? false;
    return message;
  },
};

function createBaseMatchDataSend(): MatchDataSend {
  return { match_id: "", op_code: 0, data: new Uint8Array(), presences: [], reliable: false };
}

export const MatchDataSend = {
  encode(message: MatchDataSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.reliable === true) {
      writer.uint32(40).bool(message.reliable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchDataSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchDataSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        case 5:
          message.reliable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchDataSend {
    return {
      match_id: isSet(object.match_id) ? String(object.match_id) : "",
      op_code: isSet(object.op_code) ? Number(object.op_code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
      reliable: isSet(object.reliable) ? Boolean(object.reliable) : false,
    };
  },

  toJSON(message: MatchDataSend): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.op_code !== undefined && (obj.op_code = Math.round(message.op_code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    message.reliable !== undefined && (obj.reliable = message.reliable);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchDataSend>, I>>(base?: I): MatchDataSend {
    return MatchDataSend.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchDataSend>, I>>(object: I): MatchDataSend {
    const message = createBaseMatchDataSend();
    message.match_id = object.match_id ?? "";
    message.op_code = object.op_code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    message.reliable = object.reliable ?? false;
    return message;
  },
};

function createBaseMatchJoin(): MatchJoin {
  return { match_id: undefined, token: undefined, metadata: {} };
}

export const MatchJoin = {
  encode(message: MatchJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== undefined) {
      writer.uint32(10).string(message.match_id);
    }
    if (message.token !== undefined) {
      writer.uint32(18).string(message.token);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      MatchJoin_MetadataEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          const entry3 = MatchJoin_MetadataEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.metadata[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchJoin {
    return {
      match_id: isSet(object.match_id) ? String(object.match_id) : undefined,
      token: isSet(object.token) ? String(object.token) : undefined,
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: MatchJoin): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.token !== undefined && (obj.token = message.token);
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchJoin>, I>>(base?: I): MatchJoin {
    return MatchJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchJoin>, I>>(object: I): MatchJoin {
    const message = createBaseMatchJoin();
    message.match_id = object.match_id ?? undefined;
    message.token = object.token ?? undefined;
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseMatchJoin_MetadataEntry(): MatchJoin_MetadataEntry {
  return { key: "", value: "" };
}

export const MatchJoin_MetadataEntry = {
  encode(message: MatchJoin_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchJoin_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchJoin_MetadataEntry();
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

  fromJSON(object: any): MatchJoin_MetadataEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: MatchJoin_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchJoin_MetadataEntry>, I>>(base?: I): MatchJoin_MetadataEntry {
    return MatchJoin_MetadataEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchJoin_MetadataEntry>, I>>(object: I): MatchJoin_MetadataEntry {
    const message = createBaseMatchJoin_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMatchLeave(): MatchLeave {
  return { match_id: "" };
}

export const MatchLeave = {
  encode(message: MatchLeave, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchLeave();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchLeave {
    return { match_id: isSet(object.match_id) ? String(object.match_id) : "" };
  },

  toJSON(message: MatchLeave): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchLeave>, I>>(base?: I): MatchLeave {
    return MatchLeave.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchLeave>, I>>(object: I): MatchLeave {
    const message = createBaseMatchLeave();
    message.match_id = object.match_id ?? "";
    return message;
  },
};

function createBaseMatchPresenceEvent(): MatchPresenceEvent {
  return { match_id: "", joins: [], leaves: [] };
}

export const MatchPresenceEvent = {
  encode(message: MatchPresenceEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match_id !== "") {
      writer.uint32(10).string(message.match_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match_id = reader.string();
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

  fromJSON(object: any): MatchPresenceEvent {
    return {
      match_id: isSet(object.match_id) ? String(object.match_id) : "",
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: MatchPresenceEvent): unknown {
    const obj: any = {};
    message.match_id !== undefined && (obj.match_id = message.match_id);
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

  create<I extends Exact<DeepPartial<MatchPresenceEvent>, I>>(base?: I): MatchPresenceEvent {
    return MatchPresenceEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchPresenceEvent>, I>>(object: I): MatchPresenceEvent {
    const message = createBaseMatchPresenceEvent();
    message.match_id = object.match_id ?? "";
    message.joins = object.joins?.map((e) => UserPresence.fromPartial(e)) || [];
    message.leaves = object.leaves?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMatchmakerAdd(): MatchmakerAdd {
  return {
    min_count: 0,
    max_count: 0,
    query: "",
    string_properties: {},
    numeric_properties: {},
    count_multiple: undefined,
  };
}

export const MatchmakerAdd = {
  encode(message: MatchmakerAdd, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.min_count !== 0) {
      writer.uint32(8).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(16).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(26).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerAdd_StringPropertiesEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerAdd_NumericPropertiesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.count_multiple !== undefined) {
      Int32Value.encode({ value: message.count_multiple! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerAdd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min_count = reader.int32();
          break;
        case 2:
          message.max_count = reader.int32();
          break;
        case 3:
          message.query = reader.string();
          break;
        case 4:
          const entry4 = MatchmakerAdd_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.string_properties[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = MatchmakerAdd_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.numeric_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          message.count_multiple = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerAdd {
    return {
      min_count: isSet(object.min_count) ? Number(object.min_count) : 0,
      max_count: isSet(object.max_count) ? Number(object.max_count) : 0,
      query: isSet(object.query) ? String(object.query) : "",
      string_properties: isObject(object.string_properties)
        ? Object.entries(object.string_properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      numeric_properties: isObject(object.numeric_properties)
        ? Object.entries(object.numeric_properties).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
      count_multiple: isSet(object.count_multiple) ? Number(object.count_multiple) : undefined,
    };
  },

  toJSON(message: MatchmakerAdd): unknown {
    const obj: any = {};
    message.min_count !== undefined && (obj.min_count = Math.round(message.min_count));
    message.max_count !== undefined && (obj.max_count = Math.round(message.max_count));
    message.query !== undefined && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    message.count_multiple !== undefined && (obj.count_multiple = message.count_multiple);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerAdd>, I>>(base?: I): MatchmakerAdd {
    return MatchmakerAdd.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerAdd>, I>>(object: I): MatchmakerAdd {
    const message = createBaseMatchmakerAdd();
    message.min_count = object.min_count ?? 0;
    message.max_count = object.max_count ?? 0;
    message.query = object.query ?? "";
    message.string_properties = Object.entries(object.string_properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.numeric_properties = Object.entries(object.numeric_properties ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Number(value);
        }
        return acc;
      },
      {},
    );
    message.count_multiple = object.count_multiple ?? undefined;
    return message;
  },
};

function createBaseMatchmakerAdd_StringPropertiesEntry(): MatchmakerAdd_StringPropertiesEntry {
  return { key: "", value: "" };
}

export const MatchmakerAdd_StringPropertiesEntry = {
  encode(message: MatchmakerAdd_StringPropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerAdd_StringPropertiesEntry();
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

  fromJSON(object: any): MatchmakerAdd_StringPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: MatchmakerAdd_StringPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerAdd_StringPropertiesEntry>, I>>(
    base?: I,
  ): MatchmakerAdd_StringPropertiesEntry {
    return MatchmakerAdd_StringPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerAdd_StringPropertiesEntry>, I>>(
    object: I,
  ): MatchmakerAdd_StringPropertiesEntry {
    const message = createBaseMatchmakerAdd_StringPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMatchmakerAdd_NumericPropertiesEntry(): MatchmakerAdd_NumericPropertiesEntry {
  return { key: "", value: 0 };
}

export const MatchmakerAdd_NumericPropertiesEntry = {
  encode(message: MatchmakerAdd_NumericPropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerAdd_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerAdd_NumericPropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerAdd_NumericPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: MatchmakerAdd_NumericPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerAdd_NumericPropertiesEntry>, I>>(
    base?: I,
  ): MatchmakerAdd_NumericPropertiesEntry {
    return MatchmakerAdd_NumericPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerAdd_NumericPropertiesEntry>, I>>(
    object: I,
  ): MatchmakerAdd_NumericPropertiesEntry {
    const message = createBaseMatchmakerAdd_NumericPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseMatchmakerMatched(): MatchmakerMatched {
  return { ticket: "", match_id: undefined, token: undefined, users: [], self: undefined };
}

export const MatchmakerMatched = {
  encode(message: MatchmakerMatched, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    if (message.match_id !== undefined) {
      writer.uint32(18).string(message.match_id);
    }
    if (message.token !== undefined) {
      writer.uint32(26).string(message.token);
    }
    for (const v of message.users) {
      MatchmakerMatched_MatchmakerUser.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.self !== undefined) {
      MatchmakerMatched_MatchmakerUser.encode(message.self, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerMatched();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        case 2:
          message.match_id = reader.string();
          break;
        case 3:
          message.token = reader.string();
          break;
        case 4:
          message.users.push(MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32()));
          break;
        case 5:
          message.self = MatchmakerMatched_MatchmakerUser.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerMatched {
    return {
      ticket: isSet(object.ticket) ? String(object.ticket) : "",
      match_id: isSet(object.match_id) ? String(object.match_id) : undefined,
      token: isSet(object.token) ? String(object.token) : undefined,
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => MatchmakerMatched_MatchmakerUser.fromJSON(e))
        : [],
      self: isSet(object.self) ? MatchmakerMatched_MatchmakerUser.fromJSON(object.self) : undefined,
    };
  },

  toJSON(message: MatchmakerMatched): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    message.match_id !== undefined && (obj.match_id = message.match_id);
    message.token !== undefined && (obj.token = message.token);
    if (message.users) {
      obj.users = message.users.map((e) => e ? MatchmakerMatched_MatchmakerUser.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    message.self !== undefined &&
      (obj.self = message.self ? MatchmakerMatched_MatchmakerUser.toJSON(message.self) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerMatched>, I>>(base?: I): MatchmakerMatched {
    return MatchmakerMatched.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerMatched>, I>>(object: I): MatchmakerMatched {
    const message = createBaseMatchmakerMatched();
    message.ticket = object.ticket ?? "";
    message.match_id = object.match_id ?? undefined;
    message.token = object.token ?? undefined;
    message.users = object.users?.map((e) => MatchmakerMatched_MatchmakerUser.fromPartial(e)) || [];
    message.self = (object.self !== undefined && object.self !== null)
      ? MatchmakerMatched_MatchmakerUser.fromPartial(object.self)
      : undefined;
    return message;
  },
};

function createBaseMatchmakerMatched_MatchmakerUser(): MatchmakerMatched_MatchmakerUser {
  return { presence: undefined, party_id: "", string_properties: {}, numeric_properties: {} };
}

export const MatchmakerMatched_MatchmakerUser = {
  encode(message: MatchmakerMatched_MatchmakerUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    if (message.party_id !== "") {
      writer.uint32(18).string(message.party_id);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork(),
      ).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.encode(
        { key: key as any, value },
        writer.uint32(50).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerMatched_MatchmakerUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 2:
          message.party_id = reader.string();
          break;
        case 5:
          const entry5 = MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerMatched_MatchmakerUser {
    return {
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      string_properties: isObject(object.string_properties)
        ? Object.entries(object.string_properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      numeric_properties: isObject(object.numeric_properties)
        ? Object.entries(object.numeric_properties).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: MatchmakerMatched_MatchmakerUser): unknown {
    const obj: any = {};
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    message.party_id !== undefined && (obj.party_id = message.party_id);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser>, I>>(
    base?: I,
  ): MatchmakerMatched_MatchmakerUser {
    return MatchmakerMatched_MatchmakerUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser>, I>>(
    object: I,
  ): MatchmakerMatched_MatchmakerUser {
    const message = createBaseMatchmakerMatched_MatchmakerUser();
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    message.party_id = object.party_id ?? "";
    message.string_properties = Object.entries(object.string_properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.numeric_properties = Object.entries(object.numeric_properties ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Number(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry(): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
  return { key: "", value: "" };
}

export const MatchmakerMatched_MatchmakerUser_StringPropertiesEntry = {
  encode(
    message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry();
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

  fromJSON(object: any): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: MatchmakerMatched_MatchmakerUser_StringPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>, I>>(
    base?: I,
  ): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    return MatchmakerMatched_MatchmakerUser_StringPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser_StringPropertiesEntry>, I>>(
    object: I,
  ): MatchmakerMatched_MatchmakerUser_StringPropertiesEntry {
    const message = createBaseMatchmakerMatched_MatchmakerUser_StringPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry(): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
  return { key: "", value: 0 };
}

export const MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry = {
  encode(
    message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>, I>>(
    base?: I,
  ): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    return MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry>, I>>(
    object: I,
  ): MatchmakerMatched_MatchmakerUser_NumericPropertiesEntry {
    const message = createBaseMatchmakerMatched_MatchmakerUser_NumericPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseMatchmakerRemove(): MatchmakerRemove {
  return { ticket: "" };
}

export const MatchmakerRemove = {
  encode(message: MatchmakerRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerRemove {
    return { ticket: isSet(object.ticket) ? String(object.ticket) : "" };
  },

  toJSON(message: MatchmakerRemove): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerRemove>, I>>(base?: I): MatchmakerRemove {
    return MatchmakerRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerRemove>, I>>(object: I): MatchmakerRemove {
    const message = createBaseMatchmakerRemove();
    message.ticket = object.ticket ?? "";
    return message;
  },
};

function createBaseMatchmakerTicket(): MatchmakerTicket {
  return { ticket: "" };
}

export const MatchmakerTicket = {
  encode(message: MatchmakerTicket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ticket !== "") {
      writer.uint32(10).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MatchmakerTicket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatchmakerTicket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchmakerTicket {
    return { ticket: isSet(object.ticket) ? String(object.ticket) : "" };
  },

  toJSON(message: MatchmakerTicket): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  create<I extends Exact<DeepPartial<MatchmakerTicket>, I>>(base?: I): MatchmakerTicket {
    return MatchmakerTicket.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MatchmakerTicket>, I>>(object: I): MatchmakerTicket {
    const message = createBaseMatchmakerTicket();
    message.ticket = object.ticket ?? "";
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

function createBaseParty(): Party {
  return { party_id: "", open: false, max_size: 0, self: undefined, leader: undefined, presences: [] };
}

export const Party = {
  encode(message: Party, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.open === true) {
      writer.uint32(16).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(24).int32(message.max_size);
    }
    if (message.self !== undefined) {
      UserPresence.encode(message.self, writer.uint32(34).fork()).ldelim();
    }
    if (message.leader !== undefined) {
      UserPresence.encode(message.leader, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Party {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.open = reader.bool();
          break;
        case 3:
          message.max_size = reader.int32();
          break;
        case 4:
          message.self = UserPresence.decode(reader, reader.uint32());
          break;
        case 5:
          message.leader = UserPresence.decode(reader, reader.uint32());
          break;
        case 6:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Party {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      open: isSet(object.open) ? Boolean(object.open) : false,
      max_size: isSet(object.max_size) ? Number(object.max_size) : 0,
      self: isSet(object.self) ? UserPresence.fromJSON(object.self) : undefined,
      leader: isSet(object.leader) ? UserPresence.fromJSON(object.leader) : undefined,
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: Party): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.open !== undefined && (obj.open = message.open);
    message.max_size !== undefined && (obj.max_size = Math.round(message.max_size));
    message.self !== undefined && (obj.self = message.self ? UserPresence.toJSON(message.self) : undefined);
    message.leader !== undefined && (obj.leader = message.leader ? UserPresence.toJSON(message.leader) : undefined);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Party>, I>>(base?: I): Party {
    return Party.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Party>, I>>(object: I): Party {
    const message = createBaseParty();
    message.party_id = object.party_id ?? "";
    message.open = object.open ?? false;
    message.max_size = object.max_size ?? 0;
    message.self = (object.self !== undefined && object.self !== null)
      ? UserPresence.fromPartial(object.self)
      : undefined;
    message.leader = (object.leader !== undefined && object.leader !== null)
      ? UserPresence.fromPartial(object.leader)
      : undefined;
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBasePartyCreate(): PartyCreate {
  return { open: false, max_size: 0 };
}

export const PartyCreate = {
  encode(message: PartyCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.open === true) {
      writer.uint32(8).bool(message.open);
    }
    if (message.max_size !== 0) {
      writer.uint32(16).int32(message.max_size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.open = reader.bool();
          break;
        case 2:
          message.max_size = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyCreate {
    return {
      open: isSet(object.open) ? Boolean(object.open) : false,
      max_size: isSet(object.max_size) ? Number(object.max_size) : 0,
    };
  },

  toJSON(message: PartyCreate): unknown {
    const obj: any = {};
    message.open !== undefined && (obj.open = message.open);
    message.max_size !== undefined && (obj.max_size = Math.round(message.max_size));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyCreate>, I>>(base?: I): PartyCreate {
    return PartyCreate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyCreate>, I>>(object: I): PartyCreate {
    const message = createBasePartyCreate();
    message.open = object.open ?? false;
    message.max_size = object.max_size ?? 0;
    return message;
  },
};

function createBasePartyJoin(): PartyJoin {
  return { party_id: "" };
}

export const PartyJoin = {
  encode(message: PartyJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoin {
    return { party_id: isSet(object.party_id) ? String(object.party_id) : "" };
  },

  toJSON(message: PartyJoin): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyJoin>, I>>(base?: I): PartyJoin {
    return PartyJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyJoin>, I>>(object: I): PartyJoin {
    const message = createBasePartyJoin();
    message.party_id = object.party_id ?? "";
    return message;
  },
};

function createBasePartyLeave(): PartyLeave {
  return { party_id: "" };
}

export const PartyLeave = {
  encode(message: PartyLeave, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeave {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyLeave();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyLeave {
    return { party_id: isSet(object.party_id) ? String(object.party_id) : "" };
  },

  toJSON(message: PartyLeave): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyLeave>, I>>(base?: I): PartyLeave {
    return PartyLeave.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyLeave>, I>>(object: I): PartyLeave {
    const message = createBasePartyLeave();
    message.party_id = object.party_id ?? "";
    return message;
  },
};

function createBasePartyPromote(): PartyPromote {
  return { party_id: "", presence: undefined };
}

export const PartyPromote = {
  encode(message: PartyPromote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyPromote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyPromote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyPromote {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
    };
  },

  toJSON(message: PartyPromote): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyPromote>, I>>(base?: I): PartyPromote {
    return PartyPromote.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyPromote>, I>>(object: I): PartyPromote {
    const message = createBasePartyPromote();
    message.party_id = object.party_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    return message;
  },
};

function createBasePartyLeader(): PartyLeader {
  return { party_id: "", presence: undefined };
}

export const PartyLeader = {
  encode(message: PartyLeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyLeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyLeader {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
    };
  },

  toJSON(message: PartyLeader): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyLeader>, I>>(base?: I): PartyLeader {
    return PartyLeader.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyLeader>, I>>(object: I): PartyLeader {
    const message = createBasePartyLeader();
    message.party_id = object.party_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    return message;
  },
};

function createBasePartyAccept(): PartyAccept {
  return { party_id: "", presence: undefined };
}

export const PartyAccept = {
  encode(message: PartyAccept, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyAccept {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyAccept();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyAccept {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
    };
  },

  toJSON(message: PartyAccept): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyAccept>, I>>(base?: I): PartyAccept {
    return PartyAccept.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyAccept>, I>>(object: I): PartyAccept {
    const message = createBasePartyAccept();
    message.party_id = object.party_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    return message;
  },
};

function createBasePartyRemove(): PartyRemove {
  return { party_id: "", presence: undefined };
}

export const PartyRemove = {
  encode(message: PartyRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyRemove {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
    };
  },

  toJSON(message: PartyRemove): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyRemove>, I>>(base?: I): PartyRemove {
    return PartyRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyRemove>, I>>(object: I): PartyRemove {
    const message = createBasePartyRemove();
    message.party_id = object.party_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    return message;
  },
};

function createBasePartyClose(): PartyClose {
  return { party_id: "" };
}

export const PartyClose = {
  encode(message: PartyClose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyClose {
    return { party_id: isSet(object.party_id) ? String(object.party_id) : "" };
  },

  toJSON(message: PartyClose): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyClose>, I>>(base?: I): PartyClose {
    return PartyClose.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyClose>, I>>(object: I): PartyClose {
    const message = createBasePartyClose();
    message.party_id = object.party_id ?? "";
    return message;
  },
};

function createBasePartyJoinRequestList(): PartyJoinRequestList {
  return { party_id: "" };
}

export const PartyJoinRequestList = {
  encode(message: PartyJoinRequestList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequestList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyJoinRequestList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoinRequestList {
    return { party_id: isSet(object.party_id) ? String(object.party_id) : "" };
  },

  toJSON(message: PartyJoinRequestList): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyJoinRequestList>, I>>(base?: I): PartyJoinRequestList {
    return PartyJoinRequestList.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyJoinRequestList>, I>>(object: I): PartyJoinRequestList {
    const message = createBasePartyJoinRequestList();
    message.party_id = object.party_id ?? "";
    return message;
  },
};

function createBasePartyJoinRequest(): PartyJoinRequest {
  return { party_id: "", presences: [] };
}

export const PartyJoinRequest = {
  encode(message: PartyJoinRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.presences) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyJoinRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presences.push(UserPresence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyJoinRequest {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presences: Array.isArray(object?.presences) ? object.presences.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: PartyJoinRequest): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    if (message.presences) {
      obj.presences = message.presences.map((e) => e ? UserPresence.toJSON(e) : undefined);
    } else {
      obj.presences = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyJoinRequest>, I>>(base?: I): PartyJoinRequest {
    return PartyJoinRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyJoinRequest>, I>>(object: I): PartyJoinRequest {
    const message = createBasePartyJoinRequest();
    message.party_id = object.party_id ?? "";
    message.presences = object.presences?.map((e) => UserPresence.fromPartial(e)) || [];
    return message;
  },
};

function createBasePartyMatchmakerAdd(): PartyMatchmakerAdd {
  return {
    party_id: "",
    min_count: 0,
    max_count: 0,
    query: "",
    string_properties: {},
    numeric_properties: {},
    count_multiple: undefined,
  };
}

export const PartyMatchmakerAdd = {
  encode(message: PartyMatchmakerAdd, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.min_count !== 0) {
      writer.uint32(16).int32(message.min_count);
    }
    if (message.max_count !== 0) {
      writer.uint32(24).int32(message.max_count);
    }
    if (message.query !== "") {
      writer.uint32(34).string(message.query);
    }
    Object.entries(message.string_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_StringPropertiesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    Object.entries(message.numeric_properties).forEach(([key, value]) => {
      PartyMatchmakerAdd_NumericPropertiesEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    if (message.count_multiple !== undefined) {
      Int32Value.encode({ value: message.count_multiple! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyMatchmakerAdd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.min_count = reader.int32();
          break;
        case 3:
          message.max_count = reader.int32();
          break;
        case 4:
          message.query = reader.string();
          break;
        case 5:
          const entry5 = PartyMatchmakerAdd_StringPropertiesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.string_properties[entry5.key] = entry5.value;
          }
          break;
        case 6:
          const entry6 = PartyMatchmakerAdd_NumericPropertiesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.numeric_properties[entry6.key] = entry6.value;
          }
          break;
        case 7:
          message.count_multiple = Int32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerAdd {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      min_count: isSet(object.min_count) ? Number(object.min_count) : 0,
      max_count: isSet(object.max_count) ? Number(object.max_count) : 0,
      query: isSet(object.query) ? String(object.query) : "",
      string_properties: isObject(object.string_properties)
        ? Object.entries(object.string_properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      numeric_properties: isObject(object.numeric_properties)
        ? Object.entries(object.numeric_properties).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
      count_multiple: isSet(object.count_multiple) ? Number(object.count_multiple) : undefined,
    };
  },

  toJSON(message: PartyMatchmakerAdd): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.min_count !== undefined && (obj.min_count = Math.round(message.min_count));
    message.max_count !== undefined && (obj.max_count = Math.round(message.max_count));
    message.query !== undefined && (obj.query = message.query);
    obj.string_properties = {};
    if (message.string_properties) {
      Object.entries(message.string_properties).forEach(([k, v]) => {
        obj.string_properties[k] = v;
      });
    }
    obj.numeric_properties = {};
    if (message.numeric_properties) {
      Object.entries(message.numeric_properties).forEach(([k, v]) => {
        obj.numeric_properties[k] = v;
      });
    }
    message.count_multiple !== undefined && (obj.count_multiple = message.count_multiple);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyMatchmakerAdd>, I>>(base?: I): PartyMatchmakerAdd {
    return PartyMatchmakerAdd.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyMatchmakerAdd>, I>>(object: I): PartyMatchmakerAdd {
    const message = createBasePartyMatchmakerAdd();
    message.party_id = object.party_id ?? "";
    message.min_count = object.min_count ?? 0;
    message.max_count = object.max_count ?? 0;
    message.query = object.query ?? "";
    message.string_properties = Object.entries(object.string_properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.numeric_properties = Object.entries(object.numeric_properties ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Number(value);
        }
        return acc;
      },
      {},
    );
    message.count_multiple = object.count_multiple ?? undefined;
    return message;
  },
};

function createBasePartyMatchmakerAdd_StringPropertiesEntry(): PartyMatchmakerAdd_StringPropertiesEntry {
  return { key: "", value: "" };
}

export const PartyMatchmakerAdd_StringPropertiesEntry = {
  encode(message: PartyMatchmakerAdd_StringPropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_StringPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyMatchmakerAdd_StringPropertiesEntry();
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

  fromJSON(object: any): PartyMatchmakerAdd_StringPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: PartyMatchmakerAdd_StringPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyMatchmakerAdd_StringPropertiesEntry>, I>>(
    base?: I,
  ): PartyMatchmakerAdd_StringPropertiesEntry {
    return PartyMatchmakerAdd_StringPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyMatchmakerAdd_StringPropertiesEntry>, I>>(
    object: I,
  ): PartyMatchmakerAdd_StringPropertiesEntry {
    const message = createBasePartyMatchmakerAdd_StringPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePartyMatchmakerAdd_NumericPropertiesEntry(): PartyMatchmakerAdd_NumericPropertiesEntry {
  return { key: "", value: 0 };
}

export const PartyMatchmakerAdd_NumericPropertiesEntry = {
  encode(message: PartyMatchmakerAdd_NumericPropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_NumericPropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyMatchmakerAdd_NumericPropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerAdd_NumericPropertiesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: PartyMatchmakerAdd_NumericPropertiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyMatchmakerAdd_NumericPropertiesEntry>, I>>(
    base?: I,
  ): PartyMatchmakerAdd_NumericPropertiesEntry {
    return PartyMatchmakerAdd_NumericPropertiesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyMatchmakerAdd_NumericPropertiesEntry>, I>>(
    object: I,
  ): PartyMatchmakerAdd_NumericPropertiesEntry {
    const message = createBasePartyMatchmakerAdd_NumericPropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBasePartyMatchmakerRemove(): PartyMatchmakerRemove {
  return { party_id: "", ticket: "" };
}

export const PartyMatchmakerRemove = {
  encode(message: PartyMatchmakerRemove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerRemove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyMatchmakerRemove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerRemove {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      ticket: isSet(object.ticket) ? String(object.ticket) : "",
    };
  },

  toJSON(message: PartyMatchmakerRemove): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyMatchmakerRemove>, I>>(base?: I): PartyMatchmakerRemove {
    return PartyMatchmakerRemove.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyMatchmakerRemove>, I>>(object: I): PartyMatchmakerRemove {
    const message = createBasePartyMatchmakerRemove();
    message.party_id = object.party_id ?? "";
    message.ticket = object.ticket ?? "";
    return message;
  },
};

function createBasePartyMatchmakerTicket(): PartyMatchmakerTicket {
  return { party_id: "", ticket: "" };
}

export const PartyMatchmakerTicket = {
  encode(message: PartyMatchmakerTicket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.ticket !== "") {
      writer.uint32(18).string(message.ticket);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerTicket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyMatchmakerTicket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.ticket = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyMatchmakerTicket {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      ticket: isSet(object.ticket) ? String(object.ticket) : "",
    };
  },

  toJSON(message: PartyMatchmakerTicket): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.ticket !== undefined && (obj.ticket = message.ticket);
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyMatchmakerTicket>, I>>(base?: I): PartyMatchmakerTicket {
    return PartyMatchmakerTicket.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyMatchmakerTicket>, I>>(object: I): PartyMatchmakerTicket {
    const message = createBasePartyMatchmakerTicket();
    message.party_id = object.party_id ?? "";
    message.ticket = object.ticket ?? "";
    return message;
  },
};

function createBasePartyData(): PartyData {
  return { party_id: "", presence: undefined, op_code: 0, data: new Uint8Array() };
}

export const PartyData = {
  encode(message: PartyData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.presence !== undefined) {
      UserPresence.encode(message.presence, writer.uint32(18).fork()).ldelim();
    }
    if (message.op_code !== 0) {
      writer.uint32(24).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.presence = UserPresence.decode(reader, reader.uint32());
          break;
        case 3:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyData {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      presence: isSet(object.presence) ? UserPresence.fromJSON(object.presence) : undefined,
      op_code: isSet(object.op_code) ? Number(object.op_code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: PartyData): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.presence !== undefined &&
      (obj.presence = message.presence ? UserPresence.toJSON(message.presence) : undefined);
    message.op_code !== undefined && (obj.op_code = Math.round(message.op_code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyData>, I>>(base?: I): PartyData {
    return PartyData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyData>, I>>(object: I): PartyData {
    const message = createBasePartyData();
    message.party_id = object.party_id ?? "";
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? UserPresence.fromPartial(object.presence)
      : undefined;
    message.op_code = object.op_code ?? 0;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBasePartyDataSend(): PartyDataSend {
  return { party_id: "", op_code: 0, data: new Uint8Array() };
}

export const PartyDataSend = {
  encode(message: PartyDataSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    if (message.op_code !== 0) {
      writer.uint32(16).int64(message.op_code);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyDataSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyDataSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
          break;
        case 2:
          message.op_code = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyDataSend {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      op_code: isSet(object.op_code) ? Number(object.op_code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: PartyDataSend): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
    message.op_code !== undefined && (obj.op_code = Math.round(message.op_code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<PartyDataSend>, I>>(base?: I): PartyDataSend {
    return PartyDataSend.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyDataSend>, I>>(object: I): PartyDataSend {
    const message = createBasePartyDataSend();
    message.party_id = object.party_id ?? "";
    message.op_code = object.op_code ?? 0;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBasePartyPresenceEvent(): PartyPresenceEvent {
  return { party_id: "", joins: [], leaves: [] };
}

export const PartyPresenceEvent = {
  encode(message: PartyPresenceEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.party_id !== "") {
      writer.uint32(10).string(message.party_id);
    }
    for (const v of message.joins) {
      UserPresence.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leaves) {
      UserPresence.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyPresenceEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyPresenceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party_id = reader.string();
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

  fromJSON(object: any): PartyPresenceEvent {
    return {
      party_id: isSet(object.party_id) ? String(object.party_id) : "",
      joins: Array.isArray(object?.joins) ? object.joins.map((e: any) => UserPresence.fromJSON(e)) : [],
      leaves: Array.isArray(object?.leaves) ? object.leaves.map((e: any) => UserPresence.fromJSON(e)) : [],
    };
  },

  toJSON(message: PartyPresenceEvent): unknown {
    const obj: any = {};
    message.party_id !== undefined && (obj.party_id = message.party_id);
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

  create<I extends Exact<DeepPartial<PartyPresenceEvent>, I>>(base?: I): PartyPresenceEvent {
    return PartyPresenceEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PartyPresenceEvent>, I>>(object: I): PartyPresenceEvent {
    const message = createBasePartyPresenceEvent();
    message.party_id = object.party_id ?? "";
    message.joins = object.joins?.map((e) => UserPresence.fromPartial(e)) || [];
    message.leaves = object.leaves?.map((e) => UserPresence.fromPartial(e)) || [];
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

function createBaseLastSeenMessageEvent(): LastSeenMessageEvent {
  return { channel_id: "", message_id: "" };
}

export const LastSeenMessageEvent = {
  encode(message: LastSeenMessageEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.message_id !== "") {
      writer.uint32(18).string(message.message_id);
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
    };
  },

  toJSON(message: LastSeenMessageEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.message_id !== undefined && (obj.message_id = message.message_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<LastSeenMessageEvent>, I>>(base?: I): LastSeenMessageEvent {
    return LastSeenMessageEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LastSeenMessageEvent>, I>>(object: I): LastSeenMessageEvent {
    const message = createBaseLastSeenMessageEvent();
    message.channel_id = object.channel_id ?? "";
    message.message_id = object.message_id ?? "";
    return message;
  },
};

function createBaseMessageTypingEvent(): MessageTypingEvent {
  return { channel_id: "", sender_id: "" };
}

export const MessageTypingEvent = {
  encode(message: MessageTypingEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.sender_id !== "") {
      writer.uint32(18).string(message.sender_id);
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
          message.channel_id = reader.string();
          break;
        case 2:
          message.sender_id = reader.string();
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
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      sender_id: isSet(object.sender_id) ? String(object.sender_id) : "",
    };
  },

  toJSON(message: MessageTypingEvent): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.sender_id !== undefined && (obj.sender_id = message.sender_id);
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageTypingEvent>, I>>(base?: I): MessageTypingEvent {
    return MessageTypingEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MessageTypingEvent>, I>>(object: I): MessageTypingEvent {
    const message = createBaseMessageTypingEvent();
    message.channel_id = object.channel_id ?? "";
    message.sender_id = object.sender_id ?? "";
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
  return { mode: 0, subject: "", subcontext: "", label: "" };
}

export const Stream = {
  encode(message: Stream, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subcontext !== "") {
      writer.uint32(26).string(message.subcontext);
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
          message.subject = reader.string();
          break;
        case 3:
          message.subcontext = reader.string();
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
      subject: isSet(object.subject) ? String(object.subject) : "",
      subcontext: isSet(object.subcontext) ? String(object.subcontext) : "",
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: Stream): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.subject !== undefined && (obj.subject = message.subject);
    message.subcontext !== undefined && (obj.subcontext = message.subcontext);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  create<I extends Exact<DeepPartial<Stream>, I>>(base?: I): Stream {
    return Stream.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Stream>, I>>(object: I): Stream {
    const message = createBaseStream();
    message.mode = object.mode ?? 0;
    message.subject = object.subject ?? "";
    message.subcontext = object.subcontext ?? "";
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
