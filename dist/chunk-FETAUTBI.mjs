import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  toArray
} from "./chunk-CMB6AX2F.mjs";

// src/renderer-nunjucks.ts
import fs from "fs-extra";
import nunjucks from "nunjucks";
import path from "upath";
import { writefile } from "sbg-utility";
var base_dir = typeof hexo !== "undefined" && hexo.base_dir ? hexo.base_dir : process.cwd();
var tmpdir = path.join(base_dir, "tmp", "hexo-renderers");
var logfile = path.join(tmpdir, "nunjucks-log.json");
function rendererNunjucks(hexo2) {
  const themeDir = path.join(hexo2.base_dir, "themes", hexo2.config.theme);
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
    const compiled = nunjucks.compile(
      "text" in data ? data.text : fs.readFileSync(data.path, "utf-8"),
      env
    );
    return compiled.render.bind(compiled);
  }
  render.compile = compile;
  hexo2.extend.renderer.register("njk", "html", render, false);
  hexo2.extend.renderer.register("j2", "html", render, false);
  return { render, rendererNunjucks, compile };
}
var renderer_nunjucks_default = rendererNunjucks;

export {
  rendererNunjucks,
  renderer_nunjucks_default
};
