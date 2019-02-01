### 路由

> 一个域名，下边能分出很多个可访问的地址，就叫路由

我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码

因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的 HTTP 服务器的功能

我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递，但是为了解析这些数据，我们需要额外的 Node.js 模块，它们分别是 url(用户请求的url) 和 querystring(get请求数据 ) 模块

```
							url.parse(string).query
			url.parse(string).pathname  |
                        |			    |
                        |			    |
					  -----  ------------------
http://localhost:8888/start?foo=bar&hello=world
							---			  -----
							 |				|
							 |				|
				querystring(string)["foo"]	|
								querystring(string)['hello']
```

一般路由会分做两层：

> 一个 controller 对应多个 action

+ controller 控制层（上面地址的start就是控制层）
+ action 动作层（/start/xxx 这个 xxx 就是 action 动作层）





实现一个简单的路由：

> http.js

``` javascript
const http = require('http');
const url = require('url');

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(pathname, response);
    }
    
    http.createServer(onRequest).listen(8888);
    console.log('Server has started');
}

exports.start = start;
```

> router.js

``` javascript
function route(pathname, response) {
	if (pathname === '/') {
		response.writeHead(200, {
			"Content-Type": "text/plain"
		})
		response.write('Hello World');
		response.end();
	} else if (pathname === '/index/home') {
		response.end('index');
	} else {
		response.end('404')
	}
}

exports.route = route;
```

> index.js

``` javascript
const server = require('./http.js');

server.start();
```

