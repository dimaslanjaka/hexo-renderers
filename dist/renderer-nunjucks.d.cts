import nunjucks from 'nunjucks';
import Hexo__default from 'hexo';
import { PageSchema } from 'hexo/dist/types';
import { HexoLocalsData, HexoRenderData } from './helper/hexoLocalsData.cjs';

/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
declare function rendererNunjucks(hexo: Hexo__default): {
    render: {
        (data: PageSchema & Record<string, any>, locals: Partial<HexoLocalsData> & Record<string, any>): string;
        compile: (data: HexoRenderData & Record<string, any>) => {
            (context?: object): string;
            (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: HexoRenderData & Record<string, any>) => {
        (context?: object): string;
        (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
    };
};

export { rendererNunjucks as default, rendererNunjucks };
