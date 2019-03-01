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
            message:"success",
            id: item_id
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.createSize = async (req, res) => {
    const {height,waist,chest,arm,shoulder,thigh,hip,leg,name,item_id,
        height_measure,waist_measure,chest_measure,arm_measure,shoulder_measure,
        thigh_measure,hip_measure,leg_measure,remain} = req.body;
    try {

        size = await query.size.createSize(height,waist,chest,arm,shoulder,thigh,hip,leg,name,item_id,remain);
        measure = await query.sizemeasure.createSizeMeasure(height_measure,waist_measure,chest_measure,
            arm_measure,shoulder_measure,thigh_measure,hip_measure,leg_measure,size.insertId);

        return res.status(200).json({
            message:"success"
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.getItemsByBrandId = async (req, res) => {
    const brand_id = req.decoded._id;
    try {
        const items = await query.item.getItemsByBrandId(brand_id);
        const products = [];

        for(item of items){
            let product = {};
            product.name = item.name;
            category = await query.category.getCategoryById(item.category_id);
            category1 = await query.category.getCategory1ById(category[0].category1_id);
            category2 = await query.category.getCategory2ById(category[0].category2_id);
            category3 = await query.category.getCategory3ById(category[0].category3_id);
            season = await query.season.getSeasonById(item.season_id);

            product.category1 = category1[0];
            product.category2 = category2[0];
            product.category3 = category3[0];
            product.season = season[0];
            product.price = item.price;
            product.rate = 0;
            product.sell = 0;
            products.push(product);
        }
        return res.status(200).json({
            products
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.getItemById = async (req, res) => {
    try {
        const item = await query.item.getItemById(req.query.item_id);
        let product = {};
        product.name = item.name;
        category = await query.category.getCategoryById(item.category_id);
        category1 = await query.category.getCategory1ById(category[0].category1_id);
        category2 = await query.category.getCategory2ById(category[0].category2_id);
        category3 = await query.category.getCategory3ById(category[0].category3_id);
        season = await query.season.getSeasonById(item.season_id);

        product.category1 = category1[0];
        product.category2 = category2[0];
        product.category3 = category3[0];
        product.season = season[0];
        product.price = item.price;
        product.rate = 0;
        product.on_sale = item.on_sale;
        product.images = [];

        const result = product;
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.getMeasureFeatures = async (req, res) => {
    try {
        const result = await query.category.getSizeGroupByCategory3Id(req.query.category3_id);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json({
            err
        })
    }
}

exports.toggleOnSale = async (req, res) => {
    try {
        const item = await query.item.getItemById(req.params.item_id);
        if (item.on_sale === 0) {
            await query.item.toggleOnSale(item.id);
        } else {
            await query.item.toggleOffSale(item.id);
        }
        return res.status(200).json({
            message: "on sale toggled"
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}