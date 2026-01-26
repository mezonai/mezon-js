import esbuild from 'esbuild';
import { readFileSync } from 'fs';

// Read package.json to get dependencies
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const dependencies = Object.keys(pkg.dependencies || {});
const devDependencies = Object.keys(pkg.devDependencies || {});

// External packages: dependencies + common sub-paths
const external = [
  ...dependencies,
  ...devDependencies,
  'protobufjs/minimal',
  'protobufjs/*',
  'long',
];

// Shared esbuild config
const config = {
  logLevel: "info",
  entryPoints: ["src/index.ts"],
  bundle: true,
  target: "es6",
  platform: "neutral",
  treeShaking: true,
  external,
  // drop: ['console'],
};

// Build CommonJS (minified)
await esbuild.build({
  ...config,
  format: 'cjs',
  outfile: 'dist/index.cjs.js',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Build ESM (minified)
await esbuild.build({
  ...config,
  format: 'esm',
  outfile: 'dist/index.esm.mjs',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

console.log('Build completed successfully!');
