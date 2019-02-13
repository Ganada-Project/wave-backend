const router = require('express').Router();
const controller = require('./brand.controller');

router.get('/recommend', controller.recommendBrandByStyle);

module.exports = router;