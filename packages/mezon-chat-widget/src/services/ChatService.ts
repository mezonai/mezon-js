/**
 * Chat Service
 * Handles real-time messaging via SDK socket
 */

import { LightClient, LightSocket } from 'mezon-light-sdk';
import type { ChatMessage, IChatService, Unsubscribe } from './interfaces';

/**
 * SDK SDKChannelMessage type (matches mezon-light-sdk internal type)
 * Defined inline to avoid importing from internal SDK paths
 */
interface SDKChannelMessage {
  id: string;
  channel_id: string;
  content: string;
  sender_id: string;
  message_id?: string;
  create_time_seconds?: number;
}

type MessageHandler = (msg: ChatMessage) => void;
type ErrorHandler = (error: Error) => void;

export class ChatService implements IChatService {
  private client: LightClient;
  private socket: LightSocket | null = null;
  private currentChannelId: string | null = null;
  
  private messageHandlers: Set<MessageHandler> = new Set();
  private errorHandlers: Set<ErrorHandler> = new Set();

  constructor(client: LightClient) {
    this.client = client;
  }

  async connect(): Promise<void> {
    if (this.socket) {
      console.warn('[ChatService] Already connected');
      return;
    }

    try {
      this.socket = new LightSocket(this.client, this.client.getSession());

      await this.socket.connect({
        onError: (err) => {
          console.error('[ChatService] Socket error:', err);
          this.notifyError(err instanceof Error ? err : new Error(String(err)));
        },
        onDisconnect: () => {
          console.log('[ChatService] Socket disconnected');
        }
      });

      this.socket.setChannelMessageHandler((msg: SDKChannelMessage) => {
        this.handleIncomingMessage(msg);
      });

      console.log('[ChatService] Connected successfully');
    } catch (error) {
      console.error('[ChatService] Connection failed:', error);
      this.notifyError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.currentChannelId = null;
    console.log('[ChatService] Disconnected');
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.isConnected;
  }

  async startDM(peerId: string): Promise<string> {
    const cleanPeerId = peerId.trim();
    if (!cleanPeerId) {
      throw new Error('Peer ID cannot be empty');
    }

    try {
      console.log(`[ChatService] Creating DM with peer: "${cleanPeerId}"`);
      const channel = await this.client.createDM(cleanPeerId);
      const channelId = channel.channel_id ? String(channel.channel_id) : '';

      if (!channelId) {
        throw new Error('Failed to create DM: No channel ID returned');
      }

      if (this.socket) {
        await this.socket.joinDMChannel(channelId);
        this.currentChannelId = channelId;
        console.log('[ChatService] Joined DM channel:', channelId);
      }

      return channelId;
    } catch (error) {
      console.error('[ChatService] Failed to start DM:', error);
      this.notifyError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  async sendMessage(content: string, attachments?: unknown[]): Promise<void> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    if (!this.currentChannelId) {
      throw new Error('No active channel');
    }

    try {
      // Prepend origin for tracking
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const messageContent = origin ? `Message send from: [${origin}]\n${content}` : content;

      await this.socket.sendDM({
        channelId: this.currentChannelId, 
        content: messageContent,
        attachments: attachments as any
      });

      console.log('[ChatService] Message sent');
    } catch (error) {
      console.error('[ChatService] Failed to send message:', error);
      this.notifyError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  getCurrentChannelId(): string | null {
    return this.currentChannelId;
  }

  onMessage(callback: MessageHandler): Unsubscribe {
    this.messageHandlers.add(callback);
    return () => {
      this.messageHandlers.delete(callback);
    };
  }

  onError(callback: ErrorHandler): Unsubscribe {
    this.errorHandlers.add(callback);
    return () => {
      this.errorHandlers.delete(callback);
    };
  }

  // Private helpers
  private handleIncomingMessage(raw: SDKChannelMessage): void {
    // Don't notify for own messages
    if (raw.sender_id === this.client.userId) {
      return;
    }

    const message: ChatMessage = {
      id: raw.message_id || String(Date.now()),
      content: this.extractContent(raw.content),
      sender: 'peer',
      timestamp: (raw.create_time_seconds || 0) * 1000,
      sender_id: raw.sender_id
    };

    this.messageHandlers.forEach(handler => {
      try {
        handler(message);
      } catch (err) {
        console.error('[ChatService] Handler error:', err);
      }
    });
  }

  private extractContent(content: unknown): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && 't' in (content as object)) {
      return String((content as { t: unknown }).t);
    }
    return JSON.stringify(content);
  }

  private notifyError(error: Error): void {
    this.errorHandlers.forEach(handler => {
      try {
        handler(error);
      } catch (err) {
        console.error('[ChatService] Error handler failed:', err);
      }
    });
  }
}
