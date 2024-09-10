const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Schemas/userSchema'); // Adjust path as needed

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('organizations');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('organizations');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, organizations } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ firstName, lastName, email, password, organizations });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("user already created");
        }
        user = new User({ firstName, lastName, email, password });
        user.password = await bcrypt.hash(user.password, 8);
        user.createdAt = new Date();
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        user.tokens = user.tokens ? user.tokens.concat({ token }) : {token};
        await user.save();

        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        user.tokens = user.tokens.concat({ token });
        await user.save();

        res.send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Login failed!' });
    }
};
