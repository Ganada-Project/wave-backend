const router = require('express').Router();
const controller = require('./feature.controller');

router.get('', controller.getAllFeatures);
router.get('/quality', controller.getAllQualities);

module.exports = router;

