import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'path';
import { RollupOptions } from 'rollup';
import sbgutil from 'sbg-utility';
import { fileURLToPath } from 'url';
import renderer from '../src/rollup/renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(__dirname, { silent: true });

const config: RollupOptions = {
  output: {
    file: 'dist/bundle.js', // Output file for the bundled code
    format: 'iife', // Immediately Invoked Function Expression for browser compatibility
    name: 'MyBundle' // Name of the global variable
  }
};
// bind rollup config
hexo.config.rollup = config;

renderer
  .bind(hexo)(
    {
      text: fs.readFileSync(__dirname + '/fixtures/rollup-sample.js', 'utf-8')
    },
    config
  )
  .then((result) => {
    if (result) fs.writeFileSync(__dirname + '/tmp/rollup-result.json', sbgutil.jsonStringifyWithCircularRefs(result));
    console.log(result);
  });

process.on('exit', (code) => {
  console.error(`Process exited with code: ${code}`);
});

process.on('SIGINT', () => {
  console.error('Received SIGINT. Exiting...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Received SIGTERM. Exiting...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  if (!(err instanceof Error)) {
    // If it's not an instance of Error, create one manually to preserve the context.
    err = new Error(String(err));
  }
  console.error('Uncaught Exception:', err, (err as any).track);
  // Send some notification about the error
  process.exit(1);
});
