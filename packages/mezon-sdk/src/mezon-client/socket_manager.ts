import { WebSocketAdapter } from "../web_socket_adapter";
import { Session } from "../session";
import { Socket } from "../interfaces";
import { DefaultSocket } from "../socket";
import { SessionManager } from "./session_manager";

export class SocketManager {
  [key: string]: any;
  private socket: Socket;

  constructor(
    private host: string,
    private port: string,
    private useSSL: boolean,
    private adapter: WebSocketAdapter,
    private sessionManager: SessionManager,
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
    this.isHardDisconnect = false;
    return session;
  }

  closeSocket() {
    this.isHardDisconnect = true;
    this.socket.close();
  }

  isOpen(): boolean {
    return this.socket.isOpen();
  }

  async retriesConnect(): Promise<void> {
    let retryInterval = 5000;
    const maxRetryInterval = 60000;
  
    console.log("Reconnecting...");
  
    while (true) {
      try {
        this.socket = this.createSocket();
        await this.connect(this.sessionManager.getSession()!);
        console.log("Connected successfully!");
        return;
      } catch (e) {
        console.log("Connection failed:", e);
        retryInterval = Math.min(retryInterval * 2, maxRetryInterval);
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);
  
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }
    }
  }
}
