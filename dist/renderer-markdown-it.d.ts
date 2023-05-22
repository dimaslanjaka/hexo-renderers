import Hexo from 'hexo';
declare const defaultMarkdownOptions: {
    markdown: {
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
            options: {
                shortcuts: {
                    laughing: string;
                };
                includeLevel?: undefined;
            };
        } | {
            name: string;
            options: {
                includeLevel: number[];
                shortcuts?: undefined;
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
};
export type { defaultMarkdownOptions };
/**
 * hexo-renderer-markdown-it
 * @param hexo
 */
export default function rendererMarkdownIt(hexo: Hexo): void;
