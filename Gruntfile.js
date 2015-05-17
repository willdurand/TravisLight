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
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
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
        compass: {
            compile: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    environment: 'production'
                }
            }
        },
        cssmin: {
            target: {
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
            css: [ 'css/application.css', 'dist/application-embed.css' ],
            dist: [ 'dist/' ]
        },
        mocha: {
            all: { src: 'test/index.html', run: false }
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
                    'dist/font-awesome/css/font-awesome.min.css': 'components/font-awesome/build/assets/font-awesome/css/font-awesome.min.css',
                    'dist/font-awesome/css/font-awesome-ie7.min.css': 'components/font-awesome/build/assets/font-awesome/css/font-awesome-ie7.min.css',
                    'dist/font-awesome/font/FontAwesome.otf': 'components/font-awesome/build/assets/font-awesome/font/FontAwesome.otf',
                    'dist/font-awesome/font/fontawesome-webfont.eot': 'components/font-awesome/build/assets/font-awesome/font/fontawesome-webfont.eot',
                    'dist/font-awesome/font/fontawesome-webfont.svg': 'components/font-awesome/build/assets/font-awesome/font/fontawesome-webfont.svg',
                    'dist/font-awesome/font/fontawesome-webfont.ttf': 'components/font-awesome/build/assets/font-awesome/font/fontawesome-webfont.ttf',
                    'dist/font-awesome/font/fontawesome-webfont.woff': 'components/font-awesome/build/assets/font-awesome/font/fontawesome-webfont.woff',
                    'dist/favicon.ico': 'favicon.ico'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('package', [ 'clean:dist', 'compile:js', 'compile:css', 'compile:html', 'copy:dist' ]);
    grunt.registerTask('compile:js', [ 'requirejs' ] );
    grunt.registerTask('compile:css', [ 'compass:compile', 'imageEmbed', 'cssmin', 'clean:css' ]);
    grunt.registerTask('compile:html', [ 'targethtml:dist' ]);
    grunt.registerTask('test', [ 'jshint', 'mocha' ]);
};
