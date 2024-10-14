'use strict';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import Hexo from 'hexo';
import { join } from 'path';
import * as rollup from 'rollup';
import { jsonStringifyWithCircularRefs, md5, writefile } from 'sbg-utility';
import { HexoLocalsData } from '../helper/hexoLocalsData.js';
import { HexoRollupConfigs } from './HexoRollupConfigs.js';
import { objectWithoutKeys } from './utils/objectWithoutKeys.js';

let rollupCache: rollup.RollupCache | undefined = {
  modules: []
};

const plugins: rollup.InputPluginOption[] = [
  resolve({ preferBuiltins: true }),
  commonjs(),
  terser({
    format: { ascii_only: true }
  })
];

/**
 * @param {{ input: rollup.RollupFileOptions; output: rollup.OutputOptions; }} config
 * @return { Promise<string> }
 */
const rollupRenderAsync = async (config: rollup.RollupOptions): Promise<string> => {
  // config.input.cache = rollupCache;
  config.cache = rollupCache;

  const bundle = await rollup.rollup(config);

  rollupCache = bundle.cache;

  const codes = [] as string[];
  const { output } = await bundle.generate(config);
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      console.log('Asset', chunkOrAsset);
    } else {
      // console.log('Chunk:', chunkOrAsset.fileName);
      // console.log('Generated Code:', chunkOrAsset.code);
      codes.push(chunkOrAsset.code);
    }
  }
  return codes.join('\n');
};
const _rollupRenderAsync = rollupRenderAsync;
export { _rollupRenderAsync as rollupRenderAsync };

/**
 * rollup renderer callback
 * @param data
 * @param _options
 * @returns
 */
async function renderer(this: Hexo, data: Partial<HexoLocalsData>, _options: rollup.RollupOptions) {
  const { path: inputPath, text } = data;
  const instance = this instanceof Hexo ? this : hexo;
  const rollupConfigs = new HexoRollupConfigs(instance);
  const config = rollupConfigs.merged();
  if (!config.plugins) config.plugins = plugins;
  // fix when config.plugins is direct class plugin
  if (!Array.isArray(config.plugins)) config.plugins = [config.plugins];

  if ((config as Record<string, any>).experimentalCodeSplitting) {
    throw new Error('hexo-renderers[rollup] not Support "experimentalCodeSplitting".');
  }

  if (inputPath) {
    config.input = inputPath;
  } else if (typeof text === 'string') {
    const id = 'virtual:' + md5(text);
    config.input = id;
    (config.plugins as rollup.InputPluginOption[]) = [
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

  const input = objectWithoutKeys(config, ['output']);
  const { output } = config;

  //hexo.log.info('rollup', { input, output, path });
  writefile(
    join(instance.base_dir, 'tmp/config/rollup.json'),
    jsonStringifyWithCircularRefs({ input, output, path: inputPath })
  );

  try {
    return await rollupRenderAsync(config);
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}

export default renderer;
