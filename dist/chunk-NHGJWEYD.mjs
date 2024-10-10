import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  require_renderer
} from "./chunk-KGUM232Y.mjs";
import {
  __toESM
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/index.ts
var import_renderer = __toESM(require_renderer());
function rendererRollup(hexo) {
  hexo.extend.renderer.register("js", "js", import_renderer.default);
  hexo.extend.renderer.register("mjs", "js", import_renderer.default);
}

export {
  rendererRollup
};
