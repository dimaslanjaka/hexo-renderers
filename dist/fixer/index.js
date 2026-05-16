import { htmlFixer } from './html.js';

function initHtmlFixer(hexo) {
    // all in one html fixer
    hexo.extend.filter.register('after_render:html', htmlFixer);
}

export { initHtmlFixer };
