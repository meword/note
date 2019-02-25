// 导入express
const express = require('express');
const app = express();

// 导入swig
const swig = require('swig-templates');

// 导入mysql
const mysql = require('mysql');
const connection = mysql.createConnection({ // 基本配置
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'yd'
});
connection.connect();


// 配置express
app.use(express.static('public')); // 设置静态资源访问地址
app.set('view engine', 'html'); // 设置默认使用的模板
app.engine('html', swig.renderFile); // 将swig模板应用到所有的html文件

// 配置swig
swig.setDefaults({
	cache: false
}); // 设置swig模板不缓存


// 监听路由
app.get('/', function (req, res, next) {
	connection.query('SELECT * FROM library', function (error, results, fields) {
		if (error) throw error;
		// connected!
		res.render('index', {
			dataList: {
				list: results
			}
		})
	});
})

app.get('/bookList', function (req, res, next) {
	connection.query('SELECT * FROM library', function (error, results, fields) {
		if (error) throw error;
		// connected!
		res.json({
			status: 'ok',
			dataList: {
				list: results
			}
		})
	});
})

// 添加书本接口
app.get('/addBook', function (req, res, next) {
	connection.query('INSERT INTO library SET ?', {
		name: req.query.bookname
	}, function (error, results, fields) {
		if (error) {
			res.json({
				status: 'error',
				test: '添加失败',
			})
		} else {
			res.json({
				status: 'ok',
				test: '添加成功',
			})
		}
	});
})


// 处理容错
// 404
app.get('*', function (req, res, next) {
	res.status(404);
	res.send('<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>');
})
// 500
app.use(function (err, req, res, next) {
	res.status(500);
	next(err);
})


app.listen(3000, function () {
	console.log('端口开启成功');
})