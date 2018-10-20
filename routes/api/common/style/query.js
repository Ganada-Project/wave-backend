const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.getStyleById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Style WHERE id = ${id}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}

exports.getAllStyles = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Style`, (err, result) => {
            if (err) reject(err);
            else resolve(result)
        });
    });
}

