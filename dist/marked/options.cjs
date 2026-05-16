'use strict';

const defaultRendererMarkedOptions = {
    cache: false,
    gfm: true,
    pedantic: false,
    breaks: true,
    smartLists: true,
    smartypants: true,
    modifyAnchors: 0,
    autolink: true,
    mangle: true,
    sanitizeUrl: false,
    dompurify: false,
    headerIds: true,
    anchorAlias: false,
    lazyload: false,
    prependRoot: true,
    postAsset: false,
    external_link: {
        enable: false,
        exclude: [],
        nofollow: false
    },
    descriptionLists: true
};

exports.defaultRendererMarkedOptions = defaultRendererMarkedOptions;
