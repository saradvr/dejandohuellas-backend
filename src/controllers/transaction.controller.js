const Transaction = require('../models/transaction.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      let transaction = await Transaction.findOne({ refPago: body.refPago });
      if (!transaction) {
        transaction = await Transaction.create(body);
      }
      res
        .status(200)
        .json({ message: 'Transacción guardada con éxito.', transaction });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'No se pudo guardar la transacción.', error });
    }
  },
  async list(req, res) {
    try {
      const {
        query: { status },
        user: { userTypeId },
      } = req;
      let filters = {
        ong: userTypeId,
      };
      if (!!status) {
        filters.status = status;
      }
      const transactions = await Transaction.find(filters);
      res
        .status(200)
        .json({ message: 'Transacción guardada con éxito.', transactions });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'No se pudo guardar la transacción.', error });
    }
  },
};
