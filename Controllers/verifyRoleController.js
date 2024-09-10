const jwt = require('jsonwebtoken');
const UserOrganizationRole = require('../Schemas/userOrganisationRole'); // Adjust path as needed

const secretKey = process.env.JWT_SECRET;

// Middleware to authenticate user
exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to authorize user based on roles
exports.authorize = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const { userId } = req.user;
            const userRole = await UserOrganizationRole.findOne({ user: userId, role: requiredRole });

            if (!userRole) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
};
