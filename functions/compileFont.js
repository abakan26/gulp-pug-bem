const gulp = require("gulp");
const plumber = require('gulp-plumber');

module.exports = function compileFonts(params) {
    const {src, dest} = params;
    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulp.dest(dest))
}