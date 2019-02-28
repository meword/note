import {join} from "path";
import _ from "lodash";
// import {extend} from "lodash-es";
let config = {
    "viewDir": join(__dirname, "..", "views"),
    "staticDir": join(__dirname, "..", "assets"),
}
if(false){
    console.log("xxxx");
}
if (process.env.NODE_ENV == "development") {
    const localConfig = {
        baseURL:"http://localhost/basic/web/index.php?r=",
        cacheMode:false,
        port: 3000
    }
    config = _.extend(config, localConfig);
}
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        cacheMode:"memory",
        port: 8081
    }
    config = _.extend(config, prodConfig);
}
module.exports = config;
//Map