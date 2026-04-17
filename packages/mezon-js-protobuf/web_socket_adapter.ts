import * as tsproto from "./rtapi/realtime";
import {
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
  TransportAdapter,
} from "./transport_adapter";

export class WebSocketAdapter implements TransportAdapter {
  private _socket?: WebSocket;

  constructor() {}

  get onClose(): SocketCloseHandler | null {
    return this._socket!.onclose;
  }

  set onClose(value: SocketCloseHandler | null) {
    this._socket!.onclose = value;
  }

  get onError(): SocketErrorHandler | null {
    return this._socket!.onerror;
  }

  set onError(value: SocketErrorHandler | null) {
    this._socket!.onerror = value;
  }

  get onMessage(): SocketMessageHandler | null {
    return null; //this._socket!.onmessage;
  }

  set onMessage(value: SocketMessageHandler | null) {
    const PREFIX_RAW = 0xff;
    const RAW_HEADER_LENGTH = 7; // Header Length: 1 (Prefix) + 2 (CID) + 4 (Code) = 7 bytes
    const CODE_LENGTH = 3;

    if (value) {
      this._socket!.onmessage = (evt: MessageEvent) => {
        const buffer: ArrayBuffer = evt.data;
        const uintBuffer: Uint8Array = new Uint8Array(buffer);

        if (uintBuffer.length < 1) {
          console.error("Packet too small to contain headers");
          return;
        }

        // API request
        const prefix = uintBuffer[0];
        if (prefix === PREFIX_RAW) {
          const dataView = new DataView(buffer);
          const cid = dataView.getUint16(1, false);
          const code = dataView.getUint32(CODE_LENGTH, false);
          const payload = uintBuffer.subarray(RAW_HEADER_LENGTH);

          value!(cid, code, payload);

          return;
        }

        const envelope = tsproto.Envelope.decode(uintBuffer);

        if (envelope.channel_message) {
          if (envelope.channel_message.code == undefined) {
            //protobuf plugin does not default-initialize missing Int32Value fields
            envelope.channel_message.code = 0;
          }
        }

        value!(Number(envelope.cid), 0, envelope);
      };
    } else {
      value = null;
    }
  }

  get onOpen(): SocketOpenHandler | null {
    return this._socket!.onopen;
  }

  set onOpen(value: SocketOpenHandler | null) {
    this._socket!.onopen = value;
  }

  isOpen(): boolean {
    return this._socket?.readyState == WebSocket.OPEN;
  }

  close() {
    this._socket?.close();
    this._socket = undefined;
  }

  connect(
    host: string,
    port: string,
    createStatus: boolean,
    token: string,
    signal?: AbortSignal,
  ): void {
    if (signal) {
      signal.addEventListener("abort", () => {
        this.close();
      });
    }
    const portPart = port ? `:${port}` : '';
    const url = `wss://${host}${portPart}/ws?lang=en&status=${encodeURIComponent(
      createStatus.toString(),
    )}&token=${encodeURIComponent(token)}`;
    this._socket = new WebSocket(url);
    this._socket.binaryType = "arraybuffer";
  }

  send(msg: any): void {
    const envelopeWriter = tsproto.Envelope.encode(
      tsproto.Envelope.fromPartial(msg),
    );
    const encodedMsg = envelopeWriter.finish();
    this._socket!.send(encodedMsg);
  }
}
