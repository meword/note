$(() => {
	function getList() {
		$.ajax({
			type: 'get',
			url: '/bookList',
			dataType: 'json',
			success: (data) => {
				if (data.status === 'ok') {
					let html = '';
					data.dataList.list.forEach(item => {
						html += `
						<tr>
							<td>${item.id}</td>
							<td>${item.name}</td>
						</tr>`
					})
					$('#list').html(html);
				}
			}
		})
	}


	$('#submitBtn').on('click', (e) => {
		e.preventDefault();

		new Promise((resolve, reject) => {
			$.ajax({
				type: 'get',
				url: '/addBook',
				dataType: 'json',
				data: {
					bookname: $('#bookname').val()
				},
				success: (data) => {
					resolve(data);
				},
				error: (err) => {
					throw new Error(err);
				}
			})
		}).then((data) => {
			if (data.status === 'ok') {
				$('#bookname').val('');
				getList();
			}
		})

	})
})