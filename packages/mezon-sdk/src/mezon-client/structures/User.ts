import { SendTokenData, TokenSentEvent } from "../../interfaces";
import { ChannelManager } from "../manager/channel_manager";
import { Clan } from "./Clan";
export interface UserInitData {
  id: string;
  username: string;
  clan_nick: string;
  clan_avatar: string;
  display_name: string;
  avartar: string;
  dmChannelId: string;
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
  private readonly channelManager: ChannelManager;

  constructor(
    initUserData: UserInitData,
    clan: Clan,
    channelManager: ChannelManager
  ) {
    this.id = initUserData.id;
    this.avartar = initUserData.avartar;
    this.dmChannelId = initUserData?.dmChannelId;
    this.username = initUserData?.username;
    this.clan_nick = initUserData?.clan_nick;
    this.clan_avatar = initUserData?.clan_avatar;
    this.display_name = initUserData?.display_name;
    this.clan = clan;
    this.channelManager = channelManager;
  }

  async sendToken(sendTokenData: SendTokenData) {
    const dataSendToken: TokenSentEvent = {
      receiver_id: this.id,
      amount: sendTokenData.amount,
      note: sendTokenData?.note ?? "",
      extra_attribute: sendTokenData?.extra_attribute ?? "",
    };
    return this.clan.apiClient.sendToken(this.clan.sessionToken, dataSendToken);
  }

  async _createDmChannel() {
    const dmChannel = await this.channelManager.createDMchannel(this.id);
    return dmChannel ?? {};
  }
}
