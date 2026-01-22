import { spawn } from 'child_process';
import * as esbuild from 'esbuild';
import * as fs from 'fs';

// Ensure directories exist
if (!fs.existsSync('dist')) {
   fs.mkdirSync('dist', { recursive: true });
}

let serverProcess = null;

// Function to start the demo server
function startServer() {
   if (serverProcess) {
      serverProcess.kill();
   }

   console.log('\n🚀 Starting demo server...\n');
   serverProcess = spawn('node', ['demo/server.js'], {
      stdio: 'inherit',
      shell: true
   });
}

// Build configuration
const buildConfig = {
   entryPoints: ['src/index.ts'],
   bundle: true,
   platform: 'browser',
   target: ['es2020'],
   outfile: 'dist/mezon-light-chat.js',
   format: 'iife',
   globalName: 'MezonLightChat',
   sourcemap: true,
   minify: false,
   external: [],
   loader: {
      '.css': 'text'
   }
};

// Initial build
console.log('🔨 Building library...\n');
const ctx = await esbuild.context(buildConfig);

await ctx.watch();
console.log('👀 Watching for changes...\n');

// Start server after initial build
setTimeout(startServer, 1000);

// Handle cleanup
process.on('SIGINT', async () => {
   console.log('\n\n👋 Shutting down...\n');
   if (serverProcess) {
      serverProcess.kill();
   }
   await ctx.dispose();
   process.exit(0);
});

console.log('✅ Development server ready!');
console.log('📝 Edit files in src/ to see changes');
console.log('🌐 Open http://localhost:3000 in your browser\n');
