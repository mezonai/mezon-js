import fs from "node:fs";
import path from "node:path";
import * as tsproto from "../../mezon-js-protobuf/api/api";
import { Client } from "../client";
import { MezonTransport } from "../transport";
import type {
  ApiClanDesc,
  ApiCreateEventRequest,
  ApiEventManagement,
  ApiSession,
  ApiUpdateAccountRequest,
  MezonUpdateClanDescBody,
  MezonUpdateEventBody,
} from "../types";

const dummySession: ApiSession = {
  token: "token",
  refresh_token: "refresh",
  created: false,
};

function createClientWithMockSend() {
  const client = new Client("defaultkey", "127.0.0.1", "7350", false, 5000, false);
  const transport = (client as unknown as { transport: MezonTransport }).transport;
  const sent: Array<{ urlPath: string; body: Uint8Array; headers: Record<string, string> }> = [];
  let nextReply: { code: number; message: Uint8Array } = {
    code: 0,
    message: new Uint8Array(),
  };

  jest.spyOn(transport, "send").mockImplementation(async (req: unknown) => {
    const r = req as {
      urlPath: string;
      fetchOptions: { body: Uint8Array; headers?: Record<string, string> };
    };
    sent.push({
      urlPath: r.urlPath,
      body: r.fetchOptions.body,
      headers: r.fetchOptions.headers ?? {},
    });
    return nextReply;
  });

  return {
    client,
    transport,
    sent,
    setReply(message: Uint8Array, code = 0) {
      nextReply = { code, message };
    },
  };
}

describe("mezon-js Client verbose handlers in Node (F-52)", () => {
  afterEach(() => jest.restoreAllMocks());

  it("never references bare window in client.ts", () => {
    const src = fs.readFileSync(path.resolve(__dirname, "../client.ts"), "utf8");
    expect(src.match(/\bwindow\s*&&/g)).toBeNull();
  });

  it("logs onstreamingviewercount and onsfubreakoutroomevent in Node without window", () => {
    expect(typeof (globalThis as Record<string, unknown>).window).toBe("undefined");
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);
    const client = new Client("defaultkey", "127.0.0.1", "7350", false, 5000, false);
    client.verbose = true;

    const viewerEvt = { clan_id: "1", channel_id: "2", viewer_count: 7 };
    const breakoutEvt = {
      channel_id: "2",
      token: "breakout-jwt",
      self_select_ids: ["10", "11"],
    };

    expect(() => client.onstreamingviewercount(viewerEvt)).not.toThrow();
    expect(() => client.onsfubreakoutroomevent(breakoutEvt)).not.toThrow();
    expect(logSpy).toHaveBeenCalledWith(viewerEvt);
    expect(logSpy).toHaveBeenCalledWith(breakoutEvt);

    logSpy.mockClear();
    client.verbose = false;
    client.onstreamingviewercount(viewerEvt);
    client.onsfubreakoutroomevent(breakoutEvt);
    expect(logSpy).not.toHaveBeenCalled();
  });
});

describe("mezon-js listFriends parity (banner, pro_plan, sort_by_last_sent)", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("preserves banner and pro_plan and encodes sort_by_last_sent", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    const encodedReply = tsproto.FriendList.encode(
      tsproto.FriendList.fromPartial({
        cursor: "next-cur",
        friends: [
          {
            state: 0,
            source_id: "99",
            user: {
              id: "42",
              username: "alice",
              display_name: "Alice",
              avatar_url: "https://cdn.test/a.png",
              banner: "https://cdn.test/banner.png",
              pro_plan: true,
              edge_count: 2,
              online: true,
            },
          },
          {
            state: 1,
            source_id: "100",
            user: {
              id: "43",
              username: "bob",
              edge_count: 0,
            },
          },
        ],
      }),
    ).finish();
    setReply(encodedReply);

    const res = await client.listFriends(dummySession, 0, 50, "cur-1", true);

    expect(sent).toHaveLength(1);
    expect(sent[0].urlPath).toBe("/mezon.api.Mezon/ListFriends");
    expect(tsproto.ListFriendsRequest.decode(sent[0].body)).toEqual({
      limit: 50,
      state: 0,
      cursor: "cur-1",
      sort_by_last_sent: true,
    });
    expect(res.cursor).toBe("next-cur");
    expect(res.friends).toHaveLength(2);
    expect(res.friends![0].user).toMatchObject({
      id: "42",
      username: "alice",
      banner: "https://cdn.test/banner.png",
      pro_plan: true,
      edge_count: 2,
    });
    expect(res.friends![1].user!.edge_count).toBe(0);
  });

  it("encodes sort_by_last_sent false/undefined and keeps 4th arg options backwards compatible", async () => {
    const { transport, sent, setReply } = createClientWithMockSend();
    setReply(tsproto.FriendList.encode(tsproto.FriendList.fromPartial({})).finish());

    await transport.listFriends(10, 0, "c1");
    await transport.listFriends(25, 1, "c2", { headers: { "X-Custom": "yes" } });
    await transport.listFriends(25, 1, "c2", { headers: { "X-Custom": "two" } }, true);

    expect(sent).toHaveLength(3);
    expect(tsproto.ListFriendsRequest.decode(sent[0].body).sort_by_last_sent).toBe(false);
    expect(sent[1].headers["X-Custom"]).toBe("yes");
    expect(tsproto.ListFriendsRequest.decode(sent[1].body).sort_by_last_sent).toBe(false);
    expect(sent[2].headers["X-Custom"]).toBe("two");
    expect(tsproto.ListFriendsRequest.decode(sent[2].body).sort_by_last_sent).toBe(true);
  });

  it("handles empty, nullish, fallback-session, error, and timeout listFriends cases", async () => {
    const { client, transport, setReply } = createClientWithMockSend();
    setReply(tsproto.FriendList.encode(tsproto.FriendList.fromPartial({ cursor: "" })).finish());
    expect(await client.listFriends(dummySession)).toEqual({ friends: [], cursor: "" });

    jest.spyOn(transport, "listFriends").mockResolvedValueOnce({ cursor: "c0" });
    expect(await client.listFriends(dummySession)).toEqual({ friends: [], cursor: "c0" });

    const fallbackClient = new Client("defaultkey", "127.0.0.1", "7350", false, 5000, true);
    const fbTransport = (fallbackClient as unknown as { transport: MezonTransport }).transport;
    const setFallbackSpy = jest
      .spyOn(fbTransport, "setFallbackSession")
      .mockImplementation(() => undefined);
    jest.spyOn(fbTransport, "listFriends").mockResolvedValue({ friends: [], cursor: "fb" });
    expect(await fallbackClient.listFriends(dummySession)).toEqual({ friends: [], cursor: "fb" });
    expect(setFallbackSpy).toHaveBeenCalledWith(dummySession);

    setReply(new Uint8Array(), 403);
    await expect(transport.listFriends(10, 0, "c3")).rejects.toMatchObject({ code: 403 });

    jest.spyOn(transport, "send").mockImplementation(() => new Promise(() => undefined));
    const timedOut = transport.listFriends(10, 0, "c4");
    jest.advanceTimersByTime(5000);
    await expect(timedOut).rejects.toThrow("Request timed out.");
  });
});

describe("mezon-js v2.16.4 protocol fields", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("encodes and decodes co_host and is_external on createEvent and updateEvent", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    const createReq: ApiCreateEventRequest = {
      clan_id: "10",
      title: "Standup",
      is_external: true,
      co_host: "777",
    };
    setReply(
      tsproto.EventManagement.encode(
        tsproto.EventManagement.fromPartial({
          id: "55",
          clan_id: "10",
          title: "Standup",
          is_external: true,
          co_host: "777",
        }),
      ).finish(),
    );

    const created: ApiEventManagement = await client.createEvent(dummySession, createReq);
    expect(tsproto.CreateEventRequest.decode(sent[0].body)).toMatchObject({
      is_external: true,
      co_host: "777",
    });
    expect(created.co_host).toBe("777");
    expect(created.is_external).toBe(true);

    const updateReq: MezonUpdateEventBody = {
      event_id: "55",
      clan_id: "10",
      co_host: "888",
    };
    setReply(new Uint8Array());
    await client.updateEvent(dummySession, "55", updateReq);
    expect(tsproto.UpdateEventRequest.decode(sent[1].body)).toMatchObject({
      event_id: "55",
      co_host: "888",
    });
  });

  it("encodes and decodes pro_plan and total_members on account and clan APIs", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    const accountReq: ApiUpdateAccountRequest = {
      banner: "https://cdn.test/b.png",
      pro_plan: true,
    };
    await client.updateAccount(dummySession, accountReq);
    expect(tsproto.UpdateAccountRequest.decode(sent[0].body)).toMatchObject({
      banner: "https://cdn.test/b.png",
      pro_plan: true,
    });

    const clanUpdateReq: MezonUpdateClanDescBody = {
      clan_name: "Mezon",
      pro_plan: true,
    };
    await client.updateClanDesc(dummySession, "10", clanUpdateReq);
    expect(tsproto.UpdateClanDescRequest.decode(sent[1].body)).toMatchObject({
      clan_id: "10",
      pro_plan: true,
    });

    setReply(
      tsproto.ClanDescList.encode(
        tsproto.ClanDescList.fromPartial({
          clandesc: [
            {
              clan_id: "10",
              clan_name: "Mezon",
              pro_plan: true,
              total_members: 128,
            },
          ],
        }),
      ).finish(),
    );
    const list = await client.listClanDescs(dummySession);
    const clan: ApiClanDesc = list.clandesc![0];
    expect(clan.pro_plan).toBe(true);
    expect(clan.total_members).toBe(128);
  });
});
