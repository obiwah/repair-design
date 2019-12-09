const gulp = require("gulp"),
	browserSync = require('browser-sync').create(),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

gulp.task('hello', (done) => {
	console.log('hello world');
	done();
});

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("app/*.html").on('change', browserSync.reload);
});

// npm install --save-dev gulp-cssmin

gulp.task('minify', function (done) {
	gulp.src('css/style.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css'));
	done();
});

