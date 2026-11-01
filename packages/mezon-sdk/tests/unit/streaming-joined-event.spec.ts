import * as wire from "../../../mezon-js-protobuf/rtapi/realtime";
import { Events } from "../../src/constants";
import type { StreamingJoinedEvent } from "../../src/interfaces";
import type { Session } from "../../src/session";
import { MezonTransport } from "../../src/socket";
import { decodeEnvelopePayload } from "../../src/transport/protobuf_decode";
import type { TransportAdapter } from "../../src/transport/transport_adapter";

const joined: StreamingJoinedEvent = {
  clan_id: "1840651530236071936",
  clan_name: "clan",
  id: "1840651530236071937",
  participant: "publisher",
  user_id: "1840651530236071938",
  streaming_channel_label: "live",
  streaming_channel_id: "1840651530236071939",
  is_publisher: true,
};

const payload = wire.Envelope.encode(
  wire.Envelope.fromPartial({ streaming_joined_event: joined }),
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

describe("streaming_joined_event", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("decodes is_publisher", () => {
    expect(decodeEnvelopePayload(payload).streaming_joined_event).toEqual(
      joined,
    );
  });

  it("dispatches is_publisher to listeners", async () => {
    jest.useFakeTimers();
    const adapter = new FakeAdapter();
    const transport = new MezonTransport("", "", false, adapter);
    await transport.connect({ token: "" } as Session);
    const received: StreamingJoinedEvent[] = [];
    transport.socketEvents.on(
      Events.StreamingJoinedEvent,
      (event: StreamingJoinedEvent) => received.push(event),
    );

    adapter.onMessage?.(0, 0, Buffer.from(payload));
    transport.disconnect(false);

    expect(received).toEqual([joined]);
  });
});
