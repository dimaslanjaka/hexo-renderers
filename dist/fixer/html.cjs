'use strict';

var ansiColors = require('ansi-colors');
var cheerio = require('cheerio');
var sbgUtility = require('sbg-utility');
var path = require('upath');
var config = require('../config.cjs');
var htmlTags = require('../markdown-it/html-tags.cjs');

const escapeHtml = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};
/**
 * Fix generated html
 * @param html
 * @returns
 */
function htmlFixer(html, data) {
    const hexo = this;
    const useCache = config(this).fix.cache;
    let cacheKey = '';
    if (data.path) {
        cacheKey = sbgUtility.normalizePath(data.path).replace(sbgUtility.normalizePath(hexo.base_dir), '');
    }
    if (data.text)
        cacheKey += '-' + sbgUtility.md5(data.text);
    const cacheUnit = new sbgUtility.persistentCache({
        base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
        name: 'html-fixer',
        persist: true,
        memory: false
    });
    if (useCache) {
        const cacheValue = cacheUnit.getSync(cacheKey, '');
        if (cacheValue !== '')
            return cacheValue;
    }
    const $ = cheerio.load(html);
    // Fix local post asset folder
    const tagsHasSelector = [
        'img[src]',
        'script[src]',
        'iframe[src]',
        'audio[src]',
        'video[src]',
        'source[src]',
        'track[src]',
        'embed[src]'
    ];
    // Iterate over each selector and find matching elements
    tagsHasSelector.forEach((selector) => {
        $(selector).each((index, element) => {
            let src = $(element).attr('src');
            if (src) {
                // prefix with http
                if (src.startsWith('//')) {
                    src = 'http://' + src;
                }
                // skip /node_modules transformation
                if (src.startsWith('/node_modules'))
                    return;
                if (!sbgUtility.isValidHttpUrl(src) && !src.startsWith(hexo.config.root)) {
                    // hexo.log.info(`${selector} found with invalid http src: ${src}`);
                    const finalSrc = path.join(hexo.config.root, src);
                    hexo.log.info(`fix PAF (${selector})`, src, '->', finalSrc);
                    const escaped = sbgUtility.escapeRegex(src);
                    html = html.replace(new RegExp(escaped), finalSrc);
                }
            }
        });
    });
    const anchorInvalidHtmlTags = [];
    $('a').each((_i, anchor) => {
        // Select all tags inside the current anchor
        const innerTags = $(anchor).find('*');
        // Process inner tags as needed
        innerTags.each((_i, element) => {
            const tagName = element.tagName.toLowerCase();
            if (!htmlTags.resolveValidHtmlTags.call(hexo).includes(tagName)) {
                const regex = new RegExp('</?' + sbgUtility.escapeRegex(tagName) + '>', 'gm');
                anchorInvalidHtmlTags.push({ regex, tagName });
            }
        });
    });
    // Escape invalid html tags inside anchor
    const results = anchorInvalidHtmlTags.map(({ regex, tagName }) => {
        const result = html.match(regex);
        if (typeof hexo != 'undefined') {
            hexo.log.warn(`found invalid html tags "a > ${tagName}"`, ansiColors.magentaBright(new String(regex).toString()), ansiColors.redBright(Array.from(result).join(', ')));
        }
        return { regex, result };
    });
    // Flatten the results and filter out null values
    const matches = results.flat();
    for (let i = 0; i < matches.length; i++) {
        const regex_result = matches[i];
        if (regex_result.result) {
            for (let i = 0; i < regex_result.result.length; i++) {
                const replacement = escapeHtml(regex_result.result[i]);
                // console.log(regex_result.regex, replacement);
                html = html.replace(regex_result.regex, replacement);
            }
        }
    }
    cacheUnit.set(cacheKey, html);
    return html;
}

exports.escapeHtml = escapeHtml;
exports.htmlFixer = htmlFixer;
