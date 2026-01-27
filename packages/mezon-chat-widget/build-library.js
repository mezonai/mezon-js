import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { readFileSync } from 'fs';

// Read package.json for version info
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const banner = `/**
 * Mezon Light Chat Widget v${version}
 * (c) 2026 Mezon AI
 * License: MIT
 */`;

if (!fs.existsSync('dist')) {
   fs.mkdirSync('dist', { recursive: true });
}

const isWatch = process.argv.includes('--watch');

const buildConfig = {
   entryPoints: ['src/index.ts'],
   bundle: true,
   platform: 'browser',
   target: ['es2015'],
   globalName: 'MezonLightChat',
   loader: {
      '.css': 'text',
      '.ts': 'ts',
      '.svg': 'text',
   },
   banner: {
      js: banner
   }
};

async function build() {
   if (isWatch) {
      const ctx = await esbuild.context({
         ...buildConfig,
         outfile: 'dist/mezon-chat-widget.js',
         format: 'iife',
         sourcemap: true,
         minify: false,
      });
      await ctx.watch();
      console.log('👀 Watching for changes...');
   } else {
      console.log('🚀 Building library...');

      // 1. Unminified build (for debugging/development)
      await esbuild.build({
         ...buildConfig,
         outfile: 'dist/mezon-chat-widget.js',
         format: 'iife', // Browser script tag ready
         sourcemap: true,
         legalComments: 'none',
         minifyIdentifiers: true,
         minifySyntax: true,
         minifyWhitespace: true,
         drop: ['console', 'debugger'],
      });

      // 2. Minified build (Production/CDN ready)
      const result = await esbuild.build({
         ...buildConfig,
         outfile: 'dist/mezon-chat-widget.min.js',
         format: 'iife',
         sourcemap: false,
         minify: true,
         // Drop console.logs in production minified build for smaller size
         drop: ['console', 'debugger'],
      });

      console.log('✅ Build complete!');

      const stats = fs.statSync('dist/mezon-chat-widget.min.js');
      const sizeKB = (stats.size / 1024).toFixed(2);

      console.log(`📦 Development: dist/mezon-chat-widget.js`);
      console.log(`📦 Production:  dist/mezon-chat-widget.min.js (${sizeKB} KB) -> Ready for CDN`);
   }
}

build().catch((err) => {
   console.error(err);
   process.exit(1);
});
