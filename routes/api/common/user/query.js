const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);

// const FCM = require('fcm-node');
// const serverKey = 'AAAAyS0H1u0:APA91bFX9VjAXOe6hGbGu7CvRQg_qRZzFdOjwY_qper2qVxpiY6P-LEb5KLk_Rh96r0N9iD_NVm6yAwxzIqUZ702_wDQ2RZiNzBS9XdD3Ckf1L_bPxXHERiFmeT58g4REHGPZmT0If8G'; //put your server key here
// const fcm = new FCM(serverKey);
// const crypto = require('crypto');
// const https = require("https");

exports.getUserByPhone = (phone) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM User WHERE phone = '${phone}'`, (err, result) => {
            if (err){
                conn.rollback();
                reject(err);
            }
            else {
                resolve(result[0]);
            }
        });
    });
}

exports.createUser = (conn, phone, password, name, age, gender) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO User(phone, password, name, age, gender) VALUES(?,?,?,?,?)',
            [phone, password, name, age, gender],
            (err, result) => {
                if (err){
                    conn.rollback();
                    reject(err);
                }
                else resolve(result);
            });
    });
}

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User Where id = ?',
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
    });
}



