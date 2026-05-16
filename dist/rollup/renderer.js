import { __awaiter } from 'tslib';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import Hexo from 'hexo';
import * as rollup from 'rollup';
import { md5, sanitizeFilename } from 'sbg-utility';
import { HexoRollupConfigs } from './HexoRollupConfigs.js';

const plugins = [
    resolve({ preferBuiltins: true, browser: true }),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env', { modules: false }]] // Ensure compatibility with older browsers
    }),
    terser({
        format: { ascii_only: true }
    })
];
/**
 * rollup renderer callback
 * @param data
 * @param _options
 * @returns
 */
function renderer(data, _options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { path: inputPath, text } = data;
        const instance = this instanceof Hexo ? this : hexo;
        const rollupConfigs = new HexoRollupConfigs(instance);
        const config = rollupConfigs.merged();
        if (!config.plugins)
            config.plugins = plugins;
        // fix when config.plugins is direct class plugin
        if (!Array.isArray(config.plugins))
            config.plugins = [config.plugins];
        if (config.experimentalCodeSplitting) {
            throw new Error('hexo-renderers[rollup] not Support "experimentalCodeSplitting".');
        }
        if (inputPath) {
            config.input = inputPath;
        }
        else if (typeof text === 'string') {
            const id = 'virtual:' + md5(text);
            config.input = id;
            config.plugins = [
                virtual({
                    [id]: text // Define the virtual module
                }),
                ...config.plugins
            ];
        }
        if (!config.input || (Array.isArray(config.input) && config.input.length === 0)) {
            throw new Error('hexo-renderers[rollup] input empty.');
        }
        // console.log(config);
        // const input = objectWithoutKeys(config, ['output']);
        // const { output } = config;
        // //hexo.log.info('rollup', { input, output, path });
        // writefile(
        //   join(instance.base_dir, 'tmp/config/rollup.json'),
        //   jsonStringifyWithCircularRefs({ input, output, path: inputPath })
        // );
        // try {
        //   return await rollupRenderAsync(config);
        // } catch (err) {
        //   this.log.error(err);
        //   throw err;
        // }
        // Log config to ensure it's correctly set
        // console.log('Rollup Config:', config);
        const { output } = config; // Destructure output from config
        const bundle = yield rollup.rollup(config); // Build bundle
        const result = yield bundle.generate(Object.assign(Object.assign({}, output), { 
            // Ensure output format is iife for browser compatibility
            format: 'iife', name: sanitizeFilename(instance.config.title || 'MyBundle', {
                callback: (name) => {
                    // Sanitize the name to be a valid JavaScript identifier
                    return name.replace(/[^a-zA-Z0-9_$]/g, '_');
                }
            }) }));
        // Log output
        // result.output.forEach((chunk) => {
        //   if (chunk.type === 'chunk') {
        //     console.log('Generated Code:', chunk.code);
        //   }
        // });
        yield bundle.write({
            file: !Array.isArray(config.output) && config.output && 'file' in config.output
                ? (_a = config.output) === null || _a === void 0 ? void 0 : _a.file
                : 'tmp/dist/bundle.js', // Output to the correct file
            format: 'iife',
            name: 'MyBundle'
        });
        return result.output.map((chunk) => chunk.code || '').join('\n');
    });
}

export { renderer as default };
