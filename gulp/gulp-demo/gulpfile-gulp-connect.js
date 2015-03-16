var del = require('del'); // not a gulp plugin
var gulp = require('gulp');
var pi = require('gulp-load-plugins')();

var paths = {
  build: 'build',
  css: 'build/**/*.css',
  html: ['index.html', 'src/**/*.html'],
  js: ['src/**/*.js'],
  jsPlusTests: ['src/**/*.js', 'test/**/*.js'],
  less: 'src/**/*.less',
  test: 'build/**/*-test.js'
};

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('clean', function (cb) {
  del(paths.build, cb);
});

gulp.task('connect', function () {
  pi.connect.server({
    port: 1919,
    root: __dirname,
    livereload: true
    // Don't have to manually add livereload script tag to index.html!
  });
});

gulp.task('csslint', function () {
  return gulp.src(paths.css).
    pipe(pi.csslint({
      ids: false
    })).
    pipe(pi.csslint.reporter());
});

gulp.task('eslint', function () {
  return gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.eslint({
      envs: ['browser', 'es6', 'node'],
      rules: {
        curly: [2, 'multi-line'],
        indent: [2, 2]
      }
    })).
    pipe(pi.eslint.format());
});

gulp.task('html', function () {
  gulp.src(paths.html).
    pipe(pi.connect.reload());
});

gulp.task('jshint', function () {
  return gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.jshint()).
    pipe(pi.jshint.reporter('default'));
});

gulp.task('less', function () {
  return gulp.src(paths.less).
    pipe(pi.less()).
    pipe(pi.changed(paths.build)).
    pipe(gulp.dest(paths.build)).
    pipe(pi.connect.reload());
});

gulp.task('test', function () {
  console.log('IN TEST TASK');
  return gulp.src(paths.test).
    pipe(pi.plumber()).
    pipe(pi.jasmine());
});

gulp.task('transpile-dev', function () {
  return gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.sourcemaps.init()).
    pipe(pi.babel()).
    pipe(pi.sourcemaps.write('.')).
    pipe(gulp.dest(paths.build)).
    pipe(pi.connect.reload());
});

gulp.task('transpile-prod', function () {
  return gulp.src(paths.js).
    pipe(pi.sourcemaps.init()).
    pipe(pi.babel()).
    pipe(pi.concat('all.js')).
    pipe(pi.uglify()).
    pipe(pi.sourcemaps.write('.')).
    pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  gulp.watch(paths.html, 'html');
  gulp.watch(paths.less, gulp.series('less', 'csslint'));
  gulp.watch(paths.jsPlusTests,
    gulp.series('eslint', 'jshint', 'transpile-dev', 'test'));
});

gulp.task('build-dev', gulp.parallel('less', 'transpile-dev'));
gulp.task('build-prod', gulp.parallel('less', 'transpile-prod'));

gulp.task('default',
  gulp.series('build-dev', gulp.parallel('connect', 'watch')));
