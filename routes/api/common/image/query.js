const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();
const crypto = require('crypto');

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
            else resolve(picUrl);
        });
    })
}