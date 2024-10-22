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
}

export enum ChannelType {
  CHANNEL_TYPE_TEXT = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_VOICE = 4,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_STREAMING = 6,
  CHANNEL_TYPE_APP = 7,
  CHANNEL_TYPE_ANNOUNCEMENT = 8,
  CHANNEL_TYPE_INVALID = 10
}

export enum ChannelStreamMode {
  STREAM_MODE_CHANNEL = 2,
  STREAM_MODE_GROUP = 3,
  STREAM_MODE_DM = 4,
}
