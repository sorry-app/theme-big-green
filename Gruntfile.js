module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load in the package information.
    pkg: grunt.file.readJSON('package.json'),

    // Development web server.
    connect: {
      server: {
        options : {
          keepalive: true,
        }
      }
    },

    // LESS CSS Compilation.
    less: {
      production: { 
        files: {
          "dist/stylesheets/status-page.css": "src/stylesheets/main.less",
        }
      }
    },

    // Javascript validation.
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    // Watch and instant rebuild.
    watch: {
      files: ['index.html', 'src/**/*'],
      tasks: ['default'],
    },

    // Release & Deployment Tasks.
    release: {
      options: {
        npmtag: false, // Don't deploy to NPM as we don't want to release like that.
        tagName: 'status-page-<%= version %>' // TODO: We can't use a variable for the package name.
      }
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
      js: {
        // List these files explicitly to ensure dependancies are loaded in the right order.
        src: ['src/javascripts/jquery.js',
              'src/javascripts/vendor/bootstrap/transition.js',
              'src/javascripts/vendor/bootstrap/alert.js',
              'src/javascripts/vendor/bootstrap/button.js',
              'src/javascripts/vendor/bootstrap/carousel.js',
              'src/javascripts/vendor/bootstrap/collapse.js',
              'src/javascripts/vendor/bootstrap/dropdown.js',
              'src/javascripts/vendor/bootstrap/modal.js',
              'src/javascripts/vendor/bootstrap/tooltip.js',
              'src/javascripts/vendor/bootstrap/popover.js',
              'src/javascripts/vendor/bootstrap/scrollspy.js',
              'src/javascripts/vendor/bootstrap/tab.js',
              'src/javascripts/vendor/bootstrap/affix.js',
              'src/javascripts/pusher.js', 
              'src/javascripts/angular.min.js',
              'src/javascripts/moment.js',
              'src/javascripts/angular-carousel.js',
              'src/javascripts/angular-interval.js',
              'tmp/javascripts/smooth-anchor.js',
              'tmp/javascripts/application.js',
              'tmp/javascripts/socket.js',
              'tmp/javascripts/page-controller.js',
              'tmp/javascripts/status-page.js'],
        dest: 'dist/javascripts/<%= pkg.name %>.js',
      },
    },    
  });

  // LESS Compilation.
  grunt.loadNpmTasks('grunt-contrib-less');
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
  // Local webserver.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'less', 'concat']);

};