import { MezonLightChat } from './index';
import { LogService } from './services/LogService';
import { StorageService } from './services/StorageService';
import { ThemeRegistry } from './themes/theme-registry';
import { ExchangeResponse, MezonLightChatConfig, MezonTheme } from './types';
import { darken, isLight } from './utils/color';
import { IsHexColor, NormalizeHex } from './utils/Hex';

export class MezonChatElement extends HTMLElement {
  private chatInstance: MezonLightChat | null = null;
  private config: Partial<MezonLightChatConfig> = {};

  constructor() {
    super();
  }

  async connectedCallback() {
    this.parseAttributes();

    if (this.config.saveSession) {
      const savedSession = new StorageService().restore();
      if (savedSession) {
        this.initializeChat(savedSession);
        return;
      }
    }

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
    if (this.hasAttribute('api-base-url')) {
      this.config.apiBaseUrl = this.getAttribute('api-base-url')!;
    }

    if (this.hasAttribute('api-oauth-path')) {
      this.config.apiOauthPath = this.getAttribute('api-oauth-path')!;
    }

    if (this.hasAttribute('api-exchange-path')) {
      this.config.apiExchangePath = this.getAttribute('oauth-exchange-path')!;
    }

    if (this.hasAttribute('peer-id')) {
      this.config.peerId = this.getAttribute('peer-id')!;
    }

    if (this.hasAttribute('save-session')) {
      this.config.saveSession = this.getAttribute('save-session') === 'true';
    }

    if (this.hasAttribute('auto-open')) {
      this.config.autoOpen = this.getAttribute('auto-open') === 'true';
    }

    if (this.hasAttribute('welcome-message')) {
      this.config.welcomeMessage = this.getAttribute('welcome-message')!;
    }

    if (this.hasAttribute('position')) {
      this.config.position = this.getAttribute('position') as any;
    }

    if (this.hasAttribute('theme')) {
      const themeInput = this.getAttribute('theme')?.trim();
      if (!themeInput) return;

      if (IsHexColor(themeInput)) {
        const primary = NormalizeHex(themeInput);

        const hoverColor = isLight(primary)
          ? darken(primary, 0.25)
          : darken(primary, 0.12);

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

    if (this.chatInstance && this.hasRequiredConfig()) {
      this.chatInstance.destroy();
      this.chatInstance = null;
      this.initializeChat();
    }
  }

  static oauthCallBack?: (response: any) => any;
  static exchangeCallBack?: (response: any) => ExchangeResponse;

  static handleOAuthCallback() {
    LogService.log('🔍 [Mezon Chat] handleOAuthCallback called');
    if (typeof window === 'undefined') {
        LogService.log('❌ [Mezon Chat] Window is undefined');
        return;
    }

    LogService.log('📍 [Mezon Chat] Current URL:', window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    LogService.log('🧩 [Mezon Chat] Params detected:', { 
        code: code ? 'YES (***)' : 'NO', 
        state, 
        opener: !!window.opener,
        openerClosed: window.opener ? window.opener.closed : 'N/A'
    });

    if (code && window.opener) {
      LogService.log('✅ [Mezon Chat] OAuth Callback detected with Valid Opener!');

      let exchangeUrl = '';
      let baseUrl = window.location.origin;
      let exchangePath = 'api/auth/exchange';

      const element = document.querySelector('mezon-chat') as MezonChatElement;
      LogService.log('🔎 [Mezon Chat] Looking for <mezon-chat> element:', element);

      if (element) {
          LogService.log('⚙️ [Mezon Chat] Element config:', {
              'apiBaseUrl': element.apiBaseUrl,
              'apiExchangePath': element.apiExchangePath
          });
          
          if (element.apiBaseUrl) {
             baseUrl = element.apiBaseUrl;
          }

          if (element.apiExchangePath) {
             exchangePath = element.apiExchangePath;
          }
      } else {
          LogService.warn('⚠️ [Mezon Chat] <mezon-chat> element NOT found. Using default origin and path.');
      }

      exchangeUrl = baseUrl.replace(/\/+$/, '') + '/' + exchangePath.replace(/^\/+/, '');
      
      LogService.log('🔄 [Mezon Chat] Final Exchange URL:', exchangeUrl);

      LogService.log('🚀 [Mezon Chat] sending fetch request...');
      fetch(exchangeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state })
      })
        .then(res => {
          LogService.log('📥 [Mezon Chat] Exchange response status:', res.status, res.statusText);
          if (!res.ok) {
              return res.text().then(text => {
                  throw new Error(`Server responded with ${res.status}: ${text}`);
              });
          }
          return res.json();
        })
        .then(rawResponse => {
          LogService.log('📦 [Mezon Chat] Exchange data successfully parsed:', rawResponse);
          
          if (MezonChatElement.exchangeCallBack) {
              LogService.log('⚡ [Mezon Chat] Executing custom exchangeCallBack...');
          }

          const data = MezonChatElement.exchangeCallBack
            ? MezonChatElement.exchangeCallBack(rawResponse)
            : rawResponse;
          if (!data) {
            LogService.error('❌ [Mezon Chat] Data is null/undefined after processing');
            throw new Error('Invalid exchange response');
          }

          // Validate required fields
          const missingFields: string[] = [];
          if (!data.tokens) missingFields.push('tokens');
          if (data.tokens && !data.tokens.access_token) missingFields.push('tokens.access_token');
          if (!data.user) missingFields.push('user');
          if (data.user && !data.user.username) missingFields.push('user.username');
          // Add more checks as needed based on AuthAdapter.ts expectations

          if (missingFields.length > 0) {
            LogService.warn(`⚠️ [Mezon Chat] Missing fields in exchange response (or exchangeCallBack): ${missingFields.join(', ')}`);
            LogService.warn('   Expected format: { tokens: { access_token: "..." }, user: { ... } }');
          }

          LogService.log('📤 [Mezon Chat] Posting Message to Opener...');
          try {
            window.opener.postMessage({
                type: 'MEZON_LOGIN_SUCCESS',
                data
            }, '*');
            LogService.log('✅ [Mezon Chat] Message posted successfully');
          } catch (e) {
            LogService.error('❌ [Mezon Chat] Failed to post message:', e);
          }

          LogService.log('🚪 [Mezon Chat] Closing popup window...');
          window.close();
        })
        .catch(err => {
          LogService.error('❌ [Mezon Chat] Exchange Critical Error:', err);
          document.body.innerHTML = `
            <div style="padding: 20px; font-family: sans-serif; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">
                <h3>OAuth Error</h3>
                <p>${err.message}</p>
                <p>Check console for more details.</p>
            </div>
          `;
        });
    } else if (code) {
        LogService.warn('⚠️ [Mezon Chat] Code present but window.opener is missing/closed.');
    } else {
        LogService.log('ℹ️ [Mezon Chat] No OAuth code found in URL. Skipping callback logic.');
    }
  }
}

// Register custom element
if (typeof window !== 'undefined' && !customElements.get('mezon-chat')) {
  LogService.log('🛠️ [Mezon Chat] Registering custom element <mezon-chat>');
  customElements.define('mezon-chat', MezonChatElement);

  if (document.readyState === 'loading') {
    LogService.log('⏳ [Mezon Chat] Document loading. Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
      LogService.log('🔔 [Mezon Chat] DOMContentLoaded fired. Running handleOAuthCallback.');
      MezonChatElement.handleOAuthCallback();
    });
  } else {
    LogService.log('⚡ [Mezon Chat] Document already ready. Running handleOAuthCallback immediately.');
    MezonChatElement.handleOAuthCallback();
  }
}

export default MezonChatElement;
