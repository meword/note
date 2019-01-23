## 小测试

**1、请写出弹出值，并解释为什么**

原题：

```javascript
alert(a)    // function a   
// 输出function a的原因是：函数声明提升会比变量的提升更优先

a();    // 10
// 调用函数a

var a = 3;

function a() {
    alert(10);
}

alert(a);   // 3
// a被赋值为3

a = 6;

a();    // 报错
// a被赋值为6，则报错 a is not a function
```

知识点:

1. 变量和函数声明的提升
2. 函数声明提升会比变量的提升更优先
3. 当变量已被函数体声明时，var变量声明不赋值，并不会改变变量的函数体



***




**2、请写出如下输出值，并写出把注释的代码取消注释的值，并解释为什么**

原题：

```javascript
this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(a);
        function go() {
            // this.a = 60;
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
}

// var p = test.init()
// p();
new(test.init())();
```



未去掉注释：

```javascript
this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(a);
        function go() {
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
}
new(test.init())(); // 20 50 还得到了一个go的实例对象
// 首先test.init()执行输出windows对象的a属性，其次得到了一个go函数
// 然后通过将go当做构造函数来调用，输出go实例的this.a
// 在go自身属性中并没有a属性，通过原型链向上查找得到50
// 最后得到一个go实例对象
```



去掉注释：

```javascript
this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(a);
        function go() {
            this.a = 60;
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
}

var p = test.init();    // 20
// 调用test.init()输出window.a(20)，得到一个go函数

p();    // 60
// 调用go函数，此时无调用者，则为window调用
// 输出window.a(60)

new(test.init())(); // 60 60 得到了一个go的实例对象
```

知识点：
1. this指向（全局的this指向window、箭头函数内this指向所在对象的父级作用域的this、当函数无调用者的时候，内部this为window）
2. 对象自身属性的查找规则（当属性在自身属性中没有时，会沿着原型链向上查找，一直找到Object.prototype，当此时还没有此属性，则该属性为undefined）
3. 所有在全局作用域中声明的变量、函数都会变成window对象的属性或方法，同样，windows下的属性或方法都可以直接当做全局变量来使用（唯一的区别是，全局变量也就是通过var在全局声明的变量不能通过delete操作符删除，但是windows上定义的属性就可以通过delete来删除）


***


**3、请写出如下点击li的输出值，并用三种办法正确输出li里的数字**

原题：

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
</ul>

<script type="text/javascript">
var list_li = document.getElementsByTagName("li");
for(var i = 0 ; i < list_li.length; i++) {
    list_li[i].onclick = function() {
        console.log(i)
    }
}
</script>
```

方法一：利用let的块级作用域，将对应i的值保留在块级作用域内

```javascript
var list_li = document.getElementsByTagName("li");
for(let i = 0 ; i < list_li.length; i++) {
    list_li[i].onclick = function() {
        console.log(i + 1)
    }
}
```

方法二：利用js的闭包（理论上来讲js中所有的函数都是闭包）

```javascript
var list_li = document.getElementsByTagName("li");
for(var i = 0 ; i < list_li.length; i++) {
    list_li[i].onclick = (function(i) {
        return function() {
            console.log(i + 1)
        }
    }(i));
}
```

方法三：题目要求的是输出li内的数字，所以我们可以通过this来获取li内的值

```javascript
var list_li = document.getElementsByTagName("li");
for(var i = 0 ; i < list_li.length; i++) {
    list_li[i].onclick = function() {
        console.log(this.innerHTML);
    }
}
```

重点：看清楚题目，很多时候面试官这样问主要是想看你对this的了解程度，并不是要你从网上死记硬背的答案


知识点：
1. js中会进入异步队列的主要有：ajax、事件绑定、setTimeOut、setInterval
2. var声明没有块级作用域的概念，只有let、const声明才有
3. 异步队列的执行会在同步队列执行完毕才会走，所以在点击的时候，i已经为5了


***


**4、写出输出值，并结束为什么**

原题：

```javascript
function test(m) {
    // 函数内部的m得到一份指针地址
    m = {v: 5}
    // 将函数内部的m指向新的指针
    // 此时函数内部的m和外部的m没有任何关系
}

var m = {k:30};
// 声明变量m，m指向obj对象，此时得到的是一个指针地址

test(m);
// 传入变量m

alert(m.v); // m对象无v属性，得到undefined
```

知识点：
1. 函数参数的传递是值传递


***


**5、请写出代码执行结果，并解释为什么**

原题：

```javascript
function yideng() {
    console.log(1);
}

(function() {
    if (false) {
        function yideng() {
            console.log(2)
        }
    }
    yideng();
    // es5环境下输出2
    // es6环境下报错，yideng is no a function
})
```

知识点：
1. 在es5环境下，按照标准是不允许函数在块级内的，假如函数被声明在块级内，函数声明的提升一样会把函数提升到当前作用域的顶端
2. 在es6环境下，允许浏览器支持函数在块级内，此时函数会像var声明一样（将函数名当做变量一样提升声明，只有执行到块级内的函数体时，才会把函数提升到当前数作用域的顶端）


***


**6、请用一句话算出0-100之间学生的学生等级，如90-100输出为1等生、80-90为2等生，以此类推。不允许使用if、switch等**

```javascript
let grade = score => (score === 100 ? 1 : 10 - Math.floor(score/10));
```

知识点：
1. 此题主要考得是能否将数学逻辑思维运用在代码上


***


**7、请用一句话遍历变量a（禁用for，已知var a = "abc"）**

```javascript
// 方法借用
[].forEach.call(a, item => item);

// 转换为数组
[...a].forEach(item => item)
```

知识点：
1. 使用方法借用


***


**8、请在下面写出JavaScript面向对象编程的混合式继承。并写出ES6版本的继承。
要求：汽车是父类，Cruze是子类。父类有颜色、价格属性，有售卖的方法。Cruze子
类实现父类颜色是红色，价格是140000,售卖方法实现输出如下语句：将红色的Cruze
卖给了小王价格是14万。**

面相对象编程的混合式继承：

```javascript
// 实现原型继承
function inherit(parent, child) {
    var __proto = Object.create(parent.prototype);
    __proto.constructor = child.prototype.constructor;
    child.prototype = __proto;
}

function Car(color, price) {
    this.color = color;
    this.price = price;
}

Car.prototype.sell = function() {
    console.log('售卖方法');
}

function Cruze(color, price) {
    // 构造函数借用
    Car.call(this, color, price);
}

inherit(Car, Cruze);

Cruze.prototype.sell = function() {
    console.log(`将${this.color}的Cruze卖给了小王，价格是${this.price}`)
}

var xiaowang = new Cruze('红色', '14万');
xiaowang.sell();
```



ES6版本：

```javascript
class Car {
    constructor(color, price) {
        this.color = color;
        this.price = price;
    }
    sell() {
        console.log('售卖方法');
    }
}

class Cruze extends Car {
    constructor(color, price) {
        super(color, price);
    }
    sell() {
        console.log(`将${this.color}的Cruze卖给了小王，价格是${this.price}`)
    }
}

var xiaowang = new Cruze('红色', '14万');
xiaowang.sell();
```

知识点：
1. Object.create其实本质上就是得到一个新对象，新对象的__proto__的指向为传入的对象


***


**9、请你写出如何利用EcmaScript6/7（小Demo）优化多步异步嵌套的代码？**

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000);
        console.log(1000)
    }, 1000)
}).then(data => {
    console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2000);
            console.log(2000)
        }, 2000)
    })
})
```

知识点：
1. promise优化异步嵌套代码
2. promise支持链式的then
3. 当然也可以使用async、awit


***


**10、写出如下代码执行结果，并解释为什么。**

```javascript
var length = 10;

function fn() {
    console.log(this.length);
}

var yideng = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};

yideng.method(fn, 1);
```

知识点：
1. windows的length属性为页面中iframe的个数
2. 当函数无调用者的时候，就是windows调用的
3. 以上代码在不同浏览器中会有不同的输出
    + 将`arguments[0]()`当做`arguments`的属性执行，则得到`arguments.length`
    + 不将`arguments[0]()`当做`arguments`的属性执行，则得到外层的`length`