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
                    out: "js/compiled.js"
                }
            }
        },
        mincss: {
            compress: {
                files: {
                    'css/compiled.css': [
                        'components/bootstrap.css/css/bootstrap.min.css',
                        'components/bootstrap.css/css/bootstrap-responsive.min.css',
                        'css/application.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-mincss');

    grunt.registerTask('package', 'requirejs mincss');
};
