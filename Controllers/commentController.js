const Comment = require('../Schemas/CommentSchema'); // Adjust path as needed
const Task = require('../Schemas/taskSchema'); // Adjust path as needed
const User = require('../Schemas/userSchema'); // Adjust path as needed

// Get all comments for a task
exports.getAllCommentsForTask = async (req, res) => {
    try {
        const comments = await Comment.find({ task: req.params.taskId }).populate('user');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new comment for a task
exports.createComment = async (req, res) => {
    try {
        const { taskId, userId, content } = req.body;

        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if (!task || !user) {
            return res.status(400).json({ message: 'Invalid task or user' });
        }

        const comment = new Comment({
            task: taskId,
            user: userId,
            content,
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
