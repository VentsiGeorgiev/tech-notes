const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const foundUser = await User.findOne({ username }).exec();

        if (!foundUser || !foundUser.active) {
            throw new Error('Invalid username or password');
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            throw new Error('Invalid username or password');
        }

        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'userId': foundUser.id,
                    'username': foundUser.username,
                    'roles': foundUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        });

        // Send accessToken containing username and roles 
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            throw new Error('Unauthorized');
        }
        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden' });
                }

                const foundUser = await User.findOne({ username: decoded.username }).exec();

                if (!foundUser) {
                    throw new Error('Unauthorized');
                }

                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'username': foundUser.username,
                            'roles': foundUser.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '60m' }
                );

                res.json({ accessToken });
            }
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }//No content

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.json({ message: 'Cookie cleared' });
};



module.exports = {
    login,
    logout,
    refresh,
};