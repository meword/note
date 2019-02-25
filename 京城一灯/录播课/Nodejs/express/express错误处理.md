### 错误处理

定义错误处理中间件和定义其他中间件一样，除了需要 4 个参数，而不是三个，其格式如下(err, req, res, next)

例如：

``` javascript
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.stauts(500).send('Something broke');
})
```

在其它 app.use() 和路由调用后，最后定义错误处理中间件，比如：

``` javascript
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
	// 业务逻辑
})
```

中间件返回的响应式随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其它任何你想要的东西

为了便于组织（更高级的框架），你可能会像定义常规中间件一样，定义多个错误处理中间件。比如你想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：

``` javascript
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
```

logErrors 将请求和错误信息写入标准错误输出、日志或类似服务：

``` javascript
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
```

clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）:

``` javascript
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something blew up!'});
    } else {
        next(err);
    }
}
```

 errorHandler 能捕获所有错误，其定义如下：

``` javascript
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
```





#### 缺省错误处理句柄

Express 内置了一个错误处理句柄，它可以捕获应用中可能出现在的任意错误。这个缺省的错误处理中间件将被添加到中间件堆栈的底部

如果你向 next() 传递了一个 error，而你并没有在错误处理句柄中处理这个 error，Express 内置的错误句柄就是最后兜底的。最后错误将被连同堆栈追踪信息一同反馈到客户端。堆栈追踪信息并不会在生产环境中反馈到客户端

``` 
设置环境变量 NODE_ENV 为"production"就可以让应用运行在生产环境模式下
```

如果你已经开始向 response 输出数据了，这时才调用 next() 并传递了一个 error，比如你在将向客户端输出数据流时遇到一个错误，Express 内置的缺省错误处理句柄将帮你关闭连接并告知 request 请求失败

因此，当你添加了一个自定义的错误处理句柄后，如果已经向客户端发送报头信息了，你还可以将错误处理交给 Express 内置的错误处理机制

``` javascript
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}
```





#### 好用的错误日志

+ log4j.js