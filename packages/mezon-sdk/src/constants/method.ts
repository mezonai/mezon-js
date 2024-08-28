//Method socket will handle from MezonClient
export enum SOCKETMETHOD {
  CHANNEL_MESSAGE = "channelmessage",
  DISCONNECT = "disconnect",
  ERROR = "error",
  MESSAGE_REACTION = "messagereaction",
  USER_CHANNEL_REMOVED = "userchannelremoved",
  USER_CLAN_REMOVED = "userclanremoved",
  USER_CHANNEL_ADDED = "userchanneladded",
  CHANNEL_CREARTED = "channelcreated",
  CHANNEL_DELETED = "channeldeleted",
  CHANNEL_UPDATED = "channelupdated",
  HEART_BEAT_TIMEOUT = "heartbeattimeout",
}
