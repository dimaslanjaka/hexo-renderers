import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import jsonc from 'jsonc-parser';
import path from 'path';
import { dts } from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {typeof import('./package.json')}
 */
const pkg = jsonc.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
export const external = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.devDependencies))
  .filter((pkgName) => !['markdown-it', 'p-limit', 'deepmerge-ts'].includes(pkgName));

/**
 * @type {import('rollup').RollupOptions}
 */
const declarations = {
  input: './tmp/dist/index.d.ts',
  output: [
    { file: 'dist/index.d.ts', format: 'es' },
    { file: 'dist/index.d.cts', format: 'es' },
    { file: 'dist/index.d.mts', format: 'es' }
  ],
  plugins: [dts()]
};

const input = 'src/index.ts';

const plugins = [
  json(), // Support for JSON files
  resolve({ preferBuiltins: true }), // Resolve node_modules packages
  typescript({
    tsconfig: 'tsconfig.build.json',
    compilerOptions: {
      outDir: './dist',
      declaration: false
    }
  }), // Compile TypeScript files
  commonjs() // Convert CommonJS modules to ES6
];

/**
 * @type {import('rollup').RollupOptions}
 */
const cjs = {
  input,
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    sourcemap: false
  },
  plugins,
  external // external dependencies to exclude from the bundle
};

/**
 * @type {import('rollup').RollupOptions}
 */
const esm = {
  input,
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: false
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: false
    }
  ],
  plugins,
  external // external dependencies to exclude from the bundle
};

export default [cjs, esm, declarations];
