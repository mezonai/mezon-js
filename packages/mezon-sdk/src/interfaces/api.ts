/**  */
export interface ApiClanDescList {
    //A list of channel.
    clandesc?: Array<ApiClanDesc>;
  }
  
  /**  */
  export interface ApiClanDesc {
    //
    banner?: string;
    //
    clan_id?: string;
    //
    clan_name?: string;
    //
    creator_id?: string;
    //
    logo?: string;
    //
    status?: number;
    //
    badge_count?: number;
    // is onboarding.
    is_onboarding?: boolean;
    // welcome channel id.
    welcome_channel_id?: string;
    //Onboarding_banner.
    onboarding_banner?: string;
  }
  
  /** A user's session used to authenticate messages. */
  export interface ApiSession {
    //True if the corresponding account was just created, false otherwise.
    created?: boolean;
    //Refresh token that can be used for session token renewal.
    refresh_token?: string;
    //Authentication credentials.
    token?: string;
    // UserId
    user_id: string;
    //
    id_token?: string;
  }
  
  /** Log out a session, invalidate a refresh token, or log out all sessions/refresh tokens for a user. */
  export interface ApiAuthenticateLogoutRequest {
    //Refresh token to invalidate.
    refresh_token?: string;
    //Session token to log out.
    token?: string;
  }
  
  /** Authenticate against the server with a refresh token. */
  export interface ApiAuthenticateRefreshRequest {
    //Refresh token.
    refresh_token?: string;
  }
  
  /** Authenticate against the server with a device ID. */
  export interface ApiAuthenticateRequest {
    //The App account details.
    account?: ApiAccountApp;
  }
  
  
  /** Send a app token to the server. Used with authenticate/link/unlink. */
  export interface ApiAccountApp {
    //
    appid?: string;
    //
    appname?: string;
    //The account token when create apps to access their profile API.
    token?: string;
    //Extra information that will be bundled in the session token.
    vars?: Record<string, string>;
  }
  
  
  /** The request to update the status of a message. */
  export interface ApiUpdateMessageRequest {
    //The time the message was consumed by the identity.
    consume_time?: string;
    //The identifier of the messages.
    id?: string;
    //The time the message was read at the client.
    read_time?: string;
  }
  