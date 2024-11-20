import { ChannelMessageAck } from "./socket";

/**  */
export interface ApiChannelDescription {
  //
  active?: number;
  //
  category_id?: string;
  //
  category_name?: string;
  //
  channel_avatar?: Array<string>;
  //The channel this message belongs to.
  channel_id?: string;
  //
  channel_label?: string;
  //
  channel_private?: number;
  //
  clan_id?: string;
  //
  count_mess_unread?: number;
  //
  create_time_seconds?: number;
  //creator ID.
  creator_id?: string;
  //
  creator_name?: string;
  //
  last_pin_message?: string;
  //
  last_seen_message?: ApiChannelMessageHeader;
  //
  last_sent_message?: ApiChannelMessageHeader;
  //
  meeting_code?: string;
  //
  meeting_uri?: string;
  //The parrent channel this message belongs to.
  parent_id?: string;
  //
  status?: number;
  //The channel type.
  type?: number;
  //
  update_time_seconds?: number;
  //
  user_id?: Array<string>;
  //
  usernames?: string;
}

export interface MessagePayLoad {
  clan_id: string;
  channel_id: string;
  mode: number;
  is_public: boolean;
  msg: ChannelMessageContent;
  mentions?: Array<ApiMessageMention>;
  attachments?: Array<ApiMessageAttachment>;
  ref?: Array<ApiMessageRef>;
}


export interface MessageUserPayLoad {
  userId: string;
  msg: string;
  messOptions?: {[x: string]: any} ;
  attachments?: Array<ApiMessageAttachment>;
  refs?: Array<ApiMessageRef>;
}

export interface ApiCreateChannelDescRequest {
    //
    category_id?: string;
    //The channel this message belongs to.
    channel_id?: string;
    //
    channel_label?: string;
    //
    channel_private?: number;
    //
    clan_id?: string;
    //The parrent channel this message belongs to.
    parrent_id?: string;
    //The channel type.
    type?: number;
    //The users to add.
    user_ids?: Array<string>;
  }

/**  */
export interface ApiChannelMessageHeader {
  //
  attachment?: string;
  //
  content?: string;
  //
  id?: string;
  //
  mention?: string;
  //
  reaction?: string;
  //
  referece?: string;
  //
  sender_id?: string;
  //
  timestamp_seconds?: number;
}

export interface ClanDesc {
  //
  banner?: string;
  //
  clan_id?: string;
  //
  clan_name?: string;
  //
  creator_id?: string;
  //
  logo?: string;
  //
  status?: number;
}

/**  */
export interface ApiMessageAttachment {
  //
  filename?: string;
  //
  filetype?: string;
  //
  height?: number;
  //
  size?: number;
  //
  url?: string;
  //
  width?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
}

/**  */
export interface ApiMessageDeleted {
  //
  deletor?: string;
  //
  message_id?: string;
}

/**  */
export interface ApiMessageMention {
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time?: string;
  //
  id?: string;
  //
  user_id?: string;
  //
  username?: string;
  // role id
  role_id?: string;
  // role name
  rolename?: string;
  // start position
  s?: number;
  // end position
  e?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
  /** Message sender, usually a user ID. */
  sender_id?: string;
}

/**  */
export interface ApiMessageReaction {
  //
  action?: boolean;
  //
  emoji_id?: string;
  //
  emoji?: string;
  //
  id?: string;
  //
  sender_id?: string;
  //
  sender_name?: string;
  //
  sender_avatar?: string;
  // count of emoji
  count?: number;
  /** The channel this message belongs to. */
  channel_id?:string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
  /** The message that user react */
  message_id?: string;
}

/**  */
export interface ApiMessageRef {
  //
  message_id?: string;
  //
  message_ref_id?: string;
  //
  ref_type?: number;
  //
  message_sender_id?: string;
  // original message sendre username
  message_sender_username?: string;
  // original message sender avatar
  mesages_sender_avatar?: string;
  // original sender clan nick name
  message_sender_clan_nick?: string;
  // original sender display name
  message_sender_display_name?:string;
  //
  content?:string;
  //
  has_attachment?: boolean;
  /** The channel this message belongs to. */
  channel_id?: string;
  // The mode
  mode?: number;
  // The channel label
  channel_label?: string;
}

export interface ApiVoiceChannelUserList {
  //
  voice_channel_users?: Array<ApiVoiceChannelUser>;
}

export interface ApiVoiceChannelUser {
  //Cursor for the next page of results, if any.
  id?: string;
  //
  channel_id?: string;
  //
  participant?: string;
  //User for a channel.
  user_id?: string;
}

export interface IEmbedProps {
	color?: string;
	title?: string;
	url?: string;
	author?: {
		name: string;
		icon_url?: string;
		url?: string;
	};
	description?: string;
	thumbnail?: { url: string };
	fields?: Array<{ name: string; value: string; inline?: boolean }>;
	image?: { url: string };
	timestamp?: string;
	footer?: { text: string; icon_url?: string };
}

export enum EButtonMessageStyle {
	PRIMARY = 1,
	SECONDARY = 2,
	SUCCESS = 3,
	DANGER = 4,
	LINK = 5
}

export enum EMessageComponentType {
	BUTTON = 1,
	SELECT = 2,
	INPUT = 3
}

export interface IButtonMessage {
	label: string;
	disable?: boolean;
	style?: EButtonMessageStyle;
	url?: string;
}

export interface IMessageSelect {
	// some select specific properties
}

export interface IMessageInput {
	// some input specific properties
}

export interface IMessageComponent<T> {
	type: EMessageComponentType;
	id: string;
	component: T;
}

export type ButtonComponent = IMessageComponent<IButtonMessage> & { type: EMessageComponentType.BUTTON };
export type SelectComponent = IMessageComponent<IMessageSelect> & { type: EMessageComponentType.SELECT };
export type InputComponent = IMessageComponent<IMessageInput> & { type: EMessageComponentType.INPUT };

export interface IMessageActionRow {
	components: Array<ButtonComponent | SelectComponent | InputComponent>;
}

export interface ChannelMessageContent {
  t?: string;
  contentThread?: string;
  hg?: HashtagOnMessage[];
  ej?: EmojiOnMessage[];
  lk?: LinkOnMessage[];
  mk?: MarkdownOnMessage[];
  vk?: LinkVoiceRoomOnMessage[];
  embed?: IEmbedProps[];
	components?: IMessageActionRow[] | any;
}

export interface StreamingLeavedEvent {
  /** id */
  id: string;
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** streaming channel name */
  streaming_channel_id: string;
  /** streaming user_id */
  streaming_user_id: string;
}

/** Streaming Joined event */
export interface StreamingJoinedEvent {
  /** The unique identifier of the chat clan. */
  clan_id: string;
  /** The channel name */
  clan_name: string;
  /** id streaming */
  id: string;
  /** streaming participant */
  participant: string;
  /** user id */
  user_id: string;
  /** streaming channel label */
  streaming_channel_label: string;
  /** streaming channel id */
  streaming_channel_id: string;
}

export interface HashtagOnMessage extends Hashtag, StartEndIndex {}
export interface EmojiOnMessage extends Emoji, StartEndIndex {}
export type LinkOnMessage = StartEndIndex;
export interface MarkdownOnMessage extends Markdown, StartEndIndex {}
export type LinkVoiceRoomOnMessage = StartEndIndex;

export interface StartEndIndex {
  s?: number | undefined;
  e?: number | undefined;
}

export interface Hashtag {
  channelid: string | undefined;
}
export interface Emoji {
  emojiid: string | undefined;
}

export interface Markdown {
  type?: EMarkdownType;
}

export enum EMarkdownType {
  TRIPLE = "t",
  SINGLE = "s",
}

/** A message sent on a channel. */
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
  content: ChannelMessageContent;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the message was created.
  create_time: string;
  //
  reactions?: Array<ApiMessageReaction>;
  //
  mentions?: Array<ApiMessageMention>;
  //
  attachments?: Array<ApiMessageAttachment>;
  //
  references?: Array<ApiMessageRef>;
  //
  referenced_message?: ChannelMessage;
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
}

/** A user in the server. */
export interface ApiUser {
  //
  about_me?: string;
  //The Apple Sign In ID in the user's account.
  apple_id?: string;
  //A URL for an avatar image.
  avatar_url?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was created.
  create_time?: string;
  //The display name of the user.
  display_name?: string;
  //Number of related edges to this user.
  edge_count?: number;
  //The Facebook id in the user's account.
  facebook_id?: string;
  //The Apple Game Center in of the user's account.
  gamecenter_id?: string;
  //The Google id in the user's account.
  google_id?: string;
  //The id of the user's account.
  id?: string;
  //
  join_time?: string;
  //The language expected to be a tag which follows the BCP-47 spec.
  lang_tag?: string;
  //The location set by the user.
  location?: string;
  //Additional information stored as a JSON object.
  metadata?: string;
  //Indicates whether the user is currently online.
  online?: boolean;
  //The Steam id in the user's account.
  steam_id?: string;
  //The timezone set by the user.
  timezone?: string;
  //The UNIX time (for gRPC clients) or ISO string (for REST clients) when the user was last updated.
  update_time?: string;
  //The username of the user's account.
  username?: string;
}

export interface ApiRegisterStreamingChannelRequest {
  //
  channel_id?: string;
  //
  clan_id?: string;
}

/**  */
export interface ApiRegisterStreamingChannelResponse {
  //
  channel_id?: string;
  //
  clan_id?: string;
  //
  streaming_url?: string;
}

export interface TokenSentEvent {
  // sender id
  sender_id: string;
  // sender name
  sender_name: string;
  // receiver
  receiver_id: string;
  // amount of token
  amount: number;
  // note of token
  note?: string;
}

export interface Client {
  authenticate: () => Promise<string>;
  sendMessage: (clan_id: string, channel_id: string, mode: number, is_public: boolean, msg: ChannelMessageContent, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, ref?: Array<ApiMessageRef>) => Promise<ChannelMessageAck>;
  on: (event: string, func: Function) => void;
  remove: (event: string, func: (...args: any[]) => void) => void;
  sendDMChannelMessage: (userId: string, msg: string, messOptions: {[x: string]: any}, attachments: Array<ApiMessageAttachment>, refs: Array<ApiMessageRef>) => Promise<ChannelMessageAck>; 
}
