"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Koa = require("koa");
const app = new _koa2.default();

const path = require("path");

const co = require("co");

const render = require('koa-swig');

const serve = require('koa-static');

const errorHandler = require("./middlewares/errorHandler");

const log4js = require('log4js');

const config = require("./config"); // process.env.NODE_ENV


app.use(serve(config.staticDir)); //注入我们的路由机制

app.context.render = co.wrap(render({
  root: path.join(config.viewDir),
  autoescape: true,
  cache: config.cacheMode,
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
})); //逻辑和业务错误 http日志

log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);

require("./controllers")(app);

app.listen(config.port, () => {
  console.log("服务已启动🍺🍞");
});