// Packages
require('dotenv').config();
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const store = require('express-session').MemoryStore();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();
const User = require('./models/User');
const secretKey = require('./config/keys').secretKey;

// ---------- DB ----------
const db = require('./config/keys').MongoURI;

// ---------- Connect to Mongo ----------
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected ....'))
    .catch((err) => console.log(err));

// ---------- Middlewares ----------
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: require('./config/keys').secretKey,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 300000000, secure: true },
        store: store,
    })
);
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Static Assets
app.use(express.static(path.join(__dirname, '/public')));
app.use(passport.initialize());
app.use(passport.session());

// Create a middleware function for JWT authentication
const authenticateJWT = passport.authenticate('jwt', { session: false });

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

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
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
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
            return done(error);
        }
    })
);

// Import Routers
const router = require('./routers/index');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');

// ---------- Routers ----------
app.use('/', router);
app.use('/users', userRouter);
app.use('/blogs', authenticateJWT, blogRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
