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