// Packages
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const sessionStore = require('express-session').MemoryStore();
const passport = require('passport');
const cors = require('cors');
const app = express();

const connectDb = require('./config/database');

// ---------- Connect Database ----------
connectDb();

// ---------- Middlewares ----------
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Session Middleware
app.use(
    session({
        secret: require('./config/keys').secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true },
        store: sessionStore,
        sameSite: 'None',
    })
);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// Static Assets
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create a middleware function for JWT authentication
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Import Routers
const userRouter = require('./routers/user.router');
const blogRouter = require('./routers/blog.router');

// ---------- Routers ----------
app.use('/users', userRouter);
app.use('/blogs', authenticateJWT, blogRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
