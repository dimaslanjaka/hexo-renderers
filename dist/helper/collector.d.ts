import Hexo from 'hexo';
import { HexoLocalsData } from './hexoLocalData';
export declare function postDataFilePath(hexo: Hexo): string;
/**
 * load existing database
 */
export declare function loadPostData(hexo: Hexo): void;
export declare function collectorPost(post: HexoLocalsData, hexo: Hexo): Promise<void>;
