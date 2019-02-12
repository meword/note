function Promise(fn) {
    var callback;
    this.then = function (done) {
        callback = done;
    }
    function reject(){}
    function resolve() {
        console.log(callback);
        setTimeout(function(){
            callback();
        },0)
    }
    fn(resolve,reject);
}
function request() {
    return new Promise(function (resolve,reject) {
        if (true) {
            resolve()
        }else{
            reject();
        }
    })
}
function success(){
    console.log("🍎");
}
request().then(function(){
    success()
});