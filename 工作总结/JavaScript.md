

## javascript



**打开新窗口并写入代码**
```javascript
// data值为向新窗口写入的html代码
window.open('javascript:window.name;', data)
```



**开发项目获取地址绝对路径**
```javascript
`${location.protocol}//${location.host}${location.pathname}`
```



**ip地址正则：**
```javascript
/^(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
```



**字符串转代码**

> setTimeOut、setInterval

给setTimeOut()、setInterval()传递字符串，大部分情况下，与使用eval()是类似的，区别是无论在什么代码块输出，都是在全局下输出，它只能看到全局作用域。所以能很好的避免所在作用域变量污染


> eval

在调用的环境下转义代码，受到所在作用域的影响，eval()可以访问和修改它外部作用域的变量，相当于直接输出代码

> Function、new Function

因为在新Function()中的代码评估是在局部作用域中运行，所以代码中任何被评估通过的var变量都不会自动变成全局变量，不管你在哪里执行Function()，它只能看到全局作用域。所以能很好的避免所在作用域的变量污染



**$.cookie**

```javascript
// 注：如果没有设置cookie的有效期，则cookie默认在浏览器关闭前都有效，故被称为“会话cookie”
$.cookie('cookieName', 'cookieValue');

// 创建一个cookie并设置有效时间为7天
$.cookie('cookieName', 'cookieValue', { expires: 7 });

// 创建一个cookie并设置cookie的有效路径
$cookie('cookieName', 'cookieValue', { expires: 7, path: '/' });

// 读取cookie
$.cookie('cookieName');
// 若cookie存在则返回'cookieValue'，若不存在则返回null

// 删除cookie，把cookie的值设为null即可
$.cookie('the_cookie', null);
```





### js常用扩展



**js正则获取get参数**

```javascript
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
}

// 使用: getQueryString('get参数名')
```




**获取指定时间日期**

```javascript
function getRangeTime(count) {
	var time1 = new Date();
	time1.setTime(time1.getTime() - 2 * 60 * 60 * 1000);
	var Y1 = time1.getFullYear();
	var M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
	var D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
	var timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
	var time2 = new Date()
	time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count + 2 * 60 * 60 * 1000))
	var Y2 = time2.getFullYear()
	var M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
	var D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
	var timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
	return {
		t1: timer1,
		t2: timer2
	}
}

/** 使用: 
* getRangeTime(num)
* num正数是查num天前的日期，num负数是查num天后的日期
* t1是当天时间，t2是目标时间
*/
```




**复制文本**

```javascript
// 原生js
function copy(message) {
    var Url2 = message;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    layer.msg('复制成功', {icon: '1'})
}
```




**计算字符长度**

```javascript
function getStringLength(text) {
	if (text == null) return;
	var intLength = 0;
	for (var i = 0; i < text.length; i++) {
		if (text.charCodeAt(i) < 0 || text.charCodeAt(i) > 255) {
			intLength += 1;
		}
		else {
			intLength += 0.5;
		}
	}
	return intLength;
}
```



**jQuery获取元素宽度（包含小数点）**

```javascript
$(obj)[0].getBoundingClientRect().width.toFixed(2)
```





### 正则表达式

>   ECMAScript通过 RegExp 类型来支持正则表达式。使用下面的语法，就可以创建一个正则表达式

```javscript
    var expression = / pattern / flags;
```

其中的模式(<font color="red">pattern</font>)部分可以是任何简单或复杂的正则表达式，可以包含字符类、限定符、分组、向前查找以及反向引用。

每个正则表达式都可带有一或多个标志（<font color="red">flags</font>），用以标明正则表达式的行为。正则表达式的匹配模式支持下列3个标志。

-   g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
-   i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式的大小写区分
-   m：表示多行（multiline）模式，即在到达一行文本末尾时，还会继续查找下一行中是否存在于模式匹配的项

**因此，一个正则表达式就是一个模式与上述3个标志的组合体。不同组合产生不通过结果**



### 常用字符操作

#### Number

数字保留小数几位

```javascript
n 就是想保留的位数
Number.toFixed(n)
```



判断一个数值是否为整数

```javascript
Number.isInteger()

// 例：
Number.isInteger(25)		// true
Number.isInteger(25.1)		// false

javaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) 		// true
Number.isInteger(25.0) 		// true

// 注：
如果参数不是数值，Number.isInteger返回false。

由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
Number.isInteger(3.0000000000000002) // true

类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。

Number.isInteger(5E-324) 			// false
Number.isInteger(5E-325) 			// true
```



取数字的次方

```javascript
Math.pow(2, 4)
// 获得2的4次方
```



安全整数和 Number.isSafeInteger()

```javascript
JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```



#### String

includes()方法

```javascript
/* str.includes() 方法
 * 寻找字符串是否有包含此字符
 * select_content 要在字符串里查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.includes(select_content);
```



startsWith()方法

```javascript
/* str.startsWith() 方法
 * 寻找字符串头部是否有包含此字符
 * select_content 要在字符串头部查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.startsWith(select_content);
```



endsWith()方法

```javascript
/* str.endsWith() 方法
 * 寻找字符串尾部是否有包含此字符
 * select_content 要在字符串尾部查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.endsWith(select_content);
```



repeat()方法

```javascript
/* str.repeat() 方法
 * 输出num次字符串
 * num 字符串 x 被重复的次数
 * 
 * 返回一个新字符串，表示将原字符串重复num次
 * 
 * 注：
 * 如果参数是小数，则会被取整(忽略小数)
 * 如果参数是负数或者infinity，会报错
 * 如果参数是 NAN 则等同于0
 * 如果参数是字符串，则先转为数字
 */
'x'.repeat(num);
```



padStart()、padEnd()方法

```javascript
/* padStart()、padEnd()方法
 * 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。
 * padStart()用于头部补全，padEnd()用于尾部补全。
 * 
 * 返回一个新字符串
 * 
 * 注：
 * 如果原字符串长度，等于或大于num，则返回原字符串
 * 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
 * 如果省略addStr，默认使用空格补全长度
 */
'x'.padStart(num, addStr)、'x'.padEnd(num, addStr);

// 注： 常见用途

// 1、padStart的常见用途是为数值补全指定位数。
'1'.padStart(10, '0');				'0000000001'
'12'.padStart(10, '0');				'0000000012'
'123456'.padStart(10, '0');			'0000123456'


// 2、提示字符串格式,使用超出指定的最小长度，则截去超出位数的补全字符串特性
'12'.padStart(10, 'YYYY-MM-DD');		'YYYY-MM-12'
'09-12'.padStart(10, 'YYYY-MM-DD');		'YYYY-09-12'
```



#### Array



map() 方法

```javascript
/* arr.map() 方法
 * 	current*: 	当前数组元素
 * 	index:		数组元素的对应索引
 * 	arr:		当前元素的数组对象
 * 	thisValue	将此值传递给函数，用作函数的this的值，如果省略了此值，那么函数内this的值为window
 * 
 * 兼容: ie9+
 * 
 * 注意:
 * 	map() 		方法返回一个新数组，数组中的元素为原始数据组元素调用函数处理后的值
 * 	map() 		方法按照原始数组元素顺序依次处理缘故
 * 	map() 		不会对空数组进行检测
 * 	map() 		不会改变原始数组
 */
arr.map(function(current, index, arr) {
	
}, thisValue);

```



filter() 方法

```javascript
/*
 * arr.filter() 方法
 * 	current*:	当前数组元素
 * 	index:		数组元素的对应索引
 * 	arr:		当前元素的数组对象
 * 	thisValue	将此值传递给函数，用作函数的this的值，如果省略了此值，那么函数内this的值为window
 * 
 * 兼容: ie9+
 * 
 * 	注意:
 * 	filter() 方法创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
 * 	filter() 方法不会对空数组进行检测
 *  filter() 不会改变原始数组
 */
arr.filter(function(current, index, arr) {

}, thisValue);
```



