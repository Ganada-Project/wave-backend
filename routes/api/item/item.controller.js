const query = require("../common/query");
const jwt = require('jsonwebtoken');

exports.createItem = async (req, res) => {
    const {name,price,category1,category2,category3,
        sex,elasticity,quality,thickness,texture,lining,opacity,season,style,remain,images} = req.body;
        brand_id = req.decoded._id;
    try {

        category = await query.category.createCategory(category1,category2,category3);
        feature = await query.feature.createFeature(elasticity,quality,thickness,texture,lining,opacity);
        // size = await query.size.createSize(1,1,1,1,1,1,1,1,"L");
        category_id = category.insertId;
        feature_id = feature.insertId;
        // size_id = size.insertId;
        item = await query.item.createItem(brand_id,sex,category_id,style,feature_id,name,price,season);
        item_id = item.insertId;

        for(let i = 0; i < images.length; i++) {
            let image_url = await query.image.uploadImage(images[i]);
            let result = await query.item.saveItemImage(item_id, image_url);
        }

        return res.status(200).json({
            message:"success"
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.createSize = async (req, res) => {
    const {height,waist,chest,arm,shoulder,thigh,hip,leg,name,item_id} = req.body;
    try {

        size = await query.size.createSize(height,waist,chest,arm,shoulder,thigh,hip,leg,name,item_id);

        return res.status(200).json({
            message:"success"
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}