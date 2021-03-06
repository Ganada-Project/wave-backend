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

        conn.commit();
        conn.end();
        return res.status(200).json({
            message: 'item create success'
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
});
    
};

exports.getAllItem = async(req, res) => {
    const conn = mysql.createConnection(config);
    conn.beginTransaction(async(err) => {
        try {        
            let result = await query.item.getAllItem(conn);
            
            _.forEach(result, function(item, i) {
                item.other_imgs = item.other_imgs.split(" ");
                materials = item.material.split(" ");
                material_list = []
                _.forEach(materials, function(material,i) {
                    name = material.split(":")[0];
                    value = material.split(":")[1];
                    m = new Object();
                    m.name = name;
                    m.value = value
                    material_list.push(m);
                })
                item.material = material_list;
            });
            conn.end();
            return res.status(200).json({
                result
            });
        } catch (err) {
            return res.status(400).json(err.message);
        }
    });
};

exports.getAllItemGender = async(req, res) => {
    const conn = mysql.createConnection(config);
    conn.beginTransaction(async(err) => {
        try {
            let gender = req.query.gender;
            if (gender == "m"){
                gender = '남'
            }
            if (gender == "w"){
                gender = '여'
            }
            let result = await query.item.getAllItem(conn);


            _.forEach(result, function(item, i) {
                item.other_imgs = item.other_imgs.split(" ");
                materials = item.material.split(" ");
                material_list = []
                _.forEach(materials, function(material,i) {
                    name = material.split(":")[0];
                    value = material.split(":")[1];
                    m = new Object();
                    m.name = name;
                    m.value = value
                    material_list.push(m);
                })
                item.material = material_list;
            });
            let filtered;
            if(gender !== "all"){

                filtered = result.filter(function(item, index, arr){
                    console.log(item.gender)
                    return item.gender === gender;
                });

            }
            else{
               filtered = result
            }
            conn.end();
            return res.status(200).json({
                filtered
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json(err.message);
        }
    });
};

exports.getItemByName = async(req, res) => {
    const conn = mysql.createConnection(config);
    conn.beginTransaction(async(err) => {
        try {
            let result = await query.item.getItemByName(conn, req.query.name);

            conn.end();
            return res.status(200).json({
                result
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json(err.message);
        }
    });
}