console.log("初始化");
fetch("/test").then((res)=>{
    return res.json()
}).then((res)=>{
    console.log("🍌后台数据",res)
    //CSR
    document.getElementById("app").innerHTML = res.data;
})