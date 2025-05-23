import { ChannelStreamMode } from "../../constants";
import {
  ChannelMessageContent,
  SendTokenData,
  TokenSentEvent,
} from "../../interfaces";
import { ChannelManager } from "../manager/channel_manager";
import { SocketManager } from "../manager/socket_manager";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { Clan } from "./Clan";
export interface UserInitData {
  id: string;
  username?: string;
  clan_nick?: string;
  clan_avatar?: string;
  display_name?: string;
  avartar?: string;
  dmChannelId?: string;
}

export class User {
  public id: string;
  public username: string;
  public clan_nick: string;
  public clan_avatar: string;
  public display_name: string;
  public avartar: string;
  public dmChannelId: string;
  private clan: Clan;
  private readonly channelManager: ChannelManager | undefined;
  private readonly messageQueue: AsyncThrottleQueue;
  private readonly socketManager: SocketManager;

  constructor(
    initUserData: UserInitData,
    clan: Clan,
    messageQueue: AsyncThrottleQueue,
    socketManager: SocketManager,
    channelManager?: ChannelManager
  ) {
    this.id = initUserData.id;
    this.avartar = initUserData.avartar ?? "";
    this.dmChannelId = initUserData?.dmChannelId ?? "";
    this.username = initUserData?.username ?? "";
    this.clan_nick = initUserData?.clan_nick ?? "";
    this.clan_avatar = initUserData?.clan_avatar ?? "";
    this.display_name = initUserData?.display_name ?? "";
    this.clan = clan;
    this.channelManager = channelManager;
    this.messageQueue = messageQueue;
    this.socketManager = socketManager;
  }

  async sendToken(sendTokenData: SendTokenData) {
    const dataSendToken: TokenSentEvent = {
      receiver_id: this.id,
      amount: sendTokenData.amount,
      note: sendTokenData?.note ?? "",
      extra_attribute: sendTokenData?.extra_attribute ?? "",
    };
    try {
      return this.clan.apiClient.sendToken(
        this.clan.sessionToken,
        dataSendToken
      );
    } catch (error) {
      console.log("Error sendToken");
    }
  }

  async sendDM(content: ChannelMessageContent, code?: number) {
    return this.messageQueue.enqueue(async () => {
      if (!this.dmChannelId) {
        const dmChannel = await this.createDmChannel();
        this.dmChannelId = dmChannel?.channel_id ?? "";
      }
      if (!this.dmChannelId)
        throw Error(`Can not get dmChannelId for this user ${this.id}!`);
      const dataSendDm = {
        clan_id: "0",
        channel_id: this.dmChannelId,
        mode: ChannelStreamMode.STREAM_MODE_DM,
        is_public: false,
        content,
        code,
      };
      return await this.socketManager.writeChatMessage(dataSendDm);
    });
  }

  async createDmChannel() {
    try {
      const dmChannel = await this.channelManager?.createDMchannel(this.id);
      return dmChannel ?? {};
    } catch (error) {
      console.log("Error createDmChannel User");
      return null;
    }
  }
}
