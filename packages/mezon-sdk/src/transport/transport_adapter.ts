import type { CloseEvent } from "ws";

/**
 * An interface used by Mezon's transport layer to determine the payload protocol.
 */
export interface TransportAdapter {
  onClose: SocketCloseHandler | null;
  onError: SocketErrorHandler | null;
  onMessage: SocketMessageHandler | null;
  onOpen: SocketOpenHandler | null;

  isOpen(): boolean;
  close(): void;
  connect(
    host: string,
    port: string,
    createStatus: boolean,
    token: string,
    signal?: AbortSignal,
  ): void;
  send(message: any): void;
}

export interface SocketCloseHandler {
  (evt: CloseEvent): void;
}

export interface SocketErrorHandler {
  (evt: Event): void;
}

export interface SocketMessageHandler {
  (cid: number, code: number, message: any): void;
}

export interface SocketOpenHandler {
  (evt: Event): void;
}
