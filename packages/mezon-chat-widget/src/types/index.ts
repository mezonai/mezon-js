export interface MezonLightChatConfig {
  apiBaseUrl: string;
  apiOauthPath?: string;
  apiExchangePath?: string;
  peerId: string; 
  saveSession?: boolean; 
  autoOpen?: boolean; 
  theme?: MezonTheme;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  customClass?: string;
  welcomeMessage?: string;
  iconChat?: string
  iconHeader?: string;
  
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
  type?: string;
  attachments?: {
    filename: string;
    url: string;
    filetype: string;
    size: number;
    width?: number;
    height?: number;
  }[];
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

export interface ExchangeResponse {
  tokens: OAuthTokens;
  user: UserInfo;
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