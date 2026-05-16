import Hexo from 'hexo';
import { defaultRendererMarkedOptions } from './marked/options';
import renderer from './marked/renderer-new';

export function rendererMarked(hexo: Hexo) {
  hexo.config.marked = Object.assign(defaultRendererMarkedOptions, hexo.config.marked);
  renderer.prototype.disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
  (renderer as any).disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
  hexo.extend.renderer.register('md', 'html', renderer, true);
  hexo.extend.renderer.register('markdown', 'html', renderer, true);
  hexo.extend.renderer.register('mkd', 'html', renderer, true);
  hexo.extend.renderer.register('mkdn', 'html', renderer, true);
  hexo.extend.renderer.register('mdwn', 'html', renderer, true);
  hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
  hexo.extend.renderer.register('mdtext', 'html', renderer, true);
}
