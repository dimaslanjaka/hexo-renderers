import { createRequire } from 'module';
import stylus from 'stylus';
const require = createRequire(import.meta.url);
function getProperty(obj, name) {
    name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    const split = name.split('.');
    let key = split.shift();
    if (!key)
        return '';
    if (!Object.prototype.hasOwnProperty.call(obj, key))
        return '';
    let result = obj[key];
    const len = split.length;
    if (!len) {
        if (result === 0)
            return result;
        return result || '';
    }
    if (typeof result !== 'object')
        return '';
    for (let i = 0; i < len; i++) {
        key = split[i];
        if (!Object.prototype.hasOwnProperty.call(result, key))
            return '';
        result = result[split[i]];
        if (typeof result !== 'object')
            return result;
    }
    return result;
}
function applyPlugins(stylusConfig, plugins) {
    plugins.forEach((plugin) => {
        const factoryFn = require(plugin.trim());
        stylusConfig.use(factoryFn());
    });
}
/**
 * @param data
 * @param options
 * @param callback
 */
export function stylusFn(data, options, callback) {
    const self = this;
    // if (typeof self === 'undefined') self = hexo;
    const config = self.config.stylus || {};
    const plugins = ['nib'].concat(config.plugins || []);
    function defineConfig(style) {
        style.define('hexo-config', (data) => {
            return getProperty(self.theme.config, data.val);
        });
    }
    const stylusConfig = stylus(data.text);
    applyPlugins(stylusConfig, plugins);
    stylusConfig
        .use(defineConfig)
        .use((style) => self.execFilterSync('stylus:renderer', style, { context: this }))
        .set('filename', data.path)
        .set('sourcemap', config.sourcemaps)
        .set('compress', config.compress)
        .set('include css', true)
        .render(callback);
}
stylusFn.disableNunjucks = true;
/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
export function rendererStylus(hexo) {
    hexo.extend.renderer.register('styl', 'css', stylusFn);
    hexo.extend.renderer.register('stylus', 'css', stylusFn);
}
