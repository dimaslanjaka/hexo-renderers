import Hexo__default from 'hexo';
import { RollupOptions } from 'rollup';

declare class HexoRollupConfigs {
    ctx: Hexo__default;
    constructor(ctx: Hexo__default);
    site(): any;
    theme(): any;
    overrideTheme(): any;
    merged(): RollupOptions;
}

export { HexoRollupConfigs };
