const Ong = require('../models/ong.model');

module.exports = {
  async getOng(req, res) {
    try {
      const {
        user: { userTypeId },
      } = req;
      const ong = await Ong.findById(userTypeId).populate('animals');
      res.status(200).json({ message: 'Fundación cargada con éxito', ong });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'No pudo cargarse la información', error });
    }
  },
};
