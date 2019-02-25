const axios = require('axios');

describe('接口测试', function() {
	it('简单的接口测试', function(done) {
		axios.get('http://localhost:3000/test')
		.then(function(response) {
			if (response.data.status === 'OK') {
				done();
			} else {
				done(new Error('接口出错'));
			}
		})
		.catch(function(err) {
			done(err);
		})
	})
})