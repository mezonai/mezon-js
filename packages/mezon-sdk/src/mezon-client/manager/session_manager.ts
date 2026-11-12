import { MezonApi } from "../../api";
import { Session } from "../../session";

export class SessionManager {
  private session: Session | undefined;

  constructor(private apiClient: MezonApi, session?: Session) {
    this.session = session;
  }

  async authenticate(botId: string, apiKey: string): Promise<Session> {
    try {
      const apiSession = await this.apiClient.mezonAuthenticate(apiKey, "", {
        account: {
          appid: botId,
          token: apiKey,
        },
      });
      this.session = new Session(apiSession);
      return this.session;
    } catch (error) {
      this.session = undefined;
      throw new Error(`Authenticate failed: ${error}`);
    }
  }

  async reAuthenticate(botId: string, apiKey: string): Promise<Session> {
    try {
      const apiSession = await this.apiClient.mezonAuthenticate(apiKey, "", {
        account: {
          appid: botId,
          token: apiKey,
        },
      });
      if (this.session) {
        this.session.update(
          apiSession.token!,
          apiSession.refresh_token || "",
        );
        if (apiSession.api_url) this.session.api_url = apiSession.api_url;
        if (apiSession.ws_url) this.session.ws_url = apiSession.ws_url;
        if (apiSession.tcp_url) this.session.tcp_url = apiSession.tcp_url;
        if (apiSession.id_token) this.session.id_token = apiSession.id_token;
        return this.session;
      }
      this.session = new Session(apiSession);
      return this.session;
    } catch (error) {
      throw new Error(`Re-authenticate failed: ${error}`);
    }
  }

  setSession(session: Session): void {
    this.session = session;
  }

  getSession(): Session | undefined {
    return this.session;
  }
}
