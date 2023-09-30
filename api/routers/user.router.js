const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');

const User = require('../models/User');
const {
    registerUser,
    loginUser,
    getUserBlogs,
} = require('../controllers/user.controller');

const validate = require('../helpers/validate');

router.post(
    '/register',
    validate([
        body('username').not().isEmpty().withMessage('Please fill name field'),
        // username must be an email
        body('email')
            .isEmail()
            .withMessage('Invalid email format')
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already in use');
                }
            }),
        // password must be at least 5 chars long
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    'Password confirmation does not match password'
                );
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    ]),
    registerUser
);

router.post(
    '/login',
    validate([
        body('email').isEmail().withMessage('Invalid email or password'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Invalid email or password'),
    ]),
    loginUser
);

router.get(
    '/verify',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log('Received token: ', req.user); // Log the received token
        res.json({ user: req.user });
    }
);

router.get('/:userId/blogs', getUserBlogs);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
