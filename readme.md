# hexo-renderers
All in one theme renderers and helpers for hexo. Load all hexo renderer engines at once.

## Features
<!-- - use hexo helpers inside post (`full_url`, `url_for`, etc) -->
- use any type layout inside source
- more custom helpers
- related post helpers [examples](https://github.com/dimaslanjaka/site/tree/hexo-renderers/views)
- auto fix post assets folder

## Requirements

Custom `markdown-it` from [https://github.com/dimaslanjaka/markdown-it](https://github.com/dimaslanjaka/markdown-it/tree/master/release)

```bash
yarn add markdown-it@https://github.com/dimaslanjaka/markdown-it/raw/95599a5a20b2f162a776abaa3a0b7f8aaac2f6e1/release/markdown-it.tgz
```

> Change **hash** with latest commit hash
>
> Why must change?
>
> Original `markdown-it` now only support for ESM, we need shim `markdown-it` into CommonJS

## Specify renderers

You can specify some renderers by `_config.yml`

```yaml
renderers:
  engines: ['ejs', 'stylus', 'nunjucks', 'dartsass', 'pug', 'sass', 'markdown-it', 'rollup']
  generator:
    # enable generate <domain>/meta.json
    - meta
    # enable generate related posts
    - related-posts
  # by default, this plugin transforming unknown tags into html entities
  # add custom html tag names to avoid from transformation
  # see src\markdown-it\renderer.ts
  # see src\markdown-it\html-tags.js
  html_tags: ['customtag']
```

## Configurations

### Markdown

```yaml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-deflist
    - markdown-it-emoji
    - markdown-it-katex
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: false
    permalinkClass: header-anchor
    permalinkSymbol: ' '
    permalinkBefore: false
```

> - dartsass improved from `hexo-renderer-dartsass`
> - sass improved from `hexo-renderer-sass`
> when `renderers` is not configured, `hexo-renderer-sass` are being used by default.

## Config each renderer
set config for your desired renderer engine.
- [hexo-renderer-dartsass](https://github.com/KentarouTakeda/hexo-renderer-dartsass/blob/master/README.md)
- [hexo-renderer-sass](https://github.com/knksmith57/hexo-renderer-sass#_configyml)
- [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it/blob/master/README.md)

## Changelog

### 3.0.0
- migrate to ESM with shim for CommonJS

### 2.0.6
- fix: escape **invalid html tag** curly brackets on hyperlink text to html entities
- feat: auto fix post assets folder

### 2.0.5
- chore: disable `rollup` renderer by default

### 2.0.4
- feat: support for hexo 7.3.0
- update dependencies (except markdown-it)

### 2.0.1
- fix maximum call stack exceeded

### 2.0.0
- change options structure
- add `meta.json` generator which available at `http://example.com/meta.json`
- add related post helper

### 1.0.13
- fix: invalid default markdown options

### 1.0.12
- fix: cannot find installed `markdown-it` plugins

### 1.0.5
- improved `dartsass`
- add and improved `hexo-renderer-sass`
- optimize docs

### 1.0.6
- add more helpers

### 1.0.7
- hotfix known issues

### 1.0.8
- add `hexo-renderer-markdown-it`
- hotfix nunjucks renderer
- update dependencies
