const { decode } = require('../helpers/jwt');
const { Task, User } = require('../models');

module.exports = {
  async authentication(req, _, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) {
        throw {
          name: 'bad request',
          statusCode: 400,
          message: 'token needed'
        }
      } else {
        req.userData = decode(access_token);
        req.userData = await User.findOne({where: {email: req.userData.email}});
        if (req.userData) {
          next();
        } else {
          throw {
            name: 'bad request',
            statusCode: 400,
            message: 'incorrect token'
          };
        }        
      }
    } catch (error) {
      next(error);
    }
  },
  async authorization(req, _, next) {
    try {
      req.task = await Task.findOne({where: {id: req.body.id}});
      if (!req.task) {
        throw {
          name: 'not found',
          statusCode: 404,
          message: `task with id ${req.body.id} not found`
        }
      } else {
        if (req.task.UserId === req.userData.id) {
          next();
        } else {
          throw {
            name: 'not authorized',
            statusCode: 401,
            message: 'not authorized'
          };
        }
      }
    } catch (error) {
      next(error);
    }
  }
}