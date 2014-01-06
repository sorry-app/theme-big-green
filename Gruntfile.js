module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load in the package information.
    pkg: grunt.file.readJSON('package.json'),

    // Javascript validation.
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },    
  });

  // SASS Compilation.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Coffeescript Compilation.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // Load the plugin that validates the JS markup.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Watcher for rebuilding when files changes.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Plugin for concatenating files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // qUnit test runner.
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};