const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.createItemStyle = (item_id, size_id) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO ItemSize(item_id,size_id) VALUES(?,?)',
            [item_id, size_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}



