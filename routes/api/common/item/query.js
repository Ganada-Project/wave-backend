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

exports.createItem = (brand_id, sex, category_id, style_id, size_id, feature_id,name,price,season) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Item(brand_id, sex, category_id, style_id, size_id, feature_id,name,price,season_id) VALUES(?,?,?,?,?,?,?,?,?)',
            [brand_id, sex, category_id, style_id, size_id, feature_id,name, price,season],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.getItemById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Item WHERE id = '${id}'`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}


