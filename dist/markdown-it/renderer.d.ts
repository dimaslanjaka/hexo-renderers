export = Renderer;
declare class Renderer {
    /**
     * constructor
     *
     * @param {*} hexo context of hexo
     */
    constructor(hexo: any);
    hexo: any;
    parser: any;
    disableNunjucks: boolean;
    render(data: any, options: any): any;
}
