/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

 var gulp=require('gulp');

 var less=require('gulp-less');
 var cssnano=require('gulp-cssnano');

//对less文件解析和压缩
 gulp.task('style',function() {
 	
 	//因为_开头的文件是被导入的,所以可以排除它
 	gulp.src(['./src/less/*.less','!./src/less/_*less'])

 	.pipe(less())

 	.pipe(cssnano())

 	.pipe(gulp.dest('./dist/css'))

 	.pipe(browserSync.reload({
      stream: true
    }));

 })


//对js文件合并和压缩混淆
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

 gulp.task('js',function(){

 	gulp.src('./src/js/*.js')

 	.pipe(concat('index.js'))  //合并
 
 	.pipe(uglify())  //混淆

 	.pipe(gulp.dest('./dist/js'))

 	.pipe(browserSync.reload({
      stream: true
    }));

 })

//图片复制
 gulp.task('img',function(){

 	gulp.src('./src/img/*.*')

 	.pipe(gulp.dest('./dist/img'))

 	.pipe(browserSync.reload({
      stream: true
    }));

 })

 //html压缩
 var htmlmin=require('gulp-htmlmin')
gulp.task('htmlmin',function(){

	gulp.src('./src/*.html')

	//htmlmin更多配置查看官网
	.pipe(htmlmin({
		collapseWhitespace: true, //去掉空白字符
      	removeComments: true  //去注释
	}))

	.pipe(gulp.dest('dist'))

	.pipe(browserSync.reload({
      stream: true
    }));
})




var browserSync = require('browser-sync').create();


// 开启服务时执行多个任务
gulp.task('server',['style','js','img','htmlmin'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

  gulp.watch('src/less/*.less',['style']);
  gulp.watch('src/js/*.js',['js']);
  gulp.watch('src/img/*.*',['img']);
  gulp.watch('src/*.html',['htmlmin']);
});