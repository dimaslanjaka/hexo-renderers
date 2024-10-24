const { spawnAsync } = require('git-command-helper');
const gulp = require('gulp');
const path = require('path');

exports.default = function () {
  return gulp
    .src(['**/*.*'], { cwd: path.join(__dirname, 'src'), ignore: ['**/*.{ts,ts,cjs,mjs}'] })
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
};

exports.commit = async function () {
  // git add dist release
  // to get commits between two commits
  // ex: https://github.com/dimaslanjaka/hexo-renderers/compare/edc31272058871caca481a01d14798ce304368c5...6ec53581e4b5b0d6a61ecdb142ef226cb1651905
  const repo = 'https://github.com/dimaslanjaka/hexo-renderers';
  await spawnAsync('git', ['fetch']);
  const lastRemoteCommitID = (
    await spawnAsync('git', ['rev-parse', '--short', 'origin/master'], { cwd: __dirname })
  ).stdout.trim();
  const lastCurrentCommitID = (
    await spawnAsync('git', ['rev-parse', '--short', 'HEAD'], { cwd: __dirname })
  ).stdout.trim();
  // console.log(lastRemoteCommitID, lastCurrentCommitID);
  const urlBetweenCommits = `${repo}/compare/${lastRemoteCommitID}...${lastCurrentCommitID}`;
  // console.log(urlBetweenCommits);
  await spawnAsync('git', ['add', 'dist', 'release'], { cwd: __dirname });
  await spawnAsync('git', ['commit', '-m', 'chore: update build', '-m', 'changelog ' + urlBetweenCommits], {
    cwd: __dirname
  });
};

exports['test-render'] = function () {
  /**
   * @param {gulp.TaskFunctionCallback} testCb
   */
  const run = function (testCb) {
    spawnAsync('npm', ['run', 'build'])
      .then(() =>
        spawnAsync('node', ['-r', 'ts-node/register', 'test/render-sample.ts'], { stdio: 'inherit' }).then(() =>
          testCb()
        )
      )
      .catch(testCb);
  };
  run(() => gulp.watch(['src/**/*.*', 'test/**/*.*', '!**/node_modules/**', '!**/dist/**', '!**/tmp/**'], run));
};
