import * as tsproto from "./rtapi/realtime";
import { TransportBaseAdapter } from "./transport_base_adapter";

export class WebSocketAdapter extends TransportBaseAdapter {
  private _socket?: WebSocket;
  protected _pingInterval?: NodeJS.Timeout;

  constructor() {
    super();
  }

  connect(
    host: string,
    port: string,
    _createStatus: boolean,
    token: string,
    signal?: AbortSignal
  ): void {
    const url = `wss://${host}:${port}/ws?token=${token}`;
    const socket = new WebSocket(url);
    socket.binaryType = "arraybuffer";
    this._socket = socket;

    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }

    socket.onopen = (ev: Event) => {
      console.log("Socket successfully opened!");
      this._isOpen = true;
      this.startPingInterval();
      (this.onOpen as any)?.(ev);
    };

    socket.onmessage = (ev: MessageEvent) => {
      try {
        const uintBuffer = new Uint8Array(ev.data);
        const envelope = tsproto.Envelope.decode(uintBuffer);
        this.handleIncomingEnvelope(envelope);
      } catch (e) {
        console.error("WebSocketAdapter: Failed to decode envelope", e);
      }
    };

    socket.onerror = (ev: Event) => {
      (this.onError as any)?.(ev);
    };

    socket.onclose = (ev: CloseEvent) => {
      this._isOpen = false;
      this.stopPingInterval();
      this.clearPendingRequests("WebSocket closed");
      (this.onClose as any)?.(ev);
      this._socket = undefined;
    };
  }

  protected transmit(msg: any): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
      const encodedMsg = envelopeWriter.finish();
      this._socket.send(encodedMsg);
    } else {
      console.warn("WebSocketAdapter: Attempted to send while socket was closed.");
    }
  }

  protected transmitPing(): void {
    this.transmit({ping: {}});
  }

  private startPingInterval(): void {
    this._pingInterval = setInterval(() => {
      this.transmitPing();
    }, 30000);
  }

  private stopPingInterval(): void {
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
      this._pingInterval = undefined;
    }
  }

  close(): void {
    this.stopPingInterval();
    if (this._socket) {
      this._socket.close(1000, "Normal Closure");
    }
  }
}