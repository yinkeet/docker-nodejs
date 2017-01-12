'use strict';

var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;
var gulp = require('gulp');
var cache = require('gulp-cached');
// var debug = require('gulp-debug');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');

var node;
var reload = false;

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['server'], function() {
  browserSync.init({
      proxy: 'localhost',
      open: false,
    }
  );

  gulp.watch('app/resources/**/sass/*.scss', ['sass']);
  gulp.watch('app/resources/**/js/*.js', ['uglify']);
  gulp.watch(['app/public/*.html', 'app/public/**/*.html']).on('change', browserSync.reload);
  gulp.watch('app/controllers/**/*.js').on('change', function() {
    if (!reload) {
      reload = true;
      spawnServer();
    };
  });
});

gulp.task('server', ['sass', 'uglify'], spawnServer);

function spawnServer() {
  if (node) {
    node.kill();
  };
  node = spawn('node', ['app/bin/server.js'], {stdio: ['inherit', 'inherit', 'inherit', 'ipc']});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  }).on('message', function(data) {
    if (data.process == 'server.js' && data.state == 'listening' && reload) {
      reload = false;
      browserSync.reload();
    };
  });
}

gulp.task('sass', function() {
  return gulp.src('app/resources/**/sass/*.scss')
    .pipe(cache('sass'))
    // .pipe(debug({title: 'sass:'}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(function(file) {
      file.path = file.path.replace('/sass/', '/css/');
      return 'app/public/';
    }))
    .pipe(browserSync.stream());
});

gulp.task('uglify', function(callback) {
  pump([
      gulp.src('app/resources/**/js/*.js'),
      cache('uglify'),
      sourcemaps.init(),
      // debug({title: 'ugilfy:'}),
      rename({ extname: '.min.js' }),
      uglify(),
      sourcemaps.write(),
      gulp.dest('app/public/'),
      browserSync.stream()
    ],
    callback
  );
});

process.on('exit', function() {
  if (node) {
    node.kill();
  }
})