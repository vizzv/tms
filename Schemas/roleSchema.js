const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }], // e.g., ['CREATE_TASK', 'EDIT_TASK', 'DELETE_TASK']
    createdAt: { type: Date, default: Date.now },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
