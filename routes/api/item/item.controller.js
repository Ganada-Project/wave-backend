const query = require("../common/query");
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const config = require('../../../config');
exports.createItem = async (req, res) => {
    const {
        name,
        url,
        gender,
        category,
        color,
        main_img,
        other_imgs,
        outlined_img,
        style,
        price,
        maker,
        material,
        madein,
        sizes
    } = req.body;

    return res.status(200).json({
        name,
        url,
        gender,
        category,
        color,
        main_img,
        other_imgs,
        outlined_img,
        style,
        price,
        maker,
        material,
        madein,
        sizes
    })
};