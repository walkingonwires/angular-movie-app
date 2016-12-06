// Gulp
var gulp = require("gulp"),
    gutil = require('gulp-util'),
    watch = require('gulp-watch');

// Style
var sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(sass()
            .on('error', function (err) {
                gutil.log(err);
                this.emit('end');
            }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie >= 11'],
            cascade: false
        }))
        .pipe(cssnano({
            autoprefixer: true
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch('app/**/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
