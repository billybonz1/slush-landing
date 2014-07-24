var gulp  = require('gulp'),
minifyCSS = require('gulp-minify-css'),
jsmin     = require('gulp-jsmin'),
imagemin  = require('gulp-imagemin'),
concat    = require('gulp-concat'),
rename    = require('gulp-rename'),
htmlmin   = require('gulp-htmlmin'),
sass      = require('gulp-sass');



var paths = {
   styles: ['./www/css/*.css','!./www/css/*.min.css'],
  scripts: ['./www/js/*.js','!./www/js/*.min.js']
};


//task for watch sass
gulp.task('sass', function () {
    gulp.src('./www/scss/all.scss')
        .pipe(sass())
        .pipe(minifyCSS(opts))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css/'));
});

// Task for concat the *.css files 
gulp.task('concatcss', ['sass'], function() {
  gulp.src('./src/css/*.css')
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./src/css/'))
});

// Task for minifier the *.png images
gulp.task('imagemin',function () {
  gulp.src('./www/img/*.*')
  .pipe(imagemin(opts))
  .pipe(gulp.dest('./src/img'))
})


// Task for minifier the *.js files 
gulp.task('minifyjs',function(){
  gulp.src(paths.scripts)
  .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./www/js/min/'))
});

// Task for concat the *.js files
gulp.task('concatjs', ['minifyjs'], function() {
  gulp.src('./www/js/min/*.js')
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./src/js/'))
});

// task for minifier .html
gulp.task('minifyhtml', function() {
  gulp.src('./www/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments:true, removeCommentsFromCDATA:true}))
    .pipe(gulp.dest('./src/'))
});


gulp.task('watch',function(){
    gulp.watch('./www/js/*.js', ['concatjs']);
    gulp.watch('./www/img/*.*', ['imagemin']);
    gulp.watch('./www/*.html', ['minifyhtml']);
    gulp.watch('./www/scss/*.scss', ['concatcss']);

});

// Taks default gulp! 
gulp.task('default', function(){
  console.log('running tasks...')
});





