const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const { authentication, authorization } = require('../middlewares/auth');


router.use(authentication);
router.get('/:id', authorization, TaskController.findOne);
router.get('/', TaskController.findAll);
router.post('/', TaskController.add);
router.patch('/:id', authorization, TaskController.update);
router.delete('/:id', authorization, TaskController.delete);


module.exports = router;