const { create } = require('../controllers/animal.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

const router = require('express').Router();

router.route('/new').post(auth, formData, create);

module.exports = router;
