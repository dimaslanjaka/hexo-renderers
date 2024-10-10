import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  toArray
} from "./chunk-OEAEFJSX.mjs";

// src/renderer-ejs.ts
import * as ejs from "ejs";
function rendererEjs(hexo) {
  if (ejs.filters) ejs.filters.toArray = toArray;
  function ejsRenderer(data, locals) {
    return ejs.render(data.text, Object.assign({ filename: data.path }, locals));
  }
  ejsRenderer.compile = function(data) {
    return ejs.compile(data.text, {
      filename: data.path
    });
  };
  hexo.extend.renderer.register("ejs", "html", ejsRenderer, true);
}
var renderer_ejs_default = rendererEjs;

export {
  rendererEjs,
  renderer_ejs_default
};
