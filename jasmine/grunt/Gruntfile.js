module.exports = function (grunt) {

  grunt.initConfig({
    jasmine: {
      all: {
        src: 'src/*.js',
        options: {specs: 'spec/*.js'}
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'spec/*.js', 'src/*.js'],
      options: {jshintrc: 'jshintrc'}
    },
    watch: {
      js: {
        files: ['Gruntfile.js', 'spec/*.js', 'src/*.js'],
        tasks: ['jshint', 'jasmine']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  grunt.registerTask('default', ['watch']);
};
