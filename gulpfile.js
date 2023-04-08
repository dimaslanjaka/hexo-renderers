const { spawnAsync } = require('git-command-helper');
const gulp = require('gulp');
const path = require('path');

gulp.task('default', function () {
  return gulp
    .src(['**/*.*'], { cwd: path.join(__dirname, 'src'), ignore: ['**/*.js', '**/*.ts'] })
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('commit', async function () {
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
});
