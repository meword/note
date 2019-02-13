// var app6 = new Vue({
//     el: '#app-6',
//     data: {
//         message: 'Hello Vue!'
//     }
// })
class Create {
    constructor() {
        this.btn = $("#js-btn");
    }
    fn() {
        this.btn.click(yd.throttle(function () {
            console.log("点击测试")
            //上一次的请求 还没有回来 我又发了一次
            fetch("添加新闻页面")
        },10));
    }
}
export default Create;