const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/register', controller.register);
router.post('/register/brand', controller.register_brand);
router.get('/phone', controller.getVerificationSMS);
router.post('/check/nickname', controller.checkNicknameOverlap);
module.exports = router;
