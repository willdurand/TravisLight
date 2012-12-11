/*global module:false*/
module.exports = function(grunt) {
    "use strict";

    var jsFiles = [
        'js/*.js',
        'js/collections/*.js',
        'js/models/*.js',
        'js/views/*.js'
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
                    out: "dist/compiled.js"
                }
            }
        },
        mincss: {
            compress: {
                files: {
                    'dist/compiled.css': [
                        'css/bootstrap.min.css',
                        'dist/application-embed.css'
                    ]
                }
            }
        },
        imageEmbed: {
            application: {
                src: 'css/application.css',
                dest: 'dist/application-embed.css',
                deleteAfterEncoding : false
            }
        },
        clean: {
            css: {
                files: [
                    'dist/application-embed.css'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-cleanx');

    grunt.registerTask('package', 'compile:js compile:css');
    grunt.registerTask('compile:js', 'requirejs');
    grunt.registerTask('compile:css', 'imageEmbed mincss clean:css');
};
