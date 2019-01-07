

## javascript

<br>

**打开新窗口并写入代码**
```javascript
// data值为向新窗口写入的html代码
window.open('javascript:window.name;', data)
```

<br>

**开发项目获取地址绝对路径**
```javascript
`${location.protocol}//${location.host}${location.pathname}`
```

<br>

**ip地址正则：**
```javascript
/^(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(0|\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
```

<br>

**字符串转代码**

> setTimeOut、setInterval

给setTimeOut()、setInterval()传递字符串，大部分情况下，与使用eval()是类似的，区别是无论在什么代码块输出，都是在全局下输出，它只能看到全局作用域。所以能很好的避免所在作用域变量污染


> eval

在调用的环境下转义代码，受到所在作用域的影响，eval()可以访问和修改它外部作用域的变量，相当于直接输出代码

> Function、new Function

因为在新Function()中的代码评估是在局部作用域中运行，所以代码中任何被评估通过的var变量都不会自动变成全局变量，不管你在哪里执行Function()，它只能看到全局作用域。所以能很好的避免所在作用域的变量污染

<br>

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


<br><br><br>


### js常用扩展

<br>

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

<br>


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

<br>


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

<br>


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

<br>


**jQuery获取元素宽度（包含小数点）**

```javascript
$(obj)[0].getBoundingClientRect().width.toFixed(2)
```