# Mezon Light SDK

A lightweight SDK for Mezon chat integration, providing simple APIs for authentication, real-time messaging, and direct message management.

## Installation

```bash
npm install mezon-light-sdk
```

## Features

- 🔐 Simple authentication with ID tokens
- 💬 Real-time messaging via WebSocket (protobuf-based)
- 📨 Direct message (DM) and group DM support
- 🔄 Automatic session management with token refresh
- 📎 Attachment support for messages
- 🎯 TypeScript-first with full type definitions
- ⚡ Exponential backoff for socket connection reliability

## Quick Start

### 1. Authenticate with ID Token

```typescript
import { LightClient, AuthenticationError } from 'mezon-light-sdk';

try {
  const client = await LightClient.authenticate({
    id_token: 'your-id-token',
    user_id: 'user-123',
    username: 'johndoe',
    serverkey: 'your-server-key',     // optional, uses DEFAULT_SERVER_KEY
    gateway_url: 'https://gw.mezon.ai' // optional, uses MEZON_GW_URL
  });
  
  console.log('Authenticated as:', client.userId);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Auth failed:', error.message, error.statusCode);
  }
}
```

### 2. Restore Session from Storage

After login, persist the session data and restore it later:

```typescript
import { LightClient, SessionError } from 'mezon-light-sdk';

// Export session for storage
const sessionData = client.exportSession();
// Returns: { token, refresh_token, api_url, user_id }
localStorage.setItem('mezon_session', JSON.stringify(sessionData));

// Later: restore from storage
try {
  const savedData = JSON.parse(localStorage.getItem('mezon_session')!);
  const client = LightClient.initClient(savedData);
} catch (error) {
  if (error instanceof SessionError) {
    console.error('Session restore failed:', error.message);
  }
}
```

### 3. Session Management

Check and refresh the session before connecting:

```typescript
// Check if session token is expired
if (client.isSessionExpired()) {
  // Check if refresh token is still valid
  if (!client.isRefreshTokenExpired()) {
    await client.refreshSession();
    // Update stored session data
    localStorage.setItem('mezon_session', JSON.stringify(client.exportSession()));
  } else {
    // Both tokens expired - need to re-authenticate
    console.log('Session fully expired, please login again');
  }
}

// Access tokens directly if needed
const token = client.getToken();
const refreshToken = client.getRefreshToken();
```

### 4. Connect to Real-time Socket

```typescript
import { LightSocket, SocketError } from 'mezon-light-sdk';

const socket = new LightSocket(client, client.session);

await socket.connect({
  onError: (error) => console.error('Socket error:', error),
  onDisconnect: () => console.log('Socket disconnected'),
  verbose: false // set to true for debug logging
});

// Check connection status
console.log('Connected:', socket.isConnected);
```

### 5. Listen for Messages

```typescript
// Register a message handler (returns unsubscribe function)
const unsubscribe = socket.onChannelMessage((message) => {
  console.log(`Message from ${message.sender_id}: ${message.content}`);
  console.log('Channel:', message.channel_id);
  console.log('Timestamp:', message.create_time_seconds);
});

// Multiple handlers can be registered
const unsubscribe2 = socket.onChannelMessage((message) => {
  // Another handler for the same messages
});

// Unsubscribe when no longer needed
unsubscribe();
unsubscribe2();
```

### 6. Create and Join Channels

```typescript
// Create a DM with a single user
const dmChannel = await client.createDM('peer-user-id');
await socket.joinChat(dmChannel.channel_id!, false); // false = DM

// Create a group DM with multiple users
const groupDM = await client.createGroupDM(['user-1', 'user-2', 'user-3']);
await socket.joinChat(groupDM.channel_id!, true); // true = group

// Leave a channel
await socket.leaveChat(dmChannel.channel_id!, false);
await socket.leaveChat(groupDM.channel_id!, true);
```

### 7. Send Messages

```typescript
// Send a DM message
await socket.sendDM({
  channelId: 'channel-123',
  content: { t: 'Hello, world!' },
  hideLink: false // optional, whether to hide link previews
});

// Send a group message
await socket.sendGroup({
  channelId: 'group-channel-456',
  content: { t: 'Hello everyone!' },
  attachments: [
    {
      filename: 'image.png',
      url: 'https://cdn.mezon.ai/path/to/image.png',
      filetype: 'image/png',
      size: 42439,
      width: 716,
      height: 522
    }
  ],
  hideLink: true
});
```

### 8. Disconnect

```typescript
// Disconnect when done
socket.disconnect();
```

## API Reference

### LightClient

| Property/Method | Description |
|-----------------|-------------|
| `LightClient.authenticate(config)` | Static: Authenticate with ID token |
| `LightClient.initClient(config)` | Static: Initialize from existing tokens |
| `client.userId` | Get current user ID |
| `client.session` | Get underlying Session object |
| `client.client` | Get underlying MezonApi client |
| `client.createDM(peerId)` | Create a DM channel with one user |
| `client.createGroupDM(userIds)` | Create a group DM with multiple users |
| `client.refreshSession()` | Refresh the session using refresh token |
| `client.isSessionExpired()` | Check if session token is expired |
| `client.isRefreshTokenExpired()` | Check if refresh token is expired |
| `client.getToken()` | Get the current auth token |
| `client.getRefreshToken()` | Get the refresh token |
| `client.exportSession()` | Export session data for persistence |
| `client.createSocket(verbose?, adapter?, timeout?)` | Create a raw socket instance |

### LightSocket

| Property/Method | Description |
|-----------------|-------------|
| `new LightSocket(client, session)` | Create a new socket instance |
| `socket.connect(options?)` | Connect to real-time server |
| `socket.disconnect()` | Disconnect from server |
| `socket.isConnected` | Check if socket is connected |
| `socket.socket` | Get underlying Socket (throws if not connected) |
| `socket.onChannelMessage(handler)` | Register message handler, returns unsubscribe fn |
| `socket.joinChat(channelId, isGroup)` | Join a channel (DM or group) |
| `socket.leaveChat(channelId, isGroup)` | Leave a channel |
| `socket.sendDM(payload)` | Send a DM message |
| `socket.sendGroup(payload)` | Send a group message |
| `socket.setErrorHandler(handler)` | Set custom error handler |

### Types

```typescript
interface ClientInitConfig {
  token: string;           // Auth token
  refresh_token: string;   // Refresh token
  api_url: string;         // API URL
  user_id: string;         // User ID
  serverkey?: string;      // Optional server key
}

interface AuthenticateConfig {
  id_token: string;        // ID token from provider
  user_id: string;         // User ID
  username: string;        // Username
  serverkey?: string;      // Optional server key
  gateway_url?: string;    // Optional gateway URL
}

interface SendMessagePayload {
  channelId: string;                  // Target channel
  content: unknown;                   // Message content
  attachments?: ApiMessageAttachment[]; // Optional attachments
  hideLink?: boolean;                 // Hide link previews
}

interface SocketConnectOptions {
  onError?: (error: unknown) => void;  // Error callback
  onDisconnect?: () => void;           // Disconnect callback
  verbose?: boolean;                    // Enable debug logging
}
```

---