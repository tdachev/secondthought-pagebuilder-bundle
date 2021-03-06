var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cache = require('gulp-cached');


var paths = {
  sass: 'sass/secondthought-addons-styles.scss',
  images: 'img/**/*',
  scripts: [
    'bower_components/slick-carousel/slick/slick.js',
    'bower_components/matchHeight/jquery.matchHeight.js',
    'bower_components/fancybox/lib/jquery.mousewheel-3.0.6.pack.js',
    'bower_components/fancybox/source/jquery.fancybox.js',
    'bower_components/fancybox/source/helpers/jquery.fancybox-buttons.js',
    'bower_components/fancybox/source/helpers/jquery.fancybox-media.js',
    'bower_components/fancybox/source/helpers/jquery.fancybox-thumbs.js',
    'bower_components/stellar.js/jquery.stellar.min.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/fillerup/jquery.fillerup.js',
    'bower_components/throttle/src/js/throttle.js',
    'javascripts/*.js',
  ]
};

gulp.task('scripts-release', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(concat('secondthought-addons-scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(concat('secondthought-addons-scripts.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('sass', function () {
  return sass('sass/secondthought-addons-styles.scss', { sourcemap: true })
    .on('error', function (err) { console.log(err.message); })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('sass-release', function () {
  return sass('sass/secondthought-addons-styles.scss', { sourcemap: true })
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('scss-lint', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(scsslint({
      'config': 'lint.yml',
    })
  );
});

gulp.task('lint-watch', function() {
  gulp.watch('sass/**/*.scss', ['scss-lint']);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('watch-release', function() {
  gulp.watch(paths.scripts, ['scripts-release']);
  gulp.watch(paths.sass, ['sass-release']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'sass', 'watch']);

gulp.task('release', ['scripts-release', 'sass-release', 'watch-release']);
