import { MezonApi } from "../../src/api";
import * as tsproto from "../../src/api/api";
import * as rtproto from "../../src/rtapi/realtime";
import { MezonClientCore } from "../../src/mezon-client/client/MezonClientCore";
import type { Session } from "../../src/session";
import { MezonTransport } from "../../src/socket";
import type { TransportAdapter } from "../../src/transport/transport_adapter";

const CHANNEL_ID = "1840651530236071936";

class FakeAdapter implements TransportAdapter {
  onClose: TransportAdapter["onClose"] = null;
  onError: TransportAdapter["onError"] = null;
  onMessage: TransportAdapter["onMessage"] = null;
  onOpen: TransportAdapter["onOpen"] = null;
  requests: Array<{ api_index: number; api_name: string; body: Uint8Array }> = [];
  reply: (cid: number) => unknown = () => Buffer.alloc(0);
  private open = false;

  isOpen() {
    return this.open;
  }

  close() {
    this.open = false;
  }

  connect() {
    this.open = true;
    this.onOpen?.({} as Event);
  }

  send(message: unknown) {
    const msg = message as {
      cid: number;
      api_request_event?: { api_index: number; api_name: string; body: Uint8Array };
    };
    if (!msg.api_request_event) return;
    this.requests.push(msg.api_request_event);
    const response = this.reply(msg.cid);
    Promise.resolve().then(() => this.onMessage?.(msg.cid, 0, response));
  }
}

describe("generateMeetToken", () => {
  let adapter: FakeAdapter;
  let transport: MezonTransport;
  let api: MezonApi;

  beforeEach(async () => {
    jest.useFakeTimers();
    adapter = new FakeAdapter();
    transport = new MezonTransport("", "", false, adapter);
    await transport.connect({ token: "" } as Session);
    api = new MezonApi("", "", 1000);
    api.setTransport(transport);
  });

  afterEach(() => {
    transport.disconnect(false);
    jest.useRealTimers();
  });

  it("accepts partial request without current_endpoint_id and omits tag 4 on the wire", async () => {
    await api.generateMeetToken("", {
      channel_id: CHANNEL_ID,
      room_name: "voice-1",
      metadata: "bot;",
    });

    expect(adapter.requests).toHaveLength(1);
    const [req] = adapter.requests;
    expect(req.api_index).toBe(165);
    expect(req.api_name).toBe("GenerateMeetToken");
    expect(tsproto.GenerateMeetTokenRequest.decode(req.body)).toEqual({
      channel_id: CHANNEL_ID,
      room_name: "voice-1",
      metadata: "bot;",
      current_endpoint_id: 0,
    });
    const hasField4Tag = Buffer.from(req.body).includes(Buffer.from([0x20, 0x00]));
    expect(hasField4Tag).toBe(false);
  });

  it("explicitly encodes current_endpoint_id 0 as field 4 varint 0 on the wire", async () => {
    await api.generateMeetToken("", {
      channel_id: CHANNEL_ID,
      room_name: "voice-1",
      metadata: "bot;",
      current_endpoint_id: 0,
    });

    expect(adapter.requests).toHaveLength(1);
    const [req] = adapter.requests;
    const raw = Buffer.from(req.body);
    expect(raw.subarray(raw.length - 2)).toEqual(Buffer.from([0x20, 0x00]));
    expect(tsproto.GenerateMeetTokenRequest.decode(req.body)).toEqual({
      channel_id: CHANNEL_ID,
      room_name: "voice-1",
      metadata: "bot;",
      current_endpoint_id: 0,
    });
  });

  it("encodes positive current_endpoint_id", async () => {
    await api.generateMeetToken("", {
      channel_id: CHANNEL_ID,
      room_name: "voice-1",
      metadata: "bot;",
      current_endpoint_id: 4,
    });

    const [req] = adapter.requests;
    expect(tsproto.GenerateMeetTokenRequest.decode(req.body).current_endpoint_id).toBe(4);
  });

  it("decodes protobuf GenerateMeetTokenResponse and legacy raw JWT replies", async () => {
    const protoReply: tsproto.GenerateMeetTokenResponse = {
      token: "jwt-proto",
      url: "wss://sfu.mezon.test/ws",
    };
    adapter.reply = () =>
      Buffer.concat([
        tsproto.GenerateMeetTokenResponse.encode(protoReply).finish(),
        Buffer.alloc(2),
      ]);
    await expect(
      api.generateMeetToken("", { channel_id: CHANNEL_ID }),
    ).resolves.toEqual(protoReply);

    adapter.reply = () => Buffer.from("eyJhbGciOiJIUzI1NiJ9.payload.sig", "utf8");
    await expect(
      api.generateMeetToken("", { channel_id: CHANNEL_ID }),
    ).resolves.toEqual({
      token: "eyJhbGciOiJIUzI1NiJ9.payload.sig",
      url: "",
    });
  });

  it("throws when body is null or undefined and rejects on server errors", async () => {
    await expect(
      api.generateMeetToken("", null as unknown as tsproto.GenerateMeetTokenRequest),
    ).rejects.toThrow("'body' is a required parameter");

    adapter.reply = (cid) =>
      rtproto.Envelope.fromPartial({
        cid,
        error: { code: 403, message: "not a voice channel" },
      });
    await expect(
      api.generateMeetToken("", { channel_id: CHANNEL_ID }),
    ).rejects.toMatchObject({ error: { code: 403 } });
  });

  it("forwards MezonClientCore.generateMeetToken with active session and returns undefined without session", async () => {
    const core = Object.create(MezonClientCore.prototype) as MezonClientCore;
    const coreInternals = core as unknown as {
      apiClient: MezonApi;
      sessionManager: { getSession: () => { token: string; isexpired: () => boolean } | undefined };
    };
    coreInternals.apiClient = api;
    coreInternals.sessionManager = {
      getSession: () => undefined,
    };

    await expect(core.generateMeetToken({ channel_id: CHANNEL_ID })).resolves.toBeUndefined();

    const validSession = {
      token: "session-jwt",
      isexpired: () => false,
    };
    coreInternals.sessionManager = {
      getSession: () => validSession,
    };
    const expected: tsproto.GenerateMeetTokenResponse = {
      token: "meet-jwt",
      url: "wss://sfu.mezon.test/ws",
    };
    adapter.reply = () => tsproto.GenerateMeetTokenResponse.encode(expected).finish();

    await expect(
      core.generateMeetToken({ channel_id: CHANNEL_ID, current_endpoint_id: 0 }),
    ).resolves.toEqual(expected);
    const raw = Buffer.from(adapter.requests[adapter.requests.length - 1].body);
    expect(raw.subarray(raw.length - 2)).toEqual(Buffer.from([0x20, 0x00]));
  });
});
