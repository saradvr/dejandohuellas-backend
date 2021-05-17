const { model, models, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, 'El correo no es válido'],
      validate: {
        async validator(email) {
          try {
            const user = await models.User.findOne({ email });
            return !user;
          } catch (error) {
            return false;
          }
        },
        message: 'El correo ya está en uso.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    ongId: {
      type: Schema.Types.ObjectId,
      ref: 'Ong',
    },
    personId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = model('User', userSchema);

module.exports = User;
