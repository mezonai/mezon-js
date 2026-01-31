import type { LightClient } from 'mezon-light-sdk';
import { ChatMessage, MezonLightChatConfig, UserInfo } from '../types';
import { LoginView } from './LoginView';
import { t } from '../i18n';
import headerIconSvg from '../icons/logo.svg';
export class ChatWidget {
  private container: HTMLElement;
  private messagesContainer: HTMLElement;
  private inputElement: HTMLInputElement;
  private inputArea: HTMLElement;
  private config: MezonLightChatConfig;
  private mezonClient: LightClient | null = null;
  private messages: ChatMessage[] = [];
  private loginView: LoginView | null = null;
  private isAuthenticated: boolean = false;
  private onLoginRequest: (() => void) | null = null;
  private onClose: (() => void) | null = null;
  private iconHeader: string = headerIconSvg;

  constructor(config: MezonLightChatConfig, onLoginRequest: () => void, savedSession?: any, onClose?: () => void, iconHeader?: string) {
    this.config = config;
    if (iconHeader) {
      this.iconHeader = iconHeader;
    }

    this.onLoginRequest = onLoginRequest;
    this.onClose = onClose ?? null;
    this.container = this.createContainer();
    this.messagesContainer = this.container.querySelector('.mlc-messages')!;
    this.inputElement = this.container.querySelector('.mlc-input')!;
    this.inputArea = this.container.querySelector('.mlc-input-area')!;
    this.setupEventListeners();


    if (savedSession) {
      this.restoreSession(savedSession);
    } else {
      this.showLoginView();
    }
  }

  private async restoreSession(session: any): Promise<void> {
    try {
      const { LightClient } = await import('mezon-light-sdk');
      const defaultServerKey = 'HTTP3m3zonPr0dkey:';

      console.log('🔄 Restoring session with initClient...');

      const client = LightClient.initClient({
        token: session.token,
        refresh_token: session.refresh_token,
        api_url: session.api_url,
        user_id: session.user_id,
        serverkey: defaultServerKey
      });

      const isExpired = await client.isSessionExpired();
      if (isExpired) {
        console.log('⚠️ Session expired, attempting refresh...');
        const refreshExpired = await client.isRefreshSessionExpired();
        if (refreshExpired) {
          throw new Error('Refresh token also expired');
        }
        await client.refreshSession();

        if (this.config.saveSession) {
          const { SessionManager } = await import('../utils/SessionManager');
          SessionManager.saveSession(client.getSession(), {
            user_id: session.user_id,
            username: session.username,
            name: session.name
          });
        }
      }

      this.handleLoginSuccess(client, {
        user_id: session.user_id,
        username: session.username,
        name: session.name
      });
    } catch (error) {
      console.error('Failed to restore session:', error);
      const { SessionManager } = await import('../utils/SessionManager');
      SessionManager.clearSession();
      this.showLoginView();
    }
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'mlc-container';
    container.innerHTML = `
    <div class="mlc-header">
      <div class="mlc-header-title-wrap">
        <div class="mlc-header-icon"></div>
        <h3 class="mlc-header-title">${t('chatSupport')}</h3>
      </div>
      <button class="mlc-close-btn" aria-label="Close chat">×</button>
    </div>
    <div class="mlc-messages"></div>
    <div class="mlc-input-area" style="display: none;">
      <input type="text" class="mlc-input" placeholder="${t('typeMessage')}" />
      <button class="mlc-send-btn">${t('send')}</button>
    </div>
  `;

    const iconWrapper = container.querySelector('.mlc-header-icon') as HTMLElement;
    const icon = this.iconHeader?.trim() || '';

    if (icon.startsWith('<svg') || icon.startsWith('<?xml')) {
      // Parse SVG để xử lý thuộc tính
      const parser = new DOMParser();
      const doc = parser.parseFromString(icon, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');

      if (svgElement) {
        // Đảm bảo có viewBox để không bị mất hình
        if (!svgElement.getAttribute('viewBox')) {
          const w = svgElement.getAttribute('width') || '240';
          const h = svgElement.getAttribute('height') || '241';
          svgElement.setAttribute('viewBox', `0 0 ${w} ${h}`);
        }
        // Xóa width/height để điều khiển bằng CSS
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
        svgElement.style.display = 'block';
        svgElement.style.width = '100%';
        svgElement.style.height = '100%';

        iconWrapper.appendChild(svgElement);
      }
    } else if (icon) {
      const img = document.createElement('img');
      img.src = icon;
      img.alt = 'Support Image';
      img.className = 'mlc-header-icon-img';
      iconWrapper.appendChild(img);
    }

    return container;
  }

  private setupEventListeners(): void {
    const closeBtn = this.container.querySelector('.mlc-close-btn');
    const sendBtn = this.container.querySelector('.mlc-send-btn');

    closeBtn?.addEventListener('click', () => {
      this.close();
      if (this.onClose) {
        this.onClose();
      }
    });
    sendBtn?.addEventListener('click', () => this.sendMessage());

    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  private showLoginView(): void {
    this.loginView = new LoginView(() => {
      if (this.onLoginRequest) {
        this.onLoginRequest();
      }
    });
    this.messagesContainer.innerHTML = '';
    this.messagesContainer.appendChild(this.loginView.getContainer());
  }

  public async handleLoginSuccess(client: LightClient, user: UserInfo): Promise<void> {
    this.mezonClient = client;
    this.isAuthenticated = true;

    if (this.config.saveSession) {
      const { SessionManager } = await import('../utils/SessionManager');
      SessionManager.saveSession(client.getSession(), user);
    }

    if (this.loginView) {
      this.loginView.destroy();
      this.loginView = null;
    }

    this.messagesContainer.innerHTML = '';
    const welcomeMsg = this.config.welcomeMessage || t('defaultWelcomeMessage').replace('{0}', user.username || user.name || '');
    this.addMessage({
      id: Date.now().toString(),
      content: welcomeMsg,
      sender: 'ai',
      timestamp: Date.now()
    });

    this.inputArea.style.display = 'flex';

    await this.initializeChatService(client);

    if (this.config.peerId) {
      await this.autoStartDM(this.config.peerId);
    }
  }

  private async autoStartDM(peerId: string): Promise<void> {
    try {
      const chatService = (this as any).chatService;
      if (!chatService) {
        console.warn('Chat service not initialized yet');
        return;
      }

      console.log('🚀 Auto-starting DM with peer:', peerId);
      await chatService.startDM(peerId);

      this.addMessage({
        id: Date.now().toString(),
        content: t('connectedStartChatting'),
        sender: 'ai',
        timestamp: Date.now()
      });

      if (this.config.autoOpen) {
        this.open();
      }
    } catch (error) {
      console.error('Failed to auto-start DM:', error);
      this.addMessage({
        id: Date.now().toString(),
        content: t('failedConnect'),
        sender: 'ai',
        timestamp: Date.now()
      });
    }
  }

  private async initializeChatService(client: LightClient): Promise<void> {
    try {
      const { ChatService } = await import('./ChatService');
      const chatService = new ChatService(client);

      await chatService.connect();

      chatService.setMessageHandler((msg) => {
        if (msg.sender_id !== client.userId) {
          this.addMessage({
            id: msg.message_id!,
            content: (msg.content as any)?.t ?? JSON.stringify(msg.content),
            sender: 'ai',
            timestamp: msg.create_time_seconds! * 1000
          });
        }
      });

      chatService.setErrorHandler((error) => {
        console.error('Chat service error:', error);
        if (this.config.onError) {
          this.config.onError(error);
        }
      });

      (this as any).chatService = chatService;

      console.log('✅ Chat service initialized');
    } catch (error) {
      console.error('Failed to initialize chat service:', error);
      if (this.config.onError) {
        this.config.onError(error as Error);
      }
    }
  }

  public open(): void {
    this.container.classList.add('open');
  }

  public close(): void {
    this.container.classList.remove('open');
  }

  public toggle(): void {
    this.container.classList.toggle('open');
  }

  private async sendMessage(): Promise<void> {
    if (!this.isAuthenticated) {
      console.warn('User not authenticated');
      return;
    }

    const text = this.inputElement.value.trim();
    if (!text) return;

    this.addMessage({
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: Date.now()
    });

    this.inputElement.value = '';

    if (this.config.onMessage) {
      this.config.onMessage({ content: text, sender: 'user' });
    }

    const chatService = (this as any).chatService;
    if (chatService) {
      try {
        if (!chatService.getCurrentChannelId()) {
          this.addMessage({
            id: (Date.now() + 1).toString(),
            content: t('configurePeerId'),
            sender: 'ai',
            timestamp: Date.now()
          });
          return;
        }

        await chatService.sendMessage(text);
      } catch (error) {
        console.error('Failed to send message:', error);
        this.addMessage({
          id: (Date.now() + 1).toString(),
          content: t('failedSendMessage'),
          sender: 'ai',
          timestamp: Date.now()
        });
      }
    }
  }

  public addMessage(message: ChatMessage): void {
    this.messages.push(message);

    const messageEl = document.createElement('div');
    messageEl.className = `mlc-message ${message.sender}`;
    messageEl.innerHTML = `
      <div class="mlc-message-bubble">${this.escapeHtml(message.content)}</div>
    `;

    this.messagesContainer.appendChild(messageEl);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  public setMezonClient(client: LightClient): void {
    this.mezonClient = client;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public destroy(): void {
    this.container.remove();
  }
}

