const User = require('../models/User');
const bcrypt = require('bcrypt');


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select('-password');

        if (!users?.length) {
            throw new Error('No users found');
        }

        res.json(users);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Create new user
// @route POST /users
// @access Private
const createUser = async (req, res) => {
    try {
        const { username, password, roles } = req.body;

        // Check for data
        if (!username || !password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const exists = await User.findOne({ username });
        if (exists) {
            throw new Error('Username already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userObject = (!Array.isArray(roles) || !roles.length)
            ? { username, password: hashedPassword }
            : { username, password: hashedPassword, roles };



        const user = await User.create(userObject);

        if (user) {
            res.status(201).json({ message: 'User successfully created' });
        } else {
            throw new Error({ message: 'Could not create user' });
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser
};