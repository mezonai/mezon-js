/**
 * Copyright 2020 The Mezon Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tsproto from "./rtapi/realtime";

/**
 * An interface used by Mezon's web socket to determine the payload protocol.
 */
export interface WebSocketAdapter {
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
    scheme: string,
    host: string,
    port: string,
    createStatus: boolean,
    token: string,
    platform: string,
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
  (message: any): void;
}

/**
 * SocketOpenHandler defines a lambda that handles WebSocket open events.
 */
export interface SocketOpenHandler {
  (this: WebSocket, evt: Event): void;
}

/**
 * A protocol buffer socket adapter that accepts and transmits payloads using the protobuf binary wire format.
 */
export class WebSocketAdapterPb implements WebSocketAdapter {
  private _socket?: WebSocket;

  constructor() {}

  get onClose(): SocketCloseHandler | null {
    return this._socket!.onclose;
  }

  set onClose(value: SocketCloseHandler | null) {
    this._socket!.onclose = value;
  }

  get onError(): SocketErrorHandler | null {
    return this._socket!.onerror;
  }

  set onError(value: SocketErrorHandler | null) {
    this._socket!.onerror = value;
  }

  get onMessage(): SocketMessageHandler | null {
    return this._socket!.onmessage;
  }

  set onMessage(value: SocketMessageHandler | null) {
    if (value) {
      this._socket!.onmessage = (evt: MessageEvent) => {
        const buffer: ArrayBuffer = evt.data;
        const uintBuffer: Uint8Array = new Uint8Array(buffer);
        const envelope = tsproto.Envelope.decode(uintBuffer);

        if (envelope.channel_message) {
          if (envelope.channel_message.code == undefined) {
            //protobuf plugin does not default-initialize missing Int32Value fields
            envelope.channel_message.code = 0;
          }
        }

        value!(envelope);
      };
    } else {
      value = null;
    }
  }

  get onOpen(): SocketOpenHandler | null {
    return this._socket!.onopen;
  }

  set onOpen(value: SocketOpenHandler | null) {
    this._socket!.onopen = value;
  }

  isOpen(): boolean {
    return this._socket?.readyState == WebSocket.OPEN;
  }

  close() {
    this._socket?.close();
    this._socket = undefined;
  }

  connect(
    scheme: string,
    host: string,
    port: string,
    createStatus: boolean,
    token: string,
    platform: string,
    signal?: AbortSignal,
  ): void {
    if (signal) {
      signal.addEventListener("abort", () => {
        this.close();
      });
    }
    const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(
      createStatus.toString(),
    )}&token=${encodeURIComponent(token)}&format=protobuf&platform=${encodeURIComponent(platform)}`;
    this._socket = new WebSocket(url);
    this._socket.binaryType = "arraybuffer";
  }

  send(msg: any): void {
    const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
    const encodedMsg = envelopeWriter.finish();
    this._socket!.send(encodedMsg);
  }
}
