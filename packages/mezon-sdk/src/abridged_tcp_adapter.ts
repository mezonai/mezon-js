import net from "node:net";
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
  private _socket?: net.Socket;
  private _onClose: PlainFn<SocketCloseHandler> | null = null;
  private _onError: PlainFn<SocketErrorHandler> | null = null;
  private _onMessage: PlainFn<SocketMessageHandler> | null = null;
  private _onOpen: PlainFn<SocketOpenHandler> | null = null;
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
    port = '7349'
    const client = net.createConnection({ host, port: parseInt(port, 10) });
    this._socket = client;

    client.on("connect", () => {
      const magicByte = Buffer.from([0xef]);
      const tokenBytes = Buffer.from(token, "utf-8");
      client.write(Buffer.concat([magicByte, tokenBytes]));
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
    this._streams.clear();
  }

  private sendPing(cid: number): void {
    const buffer = Buffer.alloc(3);
    buffer[0] = 0x00;
    buffer.writeUInt16BE(cid, 1);
    this._socket?.write(buffer);
  }

  private handleData(data: Buffer): void {
    if (!this._onMessage || data.length < 1) return;

    const prefix = data[0];

    if (prefix === 0x00) {
      if (data.length < 3) return;
      const cid = data.readUInt16BE(1);
      this._onMessage(cid, 0, { pong: {} });
      return;
    }

    if (prefix === 0xff) {
      this.handleRawPacket(data);
      return;
    }

    let headerSize = 0;
    let payloadLength = 0;
    if (prefix < 127) {
      headerSize = 1;
      payloadLength = prefix * 4;
    } else if (prefix === 0x7f) {
      if (data.length < 4) return;
      headerSize = 4;
      payloadLength = data.readUIntLE(1, 3) * 4;
    } else {
      console.warn("Received unexpected first byte:", prefix);
      return;
    }

    const payload = data.subarray(headerSize, headerSize + payloadLength);
    try {
      const envelope = tsproto.Envelope.decode(new Uint8Array(payload));
      this.normalizeEnvelope(envelope);
      this._onMessage(envelope.cid, 0, envelope);
    } catch (err) {
      console.error("TCP Protobuf Decode Error:", err);
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
