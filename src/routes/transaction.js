const { create, list } = require('../controllers/transaction.controller');
const { auth } = require('../utils/auth');
const router = require('express').Router();

router.route('/create').post(create);
router.route('/get').get(auth, list);

module.exports = router;
