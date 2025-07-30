//Events socket will handle from MezonClient

// import { convertInternalEventToEvents } from "../utils/helper";

export enum InternalEventsSocket {
  VoiceStartedEvent = "voice_started_event",
  VoiceEndedEvent = "voice_ended_event",
  VoiceJoinedEvent = "voice_joined_event",
  VoiceLeavedEvent = "voice_leaved_event",
  ChannelCreatedEvent = "channel_created_event",
  ChannelDeletedEvent = "channel_deleted_event",
  ChannelUpdatedEvent = "channel_updated_event",
  ClanProfileUpdatedEvent = "clan_profile_updated_event",
  ClanUpdatedEvent = "clan_updated_event",
  StatusPresenceEvent = "status_presence_event",
  StreamPresenceEvent = "stream_presence_event",
  StreamData = "stream_data",
  ChannelMessage = "channel_message",
  MessageTypingEvent = "message_typing_event",
  MessageReactionEvent = "message_reaction_event",
  ChannelPresenceEvent = "channel_presence_event",
  LastPinMessageEvent = "last_pin_message_event",
  CustomStatusEvent = "custom_status_event",
  UserChannelAddedEvent = "user_channel_added_event",
  AddClanUserEvent = "add_clan_user_event",
  UserProfileUpdatedEvent = "user_profile_updated_event",
  UserChannelRemovedEvent = "user_channel_removed_event",
  UserClanRemovedEvent = "user_clan_removed_event",
  RoleEvent = "role_event",
  GiveCoffeeEvent = "give_coffee_event",
  RoleAssignEvent = "role_assign_event",
  TokenSend = "token_sent_event",
  ClanEventCreated = "clan_event_created",
  MessageButtonClicked = "message_button_clicked",
  StreamingJoinedEvent = "streaming_joined_event",
  StreamingLeavedEvent = "streaming_leaved_event",
  DropdownBoxSelected = "dropdown_box_selected",
  WebrtcSignalingFwd = "webrtc_signaling_fwd",
  Notifications = "notifications",
  QuickMenu = "quick_menu_event"
}

export enum Events {
  /** Listen to messages user sends on the  channel, thread */
  ChannelMessage = InternalEventsSocket.ChannelMessage,

  /** Listen to user react to messages on the channel, thread */
  MessageReaction = InternalEventsSocket.MessageReactionEvent,

  /** Listen to user react to messages on the channel, thread */
  UserChannelRemoved = InternalEventsSocket.UserChannelRemovedEvent,

  /** Listen to user leaved/removed in the channel */
  UserClanRemoved = InternalEventsSocket.UserClanRemovedEvent,

  /** Listen to user added in the channel */
  UserChannelAdded = InternalEventsSocket.UserChannelAddedEvent,

  /** Listen to channel created */
  ChannelCreated = InternalEventsSocket.ChannelCreatedEvent,

  /** Listen to channel deleted */
  ChannelDeleted = InternalEventsSocket.ChannelDeletedEvent,

  /** Listen to channel updated */
  ChannelUpdated = InternalEventsSocket.ChannelUpdatedEvent,

  /** Listen to clan create new role */
  RoleEvent = InternalEventsSocket.RoleEvent,

  /** Listen to users give coffee to each other */
  GiveCoffee = InternalEventsSocket.GiveCoffeeEvent,

  /** Listen to assigning a role to user */
  RoleAssign = InternalEventsSocket.RoleAssignEvent,

  /** Listen to user added in CLAN */
  AddClanUser = InternalEventsSocket.AddClanUserEvent,

  /** Listen to user send token to each other */
  TokenSend = InternalEventsSocket.TokenSend,

  /** Listen to clan create a new event */
  ClanEventCreated = InternalEventsSocket.ClanEventCreated,

  /** Listen to user lick a button on embed message */
  MessageButtonClicked = InternalEventsSocket.MessageButtonClicked,

  /** Listen to user joined a stream room */
  StreamingJoinedEvent = InternalEventsSocket.StreamingJoinedEvent,

  /** Listen to user leaved a stream room */
  StreamingLeavedEvent = InternalEventsSocket.StreamingLeavedEvent,

  /** Listen to user selected a input dropdown*/
  DropdownBoxSelected = InternalEventsSocket.DropdownBoxSelected,

  /** Listen to user accepted call 1-1 */
  WebrtcSignalingFwd = InternalEventsSocket.WebrtcSignalingFwd,

  /** Listen to start voice */
  VoiceStartedEvent = InternalEventsSocket.VoiceStartedEvent,

  /** Listen to end voice */
  VoiceEndedEvent = InternalEventsSocket.VoiceEndedEvent,

  /** Listen to user join voice room */
  VoiceJoinedEvent = InternalEventsSocket.VoiceJoinedEvent,

  /** Listen to user leave voice room */
  VoiceLeavedEvent = InternalEventsSocket.VoiceLeavedEvent,

  /** Listen to add friend */
  Notifications = InternalEventsSocket.Notifications,

  /** Listen to add quick menu */
  QuickMenu = InternalEventsSocket.QuickMenu
}

export enum ChannelType {
  CHANNEL_TYPE_CHANNEL = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_GMEET_VOICE = 4,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_STREAMING = 6,
  CHANNEL_TYPE_THREAD = 7,
  CHANNEL_TYPE_APP = 8,
  CHANNEL_TYPE_ANNOUNCEMENT = 9,
  CHANNEL_TYPE_MEZON_VOICE = 10
}

export enum ChannelStreamMode {
  STREAM_MODE_CHANNEL = 2,
  STREAM_MODE_GROUP = 3,
  STREAM_MODE_DM = 4,
  STREAM_MODE_CLAN = 5,
  STREAM_MODE_THREAD = 6,
}

export enum TypeMessage {
	Chat = 0,
	ChatUpdate = 1,
	ChatRemove = 2,
	Typing = 3,
	Indicator = 4,
	Welcome = 5,
	CreateThread = 6,
	CreatePin = 7,
	MessageBuzz = 8,
	Topic = 9,
	AuditLog = 10,
	SendToken = 11,
  Ephemeral = 12
}
