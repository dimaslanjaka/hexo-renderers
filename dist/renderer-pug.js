import { createRequire } from 'module';
import * as path from 'path';
import * as pug from 'pug';
if (typeof require === 'undefined')
    global.require = createRequire(import.meta.url);
/**
 * hexo-renderer-pug
 * @param hexo
 */
export function rendererPug(hexo) {
    const configPath = path.join(process.cwd(), 'pug.config');
    const defaultConfig = { compile: {} }; // avoids key errors
    let hasConfig = true;
    try {
        require.resolve(configPath);
    }
    catch (_a) {
        hasConfig = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = hasConfig ? require(configPath) : defaultConfig;
    // Validate non-standard keys -- e.g. 'compile'.
    const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    const invalidKeys = Object.keys(config).filter((k) => !hasProp(defaultConfig, k));
    if (invalidKeys.length > 0) {
        throw Error(`Unsupported PUG config keys: ${invalidKeys.join(', ')}`);
    }
    function pugCompile(data) {
        const opts = Object.assign(Object.assign({}, config.compile), { filename: data.path // always used
         });
        return pug.compile(data.text, opts);
    }
    /**
     * @param {import('./helper/hexoLocalsData').HexoLocalsData} data
     * @param {Record<string, any>} locals
     * @returns
     */
    function pugRenderer(data, locals) {
        return pugCompile(data)(locals);
    }
    pugRenderer.compile = pugCompile;
    hexo.extend.renderer.register('pug', 'html', pugRenderer, true);
    return pugRenderer;
}
export default rendererPug;
