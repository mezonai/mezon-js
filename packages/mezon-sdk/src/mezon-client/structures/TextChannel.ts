import {
  ApiChannelDescription,
  ApiMessageAttachment,
  ApiMessageMention,
  ChannelMessageContent,
  ReplyMessageData,
} from "../../interfaces";
import { convertChanneltypeToChannelMode } from "../../utils/helper";
import { SocketManager } from "../manager/socket_manager";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { CacheManager } from "../utils/CacheManager";
import { Clan } from "./Clan";
import { Message } from "./Message";

export class TextChannel {
  public id: string | undefined;
  public name: string | undefined;
  public is_private: boolean;
  public channel_type: number | undefined;
  public category_id: string | undefined;
  public category_name: string | undefined;
  public parent_id: string | undefined;

  public clan: Clan;
  public messages: CacheManager<string, Message>;

  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;

  constructor(
    initChannelData: ApiChannelDescription,
    clan: Clan,
    socketManager: SocketManager,
    messageQueue: AsyncThrottleQueue
  ) {
    this.id = initChannelData.channel_id;
    this.name = initChannelData.channel_label;
    this.channel_type = initChannelData?.type;
    this.is_private = !!initChannelData?.channel_private;
    this.category_id = initChannelData?.category_id ?? "";
    this.category_name = initChannelData?.category_name ?? "";
    this.parent_id = initChannelData?.parent_id ?? "";
    this.clan = clan;
    this.messages = new CacheManager<string, Message>(async (message_id) => {
      // TODO: If the channel's message cache is empty,
      // and channel.messages.fetch(message_id) is called,
      // this function will be triggered to fetch the message detail from the API.
      throw Error(`Message ${message_id} not found on channel ${this.id}!`);
    }, 200);
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
  }

  async send(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id?: string,
    code?: number,
  ) {
    return this.messageQueue.enqueue(async () => {
      const dataSend: ReplyMessageData = {
        clan_id: this.clan.id,
        channel_id: this.id!,
        mode: convertChanneltypeToChannelMode(this.channel_type!),
        is_public: !this.is_private,
        content,
        mentions,
        attachments,
        anonymous_message,
        mention_everyone,
        code,
        topic_id,
      };
      return await this.socketManager.writeChatMessage(dataSend);
    });
  }
}
