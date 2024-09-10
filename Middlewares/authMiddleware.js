const jwt = require('jsonwebtoken');
const User = require('../Schemas/userSchema');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        console.log();
        return res.status(401).send({ error: 'Please authenticate.' });
    }
    token = token.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;
