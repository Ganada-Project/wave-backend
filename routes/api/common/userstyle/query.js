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

exports.getStylesByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM UserStyle WHERE user_id = '${user_id}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result)
        });
    });
}