import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  registerCustomGenerator
} from "./chunk-3VJMPMMD.mjs";
import "./chunk-WGKI5ISN.mjs";
import {
  rendererRollup
} from "./chunk-AYG6YTXC.mjs";
import "./chunk-DDTC7LPA.mjs";
import "./chunk-AZP4UY3S.mjs";
import "./chunk-EWKHTW57.mjs";
import "./chunk-NDKO3BRP.mjs";
import "./chunk-6OITNKBH.mjs";
import "./chunk-H5COYFD7.mjs";
import "./chunk-7BE66LVU.mjs";
import "./chunk-SLQCI6BS.mjs";
import "./chunk-CERIZBEH.mjs";
import {
  rendererStylus
} from "./chunk-O3HMMNPA.mjs";
import {
  rendererDartSass
} from "./chunk-QYJDNYCG.mjs";
import {
  rendererEjs
} from "./chunk-RSWHGH4F.mjs";
import {
  rendererMarkdownIt
} from "./chunk-B3K3NX2P.mjs";
import "./chunk-H2CUOY5G.mjs";
import "./chunk-7V7MW3PG.mjs";
import "./chunk-TUQNRFPA.mjs";
import "./chunk-663ODQJ6.mjs";
import {
  rendererNunjucks
} from "./chunk-6QZ6CABJ.mjs";
import {
  registerCustomHelper
} from "./chunk-MUQZVW6T.mjs";
import "./chunk-CUX5OQM4.mjs";
import "./chunk-NXNWXIDH.mjs";
import {
  collectorPost,
  loadPostData
} from "./chunk-BZLSJ7HP.mjs";
import {
  logname
} from "./chunk-TPNPXCJA.mjs";
import "./chunk-AGVFLRMZ.mjs";
import "./chunk-RBWQV3YM.mjs";
import "./chunk-6GCRMZR3.mjs";
import {
  rendererPug
} from "./chunk-YW3XUO5G.mjs";
import {
  rendererSass
} from "./chunk-LXZCNWB5.mjs";
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
