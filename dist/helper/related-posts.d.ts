/**
 * get index of array of objects by property
 * @param array
 * @param searchTerm
 * @param property
 * @returns
 */
export declare function objectArrayIndexOf<T extends any[]>(array: T, searchTerm: string, property: string): number;
/**
 * populate related posts
 */
export declare function getRelatedPosts(hexo: import('hexo')): void;
