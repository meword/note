1.请写出输出值，并解释为什么。(5分)

```javascript
alert(a);	// undefined

yideng();	
// es6环境下报错、yideng is no function	原因是：在es6环境下，块级作用域内的函数声明会表现的和var声明类似，即下面函数相当于 var yideng = function() { console.log("yideng1") }，这时提升的只有yideng这个变量名
// es5环境下输出: yideng2	原因是：es5下函数声明没有块级的概念，都是提升到当前作用域的顶端

var flag = true;
if(!flag){
	var a = 1;
}
if (flag) {
	function yideng() {
		console.log("yideng1");
	}
} else {
	function yideng() {
		console.log("yideng2");
	}
}
```



2.请写出如下输出值，并写出把注释掉的代码取消注释的值，并解释为什么(8分)

```javascript
this.a = 20;
var test = {
	a: 40,
	init:()=> {
		console.log(this.a);
		function go() {
			// this.a = 60;
			console.log(this.a);
		}
		go.prototype.a = 50;
		return go;
	}
};
//var p = test.init();
//p();
new(test.init())();
```

注释版本：

```javascript
this.a = 20;
var test = {
	a: 40,
	init:()=> {
		console.log(this.a);	// 20	箭头函数，this指向对象所在的作用域
		function go() {
			console.log(this.a);	// 50	go函数被当作构造函数调用，this.a的寻找规则：自身寻找，找不到就找原型链
		}
		go.prototype.a = 50;
		return go;
	}
};
new(test.init())();
```

去掉注释版本：

```javascript
this.a = 20;
var test = {
	a: 40,
	init:()=> {
		console.log(this.a);
		function go() {
			this.a = 60;
			console.log(this.a);
		}
		go.prototype.a = 50;
		return go;
	}
};
var p = test.init();	// 20 箭头函数特性，同上
p();	// 60	相当于调用go函数，只不过go内this的指向为window，所以window的a被改为60
new(test.init())();	// 60 60	此时相当于把go当构造函数调用
```



3.请问变量a会被GC回收么，为什么呢？(12分)

```javascript
function test(){
	var a = "yideng";
	return function(){
		eval("");
	}
}
test()(); 
// 不会被回收，因为 eval() 会欺骗词法作用域，当执行的时候，不知道eval内是啥，所以不敢回收a变量
// 想要上面的 a 被回收，必须在 eval() 前面加个window（window.eval）
// eval会禁止这段代码在v8引擎内进行优化
```

扩展

Function：

```javascript
var s = 1;
function test() {
    var s = 2;
    var f = new Function("console.log(s)");
    f();
}
test();		// 输出 1
// 因为 Function 会将 console.log(s) 挂在全局的词法作用域上面，而不是在 test 函数内的词法作用域
```

with：

```javascript
var s = {kk:30};
with(s) {
    bb = 30;	// 假如在s对象内没有这个bb属性，那么s内不会创建bb属性且给他赋值，而是会将bb创建为全局变量并赋值
}
alert(s.bb);	// undefined
alert(bb);	// 30
// 浏览器一旦遇到with，就会放弃回收所有变量
```

try...catch：

```javascript
try {
}catch(e){	// e不知道哪里来的，e在当前词法作用域内没有，所以会一直向上寻找，从而延长词法作用域
}
```





4.写出输出值，并解释为什么。(5分)

> 主要知识点为原型链

```javascript
Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person(){};
var yideng = new Person();
console.log('p.a: '+ yideng.a);	// a
console.log(1..a);	// a
console.log(1.a);	// 报错	这个 . 不知道给谁，

// yideng.__proto__ = Person.prototype
// Person.prototype.__proto__ = Object.prototype

// Person.__proto__ = Function.prototype
// Function.prototype.__proto__ = Object.prototype

// Object.__proto__ = Function.prototype
// Function.__proto__ = Function.prototype
```



5.请在下面写出JavaScript面向对象编程的混合式继承。并写出ES6版本的继承。
要求：汽车是父类，Cruze是子类。父类有颜色、价格属性，有售卖的方法。Cruze子
类实现父类颜色是红色，价格是140000,售卖方法实现输出如下语句：将 红色的Cruze卖给了小王价格是14万。（20分）

混合式继承：

```javascript
function inherit(parent, children) {
    var __prototype = Object.create(parent.prototype);
    __prototype.constructor = children.prototype.constructor;
    children.prototype = __prototype;
}

function Car(color, prize) {
    this.color = color;
    this.prize = prize;
}
Car.prototype.sell = function() {
	console.log('售卖方法');
}

function Cruze(color, prize) {
    Car.call(this, color, prize);
}
inherit(Car, Cruze);
Cruze.prototype.sell = function() {
    console.log('将'+this.color+'的Cruze卖给了小王价格是:'+this.prize);
}

var xiaowang = new Cruze('红色', '14万');
xiaowang.sell()

```



6.请写出你了解的ES6元编程。（10分）



元编程有什么用？

+ 反射能让你的代码书写起来更加可控
+ proxy 能让你实现代理
+ Symbol 可以让你在遍历的时候执行一些操作



第一个元编程：

```javascript
// meta
let test = {
    age: 29
};
const validator = {
    set(target, key, value) {
        /**
        * target：目标
        * key：目标属性
        * value：设置的值
        */
        if(typeof value != "number") {
            throw new TypeError('年龄必须是个数字');
        }
    }
};
const proxy = new Proxy(test, validator);
proxy.age = '一灯'
```

第二个元编程：

``` javascript
const arr = [4, 4, 5, 6, 7, 8];
arr[Symbol.iterator] = function*() {
    let idx = 1;
    do {
		yield this[idx];   
    } while((idx += 2) < this.length)
}
for(const v of arr) {
    console.log(v);
}
```

第三个元编程：

``` javascript
// 反射让js书写起来更加可控
// reflect-metadata
Reflect
```





 

7.请按照下方要求作答？(15分)

```javascript
const timeout = ms =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});

const ajax1 = () =>
	timeout(2000).then(() => {
		console.log("1");
		return 1;
	});

const ajax2 = () =>
	timeout(1000).then(() => {
		console.log("2");
		return 2;
	});

const ajax3 = () =>
	timeout(2000).then(() => {
		console.log("3");
		return 3;
	});

/* 第一种解决方式 */
const mergePromise = (ajaxArray) =>{
	//1,2,3 done [1,2,3]
	//【代码书写处】
	return (async () => {
        let data = [];
		for(const item of ajaxArray) {
			arr.push(await item());
		}
		return data;
	})();
}

/* 第二种方式 */
// 由于没往 resolve里传值，所以这种拉平的方式无效
const mergePromise = (ajaxArray) => {
    //1,2,3 done [1,2,3]
	//【代码书写处】
    return (async () => {
        let data = [];
        while(ajaxArray[0]) {
            await ajaxArray[0].then(res => {
                data.push(res);
                ajaxArray.shift();
            })
        }
    })();
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
	console.log("done");
	console.log(data); // data 为 [1, 2, 3]
});
// 执行结果为： 1 2 3 done [1,2,3] 
```



8.请问点击会有反应么？为什么？能解决么？（5分）

不会有反应，因为`while(true)`堵塞了整个同步线程

解决方式：

+ webwork开启多线程
+ 当不支持 webwork 的时候，使用 `concurrent.thread.js`来实现多线程（[实现地址](http://www.cnblogs.com/woodk/articles/5199536.html)）

扩展：

js为什么是单线程的？

+ 因为 js 一开始就是为了处理 dom 而开发的，假如 js 是多线程的，对同样一个东西进行操作，比如删除一个a元素和往a元素里面添加b元素，那么就挂彩了

```javascript
$('#test').click(function(argument) {
	console.log(1);
});

setTimeout(function() {
	console.log(2);
}, 0);

while (true) {
	console.log(Math.random());
}
```



9.请用ES5实现ES6 Promise的原理(10分) 

```javascript

```



10.请写出如下输出值，并解释为什么。(12分)

用处：

+ 制作只能下拉列表
+ 级联菜单

```javascript
// js模拟指针移动
var s = [];
var arr = s;
for (var i = 0; i < 3; i++) {
	var pusher = {
		value: "item"+i
	},tmp;
	if (i !== 2) {
		tmp = []
		pusher.children = tmp
	}
	arr.push(pusher);
 	arr = tmp;
}
console.log(s[0]);
```



【附加题】.请描述你理解的函数式编程，并书写如下代码结果。如何将函数式编程
应用到你的项目中呢？（10分）

```javascript
var Container = function(x) {
	this.__value = x;
}
Container.of = x => new Container(x);
Container.prototype.map = function(f){
	return Container.of(f(this.__value))
}
Container.of(3)
.map(x => x + 1)
.map(x => 'Result is ' + x); 
```

