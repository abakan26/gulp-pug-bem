const {series, parallel, watch, src, dest} = require("gulp");
const browserSync = require('browser-sync').create('main');
const argv = require('yargs').argv;
argv.production = argv.production || false;
const isProduction = argv.production;
const buildStyles = require('./functions/compileCss');
const compileFonts = require('./functions/compileFont');
const compileImages = require('./functions/compileImages');
const compilePug = require('./functions/compilePugToHtml');
const buildJs = require('./functions/compileJs');
const gulpClean = require('gulp-clean');

function clean() {
    return src('./dist/*', {read: false})
        .pipe(gulpClean({force: true}));
}

function scss(cb) {
    return buildStyles(
        {
            src: [
                "./src/blocks/index.scss",
            ],
            dest: './dist',
            bundleName: './style.css',
            browserSyncName: 'main',
            isProduction: isProduction,
        })
}

function fonts(cb) {
    return compileFonts({
        src: './src/assets/fonts/*.{woff,woff2,ttf,eot}',
        dest: './dist/fonts'
    })
}

function favicon() {
    return src('./src/favicon.ico')
        .pipe(dest('./dist'));
}

function images(cb) {
    return compileImages({
        src: ['./src/assets/images/*.{png,jpg,jpeg,svg}', './src/pages/**/*.{png,jpg,jpeg,svg}'],
        dest: './dist/images',
        browserSyncName: 'main',
        isProduction: isProduction,
    })
}

function pug(cb) {
    return compilePug({
        src: './src/*.pug',
        dest: './dist',
        browserSyncName: 'main',
        isProduction: isProduction,
    })
}

function js(cb) {
    buildJs({
        src: ['./src/**/*.js'],
        dest: './dist',
        browserSyncName: 'main',
    })
    cb()
}

function browserSyncInit(cb) {
    browserSync.init({
        injectChanges: true,
        server: './dist',
        notify: true,
        ghost: true,
    });
    cb();
}

function serve(cb) {
    watch("./src/blocks/**/*.scss", scss);
    watch("./src/assets/fonts/*.{woff,woff2,ttf,eot}", fonts);
    watch(['./src/assets/images/*.{png,jpg,jpeg,svg}', './src/pages/**/*.{png,jpg,jpeg,svg}'], images);
    watch("./src/**/*.pug", pug);
    watch("./src/**/*.js", js);
    // watch("./dist/*.html").on('change', browserSync.reload);
    cb();
}


exports.clean = series(clean);
exports.scss = series(scss);
exports.fonts = series(fonts);
exports.images = series(images);
exports.pug = series(pug);
exports.js = series(js);

const build = series(clean, parallel(favicon, images, fonts, js, pug), scss)

exports.build = build;
exports.dev = series(build, browserSyncInit, serve);
