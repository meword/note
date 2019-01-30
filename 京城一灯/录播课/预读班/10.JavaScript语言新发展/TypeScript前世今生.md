## TypeScript前世今生

+ 曾经的笑柄
+ Node.js
+ 名门正派
+ 正规语言的心经


#### 曾经的笑柄

```javascript
function test() {
    return
    {
        a: 1
    }
}

var f = test();     // undefined
console.log(f.a);   // 报错
```

```javascript
// 报错
(function() {alert(1)})()
(function() {alert(2)})()
```



#### Node.js

+ 有模有样的后端语言
+ 又是一个玩具。。。
+ 大量的闭包、回调、内存浪费、全站崩溃。。
+ 面向过程的观点无法改变
+ 对于继承、或者接口等一听就迷糊



#### 名门正派



#### 正规语言的心经

> TypeScript 是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。安德斯·海尔斯伯格，C#的首席架构师，已工作于TypeScript的开发。2012年十月份，微软发布了首个公开版本的TypeScript，2013年6月19日，在经历了一个预览版之后微软正式发布了正式版TypeScript0.9，向未来的TypeScript1.0版迈进了很大一步。

+ 强类型的编程语言，显示声明字符串
+ 常量、变量、作用域、this、可空类型、真实数组、结构、枚举
+ 面向对象 类、继承、多态、接口、命名空间、变量的修饰、构造函数、访问器(Get、 Set)、静态属性
+ 委托、泛型、反射、集合（动态数组(ArrayList / Hashtable / SortedList / Stack / Queue)、 匿名方法、拆箱）
+ 多线程