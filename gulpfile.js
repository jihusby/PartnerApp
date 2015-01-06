var install = require("gulp-install");
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var bower = require('bower');

var paths = {
    js: ['js/*.js', 'js/stores/*.js', 'js/actions/*.js', 'js/components/*.jsx', 'js/utils/*.js']
};

gulp.task('install', function(){
    gulp.src(['./package.json']).pipe(install());
});

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

// Basic usage
gulp.task('scripts', function() {
    // Single entry point to browserify
    return gulp.src('js/app.js')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(browserify({
            insertGlobals : false,
            debug : false,
            transform: ['reactify', 'debowerify', 'deamdify']
        }))
        .pipe(gulp.dest('./build/js'))
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
});

gulp.task('default', ['install', 'bower', 'scripts', 'watch'])
