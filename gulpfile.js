var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    js_obfuscator = require('gulp-js-obfuscator');


var erroJs = function (err) {
	gutil.log(gutil.colors.red('[Error]'), err.toString());
	this.emit('end');
};

var paths = {
	css: './src/*.css',
    js: './src/*.js',
    prod : './dist'
};



gulp.task('js', function () {
	return gulp.src(paths.js )
        .pipe(concat('vtex-variation-grid.min.js').on('error', erroJs))
        .pipe(uglify().on('error', erroJs))
        .pipe(js_obfuscator({
            concurrency: 2,
            keepLinefeeds: false,
            keepIndentations: false,
            encodeStrings: true,
            encodeNumbers: true,
            moveStrings: true,
            replaceNames: true,
            variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
        }).on('error', erroJs))
		.pipe(gulp.dest(paths.prod));
});

gulp.task('js:dev', function () {
	return gulp.src(paths.js )
        .pipe(concat('vtex-variation-grid.min.js').on('error', erroJs))
		.pipe(gulp.dest(paths.prod));
});

gulp.task('css', function(){
    return gulp.src(paths.css)
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.prod));
    }
);

gulp.task('clean', function () {
	return gulp.src(paths.prod).pipe(clean());
});


gulp.task('default',['clean'], function () {
	gulp.start(['js','css']);
});