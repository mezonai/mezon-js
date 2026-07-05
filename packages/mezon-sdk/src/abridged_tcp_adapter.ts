import tls from "node:tls";
import WebSocket, { CloseEvent, ErrorEvent } from "ws";
import * as tsproto from "./rtapi/realtime";
import {
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
  TransportAdapter,
} from "./transport_adapter";

type PlainFn<T extends (...args: any[]) => any> = T extends (
  this: any,
  ...args: infer A
) => infer R
  ? (...args: A) => R
  : never;

const CODE_FIN = 0xff;

export class AbridgedTcpAdapter implements TransportAdapter {
  private _socket?: tls.TLSSocket;
  private _onClose: PlainFn<SocketCloseHandler> | null = null;
  private _onError: PlainFn<SocketErrorHandler> | null = null;
  private _onMessage: PlainFn<SocketMessageHandler> | null = null;
  private _onOpen: PlainFn<SocketOpenHandler> | null = null;
  private _receiveBuffer = Buffer.alloc(0);
  private _streams = new Map<number, Buffer[]>();

  get onClose(): SocketCloseHandler | null {
    return this._onClose as SocketCloseHandler | null;
  }

  set onClose(value: SocketCloseHandler | null) {
    this._onClose = value as PlainFn<SocketCloseHandler> | null;
  }

  get onError(): SocketErrorHandler | null {
    return this._onError as SocketErrorHandler | null;
  }

  set onError(value: SocketErrorHandler | null) {
    this._onError = value as PlainFn<SocketErrorHandler> | null;
  }

  get onMessage(): SocketMessageHandler | null {
    return this._onMessage as SocketMessageHandler | null;
  }

  set onMessage(value: SocketMessageHandler | null) {
    this._onMessage = value as PlainFn<SocketMessageHandler> | null;
    if (this._onMessage && this._receiveBuffer.length > 0) {
      this.handleData(Buffer.alloc(0));
    }
  }

  get onOpen(): SocketOpenHandler | null {
    return this._onOpen as SocketOpenHandler | null;
  }

  set onOpen(value: SocketOpenHandler | null) {
    this._onOpen = value as PlainFn<SocketOpenHandler> | null;
  }

  connect(
    host: string,
    port: string,
    _createStatus: boolean,
    token: string,
    signal?: AbortSignal,
  ): void {
    const parsedPort = parseInt(port, 10);
    const client = tls.connect(parsedPort, host, {
      rejectUnauthorized: false,
    });
    this._socket = client;

    client.on("secureConnect", () => {
      const tokenBytes = Buffer.from(token, "utf-8");
      const padding = (4 - (tokenBytes.length % 4)) % 4;
      const finalToken = Buffer.concat([tokenBytes, Buffer.alloc(padding, 0)]);

      const magicByte = Buffer.from([0xef]);
      const lenHeader = Buffer.from([finalToken.length / 4]);
      const handshake = Buffer.concat([magicByte, lenHeader, finalToken]);

      client.write(handshake);
      this._onOpen?.({ type: "open" } as WebSocket.Event);
    });

    client.on("data", (data: Buffer) => {
      this.handleData(data);
    });

    client.on("error", (err) => {
      this._onError?.({
        type: "error",
        error: err,
        message: err.message,
      } as ErrorEvent);
    });

    client.on("close", (hadError) => {
      this._onClose?.({
        type: "close",
        wasClean: !hadError,
        code: hadError ? 1006 : 1000,
        reason: "",
      } as CloseEvent);
    });

    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }
  }

  send(msg: any): void {
    if (!this.isOpen() || !this._socket) return;

    if (msg.ping) {
      this.sendPing(msg.cid);
      return;
    }

    const encodedMsg = tsproto.Envelope.encode(
      tsproto.Envelope.fromPartial(msg),
    ).finish();
    const paddingNeeded = (4 - (encodedMsg.length % 4)) % 4;
    const finalPayload = Buffer.concat([
      Buffer.from(encodedMsg),
      Buffer.alloc(paddingNeeded, 0),
    ]);
    const lenDiv4 = finalPayload.length / 4;

    let header: Buffer;
    if (lenDiv4 < 127) {
      header = Buffer.from([lenDiv4]);
    } else {
      header = Buffer.alloc(4);
      header[0] = 0x7f;
      header.writeUIntLE(lenDiv4, 1, 3);
    }

    this._socket.write(Buffer.concat([header, finalPayload]));
  }

  isOpen(): boolean {
    return !!this._socket && !this._socket.destroyed;
  }

  close(): void {
    this._socket?.destroy();
    this._socket = undefined;
    this._receiveBuffer = Buffer.alloc(0);
    this._streams.clear();
  }

  private sendPing(cid: number): void {
    const buffer = Buffer.alloc(3);
    buffer[0] = 0x00;
    buffer.writeUInt16BE(cid, 1);
    this._socket?.write(buffer);
  }

  private handleData(data: Buffer): void {
    this._receiveBuffer = Buffer.concat([this._receiveBuffer, data]);
    if (!this._onMessage) return;

    while (this._receiveBuffer.length > 0) {
      const prefix = this._receiveBuffer[0];

      if (prefix === 0x00) {
        if (this._receiveBuffer.length < 3) return;
        const cid = this._receiveBuffer.readUInt16BE(1);
        this._onMessage(cid, 0, { pong: {} });
        this._receiveBuffer = this._receiveBuffer.subarray(3);
        continue;
      }

      if (prefix === 0xff) {
        const rawHeaderLength = 7;
        const payloadHeaderLength = 11;
        if (this._receiveBuffer.length < payloadHeaderLength) return;

        const payloadLen = this._receiveBuffer.readInt32BE(rawHeaderLength);
        const frameLength = payloadHeaderLength + payloadLen;
        if (this._receiveBuffer.length < frameLength) return;

        const frame = this._receiveBuffer.subarray(0, frameLength);
        this.handleRawPacket(frame);
        this._receiveBuffer = this._receiveBuffer.subarray(frameLength);
        continue;
      }

      let headerSize = 0;
      let payloadLength = 0;
      if (prefix < 127) {
        headerSize = 1;
        payloadLength = prefix * 4;
      } else if (prefix === 0x7f) {
        if (this._receiveBuffer.length < 4) return;
        headerSize = 4;
        payloadLength = this._receiveBuffer.readUIntLE(1, 3) * 4;
      } else {
        this._receiveBuffer = this._receiveBuffer.subarray(1);
        continue;
      }

      const frameLength = headerSize + payloadLength;
      if (this._receiveBuffer.length < frameLength) return;

      const payload = this._receiveBuffer.subarray(headerSize, frameLength);
      try {
        const envelope = tsproto.Envelope.decode(new Uint8Array(payload));
        this.normalizeEnvelope(envelope);
        this._onMessage(envelope.cid, 0, envelope);
      } catch (err) {
        console.error("TCP Protobuf Decode Error:", err);
      }

      this._receiveBuffer = this._receiveBuffer.subarray(frameLength);
    }
  }

  private handleRawPacket(data: Buffer): void {
    const codeLength = 3;
    const rawHeaderLength = 7;
    const payloadHeaderLength = 11;

    if (data.length < payloadHeaderLength) return;

    const cid = data.readUInt16BE(1);
    const code = data.readInt32BE(codeLength);
    const payloadLen = data.readInt32BE(rawHeaderLength);
    const payload = data.subarray(
      payloadHeaderLength,
      payloadHeaderLength + payloadLen,
    );

    if (!this._streams.has(cid)) {
      this._streams.set(cid, []);
    }

    const chunks = this._streams.get(cid)!;
    const responseCode = (code >>> 16) & 0xffff;
    const finFlag = code & 0xffff;

    if (finFlag === CODE_FIN) {
      if (payloadLen > 0) chunks.push(Buffer.from(payload));
      const completeBuffer = Buffer.concat(chunks);
      this._onMessage!(cid, responseCode, completeBuffer);
      this._streams.delete(cid);
    } else {
      chunks.push(Buffer.from(payload));
    }
  }

  private normalizeEnvelope(envelope: tsproto.Envelope): void {
    if (envelope.channel_message && envelope.channel_message.code == undefined) {
      envelope.channel_message.code = 0;
    }
  }
}

export default AbridgedTcpAdapter;
