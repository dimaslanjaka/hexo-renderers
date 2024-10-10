'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { join } from 'path';
import { rollup } from 'rollup';
import { jsonStringifyWithCircularRefs, writefile } from 'sbg-utility';
import { HexoRollupConfigs } from './HexoRollupConfigs.js';
import { objectWithoutKeys } from './utils/objectWithoutKeys.js';
/** @typedef {NodeJS.EventEmitter} Hexo */
/** @type {rollup.ModuleJSON[]} */
let rollupCache = [];
/**
 * @param {{ input: rollup.RollupFileOptions; output: rollup.OutputOptions; }} config
 * @return { Promise<string> }
 */
const rollupRenderAsync = (config) => __awaiter(void 0, void 0, void 0, function* () {
    config.input.cache = rollupCache;
    const bundle = yield rollup(config.input);
    rollupCache = bundle.cache;
    const { code } = yield bundle.generate(config.output);
    return code;
});
const _rollupRenderAsync = rollupRenderAsync;
export { _rollupRenderAsync as rollupRenderAsync };
/**
 * rollup renderer callback
 * @param {{text?:string,path?:string}} data
 * @param {import('rollup').RollupOptions} [_options]
 * @returns
 */
function renderer(data, _options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, text } = data;
        /** @type {import('hexo')} */
        const hexo = this;
        const rollupConfigs = new HexoRollupConfigs(hexo);
        const config = rollupConfigs.merged();
        if (config.experimentalCodeSplitting) {
            throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
        }
        if (!config.input.includes(path)) {
            return text;
        }
        config.input = path;
        const input = objectWithoutKeys(config, ['output']);
        const { output } = config;
        //hexo.log.info('rollup', { input, output, path });
        writefile(join(hexo.base_dir, 'tmp/config/rollup.json'), jsonStringifyWithCircularRefs({ input, output, path }));
        try {
            return yield rollupRenderAsync({ input, output });
        }
        catch (err) {
            this.log.error(err);
            throw err;
        }
    });
}
export default renderer;
