import _m0 from "protobufjs/minimal";
import { ChannelMessage, Notification, Rpc } from "../api/api";
export declare const protobufPackage = "mezon.realtime";
/** The realtime protocol for Mezon server. */
/** An envelope for a realtime message. */
export interface Envelope {
    cid: string;
    /** A response from a channel join operation. */
    channel?: Channel | undefined;
    /** Join a realtime chat channel. */
    channel_join?: ChannelJoin | undefined;
    /** Leave a realtime chat channel. */
    channel_leave?: ChannelLeave | undefined;
    /** An incoming message on a realtime chat channel. */
    channel_message?: ChannelMessage | undefined;
    /** An acknowledgement received in response to sending a message on a chat channel. */
    channel_message_ack?: ChannelMessageAck | undefined;
    /** Send a message to a realtime chat channel. */
    channel_message_send?: ChannelMessageSend | undefined;
    /** Update a message previously sent to a realtime chat channel. */
    channel_message_update?: ChannelMessageUpdate | undefined;
    /** Remove a message previously sent to a realtime chat channel. */
    channel_message_remove?: ChannelMessageRemove | undefined;
    /** Presence update for a particular realtime chat channel. */
    channel_presence_event?: ChannelPresenceEvent | undefined;
    /** Describes an error which occurred on the server. */
    error?: Error | undefined;
    /** Notifications send by the server. */
    notifications?: Notifications | undefined;
    /** RPC call or response. */
    rpc?: Rpc | undefined;
    /** An incoming status snapshot for some set of users. */
    status?: Status | undefined;
    /** Start following some set of users to receive their status updates. */
    status_follow?: StatusFollow | undefined;
    /** An incoming status update. */
    status_presence_event?: StatusPresenceEvent | undefined;
    /** Stop following some set of users to no longer receive their status updates. */
    status_unfollow?: StatusUnfollow | undefined;
    /** Set the user's own status. */
    status_update?: StatusUpdate | undefined;
    /** A data message delivered over a stream. */
    stream_data?: StreamData | undefined;
    /** Presence update for a particular stream. */
    stream_presence_event?: StreamPresenceEvent | undefined;
    /** Application-level heartbeat and connection check. */
    ping?: Ping | undefined;
    /** Application-level heartbeat and connection check response. */
    pong?: Pong | undefined;
    /** Incoming information about a party. */
    party?: Party | undefined;
    /** Create a party. */
    party_create?: PartyCreate | undefined;
    /** Join a party, or request to join if the party is not open. */
    party_join?: PartyJoin | undefined;
    /** Leave a party. */
    party_leave?: PartyLeave | undefined;
    /** Promote a new party leader. */
    party_promote?: PartyPromote | undefined;
    /** Announcement of a new party leader. */
    party_leader?: PartyLeader | undefined;
    /** Accept a request to join. */
    party_accept?: PartyAccept | undefined;
    /** Kick a party member, or decline a request to join. */
    party_remove?: PartyRemove | undefined;
    /** End a party, kicking all party members and closing it. */
    party_close?: PartyClose | undefined;
    /** Request a list of pending join requests for a party. */
    party_join_request_list?: PartyJoinRequestList | undefined;
    /** Incoming notification for one or more new presences attempting to join the party. */
    party_join_request?: PartyJoinRequest | undefined;
    /** Incoming party data delivered from the server. */
    party_data?: PartyData | undefined;
    /** A client to server request to send data to a party. */
    party_data_send?: PartyDataSend | undefined;
    /** Presence update for a particular party. */
    party_presence_event?: PartyPresenceEvent | undefined;
    /** User typing event */
    message_typing_event?: MessageTypingEvent | undefined;
    /** Last seen message event */
    last_seen_message_event?: LastSeenMessageEvent | undefined;
    /** User send reactoin event */
    message_reaction_event?: MessageReactionEvent | undefined;
    /** user join voice channel */
    voice_joined_event?: VoiceJoinedEvent | undefined;
    /** user leave voice channel */
    voice_leaved_event?: VoiceLeavedEvent | undefined;
    /** channel created event */
    channel_created_event?: ChannelCreatedEvent | undefined;
    /** channel deleted event */
    channel_deleted_event?: ChannelDeletedEvent | undefined;
}
/** A realtime chat channel. */
export interface Channel {
    /** The ID of the channel. */
    id: string;
    /** The users currently in the channel. */
    presences: UserPresence[];
    /** A reference to the current user's presence in the channel. */
    self: UserPresence | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    chanel_label: string;
    /** The ID of the first DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_one: string;
    /** The ID of the second DM user, or an empty string if this message was not sent through a DM chat. */
    user_id_two: string;
}
/** Join operation for a realtime chat channel. */
export interface ChannelJoin {
    /** The id of channel or group */
    channel_id: string;
    /** The user ID to DM with, group ID to chat with, or channel id to join. */
    channel_label: string;
    /** The type of the chat channel. */
    type: number;
    /** Whether messages sent on this channel should be persistent. */
    persistence: boolean | undefined;
    /** Whether the user should appear in the channel's presence list and events. */
    hidden: boolean | undefined;
    /** mode */
    mode: number;
}
/** Leave a realtime channel. */
export interface ChannelLeave {
    /** The ID of the channel to leave. */
    channel_id: string;
    /** The channe name */
    channel_label: string;
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
    code: number | undefined;
    /** Username of the message sender. */
    username: string;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created. */
    create_time: Date | undefined;
    /** The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was last updated. */
    update_time: Date | undefined;
    /** True if the message was persisted to the channel's history, false otherwise. */
    persistent: boolean | undefined;
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    channel_label: string;
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
    /** The channel label to sent to. */
    channel_label: string;
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
}
/** Update a message previously sent to a realtime channel. */
export interface ChannelMessageUpdate {
    /** The channel the message was sent to. */
    channel_id: string;
    /** channel label */
    channel_label: string;
    /** The ID assigned to the message to update. */
    message_id: string;
    /** New message content. */
    content: string;
    /** The mode */
    mode: number;
}
/** Remove a message previously sent to a realtime channel. */
export interface ChannelMessageRemove {
    /** The channel the message was sent to. */
    channel_id: string;
    /** The channel label */
    channel_label: string;
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
    /** The name of the chat room, or an empty string if this message was not sent through a chat room. */
    channel_label: string;
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
    context: {
        [key: string]: string;
    };
}
/** The selection of possible error codes. */
export declare enum Error_Code {
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
    UNRECOGNIZED = -1
}
export declare function error_CodeFromJSON(object: any): Error_Code;
export declare function error_CodeToJSON(object: Error_Code): string;
export interface Error_ContextEntry {
    key: string;
    value: string;
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
    self: UserPresence | undefined;
    /** Leader. */
    leader: UserPresence | undefined;
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
    string_properties: {
        [key: string]: string;
    };
    /** Numeric properties. */
    numeric_properties: {
        [key: string]: number;
    };
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
    presence: UserPresence | undefined;
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
    /** The channel label */
    channel_label: string;
    /** The unique ID of this message. */
    message_id: string;
    /** The stream mode */
    mode: number;
    /** The timestamp */
    timestamp: string;
}
/** Message typing event data */
export interface MessageTypingEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    /** The channel label */
    channel_label: string;
    /** Message sender, usually a user ID. */
    sender_id: string;
    /** mode */
    mode: number;
}
/** Mention to message */
export interface MessageMentionEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    /** The channel label */
    channel_label: string;
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
    /** The channel this message belongs to. */
    channel_id: string;
    /** The channel label */
    channel_label: string;
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
    /** The channel label */
    channel_label: string;
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
    /** channel type */
    channel_type: number | undefined;
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
    stream: Stream | undefined;
    /** The sender, if any. */
    sender: UserPresence | undefined;
    /** Arbitrary contents of the data message. */
    data: string;
    /** True if this data was delivered reliably, false otherwise. */
    reliable: boolean;
}
/** A set of joins and leaves on a particular stream. */
export interface StreamPresenceEvent {
    /** The stream this event relates to. */
    stream: Stream | undefined;
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
export declare const Envelope: {
    encode(message: Envelope, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Envelope;
    fromJSON(object: any): Envelope;
    toJSON(message: Envelope): unknown;
    create<I extends {
        cid?: string | undefined;
        channel?: {
            id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } | undefined;
        channel_join?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_leave?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_message?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } | undefined;
        channel_message_ack?: {
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } | undefined;
        channel_message_send?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: {
                user_id?: string | undefined;
                username?: string | undefined;
            }[] | undefined;
            attachments?: {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] | undefined;
            references?: {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } | undefined;
        channel_message_update?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_message_remove?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_presence_event?: {
            channel_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        error?: {
            code?: number | undefined;
            message?: string | undefined;
            context?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        notifications?: {
            notifications?: {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] | undefined;
        } | undefined;
        rpc?: {
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } | undefined;
        status?: {
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        status_follow?: {
            user_ids?: string[] | undefined;
            usernames?: string[] | undefined;
        } | undefined;
        status_presence_event?: {
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        status_unfollow?: {
            user_ids?: string[] | undefined;
        } | undefined;
        status_update?: {
            status?: string | undefined;
        } | undefined;
        stream_data?: {
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            sender?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } | undefined;
        stream_presence_event?: {
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        ping?: {} | undefined;
        pong?: {} | undefined;
        party?: {
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            leader?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        party_create?: {
            open?: boolean | undefined;
            max_size?: number | undefined;
        } | undefined;
        party_join?: {
            party_id?: string | undefined;
        } | undefined;
        party_leave?: {
            party_id?: string | undefined;
        } | undefined;
        party_promote?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_leader?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_accept?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_remove?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_close?: {
            party_id?: string | undefined;
        } | undefined;
        party_join_request_list?: {
            party_id?: string | undefined;
        } | undefined;
        party_join_request?: {
            party_id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        party_data?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } | undefined;
        party_data_send?: {
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } | undefined;
        party_presence_event?: {
            party_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        message_typing_event?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        last_seen_message_event?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } | undefined;
        message_reaction_event?: {
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } | undefined;
        voice_joined_event?: {
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } | undefined;
        voice_leaved_event?: {
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } | undefined;
        channel_created_event?: {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } | undefined;
        channel_deleted_event?: {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        channel?: ({
            id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            id?: string | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K in Exclude<keyof I["channel"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["channel"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            self?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_2 in Exclude<keyof I["channel"]["self"], keyof UserPresence>]: never; }) | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K_3 in Exclude<keyof I["channel"], keyof Channel>]: never; }) | undefined;
        channel_join?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } & { [K_4 in Exclude<keyof I["channel_join"], keyof ChannelJoin>]: never; }) | undefined;
        channel_leave?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } & { [K_5 in Exclude<keyof I["channel_leave"], keyof ChannelLeave>]: never; }) | undefined;
        channel_message?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & { [K_6 in Exclude<keyof I["channel_message"], keyof ChannelMessage>]: never; }) | undefined;
        channel_message_ack?: ({
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K_7 in Exclude<keyof I["channel_message_ack"], keyof ChannelMessageAck>]: never; }) | undefined;
        channel_message_send?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: {
                user_id?: string | undefined;
                username?: string | undefined;
            }[] | undefined;
            attachments?: {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] | undefined;
            references?: {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: ({
                user_id?: string | undefined;
                username?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                username?: string | undefined;
            } & {
                user_id?: string | undefined;
                username?: string | undefined;
            } & { [K_8 in Exclude<keyof I["channel_message_send"]["mentions"][number], keyof MessageMention>]: never; })[] & { [K_9 in Exclude<keyof I["channel_message_send"]["mentions"], keyof {
                user_id?: string | undefined;
                username?: string | undefined;
            }[]>]: never; }) | undefined;
            attachments?: ({
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] & ({
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & { [K_10 in Exclude<keyof I["channel_message_send"]["attachments"][number], keyof MessageAttachment>]: never; })[] & { [K_11 in Exclude<keyof I["channel_message_send"]["attachments"], keyof {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[]>]: never; }) | undefined;
            references?: ({
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] & ({
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            } & {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            } & { [K_12 in Exclude<keyof I["channel_message_send"]["references"][number], keyof MessageRef>]: never; })[] & { [K_13 in Exclude<keyof I["channel_message_send"]["references"], keyof {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[]>]: never; }) | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } & { [K_14 in Exclude<keyof I["channel_message_send"], keyof ChannelMessageSend>]: never; }) | undefined;
        channel_message_update?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } & { [K_15 in Exclude<keyof I["channel_message_update"], keyof ChannelMessageUpdate>]: never; }) | undefined;
        channel_message_remove?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } & { [K_16 in Exclude<keyof I["channel_message_remove"], keyof ChannelMessageRemove>]: never; }) | undefined;
        channel_presence_event?: ({
            channel_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_17 in Exclude<keyof I["channel_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_18 in Exclude<keyof I["channel_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_19 in Exclude<keyof I["channel_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_20 in Exclude<keyof I["channel_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } & { [K_21 in Exclude<keyof I["channel_presence_event"], keyof ChannelPresenceEvent>]: never; }) | undefined;
        error?: ({
            code?: number | undefined;
            message?: string | undefined;
            context?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            code?: number | undefined;
            message?: string | undefined;
            context?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_22 in Exclude<keyof I["error"]["context"], string | number>]: never; }) | undefined;
        } & { [K_23 in Exclude<keyof I["error"], keyof Error>]: never; }) | undefined;
        notifications?: ({
            notifications?: {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] | undefined;
        } & {
            notifications?: ({
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] & ({
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            } & {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            } & { [K_24 in Exclude<keyof I["notifications"]["notifications"][number], keyof Notification>]: never; })[] & { [K_25 in Exclude<keyof I["notifications"]["notifications"], keyof {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["notifications"], "notifications">]: never; }) | undefined;
        rpc?: ({
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } & {
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } & { [K_27 in Exclude<keyof I["rpc"], keyof Rpc>]: never; }) | undefined;
        status?: ({
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_28 in Exclude<keyof I["status"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_29 in Exclude<keyof I["status"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_30 in Exclude<keyof I["status"], "presences">]: never; }) | undefined;
        status_follow?: ({
            user_ids?: string[] | undefined;
            usernames?: string[] | undefined;
        } & {
            user_ids?: (string[] & string[] & { [K_31 in Exclude<keyof I["status_follow"]["user_ids"], keyof string[]>]: never; }) | undefined;
            usernames?: (string[] & string[] & { [K_32 in Exclude<keyof I["status_follow"]["usernames"], keyof string[]>]: never; }) | undefined;
        } & { [K_33 in Exclude<keyof I["status_follow"], keyof StatusFollow>]: never; }) | undefined;
        status_presence_event?: ({
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_34 in Exclude<keyof I["status_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_35 in Exclude<keyof I["status_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_36 in Exclude<keyof I["status_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_37 in Exclude<keyof I["status_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_38 in Exclude<keyof I["status_presence_event"], keyof StatusPresenceEvent>]: never; }) | undefined;
        status_unfollow?: ({
            user_ids?: string[] | undefined;
        } & {
            user_ids?: (string[] & string[] & { [K_39 in Exclude<keyof I["status_unfollow"]["user_ids"], keyof string[]>]: never; }) | undefined;
        } & { [K_40 in Exclude<keyof I["status_unfollow"], "user_ids">]: never; }) | undefined;
        status_update?: ({
            status?: string | undefined;
        } & {
            status?: string | undefined;
        } & { [K_41 in Exclude<keyof I["status_update"], "status">]: never; }) | undefined;
        stream_data?: ({
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            sender?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } & {
            stream?: ({
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & { [K_42 in Exclude<keyof I["stream_data"]["stream"], keyof Stream>]: never; }) | undefined;
            sender?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_43 in Exclude<keyof I["stream_data"]["sender"], keyof UserPresence>]: never; }) | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } & { [K_44 in Exclude<keyof I["stream_data"], keyof StreamData>]: never; }) | undefined;
        stream_presence_event?: ({
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            stream?: ({
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & { [K_45 in Exclude<keyof I["stream_presence_event"]["stream"], keyof Stream>]: never; }) | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_46 in Exclude<keyof I["stream_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_47 in Exclude<keyof I["stream_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_48 in Exclude<keyof I["stream_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_49 in Exclude<keyof I["stream_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_50 in Exclude<keyof I["stream_presence_event"], keyof StreamPresenceEvent>]: never; }) | undefined;
        ping?: ({} & {} & { [K_51 in Exclude<keyof I["ping"], never>]: never; }) | undefined;
        pong?: ({} & {} & { [K_52 in Exclude<keyof I["pong"], never>]: never; }) | undefined;
        party?: ({
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            leader?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_53 in Exclude<keyof I["party"]["self"], keyof UserPresence>]: never; }) | undefined;
            leader?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_54 in Exclude<keyof I["party"]["leader"], keyof UserPresence>]: never; }) | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_55 in Exclude<keyof I["party"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_56 in Exclude<keyof I["party"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_57 in Exclude<keyof I["party"], keyof Party>]: never; }) | undefined;
        party_create?: ({
            open?: boolean | undefined;
            max_size?: number | undefined;
        } & {
            open?: boolean | undefined;
            max_size?: number | undefined;
        } & { [K_58 in Exclude<keyof I["party_create"], keyof PartyCreate>]: never; }) | undefined;
        party_join?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_59 in Exclude<keyof I["party_join"], "party_id">]: never; }) | undefined;
        party_leave?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_60 in Exclude<keyof I["party_leave"], "party_id">]: never; }) | undefined;
        party_promote?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_61 in Exclude<keyof I["party_promote"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_62 in Exclude<keyof I["party_promote"], keyof PartyPromote>]: never; }) | undefined;
        party_leader?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_63 in Exclude<keyof I["party_leader"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_64 in Exclude<keyof I["party_leader"], keyof PartyLeader>]: never; }) | undefined;
        party_accept?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_65 in Exclude<keyof I["party_accept"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_66 in Exclude<keyof I["party_accept"], keyof PartyAccept>]: never; }) | undefined;
        party_remove?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_67 in Exclude<keyof I["party_remove"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_68 in Exclude<keyof I["party_remove"], keyof PartyRemove>]: never; }) | undefined;
        party_close?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_69 in Exclude<keyof I["party_close"], "party_id">]: never; }) | undefined;
        party_join_request_list?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_70 in Exclude<keyof I["party_join_request_list"], "party_id">]: never; }) | undefined;
        party_join_request?: ({
            party_id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_71 in Exclude<keyof I["party_join_request"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_72 in Exclude<keyof I["party_join_request"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_73 in Exclude<keyof I["party_join_request"], keyof PartyJoinRequest>]: never; }) | undefined;
        party_data?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_74 in Exclude<keyof I["party_data"]["presence"], keyof UserPresence>]: never; }) | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & { [K_75 in Exclude<keyof I["party_data"], keyof PartyData>]: never; }) | undefined;
        party_data_send?: ({
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & {
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & { [K_76 in Exclude<keyof I["party_data_send"], keyof PartyDataSend>]: never; }) | undefined;
        party_presence_event?: ({
            party_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_77 in Exclude<keyof I["party_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_78 in Exclude<keyof I["party_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_79 in Exclude<keyof I["party_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_80 in Exclude<keyof I["party_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_81 in Exclude<keyof I["party_presence_event"], keyof PartyPresenceEvent>]: never; }) | undefined;
        message_typing_event?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } & { [K_82 in Exclude<keyof I["message_typing_event"], keyof MessageTypingEvent>]: never; }) | undefined;
        last_seen_message_event?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } & { [K_83 in Exclude<keyof I["last_seen_message_event"], keyof LastSeenMessageEvent>]: never; }) | undefined;
        message_reaction_event?: ({
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } & {
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } & { [K_84 in Exclude<keyof I["message_reaction_event"], keyof MessageReactionEvent>]: never; }) | undefined;
        voice_joined_event?: ({
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } & {
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } & { [K_85 in Exclude<keyof I["voice_joined_event"], keyof VoiceJoinedEvent>]: never; }) | undefined;
        voice_leaved_event?: ({
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } & {
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } & { [K_86 in Exclude<keyof I["voice_leaved_event"], keyof VoiceLeavedEvent>]: never; }) | undefined;
        channel_created_event?: ({
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } & {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } & { [K_87 in Exclude<keyof I["channel_created_event"], keyof ChannelCreatedEvent>]: never; }) | undefined;
        channel_deleted_event?: ({
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } & {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } & { [K_88 in Exclude<keyof I["channel_deleted_event"], keyof ChannelDeletedEvent>]: never; }) | undefined;
    } & { [K_89 in Exclude<keyof I, keyof Envelope>]: never; }>(base?: I | undefined): Envelope;
    fromPartial<I_1 extends {
        cid?: string | undefined;
        channel?: {
            id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } | undefined;
        channel_join?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_leave?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_message?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } | undefined;
        channel_message_ack?: {
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } | undefined;
        channel_message_send?: {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: {
                user_id?: string | undefined;
                username?: string | undefined;
            }[] | undefined;
            attachments?: {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] | undefined;
            references?: {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } | undefined;
        channel_message_update?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_message_remove?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        channel_presence_event?: {
            channel_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        error?: {
            code?: number | undefined;
            message?: string | undefined;
            context?: {
                [x: string]: string | undefined;
            } | undefined;
        } | undefined;
        notifications?: {
            notifications?: {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] | undefined;
        } | undefined;
        rpc?: {
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } | undefined;
        status?: {
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        status_follow?: {
            user_ids?: string[] | undefined;
            usernames?: string[] | undefined;
        } | undefined;
        status_presence_event?: {
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        status_unfollow?: {
            user_ids?: string[] | undefined;
        } | undefined;
        status_update?: {
            status?: string | undefined;
        } | undefined;
        stream_data?: {
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            sender?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } | undefined;
        stream_presence_event?: {
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        ping?: {} | undefined;
        pong?: {} | undefined;
        party?: {
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            leader?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        party_create?: {
            open?: boolean | undefined;
            max_size?: number | undefined;
        } | undefined;
        party_join?: {
            party_id?: string | undefined;
        } | undefined;
        party_leave?: {
            party_id?: string | undefined;
        } | undefined;
        party_promote?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_leader?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_accept?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_remove?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } | undefined;
        party_close?: {
            party_id?: string | undefined;
        } | undefined;
        party_join_request_list?: {
            party_id?: string | undefined;
        } | undefined;
        party_join_request?: {
            party_id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        party_data?: {
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } | undefined;
        party_data_send?: {
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } | undefined;
        party_presence_event?: {
            party_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } | undefined;
        message_typing_event?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } | undefined;
        last_seen_message_event?: {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } | undefined;
        message_reaction_event?: {
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } | undefined;
        voice_joined_event?: {
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } | undefined;
        voice_leaved_event?: {
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } | undefined;
        channel_created_event?: {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } | undefined;
        channel_deleted_event?: {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        channel?: ({
            id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            id?: string | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_90 in Exclude<keyof I_1["channel"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_91 in Exclude<keyof I_1["channel"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            self?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_92 in Exclude<keyof I_1["channel"]["self"], keyof UserPresence>]: never; }) | undefined;
            chanel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K_93 in Exclude<keyof I_1["channel"], keyof Channel>]: never; }) | undefined;
        channel_join?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            type?: number | undefined;
            persistence?: boolean | undefined;
            hidden?: boolean | undefined;
            mode?: number | undefined;
        } & { [K_94 in Exclude<keyof I_1["channel_join"], keyof ChannelJoin>]: never; }) | undefined;
        channel_leave?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            mode?: number | undefined;
        } & { [K_95 in Exclude<keyof I_1["channel_leave"], keyof ChannelLeave>]: never; }) | undefined;
        channel_message?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            username?: string | undefined;
            avatar?: string | undefined;
            content?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            reactions?: string | undefined;
            mentions?: string | undefined;
            attachments?: string | undefined;
            references?: string | undefined;
            referenced_message?: string | undefined;
        } & { [K_96 in Exclude<keyof I_1["channel_message"], keyof ChannelMessage>]: never; }) | undefined;
        channel_message_ack?: ({
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & {
            channel_id?: string | undefined;
            message_id?: string | undefined;
            code?: number | undefined;
            username?: string | undefined;
            create_time?: Date | undefined;
            update_time?: Date | undefined;
            persistent?: boolean | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
        } & { [K_97 in Exclude<keyof I_1["channel_message_ack"], keyof ChannelMessageAck>]: never; }) | undefined;
        channel_message_send?: ({
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: {
                user_id?: string | undefined;
                username?: string | undefined;
            }[] | undefined;
            attachments?: {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] | undefined;
            references?: {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } & {
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            content?: string | undefined;
            mentions?: ({
                user_id?: string | undefined;
                username?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                username?: string | undefined;
            } & {
                user_id?: string | undefined;
                username?: string | undefined;
            } & { [K_98 in Exclude<keyof I_1["channel_message_send"]["mentions"][number], keyof MessageMention>]: never; })[] & { [K_99 in Exclude<keyof I_1["channel_message_send"]["mentions"], keyof {
                user_id?: string | undefined;
                username?: string | undefined;
            }[]>]: never; }) | undefined;
            attachments?: ({
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[] & ({
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & { [K_100 in Exclude<keyof I_1["channel_message_send"]["attachments"][number], keyof MessageAttachment>]: never; })[] & { [K_101 in Exclude<keyof I_1["channel_message_send"]["attachments"], keyof {
                filename?: string | undefined;
                size?: number | undefined;
                url?: string | undefined;
                filetype?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }[]>]: never; }) | undefined;
            references?: ({
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[] & ({
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            } & {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            } & { [K_102 in Exclude<keyof I_1["channel_message_send"]["references"][number], keyof MessageRef>]: never; })[] & { [K_103 in Exclude<keyof I_1["channel_message_send"]["references"], keyof {
                message_id?: string | undefined;
                message_ref_id?: string | undefined;
                message_sender_id?: string | undefined;
                content?: string | undefined;
                has_attachment?: boolean | undefined;
                ref_type?: number | undefined;
            }[]>]: never; }) | undefined;
            mode?: number | undefined;
            anonymous_message?: boolean | undefined;
        } & { [K_104 in Exclude<keyof I_1["channel_message_send"], keyof ChannelMessageSend>]: never; }) | undefined;
        channel_message_update?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            content?: string | undefined;
            mode?: number | undefined;
        } & { [K_105 in Exclude<keyof I_1["channel_message_update"], keyof ChannelMessageUpdate>]: never; }) | undefined;
        channel_message_remove?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
        } & { [K_106 in Exclude<keyof I_1["channel_message_remove"], keyof ChannelMessageRemove>]: never; }) | undefined;
        channel_presence_event?: ({
            channel_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_107 in Exclude<keyof I_1["channel_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_108 in Exclude<keyof I_1["channel_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_109 in Exclude<keyof I_1["channel_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_110 in Exclude<keyof I_1["channel_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            channel_label?: string | undefined;
            user_id_one?: string | undefined;
            user_id_two?: string | undefined;
            mode?: number | undefined;
        } & { [K_111 in Exclude<keyof I_1["channel_presence_event"], keyof ChannelPresenceEvent>]: never; }) | undefined;
        error?: ({
            code?: number | undefined;
            message?: string | undefined;
            context?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            code?: number | undefined;
            message?: string | undefined;
            context?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_112 in Exclude<keyof I_1["error"]["context"], string | number>]: never; }) | undefined;
        } & { [K_113 in Exclude<keyof I_1["error"], keyof Error>]: never; }) | undefined;
        notifications?: ({
            notifications?: {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] | undefined;
        } & {
            notifications?: ({
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[] & ({
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            } & {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            } & { [K_114 in Exclude<keyof I_1["notifications"]["notifications"][number], keyof Notification>]: never; })[] & { [K_115 in Exclude<keyof I_1["notifications"]["notifications"], keyof {
                id?: string | undefined;
                subject?: string | undefined;
                content?: string | undefined;
                code?: number | undefined;
                sender_id?: string | undefined;
                create_time?: Date | undefined;
                persistent?: boolean | undefined;
                clan_id?: string | undefined;
                channel_id?: string | undefined;
                channel_mode?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_116 in Exclude<keyof I_1["notifications"], "notifications">]: never; }) | undefined;
        rpc?: ({
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } & {
            id?: string | undefined;
            payload?: string | undefined;
            http_key?: string | undefined;
        } & { [K_117 in Exclude<keyof I_1["rpc"], keyof Rpc>]: never; }) | undefined;
        status?: ({
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_118 in Exclude<keyof I_1["status"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_119 in Exclude<keyof I_1["status"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_120 in Exclude<keyof I_1["status"], "presences">]: never; }) | undefined;
        status_follow?: ({
            user_ids?: string[] | undefined;
            usernames?: string[] | undefined;
        } & {
            user_ids?: (string[] & string[] & { [K_121 in Exclude<keyof I_1["status_follow"]["user_ids"], keyof string[]>]: never; }) | undefined;
            usernames?: (string[] & string[] & { [K_122 in Exclude<keyof I_1["status_follow"]["usernames"], keyof string[]>]: never; }) | undefined;
        } & { [K_123 in Exclude<keyof I_1["status_follow"], keyof StatusFollow>]: never; }) | undefined;
        status_presence_event?: ({
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_124 in Exclude<keyof I_1["status_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_125 in Exclude<keyof I_1["status_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_126 in Exclude<keyof I_1["status_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_127 in Exclude<keyof I_1["status_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_128 in Exclude<keyof I_1["status_presence_event"], keyof StatusPresenceEvent>]: never; }) | undefined;
        status_unfollow?: ({
            user_ids?: string[] | undefined;
        } & {
            user_ids?: (string[] & string[] & { [K_129 in Exclude<keyof I_1["status_unfollow"]["user_ids"], keyof string[]>]: never; }) | undefined;
        } & { [K_130 in Exclude<keyof I_1["status_unfollow"], "user_ids">]: never; }) | undefined;
        status_update?: ({
            status?: string | undefined;
        } & {
            status?: string | undefined;
        } & { [K_131 in Exclude<keyof I_1["status_update"], "status">]: never; }) | undefined;
        stream_data?: ({
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            sender?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } & {
            stream?: ({
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & { [K_132 in Exclude<keyof I_1["stream_data"]["stream"], keyof Stream>]: never; }) | undefined;
            sender?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_133 in Exclude<keyof I_1["stream_data"]["sender"], keyof UserPresence>]: never; }) | undefined;
            data?: string | undefined;
            reliable?: boolean | undefined;
        } & { [K_134 in Exclude<keyof I_1["stream_data"], keyof StreamData>]: never; }) | undefined;
        stream_presence_event?: ({
            stream?: {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            stream?: ({
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & {
                mode?: number | undefined;
                subject?: string | undefined;
                subcontext?: string | undefined;
                label?: string | undefined;
            } & { [K_135 in Exclude<keyof I_1["stream_presence_event"]["stream"], keyof Stream>]: never; }) | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_136 in Exclude<keyof I_1["stream_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_137 in Exclude<keyof I_1["stream_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_138 in Exclude<keyof I_1["stream_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_139 in Exclude<keyof I_1["stream_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_140 in Exclude<keyof I_1["stream_presence_event"], keyof StreamPresenceEvent>]: never; }) | undefined;
        ping?: ({} & {} & { [K_141 in Exclude<keyof I_1["ping"], never>]: never; }) | undefined;
        pong?: ({} & {} & { [K_142 in Exclude<keyof I_1["pong"], never>]: never; }) | undefined;
        party?: ({
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            leader?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            open?: boolean | undefined;
            max_size?: number | undefined;
            self?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_143 in Exclude<keyof I_1["party"]["self"], keyof UserPresence>]: never; }) | undefined;
            leader?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_144 in Exclude<keyof I_1["party"]["leader"], keyof UserPresence>]: never; }) | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_145 in Exclude<keyof I_1["party"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_146 in Exclude<keyof I_1["party"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_147 in Exclude<keyof I_1["party"], keyof Party>]: never; }) | undefined;
        party_create?: ({
            open?: boolean | undefined;
            max_size?: number | undefined;
        } & {
            open?: boolean | undefined;
            max_size?: number | undefined;
        } & { [K_148 in Exclude<keyof I_1["party_create"], keyof PartyCreate>]: never; }) | undefined;
        party_join?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_149 in Exclude<keyof I_1["party_join"], "party_id">]: never; }) | undefined;
        party_leave?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_150 in Exclude<keyof I_1["party_leave"], "party_id">]: never; }) | undefined;
        party_promote?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_151 in Exclude<keyof I_1["party_promote"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_152 in Exclude<keyof I_1["party_promote"], keyof PartyPromote>]: never; }) | undefined;
        party_leader?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_153 in Exclude<keyof I_1["party_leader"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_154 in Exclude<keyof I_1["party_leader"], keyof PartyLeader>]: never; }) | undefined;
        party_accept?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_155 in Exclude<keyof I_1["party_accept"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_156 in Exclude<keyof I_1["party_accept"], keyof PartyAccept>]: never; }) | undefined;
        party_remove?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_157 in Exclude<keyof I_1["party_remove"]["presence"], keyof UserPresence>]: never; }) | undefined;
        } & { [K_158 in Exclude<keyof I_1["party_remove"], keyof PartyRemove>]: never; }) | undefined;
        party_close?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_159 in Exclude<keyof I_1["party_close"], "party_id">]: never; }) | undefined;
        party_join_request_list?: ({
            party_id?: string | undefined;
        } & {
            party_id?: string | undefined;
        } & { [K_160 in Exclude<keyof I_1["party_join_request_list"], "party_id">]: never; }) | undefined;
        party_join_request?: ({
            party_id?: string | undefined;
            presences?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            presences?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_161 in Exclude<keyof I_1["party_join_request"]["presences"][number], keyof UserPresence>]: never; })[] & { [K_162 in Exclude<keyof I_1["party_join_request"]["presences"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_163 in Exclude<keyof I_1["party_join_request"], keyof PartyJoinRequest>]: never; }) | undefined;
        party_data?: ({
            party_id?: string | undefined;
            presence?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & {
            party_id?: string | undefined;
            presence?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_164 in Exclude<keyof I_1["party_data"]["presence"], keyof UserPresence>]: never; }) | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & { [K_165 in Exclude<keyof I_1["party_data"], keyof PartyData>]: never; }) | undefined;
        party_data_send?: ({
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & {
            party_id?: string | undefined;
            op_code?: number | undefined;
            data?: Uint8Array | undefined;
        } & { [K_166 in Exclude<keyof I_1["party_data_send"], keyof PartyDataSend>]: never; }) | undefined;
        party_presence_event?: ({
            party_id?: string | undefined;
            joins?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
            leaves?: {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] | undefined;
        } & {
            party_id?: string | undefined;
            joins?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_167 in Exclude<keyof I_1["party_presence_event"]["joins"][number], keyof UserPresence>]: never; })[] & { [K_168 in Exclude<keyof I_1["party_presence_event"]["joins"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
            leaves?: ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[] & ({
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            } & { [K_169 in Exclude<keyof I_1["party_presence_event"]["leaves"][number], keyof UserPresence>]: never; })[] & { [K_170 in Exclude<keyof I_1["party_presence_event"]["leaves"], keyof {
                user_id?: string | undefined;
                session_id?: string | undefined;
                username?: string | undefined;
                persistence?: boolean | undefined;
                status?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_171 in Exclude<keyof I_1["party_presence_event"], keyof PartyPresenceEvent>]: never; }) | undefined;
        message_typing_event?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            sender_id?: string | undefined;
            mode?: number | undefined;
        } & { [K_172 in Exclude<keyof I_1["message_typing_event"], keyof MessageTypingEvent>]: never; }) | undefined;
        last_seen_message_event?: ({
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } & {
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            mode?: number | undefined;
            timestamp?: string | undefined;
        } & { [K_173 in Exclude<keyof I_1["last_seen_message_event"], keyof LastSeenMessageEvent>]: never; }) | undefined;
        message_reaction_event?: ({
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } & {
            id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            message_id?: string | undefined;
            sender_id?: string | undefined;
            sender_name?: string | undefined;
            sender_avatar?: string | undefined;
            emoji?: string | undefined;
            action?: boolean | undefined;
            message_sender_id?: string | undefined;
            count?: number | undefined;
            mode?: number | undefined;
        } & { [K_174 in Exclude<keyof I_1["message_reaction_event"], keyof MessageReactionEvent>]: never; }) | undefined;
        voice_joined_event?: ({
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } & {
            clan_id?: string | undefined;
            clan_name?: string | undefined;
            id?: string | undefined;
            participant?: string | undefined;
            user_id?: string | undefined;
            voice_channel_label?: string | undefined;
            voice_channel_id?: string | undefined;
            last_screenshot?: string | undefined;
        } & { [K_175 in Exclude<keyof I_1["voice_joined_event"], keyof VoiceJoinedEvent>]: never; }) | undefined;
        voice_leaved_event?: ({
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } & {
            id?: string | undefined;
            clan_id?: string | undefined;
            voice_channel_id?: string | undefined;
            voice_user_id?: string | undefined;
        } & { [K_176 in Exclude<keyof I_1["voice_leaved_event"], keyof VoiceLeavedEvent>]: never; }) | undefined;
        channel_created_event?: ({
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } & {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            creator_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            channel_label?: string | undefined;
            channel_type?: number | undefined;
        } & { [K_177 in Exclude<keyof I_1["channel_created_event"], keyof ChannelCreatedEvent>]: never; }) | undefined;
        channel_deleted_event?: ({
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } & {
            clan_id?: string | undefined;
            category_id?: string | undefined;
            parrent_id?: string | undefined;
            channel_id?: string | undefined;
            deletor?: string | undefined;
        } & { [K_178 in Exclude<keyof I_1["channel_deleted_event"], keyof ChannelDeletedEvent>]: never; }) | undefined;
    } & { [K_179 in Exclude<keyof I_1, keyof Envelope>]: never; }>(object: I_1): Envelope;
};
export declare const Channel: {
    encode(message: Channel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Channel;
    fromJSON(object: any): Channel;
    toJSON(message: Channel): unknown;
    create<I extends {
        id?: string | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        self?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        chanel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        id?: string | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presences"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        self?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I["self"], keyof UserPresence>]: never; }) | undefined;
        chanel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof Channel>]: never; }>(base?: I | undefined): Channel;
    fromPartial<I_1 extends {
        id?: string | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        self?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        chanel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        id?: string | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["presences"][number], keyof UserPresence>]: never; })[] & { [K_5 in Exclude<keyof I_1["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        self?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["self"], keyof UserPresence>]: never; }) | undefined;
        chanel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof Channel>]: never; }>(object: I_1): Channel;
};
export declare const ChannelJoin: {
    encode(message: ChannelJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelJoin;
    fromJSON(object: any): ChannelJoin;
    toJSON(message: ChannelJoin): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        type?: number | undefined;
        persistence?: boolean | undefined;
        hidden?: boolean | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        type?: number | undefined;
        persistence?: boolean | undefined;
        hidden?: boolean | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelJoin>]: never; }>(base?: I | undefined): ChannelJoin;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        type?: number | undefined;
        persistence?: boolean | undefined;
        hidden?: boolean | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        type?: number | undefined;
        persistence?: boolean | undefined;
        hidden?: boolean | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelJoin>]: never; }>(object: I_1): ChannelJoin;
};
export declare const ChannelLeave: {
    encode(message: ChannelLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelLeave;
    fromJSON(object: any): ChannelLeave;
    toJSON(message: ChannelLeave): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelLeave>]: never; }>(base?: I | undefined): ChannelLeave;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelLeave>]: never; }>(object: I_1): ChannelLeave;
};
export declare const ChannelMessageAck: {
    encode(message: ChannelMessageAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageAck;
    fromJSON(object: any): ChannelMessageAck;
    toJSON(message: ChannelMessageAck): unknown;
    create<I extends {
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelMessageAck>]: never; }>(base?: I | undefined): ChannelMessageAck;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & {
        channel_id?: string | undefined;
        message_id?: string | undefined;
        code?: number | undefined;
        username?: string | undefined;
        create_time?: Date | undefined;
        update_time?: Date | undefined;
        persistent?: boolean | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelMessageAck>]: never; }>(object: I_1): ChannelMessageAck;
};
export declare const MessageMention: {
    encode(message: MessageMention, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageMention;
    fromJSON(object: any): MessageMention;
    toJSON(message: MessageMention): unknown;
    create<I extends {
        user_id?: string | undefined;
        username?: string | undefined;
    } & {
        user_id?: string | undefined;
        username?: string | undefined;
    } & { [K in Exclude<keyof I, keyof MessageMention>]: never; }>(base?: I | undefined): MessageMention;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        username?: string | undefined;
    } & {
        user_id?: string | undefined;
        username?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageMention>]: never; }>(object: I_1): MessageMention;
};
export declare const MessageAttachment: {
    encode(message: MessageAttachment, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachment;
    fromJSON(object: any): MessageAttachment;
    toJSON(message: MessageAttachment): unknown;
    create<I extends {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageAttachment>]: never; }>(base?: I | undefined): MessageAttachment;
    fromPartial<I_1 extends {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageAttachment>]: never; }>(object: I_1): MessageAttachment;
};
export declare const MessageRef: {
    encode(message: MessageRef, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageRef;
    fromJSON(object: any): MessageRef;
    toJSON(message: MessageRef): unknown;
    create<I extends {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        message_sender_id?: string | undefined;
        content?: string | undefined;
        has_attachment?: boolean | undefined;
        ref_type?: number | undefined;
    } & {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        message_sender_id?: string | undefined;
        content?: string | undefined;
        has_attachment?: boolean | undefined;
        ref_type?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageRef>]: never; }>(base?: I | undefined): MessageRef;
    fromPartial<I_1 extends {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        message_sender_id?: string | undefined;
        content?: string | undefined;
        has_attachment?: boolean | undefined;
        ref_type?: number | undefined;
    } & {
        message_id?: string | undefined;
        message_ref_id?: string | undefined;
        message_sender_id?: string | undefined;
        content?: string | undefined;
        has_attachment?: boolean | undefined;
        ref_type?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageRef>]: never; }>(object: I_1): MessageRef;
};
export declare const ChannelMessageSend: {
    encode(message: ChannelMessageSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageSend;
    fromJSON(object: any): ChannelMessageSend;
    toJSON(message: ChannelMessageSend): unknown;
    create<I extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        content?: string | undefined;
        mentions?: {
            user_id?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        attachments?: {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[] | undefined;
        references?: {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[] | undefined;
        mode?: number | undefined;
        anonymous_message?: boolean | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        content?: string | undefined;
        mentions?: ({
            user_id?: string | undefined;
            username?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            username?: string | undefined;
        } & {
            user_id?: string | undefined;
            username?: string | undefined;
        } & { [K in Exclude<keyof I["mentions"][number], keyof MessageMention>]: never; })[] & { [K_1 in Exclude<keyof I["mentions"], keyof {
            user_id?: string | undefined;
            username?: string | undefined;
        }[]>]: never; }) | undefined;
        attachments?: ({
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[] & ({
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & { [K_2 in Exclude<keyof I["attachments"][number], keyof MessageAttachment>]: never; })[] & { [K_3 in Exclude<keyof I["attachments"], keyof {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[]>]: never; }) | undefined;
        references?: ({
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[] & ({
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        } & {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        } & { [K_4 in Exclude<keyof I["references"][number], keyof MessageRef>]: never; })[] & { [K_5 in Exclude<keyof I["references"], keyof {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[]>]: never; }) | undefined;
        mode?: number | undefined;
        anonymous_message?: boolean | undefined;
    } & { [K_6 in Exclude<keyof I, keyof ChannelMessageSend>]: never; }>(base?: I | undefined): ChannelMessageSend;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        content?: string | undefined;
        mentions?: {
            user_id?: string | undefined;
            username?: string | undefined;
        }[] | undefined;
        attachments?: {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[] | undefined;
        references?: {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[] | undefined;
        mode?: number | undefined;
        anonymous_message?: boolean | undefined;
    } & {
        clan_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        content?: string | undefined;
        mentions?: ({
            user_id?: string | undefined;
            username?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            username?: string | undefined;
        } & {
            user_id?: string | undefined;
            username?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["mentions"][number], keyof MessageMention>]: never; })[] & { [K_8 in Exclude<keyof I_1["mentions"], keyof {
            user_id?: string | undefined;
            username?: string | undefined;
        }[]>]: never; }) | undefined;
        attachments?: ({
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[] & ({
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & { [K_9 in Exclude<keyof I_1["attachments"][number], keyof MessageAttachment>]: never; })[] & { [K_10 in Exclude<keyof I_1["attachments"], keyof {
            filename?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            filetype?: string | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }[]>]: never; }) | undefined;
        references?: ({
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[] & ({
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        } & {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        } & { [K_11 in Exclude<keyof I_1["references"][number], keyof MessageRef>]: never; })[] & { [K_12 in Exclude<keyof I_1["references"], keyof {
            message_id?: string | undefined;
            message_ref_id?: string | undefined;
            message_sender_id?: string | undefined;
            content?: string | undefined;
            has_attachment?: boolean | undefined;
            ref_type?: number | undefined;
        }[]>]: never; }) | undefined;
        mode?: number | undefined;
        anonymous_message?: boolean | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof ChannelMessageSend>]: never; }>(object: I_1): ChannelMessageSend;
};
export declare const ChannelMessageUpdate: {
    encode(message: ChannelMessageUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageUpdate;
    fromJSON(object: any): ChannelMessageUpdate;
    toJSON(message: ChannelMessageUpdate): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        content?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        content?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelMessageUpdate>]: never; }>(base?: I | undefined): ChannelMessageUpdate;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        content?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        content?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelMessageUpdate>]: never; }>(object: I_1): ChannelMessageUpdate;
};
export declare const ChannelMessageRemove: {
    encode(message: ChannelMessageRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelMessageRemove;
    fromJSON(object: any): ChannelMessageRemove;
    toJSON(message: ChannelMessageRemove): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelMessageRemove>]: never; }>(base?: I | undefined): ChannelMessageRemove;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelMessageRemove>]: never; }>(object: I_1): ChannelMessageRemove;
};
export declare const ChannelPresenceEvent: {
    encode(message: ChannelPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelPresenceEvent;
    fromJSON(object: any): ChannelPresenceEvent;
    toJSON(message: ChannelPresenceEvent): unknown;
    create<I extends {
        channel_id?: string | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["joins"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I["leaves"][number], keyof UserPresence>]: never; })[] & { [K_3 in Exclude<keyof I["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        mode?: number | undefined;
    } & { [K_4 in Exclude<keyof I, keyof ChannelPresenceEvent>]: never; }>(base?: I | undefined): ChannelPresenceEvent;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["joins"][number], keyof UserPresence>]: never; })[] & { [K_6 in Exclude<keyof I_1["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["leaves"][number], keyof UserPresence>]: never; })[] & { [K_8 in Exclude<keyof I_1["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        channel_label?: string | undefined;
        user_id_one?: string | undefined;
        user_id_two?: string | undefined;
        mode?: number | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof ChannelPresenceEvent>]: never; }>(object: I_1): ChannelPresenceEvent;
};
export declare const Error: {
    encode(message: Error, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Error;
    fromJSON(object: any): Error;
    toJSON(message: Error): unknown;
    create<I extends {
        code?: number | undefined;
        message?: string | undefined;
        context?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        code?: number | undefined;
        message?: string | undefined;
        context?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["context"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Error>]: never; }>(base?: I | undefined): Error;
    fromPartial<I_1 extends {
        code?: number | undefined;
        message?: string | undefined;
        context?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        code?: number | undefined;
        message?: string | undefined;
        context?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["context"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Error>]: never; }>(object: I_1): Error;
};
export declare const Error_ContextEntry: {
    encode(message: Error_ContextEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Error_ContextEntry;
    fromJSON(object: any): Error_ContextEntry;
    toJSON(message: Error_ContextEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Error_ContextEntry>]: never; }>(base?: I | undefined): Error_ContextEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Error_ContextEntry>]: never; }>(object: I_1): Error_ContextEntry;
};
export declare const Notifications: {
    encode(message: Notifications, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Notifications;
    fromJSON(object: any): Notifications;
    toJSON(message: Notifications): unknown;
    create<I extends {
        notifications?: {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[] | undefined;
    } & {
        notifications?: ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[] & ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        } & {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        } & { [K in Exclude<keyof I["notifications"][number], keyof Notification>]: never; })[] & { [K_1 in Exclude<keyof I["notifications"], keyof {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "notifications">]: never; }>(base?: I | undefined): Notifications;
    fromPartial<I_1 extends {
        notifications?: {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[] | undefined;
    } & {
        notifications?: ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[] & ({
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        } & {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["notifications"][number], keyof Notification>]: never; })[] & { [K_4 in Exclude<keyof I_1["notifications"], keyof {
            id?: string | undefined;
            subject?: string | undefined;
            content?: string | undefined;
            code?: number | undefined;
            sender_id?: string | undefined;
            create_time?: Date | undefined;
            persistent?: boolean | undefined;
            clan_id?: string | undefined;
            channel_id?: string | undefined;
            channel_mode?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "notifications">]: never; }>(object: I_1): Notifications;
};
export declare const Party: {
    encode(message: Party, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Party;
    fromJSON(object: any): Party;
    toJSON(message: Party): unknown;
    create<I extends {
        party_id?: string | undefined;
        open?: boolean | undefined;
        max_size?: number | undefined;
        self?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        leader?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        open?: boolean | undefined;
        max_size?: number | undefined;
        self?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["self"], keyof UserPresence>]: never; }) | undefined;
        leader?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_1 in Exclude<keyof I["leader"], keyof UserPresence>]: never; }) | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I["presences"][number], keyof UserPresence>]: never; })[] & { [K_3 in Exclude<keyof I["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof Party>]: never; }>(base?: I | undefined): Party;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        open?: boolean | undefined;
        max_size?: number | undefined;
        self?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        leader?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        open?: boolean | undefined;
        max_size?: number | undefined;
        self?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["self"], keyof UserPresence>]: never; }) | undefined;
        leader?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["leader"], keyof UserPresence>]: never; }) | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["presences"][number], keyof UserPresence>]: never; })[] & { [K_8 in Exclude<keyof I_1["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof Party>]: never; }>(object: I_1): Party;
};
export declare const PartyCreate: {
    encode(message: PartyCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyCreate;
    fromJSON(object: any): PartyCreate;
    toJSON(message: PartyCreate): unknown;
    create<I extends {
        open?: boolean | undefined;
        max_size?: number | undefined;
    } & {
        open?: boolean | undefined;
        max_size?: number | undefined;
    } & { [K in Exclude<keyof I, keyof PartyCreate>]: never; }>(base?: I | undefined): PartyCreate;
    fromPartial<I_1 extends {
        open?: boolean | undefined;
        max_size?: number | undefined;
    } & {
        open?: boolean | undefined;
        max_size?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyCreate>]: never; }>(object: I_1): PartyCreate;
};
export declare const PartyJoin: {
    encode(message: PartyJoin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoin;
    fromJSON(object: any): PartyJoin;
    toJSON(message: PartyJoin): unknown;
    create<I extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K in Exclude<keyof I, "party_id">]: never; }>(base?: I | undefined): PartyJoin;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "party_id">]: never; }>(object: I_1): PartyJoin;
};
export declare const PartyLeave: {
    encode(message: PartyLeave, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeave;
    fromJSON(object: any): PartyLeave;
    toJSON(message: PartyLeave): unknown;
    create<I extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K in Exclude<keyof I, "party_id">]: never; }>(base?: I | undefined): PartyLeave;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "party_id">]: never; }>(object: I_1): PartyLeave;
};
export declare const PartyPromote: {
    encode(message: PartyPromote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyPromote;
    fromJSON(object: any): PartyPromote;
    toJSON(message: PartyPromote): unknown;
    create<I extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PartyPromote>]: never; }>(base?: I | undefined): PartyPromote;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PartyPromote>]: never; }>(object: I_1): PartyPromote;
};
export declare const PartyLeader: {
    encode(message: PartyLeader, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyLeader;
    fromJSON(object: any): PartyLeader;
    toJSON(message: PartyLeader): unknown;
    create<I extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PartyLeader>]: never; }>(base?: I | undefined): PartyLeader;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PartyLeader>]: never; }>(object: I_1): PartyLeader;
};
export declare const PartyAccept: {
    encode(message: PartyAccept, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyAccept;
    fromJSON(object: any): PartyAccept;
    toJSON(message: PartyAccept): unknown;
    create<I extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PartyAccept>]: never; }>(base?: I | undefined): PartyAccept;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PartyAccept>]: never; }>(object: I_1): PartyAccept;
};
export declare const PartyRemove: {
    encode(message: PartyRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyRemove;
    fromJSON(object: any): PartyRemove;
    toJSON(message: PartyRemove): unknown;
    create<I extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PartyRemove>]: never; }>(base?: I | undefined): PartyRemove;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["presence"], keyof UserPresence>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PartyRemove>]: never; }>(object: I_1): PartyRemove;
};
export declare const PartyClose: {
    encode(message: PartyClose, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyClose;
    fromJSON(object: any): PartyClose;
    toJSON(message: PartyClose): unknown;
    create<I extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K in Exclude<keyof I, "party_id">]: never; }>(base?: I | undefined): PartyClose;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "party_id">]: never; }>(object: I_1): PartyClose;
};
export declare const PartyJoinRequestList: {
    encode(message: PartyJoinRequestList, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequestList;
    fromJSON(object: any): PartyJoinRequestList;
    toJSON(message: PartyJoinRequestList): unknown;
    create<I extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K in Exclude<keyof I, "party_id">]: never; }>(base?: I | undefined): PartyJoinRequestList;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
    } & {
        party_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "party_id">]: never; }>(object: I_1): PartyJoinRequestList;
};
export declare const PartyJoinRequest: {
    encode(message: PartyJoinRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyJoinRequest;
    fromJSON(object: any): PartyJoinRequest;
    toJSON(message: PartyJoinRequest): unknown;
    create<I extends {
        party_id?: string | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presences"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof PartyJoinRequest>]: never; }>(base?: I | undefined): PartyJoinRequest;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["presences"][number], keyof UserPresence>]: never; })[] & { [K_4 in Exclude<keyof I_1["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof PartyJoinRequest>]: never; }>(object: I_1): PartyJoinRequest;
};
export declare const PartyMatchmakerAdd: {
    encode(message: PartyMatchmakerAdd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd;
    fromJSON(object: any): PartyMatchmakerAdd;
    toJSON(message: PartyMatchmakerAdd): unknown;
    create<I extends {
        party_id?: string | undefined;
        min_count?: number | undefined;
        max_count?: number | undefined;
        query?: string | undefined;
        string_properties?: {
            [x: string]: string | undefined;
        } | undefined;
        numeric_properties?: {
            [x: string]: number | undefined;
        } | undefined;
        count_multiple?: number | undefined;
    } & {
        party_id?: string | undefined;
        min_count?: number | undefined;
        max_count?: number | undefined;
        query?: string | undefined;
        string_properties?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["string_properties"], string | number>]: never; }) | undefined;
        numeric_properties?: ({
            [x: string]: number | undefined;
        } & {
            [x: string]: number | undefined;
        } & { [K_1 in Exclude<keyof I["numeric_properties"], string | number>]: never; }) | undefined;
        count_multiple?: number | undefined;
    } & { [K_2 in Exclude<keyof I, keyof PartyMatchmakerAdd>]: never; }>(base?: I | undefined): PartyMatchmakerAdd;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        min_count?: number | undefined;
        max_count?: number | undefined;
        query?: string | undefined;
        string_properties?: {
            [x: string]: string | undefined;
        } | undefined;
        numeric_properties?: {
            [x: string]: number | undefined;
        } | undefined;
        count_multiple?: number | undefined;
    } & {
        party_id?: string | undefined;
        min_count?: number | undefined;
        max_count?: number | undefined;
        query?: string | undefined;
        string_properties?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["string_properties"], string | number>]: never; }) | undefined;
        numeric_properties?: ({
            [x: string]: number | undefined;
        } & {
            [x: string]: number | undefined;
        } & { [K_4 in Exclude<keyof I_1["numeric_properties"], string | number>]: never; }) | undefined;
        count_multiple?: number | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof PartyMatchmakerAdd>]: never; }>(object: I_1): PartyMatchmakerAdd;
};
export declare const PartyMatchmakerAdd_StringPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_StringPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_StringPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_StringPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_StringPropertiesEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof PartyMatchmakerAdd_StringPropertiesEntry>]: never; }>(base?: I | undefined): PartyMatchmakerAdd_StringPropertiesEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyMatchmakerAdd_StringPropertiesEntry>]: never; }>(object: I_1): PartyMatchmakerAdd_StringPropertiesEntry;
};
export declare const PartyMatchmakerAdd_NumericPropertiesEntry: {
    encode(message: PartyMatchmakerAdd_NumericPropertiesEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerAdd_NumericPropertiesEntry;
    fromJSON(object: any): PartyMatchmakerAdd_NumericPropertiesEntry;
    toJSON(message: PartyMatchmakerAdd_NumericPropertiesEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: number | undefined;
    } & {
        key?: string | undefined;
        value?: number | undefined;
    } & { [K in Exclude<keyof I, keyof PartyMatchmakerAdd_NumericPropertiesEntry>]: never; }>(base?: I | undefined): PartyMatchmakerAdd_NumericPropertiesEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: number | undefined;
    } & {
        key?: string | undefined;
        value?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyMatchmakerAdd_NumericPropertiesEntry>]: never; }>(object: I_1): PartyMatchmakerAdd_NumericPropertiesEntry;
};
export declare const PartyMatchmakerRemove: {
    encode(message: PartyMatchmakerRemove, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerRemove;
    fromJSON(object: any): PartyMatchmakerRemove;
    toJSON(message: PartyMatchmakerRemove): unknown;
    create<I extends {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & { [K in Exclude<keyof I, keyof PartyMatchmakerRemove>]: never; }>(base?: I | undefined): PartyMatchmakerRemove;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyMatchmakerRemove>]: never; }>(object: I_1): PartyMatchmakerRemove;
};
export declare const PartyMatchmakerTicket: {
    encode(message: PartyMatchmakerTicket, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyMatchmakerTicket;
    fromJSON(object: any): PartyMatchmakerTicket;
    toJSON(message: PartyMatchmakerTicket): unknown;
    create<I extends {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & { [K in Exclude<keyof I, keyof PartyMatchmakerTicket>]: never; }>(base?: I | undefined): PartyMatchmakerTicket;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & {
        party_id?: string | undefined;
        ticket?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyMatchmakerTicket>]: never; }>(object: I_1): PartyMatchmakerTicket;
};
export declare const PartyData: {
    encode(message: PartyData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyData;
    fromJSON(object: any): PartyData;
    toJSON(message: PartyData): unknown;
    create<I extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presence"], keyof UserPresence>]: never; }) | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I, keyof PartyData>]: never; }>(base?: I | undefined): PartyData;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        presence?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & {
        party_id?: string | undefined;
        presence?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["presence"], keyof UserPresence>]: never; }) | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof PartyData>]: never; }>(object: I_1): PartyData;
};
export declare const PartyDataSend: {
    encode(message: PartyDataSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyDataSend;
    fromJSON(object: any): PartyDataSend;
    toJSON(message: PartyDataSend): unknown;
    create<I extends {
        party_id?: string | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & {
        party_id?: string | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof PartyDataSend>]: never; }>(base?: I | undefined): PartyDataSend;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & {
        party_id?: string | undefined;
        op_code?: number | undefined;
        data?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartyDataSend>]: never; }>(object: I_1): PartyDataSend;
};
export declare const PartyPresenceEvent: {
    encode(message: PartyPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartyPresenceEvent;
    fromJSON(object: any): PartyPresenceEvent;
    toJSON(message: PartyPresenceEvent): unknown;
    create<I extends {
        party_id?: string | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["joins"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I["leaves"][number], keyof UserPresence>]: never; })[] & { [K_3 in Exclude<keyof I["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof PartyPresenceEvent>]: never; }>(base?: I | undefined): PartyPresenceEvent;
    fromPartial<I_1 extends {
        party_id?: string | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        party_id?: string | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["joins"][number], keyof UserPresence>]: never; })[] & { [K_6 in Exclude<keyof I_1["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["leaves"][number], keyof UserPresence>]: never; })[] & { [K_8 in Exclude<keyof I_1["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof PartyPresenceEvent>]: never; }>(object: I_1): PartyPresenceEvent;
};
export declare const Ping: {
    encode(_: Ping, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Ping;
    fromJSON(_: any): Ping;
    toJSON(_: Ping): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I | undefined): Ping;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): Ping;
};
export declare const Pong: {
    encode(_: Pong, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Pong;
    fromJSON(_: any): Pong;
    toJSON(_: Pong): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I | undefined): Pong;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): Pong;
};
export declare const Status: {
    encode(message: Status, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Status;
    fromJSON(object: any): Status;
    toJSON(message: Status): unknown;
    create<I extends {
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["presences"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "presences">]: never; }>(base?: I | undefined): Status;
    fromPartial<I_1 extends {
        presences?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        presences?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["presences"][number], keyof UserPresence>]: never; })[] & { [K_4 in Exclude<keyof I_1["presences"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "presences">]: never; }>(object: I_1): Status;
};
export declare const StatusFollow: {
    encode(message: StatusFollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusFollow;
    fromJSON(object: any): StatusFollow;
    toJSON(message: StatusFollow): unknown;
    create<I extends {
        user_ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_1 in Exclude<keyof I["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof StatusFollow>]: never; }>(base?: I | undefined): StatusFollow;
    fromPartial<I_1 extends {
        user_ids?: string[] | undefined;
        usernames?: string[] | undefined;
    } & {
        user_ids?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
        usernames?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["usernames"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof StatusFollow>]: never; }>(object: I_1): StatusFollow;
};
export declare const StatusPresenceEvent: {
    encode(message: StatusPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusPresenceEvent;
    fromJSON(object: any): StatusPresenceEvent;
    toJSON(message: StatusPresenceEvent): unknown;
    create<I extends {
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K in Exclude<keyof I["joins"][number], keyof UserPresence>]: never; })[] & { [K_1 in Exclude<keyof I["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_2 in Exclude<keyof I["leaves"][number], keyof UserPresence>]: never; })[] & { [K_3 in Exclude<keyof I["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof StatusPresenceEvent>]: never; }>(base?: I | undefined): StatusPresenceEvent;
    fromPartial<I_1 extends {
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["joins"][number], keyof UserPresence>]: never; })[] & { [K_6 in Exclude<keyof I_1["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["leaves"][number], keyof UserPresence>]: never; })[] & { [K_8 in Exclude<keyof I_1["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof StatusPresenceEvent>]: never; }>(object: I_1): StatusPresenceEvent;
};
export declare const LastSeenMessageEvent: {
    encode(message: LastSeenMessageEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LastSeenMessageEvent;
    fromJSON(object: any): LastSeenMessageEvent;
    toJSON(message: LastSeenMessageEvent): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
        timestamp?: string | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
        timestamp?: string | undefined;
    } & { [K in Exclude<keyof I, keyof LastSeenMessageEvent>]: never; }>(base?: I | undefined): LastSeenMessageEvent;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
        timestamp?: string | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        mode?: number | undefined;
        timestamp?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LastSeenMessageEvent>]: never; }>(object: I_1): LastSeenMessageEvent;
};
export declare const MessageTypingEvent: {
    encode(message: MessageTypingEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageTypingEvent;
    fromJSON(object: any): MessageTypingEvent;
    toJSON(message: MessageTypingEvent): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageTypingEvent>]: never; }>(base?: I | undefined): MessageTypingEvent;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageTypingEvent>]: never; }>(object: I_1): MessageTypingEvent;
};
export declare const MessageMentionEvent: {
    encode(message: MessageMentionEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageMentionEvent;
    fromJSON(object: any): MessageMentionEvent;
    toJSON(message: MessageMentionEvent): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageMentionEvent>]: never; }>(base?: I | undefined): MessageMentionEvent;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        user_id?: string | undefined;
        username?: string | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageMentionEvent>]: never; }>(object: I_1): MessageMentionEvent;
};
export declare const MessageReactionEvent: {
    encode(message: MessageReactionEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageReactionEvent;
    fromJSON(object: any): MessageReactionEvent;
    toJSON(message: MessageReactionEvent): unknown;
    create<I extends {
        id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        sender_id?: string | undefined;
        sender_name?: string | undefined;
        sender_avatar?: string | undefined;
        emoji?: string | undefined;
        action?: boolean | undefined;
        message_sender_id?: string | undefined;
        count?: number | undefined;
        mode?: number | undefined;
    } & {
        id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        sender_id?: string | undefined;
        sender_name?: string | undefined;
        sender_avatar?: string | undefined;
        emoji?: string | undefined;
        action?: boolean | undefined;
        message_sender_id?: string | undefined;
        count?: number | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageReactionEvent>]: never; }>(base?: I | undefined): MessageReactionEvent;
    fromPartial<I_1 extends {
        id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        sender_id?: string | undefined;
        sender_name?: string | undefined;
        sender_avatar?: string | undefined;
        emoji?: string | undefined;
        action?: boolean | undefined;
        message_sender_id?: string | undefined;
        count?: number | undefined;
        mode?: number | undefined;
    } & {
        id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        sender_id?: string | undefined;
        sender_name?: string | undefined;
        sender_avatar?: string | undefined;
        emoji?: string | undefined;
        action?: boolean | undefined;
        message_sender_id?: string | undefined;
        count?: number | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageReactionEvent>]: never; }>(object: I_1): MessageReactionEvent;
};
export declare const MessageAttachmentEvent: {
    encode(message: MessageAttachmentEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MessageAttachmentEvent;
    fromJSON(object: any): MessageAttachmentEvent;
    toJSON(message: MessageAttachmentEvent): unknown;
    create<I extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K in Exclude<keyof I, keyof MessageAttachmentEvent>]: never; }>(base?: I | undefined): MessageAttachmentEvent;
    fromPartial<I_1 extends {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & {
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        message_id?: string | undefined;
        filename?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
        filetype?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
        sender_id?: string | undefined;
        mode?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MessageAttachmentEvent>]: never; }>(object: I_1): MessageAttachmentEvent;
};
export declare const VoiceLeavedEvent: {
    encode(message: VoiceLeavedEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VoiceLeavedEvent;
    fromJSON(object: any): VoiceLeavedEvent;
    toJSON(message: VoiceLeavedEvent): unknown;
    create<I extends {
        id?: string | undefined;
        clan_id?: string | undefined;
        voice_channel_id?: string | undefined;
        voice_user_id?: string | undefined;
    } & {
        id?: string | undefined;
        clan_id?: string | undefined;
        voice_channel_id?: string | undefined;
        voice_user_id?: string | undefined;
    } & { [K in Exclude<keyof I, keyof VoiceLeavedEvent>]: never; }>(base?: I | undefined): VoiceLeavedEvent;
    fromPartial<I_1 extends {
        id?: string | undefined;
        clan_id?: string | undefined;
        voice_channel_id?: string | undefined;
        voice_user_id?: string | undefined;
    } & {
        id?: string | undefined;
        clan_id?: string | undefined;
        voice_channel_id?: string | undefined;
        voice_user_id?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof VoiceLeavedEvent>]: never; }>(object: I_1): VoiceLeavedEvent;
};
export declare const VoiceJoinedEvent: {
    encode(message: VoiceJoinedEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VoiceJoinedEvent;
    fromJSON(object: any): VoiceJoinedEvent;
    toJSON(message: VoiceJoinedEvent): unknown;
    create<I extends {
        clan_id?: string | undefined;
        clan_name?: string | undefined;
        id?: string | undefined;
        participant?: string | undefined;
        user_id?: string | undefined;
        voice_channel_label?: string | undefined;
        voice_channel_id?: string | undefined;
        last_screenshot?: string | undefined;
    } & {
        clan_id?: string | undefined;
        clan_name?: string | undefined;
        id?: string | undefined;
        participant?: string | undefined;
        user_id?: string | undefined;
        voice_channel_label?: string | undefined;
        voice_channel_id?: string | undefined;
        last_screenshot?: string | undefined;
    } & { [K in Exclude<keyof I, keyof VoiceJoinedEvent>]: never; }>(base?: I | undefined): VoiceJoinedEvent;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        clan_name?: string | undefined;
        id?: string | undefined;
        participant?: string | undefined;
        user_id?: string | undefined;
        voice_channel_label?: string | undefined;
        voice_channel_id?: string | undefined;
        last_screenshot?: string | undefined;
    } & {
        clan_id?: string | undefined;
        clan_name?: string | undefined;
        id?: string | undefined;
        participant?: string | undefined;
        user_id?: string | undefined;
        voice_channel_label?: string | undefined;
        voice_channel_id?: string | undefined;
        last_screenshot?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof VoiceJoinedEvent>]: never; }>(object: I_1): VoiceJoinedEvent;
};
export declare const ChannelCreatedEvent: {
    encode(message: ChannelCreatedEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelCreatedEvent;
    fromJSON(object: any): ChannelCreatedEvent;
    toJSON(message: ChannelCreatedEvent): unknown;
    create<I extends {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        creator_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        channel_type?: number | undefined;
    } & {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        creator_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        channel_type?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelCreatedEvent>]: never; }>(base?: I | undefined): ChannelCreatedEvent;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        creator_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        channel_type?: number | undefined;
    } & {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        creator_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        channel_label?: string | undefined;
        channel_type?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelCreatedEvent>]: never; }>(object: I_1): ChannelCreatedEvent;
};
export declare const ChannelDeletedEvent: {
    encode(message: ChannelDeletedEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ChannelDeletedEvent;
    fromJSON(object: any): ChannelDeletedEvent;
    toJSON(message: ChannelDeletedEvent): unknown;
    create<I extends {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        deletor?: string | undefined;
    } & {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        deletor?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ChannelDeletedEvent>]: never; }>(base?: I | undefined): ChannelDeletedEvent;
    fromPartial<I_1 extends {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        deletor?: string | undefined;
    } & {
        clan_id?: string | undefined;
        category_id?: string | undefined;
        parrent_id?: string | undefined;
        channel_id?: string | undefined;
        deletor?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ChannelDeletedEvent>]: never; }>(object: I_1): ChannelDeletedEvent;
};
export declare const StatusUnfollow: {
    encode(message: StatusUnfollow, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusUnfollow;
    fromJSON(object: any): StatusUnfollow;
    toJSON(message: StatusUnfollow): unknown;
    create<I extends {
        user_ids?: string[] | undefined;
    } & {
        user_ids?: (string[] & string[] & { [K in Exclude<keyof I["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "user_ids">]: never; }>(base?: I | undefined): StatusUnfollow;
    fromPartial<I_1 extends {
        user_ids?: string[] | undefined;
    } & {
        user_ids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["user_ids"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "user_ids">]: never; }>(object: I_1): StatusUnfollow;
};
export declare const StatusUpdate: {
    encode(message: StatusUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusUpdate;
    fromJSON(object: any): StatusUpdate;
    toJSON(message: StatusUpdate): unknown;
    create<I extends {
        status?: string | undefined;
    } & {
        status?: string | undefined;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I | undefined): StatusUpdate;
    fromPartial<I_1 extends {
        status?: string | undefined;
    } & {
        status?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): StatusUpdate;
};
export declare const Stream: {
    encode(message: Stream, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Stream;
    fromJSON(object: any): Stream;
    toJSON(message: Stream): unknown;
    create<I extends {
        mode?: number | undefined;
        subject?: string | undefined;
        subcontext?: string | undefined;
        label?: string | undefined;
    } & {
        mode?: number | undefined;
        subject?: string | undefined;
        subcontext?: string | undefined;
        label?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Stream>]: never; }>(base?: I | undefined): Stream;
    fromPartial<I_1 extends {
        mode?: number | undefined;
        subject?: string | undefined;
        subcontext?: string | undefined;
        label?: string | undefined;
    } & {
        mode?: number | undefined;
        subject?: string | undefined;
        subcontext?: string | undefined;
        label?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Stream>]: never; }>(object: I_1): Stream;
};
export declare const StreamData: {
    encode(message: StreamData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamData;
    fromJSON(object: any): StreamData;
    toJSON(message: StreamData): unknown;
    create<I extends {
        stream?: {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } | undefined;
        sender?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        data?: string | undefined;
        reliable?: boolean | undefined;
    } & {
        stream?: ({
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & { [K in Exclude<keyof I["stream"], keyof Stream>]: never; }) | undefined;
        sender?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_1 in Exclude<keyof I["sender"], keyof UserPresence>]: never; }) | undefined;
        data?: string | undefined;
        reliable?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof StreamData>]: never; }>(base?: I | undefined): StreamData;
    fromPartial<I_1 extends {
        stream?: {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } | undefined;
        sender?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } | undefined;
        data?: string | undefined;
        reliable?: boolean | undefined;
    } & {
        stream?: ({
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["stream"], keyof Stream>]: never; }) | undefined;
        sender?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["sender"], keyof UserPresence>]: never; }) | undefined;
        data?: string | undefined;
        reliable?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof StreamData>]: never; }>(object: I_1): StreamData;
};
export declare const StreamPresenceEvent: {
    encode(message: StreamPresenceEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamPresenceEvent;
    fromJSON(object: any): StreamPresenceEvent;
    toJSON(message: StreamPresenceEvent): unknown;
    create<I extends {
        stream?: {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        stream?: ({
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & { [K in Exclude<keyof I["stream"], keyof Stream>]: never; }) | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_1 in Exclude<keyof I["joins"][number], keyof UserPresence>]: never; })[] & { [K_2 in Exclude<keyof I["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_3 in Exclude<keyof I["leaves"][number], keyof UserPresence>]: never; })[] & { [K_4 in Exclude<keyof I["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof StreamPresenceEvent>]: never; }>(base?: I | undefined): StreamPresenceEvent;
    fromPartial<I_1 extends {
        stream?: {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } | undefined;
        joins?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
        leaves?: {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] | undefined;
    } & {
        stream?: ({
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & {
            mode?: number | undefined;
            subject?: string | undefined;
            subcontext?: string | undefined;
            label?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["stream"], keyof Stream>]: never; }) | undefined;
        joins?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["joins"][number], keyof UserPresence>]: never; })[] & { [K_8 in Exclude<keyof I_1["joins"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
        leaves?: ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[] & ({
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        } & { [K_9 in Exclude<keyof I_1["leaves"][number], keyof UserPresence>]: never; })[] & { [K_10 in Exclude<keyof I_1["leaves"], keyof {
            user_id?: string | undefined;
            session_id?: string | undefined;
            username?: string | undefined;
            persistence?: boolean | undefined;
            status?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I_1, keyof StreamPresenceEvent>]: never; }>(object: I_1): StreamPresenceEvent;
};
export declare const UserPresence: {
    encode(message: UserPresence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UserPresence;
    fromJSON(object: any): UserPresence;
    toJSON(message: UserPresence): unknown;
    create<I extends {
        user_id?: string | undefined;
        session_id?: string | undefined;
        username?: string | undefined;
        persistence?: boolean | undefined;
        status?: string | undefined;
    } & {
        user_id?: string | undefined;
        session_id?: string | undefined;
        username?: string | undefined;
        persistence?: boolean | undefined;
        status?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UserPresence>]: never; }>(base?: I | undefined): UserPresence;
    fromPartial<I_1 extends {
        user_id?: string | undefined;
        session_id?: string | undefined;
        username?: string | undefined;
        persistence?: boolean | undefined;
        status?: string | undefined;
    } & {
        user_id?: string | undefined;
        session_id?: string | undefined;
        username?: string | undefined;
        persistence?: boolean | undefined;
        status?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UserPresence>]: never; }>(object: I_1): UserPresence;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
