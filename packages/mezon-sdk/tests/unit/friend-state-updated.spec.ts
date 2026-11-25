import { EventEmitter } from "node:events";
import * as wire from "../../../mezon-js-protobuf/rtapi/realtime";
import { Events, InternalEventsSocket } from "../../src/constants";
import { MezonClient } from "../../src/mezon-client/client/MezonClient";
import type { FriendStateUpdated } from "../../src/rtapi/realtime";
import type { Session } from "../../src/session";
import { MezonTransport } from "../../src/socket";
import { decodeEnvelopePayload } from "../../src/transport/protobuf_decode";
import type { TransportAdapter } from "../../src/transport/transport_adapter";

const friendEvent: FriendStateUpdated = {
  user_id: "1840651530236071940",
  username: "bob",
  display_name: "Bob",
  avatar: "https://cdn.test/bob.png",
  state: 2,
};

const payload = wire.Envelope.encode(
  wire.Envelope.fromPartial({ friend_state_updated: friendEvent }),
).finish();

class FakeAdapter implements TransportAdapter {
  onClose: TransportAdapter["onClose"] = null;
  onError: TransportAdapter["onError"] = null;
  onMessage: TransportAdapter["onMessage"] = null;
  onOpen: TransportAdapter["onOpen"] = null;
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

  send() {}
}

describe("friend_state_updated (Envelope 107)", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("decodes FriendStateUpdated payload", () => {
    expect(decodeEnvelopePayload(payload).friend_state_updated).toEqual(friendEvent);
  });

  it("exposes enum value and dispatches through MezonTransport", async () => {
    jest.useFakeTimers();
    expect(InternalEventsSocket.FriendStateUpdated).toBe("friend_state_updated");
    expect(Events.FriendStateUpdated).toBe("friend_state_updated");

    const adapter = new FakeAdapter();
    const transport = new MezonTransport("", "", false, adapter);
    await transport.connect({ token: "" } as Session);
    const received: FriendStateUpdated[] = [];
    transport.socketEvents.on(Events.FriendStateUpdated, (event: FriendStateUpdated) =>
      received.push(event),
    );

    adapter.onMessage?.(0, 0, Buffer.from(payload));
    transport.disconnect(false);

    expect(received).toEqual([friendEvent]);
  });

  it("registers listener via MezonClient.onFriendStateUpdated", () => {
    const client = Object.create(MezonClient.prototype) as MezonClient;
    EventEmitter.call(client);
    const received: FriendStateUpdated[] = [];
    const returned = client.onFriendStateUpdated((e) => received.push(e));
    expect(returned).toBe(client);

    client.emit(Events.FriendStateUpdated, friendEvent);
    expect(received).toEqual([friendEvent]);
  });
});
