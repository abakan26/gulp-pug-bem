const gulp = require('gulp');
const browserSync = require("browser-sync");
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

module.exports = function buildJs(params) {
    const {src, dest, browserSyncName} = params;
    return gulp.src(src)
        .pipe(plumber())
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream())
}
