import { WebSocketAdapterPb } from 'mezon-js-protobuf';
import { Client, Session, ChannelStreamMode, ChannelType } from 'mezon-js';
import { P2PMessage } from './message';
import { SOCKET_READY_MAX_RETRY, SOCKET_READY_RETRY_DELAY, CLAN_DM } from './constants';

export class P2PSocket {
  private socket: any;
  public onChannelMessage?: (msg: P2PMessage) => void;
  public onError?: (err: any) => void;

  constructor(private client: Client, private session: Session) {}

  async connect(onError?: (err: any) => void) {
    this.socket = this.client.createSocket(this.client.useSSL, false, new WebSocketAdapterPb());
    this.socket.onerror = onError || (() => {});
    await this.socket.connect(this.session, true, '0');
  }

  setChannelMessageHandler(cb: (msg: P2PMessage) => void) {
    this.socket.onchannelmessage = (msg: any) => {
      cb({
        id: msg.id || msg.message_id,
        sender_id: msg.sender_id,
        display_name: msg.display_name,
        username: msg.username,
        avatar: msg.avatar,
        content: msg.content,
        create_time: msg.create_time,
        create_time_seconds: msg.create_time_seconds,
        attachments: msg.attachments,
        reactions: msg.reactions
      });
    };
  }

  async joinDMChannel(channel_id: string) {
    await waitForSocketReady(this.socket);
    await this.socket.joinChat(CLAN_DM, channel_id, ChannelType.CHANNEL_TYPE_DM, false);
  }

  async sendDM(channelId: string, content: any) {
    this.socket.writeChatMessage(
      CLAN_DM,
      channelId,
      ChannelStreamMode.STREAM_MODE_DM,
      false,
      content,
      [],
      [],
      [],
      false,
      false,
      '',
      0
    );
  }
}

async function waitForSocketReady(socket: any) {
  let count = 0;
  while (!(socket.adapter && socket.adapter.isOpen()) && count < SOCKET_READY_MAX_RETRY) {
    await new Promise(r => setTimeout(r, SOCKET_READY_RETRY_DELAY));
    count++;
  }
  if (!(socket.adapter && socket.adapter.isOpen())) throw new Error('Socket adapter not open');
}