const bcrypt = require('bcryptjs');
const passport = require('passport');

const jwtHelper = require('../helpers/jwtHelper');
const User = require('../models/User');
const Blog = require('../models/Blog');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

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

exports.getUserBlogs = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log('User Blog', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userBlogs = await Blog.find({ user: user._id });
        console.log(userBlogs);

        res.status(200).json(userBlogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
