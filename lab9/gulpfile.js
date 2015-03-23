var gulp = require('gulp');
var pi = require('gulp-load-plugins')();

var paths = {
  css: '*.css',
  js: ['scripts/*.js', 'spec/*.js', '!spec/*-stub.js']
};

gulp.task('csslint', function () {
  return gulp.src(paths.css).
    pipe(pi.csslint({ids: false})).
    pipe(pi.csslint.reporter());
});

gulp.task('jshint', function () {
  return gulp.src(paths.js).
    pipe(pi.jshint()).
    pipe(pi.jshint.reporter('default'));
});

gulp.task('test', function () {
  return gulp.src(paths.js).
    pipe(pi.jasmine());
});
