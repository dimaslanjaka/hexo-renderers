import Hexo from 'hexo';
import { htmlFixer } from './html';

export function initHtmlFixer(hexo: Hexo) {
  // all in one html fixer
  hexo.extend.filter.register('after_render:html', htmlFixer as any);
}
