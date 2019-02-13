const router = require('koa-simple-router');
const IndexController = require("./IndexController");
const TestController = require("./TestController");
const indexController = new IndexController();
const testController = new TestController();
//路由注册中心
module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex());
        _.get('/index.html', indexController.actionIndex());
        _.get('/add', indexController.actionAdd());
        _.get('/save', indexController.actionSave());
        _.get('/test', testController.actionIndex());
    }));
}