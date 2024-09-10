// validationSchemas.js
const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    organizationId: Joi.string() // If relevant for the request
});

const roleSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().optional()
});

const organizationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().optional()
});

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
    assignedTo: Joi.string().required(),
    organizationId: Joi.string().required()
});

const commentSchema = Joi.object({
    content: Joi.string().min(1).required(),
    taskId: Joi.string().required(),
    userId: Joi.string().required()
});

module.exports = {
    userSchema,
    roleSchema,
    organizationSchema,
    taskSchema,
    commentSchema
};
