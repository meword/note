## CSS3构建3D世界

> 相关插件：css3d-engine

> 地址： 720yun.com、h5doo.com 






### 获取旋转角度

````javascript
window.addEventListener("deviceorientation", function(event) {
    // 处理 event.alpha、event.beta、event.gamma
}, true)
````



 

### 获取罗盘校准

````javascript
window.addEventListener("compassneedscalibration", function(event) {
	alert('你的罗盘需要校准');
    event.preventDefault();
}, true)
````





### 获取重力加速度

````javascript
window.addEventListener("devicemotion", function(event) {
    // 处理event.acceleration
    // x(y,z):设备在x(y,z)方向上的移动加速度值
    // event.accelerationIncludingGravity
    // 考虑了重力加速度后设备在x(y,z)
    // event.rotationRate
    // alpha,bate,gamma:设备绕x,y,z轴旋转的角度
}, true)
````





### 示例

#### 摇一摇

````javascript
var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandle(eventData) {
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    if (Math.abs( X - lastX) > speed || Math.abs( y - lastY ) > speed || Math.abs( z - lastZ ) > speed ) {
        // 简单的摇一摇触发代码
        alert(1);
    }
}
````


## CSS3构建3D世界

> 相关插件：css3d-engine

> 地址： 720yun.com、h5doo.com 






### 获取旋转角度

````javascript
window.addEventListener("deviceorientation", function(event) {
    // 处理 event.alpha、event.beta、event.gamma
}, true)
````



 

### 获取罗盘校准

````javascript
window.addEventListener("compassneedscalibration", function(event) {
	alert('你的罗盘需要校准');
    event.preventDefault();
}, true)
````





### 获取重力加速度

````javascript
window.addEventListener("devicemotion", function(event) {
    // 处理event.acceleration
    // x(y,z):设备在x(y,z)方向上的移动加速度值
    // event.accelerationIncludingGravity
    // 考虑了重力加速度后设备在x(y,z)
    // event.rotationRate
    // alpha,bate,gamma:设备绕x,y,z轴旋转的角度
}, true)
````





### 示例

#### 摇一摇

```javascript
var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandle(eventData) {
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    if (Math.abs( X - lastX) > speed || Math.abs( y - lastY ) > speed || Math.abs( z - lastZ ) > speed ) {
        // 简单的摇一摇触发代码
        alert(1);
    }
}
```