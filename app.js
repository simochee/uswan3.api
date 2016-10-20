"use strict"

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const apis = require('./routes/apis');

const app = express();
app.listen('3000');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 404
app.use((req, res, next) => {
	res.status(404);
	res.send('Error! This url\'s undefined');
});

// from Services
app.get('/:year/:month', apis.menu);
app.get('/:year/:month/:word', apis.search);

// from Editor
app.post('/:year/:month', apis.update);
app.put('/:year/:month', apis.create);
app.delete('/:year/:month', apis.delete);
