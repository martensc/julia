const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const deploy = require('gulp-gh-pages');

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
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

// Images
gulp.task('imgs', () => (
  gulp.src('src/imgs/**/*')
    .pipe(gulp.dest('./build/imgs'))
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

gulp.task('html:watch', ['browserSync', 'html'], () => (
  gulp
    .watch('src/**/*.html', ['html'])
));

gulp.task('default', ['imgs', 'svgs', 'fonts', 'misc', 'html', 'html:watch', 'sass', 'sass:watch', 'watch']);

gulp.task('build', ['imgs', 'svgs', 'fonts', 'misc', 'html', 'sass']);
