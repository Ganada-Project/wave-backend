const router = require('express').Router();
const controller = require('./test.controller');

router.post('/image', controller.uploadImage);

module.exports = router;
