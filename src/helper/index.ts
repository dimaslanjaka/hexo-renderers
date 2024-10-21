import fs from 'fs';
import Hexo from 'hexo';
import * as hexoUtil from 'hexo-util';
import { StoreFunction } from 'hexo/dist/extend/renderer-d.js';
import type { PageSchema } from 'hexo/dist/types';
import lodash from 'lodash';
import { createRequire } from 'module';
import path from 'path';
import yaml from 'yaml';
import * as date from './date.js';
import { getAuthor } from './getAuthor.js';
import { getPostByLabel } from './getPostByLabel.js';
import { partialWithLayout } from './partial.js';
import { getRelatedPosts } from './related-posts.js';

if (typeof require === 'undefined') global.require = createRequire(import.meta.url);
const _toArray = lodash.toArray;

export const BASE_DIR = typeof hexo === 'undefined' ? process.cwd() : hexo.base_dir;

const configFile = path.join(BASE_DIR, '_config.yml');
let config: import('hexo')['config'] = {} as any;
if (fs.existsSync(configFile)) {
  if (typeof hexo === 'undefined') {
    config = yaml.parse(fs.readFileSync(configFile, 'utf-8'));
  } else {
    config = hexo.config;
  }
}

const THEME_LOCATION = path.join(process.cwd(), 'themes', config.theme || 'landscape');
const _THEME_SCRIPTS = path.join(THEME_LOCATION, 'scripts');

// loadScripts(THEME_SCRIPTS);

/**
 * load all scripts
 * @param base
 */
export function loadScripts(base: string) {
  if (fs.existsSync(base)) {
    fs.readdirSync(base).forEach((p) => {
      const full = path.join(base, p);
      if (fs.statSync(full).isFile()) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require(full);
      } else if (fs.statSync(full).isDirectory()) {
        loadScripts(full);
      }
    });
  }
}

export function isObject(value: any) {
  return typeof value === 'object' && value !== null && value !== undefined;
}

export function toArray(value: any) {
  if (isObject(value) && typeof value.toArray === 'function') {
    return value.toArray();
  } else if (Array.isArray(value)) {
    return value;
  }

  return _toArray(value);
}

function json_config() {
  const hexo = this;
  const { config, theme, url_for } = hexo;
  const theme_config = {
    hostname: new URL(config.url).hostname || config.url,
    root: config.root
  };
  const hexo_config = {
    homepage: url_for('/')
  };
  return {
    theme: Object.assign(theme, theme_config),
    project: Object.assign(config, hexo_config)
  };
}

/**
 * register custom helpers
 * @param hexo
 */
export function registerCustomHelper(hexo: Hexo) {
  hexo.extend.helper.register('toArray', toArray as StoreFunction);
  hexo.extend.helper.register('isObject', isObject as StoreFunction);
  getRelatedPosts(hexo);
  getAuthor(hexo);
  getPostByLabel(hexo);

  /**
   * Export theme config
   */
  hexo.extend.helper.register('json_config', json_config as StoreFunction);

  // json_data('main', json_config())
  hexo.extend.helper.register('json_data', function (name, ...data) {
    const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
    return `<script class="json-config" data-name="${name}" type="application/json">${JSON.stringify(json).replace(/</g, '\\u003c')}</script>`;
  });

  hexo.extend.helper.register('getPosts', function getPosts() {
    const page = this['page'] as (PageSchema & Record<string, any>) | undefined;
    return page?.posts;
  });

  hexo.extend.helper.register('partialWithLayout', partialWithLayout as StoreFunction);
  hexo.extend.helper.register('date', date.date);
  //hexo.extend.helper.register('format_date', date.date);
  //hexo.extend.helper.register('date_format', date.date);
  hexo.extend.helper.register('date_xml', date.date_xml);
  hexo.extend.helper.register('time', date.time);
  hexo.extend.helper.register('full_date', date.full_date);
  hexo.extend.helper.register('relative_date', date.relative_date);
  hexo.extend.helper.register('time_tag', date.time_tag);
  hexo.extend.helper.register('moment', date.moment as unknown as StoreFunction);
  hexo.extend.helper.register('url_for', hexoUtil.url_for);
  for (const key in hexoUtil) {
    if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
      const helper = (<Record<string, any>>hexoUtil)[key];
      if (typeof helper === 'function') hexo.extend.helper.register(key, helper);
    }
  }
}
