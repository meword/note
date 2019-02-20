const _ = require('lodash');
const {join} = require('path');


const defConfig = {
	viewsDir: join(__dirname, '..', 'views'),
	staticDir: join(__dirname, '..', 'assets')
}

const env = {
	development: {
		port: 3000,
		baseURL: 'http://localhost/yd_project/library/web/',
		swigCache: false,
	},
	production: {
		port: 8081,
		baseURL: '',
		swigCache: 'memory',
	}
}

const config = _.extend(defConfig, env[process.env.NODE_ENV]);

module.exports =  config