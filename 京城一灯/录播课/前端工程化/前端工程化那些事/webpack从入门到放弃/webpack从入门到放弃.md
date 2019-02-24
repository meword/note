### webpack 从入门到放弃



**webpack是什么？**

答：webpack是一个前端模块化打包工具



**什么是模块化？**

答：模块化是一种将系统分离成`独立功能`部分的方法，严格定义`模块接口`、模块间具有`透明性`

> 透明性：模块与模块之间，彼此都不关心彼此模块内的实现，只需要通过接口去引用模块



**为什么要模块化？**

答：web应用越来越复杂，简单的代码组织方式已经无法满足业务和架构需求，需要通过模块化来组织代码





---

#### 模块化历史

1. 无模块时代
2. 模块萌芽时代
3. 现代模块



**无模块时代**

``` javascript
// a.js
var a = function() {
    // todo sth...
}

// b.js
var b = function() {
    a()
}

// index.html
<script type="text/javascript" src="a.js"></script>
<script type="text/javascript" src="b.js"></script>
```

带来的问题：

1. 全局变量泛滥
2. 命名冲突
3. 依赖关系管理





**模块萌芽时代**

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
    // todo sth...
    window.jQuery = window.$ = jQuery
})(window);
```

带来的问题：

1. 依赖关系管理





**现代模块时代**

> CommonJS

CommonJS 只是一个规范，Nodejs 也是用了 Commonjs的规范

``` javascript
var math = require('math');
math.add(2, 3);	// 5
```





> RequireJS（AMD）/ SeaJS（CMD）

随着 Commonjs 在 Nodejs 的兴起，人们就想着能否在浏览器端也用到这样的规范，所以有了 RequireJs 和 SeaJS

``` javascript
require(['math'], function(math) {
    math.add(2, 3);
})
```





> ES6 Module

``` javascript
import math from 'math';
math.add(2, 3);	// 5
```





> 模块化的价值是什么？

建立模块化的标准，能够管理模块之间的依赖，从而提升代码的`可维护性`和`复用性`



> 高内聚 低耦合

内聚性：又称块内联系。指模块的功能强度的度量，即一个模块内部各个元素彼此结合的紧密程度的度量。若一个模块内各元素（语名之间、程序段之间）联系的越紧密，则它的内聚性就越高

耦合性：又称块间联系。指软件系统结构中各模块间相互联系紧密程度的一种度量。模块之间联系越紧密，其耦合性就越强，模块的独立性则越差。模块间耦合高低取决于模块间接口的复杂性、调用的方式及传递的信息

所谓高内聚是指一个软件模块是由相关性很强的代码组成，只负责一项任务，也就是常说的单一责任原则

对于低耦合，粗浅的理解是：一个完整的系统，模块与模块之间，尽可能的使其独立存在。也就是说，让每个模块，尽可能的独立完成某个特定的子功能。模块与模块之间的接口，尽量的少而简单。如果某两个模块间的关系比较复杂的话，最好首先考虑进一步的模块划分。这样有利于修改和组合

通俗点就是：一个模块完成一项任务，模块与模块之间独立性强（单一责任原则）







#### 为什么要用 webpack？

首先因为 React、Vue 等框架的崛起，内部都是用 webpack



**webpack的优点**

+ 拆分依赖到代码块，实现按需加载
+ 快速初始化加载
+ 所有静态资源都可以当做模块
+ 第三方库模块化
+ 自定义模块化打包
+ 适合做大型项目

 



**loader 功能**

+ 链式调用 资源通过管道 最后一个 loader 返回 javascript
+ 可以同步或异步执行
+ 运行在 Node.js 无所不能
+ 可以接收参数，你可以在配置文件中给设置 loaders
+ 可以通过资源扩展名或者正则表达式来配置每个 loader 生效范围
+ loader 可以通过 NPM 安装和发布
+ 插件可以提供给 loader 更多功能