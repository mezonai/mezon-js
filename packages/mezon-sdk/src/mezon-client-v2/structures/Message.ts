import {
  ApiMessageAttachment,
  ApiMessageReaction,
  ApiMessageRef,
  ChannelMessageContent,
  ReactMessageData,
  ReactMessagePayload,
  RemoveMessageData,
  ReplyMessageData,
  UpdateMessageData,
} from "../../interfaces";
import { convertChanneltypeToChannelMode } from "../../utils/helper";
import { SocketManager } from "../manager/socket_manager";
import { TextChannel } from "./TextChannel";

export interface MessageInitData {
  id: string;
  clan_id: string;
  channel_id: string;
  sender_id: string;
  content: ChannelMessageContent;
  mentions?: ApiMessageAttachment[];
  attachments?: ApiMessageAttachment[];
  reactions?: ApiMessageReaction[];
  references?: ApiMessageRef[];
  topic_id?: string;
}

export class Message {
  public id: string;
  public sender_id: string;
  public content: ChannelMessageContent;
  public mentions: ApiMessageAttachment[] | undefined;
  public attachments: ApiMessageAttachment[] | undefined;
  public reactions: ApiMessageReaction[] | undefined;
  public references: ApiMessageRef[] | undefined;
  public topic_id: string | undefined;
  public channel: TextChannel;

  private readonly socketManager: SocketManager;

  constructor(
    initMessageData: MessageInitData,
    channel: TextChannel,
    socketManager: SocketManager
  ) {
    this.id = initMessageData.id;
    this.sender_id = initMessageData.sender_id;
    this.content = initMessageData.content;
    this.references = initMessageData?.references;
    this.mentions = initMessageData?.mentions;
    this.attachments = initMessageData?.attachments;
    this.reactions = initMessageData?.reactions;
    this.references = initMessageData?.references;
    this.topic_id = initMessageData?.topic_id;
    this.channel = channel;
    this.socketManager = socketManager;
  }

  async reply(content: ChannelMessageContent) {
    const user = await this.channel.clan.users.fetch(this.sender_id);
    const references: ApiMessageRef[] = [
      {
        message_ref_id: this.id,
        message_sender_id: this.sender_id,
        message_sender_username:
          user.clan_nick || user.display_name || user.username,
        mesages_sender_avatar: user.clan_avatar || user.avartar,
        content: JSON.stringify(this.content),
      },
    ];
    const dataReply: ReplyMessageData = {
      clan_id: this.channel.clan.id,
      mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
      is_public: !this.channel.is_private,
      channel_id: this.channel.id!,
      content: content,
      references,
    };
    return await this.socketManager.writeChatMessage(dataReply);
  }

  async update(content: ChannelMessageContent) {
    const dataUpdate: UpdateMessageData = {
      clan_id: this.channel.clan.id,
      channel_id: this.channel.id!,
      mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
      is_public: !this.channel.is_private,
      message_id: this.id,
      content,
      topic_id: this.topic_id,
    };
    return await this.socketManager.updateChatMessage(dataUpdate);
  }

  async react(dataReactMessage: ReactMessagePayload) {
    const dataReact: ReactMessageData = {
      id: dataReactMessage?.id ?? "",
      clan_id: this.channel.clan.id,
      channel_id: this.channel.id!,
      mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
      is_public: !this.channel.is_private,
      message_id: this.id,
      emoji_id: dataReactMessage.emoji_id,
      emoji: dataReactMessage.emoji,
      count: dataReactMessage.count,
      message_sender_id: this.sender_id,
      action_delete: dataReactMessage?.action_delete ?? false,
    };
    return await this.socketManager.writeMessageReaction(dataReact);
  }

  async delete() {
    const dataRemove: RemoveMessageData = {
      clan_id: this.channel.clan.id,
      channel_id: this.channel.id!,
      mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
      is_public: !this.channel.is_private,
      message_id: this.id,
    };
    return await this.socketManager.removeChatMessage(dataRemove);
  }
}
