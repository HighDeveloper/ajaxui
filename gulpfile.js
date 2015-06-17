var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('minify-css', function() {

    return gulp.src('src/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});
