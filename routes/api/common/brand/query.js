const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

// const FCM = require('fcm-node');
// const serverKey = 'AAAAyS0H1u0:APA91bFX9VjAXOe6hGbGu7CvRQg_qRZzFdOjwY_qper2qVxpiY6P-LEb5KLk_Rh96r0N9iD_NVm6yAwxzIqUZ702_wDQ2RZiNzBS9XdD3Ckf1L_bPxXHERiFmeT58g4REHGPZmT0If8G'; //put your server key here
// const fcm = new FCM(serverKey);
// const crypto = require('crypto');
// const https = require("https");

exports.checkDuplicateBrand = (email, brand_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM Brand WHERE email = ? or brand_name = ?",
            [email, brand_name],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        )
    })
}

exports.createBrand = (email, password, brand_name, business_number, phone, marketing, is_online_market, online_number) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Brand(email, password, brand_name, business_number, phone, marketing, is_online_market, online_number) VALUES(?,?,?,?,?,?,?,?)',
            [email, password, brand_name, business_number, phone, marketing, is_online_market, online_number],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.getBrandById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Brand Where id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result[0])
            });
    });
}



