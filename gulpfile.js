const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourceMaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')

function comprimeImagem () {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript () {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass () {
    return gulp.src('./source/styles/style.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

exports.default = function () {
    gulp.watch('./source/styles/*scss', { ignoreInitial: false }, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript))
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagem))
}