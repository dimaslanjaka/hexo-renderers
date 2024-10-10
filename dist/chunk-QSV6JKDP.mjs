import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  helper_exports,
  init_helper
} from "./chunk-ESUZ4WXB.mjs";
import {
  __commonJS,
  __require,
  __toCommonJS
} from "./chunk-QAIXVEL3.mjs";

// src/renderer-ejs.js
var require_renderer_ejs = __commonJS({
  "src/renderer-ejs.js"(exports, module) {
    var ejs = __require("ejs");
    var { toArray } = (init_helper(), __toCommonJS(helper_exports));
    function rendererEjs(hexo) {
      if (ejs.filters) ejs.filters.toArray = toArray;
      function ejsRenderer(data, locals) {
        return ejs.render(
          data.text,
          Object.assign({ filename: data.path }, locals)
        );
      }
      ejsRenderer.compile = function(data) {
        return ejs.compile(data.text, {
          filename: data.path
        });
      };
      hexo.extend.renderer.register("ejs", "html", ejsRenderer, true);
    }
    module.exports = { rendererEjs };
  }
});

export {
  require_renderer_ejs
};
