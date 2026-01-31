import { LightClient } from 'mezon-light-sdk';
import { MezonLightChatConfig, OAuthTokens, UserInfo } from '../types';
import { MezonChatElement } from '..';
const defaultServerKey = 'HTTP3m3zonPr0dkey:';

export class OAuthHandler {
  private config: MezonLightChatConfig;
  private popup: Window | null = null;

  constructor(config: MezonLightChatConfig) {
    this.config = config;
    this.setupMessageListener();
  }

  private setupMessageListener(): void {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'MEZON_LOGIN_SUCCESS') {
        this.handleLoginSuccess(event.data.data);
      }
    });
  }

  public async login(): Promise<{ client: LightClient; user: UserInfo } | null> {
    return new Promise((resolve, reject) => {
      const oauthPath = this.config.apiOauthPath ?? 'api/auth/url';
      const full = this.config.apiBaseUrl.replace(/\/+$/, '') + '/' + oauthPath.replace(/^\/+/, ''); 
      const url = new URL(full).toString();

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const width = 500;
          const height = 600;
          const left = (window.screen.width / 2) - (width / 2);
          const top = (window.screen.height / 2) - (height / 2);

          this.popup = window.open(
            data.url,
            'MezonLogin',
            `width=${width},height=${height},top=${top},left=${left}`
          );

          (window as any).__mezonLoginResolve = resolve;
          (window as any).__mezonLoginReject = reject;
        })
        .catch(err => {
          console.error('Failed to get auth URL:', err);
          if (this.config.onError) {
            this.config.onError(err);
          }
          reject(err);
        });
    });
  }

  private async handleLoginSuccess(rawData: any): Promise<void> {
    try {
      const data = MezonChatElement.oauthCallBack
        ? MezonChatElement.oauthCallBack(rawData)
        : rawData;

      if (!data?.tokens || !data?.user) {
        throw new Error('Invalid OAuth response data');
      }

      const { tokens, user } = data;

      const client = await LightClient.authenticate({
        id_token: tokens.id_token || tokens.access_token,
        user_id: user.user_id,
        username: user.username || user.name || '',
        serverkey: defaultServerKey
      });

      if (this.config.onLogin) {
        this.config.onLogin(user);
      }

      const resolve = (window as any).__mezonLoginResolve;
      if (resolve) {
        resolve({ client, user });
        delete (window as any).__mezonLoginResolve;
        delete (window as any).__mezonLoginReject;
      }
    } catch (error) {
      console.error('Failed to initialize Mezon client:', error);
      if (this.config.onError) {
        this.config.onError(error as Error);
      }

      const reject = (window as any).__mezonLoginReject;
      if (reject) {
        reject(error);
        delete (window as any).__mezonLoginResolve;
        delete (window as any).__mezonLoginReject;
      }
    }
  }

  public logout(): void {
    if (this.config.onLogout) {
      this.config.onLogout();
    }
  }
}
