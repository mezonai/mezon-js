import { MezonApi } from "../../src/api";
import * as tsproto from "../../src/api/api";
import * as rtproto from "../../src/rtapi/realtime";
import type { Session } from "../../src/session";
import { MezonTransport } from "../../src/socket";
import type { TransportAdapter } from "../../src/transport/transport_adapter";

const CHANNEL_ID = "1840651530236071936";

class FakeAdapter implements TransportAdapter {
  onClose: TransportAdapter["onClose"] = null;
  onError: TransportAdapter["onError"] = null;
  onMessage: TransportAdapter["onMessage"] = null;
  onOpen: TransportAdapter["onOpen"] = null;
  requests: Array<{ api_index: number; api_name: string; body: Uint8Array }> =
    [];
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

  send(message: any) {
    if (!message.api_request_event) return;
    this.requests.push(message.api_request_event);
    const response = this.reply(message.cid);
    Promise.resolve().then(() => this.onMessage?.(message.cid, 0, response));
  }
}

describe("getStreamPlayback", () => {
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

  it("sends GetStreamPlaybackRequest as API 213", async () => {
    await api.getStreamPlayback("", { channel_id: CHANNEL_ID, publish: true });

    expect(adapter.requests).toHaveLength(1);
    const [request] = adapter.requests;
    expect(request.api_index).toBe(213);
    expect(request.api_name).toBe("GetStreamPlayback");
    expect(tsproto.GetStreamPlaybackRequest.decode(request.body)).toEqual({
      channel_id: CHANNEL_ID,
      publish: true,
    });
  });

  it("decodes the grant from a padded raw response", async () => {
    const grant: tsproto.GetStreamPlaybackResponse = {
      token: "test-token",
      whip_url: `https://streaming.example.test/whip/${CHANNEL_ID}`,
      whep_url: "",
      hls_url: "",
      expires_at: "1793088000",
    };
    adapter.reply = () =>
      Buffer.concat([
        tsproto.GetStreamPlaybackResponse.encode(grant).finish(),
        Buffer.alloc(3),
      ]);

    await expect(
      api.getStreamPlayback("", { channel_id: CHANNEL_ID, publish: true }),
    ).resolves.toEqual(grant);
  });

  it("rejects with the server's error code", async () => {
    adapter.reply = (cid) =>
      rtproto.Envelope.fromPartial({
        cid,
        error: { code: 403, message: "not a channel member" },
      });

    await expect(
      api.getStreamPlayback("", { channel_id: CHANNEL_ID, publish: true }),
    ).rejects.toMatchObject({ error: { code: 403 } });
  });
});
