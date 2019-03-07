const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mysql = require('mysql');
const config = require('../../../config');
const conn = mysql.createConnection(config);
const query = require('../common/query');
exports.register = async (req, res) => {
    // try{
        const secret = req.app.get('jwt-secret');
        //get data
        const { sex, nickname, name, phone, password, styles, height, weight, waist, bodyImageBase64, brands } = req.body;

        //hash password
        const encrypted = crypto.createHmac('sha1', config.secret)
            .update(password)
            .digest('base64');

        //phone number duplicate check
        const user = await query.user.getUserByPhone(phone);
        if(user != undefined){
            return res.status(406).json({
                message: 'user phone already exists'
            })
        }

        //create user
        const createUser = await query.user.createUser(phone, encrypted);
        const userId = createUser.insertId;

        //create personal
        const createPersonal = await query.personal.createPersonal(userId, sex, name, nickname);

        //create body
        const createBody = await query.body.createBody(userId, height, weight, waist);
        const bodyId = createBody.insertId;

        // save body image
        const returnedBodyImageURL = await query.image.uploadImage(bodyImageBase64);
        const saveBodyImage = await query.body.saveBodyImage(returnedBodyImageURL, bodyId);

        //create styles
        for(style of styles){
            const createStyle = await query.userstyle.createStyle(userId, style);
        }

        //create styles
        for(brand of brands){
            const createBrandFollow = await query.brandfollow.createBrandFollow(userId, brand);
        }
        jwt.sign(
            {
                _id: userId,
                phone: phone
            },
            secret,
            {
                expiresIn: '100d',
                issuer: 'rebay_admin',
                subject: 'userInfo'
            }, (err, token) => {
                if (err) return res.status(406).json({ message:'register failed' });
                return res.status(200).json({
                    message: 'registered successfully',
                    token
                });
            });
    // }
    // catch (err) {
        return res.status(400).json(err);
    // }
}

exports.register_brand = async(req, res) => {
    try {
        const secret = req.app.get('jwt-secret');
        const { email, password, brand_name, business_number, phone, marketing, styles, is_online_market, online_number } = req.body;
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

        const createBrand = await query.brand.createBrand(email, encrypted, brand_name, business_number, phone, marketing, is_online_market, online_number);
        const brand_id = createBrand.insertId;
        for (style of styles) {
            const createStyle = await query.brandstyle.createBrandStyle(brand_id, style);
        }
        jwt.sign(
            {
                _id: brand_id,
                phone: phone
            },
            secret,
            {
                expiresIn: '100d',
                issuer: 'rebay_admin',
                subject: 'brandInfo'
            }, (err, token) => {
                if (err) return res.status(406).json({ message: 'register failed' });
                return res.status(200).json({
                    message: 'registered successfully',
                    token
                });
            });
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.brandLogin = (req, res) => {
    const { email, password } = req.body;
    const secret = req.app.get('jwt-secret');
    const encrypted = crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64');
    // console.log(encrypted);
    conn.query(
        'SELECT * from Brand WHERE email=? and password=?',
        [email, encrypted],
        (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({ message: 'login failed' });
            } else {
                jwt.sign(
                    {
                        _id: result[0].id,
                        email: result[0].email,
                    },
                    secret,
                    {
                        expiresIn: '100d',
                        issuer: 'rebay_admin',
                        subject: 'brandInfo'
                    }, (err, token) => {
                        if (err) return res.status(406).json({ message: 'register failed' });
                        return res.status(200).json({
                            message: 'logged in successfully',
                            token
                        });
                    });
            }
        }
    )
}

exports.login = (req, res) => {
    const { phone, password, fcm_token } = req.body;
    // console.log(email,password,config.secret);
    const secret = req.app.get('jwt-secret');
    const encrypted = crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64');
    // console.log(encrypted);
    conn.query(
        'SELECT * from User WHERE phone=? and password=?',
        [phone, encrypted],
        (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({ message: 'login failed'});
            } else {
                jwt.sign(
                    {
                        _id: result[0].id,
                        email: result[0].email
                    },
                    secret,
                    {
                        expiresIn: '100d',
                        issuer: 'rebay_admin',
                        subject: 'userInfo'
                    }, async(err, token) => {
                        if (err) return res.status(406).json({ message:'login failed' });
                        // await query.renewFcmtoken(result[0].id, fcm_token);
                        return res.status(200).json({
                            message: 'logged in successfully',
                            token
                        });
                    });
            }
        }
    )
};

exports.getUserToken = (req, res) => {

    const secret = req.app.get('jwt-secret');
    jwt.sign(
        {
            _id: 23,
            email: "best@gmail.com"
        },
        secret,
        {
            expiresIn: '100d',
            issuer: 'rebay_admin',
            subject: 'userInfo'
        }, async (err, token) => {
            if (err) return res.status(406).json({ message: 'login failed' });
            // await query.renewFcmtoken(result[0].id, fcm_token);
            return res.status(200).json({
                message: 'logged in successfully',
                token
            });
        });
}

exports.getBrandToken = (req, res) => {

    const secret = req.app.get('jwt-secret');
    jwt.sign(
        {
            _id: 109,
            email: "julian@gmail.com"
        },
        secret,
        {
            expiresIn: '100d',
            issuer: 'rebay_admin',
            subject: 'brandInfo'
        }, async (err, token) => {
            if (err) return res.status(406).json({ message: 'login failed' });
            // await query.renewFcmtoken(result[0].id, fcm_token);
            return res.status(200).json({
                message: 'logged in successfully',
                token
            });
        });
}


exports.getVerificationSMS = async (req, res) => {
    let random_verify = Math.floor(1000 + Math.random() * 9000);
    random_verify = random_verify.toString();
    // try {
        await query.sms.sendVerificationSMS(req.query.phone, random_verify);
        await res.status(200).json({
            verification_code: random_verify
        })
   // } catch (err) {
   //      return res.status(400).json({
   //          err
   //      })
    //}
}

exports.checkNicknameOverlap = async (req, res) => {
    const {nickname} = req.body;
    try {
        const result = await query.personal.getPersonalByNickname(nickname);
        const overlap = (result !== undefined);
        return res.status(200).json({
            overlap
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.checkPhoneNumberOverlap = async (req, res) => {
    const {phonenumber} = req.body;
    try {
        const result = await query.user.getUserByPhone(phonenumber);
        const overlap = (result !== undefined);
        return res.status(200).json({
            brand_name_overlap: overlap
        })
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.checkBrandNameOverlap = async (req, res) => {
    // const { brand_name } = req.body;
    try {
        const result = await query.brand.getBrandByName(req.query.name);
        if (result === undefined) {
            return res.status(200).json({
                brand_name_overlap: false
            })
        } else {
            return res.status(200).json({
                brand_name_overlap: true
            })
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.checkBrandEmailOverlap = async (req, res) => {
    // const { brand_email } = req.body;
    try {
        const result = await query.brand.getBrandByEmail(req.query.email);
        if (result === undefined) {
            return res.status(200).json({
                brand_email_overlap: false
            })
        } else {
            return res.status(200).json({
                brand_email_overlap: true
            })
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}