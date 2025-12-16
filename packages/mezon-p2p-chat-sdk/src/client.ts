import { Session, Client, ChannelType } from 'mezon-js';
import {MEZON_AUTH_ENDPOINT } from './constants';
import * as base64 from "js-base64"
export class P2PClient {
  private session: any;
  private client: any;
  public user_id: string;

  private constructor(session: any, client: any, user_id: string) {
    this.session = session;
    this.client = client;
    this.user_id = user_id;
  }

  static async authenticate({ id_token, user_id, username, serverkey }: { id_token: string, user_id: string, username: string, serverkey: string }): Promise<P2PClient> {
    const res = await fetch(MEZON_AUTH_ENDPOINT, {
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

  getSession() {
    return this.session;
  }

  getClient() {
    return this.client;
  }
}
