node.js 是单线程的程序



### 事件驱动模型

> 高效、可扩展性很好的模型

非阻塞式 IO、事件驱动的 IO 模型

```` 
EventEmitters	->	Events(事件)	->	Event Loop(事件队列)	-> Event Handlers(事件处理函数)
````





### 事件处理代码流程

1. 引入 events 对象，创建 eventEmitter 对象
2. 绑定事件处理程序
3. 触发事件





代码：

``` javascript
// 引入Event模块并创建eventsEmitter对象
const events = require('events');
const eventEmitter = new events.EventEmitter();

// 绑定事件处理函数
eventEmitter.on('connection', function() {
	console.log('connection被调用')
})

// 触发事件
eventEmitter.emit('connection');

console.log('程序执行完毕');
```

