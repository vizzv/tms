const Organization = require('../Schemas/organisationSchema'); // Adjust path as needed

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single organization by ID
exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new organization
exports.createOrganization = async (req, res) => {
    try {
        const { name, description } = req.body;
        const organization = new Organization({ name, description });
        await organization.save();
        res.status(201).json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing organization
exports.updateOrganization = async (req, res) => {
    try {
        const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an organization
exports.deleteOrganization = async (req, res) => {
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
