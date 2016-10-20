"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const zero = (num, lv = 2) => {
	return ('0000000000' + num).slice(-lv);
}

module.exports = {
	menu: (req, res) => {
		db.serialize(() => {
			let menu = {
				status: null,
				items: []
			};
			db.each(`SELECT * FROM menu WHERE date BETWEEN ${req.params.year}${zero(req.params.month)}01 AND ${req.params.year}${zero(req.params.month)}31;`, (err, row) => {
				if(err) {
					res.status(404);
					res.send({
						status: 'error'
					});
				}
				if(row.active === 1) {
					menu.items.push({
						date: row.date,
						m_main: row.m_main,
						m_side: row.m_side,
						l_main: row.l_main,
						l_side: row.l_side,
						d_main: row.d_main,
						d_side: row.d_side
					});
				}
			}, (err, count) => {
				if(err) {
					res.status(404);
					res.send({
						status: 'error'
					})
				} else {
					res.status(200);
					if(count === 0) {
						res.send({
							status: 'notfound'
						});
					} else {
						menu.status = 'success';
						res.send(menu);
					}
				}
			});
		});
	},
	search: (req, res) => {
		db.serialize(() => {
			let results = {
				status: null,
				items: []
			}
			console.log(req.params.word)
			db.each(`SELECT * FROM menu WHERE (date BETWEEN ${req.params.year}${zero(req.params.month)}01 AND ${req.params.year}${zero(req.params.month)}31) AND (m_main LIKE "%${req.params.word}%" OR l_main LIKE "%${req.params.word}%" OR d_main LIKE "%${req.params.word}%" OR m_side LIKE "%${req.params.word}%" OR l_side LIKE "%${req.params.word}%" OR d_side LIKE "%${req.params.word}%")`, (err, row) => {
				if(err) {
					res.status(404);
					res.send({
						status: 'error'
					});
				}
				if(row.active === 1) {
					results.items.push({
						date: row.date,
						m_main: row.m_main,
						m_side: row.m_side,
						l_main: row.l_main,
						l_side: row.l_side,
						d_main: row.d_main,
						d_side: row.d_side
					});
				}
			}, (err, count) => {
				if(err) {
					res.status(404);
					res.send({
						status: 'error'
					});
				} else {
					res.status(200);
					if(count === 0) {
						res.send({
							status: 'notfound'
						});
					} else {
						results.status = 'success';
						res.send(results);
					}
				}
			});
		});
	},
	update: (req, res) => {

	},
	create: (req, res) => {

	},
	delete: (req, res) => {

	}
}