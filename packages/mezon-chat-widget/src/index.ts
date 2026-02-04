import { ChatLauncher } from './components/ChatLauncher';
import { ChatWidget } from './components/ChatWidget';
import { OAuthHandler } from './components/OAuthHandler';
// @ts-ignore
import './MezonChatElement';
import styles from './styles/widget.css';
import './themes/index';
import { MezonLightChatConfig } from './types';

export class MezonLightChat {
   private config: MezonLightChatConfig;
   private widget: ChatWidget | null = null;
   private launcher: ChatLauncher | null = null;
   private container: HTMLElement | null = null;
   private oauthHandler: OAuthHandler | null = null;

   constructor(config: MezonLightChatConfig) {
      this.config = {
         position: 'bottom-right',
         ...config,
      };
   }

   public init(savedSession?: any): void {
      this.injectStyles();

      if (this.config.theme) {
         this.applyTheme(this.config.theme);
      }

      this.oauthHandler = new OAuthHandler(this.config);

      this.container = document.createElement('div');
      this.container.className = `mezon-light-chat position-${this.config.position}`;
      if (this.config.customClass) {
         this.container.classList.add(this.config.customClass);
      }

      this.widget = new ChatWidget(
         this.config,
         () => this.handleLoginRequest(),
         savedSession,
         () => this.launcher?.toggle(),
         this.config.iconHeader,
      );
      this.launcher = new ChatLauncher(() => {
         this.widget?.toggle();
      }, this.config.iconChat);

      this.container.appendChild(this.widget.getContainer());
      this.container.appendChild(this.launcher.getButton());

      document.body.appendChild(this.container);

      if (this.config.onReady) {
         this.config.onReady();
      }
   }

   private async handleLoginRequest(): Promise<void> {
      if (!this.oauthHandler) return;

      try {
         const result = await this.oauthHandler.login();
         if (result) {
            const { client, user } = result;
            this.widget?.handleLoginSuccess(client, user);
         }
      } catch (error) {
         console.error('Login failed:', error);
         if (this.config.onError) {
            this.config.onError(error as Error);
         }
      }
   }

   private injectStyles(): void {
      const styleId = 'mezon-light-chat-styles';
      if (document.getElementById(styleId)) return;

      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
   }

   private applyTheme(theme: NonNullable<MezonLightChatConfig['theme']>): void {
      const root = document.documentElement;

      if (theme.tokens.primaryColor) {
         root.style.setProperty('--mlc-primary', theme.tokens.primaryColor);
      }
      if (theme.tokens.backgroundColor) {
         root.style.setProperty(
            '--mlc-background',
            theme.tokens.backgroundColor,
         );
      }
      if (theme.tokens.textColor) {
         root.style.setProperty('--mlc-text', theme.tokens.textColor);
      }
      if (theme.tokens.borderRadius) {
         root.style.setProperty('--mlc-radius', theme.tokens.borderRadius);
      }
      if (theme.tokens.fontFamily) {
         root.style.setProperty('--mlc-font-family', theme.tokens.fontFamily);
      }
      if (theme.tokens.hoverColor) {
         root.style.setProperty('--mlc-primary-hover', theme.tokens.hoverColor);
      }
   }

   public open(): void {
      this.widget?.open();
      this.launcher?.toggle();
   }

   public close(): void {
      this.widget?.close();
      this.launcher?.toggle();
   }

   public logout(): void {
      this.oauthHandler?.logout();
      if (this.widget && this.container) {
         this.widget.destroy();
         this.widget = new ChatWidget(
            this.config,
            () => this.handleLoginRequest(),
            undefined,
            () => this.launcher?.toggle(),
            this.config.iconHeader,
         );
         this.container.insertBefore(
            this.widget.getContainer(),
            this.launcher?.getButton() || null,
         );
      }
   }

   public destroy(): void {
      this.widget?.destroy();
      this.launcher?.destroy();
      this.container?.remove();

      const styleEl = document.getElementById('mezon-light-chat-styles');
      styleEl?.remove();
   }

   public async startDM(peerId: string): Promise<void> {
      const chatService = this.getChatService();
      if (!chatService) {
         throw new Error('Chat service not initialized. Please login first.');
      }

      try {
         await chatService.startDM(peerId);
         console.log('DM started with peer:', peerId);
      } catch (error) {
         console.error('Failed to start DM:', error);
         if (this.config.onError) {
            this.config.onError(error as Error);
         }
         throw error;
      }
   }

   private getChatService(): any {
      return this.widget ? (this.widget as any).chatService : null;
   }

   public sendMessage(content: string): void {
      this.widget?.addMessage({
         id: Date.now().toString(),
         content,
         sender: 'user',
         timestamp: Date.now(),
      });
   }
}

export default MezonLightChat;

if (typeof window !== 'undefined') {
   (window as any).MezonLightChat = MezonLightChat;
}

export { MezonChatElement } from './MezonChatElement';
export * from './types';
