const mysql = require('mysql');
const config = require('../../../../config');
// const conn = mysql.createConnection(config);

// const FCM = require('fcm-node');
// const serverKey = 'AAAAyS0H1u0:APA91bFX9VjAXOe6hGbGu7CvRQg_qRZzFdOjwY_qper2qVxpiY6P-LEb5KLk_Rh96r0N9iD_NVm6yAwxzIqUZ702_wDQ2RZiNzBS9XdD3Ckf1L_bPxXHERiFmeT58g4REHGPZmT0If8G'; //put your server key here
// const fcm = new FCM(serverKey);
// const crypto = require('crypto');
// const https = require("https");


exports.getElasticity = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Elasticity',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

// 안감
exports.getLining = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Lining',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.getOpacity = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Opacity',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}
exports.getQuality = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Quality',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}
exports.getTexture = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Texture',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}
exports.getThickness = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Feature_Thickness',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}
exports.getSeason = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Season',
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.createFeature = (conn, elasticity, quality, thickness, texture, lining, opacity) => {
    return new Promise((resolve, reject) => {
        
        conn.query('INSERT INTO Feature(quality_id,thickness_id,elasticity_id,texture_id,lining_id,opacity_id) VALUES(?,?,?,?,?,?)',
            [quality,thickness,elasticity,texture,lining,opacity],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result)
            });
    });
}

exports.createQualityArray = (conn, quality) => {
    return new Promise((resolve, reject) => {
        let quality_arr = "";
        for (let i = 0; i < quality.length; i++) {
            quality_arr += quality[i] + "/";
        }
        conn.query(
            "INSERT INTO Feature_Quality(quality_arr) VALUES(?)",
            [quality_arr],
            (err, result) => {
                if (err) {
                    conn.rollback();
                    reject(err);
                }
                else resolve(result);
            }
        )
    });
}