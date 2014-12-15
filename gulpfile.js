var install = require("gulp-install");
var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.src(['./bower.json', './package.json'])
    .pipe(install());

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
