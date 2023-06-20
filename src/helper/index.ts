import fs from 'fs';
import Hexo from 'hexo';
import * as hexoUtil from 'hexo-util';
import lodash from 'lodash';
import path from 'path';
import yaml from 'yaml';
import * as date from './date';
import { getAuthor } from './getAuthor';
import { getPostByLabel } from './getPostByLabel';
import { partialWithLayout } from './partial';
import { getRelatedPosts } from './related-posts';

const _toArray = lodash.toArray;

export const BASE_DIR = typeof hexo === 'undefined' ? process.cwd() : hexo.base_dir;
let config: import('hexo')['config'];
if (typeof hexo === 'undefined') {
  config = yaml.parse(fs.readFileSync(path.join(BASE_DIR, '_config.yml')).toString());
} else {
  config = yaml.parse(fs.readFileSync(path.join(BASE_DIR, '_config.yml')).toString());
}

const THEME_LOCATION = path.join(process.cwd(), 'themes', config.theme || 'landscape');
const _THEME_SCRIPTS = path.join(THEME_LOCATION, 'scripts');

// loadScripts(THEME_SCRIPTS);

/**
 * load all scripts
 * @param base
 */
function _loadScripts(base: string) {
  if (fs.existsSync(base)) {
    fs.readdirSync(base).forEach((p) => {
      const full = path.join(base, p);
      if (fs.statSync(full).isFile()) {
        require(full);
      } else if (fs.statSync(full).isDirectory()) {
        _loadScripts(full);
      }
    });
  }
}

function isObject(value: any) {
  return typeof value === 'object' && value !== null && value !== undefined;
}

function toArray(value: any) {
  if (isObject(value) && typeof value.toArray === 'function') {
    return value.toArray();
  } else if (Array.isArray(value)) {
    return value;
  }

  return _toArray(value);
}

/**
 * register custom helpers
 * @param hexo
 */
export function registerCustomHelper(hexo: Hexo) {
  hexo.extend.helper.register('toArray', toArray);
  hexo.extend.helper.register('isObject', isObject);
  getRelatedPosts(hexo);
  getAuthor(hexo);
  getPostByLabel(hexo);

  /**
   * Export theme config
   */
  hexo.extend.helper.register('json_config', function (this: Hexo & Record<string, any>) {
    const hexo = this;
    const { config, theme, url_for, __ } = hexo;
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
  });

  // json_data('main', json_config())
  hexo.extend.helper.register('json_data', function (name, ...data) {
    const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
    return `<script class="json-config" data-name="${name}" type="application/json">${JSON.stringify(json).replace(/</g, '\\u003c')}</script>`;
  });

  hexo.extend.helper.register('getPosts', function getPosts(this: Hexo) {
    const page = this['page'];
    return page.posts;
  });

  hexo.extend.helper.register('partialWithLayout', partialWithLayout);
  hexo.extend.helper.register('date', date.date);
  //hexo.extend.helper.register('format_date', date.date);
  //hexo.extend.helper.register('date_format', date.date);
  hexo.extend.helper.register('date_xml', date.date_xml);
  hexo.extend.helper.register('time', date.time);
  hexo.extend.helper.register('full_date', date.full_date);
  hexo.extend.helper.register('relative_date', date.relative_date);
  hexo.extend.helper.register('time_tag', date.time_tag);
  hexo.extend.helper.register('moment', date.moment);
  hexo.extend.helper.register('url_for', hexoUtil.url_for);
  for (const key in hexoUtil) {
    if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
      const helper = (<Record<string, any>>hexoUtil)[key];
      hexo.extend.helper.register(key, helper);
    }
  }
}
