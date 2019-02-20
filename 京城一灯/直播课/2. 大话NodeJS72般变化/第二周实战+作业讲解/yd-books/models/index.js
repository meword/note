/**
 * @fileoverview 实现index的数据模型
 * @author canmeng
 */

const safeRequest = require('../utils/SafeRequest.js');

/**
 * Index类 获取后台关于图书相关的数据
 * @class
 */
class Index {
	/**
	 * @constructor
	 * @param {*} app koa执行上下文环境
	 */
	constructor(app) {}

	/**
	 * 获取图书列表数据
	 * @returns {Promise}
	 * @example
	 * getData()
	 */
	getData() {
		return safeRequest.fetch('index.php?r=library')
	}

	/**
	 * 添加图书接口
	 * @returns {Promise}
	 * @param {object} options 配置项
	 * @example
	 * addData(options)
	 */
	addData(options = {}) {
		return safeRequest.fetch('index.php?r=library/create', options)
	}
}

module.exports = Index;