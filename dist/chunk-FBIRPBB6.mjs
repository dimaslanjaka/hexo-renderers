import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  renderer_default
} from "./chunk-3RM3TQUD.mjs";

// src/renderer/rollup/index.ts
function rendererRollup(hexo) {
  hexo.extend.renderer.register("js", "js", renderer_default);
  hexo.extend.renderer.register("mjs", "js", renderer_default);
}

export {
  rendererRollup
};
