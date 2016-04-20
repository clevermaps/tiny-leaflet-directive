module.exports = function (grunt) {
    var srcDir = [
            'src/**/*.module.js',
            'src/**/*.js'
        ],
        targetDir = 'dist/',
        name = '<%= pkg.name %>',
        bannerContent = '/**\n' +
                ' * Tiny Leaflet Directive, tiny LeafletJS map directive for your AngularJS apps.\n' +
                ' * (c) 2015-2016, CleverAnalytics, s.r.o. http://cleveranalytics.com\n' +
                ' * Version: <%= pkg.version %>\n' +
                ' * License: <%= pkg.license %>\n' +
                ' */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [targetDir],
        concat: {
            options: {
                banner: bannerContent
            },
            target: {
                src: srcDir,
                dest: targetDir + name + '.js'
            }
        },
        uglify: {
            options: {
                banner: bannerContent,
                sourceMapRoot: '../',
                sourceMap: targetDir + name + '.min.js.map',
                sourceMapUrl: name + '.min.js.map'
            },
            target: {
                src: srcDir,
                dest: targetDir + name + '.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            target: {
                src: srcDir
            }
        },
        jscs: {
            src: srcDir,
            options: {
                config: '.jscsrc',
                esnext: false,
                verbose: false
            }
        },
        plato: {
            app: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'plato_report': [
                        srcDir
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('default', ['lint', 'concat', 'uglify']);
    grunt.registerTask('lint', ['jshint', 'jscs']);
};