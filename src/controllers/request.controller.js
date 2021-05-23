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
  async update(req, res) {
    try {
      const {
        body: { status, _id },
      } = req;
      const request = await Request.findByIdAndUpdate(
        _id,
        { status: status },
        { new: true }
      ).populate('animal')
        .populate({
          path: 'person',
          select: 'phone city user -_id',
          populate: {
            path: 'user',
            select: 'name email -_id',
          },
        });
      res
        .status(200)
        .json({ message: 'Solicitud actualizada con éxito.', request });
    } catch (error) {
      res.status(400).json({
        message:
          'No se pudo guardar la solicitud, por favor intente nuevamente.',
        error,
      });
    }
  },
  async list(req, res) {
    try {
      const {
        query: { filterStatus, filterAnimalId, filterAnimalType },
        user: { userTypeId },
      } = req;
      let filters = {
        ong: userTypeId,
      };
      if (!!filterStatus && filterStatus !== '') {
        filters.status = filterStatus;
      }
      if (!!filterAnimalId && filterAnimalId !== '') {
        filters.animal = filterAnimalId;
      }
      let animals = {};
      if (!!filterAnimalType && filterAnimalType !== '') {
        animals = await Animal.find({ animalType: filterAnimalType });
        filters.animal = { $in: animals };
      }

      const requests = await Request.find(filters)
        .select('animal ong person status')
        .populate({
          path: 'animal',
          select: 'name profilePicture -_id',
        });
      res
        .status(200)
        .json({ message: 'Solicitudes cargadas con éxito.', requests });
    } catch (error) {
      res.status(400).json({
        message: 'Error al cargar solicitudes, intente de nuevo.',
        error,
      });
    }
  },
  async deleteRequest(req, res) {
    try {
      const {
        body: { requestId },
        user: { userTypeId },
      } = req;
      let request = await Request.findById(requestId);
      if (userTypeId.toString() === request.ong.toString()) {
        request = await Request.findByIdAndDelete(requestId).populate('animal')
          .populate({
            path: 'person',
            select: 'phone city user -_id',
            populate: {
              path: 'user',
              select: 'name email -_id',
            },
          });
        const ong = await Ong.findByIdAndUpdate(
          userTypeId,
          { $pull: { requests: requestId } },
          { new: true }
        );
        const person = await Person.findByIdAndUpdate(
          request.person,
          { $pull: { requests: requestId } },
          { new: true }
        );
        const animal = await Animal.findByIdAndUpdate(
          request.animal,
          { $pull: { requests: requestId } },
          { new: true }
        );
        res.status(200).json({
          message: 'Solicitud eliminada con éxito',
          request,
          ong,
          person,
          animal,
        });
      } else {
        throw new Error('No tiene permiso para eliminar esta solicitud.');
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Hubo un error al eliminar la solicitud.', error });
    }
  },
  async getRequest(req, res) {
    try {
      const {
        params: { requestId },
      } = req;
      const request = await Request.findById(requestId)
        .populate('animal')
        .populate({
          path: 'person',
          select: 'phone city user -_id',
          populate: {
            path: 'user',
            select: 'name email -_id',
          },
        });
      res
        .status(200)
        .json({ message: 'Solicitud cargada con éxito.', request });
    } catch (error) {
      res.status(400).json({ message: 'Error al cargar la solicitud.', error });
    }
  },
};
