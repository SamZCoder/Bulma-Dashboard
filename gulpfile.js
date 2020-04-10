const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


gulp.task('build_js', function(){
    return gulp.src('./src/javascript/*.js')
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./build/javascript', {overwrite : true}));
});

gulp.task('build_sass', function(){
    return gulp.src('./src/sass/*.sass')
    .pipe(sass({ includePaths : ['./node_modules'], outputStyle : 'compressed'}))

    .pipe(rename({ suffix : '.min'}))
    .pipe(gulp.dest('./build/css', {overwrite : true}));
})

gulp.task('build_html', function(){
    return gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('./build', {overwrite:true}));
});

//Watch Task
gulp.task('watch', function(){
    
    gulp.watch('./src/sass/*.sass', gulp.series('build_sass'));
    gulp.watch('./src/javascript/*.js', gulp.series('build_js'));
    gulp.watch('./src/pages/*.html', gulp.series('build_html'));

});

//Single Run as Default
gulp.task('default', gulp.series('build_html', 'build_sass', 'build_js'));