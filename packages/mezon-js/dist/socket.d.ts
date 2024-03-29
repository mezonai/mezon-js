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
import { ApiMessageAttachment, ApiMessageMention, ApiMessageReaction, ApiMessageRef, ApiRpc } from "./api.gen";
import { Session } from "./session";
import { Notification } from "./client";
import { WebSocketAdapter } from "./web_socket_adapter";
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
    chanel_label: string;
    /** The presences visible on the chat channel. */
    presences: Presence[];
    /** The presence of the current user, i.e. yourself. */
    self: Presence;
    user_id_one: string;
    user_id_two: string;
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
        mode: number;
        channel_label: string;
    };
}
/** Last seen message by user */
export interface LastSeenMessageEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The unique ID of this message. */
    message_id: string;
}
/** User is react to message */
export interface MessageReactionEvent {
    id: string;
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The message that user react */
    message_id: string;
    /** Message sender, usually a user ID. */
    sender_id: string;
    sender_name?: string;
    sender_avatar?: string;
    /** Emoji list. */
    emoji: string;
    count: number;
    action: boolean;
}
/** User is react to message */
export interface MessageMentionEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The message that user react */
    message_id: string;
    /** Message sender, usually a user ID. */
    sender_id: string;
    user_id: string;
    username: string;
}
/** User is react to message */
export interface MessageAttachmentEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The message that user react */
    message_id: string;
    /** Message sender, usually a user ID. */
    sender_id: string;
    filename: string;
    size: number;
    url: string;
    filetype: string;
    width?: number;
    height?: number;
}
/** User is delete to message */
export interface MessageDeletedEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The message that user react */
    message_id: string;
    /** Message sender, usually a user ID. */
    deletor: string;
}
/** User is delete to message */
export interface MessageRefEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
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
    channel_id: string;
    mode: number;
    channel_label: string;
    /** Message sender, usually a user ID. */
    sender_id: string;
}
/** An incoming message on a realtime chat channel. */
export interface ChannelMessageEvent {
    avatar?: string;
    channel_id: string;
    mode: number;
    channel_label: string;
    clan_id?: string;
    code: number;
    content: string;
    create_time: string;
    id: string;
    persistent?: boolean;
    sender_id: string;
    update_time: string;
    user_id_one: string;
    user_id_two: string;
    username: string;
    reactions?: Array<ApiMessageReaction>;
    mentions?: Array<ApiMessageMention>;
    attachments?: Array<ApiMessageAttachment>;
    references?: Array<ApiMessageRef>;
    referenced_message?: ChannelMessageEvent;
}
/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
    /** The server-assigned channel ID. */
    channel_id: string;
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
        channel_id: string;
        mode: number;
        channel_label: string;
        /** The content payload. */
        content: any;
        mentions?: Array<MessageMentionEvent>;
        attachments?: Array<MessageAttachmentEvent>;
    };
}
/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
    channel_message_update: {
        /** The server-assigned channel ID. */
        channel_id: string;
        /** A unique ID for the chat message to be updated. */
        message_id: string;
        /** The content payload. */
        content: any;
    };
}
/** Remove a message previously sent to a realtime chat channel. */
interface ChannelMessageRemove {
    channel_message_remove: {
        /** The server-assigned channel ID. */
        channel_id: string;
        mode: number;
        channel_label: string;
        /** A unique ID for the chat message to be removed. */
        message_id: string;
    };
}
/** Presence update for a particular realtime chat channel. */
export interface ChannelPresenceEvent {
    /** The unique identifier of the chat channel. */
    channel_id: string;
    channel_label: string;
    mode: number;
    /** Presences of the users who joined the channel. */
    joins: Presence[];
    /** Presences of users who left the channel. */
    leaves: Presence[];
}
export interface VoiceLeavedEvent {
    id: string;
    voice_channel_id: string;
    last_participant: boolean;
}
export interface VoiceJoinedEvent {
    /** The unique identifier of the chat channel. */
    clan_id: string;
    clan_name: string;
    id: string;
    participant: string;
    user_id: string;
    voice_channel_label: string;
    voice_channel_id: string;
    last_screenshot: string;
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
    party_id: string;
    /** True, if the party is open to join. */
    open: boolean;
    /** The maximum number of party members. */
    max_size: number;
    /** The current user in this party, i.e. yourself. */
    self: Presence;
    /** The current party leader. */
    leader: Presence;
    /** All members currently in the party. */
    presences: Presence[];
}
/** Create a party. */
export interface PartyCreate {
    party_create: {
        /** True, if the party is open to join. */
        open: boolean;
        /** The maximum number of party members. */
        max_size: number;
    };
}
/** Join a party. */
interface PartyJoin {
    party_join: {
        /** The unique party identifier. */
        party_id: string;
    };
}
/** Leave a party. */
interface PartyLeave {
    party_leave: {
        /** The unique party identifier. */
        party_id: string;
    };
}
/** Promote a new party leader. */
interface PartyPromote {
    party_promote: {
        /** The unique party identifier. */
        party_id: string;
        /** The user presence being promoted to leader. */
        presence: Presence;
    };
}
/** Announcement of a new party leader. */
export interface PartyLeader {
    /** The unique party identifier. */
    party_id: string;
    /** The presence of the new party leader. */
    presence: Presence;
}
/** Accept a request to join. */
interface PartyAccept {
    party_accept: {
        /** The unique party identifier. */
        party_id: string;
        /** The presence being accepted to join the party. */
        presence: Presence;
    };
}
/** End a party, kicking all party members and closing it. */
interface PartyClose {
    party_close: {
        /** The unique party identifier. */
        party_id: string;
    };
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
        party_id: string;
        /** The operation code the message was sent with. */
        op_code: number;
        /** Data payload, if any. */
        data: string | Uint8Array;
    };
}
/** Incoming notification for one or more new presences attempting to join the party. */
export interface PartyJoinRequest {
    /** The ID of the party to get a list of join requests for. */
    party_id: string;
    /** Presences attempting to join, or who have joined. */
    presences: Presence[];
}
/** Request a list of pending join requests for a party. */
export interface PartyJoinRequestList {
    party_join_request_list: {
        /** The ID of the party to get a list of join requests for. */
        party_id: string;
    };
}
/** Begin matchmaking as a party. */
interface PartyMatchmakerAdd {
    party_matchmaker_add: {
        /** The ID of the party to create a matchmaker ticket for. */
        party_id: string;
        /** Minimum total user count to match together. */
        min_count: number;
        /** Maximum total user count to match together. */
        max_count: number;
        /** Filter query used to identify suitable users. */
        query: string;
        /** String properties describing the party (e.g. region). */
        string_properties?: Record<string, string>;
        /** Numeric properties describing the party (e.g. rank). */
        numeric_properties?: Record<string, number>;
    };
}
/** Cancel a party matchmaking process using a ticket. */
interface PartyMatchmakerRemove {
    party_matchmaker_remove: {
        /** The ID of the party to cancel a matchmaker ticket for. */
        party_id: string;
        /** The ticket to remove. */
        ticket: string;
    };
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
    party_id: string;
    /** The user presences that have just joined the party. */
    joins: Presence[];
    /** The user presences that have just left the party. */
    leaves: Presence[];
}
/** Kick a party member, or decline a request to join. */
interface PartyRemove {
    party_remove: {
        /** The ID of the party to remove/reject from. */
        party_id: string;
        /** The presence to remove/reject. */
        presence: Presence;
    };
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
    status_follow: {
        user_ids: string[];
    };
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
    status_unfollow: {
        user_ids: string[];
    };
}
/** Set the user's own status. */
interface StatusUpdate {
    /** Status string to set, if not present the user will appear offline. */
    status_update: {
        status?: string;
    };
}
/** A socket connection to Mezon server. */
export interface Socket {
    /** Connect to the server. */
    connect(session: Session, createStatus: boolean): Promise<Session>;
    /** Disconnect from the server. */
    disconnect(fireDisconnectEvent: boolean): void;
    /** Accept a request to join. */
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    /** End a party, kicking all party members and closing it. */
    closeParty(party_id: string): Promise<void>;
    /** Create a party. */
    createParty(open: boolean, max_size: number): Promise<Party>;
    /** Subscribe to one or more users for their status updates. */
    followUsers(user_ids: string[]): Promise<Status>;
    /** Join a chat channel on the server. */
    joinChat(channel_id: string, channel_label: string, mode: number, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    /** Join a party. */
    joinParty(party_id: string): Promise<void>;
    /** Leave a chat channel on the server. */
    leaveChat(channel_id: string, channel_label: string, mode: number): Promise<void>;
    /** Leave a multiplayer match on the server. */
    leaveMatch(matchId: string): Promise<void>;
    /** Leave a party. */
    leaveParty(party_id: string): Promise<void>;
    /** Request a list of pending join requests for a party. */
    listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest>;
    /** Promote a new party leader. */
    promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader>;
    /** Remove a chat message from a chat channel on the server. */
    removeChatMessage(channel_id: string, channel_label: string, mode: number, message_id: string): Promise<ChannelMessageAck>;
    /** Kick a party member, or decline a request to join. */
    removePartyMember(party_id: string, presence: Presence): Promise<void>;
    /** Execute an RPC function to the server. */
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    /** Send data to a party. */
    sendPartyData(party_id: string, opcode: number, data: string | Uint8Array): Promise<void>;
    /** Unfollow one or more users from their status updates. */
    unfollowUsers(user_ids: string[]): Promise<void>;
    /** Update a chat message on a chat channel in the server. */
    updateChatMessage(channel_id: string, channel_label: string, mode: number, message_id: string, content: any): Promise<ChannelMessageAck>;
    /** Update the status for the current user online. */
    updateStatus(status?: string): Promise<void>;
    /** Send a chat message to a chat channel on the server. */
    writeChatMessage(clan_id: string, channel_id: string, channel_label: string, mode: number, content?: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>): Promise<ChannelMessageAck>;
    /** Send message typing */
    writeMessageTyping(channel_id: string, channel_label: string, mode: number): Promise<MessageTypingEvent>;
    /** Send message reaction */
    writeMessageReaction(id: string, channel_id: string, channel_label: string, mode: number, message_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean): Promise<MessageReactionEvent>;
    /** Send message mention */
    writeMessageDeleted(channel_id: string, channel_label: string, mode: number, message_id: string, deletor: string): Promise<MessageDeletedEvent>;
    /** Send last seen message */
    writeLastSeenMessage(channel_id: string, channel_label: string, mode: number, message_id: string, timestamp: string): Promise<LastSeenMessageEvent>;
    /** send voice joined */
    writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent>;
    /** send voice leaved */
    writeVoiceLeaved(id: string, voiceChannelId: string, lastParticipant: boolean): Promise<VoiceLeavedEvent>;
    /** Handle disconnect events received from the socket. */
    ondisconnect: (evt: Event) => void;
    /** Handle error events received from the socket. */
    onerror: (evt: Event) => void;
    /** Receive notifications from the socket. */
    onnotification: (notification: Notification) => void;
    /** Receive party events. */
    onparty: (party: Party) => void;
    /** Receive party close events. */
    onpartyclose: (partyClose: PartyClose) => void;
    /** Receive party data updates. */
    onpartydata: (partyData: PartyData) => void;
    /** Receive party join requests, if party leader. */
    onpartyjoinrequest: (partyJoinRequest: PartyJoinRequest) => void;
    /** Receive announcements of a new party leader. */
    onpartyleader: (partyLeader: PartyLeader) => void;
    /** Receive a presence update for a party. */
    onpartypresence: (partyPresence: PartyPresenceEvent) => void;
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
    onvoicejoined: (voiceParticipant: VoiceJoinedEvent) => void;
    onvoiceleaved: (voiceParticipant: VoiceLeavedEvent) => void;
    setHeartbeatTimeoutMs(ms: number): void;
    getHeartbeatTimeoutMs(): number;
}
/** Reports an error received from a socket message. */
export interface SocketError {
    /** The error code. */
    code: number;
    /** A message in English to help developers debug the response. */
    message: string;
}
/** A socket connection to Mezon server implemented with the DOM's WebSocket API. */
export declare class DefaultSocket implements Socket {
    readonly host: string;
    readonly port: string;
    readonly useSSL: boolean;
    verbose: boolean;
    readonly adapter: WebSocketAdapter;
    readonly sendTimeoutMs: number;
    static readonly DefaultHeartbeatTimeoutMs = 10000;
    static readonly DefaultSendTimeoutMs = 10000;
    static readonly DefaultConnectTimeoutMs = 30000;
    private readonly cIds;
    private nextCid;
    private _heartbeatTimeoutMs;
    constructor(host: string, port: string, useSSL?: boolean, verbose?: boolean, adapter?: WebSocketAdapter, sendTimeoutMs?: number);
    generatecid(): string;
    connect(session: Session, createStatus?: boolean, connectTimeoutMs?: number): Promise<Session>;
    disconnect(fireDisconnectEvent?: boolean): void;
    setHeartbeatTimeoutMs(ms: number): void;
    getHeartbeatTimeoutMs(): number;
    ondisconnect(evt: Event): void;
    onerror(evt: Event): void;
    onmessagetyping(messagetyping: MessageTypingEvent): void;
    onmessagereaction(messagereaction: MessageReactionEvent): void;
    onmessagedeleted(messagedeleted: MessageDeletedEvent): void;
    onchannelmessage(channelMessage: ChannelMessageEvent): void;
    onchannelpresence(channelPresence: ChannelPresenceEvent): void;
    onnotification(notification: Notification): void;
    onparty(party: Party): void;
    onpartyclose(close: PartyClose): void;
    onpartyjoinrequest(partyJoinRequest: PartyJoinRequest): void;
    onpartydata(partyData: PartyData): void;
    onpartyleader(partyLeader: PartyLeader): void;
    onpartymatchmakerticket(partyMatched: PartyMatchmakerTicket): void;
    onpartypresence(partyPresence: PartyPresenceEvent): void;
    onstatuspresence(statusPresence: StatusPresenceEvent): void;
    onvoicejoined(voiceParticipant: VoiceJoinedEvent): void;
    onvoiceleaved(voiceParticipant: VoiceLeavedEvent): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    onheartbeattimeout(): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | ChannelMessageRemove | MessageTypingEvent | LastSeenMessageEvent | PartyAccept | PartyClose | PartyCreate | PartyDataSend | PartyJoin | PartyJoinRequestList | PartyLeave | PartyMatchmakerAdd | PartyMatchmakerRemove | PartyPromote | PartyRemove | Rpc | StatusFollow | StatusUnfollow | StatusUpdate | Ping, sendTimeout?: number): Promise<any>;
    acceptPartyMember(party_id: string, presence: Presence): Promise<void>;
    closeParty(party_id: string): Promise<void>;
    createParty(open: boolean, max_size: number): Promise<Party>;
    followUsers(userIds: string[]): Promise<Status>;
    joinChat(channel_id: string, channel_label: string, mode: number, type: number, persistence: boolean, hidden: boolean): Promise<Channel>;
    joinParty(party_id: string): Promise<void>;
    leaveChat(channel_id: string, channel_label: string, mode: number): Promise<void>;
    leaveMatch(matchId: string): Promise<void>;
    leaveParty(party_id: string): Promise<void>;
    listPartyJoinRequests(party_id: string): Promise<PartyJoinRequest>;
    promotePartyMember(party_id: string, party_member: Presence): Promise<PartyLeader>;
    removeChatMessage(channel_id: string, channel_label: string, mode: number, message_id: string): Promise<ChannelMessageAck>;
    removePartyMember(party_id: string, member: Presence): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendPartyData(party_id: string, op_code: number, data: string | Uint8Array): Promise<void>;
    unfollowUsers(user_ids: string[]): Promise<void>;
    updateChatMessage(channel_id: string, message_id: string, content: any): Promise<ChannelMessageAck>;
    updateStatus(status?: string): Promise<void>;
    writeChatMessage(clan_id: string, channel_id: string, channel_label: string, mode: number, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>): Promise<ChannelMessageAck>;
    writeMessageReaction(id: string, channel_id: string, channel_label: string, mode: number, message_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean): Promise<MessageReactionEvent>;
    writeMessageDeleted(channel_id: string, channel_label: string, mode: number, message_id: string): Promise<MessageDeletedEvent>;
    writeMessageTyping(channel_id: string, channel_label: string, mode: number): Promise<MessageTypingEvent>;
    writeLastSeenMessage(channel_id: string, channel_label: string, mode: number, message_id: string, timestamp: string): Promise<LastSeenMessageEvent>;
    writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent>;
    writeVoiceLeaved(id: string, voiceChannelId: string, lastParticipant: boolean): Promise<VoiceLeavedEvent>;
    private pingPong;
}
export {};
