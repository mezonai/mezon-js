import { ApiMessageAttachment, ApiMessageMention, ApiMessageRef, ChannelMessage, ChannelMessageContent } from "../interfaces";


export interface ReplyMezonMessage {
  [x: string]: any;
  clan_id: string;
  channel_id: string;
  is_public: boolean;
  mode: number;
  msg: ChannelMessageContent;
  mentions?: Array<ApiMessageMention>;
  attachments?: Array<ApiMessageAttachment>;
  ref?: Array<ApiMessageRef>;
}

export function replyMessageGenerate(
  replayContent: { [x: string]: any },
  message: ChannelMessage | {[x: string] : any}
): ReplyMezonMessage {
  const replayMessage : ReplyMezonMessage = {} as ReplyMezonMessage; 
  const defaultValue = {
    mentions: [],
    attachments: [],
  };
  [
    "clan_id",
    "channel_id",
    "mode",
    "is_public",
    ...Object.keys(defaultValue),
  ].forEach(
    (field) =>
      (replayMessage[field] = fieldGenerate(
        field,
        replayContent,
        message,
        defaultValue
      ))
  );

  let messageContent: { [x: string]: any } = {
    t: "messageContent" in replayContent ? replayContent["messageContent"] : "",
  };
  
  // option for bot's message
  ["lk", "hg", "mk", "ej", "vk", "contentThread"].forEach((key) => {
    if (key in replayContent) {
      messageContent[key] = replayContent[key];
    }
  });

  replayMessage["msg"] = messageContent as ChannelMessageContent;

  replayMessage["ref"] = refGenerate(message);

  return replayMessage;
}

export function fieldGenerate(
  field: string,
  replayContent: any,
  message: ChannelMessage | {[x: string] : any},
  defaultValue: { [x: string]: any }
) {
  return field in replayContent
    ? replayContent[field]
    : field in defaultValue
    ? defaultValue[field]
    : message[field as keyof ChannelMessage];
}

export function refGenerate(msg: ChannelMessage | {[x: string] : any}): Array<ApiMessageRef> {
  return [
    {
      message_id: "",
      message_ref_id: msg.message_id,
      ref_type: 0,
      message_sender_id: msg.sender_id,
      message_sender_username: msg.username,
      mesages_sender_avatar: msg.avatar,
      message_sender_clan_nick: msg.clan_nick,
      message_sender_display_name: msg.display_name,
      content: JSON.stringify(msg.content),
      has_attachment: false,
    },
  ];
}
