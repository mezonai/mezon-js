import * as rtproto from "../rtapi/realtime";

const MAX_PROTOBUF_MESSAGE_LENGTH = 1 << 20;

export function readVarint(
  payload: Buffer | Uint8Array,
): { value: number; bytesRead: number } | null {
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  let value = 0;
  let shift = 0;

  for (let index = 0; index < bytes.length; index++) {
    if (shift >= 64) return null;
    const byte = bytes[index];
    value += (byte & 0x7f) * Math.pow(2, shift);
    if ((byte & 0x80) === 0) {
      return { value, bytesRead: index + 1 };
    }
    shift += 7;
  }

  return null;
}

export function protobufMessageLength(
  payload: Buffer | Uint8Array,
  maxLength = MAX_PROTOBUF_MESSAGE_LENGTH,
): number | null {
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  let position = 0;

  while (position < bytes.length) {
    const tag = readVarint(bytes.subarray(position));
    if (!tag) return null;

    const field = Math.floor(tag.value / 8);
    const wireType = tag.value & 7;
    if (field === 0 || wireType === 3 || wireType === 4 || wireType > 5) {
      return position;
    }

    const valueStart = position + tag.bytesRead;
    let valueEnd: number;
    switch (wireType) {
      case 0: {
        const value = readVarint(bytes.subarray(valueStart));
        if (!value) return null;
        valueEnd = valueStart + value.bytesRead;
        break;
      }
      case 1:
        valueEnd = valueStart + 8;
        break;
      case 2: {
        const length = readVarint(bytes.subarray(valueStart));
        if (!length || length.value > maxLength) {
          return position;
        }
        valueEnd =
          valueStart + length.bytesRead + Number(length.value);
        break;
      }
      case 5:
        valueEnd = valueStart + 4;
        break;
      default:
        return position;
    }

    if (valueEnd > bytes.length) return null;
    position = valueEnd;
  }

  return position;
}

export function realtimePayload(
  payload: Buffer | Uint8Array,
): Uint8Array {
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  const length = protobufMessageLength(bytes);
  return new Uint8Array(bytes.subarray(0, length ?? bytes.length));
}

export function scanRealtimeCid(
  payload: Buffer | Uint8Array,
): number {
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  if (bytes[0] !== 0x08) return 0;
  const cid = readVarint(bytes.subarray(1));
  if (!cid) return 0;
  const value = cid.value >>> 0;
  return value > 0x7fffffff ? value - 0x100000000 : value;
}

export function trimAbridgedPadding(payload: Buffer | Uint8Array): Uint8Array {
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  let end = bytes.length;
  while (end > 0 && bytes[end - 1] === 0) {
    end--;
  }
  return new Uint8Array(bytes.subarray(0, end));
}

export function decodeEnvelopePayload(payload: Buffer | Uint8Array): rtproto.Envelope {
  const trimmed = trimAbridgedPadding(payload);
  try {
    return rtproto.Envelope.decode(trimmed);
  } catch (err) {
    if (trimmed.length !== (Buffer.isBuffer(payload) ? payload.length : payload.byteLength)) {
      return rtproto.Envelope.decode(
        Buffer.isBuffer(payload) ? new Uint8Array(payload) : payload,
      );
    }
    throw err;
  }
}

export function decodeEnvelopePayloadLenient(
  payload: Buffer | Uint8Array,
): rtproto.Envelope | null {
  const bytes = trimAbridgedPadding(payload);
  const originalAckDecode = rtproto.ChannelMessageAck.decode.bind(
    rtproto.ChannelMessageAck,
  );

  rtproto.ChannelMessageAck.decode = ((input: any, length?: number) => {
    try {
      return originalAckDecode(input, length);
    } catch {
      return rtproto.ChannelMessageAck.fromPartial({});
    }
  }) as typeof rtproto.ChannelMessageAck.decode;

  try {
    return rtproto.Envelope.decode(bytes);
  } catch {
    return null;
  } finally {
    rtproto.ChannelMessageAck.decode = originalAckDecode;
  }
}

export function decodeChannelMessageAckPayload(
  payload: Buffer | Uint8Array,
): rtproto.ChannelMessageAck {
  const bytes = Buffer.isBuffer(payload) ? new Uint8Array(payload) : payload;

  try {
    return rtproto.ChannelMessageAck.decode(bytes);
  } catch {
    // Abridged API payloads may include 4-byte alignment padding.
  }

  const trimmed = trimAbridgedPadding(bytes);
  try {
    return rtproto.ChannelMessageAck.decode(trimmed);
  } catch {
    // Some endpoints may return an Envelope wrapper.
  }

  const envelope = decodeEnvelopePayload(bytes);
  if (!envelope.channel_message_ack) {
    throw new Error("Response does not contain channel_message_ack.");
  }
  return envelope.channel_message_ack;
}
