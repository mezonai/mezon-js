import native from "js-native";
import * as tsproto from "./rtapi/realtime";
import { TransportBaseAdapter } from "./transport_base_adapter";

export class AbridgedTcpAdapter extends TransportBaseAdapter {
  private _socket?: any;
  private _pollInterval?: any;

  connect(_scheme: string, host: string, port: string): void {
    this._socket = native.connect(host, parseInt(port));
    this._socket.send(Buffer.from([0xef])); // Handshake
    this._isOpen = true;

    if (this.onOpen) {
      (this.onOpen as any)(new Event("open") as any);
    }

    this._pollInterval = setInterval(() => {
      const data = this._socket.poll();
      if (data) {
        const envelope = tsproto.Envelope.decode(new Uint8Array(data));
        // Use the base class logic to resolve promises
        this.handleIncomingEnvelope(envelope);
      }
    }, 20);
  }

  protected transmit(data: Uint8Array): void {
    this._socket.send(Buffer.from(data));
  }

  close(): void {
    this._isOpen = false;
    clearInterval(this._pollInterval);
    this._socket?.close();
    this.clearPendingRequests("Adapter closed manually");
    if (this.onClose) {
      (this.onClose as any)({ wasClean: true } as any);
    }
  }

  protected transmitPing() {
    const ping = tsproto.Ping.create({});
    const envelope = tsproto.Envelope.create({ ping });
    const encoded = tsproto.Envelope.encode(envelope).finish();
    this.transmit(encoded);
  }
}
