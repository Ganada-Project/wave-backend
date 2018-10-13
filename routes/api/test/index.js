const router = require('express').Router();
const controller = require('./test.controller');

router.post('/image', controller.uploadImage);
router.get('/phone', controller.getVerificationSMS);

module.exports = router;

