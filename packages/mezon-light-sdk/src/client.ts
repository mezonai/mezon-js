import { Session } from "./session";
import { ApiAuthenticationIdToken, ApiSession, MezonApi, ApiUploadAttachment, ApiUploadAttachmentRequest } from "./api.gen";
import { MEZON_GW_URL, DEFAULT_SERVER_KEY, CHANNEL_TYPE_DM, CHANNEL_TYPE_GROUP } from "./constants";
import { ClientInitConfig, AuthenticateConfig } from "./types";
import { ApiChannelDescription } from "./api.gen";
import { WebSocketAdapter, WebSocketAdapterPb } from "./web_socket_adapter_pb";
import { DefaultSocket, Socket } from "./socket.gen";

/**
 * Error thrown when authentication fails.
 */
export class AuthenticationError extends Error {
  constructor(message?: string, public readonly statusCode?: number) {
    super(message ?? "Authentication failed.");
    this.name = "AuthenticationError";
  }
}

/**
 * Error thrown when session-related operations fail.
 */
export class SessionError extends Error {
  constructor(message?: string) {
    super(message ?? "Session error.");
    this.name = "SessionError";
  }
}

/**
 * Parses a URL and extracts client connection parameters.
 */
function parseBaseUrl(apiUrl: string): string {
  const url = new URL(apiUrl);
  const scheme = url.protocol === "https:" ? "https://" : "http://";
  return `${scheme}${url.hostname}:${url.port}`;
}

/**
 * LightClient provides a simplified interface for Mezon authentication and channel management.
 *
 * @example
 * ```typescript
 * // Initialize from existing tokens
 * const client = LightClient.initClient({
 *   token: 'your-token',
 *   refresh_token: 'your-refresh-token',
 *   api_url: 'https://api.mezon.ai',
 *   user_id: 'user-123'
 * });
 *
 * // Or authenticate with ID token
 * const client = await LightClient.authenticate({
 *   id_token: 'id-token-from-provider',
 *   user_id: 'user-123',
 *   username: 'johndoe'
 * });
 * ```
 */
export class LightClient {
  private readonly _session: Session;
  private readonly _client: MezonApi;
  private readonly _userId: string;

  /** Promise that resolves when the refresh token operation completes */
  private refreshTokenPromise: Promise<Session> | null = null;

  private constructor(session: Session, client: MezonApi, userId: string) {
    this._session = session;
    this._client = client;
    this._userId = userId;
  }

  /**
   * Gets the current user ID.
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * Gets the underlying Mezon session.
   */
  get session(): Session {
    return this._session;
  }

  /**
   * Gets the underlying Mezon client.
   */
  get client(): MezonApi {
    return this._client;
  }

  /**
   * Initializes a LightClient from existing session tokens.
   * Use this when you have stored tokens from a previous authentication.
   *
   * @param config - Configuration containing tokens and connection details
   * @returns A new LightClient instance
   * @throws {SessionError} If required fields are missing
   */
  static initClient(config: ClientInitConfig): LightClient {
    const { token, refresh_token, api_url, user_id, serverkey } = config;

    if (!token || !refresh_token || !api_url || !user_id) {
      throw new SessionError("Missing required fields: token, refresh_token, api_url, and user_id are all required");
    }

    const session = Session.restore(token, refresh_token, api_url, true);
    const client = new MezonApi(serverkey || DEFAULT_SERVER_KEY, 7000, parseBaseUrl(api_url));

    return new LightClient(session, client, user_id);
  }

  /**
   * Authenticates a user with an ID token from an identity provider.
   *
   * @param config - Authentication configuration
   * @returns A promise that resolves to a new LightClient instance
   * @throws {AuthenticationError} If authentication fails or response is invalid
   */
  static async authenticate(config: AuthenticateConfig): Promise<LightClient> {
    const { id_token, user_id, username, serverkey = DEFAULT_SERVER_KEY, gateway_url = MEZON_GW_URL } = config;
    const client = new MezonApi(serverkey || DEFAULT_SERVER_KEY, 7000, parseBaseUrl(gateway_url));

    const body: ApiAuthenticationIdToken = {
      id_token,
      user_id,
      username,
    };
    const response = await client.authenticateIdToken(serverkey, "", body);
    if (!response) {
      throw new AuthenticationError("Authentication failed: No response from server.");
    }

    if (!response.token || !response.refresh_token || !response.api_url || !response.user_id) {
      throw new AuthenticationError("Invalid authentication response: missing required fields");
    }

    const session = Session.restore(response.token, response.refresh_token, response.api_url, true);
    client.setBasePath(parseBaseUrl(response.api_url));

    return new LightClient(session, client, response.user_id);
  }

  /**
   * Creates a direct message channel with a single user.
   *
   * @param peerId - The user ID to create a DM channel with
   * @returns A promise that resolves to the created channel descriptor
   */
  async createDM(peerId: string): Promise<ApiChannelDescription> {
    const request: ApiChannelDescription = {
      type: CHANNEL_TYPE_DM,
      channel_private: 1,
      user_ids: [peerId],
    };
    return this._client.createChannelDesc(this._session.token, request);
  }

  /**
   * Creates a group direct message channel with multiple users.
   *
   * @param userIds - Array of user IDs to include in the group DM
   * @returns A promise that resolves to the created channel descriptor
   */
  async createGroupDM(userIds: string[]): Promise<ApiChannelDescription> {
    if (userIds.length === 0) {
      throw new Error("At least one user ID is required for a group DM");
    }

    const request: ApiChannelDescription = {
      type: CHANNEL_TYPE_GROUP,
      channel_private: 1,
      user_ids: userIds,
    };
    return this._client.createChannelDesc(this._session.token, request);
  }

  /**
   * Uploads an attachment file to Mezon server.
   * Returns the URL of the uploaded file which can be used in messages.
   *
   * @param request - Upload request containing file metadata (filename, filetype, size, width, height)
   * @returns A promise that resolves to the upload result with file URL
   *
   * @example
   * ```typescript
   * const result = await client.uploadAttachment({
   *   filename: 'image.png',
   *   filetype: 'image/png',
   *   size: 1024,
   *   width: 800,
   *   height: 600
   * });
   * console.log('Uploaded file URL:', result.url);
   * ```
   */
  async uploadAttachment(request: ApiUploadAttachmentRequest): Promise<ApiUploadAttachment> {
    return this._client.uploadAttachmentFile(this._session.token, request);
  }

  /**
   * Refreshes the current session using the refresh token.
   * Call this before the session expires to maintain connectivity.
   *
   * @returns A promise that resolves when the session is refreshed
   */
  async refreshSession(): Promise<Session> {
    if (!this._session) {
      console.error("Cannot refresh a null session.");
      return this._session;
    }

    if (this._session.created && this._session.expires_at! - this._session.created_at < 70) {
      console.warn(
        "Session lifetime too short, please set '--session.token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session",
      );
    }

    if (this._session.created && this._session.refresh_expires_at! - this._session.created_at < 3700) {
      console.warn(
        "Session refresh lifetime too short, please set '--session.refresh_token_expiry_sec' option. See the documentation for more info: https://mezon.vn/docs/mezon/getting-started/configuration/#session",
      );
    }

    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = new Promise<Session>(async (resolve, reject) => {
      try {
        const apiSession = await this.client.sessionRefresh(this._client.serverKey || DEFAULT_SERVER_KEY, "", {
          token: this._session.refresh_token,
          vars: this._session.vars,
          is_remember: this._session.is_remember,
        });
        this._session.update(apiSession.token!, apiSession.refresh_token!, apiSession.is_remember || false);
        this.onRefreshSession(apiSession);
        resolve(this._session);
      } catch (error) {
        console.error("Session refresh failed:", error);
        reject(error);
      } finally {
        this.refreshTokenPromise = null;
      }
    });

    return this.refreshTokenPromise;
  }

  /** A socket created with the client's configuration. */
  createSocket(
    verbose: boolean = false,
    adapter: WebSocketAdapter = new WebSocketAdapterPb(),
    sendTimeoutMs: number = DefaultSocket.DefaultSendTimeoutMs,
  ): Socket {
    const url = new URL(this._client.basePath);
    const { host, port, useSSL } = {
      host: url.hostname,
      port: url.port || (url.protocol === "https:" ? "443" : "80"),
      useSSL: url.protocol === "https:",
    };
    return new DefaultSocket(host, port, useSSL, verbose, adapter, sendTimeoutMs);
  }

  /**
   * Called when a token refresh is initiated.
   * This is a placeholder method that subclasses or instances can override
   * to perform actions before or after the refresh logic.
   */
  onRefreshSession(session: ApiSession): void {
    console.log(`Token refresh occurred. Token: ${session.token}`);
  }

  /**
   * Checks if the current session token has expired.
   *
   * @returns True if the session is expired, false otherwise
   */
  isSessionExpired(): boolean {
    return this._session.isexpired(Date.now() / 1000);
  }

  /**
   * Checks if the refresh token has expired.
   * If this returns true, the user needs to re-authenticate.
   *
   * @returns True if the refresh token is expired, false otherwise
   */
  isRefreshSessionExpired(): boolean {
    return this._session.isrefreshexpired(Date.now() / 1000);
  }

  /**
   * Gets the authentication token for external use.
   */
  getToken(): string {
    return this._session.token;
  }

  /**
   * Gets the refresh token for storage.
   */
  getRefreshToken(): string {
    return this._session.refresh_token;
  }

  /**
   * Exports session data for storage and later restoration.
   *
   * @returns Object containing all data needed to restore the session
   */
  exportSession(): ClientInitConfig {
    return {
      token: this._session.token,
      refresh_token: this._session.refresh_token,
      api_url: (this._session as any).api_url || "",
      user_id: this._userId,
    };
  }
}
