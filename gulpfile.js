var install = require("gulp-install");
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var bower = require('bower');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

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


// Runs all phonegap tasks in sequence
gulp.task('phonegap', function() {
        runSequence(
            'phonegap-init',
            'phonegap-copy',
            'phonegap-build');
});

// Init phonegap - add platforms
gulp.task('phonegap-init', shell.task([
   'phonegap platform add android', 'phonegap platform add ios']
    , {
        ignoreErrors: 'true',
        cwd: 'phonegap'
    }
));

// Copy files to phonegap folder
gulp.task('phonegap-copy', function() {
    gulp.src(['build/**/*']).pipe(gulp.dest('phonegap/www/build'));
    gulp.src(['css/**/*']).pipe(gulp.dest('phonegap/www/css'));
    gulp.src(['js/external/**/*']).pipe(gulp.dest('phonegap/www/js/external'));
    gulp.src(['index.html']).pipe(gulp.dest('phonegap/www'));
});

gulp.task('phonegap-build', shell.task([
    'phonegap build'
], {
        ignoreErrors: 'true',
        cwd: 'phonegap'
    }
));

gulp.task('build', function() {
   runSequence(
       'scripts',
       'phonegap'
    );
});



gulp.task('default', ['install', 'bower', 'build', 'watch'])
