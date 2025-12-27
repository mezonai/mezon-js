
import * as tsproto from "./api/api";

export function safeProtoParse(data: any) {
    try {
        const buffer: ArrayBuffer = data;
        const uintBuffer: Uint8Array = new Uint8Array(buffer);  
        return tsproto.ChannelMessage.decode(uintBuffer);
    } catch (error) {
        console.log(error)
        return null
    }
}