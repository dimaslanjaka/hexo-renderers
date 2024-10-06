import Hexo from 'hexo';
import { RollupOptions } from 'rollup';
export declare class HexoRollupConfigs {
    ctx: Hexo;
    constructor(ctx: Hexo);
    site(): any;
    theme(): any;
    overrideTheme(): any;
    merged(): RollupOptions;
}
