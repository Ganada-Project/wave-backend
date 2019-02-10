const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);


exports.createBrandFollow = (user_id, brand_id) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO FollowBrand(user_id, brand_id) VALUES(?,?)',
            [user_id, brand_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

