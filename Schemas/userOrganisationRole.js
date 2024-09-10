const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrganizationRoleSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    assignedAt: { type: Date, default: Date.now },
});

const UserOrganizationRole = mongoose.model('UserOrganizationRole', userOrganizationRoleSchema);
module.exports = UserOrganizationRole;
