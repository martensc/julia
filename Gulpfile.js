const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const deploy = require('gulp-gh-pages');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');

// browserSync
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

// HTML
gulp.task('html', () => (
  gulp.src([
    'src/**/*.html',
    '!src/includes/**/*' // ignore
  ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

// Images
gulp.task('imgs', () => (
  gulp.src('src/assets/imgs/**/*')
    .pipe(gulp.dest('./build/assets/imgs'))
));

// SVGs
gulp.task('svgs', () => (
  gulp.src('src/svgs/**/*')
    .pipe(gulp.dest('./build/svgs'))
));

// Fonts
gulp.task('fonts', () => (
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
));

// Concat and Compress JS Files
gulp.task('js', () => (
  gulp.src('src/js/**/*')
    .pipe(concat('site.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

// Sass
gulp.task('sass', () => (
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

// Move Misc Files
gulp.task('misc', function() {
  gulp.src(['src/CNAME'])
    .pipe(gulp.dest('./build'));
});

// Deploy to GH Pages
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});


// Watch
gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass'])
  .on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('src/*.js', browserSync.reload)
  .on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('src/*.html', browserSync.reload)
  .on('change', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

// Watch
gulp.task('sass:watch', ['browserSync', 'sass'], () => (
  gulp
    .watch('src/scss/**/*.scss', ['sass'])
));

gulp.task('js:watch', ['browserSync', 'js'], () => (
  gulp
    .watch('src/**/*.js', ['js'])
));

gulp.task('html:watch', ['browserSync', 'html'], () => (
  gulp
    .watch('src/**/*.html', ['html'])
));

gulp.task('default', ['imgs', 'svgs', 'fonts', 'misc', 'js', 'js:watch', 'html', 'html:watch', 'sass', 'sass:watch', 'watch']);

gulp.task('build', ['imgs', 'svgs', 'fonts', 'js', 'misc', 'html', 'sass']);
