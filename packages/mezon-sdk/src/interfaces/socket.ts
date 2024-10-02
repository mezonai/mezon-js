import { CloseEvent, ErrorEvent } from "ws";
import {
  ApiChannelDescription,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageReaction,
  ApiMessageRef,
} from "./client";
import { Session } from "../session";
import { EventEmitter } from "stream";

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
  };
}

/** Join a realtime chat channel. */
export interface ChannelJoin {
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
    // is public
    is_public: boolean;
    // parent id
    parent_id: string;
    // parent public
    is_parent_public: boolean;
  };
}

/** Leave a realtime chat channel. */
export interface ChannelLeave {
  channel_leave: {
    /** The id of the channel to leave. */
    channel_id: string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    // Is public
    is_public: boolean;
    // parent id
    parent_id: string;
    // parent public
    is_parent_public: boolean;
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
  // is public
  is_public: boolean;
  // parent id
  parent_id: string;
  // parent public
  is_parent_public: boolean;
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
  channel_id: string;
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
  // Is public
  is_public: boolean;
  // The parent id to sent to.
  parent_id?: string;
  // is parent public
  is_parent_public?: string;
}

/** Last seen message by user */
export interface LastSeenMessageEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** The unique ID of this message. */
  message_id: string;
}

/** User is typing */
export interface MessageTypingEvent {
  /** The channel this message belongs to. */
  channel_id: string;
  // The mode
  mode: number;
  // The channel label
  channel_label: string;
  /** Message sender, usually a user ID. */
  sender_id: string;
  // Is public
  is_public: boolean;
  // The parent id to sent to.
  parent_id?: string;
  // is parent public
  is_parent_public?: string;
}

// user profile updated event
export interface UserProfileUpdatedEvent {
  // the user id
  user_id: string;
  // the display_name
  display_name: string;
  // the avatar
  avatar: string;
  // the about_me
  about_me: string;
  // the channel_id
  channel_id: string;
  // the clan_id
  clan_id: string;
}

/** An acknowledgement received in response to sending a message on a chat channel. */
export interface ChannelMessageAck {
  /** The server-assigned channel ID. */
  channel_id: string;
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
  /** DM channel user, for once call api getDMChannel */
  channelDM?: ApiChannelDescription
}

/** Send a message to a realtime chat channel. */
export interface ChannelMessageSend {
  channel_message_send: {
    /** Clan Id */
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id: string;
    // The mode
    mode: number;
    // channel label
    channel_label: string;
    /** The content payload. */
    content: any;
    //
    mentions?: Array<ApiMessageMention>;
    //
    attachments?: Array<ApiMessageAttachment>;
    //
    anonymous_message?: boolean;
    //
    mention_everyone?: boolean;
    //
    avatar: string;
    // Is public
    is_public: boolean;
    // The parent id to sent to.
    parent_id?: string;
    // is parent public
    is_parent_public?: boolean;
  };
}

/** Update a message previously sent to a realtime chat channel. */
export interface ChannelMessageUpdate {
  channel_message_update: {
    /** The server-assigned channel ID. */
    channel_id: string;
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
    // Is public
    is_public: boolean;
    // The parent id to sent to.
    parent_id?: string;
    // is parent public
    is_parent_public?: boolean;
  };
}

/** Remove a message previously sent to a realtime chat channel. */
export interface ChannelMessageRemove {
  channel_message_remove: {
    clan_id: string;
    /** The server-assigned channel ID. */
    channel_id: string;
    // The mode
    mode: number;
    // The channel label
    channel_label: string;
    /** A unique ID for the chat message to be removed. */
    message_id: string;
    // Is public
    is_public: boolean;
    // The parent id to sent to.
    parent_id?: string;
    // is parent public
    is_parent_public?: boolean;
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
  // parent public
  is_parent_public: boolean;
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

// clan updated event
export interface ClanUpdatedEvent {
  // the clan id
  clan_id: string;
  // the clan name
  clan_name: string;
  // the clan logo
  clan_logo: string;
}

export interface ClanProfileUpdatedEvent {
  // the user id
  user_id: string;
  // the clan_nick
  clan_nick: string;
  // the avatar
  clan_avatar: string;
  // the clan_id
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
export interface Rpc {
  rpc: ApiRpc;
}

/** Execute an Lua function on the server. */
export interface ApiRpc {
  //The authentication key used when executed as a non-client HTTP request.
  http_key?: string;
  //The identifier of the function.
  id?: string;
  //The payload of the function which must be a JSON object.
  payload?: string;
}

/** Application-level heartbeat ping. */
export interface Ping {}

/** A snapshot of statuses for some set of users. */
export interface Status {
  /** The user presences to view statuses of. */
  presences: Presence[];
}

/** Start receiving status updates for some set of users. */
export interface StatusFollow {
  /** The IDs of the users to follow. */
  status_follow: { user_ids: string[] };
}

/** A batch of status updates for a given user. */
export interface StatusPresenceEvent {
  /** This join information is in response to a subscription made to be notified when a user comes online. */
  joins: Presence[];
  /** This join information is in response to a subscription made to be notified when a user goes offline. */
  leaves: Presence[];
}

/** Stop receiving status updates for some set of users. */
export interface StatusUnfollow {
  /** The IDs of user to unfollow. */
  status_unfollow: { user_ids: string[] };
}

/** Set the user's own status. */
export interface StatusUpdate {
  /** Status string to set, if not present the user will appear offline. */
  status_update: { status?: string };
}

export interface ClanNameExistedEvent {
  clan_name: string;
  exist: boolean;
}

/**  */
export interface StrickerListedEvent {
  // clan id
  clan_id: string;
  // sticker data
  stickers?: Array<ClanSticker>;
}

/**  */
export interface ClanSticker {
  //
  category?: string;
  //
  clan_id?: string;
  //
  create_time?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  source?: string;
}

/**  */
export interface EmojiListedEvent {
  // clan id
  clan_id: string;
  // emoji data
  emoji_list?: Array<ClanEmoji>;
}

/**  */
export interface ClanEmoji {
  //
  category?: string;
  //
  creator_id?: string;
  //
  id?: string;
  //
  shortname?: string;
  //
  src?: string;
}

/**  */
export interface ChannelDescListEvent {
  //
  channeldesc?: Array<ChannelDescription>;
}

/**  */
export interface ChannelDescription {
  // The clan of this channel
  clan_id?: string;
  // The channel this message belongs to.
  channel_id?: string;
  // The channel type.
  type?: number;
  // The channel lable
  channel_label?: string;
  // The channel private
  channel_private?: number;
  // meeting code
  meeting_code?: string;
  //
  clan_name?: string;
  //
  parrent_id?: string;
}

// A list of Channel
export interface HashtagDmListEvent {
  // user Id
  user_id?: Array<string>;
  // Max number of records to return. Between 1 and 100.
  limit?: number;
  // A list of channel.
  hashtag_dm?: Array<HashtagDm>;
}

// hashtagDM
export interface HashtagDm {
  // The channel id.
  channel_id?: string;
  // The channel lable
  channel_label?: string;
  // The clan of this channel
  clan_id?: string;
  // The clan name
  clan_name?: string;
  //
  meeting_code?: string;
  //
  type?: number;
  //
  channel_private?: number;
  //
  parrent_id?: string;
}

export interface NotificationChannelSettingEvent {
  // The channel id.
  channel_id?: string;
  //
  notification_user_channel?: NotificationUserChannel;
}

export interface NotificationUserChannel {
  //
  active?: number;
  //
  id?: string;
  //
  notification_setting_type?: number;
  //
  time_mute?: string;
}

export interface NotificationCategorySettingEvent {
  //
  category_id?: string;
  //
  notification_user_channel?: NotificationUserChannel;
}

export interface NotificationClanSettingEvent {
  // The clan of this channel
  clan_id?: string;
  //
  notification_setting?: NotificationSetting;
}

export interface NotificationSetting {
  //
  id?: string;
  //
  notification_setting_type?: number;
}

export interface NotifiReactMessageEvent {
  //
  channel_id?: string;
  //
  notifi_react_message?: NotifiReactMessage;
}

export interface NotifiReactMessage {
  //
  id?: string;
  //
  user_id?: string;
  //
  channel_id_req?: string;
}

export interface AddClanUserEvent {
  //the clan id
  clan_id: string;
  // the user
  user: AddUsers;
}

/** A socket connection to Mezon server. */
export interface Socket {
  [key: string]: any;

  socketEvents: EventEmitter;
  /** Connection is Open */
  isOpen(): boolean;

  /** Connect to the server. */
  connect(session: Session, createStatus: boolean, connectTimeoutMs?: number, signal?: AbortSignal): Promise<Session>;

  /** Disconnect from the server. */
  disconnect(fireDisconnectEvent: boolean): void;

  /** Join clan chat */
  joinClanChat(clan_id: string): Promise<ClanJoin>;

  /** Join a chat channel on the server. */
  joinChat(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
    is_parent_public: boolean
  ): Promise<Channel>;

  /** Leave a chat channel on the server. */
  leaveChat(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    channel_type: number,
    is_public: boolean,
    is_parent_public: boolean
  ): Promise<void>;

  /** Remove a chat message from a chat channel on the server. */
  removeChatMessage(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    is_parent_public: boolean,
    message_id: string
  ): Promise<ChannelMessageAck>;

  /** Update a chat message on a chat channel in the server. */
  updateChatMessage(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    is_parent_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean
  ): Promise<ChannelMessageAck>;

  /** Update the status for the current user online. */
  updateStatus(status?: string): Promise<void>;

  /** Send a chat message to a chat channel on the server. */
  writeChatMessage(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    is_parent_public: boolean,
    content?: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    references?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string
  ): Promise<ChannelMessageAck>;

  /** Send message typing */
  writeMessageTyping(
    clan_id: string,
    parent_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    is_parent_public: boolean
  ): Promise<MessageTypingEvent>;

  /** Send message reaction */
  writeMessageReaction(
    id: string,
    clan_id: string,
    parent_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    is_parent_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean
  ): Promise<ApiMessageReaction>;

  /** Handle disconnect events received from the socket. */
  ondisconnect: (evt: CloseEvent) => void;

  /** Handle error events received from the socket. */
  onerror: (evt: ErrorEvent) => void;

  /**
   * An application-level heartbeat timeout that fires after the client does not receive a pong from the server after the heartbeat interval.
   * Most browsers maintain an internal heartbeat, in which case its unlikely you'll need to use this callback. However, Chrome does not implement an internal heartbeat.
   * We fire this separately from `onclose` because heartbeats fail when there's no connectivity, and many browsers don't fire `onclose` until the closing handshake either succeeds or fails.
   * In any case, be aware that `onclose` will still fire if there is a heartbeat timeout in a potentially delayed manner.
   */
  onheartbeattimeout: () => void;

}

/** Reports an error received from a socket message. */
export interface SocketError {
  /** The error code. */
  code: number;
  /** A message in English to help developers debug the response. */
  message: string;
}
