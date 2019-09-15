const query = require("../common/query");
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const config = require('../../../config');
const _ = require('lodash');
exports.createItem = async (req, res) => {

    const conn = mysql.createConnection(config);
    conn.beginTransaction(async(err) => {
    try {
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
            materials,
            madein
        } = req.body;

        new_material_string = ""
        _.forEach(materials, function(material, i) {
            new_material_string += `${material.name}:${material.value} `
        });

        new_other_imgs_string = ""
        _.forEach(other_imgs, function(img, i) {
            new_other_imgs_string += `${img} `
        });
        // console.log(mater)
        await query.item.createItem(
            name,
            url,
            gender,
            category,
            color,
            main_img,
            new_other_imgs_string,
            outlined_img,
            style,
            price,
            maker,
            new_material_string,
            madein
        )

        return res.status(200).json({
            message: 'item create success'
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
});
    
};