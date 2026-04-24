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
      const PREFIX_RAW = 0xff;
      const CODE_LENGTH = 3;
      const RAW_HEADER_LENGTH = 7; // Header Length: 1 (Prefix) + 2 (CID) + 4 (Code) = 7 bytes
      const PAYLOAD_LENGTH = 11; // Header Length: 1 (Prefix) + 2 (CID) + 4 (Code)  + 4 (len payload) = 11 bytes

      if (!this._onMessage) return;

      let headerSize = 0;
      let payloadLength = 0;

      const prefix = data[0];

      // pong message
      if (prefix === 0x00) {
        if (data.length < 3) {
          return;
        }

        // Read the 16-bit CID starting from index 1
        const cid = data.readUInt16BE(1);

        this._onMessage(cid, 0, { pong: {} });

        return;
      }

      // API request
      if (prefix === PREFIX_RAW) {
        const cid = data.readUInt16BE(1); // Bytes 1-2
        const code = data.readInt32BE(CODE_LENGTH); // Bytes 3-6 (e.g. 3,4,5,6)
        const payloadLen = data.readInt32BE(RAW_HEADER_LENGTH); // Bytes 7-10
        const payload = data.subarray(
          PAYLOAD_LENGTH,
          PAYLOAD_LENGTH + payloadLen,
        );

        if (!this._streams.has(cid)) {
          this._streams.set(cid, []);
        }

        const chunks = this._streams.get(cid)!;
        const responseCode = (code >>> 16) & 0xffff;
        const finFlag = code & 0xffff;

        if (finFlag === CODE_FIN) {
          // If there's a final payload in the FIN packet, add it
          if (payloadLen > 0) chunks.push(payload);

          const completeBuffer = Buffer.concat(chunks);

          this._onMessage!(cid, responseCode, completeBuffer);

          this._streams.delete(cid);
        } else {
          chunks.push(Buffer.from(payload)); // Copy the subarray to ensure data persistence
        }

        return;
      }

      if (prefix < 127) {
        // Standard Abridged: 1-byte header
        headerSize = 1;
        payloadLength = prefix * 4;
      } else if (prefix === 0x7f) {
        // Extended Abridged: 0x7f + 3-bytes length (Little Endian)
        headerSize = 4;
        // Read 3 bytes starting from index 1
        payloadLength = data.readUIntLE(1, 3) * 4;
      } else {
        console.warn("Received unexpected first byte:", prefix);
        return;
      }

      const payload = data.subarray(headerSize, headerSize + payloadLength);

      try {
        const uintBuffer = new Uint8Array(payload);
        const envelope = tsproto.Envelope.decode(uintBuffer);

        this._onMessage(envelope.cid, 0, envelope);
      } catch (err) {
        console.error("TCP Protobuf Decode Error:", err);
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
    this._socket?.destroy();
    this._socket = undefined;
  }
}

