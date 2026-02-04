/**
 * MezonChatCore - Main Orchestrator
 * Coordinates services and manages widget lifecycle
 */

import type { LightClient } from 'mezon-light-sdk';
import {
   AuthService,
   ChatService,
   StorageService,
   type AuthState,
   type ChatMessage,
   type IAuthService,
   type IChatService,
   type ISessionService,
   type Unsubscribe,
   type UserInfo,
} from '../services';

export interface MezonChatCoreConfig {
   apiBaseUrl: string;
   apiOauthPath?: string;
   apiExchangePath?: string;
   peerId?: string;
   saveSession?: boolean;
   exchangeCallback?: (response: unknown) => unknown;
   oauthCallback?: (response: unknown) => unknown;
}

type ReadyHandler = () => void;
type LoginHandler = (user: UserInfo) => void;
type LogoutHandler = () => void;
type MessageHandler = (msg: ChatMessage) => void;
type ErrorHandler = (error: Error) => void;

export class MezonChatCore {
   private config: MezonChatCoreConfig;
   private authService: IAuthService;
   private chatService: IChatService | null = null;
   private sessionService: ISessionService;

   private readyHandlers: Set<ReadyHandler> = new Set();
   private loginHandlers: Set<LoginHandler> = new Set();
   private logoutHandlers: Set<LogoutHandler> = new Set();
   private messageHandlers: Set<MessageHandler> = new Set();
   private errorHandlers: Set<ErrorHandler> = new Set();

   constructor(config: MezonChatCoreConfig) {
      this.config = config;

      this.sessionService = new StorageService();
      this.authService = new AuthService({
         apiBaseUrl: config.apiBaseUrl,
         apiOauthPath: config.apiOauthPath,
         apiExchangePath: config.apiExchangePath,
         sessionService: this.sessionService,
         exchangeCallback: config.exchangeCallback,
         oauthCallback: config.oauthCallback,
      });

      this.authService.onAuthStateChange((state, user) => {
         this.handleAuthStateChange(state, user);
      });
   }

   /**
    * Initialize the core - attempt session restore
    */
   async init(): Promise<boolean> {
      try {
         const result = await (
            this.authService as AuthService
         ).restoreSession();
         if (result) {
            await this.initChatService(result.client);
            this.notifyReady();
            return true;
         }
         this.notifyReady();
         return false;
      } catch (error) {
         console.error('[MezonChatCore] Init failed:', error);
         this.notifyReady();
         return false;
      }
   }

   /**
    * Trigger login flow
    */
   async login(): Promise<void> {
      try {
         const result = await this.authService.login();
         await this.initChatService(result.client);

         if (this.config.peerId && this.chatService) {
            await this.chatService.startDM(this.config.peerId);
         }
      } catch (error) {
         console.error('[MezonChatCore] Login failed:', error);
         this.notifyError(
            error instanceof Error ? error : new Error(String(error)),
         );
         throw error;
      }
   }

   /**
    * Logout and cleanup
    */
   logout(): void {
      this.chatService?.disconnect();
      this.chatService = null;
      this.authService.logout();
      this.notifyLogout();
   }

   /**
    * Start a DM conversation
    */
   async startDM(peerId: string): Promise<string> {
      if (!this.chatService) {
         throw new Error('Not authenticated');
      }
      return this.chatService.startDM(peerId);
   }

   /**
    * Send a message
    */
   async sendMessage(content: string): Promise<void> {
      if (!this.chatService) {
         throw new Error('Not authenticated');
      }
      return this.chatService.sendMessage(content);
   }

   /**
    * Check if user is authenticated
    */
   isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }

   /**
    * Get current channel ID
    */
   getCurrentChannelId(): string | null {
      return this.chatService?.getCurrentChannelId() || null;
   }

   onReady(handler: ReadyHandler): Unsubscribe {
      this.readyHandlers.add(handler);
      return () => this.readyHandlers.delete(handler);
   }

   onLogin(handler: LoginHandler): Unsubscribe {
      this.loginHandlers.add(handler);
      return () => this.loginHandlers.delete(handler);
   }

   onLogout(handler: LogoutHandler): Unsubscribe {
      this.logoutHandlers.add(handler);
      return () => this.logoutHandlers.delete(handler);
   }

   onMessage(handler: MessageHandler): Unsubscribe {
      this.messageHandlers.add(handler);
      if (this.chatService) {
         return this.chatService.onMessage(handler);
      }
      return () => this.messageHandlers.delete(handler);
   }

   onError(handler: ErrorHandler): Unsubscribe {
      this.errorHandlers.add(handler);
      return () => this.errorHandlers.delete(handler);
   }

   private async initChatService(client: LightClient): Promise<void> {
      this.chatService = new ChatService(client);

      this.chatService.onMessage((msg) => {
         this.messageHandlers.forEach((h) => h(msg));
      });

      this.chatService.onError((error) => {
         this.notifyError(error);
      });

      await this.chatService.connect();
   }

   private handleAuthStateChange(state: AuthState, user?: UserInfo): void {
      if (state === 'authenticated' && user) {
         this.notifyLogin(user);
      } else if (state === 'unauthenticated') {
         this.chatService?.disconnect();
         this.chatService = null;
      }
   }

   private notifyReady(): void {
      this.readyHandlers.forEach((h) => h());
   }

   private notifyLogin(user: UserInfo): void {
      this.loginHandlers.forEach((h) => h(user));
   }

   private notifyLogout(): void {
      this.logoutHandlers.forEach((h) => h());
   }

   private notifyError(error: Error): void {
      this.errorHandlers.forEach((h) => h(error));
   }
}
