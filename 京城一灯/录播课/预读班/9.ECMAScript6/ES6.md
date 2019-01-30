# ECMAScript6

> es6的目标：使JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言

> ECMAScript 1.0 是1997年发布的，接下来的两年，连续发布了ECMAScript 2.0 （1998年6月）和ECMAScript 3.0（1999年12月）。3.0版是一个巨大的成功，在业界得到广泛支持，成为同行标准，奠定了JavaScript语言的基本语法，以后的版本完全继承。直到今天，初学者一开始学习的JavaScript，其实就是在学3.0版的语法。



# ES6编程风格【上】

### let、const



**let、const相同点：**
1. 块级作用域
2. 不存在预解析(变量提升)
3. 更符合开发规范（先声明再使用）



**const优点：**
1. const值不能被改变
2. const比较符合函数式编程
3. js编译器对const进行了优化

**const、let本质区别：** 编译器内部的处理机制

***

### 字符串方法



**startsWith()**

> 是否以某字符开头

```javascript
/**
* 返回:Boolean
*/
String.startsWith(str);
```



**endsWith()**

> 是否以某字符结尾

```javascript
/**
* 返回:Boolean
*/
String.endsWith(str);
```



**includes()**

> 是否包含某字符

```javascript
/**
* 返回:Boolean
*/
String.includes(str);
```

***

### 模板语法
```javascript
const s = 'hello';
const e = 'world';
const c = test `foor \n ${s} ${e} bar`;

function test(strs, ...values) {
    console.log(values);
}
```

***

### 对象方法



**Object.is()**

> 判断两个值是否相同(可以用来判断NaN)

```javascript
/**
* value1: 值1
* value2: 值2
* 返回: Boolean
*/
Object.is(value1, value2);
```



**Object.setPrototypeOf()**

> 设置对象原型

```javascript
/**
* 警告：如果关心性能，应该避免设置一个对象的[[prototype]]。相反，你应该使用Object.create()来创建带有你想要的[[Prototype]]的新对象
* Object.setPrototypeOf()是ECMAScript6中的方法，相对于Object.prototype.__proto__，它被认为是修改原型对象更合适的方法
* obj: 要设置其原型的对象
* prototype: 该对象的新原型(一个对象或null)
*/
Object.setPrototypeOf(obj, prototype);
```



**super**

> 获取原型链上的方法

```javascript
super
```



# ES6编程风格【中】

### Iterator遍历器

概念：
> JavaScript原有的表示"集合"的数据结构，主要是数组(Array)和对象(Object)，ES6又添加了Map和Set。这样就有了四中数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

> 遍历器(Iterator)就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。



Iterator的作用有三个：
1. 为各种数据结构，提供一个统一的、简便的访问接口
2. 使得数据结构的成员能够按某种次序排列
3. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of使用



Iterator的遍历过程：
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象
2. 第一次调用指针对象的**next**方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的**next**方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的**next**方法，直到它指向数据结构的结束位置。

每一次调用**next**方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含**value**和**done**两个属性的对象。其中，**value**属性是当前成员的值，**done**属性是一个布尔值，表示遍历是否结束。

```javascript
let testFunc = function* () {
    yield "1";
    yield "2";
}

const test = testFunc();

console.log(test.next());   // {value: "1", done: false}
console.log(test.next());   // {value: "2", done: false}
console.log(test.next());   // {value: undefined, done: true}
```