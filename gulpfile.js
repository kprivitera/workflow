//add gulp
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function(){
	//look at the file in this folder
	return gulp.src('src/scss/app.scss')
	//compile it to css to this folder
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
});

gulp.task('default')