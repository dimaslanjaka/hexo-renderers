/**
 * hexo-renderer-nunjucks
 * @param {import('hexo')} hexo
 */
export function rendererNunjucks(hexo: import("hexo")): {
    render: {
        (data: import("hexo").PageData, locals: import("hexo").Locals): string;
        compile: (data: import("./helper/hexoLocalsData").HexoRenderData) => {
            (context?: object): string;
            (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: import("./helper/hexoLocalsData").HexoRenderData) => {
        (context?: object): string;
        (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
    };
};
import nunjucks = require("nunjucks");
