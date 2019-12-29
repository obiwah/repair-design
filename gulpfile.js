const {src, dest, watch, series} = require(`gulp`),
	browserSync = require(`browser-sync`).create(),
	sass = require(`gulp-sass`),
	autoprefixer = require(`gulp-autoprefixer`),
	cleanCss = require('gulp-clean-css');

// Static server
function bs() {
	serveSass();
	browserSync.init({
		server: {
			baseDir: `./`
		}
	});
	watch(`./*.html`).on(`change`, browserSync.reload);
	watch(`.sass/**/*.sass`, serveSass);
	watch(`.sass/**/*.scss`, serveSass);
	watch(`./js/*.js`).on(`change`, browserSync.reload);
}

function serveSass() {
	return src(`./sass/**/*.sass`, `./sass/**/*.scss`)
		.pipe(sass())
		.pipe(dest(`./css`))
		.pipe(browserSync.stream());
}

function buildHtml () {
	return src(`*.html`)
				.pipe(dest(`dist/`));
}

function buildPhp() {
	return src(`*.php`)
		.pipe(dest(`dist/`))
		.pipe(src(`phpMailer/*.php`))
		.pipe(dest(`dist/phpMailer/`))
}

function buildCss() {
	return src(`css/**/*.css`)
		.pipe(autoprefixer({ cascade: false }))
		.pipe(dest(`dist/css`))
		.pipe(src([`dist/css/**/*.css`, `!dist/css/**/*.min.css`]))
		.pipe(cleanCss({compatibility: 'ie8'}))
}


exports.serve = bs;
exports.build = series(buildHtml, buildPhp, buildCss);