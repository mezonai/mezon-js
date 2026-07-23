import tls from "node:tls";
import type { CloseEvent } from "ws";
import * as tsproto from "../rtapi/realtime";
import {
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
  TransportAdapter,
} from "./transport_adapter";
import { decodeEnvelopePayload } from "./protobuf_decode";

type PlainFn<T extends (...args: any[]) => any> = T extends (
  this: any,
  ...args: infer A
) => infer R
  ? (...args: A) => R
  : never;

const CODE_FIN = 0xff;
const PONG_FRAME_LENGTH = 3;
const RAW_HEADER_LENGTH = 7;
const RAW_FRAME_HEADER_LENGTH = 11;
const LOG_PREFIX = "[mezon-tcp]";

function tcpVerbose(): boolean {
  return process.env.MEZON_TCP_DEBUG === "1";
}

function logTcpVerbose(...args: unknown[]): void {
  if (!tcpVerbose()) return;
  console.log(LOG_PREFIX, ...args);
}

function logTcpWarn(...args: unknown[]): void {
  console.warn(LOG_PREFIX, ...args);
}

export class MezonNetworkAdapter implements TransportAdapter {
  private _socket?: tls.TLSSocket;
  private _readBuffer = Buffer.alloc(0);
  private _onClose: PlainFn<SocketCloseHandler> | null = null;
  private _onError: PlainFn<SocketErrorHandler> | null = null;
  private _onMessage: PlainFn<SocketMessageHandler> | null = null;
  private _onOpen: PlainFn<SocketOpenHandler> | null = null;

  private _streams = new Map<number, Buffer[]>();

  getReadBufferState() {
    return {
      bufferLength: this._readBuffer.length,
      firstByte: this._readBuffer[0],
      pendingStreams: this._streams.size,
    };
  }

  set onClose(value: SocketCloseHandler | null) {
    this._onClose = value as PlainFn<SocketCloseHandler> | null;
  }

  set onOpen(value: SocketOpenHandler | null) {
    this._onOpen = value as PlainFn<SocketOpenHandler> | null;
  }

  set onError(value: SocketErrorHandler | null) {
    this._onError = value as PlainFn<SocketErrorHandler> | null;
  }

  set onMessage(value: SocketMessageHandler | null) {
    this._onMessage = value as PlainFn<SocketMessageHandler> | null;
  }

  connect(
    host: string,
    port: string,
    _createStatus: boolean,
    token: string,
    signal?: AbortSignal,
  ): void {
    logTcpVerbose("connect", { host, port });

    const client = tls.connect(parseInt(port, 10), host, {
      rejectUnauthorized: false,
    });

    this._socket = client;
    this._readBuffer = Buffer.alloc(0);

    client.on("secureConnect", () => {
      const tokenBytes = Buffer.from(token, "utf-8");
      const padding = (4 - (tokenBytes.length % 4)) % 4;
      const finalToken = Buffer.concat([tokenBytes, Buffer.alloc(padding, 0)]);

      const magicByte = Buffer.from([0xef]);
      const lenHeader = Buffer.from([finalToken.length / 4]);

      client.write(Buffer.concat([magicByte, lenHeader, finalToken]));
      this._onOpen?.(new Event("open") as Event);
    });

    client.on("data", (chunk: Buffer) => {
      logTcpVerbose("data chunk", {
        chunkLength: chunk.length,
        firstByte: chunk[0],
        bufferBefore: this._readBuffer.length,
      });

      this._readBuffer = Buffer.concat([this._readBuffer, chunk]);
      this.drainReceiveBuffer();
    });

    client.on("error", (err) =>
      this._onError?.({
        type: "error",
        message: err.message,
      } as unknown as Event),
    );

    client.on("close", (hadError) => {
      const unread = this._readBuffer.length;
      if (unread > 0) {
        logTcpWarn("close with unread buffer", {
          hadError,
          unreadBuffer: unread,
          firstByte: this._readBuffer[0],
          pendingStreams: this._streams.size,
        });
      }
      this._readBuffer = Buffer.alloc(0);
      this._streams.clear();
      this._onClose?.({
        type: "close",
        wasClean: !hadError,
      } as CloseEvent);
    });

    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }
  }

  private drainReceiveBuffer(): void {
    while (this._readBuffer.length > 0) {
      const consumed = this.tryParseFrame(this._readBuffer);
      if (consumed === null) {
        return;
      }
      if (consumed === 0) {
        return;
      }
      this._readBuffer = this._readBuffer.subarray(consumed);
    }
  }

  /** Returns bytes consumed, null if the frame is incomplete. */
  private tryParseFrame(data: Buffer): number | null {
    if (!this._onMessage || data.length === 0) {
      return 0;
    }

    const prefix = data[0];

    if (prefix === 0x00) {
      if (data.length < PONG_FRAME_LENGTH) {
        return null;
      }

      const cid = data.readUInt16BE(1);
      logTcpVerbose("pong", { cid });
      this._onMessage(cid, 0, { pong: {} });
      return PONG_FRAME_LENGTH;
    }

    if (prefix === CODE_FIN) {
      if (data.length < RAW_FRAME_HEADER_LENGTH) {
        return null;
      }

      const cid = data.readUInt16BE(1);
      const code = data.readInt32BE(3);
      const payloadLen = data.readInt32BE(RAW_HEADER_LENGTH);
      const frameLength = RAW_FRAME_HEADER_LENGTH + payloadLen;
      const responseCode = (code >>> 16) & 0xffff;
      const finFlag = code & 0xffff;

      if (data.length < frameLength) {
        logTcpWarn("raw-api incomplete", {
          cid,
          bufferLength: data.length,
          expectedFrameLength: frameLength,
          missingBytes: frameLength - data.length,
        });
        return null;
      }

      const payload = data.subarray(
        RAW_FRAME_HEADER_LENGTH,
        RAW_FRAME_HEADER_LENGTH + payloadLen,
      );

      if (!this._streams.has(cid)) {
        this._streams.set(cid, []);
      }

      const chunks = this._streams.get(cid)!;

      if (finFlag === CODE_FIN) {
        if (payloadLen > 0) {
          chunks.push(payload);
        }

        const completeBuffer = Buffer.concat(chunks);
        logTcpVerbose("raw-api complete", {
          cid,
          responseCode,
          totalBytes: completeBuffer.length,
        });
        this._onMessage(cid, responseCode, completeBuffer);
        this._streams.delete(cid);
      } else {
        chunks.push(Buffer.from(payload));
      }

      return frameLength;
    }

    let headerSize = 0;
    let payloadLength = 0;

    if (prefix < 127) {
      headerSize = 1;
      payloadLength = prefix * 4;
    } else if (prefix === 0x7f) {
      if (data.length < 4) {
        return null;
      }
      headerSize = 4;
      payloadLength = data.readUIntLE(1, 3) * 4;
    } else {
      logTcpWarn("unexpected first byte", { prefix, bufferLength: data.length });
      return 1;
    }

    const frameLength = headerSize + payloadLength;

    if (data.length < frameLength) {
      const partialPayload = data.subarray(headerSize);
      try {
        const envelope = decodeEnvelopePayload(partialPayload);
        logTcpVerbose("abridged early complete", {
          cid: envelope.cid,
          bufferLength: data.length,
          expectedFrameLength: frameLength,
        });
        this._onMessage(envelope.cid, 0, envelope);
        return data.length;
      } catch {
        logTcpWarn("abridged incomplete", {
          prefix,
          bufferLength: data.length,
          expectedFrameLength: frameLength,
          missingBytes: frameLength - data.length,
        });
        return null;
      }
    }

    const payload = data.subarray(headerSize, frameLength);

    try {
      const envelope = decodeEnvelopePayload(payload);
      logTcpVerbose("abridged decode ok", { cid: envelope.cid });
      this._onMessage(envelope.cid, 0, envelope);
    } catch (err) {
      logTcpWarn("abridged decode failed", {
        error: err instanceof Error ? err.message : err,
        prefix,
        frameLength,
      });
    }

    return frameLength;
  }

  sendPing(cid: number) {
    const buffer = Buffer.alloc(3);
    buffer[0] = 0x00;
    buffer.writeUInt16BE(cid, 1);
    this._socket?.write(buffer);
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
      encodedMsg,
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

    logTcpVerbose("send", {
      cid: msg.cid,
      keys: Object.keys(msg).filter((k) => k !== "cid"),
    });

    this._socket.write(Buffer.concat([header, finalPayload]));
  }

  isOpen(): boolean {
    return !!this._socket && !this._socket.destroyed;
  }

  close(): void {
    if (!this._socket) return;
    this._readBuffer = Buffer.alloc(0);
    this._streams.clear();
    try {
      this._socket.destroy();
      this._socket = undefined;
    } catch (err) {
      console.log(err, "err close socket");
    }
  }
}
