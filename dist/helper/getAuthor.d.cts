import * as Hexo from 'hexo';

declare function getAuthor(hexo: Hexo): void;
declare function getTheAuthor(authorObj: Record<string, any> | string): string | undefined;

export { getAuthor, getTheAuthor };
