// This uses ES6 featues!
// See gulpfile5.js which is ES5 and includes debugging functions.
var connect = require('connect');
var del = require('del');
var gulp = require('gulp');
var http = require('http');
var pi = require('gulp-load-plugins')();
var serveStatic = require('serve-static');

var paths = {
  build: 'build',
  css: 'build/**/*.css',
  html: ['index.html', 'src/**/*.html'],
  js: ['src/**/*.js'],
  jsPlusTests: ['src/**/*.js', 'test/**/*.js'],
  less: 'src/**/*.less',
  test: 'build/**/*-test.js'
};

gulp.task('hello', () => console.log('Hello, World!'));

gulp.task('clean', cb => del(paths.build, cb));

gulp.task('connect', () => {
  var app = connect();
  app.use(serveStatic(__dirname));
  http.createServer(app).listen(1919);
});

gulp.task('csslint', () =>
  gulp.src(paths.css).
    pipe(pi.csslint({ids: false})).
    pipe(pi.csslint.reporter()));

gulp.task('eslint', () =>
  gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.eslint({
      envs: ['browser', 'es6', 'node'],
      rules: {
        curly: [2, 'multi-line'],
        indent: [2, 2]
      }
    })).
    pipe(pi.eslint.format()));

gulp.task('html', () =>
  gulp.src(paths.html).pipe(pi.livereload()));

gulp.task('jshint', () =>
  gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.jshint()).
    pipe(pi.jshint.reporter('default')));

gulp.task('less', () =>
  gulp.src(paths.less).
    pipe(pi.changed(paths.build)).
    pipe(pi.less()).
    pipe(gulp.dest(paths.build)).
    pipe(pi.livereload()));

gulp.task('transpile-dev', () =>
  gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.sourcemaps.init()).
    pipe(pi.babel()).
    pipe(pi.sourcemaps.write('.')).
    pipe(gulp.dest(paths.build)).
    pipe(pi.livereload()));

gulp.task('transpile-prod', () =>
  gulp.src(paths.js).
    pipe(pi.sourcemaps.init()).
    pipe(pi.babel()).
    pipe(pi.concat('all.js')).
    pipe(pi.uglify()).
    pipe(pi.sourcemaps.write('.')).
    pipe(gulp.dest(paths.build)));

// This is not meant to be used directly.
// Use the "test" task instead.
gulp.task('jasmine', () =>
  gulp.src(paths.test).
    pipe(pi.plumber()).
    pipe(pi.jasmine()));

gulp.task('test', gulp.series('transpile-dev', 'jasmine'));

gulp.task('watch', () => {
  pi.livereload.listen();
  gulp.watch(paths.html, gulp.series('html'));
  gulp.watch(paths.less, gulp.series('less', 'csslint'));
  gulp.watch(paths.jsPlusTests,
    gulp.series('eslint', 'jshint', 'transpile-dev'));
});

gulp.task('build-dev', gulp.parallel('less', 'transpile-dev'));
gulp.task('build-prod', gulp.parallel('less', 'transpile-prod'));

gulp.task('default',
  gulp.series('build-dev', gulp.parallel('connect', 'watch')));
