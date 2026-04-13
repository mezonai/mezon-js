import * as tsproto from "./rtapi/realtime";
import native from 'js-native';
import { 
  TransportAdapter, 
  SocketCloseHandler, 
  SocketErrorHandler, 
  SocketMessageHandler, 
  SocketOpenHandler 
} from "./transport_adapter";

export class AbridgedTcpAdapter implements TransportAdapter {
  private _socket?: any; // The js-native instance
  private _pollInterval?: any;
  private _isOpen: boolean = false;

  // Manual event handlers to mimic WebSocket behavior
  public onClose: SocketCloseHandler | null = null;
  public onError: SocketErrorHandler | null = null;
  public onMessage: SocketMessageHandler | null = null;
  public onOpen: SocketOpenHandler | null = null;

  constructor() {}

  isOpen(): boolean {
    return this._isOpen;
  }

  close(): void {
    if (this._pollInterval) clearInterval(this._pollInterval);
    this._isOpen = false;
    this._socket?.close(); // Assuming native has a close method
    
    if (this.onClose) {
      // Mimic browser CloseEvent
      this.onClose.call(null as any, { wasClean: true, code: 1000, reason: "Manual close" } as any);
    }
  }

  connect(
    _scheme: string, // Not used for raw TCP but kept for interface compatibility
    host: string,
    port: string,
    _createStatus: boolean,
    _token: string,
    _platform: string,
    signal?: AbortSignal,
  ): void {
    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }

    try {
      this._socket = native.connect(host, parseInt(port));
      
      this._socket.send(Buffer.from([0xef]));
      
      this._isOpen = true;

      if (this.onOpen) {
        this.onOpen.call(null as any, new Event("open"));
      }

      this._pollInterval = setInterval(() => {
        const data = this._socket.poll();
        if (data) {
          this.handleRawData(data);
        }
      }, 20);

    } catch (err) {
      this._isOpen = false;
      if (this.onError) this.onError.call(null as any, new Event("error"));
    }
  }

  private handleRawData(data: Buffer): void {
    if (!this.onMessage) return;

    try {
      // Convert Node Buffer to Uint8Array for Protobuf decode
      const uintBuffer = new Uint8Array(data);
      const envelope = tsproto.Envelope.decode(uintBuffer);

      // Ported logic from WebSocketAdapterPb for Int32 defaults
      if (envelope.channel_message) {
        if (envelope.channel_message.code === undefined) {
          envelope.channel_message.code = 0;
        }
      }

      this.onMessage(envelope);
    } catch (e) {
      console.error("AbridgedTcp: Failed to decode Protobuf Envelope", e);
    }
  }

  send(msg: any): void {
    if (!this._isOpen) return;

    // Logic from WebSocketAdapterPb: Encode Envelope to binary
    const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
    const encodedMsg = envelopeWriter.finish();
    
    // Send via native socket
    this._socket!.send(Buffer.from(encodedMsg));
  }
}