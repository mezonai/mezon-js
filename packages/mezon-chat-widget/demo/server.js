
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
// Node 18+ has native fetch, but for compatibility or if using older node types. Actually, type module implies usually modern node. Let's try native fetch first.
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
// Serve specific static files and directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html at root
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve styles.css
app.get('/styles.css', (req, res) => {
   res.sendFile(path.join(__dirname, 'styles.css'));
});

// Serve js directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve dist directory (library files)
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use(express.static(path.join(__dirname, 'public')));

// Configuration
const oauthConfig = {
   baseUri: process.env.OAUTH_BASE_URI,
   clientId: process.env.OAUTH_CLIENT_ID,
   clientSecret: process.env.OAUTH_CLIENT_SECRET,
   redirectUri: process.env.OAUTH_REDIRECT_URI,
};

// Routes

// Get Login URL
app.get('/api/auth/url', (req, res) => {
   console.log('[API] GET /api/auth/url - Generating OAuth URL');
   const state = Math.random().toString(32);
   const params = new URLSearchParams({
      client_id: oauthConfig.clientId,
      redirect_uri: oauthConfig.redirectUri,
      response_type: 'code',
      scope: 'openid offline',
      state: state,
   });
   console.log(params.toString());
   // Construct the full URL. Assuming /oauth2/auth endpoint or similar for the initial redirect, 
   // although the user snippet showed params construction, it didn't explicitly key the authorize endpoint URL in the snippet,
   // but typically it's baseUri + /oauth2/authorize or similar. 
   // User provided exchange code snippet calls: `${oauthConfig.baseUri}/oauth2/token`
   // User provided params snippet: "đây là oauth api"
   // I will assume the auth endpoint is /oauth2/authorize or /oauth2/auth. I'll use /oauth2/auth as a guess or ask validation?
   // Let's assume /oauth2/auth for now based on standard Mezon/OAuth patterns.

   const url = `${oauthConfig.baseUri}/oauth2/auth?${params.toString()}`;
   console.log('[API] OAuth URL generated:', url);
   res.json({ url });
});

// Exchange Code
app.post('/api/auth/exchange', async (req, res) => {
   console.log('[API] POST /api/auth/exchange - Exchanging code for token');
   const { code, state } = req.body;
   console.log('[API] Code:', code?.substring(0, 10) + '...', 'State:', state);

   try {
      // 1. Exchange Code for Token
      const tokenRes = await fetch(`${oauthConfig.baseUri}/oauth2/token`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            state,
            client_id: oauthConfig.clientId,
            client_secret: oauthConfig.clientSecret,
            redirect_uri: oauthConfig.redirectUri,
            scope: 'openid offline',
         }),
      });

      if (!tokenRes.ok) {
         const errorText = await tokenRes.text();
         throw new Error(`Failed to exchange code: ${errorText}`);
      }

      const tokenData = await tokenRes.json();
      console.log('[API] Token exchange successful, access_token received');

      // 2. Fetch User Info
      const userRes = await fetch(`${oauthConfig.baseUri}/userinfo`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: new URLSearchParams({
            access_token: tokenData.access_token, // Some providers want encoded, others dont. Standard is typically bearer header or body.
            client_id: oauthConfig.clientId,
            client_secret: oauthConfig.clientSecret,
            redirect_uri: oauthConfig.redirectUri,
         }),
      });

      if (!userRes.ok) {
         const errorText = await userRes.text();
         // We might have a valid token but failed user info. 
         // Return token data at least, or fail? User request implies "handled" flow.
         // Let's throw to be safe or maybe just log and return token.
         // But typical flow needs user info for "AuthProfile".
         throw new Error(`Failed to fetch user info: ${errorText}`);
      }

      const userInfo = await userRes.json();
      console.log('[API] User info fetched:', userInfo.username || userInfo.name || userInfo.sub);

      // Return combined data
      console.log('[API] Returning combined tokens and user info');
      res.json({
         tokens: tokenData,
         user: userInfo
      });

   } catch (error) {
      console.error('[API] Exchange error:', error.message);
      res.status(400).json({ error: error.message });
   }
});

const server = app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (e) => {
   console.error('Server error:', e);
});

process.on('exit', (code) => {
   console.log(`Process escaping with code: ${code}`);
});

// Prevent immediate exit just in case (though listen should handle it)
setInterval(() => { }, 100000);
