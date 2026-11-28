import fs from "node:fs";
import path from "node:path";
import * as tsproto from "../../mezon-js-protobuf/api/api";
import * as rtapi from "../../mezon-js-protobuf/rtapi/realtime";
import { Client } from "../client";
import { MezonTransport } from "../transport";
import type {
  ApiClanDesc,
  ApiCreateEventRequest,
  ApiEventManagement,
  ApiSession,
  ApiUpdateAccountRequest,
  ApiUserDecoration,
  ApiUserDecorationList,
  MezonUpdateClanDescBody,
  MezonUpdateEventBody,
  UserDecorationUpdatedEvent,
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

  it("encodes the clan frame (0 clears it) and join_mode on updateClanDesc and decodes both from listClanDescs", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    await client.updateClanDesc(dummySession, "10", { clan_name: "Mezon", frame: 5 });
    expect(tsproto.UpdateClanDescRequest.decode(sent[0].body).frame).toBe(5);

    await client.updateClanDesc(dummySession, "10", { clan_name: "Mezon", frame: 0 });
    expect(tsproto.UpdateClanDescRequest.decode(sent[1].body).frame).toBe(0);

    await client.updateClanDesc(dummySession, "10", { clan_name: "Mezon" });
    expect(tsproto.UpdateClanDescRequest.decode(sent[2].body).frame).toBeUndefined();

    await client.updateClanDesc(dummySession, "10", { clan_name: "Mezon", join_mode: 1 });
    expect(tsproto.UpdateClanDescRequest.decode(sent[3].body).join_mode).toBe(1);

    await client.updateClanDesc(dummySession, "10", { clan_name: "Mezon", join_mode: 0 });
    expect(tsproto.UpdateClanDescRequest.decode(sent[4].body).join_mode).toBe(0);
    expect(tsproto.UpdateClanDescRequest.decode(sent[2].body).join_mode).toBeUndefined();

    setReply(
      tsproto.ClanDescList.encode(
        tsproto.ClanDescList.fromPartial({
          clandesc: [{ clan_id: "10", clan_name: "Mezon", pro_plan: true, frame: 7, join_mode: 1 }],
        }),
      ).finish(),
    );
    const list = await client.listClanDescs(dummySession);
    const clan: ApiClanDesc = list.clandesc![0];
    expect(clan.frame).toBe(7);
    expect(clan.join_mode).toBe(1);
  });

  it("decodes pro_plan, join_mode and frame from a clan_updated_event envelope", () => {
    const bytes = rtapi.Envelope.encode(
      rtapi.Envelope.fromPartial({
        clan_updated_event: { clan_id: "10", clan_name: "Mezon", pro_plan: true, join_mode: 1, frame: 5 },
      }),
    ).finish();
    const event = rtapi.Envelope.decode(bytes).clan_updated_event!;
    expect(event.pro_plan).toBe(true);
    expect(event.join_mode).toBe(1);
    expect(event.frame).toBe(5);
  });
});

describe("mezon-js v2.16.6 join mode, frame & pending requests", () => {
  afterEach(() => jest.restoreAllMocks());

  it("encodes and decodes join_mode and frame on updateClanDesc and listClanDescs", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    await client.updateClanDesc(dummySession, "10", {
      clan_name: "Mezon",
      join_mode: 1,
      frame: 3,
    });
    expect(tsproto.UpdateClanDescRequest.decode(sent[0].body)).toMatchObject({
      clan_id: "10",
      join_mode: 1,
      frame: 3,
    });

    await client.updateClanDesc(dummySession, "10", {
      clan_name: "Mezon",
      join_mode: 0,
    });
    expect(tsproto.UpdateClanDescRequest.decode(sent[1].body)).toMatchObject({
      clan_id: "10",
      join_mode: 0,
    });

    setReply(
      tsproto.ClanDescList.encode(
        tsproto.ClanDescList.fromPartial({
          clandesc: [
            {
              clan_id: "10",
              clan_name: "Mezon",
              join_mode: 1,
              frame: 3,
            },
          ],
        }),
      ).finish(),
    );
    const list = await client.listClanDescs(dummySession);
    expect(list.clandesc![0].join_mode).toBe(1);
    expect(list.clandesc![0].frame).toBe(3);
  });

  it("decodes join_pending on inviteUser and calls listJoinPending / reviewJoinPending", async () => {
    const { client, sent, setReply } = createClientWithMockSend();

    setReply(
      tsproto.InviteUserRes.encode(
        tsproto.InviteUserRes.fromPartial({
          clan_id: "10",
          channel_id: "20",
          clan_name: "Mezon",
          join_pending: true,
        }),
      ).finish(),
    );
    const inviteRes = await client.inviteUser(dummySession, "99");
    expect(inviteRes.join_pending).toBe(true);

    setReply(
      tsproto.ListJoinPendingResponse.encode(
        tsproto.ListJoinPendingResponse.fromPartial({
          items: [
            {
              id: "1001",
              clan_id: "10",
              user_id: "2002",
              username: "alice",
              display_name: "Alice",
              avatar_url: "https://cdn.test/a.png",
              channel_id: "20",
              invite_id: "99",
              create_time_seconds: 1700000000,
            },
          ],
          cursor: "next-cursor",
        }),
      ).finish(),
    );
    const pending = await client.listJoinPending(dummySession, {
      clan_id: "10",
      limit: 25,
      cursor: "",
    });
    expect(sent[1].urlPath).toBe("/mezon.api.Mezon/ListJoinPending");
    expect(tsproto.ListJoinPendingRequest.decode(sent[1].body)).toMatchObject({
      clan_id: "10",
      limit: 25,
    });
    expect(pending.cursor).toBe("next-cursor");
    expect(pending.items).toHaveLength(1);
    expect(pending.items![0].user_id).toBe("2002");

    setReply(
      tsproto.ReviewJoinPendingResponse.encode(
        tsproto.ReviewJoinPendingResponse.fromPartial({
          clan_id: "10",
          user_id: "2002",
          approved: true,
        }),
      ).finish(),
    );
    const reviewed = await client.reviewJoinPending(dummySession, {
      clan_id: "10",
      user_id: "2002",
      approve: true,
    });
    expect(sent[2].urlPath).toBe("/mezon.api.Mezon/ReviewJoinPending");
    expect(tsproto.ReviewJoinPendingRequest.decode(sent[2].body)).toMatchObject({
      clan_id: "10",
      user_id: "2002",
      approve: true,
    });
    expect(reviewed).toMatchObject({
      clan_id: "10",
      user_id: "2002",
      approved: true,
    });
  });

  it("supports direct_voice_access and voice waiting-room RPCs and events", async () => {
    const { client, sent, setReply } = createClientWithMockSend();

    const updateReq: MezonUpdateClanDescBody = {
      clan_name: "Voice Clan",
      direct_voice_access: false,
    };
    await client.updateClanDesc(dummySession, "10", updateReq);
    expect(tsproto.UpdateClanDescRequest.decode(sent[0].body)).toMatchObject({
      clan_id: "10",
      clan_name: "Voice Clan",
      direct_voice_access: false,
    });

    const decodedClan: ApiClanDesc = tsproto.ClanDesc.decode(
      tsproto.ClanDesc.encode(
        tsproto.ClanDesc.fromPartial({
          clan_id: "10",
          clan_name: "Voice Clan",
          direct_voice_access: false,
        }),
      ).finish(),
    );
    expect(decodedClan.direct_voice_access).toBe(false);

    const decodedDefaultClan: ApiClanDesc = tsproto.ClanDesc.decode(
      tsproto.ClanDesc.encode(
        tsproto.ClanDesc.fromPartial({
          clan_id: "11",
          clan_name: "Default Clan",
        }),
      ).finish(),
    );
    expect(decodedDefaultClan.direct_voice_access).toBeUndefined();

    setReply(
      tsproto.GenerateMeetTokenResponse.encode(
        tsproto.GenerateMeetTokenResponse.fromPartial({
          token: "",
          url: "wss://sfu.test/ws",
        }),
      ).finish(),
    );
    const meetRes = await client.generateMeetToken(dummySession, {
      channel_id: "200",
      room_name: "",
      metadata: "Bob;bob.png",
    });
    expect(meetRes.token).toBe("");
    expect(meetRes.url).toBe("wss://sfu.test/ws");

    setReply(
      tsproto.ReviewVoiceJoinResponse.encode(
        tsproto.ReviewVoiceJoinResponse.fromPartial({
          channel_id: "200",
          user_id: "1002",
          approved: true,
        }),
      ).finish(),
    );
    const reviewRes = await client.reviewVoiceJoin(dummySession, {
      channel_id: "200",
      user_id: "1002",
      approve: true,
    });
    expect(sent[2].urlPath).toBe("/mezon.api.Mezon/ReviewVoiceJoin");
    expect(reviewRes).toMatchObject({
      channel_id: "200",
      user_id: "1002",
      approved: true,
    });

    const decodedEnv = rtapi.Envelope.decode(
      rtapi.Envelope.encode(
        rtapi.Envelope.fromPartial({
          voice_join_reviewed_event: {
            clan_id: "10",
            channel_id: "200",
            user_id: "1002",
            reviewer_id: "1001",
            approved: true,
            token: "jwt-token",
            url: "wss://sfu.test/ws",
          },
        }),
      ).finish(),
    );
    expect(decodedEnv.voice_join_reviewed_event).toMatchObject({
      channel_id: "200",
      user_id: "1002",
      approved: true,
      token: "jwt-token",
    });
  });
});

describe("mezon-js Pro avatar frame (user)", () => {
  it("encodes frame on updateAccount, including 0 and -1, and omits it when unset", async () => {
    const { client, sent } = createClientWithMockSend();
    await client.updateAccount(dummySession, { frame: 5 });
    await client.updateAccount(dummySession, { frame: 0 });
    await client.updateAccount(dummySession, { frame: -1 });
    await client.updateAccount(dummySession, { banner: "https://cdn.test/b.png" });
    expect(tsproto.UpdateAccountRequest.decode(sent[0].body).frame).toBe(5);
    expect(tsproto.UpdateAccountRequest.decode(sent[1].body).frame).toBe(0);
    expect(tsproto.UpdateAccountRequest.decode(sent[2].body).frame).toBe(-1);
    expect(tsproto.UpdateAccountRequest.decode(sent[3].body).frame).toBeUndefined();
  });

  it("keeps the user frame in listClanUsers and getAccount", async () => {
    const { client, setReply } = createClientWithMockSend();
    setReply(
      tsproto.ClanUserList.encode(
        tsproto.ClanUserList.fromPartial({
          clan_users: [
            { user: { id: "1", username: "a", pro_plan: true, frame: 7 } },
            { user: { id: "2", username: "b", pro_plan: true, frame: -1 } },
            { user: { id: "3", username: "c" } },
          ],
        }),
      ).finish(),
    );
    const list = await client.listClanUsers(dummySession, "10");
    expect(list.clan_users!.map((u) => u.user!.frame)).toEqual([7, -1, 0]);

    setReply(
      tsproto.Account.encode(
        tsproto.Account.fromPartial({ user: { id: "1", pro_plan: true, frame: 3 }, pro_plan: true }),
      ).finish(),
    );
    const account = await client.getAccount(dummySession);
    expect(account.user!.frame).toBe(3);
  });

  it("decodes the frame on user_profile_updated_event only when it is sent", () => {
    const decode = (frame?: number) =>
      rtapi.Envelope.decode(
        rtapi.Envelope.encode(
          rtapi.Envelope.fromPartial({
            user_profile_updated_event: { user_id: "1", clan_id: "10", frame },
          }),
        ).finish(),
      ).user_profile_updated_event!.frame;
    expect(decode(4)).toBe(4);
    expect(decode(0)).toBe(0);
    expect(decode(-1)).toBe(-1);
    expect(decode(undefined)).toBeUndefined();
  });
});

describe("mezon-js user decoration API", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("maps ListUserDecorations to 226 and UpdateUserDecoration to 227", () => {
    const transport = new MezonTransport("defaultkey", 5000, "http://127.0.0.1:7350");
    expect(transport.getApiFromPath("ListUserDecorations")).toBe(226);
    expect(transport.getApiFromPath("UpdateUserDecoration")).toBe(227);
  });

  it("encodes and decodes listUserDecorations including frames 5, 0, -1 and empty list", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    const expected: ApiUserDecorationList = {
      decorations: [
        { user_id: "101", frame: 5 },
        { user_id: "102", frame: 0 },
        { user_id: "103", frame: -1 },
      ],
    };
    setReply(
      tsproto.UserDecorationList.encode(
        tsproto.UserDecorationList.fromPartial(expected),
      ).finish(),
    );

    const res = await client.listUserDecorations(dummySession, ["101", "102", "103"]);
    expect(sent[0].urlPath).toBe("/mezon.api.Mezon/ListUserDecorations");
    expect(tsproto.ListUserDecorationsRequest.decode(sent[0].body)).toEqual({
      user_ids: ["101", "102", "103"],
      clan_id: "0",
    });
    expect(res).toEqual(expected);

    setReply(
      tsproto.UserDecorationList.encode(
        tsproto.UserDecorationList.fromPartial({ decorations: [] }),
      ).finish(),
    );
    const emptyRes = await client.listUserDecorations(dummySession, []);
    expect(tsproto.ListUserDecorationsRequest.decode(sent[1].body)).toEqual({
      user_ids: [],
      clan_id: "0",
    });
    expect(emptyRes).toEqual({ decorations: [] });

    setReply(
      tsproto.UserDecorationList.encode(
        tsproto.UserDecorationList.fromPartial({ decorations: [{ user_id: "101", frame: 5 }] }),
      ).finish(),
    );
    const clanRes = await client.listUserDecorations(dummySession, [], "2114000554567929856");
    expect(tsproto.ListUserDecorationsRequest.decode(sent[2].body)).toEqual({
      user_ids: [],
      clan_id: "2114000554567929856",
    });
    expect(clanRes).toEqual({ decorations: [{ user_id: "101", frame: 5 }] });
  });

  it("encodes and decodes updateUserDecoration for frames 5, 0, and -1", async () => {
    const { client, sent, setReply } = createClientWithMockSend();
    const frames = [5, 0, -1];
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      const expected: ApiUserDecoration = { user_id: "101", frame };
      setReply(
        tsproto.UserDecoration.encode(
          tsproto.UserDecoration.fromPartial(expected),
        ).finish(),
      );
      const res = await client.updateUserDecoration(dummySession, frame);
      expect(sent[i].urlPath).toBe("/mezon.api.Mezon/UpdateUserDecoration");
      expect(tsproto.UpdateUserDecorationRequest.decode(sent[i].body)).toEqual({ frame });
      expect(res).toEqual(expected);
    }
  });

  it("encodes/decodes user_decoration_updated_event and dispatches to onuserdecorationupdated", async () => {
    for (const frame of [5, 0, -1]) {
      const decoded = rtapi.Envelope.decode(
        rtapi.Envelope.encode(
          rtapi.Envelope.fromPartial({
            user_decoration_updated_event: { user_id: "101", frame },
          }),
        ).finish(),
      );
      expect(decoded.user_decoration_updated_event).toEqual({ user_id: "101", frame });
    }

    const client = new Client("defaultkey", "127.0.0.1", "7350", false, 5000, false);
    const transport = (client as unknown as { transport: MezonTransport }).transport;
    let capturedHandlers: Parameters<MezonTransport["connect"]>[4] | undefined;
    jest
      .spyOn(transport, "connect")
      .mockImplementation((_sid, _url, _cs, _v, handlers) => {
        capturedHandlers = handlers;
        handlers.onOpen({} as Event);
      });

    const connectPromise = client.connect("sid", "127.0.0.1:7350", false, false);
    await connectPromise;

    const received: UserDecorationUpdatedEvent[] = [];
    client.onuserdecorationupdated = (e) => received.push(e);

    const decodedEnv = rtapi.Envelope.decode(
      rtapi.Envelope.encode(
        rtapi.Envelope.fromPartial({
          user_decoration_updated_event: { user_id: "101", frame: -1 },
        }),
      ).finish(),
    );
    await capturedHandlers!.onMessage(0, 0, decodedEnv);
    expect(received).toEqual([{ user_id: "101", frame: -1 }]);
    client.disconnect(false);
  });

  it("logs onuserdecorationupdated only when verbose is true", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);
    const client = new Client("defaultkey", "127.0.0.1", "7350", false, 5000, false);
    const evt: UserDecorationUpdatedEvent = { user_id: "101", frame: 5 };

    client.verbose = true;
    expect(() => client.onuserdecorationupdated(evt)).not.toThrow();
    expect(logSpy).toHaveBeenCalledWith(evt);

    logSpy.mockClear();
    client.verbose = false;
    client.onuserdecorationupdated(evt);
    expect(logSpy).not.toHaveBeenCalled();
  });
});
