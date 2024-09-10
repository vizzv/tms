const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'UserOrganizationRole' }, // Assign task to a user in a specific role within an organization
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
