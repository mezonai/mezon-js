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

const { execSync } = require("child_process");

function esbuild(args) {
    execSync("npx esbuild --bundle index.ts --target=es6 --global-name=mezonjsprotobuf " + args)
}

// emit .d.ts files and perform type checking
execSync("npx typescript --project tsconfig.json", {stdio: 'inherit'})

esbuild(" --format=cjs --outfile=dist/mezon-js-protobuf.cjs.js")
esbuild(" --format=esm --outfile=dist/mezon-js-protobuf.esm.mjs")
esbuild(" --format=iife --outfile=dist/mezon-js-protobuf.iife.js")
