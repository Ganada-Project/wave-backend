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

exports.getBodyByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Body WHERE user_id = ?',
            [userId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result[0])
            });
    });
}

exports.saveBodyImage = (imgURL, bodyId) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO BodyImage(img_url, body_id) VALUES(?,?)',
            [imgURL, bodyId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

