import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = `${__dirname}/fixtures/rollup-sample.js`; // Path to your JavaScript file
const code = fs.readFileSync(filePath, 'utf-8'); // Read the file content

async function build() {
  // Create a bundle
  const bundle = await rollup({
    input: 'virtual:rollup-sample.js', // Reference the virtual module
    plugins: [
      virtual({
        'virtual:rollup-sample.js': code // Define the virtual module with file content
      }),
      resolve(), // Helps Rollup find external modules
      commonjs(), // Converts CommonJS modules to ES6
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'] // Ensure compatibility with older browsers
      }),
      terser() // Minifies the bundle
    ]
  });

  // Generate output
  const { output } = await bundle.generate({
    format: 'iife', // Immediately Invoked Function Expression for browser compatibility
    name: 'MyBundle' // Name of the global variable
  });

  // Log the generated code to the console
  output.forEach((chunk) => {
    if (chunk.type === 'chunk') {
      console.log('Generated Code for Chunk:', chunk.fileName);
      console.log(chunk.code); // Log the generated code
    }
  });

  // Write the bundle to disk
  await Promise.all(
    output.map((chunk) => {
      if (chunk.type === 'chunk') {
        return bundle.write({
          file: 'tmp/dist/bundle.js', // Output file for the bundled code
          format: 'iife',
          name: 'MyBundle'
        });
      }
    })
  );

  console.log('Build completed!'); // Confirmation message
}

// Run the build function
build().catch(console.error);
