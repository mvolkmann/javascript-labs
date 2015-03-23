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

function arrContains(arr, value) {
  for (var i in arr) {
    if (arr[i] === value) return true;
  }
  return false;
}

function walkPrototypes(obj, detailFor) {
  var proto = Object.getPrototypeOf(obj);
  if (proto) {
    var ctor = proto.constructor;
    console.log('\nctor name =', ctor.name);
    console.log('prototype =', ctor.prototype);

    if (!detailFor || arrContains(detailFor, ctor.name)) {
      var p = ctor.prototype;
      Object.keys(p).forEach(function (key) {
        console.log(key, '=', p[key]);
      });
    }

    walkPrototypes(proto, detailFor);
  }
}

gulp.task('hello', function () {
  console.log('Hello, World!');

  //console.log('gulp =', gulp);
  //walkPrototypes(gulp, ['Gulp', 'Undertaker']);
  console.log('gulp.src =', gulp.src);
});

gulp.task('clean', function (cb) {
  del(paths.build, cb);
});

gulp.task('connect', function () {
  var app = connect();
  app.use(serveStatic(__dirname));
  http.createServer(app).listen(1919);
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
    pipe(pi.livereload());
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
    pipe(pi.livereload());
});

gulp.task('transpile-dev', function () {
  return gulp.src(paths.jsPlusTests).
    pipe(pi.changed(paths.build)).
    pipe(pi.sourcemaps.init()).
    pipe(pi.babel()).
    pipe(pi.sourcemaps.write('.')).
    pipe(gulp.dest(paths.build)).
    pipe(pi.livereload());
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

gulp.task('test', gulp.series('transpile-dev', function () {
  return gulp.src(paths.test).
    pipe(pi.plumber()).
    pipe(pi.jasmine());
}));

gulp.task('watch', function () {
  pi.livereload.listen();
  gulp.watch(paths.html, 'html');
  gulp.watch(paths.less, gulp.series('less', 'csslint'));
  gulp.watch(paths.jsPlusTests,
    gulp.series('eslint', 'jshint', 'transpile-dev'));
});

gulp.task('build-dev', gulp.parallel('less', 'transpile-dev'));
gulp.task('build-prod', gulp.parallel('less', 'transpile-prod'));

gulp.task('default',
  gulp.series('build-dev', gulp.parallel('connect', 'watch')));
