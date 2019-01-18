const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.getSeasonById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Season WHERE id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};