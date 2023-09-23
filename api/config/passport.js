const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
const secretKey = require('./keys').secretKey;

// ---------- Passport Local Strategy ----------
const customFields = {
    usernameField: 'email', // The field used for username (email in this case)
    passwordField: 'password', // The field used for password
};

const verifyCallback = async (email, password, done) => {
    try {
        // Find the user with the provided email
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, {
                message: 'Invalid email or password',
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

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
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// ---------- Passport JWT Strategy ----------
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

const jwtVerifyCallback = async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.userId);
        console.log('jwtPayload: ', jwtPayload);
        console.log('user: ', user);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerifyCallback);

passport.use(jwtStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});
