'use strict';
var _a = require('path').posix, join = _a.join, relativePosix = _a.relative;
var _b = require('path'), relative = _b.relative, basename = _b.basename, extname = _b.extname, dirname = _b.dirname, isAbsolute = _b.isAbsolute;
var url_for = require('hexo-util').url_for;
function images(md, opts) {
    var hexo = opts.hexo, images = opts.images;
    var lazyload = images.lazyload, prependRoot = images.prepend_root, postAsset = images.post_asset;
    var relative_link = hexo.relative_link, model = hexo.model, base_dir = hexo.base_dir, source_dir = hexo.source_dir;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var postPath = env.postPath;
        if (lazyload) {
            token.attrSet('loading', 'lazy');
        }
        if (!prependRoot && !postAsset) {
            return self.renderToken(tokens, idx, options);
        }
        var srcIdx = token.attrs.findIndex(function (attr) { return attr[0] === 'src'; });
        var src = token.attrs[srcIdx][1];
        if (!/^(#|\/\/|http(s)?:)/.test(src) && !relative_link) {
            if (!(src.startsWith('/') || src.startsWith('\\')) && postAsset) {
                var PostAsset_1 = model.call(hexo, 'PostAsset');
                var assetDirBasePath = join(basename(source_dir), dirname(relativePosix(source_dir, postPath)), basename(postPath, extname(postPath)));
                if (isAbsolute(assetDirBasePath))
                    assetDirBasePath = relative(base_dir, assetDirBasePath);
                assetDirBasePath = assetDirBasePath.replace(/\\/g, '/');
                var asset = [
                    join(assetDirBasePath, src),
                    join(assetDirBasePath, src.replace(new RegExp('^' + basename(postPath, extname(postPath)) + '/'), ''))
                ]
                    .map(function (id) { return PostAsset_1.findById(id); })
                    .filter(Boolean);
                if (asset.length) {
                    src = asset[0].path.replace(/\\/g, '/');
                }
            }
            token.attrSet('src', url_for.call(hexo, src));
        }
        return self.renderToken(tokens, idx, options);
    };
}
module.exports = images;
