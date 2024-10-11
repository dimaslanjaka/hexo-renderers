import Hexo__default from 'hexo';
import { HexoLocalsData } from './hexoLocalsData.cjs';

/**
 * get post database path
 * @param hexo
 * @returns
 */
declare function postDataFilePath(hexo: Hexo__default): string;
/**
 * load existing database (initial only)
 */
declare function loadPostData(hexo: Hexo__default): void;
/**
 * get loaded post data (getter)
 * @returns
 */
declare const getPostData: () => HexoLocalsData[];
declare function collectorPost(post: HexoLocalsData, hexo: Hexo__default): Promise<void>;

export { collectorPost, getPostData, loadPostData, postDataFilePath };
