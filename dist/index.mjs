import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  rendererRollup
} from "./chunk-QSAAWZYS.mjs";
import "./chunk-LYJDZX2S.mjs";
import "./chunk-LWSQEWEO.mjs";
import "./chunk-WE6N5LTG.mjs";
import "./chunk-Y4EE73PS.mjs";
import "./chunk-MPBC4RTJ.mjs";
import "./chunk-7ON3GTJH.mjs";
import "./chunk-GUSCLJFH.mjs";
import "./chunk-WRTHVTJW.mjs";
import "./chunk-OCHHYNFB.mjs";
import {
  registerCustomGenerator
} from "./chunk-T43XGBJG.mjs";
import "./chunk-TTMGXF65.mjs";
import {
  rendererDartSass
} from "./chunk-4BKOTEUF.mjs";
import {
  rendererEjs
} from "./chunk-JMGDGDSQ.mjs";
import {
  rendererMarkdownIt
} from "./chunk-ZW2OM5DJ.mjs";
import "./chunk-GW6AMUUK.mjs";
import "./chunk-N5EX2ABV.mjs";
import "./chunk-UTLDQWOC.mjs";
import "./chunk-SSJ4TSE7.mjs";
import {
  rendererNunjucks
} from "./chunk-6C4HFVTI.mjs";
import {
  registerCustomHelper
} from "./chunk-SEPX2JQX.mjs";
import "./chunk-JTGTJIQE.mjs";
import "./chunk-WZN5GTTE.mjs";
import {
  collectorPost,
  loadPostData
} from "./chunk-E4FWP27Z.mjs";
import {
  logname
} from "./chunk-ZZ532TJY.mjs";
import "./chunk-G6ILIGWF.mjs";
import "./chunk-2TTYN3B4.mjs";
import "./chunk-QAE7XDYI.mjs";
import {
  rendererPug
} from "./chunk-JV3FF3G4.mjs";
import {
  rendererSass
} from "./chunk-A6P2AQLB.mjs";
import {
  rendererStylus
} from "./chunk-LPOIEBAT.mjs";
import "./chunk-LPG7NA4D.mjs";

// src/index.ts
import { del } from "sbg-utility";
import path from "upath";
var _a;
if (typeof hexo !== "undefined") {
  global.hexo = hexo;
  const options = Object.assign(
    { generator: ["meta"], engines: [] },
    ((_a = hexo.config.renderers) == null ? void 0 : _a.generator) || {}
  );
  if (Array.isArray(hexo.config.renderers)) {
    options.engines = hexo.config.renderers;
  }
  hexo.extend.filter.register("after_init", function() {
    loadPostData(this);
  });
  hexo.extend.filter.register("after_clean", function() {
    return del(path.join(hexo.base_dir, "tmp/hexo-renderers"));
  });
  registerCustomHelper(hexo);
  registerCustomGenerator(hexo, options.generator);
  hexo.extend.filter.register("after_post_render", function(post) {
    return collectorPost(post, this);
  });
  if (options.engines.length > 0) {
    for (let i = 0; i < options.engines.length; i++) {
      const engine = options.engines[i];
      switch (engine) {
        case "ejs":
          rendererEjs(hexo);
          break;
        case "pug":
          rendererPug(hexo);
          break;
        case "dartsass":
          rendererDartSass(hexo);
          break;
        case "rollup":
          rendererRollup(hexo);
          break;
        case "sass":
          rendererSass(hexo);
          break;
        case "stylus":
          rendererStylus(hexo);
          break;
        case "nunjucks":
        case "njk":
          rendererNunjucks(hexo);
          break;
        case "markdown-it":
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    hexo.log.info(logname, "activating all engines");
    rendererNunjucks(hexo);
    rendererEjs(hexo);
    rendererPug(hexo);
    rendererStylus(hexo);
    rendererSass(hexo);
    rendererMarkdownIt(hexo);
  }
}
export {
  rendererDartSass,
  rendererEjs,
  rendererMarkdownIt,
  rendererNunjucks,
  rendererPug,
  rendererRollup,
  rendererSass,
  rendererStylus
};
