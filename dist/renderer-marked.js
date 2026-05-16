import { defaultRendererMarkedOptions } from './marked/options.js';
import rendererMarkedNew from './marked/renderer-new.js';

function rendererMarked(hexo) {
    hexo.config.marked = Object.assign(defaultRendererMarkedOptions, hexo.config.marked);
    rendererMarkedNew.prototype.disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
    rendererMarkedNew.disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
    hexo.extend.renderer.register('md', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('markdown', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('mkd', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('mkdn', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('mdwn', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('mdtxt', 'html', rendererMarkedNew, true);
    hexo.extend.renderer.register('mdtext', 'html', rendererMarkedNew, true);
}

export { rendererMarked };
