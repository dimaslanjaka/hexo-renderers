import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  renderer_default
} from "./chunk-TIGNME37.mjs";

// src/renderer/rollup/index.ts
function rendererRollup(hexo) {
  hexo.extend.renderer.register("js", "js", renderer_default);
  hexo.extend.renderer.register("mjs", "js", renderer_default);
}

export {
  rendererRollup
};
