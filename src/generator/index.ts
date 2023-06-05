import { metaJsonCreator } from './meta';

export function registerCustomGenerator(hexo: import('hexo'), generators: string[]) {
  if ('meta' in generators) metaJsonCreator(hexo);
}
