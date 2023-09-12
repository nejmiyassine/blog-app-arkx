const crypto = require('crypto');

// Configure the JWT strategy for token-based authentication
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
    MongoURI: process.env.MongoURI,
    secretKey: secretKey,
};
