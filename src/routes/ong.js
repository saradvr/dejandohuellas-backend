const { getOng } = require('../controllers/ong.controller');
const { auth } = require('../utils/auth');
const router = require('express').Router();

router.route('/').get(auth, getOng);

module.exports = router;
