
import { spawn } from 'child_process';
import * as esbuild from 'esbuild';
import * as fs from 'fs';

const devPublicDir = 'development/public';
if (!fs.existsSync(devPublicDir)) {
   fs.mkdirSync(devPublicDir, { recursive: true });
}


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
}


const cleanup = async (ctx) => {
   console.log('\n\n👋 Shutting down...');
   if (apiProcess) apiProcess.kill();
   if (webProcess) webProcess.kill();
   if (ctx) await ctx.dispose();
   process.exit(0);
};


const devBuildConfig = {
   entryPoints: ['src/index.ts'],
   bundle: true,
   platform: 'browser',
   target: ['es2020'],
   outfile: 'development/public/mezon-chat.js',
   format: 'iife',
   globalName: 'MezonLightChat',
   sourcemap: true,
   minify: false,
   loader: {
      '.css': 'text',
      '.svg': 'text'
   },
   plugins: []
};

async function run() {
   console.log('🔨 Building for Development...');
   const ctx = await esbuild.context(devBuildConfig);
   await ctx.watch();
   console.log('👀 Watching src for changes...');
   startServers();
   process.on('SIGINT', () => cleanup(ctx));
}

run();
