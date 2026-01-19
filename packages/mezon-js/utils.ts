import { encode, decode } from "js-base64";
import * as tsproto from "./api/api";
import { ApiDirectFcmProto } from "./api.gen";

export function buildFetchOptions(
  method: string,
  options: any,
  bodyJson: string,
) {
  const fetchOptions = { ...{ method: method }, ...options };
  fetchOptions.headers = { ...options.headers };

  if (!Object.keys(fetchOptions.headers).includes("Accept")) {
    fetchOptions.headers["Accept"] = "application/proto";
  }

  if (!Object.keys(fetchOptions.headers).includes("Content-Type")) {
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

export function b64EncodeUnicode(str: string) {
  return encode(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(_match: string, p1) {
        return String.fromCharCode(Number("0x" + p1));
      },
    ),
  );
}

export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    decode(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

export function safeJSONParse(raw: any): any {
  if (raw === null || raw === undefined) return { t: raw };

  let jsonStr: string;

  if (raw instanceof Uint8Array) {
    jsonStr = new TextDecoder().decode(raw);
  } else if (typeof raw === 'string') {
    jsonStr = raw;
  } else {
    return typeof raw === 'object' ? raw : { t: raw };
  }

  if (!jsonStr || jsonStr === "" || jsonStr === "[]") {
    return { t: jsonStr };
  }

  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    try {
      const fixedJsonStr = jsonStr.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      return JSON.parse(fixedJsonStr);
    } catch (e) {
      console.error("JSON Parse failed completely:", { original: jsonStr, error: e });
      return { t: jsonStr };
    }
  }
}

const isEmpty = (data: any) => {
  return !data || data === null || data === undefined || data === "" || data === "[]";
};

export function decodeMentions(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }

  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const mentions = tsproto.MessageMentionList.decode(uintBuffer);
    mentions.mentions?.map(m => {
      return {
        ...m,
        id: String(m.id),
        role_id: String(m.role_id),
        user_id: String(m.user_id)
      }
    });
    return mentions;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function decodeAttachments(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }

  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const attachments = tsproto.MessageAttachmentList.decode(uintBuffer);
    return attachments;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function decodeRefs(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }

  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const refs = tsproto.MessageRefList.decode(uintBuffer);
    refs.refs?.map(r => {
      return {
        ...r,
        message_id: r.message_id,
        message_ref_id: r.message_ref_id,
        message_sender_id: r.message_sender_id
      }
    })
    return refs;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function decodeReactions(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }

  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const reactions = tsproto.MessageReactionList.decode(uintBuffer);
    reactions.reactions?.map(r => {
      return {
        ...r,
        id: String(r.id),
        emoji_id: String(r.emoji_id),
        emoji_recent_id: String(r.emoji_recent_id),
        clan_id: String(r.clan_id),
        channel_id: String(r.channel_id),
        message_id: String(r.message_id),
        sender_id: String(r.sender_id),
        topic_id: String(r.topic_id),
        message_sender_id: String(r.message_sender_id)
      }
    })
    return reactions;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function decodeNotificationFcm(data: any) {
  if (isEmpty(data)) return;
  // 91 is '[' (JSON Array) | 123 is '{' (JSON Object)
  const firstByte = data[0];
  const isJson = firstByte === 91 || firstByte === 123;

  if (isJson) {
    return safeJSONParse(data);
  }
  
  try {
    const buffer: ArrayBuffer = data;
    const uintBuffer: Uint8Array = new Uint8Array(buffer);
    const noti = tsproto.DirectFcmProto.decode(uintBuffer);
    var result : ApiDirectFcmProto = {
      ...noti,
      clan_id: String(noti.clan_id),
      channel_id: String(noti.channel_id),
      message_id: String(noti.message_id),
      sender_id: String(noti.sender_id),
      mention_ids: noti.mention_ids.map(m => String(m))
    }
    return result;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function encodeMentions(data: tsproto.MessageMentionList) {
  const mentionWriter = tsproto.MessageMentionList.encode(
    tsproto.MessageMentionList.fromPartial(data),
  );
  const encodedMsg = mentionWriter.finish();

  return encodedMsg;
}

export function encodeAttachments(data: tsproto.MessageAttachmentList) {
  const attachmentWriter = tsproto.MessageAttachmentList.encode(
    tsproto.MessageAttachmentList.fromPartial(data),
  );
  const encodedMsg = attachmentWriter.finish();

  return encodedMsg;
}

export function encodeRefs(data: tsproto.MessageRefList) {
  const refsWriter = tsproto.MessageRefList.encode(
    tsproto.MessageRefList.fromPartial(data),
  );
  const encodedMsg = refsWriter.finish();

  return encodedMsg;
}

export function encodeReactions(data: tsproto.MessageReactionList) {
  const reactionWriter = tsproto.MessageReactionList.encode(
    tsproto.MessageReactionList.fromPartial(data),
  );
  const encodedMsg = reactionWriter.finish();

  return encodedMsg;
}

export function encodeNotificationFcm(data: tsproto.DirectFcmProto) {
  const fcmWriter = tsproto.DirectFcmProto.encode(
    tsproto.DirectFcmProto.fromPartial(data),
  );
  const encodedMsg = fcmWriter.finish();

  return encodedMsg;
}
