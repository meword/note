//js模拟指针移动
var s = [];
var arr = s;
for (var i = 0; i < 3; i++) {
    var pusher = {
            value: "item" + i
        },
        tmp;
    if (i !== 2) {
        tmp = [];
        pusher.children = tmp
    }
    arr.push(pusher);
    arr = tmp;
}
console.log(s[0]);

// 1.为了学习源码 redux
// 2.新的变成范式 for 递归 没有 try 函子
// 3.简化一个库 用在工程里