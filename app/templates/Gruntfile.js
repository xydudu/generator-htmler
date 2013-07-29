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
        yeomanConfig: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                '<%= yeomanConfig.dev %>/less/{,*/}*.less',
                '<%= yeomanConfig.dev %>/jade/{,*/}*.jade'
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
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, yeomanConfig.product +'/templates')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/start.html'
            }
        },
        less: {
            options: {
                paths: ['<%= yeomanConfig.dev %>/less']
            },
            build: {
                files: {
                    '<%= yeomanConfig.product %>/css/style.css': '<%= yeomanConfig.dev %>/less/{,*/}*.less'
                }
            } 
        },
        jade: {
            options: {
                pretty: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%=yeomanConfig.dev%>/jade/',
                    src: ['**/*.jade', '!_**/*.jade'],
                    dest: '<%=yeomanConfig.product%>/templates/',
                    ext: '.html'
                }]
            }
        },
        fileslist: {
            htmls: {
                dest: '<%=yeomanConfig.product%>/templates/start.html',
                includes: ['**/*.html'],
                base: '<%=yeomanConfig.product%>/templates/',
                itemTemplate: grunt.file.read('configs/list-item.html'),
                itemSeparator: '',
                listTemplate: grunt.file.read('configs/list-list.html')
            }
        }
    });

    grunt.registerTask('server', ['less', 'jade', 'fileslist', 'connect:livereload', 'open', 'watch']);
    grunt.registerTask('build', ['less', 'jade', 'fileslist']);

};
