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
      ).populate('animals');
      res.status(201).json({ message: 'Peludo creado con éxito', animal, ong });
    } catch (error) {
      res.status(400).json({ message: 'No pudo crearse el peludo', error });
    }
  },
  async getAnimal(req, res) {
    try {
      const {
        params: { animalId },
      } = req;
      const animal = await Animal.findById(animalId).populate({
        path: 'ong',
        select: 'user -_id',
        populate: {
          path: 'user',
          select: 'name',
        },
      });
      res.status(200).json({ message: 'Peludo cargado con éxito', animal });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'No se pudo cargar la información', error });
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        params: { animalId },
        user: { userTypeId },
      } = req;
      let animal = await Animal.findById(animalId);
      if (animal.ong == userTypeId) {
        animal = await Animal.findByIdAndUpdate(animalId, body, {
          new: true,
        }).populate({
          path: 'ong',
          select: 'user -_id',
          populate: {
            path: 'user',
            select: 'name',
          },
        });
      } else {
        throw new Error(
          'No tiene autorización para modificar esta información'
        );
      }
      res.status(200).json({ message: 'Datos actualizados con éxito', animal });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'No se pudo actualizar la información', error });
    }
  },
};
