import { EventEmitter } from "events";
import tls from "node:tls";
import { MezonNetworkAdapter } from "../abridged_tcp_adapter";
import * as tsproto from "../rtapi/realtime";

class FakeSocket extends EventEmitter {
  destroyed = false;

  write() {
    return true;
  }

  destroy() {
    this.destroyed = true;
    return this;
  }
}

type Delivery = [cid: number, code: number, message: unknown];
type EnvelopeInput = tsproto.DeepPartial<tsproto.Envelope>;

const MB = 1 << 20;

function rawFrame(cid: number, code: number, payload: Buffer, fin = true) {
  const header = Buffer.alloc(11);
  header[0] = 0xff;
  header.writeUInt16BE(cid, 1);
  header.writeUInt32BE(((code << 16) | (fin ? 0xff : 0)) >>> 0, 3);
  header.writeUInt32BE(payload.length, 7);
  return Buffer.concat([header, payload]);
}

function encodeEnvelope(envelope: EnvelopeInput) {
  return Buffer.from(
    tsproto.Envelope.encode(tsproto.Envelope.fromPartial(envelope)).finish(),
  );
}

function abridgedFrame(envelope: EnvelopeInput) {
  const encoded = encodeEnvelope(envelope);
  const payload = Buffer.concat([
    encoded,
    Buffer.alloc((4 - (encoded.length % 4)) % 4),
  ]);
  const words = payload.length / 4;
  if (words < 0x7f) return Buffer.concat([Buffer.from([words]), payload]);
  const header = Buffer.alloc(4);
  header[0] = 0x7f;
  header.writeUIntLE(words, 1, 3);
  return Buffer.concat([header, payload]);
}

function webSocketFrame(envelope: EnvelopeInput) {
  const payload = encodeEnvelope(envelope);
  if (payload.length < 126) {
    return Buffer.concat([Buffer.from([0x82, payload.length]), payload]);
  }
  const header = Buffer.alloc(payload.length < 0x10000 ? 4 : 10);
  header[0] = 0x82;
  if (header.length === 4) {
    header[1] = 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header[1] = 127;
    header.writeUInt32BE(payload.length, 6);
  }
  return Buffer.concat([header, payload]);
}

function raw(cid: number, code: number, payload: Buffer): Delivery {
  return [cid, code, payload.toString("hex")];
}

function envelope(cid: number, input: EnvelopeInput): Delivery {
  return [cid, 0, tsproto.Envelope.decode(encodeEnvelope(input))];
}

function bytes(length: number, seed = 0) {
  return Buffer.from(
    Array.from({ length }, (_, index) => (index * 31 + seed) % 251),
  );
}

function chunks(data: Buffer, size: number) {
  const reads: Buffer[] = [];
  for (let offset = 0; offset < data.length; offset += size) {
    reads.push(data.subarray(offset, offset + size));
  }
  return reads;
}

function connect() {
  const socket = new FakeSocket();
  jest
    .spyOn(tls, "connect")
    .mockReturnValueOnce(socket as unknown as tls.TLSSocket);
  const adapter = new MezonNetworkAdapter();
  const received: Delivery[] = [];
  adapter.onMessage = (cid, code, message) => {
    received.push([
      cid,
      code,
      Buffer.isBuffer(message) ? message.toString("hex") : message,
    ]);
  };
  adapter.connect("mezon.test", "443", false, "token");
  return { received, socket };
}

function deliver(reads: Buffer[]) {
  const { received, socket } = connect();
  for (const read of reads) socket.emit("data", Buffer.from(read));
  return { received, socket };
}

const ack = {
  cid: 9,
  channel_message_ack: {
    channel_id: "1840651530236071936",
    message_id: "1840651530236071937",
  },
};
const message = {
  channel_message: {
    clan_id: "1",
    channel_id: "1840651530236071936",
    message_id: "1840651530236071938",
    content: "x".repeat(600),
  },
};
const joined = {
  streaming_joined_event: {
    clan_id: "1",
    streaming_channel_id: "1840651530236071936",
    user_id: "42",
    is_publisher: true,
  },
};
const joinedLong = {
  streaming_joined_event: {
    ...joined.streaming_joined_event,
    participant: "p".repeat(200),
  },
};

const frames: Array<[Buffer, Delivery]> = [
  [rawFrame(7, 0, bytes(40)), raw(7, 0, bytes(40))],
  [abridgedFrame(ack), envelope(9, ack)],
  [abridgedFrame(message), envelope(0, message)],
  [webSocketFrame(joined), envelope(0, joined)],
  [webSocketFrame(joinedLong), envelope(0, joinedLong)],
  [rawFrame(0, 0, bytes(17, 3)), raw(0, 0, bytes(17, 3))],
  [Buffer.from([0x00, 0x00, 0x03]), [3, 0, { pong: {} }]],
  [
    Buffer.concat([
      rawFrame(8, 0, bytes(30, 1), false),
      rawFrame(8, 0, bytes(30, 2), false),
      rawFrame(8, 0, bytes(5, 3)),
    ]),
    raw(8, 0, Buffer.concat([bytes(30, 1), bytes(30, 2), bytes(5, 3)])),
  ],
  [rawFrame(10, 403, Buffer.alloc(0)), raw(10, 403, Buffer.alloc(0))],
];
const stream = Buffer.concat(frames.map(([frame]) => frame));
const expected = frames.map(([, delivery]) => delivery);

describe("MezonNetworkAdapter TCP framing", () => {
  afterEach(() => jest.restoreAllMocks());

  it("delivers every frame of a single read, in order", () => {
    expect(deliver([stream]).received).toEqual(expected);
  });

  it("reassembles a stream split into two reads at every byte offset", () => {
    for (let offset = 1; offset < stream.length; offset++) {
      const { received } = deliver([
        stream.subarray(0, offset),
        stream.subarray(offset),
      ]);
      expect([offset, received]).toEqual([offset, expected]);
    }
  });

  it("reassembles a stream delivered byte by byte", () => {
    expect(deliver(chunks(stream, 1)).received).toEqual(expected);
  });

  it("delivers a frame and keeps the partial next frame for the next read", () => {
    const first = rawFrame(1, 0, bytes(12));
    const second = abridgedFrame(ack);
    const { received, socket } = connect();

    socket.emit("data", Buffer.concat([first, second.subarray(0, 5)]));
    expect(received).toEqual([raw(1, 0, bytes(12))]);

    socket.emit("data", second.subarray(5));
    expect(received).toEqual([raw(1, 0, bytes(12)), envelope(9, ack)]);
  });

  it("delivers an API response whose header and payload arrive in separate reads", () => {
    const frame = rawFrame(1, 0, bytes(428));
    expect(
      deliver([frame.subarray(0, 11), frame.subarray(11)]).received,
    ).toEqual([raw(1, 0, bytes(428))]);
  });

  it("reassembles 1 MB frames delivered in 16 KB reads", () => {
    const payload = bytes(MB, 5);
    const big = {
      channel_message: {
        ...message.channel_message,
        content: "y".repeat(1_000_000),
      },
    };
    const serverChunks = chunks(payload, 4096).map((chunk, index, all) =>
      rawFrame(12, 0, chunk, index === all.length - 1),
    );
    const data = Buffer.concat([
      rawFrame(11, 0, payload),
      abridgedFrame(big),
      webSocketFrame(big),
      ...serverChunks,
    ]);

    expect(deliver(chunks(data, 16 * 1024)).received).toEqual([
      raw(11, 0, payload),
      envelope(0, big),
      envelope(0, big),
      raw(12, 0, payload),
    ]);
  });

  it.each([
    ["an API frame over 16 MB", rawFrame(1, 0, Buffer.alloc(0)).fill(0xff, 7)],
    ["an abridged frame over 1 MB", Buffer.from([0x7f, 0x01, 0x00, 0x04])],
    [
      "a WebSocket frame over 1 MB",
      Buffer.from([0x82, 127, 0, 0, 0, 0, 0, 0x10, 0, 1]),
    ],
    ["a masked WebSocket frame", Buffer.from([0x82, 0x85, 1, 2, 3, 4])],
    ["an unknown lead byte", Buffer.from([0x80, 0, 0, 0])],
  ])("closes the connection on %s", (_name, frame) => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    const { received, socket } = deliver([
      Buffer.concat([frame, rawFrame(2, 0, bytes(4))]),
    ]);
    expect(received).toEqual([]);
    expect(socket.destroyed).toBe(true);
  });

  it("fails a response that grows past 16 MB with code 0xFFFF", () => {
    const chunk = rawFrame(13, 0, Buffer.alloc(4 * MB), false);
    const { received, socket } = deliver([chunk, chunk, chunk, chunk, chunk]);
    expect(received).toEqual([raw(13, 0xffff, Buffer.alloc(0))]);
    expect(socket.destroyed).toBe(false);
  });
});
