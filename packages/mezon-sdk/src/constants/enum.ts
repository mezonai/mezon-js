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
}

export enum Events {
  ChannelMessage = InternalEventsSocket.ChannelMessage,
  MessageReaction = InternalEventsSocket.MessageReactionEvent,
  UserChannelRemoved = InternalEventsSocket.UserChannelRemovedEvent,
  UserClanRemoved = InternalEventsSocket.UserClanRemovedEvent,
  UserChannelAdded = InternalEventsSocket.UserChannelAddedEvent,
  ChannelCreated = InternalEventsSocket.ChannelCreatedEvent,
  ChannelDeleted = InternalEventsSocket.ChannelDeletedEvent,
  ChannelUpdated = InternalEventsSocket.ChannelUpdatedEvent,
  RoleEvent = InternalEventsSocket.RoleEvent,
  GiveCoffee = InternalEventsSocket.GiveCoffeeEvent,
  RoleAssign = InternalEventsSocket.RoleAssignEvent,
  AddClanUser = InternalEventsSocket.AddClanUserEvent,
  TokenSend = InternalEventsSocket.TokenSend,
  ClanEventCreated = InternalEventsSocket.ClanEventCreated,
  MessageButtonClicked = InternalEventsSocket.MessageButtonClicked,
  StreamingJoinedEvent = InternalEventsSocket.StreamingJoinedEvent,
  StreamingLeavedEvent = InternalEventsSocket.StreamingLeavedEvent,
  DropdownBoxSelected = InternalEventsSocket.DropdownBoxSelected,
  WebrtcSignalingFwd = InternalEventsSocket.WebrtcSignalingFwd,
}

export enum ChannelType {
  CHANNEL_TYPE_TEXT = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_VOICE = 4,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_STREAMING = 6,
  CHANNEL_TYPE_THREAD = 7,
  CHANNEL_TYPE_APP = 8,
  CHANNEL_TYPE_ANNOUNCEMENT = 9,
}

export enum ChannelStreamMode {
  STREAM_MODE_CHANNEL = 2,
  STREAM_MODE_GROUP = 3,
  STREAM_MODE_DM = 4,
}
