import { LightClient, LightSocket } from 'mezon-light-sdk';
import { ChannelMessage } from 'mezon-light-sdk/dist/api.gen';

export class ChatService {
  private client: LightClient;
  private socket: LightSocket | null = null;
  private currentChannelId: string | null = null;
  private onMessageReceived: ((message: ChannelMessage) => void) | null = null;
  private onError: ((error: any) => void) | null = null;

  constructor(client: LightClient) {
    this.client = client;
  }

  public async connect(): Promise<void> {
    try {
      this.socket = new LightSocket(
        this.client,
        this.client.getSession()
      );

      await this.socket.connect({
        onError: (err) => {
          console.error('Socket error:', err);
          if (this.onError) {
            this.onError(err);
          }
        }
      });

      this.socket.setChannelMessageHandler((msg: ChannelMessage) => {
        console.log('Received message:', msg);
        if (this.onMessageReceived) {
          this.onMessageReceived(msg);
        }
      });

      console.log('Socket connected successfully');
    } catch (error) {
      console.error('Failed to connect socket:', error);
      if (this.onError) {
        this.onError(error);
      }
      throw error;
    }
  }

  public async startDM(peerId: string): Promise<string> {
    const cleanPeerId = peerId.trim();
    if (!cleanPeerId) {
      throw new Error('Peer ID cannot be empty');
    }

    try {
      console.log(`[ChatService] Creating DM with peerId: "${cleanPeerId}"`);
      const channel = await this.client.createDM(cleanPeerId);

      const channelId = channel.channel_id ? String(channel.channel_id) : '';

      if (!channelId) {
        throw new Error('Failed to create DM channel: No channel ID returned');
      }

      if (this.socket) {
        await this.socket.joinDMChannel(channelId);
        this.currentChannelId = channelId;
        console.log('[ChatService] Joined DM channel:', channelId);
      }

      return channelId;
    } catch (error: any) {
      console.error('[ChatService] Failed to start DM:', error);

      if (error.message && error.message.includes('too large')) {
        console.error('The provided Peer ID may be invalid or too large for the system to handle.', cleanPeerId);
      }

      if (this.onError) {
        this.onError(error);
      }
      throw error;
    }
  }

  public async sendMessage(content: string, attachments?: any[]): Promise<void> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    if (!this.currentChannelId) {
      throw new Error('No active channel');
    }

    const origin = window.location.origin;
    const originMessage = `${origin}\n${content}`;

    try {
      await this.socket.sendDM({
        channelId: this.currentChannelId,
        content: originMessage,
        attachments: attachments
      }
      );
      console.log('Message sent:', content);
    } catch (error) {
      console.error('Failed to send message:', error);
      if (this.onError) {
        this.onError(error);
      }
      throw error;
    }
  }

  public setMessageHandler(handler: (message: ChannelMessage) => void): void {
    this.onMessageReceived = handler;
  }

  public setErrorHandler(handler: (error: any) => void): void {
    this.onError = handler;
  }

  public getCurrentChannelId(): string | null {
    return this.currentChannelId;
  }

  public isConnected(): boolean {
    return this.socket !== null;
  }

  public disconnect(): void {
    this.socket = null;
    this.currentChannelId = null;
  }
}
