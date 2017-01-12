'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', ['sass:build', 'uglify:build']);

gulp.task('sass:build', function() {
  return gulp.src('app/resources/**/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(function(file) {
      file.path = file.path.replace('/sass/', '/css/');
      return 'app/public/';
    }));
});

gulp.task('uglify:build', function(callback) {
  pump([
      gulp.src('app/resources/**/js/*.js'),
      rename({ extname: '.min.js' }),
      uglify(),
      gulp.dest('app/public/')
    ],
    callback
  );
});