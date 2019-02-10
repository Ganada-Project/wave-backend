const query = require("../common/query");
const jwt = require('jsonwebtoken');
const faker = require('Faker');
const crypto = require('crypto');
const config = require('../../../config');
exports.generateItem = async (req, res) => {
    const category2_mask = [1,1,1,2,2,3,4,4,4,4,1];
    const category3_mask =
        [
            1,1,1,1,1,1,1,
            2,2,2,2,2,2,2,
            3,3,3,3,3,3,
            4,4,4,4,4,
            5,5,5,5,5,5,
            6,6,6,6,6,6,
            7,7,7,7,
            8,8,8,8,8,8,8,
            9,9,9,
            10,10,10,
            11,11,11,11,11

        ];
    const sex_list = ['M','W'];
    // const brand_list = [1,2,25,35,36,37];
    const {iter} = req.params;
    for(let q = 0;q<iter;q++){
        const name = faker.Company.companyName();
        const price = Math.floor(Math.random() * 500000)+10000;
        const category1 = Math.floor(Math.random() * 4)+1;
        let category2 = Math.floor(Math.random() * 11)+1;
        while(category2_mask[category2] != category1){
            category2 = Math.floor(Math.random() * 11)+1;
        }
        let category3 = Math.floor(Math.random() * 59)+1;
        while(category3_mask[category3] != category2){
            category3 = Math.floor(Math.random() * 59)+1;
        }
        const sex = sex_list[Math.floor(Math.random() * 2)];
        const elasticity = Math.floor(Math.random() * 5)+1;
        const lining = Math.floor(Math.random() * 3)+1;
        const opacity = Math.floor(Math.random() * 5)+1;
        const  quality = Math.floor(Math.random() * 6)+1;
        const texture = Math.floor(Math.random() * 3)+1;
        const thickness = Math.floor(Math.random() * 5)+1;
        const season = Math.floor(Math.random() * 2)+1;
        const style = Math.floor(Math.random() * 12)+1;
        const remain = Math.floor(Math.random() * 3000)-1;
        const brand_id = Math.floor(Math.random() * 100)+1;
        // const {name,price,category1,category2,category3,
        //     sex,elasticity,quality,thickness,texture,lining,opacity,season,style,remain,images} = req.body;
        // brand_id = req.decoded._id;
        try {

            category = await query.category.createCategory(category1,category2,category3);
            feature = await query.feature.createFeature(quality,thickness,elasticity,texture,lining,opacity);
            // size = await query.size.createSize(1,1,1,1,1,1,1,1,"L");
            category_id = category.insertId;
            feature_id = feature.insertId;
            // size_id = size.insertId;
            item = await query.item.createItem(brand_id,sex,category_id,style,feature_id,name,price,season);
            item_id = item.insertId;
            const num_images = Math.floor(Math.random() * 5)+1;
            for(let i = 0; i < num_images; i++) {
                // let image_url = await query.image.uploadImage(images[i]);
                let result = await query.item.saveItemImage(item_id, faker.Image.fashion());
            }

        } catch (err) {
            return res.status(400).json(err);
        }

    }
    return res.status(200).json({
        message:"success"
    })

};

exports.generateBrand = async (req, res) => {
    const {iter} = req.params;
    for(let q = 0;q<iter;q++) {
        // try {
            // const { email, password, brand_name, business_number, phone, marketing, styles, is_online_market, online_number } = req.body;
            const email = faker.Internet.email();
            const password = "1234";
            const brand_name = faker.Name.firstName();
            const business_number = Math.floor(Math.random() * 10000000) + 1000000;
            const phone = faker.PhoneNumber.phoneNumber();
            const marketing = Math.floor(Math.random() * 2);
            const image = faker.Image.fashion();
            const is_online_market = Math.floor(Math.random() * 2);
            let online_number;
            if (is_online_market === 1) {
                online_number = Math.floor(Math.random() * 10000000) + 1000000;
            }
            const num_styles = Math.floor(Math.random() * 5) + 1;
            const styles = [];
            for (let i = 1; i <= 12; i++) {
                styles.push(0);
            }

            //hash password
            const encrypted = crypto.createHmac('sha1', config.secret)
                .update(password)
                .digest('base64');

            // const brand = await query.brand.checkDuplicateBrand(email, brand_name);
            // if (brand.length != 0) {
            //     return res.status(406).json({
            //         message: 'brand_name or email already exists'
            //     })
            // }

            const createBrand = await query.brand.createBrand(email, encrypted, brand_name, business_number, phone, marketing, is_online_market, online_number,image);
            const brand_id = createBrand.insertId;

            for (let i = 0; i < num_styles; i++) {
                let main = false;
                const style = Math.floor(Math.random() * 13) + 1;
                if (styles[style - 1] === 0) {
                    if (i === 0){
                        main = true;
                    }
                    const createStyle = await query.brandstyle.createBrandStyle(brand_id, style, main);
                    styles[style - 1] = 1;

                }
            }

        // } catch (err) {
        //     return res.status(400).json(err);
        // }
    }
    return res.status(200).json({
        message:"success"
    })
}

