module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load in the package information.
    pkg: grunt.file.readJSON('package.json'),

    // Javascript validation.
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    // Watch and instant rebuild.
    watch: {
      files: ['index.html', 'src/**/*'],
      tasks: ['default'],
    },

    // Compile Coffescripts.
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'src/javascripts',
        src: ['*.coffee'],
        dest: 'tmp/javascripts/',
        ext: '.js'
      }
    },

    // Concatenate the JS assets.
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        // List these files explicitly to ensure dependancies are loaded in the right order.
        src: ['src/javascripts/jquery.js', 
              'src/javascripts/pusher.js', 
              'src/javascripts/angular.min.js',
              'src/javascripts/moment.js',
              'src/javascripts/angular-carousel.js',
              'src/javascripts/angular-interval.js',
              'tmp/javascripts/smooth-anchor.js',
              'tmp/javascripts/page-controller.js',
              'tmp/javascripts/status-page.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
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
  grunt.registerTask('default', ['coffee', 'concat']);

};