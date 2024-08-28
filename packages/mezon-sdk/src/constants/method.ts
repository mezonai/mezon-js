//Method socket will handle from MezonClient
export enum Events {
  ChannelMessage = "channelmessage",
  Disconnect = "disconnect",
  Error = "error",
  MessageReaction = "messagereaction",
  UserChannelRemoved = "userchannelremoved",
  UserClanRemoved = "userclanremoved",
  UserChannelAdded = "userchanneladded",
  ChannelCreated = "channelcreated",
  ChannelDeleted = "channeldeleted",
  ChannelUpdated = "channelupdated",
  HeartBeatTimeout = "heartbeattimeout",
}
