const Mocha = require('mocha');
const mocha = new Mocha({
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: './docs/mochawesome-report'
	}
});

mocha.addFile('./service/router.spec.js');
mocha.run(function(errLength) {
	if (errLength === 0) {
		process.exit();
	} else {
		console.log('出错长度', errLength);
		process.exit();
	}
});