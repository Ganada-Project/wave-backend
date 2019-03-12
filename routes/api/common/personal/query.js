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

exports.createPersonal = (conn, userId, sex, name, nickname, phone) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Personal(user_id, sex, name, nickname) VALUES(?,?,?,?)',
            [userId, sex, name, nickname],
            (err, result) => {
                if (err){
                    conn.rollback();
                    reject(err);
                }
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

exports.createBrandPersonal = (phone, brand_name, business_number, marketing, user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO Brand(phone, brand_name, business_number, marketing, user_id) VALUES(?,?,?,?,?)`,
            [phone, brand_name, business_number, marketing, user_id],
            (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
    })
}