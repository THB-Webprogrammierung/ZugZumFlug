'use strict';
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        pgk:grunt.file.readJSON('package.json'),
        jshint: {
             options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
             },
             all: {
                src: [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                ]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {}
        },
        uglify: {
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                lenght: 20
            },
            release: {
                files: [{
                   src: [
                       'dist/scripts/*.js',
                       'dist/styles/*.css'
                   ] 
                }]
            }
        },
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assetDirs:['dist','dist/styles']
            }
        },        
        copy: {
            dist: {
                cwd: 'app',
                src: ['**','!styles/**/*.css','!scripts/**/*.js'],
                dest: 'dist',
                expand: true
            },
            icons: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/open-iconic/svg',
                        src: '**',
                        dest: 'dist/images/icons'
                    }
                ]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        watch: {
            copy: {
                files: [
                    'app/**',
                    '!app/**/*.css',
                    '!app/**/*.js'
                ],
                tasks: ['build']
            },
            scripts: {
                files: [
                    'app/scripts/app.js',
                    'app/scripts/validate.js',
                    'app/scripts/googleGetConnectionData.js'
                ],
                tasks: ['build']
            },
            style: {
                files: [
                    'app/styles/style.css',
                    'app/styles/form.css'
                ],
                tasks: ['build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}*.{png, jpg, jpeg, gif, webp, svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            dist: {
                options: {
                    open: true,
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        }

    });
    grunt.registerTask('build', [
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);
    grunt.registerTask('serve',['build','connect:dist','watch']);
    grunt.registerTask('default',['build']);
};