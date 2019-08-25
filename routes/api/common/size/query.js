const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);


exports.createSize= (conn,shoulder,chest,arm,waist,weight,height,hip,crotch,thigh,leg) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Size(shoulder,chest,weight,arm,waist,height,hip,crotch,thigh,leg)' +
            ' VALUES(?,?,?,?,?,?,?,?,?,?)',
            [shoulder,chest,weight,arm,waist,height,hip,crotch,thigh,leg],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result)
            });
    });
}

exports.getSizeBySizeId = (conn,size_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Size WHERE id = ?',
            [size_id],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result)
            });
    });
}