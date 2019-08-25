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

exports.createItem = (conn, ) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Item() VALUES()',
            [],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
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

exports.saveItemImage = (conn, item_id, img_url) =>{
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO Item_Image(img_url, item_id) VALUES(?, ?)",
            [img_url, item_id],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result);
            }
        )
    })
}

exports.getItemImageByItemId = (conn, item_id) =>{
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM Item_Image Where item_id = ?",
            [item_id],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result);
            }
        )
    })
}

exports.getItemsByBrandId = (conn, brand_id) =>{
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM Item WHERE brand_id = ?",[brand_id],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result);
            }
        )
    })
}

exports.toggleOnSale = (item_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE Item SET on_sale=1 WHERE id=?", [item_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        )
    })
}

exports.toggleOffSale = (item_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE Item SET on_sale=0 WHERE id=?", [item_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        )
    })
}