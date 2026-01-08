import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    context: 'globalThis',
    input: './index.ts',
    output: [
        {
            format: 'umd',
            name: 'mezonjs',
            dir: "dist",
            entryFileNames: "mezon-js.umd.js",
            sourcemap: true,
        },
        {
            format: 'es',
            name: 'mezonjs',
            dir: "dist",
            entryFileNames: "mezon-js.esm.mjs",
            sourcemap: true,
        },
        {
            format: 'cjs',
            name: 'mezonjs',
            dir: "dist",
            entryFileNames: "mezon-js.cjs.js",
            sourcemap: true,
        }
    ],
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
                "src/proto/gen/**/*.ts", 
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
    },
    onwarn(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids[0].includes('node_modules')) {
        return;
        }

        if (warning.code === 'EVAL' && warning.loc && warning.loc.file.includes('protobufjs')) {
        return;
        }
        
        if (warning.code === 'THIS_IS_UNDEFINED' && warning.loc && warning.loc.file.includes('@connectrpc')) {
        return;
        }

        warn(warning);
    }
};