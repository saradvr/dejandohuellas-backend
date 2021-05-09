const Animal = require('../models/animal.model');
const Ong = require('../models/ong.model');

module.exports = {
  async create(req, res) {
    try {
      const {
        body,
        user: { userTypeId },
      } = req;
      body.ong = userTypeId;
      const animal = await Animal.create(body);
      const ong = await Ong.findByIdAndUpdate(
        userTypeId,
        { $push: { animals: animal._id } },
        { new: true }
      );
      res.status(201).json({ message: 'Peludo creado con éxito', animal, ong });
    } catch (error) {
      res.status(400).json({ message: 'No pudo crearse el peludo', error });
    }
  },
};
