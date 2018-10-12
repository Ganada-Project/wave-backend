const mysql = require('mysql');
const config = require('../../../config');
const conn = mysql.createConnection(config);
const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();
const FCM = require('fcm-node');
const serverKey = 'AAAAyS0H1u0:APA91bFX9VjAXOe6hGbGu7CvRQg_qRZzFdOjwY_qper2qVxpiY6P-LEb5KLk_Rh96r0N9iD_NVm6yAwxzIqUZ702_wDQ2RZiNzBS9XdD3Ckf1L_bPxXHERiFmeT58g4REHGPZmT0If8G'; //put your server key here
const fcm = new FCM(serverKey);
const crypto = require('crypto');

exports.getStyleById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Styles WHERE id = ${id}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0])
        });
    });
}

exports.uploadImage = (base64) => {
    return new Promise((resolve, reject)=>{
        const d = new Date();
        d.setUTCHours(d.getUTCHours());
        const picKey = d.getFullYear() + '_'
            + d.getMonth() + '_'
            + d.getDate() + '_'
            + crypto.randomBytes(20).toString('hex') + '.jpg';
        const picUrl = `https://s3.ap-northeast-2.amazonaws.com/wave-bucket-seoul/${picKey}`;
        let buf = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        s3.putObject({
            Bucket: 'wave-bucket-seoul',
            Key: picKey,
            Body: buf,
            ACL: 'public-read'
        }, function (err, response) {
            if (err) reject(err);
            else resolve(response);
        });
    })
}