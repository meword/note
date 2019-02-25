### express

[参考地址](http://www.runoob.com/nodejs/nodejs-express-framework.html)

地址内有：

+ post 方法
+ 文件上传
+ cookie 管理



> 初始化

``` javascript
const express = require('express');	// 导入express
const app = express();		// 初始化express
```



#### 中间件

> 为了区分用户的操作，为了解决代码冗余



####监听端口

``` javascript
const port = 3000;	// 端口号
app.listen(port, function() {
    // 成功的回调函数
    console.log('端口监听成功')
})
```

---

#### 接收 get 请求

``` javascript
const path = '/';	// 监听的地址
app.get(path, ((req, res) => {
   	// req 放着请求的信息
    // res 放着相应的对应操作
    console.log(req.query)
}))

// 访问 localhost:3000?username=123
// 得到 {username: 123}
```

> 接收变量模式

``` javascript
const path = '/:username';	// 监听的地址
app.get(path, ((req, res) => {
    console.log(req.params)
}))

// 访问 localhost:3000/123
// 得到 {username: 123}
```



---

#### 接收 post 请求

> express 接收 post 参数需要下载一个依赖包

```bash
npm install body-parser --save
```

``` javascript
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));	// 注入中间件

const path = '/';	// 监听的地址
app.post(path, ((req, res) => {
    console.log(req.body)
}));
```

> 或者局部引用

``` javascript
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const path = '/';	// 监听的地址
app.post(path, urlencodedParser, ((req, res) => {
    console.log(req.body)
}));
```

> 测试

``` javascript
// 使用 ajax 发送 post 请求
$.ajax({
    type: 'post',
    url: '/',
    data: {
        username: 123
    }
})
// 得到 {username: 123}
```



### supervisor

[npm地址](](https://www.npmjs.com/package/supervisor))

由于我们开发阶段每次更改 nodejs 里的代码都需要重新启动服务才能运行，这样造成开发的不便，所以我们需要使用 supervisor 来热更新 nodejs 代码，当我们更改 nodejs 的代码后，他会自动帮我们重新启动服务

> 安装

``` bash
npm install supervisor -g
```

> 使用

``` bash
supervisor xxx.js
```

