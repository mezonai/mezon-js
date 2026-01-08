import * as tsproto from "./api/api";

export function decodeMentions(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const mentions = tsproto.MessageMentionList.decode(uintBuffer);

  return mentions
}

export function decodeAttachments(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const attachments = tsproto.MessageAttachmentList.decode(uintBuffer);

  return attachments
}

export function decodeRefs(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const refs = tsproto.MessageRefList.decode(uintBuffer);

  return refs
}

export function decodeNotificationFcm(data: any) {
  const buffer: ArrayBuffer = data;
  const uintBuffer: Uint8Array = new Uint8Array(buffer);
  const noti = tsproto.DirectFcmProto.decode(uintBuffer);

  return noti
}
