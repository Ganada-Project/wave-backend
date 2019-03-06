const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

exports.getCategory1 = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Item_Category1`, (err, result) => {
            if (err) {
                conn.rollback();
                reject(err);
            }
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

exports.getCategory3ByParentId = (parent_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category3 WHERE parent_id = ?',
            [parent_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

exports.createCategory = (conn, category1, category2, category3) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Item_Category(category1_id,category2_id,category3_id) VALUES(?,?,?)',
            [category1,category2,category3],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
    });
};

exports.getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category WHERE id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};
exports.getCategory1ById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category1 WHERE id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};
exports.getCategory2ById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category2 WHERE id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};
exports.getCategory3ById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category3 WHERE id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

exports.getSizeGroupByCategory3Id = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Item_Category3 as A JOIN SizeGroup as B ON A.`size_group_id` = B.id WHERE A.id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    })
}