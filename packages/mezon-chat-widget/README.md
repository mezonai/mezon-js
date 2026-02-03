# Mezon Light Chat Widget

**Mezon Light Chat Widget** is a lightweight, embeddable chat widget built on top of the **Mezon SDK**.

It is delivered as a **single JavaScript file** containing a standard **Web Component (`<mezon-chat>`)**, allowing seamless integration into any website regardless of the framework (React, Vue, Angular, or Vanilla JS).

## ✨ Features

- 🧩 **Web Component** (`<mezon-chat>`) - Standard, framework-agnostic integration.
- 📦 **Single JS File** – Easy to load via CDN or script tag.
- 🎨 **Flexible Theming** - Built-in themes (`warm-amber`, `astra`, etc.) or custom Hex colors.
- 🔐 **Secure OAuth Flow** - Handles authentication securely via your backend.
- 🔌 **Auto-Reconnect** - Smart connection handling with session persistence.

---

## 📦 Installation

### Option 1: Script Tag (Recommended for Static Sites)

Load the widget script once, preferably before the closing `</body>` tag:

```html
<script src="path/to/mezon-light-chat.min.js"></script>
```

### Option 2: NPM (For Bundlers)

```bash
npm install mezon-chat-widget
```

Then import it in your application entry point:

```javascript
import 'mezon-chat-widget';
```

---

## 🚀 Basic Usage

Add the custom element to your HTML.Attributes handle the configuration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mezon Chat Integration</title>
</head>
<body>

    <!-- Your Content -->
    <h1>Welcome to our Platform</h1>

    <script src="dist/mezon-light-chat.min.js"></script>

    <!-- Initialize Component -->
    <mezon-chat
        api-base-url="https://api.yourdomain.com"
        peer-id="1959485009781854208"
        save-session="false"
        theme="warm-amber"
    ></mezon-chat>

</body>
</html>
```

---

## 🔧 Configuration Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `api-base-url` | `string` | ✅ | Base URL of your backend API (e.g., `https://api.myapp.com`). |
| `api-oauth-path` | `string` | ❌ | Path to get OAuth URL (default: `api/auth/url`). |
| `api-exchange-path` | `string` | ❌ | Path to exchange code (default: `api/auth/exchange`). |
| `peer-id` | `string` | ❌ | Automatically open a DM with this User ID. |
| `save-session` | `boolean` | ❌ | Persist login session (tokens) across reloads (default: `false`). |
| `auto-open` | `boolean` | ❌ | Open the chat window automatically on load. |
| `welcome-message` | `string` | ❌ | Custom message shown before conversation starts. |
| `position` | `string` | ❌ | `bottom-right` (default) or `bottom-left`. |
| `theme` | `string` | ❌ | Theme name (e.g., `astra`) or Hex color. |

---

## 🎨 Themes

You can style the widget using pre-built themes or custom colors.

### Built-in Themes

| Theme Name | Primary Color | Description |
|------------|---------------|-------------|
| `warm-amber` | `#E08926` | Warm, friendly, good for support. |
| `pulse-red` | `#ED1B23` | Bold, energetic, good for alerts. |
| `astra` | `#464FB9` | Clean, professional, deep blue. |
| `calm-violet` | `#8758A3` | Elegant, tech-focused. |
| `clear-sky` | `#25AAE1` | Fresh, modern, SaaS style. |

### Custom Styling

Pass a hex code directly to the `theme` attribute:

```html
<mezon-chat theme="#ff5722"></mezon-chat>
```

---

## 🔐 OAuth Flow & Server Requirements

The widget relies on **Authorization Code Flow** for security. It does **not** handle sensitive secrets on the client side. Your backend must mediate the authentication.

### Flow Overview
1. **Widget** calls `GET /api/auth/url` (on your backend). Can be configured by `api-oauth-path` attribute.
2. **Backend** constructs the Mezon OAuth URL and returns it.
3. **Widget** opens a popup to Mezon for user login.
4. **Mezon** redirects back to your site with a `code`.
5. **Widget** intercepts the `code` and calls `POST /api/auth/exchange` (on your backend). Can be be configured by `api-exchange-path` attribute. 
6. **Backend** exchanges the code for tokens (server-to-server) and returns user info.
7. **Widget** initializes the chat session.

### Required Backend Endpoints

#### 1. Get Auth URL
**GET** `{api-base-url}/api/auth/url`

**Response:**
```json
{
  "url": "https://mezon.ai/oauth2/auth?client_id=...&state=...&redirect_uri=..."
}
```

#### 2. Exchange Code
**POST** `{api-base-url}/api/auth/exchange`

**Request:**
```json
{
  "code": "exchange_code",
  "state": "security_token"
}
```

**Response (Standard):**
```json
{
  "tokens": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600
  },
  "user": {
    "user_id": "123",
    "name": "John Doe",
    "avatar": "..."
  }
}
```

---

## 🧠 JavaScript API

You can control the widget programmatically:

```javascript
const chat = document.querySelector('mezon-chat');

// Open/Close
chat.open();
chat.close();

// Start a DM programmatically
await chat.startDM('123456789');

// Send a message
chat.sendMessage('Hello from JS!');

// Logout
chat.logout();
```

### Response Mapping (Optional)
If your backend data structure differs from the standard, you can map it using a callback:

```javascript
customElements.whenDefined('mezon-chat').then(() => {
  const MezonChatElement = customElements.get('mezon-chat');
  
  /**
   * Optional: Map your backend response to the widget's expected format.
   * Expected Return Type: ExchangeResponse
   */
  MezonChatElement.exchangeCallBack = (response) => {
      // Example: If your backend returns { data: { token: "...", profile: { ... } } }
      const data = response.data; 

      return {
          tokens: {
            access_token: data.token,
            refresh_token: data.refresh, 
            id_token: data.id_token      
          },
          user: {
            user_id: data.profile.uid,
            username: data.profile.username,
            name: data.profile.name,         
            avatar: data.profile.avatar      
          }
      };
  };
});
```

---

## � TypeScript Interfaces

If you are using TypeScript, you can leverage these interfaces for type safety.

```typescript
export interface ExchangeResponse {
  tokens: OAuthTokens;
  user: UserInfo;
}

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
}

export interface UserInfo {
  user_id: string;
  username: string;
  name?: string;
  avatar?: string;
}
```

---

## �🛠️ Development

We use a robust local development environment that simulates the production architecture.

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development environment
npm run dev
```

This command starts **two servers**:
1.  **Web Server (Port 3000):** Serves `development/index.html` (Simulating the Client App).
2.  **API Server (Port 3001):** Simulates the Backend API (OAuth endpoints).

Visit **http://localhost:3000** to see the widget in action.

### Project Structure

```text
packages/mezon-chat-widget/
├── src/
│   ├── components/         # UI Logic (ChatWidget, LoginView)
│   ├── services/           # Business Logic (Chat, Auth, Storage, Log)
│   ├── adapters/           # Network Adapters (OAuth)
│   ├── types/              # TypeScript Definitions
│   └── MezonChatElement.ts # Web Component Entry Point
├── development/            # Isolated Dev Environment
│   ├── public/             # Static Assets (Output dir)
│   ├── index.html          # Test Host Page
│   ├── web-server.js       # Express App (Client Host)
│   └── api-server.js       # Express App (Mock Backend)
├── dist/                   # Production Builds
├── build-dev.js            # esbuild script for Dev
└── build-library.js        # esbuild script for Production
```

### Building for Production

To generate the optimized distribution files:

```bash
npm run build
```

**Output (`dist/`):**
- `mezon-light-chat.min.js`: Production-ready, minified.
- `mezon-light-chat.js`: Unminified with comments (for debugging).

---

## 📄 License

MIT © 2026 Mezon AI