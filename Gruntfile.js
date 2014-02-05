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

    // Liquid compilataion tasks
    // If you have your own custom scenarios or situations you wish to
    // test and develop for add fixtures into the fixtures folder and then
    // add test compilation here.
    // TODO: Build a custom task which lops over fixtures, so new fixtures added will be picked up.
    liquid: {
        no_apologies: {
          options: grunt.file.readJSON("fixtures/no-apologies.json"),
          files: [
            { src: "src/index.liquid", dest: "build/no-apologies.html" }
          ]
        },
        no_apologies_with_previous: {
          options: grunt.file.readJSON("fixtures/no-apologies-with-previous.json"),
          files: [
            { src: "src/index.liquid", dest: "build/no-apologies-with-previous.html" }
          ]
        },
        single_apology: {
          options: grunt.file.readJSON("fixtures/single-apology.json"),
          files: [
            { src: "src/index.liquid", dest: "build/single-apology.html" }
          ]
        },
        multiple_apologies: {
          options: grunt.file.readJSON("fixtures/multiple-apologies.json"),
          files: [
            { src: "src/index.liquid", dest: "build/multiple-apologies.html" }
          ]
        }
    },    

    // Copy liquid file into the dist folder.
    copy: {
      main: {
        files: [
          // Copy the liquid template from src to the dist folder for push.
          { expand: true, flatten: true, src: "src/index.liquid", dest: "dist/"},
          // Copy assets over to the distribution folder from the build.
          { expand: true, flatten: true, src: "build/stylesheets/*", dest: "dist/stylesheets/"},
          { expand: true, flatten: true, src: "build/javascripts/*", dest: "dist/javascripts/"},
          // Copy images over to the build and distribution folders.
          { expand: true, cwd: "src/images/", src: "**", dest: "build/images/"},
          { expand: true, cwd: "src/images/", src: "**", dest: "dist/images/"}
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
      files: ["src/**/*", "fixtures/**/*"],
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