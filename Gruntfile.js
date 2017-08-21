module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            css: ['library/css/main.css']
        },
        sass: {
            dist: {
                files: {
                    'library/css/main.css': 'library/scss/main.scss'
                }
            }
        },
        watch: {
            css: {
                files: 'library/scss/**/*.scss',
                tasks: ['sass']
            },
            js: {
                files: [
                    'library/js/**/*.js',
                    '!library/js/application.min.js',
                    '!library/js/application.js'
                ],
                tasks: ['concat', 'copy']
            }
        },
        copy: {
            minjs: {
                src: 'library/js/application.js',
                dest: 'library/js/application.min.js'
            }
        },
        concat: {
            basic: {
                src: [
                    'library/js/main.js',
                    'library/js/newsletter.js'
                ],
                dest: 'library/js/application.js',
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: true,
                screwIE8: false
            },
            my_target: {
                files: {
                    'library/js/application.min.js': ['library/js/application.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'library/css',
                    src: ['main.css'],
                    dest: 'library/css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            build: {
                expand: true,
                cwd: 'library/css',
                src: '*.css',
                dest: 'library/css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'sass', 'autoprefixer', 'cssmin', 'concat', 'uglify']);
};
