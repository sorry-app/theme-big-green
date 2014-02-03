module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load in the package information.
    pkg: grunt.file.readJSON("package.json"),

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
          "build/stylesheets/status-page.css": "src/stylesheets/main.less",
        }
      }
    },

    // Configuration to be run (and then tested).
    liquid: {
      options: grunt.file.readJSON("fixtures/status-page.json"),
      pages: {
        files: [
          { src: "src/index.liquid", dest: "build/index.html" }
        ]
      }
    },    

    // Copy liquid file into the dist folder.
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: "src/index.liquid", dest: "dist/"},
          { expand: true, flatten: true, src: "build/stylesheets/*", dest: "dist/stylesheets/"},
          { expand: true, flatten: true, src: "build/javascripts/*", dest: "dist/javascripts/"}
        ]
      },
    },

    // Javascript validation.
    jshint: {
      // These are best practices taken as best practices from Bootstrap.
      options: {
        "asi"      : true,
        "boss"     : true,
        "browser"  : true,
        "curly"    : false,
        "debug"    : true,
        "devel"    : true,
        "eqeqeq"   : false,
        "eqnull"   : true,
        "expr"     : true,
        "laxbreak" : true,
        "quotmark" : "double",
        "validthis": true
      },
      all: ["Gruntfile.js", "package.json", "fixtures/status-page.json"]
    },

    // Watch and instant rebuild.
    watch: {
      files: ["index.html", "src/**/*"],
      tasks: ["default"],
    },

    // Release & Deployment Tasks.
    release: {
      options: {
        npmtag: false, // Don"t deploy to NPM as we don"t want to release like that.
        tagName: "status-page-<%= version %>" // TODO: We can"t use a variable for the package name.
      }
    },

    // Concatenate the JS assets.
    concat: {
      js: {
        // List these files explicitly to ensure dependancies are loaded in the right order.
        // TODO: I would love to abstract this dependancy tree out into another config file.
        src: [
              // jQuery & Plugins.
              "src/javascripts/vendor/jquery/jquery.js",
              "src/javascripts/vendor/jquery/moment.js"],
        dest: "build/javascripts/<%= pkg.name %>.js",
      },
    },
  });

  // LESS Compilation.
  grunt.loadNpmTasks("grunt-contrib-less");
  // Load the plugin that validates the JS markup.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  // Watcher for rebuilding when files changes.
  grunt.loadNpmTasks("grunt-contrib-watch");
  // Plugin for concatenating files.
  grunt.loadNpmTasks("grunt-contrib-concat");
  // Local webserver.
  grunt.loadNpmTasks("grunt-contrib-connect");
  // Liquid template compiler.
  grunt.loadNpmTasks("grunt-liquid");
  // Copy files around.
  grunt.loadNpmTasks("grunt-contrib-copy");

  // Default task(s).
  grunt.registerTask("default", ["jshint", "less", "concat", "liquid", "copy"]);

};