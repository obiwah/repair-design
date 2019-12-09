const gulp = require("gulp"),
	browserSync = require('browser-sync').create();

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


