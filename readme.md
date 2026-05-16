# hexo-renderers
All in one theme renderers and helpers for hexo. Load all hexo renderer engines at once.

## Features
<!-- - use hexo helpers inside post (`full_url`, `url_for`, etc) -->
- use any type layout inside source
- more custom helpers
- related post helpers [examples](https://github.com/dimaslanjaka/site/tree/hexo-renderers/views)
- auto fix post assets folder
- renderer cache strategy

## Requirements

Custom `markdown-it` from [https://github.com/dimaslanjaka/markdown-it](https://github.com/dimaslanjaka/markdown-it/tree/master/release)

> This only required when you add `markdown-it` on `_config_yml.renderers.engine`

<pre><code>yarn add markdown-it@https://github.com/dimaslanjaka/markdown-it/raw/7f4f9d5ec08ebcfde42affb517ea7c8e6a305534/release/markdown-it.tgz</code></pre>

> Change **hash** with latest commit hash
>
> Why must change?
>
> Original `markdown-it` now only support for ESM, we need shim `markdown-it` into CommonJS

## Specify renderers

You can specify some renderers by `_config.yml`

```yaml
renderers:
  engines: ['ejs', 'stylus', 'nunjucks', 'dartsass', 'pug', 'sass', 'markdown-it', 'rollup', 'marked']
  generator:
    # enable generate <domain>/meta.json
    - meta
    # enable generate related posts
    - related-posts
  fix:
    # Fix html
    # - fix invalid post asset folder path
    # - escape invalid html tags into html entities
    html: false
    # Toggle cache
    cache: false
  # when _config_yml.renderers.fix.html is true
  # this plugin transforming unknown tags into html entities
  # add custom html tag names to avoid from transformation
  # reference src\markdown-it\renderer.ts
  # reference src\markdown-it\html-tags.js
  html_tags: ['customtag', 'custom-html-tag']
```

## Configurations

### Markdown

#### markdown-it

Configuration for `markdown-it` engine

```yaml
markdown:
  preset: default
  # Toggle render nunjucks in markdown
  disableNunjucks: true
  render:
    html: true
    xhtmlOut: false
    # prefix class of <pre><code class="language-">
    langPrefix: language-
    breaks: true
    # auto convert url plaintext into anchor
    linkify: false
    typographer: true
    quotes: “”‘’
    # Toggle cache
    cache: true
  enable_rules: null
  disable_rules: null
  plugins:
    - markdown-it-abbr
    - markdown-it-attrs
    - markdown-it-bracketed-spans
    - markdown-it-sup
    - markdown-it-cjk-breaks
    - markdown-it-sub
    - markdown-it-deflist
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-mark
    - name: "@renbaoshuo/markdown-it-katex"
      options:
        skipDelimitersCheck: true
    - name: markdown-it-emoji
      options:
        shortcuts:
          laughing: :D
          smile: [":)", ":-)"]
    # - name: markdown-it-table-of-contents
    #   options:
    #     includeLevel:
    #       - 1
    #       - 2
    #       - 3
    #       - 4
    #       - 5
    #       - 6
  anchors:
    level: 2
    collisionSuffix: ""
    permalink: false
    permalinkClass: header-anchor
    permalinkSide: left
    permalinkSymbol: ¶
    case: 0
    separator: "-"
  images:
    lazyload: false
    prepend_root: false
    post_asset: true
  inline: false  # https://markdown-it.github.io/markdown-it/#MarkdownIt.renderInline
```

#### marked

This marked renderer is improved from [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked/tree/master#options).

Configuration for `marked` engine [same as hexo-renderer-marked - read here](https://github.com/hexojs/hexo-renderer-marked/tree/master#options)

> **NOTE**: this plugin add `cache` options

```yaml
marked:
  cache: true # default false
  # rest of marked options
```

### SASS

> - `dartsass` improved from [hexo-renderer-dartsass](https://github.com/KentarouTakeda/hexo-renderer-dartsass/blob/master/README.md)
> - `sass` improved from [hexo-renderer-sass](https://github.com/knksmith57/hexo-renderer-sass#_configyml)

set config for your desired renderer engine.

- [hexo-renderer-dartsass](https://github.com/KentarouTakeda/hexo-renderer-dartsass/blob/master/README.md)
- [hexo-renderer-sass](https://github.com/knksmith57/hexo-renderer-sass#_configyml)

## Changelog

### 3.0.1

- Drop activating all engines by default. All engine follows `_config_yml.renderers.engine`
- Separate html fixer
- Fix post asset folder fixer

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

