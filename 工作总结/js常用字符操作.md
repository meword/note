### Number

#### 数字保留小数几位

```javascript
n 就是想保留的位数
Number.toFixed(n)
```



#### 判断一个数值是否为整数

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



#### 取数字的次方

```javascript
Math.pow(2, 4)
// 获得2的4次方
```





####安全整数和 Number.isSafeInteger()

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

### String

#### includes()方法

```javascript
/* str.includes() 方法
 * 寻找字符串是否有包含此字符
 * select_content 要在字符串里查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.includes(select_content);
```



#### startsWith()方法

```javascript
/* str.startsWith() 方法
 * 寻找字符串头部是否有包含此字符
 * select_content 要在字符串头部查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.startsWith(select_content);
```



#### endsWith()方法

```javascript
/* str.endsWith() 方法
 * 寻找字符串尾部是否有包含此字符
 * select_content 要在字符串尾部查找的内容
 * 
 * 返回布尔值： 表示是否找到了参数字符串
 */
str.endsWith(select_content);
```



#### repeat()方法

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



#### padStart()、padEnd()方法

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


### Array



#### map() 方法

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



------



#### filter() 方法

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