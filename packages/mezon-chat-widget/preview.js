
import { spawn } from 'child_process';

import * as fs from 'fs';
import path from 'path';

const prodFile = 'dist/mezon-chat-widget.min.js';
if (!fs.existsSync(prodFile)) {
   console.error('❌ Production build not found!');
   console.error('👉 Please run "npm run build" first.');
   process.exit(1);
}

const devPublicDir = 'development/public';
const destFile = path.join(devPublicDir, 'mezon-chat.js');

if (!fs.existsSync(devPublicDir)) {
   fs.mkdirSync(devPublicDir, { recursive: true });
}

console.log('📦 Copying production build to development server...');
fs.copyFileSync(prodFile, destFile);

let apiProcess = null;
let webProcess = null;

function startServers() {
   console.log('🔌 Starting API Server (3001)...');
   apiProcess = spawn('node', ['development/api-server.js'], {
      stdio: 'inherit',
      shell: true
   });

   console.log('🌍 Starting Web Server (3000)...');
   webProcess = spawn('node', ['development/web-server.js'], {
      stdio: 'inherit',
      shell: true
   });

   apiProcess.on('close', (code) => {
      console.log(`🔌 API Server exited with code ${code}`);
      process.exit(code);
   });

   webProcess.on('close', (code) => {
      console.log(`🌍 Web Server exited with code ${code}`);
      process.exit(code);
   });
}

const cleanup = () => {
   console.log('\n\n👋 Shutting down...');
   if (apiProcess) apiProcess.kill();
   if (webProcess) webProcess.kill();
   process.exit(0);
};

process.on('SIGINT', cleanup);
