import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __commonJS,
  __require
} from "./chunk-QAIXVEL3.mjs";

// src/markdown-it/images.js
var require_images = __commonJS({
  "src/markdown-it/images.js"(exports, module) {
    var { join, relative: relativePosix } = __require("path").posix;
    var { relative, basename, extname, dirname, isAbsolute } = __require("path");
    var { url_for } = __require("hexo-util");
    function images(md, opts) {
      const { hexo, images: images2 } = opts;
      const { lazyload, prepend_root: prependRoot, post_asset: postAsset } = images2;
      const { relative_link, model, base_dir, source_dir } = hexo;
      md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const { postPath } = env;
        if (lazyload) {
          token.attrSet("loading", "lazy");
        }
        if (!prependRoot && !postAsset) {
          return self.renderToken(tokens, idx, options);
        }
        const srcIdx = token.attrs.findIndex((attr) => attr[0] === "src");
        let src = token.attrs[srcIdx][1];
        if (!/^(#|\/\/|http(s)?:)/.test(src) && !relative_link) {
          if (!(src.startsWith("/") || src.startsWith("\\")) && postAsset) {
            const PostAsset = model.call(hexo, "PostAsset");
            let assetDirBasePath = join(
              basename(source_dir),
              dirname(relativePosix(source_dir, postPath)),
              basename(postPath, extname(postPath))
            );
            if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir, assetDirBasePath);
            assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
            const asset = [
              join(assetDirBasePath, src),
              join(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
            ].map((id) => PostAsset.findById(id)).filter(Boolean);
            if (asset.length) {
              src = asset[0].path.replace(/\\/g, "/");
            }
          }
          token.attrSet("src", url_for.call(hexo, src));
        }
        return self.renderToken(tokens, idx, options);
      };
    }
    module.exports = images;
  }
});

export {
  require_images
};
