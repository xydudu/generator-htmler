'use strict';

var 
LIVERELOAD_PORT = 35729,
lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var yeomanConfig = {
        dev: 'dev',
        product: 'product'
    };

    grunt.initConfig({
        jade: {
            options: {
                pretty: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= dev_path %>/jade/',
                    src: ['**/*.jade', '!_**/*.jade'],
                    dest: '<%= build_path %>/html/',
                    ext: '.html'
                }]
            }
        },
        fileslist: {
            htmls: {
                dest: '<%= build_path %>/start.html',
                includes: ['**/*.html'],
                base: '<%= build_path %>/html/',
                itemTemplate: grunt.file.read('.list-item.html'),
                itemSeparator: '',
                listTemplate: grunt.file.read('.list-list.html')
            }
        },
        less: {
            options: {
                paths: ['<%= dev_path %>/less']
            },
            build: {
                files: {
                    '<%= build_path %>/css/style.css': '<%= dev_path %>/less/main.less'
                }
            } 
        },
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    '<%= dev_path %>/less/{,*/}*.less',
                    '<%= dev_path %>/jade/{,*/}*.jade'
                ],
            tasks: ['build']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, grunt.config.get('build_path'))
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/start.html'
            }
        }
    });

    //grunt.registerTask('server', ['less', 'jade', 'fileslist', 'connect:livereload', 'open', 'watch']);
    //grunt.registerTask('build', ['less', 'jade', 'fileslist']);
    
    grunt.registerTask('build', function(_project) {
        if (!_project) {
            grunt.log.writeln('Error: Which project do you want to build?'.red)
            grunt.log.writeln('eg: grunt build:projectname'.blue)
            return;
        }

        grunt.config.set('build_path', 'projects/'+ _project +'/build/');
        grunt.config.set('dev_path', 'projects/'+ _project +'/src/');

        grunt.task.run(['jade', 'less', 'fileslist']);
    });

    grunt.registerTask('server', function(_project) {
        if (!_project) {
            grunt.log.writeln('Error: Which project do you want to server?'.red)
            grunt.log.writeln('eg: grunt server:projectname'.blue)
            return;
        }
        //grunt.config.set('build_path', 'projects/<%= _project %>/build/');
        //grunt.config.set('dev_path', 'projects/<%= _project %>/src/');
        grunt.task.run('build:'+ _project);
        grunt.task.run(['jade', 'less', 'fileslist', 'connect:livereload', 'open', 'watch']);

    });


};
