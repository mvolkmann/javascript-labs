'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        port: 3000,
        base: '.'
      }
    },
    csslint: {
      strict: {
        options: {
          ids: false // allows ids to be used in CSS selectors
        },
        src: ['*.css']
      }
    },
    jasmine: {
      all: {
        src: 'scripts/*.js', // fails if no directory is specfied!
        options: {specs: 'spec/*.js'}
      }
    },
    jshint: {
      all: ['*.js', 'scripts/*.js', 'spec/*.js'],
      options: {jshintrc: 'jshintrc'}
    },
    watch: {
      options: { livereload: true },
      css: {
        files: ['*.css'],
        tasks: ['csslint']
      },
      html: {
        files: ['index.html'],
        tasks: []
      },
      js: {
        files: ['*.js', 'scripts/*.js', 'spec/*.js'],
        tasks: ['jshint', 'jasmine']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('server', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['server.js'],
      opts: {stdio: 'inherit'}
    });
  });
  grunt.registerTask('default',
    ['csslint', 'jshint', 'server', 'jasmine', 'connect', 'watch']);
};
