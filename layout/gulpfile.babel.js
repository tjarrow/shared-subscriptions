import gulp from 'gulp';
import config from './gulp-config';

import mergeJSON from 'gulp-merge-json'
import plumber from 'gulp-plumber'; // Prevent pipe breaking caused by errors from gulp plugins
import nunjucks from 'gulp-nunjucks-render';
import data from 'gulp-data';
import prettify from 'gulp-html-prettify';
import rigger from 'gulp-rigger';
import notify from 'gulp-notify';
import inlinesource from 'gulp-inline-source';
import connect from 'gulp-connect';
import sourcemaps from 'gulp-sourcemaps';
//import less from 'gulp-less';
import gulpConcat from 'gulp-concat';
import groupMedia from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import importFresh from 'import-fresh';
import webp from 'gulp-webp';
import webphtml from './gulp-task/gulp-webp-html';
import open from 'open';
import filter from 'gulp-filter';

var sass = require('gulp-sass'); 
sass.compiler = require('node-sass');

const runServer = (cb) => {
  connect.server({
    host: config.options.server.host,
    port: config.options.server.port,
    root: config.paths.build.html,
    livereload: true
  });
  cb();
}

const compileJSON = () => 
  gulp.src(['./default-data.json', config.paths.watch.data])
      .pipe(mergeJSON({ fileName: 'data.json' }))
      .pipe(gulp.dest('cached/'));

const compileHTML = () => 
  gulp.src(config.paths.src.html)
      // .pipe(plumber({ errorHandler: notify.onError("HTML build error: <%= error.message %>") }))
      .pipe(data(() => importFresh(config.paths.src.data)))
      .pipe(nunjucks({
        path: config.paths.src.templates,
        data: config.data
      }))
      .pipe(webphtml())
      // .pipe(rigger())
      // .pipe(prettify({
      //   indent_size: 2
      // }))
      .pipe(inlinesource({ compress: false }))
      .pipe(gulp.dest(config.paths.build.html))
      .pipe(connect.reload());

const compileCSS = () =>
  gulp.src(config.paths.src.css)
      .pipe(plumber({ errorHandler: notify.onError("Style build error: <%= error.message %>") }))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(gulpConcat('style.css'))
      .pipe(groupMedia())
      .pipe(autoprefixer(config.options.prefixes, { cascade: true }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.paths.build.css))
      .pipe(connect.reload());


const compileJs = () =>
  gulp.src(config.paths.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.build.js))
    .pipe(connect.reload());

const compileImages = () =>
  gulp.src(config.paths.src.img)
      .pipe(gulp.dest(config.paths.build.img))
      .pipe(connect.reload());

const compileWebp = () => {
  const pngFilter = filter('**/*.png', { restore: true })
  const jpgFilter = filter('**/*.jpg', { restore: true })
  return gulp.src(config.paths.src.img)
             .pipe(pngFilter)
             .pipe(webp(config.options.webp.lossless))
             .pipe(pngFilter.restore)
             .pipe(jpgFilter)
             .pipe(webp(config.options.webp.lossy))
             .pipe(jpgFilter.restore)
             .pipe(gulp.dest(config.paths.build.img));
}


const compileFonts = () =>
  gulp.src(config.paths.src.fonts)
      .pipe(gulp.dest(config.paths.build.fonts))
      .pipe(connect.reload());


const compileFavicon = () =>
  gulp.src(config.paths.src.favicon)
      .pipe(gulp.dest(config.paths.build.favicon));

const clean = (cb) => {
  del.sync(config.paths.build.html);
  cb();
}

const openBrowser = (cb) => {
  open('http://' + config.options.server.host + ':' + config.options.server.port + '/');
  console.log('Browser opening...');
  cb();
}

const watchHTML = () => gulp.watch([config.paths.watch.data, config.paths.watch.html, './default-data.json'], gulp.series(compileJSON, compileHTML));
const watchCSS = () => gulp.watch(config.paths.watch.css, gulp.series(compileCSS));
const watchJs = () => gulp.watch(config.paths.watch.js, gulp.series(compileJs));
const watchImages = () => gulp.watch(config.paths.watch.img, gulp.series(compileWebp, compileImages));
const watchFonts = () => gulp.watch(config.paths.watch.fonts, gulp.series(compileFonts));
const watchFavicon = () => gulp.watch(config.paths.watch.favicon, gulp.series(compileFavicon));
const watchSvgIcon = () => gulp.watch(config.paths.watch.svgicon, gulp.series(compileHTML));

const buildHTML = gulp.series(compileJSON, compileHTML);
const buildStuff = gulp.parallel(compileFavicon, compileFonts, compileJs, compileWebp, compileImages, compileCSS);
const watch = gulp.parallel(watchHTML, watchCSS, watchJs, watchImages, watchFonts, watchFavicon, watchSvgIcon);
watch.description = 'Watch for changes to all sources';

const build = gulp.series(clean, buildHTML, buildStuff);
build.description = 'Build all sources'
const start = gulp.series(build, runServer, openBrowser, watch);

export default start;
export { 
  build, 
  watch 
};
