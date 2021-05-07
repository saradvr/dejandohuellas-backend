const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async register(req, res) {
    try {
      const { email, password, name, userType } = req.body;
      const mail = email.toLowerCase();
      const user = await User.create({ email: mail, password, name });
      if (userType === 'ONG') {
        console.log('Es ONG');
        console.log(user)
      } else if (userType === 'Persona') {
        console.log('Es usuario');
      } else {
        throw new Error('Tipo de usuario incorrecto');
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
      res
        .status(400)
        .json({
          message: 'No pudo crearse el usuario, intente nuevamente',
          error,
        });
    }
  },
};
