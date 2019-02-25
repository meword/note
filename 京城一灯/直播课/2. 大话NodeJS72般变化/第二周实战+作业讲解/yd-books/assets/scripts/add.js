class Add {
	constructor() {}

	fn() {
		$('#js-submit').click(yd.throttle(function() {
			const content = {
				bookname: $('#inputBookname').val(),
				author: $('#inputAuthor').val(),
				price: $('#inputPrice').val()
			};

			fetch('/create', {
				method: 'post',
				body: JSON.stringify(content),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (json.message === 'ok') {
					return layer.msg('添加书籍成功', {icon: 1, time: 1500});
				}
			})
		}, 5000))
	}
}

export default Add;