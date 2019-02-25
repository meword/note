const Koa = require('Koa');
const serve = require('koa-static');
const render = require('koa-swig');
const config = require('./config');
const co = require('co');
const log4js = require('log4js');
const bodyParser = require('koa-bodyparser');

const app = new Koa();


// 解析post数据中间件
app.use(bodyParser());


// log4js日志输出配置
log4js.configure({
	appenders: {
		cheese: {
			type: 'file',
			filename: './logs/error.log'
		}
	},
	categories: {
		default: {
			appenders: ['cheese'],
			level: 'error'
		}
	}
});
process._logger = log4js.getLogger('cheese');


// 配置swig模板
app.context.render = co.wrap(render({
	root: config.viewsDir,
	autoescape: true,
	cache: config.swigCache, // disable, set to false
	ext: 'html',
	writeBody: false
}));


// 配置静态资源访问路径
app.use(serve(config.staticDir));


// 注入容错机制
require('./middleware/errorHandle.js').error(app);


// 注入路由
require('./controllers')(app);


// 监听端口
app.listen(config.port, function () {
	console.log(`服务端口 ${config.port} 开启成功`);
})