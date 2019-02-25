const IndexModel = require('../models/index');
const indexModel = new IndexModel();

const {URLSearchParams} = require('url');

class IndexControllers {
	constructor() {}

	/**
	 * index主页路由
	 */
	async actionIndex(ctx, next) {
		const result = await indexModel.getData();
		ctx.body = await ctx.render('index/index.html', {
			data: result.data
		});
	}

	/**
	 * add添加页路由
	 */
	async actionAdd(ctx, next) {
		ctx.body = await ctx.render('index/add.html')
	}

	/**
	 * 添加新图书接口
	 */
	async actionCreate(ctx, next) {
		// 将post参数改为form提交
		const params = new URLSearchParams();
		params.append('Library[bookname]', ctx.request.body.bookname);
		params.append('Library[author]', ctx.request.body.author);
		params.append('Library[price]', ctx.request.body.price);

		const result = await indexModel.addData({
			method: 'post',
			body: params
		});

		ctx.body = result;
	}
}

module.exports = IndexControllers;