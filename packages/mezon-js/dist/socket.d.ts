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
import { ApiChannelMessageHeader, ApiMessageAttachment, ApiMessageMention, ApiMessageReaction, ApiMessageRef, ApiRpc, ApiUser } from "./api.gen";
import { Session } from "./session";
import { ChannelMessage, Notification } from "./client";
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
    /** The status of the user */
    status: string;
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
    clan_logo: string;
    category_name: string;
}
export interface ClanJoin {
    clan_join: {
        clan_id: string;
    };
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
        channel_id: string;
        mode: number;
        channel_label: string;
    };
}
export interface AddClanUserEvent {
    clan_id: string;
    user: AddUsers;
}
/** UserChannelAddedEvent */
export interface UserChannelAddedEvent {
    channel_id: string;
    users: AddUsers[];
    status: string;
    clan_id: string;
    channel_type: number;
}
export interface AddUsers {
    user_id: string;
    avatar: string;
    username: string;
}
export interface UserChannelRemovedEvent {
    channel_id: string;
    user_ids: string[];
    channel_type: number;
}
export interface UserClanRemovedEvent {
    clan_id: string;
    user_ids: string[];
}
/** Last seen message by user */
export interface LastPinMessageEvent {
    /** The channel this message belongs to. */
    channel_id: string;
    mode: number;
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
    channel_id: string;
    mode: number;
    channel_label: string;
    /** The unique ID of this message. */
    message_id: string;
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
export interface UserProfileUpdatedEvent {
    user_id: string;
    display_name: string;
    avatar: string;
    about_me: string;
    channel_id: string;
    clan_id: string;
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
        mentions?: Array<ApiMessageMention>;
        attachments?: Array<ApiMessageAttachment>;
        anonymous_message?: boolean;
        mention_everyone?: boolean;
        avatar: string;
    };
}
/** Update a message previously sent to a realtime chat channel. */
interface ChannelMessageUpdate {
    channel_message_update: {
        /** The server-assigned channel ID. */
        channel_id: string;
        /** The server-assigned channel label. */
        /** A unique ID for the chat message to be updated. */
        message_id: string;
        /** The content payload. */
        content: any;
        /** mentions */
        mentions?: Array<ApiMessageMention>;
        /** attachments */
        attachments?: Array<ApiMessageAttachment>;
        /** The mode payload. */
        mode: number;
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
export interface VoiceEndedEvent {
    id: string;
    clan_id: string;
    voice_channel_id: string;
}
export interface VoiceStartedEvent {
    id: string;
    clan_id: string;
    voice_channel_id: string;
}
export interface VoiceLeavedEvent {
    id: string;
    clan_id: string;
    voice_channel_id: string;
    voice_user_id: string;
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
export interface CustomStatusEvent {
    clan_id: string;
    user_id: string;
    username: string;
    status: string;
}
export interface ChannelUpdatedEvent {
    clan_id: string;
    category_id: string;
    creator_id: string;
    parrent_id: string;
    channel_id: string;
    channel_label: string;
    channel_type: number;
    status: number;
}
export interface ChannelCreatedEvent {
    clan_id: string;
    category_id: string;
    creator_id: string;
    parrent_id: string;
    channel_id: string;
    channel_label: string;
    channel_private: number;
    channel_type: number;
    status: number;
}
export interface ChannelDeletedEvent {
    clan_id: string;
    category_id: string;
    channel_id: string;
    deletor: string;
}
export interface PermissionRoleChannelListEvent {
    role_id?: string;
    channel_id?: string;
    permission_role_channel?: Array<PermissionRoleChannel>;
}
export interface PermissionRoleChannel {
    permission_id?: string;
    active?: boolean;
}
export interface ClanUpdatedEvent {
    clan_id: string;
    clan_name: string;
    clan_logo: string;
}
export interface ClanProfileUpdatedEvent {
    user_id: string;
    clan_nick: string;
    clan_avatar: string;
    clan_id: string;
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
export interface ClanNameExistedEvent {
    clan_name: string;
    exist: boolean;
}
/**  */
export interface StrickerListedEvent {
    clan_id: string;
    stickers?: Array<ClanSticker>;
}
/**  */
export interface ClanSticker {
    category?: string;
    clan_id?: string;
    create_time?: string;
    creator_id?: string;
    id?: string;
    shortname?: string;
    source?: string;
}
/**  */
export interface EmojiListedEvent {
    clan_id: string;
    emoji_list?: Array<ClanEmoji>;
}
/**  */
export interface ClanEmoji {
    category?: string;
    creator_id?: string;
    id?: string;
    shortname?: string;
    src?: string;
}
/**  */
export interface ChannelDescListEvent {
    channeldesc?: Array<ChannelDescription>;
}
/**  */
export interface ListUser {
    user?: Array<ApiUser>;
}
/**  */
export interface ChannelDescription {
    clan_id?: string;
    channel_id?: string;
    type?: number;
    channel_label?: string;
    channel_private?: number;
    meeting_code?: string;
    clan_name?: string;
    parrent_id?: string;
    last_sent_message?: ApiChannelMessageHeader;
}
export interface HashtagDmListEvent {
    user_id?: Array<string>;
    limit?: number;
    hashtag_dm?: Array<HashtagDm>;
}
export interface HashtagDm {
    channel_id?: string;
    channel_label?: string;
    clan_id?: string;
    clan_name?: string;
    meeting_code?: string;
    type?: number;
    channel_private?: number;
    parrent_id?: string;
}
export interface NotificationChannelSettingEvent {
    channel_id?: string;
    notification_user_channel?: NotificationUserChannel;
}
export interface NotificationUserChannel {
    active?: number;
    id?: string;
    notification_setting_type?: number;
    time_mute?: string;
}
export interface NotificationCategorySettingEvent {
    category_id?: string;
    notification_user_channel?: NotificationUserChannel;
}
export interface NotificationClanSettingEvent {
    clan_id?: string;
    notification_setting?: NotificationSetting;
}
export interface NotificationSetting {
    id?: string;
    notification_setting_type?: number;
}
export interface NotifiReactMessageEvent {
    channel_id?: string;
    notifi_react_message?: NotifiReactMessage;
}
export interface NotifiReactMessage {
    id?: string;
    user_id?: string;
    channel_id_req?: string;
}
export interface NotificationChannelCategorySetting {
    id: string;
    channel_category_label: string;
    notification_setting_type: number;
    channel_category_title: string;
}
export interface NotificationChannelCategorySettingEvent {
    clan_id?: string;
    notification_channel_category_settings_list?: NotificationChannelCategorySetting[];
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
    followUsers(user_ids: string[]): Promise<Status>;
    /** Join clan chat */
    joinClanChat(clan_id: string): Promise<ClanJoin>;
    /** Join a chat channel on the server. */
    joinChat(clan_id: string, channel_id: string, channel_type: number): Promise<Channel>;
    /** Leave a chat channel on the server. */
    leaveChat(clan_id: string, channel_id: string, channel_type: number): Promise<void>;
    /** Remove a chat message from a chat channel on the server. */
    removeChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string): Promise<ChannelMessageAck>;
    /** Execute an RPC function to the server. */
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    /** Unfollow one or more users from their status updates. */
    unfollowUsers(user_ids: string[]): Promise<void>;
    /** Update a chat message on a chat channel in the server. */
    updateChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, hideEditted?: boolean): Promise<ChannelMessageAck>;
    /** Update the status for the current user online. */
    updateStatus(status?: string): Promise<void>;
    /** Send a chat message to a chat channel on the server. */
    writeChatMessage(clan_id: string, channel_id: string, mode: number, content?: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?: boolean, avatar?: string): Promise<ChannelMessageAck>;
    /** Send message typing */
    writeMessageTyping(clan_id: string, channel_id: string, mode: number): Promise<MessageTypingEvent>;
    /** Send message reaction */
    writeMessageReaction(id: string, clan_id: string, channel_id: string, mode: number, message_id: string, emoji_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean): Promise<ApiMessageReaction>;
    /** Send last seen message */
    writeLastSeenMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp_seconds: number): Promise<LastSeenMessageEvent>;
    /** Send last pin message */
    writeLastPinMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp_seconds: number, operation: number): Promise<LastPinMessageEvent>;
    /** Send custom user status */
    writeCustomStatus(clan_id: string, status: string): Promise<CustomStatusEvent>;
    /** send voice joined */
    writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent>;
    /** send voice leaved */
    writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string): Promise<VoiceLeavedEvent>;
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
    onchannelmessage: (channelMessage: ChannelMessage) => void;
    /** Receive typing event */
    onmessagetyping: (messageTypingEvent: MessageTypingEvent) => void;
    /** Receive reaction event */
    onmessagereaction: (messageReactionEvent: ApiMessageReaction) => void;
    /** Receive channel presence updates. */
    onchannelpresence: (channelPresence: ChannelPresenceEvent) => void;
    /** pin message event */
    onpinmessage: (pin: LastPinMessageEvent) => void;
    /** Receive added user event */
    onuserchanneladded: (user: UserChannelAddedEvent) => void;
    /** Receive added user clan event */
    onuserclanadded: (user: AddClanUserEvent) => void;
    /** Receive update user event */
    onuserprofileupdate: (user: UserProfileUpdatedEvent) => void;
    /** Receive channel removed user event */
    onuserchannelremoved: (user: UserChannelRemovedEvent) => void;
    /** Receive clan removed user event */
    onuserclanremoved: (user: UserClanRemovedEvent) => void;
    onvoicestarted: (voice: VoiceStartedEvent) => void;
    onvoiceended: (voice: VoiceEndedEvent) => void;
    onvoicejoined: (voiceParticipant: VoiceJoinedEvent) => void;
    onvoiceleaved: (voiceParticipant: VoiceLeavedEvent) => void;
    onchannelcreated: (channelCreated: ChannelCreatedEvent) => void;
    onchanneldeleted: (channelDeleted: ChannelDeletedEvent) => void;
    onchannelupdated: (channelUpdated: ChannelUpdatedEvent) => void;
    onclanprofileupdated: (clanprofile: ClanProfileUpdatedEvent) => void;
    onclanupdated: (clan: ClanUpdatedEvent) => void;
    setHeartbeatTimeoutMs(ms: number): void;
    getHeartbeatTimeoutMs(): number;
    checkDuplicateClanName(clan_name: string): Promise<ClanNameExistedEvent>;
    listClanEmojiByClanId(clan_id: string): Promise<EmojiListedEvent>;
    listClanStickersByClanId(clan_id: string): Promise<StrickerListedEvent>;
    ListChannelByUserId(): Promise<ChannelDescListEvent>;
    ListUsersByUserId(): Promise<ListUser>;
    hashtagDMList(user_id: Array<string>, limit: number): Promise<HashtagDmListEvent>;
    getNotificationChannelSetting(channel_id: string): Promise<NotificationChannelSettingEvent>;
    getNotificationCategorySetting(category_id: string): Promise<NotificationCategorySettingEvent>;
    getNotificationClanSetting(clan_id: string): Promise<NotificationClanSettingEvent>;
    getNotificationReactMessage(channel_id_req: string): Promise<NotifiReactMessageEvent>;
    GetPermissionByRoleIdChannelId(role_id: string, channel_id: string): Promise<PermissionRoleChannelListEvent>;
    getNotificationChannelCategorySetting(clan_id: string): Promise<NotificationChannelCategorySettingEvent>;
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
    isOpen(): boolean;
    connect(session: Session, createStatus?: boolean, connectTimeoutMs?: number): Promise<Session>;
    disconnect(fireDisconnectEvent?: boolean): void;
    setHeartbeatTimeoutMs(ms: number): void;
    getHeartbeatTimeoutMs(): number;
    ondisconnect(evt: Event): void;
    onerror(evt: Event): void;
    onmessagetyping(messagetyping: MessageTypingEvent): void;
    onmessagereaction(messagereaction: ApiMessageReaction): void;
    onchannelmessage(channelMessage: ChannelMessage): void;
    onchannelpresence(channelPresence: ChannelPresenceEvent): void;
    onuserchanneladded(user: UserChannelAddedEvent): void;
    onuserclanadded(user: AddClanUserEvent): void;
    onuserprofileupdate(user: UserProfileUpdatedEvent): void;
    onuserchannelremoved(user: UserChannelRemovedEvent): void;
    onuserclanremoved(user: UserClanRemovedEvent): void;
    onnotification(notification: Notification): void;
    onstatuspresence(statusPresence: StatusPresenceEvent): void;
    onpinmessage(pin: LastPinMessageEvent): void;
    onvoiceended(voice: VoiceEndedEvent): void;
    onvoicestarted(voice: VoiceStartedEvent): void;
    onvoicejoined(voiceParticipant: VoiceJoinedEvent): void;
    onvoiceleaved(voiceParticipant: VoiceLeavedEvent): void;
    onchannelcreated(channelCreated: ChannelCreatedEvent): void;
    onchanneldeleted(channelDeleted: ChannelDeletedEvent): void;
    onchannelupdated(channelUpdated: ChannelUpdatedEvent): void;
    onclanprofileupdated(clanprofile: ClanProfileUpdatedEvent): void;
    onclanupdated(clan: ClanUpdatedEvent): void;
    onstreampresence(streamPresence: StreamPresenceEvent): void;
    onstreamdata(streamData: StreamData): void;
    onheartbeattimeout(): void;
    oncustomstatus(statusEvent: CustomStatusEvent): void;
    send(message: ChannelJoin | ChannelLeave | ChannelMessageSend | ChannelMessageUpdate | CustomStatusEvent | ChannelMessageRemove | MessageTypingEvent | LastSeenMessageEvent | Rpc | StatusFollow | StatusUnfollow | StatusUpdate | Ping, sendTimeout?: number): Promise<any>;
    followUsers(userIds: string[]): Promise<Status>;
    joinClanChat(clan_id: string): Promise<ClanJoin>;
    joinChat(clan_id: string, channel_id: string, channel_type: number): Promise<Channel>;
    leaveChat(clan_id: string, channel_id: string, channel_type: number): Promise<void>;
    removeChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string): Promise<ChannelMessageAck>;
    removePartyMember(party_id: string, member: Presence): Promise<void>;
    rpc(id?: string, payload?: string, http_key?: string): Promise<ApiRpc>;
    sendPartyData(party_id: string, op_code: number, data: string | Uint8Array): Promise<void>;
    unfollowUsers(user_ids: string[]): Promise<void>;
    updateChatMessage(clan_id: string, channel_id: string, mode: number, message_id: string, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, hideEditted?: boolean): Promise<ChannelMessageAck>;
    updateStatus(status?: string): Promise<void>;
    writeChatMessage(clan_id: string, channel_id: string, mode: number, content: any, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, references?: Array<ApiMessageRef>, anonymous_message?: boolean, mention_everyone?: Boolean, avatar?: string): Promise<ChannelMessageAck>;
    writeMessageReaction(id: string, clan_id: string, channel_id: string, mode: number, message_id: string, emoji_id: string, emoji: string, count: number, message_sender_id: string, action_delete: boolean): Promise<ApiMessageReaction>;
    writeMessageTyping(clan_id: string, channel_id: string, mode: number): Promise<MessageTypingEvent>;
    writeLastSeenMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp_seconds: number): Promise<LastSeenMessageEvent>;
    writeLastPinMessage(clan_id: string, channel_id: string, mode: number, message_id: string, timestamp_seconds: number, operation: number): Promise<LastPinMessageEvent>;
    writeVoiceJoined(id: string, clanId: string, clanName: string, voiceChannelId: string, voiceChannelLabel: string, participant: string, lastScreenshot: string): Promise<VoiceJoinedEvent>;
    writeVoiceLeaved(id: string, clanId: string, voiceChannelId: string, voiceUserId: string): Promise<VoiceLeavedEvent>;
    writeCustomStatus(clan_id: string, status: string): Promise<CustomStatusEvent>;
    checkDuplicateClanName(clan_name: string): Promise<ClanNameExistedEvent>;
    listClanEmojiByClanId(clan_id: string): Promise<EmojiListedEvent>;
    ListChannelByUserId(): Promise<ChannelDescListEvent>;
    ListUsersByUserId(): Promise<ListUser>;
    hashtagDMList(user_id: Array<string>, limit: number): Promise<HashtagDmListEvent>;
    GetPermissionByRoleIdChannelId(role_id: string, channel_id: string): Promise<PermissionRoleChannelListEvent>;
    listClanStickersByClanId(clan_id: string): Promise<StrickerListedEvent>;
    getNotificationChannelSetting(channel_id: string): Promise<NotificationChannelSettingEvent>;
    getNotificationCategorySetting(category_id: string): Promise<NotificationCategorySettingEvent>;
    getNotificationClanSetting(clan_id: string): Promise<NotificationClanSettingEvent>;
    getNotificationReactMessage(channel_id: string): Promise<NotifiReactMessageEvent>;
    getNotificationChannelCategorySetting(clan_id: string): Promise<NotificationChannelCategorySettingEvent>;
    private pingPong;
}
export {};
