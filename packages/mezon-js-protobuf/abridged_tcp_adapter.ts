import * as tsproto from "./rtapi/realtime";
import {
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
  TransportAdapter,
} from "./transport_adapter";
import net from "node:net";

export class AbridgedTcpAdapter implements TransportAdapter {
  private _socket?: any;

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
    return this._socket!.onmessage;
  }

  set onMessage(value: SocketMessageHandler | null) {
    if (value) {
      this._socket!.onmessage = (evt: MessageEvent) => {
        const buffer: ArrayBuffer = evt.data;
        const uintBuffer: Uint8Array = new Uint8Array(buffer);
        const envelope = tsproto.Envelope.decode(uintBuffer);

        if (envelope.channel_message) {
          if (envelope.channel_message.code == undefined) {
            //protobuf plugin does not default-initialize missing Int32Value fields
            envelope.channel_message.code = 0;
          }
        }

        value!(0, 0, envelope);
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
    _createStatus: boolean,
    token: string,
    signal?: AbortSignal,
  ): void {
    if (signal) {
      signal.addEventListener("abort", () => {
        this.close();
      });
    }

    //this._socket = native.connect(host, parseInt(port));
    console.log("host, port", host, port);

    const client = net.createConnection(
      { host: "localhost", port: 7349 },
      () => {
        console.log("Connected to raw TCP server!");

        const magicByte = 0xef;
        const encoder = new TextEncoder();
        const tokenBytes = encoder.encode(token);
        const payload = new Uint8Array(1 + tokenBytes.length);
        payload[0] = magicByte;
        payload.set(tokenBytes, 1);

        client.write(payload);
      },
    );
  }

  send(msg: any): void {
    const envelopeWriter = tsproto.Envelope.encode(
      tsproto.Envelope.fromPartial(msg),
    );
    const encodedMsg = envelopeWriter.finish();
    this._socket!.send(encodedMsg);
  }
}

export default AbridgedTcpAdapter;