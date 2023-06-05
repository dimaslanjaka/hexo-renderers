import { metaJsonCreator } from './meta';

export function registerCustomGenerator(hexo: import('hexo')) {
  metaJsonCreator(hexo);
}
