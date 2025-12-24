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
  let delay = 5000;
  const maxDelay = 60000;

  while (attempt <= maxAttempts) {
    try {
      if (attempt > 1) {
        await sleep(delay);
      }

      const result = await action();
      console.log("Action successful!");
      return result;
    } catch (error: any) {
      if (attempt >= maxAttempts) {
        console.error("Max attempts reached.");
        throw error;
      }

      console.warn(`Attempt ${attempt} failed at ${new Date().toLocaleString()}: ${JSON.stringify(error??{})}\nAttempt ${attempt+1} is running...`);

      delay = Math.min(delay * 2, maxDelay);
      attempt++;
    }
  }

  throw new Error("Unreachable");
}
