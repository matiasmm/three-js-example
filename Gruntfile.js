module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        bower: {
            install: {
                options: {
                    targetDir: './www/bower_components',
                    install: true,
                    verbose: true,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },


        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www'
                }
            }
        }
    });

    grunt.registerTask('serve', ['connect:server:keepalive']);
    grunt.registerTask('install', ['bower:install']);

    Object.keys(require('./package.json').devDependencies).forEach(function(dep) {
        if(dep.substring(0,6) == "grunt-") {
            grunt.loadNpmTasks(dep);
        }
    });

};