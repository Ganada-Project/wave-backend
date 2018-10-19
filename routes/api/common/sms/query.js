const https = require("https");
const config = require('../../../../config');

exports.sendVerificationSMS = (phone_num, verification_code) => {
    let credential = 'Basic ' + new Buffer(config.APPID + ':' + config.APIKEY).toString('base64');
    let data = {
        "sender": config.SENDER,
        "receivers": [`${phone_num}`],
        "content": `WAVE 인증번호는 [${verification_code}] 입니다.`
    }
    let body = JSON.stringify(data);

    let options = {
        host: 'api.bluehouselab.com',
        port: 443,
        path: '/smscenter/v1.0/sendsms',
        headers: {
            'Authorization': credential,
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(body)
        },
        method: 'POST'
    };
    let req = https.request(options, function (res) {
        let body = "";
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function (d) {
            if (res.statusCode == 200)
                console.log(JSON.parse(body));
            else
                console.log(body);
        });
    });
    req.write(body);
    req.end();
    req.on('error', function (e) {
        reject(e);
    });
}