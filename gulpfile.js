const rollup = require('rollup');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const minify = require('gulp-babel-minify');
const del = require('del');

const packages = [
  'button',
  'card',
  'checkbox',
  'fab',
  'footer',
  'header',
  'icon',
  'icons',
  'input',
  'link',
  'notification',
  'radio',
  'select',
  'slider',
  'styles',
  'tag',
  'toggle',
  'utils'
];
const paths = packages.map(package => ({
  src: `packages/${package}/${package}.js`,
  dest: `packages/${package}/${package}.min.js`
}));

gulp.task('build', build);

function build() {
  return gulp
    .src(paths[0].src)
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .pipe(gulp.dest(paths[0].dest));
}
