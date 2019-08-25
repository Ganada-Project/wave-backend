const query = require("../common/query");
const mysql = require('mysql');
const config = require('../../../config');
const _ = require('lodash');
exports.createCard = async (req, res) => {

    const conn = mysql.createConnection(config);
    const {name, age, gender, weight, height, bodyPoints, bodyShape, preferColor, preferStyle, preferSize} = req.body;

    const measure = query.util.measureSize(height, bodyPoints);
    const {shoulder,chest,arm,waist,hip,crotch,thigh,leg} = measure;
    conn.beginTransaction(async(err) => {
        if (err) return res.status(400).json({err});
        try {
            console.log("1")
            const result = await query.size.createSize(conn,shoulder,chest,arm,waist,weight,height,hip,crotch,thigh,leg);
            console.log("2")
            const size_id = result.insertId;
            const user_id = req.decoded._id;
            await query.card.createCard(conn,user_id,size_id,name,age,gender,bodyShape,height,weight,preferColor,preferStyle,preferSize);
            conn.commit();
            conn.end();
            return res.status(200).json({
                message: "success"
            })
        } catch (err) {
            conn.end();
            return res.status(400).json(err.message);
        }
    });

};

exports.getMyCards = async (req, res) => {
    const conn = mysql.createConnection(config);
    const user_id = req.decoded._id;
    conn.beginTransaction(async(err) => {
        if (err) return res.status(400).json({err});
        try {
            const cards = await query.card.getCardByUserId(conn, user_id);
            _.forEach(cards, function(card, i) {
                delete card.user_id;
                delete card.size_id;
                delete card.prefer_color;
                delete card.prefer_style;
                delete card.prefer_size;
            });

            conn.commit();
            conn.end();
            return res.status(200).json({
                cards
            });
        }   catch (err) {
                conn.end();
                return res.status(400).json(err.message);
        }
    });

};

exports.getSizeByCardId = async(req, res) => {
    const conn = mysql.createConnection(config);
    const card_id = req.query.card;
    conn.beginTransaction(async(err) => {
        if (err) return res.status(400).json({err});
        try {
            const cards = await query.card.getCardByCardId(conn, card_id);
            card = cards[0];
            const size_id = card.size_id;
            const sizes = await query.size.getSizeBySizeId(conn, size_id);
            const size = sizes[0];
            conn.commit();
            conn.end();
            return res.status(200).json({
                size
            });
        }   catch (err) {
            conn.end();
            return res.status(400).json(err.message);
        }
    });
}

// exports.UpdateSize = async(req, res) => {
//     const conn = mysql.createConnection(config);
//     conn.beginTransaction(async(err) => {
//         if (err) return res.status(400).json({err});
//         try {
//             const cards = await query.card.getCardByCardId(conn, card_id);
//             card = cards[0];
//             const size_id = card.size_id;
//             const sizes = await query.size.getSizeBySizeId(conn, size_id);
//             const size = sizes[0];
//             conn.commit();
//             conn.end();
//             return res.status(200).json({
//                 size
//             });
//         }   catch (err) {
//             conn.end();
//             return res.status(400).json(err.message);
//         }
//     });
// }