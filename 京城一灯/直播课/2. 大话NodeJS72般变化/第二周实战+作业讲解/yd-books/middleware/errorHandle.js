module.exports = {
	error(app) {
		// 处理500容错
		app.use(async (ctx, next) => {
			try {
				await next();
			} catch (error) {
				ctx.status = 500;
				ctx.body = '服务器异常/(ㄒoㄒ)/~~ —— 已记录出错信息！';
				process._logger.error(error);
			}
		})
	
		// 处理404容错
		app.use(async (ctx, next) => {
			await next();
			
			if (ctx.status != 404) {
				return;
			}
	
			ctx.status = 200;
			ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
		})
	}
}