import tls from "node:tls";
import type { CloseEvent } from "ws";
import * as apiproto from "../api/api";
import * as tsproto from "../rtapi/realtime";
import { getEnvelopeEventKeys } from "../utils/helper";
import {
  decodeEnvelopePayload,
  realtimePayload,
  scanRealtimeCid,
} from "./protobuf_decode";
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

type DecodedFrame =
  | { type: "pong"; cid: number }
  | {
      type: "raw";
      cid: number;
      code: number;
      final: boolean;
      payload: Buffer;
    }
  | { type: "realtime"; payload: Buffer; websocket: boolean };

type FrameStep =
  | { type: "need-more" }
  | { type: "reset"; reason: string }
  | { type: "frame"; consumed: number; frame: DecodedFrame };

interface RawStream {
  chunks: Buffer[];
  length: number;
}

const CODE_FIN = 0xff;
const PREFIX_RAW = 0xff;
const PREFIX_EXTENDED = 0x7f;
const RAW_HEADER_LENGTH = 11;
const MAX_REALTIME_FRAME_LENGTH = 1 << 20;
const MAX_API_RESPONSE_LENGTH = 16 << 20;
const MAX_WRITE_QUEUE_LENGTH = 8 << 20;
const RESPONSE_CODE_TOO_LARGE = 0xffff;

function errorEvent(message: string): Event {
  return { type: "error", message } as unknown as Event;
}

function frameHandshake(token: string): Buffer {
  const tokenBytes = Buffer.from(token, "utf8");
  const padding = (4 - (tokenBytes.length % 4)) % 4;
  const payload = Buffer.concat([tokenBytes, Buffer.alloc(padding)]);
  const lengthDiv4 = payload.length / 4;

  if (lengthDiv4 < PREFIX_EXTENDED) {
    return Buffer.concat([
      Buffer.from([0xef, lengthDiv4]),
      payload,
    ]);
  }
  if (lengthDiv4 > 0xffffff) {
    throw new Error("Handshake token is too large.");
  }

  const header = Buffer.alloc(5);
  header[0] = 0xef;
  header[1] = PREFIX_EXTENDED;
  header.writeUIntLE(lengthDiv4, 2, 3);
  return Buffer.concat([header, payload]);
}

function decodeFrame(buffer: Buffer): FrameStep {
  const first = buffer[0];

  if (first === 0x00) {
    if (buffer.length < 3) return { type: "need-more" };
    return {
      type: "frame",
      consumed: 3,
      frame: { type: "pong", cid: buffer.readUInt16BE(1) },
    };
  }

  if (first === PREFIX_RAW) {
    if (buffer.length < RAW_HEADER_LENGTH) return { type: "need-more" };

    const cid = buffer.readUInt16BE(1);
    const code = buffer.readUInt32BE(3);
    const payloadLength = buffer.readUInt32BE(7);
    if (payloadLength > MAX_API_RESPONSE_LENGTH) {
      return { type: "reset", reason: "raw frame length too large" };
    }

    const total = RAW_HEADER_LENGTH + payloadLength;
    if (buffer.length < total) return { type: "need-more" };

    return {
      type: "frame",
      consumed: total,
      frame: {
        type: "raw",
        cid,
        code: (code >>> 16) & 0xffff,
        final: (code & 0xffff) === CODE_FIN,
        payload: Buffer.from(buffer.subarray(RAW_HEADER_LENGTH, total)),
      },
    };
  }

  if (first < PREFIX_EXTENDED) {
    const total = 1 + first * 4;
    if (buffer.length < total) return { type: "need-more" };
    return {
      type: "frame",
      consumed: total,
      frame: {
        type: "realtime",
        payload: Buffer.from(realtimePayload(buffer.subarray(1, total))),
        websocket: false,
      },
    };
  }

  if (first === PREFIX_EXTENDED) {
    if (buffer.length < 4) return { type: "need-more" };

    const payloadLength = buffer.readUIntLE(1, 3) * 4;
    if (payloadLength > MAX_REALTIME_FRAME_LENGTH) {
      return {
        type: "reset",
        reason: "extended frame length too large",
      };
    }

    const total = 4 + payloadLength;
    if (buffer.length < total) return { type: "need-more" };
    return {
      type: "frame",
      consumed: total,
      frame: {
        type: "realtime",
        payload: Buffer.from(realtimePayload(buffer.subarray(4, total))),
        websocket: false,
      },
    };
  }

  if (first === 0x82) {
    if (buffer.length < 2) return { type: "need-more" };

    const second = buffer[1];
    if ((second & 0x80) !== 0) {
      return { type: "reset", reason: "masked websocket frame" };
    }

    const length7 = second & 0x7f;
    let headerLength: number;
    let payloadLength: number;
    if (length7 < 126) {
      headerLength = 2;
      payloadLength = length7;
    } else if (length7 === 126) {
      if (buffer.length < 4) return { type: "need-more" };
      headerLength = 4;
      payloadLength = buffer.readUInt16BE(2);
    } else {
      if (buffer.length < 10) return { type: "need-more" };
      const high = buffer.readUInt32BE(2);
      if (high !== 0) {
        return {
          type: "reset",
          reason: "websocket frame length too large",
        };
      }
      headerLength = 10;
      payloadLength = buffer.readUInt32BE(6);
    }

    if (payloadLength > MAX_REALTIME_FRAME_LENGTH) {
      return {
        type: "reset",
        reason: "websocket frame length too large",
      };
    }

    const total = headerLength + payloadLength;
    if (buffer.length < total) return { type: "need-more" };
    return {
      type: "frame",
      consumed: total,
      frame: {
        type: "realtime",
        payload: Buffer.from(buffer.subarray(headerLength, total)),
        websocket: true,
      },
    };
  }

  return { type: "reset", reason: "unexpected lead byte" };
}

export class MezonNetworkAdapter implements TransportAdapter {
  private _socket?: tls.TLSSocket;
  private _connected = false;
  private _readBuffer = Buffer.alloc(0);
  private _streams = new Map<number, RawStream>();
  private _writeQueue: Buffer[] = [];
  private _queuedWriteLength = 0;
  private _writing = false;
  private _removeAbortListener?: () => void;

  private _onClose: PlainFn<SocketCloseHandler> | null = null;
  private _onError: PlainFn<SocketErrorHandler> | null = null;
  private _onMessage: PlainFn<SocketMessageHandler> | null = null;
  private _onOpen: PlainFn<SocketOpenHandler> | null = null;

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
    this.disposeSocket();
    this.resetState();

    const parsedPort = Number.parseInt(port, 10);
    if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
      this._onError?.(errorEvent(`Invalid TCP port: ${port}`));
      return;
    }

    const client = tls.connect({
      host,
      port: parsedPort,
      servername: host,
      rejectUnauthorized: true,
    });
    this._socket = client;

    const abort = () => {
      if (this._socket === client) client.destroy();
    };
    signal?.addEventListener("abort", abort, { once: true });
    this._removeAbortListener = () =>
      signal?.removeEventListener("abort", abort);

    client.once("secureConnect", () => {
      if (this._socket !== client) return;
      try {
        const handshake = frameHandshake(token);
        this.enqueueWrite(handshake);
        this._connected = true;
        this._onOpen?.(new Event("open"));
      } catch (error) {
        client.destroy(
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    });

    client.on("data", (chunk: Buffer) => {
      if (this._socket !== client || chunk.length === 0) return;
      if (
        this._readBuffer.length === 0 &&
        chunk.subarray(0, 5).toString("ascii") === "HTTP/"
      ) {
        this.handleDesync("server returned HTTP on the abridged TCP port");
        return;
      }

      this._readBuffer = Buffer.concat([this._readBuffer, chunk]);
      this.processReadBuffer();
    });

    client.on("error", (error) => {
      if (this._socket !== client) return;
      this._onError?.(errorEvent(error.message));
    });

    client.once("close", (hadError) => {
      this._removeAbortListener?.();
      this._removeAbortListener = undefined;
      if (this._socket !== client) return;
      this._socket = undefined;
      this.resetState();
      this._onClose?.({
        type: "close",
        wasClean: !hadError,
      } as CloseEvent);
    });

    if (signal?.aborted) abort();
  }

  private processReadBuffer(): void {
    let consumed = 0;

    while (consumed < this._readBuffer.length) {
      const step = decodeFrame(this._readBuffer.subarray(consumed));
      if (step.type === "need-more") break;
      if (step.type === "reset") {
        this.handleDesync(step.reason);
        return;
      }

      consumed += step.consumed;
      this.dispatchFrame(step.frame);
    }

    if (consumed > 0) {
      this._readBuffer = Buffer.from(this._readBuffer.subarray(consumed));
    }
  }

  private dispatchFrame(frame: DecodedFrame): void {
    if (frame.type === "pong") {
      this._onMessage?.(frame.cid, 0, { pong: {} });
      return;
    }

    if (frame.type === "raw") {
      this.dispatchRawFrame(frame);
      return;
    }

    const cid = scanRealtimeCid(frame.payload);
    if (frame.websocket && this.dispatchRawChannelMessage(frame.payload)) {
      return;
    }
    try {
      this._onMessage?.(cid, 0, decodeEnvelopePayload(frame.payload));
    } catch {}
  }

  private dispatchRawFrame(
    frame: Extract<DecodedFrame, { type: "raw" }>,
  ): void {
    const existing = this._streams.get(frame.cid);

    if (frame.final) {
      const payload = existing
        ? Buffer.concat(
            [...existing.chunks, frame.payload],
            existing.length + frame.payload.length,
          )
        : frame.payload;
      this._streams.delete(frame.cid);
      this._onMessage?.(frame.cid, frame.code, payload);
      return;
    }

    const stream = existing ?? { chunks: [], length: 0 };
    stream.chunks.push(frame.payload);
    stream.length += frame.payload.length;
    if (stream.length > MAX_API_RESPONSE_LENGTH) {
      this._streams.delete(frame.cid);
      this._onMessage?.(frame.cid, RESPONSE_CODE_TOO_LARGE, Buffer.alloc(0));
      return;
    }
    this._streams.set(frame.cid, stream);
  }

  private dispatchRawChannelMessage(payload: Buffer): boolean {
    try {
      const envelope = tsproto.Envelope.decode(payload);
      const eventKeys = getEnvelopeEventKeys(
        envelope as unknown as Record<string, unknown>,
      );
      if (envelope.cid !== 0 || eventKeys.length > 0) return false;
    } catch {
      // Try the legacy server shape below.
    }

    try {
      const channelMessage = apiproto.ChannelMessage.decode(payload);
      if (!channelMessage.message_id || !channelMessage.channel_id) {
        return false;
      }
      const envelope = tsproto.Envelope.fromPartial({
        channel_message: channelMessage,
      });
      this._onMessage?.(0, 0, envelope);
      return true;
    } catch {
      return false;
    }
  }

  private handleDesync(reason: string): void {
    this._readBuffer = Buffer.alloc(0);
    this._streams.clear();
    this._onError?.(errorEvent(`TCP frame desync: ${reason}`));
    this._socket?.destroy();
  }

  private enqueueWrite(buffer: Buffer): void {
    if (!this._socket || this._socket.destroyed) {
      throw new Error("Connection is not open.");
    }
    if (this._queuedWriteLength + buffer.length > MAX_WRITE_QUEUE_LENGTH) {
      throw new Error("TCP write queue is full.");
    }

    this._writeQueue.push(buffer);
    this._queuedWriteLength += buffer.length;
    this.flushWriteQueue();
  }

  private flushWriteQueue(): void {
    if (this._writing || this._writeQueue.length === 0) return;
    const client = this._socket;
    if (!client || client.destroyed) {
      this._writeQueue = [];
      this._queuedWriteLength = 0;
      return;
    }

    const buffer = this._writeQueue[0];
    this._writing = true;
    client.write(buffer, (error?: Error | null) => {
      this._writing = false;
      if (this._writeQueue[0] === buffer) {
        this._writeQueue.shift();
        this._queuedWriteLength -= buffer.length;
      }
      if (error) {
        client.destroy(error);
        return;
      }
      this.flushWriteQueue();
    });
  }

  private resetState(): void {
    this._connected = false;
    this._readBuffer = Buffer.alloc(0);
    this._streams.clear();
    this._writeQueue = [];
    this._queuedWriteLength = 0;
    this._writing = false;
  }

  private disposeSocket(): void {
    this._removeAbortListener?.();
    this._removeAbortListener = undefined;
    const socket = this._socket;
    this._socket = undefined;
    if (socket) {
      socket.removeAllListeners();
      socket.destroy();
    }
  }

  sendPing(cid: number): void {
    if (!this.isOpen()) throw new Error("Connection is not open.");
    if (!Number.isInteger(cid) || cid < 0 || cid > 0xffff) {
      throw new Error(`Ping cid is out of range: ${cid}`);
    }
    const buffer = Buffer.alloc(3);
    buffer[0] = 0x00;
    buffer.writeUInt16BE(cid, 1);
    this.enqueueWrite(buffer);
  }

  send(message: any): void {
    if (!this.isOpen()) throw new Error("Connection is not open.");
    if (message.ping) {
      this.sendPing(message.cid);
      return;
    }

    const encoded = Buffer.from(
      tsproto.Envelope.encode(
        tsproto.Envelope.fromPartial(message),
      ).finish(),
    );
    const padding = (4 - (encoded.length % 4)) % 4;
    const payload = Buffer.concat([encoded, Buffer.alloc(padding)]);
    if (payload.length > MAX_REALTIME_FRAME_LENGTH) {
      throw new Error("Realtime frame is too large.");
    }

    const lengthDiv4 = payload.length / 4;
    let header: Buffer;
    if (lengthDiv4 < PREFIX_EXTENDED) {
      header = Buffer.from([lengthDiv4]);
    } else {
      header = Buffer.alloc(4);
      header[0] = PREFIX_EXTENDED;
      header.writeUIntLE(lengthDiv4, 1, 3);
    }

    this.enqueueWrite(Buffer.concat([header, payload]));
  }

  isOpen(): boolean {
    return (
      this._connected &&
      !!this._socket &&
      !this._socket.destroyed
    );
  }

  close(): void {
    this._connected = false;
    this._readBuffer = Buffer.alloc(0);
    this._streams.clear();
    this._writeQueue = [];
    this._queuedWriteLength = 0;
    this._socket?.destroy();
  }
}
