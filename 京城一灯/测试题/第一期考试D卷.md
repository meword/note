1.请写出输出值，并解释为什么。(5分)

```javascript
alert(a);
yideng();
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



3.请问变量a会被GC回收么，为什么呢？(12分)

```JAVASCRIPT
function test(){
	var a = "yideng";
	return function(){
		eval("");
	}
}
test()(); 
```



4.写出输出值，并解释为什么。(5分)

```javascript
Object.prototype.a = ‘a';
Function.prototype.a = 'a1';
function Person(){};
var yideng = new Person();
console.log('p.a: '+ yideng.a);
console.log(1..a);
console.log(1.a); 
```



5.请在下面写出JavaScript面向对象编程的混合式继承。并写出ES6版本的继承。
要求：汽车是父类，Cruze是子类。父类有颜色、价格属性，有售卖的方法。Cruze子
类实现父类颜色是红色，价格是140000,售卖方法实现输出如下语句：将 红色的Cruze卖给了小王价格是14万。（20分）

```javascript

```



6.请写出你了解的ES6元编程。（10分） 

```javascript

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

const mergePromise = (ajaxArray) =>{
	//1,2,3 done [1,2,3]
	//【代码书写处】
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
	console.log("done");
	console.log(data); // data 为 [1, 2, 3]
});
// 执行结果为： 1 2 3 done [1,2,3] 
```



8.请问点击会有反应么？为什么？能解决么？（5分）

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

```javascript
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
console.log(s[0])
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

