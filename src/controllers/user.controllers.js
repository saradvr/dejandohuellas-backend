const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Ong = require('../models/ong.model');
const Person = require('../models/person.model');

module.exports = {
  async register(req, res) {
    try {
      const { email, password, name, userType } = req.body;
      const mail = email.toLowerCase();
      const user = await User.create({ email: mail, password, name });
      if (userType === 'ONG') {
        const ong = await Ong.create({ user: user._id });
        user.ongId = ong._id;
        await user.save({ validateBeforeSave: false });
      } else if (userType === 'Persona') {
        const person = await Person.create({ user: user._id });
        user.personId = person._id;
        await user.save({ validateBeforeSave: false });
      } else {
        throw Error('Tipo de usuario incorrecto');
      }

      const token = jwt.sign(
        {
          userId: user._id,
          userType,
        },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );
      res
        .status(201)
        .json({ message: 'Usuario creado con éxito.', user, token });
    } catch (error) {
      res.status(400).json({
        message: 'No pudo crearse el usuario, intente nuevamente',
        error,
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw Error('Usuario o contraseña es incorrecto');
      }

      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        throw Error('Usuario o contraseña es incorrecto');
      }

      const userType = user.ongId ? 'ONG' : 'Persona';
      const token = jwt.sign(
        {
          userId: user._id,
          userType,
        },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({ token, userType, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
