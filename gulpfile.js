const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gcmq = require('gulp-group-css-media-queries');
// const sassGlob = require('gulp-sass-glob');
const pug = require('gulp-pug');
const del = require('del');

gulp.task('clean:build', function () {
	return del('./build');
})

gulp.task('pug', function (callback) {
	return gulp.src('./src/pug/pages/**/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'PUG',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./build/'))
		.pipe(browserSync.stream());
	callback();
});

gulp.task('scss', function (callback) {
	return gulp.src('./src/scss/main.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		// .pipe(sassGlob())
		.pipe(sass({
			indentType: 'tab',
			indentWidth: 1,
			outputStyle: 'expanded'
		}))
		.pipe(gcmq())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}))
		.pipe(gulp.dest('./build/css/'))
		.pipe(browserSync.stream())
	callback();
});

gulp.task('copy:img', function (callback) {
	return gulp.src('./src/img/**/*.*')
		.pipe(gulp.dest('./build/img/'));
	callback();
})

gulp.task('copy:js', function (callback) {
	return gulp.src('./src/js/**/*.*')
		.pipe(gulp.dest('./build/js/'));
	callback();
})

gulp.task('copy:libs', function (callback) {
	return gulp.src('./src/libs/**/*.*')
		.pipe(gulp.dest('./build/libs/'));
	callback();
})

gulp.task('watch', function () {
	watch('./src/pug/**/*.pug', gulp.parallel('pug'));

	watch('./src/scss/**/*.scss', function () {
		setTimeout(gulp.parallel('scss'), 1000);
	});

	watch('./src/img/**/*.*', gulp.parallel('copy:img'));
	watch('./src/js/**/*.*', gulp.parallel('copy:js'));
	watch('./src/libs/**/*.*', gulp.parallel('copy:libs'));
	watch([
		'./build/img/**/*.*',
		'./build/js/**/*.*',
		'./build/libs/**/*.*',
	], gulp.parallel(browserSync.reload));
});

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task(
	'default',
	gulp.series(
		gulp.parallel('clean:build'),
		gulp.parallel('pug', 'scss', 'copy:img', 'copy:js', 'copy:libs'),
		gulp.parallel('server', 'watch')
	)
);
