import Hexo__default from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';

declare const defaultMarkdownOptions: {
    preset: string;
    render: {
        html: boolean;
        xhtmlOut: boolean;
        langPrefix: string;
        breaks: boolean;
        linkify: boolean;
        typographer: boolean;
        quotes: string;
    };
    enable_rules: null;
    disable_rules: null;
    plugins: (string | {
        name: string;
        options: Record<string, any>;
    })[];
    anchors: {
        level: number;
        collisionSuffix: string;
        permalink: boolean;
        permalinkClass: string;
        permalinkSide: string;
        permalinkSymbol: string;
        case: number;
        separator: string;
    };
    images: {
        lazyload: boolean;
        prepend_root: boolean;
        post_asset: boolean;
    };
};
/**
 * hexo-renderer-markdown-it
 * @param hexo
 */
declare function rendererMarkdownIt(hexo: Hexo__default): (data: StoreFunctionData, options?: Record<string, any>) => string;

export { rendererMarkdownIt as default, defaultMarkdownOptions };
