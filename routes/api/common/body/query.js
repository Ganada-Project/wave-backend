const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.createBody = (userId, height, weight, waist) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Body(user_id, height, weight, waist) VALUES(?,?,?,?)',
            [userId, height, weight, waist],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}