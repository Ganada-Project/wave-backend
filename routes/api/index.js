const router = require('express').Router();

const style = require('./style');
const test = require('./test');
const user = require('./user');
const auth = require('./auth');
const authMiddleware = require('../../middlewares/auth');

router.use('/auth', auth);

// router.use('/user', authMiddleware);
router.use('/user', user);

//router.use('/style', authMiddleware);
router.use('/style', style);
router.use('/test', test);

module.exports = router;
