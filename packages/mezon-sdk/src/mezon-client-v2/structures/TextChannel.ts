import { ChannelStreamMode } from "../../constants";
import {
  ApiChannelDescription,
  ChannelMessageContent,
  ReplyMessageData,
  SendDmChannelPayload,
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

  async send(content: ChannelMessageContent) {
    return this.messageQueue.enqueue(async () => {
      const dataSend: ReplyMessageData = {
        clan_id: this.clan.id,
        channel_id: this.id!,
        mode: convertChanneltypeToChannelMode(this.channel_type!),
        is_public: !this.is_private,
        content,
      };
      return await this.socketManager.writeChatMessage(dataSend);
    });
  }

  async sendDM(sendDmPayload: SendDmChannelPayload) {
    return this.messageQueue.enqueue(async () => {
      const user = this.clan.users.get(sendDmPayload.user_id);
      if (!user) throw Error("user not found!");
      let dmChannelId = user?.dmChannelId;
      if (!user.dmChannelId) {
        console.log("--------------- call api createDMchannel");
        const dmChannel = await user._createDmChannel();
        user.dmChannelId = dmChannel?.channel_id ?? "";
      }
      if (!dmChannelId)
        throw Error(`Can not get dmChannelId for this user ${user.id}!`);
      const dataSendDm = {
        clan_id: "0",
        channel_id: dmChannelId,
        mode: ChannelStreamMode.STREAM_MODE_DM,
        is_public: false,
        content: sendDmPayload.content,
      };
      return await this.socketManager.writeChatMessage(dataSendDm);
    });
  }
}
