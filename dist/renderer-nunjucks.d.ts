/**
 * hexo-renderer-nunjucks
 * @param {import('hexo')} hexo
 */
export function rendererNunjucks(hexo: import('hexo')): {
    render: {
        (data: any, locals: any): string;
        compile: (data: any) => {
            (context?: object | undefined): string;
            (context?: object | undefined, callback?: nunjucks.TemplateCallback<string> | undefined): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: any) => {
        (context?: object | undefined): string;
        (context?: object | undefined, callback?: nunjucks.TemplateCallback<string> | undefined): void;
    };
};
import nunjucks = require("nunjucks");
