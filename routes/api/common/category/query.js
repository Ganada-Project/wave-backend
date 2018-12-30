const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.getCategory1 = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Item_Category1`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getCategory2ByParentId = (parent_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category2 WHERE parent_id = ?',
            [parent_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

