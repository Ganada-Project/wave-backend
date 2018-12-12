const query = require("../common/query");

exports.uploadImage = async (req, res) => {
    const {base64} = req.body;
    try {
        result = await query.image.uploadImage(base64);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.getVerificationSMS = async (req, res) => {
    let random_verify = Math.floor(1000 + Math.random() * 9000);
    random_verify = random_verify.toString();
    try {
        await query.sms.sendVerificationSMS(req.query.phone, random_verify);
        await res.status(200).json({
            verification_code: random_verify
        })
    } catch (err) {
        return res.status(406).json({
            err
        })
    }
}

exports.getPoints = async(req, res) => {
    const { url } = req.body;
    // let points = await query.body.estimateBodyPoints(url);
    try {
        let points = await query.body.estimateBodyPoints(url);
        return res.status(200).json({
            points
        })
    } catch (err) {
        return res.status(406).json({
            err
        })
    }
}

exports.saveAdjustedBodyPoints = async(req, res) => {
    const { body_image_id, top, neck, shoulder, wrist, ankle, bottom, thigh_l, thigh_r, chest_l, chest_r, waist_l, waist_r } = req.body;
    let bodyPoints = {
        body_image_id, 
        top, 
        neck, 
        shoulder, 
        wrist, 
        ankle, 
        bottom, 
        thigh_l, 
        thigh_r, 
        chest_l, 
        chest_r, 
        waist_l, 
        waist_r
    }
    try {
        let result = await query.body.saveAdjustedBodyPoints(bodyPoints);
        return res.status(200).json({
            result
        })
    } catch (err) {
        return res.status(406).json({
            err
        })
    }
}