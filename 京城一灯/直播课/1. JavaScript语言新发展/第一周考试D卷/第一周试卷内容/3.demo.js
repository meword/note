//meta
let laoyuan = {
    age: 29
}
const validator ={
    set(target,key,value){
        if(typeof value !="number"){
            throw new TypeError("年龄必须是个数字");
        }
    }
};
const proxy = new Proxy(laoyuan,validator);
proxy.age = "一灯";