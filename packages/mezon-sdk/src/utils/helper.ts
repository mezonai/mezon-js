import {
  ChannelStreamMode,
  ChannelType,
  InternalEventsSocket,
} from "../constants";

let sequence = BigInt("0");
let lastTimestamp = BigInt("0");

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
    case ChannelType.CHANNEL_TYPE_APP:
    case ChannelType.CHANNEL_TYPE_MEZON_VOICE:
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

export function generateSnowflakeId(): string {
  const epoch = BigInt("1577836800000");
  const timestamp = BigInt(Date.now().toString());

  if (timestamp === lastTimestamp) {
    sequence = sequence + BigInt("1");
  } else {
    sequence = BigInt("0");
    lastTimestamp = timestamp;
  }

  const workerId = BigInt("1");
  const dataCenterId = BigInt("1");

  const snowflakeId =
    ((timestamp - epoch) << BigInt("22")) |
    (dataCenterId << BigInt("17")) |
    (workerId << BigInt("12")) |
    sequence;

  return snowflakeId.toString();
}

export async function waitFor2nTimeout<T>(
  action: () => Promise<T>,
  maxAttempts = 10
): Promise<T> {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      console.log(`Attempt ${attempt}/${maxAttempts}...`);
      const result = await action();
      console.log("Action successful!");
      return result;
    } catch (error: any) {
      const isLast = attempt >= maxAttempts;

      if (isLast) {
        console.error(`Attempt ${attempt} failed. Max attempts reached.`);
        throw error;
      }

      const seconds = Math.min(2 ** (attempt - 1), 64);
      console.warn(
        `Attempt ${attempt} failed: ${error?.message || error}. ` +
          `Retrying in ${seconds}s...`
      );
      await sleep(seconds * 1000);
      attempt++;
    }
  }

  throw new Error("Unreachable");
}
