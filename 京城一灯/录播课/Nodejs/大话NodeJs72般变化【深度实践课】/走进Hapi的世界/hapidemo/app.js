'use strict';

const Hapi = require('hapi');
const routes = require('./routes/index.js')

// Create a server with a host and port
const server = Hapi.server({
	host: 'localhost',
	port: 8000
});
 

// Start the server
const start = async function () {
	// 引入渲染模块
	await server.register(require('inert'));

	// 引入日志生成模块
	await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
			logEvents: ['response', 'onPostStart']
        }
	});

	server.logger().info('another way for accessing it')

	// Add the route
	for(const item of routes) {
		// console.log(item)
		server.route(item);
	}

	await server.start();
	
	console.log('Server running at:', server.info.uri);
};

start();

// 全局错误监听
/* process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
}); */