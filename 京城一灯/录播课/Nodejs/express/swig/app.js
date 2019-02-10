const express = require('express');

const app = express();

const swig = require('swig-templates'); // 导入swig模板

//设置swig页面不缓存
swig.setDefaults({
	cache: false
})
app.set('view cache', false);

app.set('views', 'views/'); 	// 设置模板所在文件目录
app.set('view engine', 'html'); // 设置模板引擎使用的文件类型
app.engine('html', swig.renderFile); // 注册指定扩展名为html的模板引擎

app.use(express.static('public')); // 设置静态资源访问地址

app.get('/', function (req, res, next) {
	res.render('index', {		// 使用 express 的 render 来渲染模板，后面对象为传给模板的数据
		title: '标题',
		content: '内容',
		data: [1, 2, 3],
	})
});

app.listen(3000, function () {
	console.log('端口开启成功');
})