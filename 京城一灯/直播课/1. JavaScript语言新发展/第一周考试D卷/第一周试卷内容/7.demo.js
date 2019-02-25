const timeout = ms =>

new Promise((resolve, reject) => {
    setTimeout(() => {

        resolve();
    }, ms);

});

const ajax1 = () =>
timeout(2000).then(() => {
    console.log("1");

    return 1;
});
const ajax2 = () =>
timeout(1000).then(() => {

    console.log("2");

    return 2;
});
const ajax3 = () =>
timeout(2000).then(() => {
    console.log("3");
    return 3;
});
const mergePromise =  (ajaxArray) => {
//1,2,3 done [1,2,3]
//【代码书写处】
let result = [];
async function  asyncFunction() {
    let result = [];
    for(let item of ajaxArray){
        result.push(await item());
    }
    return result;
}
return asyncFunction()
// let data = [];
// while(ajaxArray[0]){
//     await ajaxArray[0]().then(jaxArray.shiift());
// }
// return data;
}
mergePromise([ajax1, ajax2, ajax3]).then(data => {
console.log("done");
console.log(data); // data 为 [1, 2, 3]
});