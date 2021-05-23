const Ong = require('../models/ong.model');
const Person = require('../models/person.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      if (Object.keys(body).length === 0) {
        throw new Error('Cancelada');
      }
      let transaction = await Transaction.findOne({ refPago: body.refPago });
      if (!transaction) {
        transaction = await Transaction.create(body);
        await Ong.findByIdAndUpdate(
          transaction.ong,
          { $push: { transactions: transaction._id } },
          { new: true }
        );
        const user = await User.findOne({ email: transaction.email }).populate(
          'personId'
        );
        if (!!user) {
          await Person.findByIdAndUpdate(user.personId, {
            $push: { transactions: transaction._id },
          });
        }
      }
      res
        .status(200)
        .json({ message: 'Transacción guardada con éxito.', transaction });
    } catch (error) {
      res.status(400).json({ message: error.message });
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
