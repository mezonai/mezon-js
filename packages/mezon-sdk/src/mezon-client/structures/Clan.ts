import { MezonApi } from "../../api";
import { ChannelType } from "../../constants";
import {
  ApiRoleListEventResponse,
  ApiVoiceChannelUserList,
  MezonUpdateRoleBody,
} from "../../interfaces";
import { MessageDatabase } from "../../sqlite/MessageDatabase";
import { MezonClient } from "../client/MezonClient";
import { SocketManager } from "../manager/socket_manager";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { CacheManager } from "../utils/CacheManager";
import { TextChannel } from "./TextChannel";
import { User, UserInitData } from "./User";

interface ClanInitData {
  id: string;
  name: string;
  welcome_channel_id: string;
}

export class Clan {
  public id: string;
  public name: string;
  public welcome_channel_id: string;
  public channels: CacheManager<string, TextChannel>;
  public users: CacheManager<string, User>;
  public sessionToken: string;
  public apiClient: MezonApi;

  // cache status load channel
  private _channelsLoaded = false;

  // cache status load channel call api
  private _loadingPromise: Promise<void> | null = null;
  private readonly client: MezonClient;
  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;
  private readonly messageDB: MessageDatabase;

  constructor(
    initClanData: ClanInitData,
    client: MezonClient,
    apiClient: MezonApi,
    socketManager: SocketManager,
    sessionToken: string,
    messageQueue: AsyncThrottleQueue,
    messageDB: MessageDatabase
  ) {
    this.id = initClanData.id;
    this.name = initClanData.name;
    this.welcome_channel_id = initClanData.welcome_channel_id
    this.client = client;
    this.apiClient = apiClient;
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
    this.sessionToken = sessionToken;
    this.messageDB = messageDB;
    this.channels = new CacheManager<string, TextChannel>(async (channelId) => {
      return this.client.channels.fetch(channelId);
    });

    this.users = new CacheManager<string, User>(async (user_id) => {
      const dmChannel = await this.client.createDMchannel(user_id);
      if (!dmChannel || !dmChannel?.channel_id) {
        throw Error(`User ${user_id} not found in this clan ${this.id}!`);
      }
      const userRaw: UserInitData = {
        id: user_id,
        dmChannelId: dmChannel.channel_id,
      };
      const user = new User(
        userRaw,
        this,
        this.messageQueue,
        this.socketManager
      );
      this.users.set(user_id, user);
      return user;
    });
  }

  async loadChannels(): Promise<void> {
    if (this._channelsLoaded) return;
    if (this._loadingPromise) return this._loadingPromise;

    this._loadingPromise = (async () => {
      const channels = await this.apiClient.listChannelDescs(
        this.sessionToken,
        ChannelType.CHANNEL_TYPE_CHANNEL,
        this.id
      );

      const validChannels =
        channels?.channeldesc?.filter((c: any) => Object.keys(c).length > 0) ??
        [];
      for (const channel of validChannels) {
        const channelObj = new TextChannel(
          { ...channel, type: channel?.channel_type || channel?.type },
          this,
          this.socketManager,
          this.messageQueue,
          this.messageDB
        );
        this.channels.set(channel.channel_id!, channelObj);
        this.client.channels.set(channel.channel_id!, channelObj);
      }

      this._channelsLoaded = true;
    })();

    return this._loadingPromise;
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

  async updateRole(
    roleId: string,
    request: MezonUpdateRoleBody
  ): Promise<boolean> {
    const session = this.sessionToken;
    return this.apiClient.updateRole(session, roleId, request);
  }

  async listRoles(
    limit?: string,
    state?: string,
    cursor?: string
  ): Promise<ApiRoleListEventResponse> {
    const session = this.sessionToken;
    return this.apiClient.listRoles(session, this.id, limit, state, cursor);
  }
}
