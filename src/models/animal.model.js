const { model, Schema } = require('mongoose');

const animalSchema = new Schema(
  {
    ong: {
      type: Schema.Types.ObjectId,
      ref: 'Ong',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    animalType: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [1, 'La edad debe ser mayor a 0.'],
    },
    sex: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: {
        values: ['Pequeño', 'Mediano', 'Grande'],
        message: 'Tamaño inválido',
      },
    },
    profilePicture: {
      type: String,
      required: true,
    },
    photos: {
      type: [{ type: String }],
    },
    city: {
      type: String,
      required: true,
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
