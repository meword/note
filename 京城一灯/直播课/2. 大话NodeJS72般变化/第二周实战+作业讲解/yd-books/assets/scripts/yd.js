function yd() {}

yd._version = 1;

yd.throttle = function(fn, wait) {
	let timer;
	return function(...args) {
		if (!timer) {
			timer = setTimeout(() => { timer = null }, wait);
			fn.apply(this, args);
		}
	}
}