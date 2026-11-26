import { EventEmitter } from "events";
import tls from "node:tls";
import * as api from "../../src/api/api";
import * as tsproto from "../../src/rtapi/realtime";
import { MezonNetworkAdapter } from "../../src/transport/abridged_tcp_adapter";

class FakeSocket extends EventEmitter {
  destroyed = false;
  writes: Buffer[] = [];

  write(data: Buffer, callback?: (error?: Error | null) => void) {
    this.writes.push(Buffer.from(data));
    callback?.(null);
    return true;
  }

  destroy() {
    this.destroyed = true;
    return this;
  }
}

type EnvelopeInput = tsproto.DeepPartial<tsproto.Envelope>;

function connected() {
  const socket = new FakeSocket();
  jest
    .spyOn(tls, "connect")
    .mockReturnValueOnce(socket as unknown as tls.TLSSocket);
  const adapter = new MezonNetworkAdapter();
  adapter.connect("mezon.test", "443", false, "token");
  socket.emit("secureConnect");
  return { socket, adapter };
}

function sentPayload(input: EnvelopeInput) {
  const { socket, adapter } = connected();
  const before = socket.writes.length;
  adapter.send(input);
  expect(socket.writes).toHaveLength(before + 1);
  const frame = socket.writes[before];
  const headerLength = frame[0] < 0x7f ? 1 : 4;
  const words = headerLength === 1 ? frame[0] : frame.readUIntLE(1, 3);
  const payload = frame.subarray(headerLength);
  expect(payload.length).toBe(words * 4);
  return payload;
}

function serverUnpad(payload: Buffer) {
  let end = payload.length;
  while (end > 0 && payload[end - 1] === 0) end--;
  return tsproto.Envelope.decode(payload.subarray(0, end));
}

const createChannelBody = Buffer.from(
  api.CreateChannelDescRequest.encode(
    api.CreateChannelDescRequest.fromPartial({
      clan_id: "2125496467882774528",
      category_id: "2125496467937300480",
      type: 1,
      channel_label: "c1",
      user_ids: [],
    }),
  ).finish(),
);

const createChannel: EnvelopeInput = {
  cid: 7,
  api_request_event: {
    api_index: 66,
    api_name: "CreateChannelDesc",
    body: createChannelBody,
  },
};

describe("MezonNetworkAdapter send (mezon-sdk)", () => {
  afterEach(() => jest.restoreAllMocks());

  it("keeps a request whose body ends in a zero byte intact after the server strips trailing zeros", () => {
    expect(createChannelBody[createChannelBody.length - 1]).toBe(0);
    const unpatched = tsproto.Envelope.encode(
      tsproto.Envelope.fromPartial(createChannel),
    ).finish();
    expect(unpatched[unpatched.length - 1]).toBe(0);
    const decoded = serverUnpad(sentPayload(createChannel));
    expect(decoded.cid).toBe(7);
    expect(
      Buffer.from(decoded.api_request_event!.body).equals(createChannelBody),
    ).toBe(true);
  });

  it.each([1, 127, 128, 65535, 0x7fffffff])(
    "round-trips cid %i after the server strips trailing zeros",
    (cid) => {
      const decoded = serverUnpad(sentPayload({ ...createChannel, cid }));
      expect(decoded.cid).toBe(cid);
      expect(
        Buffer.from(decoded.api_request_event!.body).equals(createChannelBody),
      ).toBe(true);
    },
  );

  it("encodes an envelope with a cid to the same message", () => {
    const ack: EnvelopeInput = {
      cid: 9,
      channel_message_ack: {
        channel_id: "1840651530236071936",
        message_id: "1840651530236071937",
      },
    };
    const expected = tsproto.Envelope.decode(
      tsproto.Envelope.encode(tsproto.Envelope.fromPartial(ack)).finish(),
    );
    expect(serverUnpad(sentPayload(ack))).toEqual(expected);
  });

  it("sends a ping as the 3-byte ping frame", () => {
    const { socket, adapter } = connected();
    const before = socket.writes.length;
    adapter.send({ cid: 5, ping: {} });
    expect(socket.writes.slice(before)).toEqual([
      Buffer.from([0x00, 0x00, 0x05]),
    ]);
  });

  it("leaves an envelope without a cid unchanged", () => {
    const input: EnvelopeInput = {
      channel_message_send: {
        clan_id: "1",
        channel_id: "2",
        mode: 2,
        content: '{"t":"hi"}',
      },
    };
    const expected = Buffer.from(
      tsproto.Envelope.encode(tsproto.Envelope.fromPartial(input)).finish(),
    );
    const payload = sentPayload(input);
    expect(payload.subarray(0, expected.length).equals(expected)).toBe(true);
    expect(payload.subarray(expected.length).every((byte) => byte === 0)).toBe(
      true,
    );
  });
});
