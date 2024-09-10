const { Router } = require("express");

const {getAllOrganizations,getOrganizationById,createOrganization,updateOrganization,deleteOrganization} = require("../Controllers/organizationController.js");

const organizationRouter = Router();

// Organization Routes (Protected)
organizationRouter.get('/organizations', roleMiddleware('admin'), getAllOrganizations);
organizationRouter.get('/organizations/:id', roleMiddleware('admin'), getOrganizationById);
organizationRouter.post('/organizations',validate(organizationSchema),roleMiddleware('admin'), createOrganization);
organizationRouter.put('/organizations/:id', roleMiddleware('admin'), updateOrganization);
organizationRouter.delete('/organizations/:id', roleMiddleware('admin'), deleteOrganization);
