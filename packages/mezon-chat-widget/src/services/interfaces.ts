/**
 * Service Interfaces for mezon-chat-widget
 * Defines contracts for dependency injection and testability
 */

import type { LightClient } from 'mezon-light-sdk';

// ============================================
// Core Types
// ============================================

export interface UserInfo {
  user_id: string;
  username: string;
  name?: string;
  avatar?: string;
}

export interface SessionData {
  token: string;
  refresh_token: string;
  api_url: string;
  user_id: string;
  username?: string;
  name?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'peer';
  timestamp: number;
  sender_id?: string;
}

export interface AuthResult {
  client: LightClient;
  user: UserInfo;
}

export type AuthState = 'authenticated' | 'unauthenticated' | 'loading';
export type Unsubscribe = () => void;

// ============================================
// Service Interfaces
// ============================================

/**
 * Authentication service interface
 */
export interface IAuthService {
  /**
   * Initiates OAuth login flow
   */
  login(): Promise<AuthResult>;

  /**
   * Logs out and clears session
   */
  logout(): void;

  /**
   * Checks if user is currently authenticated
   */
  isAuthenticated(): boolean;

  /**
   * Gets the current LightClient if authenticated
   */
  getClient(): LightClient | null;

  /**
   * Subscribe to authentication state changes
   */
  onAuthStateChange(callback: (state: AuthState, user?: UserInfo) => void): Unsubscribe;
}

/**
 * Chat messaging service interface
 */
export interface IChatService {
  /**
   * Connects to the real-time messaging socket
   */
  connect(): Promise<void>;

  /**
   * Disconnects from the socket
   */
  disconnect(): void;

  /**
   * Checks if socket is connected
   */
  isConnected(): boolean;

  /**
   * Starts a DM conversation with a peer
   */
  startDM(peerId: string): Promise<string>;

  /**
   * Sends a message to the current channel
   */
  sendMessage(content: string, attachments?: unknown[]): Promise<void>;

  /**
   * Gets the current active channel ID
   */
  getCurrentChannelId(): string | null;

  /**
   * Subscribe to incoming messages
   */
  onMessage(callback: (msg: ChatMessage) => void): Unsubscribe;

  /**
   * Subscribe to errors
   */
  onError(callback: (error: Error) => void): Unsubscribe;
}

/**
 * Session persistence service interface
 */
export interface ISessionService {
  /**
   * Saves session data to storage
   */
  save(session: SessionData): void;

  /**
   * Restores session data from storage
   */
  restore(): SessionData | null;

  /**
   * Clears stored session
   */
  clear(): void;

  /**
   * Checks if a valid session exists
   */
  hasSession(): boolean;
}

// ============================================
// Adapter Interfaces
// ============================================

/**
 * SDK adapter interface - wraps mezon-light-sdk
 */
export interface ISDKAdapter {
  /**
   * Authenticates with the SDK
   */
  authenticate(idToken: string, userId: string, username: string): Promise<LightClient>;

  /**
   * Initializes client from existing session
   */
  initFromSession(session: SessionData): LightClient;

  /**
   * Refreshes an expired session
   */
  refreshSession(client: LightClient): Promise<void>;

  /**
   * Checks if session is expired
   */
  isSessionExpired(client: LightClient): boolean;

  /**
   * Checks if refresh token is expired
   */
  isRefreshExpired(client: LightClient): boolean;
}


