import { build } from 'tsup';

/**
 * @type {import("tsup").Options}
 */
const baseOption = {
  outDir: 'dist',
  entry: ['./src/**/*.{ts,js,cjs,mjs,json}'],
  exclude: ['**/node_modules', '**/test*', '**/*.spec*.ts', '**/*.test*.ts'],
  target: 'node14',
  dts: true,
  shims: true,
  // splitting: false,
  tsconfig: 'tsconfig.build.json',
  minify: false,
  removeNodeProtocol: true
  // skipNodeModulesBundle: true
};

async function buildAll() {
  try {
    await build({
      ...baseOption,
      format: ['cjs', 'esm'],
      banner(ctx) {
        if (ctx.format === 'esm') {
          return {
            js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
          };
        }
      },
      outExtension({ format }) {
        switch (format) {
          case 'cjs': {
            return { js: '.cjs', dts: '.d.cts' };
          }
          case 'esm': {
            return { js: '.mjs', dts: '.d.mts' };
          }
          default: {
            return { js: '.js', dts: '.d.ts' };
          }
        }
      }
    });
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildAll();
