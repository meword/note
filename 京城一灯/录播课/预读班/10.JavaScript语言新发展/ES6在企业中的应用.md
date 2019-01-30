### 模块

+ AMD
    + requirejs
+ CMD
    + CDS
+ commonjs
    + nodejs的规范
+ UMD
    + 兼容AMD、commonjs

#### 模块特色

+ 静态模块（模块名不能是变量）
+ 声明式语法

```javascript
// 模块语法
import {$} from 'jquery.js';    // es6

var $ = require('jquery.js')['$'];  // amd

export {$}; // es6

export.$ = $;   // amd
```

***

#### 不一样的理念
+ 按需引入 VS 全局引入
+ 多点暴漏 VS 全局暴漏

```javascript
// 模块思想
import {each, ...} from 'underscore.js';    // es6
var _ = require('underscore.js');   // amd

export {each, ...}; // es6
module.exports = _; // amd
```

***

#### 转码

+ 浏览器目前还不支持ES6模块
+ SystemJS
+ transplier(转换器)，如ES6 module transpiler，babel，Traceur
+ Webpack