import { encode, decode } from "js-base64";
import * as tsproto from "mezon-js-protobuf";

export function buildFetchOptions(method: string, options: any, bodyJson: string) {
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
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match: string, p1) {
      return String.fromCharCode(Number("0x" + p1));
    }),
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
  } else if (typeof raw === "string") {
    jsonStr = raw;
  } else {
    return typeof raw === "object" ? raw : { t: raw };
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

export function toUint8(data: unknown): Uint8Array | null {
  if (data == null) return null;

  const B: any = (globalThis as any).Buffer;
  if (B?.isBuffer?.(data)) {
    const buf = data as any;
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  if (data instanceof ArrayBuffer) return new Uint8Array(data);

  if (ArrayBuffer.isView(data)) {
    const view = data as ArrayBufferView;
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }

  if (Array.isArray(data)) {
    return Uint8Array.from(data as number[]);
  }

  if (typeof data === "object" && (data as any)[0] != null) {
    const obj = data as Record<string, number>;
    const keys = Object.keys(obj);
    const max = keys.reduce((m, k) => Math.max(m, Number(k)), -1);
    if (max >= 0) {
      const u8 = new Uint8Array(max + 1);
      for (let i = 0; i <= max; i++) u8[i] = (obj[String(i)] ?? (obj as any)[i] ?? 0) & 255;
      return u8;
    }
  }

  return null;
}

export function isLikelyDirectFcmProtoTag(b: number): boolean {
  return (
    b === 10 || b === 18 || b === 26 || b === 32 || b === 40 ||
    b === 50 || b === 56 || b === 66 || b === 74 || b === 80 ||
    b === 88 || b === 98 || b === 104 || b === 106 || b === 112 ||
    b === 114 || b === 120 || b === 122 || b === 130 || b === 136 ||
    b === 144 || b === 146 || b === 152
  );
}

export function unwrapDirectFcmProtoBytes(u8: Uint8Array): Uint8Array {
  if (u8.byteLength === 0) return u8;

  if (isLikelyDirectFcmProtoTag(u8[0])) return u8;

  if (u8.byteLength >= 5) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const headerLen = dv.getUint32(0, true);
    const start = 4 + headerLen;

    if (
      headerLen >= 0 &&
      headerLen < u8.byteLength &&
      start > 4 &&
      start < u8.byteLength &&
      isLikelyDirectFcmProtoTag(u8[start])
    ) {
      return u8.subarray(start);
    }
  }

  return u8;
}

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

export function decodeChannelTimelineAttachments(data: any) {
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
    const attachments = tsproto.ListChannelTimelineAttachment.decode(uintBuffer);
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
    return reactions;
  } catch (error) {
    return safeJSONParse(data);
  }
}

export function decodeNotificationFcm(data: unknown): tsproto.DirectFcmProto | any | undefined {
  if (isEmpty(data)) return;

  const firstByteOrChar =
    typeof data === "string" ? data.charCodeAt(0) :
    (data as any)?.[0];

  const isJson = firstByteOrChar === 91 || firstByteOrChar === 123; 
  if (isJson) return safeJSONParse(data);

  const u8 = toUint8(data);
  if (!u8) return safeJSONParse(data);

  const payload = unwrapDirectFcmProtoBytes(u8);

  try {
    return tsproto.DirectFcmProto.decode(payload);
  } catch (e){
    console.error("Failed to decode DirectFcmProto:", { error: e, data });
    return safeJSONParse(data);
  }
}

export function encodeMentions(data: tsproto.MessageMentionList) {
  const mentionWriter = tsproto.MessageMentionList.encode(tsproto.MessageMentionList.fromPartial(data));
  const encodedMsg = mentionWriter.finish();

  return encodedMsg;
}

export function encodeAttachments(data: tsproto.MessageAttachmentList) {
  const attachmentWriter = tsproto.MessageAttachmentList.encode(tsproto.MessageAttachmentList.fromPartial(data));
  const encodedMsg = attachmentWriter.finish();

  return encodedMsg;
}

export function encodeRefs(data: tsproto.MessageRefList) {
  const refsWriter = tsproto.MessageRefList.encode(tsproto.MessageRefList.fromPartial(data));
  const encodedMsg = refsWriter.finish();

  return encodedMsg;
}

export function encodeReactions(data: tsproto.MessageReactionList) {
  const reactionWriter = tsproto.MessageReactionList.encode(tsproto.MessageReactionList.fromPartial(data));
  const encodedMsg = reactionWriter.finish();

  return encodedMsg;
}

export function encodeNotificationFcm(data: tsproto.DirectFcmProto) {
  const fcmWriter = tsproto.DirectFcmProto.encode(tsproto.DirectFcmProto.fromPartial(data));
  const encodedMsg = fcmWriter.finish();

  return encodedMsg;
}
