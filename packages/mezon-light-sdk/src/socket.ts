import { WebSocketAdapterPb } from "./web_socket_adapter_pb";
import { SendMessagePayload } from "./types";
import {
  SOCKET_READY_MAX_RETRY,
  SOCKET_READY_RETRY_DELAY,
  CLAN_DM,
  STREAM_MODE_DM,
  CHANNEL_TYPE_DM,
  STREAM_MODE_GROUP,
  CHANNEL_TYPE_GROUP,
} from "./constants";
import { LightClient } from "./client";
import { Socket } from "./socket.gen";
import { Session } from "./session";
import { ChannelMessage } from "./api.gen";

/**
 * Error thrown when socket operations fail.
 */
export class SocketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SocketError";
  }
}

/**
 * Configuration options for socket connection.
 */
export interface SocketConnectOptions {
  /** Callback for socket errors */
  onError?: (error: unknown) => void;
  /** Callback when socket disconnects */
  onDisconnect?: () => void;
  /** Whether to enable verbose logging */
  verbose?: boolean;
}

/**
 * Callback type for channel message events.
 */
export type ChannelMessageHandler = (message: ChannelMessage) => void;

/**
 * Waits for a socket to be in a ready state with exponential backoff.
 *
 * @param socket - The socket to wait for
 * @param maxRetries - Maximum number of retry attempts
 * @param initialDelay - Initial delay in milliseconds
 * @throws {SocketError} If socket doesn't become ready within retry limit
 */
async function waitForSocketReady(
  socket: Socket,
  maxRetries: number = SOCKET_READY_MAX_RETRY,
  initialDelay: number = SOCKET_READY_RETRY_DELAY,
): Promise<void> {
  let retryCount = 0;
  let delay = initialDelay;

  // Type assertion to access internal adapter
  const socketWithAdapter = socket as Socket & {
    adapter?: { isOpen(): boolean };
  };

  while (retryCount < maxRetries) {
    if (socketWithAdapter.adapter?.isOpen()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 2; // Exponential backoff
    retryCount++;
  }

  throw new SocketError(
    `Socket failed to connect after ${maxRetries} attempts (total wait: ~${Math.pow(2, maxRetries) * initialDelay}ms)`,
  );
}

/**
 * LightSocket provides a simplified interface for Mezon real-time messaging.
 *
 * @example
 * ```typescript
 * const socket = new LightSocket(client.client, client.session);
 *
 * await socket.connect({
 *   onError: (err) => console.error('Socket error:', err),
 *   onDisconnect: () => console.log('Disconnected')
 * });
 *
 * socket.onChannelMessage((msg) => {
 *   console.log('Received message:', msg.content);
 * });
 *
 * await socket.joinDMChannel('channel-123');
 * await socket.sendDM({ channelId: 'channel-123', content: 'Hello!' });
 * ```
 */
export class LightSocket {
  private _socket: Socket | null = null;
  private _isConnected = false;
  private _messageHandlers: ChannelMessageHandler[] = [];
  private _errorHandler?: (error: unknown) => void;
  private _disconnectHandler?: () => void;

  constructor(private readonly _client: LightClient, private readonly _session: Session) { }

  /**
   * Gets whether the socket is currently connected.
   */
  get isConnected(): boolean {
    return this._isConnected;
  }

  /**
   * Gets the underlying socket instance.
   * @throws {SocketError} If socket is not connected
   */
  get socket(): Socket {
    if (!this._socket) {
      throw new SocketError("Socket is not connected. Call connect() first.");
    }
    return this._socket;
  }

  /**
   * Connects to the Mezon real-time server.
   *
   * @param options - Connection options including error handlers
   * @throws {SocketError} If already connected or connection fails
   */
  async connect(options: SocketConnectOptions = {}): Promise<void> {
    if (this._isConnected) {
      throw new SocketError("Socket is already connected. Call disconnect() first.");
    }

    const { onError, onDisconnect, verbose = false } = options;

    this._errorHandler = onError;
    this._disconnectHandler = onDisconnect;

    this._socket = this._client.createSocket(verbose, new WebSocketAdapterPb());

    // Set up error handler
    this._socket.onerror = (error: unknown) => {
      this._errorHandler?.(error);
    };

    // Set up disconnect handler
    this._socket.ondisconnect = () => {
      this._isConnected = false;
      this._disconnectHandler?.();
    };

    // Set up message handler that dispatches to all registered handlers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._socket.onchannelmessage = (channelMessage: ChannelMessage) => {
      if (!channelMessage) {
        this._errorHandler?.(new SocketError("Received null or undefined channel message"));
        return;
      }

      this._messageHandlers.forEach((handler) => {
        try {
          handler(channelMessage);
        } catch (error) {
          console.error("Error in message handler:", error);
        }
      });
    };

    await this._socket.connect(this._session, true, "0");
    this._isConnected = true;
  }

  /**
   * Disconnects from the Mezon server.
   */
  disconnect(): void {
    if (this._socket) {
      this._socket.disconnect(true);
      this._socket = null;
      this._isConnected = false;
    }
  }

  /**
   * Registers a handler for incoming channel messages.
   * Multiple handlers can be registered and will all receive messages.
   *
   * @param handler - Callback function to handle messages
   */
  setChannelMessageHandler(cb: ChannelMessageHandler): void {
    this.onChannelMessage(cb);
  }

  /**
   * Registers a handler for incoming channel messages.
   * Multiple handlers can be registered and will all receive messages.
   *
   * @param handler - Callback function to handle messages
   * @returns A function to unsubscribe the handler
   */
  onChannelMessage(handler: ChannelMessageHandler): () => void {
    this._messageHandlers.push(handler);

    // Return unsubscribe function
    return () => {
      const index = this._messageHandlers.indexOf(handler);
      if (index !== -1) {
        this._messageHandlers.splice(index, 1);
      }
    };
  }

  /**
  * Joins a DM channel to receive messages from it.
  *
  * @param channelId - The DM channel ID to join
  * @throws {SocketError} If socket is not ready or join fails
  */
  async joinDMChannel(channelId: string): Promise<void> {
    await waitForSocketReady(this.socket);
    await this.socket.joinChat(CLAN_DM, channelId, CHANNEL_TYPE_DM, false);
  }

  /**
   * Joins a group channel to receive messages from it.
   *
   * @param channelId - The group channel ID to join
   * @throws {SocketError} If socket is not ready or join fails
   */
  async joinGroupChannel(channelId: string): Promise<void> {
    await waitForSocketReady(this.socket);
    await this.socket.joinChat(CLAN_DM, channelId, CHANNEL_TYPE_GROUP, false);
  }

  /**
   * Leaves a DM channel.
   *
   * @param channelId - The DM channel ID to leave
   */
  async leaveDMChannel(channelId: string): Promise<void> {
    await this.socket.leaveChat(CLAN_DM, channelId, CHANNEL_TYPE_DM, false);
  }

  /**
   * Leaves a group channel.
   *
   * @param channelId - The group channel ID to leave
   */
  async leaveGroupChannel(channelId: string): Promise<void> {
    await this.socket.leaveChat(CLAN_DM, channelId, CHANNEL_TYPE_GROUP, false);
  }

  /**
   * Sends a direct message to a channel.
   *
   * @param options - Message options including channelId, content, and attachments
   */
  async sendDM(payload: SendMessagePayload): Promise<void> {
    const { channelId, content, attachments, hideLink = false } = payload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.socket.writeChatMessage(
      CLAN_DM,
      channelId,
      STREAM_MODE_DM,
      false,
      content,
      attachments,
      false,
      hideLink,
      "",
      0,
    );
  }

  /**
   * Sends a direct message to a channel.
   *
   * @param options - Message options including channelId, content, and attachments
   */
  async sendGroup(payload: SendMessagePayload): Promise<void> {
    const { channelId, content, attachments, hideLink = false } = payload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.socket.writeChatMessage(
      CLAN_DM,
      channelId,
      STREAM_MODE_GROUP,
      false,
      content,
      attachments,
      false,
      hideLink,
      "",
      0,
    );
  }

  /**
   * Sets the error handler for socket errors.
   *
   * @param handler - Error handler callback
   */
  setErrorHandler(handler: (error: unknown) => void): void {
    this._errorHandler = handler;
    if (this._socket) {
      this._socket.onerror = handler;
    }
  }
}
