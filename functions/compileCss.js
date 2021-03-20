const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const compileSassToCss = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const concat = require('gulp-concat');
const groupCssMediaQueries = require('gulp-group-css-media-queries');

const postcss = require('gulp-postcss')
const cssnano = require('cssnano');

const browserSync = require("browser-sync");
const plumber = require('gulp-plumber');

module.exports = function buildStyles(params) {
    let {src, dest, bundleName, browserSyncName, isProduction} = params;
    return gulp.src(src)
        .pipe(plumber())
        .pipe(
            gulpIf(!isProduction, sourcemaps.init())
        )
        .pipe(compileSassToCss({
            importer: tildeImporter
        }))
        .pipe(concat(bundleName))
        .pipe( gulpIf(isProduction, groupCssMediaQueries()) )
        .pipe( gulpIf(isProduction, postcss([
            cssnano({
                preset: ['default', {
                    discardComments: { removeAll: true }
                }]
            })
        ])) )
        .pipe(
            gulpIf(!isProduction, sourcemaps.write("./"))
        )
        .pipe(gulp.dest(dest))
        .pipe(browserSync.get(browserSyncName).stream())
}