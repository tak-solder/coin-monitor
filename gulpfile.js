const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

gulp.task('sass', function() {
    gulp.src('./sass/main.scss')
        .pipe(plumber())
        .pipe(sass({}))
        .pipe(gulp.dest('./htdocs'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
