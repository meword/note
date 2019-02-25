#### 什么是中间件？

中间件（Middleware）是一个函数，它可以访问请求对象（request object(req)），响应对象（response object(res)），和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量



#### 中间件的功能

+ 执行任何代码
+ 修改请求和响应对象
+ 终结请求-响应循环
+ 调用堆栈中的下一个中间件



#### express 应用可使用如下几种中间件：

+ 应用级中间件

  ``` javascript
  const app = express();
  app.use('/user/:id', function(req, res, next) {
      console.log('Request URL:', req.originalUrl);
      next();
  }, function(req, res, next) {
      console.log('Request Type:', req.method);
      next();
  })
  ```

+ 路由级中间件

  ``` javascript
  const router = express.Router();
  // router 中间件和 app 中间件处理的情况一样
  // router 里面没有特别复杂的 api，router 只有路由相关的 api，所以被称为 mini-app
  router.use('/user/:id', function(req, res, next) {
      console.log('Request URL:', req.originalUrl);
      next();
  }, function(req, res, next) {
      console.log('Request Type:', req.method);
      next();
  })
  ```

+ 错误处理中间件*

  + 非常重要，一般在网站编写都会先去编辑这个错误处理的中间件
  + 5xx 中间件：当前系统挂了，系统服务出错
  + 4xx 中间件：访问不到，权限验证不过
  + 常见的就是：500中间件、404中间件

  ``` javascript
  // 必须放到底部，否则无法捕获错误
  app.use(function(err, req, res, next) {
  	console.error(err.stack);
  	res.status(500).send('前方正在施工！');
  })
  ```

+ 内置中间件

  + express.static 中间件

+ 第三方中间件 

  > cookie-parser

  ``` javascript
  const cookieParser = require('cookie-parser');
  
  app.use(cookieParser());
  
  app.get('/', ((req, res, next) => {
      console.log(req.cookies);	// 拿到网站的cookie
      res.send('123123');
  ```

  