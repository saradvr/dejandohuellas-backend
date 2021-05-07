const { model, models, Schema } = require('mongoose');

const ongSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    photo: {
      type: String,
    },
    animals: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Animal',
        },
      ],
    },
    requests: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Request',
        },
      ],
    },
    transactions: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Transaction',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Ong = model('Ong', ongSchema);

module.exports = Ong;
