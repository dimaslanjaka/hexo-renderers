
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import jsonc from 'jsonc-parser';
import path from 'path';
import { dts } from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';

// __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Read and parse package.json
 * @type {typeof import('./package.json')}
 */
const pkg = jsonc.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

/**
 * Packages that should be bundled (not externalized)
 * @type {string[]}
 */
const bundledPackages = [
  'p-limit',
  'deepmerge-ts',
  'hexo-is',
  'is-stream',
  'markdown-it',
  'node-cache'
];

/**
 * List external dependencies, excluding specific packages that should be bundled
 * @type {string[]}
 */
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  'lodash',
  'underscore'
].filter((pkgName, idx, arr) => !bundledPackages.includes(pkgName) && arr.indexOf(pkgName) === idx);

/**
 * Rollup config for type declarations
 * @type {import('rollup').RollupOptions}
 */
const declarations = {
  input: './tmp/dist/index-exports.d.ts',
  output: [
    { file: 'dist/index.d.ts', format: 'es' },
    { file: 'dist/index.d.cts', format: 'es' },
    { file: 'dist/index.d.mts', format: 'es' }
  ],
  plugins: [dts()]
};

/**
 * Main entry file
 * @type {string}
 */
const input = 'src/index.ts';

/**
 * Common plugins for all builds
 * @type {import('rollup').Plugin[]}
 */
const plugins = [
  json(),
  resolve({ preferBuiltins: true }),
  typescript({
    tsconfig: 'tsconfig.build.json',
    compilerOptions: {
      outDir: './dist',
      declaration: false
    }
  }),
  commonjs()
];

/**
 * Rollup config for CommonJS output
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
  external
};

/**
 * Rollup config for ESM output
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
  external
};

export default [cjs, esm, declarations];
