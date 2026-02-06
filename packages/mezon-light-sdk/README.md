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
- 📎 File upload and attachment support (presigned URLs)
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
  if (!client.isRefreshSessionExpired()) {
    await client.refreshSession();
    // Update stored session data
    localStorage.setItem('mezon_session', JSON.stringify(client.exportSession()));
  } else {
    // Both tokens expired - need to re-authenticate
    console.log('Session fully expired, please login again');
  }
}

// Access tokens and session directly if needed
const token = client.getToken();
const refreshToken = client.getRefreshToken();
const session = client.getSession();
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

// Alternative: use setChannelMessageHandler (does not return unsubscribe)
socket.setChannelMessageHandler((message) => {
  console.log('Received:', message.content);
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
await socket.joinDMChannel(dmChannel.channel_id!);

// Create a group DM with multiple users
const groupDM = await client.createGroupDM(['user-1', 'user-2', 'user-3']);
await socket.joinGroupChannel(groupDM.channel_id!);

// Leave channels
await socket.leaveDMChannel(dmChannel.channel_id!);
await socket.leaveGroupChannel(groupDM.channel_id!);
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

### 8. Upload Attachments

**Upload Flow (Presigned URL):**

Mezon uses **Presigned URLs** for secure file uploads:
1. Client calls `uploadAttachment()` with file metadata → Server returns a **Presigned URL** (with temporary credentials in query params)
2. Client uses the Presigned URL to **PUT file directly to CDN** (bypassing backend)
3. After upload, Client **extracts the base URL** (removes query params) to use in message attachment

> **Note:** The SDK supports uploading **any file type** (images, documents, archives, etc.). when uploading non-image files, you can omit the `width` and `height` parameters.

**Example:**
- Presigned URL: `https://cdn.mezon.ai/file.png?X-Amz-Signature=...` → Used for **upload**
- CDN URL: `https://cdn.mezon.ai/file.png` → Used in **message**

```typescript
import * as fs from 'fs';
import * as path from 'path';

// Step 1: Get file information
const imagePath = path.join(__dirname, 'image.png');
const stats = fs.statSync(imagePath);

// Step 2: Request presigned URL from server
const uploadResponse = await client.uploadAttachment({
  filename: 'image.png',
  filetype: 'image/png',
  size: stats.size,
  width: 800,
  height: 600
});

// uploadResponse.url = "https://cdn.mezon.ai/file.png?X-Amz-Algorithm=..."

// Step 3: Upload file to CDN via presigned URL
const fileBuffer = fs.readFileSync(imagePath);
await fetch(uploadResponse.url!, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/png' },
  body: fileBuffer
});

// Step 4: Extract clean CDN URL (remove query params)
const urlObj = new URL(uploadResponse.url!);
const cdnUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
// cdnUrl = "https://cdn.mezon.ai/file.png"

// Step 5: Send message with attachment
await socket.sendDM({
  channelId: 'channel-123',
  content: { t: 'Check out this image!' },
  attachments: [{
    filename: 'image.png',
    url: cdnUrl,        // Use clean CDN URL
    filetype: 'image/png',
    size: stats.size,
    width: 800,
    height: 600
  }]
});
```

**⚠️ Important:**
- Presigned URLs have **short expiration** (typically 10-60s), upload immediately after receiving
- Only use **clean CDN URL** (without query params) in message attachment


### 9. Disconnect

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
| `client.uploadAttachment(request)` | Upload file and get presigned URL + CDN URL |
| `client.refreshSession()` | Refresh the session using refresh token |
| `client.isSessionExpired()` | Check if session token is expired |
| `client.isRefreshSessionExpired()` | Check if refresh token is expired |
| `client.getToken()` | Get the current auth token |
| `client.getRefreshToken()` | Get the refresh token |
| `client.getSession()` | Get the current session object |
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
| `socket.setChannelMessageHandler(handler)` | Register message handler (alias) |
| `socket.joinDMChannel(channelId)` | Join a DM channel |
| `socket.joinGroupChannel(channelId)` | Join a group channel |
| `socket.leaveDMChannel(channelId)` | Leave a DM channel |
| `socket.leaveGroupChannel(channelId)` | Leave a group channel |
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

interface ApiUploadAttachmentRequest {
  filename?: string;     // File name
  filetype?: string;     // MIME type (e.g., 'image/png')
  size?: number;         // File size in bytes
  width?: number;        // Image width (for images)
  height?: number;       // Image height (for images)
}

interface ApiUploadAttachment {
  filename?: string;     // Uploaded file name
  url?: string;          // Presigned URL (with query params)
}

interface ApiMessageAttachment {
  filename?: string;     // File name
  url?: string;          // Clean CDN URL (without query params)
  filetype?: string;     // MIME type
  size?: number;         // File size in bytes
  width?: number;        // Image width
  height?: number;       // Image height
  thumbnail?: string;    // Thumbnail URL (optional)
  duration?: number;     // Video duration in seconds (optional)
}
```

---