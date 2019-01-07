class Utils {
	constructor() {

	}

	static _jsextend() {
		/**
		 * 重写window.onload  使他能支持多个回调
		 * @param {Object} fun
		 */
		window.cmLoad = function(fun) {
			let oldonload = window.onload;
			if(typeof window.onload != 'function') {
				window.onload = fun;
			} else {
				window.onload = function() {
					oldonload();
					fun();
					window.onloaded=true;
				}
			}
		}
		/**
		 * 重写window.onhashchange  使他能支持多个回调
		 * @param {Object} fun
		 */
		window.cmhashchange = function(fun) {
			let oldhashchange = window.onhashchange;
			if(typeof window.onhashchange != 'function') {
				window.onhashchange = fun;
			} else {
				window.onhashchange = function() {
					oldhashchange();
					fun();
				}
			}
		}
		/**
		 * 让ie8支持forEach
		 */
		if(!Array.prototype.forEach) {
			Array.prototype.forEach = function forEach(callback, thisArg) {
				var T, k;
				if(this == null) {
					throw new TypeError("this is null or not defined");
				}
				var O = Object(this);
				var len = O.length >>> 0;
				if(typeof callback !== "function") {
					throw new TypeError(callback + " is not a function");
				}
				if(arguments.length > 1) {
					T = thisArg;
				}
				k = 0;
				while(k < len) {
					var kValue;
					if(k in O) {
						kValue = O[k];
						callback.call(T, kValue, k, O);
					}
					k++;
				}
			};
		};
	}

	/**
	 * 获取get参数
	 * name：需要获取的键
	 */
	getQueryString(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	/**
	 * 获取当前HTML文件名
	 */
	getHtmlName() {
		let str = window.location.href;
		str = str.substring(str.lastIndexOf("/") + 1);
		str = str.substring(0, str.lastIndexOf("."));
		return '' + str;
	}

	/**
	 * 获取url中的hash值
	 */
	getHashParameter(key){
		var arr = (location.hash || "").replace(/^\#/,'').split("&");
		var params = {};
		for(var i=0; i<arr.length; i++){
			var data = arr[i].split("=");
			if(data.length == 2){
				 params[data[0]] = data[1];
			}
		}
		return params[key] ? params[key] : null;
	}

	/**
	 * 范围时间代码
	 * count：获取几天前
	 */
	getRangeTime(count) {
		// 拼接时间
		let time1 = new Date()
		time1.setTime(time1.getTime())
		let Y1 = time1.getFullYear()
		let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
		let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
		let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
		let time2 = new Date()
		time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
		let Y2 = time2.getFullYear()
		let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
		let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
		let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
		return {
			t1: timer1,	// 当天时间
			t2: timer2	// 选中的时间
		}
	}

	/**
	 * 二次封装的ajax
	 */
	ajax(object) {
		return new Promise((resolve, rejcet) => {
			$.ajax({
				type: this.Request_type,
				url: this.Request_url + object.url,
				data: object.data,
				cache: false,
				processData: object.isFrom,
				contentType: object.isFrom == true ? "application/x-www-form-urlencoded" : object.isFrom,
				async: true,
				dataType: "json",
				success: (data) => {
					
				},
				error: (data, xhm) => {
					
				},
				complete: (XMLHttpRequest, status) => {
					
				}
			});
		})
	}
}

let utils = new Utils();

Utils._jsextend();

window.$utils = utils;