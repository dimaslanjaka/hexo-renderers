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

// src/renderer-nunjucks.js
var require_renderer_nunjucks = __commonJS({
  "src/renderer-nunjucks.js"(exports, module) {
    var nunjucks = __require("nunjucks");
    var fs = __require("fs-extra");
    var path = __require("upath");
    var { toArray } = (init_helper(), __toCommonJS(helper_exports));
    var { writefile } = __require("sbg-utility");
    var tmpdir = path.join(__dirname, "../tmp");
    var logfile = path.join(tmpdir, "nunjucks-log.json");
    function rendererNunjucks(hexo) {
      const themeDir = path.join(hexo.base_dir, "themes", hexo.config.theme);
      const env = nunjucks.configure([themeDir, path.join(themeDir, "layout")], {
        noCache: true,
        autoescape: false,
        throwOnUndefined: false,
        trimBlocks: false,
        lstripBlocks: false
      });
      env.addFilter("toArray", toArray);
      const logs = {
        render: [],
        compile: []
      };
      function render(data, locals) {
        if ("text" in data) {
          return nunjucks.renderString(data.text, locals);
        }
        logs.render.push(data.path);
        writefile(logfile, JSON.stringify(logs, null, 2));
        return nunjucks.render(data.path, locals);
      }
      function compile(data) {
        logs.compile.push(data.path);
        writefile(logfile, JSON.stringify(logs, null, 2));
        const compiled = nunjucks.compile("text" in data ? data.text : fs.readFileSync(data.path), env);
        return compiled.render.bind(compiled);
      }
      render.compile = compile;
      hexo.extend.renderer.register("njk", "html", render, false);
      hexo.extend.renderer.register("j2", "html", render, false);
      return { render, rendererNunjucks, compile };
    }
    module.exports = { rendererNunjucks };
  }
});

export {
  require_renderer_nunjucks
};
