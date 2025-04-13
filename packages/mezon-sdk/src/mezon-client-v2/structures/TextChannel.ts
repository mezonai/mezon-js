import { ApiChannelDescription } from "../../interfaces";
import { convertChanneltypeToChannelMode } from "../../utils/helper";
import { SocketManager } from "../manager/socket_manager";
import { Clan } from "./Clan";

export class TextChannel {
  public id: string | undefined;
  public name: string | undefined;
  public is_private: boolean;
  public channel_type: number | undefined;
  public category_id: string | undefined;
  public category_name: string | undefined;
  public parent_id: string | undefined;
  public clan: Clan;
  public socketManager: SocketManager;

  constructor(
    public channelObj: ApiChannelDescription,
    clan: Clan,
    socketManager: SocketManager
  ) {
    this.id = channelObj.channel_id;
    this.name = channelObj.channel_label;
    this.channel_type = channelObj?.type;
    this.is_private = !!channelObj?.channel_private;
    this.category_id = channelObj?.category_id ?? "";
    this.category_name = channelObj?.category_name ?? "";
    this.parent_id = channelObj?.parent_id ?? "";
    this.clan = clan;
    this.socketManager = socketManager;
  }

  async send(content: any) {
    const dataSend = {
      clan_id: this.clan.id,
      channel_id: this.id,
      mode: convertChanneltypeToChannelMode(this.channel_type!),
      is_public: !this.is_private,
      content,
    };
    return await this.socketManager.writeChatMessage(dataSend);
  }
}
