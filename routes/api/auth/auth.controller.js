const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mysql = require('mysql');
const config = require('../../../config');
const conn = mysql.createConnection(config);
const query = require('../common/query');

exports.register = (req, res) => {
	const secret = req.app.get('jwt-secret');
	const { username, email, password, phone, fcm_token } = req.body;
	const encrypted = crypto.createHmac('sha1', config.secret)
		.update(password)
		.digest('base64');
	conn.query('SELECT * from Users WHERE email=?',[email], (err, rows) => {
		if (err) throw err;
		if (rows.length == 0) {
			conn.query(
				'INSERT INTO Users(username, password, email, phone, fcm_token) VALUES (?, ?, ?, ?, ?)',
				[username, encrypted, email, phone, fcm_token],
				(err, result) => {
					if (err) throw err;
					console.log(result);
					jwt.sign(
					{
						_id: result.insertId,
						email: email
					},
					secret,
					{
						expiresIn: '7d',
						issuer: 'rebay_admin',
						subject: 'userInfo'
					}, (err, token) => {
						if (err) return res.status(406).json({ message:'register failed' });
						return res.status(200).json({
							message: 'registered successfully',
							token
						});
					});
		  	});
		} else {
			return res.status(406).json({
				message: 'user email exists'
			})
		}
	});
};

exports.login = (req, res) => {
	const { email, password, fcm_token } = req.body;
	// console.log(email,password,config.secret);
	const secret = req.app.get('jwt-secret');
	const encrypted = crypto.createHmac('sha1', config.secret)
		.update(password)
		.digest('base64');
	// console.log(encrypted);
	conn.query(
		'SELECT * from Users WHERE email=? and password=?',
		[email, encrypted],
		(err, result) => {
			if (err) throw err;
			if (result.length == 0) {
				return res.status(404).json({ message: 'login failed'});
			} else {
				jwt.sign(
					{
						_id: result[0].id,
						email: result[0].email
					},
					secret,
					{
						expiresIn: '7d',
						issuer: 'rebay_admin',
						subject: 'userInfo'
					}, async(err, token) => {
						if (err) return res.status(406).json({ message:'login failed' });
						await query.renewFcmtoken(result[0].id, fcm_token);
						return res.status(200).json({
							message: 'logged in successfully',
							token
						});
					});
			}
		}
	)
};
