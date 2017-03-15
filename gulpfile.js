//add gulp
var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCEPATHS = {
	sassSource : 'src/scss/*.scss'
}

var APPPATH = {
	root : 'app/',
	css : 'app/css',
	js : 'app/js'
}

gulp.task('sass', function(){
	//look at the file in this folder
	return gulp.src(SOURCEPATHS.sassSource)
	//compile it to css to this folder
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest(APPPATH.css))
});


gulp.task('serve', ['sass'], function(){
	//initialise browserSync and then list the files you want browsersync to check for you
	browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
		server : {
			//initialise browsersSync in this folder
			baseDir : APPPATH.root
		}
	});
});

gulp.task('watch', ['serve', 'sass'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
});

gulp.task('default', ['watch']);	