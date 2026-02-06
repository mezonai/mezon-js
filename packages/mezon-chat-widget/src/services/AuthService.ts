/**
 * Auth Service
 * Handles OAuth authentication flow and SDK client management
 */

import { LightClient } from 'mezon-light-sdk';
import type {
   AuthResult,
   AuthState,
   IAuthService,
   ISessionService,
   Unsubscribe,
   UserInfo,
} from './interfaces';

const DEFAULT_SERVER_KEY = 'HTTP3m3zonPr0dkey:';

type AuthStateHandler = (state: AuthState, user?: UserInfo) => void;

export interface AuthServiceConfig {
   apiBaseUrl: string;
   apiOauthPath?: string;
   apiExchangePath?: string;
   sessionService: ISessionService;
   exchangeCallback?: (response: unknown) => unknown;
   oauthCallback?: (response: unknown) => unknown;
}

export class AuthService implements IAuthService {
   private config: AuthServiceConfig;
   private client: LightClient | null = null;
   private user: UserInfo | null = null;
   private authState: AuthState = 'unauthenticated';
   private stateHandlers: Set<AuthStateHandler> = new Set();

   constructor(config: AuthServiceConfig) {
      this.config = config;
   }

   async login(): Promise<AuthResult> {
      this.setAuthState('loading');

      try {
         const result = await this.openOAuthPopup();
         this.client = result.client;
         this.user = result.user;
         this.setAuthState('authenticated', result.user);

         const session = this.client.getSession();
         this.config.sessionService.save({
            token: session.token,
            refresh_token: session.refresh_token,
            api_url: (session as any).api_url || '',
            user_id: result.user.user_id,
            username: result.user.username,
            name: result.user.name,
         });

         return result;
      } catch (error) {
         this.setAuthState('unauthenticated');
         throw error;
      }
   }

   logout(): void {
      this.client = null;
      this.user = null;
      this.config.sessionService.clear();
      this.setAuthState('unauthenticated');
   }

   isAuthenticated(): boolean {
      return this.authState === 'authenticated' && this.client !== null;
   }

   getClient(): LightClient | null {
      return this.client;
   }

   onAuthStateChange(callback: AuthStateHandler): Unsubscribe {
      this.stateHandlers.add(callback);
      callback(this.authState, this.user || undefined);
      return () => {
         this.stateHandlers.delete(callback);
      };
   }

   /**
    * Attempts to restore session from storage
    */
   async restoreSession(): Promise<AuthResult | null> {
      const sessionData = this.config.sessionService.restore();
      if (!sessionData) {
         return null;
      }

      try {
         this.setAuthState('loading');

         const client = LightClient.initClient({
            token: sessionData.token,
            refresh_token: sessionData.refresh_token,
            api_url: sessionData.api_url,
            user_id: sessionData.user_id,
            serverkey: DEFAULT_SERVER_KEY,
         });

         if (client.isSessionExpired()) {
            if (client.isRefreshSessionExpired()) {
               throw new Error('Session fully expired');
            }
            await client.refreshSession();

            const session = client.getSession();
            this.config.sessionService.save({
               ...sessionData,
               token: session.token,
               refresh_token: session.refresh_token,
            });
         }

         const user: UserInfo = {
            user_id: sessionData.user_id,
            username: sessionData.username || '',
            name: sessionData.name,
         };

         this.client = client;
         this.user = user;
         this.setAuthState('authenticated', user);

         return { client, user };
      } catch (error) {
         console.error('[AuthService] Session restore failed:', error);
         this.config.sessionService.clear();
         this.setAuthState('unauthenticated');
         return null;
      }
   }

   private setAuthState(state: AuthState, user?: UserInfo): void {
      this.authState = state;
      this.stateHandlers.forEach((handler) => {
         try {
            handler(state, user);
         } catch (err) {
            console.error('[AuthService] State handler error:', err);
         }
      });
   }

   private async openOAuthPopup(): Promise<AuthResult> {
      return new Promise((resolve, reject) => {
         this.getAuthUrl()
            .then((authUrl) => {
               const width = 500;
               const height = 600;
               const left = window.screen.width / 2 - width / 2;
               const top = window.screen.height / 2 - height / 2;

               const popup = window.open(
                  authUrl,
                  'MezonLogin',
                  `width=${width},height=${height},top=${top},left=${left}`,
               );

               if (!popup) {
                  reject(new Error('Failed to open login popup'));
                  return;
               }

               const handleMessage = async (event: MessageEvent) => {
                  if (event.data?.type !== 'MEZON_LOGIN_SUCCESS') return;

                  window.removeEventListener('message', handleMessage);

                  try {
                     const rawData = event.data.data;
                     const data = this.config.oauthCallback
                        ? (this.config.oauthCallback(rawData) as any)
                        : rawData;

                     if (!data?.tokens || !data?.user) {
                        throw new Error('Invalid OAuth response');
                     }

                     const client = await LightClient.authenticate({
                        id_token:
                           data.tokens.id_token || data.tokens.access_token,
                        user_id: data.user.user_id,
                        username: data.user.username || data.user.name || '',
                        serverkey: DEFAULT_SERVER_KEY,
                     });

                     resolve({ client, user: data.user });
                  } catch (error) {
                     reject(error);
                  }
               };

               window.addEventListener('message', handleMessage);
            })
            .catch(reject);
      });
   }

   private async getAuthUrl(): Promise<string> {
      const oauthPath = this.config.apiOauthPath || 'api/auth/url';
      const url = `${this.config.apiBaseUrl.replace(
         /\/+$/,
         '',
      )}/${oauthPath.replace(/^\/+/, '')}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.url) {
         throw new Error('Invalid auth URL response');
      }

      return data.url;
   }
}
