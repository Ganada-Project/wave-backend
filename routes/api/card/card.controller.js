const query = require("../common/query");
const mysql = require('mysql');
const config = require('../../../config');
exports.createCard = async (req, res) => {

    const conn = mysql.createConnection(config);
    const {name, age, gender, weight, height, body_points, body_shape, prefer_color, prefer_style, prefer_size} = req.body;

    const measure = query.util.measureSize(height, body_points);
    const {shoulder,chest,arm,waist,hip,crotch,thigh,leg} = measure;

    conn.beginTransaction(async(err) => {
        if (err) return res.status(400).json({err});
        try {
            const result = await query.size.createSize(conn,shoulder,chest,arm,waist,weight,height,hip,crotch,thigh,leg);
            const size_id = result.insertId;
            const user_id = req.decoded._id;
            query.card.createCard(conn,user_id,size_id,name,age,gender,body_shape,height,weight,prefer_color,prefer_style,prefer_size);
            return res.status(200).json({
                message: "success"
            })
        } catch (err) {
            return res.status(400).json(err.message);
        }
    });

};