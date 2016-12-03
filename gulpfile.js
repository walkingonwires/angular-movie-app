// Gulp
var gulp = require("gulp"),
    gulpif = require('gulp-if'),
    Bust = require('gulp-bust'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps');

// Style
var sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

// Server
var gopen = require('gulp-open'),
    connect = require('gulp-connect');

var bust = new Bust(),
    config = {
        port: 8888,
        base: 'http://localhost',
        browser: 'Google Chrome'
    },
    flags = {
        production: false
    };


gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: config.port,
        base: config.base,
        livereload: true,
        fallback: 'app/index.html'
    });
});

gulp.task('open', ['connect'], function () {
    return gulp.src('app/index.html')
        .pipe(gopen({
            uri: config.base + ':' + config.port,
            app: config.browser
        }));
});

gulp.task('sass', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(gulpif(!flags.production, sourcemaps.init()))
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
            autoprefixer: false
        }))
        .pipe(gulpif(!flags.production, sourcemaps.write('./')))
        .pipe(gulpif(flags.production, bust.resources()))
        .pipe(gulp.dest('app/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.html').pipe(connect.reload());
    gulp.watch('app/**/*.js').pipe(connect.reload());
    gulp.watch('src/style/**/*.scss', ['sass']).pipe(connect.reload());

});

gulp.task('cleanCss', function () {
    return cleanDirs('dist/style');
});

gulp.task('cleanJs', function () {
    return cleanDirs('dist/js');
});

gulp.task('cleanIndex', function () {
    return cleanDirs('dist/*.html');
});

function cleanDirs(dir) {
    return gulp.src(dir, {read: false})
        .pipe(clean());
}


gulp.task('prod', function () {
    flags.production = true;
});

gulp.task('default', ['open', 'watch']);
