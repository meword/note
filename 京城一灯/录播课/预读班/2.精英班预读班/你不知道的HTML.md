### 老师电话：18301643821



##你不知道的HTML

###定义

参考资料：http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html



#### 什么是同源？

1. 协议相同
2. 域名相同
3. 端口相同






#### 非同源限制范围

1. Cookie（一般用来放登录信息的，可存10-20KB）
   LocalStorage（一般用来做离线缓存的，可存5M，一旦超出2.5M就会出现性能问题）
   indexDB（类似于浏览器的数据库，异步的，可存50M）
   等在非同源情况下都无法读取
2. DOM无法获得
3. AJAX请求不能发送





#### 非同源共享Cookie

```javascript
// 通过设置，但是只适用于Cookie和iframe窗口，LocalStorage和IndexDB无法通过这种方法，规避同源政策
document.domain = 'example.com';
```





###跨域的几种方案

+ form的action提交 （跨站攻击）
+ img、iframe、script的src属性
+ jsonp
+ cros
+ css背景图的background: url属性（css攻击）





###iframe

#### 片段识别符

**片段标识符（fragment identifier）指的是，URL的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。** 

````javascript
// 可以通过监听hashchange事件得到通知。 
window.onhashchange = function() {
    console.log(window.location.hash)
}
````



#### window.name

**浏览器窗口有window.name属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入window.name属性。**

父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入`window.name`属性。

> ```
> window.name = data;
> ```

接着，子窗口跳回一个与主窗口同域的网址。

> ```
> location = 'http://parent.url.com/xxx.html';
> ```

然后，主窗口就可以读取子窗口的`window.name`了。

> ```
> var data = document.getElementById('myFrame').contentWindow.name;
> ```

这种方法的优点是，`window.name`容量很大，可以放置非常长的字符串；缺点是必须监听子窗口`window.name`属性的变化，影响网页性能。



#### window.postMessage

上面两种方法都属于破解，HTML5为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。

这个API为`window`对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。

举例来说，父窗口`http://aaa.com`向子窗口`http://bbb.com`发消息，调用`postMessage`方法就可以了。

> ```
> var popup = window.open('http://bbb.com', 'title');
> popup.postMessage('Hello World!', 'http://bbb.com');
> ```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

> ```
> window.opener.postMessage('Nice to see you', 'http://aaa.com');
> ```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

> ```
> window.addEventListener('message', function(e) {
>   console.log(e.data);
> },false);
> ```

`message`事件的事件对象`event`，提供以下三个属性。

> - `event.source`：发送消息的窗口
> - `event.origin`: 消息发向的网址
> - `event.data`: 消息内容

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

> ```
> window.addEventListener('message', receiveMessage);
> function receiveMessage(event) {
>   event.source.postMessage('Nice to see you!', '*');
> }
> ```

`event.origin`属性可以过滤不是发给本窗口的消息。

> ```
> window.addEventListener('message', receiveMessage);
> function receiveMessage(event) {
>   if (event.origin !== 'http://aaa.com') return;
>   if (event.data === 'Hello World') {
>       event.source.postMessage('Hello', event.origin);
>   } else {
>     console.log(event.data);
>   }
> }
> ```





### JSONP

JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求。

> ```
> function addScriptTag(src) {
>   var script = document.createElement('script');
>   script.setAttribute("type","text/javascript");
>   script.src = src;
>   document.body.appendChild(script);
> }
> 
> window.onload = function () {
>   addScriptTag('http://example.com/ip?callback=foo');
> }
> 
> function foo(data) {
>   console.log('Your public IP address is: ' + data.ip);
> };
> ```

上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于JSONP是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

> ```
> foo({
>   "ip": "8.8.8.8"
> });
> ```

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。





### websocket

WebSocket是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

下面是一个例子，浏览器发出的WebSocket请求的头信息（摘自[维基百科](https://en.wikipedia.org/wiki/WebSocket)）。

> ```
> GET /chat HTTP/1.1
> Host: server.example.com
> Upgrade: websocket
> Connection: Upgrade
> Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
> Sec-WebSocket-Protocol: chat, superchat
> Sec-WebSocket-Version: 13
> Origin: http://example.com
> ```

上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

> ```
> HTTP/1.1 101 Switching Protocols
> Upgrade: websocket
> Connection: Upgrade
> Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
> Sec-WebSocket-Protocol: chat
> ```



### CORS

CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。相比JSONP只能发`GET`请求，CORS允许任何类型的请求。





### 测速代码

````javascript
var img = new Image();
var start = Date.now();
img.src = './images/test.jpg?v='+(+new Date());
img.onload = function() {
    var speed = 480 / ((Date.now() - start) / 1000);
    document.getElementsByTagName('body')[0].innerHTML = speed+'KB/S'
}
````

