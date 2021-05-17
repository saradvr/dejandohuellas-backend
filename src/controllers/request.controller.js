const Ong = require('../models/ong.model');
const Person = require('../models/person.model');
const Request = require('../models/request.model');
const Animal = require('../models/animal.model');

module.exports = {
  async create(req, res) {
    try {
      const {
        body,
        user: { userTypeId },
      } = req;
      const request = await Request.create({ ...body, person: userTypeId });
      const person = await Person.findByIdAndUpdate(
        userTypeId,
        { $push: { requests: request._id } },
        { new: true }
      );
      const animal = await Animal.findByIdAndUpdate(
        request.animal,
        { $push: { requests: request._id } },
        { new: true }
      );
      const ong = await Ong.findByIdAndUpdate(
        request.ong,
        { $push: { requests: request._id } },
        { new: true }
      );

      res.status(201).json({
        message: 'Solicitud guardada con éxito.',
        request,
        person,
        ong,
        animal,
      });
    } catch (error) {
      res.status(400).json({
        message:
          'No se pudo guardar la solicitud, por favor intente nuevamente.',
        error,
      });
    }
  },
};
