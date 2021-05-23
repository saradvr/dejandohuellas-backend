const { getOng, getPublicOng } = require('../controllers/ong.controller');
const { auth } = require('../utils/auth');
const router = require('express').Router();

router.route('/').get(auth, getOng);
router.route('/:ongId').get(getPublicOng);

module.exports = router;
