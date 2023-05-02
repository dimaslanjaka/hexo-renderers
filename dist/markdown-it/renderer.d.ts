import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
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
    render(data: StoreFunctionData, _options: any): string;
}
export default Renderer;
