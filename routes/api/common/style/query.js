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


exports.recommendStyleByUserStyle = (styles) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT brand_name FROM Brand JOIN BrandStyle ON Brand.id = BrandStyle.brand_id WHERE main = 1 and (style_id = " + styles[0];
        for(let i = 0; i < styles.length; i++) {
            sql += " or style_id = "+styles[i];
        }
        conn.query(
            sql+")",
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        )
    })
}

