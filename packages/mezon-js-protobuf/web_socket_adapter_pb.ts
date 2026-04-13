import * as tsproto from "./rtapi/realtime";
import { TransportBaseAdapter } from "./transport_base_adapter";

export class WebSocketAdapterPb extends TransportBaseAdapter {
  private _socket?: WebSocket;

  constructor() {
    super();
  }

  connect(
    scheme: string,
    host: string,
    port: string,
    _createStatus: boolean, // Note: Ensure your Base handles these if needed
    token: string,
    platform: string,
    signal?: AbortSignal
  ): void {
    const url = `${scheme}://${host}:${port}/ws?token=${token}&platform=${platform}`;
    const socket = new WebSocket(url);
    socket.binaryType = "arraybuffer";
    this._socket =  socket;

    // Handle AbortSignal
    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }

    socket.onopen = (ev: Event) => {
      this._isOpen = true;
      (this.onOpen as any)?.(ev);
    };

    socket.onmessage = (ev: MessageEvent) => {
      try {
        // Decode the incoming binary into a Protobuf Envelope
        const uintBuffer = new Uint8Array(ev.data);
        const envelope = tsproto.Envelope.decode(uintBuffer);
        
        // Pass to Base class to resolve pending Promises or trigger onMessage
        this.handleIncomingEnvelope(envelope);
      } catch (e) {
        console.error("WebSocketAdapterPb: Failed to decode envelope", e);
      }
    };

    socket.onerror = (ev: Event) => {
      (this.onError as any)?.(ev);
    };

    socket.onclose = (ev: CloseEvent) => {
      this._isOpen = false;
      this.clearPendingRequests("WebSocket closed");
      (this.onClose as any)?.(ev);
      this._socket = undefined;
    };
  }

  /**
   * Implementation required by TransportBaseAdapter
   */
  protected transmit(data: Uint8Array): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(data);
    } else {
      console.warn("WebSocketAdapterPb: Attempted to send while socket was closed.");
    }
  }

  close(): void {
    if (this._socket) {
      this._socket.close(1000, "Normal Closure");
    }
  }
}