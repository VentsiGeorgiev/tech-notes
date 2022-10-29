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
            throw new Error('Could not create user');
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update user
// @route PUT /users
// @access Private
const updateUser = async (req, res) => {
    try {
        const { id, username, roles, active, password } = req.body;

        // Confirm data
        if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
            throw new Error('All fields except password are required');
        }

        // Check for user if exists
        const user = await User.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        // Check for username
        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            throw new Error('User with this username already exists');
        }

        user.username = username;
        user.roles = roles;
        user.active = active;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({ message: `${updatedUser.username} successfully updated` });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
};