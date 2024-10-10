import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  HexoRollupConfigs_exports,
  init_HexoRollupConfigs
} from "./chunk-NM6V2A7Y.mjs";
import {
  init_objectWithoutKeys,
  objectWithoutKeys_exports
} from "./chunk-4HGMZJ35.mjs";
import {
  __commonJS,
  __require,
  __toCommonJS
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/renderer.js
var require_renderer = __commonJS({
  "src/renderer/rollup/renderer.js"(exports, module) {
    var { rollup } = __require("rollup");
    var { HexoRollupConfigs } = (init_HexoRollupConfigs(), __toCommonJS(HexoRollupConfigs_exports));
    var { objectWithoutKeys } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
    var { writefile, jsonStringifyWithCircularRefs } = __require("sbg-utility");
    var { join } = __require("path");
    var rollupCache = [];
    var rollupRenderAsync = async (config) => {
      config.input.cache = rollupCache;
      const bundle = await rollup(config.input);
      rollupCache = bundle.cache;
      const { code } = await bundle.generate(config.output);
      return code;
    };
    module.exports.rollupRenderAsync = rollupRenderAsync;
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
    module.exports = renderer;
  }
});

export {
  require_renderer
};
