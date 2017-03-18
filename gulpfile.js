//add gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var SOURCEPATHS = {
	sassSource : 'src/scss/*.scss',
	htmlSource : 'src/*.html',
	jsSource : 'src/js/**'
}

var APPPATH = {
	root : 'app/',
	css : 'app/css',
	js : 'app/js'
}

gulp.task('clean-html', function(){
	//force:true is the important part here it is used to look for files which should be in the folder
	return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
	.pipe(clean());
});

gulp.task('clean-scripts', function(){
	//force:true is the important part here it is used to look for files which should be in the folder
	return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
	.pipe(clean());
});

gulp.task('sass', function(){
	//look at the file in this folder
	return gulp.src(SOURCEPATHS.sassSource)
	//add autoprefixer
	.pipe(autoprefixer())
	//compile it to css to this folder
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	//save file in destination
	.pipe(gulp.dest(APPPATH.css))
});

gulp.task('scripts', ['clean-scripts'], function(){
	gulp.src(SOURCEPATHS.jsSource)
	.pipe(gulp.dest(APPPATH.js))
})

gulp.task('copy', ['clean-html'], function(){
	gulp.src(SOURCEPATHS.htmlSource)
	.pipe(gulp.dest(APPPATH.root));
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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
	gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);	