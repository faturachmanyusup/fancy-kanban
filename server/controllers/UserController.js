const { validatePassword } = require('../helpers/bcrypt');
const { encode } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
  static async register(req, res, next) {
    try {
      const checkEmail = await User.findOne({where: {email: req.body.email}});
      if (checkEmail) {
        throw {
          name: 'bad request',
          statusCode: 400,
          message: `${req.body.email} already registered.`
        };
      } else {
        let newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        }
        newUser = await User.create(newUser);
        return res.status(201).json(newUser);
      }
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({where: {email: req.body.email}});
      if (!user) {
        throw {
          name: 'not found',
          statusCode: 404,
          message: `Email "${req.body.email}" not registered. Please register first`
        }
      } else {
        if (validatePassword(req.body.password, user.password)) {
          const token = encode({
            id: user.id,
            name: user.name,
            email: user.email
          });
          return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            access_token: token
          });
        } else {
          throw {
            name: 'bad request',
            statusCode: 400,
            message: 'password incorrect'
          }
        }
      }
    } catch (e) {
      next(e);
    }
  }
}


module.exports = UserController;