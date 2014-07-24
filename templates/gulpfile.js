devvar gulp  = require('gulp'),
minifyCSS = require('gulp-minify-css'),
jsmin     = require('gulp-jsmin'),
imagemin  = require('gulp-imagemin'),
concat    = require('gulp-concat'),
rename    = require('gulp-rename'),
htmlmin   = require('gulp-htmlmin'),
sass      = require('gulp-sass');



var paths = {
   styles: ['./dev/css/*.css','!./dev/css/*.min.css'],
  scripts: ['./dev/js/*.js','!./dev/js/*.min.js']
};


//task for watch sass
gulp.task('sass', function () {
    gulp.src('./dev/scss/all.scss')
        .pipe(sass())
        .pipe(minifyCSS(opts))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./www/css/'));
});

// Task for concat the *.css files 
gulp.task('concatcss', ['sass'], function() {
  gulp.src('./www/css/*.css')
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./www/css/'))
});

// Task for minifier the *.png images
gulp.task('imagemin',function () {
  gulp.src('./dev/img/*.*')
  .pipe(imagemin(opts))
  .pipe(gulp.dest('./www/img'))dev
})


// Task for minifier the *.js files 
gulp.task('minifyjs',function(){
  gulp.src(paths.scripts)
  .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dev/js/min/'))
});

// Task for concat the *.js files
gulp.task('concatjs', ['minifyjs'], function() {
  gulp.src('./dev/js/min/*.js')
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./www/js/'))
});

// task for minifier .html
gulp.task('minifyhtml', function() {
  gulp.src('./dev/*.html')
    .pipe(htmlmin({collapseWhitespace: trwwwue, removeComments:true, removeCommentsFromCDATA:true}))
    .pipe(gulp.dest('./www/'))
});


gulp.task('watch',function(){
    gulp.watch('./dev/js/*.js', ['concatjs']);
    gulp.watch('./dev/img/*.*', ['imagemin']);
    gulp.watch('./dev/*.html', ['minifyhtml']);
    gulp.watch('./dev/scss/*.scss', ['concatcss']);

});

// Taks default gulp! 
gulp.task('default', function(){
  console.log('running tasks...')
});





