'use strict';

var module$1 = require('module');
var path = require('path');
var pug = require('pug');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var pug__namespace = /*#__PURE__*/_interopNamespaceDefault(pug);

if (typeof require === 'undefined')
    global.require = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('renderer-pug.cjs', document.baseURI).href)));
/**
 * hexo-renderer-pug
 * @param hexo
 */
function rendererPug(hexo) {
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
    const hasProp = (fn, prop) => Object.prototype.hasOwnProperty.call(fn, prop);
    const invalidKeys = Object.keys(config).filter((k) => !hasProp(defaultConfig, k));
    if (invalidKeys.length > 0) {
        throw Error(`Unsupported PUG config keys: ${invalidKeys.join(', ')}`);
    }
    function pugCompile(data) {
        const opts = Object.assign(Object.assign({}, config.compile), { filename: data.path // always used
         });
        return pug__namespace.compile(data.text, opts);
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

exports.rendererPug = rendererPug;
