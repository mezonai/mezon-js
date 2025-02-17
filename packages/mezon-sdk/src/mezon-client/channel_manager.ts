import { MezonApi } from "../api";
import { ChannelType } from "../constants/enum";
import {
  ApiCreateChannelDescRequest,
  ApiChannelDescription,
  ApiVoiceChannelUserList,
} from "../interfaces";
import { isValidUserId } from "../utils/helper";
import { SessionManager } from "./session_manager";
import { SocketManager } from "./socket_manager";

export class ChannelManager {
  constructor(
    private apiClient: MezonApi,
    private socketManager: SocketManager,
    private sessionManager: SessionManager
  ) {}

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
        await this.sleep(100);
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
      console.log(e);
      return null;
    }
  }

  async listChannelVoiceUsers(
    clanId: string,
    channelId: string,
    channelType: number,
    limit: number = 500,
    state?: number,
    cursor?: string
  ): Promise<ApiVoiceChannelUserList> {
    if (limit <= 0 || limit > 500) {
      console.log("0 < limit <= 500");
      throw new Error("0 < limit <= 500");
    }
    console.log(
      "this.sessionManager.getSession()!.token",
      this.sessionManager.getSession()!.token
    );
    return this.apiClient
      .listChannelVoiceUsers(
        this.sessionManager.getSession()!.token,
        clanId,
        channelId,
        channelType,
        limit,
        state,
        cursor
      )
      .then((response: ApiVoiceChannelUserList) => {
        var result: ApiVoiceChannelUserList = {
          voice_channel_users: [],
        };

        if (response.voice_channel_users == null) {
          return Promise.resolve(result);
        }

        response.voice_channel_users!.forEach((gu) => {
          result.voice_channel_users!.push({
            id: gu.id,
            channel_id: gu.channel_id,
            user_id: gu.user_id,
            participant: gu.participant,
          });
        });
        return Promise.resolve(result);
      });
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
