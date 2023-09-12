const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: {
        type: String,
        default:
            'https://www.flaticon.com/free-icon/user_847969?term=profile+picture&page=1&position=11&origin=tag&related_id=847969',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
