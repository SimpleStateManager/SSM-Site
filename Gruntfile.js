module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'images',
                    environment: 'development',
                    httpGeneratedImagesPath: 'docs/images'
                }
            }
        },

        watch: {
            compass: {
                files: ['docs/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            handlebars: {
                files: ['templates/{,*/}*'],
                tasks: ['compile-handlebars']
            }
        },

        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            files: ['package.json', 'bower.json']
        },

        'compile-handlebars': {
            home: {
                template: 'templates/homepage.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'index.html'
            },
            extend: {
                template: 'templates/extend.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'extend.html',
                partials: ['templates/partials/plugin-template.handlebars']
            },
            licence: {
                template: 'templates/licence.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'licence.html'
            },
            api: {
                template: 'templates/api.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'api.html'
            },
            debug: {
                template: 'templates/debug.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'debug.html'
            },
            releases: {
                template: 'templates/releases.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'releases.html'
            },
            readme: {
                template: 'templates/readme.handlebars',
                templateData: {
                    package: grunt.file.readJSON('_ssm/package.json'),
                    versions: grunt.file.readJSON('_ssm/releases.json')
                },
                output: 'README.md'
            }
        }
    });

    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-compile-handlebars');

    // Default task(s)
    grunt.registerTask('default', ['copy']);
    grunt.registerTask('bugfix', ['copy', 'bumpup', 'compile-handlebars', 'uglify', 'copy']);
    grunt.registerTask('minor', ['copy', 'bumpup:minor', 'compile-handlebars', 'uglify', 'copy']);
    grunt.registerTask('major', ['copy', 'bumpup:major', 'compile-handlebars', 'uglify', 'copy']);
};