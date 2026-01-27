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

  getSession(): Session | undefined {
    return this.session;
  }
}
