const mongoose = require('mongoose');
const db = require('./keys').MongoURI;

// ---------- Connect to MongoDB ----------
const connectDb = () => {
    return mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected ....'))
        .catch((err) => console.log(err));
};

module.exports = connectDb;
