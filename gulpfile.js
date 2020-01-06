const {src, dest, watch, series} = require(`gulp`),
	browserSync = require(`browser-sync`).create(),
	sass = require(`gulp-sass`),
	htmlMin = require('gulp-htmlmin'),
	autoprefixer = require(`gulp-autoprefixer`),
	cleanCss = require('gulp-clean-css'),
	imageMin = require('gulp-imagemin'),
	minifyJs = require('gulp-minify');

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

function buildHtml (cb) {
	src(`*.html`)
		.pipe(htmlMin({
			collapseWhitespace: true,
			removeComments: true}))
		.pipe(dest(`dist/`));

	cb();
}

function buildPhp(cb) {
	src(`*.php`).pipe(dest(`dist/`));
	src(`phpMailer/*.php`).pipe(dest(`dist/phpMailer/`));

	cb();
}

function buildCss(cb) {
	src(`css/style.css`)
		.pipe(autoprefixer({ cascade: false }))
		.pipe(cleanCss())
		.pipe(dest(`dist/css`));

	src([`css/**/*.css`, `!css/style.css`, `!css/**/*.min.css`])
		.pipe(cleanCss())
		.pipe(dest(`dist/css`));

	src(`css/**/*.min.css`)
		.pipe(dest(`dist/css`));

	cb();
}

function buildFonts (cb) {
	src(`fonts/**/**`)
		.pipe(dest(`dist/fonts`));

	cb();
}

function buildImg (cb) {
	src(`img/**/*`)
		// .pipe(imageMin()) // image compression via webStorm plugin, just copy
		.pipe(dest(`dist/img`));

	cb();
}

function buildJs (cb) {
	src(`js/**/*`)
		.pipe(minifyJs({
			noSource : true,
			ext:{
				min:'.js'
			},
			ignoreFiles: ['*.min.js']
		}))
		.pipe(dest(`dist/js`));

	cb();
}

exports.serve = bs;
exports.build = series(buildHtml, buildPhp, buildCss, buildFonts, buildImg, buildJs);
exports.html = buildHtml;
exports.buildimg = buildImg;