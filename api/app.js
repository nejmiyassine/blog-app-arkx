// Packages
require('dotenv').config();
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// ---------- DB ----------
const db = require('./config/keys').MongoURI;

// ---------- Connect to Mongo ----------
mongoose
    .connect(db, {
        useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB connected ....'))
    .catch((err) => console.log(err));

// Import Routers
const router = require('./routers/index');
const userRouter = require('./routers/userRouter');

const PORT = process.env.PORT || 8000;

// ---------- Middlewares ----------
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// We can get our data using req.body
app.use(bodyParser.urlencoded({ extended: false }));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Static Assets
app.use(express.static(path.join(__dirname, '/public')));

// ---------- Routers ----------
app.use('/', router);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
