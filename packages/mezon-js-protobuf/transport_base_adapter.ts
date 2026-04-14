import * as tsproto from "./rtapi/realtime";
import {
  TransportAdapter,
  SocketCloseHandler,
  SocketErrorHandler,
  SocketMessageHandler,
  SocketOpenHandler,
} from "./transport_adapter";

export abstract class TransportBaseAdapter implements TransportAdapter {
  protected _isOpen: boolean = false;
  protected _counter: number = 0;
  protected _pingInterval?: any;

  // Storage for pending requests
  protected _pendingRequests: Map<
    string,
    {
      resolve: (value: any) => void;
      reject: (reason?: any) => void;
      timer: any;
    }
  > = new Map();

  public onClose: SocketCloseHandler | null = null;
  public onError: SocketErrorHandler | null = null;
  public onMessage: SocketMessageHandler | null = null;
  public onOpen: SocketOpenHandler | null = null;

  abstract connect(
    scheme: string,
    host: string,
    port: string,
    createStatus: boolean,
    token: string,
    platform: string,
    signal?: AbortSignal,
  ): void;
  abstract close(): void;

  // This is the raw send implementation specific to TCP or WebSocket
  protected abstract transmit(data: Uint8Array): void;
  protected abstract transmitPing(): void;

  protected startHeartbeat(intervalMs: number = 30000) {
    this.stopHeartbeat();
    this._pingInterval = setInterval(() => {
      if (this._isOpen) {
        this.transmitPing(); 
      }
    }, intervalMs);
  }

  protected stopHeartbeat() {
    if (this._pingInterval) clearInterval(this._pingInterval);
  }

  isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Centralized send method that handles correlation IDs and Promises
   */
  public async send(msg: any, timeoutMs: number = 10000): Promise<any> {
    if (!this._isOpen) {
      throw new Error("Transport adapter is not connected.");
    }

    const cid = (++this._counter).toString();
    const payload = { ...msg, cid };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this._pendingRequests.has(cid)) {
          this._pendingRequests.delete(cid);
          reject(new Error(`Request ${cid} timed out after ${timeoutMs}ms`));
        }
      }, timeoutMs);

      this._pendingRequests.set(cid, { resolve, reject, timer });

      try {
        const envelopeWriter = tsproto.Envelope.encode(
          tsproto.Envelope.fromPartial(payload),
        );
        this.transmit(envelopeWriter.finish());
      } catch (err) {
        clearTimeout(timer);
        this._pendingRequests.delete(cid);
        reject(err);
      }
    });
  }

  /**
   * Logic to check if an incoming message is a response to a pending request
   */
  protected handleIncomingEnvelope(envelope: any): void {
    const cid = envelope.cid;

    if (cid && this._pendingRequests.has(cid)) {
      const { resolve, timer } = this._pendingRequests.get(cid)!;
      clearTimeout(timer);
      this._pendingRequests.delete(cid);
      resolve(envelope);
    } else if (this.onMessage) {
      // Fallback: It's a broadcast/push message from the server
      this.onMessage(envelope);
    }
  }

  /**
   * Cleanup method to be called when the socket closes
   */
  protected clearPendingRequests(reason: string = "Connection closed"): void {
    this._pendingRequests.forEach(({ reject, timer }) => {
      clearTimeout(timer);
      reject(new Error(reason));
    });
    this._pendingRequests.clear();
  }
}
