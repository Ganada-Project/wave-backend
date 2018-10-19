const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.createStyle = (userId, styleId) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO UserStyle(user_id, style_id) VALUES(?,?)',
            [userId, styleId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}