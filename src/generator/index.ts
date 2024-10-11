import { metaJsonCreator } from './meta.js';

export function registerCustomGenerator(hexo: import('hexo'), generators: string[]) {
  if ('meta' in generators) metaJsonCreator(hexo);
}
