var express = require('express');
var bodyParser = require('body-parser');

var data = {};

express()
	.use(express.static(__dirname + '/public'))
	.use(bodyParser.json())
	.get('/api/data', (req, res) => {
		console.log("GET:data: ", data);
		return res.json(data)
	})
	.post('/api/data', (req, res) => {
		console.log("POST:body: ", req.body);
		data = req.body;
		console.log("POST:data: ", data);
		return res.json(data);
	})
	.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
	.listen(3333);