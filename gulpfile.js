//
var gulp = require('gulp');
var sass = require("gulp-sass");




gulp.task('copy-html',function(){
	return gulp.src('html/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

var imagemin = require("gulp-imagemin");//图片压缩
gulp.task('images',function(){
	return gulp.src('img/*.{jpg,png}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
});



gulp.task("sassTask", function(){
	return gulp.src("sass/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
});

gulp.task('scripts',function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

gulp.task('data',function(){
	return gulp.src('data/*.json')
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
});

gulp.task('build',['copy-html','images','sassTask','scripts','data'],function(){
	console.log('编译成功');
});

/*
	gulp监听文件
*/

gulp.task('watch',function(){
	gulp.watch('html/*.html',['copy-html']);
	gulp.watch('img/*.{jpg,png}',['images']);
	gulp.watch('sass/*.scss',['sassTask']);
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('data/*.json',['data']);

});

var  connect = require('gulp-connect');
gulp.task('server',function(){
	connect.server({
	root:'dist',
	port:8888,
	livereload:true
     })
});


gulp.task('default',['watch','server']);

