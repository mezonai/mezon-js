import { colord } from 'colord';
import { MezonLightChat } from './index';
import { ThemeRegistry } from './themes/theme-registry';
import { MezonLightChatConfig, MezonTheme } from './types';
import { IsHexColor, NormalizeHex } from './utils/Hex';

export class MezonChatElement extends HTMLElement {
  private chatInstance: MezonLightChat | null = null;
  private config: Partial<MezonLightChatConfig> = {};

  constructor() {
    super();
  }

  async connectedCallback() {
    // Parse attributes
    this.parseAttributes();

    // Check for saved session
    if (this.config.saveSession) {
      const { SessionManager } = await import('./utils/SessionManager');
      const savedSession = SessionManager.restoreSession();
      if (savedSession) {
        // We have a session, initialize chat directly
        this.initializeChat(savedSession);
        return;
      }
    }

    // Initialize chat normally if we have required config
    if (this.hasRequiredConfig()) {
      this.initializeChat();
    }
  }

  disconnectedCallback() {
    if (this.chatInstance) {
      this.chatInstance.destroy();
    }
  }

  private parseAttributes(): void {
    // Parse OAuth config - only base URL needed!
    if (this.hasAttribute('api-base-url')) {
      this.config.apiBaseUrl = this.getAttribute('api-base-url')!;
    }

    if (this.hasAttribute('api-oauth-path')) {
      this.config.apiOauthPath = this.getAttribute('api-oauth-path')!;
    }

    if (this.hasAttribute('api-exchange-path')) {
      this.config.apiExchangePath = this.getAttribute('oauth-exchange-path')!;
    }

    // Parse peer-id
    if (this.hasAttribute('peer-id')) {
      this.config.peerId = this.getAttribute('peer-id')!;
    }

    // Parse save-session
    if (this.hasAttribute('save-session')) {
      this.config.saveSession = this.getAttribute('save-session') === 'true';
    }

    // Parse auto-open
    if (this.hasAttribute('auto-open')) {
      this.config.autoOpen = this.getAttribute('auto-open') === 'true';
    }

    // Parse welcome-message
    if (this.hasAttribute('welcome-message')) {
      this.config.welcomeMessage = this.getAttribute('welcome-message')!;
    }

    // Parse position
    if (this.hasAttribute('position')) {
      this.config.position = this.getAttribute('position') as any;
    }

    if (this.hasAttribute('theme')) {
      const themeInput = this.getAttribute('theme')?.trim();
      if (!themeInput) return;

      if (IsHexColor(themeInput)) {
        const primary = NormalizeHex(themeInput);

        const hoverColor = colord(primary).isLight()
          ? colord(primary).darken(0.25).toHex()
          : colord(primary).darken(0.12).toHex();

        const theme: MezonTheme = {
          name: 'custom',
          tokens: {
            primaryColor: primary,
            hoverColor,
          },
        };

        this.config.theme = theme;
        return;
      }

      const registeredTheme = ThemeRegistry.get(themeInput);

      if (!registeredTheme) {
        console.warn(`Theme "${themeInput}" not found`);
        return;
      }

      this.config.theme = registeredTheme;
    }

    if (this.hasAttribute('custom-class')) {
      this.config.customClass = this.getAttribute('custom-class')!;
    }

    if (this.hasAttribute('icon-chat')) {
      this.config.iconChat = this.getAttribute('icon-chat')!;
    }

    if (this.hasAttribute('icon-header')) {
      this.config.iconHeader = this.getAttribute('icon-header')!;
    }
  }

  private hasRequiredConfig(): boolean {
    // Only oauth-base-url is required now!
    return !!this.config.apiBaseUrl;
  }

  private initializeChat(savedSession?: any): void {
    if (this.chatInstance) {
      return;
    }

    this.chatInstance = new MezonLightChat(this.config as MezonLightChatConfig);
    this.chatInstance.init(savedSession);
  }

  // Public API methods
  public open(): void {
    this.chatInstance?.open();
  }

  public close(): void {
    this.chatInstance?.close();
  }

  public async startDM(peerId: string): Promise<void> {
    if (this.chatInstance) {
      await this.chatInstance.startDM(peerId);
    }
  }

  public logout(): void {
    this.chatInstance?.logout();
  }

  public sendMessage(content: string): void {
    this.chatInstance?.sendMessage(content);
  }

  // Property setters for programmatic configuration
  set apiBaseUrl(value: string) {
    this.config.apiBaseUrl = value;
    this.setAttribute('api-base-url', value);
  }

  set apiOauthPath(value: string) {
    this.config.apiOauthPath = value;
    this.setAttribute('api-oauth-path', value);
  }

  set apiExchangePath(value: string) {
    this.config.apiExchangePath = value;
    this.setAttribute('api-exchange-path', value);
  }

  set peerId(value: string) {
    this.config.peerId = value;
    this.setAttribute('peer-id', value);
  }

  set saveSession(value: boolean) {
    this.config.saveSession = value;
    this.setAttribute('save-session', String(value));
  }

  set autoOpen(value: boolean) {
    this.config.autoOpen = value;
    this.setAttribute('auto-open', String(value));
  }

  set welcomeMessage(value: string) {
    this.config.welcomeMessage = value;
    this.setAttribute('welcome-message', value);
  }

  set theme(value: any) {
    this.config.theme = value;
    this.setAttribute('theme', JSON.stringify(value));
  }

  // Getters
  get apiBaseUrl(): string | undefined {
    return this.config.apiBaseUrl;
  }

  get apiOauthPath(): string | undefined {
    return this.config.apiOauthPath;
  }

  get apiExchangePath(): string | undefined {
    return this.config.apiExchangePath;
  }

  get peerId(): string | undefined {
    return this.config.peerId;
  }

  get saveSession(): boolean | undefined {
    return this.config.saveSession;
  }

  get autoOpen(): boolean | undefined {
    return this.config.autoOpen;
  }

  get welcomeMessage(): string | undefined {
    return this.config.welcomeMessage;
  }

  get theme(): any {
    return this.config.theme;
  }

  // Attribute change observer
  static get observedAttributes() {
    return [
      'api-base-url',
      'api-oauth-path',
      'api-exchange-path',
      'peer-id',
      'save-session',
      'auto-open',
      'welcome-message',
      'position',
      'theme',
      'custom-class',
      'icon-header',
      'icon-chat'
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    this.parseAttributes();

    // Reinitialize if already initialized and required config changed
    if (this.chatInstance && this.hasRequiredConfig()) {
      this.chatInstance.destroy();
      this.chatInstance = null;
      this.initializeChat();
    }
  }

  static oauthCallBack?: (response: any) => any;
  static exchangeCallBack?: (response: any) => any;

  // Static method to handle OAuth callback
  static handleOAuthCallback() {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && window.opener) {
      console.log('✅ [Mezon Chat] OAuth Callback detected!', { code });

      let exchangeUrl = `${window.location.origin}/api/auth/exchange`;

      const element = document.querySelector('mezon-chat');
      if (element && element.hasAttribute('api-exchange-path')) {
        const baseUrl =
          element.getAttribute('api-base-url') ?? window.location.origin;

        const exchangePath =
          element.getAttribute('api-exchange-path') ?? 'api/auth/exchange';

        exchangeUrl = baseUrl.replace(/\/+$/, '') + '/' +
          exchangePath.replace(/^\/+/, '');
      }

      console.log('🔄 Exchanging code at:', exchangeUrl);

      fetch(exchangeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state })
      })
        .then(res => res.json())
        .then(rawResponse => {
          const data = MezonChatElement.exchangeCallBack
            ? MezonChatElement.exchangeCallBack(rawResponse)
            : rawResponse;

          if (!data) {
            throw new Error('Invalid exchange response');
          }

          window.opener.postMessage({
            type: 'MEZON_LOGIN_SUCCESS',
            data
          }, '*');

          window.close();
        })
        .catch(err => {
          console.error('❌ [Mezon Chat] Exchange error:', err);
          document.body.innerHTML = `<h1>Error</h1><p>${err.message}</p>`;
        });
    }
  }
}

// Register custom element
if (typeof window !== 'undefined' && !customElements.get('mezon-chat')) {
  customElements.define('mezon-chat', MezonChatElement);

  MezonChatElement.handleOAuthCallback();
}

export default MezonChatElement;
