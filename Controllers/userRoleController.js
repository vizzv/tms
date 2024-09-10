const UserRole = require('../Schemas/userOrganisationRole'); // Adjust path as needed
const User = require('../Schemas/userSchema'); // Adjust path as needed
const Role = require('../Schemas/roleSchema'); // Adjust path as needed
const Organization = require('../Schemas/organisationSchema'); // Adjust path as needed

// Get all user roles
exports.getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.find().populate('user').populate('role').populate('organization');
        res.status(200).json(userRoles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single user role by ID
exports.getUserRoleById = async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id).populate('user').populate('role').populate('organization');
        if (!userRole) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.status(200).json(userRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Assign a role to a user in an organization
exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId, organizationId } = req.body;

        const user = await User.findById(userId);
        const role = await Role.findById(roleId);
        const organization = await Organization.findById(organizationId);

        if (!user || !role || !organization) {
            return res.status(400).json({ message: 'Invalid user, role, or organization' });
        }

        const userRole = new UserRole({
            user: userId,
            role: roleId,
            organization: organizationId,
        });

        await userRole.save();
        res.status(201).json(userRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a user role (change role or organization)
exports.updateUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userRole) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.status(200).json(userRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove a role from a user in an organization
exports.deleteUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findByIdAndDelete(req.params.id);
        if (!userRole) {
            return res.status(404).json({ message: 'User role not found' });
        }
        res.status(200).json({ message: 'User role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
