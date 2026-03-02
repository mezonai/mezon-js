import { ApiMessageAttachment } from "./api.gen";

/**
 * Configuration for initializing a LightClient from existing tokens.
 */
export interface ClientInitConfig {
  /** Authentication token */
  token: string;
  /** Refresh token for session renewal */
  refresh_token: string;
  /** API URL for the Mezon server */
  api_url: string;
  /** WebSocket host for session connectivity */
  ws_url: string;
  /** User ID associated with the session */
  user_id: string;
  /** Server key for authentication (optional, uses default if not provided) */
  serverkey?: string;
}

/**
 * Configuration for authenticating a new user.
 */
export interface AuthenticateConfig {
  /** ID token from identity provider */
  id_token: string;
  /** User ID to associate with the account */
  user_id: string;
  /** Username for the account */
  username: string;
  /** Server key for authentication (optional, uses default if not provided) */
  serverkey?: string;
  /** Custom gateway URL (optional, uses default if not provided) */
  gateway_url?: string;
}

/**
 * Options for sending a message.
 */
export interface SendMessagePayload {
  /** The channel ID to send the message to */
  channelId: string;
  /** Message content */
  content: unknown;
  /** File/media attachments (optional) */
  attachments?: ApiMessageAttachment[];
  /** Whether to hide link previews (optional) */
  hideLink?: boolean;
   /** Message code (optional) */
  code?: number;
}
