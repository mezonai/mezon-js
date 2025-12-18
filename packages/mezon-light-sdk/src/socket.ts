import { WebSocketAdapterPb } from "mezon-js-protobuf";
import {
  Socket,
  Client,
  Session,
  ChannelStreamMode,
  ChannelType,
} from "mezon-js";
import { ChannelMessage } from "./message";
import {
  SOCKET_READY_MAX_RETRY,
  SOCKET_READY_RETRY_DELAY,
  CLAN_DM,
} from "./constants";

export class LightSocket {
  private socket!: Socket;
  public onError?: (err: any) => void;

  constructor(private client: Client, private session: Session) {}

  async connect(onError?: (err: any) => void) {
    this.socket = this.client.createSocket(
      this.client.useSSL,
      false,
      new WebSocketAdapterPb()
    );
    this.socket.onerror = onError || (() => {});
    await this.socket.connect(this.session, true, "0");
  }

  setChannelMessageHandler(cb: (msg: ChannelMessage) => void) {
    this.socket.onchannelmessage = (msg: any) => {
      if (msg && msg.error) {
        if (this.onError) this.onError(msg.error);
        return;
      }
      cb({
        clan_id: msg.clan_id,
        channel_id: msg.channel_id,
        message_id: msg.message_id || msg.id,
        code: msg.code,
        sender_id: msg.sender_id,
        username: msg.username,
        avatar: msg.avatar,
        content: msg.content,
        create_time: msg.create_time,
        update_time: msg.update_time,
        display_name: msg.display_name,
        mentions: msg.mentions || [],
        attachments: msg.attachments || [],
        references: msg.references || [],
        create_time_seconds: msg.create_time_seconds,
        update_time_seconds: msg.update_time_seconds,
        hide_editted: msg.hide_editted,
      });
    };
  }

  async joinDMChannel(channel_id: string) {
    await waitForSocketReady(this.socket);
    await this.socket.joinChat(
      CLAN_DM,
      channel_id,
      ChannelType.CHANNEL_TYPE_DM,
      false
    );
  }

  async sendDM(
    channelId: string,
    content: any,
    attachments: any[] = [],
    references: any[] = []
  ) {
    this.socket.writeChatMessage(
      CLAN_DM,
      channelId,
      ChannelStreamMode.STREAM_MODE_DM,
      false,
      content,
      attachments,
      references,
      [],
      false,
      false,
      "",
      0
    );
  }
}

async function waitForSocketReady(socket: any) {
  let count = 0;
  let delay = SOCKET_READY_RETRY_DELAY;
  while (
    !(socket.adapter && socket.adapter.isOpen()) &&
    count < SOCKET_READY_MAX_RETRY
  ) {
    await new Promise((r) => setTimeout(r, delay));
    delay *= 2;
    count++;
  }
  if (!(socket.adapter && socket.adapter.isOpen()))
    throw new Error("Socket not open");
}