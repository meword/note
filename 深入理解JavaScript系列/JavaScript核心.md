### 对象Object
> ECMAScript是一门高度抽象的面相对象(object-oriented)语言，用以处理Object对象。当然，也有基本类型，但是必要时，也需要转换成object对象来用
````javascript
var foo = {
    x: 10,
    y: 20
};
````
上述代码foo对象有两个显示的属性和一个自带隐式的__proto__属性指向原型
![image](5B14D44904B5414398F261218454E49B)

<br/><br/>

### 原型链
> 原型对象也是普通的对象，并且也有可能有自己的原型，如果一个原型对象的原型不为null的话，我们就称之为原型链

> 原型链是一个由对象组成的有限对象链，用于实现继承和共享属性

比如有两个对象，大部分内容一样，只有一小部分不一样，在一个好的设计模式中，我们会需要重用那部分相同的内容，而不是在每个对象上都定义一遍。

在基于类[class-based]的系统中，这些重用部分被称之为类的继承 — 相同的部分放入classA，然后由classB和classC继承A，并扩展各自独特的东西

虽然，ECMAScript没有类的概念，但是，重用这个理念没什么不同（在某些方面，甚至比class更加灵活），可以由prototype chain原型链来实现。这种继承被称之为delegation based inheritance-基于继承的委托，或者更通俗一些，叫做<font color=red>原型继承</font>。


类似于类"A"、"B"、"C"，在ECMAScript种创建对象"A"、"B"、"C"相应地，对象"A"拥有"B"和"C"的共同部分，同时对象"B"和"C"只包含他们自己的附加属性和方法
```javascript
    var a = {
        x: 10,
        calculate: function(x) {
            return this.x + this.y + z;
        }
    };
    
    var b = {
        y: 20,
        __proto__: a
    };
    
    var c = {
        y: 30,
        __proto__: a
    };
    
    // 调用继承过来的方法
    b.calculate(30);    // 60
    c.calculate(40);    // 80
```
这就是通过原型链来实现的继承，原理就是：如果在对象b中找不到calculate方法（也就是对象b中没有这个方法），那么就会沿着原型链找到a的prototype，一直遍历完整个原型链，一旦找到，就返回第一个找到的属性或者方法，因此，第一个找到的属性称为<font color="red">继承属性</font>。如果遍历完整个原型链，仍然没有找到，那么就会返回<font color="red">undefined</font>

注意一点，this这个值在一个继承机制中，仍然是指向它原本属于的对象，而不是从原型链找到它时，它所属于的对象。例如，以上的例子，this.y是从b和c中获取的，而不是a。当然，你也会发现了this.x是从a获取的，因为是通过原型链机制找到的

如果一个对象的prototype没有显示的声明过或定义过，那么__proto__的默认值就是Object.prototype，而Object.prototype也会有一个__proto__，这个就是原型链的终点null。

![image](B6BD24C686CA4A7F99085EE34F3AD8B2)

<font color="blue">原型链通常将会在这样的情况下使用：对象拥有相同或相似的状态结构（same or similar state structure）（即相同的属性集合）与不同的状态值（different state values）。在这种情况下，我们可以使用构造函数（Constructor）在特定模式（specified pattern）下创建对象</font>

<br/><br/>

### 构造函数（Constructor）

> 构造函数(constructor)除了创建对象，还做了另一件有用的事情——自动为创建的新对象设置了原型对象(prototype object)。原型对象存放于ConstructorFunction.prototype属性中

例如，我们重写之前的例子，使用构造函数创建对象b和c，那么对象a则扮演了Foo.prototype这个角色
```javascript
// 构造函数
function Foo(y) {
    // 构造函数将会以特定模式创建对象;被创建的对象都会有"y"属性
    this.y = y;
}

/**
* "Foo.prototype"存放了新建对象的原型引用
* 所以我们可以将之用于定义继承和共享属性和方法
*/

// 继承属性"x"
Foo.prototype.x = 10;

// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
    return this.x + this.y + z;
}

// 使用构造函数创建"b"和"c"
var b = new Foo(20);
var c = new Foo(30);

// 调用继承的方法
b.calculate(30);    // 60
c.calculate(40);    // 80


// 让我们看看是否达到了预期的效果
console.log(
    b.__proto__ === Foo.prototype,  // true
    c.__proto__ === Foo.prototype,  // true
    
    // "Foo.prototype"自动创建了一个特殊的属性"constructor"指向构造函数本身
    // 实例"b"和"c"可以通过constructor找到自己的构造函数
    
    b.constructor === Foo,  // true
    c.constructor === Foo,  // true
    Foo.prototype.constructor,  // true
)
```
![image](0E91465AD658481999542AE40D0F3AB1)

上图可以看出，每一个object都有一个prototype，构造函数Foo也拥有自己的__proto__，也就是Function.prototype，而Function.prototype的__proto__指向了Object.prototype，重申一遍，<font color="red">Foo.prototype只是一个显示的属性，也就是b和c实例的__proto__属性。</font>

<br/><br/>

### 执行上下文栈(Execution Context Stack)

> 在ECMAScript中代码有三中类型：global、function和eval。

> 每一种代码的执行都需要依赖自身的上下文。当然global的上下文可能涵盖了很多function和eval的实例。函数的每一次调用，都会进入函数执行的上下文，并且来计算函数中变量的值。eval函数的每一次执行，也会进入eval执行中的上下文，判断应该从何处获取变量的值。

**注意：一个function可能产生无限的上下文环境，因为一个函数的调用（甚至递归）都产生了一个新的上下文环境。**

```javascript
function foo(bar) {}

// 调用相同的function，每次都会产生不同的上下文（包含不同的状态，例如参数bar的值）

foo(10);
foo(20);
foo(30);
```

一个执行上下文可以激活另一个上下文，就好比一个函数调用了另一个函数（或者全局的上下文调用了一个全局函数），然后一层一层调用下去，逻辑上来说，这种实现方式是栈，我们可以称之为上下文堆栈。

激活其他上下文的某个上下文被称为<font color="orange">调用者(caller)。</font>被激活的上下文被称为<font color="orange">被调用者(callee)。</font>被调用者同时也可能是调用者（比如在全局上下文中调用的函数调用了某些自身的内部方法）。

当一个caller激活了一个callee，那么这个caller就会暂停它自身的执行，然后将控制权交给这个callee，于是这个callee被放入堆栈，被称为<font color="orange">进行中的上下文[running/active execution context]</font>,当这个callee的上下文结束之后，会把控制权再次交给它的caller，然后caller会在刚才暂停的地方继续执行。在这个caller结束之后，会继续触发其他的上下文，一个callee可以用<font color="orange">返回(return)</font>或者<font color="orange">抛出异常(exception)</font>来结束自身的上下文

如下图，所有的ECMAScript的程序执行都可以看做是一个<font color="orange">执行上下文堆栈[execution context(EC)stack]</font>。堆栈的顶部就是出于激活状态的上下文。

![image](98CF31646C534A209EDAA10403CD6D64)

 当一段程序开始时，会先进入<font color="orange">全局执行上下文环境[global execution context]</font>，这个也是堆栈中最底部的元素。此全局程序会开始初始化，初始化生成必要的对象[objects]和函数[functions]，在此全局上下文执行的过程中，他可能会激活一些方法（当然是已经初始化过的），然后进入他们的上下文环境，然后将新的元素压入堆栈。在这些初始化都结束之后，这个系统会等待一些事件（例如：用户的鼠标点击等），会触发一些方法，然后进入一个新的上下文环境
 
 见下图，有一个函数上下文"EC1"和全局上下文"Global Ec"，下图战线了从"Global EC"进入和退出"EC1"时栈的变化
![image](9A1F8F9462974528B9B73EC2B46C8B9A)

ECMAScript运行时系统就是这样管理代码的执行。

<br/><br/>

### 执行上下文(Execution Context)

> 一个执行的上下文可以抽象理解为object。每一个执行的上下文都有一系列的属性（我们称为上下文状态），他们用来追踪关联代码的执行进度。这个图示就是一个context的结构

![image](5A82CCECC65D417F9264E680B59B62B2)

除了这3个所需要的属性（<font color="orange">变量对象(variable object), this指针(this value), 作用域链(scope chain)</font>），执行上下文根据具体实现还可以具有任意额外属性。

<br><br>

### 变量对象(Variable Object)

> 变量对象(variable object) 是与执行上下文相关的<font color="orange">数据作用域(scope of data)</font>。它是与上下文关联的特殊对象，用于存储被定义在上下文中的<font color="orange">变量(variables)</font>和
<font color="orange">函数声明(function declarations)(variables)</font>。

<font color="red">注意：函数表达式[function expression]（而不是函数声明[function declarations]）是不包含在VO[variable object]里面的。</font>

变量对象(Variable Object)是一个抽象的概念，不同的上下文中，它表示使用不同的object。例如，在global全局上下文中，变量对象也是全局对象自身[global object]。（这就是我们可以通过全局对象属性来指向全局变量的原因）

让我们来看看下面例子中的全局执行上下文情况：
```javascript
var foo = 10;

function bar() {};      // 函数声明
(function baz() {});    // 函数表达式

console.log(
    this.foo == foo,    // true
    window.bar == bar   // true
)

console.log(baz);       // 引用错误，baz没有被定义
```

全局上下文中的变量对象(VO)会有如下属性：
![image](4A50BBFE2FC24356BC1F1E69F2028333)

如上所示，函数"baz"如果作为函数表达式则不被包含于变量对象中。这就是在函数外部尝试访问产生引用错误(ReferenceError)的原因。

请注意，ECMAScript和其他语言相比(比如C/C++)，仅有函数能够创建新的作用域。在函数内部定义的变量和函数，在外部非直接可见并且不会污染全局对象。使用eval的时候，我们同样会使用一个新的(eval创建)执行上下文。eval会使用全局变量对象或调用者的变量对象(eval的调用来源)

那函数以及自身的变量对象又是怎样的呢？在一个函数上下文中，变量对象被表示为活动对象(activation object)。

<br><br>

### 活动对象(activation object)
> 当函数被调用者激活，这个特殊的活动对象(activation object)就被创建了。它包含普通参数(formal parameters)与特殊参数(arguments)对象(具有索引属性的参数映射表)。活动对象在函数上下文中作为变量对象使用。

即：函数的变量对象保持不变，但除去存储变量与函数声明之外，还包含特殊对象arguments。

考虑下面的情况：
```javascript
function foo(x,y) {
    var z = 30;
    function bar() {};      // 函数声明
    (function baz() {});    // 函数表达式
}

foo(10, 20);
```

"foo"函数上下文的激活对象(AO)如图所示：
![image](8A80272508434EC3B92348F48159EBFC)

同样道理，函数表达式(function expression)不在AO的行列。

在ECMAScript中，我们会用到内部函数[inner functions]，在这些内部函数中，我们可能会引用它的父函数变量，或者全局的变量。我们把这些变量对象称为上下文作用域对象[scope object of the context]。类似于上面讨论的原型链[prototype chain]，我们在这里称为作用域链[scope chain]。

<br><br>

### 作用域链(Scope Chains)

> 作用域链是一个对象列表(list of object)，用以检索上下文代码中出现的标识符(identifiers)。

作用域链的原理和原型链很类似，如果这个变量在自己的作用域中没有，那么它会寻找父级的，直到最顶层。

标识符[Identifiers]可以理解为变量名称、函数声明和普通参数。例如，当一个函数在自身函数体内需要引用一个变量，但是这个变量并没有在函数内部声明(或者也不是某个参数名)，那么这个变量就可以称为自由变量[free variable]。那么我们搜寻这些自由变量就需要用到作用域链。

在一般情况下，一个作用域链包括变量对象(variable object) (作用域链的顶部)、函数自身变量VO和活动对象(activation object)。不过，有些情况下也会包含其他的对象，例如在执行期间，动态加入作用域链中的——例如with或者catch语句。[译注: with-objects指的是with语句，产生的临时作用域对象; catch-clauses指的是catch从句，如catch(e)，这会产生异常对象，导致作用域变更]。

当查找标识符的时候，会从作用域链的活动对象部分开始查找，然后(如果标识符没有在活动对象中找到)查找作用域链的顶部，循环往复，就像原型链那样

```javascript
var x = 10;

(function foo() {
    var y = 20;
    (function bar() {
        var z = 30;
        
        // "x"和"y"是自由变量
        // 会在作用域链的下一个对象中找到(函数"bar"的互动对象之后)
        console.log(x + y + z);
    })
})
```

我们假设作用域链的对象联动是一个叫做__parent__的属性，它是指向作用域链的下一个对象。使用__parent__的概念，我们可以把上面的代码演示成如下的情况。(因此，父级变量是被存在函数的[[Scope]]属性中的)

![image](73A1BF16ED4C4955B58BE66421A8384B)

在代码执行过程中，如果使用with或者catch语句就会改变作用域链。而这些对象都是一些简单对象，他们也会有原型链。这样的话。作用域链会从两个维度来搜寻。

1.  首先在原本的作用域链
2.  每一个链接点的作用域的链(如果这个链接点是有prototype的话)

我们在看下面这个例子：

```javascript
Object.prototype.x = 10;

var w = 20;
var y = 30;

// 例如：全局上下文的变量对象是从"Object.prototype"继承到的
// 所以我们可以得到"没有声明的全局变量"
// 因为可以从原型链中获取

console.log(x);     // 10

(function foo() {
    // "foo"是局部变量
    var w = 40;
    var x = 100;
    
    // "x"可以从"Object.prototype"得到，注意值是10
    // 因为{z: 50}是从它那里继承的
    with ({z: 50}) {
        console.log(w, x, y, z);    // 40, 10, 30, 50
    }
    
    
    // 在"with"对象从作用域链删除之后
    // "x"又可以从"foo"的上下文中得到了，注意这次的值为100
    // "w"也是局部变量
    console.log(x, w);  // 100, 40
    
    
    // 在浏览器里
    // 我们可以通过如下语句来得到全局的w值
    console.log(window.w);  // 20
})
```

我们就会有如下结构图示。这表示，在我们去搜寻__parent__之前，首先回去__proto__的链接中

![image](A251DC74159042CEA9FE5C27A89F6244)

<font color="red">注意：不是所有的全局对象都是由Object.prototype继承而来的。上述图示的情况可以再SpiderMonkey中测试。</font>

只要所有外部函数的变量对象都存在，那么从内部函数引用外部数据则没有特别之处——我们只要遍历作用域链表，查找所需变量。

然而，如上文所提及，当一个上下文终止之后，其状态与自身将会被<font color="red">销毁(destroyed)</font>，同事内部函数将会从外部函数中返回。此外，这个返回的函数之后可能会在其他的上下文中被激活，那么如果一个之前被终止的含有一些自由变量的上下文又被激活将会怎样？

通常来说，解决这个问题的概念在ECMAScript中与作用域链直接相关，被称为(词法)闭包((lexical) closure)。

<br><br>

### 闭包(Closures)

> 在ECMAScript中，函数是"第一类"对象。这个名词意味着函数可以作为参数被传递给其它函数使用（在这种情况下，函数被称为"funargs"--"functional arguments"的缩写[译注：这里不知翻译为泛函参数是否恰当]）。接收"funargs"的函数被称之为<font color="red">高阶函数(higher-order functions)</font>，或者更接近数学概念的话，被称为<font color="red">运算符(operators)</font>。其它函数的运行时也可以返回函数，这些返回的函数被称为 function valued 函数（有functional value的函数）。

> "funargs"与"functional values"有两个概念上的问题，这两个子问题被称为"Funarg problem"("泛函参数问题")。要准确解决泛函参数问题，需要引入<font color="red">闭包(closures)</font>的概念。让我们仔细描述这两个问题（我们可以见到，在ECMAScript中是用了函数的<font color="red">[[Scope]]</font>属性来解决这个问题）

> "funarg problem"的一个子问题是"upward funarg problem"[译注：或许可以翻译为：向上查找的函数参数问题]。当一个函数从其它函数返回到外部的时候，这个问题将会出现。要能够在外部上下文结束时，进入外部上下文的变量，内部函数在创建的时候(at creation momengt)需要酱汁存储进[[Scope]]属性的父元素作用域中。然后当函数被激活时，上下文的作用域链表现为<font color="red">激活对象</font>与<font color="red">[[Scope]]属性</font>的组合

```
Scope chain = Activation object + [[Scope]]
作用域链 = 活动对象 + [[Scope]]
```

<font color="red">注意：最主要的事情是——函数在被创建时保存外部作用域，是因为这个被保存的作用域链(saved scope chain)将会在未来的函数调用中用于变量查找。</font>

```javascript
function foo() {
    var x = 10;
    return function bar() {
        console.log(x);
    }
}

// "foo"返回的也是一个function
// 并且这个返回的function可以随意使用内部的变量x

var returnedFunction = foo();

// 全局变量"x"
var x = 20;

// 调用返回的function
returnedFunction(); // 结果是10而不是20;
```
这种形式的作用域称为<font color="red">静态作用域[static/lexical scope]</font>。上面的x变量就是在函数bar的[[Scope]]中搜寻到的。理论上来说，也会有<font color="red">动态作用域[dynamic scope]</font>，也就是上述的x被解释为20，而不是10，但是ECMAScript不使用动态作用域。

"funarg problem"的另一个类型就是自上而下["downward funarg problem"]在这个情况下，父级的上下文会存在，但是在判断一个变量值的时候会有多义性。也就是，这个变量究竟使用哪个作用域。是在函数创建时的作用域呢？还是在执行时的作用域呢？为了避免这种多义性，可以采用闭包，也就是静态作用域

请看下面例子：

```javascript
// 全局变量"x"
var x = 10;

// 全局function
function foo() {
    console.log(x);
}

(function(funArg) {

    // 局部变量"x"
    var x = 20;
    
    // 这不会有歧义
    // 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x"
    // 并不是caller作用域的"x"
    
    funArg();   // 10, 而不是20
    
})(foo);    // 将foo作用一个"funarg"传递下去
```

从上述的情况，我们似乎可以断定，在语言中，使用静态作用域是闭包的一个强制性要求。不过，在某些语言中，会提供动态和静态作用域的结合，可以允许开发员选择哪一种作用域。但是在ECMAScript中，只采用了静态作用域。所以ECMAScript完全支持使用[[Scope]]的属性。

我们可以给闭包得出如下定义：
```
闭包是一系列代码块（在ECMAScript中是函数），并且静态保存所有父级的作用域。通过这些保存的作用域来搜寻到函数中的自由变量。
```

<font color="red">
注意：因为每一个普通函数在创建时都保存了[[Scope]]，理论上，ECMAScript中所有的函数都是闭包。
<br><br>
还有一个重要的点，几个函数可能含有相同的父级作用域（这是一个很普遍的情况，例如有好几个内部或者全局的函数）。在这种情况下，在[[Scope]]中存在的变量是会共享的。一个闭包中变量的变化，也会影响另一个闭包。
</font>

```javascript
function baz() {
    var x = 1;
    return {
        foo: function foo() { return ++x; },
        bar: function bar() { return --x; }
    };
}

var closures = baz();

console.log(
    closures.foo(), // 2
    closures.bar()  // 1
);
```

上述代码可以用这张图来表示：
![image](AA2777BB6819402C81D51060B40D2AEE)

在某个循环中创建多个函数，上图会引发一个困惑。如果在创建的函数中使用循环变量（如"k"），那么所有的函数都使用同样的循环变量，导致一些程序员经常会得不到预期值。现在清楚为什么会产生如此问题了——因为所有函数共享同一个[[Scope]]，其中循环变量为最后一个赋值

```javascript
var data = [];

for (var k = 0; k < 3; k++) {
    data[k] = function() {
        alert(k);
    }
}

data[0]();  // 3, but not 0
data[1]();  // 3, but not 1
data[2]();  // 3, but not 2
```

有一些用以解决这类问题的技术。其中一种技巧就是在作用域链中提供一个额外的对象，比如增加一个函数：

```javascript
var data = [];

for (var k = 0; k < 3; k++) {
    data[k] = (function(x) {
        return function() {
            alert(x);
        }
    })(k);  // 将k当做参数传递进去
}

// 结果正确
data[0]();  // 0
data[1]();  // 1
data[2]();  // 2
```

<br><br>

### This指针

> this是和执行的上下文息息相关的一个特殊对象。因此，它也可以称为上下文对象[context object] (激活执行上下文的上下文)

任何对象都可以作为上下文的this值。

<font color="red">注意：在ECMAScript中，与执行上下文相关的一些描述——特别是this的误解。通常，this被错误地，描述为变量对象的属性。请牢记：this是执行上下文环境的一个属性，而不是某个变量对象的属性</font>

这个特点很重要，因为和变量不同，this是没有一个类似搜寻变量的过程。当你在代码中使用了this，这个this的值就直接从执行的上下文中获取了，而不会从作用域中搜寻。

顺便说一下，和ECMAScript不同，Python有一个self的参数，和this的情况差不多，但是可以再执行过程中被更改。在ECMAScript中，是不可以给this赋值的，因为this不是变量

在global context(全局上下文)中，this的值就是指全局这个对象，这意味着，this值就是这个变量本身

```javascript
var x = 10;

console.log(
    x,      // 10
    this.x,     // 10
    window.x    //10
)
```

在函数上下文[function context]中，this可能会根据每次的函数调用而成为不同的值，this会由每一次的caller提供，caller是通过调用表达式[call expression]产生的（也就是这个函数如何被激活调用的）。例如，下面的例子中foo就是一个callee，在全局上下文中被激活。

下面的例子就表明了不同的caller引起this的不同

```javascript
// "foo"函数里的alert没有改变
// 但每次激活调用的时候this是不同的

function foo() {
    console.log(this);
}

// caller激活"foo"这个callee
// 并且提供"this"给这个callee

foo();  // 全局对象
foo.prototype.constructor();    // foo.prototype

var bar = {
    baz: foo
};

bar.baz();      // bar

(bar.baz)();    // bar

(bar.baz = bar.baz)();  // window全局对象

(bar.baz, bar.baz)();   // window全局对象

(false || bar.baz)();   // window全局对象


var otherFoo = bar.baz;
otherFoo();     // window全局对象
```
