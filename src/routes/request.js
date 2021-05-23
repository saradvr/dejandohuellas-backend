const {
  create,
  update,
  list,
  deleteRequest,
  getRequest,
} = require('../controllers/request.controller');
const { auth } = require('../utils/auth');

const router = require('express').Router();

router.route('/create').post(auth, create);
router.route('/update').put(auth, update);
router.route('/list').get(auth, list);
router.route('/delete').delete(auth, deleteRequest);
router.route('/:requestId').get(auth, getRequest);

module.exports = router;
