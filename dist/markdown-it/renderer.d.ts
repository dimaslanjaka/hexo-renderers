import Hexo from 'hexo';
import MarkdownIt from 'markdown-it';
declare class Renderer {
    parser: MarkdownIt;
    hexo: Hexo;
    disableNunjucks: boolean;
    /**
     * constructor
     *
     * @param hexo context of hexo
     */
    constructor(hexo: Hexo);
    render(data: Hexo.PageData | Hexo.extend.RendererData, options: any): string;
}
export default Renderer;
