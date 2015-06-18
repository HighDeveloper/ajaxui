var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var config = require('./config');

gulp.task('concat-minify-css', function() {

    gulp.src(config.cssSourceFiles())
        .pipe(concat(config.cssLibFile))
        .pipe(gulp.dest(config.cssDemoAppFolder()))
        .pipe(gulp.dest(config.distributionFolder))
        .pipe(minifyCss())
        .pipe(rename({suffix: config.fileSuffix}))
        .pipe(gulp.dest(config.distributionFolder));
});

gulp.task('concat-minify-js', function() {

    gulp.src(config.jsSourceFiles())
        .pipe(concat(config.jsLibFile))
        .pipe(gulp.dest(config.jsDemoAppFolder()))
        .pipe(gulp.dest(config.distributionFolder))
        .pipe(uglify())
        .pipe(rename({suffix: config.fileSuffix}))
        .pipe(gulp.dest(config.distributionFolder));
});

gulp.task('default', ['concat-minify-css', 'concat-minify-js']);