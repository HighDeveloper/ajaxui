var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var config = require('./config');

gulp.task('minify-copy-css', function() {

    gulp.src(config.sourceFolder + '/*.css')
        .pipe(gulp.dest(config.demoAppFolder + '/css'))
        .pipe(gulp.dest(config.distributionFolder))
        .pipe(minifyCss())
        .pipe(rename({suffix: config.fileSuffix}))
        .pipe(gulp.dest(config.distributionFolder));
});

gulp.task('minify-copy-js', function() {

    gulp.src(config.sourceFolder + '/*.js')
        .pipe(gulp.dest(config.demoAppFolder + '/js'))
        .pipe(gulp.dest(config.distributionFolder))
        .pipe(uglify())
        .pipe(rename({suffix: config.fileSuffix}))
        .pipe(gulp.dest(config.distributionFolder));
});

gulp.task('default', ['minify-copy-css', 'minify-copy-js']);