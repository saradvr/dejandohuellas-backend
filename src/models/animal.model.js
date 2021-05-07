const { model, models, Schema } = require('mongoose');

const animalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ong: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    typeAnimal: {
      type: String,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
    },
    history: {
      type: String,
    },
    size: {
      type: String,
    },
    photos: {
      type: [{ type: String }],
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
  },
  {
    timestamps: true,
  }
);

const Animal = model('Animal', animalSchema);

module.exports = Animal;
