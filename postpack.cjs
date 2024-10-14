const gch = require('git-command-helper');

gch.spawn('yarn', ['up', 'markdown-it@workspace:^'], { cwd: __dirname, stdio: 'inherit' });
