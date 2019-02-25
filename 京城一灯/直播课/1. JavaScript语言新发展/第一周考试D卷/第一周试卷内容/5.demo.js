//ja api js书写起来更加的可控 
Reflect.apply(this,1);
Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");

function test(i){
   test();
}

function pp(){
    test();
}
//尾递归+尾调用 人肉优化
//浏览器的优化 并没有