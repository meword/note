### gulp

> 学习时gulp版本：4.0



#### series

> gulp.series API帮助我们串行的运行函数

```` javascript
series(func1, func2)
````



#### parallel

> gulp.parallel API帮助我们并行的运行函数

``` javascript
parallel(func1, func2)
```







#### 使用gulp简单的完成watch

``` javascript
const gulp = require('gulp');

const src_css = './assets/css',
	dest_css = './dist/css';

gulp.task('mincss', function(cb) {
	gulp.src(src_css + '/**/*.css')
		.pipe(gulp.dest(dest_css));
	cb();
});

gulp.task('watch', function () {
	gulp.watch(src_css + '/**/*.css', gulp.series('mincss', 'watch'));
});

gulp.task('default', gulp.series('mincss', 'watch'));
```



#### 