import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __require
} from "./chunk-LPG7NA4D.mjs";

// src/renderer-pug.ts
import { createRequire } from "module";
import * as path from "path";
import * as pug from "pug";
if (typeof __require === "undefined") global.require = createRequire(import.meta.url);
function rendererPug(hexo) {
  const configPath = path.join(process.cwd(), "pug.config");
  const defaultConfig = { compile: {} };
  let hasConfig = true;
  try {
    __require.resolve(configPath);
  } catch {
    hasConfig = false;
  }
  const config = hasConfig ? __require(configPath) : defaultConfig;
  const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const invalidKeys = Object.keys(config).filter((k) => !hasProp(defaultConfig, k));
  if (invalidKeys.length > 0) {
    throw Error(`Unsupported PUG config keys: ${invalidKeys.join(", ")}`);
  }
  function pugCompile(data) {
    const opts = {
      ...config.compile,
      filename: data.path
      // always used
    };
    return pug.compile(data.text, opts);
  }
  function pugRenderer(data, locals) {
    return pugCompile(data)(locals);
  }
  pugRenderer.compile = pugCompile;
  hexo.extend.renderer.register("pug", "html", pugRenderer, true);
  return pugRenderer;
}
var renderer_pug_default = rendererPug;

export {
  rendererPug,
  renderer_pug_default
};
