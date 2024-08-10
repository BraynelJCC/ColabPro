"use strict";
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();
const npmDist = require('gulp-npm-dist');

// Sass Task
function scssTask(){
  return src('src/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    //.pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// Copy Files Tasks
function copyDist() {
  return src(npmDist(), {base:'./node_modules'})
  .pipe(dest('vendors/'));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['dist/js/*.js'], browsersyncReload);
  watch(['src/scss/*.scss'], series(scssTask,  browsersyncReload));
}

// Create Vendor task
exports.vendors = copyDist;

// Default Gulp task
exports.default = series(
  scssTask,
  browsersyncServe,
  watchTask,
);