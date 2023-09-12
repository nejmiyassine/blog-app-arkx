const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
const validate = require('../helpers/validate');
const { registerUser, loginUser } = require('../controllers/userController');
const secretKey = require('../config/keys').secretKey;

// Create a middleware function for JWT authentication
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Configure the JWT strategy for token-based authentication
// const secretKey = crypto.randomBytes(32).toString('hex');

router.use(passport.initialize());

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // The field used for username (email in this case)
            passwordField: 'password', // The field used for password
        },
        async (email, password, done) => {
            try {
                // Find the user with the provided email
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, {
                        message: 'Invalid email or password',
                    });
                }

                // Compare the provided password with the hashed password in the database
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    return done(null, false, {
                        message: 'Invalid email or password',
                    });
                }

                // If the email and password are valid, return the user
                return done(null, user);
            } catch (error) {
                return done(error); // Pass the error to the done function
            }
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
        },
        (jwtPayload, done) => {
            User.findById(jwtPayload.userId, (err, user) => {
                if (err) return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Register
router.get('/register', (req, res) => {
    res.render('register');
});

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

router.get('/protected', authenticateJWT, (req, res) => {
    // If the middleware successfully authenticated the user,
    // the user information will be available in req.user
    res.json({ message: 'This is a protected route', user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
