import { MezonApi } from "../../api";
import { ChannelType } from "../../constants";
import { ApiVoiceChannelUserList } from "../../interfaces";
import { MezonClient } from "../client/MezonClient";
import { CacheManager } from "../utils/CacheManager";
import { TextChannel } from "./TextChannel";
import { User } from "./User";

interface ClanInitData {
  id: string;
  name: string;
}

export class Clan {
  public id: string;
  public name: string;
  public channels: CacheManager<string, TextChannel>;
  public users: CacheManager<string, User>;
  public sessionToken: string;
  public apiClient: MezonApi;

  private readonly client: MezonClient;

  constructor(
    initClanData: ClanInitData,
    client: MezonClient,
    apiClient: MezonApi,
    sessionToken: string
  ) {
    this.id = initClanData.id;
    this.name = initClanData.name;
    this.client = client;
    this.apiClient = apiClient;
    this.sessionToken = sessionToken;
    this.channels = new CacheManager<string, TextChannel>(async (channelId) => {
      return this.client.channels.fetch(channelId);
    });

    this.users = new CacheManager<string, User>(async (user_id) => {
      // TODO: If the channel's user cache is empty,
      // and channel.users.fetch(user_id) is called,
      // this function will be triggered to fetch the user detail from the API.
      throw Error(`User ${user_id} not in cache!`);
    });
  }

  async listChannelVoiceUsers(
    channel_id: string = "",
    channel_type: number = ChannelType.CHANNEL_TYPE_GMEET_VOICE,
    limit: number = 500,
    state?: number,
    cursor?: string
  ) {
    const clanId = this.id;

    if (limit <= 0 || limit > 500) {
      console.log("0 < limit <= 500");
      throw new Error("0 < limit <= 500");
    }
    return this.apiClient
      .listChannelVoiceUsers(
        this.sessionToken,
        clanId,
        channel_id,
        channel_type,
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
}
