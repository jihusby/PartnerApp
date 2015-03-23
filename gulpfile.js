var install = require("gulp-install");
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var bower = require('bower');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var paths = {
    js: ['js/*.js', 'js/stores/*.js', 'js/actions/*.js', 'js/model/*.js', 'js/components/*.jsx', 'js/utils/*.js']
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
        'phonegap-plugins',
        'phonegap-copy',
        'phonegap-build');
});

// Init phonegap - add platforms
gulp.task('phonegap-init', shell.task([
        'phonegap platform add android', 'phonegap platform add ios', 'phonegap platform add wp8']
    , {
        ignoreErrors: 'true',
        cwd: 'phonegap'
    }
));

// Install phonegap plugins
gulp.task('phonegap-plugins', shell.task([
        'cordova plugin add org.apache.cordova.statusbar@0.1.10',
        'cordova plugin add org.apache.cordova.inappbrowser@0.6.0',
        'cordova plugin add org.apache.cordova.dialogs@0.3.0',
        'cordova plugin add org.apache.cordova.network-information@0.2.15',
        'cordova plugin add org.apache.cordova.vibration@0.3.13']
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
    gulp.src(['images/*']).pipe(gulp.dest('phonegap/www/images'));
    gulp.src(['phonegap/ant.properties']).pipe(gulp.dest('phonegap/platforms/android'));
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
