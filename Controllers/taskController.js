const Task = require('../Schemas/taskSchema'); // Adjust path as needed
const User = require('../Schemas/userSchema'); // Adjust path as needed
const Organization = require('../Schemas/organisationSchema'); // Adjust path as needed

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo').populate('organization');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo').populate('organization');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, organization, status, dueDate } = req.body;

        const user = await User.findById(assignedTo);
        const org = await Organization.findById(organization);

        if (!user || !org) {
            return res.status(400).json({ message: 'Invalid user or organization' });
        }

        const task = new Task({
            title,
            description,
            assignedTo,
            organization,
            status,
            dueDate,
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
