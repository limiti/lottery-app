var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('less', function () {
    return gulp.src('assets/css/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css/'));
});


gulp.task('stream', function () {
    return gulp.src('assets/css/less/style.less')
        .pipe(watch('assets/css/less/style.less'))
        .pipe(gulp.dest('build'));
});



gulp.task('watch', function () {

    watch('assets/css/less/*.less', function () {
        gulp.src('assets/css/less/style.less')
            .pipe(watch('assets/css/less/style.less'))
    });

});


gulp.watch(['assets/css/less/*.less'], function () {
    gulp.start(['less']);
});






gulp.task('mini-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});
