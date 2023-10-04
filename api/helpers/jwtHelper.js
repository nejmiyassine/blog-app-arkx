const jwt = require('jsonwebtoken');

const secretKey = require('../config/keys').secretKey;

const issueJWT = (user) => {
    const userId = user._id;

    const expiresIn = '1d';

    const payload = {
        userId,
    };

    // Generate a JWT token
    const token = jwt.sign(payload, secretKey, {
        expiresIn,
    });

    return {
        token: 'Bearer ' + token,
        expires: expiresIn,
    };
};

module.exports.issueJWT = issueJWT;
