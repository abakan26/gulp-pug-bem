const gulp = require('gulp');
const browserSync = require("browser-sync");
const gulpIf = require('gulp-if');
const pug = require("gulp-pug");
const plumber = require('gulp-plumber');

module.exports = function pug2html(params) {
    const {src, dest, isProduction, browserSyncName} = params;
return gulp.src(src)
    .pipe(plumber())
    .pipe( gulpIf(isProduction, pug({pretty: true}), pug()) )
    .pipe(gulp.dest(dest))
    .pipe(browserSync.get(browserSyncName).stream())
}