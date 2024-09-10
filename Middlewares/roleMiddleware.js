const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'Please authenticate.' });
        }

        const userRoles = req.user.roles.map(role => role.name); // Assuming roles are populated

        if (!userRoles.includes(requiredRole)) {
            return res.status(403).send({ error: 'Access denied.' });
        }

        next();
    };
};

module.exports = roleMiddleware;
