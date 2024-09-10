const { Router } = require("express");

const userRouter = Router();

// User Authentication Routes
userRouter.post('/login', userController.login);
userRouter.post('/signup',validate(userSchema),userController.signup);

// User CRUD Routes (Protected)
userRouter.use(authMiddleware); // Protect all routes after this line
userRouter.get('/users', roleMiddleware('admin'), userController.getAllUsers);
userRouter.get('/users/:id', roleMiddleware('admin'), userController.getUserById);
userRouter.post('/users',validate(userSchema),roleMiddleware('admin'), userController.createUser);
userRouter.put('/users/:id', roleMiddleware('admin'), userController.updateUser);
userRouter.delete('/users/:id', roleMiddleware('admin'), userController.deleteUser);