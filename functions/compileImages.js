const gulp = require('gulp');
const browserSync = require("browser-sync");
const gulpIf = require('gulp-if');
const imagemin = require("gulp-imagemin");
const imgCompress  = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const gulpNewer = require("gulp-newer");
const plumber = require('gulp-plumber');
const flatten = require('gulp-flatten');

module.exports = function compileImages(params) {
    const {src, dest, browserSyncName, isProduction} = params;
    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulpNewer(dest))
        .pipe( gulpIf(isProduction, imagemin(
            [
                imgCompress(),
                imageminPngquant(),
            ]
        )) )
        .pipe(flatten({ includeParents: 0 }))
        .pipe(gulp.dest(dest))
        .on("end", browserSync.get(browserSyncName).reload);
}