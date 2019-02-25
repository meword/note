  

### 包管理器 npm

+ 允许用户从 NPM 服务器下载别人编写的三方包到本地使用
+ 允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用
+ 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用



### 使用 http 开启一个服务器

``` javascript
const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plan'});
	res.end('Hello world!');
}).listen(3000, () => {
	console.log('服务器开启了')
})
```

