## JavaScript语言精粹1

### 寄生式组合继承（公认较好的继承方式）

```javascript
// 原型继承方法
function inherit(child, parent) {
    var __prototype = Object.create(parent.prototype);
    __prototype.constructor = child.prototype.constructor;
    child.prototype = __prototype;
}


function Person(name, age) {
    this.name = name;
    this.age = age;
}

function English(name, age, language) {
    Person.call(this, name, age);   // 借用构造函数
    this.language = language;
}


inherit(English, Person);

English.prototype.intruduce = function() {...}

let xxx = new English('zhangsan', 20, 'English')
```

***

### label statement

```javascript
loop:
    for(var i = 0; i < 10; i++) {
        for(var j = 0; j < 5; j++) {
            console.log(j);
            if (j === 1) {
                break loop;
            }
        }
    }
```



**语句和表达式**

> javascript有一个语句优先机制(可以解释为语句的都不会解释为表达式的)
> 逗号表达式表示连续的表达式，它的结果是最后一个表达式的值

```javascript
var x = { a: 1 };

/**
* 返回数字1
* js将"{}"解释成语句块
* a: 1 为label statement
* 得到结果1
*/
{ a: 1 }

/**
* 报错
* js将"{}"解释成语句块
* 则执行a: 1,b: 2 所以报错
*/
{ a: 1, b: 2 }
```

***

### 高阶函数

> 高阶函数是把函数当做参数或者返回值是函数的函数



#### 函数式编程

> 函数式编程(functional programming)，又称泛函编程，是一种编程范式，它将电脑运算为数字上的函数计算，并且避免使用程序状态以及易变对象。



#### 纯函数(函数式编程的基石，无副作用的函数)

在数学里，函数f的定义是：对于输入x产生一个唯一输出y=f(x)。这就是纯函数。它符合两个条件：

1. 此函数在相同的输入值时，总是产生相同的输出。函数的输出和当前运行环境的上下文状态无关。
2. 此函数运行过程不影响运行环境，也就是无副作用（如触发事件、发起http请求、打印/log等）。

简单来说，也就是当一个函数的输出不受外部环境影响，同时又不影响外部环境时，该函数就是纯函数，也就是它只关注逻辑运算和数学运算，同一个输入总得到同一个输出

js中纯函数有：
+ Array.prototype.slice
+ Array.prototype.map
+ String.prototype.toUpperCase

js中非纯函数有：
+ Math.random
+ Date.now
+ Array.prototype.splice

这里我们以slice和splice方法举例：
```javascript
var xs = [1,2,3,4,5];

// 纯函数(不会改变xs的值)
xs.slice(0,3);  // [1,2,3]
xs.slice(0,3);  // [1,2,3]
xs.slice(0,3);  // [1,2,3]

// 非纯函数(会改变xs的值)
xs.splice(0,3); // [1,2,3]
xs.splice(0,3); // [4,5]
xs.splice(0,3); // []
```
我们看到调用数组的slice方法每次返回的结果完全相同，同时xs不会被改变，而调用splice方法每次返回值都不一样，同时xs变得面目全非。

这就是我们强调使用纯函数的原因，因为纯函数相对于非纯函数来说，在可缓存性、可移植性、可测试性、以及并行计算方面都有这巨大的优势。

这里我们对可缓存性举例：
```javascript
var squareNumber = memoize(function(x) { return x * x; })

squareNumber(4);    // 16

squareNumber(4);    // 从缓存中读取输入值为4的结果 16
```
那我们如何把一个非纯函数变纯呢？比如下面这个函数：
```javascript
var minimum = 21;
var checkAge = function(age) {
    return age >= minimum;
}
```
这个函数的返回值依赖于可变变量minimum的值，它依赖于系统状态。在大型系统中，这种对于外部状态的依赖是造成系统复杂性大大提高的主要原因。
```javascript
var checkAge = function(age) {
    var minimum = 21;
    return age >= minimum;
}
```
通过改造，我们把checkAge变成了一个纯函数，它不依赖于系统状态，但是minimum是通过硬编码的方式定义的，这限制了函数的扩展性，我们可以在后面的柯里化中看到如何优雅的使用函数式解决这个问题。所以把一个函数变纯的基本手段是不要依赖系统状态



#### 函数柯里化

> 柯里化(curry)的概念很简单：将一个低阶函数转换为高阶函数的过程就叫柯里化。

比如对于加法操作：var add = (x, y) => x + y, 我们可以这样柯里化：
```javascript
// es5写法
var add = function(x) {
    return function(y) {
        return x + y;
    };
};

// es6写法
var add = x => (y => x + y);

// 测试
var increment = add(1);
var addTen = add(10);

increment(2);   // 3
addTen(2);      // 12
```
对于加法这种极其简单的函数来说，柯里化并没有什么用。

还记得上面的checkAge函数吗？我们可以这样柯里化它：
```javascript
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20); // true
```
这表明函数柯里化是一种"预加载"函数的能力，通过传递一到两个参数调用函数，就能得到一个记住了这些参数的新函数。从某种意义上来讲，这是一种对参数的缓存，是一种非常高效的编程函数的方法：
```javascript
var curry = require('lodash').curry;

// 柯里化两个纯函数
var match = curry((what, str) => str.match(what));
var filter = curry((f, ary) => ary.filter(f));

// 判断字符串里有没有空格
var hasSpaces = match(/\s+/g);

hasSpaces('hello world');   // [' '];
hasSpaces('spaceless');     // null

var findSpaces = filter(hasSpaces);

findSpaces(['tori_spelling', 'tori amos']); // ['toriamos']
```



#### 函数组合

假设我们需要对一个字符串做一些列操作，如下，为了方便举例，我们只对一个字符串做两种操作，我们定义了一个新函数shout，先调用toUpperCase，然后把返回值传给exclaim函数，这样做有哦什么不好呢？

不优雅，如果做得事情一多，嵌套的函数会非常深，而且代码是由内往外执行，不直观，我们希望代码从右往左执行，这个时候我们就得使用组合。

```javascript
var toUpperCase = function(x) {
    return x.toUpperCase();
};
var exclaim = function(x) {
    return x + '!';
};

var shout = function(x) {
    return exclaim(toUpperCase(x));
};

shout('send in the clowns');    // 'SEND IN THE CLOWNS!'
```
使用组合，我们可以这样定义shout函数：
```javascript
// 定义compose
var compose = (...args) => x => args.reduceRight((value, item) => item(value), x);

var toUpperCase = function(x) {
    return x.toUpperCase();
};
var exclaim = function(x) {
    return x + '!';
};

var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");    // SEND IN THE CLOWNS
```
代码从右往左执行，非常清晰明了，一目了然

我们定义的compose像N面胶一样，可以将任意多个纯函数结合到一起。

这种灵活的组合可以让我们像拼积木一样来组合函数式的代码：

```javascript
var head = function(x) { return x[0]; };
var reverse = reduce((acc, x) => [x].concat(acc), []);
var last = compose(head, reverse);

last(['juumpkick', 'roundhouse', 'uppercut']);  // uppercut
```



#### 声明式代码和命令式代码

> 命令式代码：命令"机器"如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。

> 声明式代码：告诉"机器"你想要的是什么(what)，让机器想出如何去做(how)。

与命令式代码不同，声明式代码意味着我们要写表达式，而不是一步步的指示

以SQL为例，它就没有"先做这个，再做这个"的命令，有的只是一个指明我们想要从数据库取什么数据的表达式。至于如何取数据则是由它自己决定的，以后数据库升级也好，SQL引擎优化也好，根本不需要更改查询语句。这是因为，有多种方式解析一个表达式并得到相同的结果

这里为了方便理解，我们来看一个例子：

```javascript
// 命令式
var makes = [];
for(var i = 0; i < cars.length; i++) {
    makes.push(cars[i].make);
}

// 声明式
var makes = cars.map(car => car.make);
```
命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码。然后再直接迭代cars列表，手动增加计数器，就像你开了一辆零件全部暴露在外的汽车一样。这不是优雅的程序员应该做的。

声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。他指明的是做什么，而不是怎么做。除了更加清晰和简介之外，map函数还可以进一步独立优化，甚至用解释器内置的速度极快的map函数，这么一来我们主要的业务代码就无须改动了。

函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。

相反，不纯的函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。



#### Point Free

> pointfree模式是指，永远不必说出你的数据。它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化(curry)以及组合协作起来非常有助于实现这种模式。

```javascript
// 非pointfree，因为提到了数据：word
var snakCase = function(word) {
    return word.toLowerCase().replace(/\s+/ig, '_');
}

// pointfree
var snakCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```

这种风格能帮助我们减少不必要的命名，让代码保持简洁和通用。当然，为了在一些函数中写出Point Free的风格，在代码的其它地方必然不是那么Point Free的，这个地方需要自己取舍



**函数式编程应该和指令式编程对比：**

+ 指令式编程每句都会有一个执行结果





### JavaScript语言精粹2

##### 作用域

作用域由大到小：
+ 程序级
+ 文件级
+ 函数级
+ 块级

什么是作用域链？
> 在JavaScript中，函数也是对象，函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是[[Scope]]，由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问