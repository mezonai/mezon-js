import {encode, decode} from "js-base64"
import * as tsproto from "./api/api";

export function buildFetchOptions(method: string, options: any, bodyJson: string) {
    const fetchOptions = {...{ method: method }, ...options};
    fetchOptions.headers = {...options.headers};

    if (typeof XMLHttpRequest !== "undefined") {
        const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");

        // in Cocos Creator, XMLHttpRequest.withCredentials is not writable, so make the fetch
        // polyfill avoid writing to it.
        if (!descriptor?.set) {
            fetchOptions.credentials = 'cocos-ignore'; // string value is arbitrary, cannot be 'omit' or 'include
        }
    }

    if(!Object.keys(fetchOptions.headers).includes("Accept")) {
      fetchOptions.headers["Accept"] = "application/proto";
    }

    if(!Object.keys(fetchOptions.headers).includes("Content-Type")) {
      fetchOptions.headers["Content-Type"] = "application/proto";
    }

	Object.keys(fetchOptions.headers).forEach((key: string) => {
      if (!fetchOptions.headers[key]) {
        delete fetchOptions.headers[key];
      }
    });

    if (bodyJson) {
        fetchOptions.body = bodyJson;
    }

    return fetchOptions;
}

export function b64EncodeUnicode(str:string) {
    return encode(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(_match:string, p1) {
            return String.fromCharCode(Number('0x' + p1));
        }));
}

export function b64DecodeUnicode(str: string) {
    return decodeURIComponent(decode(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function safeJSONParse(jsonStr: string) {
    try {        
      return JSON.parse(jsonStr);
    } catch (error) {
        if (jsonStr !== "") {
            const fixedJsonStr = jsonStr.replace(/\n/g, "\\n");
            try {
                return JSON.parse(fixedJsonStr);
            } catch (e) {
                console.error('Error parsing JSON:', jsonStr, error);
            }
        }
        return {t: jsonStr}; // Handle the error gracefully or throw an exception if necessary
    }
}

export function decodeMentions(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const mentions = tsproto.MessageMentionList.decode(uintBuffer);

  return mentions;
}

export function decodeAttachments(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const attachments = tsproto.MessageAttachmentList.decode(uintBuffer);

  return attachments;
}

export function decodeRefs(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const refs = tsproto.MessageRefList.decode(uintBuffer);

  return refs;
}

export function decodeReactions(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const reactions = tsproto.MessageReactionList.decode(uintBuffer);
  return reactions;
}

export function decodeNotificationFcm(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const noti = tsproto.DirectFcmProto.decode(uintBuffer);

  return noti;
}
