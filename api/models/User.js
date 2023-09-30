const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
