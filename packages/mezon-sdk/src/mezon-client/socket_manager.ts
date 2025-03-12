import { WebSocketAdapter } from "../web_socket_adapter";
import { Session } from "../session";
import { Socket } from "../interfaces";
import { DefaultSocket } from "../socket";
import { SessionManager } from "./session_manager";
import { MezonApi } from "../api";
import { Events } from "../constants";
import { ErrorEvent, CloseEvent } from "ws";
import { EventManager } from "./event_manager";

export class SocketManager {
  [key: string]: any;
  private socket: Socket;
  private isHardDisconnect: boolean | undefined;
  
  constructor(
    private host: string,
    private port: string,
    private useSSL: boolean,
    private adapter: WebSocketAdapter,
    private sessionManager: SessionManager,
    private apiClient: MezonApi,
    private apiKey: string,
    private eventManager: EventManager
  ) {
    this.socket = this.createSocket();
  }
  
  createSocket(): Socket {
    return new DefaultSocket(
      this.host,
      this.port,
      this.useSSL,
      false,
      this.adapter
    );
  }

  getSocket() {
    return this.socket;
  }

  async connect(sockSession: Session) {
    this.socket = this.createSocket();
    const session = await this.socket.connect(sockSession, true);
    this.isHardDisconnect = false
    return session;
  }

  closeSocket() {
    this.isHardDisconnect = true;
    this.socket.close();
  }

  isOpen(): boolean {
    return this.socket.isOpen();
  }

  async onerror(evt: ErrorEvent) {
    console.log(evt);
    if (this.socket.isOpen()) {
      await this.retriesConnect();
    }
  }

  onheartbeattimeout() {
    console.log("Heartbeat timeout.");
  }

  ondisconnect(e: CloseEvent) {
    console.log("Disconnected!", e?.reason);
    if (this.isHardDisconnect) return
    this.retriesConnect();
  }

  async connectSocket(sessionToken: string) {
    const clans = await this.apiClient.listClanDescs(sessionToken);
    clans.clandesc?.forEach(async (clan) => {
      await this.socket.joinClanChat(clan.clan_id || "");
    });

    // join direct message
    await this.socket.joinClanChat("0");
    ["ondisconnect", "onerror", "onheartbeattimeout"].forEach((event) => {
      this.socket[event] = (this[event as keyof this] as Function).bind(this);
    });

    for (const event in Events) {
      const key = Events[event as keyof typeof Events].toString();
      this.socket.socketEvents.on(key, (...args: any[]) => {
        this.eventManager.emit(key, ...args);
      });
    }
  }

  async retriesConnect(): Promise<void> {
    let retryInterval = 5000;
    const maxRetryInterval = 60000;

    console.log("Reconnecting...");

    const interval = setInterval(async () => {
      try {
        const sockSession = await this.sessionManager.authenticate(this.apiKey);
        const sessionConnected = await this.connect(sockSession);
        if (sessionConnected?.token) {
          await this.connectSocket(sessionConnected.token);
        }
        console.log("Connected successfully!");
        clearInterval(interval);
      } catch (e) {
        console.log("Connection failed:", e);
        retryInterval = Math.min(retryInterval * 2, maxRetryInterval);
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);
        clearInterval(interval);
        setTimeout(() => this.retriesConnect(), retryInterval);
      }
    }, retryInterval);
  }
}
