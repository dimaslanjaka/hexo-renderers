import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import "../chunk-LPG7NA4D.mjs";

// src/mathjax/index.ts
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var layout = "layout.ejs";
var bodyTag = "</body>";
var mathjaxScript = fs.readFileSync(path.join(__dirname, "mathjax.html"), "utf-8");
function rendererMathjax(hexo) {
  hexo.extend.renderer.register("ejs", "html", function(data, options) {
    const path2 = options.filename = data.path;
    let content = data.text;
    if (layout === path2.substring(path2.length - layout.length)) {
      content = content.replace(bodyTag, mathjaxScript + "\n" + bodyTag);
    }
    return ejs.render(content, options, { async: true });
  });
}
export {
  rendererMathjax
};
