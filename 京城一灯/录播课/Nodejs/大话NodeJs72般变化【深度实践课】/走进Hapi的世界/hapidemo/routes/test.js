const path = require('path');

const test = {
	method: 'GET',
	path: '/test',
	handler: (request, h) => {
		let info = request.logger.info('In handler %s', request.path);
		console.info('这是info:',info);
		return h.file(path.join(__dirname, '../public/test.html'));
	}
};

module.exports = [test];