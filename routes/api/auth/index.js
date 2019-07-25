const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/register', controller.register);
router.get('/check/phone', controller.checkPhoneNumberOverlap);
router.post('/login', controller.login);

module.exports = router;
