import Hexo__default from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it';

declare const escapeHtml: (str: string) => string;
type MarkdownItRendererOptions = string | {
    name: string;
    options?: Record<string, any>;
};
declare class Renderer {
    parser: MarkdownIt;
    hexo: Hexo__default;
    disableNunjucks: boolean;
    /**
     * constructor
     *
     * @param hexo context of hexo
     */
    constructor(hexo: Hexo__default);
    render(data: StoreFunctionData, _options: any): string;
}

export { type MarkdownItRendererOptions, Renderer as default, escapeHtml };
