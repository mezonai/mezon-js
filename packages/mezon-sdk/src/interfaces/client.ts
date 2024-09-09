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
  parrent_id?: string;
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

export interface ChannelMessageContent{
  t : string,
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

export interface Client {
  authenticate: () => Promise<string>;
  sendMessage: (clan_id: string, parent_id: string, channel_id: string, mode: number, is_public: boolean, is_parent_public: boolean, msg: ChannelMessageContent, mentions?: Array<ApiMessageMention>, attachments?: Array<ApiMessageAttachment>, ref?: Array<ApiMessageRef>) => Promise<boolean>;
  on: (event: string, func: Function) => void;
  remove: (event: string, func: Function) => void;
}
