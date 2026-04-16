/**
 * An interface used by Mezon's web socket to determine the payload protocol.
 */
export interface TransportAdapter {
  /**
   * Dispatched when the web socket closes.
   */
  onClose: SocketCloseHandler | null;

  /**
   * Dispatched when the web socket receives an error.
   */
  onError: SocketErrorHandler | null;

  /**
   * Dispatched when the web socket receives a normal message.
   */
  onMessage: SocketMessageHandler | null;

  /**
   * Dispatched when the web socket opens.
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
 * SocketCloseHandler defines a lambda that handles WebSocket close events.
 */
export interface SocketCloseHandler {
  (this: WebSocket, evt: CloseEvent): void;
}

/**
 * SocketErrorHandler defines a lambda that handles responses from the server via WebSocket
 * that indicate an error.
 */
export interface SocketErrorHandler {
  (this: WebSocket, evt: Event): void;
}

/**
 * SocketMessageHandler defines a lambda that handles valid WebSocket messages.
 */
export interface SocketMessageHandler {
  (cid: number, code: number, message: any): void;
}

/**
 * SocketOpenHandler defines a lambda that handles WebSocket open events.
 */
export interface SocketOpenHandler {
  (this: WebSocket, evt: Event): void;
}
