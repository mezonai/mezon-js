/** Default Mezon Gateway URL */
export const MEZON_GW_URL = 'https://gw.mezon.ai';

/** Maximum number of retries when waiting for socket to be ready */
export const SOCKET_READY_MAX_RETRY = 20;

/** Initial delay in milliseconds between socket ready retries (uses exponential backoff) */
export const SOCKET_READY_RETRY_DELAY = 100;

/** Clan ID used for Direct Messages */
export const CLAN_DM = '0';

/** Channel type for Direct Messages */
export const CHANNEL_TYPE_DM = 3;

export const CHANNEL_TYPE_GROUP = 2;

/** Stream mode for Direct Messages */
export const STREAM_MODE_DM = 4;

export const STREAM_MODE_GROUP = 3;

/** Default server key if none is provided */
export const DEFAULT_SERVER_KEY = 'DefaultServerKey';