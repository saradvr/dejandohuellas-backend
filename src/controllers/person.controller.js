const Person = require('../models/person.model');

module.exports = {
  async getPerson(req, res){
    try {
      const { user: {userTypeId} } = req;
      const person = await Person.findById(userTypeId).populate('user');
      res.status(200).json({ message: 'Datos cargados con éxito.', person});
    } catch (error) {
      res.status(400).json({ message: 'Error al cargar datos del usuario.', error});
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        user: { userTypeId },
      } = req;
      const person = await Person.findByIdAndUpdate(userTypeId, body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: 'Datos actualizados con éxito.', person });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Error al actualizar los datos.', error });
    }
  },
};
