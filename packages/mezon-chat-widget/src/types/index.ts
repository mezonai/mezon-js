// Type definitions for Mezon Light Chat Widget

export interface MezonLightChatConfig {
  // OAuth configuration - only base URL needed
  apiBaseUrl: string;

  apiOauthPath?: string;

  apiExchangePath?: string;
  
  // Chat configuration
  peerId?: string; // Peer user ID to chat with
  
  // Session management
  saveSession?: boolean; // Save session to sessionStorage
  
  // Auto features
  autoOpen?: boolean; // Auto-open chat after DM start
  
  // UI customization
  theme?: MezonTheme;
  
  // Widget position
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  
  // Custom CSS classes
  customClass?: string;
  
  // Welcome message
  welcomeMessage?: string;

  iconChat?: string

  iconHeader?: string;
  
  // Callbacks
  onReady?: () => void;
  onLogin?: (user: any) => void;
  onLogout?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: Error) => void;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface UserInfo {
  user_id: string;
  username: string;
  name?: string;
  avatar?: string;
}

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
}

export interface MezonTheme {
  name: string;
  tokens: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    fontFamily?: string;
    hoverColor?: string;
  };
}

export type OAuthExchangeHandler = (params: {
  code: string;
  state?: string;
}) => Promise<{
  tokens: OAuthTokens;
  user: UserInfo;
}>;

export type OAuthCallbackHandler = (params: {
  code: string;
  state?: string;
  exchange: OAuthExchangeHandler;
}) => Promise<void>;