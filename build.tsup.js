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
  // shims: true,
  // splitting: false,
  tsconfig: 'tsconfig.build.json',
  minify: false,
  removeNodeProtocol: true,
  skipNodeModulesBundle: true
};

async function buildAll() {
  const formats = [
    {
      format: 'esm',
      outExtension: { js: '.mjs', dts: '.mts' },
      banner: () => ({
        js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
      })
    },
    {
      format: 'cjs',
      outExtension: { js: '.cjs', dts: '.cts' }
    }
  ];

  try {
    await Promise.all(
      formats.map(({ format, outExtension, banner }) =>
        build({
          ...baseOption,
          format,
          outExtension: () => outExtension,
          banner: banner ? banner : undefined
        })
      )
    );
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildAll();
