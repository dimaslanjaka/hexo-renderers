import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { fileURLToPath } from 'url';
import { external, tsconfig } from './rollup.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cjs = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    sourcemap: false // optional
  },
  plugins: [
    resolve({ preferBuiltins: true }), // Resolve node_modules packages
    commonjs(), // Convert CommonJS modules to ES6
    typescript({
      tsconfig: false,
      compilerOptions: tsconfig.compilerOptions,
      include: ['./src/**/*']
    }), // Compile TypeScript files
    json() // Support for JSON files
  ],
  external // external dependencies package name to exclude from bundle
};

const esm = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: false // optional
  },
  plugins: [
    resolve({ preferBuiltins: true }), // Resolve node_modules packages
    commonjs(), // Convert CommonJS modules to ES6
    typescript({
      tsconfig: false,
      compilerOptions: tsconfig.compilerOptions,
      include: ['./src/**/*']
    }), // Compile TypeScript files
    json() // Support for JSON files
  ],
  external // external dependencies package name to exclude from bundle
};

export default [cjs, esm];
