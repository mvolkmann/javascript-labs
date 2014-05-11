'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    watch: {
      options: {livereload: true},
      html: {
        files: ['*.html']
      },
      js: {
        files: ['spec/*.js', 'src/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['connect', 'watch']);
};
