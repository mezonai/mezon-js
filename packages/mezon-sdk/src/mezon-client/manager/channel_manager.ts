import { MezonApi } from "../../api";
import { ChannelType } from "../../constants";
import {
  ApiChannelDescription,
  ApiCreateChannelDescRequest,
} from "../../interfaces";
import { isValidUserId } from "../../utils/helper";
import { SessionManager } from "./session_manager";
import { SocketManager } from "./socket_manager";

export class ChannelManager {
  private allDmChannels: any;
  constructor(
    private apiClient: MezonApi,
    private socketManager: SocketManager,
    private sessionManager: SessionManager
  ) {}

  public async initAllDmChannels(sessionToken: string) {
    if (!sessionToken) return;
    const channels = await this.apiClient.listChannelDescs(
      sessionToken,
      ChannelType.CHANNEL_TYPE_DM
    );
    if (!channels?.channeldesc || !channels?.channeldesc?.length) return;
    this.allDmChannels = channels?.channeldesc
      .map((channel: { user_ids: string | string[]; channel_id: string; type?: number; }) => {
        if (!channel?.user_ids?.length || channel?.type !== ChannelType.CHANNEL_TYPE_DM) return;
        return {
          [channel.user_ids[0]]: channel.channel_id,
        };
      })
      .filter(Boolean)
      .reduce((acc: any, curr: any) => Object.assign(acc, curr), {});
  }

  public getAllDmChannels() {
    return this.allDmChannels;
  }

  /** Create DM channel with user */
  async createDMchannel(userId: string): Promise<null | ApiChannelDescription> {
    try {
      if (!isValidUserId(userId)) return null;
      const socket = this.socketManager.getSocket();
      const request: ApiCreateChannelDescRequest = {
        clan_id: "",
        channel_id: "0",
        category_id: "0",
        type: ChannelType.CHANNEL_TYPE_DM,
        user_ids: [userId],
        channel_private: 1,
      };
      const channelDM = await this.apiClient.createChannelDesc(
        this.sessionManager.getSession()!.token,
        request
      );

      if (channelDM) {
        await socket.joinChat(
          channelDM.clan_id!,
          channelDM.channel_id!,
          channelDM.type!,
          false
        );
        return channelDM;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
