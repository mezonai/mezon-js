import { ApiSession, MezonApi } from "../../api";
import { Session } from "../../session";

export class SessionManager {
  private session: Session | undefined;

  constructor(private apiClient: MezonApi, session?: Session) {
    this.session = session;
  }

  async authenticate(botId: string, apiKey: string) {
    return this.apiClient
      .authenticateMezon(apiKey, "", { token: botId, }, false)
      .then((session: ApiSession) => {
        this.session = new Session(session);
        return this.session;
      });
  }

  async logout() {
    if (!this.session) return false;

    const request = {
      token: this.session.token,
      refresh_token: this.session.refresh_token,
    };

    return this.apiClient.sessionLogout(this.session.token, request).then((response) => {
      return response !== undefined;
    });
  }

  getSession(): Session | undefined {
    return this.session;
  }
}
