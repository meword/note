const hello = {
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, h) => {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
}

const index = {
	method: 'GET',
    path: '/index',
    handler: (request, h) => {
        return {
			data: '这是index页面'
		};
    }
}

module.exports = [hello, index];