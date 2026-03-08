const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const deploy = require('gulp-gh-pages');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');

// BrowserSync server
function serve(done) {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  }, done);
}

// HTML
function html() {
  return gulp.src([
    'src/**/*.html',
    '!src/_includes/**/*' // ignore
  ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

// Images
function imgs() {
  return gulp.src('src/assets/imgs/**/*')
    .pipe(gulp.dest('./build/assets/imgs'));
}

// SVGs
function svgs() {
  return gulp.src('src/assets/svgs/**/*')
    .pipe(gulp.dest('./build/assets/svgs'));
}

// Fonts
function fonts() {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('./build/assets/fonts'));
}

// JS HEAD
function jshead() {
  return gulp.src('src/assets/js/modernizr-custom.js')
    .pipe(gulp.dest('./build/assets/js'));
}

// Concat and Compress JS Files
function js() {
  return gulp.src([
    'src/assets/js/jquery-3.5.1.min.js',
    'src/assets/js/fitvids.js',
    'src/assets/js/site.js'
  ])
    .pipe(concat('site.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(browserSync.stream());
}

// Sass
function styles() {
  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(browserSync.stream());
}

// Move Misc Files
function misc() {
  return gulp.src([
    'src/CNAME',
    'src/robots.txt',
    'src/sitemap.xml'
  ])
    .pipe(gulp.dest('./build'));
}

// Deploy to GH Pages
function ghDeploy() {
  return gulp.src('./build/**/*')
    .pipe(deploy());
}

// Watch
function watch() {
  gulp.watch('src/assets/scss/**/*.scss', styles)
    .on('change', (path) => console.log(`File ${path} changed, running tasks...`));
  gulp.watch('src/**/*.js', js)
    .on('change', (path) => console.log(`File ${path} changed, running tasks...`));
  gulp.watch('src/**/*.html', html)
    .on('change', (path) => console.log(`File ${path} changed, running tasks...`));
}

// Export named tasks
exports.html = html;
exports.imgs = imgs;
exports.svgs = svgs;
exports.fonts = fonts;
exports.jshead = jshead;
exports.js = js;
exports.styles = styles;
exports.misc = misc;
exports.deploy = ghDeploy;
exports.watch = watch;

// Build: run all asset tasks in parallel
const build = gulp.parallel(imgs, svgs, fonts, misc, jshead, js, html, styles);
exports.build = build;

// Default: build, then start server and watch
exports.default = gulp.series(build, serve, watch);
