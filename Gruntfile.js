/*global module*/

module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        ngAnnotate: {
            options: {
                singleQuotes: false
            },
            app: {
                files: {
                    './build/js/app-bundle.js': ['./app/src/**/*.js']
                }
            }
        },

        jshint: {
            files: [
                './build/js/app-bundle.js',
                'gruntfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        concat: {
          options: {
            //separator: ';',
          },
          vendor: {
            src: [
              './vendor/angular/angular.min.js',
              './vendor/angular-route/angular-route.min.js',
              './vendor/angular-route-segment/build/angular-route-segment.js'
            ],
            dest: './build/js/vendor-bundle.min.js'
          }
        },

        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            sourceMap: true,
            mangle: true
          },
          build: {
            files: {
              './build/js/app-bundle.min.js': './build/js/app-bundle.js'
            }
          }
        },

        less: {
          development: {
            options: {
              paths: ['./app/less/'],
              cleancss: true
            },
            files: {
              './build/css/app-bundle.min.css': './app/less/main.less'
            }
          }
        },

        csslint: {
          strict: {
            options: {
              import: 2
            },
            src: ['./build/css/global-bundle.css']
          },
          lax: {
            options: {
              csslintrc: '.csslintrc'
            },
            src: ['./build/css/global-bundle.css']
          }
        },

        imagemin: {
          default: {
            files: [{
              expand: true,
              cwd: './app/assets/images',
              src: ['**/*.{png,jpg,gif}'],
              dest: './build/assets/images'
            }]
          }
        },

        copy: {
          development: {
            files: [
              {
                expand: true,
                flatten: true,
                src: ['./vendor/font-awesome/css/font-awesome.min.css'],
                dest: './build/css'
              },
              {
                expand: true,
                flatten: true,
                src: [
                  './vendor/bootstrap/fonts/*',
                  './vendor/font-awesome/fonts/*'
                ],
                dest: './build/fonts'
              },
              {
                expand: true,
                flatten: true,
                src: ['./app/*.html'],
                dest: './build/'
              },
              {
                expand: true,
                flatten: true,
                src: ['./app/src/partials/*.html'],
                dest: './build/partials/'
              },
              {
                expand: true,
                flatten: true,
                src: ['./app/data/**/*.json'],
                dest: './build/data'
              }
            ]
          }
        },

        connect: {
          server: {
            options: {
              port: 8001
              //, hostname: '*'
            }
          }
        },
  
        watch: {
          development: {
            files: [
              './app/src/**/*.js',
              './app/less/**/*.less',
              './app/**/*.html'
            ],
            tasks: [
			  'ngAnnotate',
              'jshint',
              'uglify',
              'concat',
              //'less',
              'csslint:lax',
              'copy'
            ],
            options: {
              interrupt: true
            }
          },
          configFiles: {
            files: [ 'Gruntfile.js' ],
            tasks: [ 'jshint' ]
          }
        }
    });

	grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

	
    grunt.registerTask('default', [
		'ngAnnotate',
        'jshint',
        'uglify',
        'concat',
        //'less',
        'csslint:lax',
        //'imagemin',
        'copy',
        'connect',
        'watch'
    ]);
};