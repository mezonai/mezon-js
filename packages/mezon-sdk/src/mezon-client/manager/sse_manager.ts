import { EventEmitter } from "events";
import { SSEConfig, SSEMessage } from "../../interfaces";
import { SSEEvents, SSEConnectionState } from "../../constants";

// Type declaration for EventSource (browser API / eventsource package)
interface EventSourceLike {
  readyState: number;
  close(): void;
  onopen: ((event: Event) => void) | null;
  onmessage: ((event: MessageEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  addEventListener(type: string, listener: (event: MessageEvent) => void): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const EventSource: any;

export class EventSourceManager extends EventEmitter {
  private eventSource: EventSourceLike | null = null;
  private config: Required<SSEConfig>;
  private reconnectAttempts = 0;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private isManualClose = false;
  private currentPath: string | undefined;
  private currentQueryParams: Record<string, string | number> | undefined;

  constructor(config: SSEConfig) {
    super();
    this.config = {
      url: config.url,
      appId: config.appId,
      token: config.token ?? "",
      autoReconnect: config.autoReconnect ?? true,
      reconnectDelay: config.reconnectDelay ?? 3000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 0, // 0 = unlimited
      headers: config.headers ?? {},
    };

    if (!this.config.appId) throw new Error("appId is required");
    if (!this.config.token) throw new Error("token is required");
  }

  /**
   * Get the current connection state
   */
  get state(): SSEConnectionState {
    if (!this.eventSource) {
      return SSEConnectionState.CLOSED;
    }
    return this.eventSource.readyState as SSEConnectionState;
  }

  /**
   * Check if the connection is open
   */
  get isConnected(): boolean {
    return this.state === SSEConnectionState.OPEN;
  }

  /**
   * Connect to the SSE endpoint
   * @param path Optional path to append to the base URL
   * @param queryParams Optional query parameters to add to the URL
   */
  connect(path?: string, queryParams?: Record<string, string | number>): void {
    if (this.eventSource) {
      this.close();
    }

    this.isManualClose = false;
    this.reconnectAttempts = 0;
    this.currentPath = path;
    this.currentQueryParams = queryParams;

    const url = this.buildUrl(path, queryParams);
    this.createEventSource(url);
  }

  /**
   * Close the SSE connection
   */
  close(): void {
    this.isManualClose = true;
    this.clearReconnectTimeout();

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.emit(SSEEvents.Close);
    }
  }

  /**
   * Subscribe to a specific SSE event type
   * @param eventType The event type to listen for
   * @param callback Callback function for the event
   */
  subscribe(eventType: string, callback: (message: SSEMessage) => void): void {
    if (!this.eventSource) {
      throw new Error("EventSource not connected. Call connect() first.");
    }

    this.eventSource.addEventListener(eventType, (event: MessageEvent) => {
      const message = this.parseEvent(event, eventType);
      callback(message);
    });
  }

  private buildUrl(path?: string, queryParams?: Record<string, string | number>): string {
    let url = this.config.url;

    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    if (path) {
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      url = `${url}/${cleanPath}`;
    }

    if (this.config.appId) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}appid=${encodeURIComponent(this.config.appId)}`;
    }

    if (this.config.token) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}token=${encodeURIComponent(this.config.token)}`;
    }

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        const separator = url.includes("?") ? "&" : "?";
        url = `${url}${separator}${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      }
    }

    return url;
  }

  private createEventSource(url: string): void {
    try {
      // Check if we're in a Node.js environment
      if (typeof EventSource === "undefined") {
        // Try to use eventsource package for Node.js
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const EventSourcePolyfill = require("eventsource");
          this.eventSource = new EventSourcePolyfill(url, {
            headers: this.config.headers || {},
          });
        } catch {
          throw new Error(
            "EventSource is not available. Install 'eventsource' package for Node.js support: npm install eventsource",
          );
        }
      } else {
        // Browser environment
        this.eventSource = new EventSource(url);
      }

      this.setupEventHandlers();
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  private setupEventHandlers(): void {
    if (!this.eventSource) return;

    this.eventSource.onopen = () => {
      const wasReconnecting = this.reconnectAttempts > 0;
      this.reconnectAttempts = 0;
      if (wasReconnecting) {
        this.emit(SSEEvents.Reconnected);
      }
      this.emit(SSEEvents.Open);
    };

    this.eventSource.onmessage = (event: MessageEvent) => {
      const message = this.parseEvent(event);
      this.emit(SSEEvents.Message, message);
    };

    this.eventSource.onerror = (error: Event) => {
      this.handleError(error);
    };
  }

  private parseEvent(event: MessageEvent, eventType?: string): SSEMessage {
    return {
      id: event.lastEventId || undefined,
      event: eventType,
      data: event.data,
      timestamp: Date.now(),
    };
  }

  private handleError(error: Error | Event): void {
    const errorMessage = error instanceof Error ? error.message : "SSE connection error";

    this.emit(SSEEvents.Error, {
      message: errorMessage,
      error,
      timestamp: Date.now(),
    });

    // Check if we should reconnect
    if (this.shouldReconnect()) {
      this.scheduleReconnect();
    } else if (!this.isManualClose) {
      this.close();
    }
  }

  private shouldReconnect(): boolean {
    if (this.isManualClose) return false;
    if (!this.config.autoReconnect) return false;
    if (this.config.maxReconnectAttempts > 0 && this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      return false;
    }
    return true;
  }

  private scheduleReconnect(): void {
    this.clearReconnectTimeout();

    const delay = this.calculateReconnectDelay();
    this.reconnectAttempts++;

    this.emit(SSEEvents.Reconnecting, {
      attempt: this.reconnectAttempts,
      maxAttempts: this.config.maxReconnectAttempts,
      delay,
    });

    this.reconnectTimeout = setTimeout(() => {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }

      const url = this.buildUrl(this.currentPath, this.currentQueryParams);
      this.createEventSource(url);
    }, delay);
  }

  private calculateReconnectDelay(): number {
    const baseDelay = this.config.reconnectDelay || 3000;
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, this.reconnectAttempts), 30000);
    return exponentialDelay + Math.random() * 1000;
  }

  private clearReconnectTimeout(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}
