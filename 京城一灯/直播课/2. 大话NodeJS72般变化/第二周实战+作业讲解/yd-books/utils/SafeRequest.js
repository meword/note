const fetch = require('node-fetch');
const config = require('../config/index.js');

/**
 * @class
 * 提供安全请求的类
 */
class SafeRequest {
	/**
	 * @constructor
	 */
	constructor() {}

	/**
	 * fetch请求二次封装
	 * @param {string} url 请求接口地址
	 * @param {object} options 请求配置项
	 * @returns {Promise}
	 */
	fetch(url, options = {}) {
		const result = {
			code: null,
			message: '',
			data: {},
		}
		console.log(options);
		return new Promise((resolve, reject) => {
			fetch(config.baseURL + url, options)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
			})
			.then(json => {
				result.code = json.code;
				result.message = json.message;
				result.data = json;
				resolve(result);
			})
			.catch(error => {
				result.code = 1;
				result.message = 'no';
				reject(result);

				process._logger('node与后端接口通讯失败', error);
				throw new Error('node与后端接口通讯失败', error)
			})
		})
	}
}

module.exports = new SafeRequest();