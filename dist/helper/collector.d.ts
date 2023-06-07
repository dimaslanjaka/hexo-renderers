import Hexo from 'hexo';
import { HexoLocalsData } from './hexoLocalData';
export declare function postDataFilePath(hexo: Hexo): string;
/**
 * load existing database (initial only)
 */
export declare function loadPostData(hexo: Hexo): void;
export declare const getPostData: () => HexoLocalsData[];
export declare function collectorPost(post: HexoLocalsData, hexo: Hexo): Promise<void>;
