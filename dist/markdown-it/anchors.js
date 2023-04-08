'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Token = require('markdown-it/lib/token');
var slugize = require('hexo-util').slugize;
var renderPermalink = function (slug, opts, tokens, idx) {
    var _a, _b;
    var permalink = [
        Object.assign(new Token('link_open', 'a', 1), {
            attrs: [
                ['class', opts.permalinkClass],
                ['href', '#' + slug]
            ]
        }),
        Object.assign(new Token('text', '', 0), {
            content: opts.permalinkSymbol
        }),
        new Token('link_close', 'a', -1),
        Object.assign(new Token('text', '', 0), {
            content: ''
        })
    ];
    if (opts.permalinkSide === 'right') {
        return (_a = tokens[idx + 1].children).push.apply(_a, permalink);
    }
    return (_b = tokens[idx + 1].children).unshift.apply(_b, permalink);
};
var anchor = function (md, opts) {
    Object.assign(opts, { renderPermalink: renderPermalink });
    var titleStore = {};
    var originalHeadingOpen = md.renderer.rules.heading_open;
    var slugOpts = __assign({ transform: opts.case }, opts);
    md.renderer.rules.heading_open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var tokens = args[0], idx = args[1], something = args[2], somethingelse = args[3], self = args[4]; // eslint-disable-line no-unused-vars
        if (tokens[idx].tag.substr(1) >= opts.level) {
            var _tokens$idx = void 0;
            var title = tokens[idx + 1].children.reduce(function (acc, t) {
                return acc + t.content;
            }, '');
            var slug = slugize(title, slugOpts);
            if (Object.prototype.hasOwnProperty.call(titleStore, slug)) {
                titleStore[slug] = titleStore[slug] + 1;
                slug = slug + '-' + opts.collisionSuffix + titleStore[slug].toString();
            }
            else {
                titleStore[slug] = 1;
            }
            ((_tokens$idx = tokens[idx]), !_tokens$idx.attrs && (_tokens$idx.attrs = []), _tokens$idx.attrs).push([
                'id',
                slug
            ]);
            if (opts.permalink) {
                opts.renderPermalink.apply(opts, [slug, opts].concat(args));
            }
        }
        return originalHeadingOpen ? originalHeadingOpen.apply(this, args) : self.renderToken.apply(self, args);
    };
    md.core.ruler.push('clear_anchor_title_store', function () {
        titleStore = {};
    });
};
module.exports = anchor;
