const query = require("../common/query");

exports.recommendBrandByStyle = async (req, res) => {
    const user_id = req.decoded._id;
    try {
        const follow_brands = await query.brandfollow.getBrandFollowByUserId(user_id);
        const follow_brand_ids = [];
        for(follow_brand of follow_brands){
            follow_brand_ids.push(follow_brand.brand_id);
        }
        const styles = await query.userstyle.getStylesByUserId(user_id);
        const styleIds = [];
        for(style of styles){
            styleIds.push(style.style_id);
        }
        const  recommend_brands = await query.style.recommendStyleByUserStyle(styleIds);

        const recommend_brand_ids = [];
        for(recommend_brand of recommend_brands){
            recommend_brand_ids.push(recommend_brand.brand_id);
        }
        for(follow_brand_id of follow_brand_ids){
            const index = recommend_brand_ids.indexOf(follow_brand_id);
            if (index > -1) {
                recommend_brand_ids.splice(index, 1);
            }
        }

        const brands = [];
        for(brand_id of recommend_brand_ids){
            const brand = await query.brand.getBrandById(brand_id);
            brands.push(brand);
        }
        return res.status(200).json({
            brands
        })
    } catch (err) {
        return res.status(400).json(err);
    }
}

