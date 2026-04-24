import WebSocket, { CloseEvent, ErrorEvent } from "ws";

/**
 * An interface used by Mezon's socket layer to determine the transport protocol.
 */
export interface TransportAdapter {
  /**
   * Dispatched when the socket closes.
   */
  onClose: SocketCloseHandler | null;

  /**
   * Dispatched when the socket receives an error.
   */
  onError: SocketErrorHandler | null;

  /**
   * Dispatched when the socket receives a normal message.
   */
  onMessage: SocketMessageHandler | null;

  /**
   * Dispatched when the socket opens.
   */
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

/**
 * SocketCloseHandler defines a lambda that handles socket close events.
 */
export interface SocketCloseHandler {
  (this: WebSocket, evt: CloseEvent): void;
}

/**
 * SocketErrorHandler defines a lambda that handles socket errors.
 */
export interface SocketErrorHandler {
  (this: WebSocket, evt: ErrorEvent): void;
}

/**
 * SocketMessageHandler defines a lambda that handles valid socket messages.
 */
export interface SocketMessageHandler {
  (cid: number, code: number, message: any): void;
}

/**
 * SocketOpenHandler defines a lambda that handles socket open events.
 */
export interface SocketOpenHandler {
  (this: WebSocket, evt: WebSocket.Event): void;
}
