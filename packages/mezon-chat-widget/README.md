
# Mezon Light Chat Widget

  

**Mezon Light Chat Widget** is a lightweight, embeddable chat widget built on top of **Mezon SDK**.

It is delivered as a **single JavaScript file** and exposed as a **Web Component (`<mezon-chat>`)**, allowing seamless integration into any website without frameworks.

  

----------

  

## ✨ Features

  

- 🧩 Web Component (`<mezon-chat>`)

- 📦 Single JS file – CDN & script-tag friendly

- 🎨 Theme support (hex color or registered themes)

  

----------

  

## 📦 Installation

  

### Script tag usage

  

Load the widget **once**, preferably **before the closing `</body>` tag**:

  

```html

<script  src="path/mezon-light-chat.min.js"></script>

  

```

  

This automatically:

  

- Registers the `<mezon-chat>` custom element

- Makes the widget ready to use without any additional setup

  

----------

  

## 🚀 Basic Usage (HTML Example)

  

This is the **recommended and correct usage pattern**, based on the actual implementation.

  

```html

<!DOCTYPE  html>

<html  lang="en">

<head>

<meta  charset="UTF-8"  />

<meta  name="viewport"  content="width=device-width, initial-scale=1.0"  />

<title>Mezon Light Chat Demo</title>

</head>

<body>

  

<!-- Page content -->

<h1>Welcome to our website</h1>

  

<!-- Load Mezon Light Chat -->

<script  src="dist/mezon-light-chat.min.js"></script>

  

<!-- Use the Web Component -->

<mezon-chat

api-base-url="http://localhost:3000"

peer-id="1959485009781854208"

save-session="true"

theme="warm-amber"

></mezon-chat>

  

</body>

</html>

  

```

  

✅ No framework required

✅ No manual initialization needed

✅ Chat initializes automatically when required config is present

  

----------

  

## 🔧 Attributes

  
  

| Attribute | Type | Required | Description |

|----------|------|----------|-------------|

| `api-base-url` | `string` | ✅ | Base URL of your backend API |

| `api-oauth-path` | `string` | ❌ | API path to get OAuth login URL |

| `api-exchange-path` | `string` | ❌ | API path to exchange OAuth code |

| `peer-id` | `string` | ❌ | Auto start DM with this peer |

| `save-session` | `boolean` | ❌ | Restore previous session on reload |

| `auto-open` | `boolean` | ❌ | Automatically open chat on load |

| `welcome-message` | `string` | ❌ | Initial welcome message |

| `position` | `string` | ❌ | Widget position (`bottom-right`, `bottom-left`) |

| `theme` | `string` | ❌ | Hex color or registered theme name |

| `custom-class` | `string` | ❌ | Custom CSS class |

| `icon-chat` | `string` | ❌ | Custom chat icon URL |

| `icon-header` | `string` | ❌ | Custom header icon URL |

  
  

----------

  

## 🎨 Built-in Themes

  

Mezon Light Chat Widget provides a number of **pre-built themes**, helping you integrate quickly without needing to manually customize CSS.

  

Just pass the **`theme` attribute** with the corresponding theme name.

  

### 📌 Usage

  

```html

<mezon-chat

api-base-url="https://api.yourdomain.com"

theme="warm-amber"

></mezon-chat>

  

```

  

----------

  

### 🌈 Available Themes

  
  

| Theme Name | Description | Primary Color | Border Radius | Font |

|-----------|------------|---------------|---------------|------|

| `warm-amber` | Warm & friendly, suitable for landing pages and support | `#E08926` | `10px` | Inter |

| `pulse-red` | Bold & energetic, suitable for alerts and sales | `#ED1B23` | `6px` | Inter |

| `astra` | Clean & professional, inspired by Astra theme | `#464FB9` | `4px` | SVN-Avo |

| `calm-violet` | Calm & elegant, suitable for tech products | `#8758A3` | `8px` | Inter |

| `clear-sky` | Fresh & modern, suitable for SaaS dashboards | `#25AAE1` | `8px` | Inter |

  

----------

  

### 🎯 Custom Theme (Optional)

  
  

In addition to pre-built themes, you can also:

  

- Transmit **hex color** directly:

  

```html

<mezon-chat  theme="#25AAE1"></mezon-chat>

  

```

  

- Or **register private theme** in code (advanced usage).

  

----------

  

If you want, I can:

  

- Write more **preview screenshot section**

- Add **Dark theme**

- Or write README in format **npm package / GitHub release**

  

Are you publicizing this widget for **external users** or **internal products**?

  

----------

  

## 🧠 JavaScript API

  

### Public Methods

  

```js

const  chat = document.querySelector('mezon-chat');

  

chat.open();

chat.close();

  

await  chat.startDM('peer-user-id');

  

chat.sendMessage('Hello');

  

chat.logout();

  

```

  
  

----------

  

## 🔐 OAuth Flow

  

1. User opens the chat

2. OAuth popup is triggered

3. Backend exchanges `code` via `api-exchange-path`

4. Tokens & user data are returned

5. Session is optionally saved

6. Chat initializes automatically

  

No manual OAuth wiring is required.

  
----------

## 🔐 Server Requirements – OAuth Endpoints

To integrate **Mezon Light Chat Widget**, your backend **must expose exactly two OAuth-related endpoints**.

> The widget **does not implement OAuth logic on the client**.  
> All sensitive operations (client secret, token exchange) **must be handled by the server**.

----------

### 1️⃣ Get OAuth Login URL

#### `GET /api/auth/url`

This endpoint generates the OAuth authorization URL and returns it to the widget.

##### Responsibilities

-   Generate a secure `state`
    
-   Construct OAuth authorization URL
    
-   Return the full redirect URL
    

##### Request

```http
GET /api/auth/url

```

##### Response

```json
{
  "url": "https://oauth.provider.com/oauth2/auth?client_id=xxx&redirect_uri=xxx&response_type=code&scope=openid offline&state=abc123"
}

```

##### Notes

-   The widget opens this URL in a popup
    
-   OAuth provider redirects back with `code`
    
-   No client secret is exposed to the browser
    

----------

### 2️⃣ Exchange Authorization Code

#### `POST /api/auth/exchange`

This endpoint exchanges the OAuth `code` for tokens and user information.

##### Responsibilities

-   Receive `code` (and optional `state`)
    
-   Exchange code for access token
    
-   Fetch user profile
    
-   Return combined authentication data
    

##### Request

```http
POST /api/auth/exchange
Content-Type: application/json

{
  "code": "authorization_code",
  "state": "abc123"
}

```

##### Response (example)

```json
{
  "tokens": {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "xxx",
    "expires_in": 3600
  },
  "user": {
    "user_id": "u_123",
    "username": "phu.nguyen",
    "name": "Phu Nguyen",
    "avatar": "https://cdn.example.com/avatar.svg"
  }
}

```

##### Security Notes

-   This endpoint **must run server-side**
    
-   `client_secret` must never be exposed
    
-   Always validate OAuth `state`
    
-   HTTPS is required in production
    

----------

### 🔄 OAuth Flow Overview

```text
User opens chat
   ↓
Widget calls GET /api/auth/url
   ↓
OAuth popup opens
   ↓
Provider redirects with code
   ↓
Widget calls POST /api/auth/exchange
   ↓
Backend exchanges token + fetches user
   ↓
Chat session initializes

```

----------

## 🔄 Custom OAuth Data Mapping

The SDK allows **customizing only the returned data**, without altering the OAuth flow.

### Custom exchange data mapping

```html
<script src="dist/mezon-light-chat.min.js"></script>

<script>
  MezonChatWidget.exchangeCallBack = (response) => {
    const data = response.tokens;
    const user = response.user;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: {
        user_id: user.user_id || user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar
      }
    };
  };
</script>

```

----------

### Custom OAuth final data mapping

Use this when your backend returns a **final wrapped login response**.

```html
<script>
  MezonChatWidget.oauthCallBack = (response) => {
    const payload = response.payload || response.data;

    return {
      accessToken: payload.token,
      user: {
        user_id: payload.profile.uid,
        username: payload.profile.username,
        name: payload.profile.name,
        avatar: payload.profile.avatar
      }
    };
  };
</script>

```

✅ No custom fetch  
✅ No custom popup logic  
✅ No OAuth flow override  
✅ Safe & SDK-friendly

----------

## 🧠 Important Notes

-   Callbacks are **data adapters**, not OAuth logic
    
-   They **do not**:
    
    -   Open popup
        
    -   Redirect browser
        
    -   Call backend APIs
        
-   Use them **only if backend response shape differs**
    

----------

## 🛠️ Development

```bash

npm  install

npm  run  dev

npm  run  build

```

Build output:

  

```text

dist/

├─ mezon-light-chat.js # Development (readable + sourcemap)

└─ mezon-light-chat.min.js # Production (minified)

```

----------

  

## 📄 License

  

MIT

  

(c) 2026 Mezon AI