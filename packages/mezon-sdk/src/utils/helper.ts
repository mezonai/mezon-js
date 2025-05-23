import {
  ChannelStreamMode,
  ChannelType,
  InternalEventsSocket,
} from "../constants";

export function convertInternalEventToEvents(
  input: InternalEventsSocket
): string {
  return input.replace(/_event/g, "").replace(/_/g, "");
}

export function convertChanneltypeToChannelMode(channelType: string | number) {
  switch (Number(channelType)) {
    case ChannelType.CHANNEL_TYPE_DM:
      return ChannelStreamMode.STREAM_MODE_DM;
    case ChannelType.CHANNEL_TYPE_GROUP:
      return ChannelStreamMode.STREAM_MODE_GROUP;
    case ChannelType.CHANNEL_TYPE_CHANNEL:
      return ChannelStreamMode.STREAM_MODE_CHANNEL;
    case ChannelType.CHANNEL_TYPE_THREAD:
      return ChannelStreamMode.STREAM_MODE_THREAD;
  }

  return 0;
}

export function isValidUserId(userId: string | number) {
  if (typeof userId === "string" || typeof userId === "number") {
    const strId = userId.toString();

    return /^\d+$/.test(strId);
  }
  return false;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseUrlToHostAndSSL(urlStr: string): {
  host: string;
  port: string;
  useSSL: boolean;
} {
  const url = new URL(urlStr);
  return {
    host: url.hostname,
    port: url.port || (url.protocol === "https:" ? "443" : "80"),
    useSSL: url.protocol === "https:",
  };
}