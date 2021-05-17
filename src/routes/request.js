const { create } = require('../controllers/request.controller');
const { auth } = require('../utils/auth');

const router = require('express').Router();

router.route('/create').post(auth, create);

module.exports = router;
