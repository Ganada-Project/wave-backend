const query = require("../common/query");
const mysql = require('mysql');
const config = require('../../../config');
exports.getStyleById = async (req, res) => {
    const {style_id} = req.params;
    try {
        const result = await query.style.getStyleById(style_id);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getAllStyles = async (req, res) => {
    try {
        const result = await query.style.getAllStyles();
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getStyleByUserId = async (req, res) => {
    const {user_id} = req.params;
    try {
        const styleIds = await query.userstyle.getStylesByUserId(user_id);
        const styles = [];
        for(styleId of styleIds){
            const style = await query.style.getStyleById(styleId.style_id);
            styles.push(style);
        }
        const result = styles;
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.recommendStyleByUserStyle = async (req, res) => {
    const { styles } = req.body;
    const conn = mysql.createConnection(config);
    conn.beginTransaction(async(err) => {
        if (err) return res.staut(400).json({err});
    try {
        const brands = await query.style.recommendStyleByUserStyle(conn, styles);
        const result = [];
        const visited = [];
        while(true) {
            const idx = Math.floor(Math.random() * brands.length);
            const brand = brands[idx];
            const items = await query.item.getItemsByBrandId(conn,brand.id);
            for (item of items) {
                item.image = await query.item.getItemImageByItemId(conn,item.id);
            }
            brand.items = items;
            if(items.length === 0) continue;
            if(visited.indexOf(idx) !== -1) continue;
            result.push(brand);
            visited.push(idx);
            if(result.length === 5) break;
        }
        conn.commit();
        conn.end();
        return res.status(200).json({
            result
        })
    } catch (err) {
        conn.end();
        return res.status(400).json(err);
    }
    });
}