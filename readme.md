# hexo-renderers
All in one hexo renderers. Load all hexo renderer engines at once.

## Features
<!-- - use hexo helpers inside post (`full_url`, `url_for`, etc) -->
- use any type layout inside source
- more custom helpers

## Specify renderers
You can specify some renderers by `_config.yml`
```yaml
renderers: ['ejs', 'stylus', 'nunjucks', 'dartsass', 'pug', 'sass', 'markdown-it']
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
