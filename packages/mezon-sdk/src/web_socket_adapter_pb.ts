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

import { SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler, TransportAdapter } from "./transport_adapter"
import * as tsproto from "./rtapi/realtime"
import WebSocket, { MessageEvent } from "ws";

const CODE_FIN = 0xFF;

/**
 * A protocol buffer socket adapter that accepts and transmits payloads using the protobuf binary wire format.
 */
export class WebSocketAdapterPb implements TransportAdapter {

    private _socket?: WebSocket;
    private _streams = new Map<number, Uint8Array[]>();

    constructor() {
    }

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
        return null;
    }

    set onMessage(value: SocketMessageHandler | null) {
        const PREFIX_RAW = 0xff;
        const RAW_HEADER_LENGTH = 7; // Header Length: 1 (Prefix) + 2 (CID) + 4 (Code) = 7 bytes
        const CODE_LENGTH = 3;

        try {
            if (value) {
                this._socket!.onmessage = (evt: MessageEvent) => {
                    try {
                        const buffer: ArrayBuffer = evt.data as ArrayBuffer;
                        const uintBuffer: Uint8Array = new Uint8Array(buffer);

                        if (uintBuffer.length < 1) {
                            console.error("Packet too small to contain headers");
                            return;
                        }

                        const prefix = uintBuffer[0];
                        if (prefix === PREFIX_RAW) {
                            const dataView = new DataView(buffer);
                            const cid = dataView.getUint16(1, false);
                            const code = dataView.getUint32(CODE_LENGTH, false);
                            const payload = uintBuffer.subarray(RAW_HEADER_LENGTH);

                            if (!this._streams.has(cid)) {
                                this._streams.set(cid, []);
                            }

                            const responseCode = (code >>> 16) & 0xFFFF;
                            const finFlag = code & 0xFFFF;
                            const chunks = this._streams.get(cid)!;

                            if (finFlag === CODE_FIN) {
                                if (payload.byteLength) {
                                    const part = new Uint8Array(payload.buffer, payload.byteOffset, payload.byteLength);
                                    chunks.push(part);
                                }

                                const totalLength = chunks.reduce((acc, arr) => acc + arr.length, 0);
                                const completeBuffer = new Uint8Array(totalLength);

                                let offset = 0;
                                for (const arr of chunks) {
                                    completeBuffer.set(arr, offset);
                                    offset += arr.length;
                                }

                                value!(cid, responseCode, completeBuffer);
                                this._streams.delete(cid);
                            } else {
                                chunks.push(new Uint8Array(payload));
                            }

                            return;
                        }

                        const envelope = tsproto.Envelope.decode(uintBuffer);

                        if (envelope.channel_message) {
                            if (envelope.channel_message.code == undefined) {
                                //protobuf plugin does not default-initialize missing Int32Value fields
                                envelope.channel_message.code = 0;
                            }
                        }

                        value!(envelope.cid, 0, envelope);
                    } catch (e) {
                        console.log(e);
                    }
                };
            } else {
                value = null;
            }
        } catch (e) {
            console.log(e);
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

    connect(host: string, port: string, createStatus: boolean, token: string, signal?: AbortSignal): void {
        if (signal) {
            signal.addEventListener('abort', () => {
                this.close();
            });
        }
        const portPart = port ? `:${port}` : "";
        const url = `wss://${host}${portPart}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}`;
        this._socket = new WebSocket(url);
        this._socket.binaryType = "arraybuffer";
    }

    send(msg: any): void {

        if (msg.match_data_send) {
            let payload = msg.match_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.match_data_send.data = new TextEncoder().encode(payload);
            }
        } else if (msg.party_data_send) {
            let payload = msg.party_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.party_data_send.data = new TextEncoder().encode(payload);
            }
        }

        const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
        const encodedMsg = envelopeWriter.finish();
        this._socket!.send(encodedMsg);
    }
}
