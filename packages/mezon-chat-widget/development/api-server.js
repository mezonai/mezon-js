
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({
   origin: 'http://localhost:3000',
   methods: ['GET', 'POST'],
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

   const url = `${oauthConfig.baseUri}/oauth2/auth?${params.toString()}`;
   console.log('[API] OAuth URL generated:', url);
   res.json({ url });
});

// Exchange Code
app.post('/api/auth/exchange', async (req, res) => {
   console.log('[API] POST /api/auth/exchange - Exchanging code for token');
   console.log('📦 [API] Request Body:', req.body);

   const { code, state } = req.body;

   console.log('🔧 [API] OAuth Config:', {
      baseUri: oauthConfig.baseUri,
      clientId: oauthConfig.clientId,
      // clientSecret: oauthConfig.clientSecret ? '***' : 'MISSING', // Mask secret for safety
      redirectUri: oauthConfig.redirectUri,
   });

   if (!code) {
      console.error('❌ [API] Code is missing from request body');
      return res.status(400).json({ error: 'Code is required' });
   }

   try {
      const tokenEndpoint = `${oauthConfig.baseUri}/oauth2/token`;
      console.log('🚀 [API] Sending token request to:', tokenEndpoint);

      const tokenRes = await fetch(tokenEndpoint, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            state: state || '',
            client_id: oauthConfig.clientId,
            client_secret: oauthConfig.clientSecret,
            redirect_uri: oauthConfig.redirectUri,
            scope: 'openid offline',
         }),
      });

      if (!tokenRes.ok) {
         const errorText = await tokenRes.text();
         console.error('[API] Token exchange failed:', errorText);
         throw new Error(`Failed to exchange code: ${errorText}`);
      }

      const tokenData = await tokenRes.json();
      console.log('[API] Token exchange successful');

      const userRes = await fetch(`${oauthConfig.baseUri}/userinfo`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: new URLSearchParams({
            access_token: tokenData.access_token,
            client_id: oauthConfig.clientId,
            client_secret: oauthConfig.clientSecret,
            redirect_uri: oauthConfig.redirectUri,
         }),
      });

      if (!userRes.ok) {
         const errorText = await userRes.text();
         console.error('[API] User info fetch failed:', errorText);
         throw new Error(`Failed to fetch user info: ${errorText}`);
      }

      const userInfo = await userRes.json();
      console.log('[API] User info fetched:', userInfo.username || userInfo.name);
      console.log({
         tokens: tokenData,
         user: userInfo

      })
      res.json({
         tokens: tokenData,
         user: userInfo
      });

   } catch (error) {
      console.error('[API] Exchange error:', error.message);
      res.status(400).json({ error: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`🔌 API Server running at http://localhost:${PORT}`);
});
