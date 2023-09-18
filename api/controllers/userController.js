const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = require('../config/keys').secretKey;

exports.registerUser = async (req, res) => {
    const { username, email, password } = await req.body;

    try {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id }, secretKey, {
            expiresIn: '1h',
        });

        res.json({ token });

        // Redirect to welcome page
        // res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ error: 'Login failed' });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });

        // Return the token or redirect to a welcome page
        res.json({ token }); // This sends the token as a JSON response

        // If you want to redirect, use res.redirect('/welcome') instead
    })(req, res, next); // Don't forget to call the authenticate function
};
