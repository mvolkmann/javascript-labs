var gulp = require('gulp');
var pi = require('gulp-load-plugins')();

var paths = {
  css: '*.css',
  html: ['index.html'],
  js: ['*.js']
};

gulp.task('csslint', function () {
  return gulp.src(paths.css).
    pipe(pi.csslint({
      ids: false
    })).
    pipe(pi.csslint.reporter()).
    pipe(pi.livereload());
});

gulp.task('html', function () {
  gulp.src(paths.html).
    pipe(pi.livereload());
});

gulp.task('jshint', function () {
  return gulp.src(paths.js).
    pipe(pi.jshint()).
    pipe(pi.jshint.reporter('default')).
    pipe(pi.livereload());
});

gulp.task('watch', function () {
  pi.livereload.listen();
  gulp.watch(paths.html, 'html');
  gulp.watch(paths.css, 'csslint');
  gulp.watch(paths.js, 'jshint');
});

gulp.task('default',
  gulp.series(gulp.parallel('csslint', 'jshint'), 'watch'));
