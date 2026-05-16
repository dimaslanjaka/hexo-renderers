'use strict';

var fs = require('fs-extra');
var nunjucks = require('nunjucks');
var path = require('upath');
var index = require('./helper/index.cjs');
var sbgUtility = require('sbg-utility');

//const logname = ansiColors.magentaBright('hexo-renderer-nunjucks');
/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
function rendererNunjucks(hexo) {
    const cacheUnit = new sbgUtility.persistentCache({
        base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
        name: 'nunjucks-renderer',
        persist: true,
        memory: false
    });
    /**
     * theme directory
     */
    const themeDir = path.join(hexo.base_dir, 'themes', hexo.config.theme);
    const env = nunjucks.configure([themeDir, path.join(themeDir, 'layout')], {
        noCache: true,
        autoescape: false,
        throwOnUndefined: false,
        trimBlocks: false,
        lstripBlocks: false
    });
    env.addFilter('toArray', index.toArray);
    /**
     * render
     * @param data
     * @param locals
     * @returns
     */
    function render(data, locals) {
        const cacheKey = 'render-' + (sbgUtility.md5FileSync(data.path) || sbgUtility.md5(data.text));
        const cacheValue = cacheUnit.getSync(cacheKey, '');
        if (cacheValue.length > 0)
            return cacheValue;
        if ('text' in data) {
            return nunjucks.renderString(data.text, locals);
        }
        const result = nunjucks.render(data.path, locals);
        if (typeof result === 'string')
            cacheUnit.setSync(cacheKey, result);
        return result;
    }
    /**
     * compile
     * @param data
     * @returns
     */
    function compile(data) {
        // const cacheKey = 'compile-' + (md5FileSync(data.path as string) || md5(data.text as string));
        // hexo.log.info(logname, 'text' in data ? data.text : data.path);
        const compiled = nunjucks.compile('text' in data ? data.text : fs.readFileSync(data.path, 'utf-8'), env);
        // const originalRender = compiled.render;
        // compiled.render = function (context?: Record<string, any>, callback?: nunjucks.TemplateCallback<string>) {
        //   if (typeof callback === 'function') {
        //     const cacheValue = cacheUnit.getSync(cacheKey, '');
        //     if (cacheValue.length > 0) {
        //       callback(null, cacheValue);
        //     } else {
        //       originalRender(context, function (err, result) {
        //         cacheUnit.setSync(cacheKey, result);
        //         callback(err, result);
        //       });
        //     }
        //   } else {
        //     const cacheValue = cacheUnit.getSync(cacheKey, '');
        //     if (cacheValue.length > 0) return cacheValue;
        //     const result = originalRender(context);
        //     cacheUnit.setSync(cacheKey, result);
        //     return result;
        //   }
        // } as any;
        return compiled.render.bind(compiled);
    }
    // hexo Renderer API implicitly requires 'compile' to be a value of the rendering function
    render.compile = compile;
    // hexo.extend.renderer.register('swig', 'html', render, true);
    hexo.extend.renderer.register('njk', 'html', render, true);
    hexo.extend.renderer.register('j2', 'html', render, true);
    return { render, rendererNunjucks, compile };
}

exports.rendererNunjucks = rendererNunjucks;
