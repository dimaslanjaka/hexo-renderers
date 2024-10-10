import Hexo__default from 'hexo';

/**
 * hexo get post by key with name
 * @param by
 * @param filternames
 * @returns
 */
declare function getPostByLabelInternal(this: Hexo__default & Record<string, any>, by: 'tags' | 'categories', filternames: string[]): Record<string, string>[];
declare function getPostByLabel(hexo: Hexo__default): void;

export { getPostByLabel, getPostByLabelInternal };
