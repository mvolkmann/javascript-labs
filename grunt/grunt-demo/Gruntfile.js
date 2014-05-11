'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['build'],
    coffee: { // TODO: Want this to only compile to .js, not run code!
      all: {
        expand: true,
        cwd: 'scripts',
        src: ['*.coffee'],
        dest: 'build/scripts',
        ext: '.js'
      },
      options: {
        sourceMap: true
      }
    },
    coffeelint: {
      files: ['scripts/**/*.coffee']
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    csslint: {
      strict: {
        options: {
          ids: false // allows ids to be used in CSS selectors
        },
        src: ['styles/*.css', 'build/styles/*.css']
      }
    },
    htmllint: { // doesn't check indentation
      all: ['*.html']
    },
    jshint: {
      options: {
        jshintrc: 'jshintrc'
      },
      all: ['Gruntfile.js', 'scripts/**/*.js', 'test/**/*.js']
    },
    jsonlint: {
      all: {
        src: ['*.json']
      }
    },
    less: {
      all: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.less'],
          dest: 'build/styles',
          ext: '.css'
        }]
      }
    },
    mochacli: {
      options: {
        recursive: true,
        reporter: 'list',
        require: ['chai'],
        ui: 'tdd'
      },
      all: ['test/**/*.js']
    },
    watch: {
      options: { livereload: true },
      coffee: {
        files: ['scripts/**/*.coffee', 'test/**/*.coffee'],
        tasks: ['coffee']
      },
      css: {
        files: ['styles/*.css'],
        tasks: ['csslint']
      },
      html: {
        files: ['*.html'],
        tasks: ['htmllint']
      },
      js: {
        files: ['Gruntfile.js', 'scripts/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'mochacli']
      },
      json: {
        files: ['*.json'],
        tasks: ['jsonlint']
      },
      less: {
        files: ['styles/*.less'],
        tasks: ['less', 'csslint']
      }
    }
  });

  var tasks = [
    'grunt-coffeelint',
    'grunt-contrib-clean',
    'grunt-contrib-coffee',
    'grunt-contrib-connect',
    'grunt-contrib-csslint',
    'grunt-contrib-jshint',
    'grunt-contrib-less',
    'grunt-contrib-watch',
    'grunt-html', // This is VERY SLOW!
    'grunt-jsonlint',
    'grunt-mocha-cli'
  ];
  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('all', ['lint', 'coffee', 'less', 'test']);
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('lint',
    ['coffeelint', 'csslint', 'htmllint', 'jshint', 'jsonlint']);
  grunt.registerTask('test', ['mochacli']);
};
