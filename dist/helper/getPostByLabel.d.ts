import Hexo from 'hexo';
/**
 * hexo get post by key with name
 * @param by
 * @param filternames
 * @returns
 */
export declare function getPostByLabelInternal(this: Hexo & Record<string, any>, by: 'tags' | 'categories', filternames: string[]): Record<string, string>[];
export declare function getPostByLabel(hexo: Hexo): void;
