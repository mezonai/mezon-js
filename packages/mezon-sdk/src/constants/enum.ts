//Events socket will handle from MezonClient
export enum Events {
  ChannelMessage = "channelmessage",
  MessageReaction = "messagereaction",
  UserChannelRemoved = "userchannelremoved",
  UserClanRemoved = "userclanremoved",
  UserChannelAdded = "userchanneladded",
  ChannelCreated = "channelcreated",
  ChannelDeleted = "channeldeleted",
  ChannelUpdated = "channelupdated",
}


export enum ChannelType {
  CHANNEL_TYPE_TEXT = 1,
  CHANNEL_TYPE_GROUP = 2,
  CHANNEL_TYPE_DM = 3,
  CHANNEL_TYPE_VOICE = 4,
  CHANNEL_TYPE_FORUM = 5,
  CHANNEL_TYPE_ANNOUNCEMENT = 6,
  CHANNEL_TYPE_THREAD = 7,
}
