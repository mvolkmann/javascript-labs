/*
 * grunt-filestats
 * https://github.com/mvolkman/grunt-filestats
 *
 * Copyright (c) 2013 R. Mark Volkmann
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.registerTask('filestats', 'outputs statistics for a file', function (filePath) {
    if (!filePath) {
      return grunt.log.writeln(this.name + ' must be given a file path');
    }

    var fs = require('fs');

    var done = this.async();

    fs.stat(filePath, function (err, stats) {
      grunt.log.writeln('stats for ' + filePath + ':');
      Object.keys(stats).sort().forEach(function (key) {
        grunt.log.writeln('  ' + key + ' = ' + stats[key]);
      });
      done();
    });
  });
};
