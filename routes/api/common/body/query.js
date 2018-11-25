const mysql = require('mysql');
const config = require('../../../../config');
const conn = mysql.createConnection(config);
global.XMLHttpRequest = require("xhr2");
require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');
const { Image, createCanvas } = require('canvas');
const posenet = require('@tensorflow-models/posenet');

exports.createBody = (userId, height, weight, waist) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Body(user_id, height, weight, waist) VALUES(?,?,?,?)',
            [userId, height, weight, waist],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}

exports.getBodyByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Body WHERE user_id = ?',
            [userId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result[0])
            });
    });
}

exports.saveBodyImage = (imgURL, bodyId) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO BodyImage(img_url, body_id) VALUES(?,?)',
            [imgURL, bodyId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}
exports.estimateBodyPoints = async(url) => {
    return new Promise(async(resolve, reject) => {
        let img_path = url;
        let buffer = await fetch(img_path).then(res => res.buffer());
        let img = new Image();
        img.src = buffer;
        const canvas = createCanvas(img.width, img.height);
        canvas.getContext('2d').drawImage(img, 0, 0);

        const imageScaleFactor = 0.5;
        const flipHorizontal = false;
        const outputStride = 8;
        const multiplier = 0.5;

        const net = await posenet.load(multiplier);
        const pose = await net.estimateSinglePose(canvas, imageScaleFactor, flipHorizontal, outputStride);
        console.log(pose);
        resolve(pose);
    });
}

exports.patchBodyByuserId = (userId, height, weight, waist) => {
    return new Promise((resolve, reject) => {
        conn.query('Update Body SET height=?,weight=?,waist=? WHERE user_id=?',
            [height, weight, waist,userId],
            (err, result) => {
                if (err) reject(err);
                else resolve(result)
            });
    });
}