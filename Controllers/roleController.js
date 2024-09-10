const Role = require('../Schemas/roleSchema'); // Adjust path as needed

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        let role = await Role.findOne({ name });
        if (role) {
            return res.status(400).json({ message: 'Role already exists' });
        }
        role = new Role({ name });
        await role.save();
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing role
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
