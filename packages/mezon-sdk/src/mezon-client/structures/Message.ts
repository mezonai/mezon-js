import {
  ApiMessageAttachment,
  ApiMessageMention,
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
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { TextChannel } from "./TextChannel";

export interface MessageInitData {
  id: string;
  clan_id: string;
  channel_id: string;
  sender_id: string;
  content: ChannelMessageContent;
  mentions?: ApiMessageMention[];
  attachments?: ApiMessageAttachment[];
  reactions?: ApiMessageReaction[];
  references?: ApiMessageRef[];
  topic_id?: string;
  create_time_seconds?: number;
}

export class Message {
  public id: string;
  public sender_id: string;
  public content: ChannelMessageContent;
  public mentions: ApiMessageMention[] | undefined;
  public attachments: ApiMessageAttachment[] | undefined;
  public reactions: ApiMessageReaction[] | undefined;
  public references: ApiMessageRef[] | undefined;
  public topic_id: string | undefined;
  public create_time_seconds: number | undefined;
  public channel: TextChannel;

  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;

  constructor(
    initMessageData: MessageInitData,
    channel: TextChannel,
    socketManager: SocketManager,
    messageQueue: AsyncThrottleQueue
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
    this.create_time_seconds = initMessageData?.create_time_seconds;
    this.channel = channel;
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
  }

  async reply(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id?: string,
    code?: number,
  ) {
    return await this.messageQueue.enqueue(async () => {
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
        content,
        mentions,
        attachments,
        references,
        anonymous_message,
        mention_everyone,
        code,
        topic_id: topic_id || this.topic_id,
      };
      return await this.socketManager.writeChatMessage(dataReply);
    });
  }

  async update(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    topic_id?: string
  ) {
    return await this.messageQueue.enqueue(() => {
      const dataUpdate: UpdateMessageData = {
        clan_id: this.channel.clan.id,
        channel_id: this.channel.id!,
        mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
        is_public: !this.channel.is_private,
        message_id: this.id,
        content,
        mentions,
        attachments,
        topic_id: topic_id || this.topic_id,
      };
      return this.socketManager.updateChatMessage(dataUpdate);
    });
  }

  async react(dataReactMessage: ReactMessagePayload) {
    return await this.messageQueue.enqueue(() => {
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
      return this.socketManager.writeMessageReaction(dataReact);
    });
  }

  async delete() {
    return await this.messageQueue.enqueue(() => {
      const dataRemove: RemoveMessageData = {
        clan_id: this.channel.clan.id,
        channel_id: this.channel.id!,
        mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
        is_public: !this.channel.is_private,
        message_id: this.id,
      };
      return this.socketManager.removeChatMessage(dataRemove);
    });
  }
}
