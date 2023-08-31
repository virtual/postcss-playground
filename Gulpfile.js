var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

var plugins = [
    autoprefixer()
];

const styleSource = ['styles/*.pcss'];
const watcher = gulp.watch(styleSource);
 
function compile() {
    return gulp.src(styleSource)
        .pipe(postcss(plugins))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest('./dest'));
}

function defaultTask() {
    watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        compile()
    });
}

exports.default = defaultTask
exports.compile = compile

// Using Gulp v3
// var postcss = require('gulp-postcss');
// var gulp = require('gulp');
// var blur = require('postcss-blur');

// gulp.task('serve', ['css'], function() {
//     gulp.watch("./styles/*.css", ['css']);
// });

// gulp.task('css', function() {
//     var plugin = [
//         blur()
//     ];
//     return gulp.src('./styles/*.css')
//         .pipe(postcss(plugin))
//         .pipe(gulp.dest('./dest'));
// });

// gulp.task('default', ['serve']);