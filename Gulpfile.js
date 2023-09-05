var postcss = require('gulp-postcss');
const { src, dest, watch, series } = require('gulp');
var autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
const postcssFlexbox = require('postcss-flexbox');
const postcssVars = require('postcss-simple-vars');

var plugins = [
    postcssFlexbox(),
    autoprefixer(),
    postcssVars()
];

const styleSource = ['styles/*.pcss'];
const htmlSource = ['*.html'];

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function compile() {
    return src(styleSource)
        .pipe(postcss(plugins))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(dest('./dest'));
}

function watchTask() {
    watch(styleSource, series(compile, browsersyncReload));
    watch(htmlSource, browsersyncReload);
}

exports.default = series( browsersyncServe, watchTask )
exports.compile = compile
