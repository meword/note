/**
 * @fileoverview 实现Index的数据模型
 * @author yuanzhijia@yidengxuetang.com
 */
const SafeRequest = require("../utils/SafeRequest.js");
/**
 * Index类 获取后台关于图书相关的数据类
 * @class
 */
class Index{
    /**
     * @constructor
     * @param {string} app  KOA2执行上下文
     */
    constructor(app){}
    /**
     * 获取后台全部图书的数据方法
     * @param {*} options 配置项
     * @example
     * return new Promise
     * getData(options)
     */
    getData(){
        const safeRequest = new SafeRequest("books/index");
        return safeRequest.fetch({});
    }
    /**
     * 把用户传过来的书名全部加入到PHP接口
     * @param {*} options 参数项
     * @example
     * return new Promise
     * saveData(options)
     */
    saveData(options){
        const safeRequest = new SafeRequest("books/create");
        return safeRequest.fetch({
            method:"POST",
            params:options.params
        });
    }
}
module.exports = Index;