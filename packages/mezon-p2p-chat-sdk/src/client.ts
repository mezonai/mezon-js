import { Session, Client, ChannelType } from 'mezon-js';
import {MEZON_API_URL, MEZON_GW_URL } from './constants';
import * as base64 from "js-base64"
export class P2PClient {
  private session: Session;
  private client: Client;
  public user_id: string;

  private constructor(session: Session, client: Client, user_id: string) {
    this.session = session;
    this.client = client;
    this.user_id = user_id;
  }

  static async authenticate({ id_token, user_id, username, serverkey }: { id_token: string, user_id: string, username: string, serverkey: string }): Promise<P2PClient> {
    const res = await fetch(MEZON_GW_URL + '/v2/account/authenticate/idtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(serverkey ||'DefaultServerKey')
      },
      body: JSON.stringify({ id_token, user_id, username })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Error during authentication request');
    }
    const data = await res.json();
    if (data && data.token && data.refresh_token && data.api_url && data.user_id) {
      const session = Session.restore(
        data.token,
        data.refresh_token,
        data.api_url,
        data.api_url.startsWith('https://')
      );
      const url = new URL(data.api_url);
      const client = new Client(
        serverkey || 'DefaultServerKey',
        url.hostname,
        url.port || '',
        url.protocol === 'https:'
      );
      return new P2PClient(session, client, data.user_id);
    } else {
      throw new Error('Error during authentication or missing data fields!');
    }
  }

  async createDM(peer_id: string) {
    const req = { type: ChannelType.CHANNEL_TYPE_DM, channel_private: 1, user_ids: [peer_id] };
    const channel = await this.client.createChannelDesc(this.session, req);
    return channel;
  }

  async refreshSession(refresh_token: string, serverkey?: string): Promise<void> {
    const res = await fetch(MEZON_API_URL + '/v2/account/session/refresh?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(serverkey || 'DefaultServerKey'),
        'accept': 'application/json',
      },
      body: JSON.stringify({
        token: refresh_token,
        is_remember: false,
        vars: {}
      })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Error during session refresh');
    }
    const data = await res.json();
    if (data && data.token && data.refresh_token) {
      this.session = Session.restore(
        data.token,
        data.refresh_token,
        MEZON_API_URL,
        MEZON_API_URL.startsWith('https://')
      );
    } else {
      throw new Error('Error during session refresh or missing data fields!');
    }
  }

  getSession(): Session {
    return this.session;
  }

  getClient(): Client {
    return this.client;
  }
}