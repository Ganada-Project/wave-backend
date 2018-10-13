const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/register', controller.register);
router.get('/phone', controller.getVerificationSMS);

module.exports = router;
