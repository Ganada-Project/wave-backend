const router = require('express').Router();
const controller = require('./brand.controller');

router.post('/recommend', controller.recommendBrandByStyle);

module.exports = router;