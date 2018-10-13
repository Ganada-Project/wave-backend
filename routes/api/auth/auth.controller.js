const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mysql = require('mysql');
const config = require('../../../config');
const conn = mysql.createConnection(config);
const query = require('../common/query');

exports.register = async (req, res) => {
    try{
        const secret = req.app.get('jwt-secret');
        //get data
        const { sex, email, nickname, name, phone, password, styles, height, weight, waist} = req.body;

        //hash password
        const encrypted = crypto.createHmac('sha1', config.secret)
            .update(password)
            .digest('base64');

        //email overlap check
        const user = await query.getUserByEmail(email);
        if(user != undefined){
            return res.status(406).json({
                message: 'user email already exists'
            })
        }

        //create user
        const createUser = await query.createUser(email, encrypted);
        const userId = createUser.insertId;

        //create personal
        const createPersonal = await query.createPersonal(userId, sex, name, nickname, phone);

        //create body
        const createBody = await query.createBody(userId, height, weight, waist);

        //create styles
        for(style of styles){
            const createStyle = await query.createStyle(userId, style);
        }
        jwt.sign(
            {
                _id: userId,
                email: email
            },
            secret,
            {
                expiresIn: '7d',
                issuer: 'rebay_admin',
                subject: 'userInfo'
            }, (err, token) => {
                if (err) return res.status(406).json({ message:'register failed' });
                return res.status(200).json({
                    message: 'registered successfully',
                    token
                });
            });
    }
    catch (err) {
        return res.status(400).json(err);
    }

    // conn.query('SELECT * from Users WHERE email=?',[email], (err, rows) => {
    //     if (err) throw err;
    //     if (rows.length == 0) {
    //         conn.query(
    //             'INSERT INTO Users(username, password, email, phone, fcm_token) VALUES (?, ?, ?, ?, ?)',
    //             [username, encrypted, email, phone, fcm_token],
    //             (err, result) => {
    //                 if (err) throw err;
    //                 console.log(result);
    //                 jwt.sign(
    //                     {
    //                         _id: result.insertId,
    //                         email: email
    //                     },
    //                     secret,
    //                     {
    //                         expiresIn: '7d',
    //                         issuer: 'rebay_admin',
    //                         subject: 'userInfo'
    //                     }, (err, token) => {
    //                         if (err) return res.status(406).json({ message:'register failed' });
    //                         return res.status(200).json({
    //                             message: 'registered successfully',
    //                             token
    //                         });
    //                     });
    //             });
    //     } else {
    //         return res.status(406).json({
    //             message: 'user email exists'
    //         })
    //     }
    // });
};

// exports.login = (req, res) => {
//     const { email, password, fcm_token } = req.body;
//     // console.log(email,password,config.secret);
//     const secret = req.app.get('jwt-secret');
//     const encrypted = crypto.createHmac('sha1', config.secret)
//         .update(password)
//         .digest('base64');
//     // console.log(encrypted);
//     conn.query(
//         'SELECT * from Users WHERE email=? and password=?',
//         [email, encrypted],
//         (err, result) => {
//             if (err) throw err;
//             if (result.length == 0) {
//                 return res.status(404).json({ message: 'login failed'});
//             } else {
//                 jwt.sign(
//                     {
//                         _id: result[0].id,
//                         email: result[0].email
//                     },
//                     secret,
//                     {
//                         expiresIn: '7d',
//                         issuer: 'rebay_admin',
//                         subject: 'userInfo'
//                     }, async(err, token) => {
//                         if (err) return res.status(406).json({ message:'login failed' });
//                         await query.renewFcmtoken(result[0].id, fcm_token);
//                         return res.status(200).json({
//                             message: 'logged in successfully',
//                             token
//                         });
//                     });
//             }
//         }
//     )
// };

exports.phone_number = async (req, res) => {
    let random_verify = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
    random_verify = random_verify.toString();
    try {
        await query.sendTextMessage(req.query.phone_number, random_verify);
        await res.status(200).json({
            verification_code: random_verify
        })
    } catch (err) {
        return res.status(406).json({
            err
        })
    }
}
