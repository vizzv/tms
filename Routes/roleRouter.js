const { Router } = require("express");

const roleRouter = Router();

// Role CRUD Routes (Protected)
roleRouter.get('/roles', roleMiddleware('admin'), roleController.getAllRoles);
roleRouter.get('/roles/:id', roleMiddleware('admin'), roleController.getRoleById);
roleRouter.post('/roles',validate(roleSchema),roleMiddleware('admin'), roleController.createRole);
roleRouter.put('/roles/:id', roleMiddleware('admin'), roleController.updateRole);
roleRouter.delete('/roles/:id', roleMiddleware('admin'), roleController.deleteRole);