import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: './index.ts',
    output: {
        format: 'umd',
        name: 'mezonjs',
        dir: "dist",
        entryFileNames: "mezon-js.umd.js"
    },
    plugins: [
        // 1. nodeResolve MUST be first to find the files in node_modules and gen folder
        nodeResolve({
            browser: true,
            extensions: ['.ts', '.js'] 
        }),
        
        // 2. Only ONE typescript plugin. Use it to handle everything.
        typescript({
            // Ensure this covers your source, generated files, and connectrpc
            include: [
                "**/*.ts",
                "../webrpc/frontend/src/gen/**/*.ts", 
                "src/gen/**/*.ts", 
                "node_modules/@connectrpc/**/*.ts"
            ],
            target: "es5", 
            module: "esnext",
            tsconfig: "./tsconfig.json",
            rootDir: "../", 
        }),

        // 3. CommonJS converts the output so UMD works correctly
        commonjs({
            extensions: ['.ts', '.js'],
            // If connectrpc uses commonjs internally, include it here
            include: [/node_modules/]
        }),
    ],
    moduleContext: {
        [require.resolve('whatwg-fetch')]: 'window'
    }
};