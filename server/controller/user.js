const User = require('../models/User');


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
    res.json({ message: 'getAllUsers' });
};

module.exports = {
    getAllUsers,
};