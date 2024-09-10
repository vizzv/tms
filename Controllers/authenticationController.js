const jwt = require('jsonwebtoken');
const User = require('../Schemas/userSchema');

const secretKey = process.env.JWT_SECRET;

// User Registration
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            userId: user._id,
            email: user.email,
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '5h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
