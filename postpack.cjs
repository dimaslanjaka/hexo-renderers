const path = require('path');
const fs = require('fs-extra');
const pkg = require('./package.json');

// update dependencies to workspace
pkg.dependencies['markdown-it'] = 'workspace:^';
pkg.resolutions['markdown-it'] = 'workspace:^';
pkg.overrides['markdown-it'] = 'workspace:^';
fs.writeFileSync(path.resolve(__dirname, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
