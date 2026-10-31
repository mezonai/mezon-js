import * as tsproto from "./rtapi/realtime";
import {
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
  TransportAdapter,
} from "./transport_adapter";
import tls from "node:tls";

// Strip the `this: WebSocket` constraint so we can call handlers freely
type PlainFn<T extends (...args: any[]) => any> = T extends (
  this: any,
  ...args: infer A
) => infer R
  ? (...args: A) => R
  : never;

const CODE_FIN = 0xff;
const PREFIX_RAW = 0xff;
const PREFIX_EXTENDED = 0x7f;
const PREFIX_WEBSOCKET = 0x82;
const RAW_HEADER_LENGTH = 11;
const MAX_REALTIME_FRAME_LENGTH = 1 << 20;
const MAX_API_RESPONSE_LENGTH = 16 << 20;
const RESPONSE_CODE_TOO_LARGE = 0xffff;

function frameBounds(data: Buffer): [number, number] | undefined {
  const prefix = data[0];
  let header: number;
  let length: number;

  if (prefix === 0x00) {
    header = 3;
    length = 0;
  } else if (prefix === PREFIX_RAW) {
    if (data.length < RAW_HEADER_LENGTH) return undefined;
    header = RAW_HEADER_LENGTH;
    length = data.readUInt32BE(7);
    if (length > MAX_API_RESPONSE_LENGTH) {
      throw new Error(`API frame length ${length} is too large`);
    }
  } else if (prefix < PREFIX_EXTENDED) {
    header = 1;
    length = prefix * 4;
  } else if (prefix === PREFIX_EXTENDED) {
    if (data.length < 4) return undefined;
    header = 4;
    length = data.readUIntLE(1, 3) * 4;
  } else if (prefix === PREFIX_WEBSOCKET) {
    if (data.length < 2) return undefined;
    if (data[1] & 0x80) throw new Error("Masked WebSocket frame");
    header = 2;
    length = data[1];
    if (length === 126) {
      if (data.length < 4) return undefined;
      header = 4;
      length = data.readUInt16BE(2);
    } else if (length === 127) {
      if (data.length < 10) return undefined;
      header = 10;
      length = data.readUInt32BE(2) * 2 ** 32 + data.readUInt32BE(6);
    }
  } else {
    throw new Error(`Unexpected first byte ${prefix}`);
  }

  if (prefix !== PREFIX_RAW && length > MAX_REALTIME_FRAME_LENGTH) {
    throw new Error(`Realtime frame length ${length} is too large`);
  }
  return data.length < header + length ? undefined : [header, header + length];
}

export class MezonNetworkAdapter implements TransportAdapter {
  private _socket?: any;
  private _onClose: PlainFn<SocketCloseHandler> | null = null;
  private _onError: PlainFn<SocketErrorHandler> | null = null;
  private _onMessage: PlainFn<SocketMessageHandler> | null = null;
  private _onOpen: PlainFn<SocketOpenHandler> | null = null;

  private _streams = new Map<number, Buffer[]>();

  constructor() {}

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
    const client = tls.connect(parseInt(port), host, {
      rejectUnauthorized: false,
    });

    // Assign immediately so isOpen(), send(), and close() work right away
    this._socket = client;
    this._streams.clear();
    let pending: Buffer = Buffer.alloc(0);

    client.on("secureConnect", () => {
      const tokenBytes = Buffer.from(token, "utf-8");
      // Ensure length is a multiple of 4 for Abridged protocol
      const padding = (4 - (tokenBytes.length % 4)) % 4;
      const finalToken = Buffer.concat([tokenBytes, Buffer.alloc(padding, 0)]);

      const magicByte = Buffer.from([0xef]);
      // The length byte: total bytes / 4
      const lenHeader = Buffer.from([finalToken.length / 4]);

      client.write(Buffer.concat([magicByte, lenHeader, finalToken]));

      this._onOpen?.(new Event("open") as Event);
    });

    client.on("data", (data: Buffer) => {
      pending = pending.length > 0 ? Buffer.concat([pending, data]) : data;

      while (pending.length > 0 && !client.destroyed) {
        let bounds: [number, number] | undefined;
        try {
          bounds = frameBounds(pending);
        } catch (err) {
          console.error("TCP frame desync:", err);
          client.destroy();
          return;
        }
        if (!bounds) return;

        const frame = pending.subarray(0, bounds[1]);
        pending = pending.subarray(bounds[1]);
        this.handleFrame(frame, bounds[0]);
      }
    });

    client.on("error", (err) =>
      this._onError?.(
        new ErrorEvent("error", { error: err, message: err.message }),
      ),
    );

    client.on("close", (hadError) =>
      this._onClose?.(new CloseEvent("close", { wasClean: !hadError })),
    );

    if (signal) {
      signal.addEventListener("abort", () => this.close());
    }
  }

  private handleFrame(frame: Buffer, headerSize: number) {
    const prefix = frame[0];

    // pong message
    if (prefix === 0x00) {
      this._onMessage?.(frame.readUInt16BE(1), 0, { pong: {} });
      return;
    }

    // API request
    if (prefix === PREFIX_RAW) {
      const cid = frame.readUInt16BE(1); // Bytes 1-2
      const code = frame.readInt32BE(3); // Bytes 3-6 (e.g. 3,4,5,6)
      const payload = frame.subarray(headerSize);

      if (!this._streams.has(cid)) {
        this._streams.set(cid, []);
      }

      const chunks = this._streams.get(cid)!;
      const responseCode = (code >>> 16) & 0xffff;
      const finFlag = code & 0xffff;

      if (finFlag === CODE_FIN) {
        // If there's a final payload in the FIN packet, add it
        if (payload.length > 0) chunks.push(payload);

        const completeBuffer = Buffer.concat(chunks);

        this._onMessage?.(cid, responseCode, completeBuffer);

        this._streams.delete(cid);
      } else {
        chunks.push(Buffer.from(payload)); // Copy the subarray to ensure data persistence
        if (
          chunks.reduce((total, chunk) => total + chunk.length, 0) >
          MAX_API_RESPONSE_LENGTH
        ) {
          this._streams.delete(cid);
          this._onMessage?.(cid, RESPONSE_CODE_TOO_LARGE, Buffer.alloc(0));
        }
      }

      return;
    }

    try {
      const uintBuffer = new Uint8Array(frame.subarray(headerSize));
      const envelope = tsproto.Envelope.decode(uintBuffer);

      this._onMessage?.(envelope.cid, 0, envelope);
    } catch (err) {
      console.error("TCP Protobuf Decode Error:", err);
    }
  }

  sendPing(cid: number) {
    // Allocate 3 bytes: 1 for the 0x00 marker, 2 for the 16-bit number
    const buffer = Buffer.alloc(3);

    // Set the first byte as our special marker
    buffer[0] = 0x00;

    // Write the CID starting at offset 1
    // If cid is 2, this writes 0x00 0x02
    buffer.writeUInt16BE(cid, 1);

    this._socket?.write(buffer);
  }

  send(msg: any): void {
    if (!this.isOpen() || !this._socket) return;

    if (msg.ping) {
      this.sendPing(msg.cid);
      return;
    }

    let encodedMsg = tsproto.Envelope.encode(
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

    this._socket.write(Buffer.concat([header, finalPayload]));
  }

  isOpen(): boolean {
    return !!this._socket && !this._socket.destroyed;
  }

  close(): void {
    if (!this._socket) return;
    this._socket.onOpen = null;
    this._socket.onClose = null;
    this._socket.onError = null;
    this._socket.onMessage = null;
    try {
      this._socket.destroy();
      this._socket = undefined;
    } catch (err) {
      console.log(err, 'err close socket');
    }
  }
}
