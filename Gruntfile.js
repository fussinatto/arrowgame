module.exports = function(grunt) {

  // configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'styles',
          config: 'config.rb'
        }
      }
    },

    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass:dist']
      },
      css: {
        files: ['*.css']
      },
      js: {
        files: ['*.js']
      },
      livereload: {
        files: ['styles/*.css', '{,*/}*.html', '/images/{,*/}*','{,*/}*.js'],
        options: {
          livereload: true
        },
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          livereload: true
        }
      }
    }

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // register tasks
  grunt.registerTask('default', [
    'connect',
    'compass',
    'watch'
  ]);
};
