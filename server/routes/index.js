const router = require('express').Router();
const taskRouter = require('./taskRoutes');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.googleLogin);

router.use('/tasks', taskRouter);

module.exports = router;