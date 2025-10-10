import { ErrorEvent, CloseEvent } from "ws";
import { MezonApi } from "../../api";
import { Events } from "../../constants";
import { DefaultSocket } from "../../socket";
import { WebSocketAdapter } from "../../web_socket_adapter";
import { WebSocketAdapterPb } from "../../web_socket_adapter_pb";
import { Socket } from "../../interfaces/socket";
import { Session } from "../../session";
import { EventManager } from "./event_manager";
import { Clan } from "../structures/Clan";
import { MezonClient } from "../client/MezonClient";
import {
  EphemeralMessageData,
  ReactMessageData,
  RemoveMessageData,
  ReplyMessageData,
  UpdateMessageData,
} from "../../interfaces";
import { AsyncThrottleQueue } from "../utils/AsyncThrottleQueue";
import { MessageDatabase } from "../../sqlite/MessageDatabase";

export class SocketManager {
  [key: string]: any;
  private socket: Socket;
  private isHardDisconnect: boolean | undefined;
  private isRetrying = false;
  constructor(
    private host: string,
    private port: string,
    private useSSL: boolean,
    private adapter: WebSocketAdapter,
    private apiClient: MezonApi,
    private eventManager: EventManager,
    private messageQueue: AsyncThrottleQueue,
    private client: MezonClient,
    private messageDB: MessageDatabase
  ) {
    this.socket = new DefaultSocket(
      this.host,
      this.port,
      this.useSSL,
      false,
      this.adapter
    );
  }

  createSocket() {
    this.adapter = new WebSocketAdapterPb();
    this.socket = new DefaultSocket(
      this.host,
      this.port,
      this.useSSL,
      false,
      this.adapter
    );
  }

  getSocket() {
    return this.socket;
  }

  async connect(sockSession: Session) {
    this.isHardDisconnect = false;
    const session = await this.socket.connect(sockSession, true);
    return session;
  }

  closeSocket() {
    this.isHardDisconnect = true;
    this.socket.close();
    console.log("eventManager", this.eventManager);
  }

  isOpen(): boolean {
    return this.socket.isOpen();
  }

  async onerror(evt: ErrorEvent) {
    console.log("onerror", evt);
    if (this.isHardDisconnect) return;
    if (this.socket.isOpen()) {
      await this.retriesConnect();
    }
  }

  onheartbeattimeout() {
    console.log("Heartbeat timeout.");
  }

  ondisconnect(e: CloseEvent) {
    console.log("Disconnected!", e?.reason);
    if (this.isHardDisconnect) return;
    this.retriesConnect();
  }

  async connectSocket(sessionToken: string) {
    try {
      const clans = await this.apiClient.listClanDescs(sessionToken);
      const clanList = clans?.clandesc ?? [];
      clanList.push({ clan_id: "0", clan_name: "" });
      clanList.forEach(async (clan) => {
        await this.socket.joinClanChat(clan.clan_id || "");
        if (!this.client.clans.get(clan.clan_id!)) {
          const clanObj = new Clan(
            {
              id: clan.clan_id!,
              name: clan?.clan_name ?? "unknown",
              welcome_channel_id: clan?.welcome_channel_id ?? "",
            },
            this.client,
            this.apiClient,
            this,
            sessionToken,
            this.messageQueue,
            this.messageDB
          );
          this.client.clans.set(clan.clan_id!, clanObj);
        }
      });

      // join direct message
      await this.socket.joinClanChat("0");
      ["ondisconnect", "onerror", "onheartbeattimeout"].forEach((event) => {
        this.socket[event] = (this[event as keyof this] as Function).bind(this);
      });

      for (const event in Events) {
        const key = Events[event as keyof typeof Events].toString();
        this.socket.socketEvents.on(key, (...args: any[]) => {
          this.client.emit(key, ...args);
        });
      }
    } catch (error) {
      this.closeSocket()
    }
  }

  async retriesConnect(): Promise<void> {
    let retryInterval = 5000;
    const maxRetryInterval = 60000;

    console.log("Reconnecting...");

    const retry = async () => {
      if (this.isRetrying || this.isHardDisconnect) return;
      this.isRetrying = true;

      try {
        await this.client.login();

        this.isRetrying = false;
        console.log("Connected successfully!");
      } catch (e) {
        console.log("Connection failed!", e);
        retryInterval = Math.min(retryInterval * 2, maxRetryInterval);
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);

        setTimeout(retry, retryInterval);
      }
    };

    retry();
  }

  async writeChatMessage(dataWriteMessage: ReplyMessageData) {
    try {
      const msgACK = await this.socket.writeChatMessage(
        dataWriteMessage.clan_id,
        dataWriteMessage.channel_id,
        dataWriteMessage.mode,
        dataWriteMessage.is_public,
        dataWriteMessage.content,
        dataWriteMessage?.mentions ?? [],
        dataWriteMessage?.attachments ?? [],
        dataWriteMessage?.references ?? [],
        dataWriteMessage?.anonymous_message,
        dataWriteMessage?.mention_everyone,
        dataWriteMessage?.avatar,
        dataWriteMessage?.code,
        dataWriteMessage?.topic_id
      );
      return msgACK;
    } catch (error) {
      throw error;
    }
  }

  async writeEphemeralMessage(dataWriteMessage: EphemeralMessageData) {
    try {
      const msgACK = await this.socket.writeEphemeralMessage(
        dataWriteMessage.receiver_id,
        dataWriteMessage.clan_id,
        dataWriteMessage.channel_id,
        dataWriteMessage.mode,
        dataWriteMessage.is_public,
        dataWriteMessage.content,
        dataWriteMessage?.mentions ?? [],
        dataWriteMessage?.attachments ?? [],
        dataWriteMessage?.references ?? [],
        dataWriteMessage?.anonymous_message,
        dataWriteMessage?.mention_everyone,
        dataWriteMessage?.avatar,
        dataWriteMessage?.code,
        dataWriteMessage?.topic_id
      );
      return msgACK;
    } catch (error) {
      throw error;
    }
  }

  async updateChatMessage(dataUpdateMessage: UpdateMessageData) {
    try {
      const msgACK = await this.socket.updateChatMessage(
        dataUpdateMessage.clan_id,
        dataUpdateMessage.channel_id,
        dataUpdateMessage.mode,
        dataUpdateMessage.is_public,
        dataUpdateMessage.message_id,
        dataUpdateMessage.content,
        dataUpdateMessage?.mentions ?? [],
        dataUpdateMessage?.attachments ?? [],
        dataUpdateMessage?.hideEditted ?? false,
        dataUpdateMessage?.topic_id
      );
      return msgACK;
    } catch (error) {
      throw error;
    }
  }

  async writeMessageReaction(dataReactionMessage: ReactMessageData) {
    try {
      const msgACK = await this.socket.writeMessageReaction(
        dataReactionMessage.id ?? "",
        dataReactionMessage.clan_id,
        dataReactionMessage.channel_id,
        dataReactionMessage.mode,
        dataReactionMessage.is_public,
        dataReactionMessage.message_id,
        dataReactionMessage.emoji_id,
        dataReactionMessage.emoji,
        dataReactionMessage.count,
        dataReactionMessage.message_sender_id,
        dataReactionMessage?.action_delete ?? false
      );
      return msgACK;
    } catch (error) {
      throw error;
    }
  }

  async removeChatMessage(dataRemoveMessage: RemoveMessageData) {
    try {
      const msgACK = await this.socket.removeChatMessage(
        dataRemoveMessage.clan_id,
        dataRemoveMessage.channel_id,
        dataRemoveMessage.mode,
        dataRemoveMessage.is_public,
        dataRemoveMessage.message_id
      );
      return msgACK;
    } catch (error) {
      throw error;
    }
  }
}
