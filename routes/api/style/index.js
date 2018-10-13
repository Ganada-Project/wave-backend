const router = require('express').Router();
const controller = require('./style.controller');

router.get('', controller.getAllStyles);
router.get('/:style_id', controller.getStyleById);


module.exports = router;
