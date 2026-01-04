import { TypeMessage } from "../../constants";
import {
  ApiChannelDescription,
  ApiMessageAttachment,
  ApiMessageMention,
  ApiMessageRef,
  ChannelMessageContent,
  EphemeralMessageData,
  ReplyMessageData,
} from "../../interfaces";
import { MessageDatabase } from "../../sqlite/MessageDatabase";
import { convertChanneltypeToChannelMode } from "../../utils/helper";
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
    this.socketManager = socketManager;
    this.messageQueue = messageQueue;
    this.messageDB = messageDB;
    this.messages = new CacheManager<string, Message>(async (message_id) => {
      const messageDb = this.messageDB.getMessageById(
        message_id,
        this.id!,
        this.clan.id!
      );
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

  private async _buildEphemeralReferences(
    reference_message_id?: string
  ): Promise<{ references: ApiMessageRef[]; topic_id_from_ref?: string }> {
    if (!reference_message_id) {
      return { references: [], topic_id_from_ref: undefined };
    }
    const messageRef = await this.messages.fetch(reference_message_id);
    const client = this.clan.getClient();
    const user = await client.users.fetch(messageRef.sender_id);
    const references: ApiMessageRef[] = [
      {
        message_ref_id: messageRef.id,
        message_sender_id: messageRef.sender_id,
        message_sender_username:
          user.clan_nick || user.display_name || user.username,
        mesages_sender_avatar: user.clan_avatar || user.avartar,
        content: JSON.stringify(messageRef.content),
      },
    ];
    return { references, topic_id_from_ref: messageRef.topic_id };
  }

  private _buildEphemeralBase(receiver_id: string) {
    return {
      receiver_id,
      clan_id: this.clan.id,
      channel_id: this.id!,
      mode: convertChanneltypeToChannelMode(this.channel_type!),
      is_public: !this.is_private,
    };
  }

  async sendEphemeral(
    receiver_id: string,
    content: any,
    reference_message_id?: string,
    mentions?: Array<ApiMessageMention>,
    attachments?: Array<ApiMessageAttachment>,
    mention_everyone?: boolean,
    anonymous_message?: boolean,
    topic_id?: string
  ) {
    return this.messageQueue.enqueue(async () => {
      const base = this._buildEphemeralBase(receiver_id);
      const { references, topic_id_from_ref } =
        await this._buildEphemeralReferences(reference_message_id);
      const client = this.clan.getClient();
      const currentClient = client.users.get(client.clientId);
      const dataSend: EphemeralMessageData = {
        ...base,
        content,
        mentions: mentions ?? [],
        attachments: attachments ?? [],
        references,
        anonymous_message: !!anonymous_message,
        mention_everyone: !!mention_everyone,
        code: TypeMessage.Ephemeral,
        topic_id: topic_id_from_ref ?? topic_id,
        avatar: currentClient?.avartar ?? "",
      };

      return this.socketManager.writeEphemeralMessage(dataSend);
    });
  }

  async updateEphemeral(
    receiver_id: string,
    content: any,
    message_id: string,
    topic_id?: string,
    reference_message_id?: string,
    attachments?: Array<ApiMessageAttachment>,
    mentions?: Array<ApiMessageMention>,
    mention_everyone?: boolean,
    anonymous_message?: boolean
  ) {
    return this.messageQueue.enqueue(async () => {
      const base = this._buildEphemeralBase(receiver_id);
      const { references, topic_id_from_ref } =
        await this._buildEphemeralReferences(reference_message_id);

      const dataSend: EphemeralMessageData = {
        ...base,
        content,
        mentions: mentions ?? [],
        attachments: attachments ?? [],
        references,
        anonymous_message: !!anonymous_message,
        mention_everyone: !!mention_everyone,
        code: TypeMessage.UpdateEphemeralMsg,
        topic_id: topic_id_from_ref ?? topic_id,
        message_id,
      };

      return this.socketManager.writeEphemeralMessage(dataSend);
    });
  }

  async deleteEphemeral(
    receiver_id: string,
    message_id: string,
    topic_id?: string
  ) {
    return this.messageQueue.enqueue(async () => {
      const base = this._buildEphemeralBase(receiver_id);

      const dataSend: EphemeralMessageData = {
        ...base,
        content: { t: "deleteEphemeral" },
        mentions: [],
        attachments: [],
        references: [],
        anonymous_message: false,
        mention_everyone: false,
        code: TypeMessage.DeleteEphemeralMsg,
        topic_id: topic_id ?? "",
        message_id,
      };

      return this.socketManager.writeEphemeralMessage(dataSend);
    });
  }

  async playMedia(
    url: string,
    participantIdentity: string,
    participantName: string,
    name: string
  ) {
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
