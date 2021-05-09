const { model, Schema } = require('mongoose');

const personSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    phone: {
      type: Number,
    },
    city: {
      type: String,
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

const Person = model('Person', personSchema);

module.exports = Person;
