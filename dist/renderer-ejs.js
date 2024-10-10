import * as ejs from 'ejs';
import { toArray } from './helper/index.js';
/**
 * hexo-renderer-ejs
 * @param hexo
 */
export function rendererEjs(hexo) {
    if (ejs.filters)
        ejs.filters.toArray = toArray;
    function ejsRenderer(data, locals) {
        return ejs.render(data.text, Object.assign({ filename: data.path }, locals));
    }
    ejsRenderer.compile = function (data) {
        return ejs.compile(data.text, {
            filename: data.path
        });
    };
    hexo.extend.renderer.register('ejs', 'html', ejsRenderer, true);
}
export default rendererEjs;
