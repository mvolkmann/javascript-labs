'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    csslint: {
      strict: {
        options: {
          ids: false // allows ids to be used in CSS selectors
        },
        src: ['*.css']
      }
    },
    jshint: {
      all: ['Gruntfile.js', '*.js'],
      options: {jshintrc: 'jshintrc'}
    },
    watch: {
      options: { livereload: true },
      css: {
        files: ['*.css'],
        tasks: ['csslint']
      },
      html: {
        files: ['*.html'],
        tasks: []
      },
      js: {
        files: ['Gruntfile.js', '*.js'],
        tasks: ['jshint']
      },
    }
  });

  var tasks = [
    'grunt-contrib-csslint',
    'grunt-contrib-jshint',
    'grunt-contrib-watch'
  ];
  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('server', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['server.js'],
      opts: {stdio: 'inherit'}
    });
  });
  grunt.registerTask('default', ['csslint', 'jshint', 'server', 'watch']);
};
