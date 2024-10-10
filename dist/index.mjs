import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  rendererRollup
} from "./chunk-NHGJWEYD.mjs";
import "./chunk-KGUM232Y.mjs";
import "./chunk-NM6V2A7Y.mjs";
import "./chunk-SVMFIJ4L.mjs";
import "./chunk-BFDENCYN.mjs";
import "./chunk-JZEFAEOM.mjs";
import "./chunk-SHR7XKHU.mjs";
import "./chunk-4HGMZJ35.mjs";
import "./chunk-PXPCNKTU.mjs";
import "./chunk-PPMINO4V.mjs";
import {
  registerCustomGenerator
} from "./chunk-T43XGBJG.mjs";
import "./chunk-TTMGXF65.mjs";
import {
  rendererDartSass
} from "./chunk-4BKOTEUF.mjs";
import {
  require_renderer_ejs
} from "./chunk-QSV6JKDP.mjs";
import {
  rendererMarkdownIt
} from "./chunk-ZFSVBSG3.mjs";
import "./chunk-NGO3CQW6.mjs";
import "./chunk-M4SIDFMO.mjs";
import "./chunk-CMWOOF5X.mjs";
import "./chunk-U354XDU5.mjs";
import {
  require_renderer_nunjucks
} from "./chunk-MS6YN7YX.mjs";
import {
  init_helper,
  registerCustomHelper
} from "./chunk-ESUZ4WXB.mjs";
import "./chunk-DWRQMMIC.mjs";
import "./chunk-TONA6L3N.mjs";
import {
  collectorPost,
  init_collector,
  loadPostData
} from "./chunk-ZXPMPPBR.mjs";
import {
  init_util,
  logname
} from "./chunk-DX3RKJWE.mjs";
import "./chunk-AY5VDOOF.mjs";
import "./chunk-77JXBHLC.mjs";
import "./chunk-S42X4VKR.mjs";
import {
  require_renderer_pug
} from "./chunk-W25RQR6Z.mjs";
import {
  rendererSass
} from "./chunk-A6P2AQLB.mjs";
import {
  require_renderer_stylus
} from "./chunk-A5X5YINU.mjs";
import {
  __toESM
} from "./chunk-QAIXVEL3.mjs";

// src/index.ts
import { del } from "sbg-utility";
import path from "upath";
init_helper();
init_collector();
init_util();
var import_renderer_ejs = __toESM(require_renderer_ejs());
var import_renderer_nunjucks = __toESM(require_renderer_nunjucks());
var import_renderer_pug = __toESM(require_renderer_pug());
var import_renderer_stylus = __toESM(require_renderer_stylus());
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
          (0, import_renderer_ejs.rendererEjs)(hexo);
          break;
        case "pug":
          (0, import_renderer_pug.rendererPug)(hexo);
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
          (0, import_renderer_stylus.rendererStylus)(hexo);
          break;
        case "nunjucks":
        case "njk":
          (0, import_renderer_nunjucks.rendererNunjucks)(hexo);
          break;
        case "markdown-it":
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    hexo.log.info(logname, "activating all engines");
    (0, import_renderer_nunjucks.rendererNunjucks)(hexo);
    (0, import_renderer_ejs.rendererEjs)(hexo);
    (0, import_renderer_pug.rendererPug)(hexo);
    (0, import_renderer_stylus.rendererStylus)(hexo);
    rendererSass(hexo);
    rendererMarkdownIt(hexo);
  }
}
var export_rendererEjs = import_renderer_ejs.rendererEjs;
var export_rendererNunjucks = import_renderer_nunjucks.rendererNunjucks;
var export_rendererPug = import_renderer_pug.rendererPug;
var export_rendererStylus = import_renderer_stylus.rendererStylus;
export {
  rendererDartSass,
  export_rendererEjs as rendererEjs,
  rendererMarkdownIt,
  export_rendererNunjucks as rendererNunjucks,
  export_rendererPug as rendererPug,
  rendererRollup,
  rendererSass,
  export_rendererStylus as rendererStylus
};
