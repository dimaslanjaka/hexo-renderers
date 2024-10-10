'use strict';
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
const rollupRenderAsync = async (config) => {
  config.input.cache = rollupCache;

  const bundle = await rollup(config.input);

  rollupCache = bundle.cache;

  const { code } = await bundle.generate(config.output);
  return code;
};
const _rollupRenderAsync = rollupRenderAsync;
export { _rollupRenderAsync as rollupRenderAsync };

/**
 * rollup renderer callback
 * @param {{text?:string,path?:string}} data
 * @param {import('rollup').RollupOptions} [_options]
 * @returns
 */
async function renderer(data, _options) {
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
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}

export default renderer;
