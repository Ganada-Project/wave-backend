const query = require("../common/query");
const jwt = require('jsonwebtoken');

exports.getUserById = async (req, res) => {
    const {user_id} = req.params;
    try {
        const user = await query.user.getUserById(user_id);
        delete user.password;

        const body = await query.body.getBodyByUserId(user_id);
        delete body.user_id;
        delete body.id;

        const personal = await query.personal.getPersonalByUserId(user_id);
        delete personal.user_id;
        delete personal.id;

        const userStyles = await query.userstyle.getStylesByUserId(user_id);
        const styles = [];

        for(userStyle of userStyles){
            const style = await query.style.getStyleById(userStyle.style_id);
            delete style.id;
            styles.push(style);
        }

        user.personal = personal;
        user.body = body;
        user.styles = styles;


        return res.status(200).json({
            user

        });
    } catch (err) {
        return res.status(400).json(err);
    }
};
exports.getMe = async (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token
    // console.log("token");
    jwt.verify(token, req.app.get('jwt-secret'), async(err, decoded) => {
        
        if (decoded.sub === "brandInfo") { //브랜드 계정
            let result = await query.brand.getBrandById(decoded._id);
            return res.status(200).json({
                result
            })
        } else { //유저 계정
            let result = await query.user.getUserById(decoded._id);
            return res.status(200).json({
                result
            })
        }
    })
}
exports.updateBodyByUserId = async (req, res) => {
    const {user_id, height, weight, waist} = req.body;
    try {
        const result = await query.body.patchBodyByuserId(user_id,height,weight,waist);


        return res.status(200).json({
            result

        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

