//add gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var SOURCEPATHS = {
	sassSource : 'src/scss/*.scss',
	htmlSource : 'src/*.html',
	jsSource : 'src/js/**'
}

var APPPATH = {
	root : 'app/',
	css : 'app/css',
	js : 'app/js',
	fonts : 'app/fonts'
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

	var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
	//look at the file in this folder
	sassFiles = gulp.src(SOURCEPATHS.sassSource)
	//add autoprefixer
	.pipe(autoprefixer())
	//compile it to css to this folder
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	
	//save file in destination
	return merge(bootstrapCSS, sassFiles)
		.pipe(concat('app.css'))
		.pipe(gulp.dest(APPPATH.css))
});

gulp.task('moveFonts', function(){
	gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest(APPPATH.fonts));
});

gulp.task('scripts', ['clean-scripts'], function(){
	gulp.src(SOURCEPATHS.jsSource)
	.pipe(concat('main.js'))
	.pipe(browserify())
	.pipe(gulp.dest(APPPATH.js))
});

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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts', 'moveFonts'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
	gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);	