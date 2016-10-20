"use strict"

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const apis = require('./routes/apis');

const app = express();
app.listen('4301', () => {
	console.log('Server running at localhost:4301');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// from Services
app.get('/:year/:month', apis.menu);
app.get('/:year/:month/:word', apis.search);

// from Editor
app.post('/:year/:month', apis.update);
app.put('/:year/:month', apis.create);
app.delete('/:year/:month', apis.delete);

// 404
app.use((req, res, next) => {
	res.status(404);
	res.send({
		status: '404'
	});
});