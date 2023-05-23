import Hexo from 'hexo';
import MarkdownIt from 'markdown-it';
export declare const defaultMarkdownOptions: {
    preset: MarkdownIt.PresetName;
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
        options: {
            shortcuts: {
                laughing: string;
            };
        };
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
export default function rendererMarkdownIt(hexo: Hexo): void;
