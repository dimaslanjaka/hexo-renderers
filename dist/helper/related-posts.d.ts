import Hexo from 'hexo';
export declare function listRelatedPosts(this: Hexo, options: {
    maxCount: number;
    /** 'date' | 'updated' */
    orderBy: string;
    isAscending?: any;
}): any[];
export declare function related_posts_helper(hexo: import('hexo')): void;
