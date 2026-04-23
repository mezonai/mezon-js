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

import esbuild from "esbuild";

// External packages to avoid bundling runtime dependencies
const external = [
  "protobufjs",
  "protobufjs/minimal",
  "long",
  "node:net",
  "net",
];

const entryPoints = {
  "mezon-js-protobuf": "./index.ts",
  abridged_tcp_adapter: "./abridged_tcp_adapter.ts",
  "mezon-js-protobuf-node": "./index.node.ts",
};

const protobufJsPlugin = {
  name: "protobufjs-fix",
  setup(build) {
    build.onResolve({ filter: /^protobufjs\/minimal$/ }, (args) => {
      return { path: "protobufjs/minimal.js", external: true };
    });
  },
};

// Shared esbuild config
const config = {
  logLevel: "info",
  entryPoints: entryPoints,
  bundle: true,
  target: "es6",
  platform: "node",
  treeShaking: true,
  globalName: "mezonjsprotobuf",
  external,
  outdir: 'dist',
  plugins: [protobufJsPlugin],
};

// Build CommonJS (minified)
await esbuild.build({
  ...config,
  format: "cjs",
  minify: true,
  outExtension: { ".js": ".cjs.js" },
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Build ESM (minified)
await esbuild.build({
  ...config,
  format: "esm",
  outExtension: { ".js": ".esm.mjs" },
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

// Build IIFE (minified) - for direct browser script tag usage
await esbuild.build({
  ...config,
  format: "iife",
  entryPoints: ["./index.ts"],
  outdir: undefined,
  outfile: "dist/mezon-js-protobuf.iife.js",
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});

console.log("Build completed successfully!");
