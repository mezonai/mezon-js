import * as tsproto from "../../api/api";

export function getRandomColor(): string {
  const colors: string[] = [
    '#1ABC9C', // Aqua
    '#11806A', // DarkAqua
    '#57F287', // Green
    '#1F8B4C', // DarkGreen
    '#3498DB', // Blue
    '#206694', // DarkBlue
    '#9B59B6', // Purple
    '#71368A', // DarkPurple
    '#E91E63', // LuminousVividPink
    '#AD1457', // DarkVividPink
    '#F1C40F', // Gold
    '#C27C0E', // DarkGold
    '#E67E22', // Orange
    '#A84300', // DarkOrange
    '#ED4245', // Red
    '#992D22', // DarkRed
    '#BCC0C0', // LightGrey
    '#FFFF00', // Yellow
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] || '#F1C40F';
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
    return noti;
  } catch (error) {
    return safeJSONParse(data);
  }
}