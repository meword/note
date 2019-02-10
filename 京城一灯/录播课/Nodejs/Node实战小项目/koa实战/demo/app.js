const Koa = require('koa');	// 导入koa
const router = require('koa-simple-router');	// 导入koa的路由包
const serve = require('koa-static');	// 导入koa的静态资源处理包
const render = require('koa-swig');		// koa所支持swig模板
const co = require('co');	// 将yield自动调用的包
const path = require('path');	// node内置path模块包
const app = new Koa()

// 配置模板
app.context.render = co.wrap(render({
	// ...your setting
	root: path.join(__dirname, 'views'),
	autoescape: true,
	// cache: 'memory', // disable, set to false
	cache: false, // disable, set to false
	ext: 'html',
	writeBody: false
}));

app.use(serve(__dirname + '/public/'));	// 将可访问的静态资源路径设置为public

app.use(router(_ => {
	_.get('/', async (ctx, next) => {
		ctx.body = await ctx.render('index');
	})
	_.get('/path', (ctx, next) => {
		ctx.body = {
			data: 123
		}
	})
}))

app.listen(3000, () => {
	console.log('服务启动成功')
});