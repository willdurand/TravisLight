/*global module:false*/
module.exports = function(grunt) {
    "use strict";

    var jsFiles = [
        'js/*.js',
        'js/**/*.js'
    ];

    // Project configuration.
    grunt.initConfig({
        lint: {
            files: jsFiles
        },
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    baseUrl: "js/",
                    mainConfigFile: "js/main.js",
                    out: "js/main-built.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};
