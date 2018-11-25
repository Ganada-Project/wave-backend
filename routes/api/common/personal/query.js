const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);


exports.getPersonalByNickname = (nickname) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Personal WHERE nickname = '${nickname}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}

exports.createPersonal = (userId, sex, name, nickname, phone) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Personal(user_id, sex, name, nickname, phone) VALUES(?,?,?,?,?)',
            [userId, sex, name, nickname, phone],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.getPersonalById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Personal WHERE id = '${id}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}

exports.getPersonalByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Personal WHERE user_id = '${user_id}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}