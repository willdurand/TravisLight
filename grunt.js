/*global module:false*/
module.exports = function(grunt) {
    "use strict";

    var jsFiles = [
        'js/*.js',
        'js/collections/*.js',
        'js/models/*.js',
        'js/views/*.js',
        'test/*.js',
        'test/**/*.js'
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
            },
            dist: [ 'dist/' ]
        },
        mocha: {
            all: [ 'test/index.html' ]
        },
        targethtml: {
            dist: {
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        copy: {
            dist: {
                files: {
                    'dist/js/require.js': 'components/requirejs/require.js',
                    'dist/font-awesome/css/': 'components/font-awesome/css/*.css',
                    'dist/font-awesome/font/': 'components/font-awesome/font/*',
                    'dist/font-awesome/FontAwesome.ttf': 'components/font-awesome/FontAwesome.ttf',
                    'dist/favicon.ico': 'favicon.ico'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-cleanx');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('package', 'clean:dist compile:js compile:css compile:html copy:dist');
    grunt.registerTask('compile:js', 'requirejs');
    grunt.registerTask('compile:css', 'imageEmbed mincss clean:css');
    grunt.registerTask('compile:html', 'targethtml:dist');
    grunt.registerTask('test', 'lint mocha');
};
