'use strict';

const { hashPassword } = require('../helpers/bcrypt');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'please enter your name'},
        notEmpty: {msg: 'please enter your name'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'please enter your email'},
        notEmpty: {msg: 'please enter your email'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'please enter your password'},
        notEmpty: {msg: 'please enter your password'}
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.organization = 'hacktiv8';
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};