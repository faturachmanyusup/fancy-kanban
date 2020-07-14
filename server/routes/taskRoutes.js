const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const { authentication, authorization } = require('../middlewares/auth');


router.use(authentication);
router.get('/find', authorization, TaskController.findOne);
router.get('/', TaskController.findAll);
router.post('/', TaskController.add);
router.patch('/', authorization, TaskController.update);
router.delete('/', authorization, TaskController.delete);


module.exports = router;