// Copyright 2020 The Mezon Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import esbuild from 'esbuild';

// External packages to avoid bundling runtime dependencies
const external = [
  'protobufjs',
  'protobufjs/minimal',
  'long',
  'mezon-js-protobuf',
  'whatwg-fetch',
  'base64-arraybuffer',
  'js-base64',
];

// Shared esbuild config
const config = {
  logLevel: 'info',
  entryPoints: ['index.ts'],
  bundle: true,
  target: 'es6',
  platform: 'neutral',
  treeShaking: true,
  globalName: 'mezonjs',
  external,
};

// Build CommonJS (minified)
await esbuild.build({
  ...config,
  format: 'cjs',
  outfile: 'dist/mezon-js.cjs.js',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Build ESM (minified)
await esbuild.build({
  ...config,
  format: 'esm',
  outfile: 'dist/mezon-js.esm.mjs',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Build IIFE (minified) - for direct browser script tag usage
await esbuild.build({
  ...config,
  format: 'iife',
  outfile: 'dist/mezon-js.iife.js',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Note: UMD build is handled by Rollup for ES5/cocos2d-x-js compatibility

console.log('Build completed successfully!');