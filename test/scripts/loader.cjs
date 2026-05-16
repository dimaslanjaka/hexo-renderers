'use strict';

const fs = require('fs-extra');
const path = require('path');
const { parse, stringify } = require('yaml');

const rootDir = path.join(__dirname, '../test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

/**
 * reload `_config.yml` from `_config.defaults.yml`
 * @param {string} [base] site directory with `_config.defaults.yml` inside
 * @param {Partial<import('hexo')['config']> & Record<string,any>} overriden new config object to be merged
 * @returns {Partial<import('hexo')['config']> & Record<string,any>}
 */
async function reloadHexoConfigYml(base = undefined, overriden = {}) {
  if (!base) base = path.join(__dirname, '../test-site');
  if (!overriden) overriden = {};
  const defaults = parse(fs.readFileSync(path.join(base, '_config.defaults.yml'), 'utf-8'));
  /** @type {import('hexo')['config']} */
  const options = Object.assign(defaults, overriden);
  // save new _config.yml
  fs.writeFileSync(path.join(base, '_config.yml'), stringify(options));
  return options;
}

module.exports.reloadHexoConfigYml = reloadHexoConfigYml;
