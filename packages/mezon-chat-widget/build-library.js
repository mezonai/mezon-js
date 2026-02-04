import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const banner = `/**
 * Mezon Light Chat Widget v${version}
 * (c) 2026 Mezon AI
 * License: MIT
 */`;

fs.mkdirSync('dist', { recursive: true });
}
const banner = `Mezon Light Chat Widget v${version} (c) 2026 Mezon AI License: MIT`;
setup(build) {
   build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.promises.readFile(args.path, 'utf8');
      const result = await esbuild.transform(css, {
         loader: 'css',
         minify: true,
      });
      return {
         contents: result.code,
         loader: 'text',
      };
   });
},
};

const buildConfig = {
   entryPoints: ['src/index.ts'],
   bundle: true,
   platform: 'browser',
   target: ['es2015'],
   globalName: 'MezonLightChat',
   loader: {
      '.ts': 'ts',
      '.svg': 'text',
   },
   plugins: [minifyCssPlugin],
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

      await esbuild.build({
         ...buildConfig,
         outfile: 'dist/mezon-chat-widget.min.js',
         format: 'iife',
         sourcemap: false,
         minify: true,
         legalComments: 'none',
         drop: ['console', 'debugger'],
      });

      console.log('✅ Build complete!');

      const stats = fs.statSync('dist/mezon-chat-widget.min.js');
      const sizeKB = (stats.size / 1024).toFixed(2);

      console.log(`📦 Production:  dist/mezon-chat-widget.min.js (${sizeKB} KB) -> Ready for CDN`);
   }
}

build().catch((err) => {
   console.error(err);
   process.exit(1);
});
