const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oidc');
const User = require('../models/User');
const validate = require('../helpers/validate');

// Configure the JWT strategy for token-based authentication
const secretKey = crypto.randomBytes(32).toString('hex');

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
    async (req, res) => {
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
            res.redirect('/');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }
);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ error: 'Login failed' });

        if (!user) {
            return res
                .status(401)
                .json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });

        // Return the token or redirect to a welcome page
        res.json({ token }); // This sends the token as a JSON response

        // If you want to redirect, use res.redirect('/welcome') instead
    })(req, res, next); // Don't forget to call the authenticate function
});

// Create a middleware function for JWT authentication
const authenticateJWT = passport.authenticate('jwt', { session: false });

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
