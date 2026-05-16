'use strict';

var hexoUtil = require('hexo-util');
var marked_esm = require('../dependencies/marked/lib/marked.esm.cjs');
var path = require('upath');

const { encodeURL, isExternalLink, slugize, stripHTML, unescapeHTML: unescape, url_for } = hexoUtil;
const rATag = /<a(?:\s+?|\s+?[^<>]+\s+?)?href=["'](?:#)([^<>"']+)["'][^<>]*>/i;
const rDlSyntax = /(?:^|\s)(\S.+)<br>:\s+(\S.+)/;
const anchorId = (strOrObject, transformOption) => {
    const str = typeof strOrObject === 'string' ? strOrObject : strOrObject.text;
    // console.log({ str }); // { str: 'Hello world' } // marked ^12
    return slugize(stripHTML(unescape(str)).trim(), { transform: transformOption });
};
function mangleEmail(text) {
    let out = '';
    let ch;
    const l = text.length;
    for (let i = 0; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
            ch = 'x' + ch.toString(16);
        }
        out += '&#' + ch + ';';
    }
    return out;
}
class MarkedRenderer extends marked_esm.Renderer {
    // Add id attribute to headings
    heading({ text, depth }) {
        const { anchorAlias, headerIds, modifyAnchors, _headingId } = this.options;
        if (!headerIds) {
            return `<h${depth}>${text}</h${depth}>`;
        }
        const transformOption = modifyAnchors;
        let id = anchorId(text, transformOption);
        const headingId = _headingId;
        const anchorAliasOpt = anchorAlias && text.startsWith('<a href="#');
        if (anchorAliasOpt) {
            const customAnchor = text.match(rATag)[1];
            id = anchorId(customAnchor, transformOption);
        }
        // Add a number after id if repeated
        if (headingId[id]) {
            id += `-${headingId[id]++}`;
        }
        else {
            headingId[id] = 1;
        }
        if (anchorAliasOpt) {
            text = text.replace(rATag, (str, alias) => {
                return str.replace(alias, id);
            });
        }
        // add headerlink
        return `<h${depth} id="${id}"><a href="#${id}" class="headerlink" title="${stripHTML(text)}"></a>${text}</h${depth}>`;
    }
    link({ href, title, text }) {
        const { external_link, sanitizeUrl, hexo, mangle } = this.options;
        const { url: urlCfg } = hexo.config;
        if (sanitizeUrl) {
            if (href.startsWith('javascript:') || href.startsWith('vbscript:') || href.startsWith('data:')) {
                href = '';
            }
        }
        if (mangle) {
            if (href.startsWith('mailto:')) {
                const email = href.substring(7);
                const mangledEmail = mangleEmail(email);
                href = `mailto:${mangledEmail}`;
            }
        }
        let out = '<a href="';
        try {
            out += encodeURL(href);
        }
        catch (_e) {
            out += href;
        }
        out += '"';
        if (title) {
            out += ` title="${title}"`;
        }
        if (external_link) {
            const target = ' target="_blank"';
            const noopener = ' rel="noopener"';
            const nofollowTag = ' rel="noopener external nofollow noreferrer"';
            if (isExternalLink.bind(hexo)(href, urlCfg, external_link.exclude)) {
                if (external_link.enable && external_link.nofollow) {
                    out += target + nofollowTag;
                }
                else if (external_link.enable) {
                    out += target + noopener;
                }
                else if (external_link.nofollow) {
                    out += nofollowTag;
                }
            }
        }
        out += `>${text}</a>`;
        return out;
    }
    // Support Basic Description Lists
    paragraph({ text }) {
        const { descriptionLists = true } = this.options;
        if (descriptionLists) {
            if (rDlSyntax.test(text)) {
                return text.replace(rDlSyntax, '<dl><dt>$1</dt><dd>$2</dd></dl>');
            }
        }
        return `<p>${text}</p>\n`;
    }
    // Prepend root to image path
    image({ href, title, text }) {
        const options = this.options;
        const { hexo } = options;
        const { relative_link } = hexo.config;
        const { lazyload, figcaption, prependRoot, postPath } = options;
        if (!/^(#|\/\/|http(s)?:)/.test(href) && !relative_link && prependRoot) {
            if (!href.startsWith('/') && !href.startsWith('\\') && postPath) {
                const PostAsset = hexo.model('PostAsset');
                // findById requires forward slash
                const asset = PostAsset.findById(path.join(postPath, href.replace(/\\/g, '/')));
                // asset.path is backward slash in Windows
                if (asset)
                    href = asset.path.replace(/\\/g, '/');
            }
            href = url_for.call(hexo, href);
        }
        let out = `<img src="${encodeURL(href)}"`;
        if (text)
            out += ` alt="${text}"`;
        if (title)
            out += ` title="${title}"`;
        if (lazyload)
            out += ' loading="lazy"';
        out += '>';
        if (figcaption && text) {
            return `<figure>${out}<figcaption aria-hidden="true">${text}</figcaption></figure>`;
        }
        return out;
    }
}

exports.MarkedRenderer = MarkedRenderer;
