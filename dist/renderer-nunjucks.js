'use strict';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import path from 'upath';
import { toArray } from './helper/index.js';
import { writefile } from 'sbg-utility';
//const logname = ansiColors.magentaBright('hexo-renderer-nunjucks');
const base_dir = typeof hexo !== 'undefined' && hexo.base_dir ? hexo.base_dir : process.cwd();
const tmpdir = path.join(base_dir, 'tmp', 'hexo-renderers');
const logfile = path.join(tmpdir, 'nunjucks-log.json');
/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
export function rendererNunjucks(hexo) {
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
    env.addFilter('toArray', toArray);
    const logs = {
        render: [],
        compile: []
    };
    /**
     * render
     * @param data
     * @param locals
     * @returns
     */
    function render(data, locals) {
        if ('text' in data) {
            return nunjucks.renderString(data.text, locals);
        }
        // hexo.log.info(logname, 'render', data.path);
        logs.render.push(data.path);
        writefile(logfile, JSON.stringify(logs, null, 2));
        return nunjucks.render(data.path, locals);
    }
    /**
     * compile
     * @param data
     * @returns
     */
    function compile(data) {
        // hexo.log.info(logname, 'compile', data.path);
        logs.compile.push(data.path);
        writefile(logfile, JSON.stringify(logs, null, 2));
        // hexo.log.info(logname, 'text' in data ? data.text : data.path);
        const compiled = nunjucks.compile('text' in data ? data.text : fs.readFileSync(data.path, 'utf-8'), env);
        return compiled.render.bind(compiled);
    }
    // hexo Renderer API implicitly requires 'compile' to be a value of the rendering function
    render.compile = compile;
    // hexo.extend.renderer.register('swig', 'html', render, true);
    hexo.extend.renderer.register('njk', 'html', render, false);
    hexo.extend.renderer.register('j2', 'html', render, false);
    return { render, rendererNunjucks, compile };
}
export default rendererNunjucks;
