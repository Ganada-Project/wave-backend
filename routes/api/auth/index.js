const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/register', controller.register);
router.post('/register/brand', controller.register_brand);
router.get('/check/brand/name', controller.checkBrandNameOverlap);
router.get('/check/brand/email', controller.checkBrandEmailOverlap);
router.get('/check/user/phone', controller.checkPhoneNumberOverlap);
router.get('/phone', controller.getVerificationSMS);
router.post('/check/nickname', controller.checkNicknameOverlap);
router.post('/login/brand', controller.brandLogin);
router.post('/login/user', controller.login);
module.exports = router;
