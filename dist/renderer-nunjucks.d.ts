import nunjucks from 'nunjucks';
import Hexo from 'hexo';
import { PageSchema } from 'hexo/dist/types';
import { HexoLocalsData, HexoRenderData } from './helper/hexoLocalsData.js';
/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
export declare function rendererNunjucks(hexo: Hexo): {
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
export default rendererNunjucks;
