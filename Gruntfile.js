/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load in the package information.
    pkg: grunt.file.readJSON("package.json"),

    // LESS CSS Compilation.
    // Compile the LESS source into the build directory.
    less: {
      production: {
        files: {
          "build/assets/status-page.css": "src/stylesheets/main.less",
        }
      }
    },

    // Source files into the build directory.
    copy: {
      main: {
        files: [
          // Copy the liquid template from src to the dist folder for push.
          { expand: true, flatten: true, src: "src/status-page.liquid", dest: "build/"},
          // Copy images over to the build and distribution folders.
          { expand: true, flatten: true, cwd: "src/images/", src: "**", dest: "build/assets/"}
        ]
      },
    },

    // Javascript validation.
    jshint: {
      // These are best practices taken as best practices from Bootstrap.
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      all: ["Gruntfile.js", "package.json", "fixtures/status-page.json"]
    },

    // Directory watching.
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      theme: {
        files: 'src/**/*',
        tasks: ['deploy'],
        options: {
          interrupt: true,
        }
      }
    },

    // Load in your sorry credentials.
    // NOTE: NEVER CHECK YOUR CREDENTIALS INTO YOUR REPOSITORY.
    sorry: grunt.file.readJSON('sorry.json'),

    // Sorry theme deployment.
    sorry_theme_deploy: {
      options: {
        username: '<%= sorry.username %>',
        password: '<%= sorry.password %>',
        page: 'my-first-status-page',
        host: 'http://api.lvh.me:3000'
      },     
      valid_theme: {
        expand: true,
        cwd: 'build/',
        src: ['**/*']
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sorry-theme-deploy');

  // Default task(s).
  grunt.registerTask("build", ["jshint", "less", "copy"]);
  grunt.registerTask("deploy", ["build", "sorry_theme_deploy"]);

};