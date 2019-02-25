### 模块化历史

1. 无模块时代
2. 模块萌芽时代
3. 现代模块



---

#### 无模块时代

``` javascript
// a.js
var a = function() {
    // doing...
}

// b.js
var b = function() {
    a()
}

// index.html
<script src="a.js" type="text/javascript"></script>
<script src="b.js" type="text/javascript"></script>
```

**缺点：**

1. 全局变量泛滥
2. 命名冲突
3. 依赖关系管理



---

#### 模块萌芽时代

> 立即执行函数（IIFE）

``` javascript
var moduleA = function() {
    var a, b;
    return {
        message: function(c) {
            alert(a + b + c);
        }
    }
}();

(function(window) {
    // doing...
    window.jQuery = window.$ = jQuery;
})(window);
```



---

#### 现代模块时代

CommonJs

``` javascript
var math = require('math');
math.add(2, 3);	// 5
```



RequireJS（AMD）/ SeaJS（CMD）

相关文章：[AMD 和 CMD 的区别](https://www.zhihu.com/question/20351507/answer/14859415)

区别：

CMD 推崇依赖就近，AMD 推崇依赖前置

``` javascript
// CMD
define(function (require, exports, module) {
    var a = require('./a');
    a.doSomething();
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ... 
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    // ...
})
```

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法

AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹



ES6 Module

``` javascript
   import math from 'math';
   math.add(2, 3);	// 5
```





### 为什么要模块化？

+ 可复用代码，单一职责性
+ 高内聚，低耦合







### webpack

webpack是前端模块化（模块化是一种将系统分离成独立功能部分的方法，严格定义模块接口、模块间具有透明性）的打包工具，webpack提倡“万物皆模块”，也就是说webpack能打包所有文件



**webpack 配置：**

+ entry：配置入口资源
+ output：配置编译后的资源
+ module：资源处理
+ resolve：配置资源别名/扩展名等
+ plugins：插件，比loader更强大