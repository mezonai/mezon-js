import { ChannelStreamMode } from "../../constants";
import { SocketManager } from "../manager/socket_manager";

export class User {
  public id: string;
  public username: string;
  public clan_nick: string;
  public clan_avatar: string;
  public display_name: string;
  public avartar: string;
  public dmChannelId: string;

  public socketManager: SocketManager;

  constructor(public channelObj: any) {
    this.id = channelObj.id;
    this.avartar = channelObj.avartar;
    this.dmChannelId = channelObj?.dmChannelId;
    this.username = channelObj?.username;
    this.clan_nick = channelObj?.clan_nick;
    this.clan_avatar = channelObj?.clan_avatar;
    this.display_name = channelObj?.display_name;
    this.socketManager = channelObj?.socketManager;
  }

  async send(data: any) {
    // TODO: add logic send DM 
    return await this.socketManager.writeChatMessage({ ...data, mode: ChannelStreamMode.STREAM_MODE_DM, is_public: false });
  }
}
