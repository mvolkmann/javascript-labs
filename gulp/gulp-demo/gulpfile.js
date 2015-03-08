var babel = require('gulp-babel');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var csslint = require('gulp-csslint');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
// Looks like plumber isn't needed with Gulp 4!
//var plumber = require('gulp-plumber');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
  build: 'build',
  css: 'build/**/*.css',
  html: ['index.html', 'src/**/*.html'],
  js: ['src/**/*.js'],
  jsWithTests: ['src/**/*.js', 'test/**/*.js'],
  less: 'src/**/*.less',
  test: 'build/**/*-test.js'
};

gulp.task('clean', function (cb) {
  del(paths.build, cb);
});

gulp.task('connect', function () {
  connect.server({
    port: 1919,
    root: __dirname,
    livereload: true
    // Don't have to manually add livereload script tag to index.html!
  });
});

gulp.task('csslint', function () {
  return gulp.src(paths.css).
    //pipe(plumber()).
    pipe(csslint({
      ids: false
    })).
    pipe(csslint.reporter());
});

gulp.task('eslint', function () {
  return gulp.src(paths.jsWithTests).
    pipe(changed(paths.build)).
    //pipe(plumber()).
    pipe(eslint({
      envs: ['browser', 'es6', 'node'],
      rules: {
        curly: [2, 'multi-line'],
        indent: [2, 2]
      }
    })).
    pipe(eslint.format());
});

gulp.task('html', function () {
  gulp.src(paths.html).
    pipe(connect.reload());
});

gulp.task('jshint', function () {
  return gulp.src(paths.jsWithTests).
    pipe(changed(paths.build)).
    //pipe(plumber()).
    pipe(jshint()).
    pipe(jshint.reporter('default'));
});

gulp.task('less', function () {
  return gulp.src(paths.less).
    //pipe(plumber()).
    pipe(less()).
    pipe(changed(paths.build)).
    pipe(gulp.dest(paths.build)).
    pipe(connect.reload());
});

gulp.task('test', function () {
  return gulp.src(paths.test).
    pipe(jasmine());
});

gulp.task('transpile-dev', function () {
  return gulp.src(paths.jsWithTests).
    pipe(changed(paths.build)).
    //pipe(plumber()).
    pipe(sourcemaps.init()).
    pipe(babel()).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest(paths.build)).
    pipe(connect.reload());
});

gulp.task('transpile-prod', function () {
  return gulp.src(paths.js).
    //pipe(plumber()).
    pipe(sourcemaps.init()).
    pipe(babel()).
    pipe(concat('all.js')).
    //pipe(uglify()).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  console.log('in watch task');
  gulp.watch(paths.html, 'html');
  gulp.watch(paths.less, gulp.series('less', 'csslint'));
  gulp.watch(paths.jsWithTests, gulp.series('eslint', 'jshint', 'transpile-dev'));
});

gulp.task('build-dev', gulp.parallel('less', 'transpile-dev'));
gulp.task('build-prod', gulp.parallel('less', 'transpile-prod'));

gulp.task('default', gulp.series('build-dev', gulp.parallel('connect', 'watch')));
