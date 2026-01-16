import {encode, decode} from "js-base64"
import * as tsproto from "./api/api";

export function buildFetchOptions(method: string, options: any, bodyJson: string) {
    const fetchOptions = {...{ method: method }, ...options};
    fetchOptions.headers = {...options.headers};

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
          try {
            const fixedJsonStr = jsonStr.replace(/\n/g, "\\n");
            return JSON.parse(fixedJsonStr);
            } catch (e) {
                console.error('Error parsing JSON:', jsonStr, error);
            }
        }
        return {t: jsonStr}; // Handle the error gracefully or throw an exception if necessary
    }
}

export function decodeMentions(data: any) {
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const mentions = tsproto.MessageMentionList.decode(uintBuffer);
    return mentions;
  } catch (error) {
    return safeJSONParse(data)
  }
}

export function decodeAttachments(data: any) {
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const attachments = tsproto.MessageAttachmentList.decode(uintBuffer);
    return attachments;
  } catch (error) {
    return safeJSONParse(data)
  }
}

export function decodeRefs(data: any) {
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const refs = tsproto.MessageRefList.decode(uintBuffer);
    return refs;
  } catch (error) {
    return safeJSONParse(data)
  }
}

export function decodeReactions(data: any) {
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const reactions = tsproto.MessageReactionList.decode(uintBuffer);
    return reactions;
  } catch (error) {
    return safeJSONParse(data)
  }
}

export function decodeNotificationFcm(data: any) {
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const noti = tsproto.DirectFcmProto.decode(uintBuffer);
    return noti;
  } catch (error) {
    return safeJSONParse(data)
  }
}

export function encodeMentions(data: tsproto.MessageMentionList) {
  const mentionWriter = tsproto.MessageMentionList.encode(
    tsproto.MessageMentionList.fromPartial(data)
  );
  const encodedMsg = mentionWriter.finish();

  return encodedMsg;
}

export function encodeAttachments(data: tsproto.MessageAttachmentList) {
  const attachmentWriter = tsproto.MessageAttachmentList.encode(
    tsproto.MessageAttachmentList.fromPartial(data)
  );
  const encodedMsg = attachmentWriter.finish();

  return encodedMsg;
}

export function encodeRefs(data: tsproto.MessageRefList) {
  const refsWriter = tsproto.MessageRefList.encode(
    tsproto.MessageRefList.fromPartial(data)
  );
  const encodedMsg = refsWriter.finish();

  return encodedMsg;
}

export function encodeReactions(data: tsproto.MessageReactionList) {
  const reactionWriter = tsproto.MessageReactionList.encode(
    tsproto.MessageReactionList.fromPartial(data)
  );
  const encodedMsg = reactionWriter.finish();

  return encodedMsg;
}

export function encodeNotificationFcm(data: tsproto.DirectFcmProto) {
 const fcmWriter = tsproto.DirectFcmProto.encode(
    tsproto.DirectFcmProto.fromPartial(data)
  );
  const encodedMsg = fcmWriter.finish();

  return encodedMsg;
}