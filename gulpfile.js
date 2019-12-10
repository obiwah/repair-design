const {src, dest, watch} = require("gulp"),
	browserSync = require('browser-sync').create(),
	// cssmin = require('gulp-cssmin'),
	// rename = require('gulp-rename'),
	sass = require('gulp-sass');

// Static server
function bs() {
	serveSass();
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	watch("./*.html").on('change', browserSync.reload);
	watch(".sass/**/*.sass", serveSass);
	watch(".sass/**/*.scss", serveSass);
	watch("./js/*.js").on('change', browserSync.reload);
}

function serveSass() {
	return src("./sass/**/*.sass", "./sass/**/*.scss")
		.pipe(sass())
		.pipe(dest("./css"))
		.pipe(browserSync.stream());
}

// npm install --save-dev gulp-cssmin

// gulp.task('minify', function (done) {
// 	gulp.src('css/style.css')
// 		.pipe(cssmin())
// 		.pipe(rename({suffix: '.min'}))
// 		.pipe(gulp.dest('css'));
// 	done();
// });

exports.serve = bs;