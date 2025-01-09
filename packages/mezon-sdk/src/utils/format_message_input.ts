import { InternalEventsSocket } from "../constants";
import { ChannelMessage } from "../interfaces";

const channelMessageFormat = (message: any) => {
  try {
    const [content, reactions, mentions, attachments, references]: any[] = [
      "content",
      "reactions",
      "mentions",
      "attachments",
      "references",
    ].map((item) => {
      try {
        return JSON.parse(message.channel_message[item]);
      } catch (e) {
        return item;
      }
    });

    const mess: ChannelMessage = {
      id: message.id || message.channel_message.message_id,
      avatar: message.channel_message.avatar,
      channel_id: message.channel_message.channel_id,
      mode: message.channel_message.mode,
      channel_label: message.channel_message.channel_label,
      clan_id: message.channel_message.clan_id,
      code: message.channel_message.code,
      create_time: message.channel_message.create_time,
      message_id: message.channel_message.message_id,
      sender_id: message.channel_message.sender_id,
      update_time: message.channel_message.update_time,
      clan_logo: message.channel_message.clan_logo,
      category_name: message.channel_message.category_name,
      username: message.channel_message.username,
      clan_nick: message.channel_message.clan_nick,
      clan_avatar: message.channel_message.clan_avatar,
      display_name: message.channel_message.display_name,
      content: content,
      reactions: reactions,
      mentions: mentions,
      attachments: attachments,
      references: references,
      hide_editted: message.channel_message.hide_editted,
      is_public: message.channel_message.is_public,
      create_time_seconds: message.channel_message.create_time_seconds,
      update_time_seconds: message.channel_message.update_time_seconds,
      topic_id: message.channel_message.topic_id,
    };

    return mess;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const formatFunction: { [x: string]: Function } = {
  [InternalEventsSocket.ChannelMessage]: channelMessageFormat,
};
