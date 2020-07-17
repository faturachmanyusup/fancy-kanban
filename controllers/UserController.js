const { validatePassword } = require('../helpers/bcrypt');
const { encode } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTID);

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
          const access_token = encode({
            id: user.id,
            name: user.name,
            email: user.email,
            organization: user.organization
          });
          return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            access_token: access_token
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

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.googletoken,
        audience: process.env.CLIENTID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const user = await User.findOne({where: {email: payload.email}});
      if (user) {
        const access_token = encode({
          id: user.id,
          name: user.name,
          email: user.email,
          organization: user.organization
        })
        return res.status(200).json({
          id: user.id,
          email: user.email,
          access_token: access_token
        })
      } else {
        const newUser = await User.create({
          name: payload.name,
          email: payload.email,
          password: 'google'
        })
        const access_token = encode({
          id: user.id,
          name: user.name,
          email: user.email,
          organization: user.organization
        }, process.env.SECRET);
        return res.status(201).json({
          id: newUser.id,
          email: newUser.email,
          access_token: access_token
        });
      }
    } catch (e) {
      next(e);
    }
  }
}


module.exports = UserController;