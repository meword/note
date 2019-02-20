const Router = require('koa-router');
const router = new Router();

const IndexControllers = require('./IndexControllers');
const indexControllers = new IndexControllers();

module.exports = (app) => {
	router.get('/', indexControllers.actionIndex);
	router.get('/index.html', indexControllers.actionIndex);
	router.get('/add', indexControllers.actionAdd);
	router.post('/create', indexControllers.actionCreate);

	app
	.use(router.routes())
	.use(router.allowedMethods());
}