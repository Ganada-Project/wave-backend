const router = require('express').Router();

const style = require('./style');
const test = require('./test');
const user = require('./user');
const item = require('./item');
const auth = require('./auth');
const category = require('./category');
const feature = require('./feature');
const authMiddleware = require('../../middlewares/auth');

router.use('/auth', auth);

router.use('/user', authMiddleware);
router.use('/user', user);

//router.use('/style', authMiddleware);
router.use('/style', style);



router.use('/test', test);
router.use('/category', category);

router.use('/item', authMiddleware);
router.use('/item', item);
router.use('/feature', feature);

module.exports = router;
