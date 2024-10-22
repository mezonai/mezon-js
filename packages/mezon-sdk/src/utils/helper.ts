import { ChannelStreamMode, ChannelType, InternalEventsSocket } from "../constants";

export function convertInternalEventToEvents(input :InternalEventsSocket) : string{
    return input.replace(/_event/g, '').replace(/_/g, '');
}


export function convertChanneltypeToChannelMode(channelType : string | number){
    switch (Number(channelType)) {
      case ChannelType.CHANNEL_TYPE_DM:
        return ChannelStreamMode.STREAM_MODE_DM;
      case ChannelType.CHANNEL_TYPE_GROUP:
        return ChannelStreamMode.STREAM_MODE_GROUP;
      case ChannelType.CHANNEL_TYPE_TEXT:
        return ChannelStreamMode.STREAM_MODE_CHANNEL;
    }

    return false;
}

export function convertChannelModeToChannelType(channelMode: string | number) {
  switch (Number(channelMode)) {
    case ChannelStreamMode.STREAM_MODE_DM:
      return ChannelType.CHANNEL_TYPE_DM;
    case ChannelStreamMode.STREAM_MODE_GROUP:
      return ChannelType.CHANNEL_TYPE_GROUP;
    case ChannelStreamMode.STREAM_MODE_CHANNEL:
      return ChannelType.CHANNEL_TYPE_TEXT;
    default:
      return ChannelType.CHANNEL_TYPE_INVALID;
  }
}

export function isValidUserId(userId: string | number) {
  if (typeof userId === "string" || typeof userId === "number") {
    const strId = userId.toString();

    return /^\d+$/.test(strId);
  }
  return false; 
}