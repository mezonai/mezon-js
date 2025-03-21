import { SocketManager } from "./socket_manager";
import { ChannelType } from "../constants/enum";
import { replyMessageGenerate } from "../utils/generate_reply_message";
import { convertChanneltypeToChannelMode } from "../utils/helper";
import {
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageRef,
  ChannelMessageContent,
} from "../interfaces";

export class MessageManager {
  constructor(private socketManager: SocketManager) {}

  /** Send message in channel/thread */
  async sendMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    msg: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    ref?: Array<ApiMessageRef>,
    anonymous_message?: boolean,
    mention_everyone?: boolean,
    avatar?: string,
    code?: number,
    topic_id?: string
  ) {
    const socket = this.socketManager.getSocket();
    const messageLength = JSON.stringify(msg).length;
    if (messageLength > 4096 * 2) throw "Message exceeds allowed characters";
    const msgACK = await socket.writeChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      msg,
      mentions,
      attachments,
      ref,
      anonymous_message,
      mention_everyone,
      avatar,
      code,
      topic_id
    );
    return msgACK;
  }

  /** Send DM message */
  async sendDMChannelMessage(
    channelDmId: string,
    msg: string,
    messOptions: { [x: string]: any } = {},
    attachments: Array<any> = [],
    refs: Array<any> = [],
    code?: number
  ) {
    const messageLength =
      JSON.stringify(msg).length + JSON.stringify(messOptions).length;
    if (messageLength > 4096 * 2) throw "Message exceeds allowed characters";
    try {
      const message = {
        clan_id: "",
        channel_id: channelDmId,
        is_public: false,
        mode: convertChanneltypeToChannelMode(ChannelType.CHANNEL_TYPE_DM),
        mentions: [],
        attachments: attachments,
        ref: [],
      };
      const mess = replyMessageGenerate(
        { messageContent: msg, ...messOptions, attachments, refs },
        message
      );
      return await this.sendMessage(
        mess.clan_id,
        mess.channel_id,
        mess.mode,
        mess.is_public,
        mess.msg,
        [],
        mess.attachments,
        refs,
        false,
        false,
        '',
        code
      );
    } catch (error) {
      throw new Error("Can't send message channel DM");
    }
  }

  /** Update message */
  async updateChatMessage(
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    content: any,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    hideEditted?: boolean
  ) {
    const messageLength = JSON.stringify(content).length;
    if (messageLength > 4096 * 2) throw "Message exceeds allowed characters";
    const socket = this.socketManager.getSocket();
    const msgUpdated = await socket.updateChatMessage(
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      content,
      mentions,
      attachments,
      hideEditted
    );
    return msgUpdated;
  }

  /** React message */
  async reactionMessage(
    id: string,
    clan_id: string,
    channel_id: string,
    mode: number,
    is_public: boolean,
    message_id: string,
    emoji_id: string,
    emoji: string,
    count: number,
    message_sender_id: string,
    action_delete: boolean
  ) {
    const socket = this.socketManager.getSocket();
    const msgReaction = await socket.writeMessageReaction(
      id,
      clan_id,
      channel_id,
      mode,
      is_public,
      message_id,
      emoji_id,
      emoji,
      count,
      message_sender_id,
      action_delete
    );
    return msgReaction;
  }
}
