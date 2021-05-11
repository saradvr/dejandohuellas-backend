const {
  create,
  getAnimal,
  update,
  deleteAnimal,
} = require('../controllers/animal.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

const router = require('express').Router();

router.route('/new').post(auth, formData, create);
router.route('/:animalId').get(getAnimal);
router.route('/:animalId/update').put(auth, formData, update);
router.route('/delete').delete(auth, deleteAnimal);

module.exports = router;
