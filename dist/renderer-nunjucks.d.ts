/**
 * hexo-renderer-nunjucks
 * @param {import('hexo')} hexo
 */
export function rendererNunjucks(hexo: import('hexo')): {
    render: {
        (data: import('hexo').PageData, locals: import('hexo').Locals): string;
        compile: (data: import('hexo').PageData) => {
            (context?: object | undefined): string;
            (context?: object | undefined, callback?: nunjucks.TemplateCallback<string> | undefined): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: import('hexo').PageData) => {
        (context?: object | undefined): string;
        (context?: object | undefined, callback?: nunjucks.TemplateCallback<string> | undefined): void;
    };
};
import nunjucks = require("nunjucks");
