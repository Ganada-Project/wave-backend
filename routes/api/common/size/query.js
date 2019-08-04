const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);


exports.createSize= (conn,shoulder,chest,arm,waist,weight,height,hip,crotch,thigh,leg) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Size(card_id,shoulder,chest,weight,arm,waist,height,hip,crotch,thigh,leg)' +
            ' VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [height,waist,chest,arm,shoulder,thigh,hip,leg,name,item_id,remain],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result)
            });
    });
}