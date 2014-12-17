var install = require("gulp-install");
var gulp = require('gulp');
var browserify = require('gulp-browserify');


var paths = {
    js: ['js/stores/*.js', 'js/actions/*.js', 'js/components/*.jsx']
};

gulp.task('install', function(){
    gulp.src(['./bower.json', './package.json']).pipe(install());
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
});

// Basic usage
gulp.task('scripts', function() {
    // Single entry point to browserify
    return gulp.src('js/app.js')
        .pipe(browserify({
            insertGlobals : false,
            debug : false,
            transform: ['reactify', 'debowerify', 'deamdify']
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('default', ['watch'])
