import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  metaJsonCreator
} from "./chunk-TTMGXF65.mjs";

// src/generator/index.ts
function registerCustomGenerator(hexo, generators) {
  if ("meta" in generators) metaJsonCreator(hexo);
}

export {
  registerCustomGenerator
};
