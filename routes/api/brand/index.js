const router = require('express').Router();
const controller = require('./brand.controller');

router.get('/recommend', controller.recommendBrandByStyle);
router.get('/recommend/register', controller.recommendBrandByStyle);

module.exports = router;