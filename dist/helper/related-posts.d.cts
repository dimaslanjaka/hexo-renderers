import * as Hexo from 'hexo';

/**
 * get index of array of objects by property
 * @param array
 * @param searchTerm
 * @param property
 * @returns
 */
declare function objectArrayIndexOf<T extends any[]>(array: T, searchTerm: string, property: string): number;
/**
 * populate related posts
 * @param hexo hexo instance
 */
declare function getRelatedPosts(hexo: Hexo): void;

export { getRelatedPosts, objectArrayIndexOf };
