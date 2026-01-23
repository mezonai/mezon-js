import { ChannelStreamMode } from "../../constants";
import { ApiMessageAttachment, ChannelMessageContent } from "../../interfaces";
import { ChannelManager } from "../manager/channel_manager";
import { SocketManager } from "../manager/socket_manager";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";

export interface UserInitData {
  id: string;
  username?: string;
  clan_nick?: string;
  clan_avatar?: string;
  display_name?: string;
  avartar?: string;
  dmChannelId?: string;
}

type UserDeps = {
  socketManager: SocketManager;
  messageQueue: AsyncThrottleQueue;
  channelManager: ChannelManager;
};

export class User {
  public id: string;
  public username: string;
  public clan_nick: string;
  public clan_avatar: string;
  public display_name: string;
  public avartar: string;
  public dmChannelId: string;

  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;
  private readonly channelManager: ChannelManager;

  constructor(initUserData: UserInitData, deps: UserDeps) {
    this.id = initUserData.id;
    this.avartar = initUserData.avartar ?? "";
    this.dmChannelId = initUserData?.dmChannelId ?? "";
    this.username = initUserData?.username ?? "";
    this.clan_nick = initUserData?.clan_nick ?? "";
    this.clan_avatar = initUserData?.clan_avatar ?? "";
    this.display_name = initUserData?.display_name ?? "";

    this.socketManager = deps.socketManager;
    this.messageQueue = deps.messageQueue;
    this.channelManager = deps.channelManager;
  }

  private async createDmChannel() {
    try {
      const dmChannel = await this.channelManager.createDMchannel(this.id);
      return dmChannel;
    } catch (error) {
      console.log("Error createDmChannel User", error);
      return null;
    }
  }

  async sendDM(
    content: ChannelMessageContent,
    code?: number,
    attachments?: Array<ApiMessageAttachment>
  ) {
    return this.messageQueue.enqueue(async () => {
      if (!this.dmChannelId) {
        const dmChannel = await this.createDmChannel();
        this.dmChannelId = dmChannel?.channel_id ?? "";
      }

      if (!this.dmChannelId) {
        throw Error(`Can not get dmChannelId for this user ${this.id}!`);
      }

      console.log('this.dmChannelId', this.dmChannelId)

      const dataSendDm = {
        clan_id: "0",
        channel_id: this.dmChannelId,
        mode: ChannelStreamMode.STREAM_MODE_DM,
        is_public: false,
        content,
        attachments,
        code,
      };
      console.log('dataSendDm', dataSendDm)
      return this.socketManager.writeChatMessage(dataSendDm);
    });
  }
}
