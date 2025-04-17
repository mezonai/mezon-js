
import { MezonApi } from "../../api";
import { ApiSession } from "../../interfaces";
import { Session } from "../../session";

export class SessionManager {
  private session: Session | undefined;

  constructor(private apiClient: MezonApi) {}

  async authenticate(apiKey: string) {
    return this.apiClient.mezonAuthenticate(apiKey, "", {
      account: {
        token: apiKey,
      }
    }).then(async (apiSession: ApiSession) => {
      this.session = new Session(apiSession);
      return this.session;
    });
  }

  async logout() {
    if (!this.session) return false;

    const request = {
      token: this.session.token,
      refresh_token: this.session.refresh_token
    };

    return this.apiClient.mezonAuthenticateLogout(this.session.token, request).then((response) => {
      return response !== undefined;
    });
  }

  getSession(): Session | undefined {
    return this.session;
  }
}