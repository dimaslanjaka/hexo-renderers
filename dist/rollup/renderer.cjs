'use strict';

var tslib = require('tslib');
var babel = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var resolve = require('@rollup/plugin-node-resolve');
var terser = require('@rollup/plugin-terser');
var virtual = require('@rollup/plugin-virtual');
var Hexo = require('hexo');
var rollup = require('rollup');
var sbgUtility = require('sbg-utility');
var HexoRollupConfigs = require('./HexoRollupConfigs.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var rollup__namespace = /*#__PURE__*/_interopNamespaceDefault(rollup);

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
    return tslib.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const { path: inputPath, text } = data;
        const instance = this instanceof Hexo ? this : hexo;
        const rollupConfigs = new HexoRollupConfigs.HexoRollupConfigs(instance);
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
            const id = 'virtual:' + sbgUtility.md5(text);
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
        const bundle = yield rollup__namespace.rollup(config); // Build bundle
        const result = yield bundle.generate(Object.assign(Object.assign({}, output), { 
            // Ensure output format is iife for browser compatibility
            format: 'iife', name: sbgUtility.sanitizeFilename(instance.config.title || 'MyBundle', {
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

module.exports = renderer;
