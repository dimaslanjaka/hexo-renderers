'use strict';

var ejs = require('ejs');
var index = require('./helper/index.cjs');

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

var ejs__namespace = /*#__PURE__*/_interopNamespaceDefault(ejs);

/**
 * hexo-renderer-ejs
 * @param hexo
 */
function rendererEjs(hexo) {
    if (ejs__namespace.filters)
        ejs__namespace.filters.toArray = index.toArray;
    function ejsRenderer(data, locals) {
        return ejs__namespace.render(data.text, Object.assign({ filename: data.path }, locals));
    }
    ejsRenderer.compile = function (data) {
        return ejs__namespace.compile(data.text, {
            filename: data.path
        });
    };
    hexo.extend.renderer.register('ejs', 'html', ejsRenderer, true);
}

exports.rendererEjs = rendererEjs;
