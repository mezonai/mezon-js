import fs from "node:fs";
import path from "node:path";
import { MezonApi } from "../../src/api";
import * as tsproto from "../../src/api/api";
import * as rtproto from "../../src/rtapi/realtime";
import { ApiNameEnum } from "../../src/constants/api_name_enum";
import type { ApiClanDesc } from "../../src/interfaces";
import { MezonClientCore } from "../../src/mezon-client/client/MezonClientCore";
import type { Session } from "../../src/session";
import { MezonTransport } from "../../src/socket";
import type { TransportAdapter } from "../../src/transport/transport_adapter";

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

describe("mezon-sdk protocol parity and CDN signature", () => {
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

  it("keeps ApiNameEnum aligned with canonical indexes 0..222", () => {
    expect(ApiNameEnum.ListChannelDescs).toBe(0);
    expect(ApiNameEnum.ListQuickMenuAccess).toBe(12);
    expect(ApiNameEnum.GenerateMeetToken).toBe(165);
    expect(ApiNameEnum.GenerateCDNSignature).toBe(212);
    expect(ApiNameEnum.GetStreamPlayback).toBe(213);
    expect(ApiNameEnum.LinkCDNFile).toBe(214);
    expect(ApiNameEnum.SfuBreakoutRoom).toBe(215);
    expect(ApiNameEnum.RedeemProPlanCoupon).toBe(222);
    expect(ApiNameEnum.ListJoinPending).toBe(223);
    expect(ApiNameEnum.ReviewJoinPending).toBe(224);
    expect(ApiNameEnum.ReviewVoiceJoin).toBe(225);
    expect(ApiNameEnum.ListUserDecorations).toBe(226);
    expect(ApiNameEnum.UpdateUserDecoration).toBe(227);
  });

  it("keeps generated protobuf copies identical to mezon-js-protobuf", () => {
    const sdkSrc = path.resolve(__dirname, "../../src");
    const pbDir = path.resolve(__dirname, "../../../mezon-js-protobuf");
    expect(
      fs.readFileSync(path.join(sdkSrc, "api/api.ts")).equals(
        fs.readFileSync(path.join(pbDir, "api/api.ts")),
      ),
    ).toBe(true);
    expect(
      fs.readFileSync(path.join(sdkSrc, "rtapi/realtime.ts")).equals(
        fs.readFileSync(path.join(pbDir, "rtapi/realtime.ts")),
      ),
    ).toBe(true);
  });

  it("sends GenerateCDNSignature (API 212) and decodes padded response", async () => {
    const sigReply: tsproto.GenerateCDNSignatureResponse = {
      signature: "1793088000-abcdef",
    };
    adapter.reply = () =>
      Buffer.concat([
        tsproto.GenerateCDNSignatureResponse.encode(sigReply).finish(),
        Buffer.alloc(2),
      ]);

    const res = await api.generateCDNSignature("", { channel_id: "12345" });
    expect(adapter.requests[0].api_index).toBe(212);
    expect(res).toEqual(sigReply);

    await expect(
      api.generateCDNSignature("", null as unknown as tsproto.GenerateCDNSignatureRequest),
    ).rejects.toThrow("'body' is a required parameter");

    adapter.reply = (cid) =>
      rtproto.Envelope.fromPartial({
        cid,
        error: { code: 403, message: "forbidden" },
      });
    await expect(
      api.generateCDNSignature("", { channel_id: "12345" }),
    ).rejects.toMatchObject({ error: { code: 403 } });

    const core = Object.create(MezonClientCore.prototype) as MezonClientCore;
    const coreInternals = core as unknown as {
      apiClient: MezonApi;
      sessionManager: { getSession: () => { token: string; isexpired: () => boolean } | undefined };
    };
    coreInternals.apiClient = api;
    coreInternals.sessionManager = { getSession: () => undefined };
    await expect(core.generateCDNSignature({ channel_id: "12345" })).resolves.toBeUndefined();
    coreInternals.sessionManager = {
      getSession: () => ({ token: "jwt", isexpired: () => false }),
    };
    adapter.reply = () => tsproto.GenerateCDNSignatureResponse.encode(sigReply).finish();
    await expect(core.generateCDNSignature({ channel_id: "12345" })).resolves.toEqual(sigReply);
  });

  it("preserves pro_plan and total_members on ApiClanDesc returned by listClanDescs", async () => {
    adapter.reply = () =>
      tsproto.ClanDescList.encode(
        tsproto.ClanDescList.fromPartial({
          clandesc: [
            {
              clan_id: "10",
              clan_name: "Alpha",
              pro_plan: true,
              total_members: 55,
            },
          ],
        }),
      ).finish();

    const list = await api.listClanDescs("");
    const clan: ApiClanDesc = list.clandesc![0];
    expect(clan.pro_plan).toBe(true);
    expect(clan.total_members).toBe(55);
  });
});
