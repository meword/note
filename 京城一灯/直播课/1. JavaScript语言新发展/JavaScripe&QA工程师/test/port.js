const express = require('express');
const app = express();

app.get('/test', (req, res) => res.send({
	status: 'OK'
}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))