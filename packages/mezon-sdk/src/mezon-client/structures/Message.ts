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
  update_time_seconds?: number;
  code?: number;
  username?: string;
  create_time?: string;
  update_time?: string;
  persistent?: boolean;
  persistence?: boolean;
  mode?: number;
}

export class Message {
  public id: string;
  public clan_id: string;
  public channel_id: string;
  public sender_id: string;
  public content: ChannelMessageContent;
  public mentions: ApiMessageMention[] | undefined;
  public attachments: ApiMessageAttachment[] | undefined;
  public reactions: ApiMessageReaction[] | undefined;
  public references: ApiMessageRef[] | undefined;
  public topic_id: string | undefined;
  public create_time_seconds: number | undefined;
  public update_time_seconds: number | undefined;
  public code: number;
  public username: string;
  public create_time: string;
  public update_time: string;
  public persistent: boolean | undefined;
  public persistence: boolean;
  public mode: number;
  public channel: TextChannel;

  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;

  constructor(
    initMessageData: MessageInitData,
    channel: TextChannel,
    socketManager: SocketManager,
    messageQueue: AsyncThrottleQueue,
  ) {
    this.id = initMessageData.id;
    this.clan_id = initMessageData.clan_id;
    this.channel_id = initMessageData.channel_id;
    this.sender_id = initMessageData.sender_id;
    this.content = initMessageData.content;
    this.references = initMessageData?.references;
    this.mentions = initMessageData?.mentions;
    this.attachments = initMessageData?.attachments;
    this.reactions = initMessageData?.reactions;
    this.references = initMessageData?.references;
    this.topic_id = initMessageData?.topic_id;
    this.create_time_seconds = initMessageData?.create_time_seconds;
    this.update_time_seconds = initMessageData?.update_time_seconds;
    this.code = initMessageData?.code ?? 0;
    this.username = initMessageData?.username ?? "";
    this.create_time = initMessageData?.create_time ?? "";
    this.update_time = initMessageData?.update_time ?? "";
    this.persistent = initMessageData?.persistent;
    this.persistence = initMessageData?.persistence ?? false;
    this.mode = initMessageData?.mode ?? 0;
    this.channel = channel;
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
  }

  get message_id() {
    return this.id;
  }

  async reply(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id: string = "0",
    code?: number,
  ) {
    return await this.messageQueue.enqueue(async () => {
      const client = this.channel.clan.getClient();
      const user = await client.users.fetch(this.sender_id);

      const references: ApiMessageRef[] = [
        {
          message_ref_id: this.id,
          message_sender_id: this.sender_id,
          message_sender_username:
            user.clan_nick || user.display_name || user.username,
          message_sender_avatar: user.clan_avatar || user.avartar,
          content: JSON.stringify(this.content),
        },
      ];
      console.log('this.channel.clan.id', this.channel.clan.id)
      const dataReply: ReplyMessageData = {
        clan_id: this.channel.clan.id,
        channel_type: this.channel.channel_type,
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

      const ack = await this.socketManager.writeChatMessage(dataReply);
      return this.channel.createMessageFromAck(ack, dataReply);
    });
  }

  async update(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
  ) {
    return await this.messageQueue.enqueue(async () => {
      const dataUpdate: UpdateMessageData = {
        clan_id: this.channel.clan.id,
        channel_id: this.channel.id!,
        channel_type: this.channel.channel_type,
        mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
        is_public: !this.channel.is_private,
        message_id: this.id,
        content,
        mentions,
        attachments,
        create_time_seconds: this.create_time_seconds
          ? Number(this.create_time_seconds)
          : undefined,
        topic_id: this.topic_id || "0",
        is_update_msg_topic: !!this.topic_id,
      };
      await this.socketManager.updateChatMessage(dataUpdate);
      this.content = content;
      if (mentions) this.mentions = mentions;
      if (attachments) this.attachments = attachments;
      this.channel.messages.set(this.id, this);
      return this;
    });
  }

  async react(dataReactMessage: ReactMessagePayload) {
    return await this.messageQueue.enqueue(() => {
      const dataReact: ReactMessageData = {
        id: dataReactMessage?.id || "0",
        clan_id: this.channel.clan.id,
        channel_id: this.channel.id!,
        mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
        is_public: !this.channel.is_private,
        message_id: this.id,
        emoji_id: dataReactMessage.emoji_id || "0",
        emoji: dataReactMessage.emoji,
        count: dataReactMessage.count,
        message_sender_id: this.sender_id || "0",
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
        channel_type: this.channel.channel_type,
        mode: convertChanneltypeToChannelMode(this.channel.channel_type!),
        is_public: !this.channel.is_private,
        message_id: this.id,
        topic_id: this.topic_id || "0",
      };
      return this.socketManager.removeChatMessage(dataRemove);
    });
  }
}
