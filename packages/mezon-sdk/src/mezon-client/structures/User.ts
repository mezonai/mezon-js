import { ChannelStreamMode } from "../../constants";
import {
  ApiGetZkProofRequest,
  APISentTokenRequestUser,
  ChannelMessageContent,
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

  async getEphemeralKeyPair() {
    if (!this.clan.mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this.clan.mmnClient.generateEphemeralKeyPair();
  }

  async getAddress(user_id: string) {
    if (!this.clan.mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this.clan.mmnClient.getAddressFromUserId(user_id);
  }

  async getZkProofs(data: ApiGetZkProofRequest) {
    if (!this.clan.zkClient) {
      throw new Error("ZkClient not initialized");
    }
    const req = {
      userId: data.user_id,
      jwt: data.jwt,
      address: data.address,
      ephemeralPublicKey: data.ephemeral_public_key,
    };

    return this.clan.zkClient.getZkProofs(req);
  }

  async getCurrentNonce(user_id: string, tag?: "latest" | "pending") {
    if (!this.clan.mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    return this.clan.mmnClient.getCurrentNonce(user_id, tag || "pending");
  }

  async sendToken(tokenEvent: APISentTokenRequestUser) {
    if (!this.clan.mmnClient) {
      throw new Error("MmnClient not initialized");
    }

    const nonce = await this.getCurrentNonce(this.clan.clientId!, "pending");

    try {
      return this.clan.mmnClient.sendTransaction({
        sender: tokenEvent.sender_id,
        recipient: this.id,
        amount: this.clan.mmnClient.scaleAmountToDecimals(tokenEvent.amount),
        nonce: nonce.nonce + 1,
        textData: tokenEvent.note,
        extraInfo: JSON.stringify(tokenEvent.mmn_extra_info),
        publicKey: this.clan.keyGen.publicKey,
        privateKey: this.clan.keyGen.privateKey,
        zkProof: this.clan.zkProofs.proof,
        zkPub: this.clan.zkProofs.public_input,
      });
    } catch (error) {
      console.log("Error sendToken");
      return null;
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

  async listTransactionDetail(transactionId: string): Promise<any> {
    const session = this.clan.sessionToken;
    return this.clan.apiClient.listTransactionDetail(session, transactionId);
  }
}
