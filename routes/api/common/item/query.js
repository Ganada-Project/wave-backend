const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);


exports.getMeasurePreset = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Measure`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}

exports.createSize = (height,waist,chest,arm,shoulder,thigh,hip,leg) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Size(height,waist,chest,arm,shoulder,thigh,hip,leg) VALUES(?,?,?,?,?,?,?,?)',
            [height,waist,chest,arm,shoulder,thigh,hip,leg],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

// exports.getItemById = (id) => {
//     return new Promise((resolve, reject) => {
//         conn.query(`SELECT * FROM Personal WHERE id = '${id}'`, (err, result) => {
//             if (err) reject(err);
//             else resolve(result[0])
//         });
//     });
// }
//
// exports.createItem = (user_id) => {
//     return new Promise((resolve, reject) => {
//         conn.query(`SELECT * FROM Personal WHERE user_id = '${user_id}'`, (err, result) => {
//             if (err) reject(err);
//             else resolve(result[0])
//         });
//     });
// }