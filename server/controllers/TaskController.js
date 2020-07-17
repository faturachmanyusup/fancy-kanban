const { Task, User } = require('../models');

class TaskController {
  static async findAll(req, res, next) {
    try {
      const tasks = await Task.findAll({ include: 'User' });
      // console.log(tasks[0].User.name);
      return res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  }

  static async add(req, res, next) {
    try {
      let newTask = {
        title: req.body.title,
        category: req.body.category,
        UserId: req.userData.id,
      }
      newTask = await Task.create(newTask);
      return res.status(201).json(newTask);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {
    try {
      return res.status(200).json(req.task);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const newData = {
        id: req.params.id,
        title: req.body.title,
        category: req.body.category,
        UserId: req.userData.id,
        updatedAt: new Date(),
      }
      await Task.update(newData, {where: {id: req.params.id}});
      return res.status(200).json(newData);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
      await Task.destroy({where: {id: req.params.id}});
      return res.status(200).json(req.task);
    } catch (e) {
      next(e);
    }
  }
}


module.exports = TaskController;