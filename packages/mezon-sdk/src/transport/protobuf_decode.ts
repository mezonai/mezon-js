import * as rtproto from "../rtapi/realtime";

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
  } catch (err) {
    console.error("TCP Protobuf Decode Error:", err);
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
