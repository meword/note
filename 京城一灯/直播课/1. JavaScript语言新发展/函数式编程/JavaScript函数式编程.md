## 课程大纲

+ 函数式编程思想
+ 函数式编程常用核心概念
+ 当下函数式编程最热的库
+ 函数式编程的实际应用场景



### 函数式编程思想

> 定义：

1. 函数式编程式范畴论的数学分支是一门很复杂的数学，认为世界上所有的概念体系都可以抽象出一个个范畴
2. 彼此之间存在某种关系概念、事物、对象等等，都构成范畴。任何事物只要找出它们之间的关系，就能定义
3. 箭头表示范畴成员之间的关系，正式的名称叫做“态射”(morphism)。范畴论认为，同一个范畴的所有成员，就是不同状态的“变形”(transformation)。通过“态射”，一个成员可以变形成另一个成员



> 基本理论：

1. 函数式编程(Functional Programming) 其实相对于计算机的历史而言是一个非常古老的概念，甚至早于第一台计算机的诞生。函数式编程的基础模型来源于 λ（Lambda x=>x*2）演算，而 λ 演算并非设计于在计算机上执行，它是在20世纪三十年代引入的一套用于研究函数定义、函数应用和递归的形式系统
2. 函数式编程不是用函数来编程，也不是传统的面向过程编程。主旨在于将复杂的函数复合成简单的函数（计算理论、递归论、拉姆达演算）。运算过程尽量写成一系列嵌套的函数调用
3. 不可改变量。在函数式编程中，我们通常理解的变量在函数式变量中也被函数代替了，在函数式编程中变量仅仅代表某个表达式。这里所说的“变量”是不能被修改的。所有的变量只能被赋值一次



> 为什么要学习函数式编程：

+ 为了学习源码 redux
+ 新的编程方式：用递归代替`for`，用函子代替`try`
+ 简化一个库，用在工程里



> 五大特性：

1. 函数是“第一等公民”
2. 只用“表达式”，不用“语句”
3. 没有“副作用”
4. 不修改状态
5. 引用透明（函数运行只靠参数）



> Js 特性：

1. JavaScript是披着 C 外衣的 lisp

2. 函数是一等公民。所谓“一等公民”(first class)，指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值

3. map & reduce 它们是最常用的函数式编程方法

4. 在js中函数式编程真正的火热是随着React的高阶函数而逐步升温



#### 函数式编程常用核心概念

+ 纯函数
+ 函数的柯里化
+ 函数组合
+ point free
+ 声明式与命令式代码
+ 惰性求值



##### 纯函数

> 对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态

例：

```javascript
// Array.slice 是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的
var xs = [1, 2, 3, 4, 5];
xs.slice(0, 3);	// [1, 2, 3]
xs.slice(0, 3);	// [1, 2, 3]

xs.splice(0, 3);	// [1, 2, 3]
xs.splice(0, 3);	// [4, 5]
```

优缺点：

```javascript
// 纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性
import _ from 'lodash';
var sin = _.memorize(x => Math.sin(x));

// 第一次计算的时候会稍慢一点
var a = sin(1);

// 第二次有了缓存，速度极快
var b = sin(1);
```

```javascript
// 在不纯的版本中，checkage不仅取决于age还有外部依赖的变量min。
// 纯的 checkage 把关键数字 18 硬编码在函数内部，扩展性比较差，柯里化优雅的函数式解决
// 不纯的
var min = 18;
var checkage = age => age > min;

// 纯的
var checkage = age => age > 18;
```



##### 函数的柯里化

> 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

上面的例子我们用柯里化来更改：

```javascript
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20);
```

柯里化的例子：

```javascript
// 柯里化之前
function add(x, y) {
    return x + y;
}
add(1, 2)	// 3

// 柯里化之后
function addX(y) {
    return function(x) {
        return x + y;
    }
}
addX(2)(1)	// 3
```

柯里化的优点：

> 事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法



##### 函数组合

> 纯函数以及如何把它柯里化写出的洋葱代码 h(g(f(x)))，为了解决函数嵌套的问题，我们需要用到“函数组合”

```javascript
const compose = (f, g) => (x => f(g(x)));
var first = arr => arr[0];
var reverse = arr => arr.reverse();
var last = compose(first, reverse);
last([1, 2, 3, 4, 5]);
```



##### point Free

> 把一些对象自带的方法转化成纯函数，不要命名转瞬既逝的中间变量

这个函数中，我们使用了 str 作为我们的中间变量，但这个中间变量除了让代码变长了一点意外是毫无意义的

```javascript
const f = str => str.toUpperCase().split('');
```

Point Free 写法：

```javascript
var toUpperCase = word => word.toUpperCase();
var split = x => (str => str.split(x));

var f = compose(split(' '), toUpperCase);
f("abcd efgh");
```

这种风格能帮助我们减少不必要的命名，让代码保持简洁和通用



##### 声明式与命令式代码

> 命令式代码的意思就是：我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节

> 声明式代码的意思就是：我们通过写表达式的方式来声明我们想要干什么，而不是通过一步一步的指示

```javascript
// 命令式
let CEOs = [];
for (var i = 0; i < companies.length; i++){
    CEOs.push(companies[i].CEO);
}

// 声明式
let CEOs = companies.map(c => c.CEO);
```

优点：

> 函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可

> 相反，不纯的函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担



##### 惰性求值

> 惰性求值是一种按需求值机制，它会延迟对表达式的求值，直到其需要为止。在函数式语言中，这允许无限列表这样的结构，通常情况下排序重要的命令语言不可用

```javascript
const rand = function*() {
    while (1 < 2) {
    	yield Math.random()
    }
}

const randIter = rand()
randIter.next() // 每个执行都给出一个随机值，表达式按需求值。
```

``` javascript
// 拿ajax来做示例
function ajax() {
    if (window.XMLHttpRequest) {
        ajax = function name() {
            return new XMLHttpRequest()
        }
    } else {
        ajax = function name() {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
}

// 此时的ajax函数调用了一次之后，就不需要再经过判断，直接能获取到request的对象了
```






#### 尾调用优化

> 指函数内部的最后一个动作是函数调用。该调用的返回值，直接返回给函数。函数调用自身，称为递归。如果尾调用自身，就称为尾递归，递归需要保存大量的调用记录，很容易发生栈溢出错误，如果使用尾递归优化，将递归变为循环，那么只需要保存一个调用记录，这样就不会发生栈溢出错误了


```javascript
// 不是尾递归，无法优化
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}// ES6强制使用尾递归
```



#### 传统递归

> 普通递归时，内存需要记录调用的堆栈所出的深度和位置信息。在最底层计算返回值，再根据记录的信息，跳回上一层级计算，然后再跳回更高一层，依次运行，直到最外层的调用函数，这样 cpu 计算和内存会消耗很多，而且当神帝过大时，会出现堆栈溢出

```javascript
function sum(n) {
    if (n === 1) return 1;
    return n + sum(n - 1);
}

sum(5);
/** 计算过程
* (5 + sum(4))
* (5 + (4 + sum(3)))
* (5 + (4 + (3 + sum(2))))
* (5 + (4 + (3 + (2 + sum(1)))))
* (5 + (4 + (3 + (2 + 1))))
* (5 + (4 + (3 + 3)))
* (5 + (4 + 6))
* (5 + 10)
* 15
*/
```





#### 细数尾递归

整个计算过程是线性的，调用一次`sum(x, total)`后，会进入下一个栈，相关的数据信息会跟随进入，不再放在堆栈上保存。当计算完最后的值之后，直接返回到最上层的`sum(5, 0)`。这样能有效的防止堆栈溢出

在 ECMAScript6，我们将迎来尾递归优化，通过尾递归优化，JavaScript 代码在解释成及其码的时候，将会向while看齐，也就是说，同时有用数学表达能力和while的效能

``` javascript
function sum(x, total) {
    if (x === 1) {
        return x + total;
    }
    return sum(x - 1, x + total);
}

/**	执行过程
* sum(5, 0)
* sum(4, 5)
* sum(3, 9)
* sum(2, 12)
* sum(1, 14)
* 16
*/
```





#### 尾递归优化

> 尾递归一定要 return 返回值

``` javascript
function foo(n) {
    return bar(n * 2);
}
function bar() {
    // 查看调用帧
    console.trace();
}
foo(1)
```

``` javascript
// 上面代码的目标就是只有一个执行栈
foo@ VM65:2
(anonymous) @ VM65:10
// 强制指定 只留下bar
return continue
!return
#function()
// 遗憾的是浏览器并未支持
```





#### 尾递归问题

常见问题：

-   尾递归的判断标准是函数运行【最后一步】是否调用自身，而不是【是否在函数的 最后一行 】调用自身
-   按道理尾递归优化调用栈永远都是更新当前的栈帧而已，这样就完全避免了爆栈的危险。但是现如今浏览器并未完全支持，原因如下：
    -   在引擎层面消除递归是一个隐式的行为，程序员意识不到
    -   堆栈信息丢失了，开发者难以调试
-   既然浏览器不支持，我们可以把这些递归写成while

>   死循环是堵死同步栈 

>   堆栈溢出是一点一点一直往堆栈加





#### 偏应用函数

一个函数通过预先填充原始的部分创建一个新函数，这个函数内缓存了填充的原始部分的值

例：bind(this, 参数)

> 柯里化其实就是偏函数的应用





### 流行的几大函数式编程库

+ Rxjs（必学）
+ cyclejs
+ loadshjs（必学）、lazy(惰性求值)
+ underscorejs（最适合读源码上手）
+ ramdajs



#### Rxjs

Rxjs从诞生以来一直都不温不火，但它函数响应式编程(Functional Reactive Programming，FRP)的理念非常先进，虽然或许对大部分应用环境来说，外部输入事件并不是太频繁，并不需要引入一个如此庞大的FRP体系，但我们也可以了解一下它有哪些优秀的特性

在 Rxjs中，所有的外部输入（用户输入、网络请求等等）都被事做一种【事件流】：

用户点击了按钮-->网络请求成功-->用户键盘输入—>某个定时时间发生，这种事件特别适合处理游戏，上上下下上上下下，举个最简单的例子，下面这段代码会监听点击事件，每 2 次店家事件产生一次事件响应：

``` javascript
var clicks = Rx.Observable
	.fromEvent(document, 'click')
	.bufferCount(2)
	.subscribe(x => console.log(x));	// 打印出前两次点击事件
```



