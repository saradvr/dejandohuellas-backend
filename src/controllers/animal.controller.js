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
      let animal = await Animal.create(body);
      animal = await animal
        .populate({
          path: 'ong',
          select: 'user -_id',
          populate: {
            path: 'user',
            select: 'name',
          },
        })
        .execPopulate();
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
        select: 'user',
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
      if (animal.ong.toString() === userTypeId.toString()) {
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
  async deleteAnimal(req, res) {
    try {
      const {
        body: { animalId },
        user: { userTypeId },
      } = req;
      let animal = await Animal.findById(animalId);
      if (animal.ong.toString() === userTypeId.toString()) {
        const ong = await Ong.findByIdAndUpdate(
          userTypeId,
          { $pull: { animals: animalId } },
          { new: true }
        ).populate('animals');
        animal = await Animal.findByIdAndDelete(animalId);
        res
          .status(200)
          .json({ message: 'El peludo se eliminó correctamente', animal, ong });
      } else {
        throw new Error(
          'No tiene autorización para modificar esta información'
        );
      }
    } catch (error) {
      res.status(400).json({
        message: 'Algo salió mal, intenta borrarlo nuevamente',
        error,
      });
    }
  },
};
