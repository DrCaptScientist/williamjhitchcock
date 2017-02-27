/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        uglify: {
            dist: {
                src: ['<%= pkg.directory_source %>/js/video-colorizer.js'],
                dest: '<%= pkg.directory_source %>/js/video-colorizer.min.js'
            }
        },
        concat: {
            dist: {
                src:'<%= pkg.directory_source %>/js/video-colorizer.min.js',
                dest: '<%= pkg.directory_build %>/js/video-colorizer.min.js'
            }
        },
        clean: ['<%= pkg.directory_build %>'],
        sass: {
          dist: {
            options: {
              style: 'expanded',
              lineNumbers: true,
              noCache: true
            },
            files: {
              '<%= pkg.directory_source %>/css/video-colorizer.css': '<%= pkg.directory_source %>/sass/main.scss'
            }
          }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;*/\n ' + '/* Build: <%= grunt.template.today("mm/dd/yy - h:MM:ss TT") %> */\n',
            },
            minify: {
                expand: true,
                cwd: '<%= pkg.directory_source %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= pkg.directory_build %>/css/',
                ext: '.min.css'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.directory_source %>',
                    src: ['img/*','video/*', 'fonts/*', 'js/slick.min.js', 'js/draggabilly.pkgd.min.js', 'js/jquery.waypoints.min.js'],
                    dest: '<%= pkg.directory_build %>'
                }]
            }
        },
        processhtml: {
            dist: {
                files: {
                    '<%= pkg.directory_build %>/index.html': ['<%= pkg.directory_source %>/index.html']
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.directory_deploy %>/' + '<%= pkg.name %>' + '_' + '<%= grunt.template.today("mm-dd-yyyy") %>' + '.zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.directory_build %>/',
                    src: ['**/*']
                }]
            }
        },
        watch: {
            files: ['<%= pkg.directory_source %>/sass/**/*.scss'],
            tasks: ['sass']
        },
    });

    var cwd = process.cwd();
    process.chdir('../../');
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');

    process.chdir(cwd);
    // Default task.
    grunt.registerTask('default', ['uglify', 'concat', 'sass', 'cssmin', 'copy', 'processhtml']);
};