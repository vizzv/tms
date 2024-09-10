
const organizationController = require('./controllers/organizationController');
const taskController = require('./controllers/taskController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');

const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { validate } = require('./Schemas/userSchema');
const { userSchema, roleSchema, organizationSchema, taskSchema, commentSchema } = require('./Schemas/validationSchema');




// Comment Routes (Protected)
router.get('/tasks/:taskId/comments', commentController.getAllCommentsForTask);
router.get('/comments/:id', commentController.getCommentById);
router.post('/comments',validate(commentSchema), commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
