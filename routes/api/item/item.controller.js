const query = require("../common/query");
const jwt = require('jsonwebtoken');

exports.createItem = async (req, res) => {
    const {name,price,category1,category2,category3,
        sex,elasticity,quality,thickness,texture,lining,opacity,season,style,remain,images} = req.body;
        brand_id = req.decoded._id;
    try {

        category = await query.category.createCategory(category1,category2,category3);
        feature = await query.feature.createFeature(elasticity,quality,thickness,texture,lining,opacity);
        size = await query.size.createSize(1,1,1,1,1,1,1,1,"L");
        category_id = category.insertId;
        feature_id = feature.insertId;
        size_id = size.insertId;
        item = await query.item.createItem(brand_id,sex,category_id,style,size_id,feature_id,name,price,season);
        item_id = size.insertId;
        //지우가 할일. 여기서 하나의 아이템이 만들어지고 만들어진 아이템 아이디가 바로위에 있는 변수 item_id 에 저장됨.
        //Item_Image 테이블 만들어놨음 (시퀄참조)
        for(let i = 0; i < images.length; i++) {
            let image_url = await query.image.uploadImage(images[i]);
            let result = await query.item.saveItemImage(image_url, item_id);
        }
        //req.body 에서 images가 base64배열이라고 생각하고 이미지 각각 서버에 올린다음 Item_Image table 채우기
        return res.status(200).json({
            message:"success"
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

