const router = require('express').Router();
const { register } = require('../controllers/user.controllers');

router.route('/register').post(register);

module.exports = router;
