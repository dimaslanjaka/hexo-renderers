import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import color from 'ansi-colors';
import fs from 'fs-extra';
import jsonc from 'jsonc-parser';
import { dts } from 'rollup-plugin-dts';
import path from 'upath';
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
const bundledPackages = ['p-limit', 'deepmerge-ts', 'hexo-is', 'is-stream', 'markdown-it', 'node-cache', 'marked'];

/**
 * List external dependencies, excluding specific packages that should be bundled
 * @type {string[]}
 */
const externalPackages = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  'lodash',
  'underscore'
];

/**
 * Returns a function to generate entry file names with the given extension for Rollup output.
 *
 * For files from node_modules, places them in the dependencies folder and logs the mapping.
 *
 * @param {string} ext The file extension (e.g. 'js', 'cjs', 'mjs').
 * @returns {(info: { facadeModuleId: string }) => string} Function that generates the output file name for a given entry.
 */
export function entryFileNamesWithExt(ext) {
  // Ensure the extension does not start with a dot
  if (ext.startsWith('.')) {
    ext = ext.slice(1);
  }
  return function ({ facadeModuleId }) {
    facadeModuleId = path.toUnix(facadeModuleId);
    if (!facadeModuleId.includes('node_modules')) {
      return `[name].${ext}`;
    }
    // Find the first occurrence of 'node_modules' and slice from there
    const nodeModulesIdx = facadeModuleId.indexOf('node_modules');
    let rel = facadeModuleId.slice(nodeModulesIdx);
    rel = rel.replace('node_modules', 'dependencies');
    // Remove extension using upath.extname
    rel = rel.slice(0, -path.extname(rel).length) + `.${ext}`;
    // Remove any null bytes (\x00) that may be present (Rollup sometimes injects these)
    rel = rel.replace(/\0/g, '');
    // Remove any leading slashes
    rel = rel.replace(/^\/\/+/, '');

    fs.appendFileSync(
      'tmp/rollup.log',
      `entryFileNamesWithExt:\n  [facadeModuleId] ${facadeModuleId}\n  [rel] ${rel}\n`
    );
    return rel;
  };
}

/**
 * Returns a function to generate chunk file names with the given extension for Rollup output.
 *
 * For chunks from node_modules, places them in the dependencies folder and removes the original extension.
 *
 * @param {string} ext The file extension (e.g. 'js', 'cjs', 'mjs').
 * @returns {(info: { name: string }) => string} Function that generates the output file name for a given chunk.
 */
export function chunkFileNamesWithExt(ext) {
  return function ({ name }) {
    // For node_modules chunks, place in dependencies folder
    if (name && name.includes('node_modules')) {
      const nodeModulesIdx = name.indexOf('node_modules');
      let rel = name.slice(nodeModulesIdx);
      rel = rel.replace('node_modules', 'dependencies');
      // Remove extension using upath.extname
      rel = rel.slice(0, -path.extname(rel).length);
      // Remove any null bytes (\x00) that may be present
      rel = rel.replace(/\0/g, '');
      // Remove any leading slashes
      rel = rel.replace(/^\/\/+/, '');
      return `${rel}-[hash].${ext}`;
    }
    // For local chunks, keep the default pattern
    return `[name]-[hash].${ext}`;
  };
}

/**
 * Rollup external filter function.
 * Determines if a module should be treated as external (not bundled) or bundled.
 *
 * @param {string} source - The import path or module ID.
 * @param {string} importer - The path of the importing file.
 * @param {boolean} isResolved - Whether the import has been resolved.
 * @returns {boolean} True if the module should be external, false if it should be bundled.
 */
export function externalPackagesFilter(source, importer, isResolved) {
  function getPackageNameFromSource(source) {
    // Handle absolute paths (Windows/Unix)
    const nm = /node_modules[\\/]+([^\\/]+)(?:[\\/]+([^\\/]+))?/.exec(source);
    if (nm) {
      // Scoped package
      if (nm[1].startsWith('@') && nm[2]) {
        return nm[1] + '/' + nm[2];
      }
      return nm[1];
    }
    // Handle bare imports
    if (source.startsWith('@')) {
      return source.split('/').slice(0, 2).join('/');
    }
    return source.split('/')[0];
  }

  const pkgName = getPackageNameFromSource(source);
  const isBundled = bundledPackages.includes(pkgName);
  const isExternal = externalPackages.includes(pkgName);

  if (bundledPackages.some((pkg) => source.includes(pkg))) {
    // Helper to color booleans
    const boolColor = (val) => (val ? color.green('true') : color.red('false'));
    const treeLog = [
      color.bold(color.cyan('externalFilter')),
      `\t├─ ${color.cyan('source:')}     ${color.yellow(source)}`,
      `\t├─ ${color.cyan('pkgName:')}    ${color.yellow(pkgName)}`,
      `\t├─ ${color.cyan('external:')}   ${boolColor(isExternal)}`,
      `\t├─ ${color.cyan('bundled:')}    ${boolColor(isBundled)}`,
      `\t├─ ${color.cyan('importer:')}   ${color.yellow((importer || '-').replace(process.cwd(), '').replace(/^\//, ''))}`,
      `\t└─ ${color.cyan('isResolved:')} ${boolColor(isResolved)}`
    ].join('\n');
    console.log(treeLog);
  }

  if (isBundled) return false; // <-- force bundle
  if (isExternal) return true; // <-- mark as external
  return false; // fallback: bundle it
}

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
  resolve({ preferBuiltins: true }),
  json(),
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
 * Rollup config for both CommonJS and ESM outputs
 * @type {import('rollup').RollupOptions}
 */
const _bundle = {
  input,
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: entryFileNamesWithExt('cjs'),
      chunkFileNames: chunkFileNamesWithExt('cjs')
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: entryFileNamesWithExt('js'),
      chunkFileNames: chunkFileNamesWithExt('js')
    }
  ],
  plugins,
  external: externalPackagesFilter
};

export default [_bundle, declarations];
