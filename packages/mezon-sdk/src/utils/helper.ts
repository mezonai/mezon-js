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

export function parseUrlToHostAndSSL(url: string) {
  const trimmedUrl = url.trim();
  const isHttps = trimmedUrl.startsWith("https://");
  const isHttp = trimmedUrl.startsWith("http://");

  if (isHttps || isHttp) {
    const withoutScheme = trimmedUrl.replace(/^https?:\/\//, "");
    return {
      host: withoutScheme.replace(/\/$/, ""),
      useSSL: isHttps,
    };
  }

  return {
    host: trimmedUrl.replace(/\/$/, ""),
    useSSL: false,
  };
}