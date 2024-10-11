import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  HexoRollupConfigs
} from "./chunk-AZP4UY3S.mjs";
import {
  objectWithoutKeys
} from "./chunk-SLQCI6BS.mjs";

// src/renderer/rollup/renderer.js
import { join } from "path";
import { rollup } from "rollup";
import { jsonStringifyWithCircularRefs, writefile } from "sbg-utility";
var rollupCache = [];
var rollupRenderAsync = async (config) => {
  config.input.cache = rollupCache;
  const bundle = await rollup(config.input);
  rollupCache = bundle.cache;
  const { code } = await bundle.generate(config.output);
  return code;
};
var _rollupRenderAsync = rollupRenderAsync;
async function renderer(data, _options) {
  const { path, text } = data;
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
  const input = objectWithoutKeys(config, ["output"]);
  const { output } = config;
  writefile(join(hexo.base_dir, "tmp/config/rollup.json"), jsonStringifyWithCircularRefs({ input, output, path }));
  try {
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}
var renderer_default = renderer;

export {
  _rollupRenderAsync,
  renderer_default
};
