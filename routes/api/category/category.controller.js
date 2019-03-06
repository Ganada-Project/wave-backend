const query = require("../common/query");
const mysql = require('mysql');
const config = require('../../../config');
exports.getCategory1 = async (req, res) => {
    const conn = mysql.createConnection(config);

    conn.beginTransaction(async(err) => {
        if (err) return res.staut(400).json({err});
        try {
            category1 = await query.category.getCategory1(conn);
            return res.status(200).json({
                category1
            })
        } catch (err) {
            return res.status(400).json(err);
        }
    });
};

exports.getCategory2 = async (req, res) => {
    const {parent_id} = req.params;
    try {
        category2 = await query.category.getCategory2ByParentId(parent_id);
        await res.status(200).json({
            category2
        })
    } catch (err) {
        return res.status(406).json({
            err
        })
    }
}

exports.getCategory3 = async (req, res) => {
    const {parent_id} = req.params;
    // try {
    category3 = await query.category.getCategory3ByParentId(parent_id);
    await res.status(200).json({
        category3
    })
    // } catch (err) {
    return res.status(406).json({
        err
    })
    // }
}

