const router = require('express').Router();
const controller = require('./feature.controller');

router.get('', controller.getAllFeatures);

module.exports = router;

