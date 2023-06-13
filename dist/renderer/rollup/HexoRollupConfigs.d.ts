export = HexoRollupConfigs;
declare class HexoRollupConfigs {
    constructor(ctx: any);
    ctx: any;
    site(): any;
    theme(): any;
    overrideTheme(): any;
    merged(): any;
}
declare namespace HexoRollupConfigs {
    export { Hexo };
}
type Hexo = NodeJS.EventEmitter;
