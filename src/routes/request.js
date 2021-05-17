const { create, update } = require('../controllers/request.controller');
const { auth } = require('../utils/auth');

const router = require('express').Router();

router.route('/create').post(auth, create);
router.route('/update').put(auth, update);

module.exports = router;
