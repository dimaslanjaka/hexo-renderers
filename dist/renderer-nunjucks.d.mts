import { HexoRenderData } from './helper/hexoLocalsData.mjs';
import * as Hexo from 'hexo';
import nunjucks from 'nunjucks';

/**
 * hexo-renderer-nunjucks
 * @param {import('hexo')} hexo
 */
declare function rendererNunjucks(hexo: Hexo): {
    render: {
        (data: Hexo.PageData, locals: Hexo.Locals): string;
        compile: (data: HexoRenderData) => {
            (context?: object): string;
            (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: HexoRenderData) => {
        (context?: object): string;
        (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
    };
};

export { rendererNunjucks };
