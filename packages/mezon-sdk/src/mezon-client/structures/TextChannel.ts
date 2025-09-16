import {
  ApiChannelDescription,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageRef,
  ApiQuickMenuAccessPayload,
  ApiQuickMenuAccessRequest,
  ChannelMessageContent,
  EphemeralMessageData,
  ReplyMessageData,
} from "../../interfaces";
import { MessageDatabase } from "../../sqlite/MessageDatabase";
import {
  convertChanneltypeToChannelMode,
  generateSnowflakeId,
} from "../../utils/helper";
import { SocketManager } from "../manager/socket_manager";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { CacheManager } from "../utils/CacheManager";
import { Clan } from "./Clan";
import { Message } from "./Message";

export class TextChannel {
  public id: string | undefined;
  public name: string | undefined;
  public is_private: boolean;
  public channel_type: number | undefined;
  public category_id: string | undefined;
  public category_name: string | undefined;
  public parent_id: string | undefined;
  public meeting_code: string | undefined;
  public clan: Clan;
  public messages: CacheManager<string, Message>;

  private readonly socketManager: SocketManager;
  private readonly messageQueue: AsyncThrottleQueue;
  private messageDB: MessageDatabase;

  constructor(
    initChannelData: ApiChannelDescription,
    clan: Clan,
    socketManager: SocketManager,
    messageQueue: AsyncThrottleQueue,
    messageDB: MessageDatabase
  ) {
    this.id = initChannelData.channel_id;
    this.name = initChannelData.channel_label;
    this.channel_type = initChannelData?.type;
    this.is_private = !!initChannelData?.channel_private;
    this.category_id = initChannelData?.category_id ?? "";
    this.category_name = initChannelData?.category_name ?? "";
    this.parent_id = initChannelData?.parent_id ?? "";
    this.meeting_code = initChannelData?.meeting_code ?? "";
    this.clan = clan;
    this.messages = new CacheManager<string, Message>(async (message_id) => {
      const messageDb = this.messageDB.getMessageById(message_id, this.id!);
      if (!messageDb) {
        throw Error(`Message ${message_id} not found on channel ${this.id}!`);
      }
      const newMessage = new Message(
        messageDb,
        this,
        this.socketManager,
        this.messageQueue
      );
      return newMessage;
    }, 200);
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
    this.messageDB = messageDB;
  }

  async send(
    content: ChannelMessageContent,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id?: string,
    code?: number
  ) {
    return this.messageQueue.enqueue(async () => {
      const dataSend: ReplyMessageData = {
        clan_id: this.clan.id,
        channel_id: this.id!,
        mode: convertChanneltypeToChannelMode(this.channel_type!),
        is_public: !this.is_private,
        content,
        mentions,
        attachments,
        anonymous_message,
        mention_everyone,
        code,
        topic_id,
      };
      return await this.socketManager.writeChatMessage(dataSend);
    });
  }

  async sendEphemeral(
    receiver_id: string,
    content: any,
    reference_message_id?: string,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id?: string,
    code: number = 12
  ) {
    return this.messageQueue.enqueue(async () => {
      let references: ApiMessageRef[] = [];
      if (reference_message_id) {
        let messageRef = await this.messages.fetch(reference_message_id);
        const user = await this.clan.users.fetch(messageRef.sender_id);
        references = [
          {
            message_ref_id: messageRef.id,
            message_sender_id: messageRef.sender_id,
            message_sender_username:
              user.clan_nick || user.display_name || user.username,
            mesages_sender_avatar: user.clan_avatar || user.avartar,
            content: JSON.stringify(messageRef.content),
          },
        ];
      }
      const dataSend: EphemeralMessageData = {
        receiver_id,
        clan_id: this.clan.id,
        channel_id: this.id!,
        mode: convertChanneltypeToChannelMode(this.channel_type!),
        is_public: !this.is_private,
        content,
        mentions,
        attachments,
        references: references ?? [],
        anonymous_message,
        mention_everyone,
        code,
        topic_id,
      };
      return await this.socketManager.writeEphemeralMessage(dataSend);
    });
  }

  async addQuickMenuAccess(body: ApiQuickMenuAccessPayload) {
    const id = generateSnowflakeId();
    const bot_id = this.clan.getClientId();
    const payload: ApiQuickMenuAccessRequest = {
      channel_id: "0",
      clan_id: body?.clan_id ?? "0",
      menu_type: body?.menu_type ?? 1,
      action_msg: body.action_msg,
      background: body?.background ?? "",
      menu_name: body.menu_name,
      id,
      bot_id,
    };
    try {
      return await this.clan.apiClient.addQuickMenuAccess(
        this.clan.sessionToken,
        payload
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteQuickMenuAccess(botId?: string) {
    const botIdPayload = botId ?? this.clan.getClientId();
    try {
      return await this.clan.apiClient.deleteQuickMenuAccess(
        this.clan.sessionToken,
        botIdPayload
      );
    } catch (error) {
      throw error;
    }
  }

  async playMedia(url: string, participantIdentity: string, participantName: string, name: string) {
    const meetingCode = this.meeting_code;
    if (!meetingCode) {
      return { error: "Channel not voice channel." };
    }
    const token = this.clan.sessionToken;
    if (!token) {
      return { error: "Token not found." };
    }
    const payload = {
      room_name: meetingCode,
      participant_identity: participantIdentity,
      participant_name: participantName,
      url: url,
      name: name,
    };
    try {
      return await this.clan.apiClient.playMedia(token, payload);
    } catch (error) {
      throw error;
    }
  }
}