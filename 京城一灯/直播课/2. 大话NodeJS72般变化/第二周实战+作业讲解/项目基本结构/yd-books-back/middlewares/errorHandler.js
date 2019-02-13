const errorHandler = {
    error(app,logger) {
        app.use(async (ctx, next) => {
            try{
                await next();
            }catch(error){
                console.log(error);
                ctx.status = 500;
                logger.error(error);
                ctx.body = "/(ㄒoㄒ)/~~";
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 != ctx.status) {
                return;
            }
            //不承认网站404 百度降权
            ctx.status = 404;
            ctx.body = '<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone_v6/lostchild/search_children.js"></script>';
        });
    }
}
module.exports = errorHandler;