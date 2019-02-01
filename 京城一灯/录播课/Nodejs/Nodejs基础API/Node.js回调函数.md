### 什么是回调？

+ 函数调用方式分为三类：同步调用、回调和异步调用
+ 回调是一种双向调用模式
+ 可以通过回调函数来实现回调



### 阻塞和非阻塞

+ 阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态
+ 阻塞就是做不完不准回来
+ 非阻塞就是你先做，我先看看有还有没其他事，你做完了告诉我一声



例：

``` javascript
const fs = require('fs');


// 阻塞代码
/* var data = fs.readFileSync('data.txt');
console.log(data.toString());*/

// 非阻塞代码
/* var data = fs.readFile('data.txt', 'utf-8',(err, data) => {
	if (err) {
		throw new Error('读取有误');
	}

	console.log(data);
}) */
```

