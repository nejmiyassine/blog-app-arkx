const bcrypt = require('bcryptjs');
const passport = require('passport');

const jwtHelper = require('../helpers/jwtHelper');
const User = require('../models/User');

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

        await newUser
            .save()
            .then((user) => {
                const jwt = jwtHelper.issueJWT(user);
                const { token, expires } = jwt;

                res.json({ user, token, expiresIn: expires });
            })
            .catch((err) => next(err));

        // Redirect to welcome page
        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const jwt = jwtHelper.issueJWT(user);
        const { token, expires } = jwt;

        res.json({ user, token, expiresIn: expires });
    })(req, res, next); // Don't forget to call the authenticate function
};
