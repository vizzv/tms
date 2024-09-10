const { Route } = require("express");
const {getAllTasks,createTask,getTaskById,updateTask,deleteTask} = require("../Controllers/taskController");

const taskRouter = Route();

// Task Routes (Protected)
taskRouter.get('/tasks', getAllTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks',validate(taskSchema),createTask);
taskRouter.put('/tasks/:id', updateTask);
taskRouter.delete('/tasks/:id', deleteTask);