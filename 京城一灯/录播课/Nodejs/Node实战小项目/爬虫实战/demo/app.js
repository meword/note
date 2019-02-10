const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio')


app.get('/', function (req, res, next) {
	request('http://www.baidu.com', function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log('body:', body); // Print the HTML for the Google homepage.


		const $ = cheerio.load(body);
		// 操作dom

		res.send('hello world');
	});
})

app.listen(3000, function () {
	console.log('端口服务开启成功！')
})