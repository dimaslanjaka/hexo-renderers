const path = require('path');

const pluginPath = path.join(__dirname, '../dist/index.cjs');

console.log(require(pluginPath));
