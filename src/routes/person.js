const { update, getPerson } = require('../controllers/person.controller');
const { auth } = require('../utils/auth');

const router = require('express').Router();

router.route('/get').get(auth, getPerson);
router.route('/update').put(auth, update);

module.exports = router;
