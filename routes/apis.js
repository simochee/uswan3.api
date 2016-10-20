"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('menu');

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
			db.each(`SELECT * FROM menu WHERE date BETWEEN ${req.year}${zero(req.month)}01 AND ${req.year}${zero(req.month)}31;`, (err, row) => {
				if(err) {
					res.send({
						status: 'error'
					});
				}
				menu.items.push({
					date: row.date,
					mMain: row.m_main,
					mSide: row.m_side,
					lMain: row.l_main,
					lSide: row.l_side,
					dMain: row.d_main,
					dSide: row.d_side
				});
			});
			menu.status = 'OK';
			res.send(menu);
		});
		db.close();
	},
	search: (req, res) => {
		db.serialize(() => {
			let result = {
				status: null,
				items: []
			}
			db.each(`SELECT * FROM menu WHERE `)
		});
	},
	update: (req, res) => {

	},
	create: (req, res) => {

	},
	delete: (req, res) => {

	}
}